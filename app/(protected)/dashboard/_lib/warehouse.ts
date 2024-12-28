'use server'

import { db } from '@/db'
import { StatusWarehouse, warehouse } from '@/db/schema/warehouse'
import { asc, eq } from 'drizzle-orm'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

interface InsertWarehouseProps {
  shipper: string
  consigner: string
  tracking: string
  clientId: number
  comments?: string
  origin?: string
  destination?: string
}

export async function insertWarehouse ({
  shipper,
  consigner,
  clientId,
  comments,
  origin,
  destination,
  tracking
}: InsertWarehouseProps) {
  try {
    const newWarehouse = await db.insert(warehouse).values({
      clientId,
      shipper,
      comments,
      consigner,
      destination,
      origin,
      tracking,
      status: 'pending',
      created: new Date()
    }).returning()

    revalidatePath('/dahsboard/warehouse')
    revalidatePath('/dashboard')

    return newWarehouse[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllWarehouse () {
  noStore()

  const response = await db.select()
    .from(warehouse)
    .orderBy(asc(warehouse.id))

  return response
}

export async function updateWarehouseStatusByClientId ({
  clientId,
  status
}: {
  clientId: number,
  status: StatusWarehouse
}) {
  try {
    const updatedWarehouse = await db.update(warehouse)
      .set({
        status
      })
      .where(eq(warehouse.clientId, clientId))
      .returning()

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/warehouse')

    return updatedWarehouse[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}

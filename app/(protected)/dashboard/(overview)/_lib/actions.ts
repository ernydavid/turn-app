'use server'

import { ActionState } from '@/lib/definitions'
import { z } from 'zod'
import { insertWarehouse } from '../../_lib/warehouse'

const WarehouseSchema = z.object({
  clientId: z.string(),
  shipper: z.string().min(3, { message: 'Shipper must contain at least 3 characters.' }),
  consigner: z.string().min(3, { message: 'Consigner must contain at least 3 characters.' }),
  origin: z.optional(z.string()).optional(),
  destination: z.optional(z.string()).optional(),
  tracking: z.string().min(6, { message: 'Tracking must contain at least 6 characters.' }),
  comments: z.optional(z.string()).optional()
})

export async function newWarehouse (prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = WarehouseSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid field. Please check values.',
      inputs: Object.fromEntries(formData),
      closeDialog: false
    }
  }

  const { clientId, consigner, shipper, tracking, comments, destination, origin } = validatedFields.data

  const insertedWarehouse = await insertWarehouse({
    clientId: parseInt(clientId),
    consigner,
    shipper,
    tracking,
    comments,
    destination,
    origin
  })

  if (insertedWarehouse.id) {
    return {
      success: 'Warehouse created correctly.',
      closeDialog: true
    }
  }
}

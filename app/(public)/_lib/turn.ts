'use server'

import { db } from '@/db'
import { turns } from '@/db/schema/turns'
import { warehouse } from '@/db/schema/warehouse'
import { asc, eq, sql } from 'drizzle-orm'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'

const cookieName = 'token-turn'

export async function getAllTurns () {
  noStore()

  const allTurns = await db.select()
    .from(turns)
    .orderBy(asc(turns.created))

  return allTurns
}

export async function getTurnByCookies () {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(cookieName)?.value

  if (!cookie) {
    return null
  }

  const token = JSON.parse(cookie)?.token

  const response = await db.select()
    .from(turns)
    .where(eq(turns.token, token))

  return response[0]
}

export async function getAllPendingTurns () {
  const allTurns = await db.select()
    .from(turns)
    .where(eq(turns.status, 'pending'))
    .orderBy(asc(turns.created))

  return allTurns
}

export async function getCurrentPendingTurn () {
  const allTurns = await db.select()
    .from(turns)
    .where(eq(turns.status, 'pending'))
    .orderBy(asc(turns.created))

  return allTurns[0]
}

export async function newTurn (name: string, service: string) {
  const insertedTurn = await db.insert(turns)
    .values({
      name,
      service,
      created: new Date(),
      status: 'pending',
      token: await sql`uuid_generate_v4()`
    }).returning()

  const token = insertedTurn[0].token
  const userId = insertedTurn[0].id

  const cookieBody = {
    userId,
    token
  }

  const cookieStore = await cookies()
  await cookieStore.set(cookieName, JSON.stringify(cookieBody))

  revalidatePath('/newturn')
  revalidatePath('/turns')
  revalidatePath('/dashboard')

  // return token to save on cookies
  return {
    token: insertedTurn[0].token,
    success: 'Turn created.'
  }
}

export async function newTurnAdmin (name: string, service: string) {
  const insertedTurn = await db.insert(turns)
    .values({
      name,
      service,
      created: new Date(),
      status: 'pending',
      token: await sql`uuid_generate_v4()`
    }).returning()

  revalidatePath('/newturn')
  revalidatePath('/turns')
  revalidatePath('/dashboard')

  // return token to save on cookies
  return {
    token: insertedTurn[0].token,
    success: 'Turn created.'
  }
}

export async function deleteTurnByToken (token: string) {
  await db.delete(turns)
    .where(eq(turns.token, token))
}

export async function resetTurnsTable () {
  try {
    // Eliminar la tabla si existe
    await db.execute(sql`DROP TABLE IF EXISTS ${turns};`)
    console.log("Tabla 'turns' eliminada correctamente.")

    await db.execute(sql`DROP TABLE IF EXISTS ${warehouse};`)
    console.log("Tabla 'warehouse' eliminada correctamente.")

    // Re-crear la tabla
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "turns" (
        "id" serial NOT NULL,
        "name" varchar(32),
        "token" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
        "status" text,
        "service" text,
        "created" timestamp
      );
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "warehouse" (
        "id" serial NOT NULL PRIMARY KEY,
        "shipper" varchar(32),
        "clientId" integer,
        "tracking" text,
        "status" text,
        "consigner" varchar(32),
        "origin" varchar(32),
        "destination" varchar(32),
        "comments" text,
        "created" timestamp
      );
    `)

    const cookieStore = await cookies()
    await cookieStore.delete(cookieName)

    console.log("Tabla 'turns' creada nuevamente con éxito.")
    return {
      success: 'Tabla de turnos reiniciada.'
    }
  } catch (error) {
    console.error("Error al reiniciar la tabla 'turns':", error)
    throw error
  }
}

export async function deleteTurn () {
  const cookieStore = await cookies()
  const existingCookie = await cookieStore.get(cookieName)?.value

  if (existingCookie) {
    const cookie = JSON.parse(existingCookie)
    await deleteTurnByToken(cookie.token)

    await cookieStore.delete(cookieName)
  }

  return { success: true }
}

export async function updateStatusById (turnId: number) {
  await db.update(turns)
    .set({
      status: 'processed'
    })
    .where(eq(turns.id, turnId))

  revalidatePath('/dashboard/turns')
  revalidatePath('/turns')

  return { success: true }
}

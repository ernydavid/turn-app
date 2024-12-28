'use server'

import { ActionState } from '@/lib/definitions'
import { z } from 'zod'
import { newTurn, newTurnAdmin } from './turn'

const TurnFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be contain 3 characters minimun.' }),
  service: z.string({ required_error: 'Select a type of service' }).min(4, { message: 'Select a valid service' })
})

export async function insertTurn (prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = TurnFormSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid field. Please try again.',
      inputs: Object.fromEntries(formData)
    }
  }

  const { name, service } = validatedFields.data

  const insertedTurn = await newTurn(name, service)

  if (insertedTurn.success && insertedTurn.token) {
    return {
      success: insertedTurn.success
    }
  }
}

export async function insertTurnAdmin (prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = TurnFormSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid field. Please try again.',
      inputs: Object.fromEntries(formData),
      success: false,
      closeDialog: false
    }
  }

  const { name, service } = validatedFields.data

  const insertedTurn = await newTurnAdmin(name, service)

  if (insertedTurn.success && insertedTurn.token) {
    return {
      success: true,
      closeDialog: true
    }
  }
}

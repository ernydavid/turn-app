'use server'

import { ActionState } from '@/lib/definitions'
import { z } from 'zod'
import { updateWarehouseStatusByClientId } from '../../_lib/warehouse'
import { StatusWarehouse } from '@/db/schema/warehouse'

const UpdateStatusWareHouseSchema = z.object({
  clientId: z.string(),
  status: z.string().min(3, { message: 'Select a valid status.' })
})

export async function updateStatusWarehouse (prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = UpdateStatusWareHouseSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields. Please try again.',
      closeDialog: false
    }
  }

  const { clientId, status } = validatedFields.data

  const newStatus = await updateWarehouseStatusByClientId({ clientId: parseInt(clientId), status: status as StatusWarehouse })

  if (newStatus.id) {
    return {
      success: 'Status updated!',
      closeDialog: true
    }
  }
}

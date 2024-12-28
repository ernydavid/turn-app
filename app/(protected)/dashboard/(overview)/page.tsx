import { getAllTurns } from '@/app/(public)/_lib/turn'
import { ResetTurnsForm } from './_components/reset-turns-form'
import { TurnsTable } from './_components/turns-table'
import { NewTicketForm } from './_components/new-ticket-admin-form'
import { getAllWarehouse } from '../_lib/warehouse'

export default async function Page () {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const allPending = getAllTurns()
  const allWarehouses = getAllWarehouse()

  return (
    <div className='grid gap-2'>
      <div className='w-full flex items-center justify-between'>
        <h3>All pending turns</h3>
        <div className='flex items-center gap-2'>
          <NewTicketForm />
          <ResetTurnsForm />
        </div>
      </div>
      <TurnsTable
        pendingTurnsPromise={allPending}
        warehousesPromise={allWarehouses}
      />
    </div>
  )
}

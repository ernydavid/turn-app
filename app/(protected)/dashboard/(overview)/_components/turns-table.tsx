'use client'

import { updateStatusById } from '@/app/(public)/_lib/turn'
import { Button } from '@/components/ui/button'
import { Turns } from '@/db/schema/turns'
import { Check, Clock } from 'lucide-react'
import { use } from 'react'
import { RequestWarehouseForm } from './request-warehouse-form'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusWarehouse, Warehouse } from '@/db/schema/warehouse'
import { WarehouseBadgeStatus } from '../../warehouse/_components/warehouse-table'

export function TurnsTable ({ pendingTurnsPromise, warehousesPromise }: {
  pendingTurnsPromise: Promise<Turns[]>
  warehousesPromise: Promise<Warehouse[]>
}) {
  const allPending = use(pendingTurnsPromise)
  const allWarehouses = use(warehousesPromise)

  return (
    <div>
      <Table>
        <TableCaption>A list of all client queue tickets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPending.map((item) => (
            <TableRow
              key={item.id}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.service}</TableCell>
              <TableCell>{item.created?.toDateString()}</TableCell>
              <TableCell>
                <Button
                  size='sm'
                  variant={item.status === 'processed' ? 'success' : 'outline'}
                  disabled
                >
                  {item.status === 'processed'
                    ? <Check className='w-3 h-3 mr-1' />
                    : <Clock className='w-3 h-3 mr-1' />}
                  {item.status}
                </Button>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button
                    size='sm'
                    variant={item.status === 'processed' ? 'default' : 'outline'}
                    onClick={async () => {
                      await updateStatusById(item.id).then((res) => {
                        if (res.success) {
                          alert('updated!')
                        }
                      })
                    }}
                  >
                    <Check className='w-3 h-3 mr-1' /> Check
                  </Button>
                  {allWarehouses.find((warehouse) => warehouse.clientId === item.id)
                    ? <WarehouseBadgeStatus status={allWarehouses.find((warehouse) => warehouse.clientId === item.id)?.status as StatusWarehouse} />
                    : <RequestWarehouseForm ticket={item} />}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

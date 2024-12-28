'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { use } from 'react'
import { StatusWarehouse, Warehouse } from '@/db/schema/warehouse'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { WarehouseIcon } from 'lucide-react'
import { UpdateStatusWarehouseForm } from './status-warehouse-form'

export function WarehouseBadgeStatus ({ status }: {
  status: StatusWarehouse | null
}) {
  return (
    <Button
      variant='outline'
      size='sm'
      className={cn(
        status === 'pending' && 'text-orange-400',
        status === 'processed' && 'text-success',
        status === 'found' && 'text-primary',
        status === 'not found' && 'text-destructive',
        status === 'preparing' && 'text-orange-300'
      )}
    >
      <WarehouseIcon className='w-3 h-3 mr-1' /> {status}
    </Button>
  )
}

export function WarehouseTable ({ warehousePromise }: {
  warehousePromise: Promise<Warehouse[]>
}) {
  const allRequest = use(warehousePromise)

  return (
    <div>
      <Table className='w-full text-sm'>
        <TableCaption>A list of all warehouse request</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket</TableHead>
            <TableHead>Shipper</TableHead>
            <TableHead>Consigner</TableHead>
            <TableHead>Trackings</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allRequest.map((item) => (
            <TableRow
              key={item.id}
            >
              <TableCell>{item.clientId}</TableCell>
              <TableCell>{item.shipper}</TableCell>
              <TableCell>{item.consigner}</TableCell>
              <TableCell>{item.tracking}</TableCell>
              <TableCell>{item?.origin} - {item?.destination}</TableCell>
              <TableCell>{item.comments}</TableCell>
              <TableCell><WarehouseBadgeStatus status={item.status} /></TableCell>
              <TableCell>{item.created?.toDateString()}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <UpdateStatusWarehouseForm clientId={item.clientId!} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

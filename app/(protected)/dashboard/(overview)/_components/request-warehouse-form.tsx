'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Turns } from '@/db/schema/turns'
import { WarehouseIcon } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { newWarehouse } from '../_lib/actions'
import { ActionState } from '@/lib/definitions'
import { cn } from '@/lib/utils'

export function RequestWarehouseForm ({ ticket }: {
  ticket: Turns
}) {
  const [state, action, loading] = useActionState<ActionState, FormData>(newWarehouse, {})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (state?.closeDialog) {
      setOpen(false)
    }
  }, [state])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='secondary'
          disabled={ticket.status === 'processed'}
        >
          <WarehouseIcon className='w-3 h-3 mr-1' /> Create Warehouse Request
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-xl'>
        <DialogHeader>
          <DialogTitle>New Warehouse</DialogTitle>
          <DialogDescription>
            Request new warehouse package
          </DialogDescription>
        </DialogHeader>
        <form
          className='w-full grid gap-3 grid-cols-1 md:grid-cols-2 place-items-start'
          action={action}
        >
          <input
            name='clientId'
            type='hidden'
            defaultValue={ticket.id}
          />
          <div className='grid gap-2'>
            <Label htmlFor='shipper'>Shipper</Label>
            <Input
              name='shipper'
              id='shipper'
              type='text'
              placeholder='Enter shipper'
            />
            {state?.errors?.shipper && (
              <p className='text-sm text-destructive'>{state?.errors?.shipper}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='consigner'>Consigner</Label>
            <Input
              name='consigner'
              id='consigner'
              type='text'
              placeholder='Enter consigner'
            />
            {state?.errors?.consigner && (
              <p className='text-sm text-destructive'>{state?.errors?.consigner}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='origin'>Origin</Label>
            <Input
              name='origin'
              id='origin'
              type='text'
              placeholder='Enter Origin'
            />
            {state?.errors?.origin && (
              <p className='text-sm text-destructive'>{state?.errors?.origin}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='destination'>Destination</Label>
            <Input
              name='destination'
              id='destination'
              type='text'
              placeholder='Enter Destination'
            />
            {state?.errors?.destination && (
              <p className='text-sm text-destructive'>{state?.errors?.destination}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='tracking'>Tracking Number</Label>
            <Input
              name='tracking'
              id='tracking'
              type='text'
              placeholder='Enter tracking numbers'
            />
            {state?.errors?.tracking && (
              <p className='text-sm text-destructive'>{state?.errors?.tracking}</p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='comments'>Comments</Label>
            <Input
              name='comments'
              id='comments'
              type='text'
              placeholder='Enter comments'
            />
            {state?.errors?.comment && (
              <p className='text-sm text-destructive'>{state?.errors?.comment}</p>
            )}
          </div>
          <div className={cn(
            'w-full flex md:col-span-2 col-span-1 mt-3 items-center',
            state?.message || state?.success ? 'justify-between' : 'justify-end'
          )}
          >
            {state?.message && (
              <p className='text-sm text-destructive'>{state?.message}</p>
            )}
            {state?.success && (
              <p className='text-sm'>{state?.success}</p>
            )}
            <Button
              type='submit'
              disabled={loading}
            >
              {loading ? 'Creating Warehouse...' : 'Create Warehouse Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

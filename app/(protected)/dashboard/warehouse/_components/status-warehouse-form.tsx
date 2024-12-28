'use client'

import { Label } from '@/components/ui/label'
import { useActionState, useEffect, useState } from 'react'
import { ActionState } from '@/lib/definitions'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { statusWarehouse } from '@/db/schema/warehouse'
import { updateStatusWarehouse } from '../_lib/actions'
import { Box, Clock, SearchCheck, SearchX, TicketCheck } from 'lucide-react'

export function UpdateStatusWarehouseForm ({ clientId }: {
  clientId: number
}) {
  const [state, action, loading] = useActionState<ActionState, FormData>(updateStatusWarehouse, {})
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)
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
          variant='outline'
        >
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full'>
        <DialogTitle>Update Status of Warehouse</DialogTitle>
        <form
          className='w-full grid gap-4'
          action={action}
        >
          <input
            name='clientId'
            defaultValue={clientId}
            type='hidden'
          />
          <div className='w-full grid gap-2'>
            <Label htmlFor='status'>Status</Label>
            <ToggleGroup
              type='single'
              variant='outline'
              defaultValue={state?.inputs?.service}
              value={selectedValue}
              className='group'
              onValueChange={(value) => setSelectedValue(value)}
            >
              {statusWarehouse.map((item, index) => (
                <ToggleGroupItem
                  key={`status-${index + 1}`}
                  className='w-full h-24 selection:bg-primary data-[state=on]:bg-primary flex flex-col space-y-2'
                  value={item}
                >
                  {item === 'found' && <SearchCheck />}
                  {item === 'not found' && <SearchX />}
                  {item === 'pending' && <Clock />}
                  {item === 'preparing' && <Box />}
                  {item === 'processed' && <TicketCheck />}
                  {item}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <input
              className='hidden'
              type='hidden'
              name='status'
              value={selectedValue || ''}
            />
            {state?.errors?.status && (
              <p className='text-sm text-destructive'>{state?.errors?.status}</p>
            )}
          </div>
          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Status'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}

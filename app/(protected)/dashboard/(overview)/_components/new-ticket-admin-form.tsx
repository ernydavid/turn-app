'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useEffect, useState } from 'react'
import { ActionState } from '@/lib/definitions'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { insertTurnAdmin } from '@/app/(public)/_lib/actions'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export function NewTicketForm () {
  const [state, action, loading] = useActionState<ActionState, FormData>(insertTurnAdmin, {})
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
        >
          <Plus className='w-4 h-4 mr-2' /> New Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full'>
        <DialogHeader>
          <DialogTitle>New Ticket</DialogTitle>
          <DialogDescription>
            Create a queue ticket to client on lobby. Use this if client request a turn directly from lobby desktop
          </DialogDescription>
        </DialogHeader>
        <form
          className='w-full grid gap-4'
          action={action}
        >
          <div className='w-full grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              placeholder='Your Name...'
              defaultValue={state?.inputs?.name}
              disabled={loading}
            />
            {state?.errors?.name && (
              <p className='text-sm text-destructive'>{state?.errors?.name}</p>
            )}
          </div>

          <div className='w-full grid gap-2'>
            <Label htmlFor='service'>Select a service</Label>
            <ToggleGroup
              type='single'
              variant='outline'
              defaultValue={state?.inputs?.service}
              value={selectedValue}
              className='group'
              onValueChange={(value) => setSelectedValue(value)}
            >
              <ToggleGroupItem
                className='w-full h-24 selection:bg-primary data-[state=on]:bg-primary'
                value='shipping'
              >
                Shipping
              </ToggleGroupItem>
              <ToggleGroupItem
                className='w-full h-24 data-[state=on]:bg-primary'
                value='membership'
              >Membership
              </ToggleGroupItem>
            </ToggleGroup>
            <input
              className='hidden'
              type='hidden'
              name='service'
              value={selectedValue || ''}
            />
            {state?.errors?.service && (
              <p className='text-sm text-destructive'>{state?.errors?.service}</p>
            )}
          </div>

          <div className='flex justify-end'>
            <Button
              type='submit'
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}

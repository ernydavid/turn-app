'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'
import { insertTurn } from '../_lib/actions'
import { ActionState } from '@/lib/definitions'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export function NewTurnForm ({ showTitle }: {
  showTitle?: boolean
}) {
  const [state, action, loading] = useActionState<ActionState, FormData>(insertTurn, {})
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6 place-content-center'>
      <form
        className='w-full max-w-sm grid gap-4 place-content-center'
        action={action}
      >
        {showTitle && (
          <div className='grid gap-2'>
            <h3>New Turn</h3>
            <p>Please, complete the form to request your turn</p>
          </div>
        )}

        <div className='grid gap-2'>
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

        <div className='grid gap-2'>
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
            >Shipping
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

        <div className='flex justify-center'>
          <Button
            type='submit'
            disabled={loading}
          >
            {loading ? 'Requesting...' : 'Request'}
          </Button>
        </div>
      </form>
    </div>
  )
}

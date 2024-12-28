'use client'

import { resetTurnsTable } from '@/app/(public)/_lib/turn'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

export function ResetTurnsForm () {
  const [success, setSuccess] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (success) {
      setOpen(false)
    }
  }, [success])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size='sm'
        >
          Reset Turns
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset turns</DialogTitle>
          <DialogDescription>
            This function reset table and turn from 0, to start again. If you reset turns the current existings turns will be removed. Are you sure to continue?
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center gap-3'>
          <form action={async () => {
            resetTurnsTable().then(res => {
              if (res.success) {
                setSuccess(res.success)
              }
            })
          }}
          >
            <Button
              disabled={success !== null}
            >
              {success || 'Reset Turns'}
            </Button>
          </form>
          <DialogClose />
        </div>
      </DialogContent>
    </Dialog>
  )
}

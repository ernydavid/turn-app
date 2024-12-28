'use client'

import { Button } from '@/components/ui/button'
import { deleteTurn } from '../_lib/turn'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteCurrentTurnForm () {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <form action={async () => {
      startTransition(() => {
        deleteTurn().then(res => {
          if (res.success) {
            router.refresh()
          }
        })
      })
    }}
    >
      <Button
        disabled={isPending}
      >
        Request a new turn
      </Button>
    </form>
  )
}

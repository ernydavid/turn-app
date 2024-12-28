'use client'

import { Ticket } from 'lucide-react'
import { getCurrentPendingTurn } from '../_lib/turn'
import { CurrentTurnSkeleton } from './skeletons'
import { useEffect, useState, useTransition } from 'react'
import { Turns } from '@/db/schema/turns'

export function CurrentTurn () {
  const [current, setCurrent] = useState<Turns | null>()
  const [isPending, startTrasition] = useTransition()

  useEffect(() => {
    const getData = () => {
      startTrasition(async () => {
        const currentTurn = await getCurrentPendingTurn()
        setCurrent(currentTurn)
      })
    }

    getData()
    const interval = setInterval(getData, 20000) // Actualiza cada 60 segundos

    return () => clearInterval(interval)
  }, [])

  if (isPending) {
    return <CurrentTurnSkeleton />
  }

  if (current) {
    return (
      <div className='w-full rounded-xl bg-primary text-primary-foreground flex flex-col justify-between gap-4 p-6'>
        <div className='flex items-center gap-2'>
          <Ticket />
          <span className='font-semibold tracking-tighter text-xl'>Current Ticket</span>
        </div>
        <div className='flex flex-col items-end justify-end text-right'>
          {/* <NumberTicker
            className='text-[160px] font-bold tracking-tighter leading-none text-primary-foreground dark:text-primary-foreground px-5'
            value={current.id}
            direction='up'
          /> */}
          <p className='text-[160px] font-bold tracking-tighter leading-none'>{current?.id}</p>
        </div>
      </div>
    )
  }
}

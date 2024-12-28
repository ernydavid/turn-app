'use client'

import { Turns } from '@/db/schema/turns'
import { useEffect, useState, useTransition } from 'react'
import { getAllPendingTurns } from '../_lib/turn'
import { AllTurnsSkeleton } from './skeletons'

export function TurnsList () {
  const [allPending, setAllPending] = useState<Turns[] | []>([])
  const [isPending, startTrasition] = useTransition()

  useEffect(() => {
    const getData = () => {
      startTrasition(async () => {
        const allTurns = await getAllPendingTurns()
        setAllPending(allTurns)
      })
    }

    getData()
    const interval = setInterval(getData, 20000) // Actualiza cada 60 segundos

    return () => clearInterval(interval)
  }, [])

  if (isPending) {
    return <AllTurnsSkeleton />
  }

  return (
    <div className='w-full grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-4'>
      {allPending?.slice(1, 18)?.map((item: Turns) => (
        <div
          key={item?.id}
          className='w-full aspect-square rounded-xl bg-secondary p-3 flex items-center justify-center text-xl font-semibold tracking-tighter'
        >
          <p>{item?.id}</p>
        </div>
      ))}
      {/* {Array.from({ length: 15 }).map((item, index) => (
        <div
          key={index + 1}
          className='w-full aspect-square rounded-xl bg-secondary p-3 flex items-center justify-center text-xl font-semibold tracking-tighter'
        >
          <p>{index + 1}</p>
        </div>
      ))} */}
    </div>
  )
}

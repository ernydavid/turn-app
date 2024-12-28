export function CurrentTurnSkeleton () {
  return (
    <div className='w-full rounded-xl bg-muted animate-pulse flex flex-col justify-between gap-4 p-6'>
      <div className='flex items-center gap-2'>
        <div className='w-7 h-7 rounded-2xl bg-background' />
        <span className='w-28 h-7 bg-background rounded-2xl' />
      </div>
      <div className='flex flex-col items-end justify-end text-right'>
        <div className='w-[160px] bg-background aspect-square rounded-2xl' />
      </div>
    </div>
  )
}

export function AllTurnsSkeleton () {
  return (
    <div className='w-full grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-4'>
      {Array.from({ length: 18 }).map((item, index) => (
        <div
          key={index + 1}
          className='w-full aspect-square rounded-xl bg-muted p-3 flex items-center justify-center text-xl font-semibold tracking-tighter animate-pulse'
        >
          <div className='h-9 w-9 rounded-lg bg-background animate-pulse' />
        </div>
      ))}

    </div>
  )
}

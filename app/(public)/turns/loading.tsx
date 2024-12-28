import { AllTurnsSkeleton, CurrentTurnSkeleton } from '../_components/skeletons'

export default function Loading () {
  return (
    <div className='w-full min-h-dvh grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-10'>
      <div className='w-full grid gap-4'>
        <CurrentTurnSkeleton />
        <AllTurnsSkeleton />
      </div>
      <div className='w-full h-full bg-muted animate-pulse' />
    </div>
  )
}

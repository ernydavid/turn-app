import WordRotate from '@/components/ui/word-rotate'
import { CurrentTurn } from '../_components/current-turn'
import { TurnsList } from '../_components/turns-list'

export default function Page () {
  return (
    <div className='w-full min-h-dvh grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-10'>
      <div className='w-full grid gap-4'>
        <CurrentTurn />
        <TurnsList />
      </div>
      <div className='w-full h-full hidden md:flex relative'>
        <video
          muted
          autoPlay
          loop
          className='absolute top-0 left-0 w-full h-full object-cover rounded-xl'
          src='/promo/video-promo.mp4'
        />
        <div className='w-full z-10 p-6 flex flex-col justify-between items-end text-right'>
          <img
            className='h-14'
            src='/logo-2024-dark.svg'
            alt='Logo Company'
          />
          <div className='space-y-2'>
            <h1>Send & Receive from</h1>
            <WordRotate
              words={['Aruba', 'Bonaire', 'Sint Maarten', 'Colombia', 'Miami', 'Dominican Republic', 'Suriname', 'Guyana', 'Netherlands', 'Jamaica', 'Venezuela']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

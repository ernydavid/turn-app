import { Navbar } from '@/app/(public)/_components/navbar'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Home () {
  return (
    <div className='w-full min-h-dvh max-w-7xl mx-auto flex flex-col relative overflow-y-auto'>
      <Navbar />
      <div className='pt-12 flex-1 px-4 grid place-content-center place-items-center gap-4 text-center'>
        <Link
          href='/newturn'
          className='w-48 h-48 flex flex-col items-center justify-center border rounded-lg font-medium tracking-tighter bg-primary hover:bg-primary/80 transition-colors'
        >
          <Plus />
          New Turn
        </Link>
      </div>
    </div>
  )
}

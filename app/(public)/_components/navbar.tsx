import { Logo } from '@/components/logo'

export function Navbar () {
  return (
    <header className='w-full flex justify-center items-center gap-2 fixed top-0 left-0 border-b border-b-muted bg-background z-50'>
      <div className='w-full h-16 px-4 flex justify-center items-center gap-3'>
        <Logo />
      </div>
    </header>
  )
}

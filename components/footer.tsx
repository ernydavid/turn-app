import { LogoIcon } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const routes = [
  {
    id: 1,
    label: 'New',
    href: '/newturn'
  },
  {
    id: 2,
    label: 'Summary',
    href: '/turns'
  },
  {
    id: 3,
    label: 'Dashboard',
    href: '/dashboard'
  }
]

export function Footer () {
  return (
    <footer className='h-12 flex items-center justify-between gap-6 px-4 border-t border-t-muted'>
      <LogoIcon />
      <div className='flex items-center gap-3'>
        {routes.map((item) => (
          <Link
            className={buttonVariants({ variant: 'link', size: 'sm' })}
            key={item.id}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </footer>
  )
}

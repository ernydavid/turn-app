'use client'

import { LogoIcon } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'
import { login } from '@/app/(auth)/_lib/auth'
import { ErrorNotification } from '@/components/notification-error'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ActionState } from '@/lib/definitions'
import { Eye, EyeClosed } from 'lucide-react'

export function LoginForm () {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(login, {})
  const [viewPassword, setViewPassword] = useState(false)

  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6'>
      <LogoIcon className='w-9 h-9 mx-auto' />
      <h2 className='text-center'>Sign In</h2>
      <form
        className='w-full grid gap-4'
        action={action}
      >
        <div className='grid space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            className='w-full'
            id='email'
            name='email'
            placeholder='Enter your email'
            type='email'
            disabled={isLoading}
            defaultValue={state?.inputs?.email}
            sizes='sm'
          />
          {state?.errors?.email && <p className='text-error text-sm font-medium'>{state.errors?.email}</p>}
        </div>
        <div className='grid  space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative w-full'>
            <Input
              className='w-full'
              id='password'
              name='password'
              placeholder='*******'
              type={viewPassword ? 'text' : 'password'}
              defaultValue={state?.inputs?.password}
              disabled={isLoading}
              sizes='sm'
            />
            <button
              type='button'
              className='absolute top-[50%] translate-y-[-50%] right-3'
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? <EyeClosed className='h-4 w-4 text-muted-foreground' /> : <Eye className='h-4 w-4 text-muted-foreground' />}
            </button>
          </div>
          <div className='flex'>
            <Link
              href='/forgot-password'
              className='text-sm text-muted-foreground hover:text-foreground/70 hover:underline underline-offset-2'
            >
              Forgot your password?
            </Link>
          </div>
          {state?.errors?.password && state.errors?.password.map((error: string, index: number) => (
            <p
              key={index}
              className='text-error text-sm font-medium'
            >
              - {error}
            </p>
          ))}
        </div>
        <Button
          className='mt-5'
          variant='primary'
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Sign In'}
        </Button>
        {state?.message && <ErrorNotification message={state.message} />}
      </form>
      <div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-muted' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-background text-muted-foreground'>
              I don´t have an account
            </span>
          </div>
        </div>
      </div>
      <Link
        className={cn(
          buttonVariants({ variant: 'outline' })
        )}
        href='/signup'
      >
        Create an account
      </Link>
    </div>
  )
}

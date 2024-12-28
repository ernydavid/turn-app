import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export function UserMenuSkeleton () {
  return (
    <div className='w-9 h-9 rounded-full bg-secondary animate-pulse' />
  )
}

export function DashboardSkeleton () {
  return (
    <div className='h-[calc(100dvh-48px)] flex flex-col md:flex-row gap-3'>
      <main className='flex flex-col flex-1'>
        <div className='w-full flex items-center justify-between'>
          <div className='h-6 w-[100px] bg-secondary animate-pulse rounded-xl' />
          <div className='flex items-center gap-2'>
            <div className='h-8 w-[100px] bg-secondary animate-pulse rounded-lg' />
            <div className='h-8 w-[100px] bg-secondary animate-pulse rounded-lg' />
          </div>
        </div>
        <Table>
          <TableCaption><div className='h-3 w-full max-w-[200px] rounded-full bg-secondary animate-pulse' /></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead><div className='h-3 w-full max-w-[90px] rounded-full bg-secondary animate-pulse' /></TableHead>
              <TableHead><div className='h-3 w-full max-w-[90px] rounded-full bg-secondary animate-pulse' /></TableHead>
              <TableHead><div className='h-3 w-full max-w-[90px] rounded-full bg-secondary animate-pulse' /></TableHead>
              <TableHead><div className='h-3 w-full max-w-[90px] rounded-full bg-secondary animate-pulse' /></TableHead>
              <TableHead><div className='h-3 w-full max-w-[90px] rounded-full bg-secondary animate-pulse' /></TableHead>
              <TableHead><div className='h-3 w-full max-w-[90px] rounded-full bg-secondary animate-pulse' /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><div className='h-3 w-full max-w-[100px] rounded-full bg-secondary animate-pulse' /></TableCell>
              <TableCell><div className='h-3 w-full max-w-[100px] rounded-full bg-secondary animate-pulse' /></TableCell>
              <TableCell><div className='h-3 w-full max-w-[100px] rounded-full bg-secondary animate-pulse' /></TableCell>
              <TableCell><div className='h-3 w-full max-w-[100px] rounded-full bg-secondary animate-pulse' /></TableCell>
              <TableCell><div className='h-3 w-full max-w-[100px] rounded-full bg-secondary animate-pulse' /></TableCell>
              <TableCell><div className='h-3 w-full max-w-[100px] rounded-full bg-secondary animate-pulse' /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  )
}

export function HeaderSkeleton () {
  return (
    <header className='w-full h-12 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className='w-7 h-7 rounded-lg bg-secondary animate-pulse md:hidden flex' />
        <div className='h-4 w-24 bg-secondary rounded-full animate-pulse' />
      </div>
      <div className='h-9 w-9 bg-secondary rounded-full animate-pulse' />
    </header>
  )
}

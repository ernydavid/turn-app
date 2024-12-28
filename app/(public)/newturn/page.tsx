import { DeleteCurrentTurnForm } from '../_components/delete-current-turn'
import { NewTurnForm } from '../_components/request-turn-form'
import { getTurnByCookies } from '../_lib/turn'

export default async function Page () {
  const existingTurn = await getTurnByCookies()

  if (existingTurn) {
    const shortName = existingTurn.name?.split(' ')[0]
    const userTurn = existingTurn.id

    return (
      <div className='w-full grid gap-6 place-content-center place-items-center'>
        <div className='w-full grid text-center gap-3 mx-auto'>
          <h3>Welcome, {shortName}</h3>
          <p>Your turn is:</p>
          <div className='w-full p-6 rounded-lg border'>
            <p className='text-8xl tracking-tighter font-semibold'>{userTurn}</p>
          </div>
        </div>
        <DeleteCurrentTurnForm />
      </div>
    )
  }

  return <NewTurnForm />
}

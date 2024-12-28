import { getAllWarehouse } from '../_lib/warehouse'
import { WarehouseTable } from './_components/warehouse-table'

export default async function Page () {
  const allWarehouses = getAllWarehouse()

  return (
    <WarehouseTable warehousePromise={allWarehouses} />
  )
}

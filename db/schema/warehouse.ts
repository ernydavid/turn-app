import { InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const statusWarehouse = ['pending', 'processed', 'preparing', 'found', 'not found'] as const

const statusEnum = text('status', { enum: statusWarehouse })

export const warehouse = pgTable('warehouse', {
  id: serial('id').unique().primaryKey(),
  clientId: integer('clientId'),
  shipper: varchar('shipper', { length: 32 }),
  consigner: varchar('consigner', { length: 32 }),
  origin: varchar('origin', { length: 32 }),
  destination: varchar('destination', { length: 32 }),
  tracking: text('tracking'),
  comments: text('comments'),
  status: statusEnum,
  created: timestamp('created', { mode: 'date' })
})

export type Warehouse = InferSelectModel<typeof warehouse>
export type StatusWarehouse = (typeof statusWarehouse)[number]

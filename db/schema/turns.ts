import { InferSelectModel, sql } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

// Create turns table
export const statusEnumValues = ['pending', 'processed'] as const

export const statusEnum = text('status', { enum: statusEnumValues })

export const turns = pgTable('turns', {
  id: serial('id'),
  name: varchar('name', { length: 32 }),
  token: uuid('token').primaryKey().default(sql`uuid_generate_v4()`).notNull(),
  service: text('service'),
  status: statusEnum,
  created: timestamp('created', { mode: 'date' })
})

export type Turns = InferSelectModel<typeof turns>
export type Status = (typeof statusEnumValues)[number];

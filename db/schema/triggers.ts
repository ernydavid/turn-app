import { sql } from 'drizzle-orm'

export async function up (db: any): Promise<void> {
  // Crear la función de trigger
  await db.execute(
    sql`
    CREATE OR REPLACE FUNCTION notify_turn_change()
    RETURNS TRIGGER AS $$
    BEGIN
        PERFORM pg_notify('turns_channel', row_to_json(NEW)::text);
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `
  )

  // Crear el trigger en la tabla "turnos"
  await db.execute(
    sql`
    CREATE TRIGGER turn_change_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON "turns"
    FOR EACH ROW
    EXECUTE FUNCTION notify_turn_change();
    `
  )
}

export async function down (db: any): Promise<void> {
  // Eliminar el trigger
  await db.execute(
    sql`
    DROP TRIGGER IF EXISTS turn_change_trigger ON "turns";
    `
  )

  // Eliminar la función del trigger
  await db.execute(
    sql`
    DROP FUNCTION IF EXISTS notify_turn_change;
    `
  )
}

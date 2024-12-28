CREATE TABLE IF NOT EXISTS "warehouse" (
	"id" serial NOT NULL,
	"client" varchar(32),
	"clientId" serial NOT NULL,
	"tracking" text,
	"status" text,
	"created" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_clientId_turns_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."turns"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "warehouse" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_id_unique" UNIQUE("id");
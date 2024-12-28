ALTER TABLE "warehouse" RENAME COLUMN "client" TO "shipper";--> statement-breakpoint
ALTER TABLE "warehouse" ADD COLUMN "consigner" varchar(32);--> statement-breakpoint
ALTER TABLE "warehouse" ADD COLUMN "origin" varchar(32);--> statement-breakpoint
ALTER TABLE "warehouse" ADD COLUMN "destination" varchar(32);--> statement-breakpoint
ALTER TABLE "warehouse" ADD COLUMN "comments" text;
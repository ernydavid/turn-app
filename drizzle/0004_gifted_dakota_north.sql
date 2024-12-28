CREATE TABLE IF NOT EXISTS "turns" (
	"id" serial NOT NULL,
	"name" varchar(32),
	"token" uuid PRIMARY KEY DEFAULT random_uuid_v4() NOT NULL,
	"status" text,
	"created" timestamp
);

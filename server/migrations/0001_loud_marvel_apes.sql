CREATE TABLE "user_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"address" text NOT NULL,
	"total_carbon_saved" text DEFAULT '0' NOT NULL,
	"saplings" text DEFAULT '0' NOT NULL,
	"trees_planted" text DEFAULT '0' NOT NULL,
	"trees_data" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"eco_purchases" text DEFAULT '0',
	"rank" text DEFAULT '1' NOT NULL,
	"achievements" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rewards" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
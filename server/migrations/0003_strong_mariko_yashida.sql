CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"products" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"shipping_amount" text DEFAULT '0' NOT NULL,
	"sapling" text DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "group_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"lat" text NOT NULL,
	"lng" text NOT NULL,
	"pin_code" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_orders" ADD CONSTRAINT "group_orders_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
CREATE TABLE "group_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"orderIds" jsonb DEFAULT '[]'::jsonb,
	"lat" jsonb DEFAULT '[]'::jsonb ,
	"lng" jsonb DEFAULT '[]'::jsonb ,
	"pin_code" text 
);
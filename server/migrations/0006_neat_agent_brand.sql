ALTER TABLE "products" ADD COLUMN "metrics" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "certifications" jsonb DEFAULT '[]'::jsonb;
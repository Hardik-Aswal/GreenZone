ALTER TABLE "group_orders" RENAME COLUMN "order_id" TO "orderIds";--> statement-breakpoint
ALTER TABLE "group_orders" DROP CONSTRAINT "group_orders_order_id_orders_id_fk";

import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { orders } from "./order";


export const groupOrders = pgTable("group_orders", {
    id : uuid("id").primaryKey().defaultRandom(),
    orderIds : jsonb("orderIds"),
    lat : jsonb("lat").notNull(),
    lng : jsonb("lng").notNull(),
    pin_code : text("pin_code").notNull(),
})
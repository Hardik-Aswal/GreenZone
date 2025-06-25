import { jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { userProfile } from "./userProfile"




export const orders = pgTable("orders", {
    id : uuid("id").primaryKey().defaultRandom(),
    userId : uuid("user_id").references(() => userProfile.id, { onDelete: "cascade" }),
    products : jsonb("products").notNull().default([]),
    shippingAmount : text("shipping_amount").notNull().default("0"),
    saplingGained : text("sapling").notNull().default("0"),


})


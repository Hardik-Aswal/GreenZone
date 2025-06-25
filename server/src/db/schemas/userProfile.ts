import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";




export const userProfile = pgTable("user_profile", {
    id : uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    address : text("address").notNull(),
    pincode : text("pincode"),
    totalCarbonSaved : text("total_carbon_saved").notNull().default("0"),
    saplings : text("saplings").notNull().default("0"),
    treesPlanted : text("trees_planted").notNull().default("0"),
    treesData : jsonb("trees_data").notNull().default([]),
    ecoPurchases : text("eco_purchases").default("0"),
    rank : text("rank").notNull().default("1"),
    achievements : jsonb("achievements").notNull().default([]),
    rewards : jsonb("rewards").notNull().default([]),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()

});
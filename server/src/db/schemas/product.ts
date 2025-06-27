import { pgTable, uuid, text, numeric, boolean, timestamp, integer, json, jsonb } from "drizzle-orm/pg-core";
import { packagingTypes } from "./packagingTypes";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { reviews } from "./review";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  brand: text("brand"),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }).notNull(),
  discount: numeric("discount", { precision: 5, scale: 2 }).notNull().default("0"),

  // imageUrl: text('image_url'),
  description: text("description"),
  images: text("images").array().notNull().default([]),
  features: text("features").array().notNull().default([]),
  specifications: json("specifications").notNull(),
  category1: text("category1").notNull(),
  category2: text("category2").notNull(),
  sector: text("sector").notNull(),

  material1: text("material1").notNull(),
  material2: text("material2").notNull(),
  weight: numeric("weight", { precision: 10, scale: 2 }).notNull(),

  inStock: integer("in_stock").notNull().default(0),

  carbonImpact: numeric("carbon_impact", { precision: 10, scale: 2 }).notNull(),

  packagingTypeId: uuid("packaging_type_id")
    .notNull()
    .references(() => packagingTypes.id, { onDelete: "cascade" }),

  ecoTags: text("eco_tags").array().notNull(),
  metrics : jsonb("metrics").default([]),
  certifications: jsonb("certifications").default([]),

  supportsEcoPackaging: boolean("supports_eco_packaging").notNull().default(false),
  deliveryType: text("delivery_type").array().notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  sellerId: uuid("seller_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
export const productRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));

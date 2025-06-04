
import {
  pgTable,
  uuid,
  text,
  numeric,
  boolean,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';
import { packagingTypes } from './packagingTypes';
import { users } from './users';


export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(), 
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),

  imageUrl: text('image_url'),
  brand: text('brand'),
  category: text('category'),

  inStock: integer('in_stock').notNull().default(0),

  carbonImpact: numeric('carbon_impact', { precision: 10, scale: 2 }).notNull(), 

  packagingTypeId: uuid('packaging_type_id')
    .notNull()
    .references(() => packagingTypes.id, { onDelete: 'cascade' }), 

  ecoTags: text('eco_tags').array().notNull(), 

  supportsEcoPackaging: boolean('supports_eco_packaging').notNull().default(false),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  sellerId : uuid('seller_id').notNull().references(() => users.id, { onDelete: 'cascade' }), 
});

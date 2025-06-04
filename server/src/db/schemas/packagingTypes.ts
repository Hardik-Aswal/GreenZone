import { pgTable, uuid, text, numeric } from 'drizzle-orm/pg-core';

export const packagingTypes = pgTable('packaging_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  packagingScore: numeric('packaging_score').notNull(), 
});
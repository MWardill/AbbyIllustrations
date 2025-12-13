import { text, date, timestamp, integer, pgSchema } from 'drizzle-orm/pg-core';

export const appSchema = pgSchema('app');

export const imageMetadata = appSchema.table('image_metadata', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pathname: text().notNull().unique(),
  alt: text().notNull(),
  about: text(),
  createdDate: date('created_date'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
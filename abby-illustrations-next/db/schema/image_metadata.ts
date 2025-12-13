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

export const imageGalleries = appSchema.table('image_galleries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  galleryTitle: text('gallery_title').notNull().unique(),
  galleryDescription: text('gallery_description').notNull(),
});

export const imageGalleriesImages = appSchema.table('image_galleries_images', {
  galleryId: integer('gallery_id').notNull(),
  imageId: integer('image_id').notNull(),
});
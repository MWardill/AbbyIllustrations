import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
export { imageMetadata, imageGalleries, imageGalleriesImages } from './schema/image_metadata';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

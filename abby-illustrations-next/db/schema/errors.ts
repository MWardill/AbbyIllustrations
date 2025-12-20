import { pgTable, serial, text, jsonb, varchar, timestamp } from 'drizzle-orm/pg-core';

export const errorLogs = pgTable('error_logs', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  stackTrace: text('stack_trace'),
  context: jsonb('context'),
  severity: varchar('severity', { length: 20 }).default('ERROR'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

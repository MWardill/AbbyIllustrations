import { db, errorLogs } from '../index';

export type ErrorSeverity = 'ERROR' | 'WARNING' | 'INFO' | 'CRITICAL';

export async function logError(
  message: string,
  options: {
    stackTrace?: string;
    context?: Record<string, unknown>;
    severity?: ErrorSeverity;
  } = {}
) {
  try {
    return await db.insert(errorLogs).values({
      message,
      stackTrace: options.stackTrace,
      context: options.context,
      severity: options.severity ?? 'ERROR',
    }).returning();
  } catch (e) {
    // Fallback to console if database logging fails to prevent infinite loops or silent failures
    console.error('Failed to log error to database:', e);
    console.error('Original error details:', { message, ...options });
    return null;
  }
}

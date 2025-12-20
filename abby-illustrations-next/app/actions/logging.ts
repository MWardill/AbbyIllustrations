'use server';

import { logError } from '../../db/queries/errorLogging';

export async function logErrorToDb(message: string, stackTrace?: string, context?: Record<string, unknown>) {
  await logError(message, {
    stackTrace,
    context,
    severity: 'ERROR',
  });
}

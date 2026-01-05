'use server';

import { logError } from '../../db/queries/errorLogging';

export async function logErrorToDb(message: string, stackTrace?: string, context?: Record<string, unknown>) {
  await logError(message, {
    stackTrace,
    context,
    severity: 'ERROR',
  });
}

export async function logErrorObjectToDb(error: unknown, userMessage: string) {
  const stack = error instanceof Error ? error.stack : undefined;

  const context = {
    userMessage,
    rawError:
      typeof error === 'object' && error !== null
        ? JSON.stringify(error, Object.getOwnPropertyNames(error))
        : String(error),
  };

  const errorMessage = error instanceof Error ? error.message : String(error);

  await logErrorToDb(errorMessage || userMessage, stack, context);
}

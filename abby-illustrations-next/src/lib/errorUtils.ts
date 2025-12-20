import { toast } from "sonner";
import { logErrorToDb } from "../../app/actions/logging";

export function getErrorMessage(error: unknown): string | null {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return null;
}

export function handleError(error: unknown, userMessage = "An unexpected error occurred") {
  const err = getErrorMessage(error);
  toast.error(err || userMessage);  
  console.error(userMessage); 
  console.error(error);
  
  const stack = error instanceof Error ? error.stack : undefined;
  // Avoid passing the full error object as context if it's complex, 
  // but for now let's try to capture what we can.
  // We'll just pass a simple context object.
  const context = { 
    userMessage,
    rawError: typeof error === 'object' ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : String(error)
  };

  logErrorToDb(err || userMessage, stack, context).catch(console.error);
}
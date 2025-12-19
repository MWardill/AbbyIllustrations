import { toast } from "sonner";

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
}
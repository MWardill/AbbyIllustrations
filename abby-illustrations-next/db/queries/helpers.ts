function hasMessage(x: unknown): x is { message: string } {
    if (typeof x !== "object" || x === null) return false;
    if (!("message" in x)) return false;

    const msg = (x as Record<string, unknown>).message;
    return typeof msg === "string";
}

export function getDuplicateErrorMessage(error: unknown): string | null {
    if (error instanceof Error) {
        const cause = error.cause;

        if (hasMessage(cause) && cause.message.includes('duplicate key') || error.message.includes('unique constraint')) {
            return 'An item with this title already exists';
        }
    }
    return null;
}



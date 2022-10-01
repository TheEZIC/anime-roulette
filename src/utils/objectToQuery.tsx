export const objectToQuery = (object: Record<string, string>) => new URLSearchParams(object).toString();

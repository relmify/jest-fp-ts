/**
 * Type guard that returns true if the received value is an Error object,
 * false otherwise.
 */
export const isError = (received: unknown): received is Error => received instanceof Error;

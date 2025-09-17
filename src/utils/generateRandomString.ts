/**
 * Generates a cryptographically secure random string
 * @param length - The length of the string to generate
 * @returns A random string of the specified length
 */
export function generateRandomString(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
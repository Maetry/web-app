/**
 * Checks if a token has expired based on the expiration timestamp
 * @param expiresAt - Unix timestamp when the token expires
 * @returns true if the token has expired, false otherwise
 */
export function isTokenExpired(expiresAt: number): boolean {
  const now = Date.now();
  const bufferTime = 60000; // 1 minute buffer before actual expiration
  return now >= expiresAt - bufferTime;
}
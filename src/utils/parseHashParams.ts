/**
 * Parses URL hash parameters into an object
 * @param hash - The URL hash string (with or without #)
 * @returns An object containing the parsed parameters
 */
export function parseHashParams(hash: string): Record<string, string> {
  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
  
  if (!cleanHash) {
    return {};
  }
  
  return Object.fromEntries(new URLSearchParams(cleanHash).entries());
}
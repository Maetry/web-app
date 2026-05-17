import type { AuthResponsesSuccessAuth } from '@/services/maestri/api-generated';

import type { TokenResponse } from './auth.types';

// Provider SDKs are loaded from their official CDNs at runtime (chosen
// integration: Google Identity Services + Sign in with Apple JS — no
// full-page OAuth redirect).
export const GOOGLE_GSI_SRC = 'https://accounts.google.com/gsi/client';
export const APPLE_JS_SRC =
  'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

export const getGoogleClientId = (): string =>
  process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID?.trim() ?? '';

export const getAppleClientId = (): string =>
  process.env.NEXT_PUBLIC_APPLE_OAUTH_CLIENT_ID?.trim() ?? '';

export const getAppUrl = (): string =>
  process.env.NEXT_PUBLIC_APP_URL?.trim() ||
  (typeof window !== 'undefined' ? window.location.origin : '');

const scriptPromises = new Map<string, Promise<void>>();

/** Inject a third-party SDK `<script>` once; resolves when it has loaded. */
export function loadScript(src: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('loadScript called on the server'));
  }
  const existing = scriptPromises.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.defer = true;
    el.onload = () => resolve();
    el.onerror = () => {
      scriptPromises.delete(src);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(el);
  });

  scriptPromises.set(src, promise);
  return promise;
}

/** Decode a JWT payload (base64url JSON). Returns null on malformed input. */
export function decodeJwt<T = Record<string, unknown>>(token: string): T | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * The API returns tokens as `{ value, expiration: ISO-8601 }`; `authStorage`
 * expects `{ value, expiresIn: seconds }`. Convert relative to now.
 */
export function mapAuthTokens(res: AuthResponsesSuccessAuth): TokenResponse {
  const toExpiresIn = (expiration?: string): number | undefined =>
    expiration
      ? Math.max(0, Math.floor((new Date(expiration).getTime() - Date.now()) / 1000))
      : undefined;

  return {
    accessToken: {
      value: res.accessToken.value,
      expiresIn: toExpiresIn(res.accessToken.expiration),
    },
    refreshToken: {
      value: res.refreshToken.value,
      expiresIn: toExpiresIn(res.refreshToken.expiration),
    },
  };
}

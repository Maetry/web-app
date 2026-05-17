'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  usePostAuthAppleMutation,
  usePostAuthGoogleMutation,
} from '@/services/maestri/api-generated';
import { Path } from '@/router/paths';

import { authStorage } from './auth.storage';
import { decodeJwt, mapAuthTokens } from './oauth';
import type { TokenResponse } from './auth.types';

export type AuthStatus = 'idle' | 'pending' | 'authenticated' | 'error';

export interface AppleIdentity {
  token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const GENERIC_ERROR = 'Не удалось войти. Попробуйте ещё раз.';

/** Pull a human-readable message out of an RTK Query error payload. */
function extractApiMessage(err: unknown): string | null {
  if (err && typeof err === 'object' && 'data' in err) {
    const data = (err as { data?: unknown }).data;
    if (data && typeof data === 'object') {
      // ApiError schema uses `message`; the running backend also returns `reason`.
      const body = data as { message?: unknown; reason?: unknown };
      if (typeof body.message === 'string' && body.message) return body.message;
      if (typeof body.reason === 'string' && body.reason) return body.reason;
    }
  }
  return null;
}

/**
 * Exchange a provider ID token for Maestri access/refresh tokens.
 *
 * Google and Apple are the only auth methods the API exposes; both endpoints
 * also provision the account on first login, so sign-in and sign-up are a
 * single flow (one page, no separate registration).
 */
export function useAuthSession() {
  const router = useRouter();
  const [googleAuth] = usePostAuthGoogleMutation();
  const [appleAuth] = usePostAuthAppleMutation();
  const [status, setStatus] = useState<AuthStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  // The base query attaches `Device-ID` to every request; ensure it exists
  // before the first auth call (the backend rejects requests without it).
  useEffect(() => {
    authStorage.initializeDeviceId();
  }, []);

  const finish = useCallback(
    (tokens: TokenResponse) => {
      authStorage.setTokens(tokens);
      setError(null);
      setStatus('authenticated');
      router.replace(Path.Home);
    },
    [router],
  );

  const fail = useCallback((err: unknown) => {
    setStatus('error');
    setError(extractApiMessage(err) ?? GENERIC_ERROR);
  }, []);

  const signInWithGoogle = useCallback(
    async (credential: string) => {
      setStatus('pending');
      setError(null);
      try {
        const claims = decodeJwt<{ given_name?: string; family_name?: string }>(credential);
        const res = await googleAuth({
          authParametersGoogleToken: {
            token: credential,
            firstName: claims?.given_name,
            lastName: claims?.family_name,
          },
        }).unwrap();
        finish(mapAuthTokens(res));
      } catch (err) {
        fail(err);
      }
    },
    [googleAuth, finish, fail],
  );

  const signInWithApple = useCallback(
    async (identity: AppleIdentity) => {
      setStatus('pending');
      setError(null);
      try {
        // Apple only returns the email/name on the first login; the email is
        // also embedded in the ID token, so fall back to its claims.
        const claims = decodeJwt<{ email?: string; email_verified?: boolean | string }>(
          identity.token,
        );
        const emailVerified =
          typeof claims?.email_verified === 'string'
            ? claims.email_verified === 'true'
            : claims?.email_verified;
        const res = await appleAuth({
          authParametersAppleToken: {
            token: identity.token,
            email: identity.email ?? claims?.email,
            emailVerified,
            firstName: identity.firstName,
            lastName: identity.lastName,
          },
        }).unwrap();
        finish(mapAuthTokens(res));
      } catch (err) {
        fail(err);
      }
    },
    [appleAuth, finish, fail],
  );

  return { status, error, signInWithGoogle, signInWithApple };
}

/**
 * Log out: invalidate the refresh token server-side, then clear local tokens.
 *
 * `/v1/auth/logout` authenticates with the *refresh* token, but the shared
 * base query authorizes with the access/employee token — so this endpoint
 * cannot go through the generated mutation. A dedicated fetch with the
 * refresh token keeps the API contract intact without touching the preserved
 * base query. Local cleanup runs regardless of the network result.
 */
export function useLogout() {
  const router = useRouter();

  return useCallback(async () => {
    const refreshToken = authStorage.getRefreshToken();
    const deviceId = authStorage.getDeviceId();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (refreshToken && baseUrl) {
      try {
        await fetch(`${baseUrl}/v1/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            ...(deviceId ? { 'Device-ID': deviceId } : {}),
          },
        });
      } catch {
        // Best effort — fall through to local cleanup.
      }
    }

    authStorage.clearTokens();
    router.replace(Path.Auth);
  }, [router]);
}

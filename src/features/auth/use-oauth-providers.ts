'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  APPLE_JS_SRC,
  GOOGLE_GSI_SRC,
  getAppUrl,
  getAppleClientId,
  getGoogleClientId,
  loadScript,
} from './oauth';

export interface AppleSignInResult {
  token: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

/**
 * Google Identity Services. Loads the GSI SDK, initializes it, and renders
 * Google's official button into a host element; the ID token arrives via the
 * JS callback (no full-page redirect).
 */
export function useGoogleSignIn(onCredential: (credential: string) => void) {
  const clientId = getGoogleClientId();
  const available = clientId.length > 0;
  const [ready, setReady] = useState(false);

  // Keep the latest callback without re-initializing the SDK.
  const onCredentialRef = useRef(onCredential);
  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!available) return;
    let cancelled = false;

    loadScript(GOOGLE_GSI_SRC)
      .then(() => {
        if (cancelled || !window.google) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: ({ credential }) => onCredentialRef.current(credential),
          use_fedcm_for_prompt: true,
        });
        setReady(true);
      })
      .catch(() => {
        // `ready` stays false; the page shows the unavailable state.
      });

    return () => {
      cancelled = true;
    };
  }, [available, clientId]);

  const renderButton = useCallback(
    (el: HTMLElement | null) => {
      if (!el || !ready || !window.google) return;
      el.replaceChildren();
      window.google.accounts.id.renderButton(el, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'left',
        width: 320,
      });
    },
    [ready],
  );

  return { available, ready, renderButton };
}

/**
 * Sign in with Apple JS in popup mode — returns the ID token (and, on the
 * first login only, the user's name/email) without a full-page redirect.
 */
export function useAppleSignIn() {
  const clientId = getAppleClientId();
  const available = clientId.length > 0;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!available) return;
    let cancelled = false;

    loadScript(APPLE_JS_SRC)
      .then(() => {
        if (cancelled || !window.AppleID) return;
        window.AppleID.auth.init({
          clientId,
          scope: 'name email',
          redirectURI: `${getAppUrl()}/auth`,
          usePopup: true,
        });
        setReady(true);
      })
      .catch(() => {
        // `ready` stays false; the page shows the unavailable state.
      });

    return () => {
      cancelled = true;
    };
  }, [available, clientId]);

  const signIn = useCallback(async (): Promise<AppleSignInResult> => {
    if (!window.AppleID) throw new Error('Apple sign-in SDK is not loaded');
    const res = await window.AppleID.auth.signIn();
    return {
      token: res.authorization.id_token,
      firstName: res.user?.name?.firstName,
      lastName: res.user?.name?.lastName,
      email: res.user?.email,
    };
  }, []);

  return { available, ready, signIn };
}

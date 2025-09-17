import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUsersQuery, usePostAuthGoogleMutation } from '@/services/maestri/api-generated';
import { authStorage } from './auth.storage';
import { parseOAuthCallback, handleAuthError, isAuthError, generateGoogleOAuthUrl } from './auth.utils';
import { AUTH_ROUTES } from './auth.constants';
import { AuthState, AuthError, TokenResponseSchema } from './auth.types';

/**
 * Hook for managing authentication state
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
    user: null,
  });

  useEffect(() => {
    // Initialize device ID on mount
    authStorage.initializeDeviceId();
    
    // Check initial auth state
    const hasAuth = authStorage.hasValidAuth();
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: hasAuth,
      isLoading: false,
    }));
  }, []);

  const logout = useCallback(() => {
    authStorage.clearTokens();
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      error: null,
      user: null,
    });
  }, []);

  return {
    ...authState,
    logout,
  };
}

/**
 * Hook for auth gate functionality (redirect based on auth status)
 */
export function useAuthGate() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [hasToken, setHasToken] = useState(false);
  
  // Check for token on mount
  useEffect(() => {
    const tokenExists = authStorage.hasValidAuth();
    setHasToken(tokenExists);
    
    // If no token, redirect immediately
    if (!tokenExists) {
      router.push(AUTH_ROUTES.LOGIN);
      setIsChecking(false);
    }
  }, [router]);

  // Use RTK Query to validate token
  const { data, error: apiError, isLoading } = useGetUsersQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    // Skip if no token (already handled above)
    if (!hasToken) {
      return;
    }

    // Wait for API response
    if (isLoading) {
      return;
    }

    // Handle API errors
    if (apiError) {
      const authError = handleAuthError(apiError);
      setError(authError);
      
      // Only clear tokens and redirect on auth errors
      if (isAuthError(apiError)) {
        authStorage.clearTokens();
        router.push(AUTH_ROUTES.LOGIN);
      }
      setIsChecking(false);
      return;
    }

    // If we have valid user data, redirect to dashboard
    if (data) {
      router.push(AUTH_ROUTES.DASHBOARD);
      setIsChecking(false);
    }
  }, [hasToken, data, apiError, isLoading, router]);

  return {
    isChecking,
    error,
  };
}

/**
 * Hook for handling OAuth callback
 */
export function useOAuthCallback() {
  const router = useRouter();
  const [googleLogin] = usePostAuthGoogleMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const processCallback = useCallback(async (hash: string) => {
    // Parse and validate OAuth parameters
    const { params, error: parseError } = parseOAuthCallback(hash);
    
    if (parseError) {
      setError(parseError);
      return;
    }

    if (!params?.id_token) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();

    try {
      const response = await googleLogin({
        authParametersGoogleToken: {
          token: params.id_token,
        },
      }).unwrap();

      // Validate response with Zod
      const tokens = TokenResponseSchema.parse(response);
      
      // Store tokens
      authStorage.setTokens(tokens);
      
      // Redirect to dashboard
      router.push(AUTH_ROUTES.DASHBOARD);
    } catch (err) {
      const authError = handleAuthError(err);
      setError(authError);
      setIsProcessing(false);
    }
  }, [googleLogin, router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    processCallback,
    isProcessing,
    error,
  };
}

/**
 * Hook for generating OAuth URLs
 */
export function useOAuthUrls() {
  const getGoogleUrl = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!clientId || !appUrl) {
      return '';
    }

    return generateGoogleOAuthUrl({
      clientId,
      redirectUri: `${appUrl}/auth`,
      responseType: 'id_token',
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
    });
  }, []);

  return {
    getGoogleUrl,
  };
}
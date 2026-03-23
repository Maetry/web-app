import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUsersQuery, usePostAuthGoogleMutation, usePostAuthAppleMutation } from '@/services/maestri/api-generated';
import { authStorage } from './auth.storage';
import { parseOAuthCallback, handleAuthError, isAuthError, generateGoogleOAuthUrl, generateAppleOAuthUrl } from './auth.utils';
import { AUTH_ROUTES, STORAGE_KEYS } from './auth.constants';
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
  const [appleLogin] = usePostAuthAppleMutation();
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
      // Determine provider from stored state
      const storedProvider = localStorage.getItem(`${STORAGE_KEYS.OAUTH_STATE}_provider`);
      const storedState = localStorage.getItem(`${STORAGE_KEYS.OAUTH_STATE}_value`);
      
      // Validate state for Apple (security check)
      if (storedProvider === 'apple' && params.state) {
        if (params.state !== storedState) {
          setError({
            code: 'INVALID_STATE',
            message: 'Недействительный запрос авторизации.',
          });
          setIsProcessing(false);
          return;
        }
      }
      
      let response;
      
      if (storedProvider === 'apple') {
        // Parse user info from Apple id_token if available
        // Apple may include user info in the first request
        const userInfo = parseAppleUserInfo(params.id_token);
        
        response = await appleLogin({
          authParametersAppleToken: {
            token: params.id_token,
            email: userInfo?.email,
            emailVerified: userInfo?.email_verified,
            firstName: userInfo?.given_name,
            lastName: userInfo?.family_name,
          },
        }).unwrap();
      } else {
        // Default to Google
        response = await googleLogin({
          authParametersGoogleToken: {
            token: params.id_token,
          },
        }).unwrap();
      }

      // Clear stored provider and state
      localStorage.removeItem(`${STORAGE_KEYS.OAUTH_STATE}_provider`);
      localStorage.removeItem(`${STORAGE_KEYS.OAUTH_STATE}_value`);

      // Convert API response to TokenResponse format
      // API returns { accessToken: { value, expiration }, refreshToken: { value, expiration } }
      // We need { accessToken: { value, expiresIn }, refreshToken: { value, expiresIn } }
      const tokens: TokenResponse = {
        accessToken: {
          value: response.accessToken.value,
          expiresIn: response.accessToken.expiration
            ? Math.floor((new Date(response.accessToken.expiration).getTime() - Date.now()) / 1000)
            : undefined,
        },
        refreshToken: {
          value: response.refreshToken.value,
          expiresIn: response.refreshToken.expiration
            ? Math.floor((new Date(response.refreshToken.expiration).getTime() - Date.now()) / 1000)
            : undefined,
        },
      };
      
      // Validate response with Zod
      TokenResponseSchema.parse(tokens);
      
      // Store tokens
      authStorage.setTokens(tokens);
      
      // Redirect to dashboard
      router.push(AUTH_ROUTES.DASHBOARD);
    } catch (err) {
      const authError = handleAuthError(err);
      setError(authError);
      setIsProcessing(false);
    }
  }, [googleLogin, appleLogin, router]);

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
 * Parse Apple user info from id_token (JWT payload)
 */
function parseAppleUserInfo(idToken: string): {
  email?: string;
  email_verified?: boolean;
  given_name?: string;
  family_name?: string;
} | null {
  try {
    // JWT format: header.payload.signature
    const parts = idToken.split('.');
    if (parts.length !== 3) return null;
    
    // Decode base64url payload
    const payload = parts[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    );
    
    return {
      email: decoded.email,
      email_verified: decoded.email_verified,
      given_name: decoded.given_name,
      family_name: decoded.family_name,
    };
  } catch {
    return null;
  }
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

  const getAppleUrl = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_APPLE_OAUTH_CLIENT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!clientId || !appUrl) {
      return '';
    }

    // Generate state for security
    const state = crypto.randomUUID();
    
    // Store provider in localStorage to identify it in callback
    localStorage.setItem(`${STORAGE_KEYS.OAUTH_STATE}_provider`, 'apple');
    localStorage.setItem(`${STORAGE_KEYS.OAUTH_STATE}_value`, state);

    return generateAppleOAuthUrl({
      clientId,
      redirectUri: `${appUrl}/auth`,
      scope: 'name email',
      responseType: 'code id_token',
      state,
    });
  }, []);

  return {
    getGoogleUrl,
    getAppleUrl,
  };
}
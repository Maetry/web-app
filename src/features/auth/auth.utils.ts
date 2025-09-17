import { parseHashParams } from '@/utils/parseHashParams';
import { OAuthCallbackParams, OAuthCallbackParamsSchema, AuthError, OAuthConfig } from './auth.types';
import { OAUTH_ENDPOINTS, OAUTH_SCOPES, AUTH_ERROR_MESSAGES } from './auth.constants';

/**
 * Generate Google OAuth URL (without state for simplicity with implicit flow)
 */
export function generateGoogleOAuthUrl(config: OAuthConfig): string {
  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: config.responseType,
    scope: config.scope || OAUTH_SCOPES.GOOGLE,
    redirect_uri: config.redirectUri,
  });

  return `${OAUTH_ENDPOINTS.GOOGLE}?${params.toString()}`;
}

/**
 * Parse and validate OAuth callback parameters
 */
export function parseOAuthCallback(hash: string): {
  params: OAuthCallbackParams | null;
  error: AuthError | null;
} {
  try {
    const rawParams = parseHashParams(hash);
    
    // Check for OAuth error response
    if (rawParams.error) {
      return {
        params: null,
        error: {
          code: 'OAUTH_ERROR',
          message: rawParams.error_description || AUTH_ERROR_MESSAGES.OAUTH_ERROR,
        },
      };
    }

    // Validate parameters with Zod
    const params = OAuthCallbackParamsSchema.parse(rawParams);

    return { params, error: null };
  } catch {
    return {
      params: null,
      error: {
        code: 'OAUTH_ERROR',
        message: AUTH_ERROR_MESSAGES.OAUTH_ERROR,
      },
    };
  }
}

/**
 * Handle authentication errors
 */
export function handleAuthError(error: unknown): AuthError {
  // Check for RTK Query error structure
  if (error && typeof error === 'object' && 'status' in error) {
    const rtkError = error as { status: number; data?: unknown };
    
    if (rtkError.status === 401 || rtkError.status === 403) {
      return {
        code: 'INVALID_TOKEN',
        message: AUTH_ERROR_MESSAGES.INVALID_TOKEN,
        status: rtkError.status,
      };
    }
    
    if (rtkError.status >= 500) {
      return {
        code: 'NETWORK_ERROR',
        message: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
        status: rtkError.status,
      };
    }
  }

  // Default error
  return {
    code: 'NETWORK_ERROR',
    message: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
  };
}

/**
 * Check if error is an authentication error (401/403)
 */
export function isAuthError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  
  if ('status' in error) {
    const status = (error as { status: number }).status;
    return status === 401 || status === 403;
  }
  
  if ('code' in error) {
    const code = (error as { code: string }).code;
    return code === 'INVALID_TOKEN' || code === 'EXPIRED_TOKEN';
  }
  
  return false;
}
import { v4 as uuidv4 } from 'uuid';
import { StoredToken, StoredTokenSchema, TokenResponse, EmployeeToken } from './auth.types';
import { STORAGE_KEYS, TOKEN_EXPIRY } from './auth.constants';
import { isTokenExpired } from '@/utils/isTokenExpired';

/**
 * Auth storage module for managing tokens and device ID
 */
class AuthStorage {
  private isClient = typeof window !== 'undefined';

  /**
   * Initialize device ID if not present
   */
  initializeDeviceId(): string {
    if (!this.isClient) return '';
    
    let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    }
    return deviceId;
  }

  /**
   * Get device ID
   */
  getDeviceId(): string | null {
    if (!this.isClient) return null;
    return localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
  }

  /**
   * Store tokens with expiration
   */
  setTokens(tokens: TokenResponse): void {
    if (!this.isClient) return;

    const now = Date.now();
    
    const accessToken: StoredToken = {
      value: tokens.accessToken.value,
      expiresAt: now + (tokens.accessToken.expiresIn || TOKEN_EXPIRY.ACCESS_TOKEN) * 1000,
    };

    const refreshToken: StoredToken = {
      value: tokens.refreshToken.value,
      expiresAt: now + (tokens.refreshToken.expiresIn || TOKEN_EXPIRY.REFRESH_TOKEN) * 1000,
    };

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(accessToken));
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, JSON.stringify(refreshToken));
  }

  /**
   * Get access token if valid
   */
  getAccessToken(): string | null {
    if (!this.isClient) return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (!stored) return null;

      const token = StoredTokenSchema.parse(JSON.parse(stored));
      
      if (isTokenExpired(token.expiresAt)) {
        this.clearTokens();
        return null;
      }

      return token.value;
    } catch {
      this.clearTokens();
      return null;
    }
  }

  /**
   * Get refresh token if valid
   */
  getRefreshToken(): string | null {
    if (!this.isClient) return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!stored) return null;

      const token = StoredTokenSchema.parse(JSON.parse(stored));
      
      if (isTokenExpired(token.expiresAt)) {
        this.clearTokens();
        return null;
      }

      return token.value;
    } catch {
      this.clearTokens();
      return null;
    }
  }

  /**
   * Store employee token
   */
  setEmployeeToken(token: EmployeeToken): void {
    if (!this.isClient) return;

    const now = Date.now();
    const storedToken: StoredToken = {
      value: token.value,
      expiresAt: now + (token.expiresIn || TOKEN_EXPIRY.EMPLOYEE_TOKEN) * 1000,
    };

    localStorage.setItem(STORAGE_KEYS.EMPLOYEE_TOKEN, JSON.stringify(storedToken));
  }

  /**
   * Get employee token if valid
   */
  getEmployeeToken(): string | null {
    if (!this.isClient) return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
      if (!stored) return null;

      const token = StoredTokenSchema.parse(JSON.parse(stored));
      
      if (isTokenExpired(token.expiresAt)) {
        localStorage.removeItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
        return null;
      }

      return token.value;
    } catch {
      localStorage.removeItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
      return null;
    }
  }

  /**
   * Get employee token as JSON string (for API layer compatibility)
   */
  getEmployeeTokenAsJson(): string | null {
    if (!this.isClient) return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
      if (!stored) return null;

      const token = StoredTokenSchema.parse(JSON.parse(stored));
      
      if (isTokenExpired(token.expiresAt)) {
        localStorage.removeItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
        return null;
      }

      // Return in the format the API expects
      return JSON.stringify({ value: token.value });
    } catch {
      localStorage.removeItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
      return null;
    }
  }

  /**
   * Get access token as JSON string (for API layer compatibility)
   */
  getAccessTokenAsJson(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    // Return in the format the API expects
    return JSON.stringify({ value: token });
  }

  /**
   * Clear all auth tokens
   */
  clearTokens(): void {
    if (!this.isClient) return;
    
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.EMPLOYEE_TOKEN);
  }

  /**
   * Store OAuth state for CSRF protection
   */
  setOAuthState(state: string): void {
    if (!this.isClient) return;
    
    sessionStorage.setItem(STORAGE_KEYS.OAUTH_STATE, state);
  }

  /**
   * Get and clear OAuth state
   */
  getAndClearOAuthState(): string | null {
    if (!this.isClient) return null;
    
    const state = sessionStorage.getItem(STORAGE_KEYS.OAUTH_STATE);
    sessionStorage.removeItem(STORAGE_KEYS.OAUTH_STATE);
    return state;
  }

  /**
   * Check if user has valid authentication
   */
  hasValidAuth(): boolean {
    return this.getAccessToken() !== null || this.getEmployeeToken() !== null;
  }
}

export const authStorage = new AuthStorage();
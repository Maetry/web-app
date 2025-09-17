import { z } from 'zod';

// Zod Schemas
export const OAuthCallbackParamsSchema = z.object({
  id_token: z.string().min(1, 'ID token is required'),
  state: z.string().optional(),
  error: z.string().optional(),
  error_description: z.string().optional(),
});

export const TokenResponseSchema = z.object({
  accessToken: z.object({
    value: z.string().min(1),
    expiresIn: z.number().optional(),
  }),
  refreshToken: z.object({
    value: z.string().min(1),
    expiresIn: z.number().optional(),
  }),
});

export const AuthStateSchema = z.object({
  isAuthenticated: z.boolean(),
  isLoading: z.boolean(),
  error: z.string().nullable(),
  user: z
    .object({
      id: z.string(),
      email: z.string().email().optional(),
      name: z.string().optional(),
    })
    .nullable(),
});

export const StoredTokenSchema = z.object({
  value: z.string().min(1),
  expiresAt: z.number(), // Unix timestamp
});

export const EmployeeTokenSchema = z.object({
  value: z.string().min(1),
  expiresIn: z.number().optional(),
});

export const CredentialsSetSchema = z.object({
  employeeToken: EmployeeTokenSchema,
  permissions: z.array(z.string()).optional(),
});

// TypeScript Types (inferred from Zod schemas)
export type OAuthCallbackParams = z.infer<typeof OAuthCallbackParamsSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type AuthState = z.infer<typeof AuthStateSchema>;
export type StoredToken = z.infer<typeof StoredTokenSchema>;
export type EmployeeToken = z.infer<typeof EmployeeTokenSchema>;
export type CredentialsSet = z.infer<typeof CredentialsSetSchema>;

// Error types
export interface AuthError {
  code: 'INVALID_TOKEN' | 'EXPIRED_TOKEN' | 'NETWORK_ERROR' | 'INVALID_STATE' | 'OAUTH_ERROR';
  message: string;
  status?: number;
}

// OAuth configuration
export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: string;
}
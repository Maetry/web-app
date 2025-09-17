// Token expiration times (in seconds)
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 3600, // 1 hour default if not provided by API
  REFRESH_TOKEN: 2592000, // 30 days default if not provided by API
  EMPLOYEE_TOKEN: 86400, // 24 hours default if not provided by API
} as const;

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  EMPLOYEE_TOKEN: 'employeeToken',
  DEVICE_ID: 'did',
  OAUTH_STATE: 'oauthState',
} as const;

// OAuth endpoints
export const OAUTH_ENDPOINTS = {
  GOOGLE: 'https://accounts.google.com/o/oauth2/auth',
  APPLE: 'https://appleid.apple.com/auth/authorize',
} as const;

// OAuth scopes
export const OAUTH_SCOPES = {
  GOOGLE: 'https://www.googleapis.com/auth/userinfo.profile',
  APPLE: 'name email',
} as const;

// Routes
export const AUTH_ROUTES = {
  LOGIN: '/auth',
  HOME: '/',
  DASHBOARD: '/schedule',
} as const;

// Error messages
export const AUTH_ERROR_MESSAGES = {
  INVALID_TOKEN: 'Ваша сессия истекла. Пожалуйста, войдите снова.',
  NETWORK_ERROR: 'Ошибка сети. Пожалуйста, проверьте подключение.',
  OAUTH_ERROR: 'Ошибка авторизации. Пожалуйста, попробуйте снова.',
  INVALID_STATE: 'Недействительный запрос авторизации.',
} as const;
// Ambient types for the third-party auth SDKs loaded at runtime from their
// CDNs (see `oauth.ts`): Google Identity Services and Sign in with Apple JS.
// These augment the global `Window`; no import/export keeps the file ambient.

interface GoogleIdConfiguration {
  client_id: string;
  callback: (response: { credential: string; select_by?: string }) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  use_fedcm_for_prompt?: boolean;
}

interface GoogleIdButtonOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number;
  locale?: string;
}

interface GoogleAccountsId {
  initialize(config: GoogleIdConfiguration): void;
  renderButton(parent: HTMLElement, options: GoogleIdButtonOptions): void;
  prompt(): void;
  cancel(): void;
}

interface AppleSignInConfig {
  clientId: string;
  scope: string;
  redirectURI: string;
  state?: string;
  nonce?: string;
  usePopup?: boolean;
}

interface AppleSignInResponse {
  authorization: { code: string; id_token: string; state?: string };
  user?: {
    name?: { firstName?: string; lastName?: string };
    email?: string;
  };
}

interface AppleIDAuth {
  init(config: AppleSignInConfig): void;
  signIn(config?: Partial<AppleSignInConfig>): Promise<AppleSignInResponse>;
}

interface Window {
  google?: { accounts: { id: GoogleAccountsId } };
  AppleID?: { auth: AppleIDAuth };
}

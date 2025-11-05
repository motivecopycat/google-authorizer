
// A minimal set of types for the Google Identity Services client (gsi)
// to ensure type safety in the application.

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
}

export interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: TokenResponse) => void;
  prompt?: string;
  enable_serial_consent?: boolean;
  hint?: string;
  error_callback?: (error: unknown) => void;
}

export interface GoogleTokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

export interface GoogleOAuth2 {
  initTokenClient: (config: TokenClientConfig) => GoogleTokenClient;
  revoke: (token: string, done: () => void) => void;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: GoogleOAuth2;
      };
    };
  }
}

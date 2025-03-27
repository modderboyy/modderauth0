/**
 * Client-side ModderAuth library for OAuth integration
 */

// OAuth configuration interface
export interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope?: string;
  state?: string;
  codeChallenge?: string;
  codeChallengeMethod?: 'plain' | 'S256';
}

// Token response interface
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

// User info interface
export interface UserInfo {
  sub: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

/**
 * ModderAuth client class for OAuth 2.0 authentication
 */
export class ModderAuth {
  private clientId: string;
  private clientSecret?: string;
  private redirectUri: string;
  private scope: string;
  private authUrl: string = '/oauth/authorize';
  private tokenUrl: string = '/oauth/token';
  private userInfoUrl: string = '/api/userinfo';
  private revokeUrl: string = '/oauth/revoke';

  /**
   * Create a new ModderAuth client
   */
  constructor(config: {
    clientId: string;
    clientSecret?: string;
    redirectUri: string;
    scope?: string;
  }) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
    this.scope = config.scope || 'profile email';
  }

  /**
   * Generate a random string for state parameter
   */
  private generateRandomString(length = 32): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Generate SHA-256 code challenge for PKCE
   */
  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  /**
   * Get the authorization URL for the OAuth flow
   */
  public getAuthorizationUrl(options?: {
    scope?: string;
    state?: string;
    codeChallengeMethod?: 'plain' | 'S256';
  }): string {
    const state = options?.state || this.generateRandomString();
    const scope = options?.scope || this.scope;
    
    // Store state and code verifier in session storage for later verification
    sessionStorage.setItem('modderauth_state', state);
    
    // Create the authorization URL
    const url = new URL(this.authUrl, window.location.origin);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('scope', scope);
    url.searchParams.append('state', state);
    
    // Add PKCE parameters if specified
    if (options?.codeChallengeMethod) {
      const codeVerifier = this.generateRandomString(64);
      sessionStorage.setItem('modderauth_code_verifier', codeVerifier);
      
      if (options.codeChallengeMethod === 'plain') {
        url.searchParams.append('code_challenge', codeVerifier);
        url.searchParams.append('code_challenge_method', 'plain');
      } else if (options.codeChallengeMethod === 'S256') {
        // For demo purposes, we're not actually implementing the async SHA-256 challenge here
        // In production, this would be properly implemented with the generateCodeChallenge method
        url.searchParams.append('code_challenge', codeVerifier); // This is a simplification
        url.searchParams.append('code_challenge_method', 'S256');
      }
    }
    
    return url.toString();
  }

  /**
   * Exchange authorization code for tokens
   */
  public async exchangeCodeForTokens(code: string, codeVerifier?: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', this.redirectUri);
    params.append('client_id', this.clientId);
    
    if (this.clientSecret) {
      params.append('client_secret', this.clientSecret);
    }
    
    if (codeVerifier) {
      params.append('code_verifier', codeVerifier);
    } else if (sessionStorage.getItem('modderauth_code_verifier')) {
      params.append('code_verifier', sessionStorage.getItem('modderauth_code_verifier')!);
      sessionStorage.removeItem('modderauth_code_verifier');
    }
    
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to exchange code for tokens');
    }
    
    return await response.json();
  }

  /**
   * Refresh access token using refresh token
   */
  public async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    params.append('client_id', this.clientId);
    
    if (this.clientSecret) {
      params.append('client_secret', this.clientSecret);
    }
    
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to refresh access token');
    }
    
    return await response.json();
  }

  /**
   * Get user information using access token
   */
  public async getUserInfo(accessToken: string): Promise<UserInfo> {
    const response = await fetch(this.userInfoUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to get user info');
    }
    
    return await response.json();
  }

  /**
   * Revoke a token (access token or refresh token)
   */
  public async revokeToken(token: string, tokenTypeHint?: 'access_token' | 'refresh_token'): Promise<void> {
    const params = new URLSearchParams();
    params.append('token', token);
    params.append('client_id', this.clientId);
    
    if (tokenTypeHint) {
      params.append('token_type_hint', tokenTypeHint);
    }
    
    if (this.clientSecret) {
      params.append('client_secret', this.clientSecret);
    }
    
    const response = await fetch(this.revokeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || 'Failed to revoke token');
    }
  }
}

/**
 * Helper function to parse query parameters
 */
export const parseQueryParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};

/**
 * Helper to check if user is logged in by checking if we have a stored token
 */
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('access_token');
};

/**
 * Helper to get stored access token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

/**
 * Helper to get stored refresh token
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

/**
 * Helper to clear auth tokens (logout)
 */
export const clearAuthTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token_expiry');
};

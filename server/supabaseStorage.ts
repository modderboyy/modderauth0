import { supabase, TABLES } from './supabase';
import {
  User, InsertUser,
  OAuthClient, InsertOAuthClient,
  AuthorizationCode, InsertAuthorizationCode,
  AccessToken, InsertAccessToken,
  RefreshToken, InsertRefreshToken,
  IStorage
} from './storage';

/**
 * Supabase implementation of storage interface
 */
export class SupabaseStorage implements IStorage {
  /**
   * User Management
   */
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('username', username)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }

  async createUser(user: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .insert(user)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error(`Failed to create user: ${error?.message || 'Unknown error'}`);
    }
    
    return data as User;
  }

  /**
   * OAuth Clients
   */
  async getOAuthClient(id: number): Promise<OAuthClient | undefined> {
    const { data, error } = await supabase
      .from(TABLES.OAUTH_CLIENTS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    return data as OAuthClient;
  }

  async getOAuthClientByClientId(clientId: string): Promise<OAuthClient | undefined> {
    const { data, error } = await supabase
      .from(TABLES.OAUTH_CLIENTS)
      .select('*')
      .eq('clientId', clientId)
      .single();
    
    if (error || !data) return undefined;
    return data as OAuthClient;
  }

  async createOAuthClient(client: InsertOAuthClient): Promise<OAuthClient> {
    const { data, error } = await supabase
      .from(TABLES.OAUTH_CLIENTS)
      .insert(client)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error(`Failed to create OAuth client: ${error?.message || 'Unknown error'}`);
    }
    
    return data as OAuthClient;
  }

  /**
   * Authorization Codes
   */
  async getAuthorizationCode(code: string): Promise<AuthorizationCode | undefined> {
    const { data, error } = await supabase
      .from(TABLES.AUTHORIZATION_CODES)
      .select('*')
      .eq('code', code)
      .single();
    
    if (error || !data) return undefined;
    return data as AuthorizationCode;
  }

  async createAuthorizationCode(code: InsertAuthorizationCode): Promise<AuthorizationCode> {
    const { data, error } = await supabase
      .from(TABLES.AUTHORIZATION_CODES)
      .insert(code)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error(`Failed to create authorization code: ${error?.message || 'Unknown error'}`);
    }
    
    return data as AuthorizationCode;
  }

  async deleteAuthorizationCode(code: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.AUTHORIZATION_CODES)
      .delete()
      .eq('code', code);
    
    if (error) {
      throw new Error(`Failed to delete authorization code: ${error.message}`);
    }
  }

  /**
   * Access Tokens
   */
  async getAccessToken(token: string): Promise<AccessToken | undefined> {
    const { data, error } = await supabase
      .from(TABLES.ACCESS_TOKENS)
      .select('*')
      .eq('token', token)
      .single();
    
    if (error || !data) return undefined;
    return data as AccessToken;
  }

  async createAccessToken(token: InsertAccessToken): Promise<AccessToken> {
    const { data, error } = await supabase
      .from(TABLES.ACCESS_TOKENS)
      .insert(token)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error(`Failed to create access token: ${error?.message || 'Unknown error'}`);
    }
    
    return data as AccessToken;
  }

  async deleteAccessToken(token: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.ACCESS_TOKENS)
      .delete()
      .eq('token', token);
    
    if (error) {
      throw new Error(`Failed to delete access token: ${error.message}`);
    }
  }

  /**
   * Refresh Tokens
   */
  async getRefreshToken(token: string): Promise<RefreshToken | undefined> {
    const { data, error } = await supabase
      .from(TABLES.REFRESH_TOKENS)
      .select('*')
      .eq('token', token)
      .single();
    
    if (error || !data) return undefined;
    return data as RefreshToken;
  }

  async createRefreshToken(token: InsertRefreshToken): Promise<RefreshToken> {
    const { data, error } = await supabase
      .from(TABLES.REFRESH_TOKENS)
      .insert(token)
      .select()
      .single();
    
    if (error || !data) {
      throw new Error(`Failed to create refresh token: ${error?.message || 'Unknown error'}`);
    }
    
    return data as RefreshToken;
  }

  async deleteRefreshToken(token: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.REFRESH_TOKENS)
      .delete()
      .eq('token', token);
    
    if (error) {
      throw new Error(`Failed to delete refresh token: ${error.message}`);
    }
  }

  async deleteRefreshTokenByAccessTokenId(accessTokenId: number): Promise<void> {
    const { error } = await supabase
      .from(TABLES.REFRESH_TOKENS)
      .delete()
      .eq('accessTokenId', accessTokenId);
    
    if (error) {
      throw new Error(`Failed to delete refresh token by access token ID: ${error.message}`);
    }
  }
}
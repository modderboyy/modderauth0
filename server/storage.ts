import {
  users, User, InsertUser,
  oauthClients, OAuthClient, InsertOAuthClient,
  authorizationCodes, AuthorizationCode, InsertAuthorizationCode,
  accessTokens, AccessToken, InsertAccessToken,
  refreshTokens, RefreshToken, InsertRefreshToken
} from "@shared/schema";
import { db } from './db';
import { eq } from 'drizzle-orm';

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // OAuth clients
  getOAuthClient(id: number): Promise<OAuthClient | undefined>;
  getOAuthClientByClientId(clientId: string): Promise<OAuthClient | undefined>;
  createOAuthClient(client: InsertOAuthClient): Promise<OAuthClient>;
  
  // Authorization codes
  getAuthorizationCode(code: string): Promise<AuthorizationCode | undefined>;
  createAuthorizationCode(code: InsertAuthorizationCode): Promise<AuthorizationCode>;
  deleteAuthorizationCode(code: string): Promise<void>;
  
  // Access tokens
  getAccessToken(token: string): Promise<AccessToken | undefined>;
  createAccessToken(token: InsertAccessToken): Promise<AccessToken>;
  deleteAccessToken(token: string): Promise<void>;
  
  // Refresh tokens
  getRefreshToken(token: string): Promise<RefreshToken | undefined>;
  createRefreshToken(token: InsertRefreshToken): Promise<RefreshToken>;
  deleteRefreshToken(token: string): Promise<void>;
  deleteRefreshTokenByAccessTokenId(accessTokenId: number): Promise<void>;
}

/**
 * DatabaseStorage implementation that uses PostgreSQL
 */
export class DatabaseStorage implements IStorage {
  /**
   * User Management
   */
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  /**
   * OAuth Clients
   */
  async getOAuthClient(id: number): Promise<OAuthClient | undefined> {
    const result = await db.select().from(oauthClients).where(eq(oauthClients.id, id));
    return result[0];
  }

  async getOAuthClientByClientId(clientId: string): Promise<OAuthClient | undefined> {
    const result = await db.select().from(oauthClients).where(eq(oauthClients.clientId, clientId));
    return result[0];
  }

  async createOAuthClient(client: InsertOAuthClient): Promise<OAuthClient> {
    const result = await db.insert(oauthClients).values(client).returning();
    return result[0];
  }

  /**
   * Authorization Codes
   */
  async getAuthorizationCode(code: string): Promise<AuthorizationCode | undefined> {
    const result = await db.select().from(authorizationCodes).where(eq(authorizationCodes.code, code));
    return result[0];
  }

  async createAuthorizationCode(code: InsertAuthorizationCode): Promise<AuthorizationCode> {
    const result = await db.insert(authorizationCodes).values(code).returning();
    return result[0];
  }

  async deleteAuthorizationCode(code: string): Promise<void> {
    await db.delete(authorizationCodes).where(eq(authorizationCodes.code, code));
  }

  /**
   * Access Tokens
   */
  async getAccessToken(token: string): Promise<AccessToken | undefined> {
    const result = await db.select().from(accessTokens).where(eq(accessTokens.token, token));
    return result[0];
  }

  async createAccessToken(token: InsertAccessToken): Promise<AccessToken> {
    const result = await db.insert(accessTokens).values(token).returning();
    return result[0];
  }

  async deleteAccessToken(token: string): Promise<void> {
    await db.delete(accessTokens).where(eq(accessTokens.token, token));
  }

  /**
   * Refresh Tokens
   */
  async getRefreshToken(token: string): Promise<RefreshToken | undefined> {
    const result = await db.select().from(refreshTokens).where(eq(refreshTokens.token, token));
    return result[0];
  }

  async createRefreshToken(token: InsertRefreshToken): Promise<RefreshToken> {
    const result = await db.insert(refreshTokens).values(token).returning();
    return result[0];
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
  }

  async deleteRefreshTokenByAccessTokenId(accessTokenId: number): Promise<void> {
    await db.delete(refreshTokens).where(eq(refreshTokens.accessTokenId, accessTokenId));
  }
}

// Use database storage for production
export const storage = new DatabaseStorage();

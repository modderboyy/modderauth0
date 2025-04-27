import {
  users, User, InsertUser,
  oauthClients, OAuthClient, InsertOAuthClient,
  authorizationCodes, AuthorizationCode, InsertAuthorizationCode,
  accessTokens, AccessToken, InsertAccessToken,
  refreshTokens, RefreshToken, InsertRefreshToken
} from "@shared/schema";
import { db } from './db';
import { eq, and } from 'drizzle-orm';

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private oauthClients: Map<number, OAuthClient>;
  private authorizationCodes: Map<string, AuthorizationCode>;
  private accessTokens: Map<string, AccessToken>;
  private refreshTokens: Map<string, RefreshToken>;
  private currentUserId: number;
  private currentClientId: number;
  private currentCodeId: number;
  private currentTokenId: number;
  private currentRefreshTokenId: number;

  constructor() {
    this.users = new Map();
    this.oauthClients = new Map();
    this.authorizationCodes = new Map();
    this.accessTokens = new Map();
    this.refreshTokens = new Map();
    this.currentUserId = 1;
    this.currentClientId = 1;
    this.currentCodeId = 1;
    this.currentTokenId = 1;
    this.currentRefreshTokenId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now
    };
    this.users.set(id, user);
    return user;
  }

  // OAuth Client methods
  async getOAuthClient(id: number): Promise<OAuthClient | undefined> {
    return this.oauthClients.get(id);
  }

  async getOAuthClientByClientId(clientId: string): Promise<OAuthClient | undefined> {
    return Array.from(this.oauthClients.values()).find(
      (client) => client.clientId === clientId,
    );
  }

  async createOAuthClient(insertClient: InsertOAuthClient): Promise<OAuthClient> {
    const id = this.currentClientId++;
    const now = new Date();
    const client: OAuthClient = {
      ...insertClient,
      id,
      createdAt: now
    };
    this.oauthClients.set(id, client);
    return client;
  }

  // Authorization Code methods
  async getAuthorizationCode(code: string): Promise<AuthorizationCode | undefined> {
    return this.authorizationCodes.get(code);
  }

  async createAuthorizationCode(insertCode: InsertAuthorizationCode): Promise<AuthorizationCode> {
    const id = this.currentCodeId++;
    const now = new Date();
    const code: AuthorizationCode = {
      ...insertCode,
      id,
      createdAt: now
    };
    this.authorizationCodes.set(code.code, code);
    return code;
  }

  async deleteAuthorizationCode(code: string): Promise<void> {
    this.authorizationCodes.delete(code);
  }

  // Access Token methods
  async getAccessToken(token: string): Promise<AccessToken | undefined> {
    return this.accessTokens.get(token);
  }

  async createAccessToken(insertToken: InsertAccessToken): Promise<AccessToken> {
    const id = this.currentTokenId++;
    const now = new Date();
    const token: AccessToken = {
      ...insertToken,
      id,
      createdAt: now
    };
    this.accessTokens.set(token.token, token);
    return token;
  }

  async deleteAccessToken(token: string): Promise<void> {
    this.accessTokens.delete(token);
  }

  // Refresh Token methods
  async getRefreshToken(token: string): Promise<RefreshToken | undefined> {
    return this.refreshTokens.get(token);
  }

  async createRefreshToken(insertToken: InsertRefreshToken): Promise<RefreshToken> {
    const id = this.currentRefreshTokenId++;
    const now = new Date();
    const token: RefreshToken = {
      ...insertToken,
      id,
      createdAt: now
    };
    this.refreshTokens.set(token.token, token);
    return token;
  }

  async deleteRefreshToken(token: string): Promise<void> {
    this.refreshTokens.delete(token);
  }

  async deleteRefreshTokenByAccessTokenId(accessTokenId: number): Promise<void> {
    for (const [key, token] of this.refreshTokens.entries()) {
      if (token.accessTokenId === accessTokenId) {
        this.refreshTokens.delete(key);
      }
    }
  }
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

// For development/testing purposes, use in-memory storage
// export const storage = new MemStorage();

// For production, use database storage
export const storage = new DatabaseStorage();

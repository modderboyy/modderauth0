import { pgTable, text, serial, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// OAuth Client table
export const oauthClients = pgTable("oauth_clients", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull().unique(),
  clientSecret: text("client_secret").notNull(),
  name: text("name").notNull(),
  userId: integer("user_id").notNull(),
  redirectUris: text("redirect_uris").notNull(), // JSON encoded array
  allowedScopes: text("allowed_scopes").notNull(), // JSON encoded array
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// OAuth Authorization Code table
export const authorizationCodes = pgTable("authorization_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  clientId: text("client_id").notNull(),
  userId: integer("user_id").notNull(),
  redirectUri: text("redirect_uri").notNull(),
  scopes: text("scopes").notNull(), // JSON encoded array
  expiresAt: timestamp("expires_at").notNull(),
  codeChallenge: text("code_challenge"),
  codeChallengeMethod: text("code_challenge_method"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// OAuth Access Token table
export const accessTokens = pgTable("access_tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  clientId: text("client_id").notNull(),
  userId: integer("user_id").notNull(),
  scopes: text("scopes").notNull(), // JSON encoded array
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// OAuth Refresh Token table
export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  accessTokenId: integer("access_token_id").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schemas for insert operations
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertOAuthClientSchema = createInsertSchema(oauthClients).omit({
  id: true,
  createdAt: true,
});

export const insertAuthorizationCodeSchema = createInsertSchema(authorizationCodes).omit({
  id: true,
  createdAt: true,
});

export const insertAccessTokenSchema = createInsertSchema(accessTokens).omit({
  id: true,
  createdAt: true,
});

export const insertRefreshTokenSchema = createInsertSchema(refreshTokens).omit({
  id: true,
  createdAt: true,
});

// Types for Typescript
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type OAuthClient = typeof oauthClients.$inferSelect;
export type InsertOAuthClient = z.infer<typeof insertOAuthClientSchema>;

export type AuthorizationCode = typeof authorizationCodes.$inferSelect;
export type InsertAuthorizationCode = z.infer<typeof insertAuthorizationCodeSchema>;

export type AccessToken = typeof accessTokens.$inferSelect;
export type InsertAccessToken = z.infer<typeof insertAccessTokenSchema>;

export type RefreshToken = typeof refreshTokens.$inferSelect;
export type InsertRefreshToken = z.infer<typeof insertRefreshTokenSchema>;

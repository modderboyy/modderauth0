import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'modder-auth-secret-key';
const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';
const AUTH_CODE_EXPIRY = 10 * 60; // 10 minutes in seconds

export function generateRandomToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function generateRandomString(length = 32): string {
  return crypto.randomBytes(length).toString('base64url');
}

export function generateClientId(): string {
  return 'mod_' + crypto.randomBytes(16).toString('hex');
}

export function generateClientSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, storedHash] = hashedPassword.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return storedHash === hash;
}

export function generateAuthorizationCode(): string {
  return generateRandomString(32);
}

export function generateAccessToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function generateRefreshToken(): string {
  return generateRandomToken(40);
}

export function verifyAccessToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function calculateCodeChallenge(codeVerifier: string): string {
  const hash = crypto.createHash('sha256').update(codeVerifier).digest();
  return hash.toString('base64url');
}

export function validateCodeChallenge(codeVerifier: string, codeChallenge: string, method: string): boolean {
  if (method === 'S256') {
    const calculatedChallenge = calculateCodeChallenge(codeVerifier);
    return calculatedChallenge === codeChallenge;
  } else if (method === 'plain') {
    return codeVerifier === codeChallenge;
  }
  return false;
}

// Calculate expiration date
export function getExpirationDate(seconds: number): Date {
  return new Date(Date.now() + seconds * 1000);
}

// Scopes handling
export function validateScopes(requestedScopes: string, allowedScopes: string): string[] {
  const requested = requestedScopes.split(' ');
  const allowed = JSON.parse(allowedScopes);
  
  return requested.filter(scope => allowed.includes(scope));
}

export function scopesMatch(requiredScopes: string[], tokenScopes: string): boolean {
  const scopes = JSON.parse(tokenScopes);
  return requiredScopes.every(scope => scopes.includes(scope));
}

// Authorization request validation schema
export const authorizeRequestSchema = z.object({
  response_type: z.enum(['code']),
  client_id: z.string().min(1),
  redirect_uri: z.string().url(),
  scope: z.string().optional(),
  state: z.string().optional(),
  code_challenge: z.string().optional(),
  code_challenge_method: z.enum(['plain', 'S256']).optional(),
});

// Token request validation schema
export const tokenRequestSchema = z.object({
  grant_type: z.enum(['authorization_code', 'refresh_token']),
  client_id: z.string().min(1),
  client_secret: z.string().min(1).optional(),
  code: z.string().optional(),
  redirect_uri: z.string().url().optional(),
  refresh_token: z.string().optional(),
  code_verifier: z.string().optional(),
});

export const revokeTokenSchema = z.object({
  token: z.string().min(1),
  token_type_hint: z.enum(['access_token', 'refresh_token']).optional(),
  client_id: z.string().min(1),
  client_secret: z.string().min(1),
});

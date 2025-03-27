import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  hashPassword, verifyPassword, 
  generateAccessToken, generateRefreshToken, generateAuthorizationCode,
  generateClientId, generateClientSecret,
  getExpirationDate, verifyAccessToken,
  validateScopes, validateCodeChallenge,
  authorizeRequestSchema, tokenRequestSchema, revokeTokenSchema
} from "./utils/auth";
import { insertUserSchema, insertOAuthClientSchema } from "@shared/schema";
import express from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import session from "express-session";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session
  const MemoryStoreSession = MemoryStore(session);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'modder-auth-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
  }));

  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  };

  // Middleware to check if a valid access token is provided
  const validateToken = async (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];
    const tokenData = await storage.getAccessToken(token);

    if (!tokenData || tokenData.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.body.tokenData = tokenData;
    req.body.tokenPayload = payload;
    next();
  };

  // User registration route
  app.post('/api/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingByUsername = await storage.getUserByUsername(userData.username);
      if (existingByUsername) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const existingByEmail = await storage.getUserByEmail(userData.email);
      if (existingByEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = hashPassword(userData.password);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // User login route
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Verify password
      const passwordIsValid = verifyPassword(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Set user in session
      req.session.userId = user.id;

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      return res.status(200).json({ 
        message: 'Login successful',
        user: userWithoutPassword
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // User logout route
  app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Could not log out' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });

  // Get current user route
  app.get('/api/me', isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId as number);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create OAuth Client route
  app.post('/api/clients', isAuthenticated, async (req, res) => {
    try {
      const { name, redirectUris, allowedScopes } = req.body;
      
      // Validate input
      if (!name || !redirectUris || !allowedScopes) {
        return res.status(400).json({ message: 'Name, redirectUris, and allowedScopes are required' });
      }

      // Generate client credentials
      const clientId = generateClientId();
      const clientSecret = generateClientSecret();

      // Create client
      const clientData = insertOAuthClientSchema.parse({
        clientId,
        clientSecret,
        name,
        userId: req.session.userId,
        redirectUris: JSON.stringify(redirectUris),
        allowedScopes: JSON.stringify(allowedScopes)
      });

      const client = await storage.createOAuthClient(clientData);
      
      return res.status(201).json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get user's OAuth clients
  app.get('/api/clients', isAuthenticated, async (req, res) => {
    try {
      const allClients = await Promise.all(
        Array.from({ length: 100 }, (_, i) => storage.getOAuthClient(i + 1))
      );

      const userClients = allClients
        .filter(client => client && client.userId === req.session.userId);
      
      return res.status(200).json(userClients);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // OAuth 2.0 Authorization Endpoint
  app.get('/oauth/authorize', async (req, res) => {
    try {
      // Validate request parameters
      const params = authorizeRequestSchema.parse(req.query);
      
      // Check if client exists
      const client = await storage.getOAuthClientByClientId(params.client_id);
      if (!client) {
        return res.status(400).json({ message: 'Invalid client_id' });
      }

      // Check if redirect URI is allowed for this client
      const redirectUris = JSON.parse(client.redirectUris);
      if (!redirectUris.includes(params.redirect_uri)) {
        return res.status(400).json({ message: 'Invalid redirect_uri' });
      }

      // Store the authorization request in the session
      req.session.authRequest = {
        ...params,
        client_name: client.name
      };

      // Check if user is logged in
      if (!req.session.userId) {
        // Redirect to login page with return_to parameter
        return res.redirect(`/login?return_to=${encodeURIComponent('/authorize')}`);
      }

      // At this point, user is logged in, redirect to authorization page
      return res.redirect('/authorize');
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Consent handling endpoint
  app.post('/api/authorize', isAuthenticated, async (req, res) => {
    try {
      const { consent } = req.body;
      const authRequest = req.session.authRequest;
      
      if (!authRequest) {
        return res.status(400).json({ message: 'No authorization request found' });
      }

      const { response_type, client_id, redirect_uri, scope, state, code_challenge, code_challenge_method } = authRequest;

      // If user denied, redirect back with error
      if (!consent) {
        const redirectUrl = new URL(redirect_uri);
        redirectUrl.searchParams.append('error', 'access_denied');
        if (state) redirectUrl.searchParams.append('state', state);
        return res.status(200).json({ redirect: redirectUrl.toString() });
      }

      // Get client
      const client = await storage.getOAuthClientByClientId(client_id);
      if (!client) {
        return res.status(400).json({ message: 'Invalid client_id' });
      }

      // Generate authorization code
      const code = generateAuthorizationCode();
      
      // Get allowed scopes
      const finalScope = scope ? validateScopes(scope, client.allowedScopes).join(' ') : '';
      
      // Store authorization code
      await storage.createAuthorizationCode({
        code,
        clientId: client_id,
        userId: req.session.userId as number,
        redirectUri: redirect_uri,
        scopes: JSON.stringify(finalScope ? finalScope.split(' ') : []),
        expiresAt: getExpirationDate(600), // 10 minutes
        codeChallenge: code_challenge || null,
        codeChallengeMethod: code_challenge_method || null
      });

      // Build redirect URL
      const redirectUrl = new URL(redirect_uri);
      redirectUrl.searchParams.append('code', code);
      if (state) redirectUrl.searchParams.append('state', state);

      return res.status(200).json({ redirect: redirectUrl.toString() });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // OAuth 2.0 Token Endpoint
  app.post('/oauth/token', async (req, res) => {
    try {
      // Validate request parameters
      const params = tokenRequestSchema.parse(req.body);

      // Verify client
      const client = await storage.getOAuthClientByClientId(params.client_id);
      if (!client) {
        return res.status(401).json({ error: 'invalid_client', error_description: 'Invalid client credentials' });
      }

      // Verify client secret for confidential clients
      if (params.client_secret && params.client_secret !== client.clientSecret) {
        return res.status(401).json({ error: 'invalid_client', error_description: 'Invalid client credentials' });
      }

      if (params.grant_type === 'authorization_code') {
        const { code, redirect_uri, code_verifier } = params;
        
        if (!code) {
          return res.status(400).json({ error: 'invalid_request', error_description: 'Authorization code is required' });
        }

        // Get authorization code
        const authCode = await storage.getAuthorizationCode(code);
        if (!authCode) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid authorization code' });
        }

        // Check if code has expired
        if (authCode.expiresAt < new Date()) {
          await storage.deleteAuthorizationCode(code);
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Authorization code has expired' });
        }

        // Verify the redirect URI matches
        if (authCode.redirectUri !== redirect_uri) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Redirect URI mismatch' });
        }

        // Verify client ID matches
        if (authCode.clientId !== params.client_id) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Authorization code was not issued to this client' });
        }

        // Verify PKCE if code challenge was provided
        if (authCode.codeChallenge && authCode.codeChallengeMethod) {
          if (!code_verifier) {
            return res.status(400).json({ error: 'invalid_grant', error_description: 'Code verifier is required' });
          }

          const isValid = validateCodeChallenge(
            code_verifier, 
            authCode.codeChallenge, 
            authCode.codeChallengeMethod
          );

          if (!isValid) {
            return res.status(400).json({ error: 'invalid_grant', error_description: 'Code verifier is invalid' });
          }
        }

        // Get user
        const user = await storage.getUser(authCode.userId);
        if (!user) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'User not found' });
        }

        // Generate access token
        const tokenPayload = {
          sub: user.id.toString(),
          client_id: client.clientId,
          scope: JSON.parse(authCode.scopes)
        };

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken();

        // Save tokens
        const savedAccessToken = await storage.createAccessToken({
          token: accessToken,
          clientId: client.clientId,
          userId: user.id,
          scopes: authCode.scopes,
          expiresAt: getExpirationDate(3600) // 1 hour
        });

        await storage.createRefreshToken({
          token: refreshToken,
          accessTokenId: savedAccessToken.id,
          expiresAt: getExpirationDate(7 * 24 * 3600) // 7 days
        });

        // Delete used authorization code
        await storage.deleteAuthorizationCode(code);

        // Return tokens
        return res.status(200).json({
          access_token: accessToken,
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: refreshToken,
          scope: JSON.parse(authCode.scopes).join(' ')
        });
      } else if (params.grant_type === 'refresh_token') {
        const { refresh_token } = params;
        
        if (!refresh_token) {
          return res.status(400).json({ error: 'invalid_request', error_description: 'Refresh token is required' });
        }

        // Get refresh token
        const refreshTokenData = await storage.getRefreshToken(refresh_token);
        if (!refreshTokenData) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid refresh token' });
        }

        // Check if refresh token has expired
        if (refreshTokenData.expiresAt < new Date()) {
          await storage.deleteRefreshToken(refresh_token);
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Refresh token has expired' });
        }

        // Get associated access token
        const accessTokens = await Promise.all(
          Array.from({ length: 100 }, (_, i) => storage.getAccessToken(`token_${i}`))
        );
        
        const accessTokenData = accessTokens.find(token => token && token.id === refreshTokenData.accessTokenId);
        
        if (!accessTokenData) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Associated access token not found' });
        }

        // Verify client ID matches
        if (accessTokenData.clientId !== params.client_id) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'Refresh token was not issued to this client' });
        }

        // Get user
        const user = await storage.getUser(accessTokenData.userId);
        if (!user) {
          return res.status(400).json({ error: 'invalid_grant', error_description: 'User not found' });
        }

        // Generate new access token
        const tokenPayload = {
          sub: user.id.toString(),
          client_id: client.clientId,
          scope: JSON.parse(accessTokenData.scopes)
        };

        const newAccessToken = generateAccessToken(tokenPayload);
        const newRefreshToken = generateRefreshToken();

        // Save new tokens
        const savedAccessToken = await storage.createAccessToken({
          token: newAccessToken,
          clientId: client.clientId,
          userId: user.id,
          scopes: accessTokenData.scopes,
          expiresAt: getExpirationDate(3600) // 1 hour
        });

        await storage.createRefreshToken({
          token: newRefreshToken,
          accessTokenId: savedAccessToken.id,
          expiresAt: getExpirationDate(7 * 24 * 3600) // 7 days
        });

        // Delete old refresh token
        await storage.deleteRefreshToken(refresh_token);

        // Return new tokens
        return res.status(200).json({
          access_token: newAccessToken,
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: newRefreshToken,
          scope: JSON.parse(accessTokenData.scopes).join(' ')
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'invalid_request', error_description: fromZodError(error).message });
      }
      return res.status(500).json({ error: 'server_error', error_description: 'Internal server error' });
    }
  });

  // OAuth 2.0 Token Revocation Endpoint
  app.post('/oauth/revoke', async (req, res) => {
    try {
      // Validate request parameters
      const params = revokeTokenSchema.parse(req.body);

      // Verify client
      const client = await storage.getOAuthClientByClientId(params.client_id);
      if (!client || client.clientSecret !== params.client_secret) {
        return res.status(401).json({ error: 'invalid_client', error_description: 'Invalid client credentials' });
      }

      // Get token type hint or determine from token format
      const tokenTypeHint = params.token_type_hint || 'access_token';

      if (tokenTypeHint === 'access_token') {
        // Try to revoke as access token
        await storage.deleteAccessToken(params.token);
      } else if (tokenTypeHint === 'refresh_token') {
        // Try to revoke as refresh token
        await storage.deleteRefreshToken(params.token);
      }

      // Always return 200 OK regardless of whether token existed
      return res.status(200).json({ message: 'Token revoked' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'invalid_request', error_description: fromZodError(error).message });
      }
      return res.status(500).json({ error: 'server_error', error_description: 'Internal server error' });
    }
  });

  // Protected User Info Endpoint
  app.get('/api/userinfo', validateToken, async (req, res) => {
    try {
      const { tokenData } = req.body;
      
      // Get user
      const user = await storage.getUser(tokenData.userId);
      if (!user) {
        return res.status(404).json({ error: 'not_found', error_description: 'User not found' });
      }

      // Determine which user data to return based on scopes
      const scopes = JSON.parse(tokenData.scopes);
      const userInfo: any = { sub: user.id.toString() };
      
      if (scopes.includes('profile')) {
        userInfo.username = user.username;
        userInfo.first_name = user.firstName;
        userInfo.last_name = user.lastName;
      }
      
      if (scopes.includes('email')) {
        userInfo.email = user.email;
      }

      return res.status(200).json(userInfo);
    } catch (error) {
      return res.status(500).json({ error: 'server_error', error_description: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

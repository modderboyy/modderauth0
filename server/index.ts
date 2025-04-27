import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { db, pool } from "./db";
import * as schema from "../shared/schema";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";
import cors from "cors";
import { storage } from "./storage";

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session
app.use(session({
  secret: process.env.SESSION_SECRET || 'modderauth-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // Find user by username
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    
    // Verify password (simple hash for demo)
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== hashedPassword) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api") || path.startsWith("/oauth")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 200) {
        logLine = logLine.slice(0, 199) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize database tables
async function initializeDatabase() {
  try {
    // Check if tables exist by querying the users table
    try {
      await db.select().from(schema.users).limit(1);
      log('Database tables already exist');
    } catch (error) {
      log('Creating database tables...');
      
      // Create tables using raw SQL
      const createTablesQuery = `
        -- Users Table
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          "firstName" VARCHAR(255),
          "lastName" VARCHAR(255),
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- OAuth Clients Table
        CREATE TABLE IF NOT EXISTS oauth_clients (
          id SERIAL PRIMARY KEY,
          "clientId" VARCHAR(255) UNIQUE NOT NULL,
          "clientSecret" VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
          "redirectUris" TEXT NOT NULL,
          "allowedScopes" TEXT NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Authorization Codes Table
        CREATE TABLE IF NOT EXISTS authorization_codes (
          id SERIAL PRIMARY KEY,
          code VARCHAR(255) UNIQUE NOT NULL,
          "clientId" VARCHAR(255) REFERENCES oauth_clients("clientId") ON DELETE CASCADE,
          "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
          "redirectUri" TEXT NOT NULL,
          scope TEXT,
          "codeChallenge" TEXT,
          "codeChallengeMethod" VARCHAR(10),
          "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Access Tokens Table
        CREATE TABLE IF NOT EXISTS access_tokens (
          id SERIAL PRIMARY KEY,
          token VARCHAR(255) UNIQUE NOT NULL,
          "clientId" VARCHAR(255) REFERENCES oauth_clients("clientId") ON DELETE CASCADE,
          "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
          scope TEXT,
          "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Refresh Tokens Table
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id SERIAL PRIMARY KEY,
          token VARCHAR(255) UNIQUE NOT NULL,
          "accessTokenId" INTEGER REFERENCES access_tokens(id) ON DELETE CASCADE,
          "clientId" VARCHAR(255) REFERENCES oauth_clients("clientId") ON DELETE CASCADE,
          "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
          "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;
      
      await pool.query(createTablesQuery);
      log('Database tables created successfully');
      
      // Create a test user if no users exist
      const users = await db.select().from(schema.users).limit(1);
      
      if (users.length === 0) {
        log('Creating test user and OAuth client');
        
        // Create a test user
        const [user] = await db.insert(schema.users).values({
          username: 'testuser',
          email: 'test@example.com',
          password: crypto.createHash('sha256').update('password123').digest('hex'),
          firstName: 'Test',
          lastName: 'User',
        }).returning();
        
        // Generate random strings for client ID and secret
        const generateRandomString = (length = 32) => {
          return crypto.randomBytes(length).toString('hex');
        };
        
        // Create a test OAuth client
        await db.insert(schema.oauthClients).values({
          clientId: 'test-client-' + generateRandomString(8),
          clientSecret: generateRandomString(32),
          name: 'Test Application',
          userId: user.id,
          redirectUris: JSON.stringify(['http://localhost:3000/callback']),
          allowedScopes: JSON.stringify(['profile', 'email']),
        });
        
        log('Test user and OAuth client created successfully');
      }
    }
  } catch (err) {
    log('Error initializing database: ' + (err as Error).message);
    throw err;
  }
}

// Initialize app
(async () => {
  try {
    // Initialize the database
    await initializeDatabase();
    
    // Register API routes
    const server = await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error(err);
      res.status(status).json({ message });
    });

    // Set up Vite or static serving
    if (process.env.NODE_ENV !== 'production') {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Start server
    const port = process.env.PORT || 5000;
    server.listen({
      port: Number(port),
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`ModderAuth server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

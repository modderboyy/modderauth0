// Import required modules with CommonJS imports
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware (using cookies for serverless - in production you'd use a separate session store)
app.use(session({
  secret: process.env.SESSION_SECRET || 'modder-auth-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://gisqgjbgbqrassitzjla.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpc3FnamJnYnFyYXNzaXR6amxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDQ0NTEsImV4cCI6MjA2MTMyMDQ1MX0.FqGUfKv39nr3f3aXoxNHQ9biJzoYkexzlrskY5aC5_M';

// Log the environment variables for debugging
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_KEY:', supabaseKey ? 'Exists (not showing for security)' : 'Missing');

console.log('Initializing Supabase client with URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Database tables
const TABLES = {
  USERS: 'users',
  OAUTH_CLIENTS: 'oauth_clients',
  AUTHORIZATION_CODES: 'authorization_codes',
  ACCESS_TOKENS: 'access_tokens',
  REFRESH_TOKENS: 'refresh_tokens',
};

// Helper functions
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'modder-auth-jwt-secret-key', { expiresIn: '1h' });
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'modder-auth-jwt-secret-key');
  } catch (error) {
    return null;
  }
};

const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

const getExpirationDate = (seconds) => {
  return new Date(Date.now() + seconds * 1000);
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

// Middleware to check if a valid access token is provided
const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];
  
  // Get token from Supabase
  const { data: tokenData, error: tokenError } = await supabase
    .from(TABLES.ACCESS_TOKENS)
    .select('*')
    .eq('token', token)
    .single();

  if (tokenError || !tokenData || new Date(tokenData.expiresAt) < new Date()) {
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

// API Routes

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email and password are required' });
    }
    
    // Check if user already exists
    const { data: existingByUsername } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('username', username)
      .single();
      
    if (existingByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const { data: existingByEmail } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('email', email)
      .single();
      
    if (existingByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = hashPassword(password);
    
    // Create user
    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .insert({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        createdAt: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user
    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('username', username)
      .single();
      
    if (error || !user) {
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
    console.error("Error in login:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// User logout
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Get current user
app.get('/api/me', isAuthenticated, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', req.session.userId)
      .single();
      
    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// OAuth routes
// (These would be more complex and require proper implementation of the OAuth flows)
// For this example, we'll provide a simplified version

// OAuth 2.0 Authorization Endpoint
app.get('/oauth/authorize', async (req, res) => {
  // Simplified authorization endpoint - would need proper implementation
  res.redirect('/authorize?' + new URLSearchParams(req.query).toString());
});

// OAuth 2.0 Token Endpoint
app.post('/oauth/token', async (req, res) => {
  // Simplified token endpoint
  const { grant_type, code, client_id, client_secret, redirect_uri } = req.body;
  
  // Simulate token creation (this would need proper implementation)
  const accessToken = generateRandomToken();
  const refreshToken = generateRandomToken();
  
  res.json({
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: refreshToken,
    scope: 'profile email'
  });
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Export the serverless function
exports.handler = serverless(app);
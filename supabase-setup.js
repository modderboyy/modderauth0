import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://gisqgjbgbqrassitzjla.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpc3FnamJnYnFyYXNzaXR6amxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDQ0NTEsImV4cCI6MjA2MTMyMDQ1MX0.FqGUfKv39nr3f3aXoxNHQ9biJzoYkexzlrskY5aC5_M';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Database tables
const TABLES = {
  USERS: 'users',
  OAUTH_CLIENTS: 'oauth_clients',
  AUTHORIZATION_CODES: 'authorization_codes',
  ACCESS_TOKENS: 'access_tokens',
  REFRESH_TOKENS: 'refresh_tokens',
};

// SQL for creating tables if they don't exist
const createTablesSql = `
-- Users Table
CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OAuth Clients Table
CREATE TABLE IF NOT EXISTS ${TABLES.OAUTH_CLIENTS} (
  id SERIAL PRIMARY KEY,
  clientId VARCHAR(255) UNIQUE NOT NULL,
  clientSecret VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  userId INTEGER REFERENCES ${TABLES.USERS}(id) ON DELETE CASCADE,
  redirectUris TEXT NOT NULL,
  allowedScopes TEXT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Authorization Codes Table
CREATE TABLE IF NOT EXISTS ${TABLES.AUTHORIZATION_CODES} (
  id SERIAL PRIMARY KEY,
  code VARCHAR(255) UNIQUE NOT NULL,
  clientId VARCHAR(255) REFERENCES ${TABLES.OAUTH_CLIENTS}(clientId) ON DELETE CASCADE,
  userId INTEGER REFERENCES ${TABLES.USERS}(id) ON DELETE CASCADE,
  redirectUri TEXT NOT NULL,
  scope TEXT,
  codeChallenge TEXT,
  codeChallengeMethod VARCHAR(10),
  expiresAt TIMESTAMP WITH TIME ZONE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Access Tokens Table
CREATE TABLE IF NOT EXISTS ${TABLES.ACCESS_TOKENS} (
  id SERIAL PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  clientId VARCHAR(255) REFERENCES ${TABLES.OAUTH_CLIENTS}(clientId) ON DELETE CASCADE,
  userId INTEGER REFERENCES ${TABLES.USERS}(id) ON DELETE CASCADE,
  scope TEXT,
  expiresAt TIMESTAMP WITH TIME ZONE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Refresh Tokens Table
CREATE TABLE IF NOT EXISTS ${TABLES.REFRESH_TOKENS} (
  id SERIAL PRIMARY KEY,
  token VARCHAR(255) UNIQUE NOT NULL,
  accessTokenId INTEGER REFERENCES ${TABLES.ACCESS_TOKENS}(id) ON DELETE CASCADE,
  clientId VARCHAR(255) REFERENCES ${TABLES.OAUTH_CLIENTS}(clientId) ON DELETE CASCADE,
  userId INTEGER REFERENCES ${TABLES.USERS}(id) ON DELETE CASCADE,
  expiresAt TIMESTAMP WITH TIME ZONE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function initializeSupabaseTables() {
  try {
    console.log('Initializing Supabase tables...');

    // Create tables using SQL query
    const { error } = await supabase.rpc('pgconfig', { query: createTablesSql });
    
    if (error) {
      console.error('Error creating tables:', error);
      return;
    }

    console.log('Tables created successfully!');

    // Check if we have any users, if not create a test user
    const { data: users, error: userError } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .limit(1);

    if (userError) {
      console.error('Error checking users:', userError);
      return;
    }

    if (!users || users.length === 0) {
      console.log('Creating test user...');
      
      // Create a test user
      const { data: user, error: createUserError } = await supabase
        .from(TABLES.USERS)
        .insert({
          username: 'testuser',
          email: 'test@example.com',
          password: crypto.createHash('sha256').update('password123').digest('hex'),
          firstName: 'Test',
          lastName: 'User',
        })
        .select();

      if (createUserError) {
        console.error('Error creating test user:', createUserError);
        return;
      }

      console.log('Test user created:', user);

      // Create a test OAuth client
      const { data: client, error: createClientError } = await supabase
        .from(TABLES.OAUTH_CLIENTS)
        .insert({
          clientId: 'test-client',
          clientSecret: 'test-secret',
          name: 'Test Client',
          userId: user[0].id,
          redirectUris: JSON.stringify(['http://localhost:3000/callback']),
          allowedScopes: JSON.stringify(['profile', 'email']),
        })
        .select();

      if (createClientError) {
        console.error('Error creating test client:', createClientError);
        return;
      }

      console.log('Test OAuth client created:', client);
    } else {
      console.log('Users already exist, skipping test data creation');
    }

    console.log('Supabase initialization complete!');
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
}

// Run the initialization
initializeSupabaseTables()
  .then(() => console.log('Done!'))
  .catch(err => console.error('Initialization failed:', err));
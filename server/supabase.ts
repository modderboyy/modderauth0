import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://gisqgjbgbqrassitzjla.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpc3FnamJnYnFyYXNzaXR6amxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDQ0NTEsImV4cCI6MjA2MTMyMDQ1MX0.FqGUfKv39nr3f3aXoxNHQ9biJzoYkexzlrskY5aC5_M';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database table names
export const TABLES = {
  USERS: 'users',
  OAUTH_CLIENTS: 'oauth_clients',
  AUTHORIZATION_CODES: 'authorization_codes',
  ACCESS_TOKENS: 'access_tokens',
  REFRESH_TOKENS: 'refresh_tokens',
};

// Initialize Supabase tables if they don't exist
export async function initializeSupabaseTables() {
  try {
    // Helper function to check if a table exists
    const tableExists = async (tableName: string) => {
      const { data, error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_name', tableName);
      
      return (data && data.length > 0);
    };

    // Create tables if they don't exist
    for (const tableName of Object.values(TABLES)) {
      if (!(await tableExists(tableName))) {
        console.log(`Creating table: ${tableName}`);
        
        switch (tableName) {
          case TABLES.USERS:
            await supabase.rpc('create_users_table');
            break;
          case TABLES.OAUTH_CLIENTS:
            await supabase.rpc('create_oauth_clients_table');
            break;
          case TABLES.AUTHORIZATION_CODES:
            await supabase.rpc('create_authorization_codes_table');
            break;
          case TABLES.ACCESS_TOKENS:
            await supabase.rpc('create_access_tokens_table');
            break;
          case TABLES.REFRESH_TOKENS:
            await supabase.rpc('create_refresh_tokens_table');
            break;
        }
      }
    }
    
    console.log('Supabase tables initialized successfully');
  } catch (error) {
    console.error('Error initializing Supabase tables:', error);
  }
}
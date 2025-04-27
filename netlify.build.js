import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create output directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple index.html file
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ModderAuth - Modern OAuth 2.0 Authentication System</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    .gradient-text {
      background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .feature-card {
      transition: all 0.3s ease;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  <!-- Header -->
  <header class="border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span class="text-xl font-bold">ModderAuth</span>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="hover:text-blue-600">Home</a>
          <a href="#" class="hover:text-blue-600">Documentation</a>
          <a href="#" class="hover:text-blue-600">Examples</a>
          <a href="#" class="hover:text-blue-600">Pricing</a>
        </nav>
        <div class="flex items-center space-x-4">
          <a href="#" class="px-4 py-2 rounded border border-gray-300 hover:border-blue-600 dark:border-gray-700">Login</a>
          <a href="#" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Sign Up</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <div class="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span>Secure OAuth 2.0 Authentication</span>
        </div>
        <h1 class="text-5xl font-bold leading-tight mb-6">
          <span class="gradient-text">ModderAuth</span> for Modern Applications
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A complete authentication solution with OAuth 2.0 features, multi-language SDKs, and developer-friendly APIs.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#" class="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Get Started
          </a>
          <a href="#" class="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:border-blue-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-gray-100 dark:bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Modern Authentication for <span class="gradient-text">Every Platform</span></h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          ModderAuth provides all the features you need for secure authentication, with SDKs for every major programming language.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="feature-card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
          <h3 class="text-xl font-semibold mb-2">OAuth 2.0 Flows</h3>
          <p class="text-gray-600 dark:text-gray-300">Complete implementation of Authorization Code, Implicit, Client Credentials, and PKCE flows.</p>
        </div>
        <div class="feature-card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mb-4"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
          <h3 class="text-xl font-semibold mb-2">Token Management</h3>
          <p class="text-gray-600 dark:text-gray-300">Secure creation, storage, and validation of access tokens, refresh tokens, and JWT support.</p>
        </div>
        <div class="feature-card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mb-4"><path d="M16 18l6-6-6-6"></path><path d="M8 6l-6 6 6 6"></path></svg>
          <h3 class="text-xl font-semibold mb-2">Multiple SDKs</h3>
          <p class="text-gray-600 dark:text-gray-300">Client libraries for JavaScript, Python, Java, C#, Go, Ruby, PHP, and more.</p>
        </div>
        <div class="feature-card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mb-4"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2m16 0V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11"></path></svg>
          <h3 class="text-xl font-semibold mb-2">Supabase Integration</h3>
          <p class="text-gray-600 dark:text-gray-300">Seamless integration with Supabase for secure and scalable user data storage and authentication management.</p>
        </div>
        <div class="feature-card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mb-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path></svg>
          <h3 class="text-xl font-semibold mb-2">Customizable UI</h3>
          <p class="text-gray-600 dark:text-gray-300">Beautiful, responsive login and registration screens that can be fully customized to match your brand.</p>
        </div>
        <div class="feature-card bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600 mb-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          <h3 class="text-xl font-semibold mb-2">Analytics & Monitoring</h3>
          <p class="text-gray-600 dark:text-gray-300">Track login attempts, success rates, and other key metrics with the built-in analytics dashboard.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-8 md:p-12 shadow-sm">
        <div class="md:flex md:items-center md:space-x-12">
          <div class="md:w-2/3 mb-8 md:mb-0">
            <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of developers who trust ModderAuth for their authentication needs. Sign up now to start building secure applications with our powerful authentication platform.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#" class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Create Free Account
              </a>
              <a href="#" class="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:border-blue-600">
                Read Documentation
              </a>
            </div>
          </div>
          <div class="md:w-1/3 flex justify-center">
            <div class="relative w-48 h-48">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/40 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-200 dark:border-gray-800 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span class="text-xl font-bold">ModderAuth</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Powerful, developer-friendly OAuth 2.0 authentication system for modern applications.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Product</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Features</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Pricing</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Documentation</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Examples</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Resources</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">JavaScript SDK</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Python SDK</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Java SDK</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Go SDK</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Company</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">About Us</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Blog</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Careers</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          &copy; ${new Date().getFullYear()} ModderAuth. All rights reserved.
        </p>
        <div class="flex items-center space-x-4 mt-4 sm:mt-0">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            Made with 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            for developers
          </span>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);

console.log('Creating static assets for deployment...');

// Copy any other needed assets like favicon, images, etc.
// For now we'll just create a simple favicon placeholder
fs.writeFileSync(path.join(distDir, 'favicon.ico'), '');

// Create a robots.txt file
const robotsTxt = `
User-agent: *
Allow: /
`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);

// Ensure the netlify/functions directory exists
const functionsDir = path.join(__dirname, 'netlify', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Check if the api.js file exists in the netlify/functions directory
const apiJsPath = path.join(functionsDir, 'api.js');
if (!fs.existsSync(apiJsPath)) {
  console.log('Creating example API function...');
  
  // Create a simple API function if it doesn't exist
  const apiFunctionContent = `
// Simple API function for ModderAuth
exports.handler = async function(event, context) {
  // Get the requested path
  const path = event.path.replace('/.netlify/functions/api', '');
  
  // Handle different endpoints
  if (path === '/status') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 'ok',
        message: 'ModderAuth API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      })
    };
  }
  
  // Default response for other paths
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Welcome to ModderAuth API',
      path: path,
      method: event.httpMethod,
      timestamp: new Date().toISOString()
    })
  };
};
`;

  fs.writeFileSync(apiJsPath, apiFunctionContent);
}

// Signal success to Netlify
console.log('Static build completed successfully');
process.exit(0);
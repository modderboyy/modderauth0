import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Docs = () => {
  return (
    <div className="max-w-full">
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              ModderAuth Documentation
            </h1>
            <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
              Complete guide to integrating ModderAuth into your applications
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="mt-8">
          <div className="border-b border-gray-200">
            <TabsList className="flex overflow-x-auto py-4 space-x-8">
              <TabsTrigger value="overview" className="px-1 py-4 font-medium text-sm hover:text-primary">
                Overview
              </TabsTrigger>
              <TabsTrigger value="getting-started" className="px-1 py-4 font-medium text-sm hover:text-primary">
                Getting Started
              </TabsTrigger>
              <TabsTrigger value="auth-flows" className="px-1 py-4 font-medium text-sm hover:text-primary">
                Auth Flows
              </TabsTrigger>
              <TabsTrigger value="api-reference" className="px-1 py-4 font-medium text-sm hover:text-primary">
                API Reference
              </TabsTrigger>
              <TabsTrigger value="security" className="px-1 py-4 font-medium text-sm hover:text-primary">
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="py-8">
            <div className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold mb-6">What is ModderAuth?</h2>
              <p className="text-lg text-gray-700">
                ModderAuth is a complete OAuth 2.0 authentication system that allows your applications to securely authenticate users and access APIs. 
                It follows the OAuth 2.0 protocol specification to provide a secure and standardized way of granting third-party applications limited access to user accounts.
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Standard OAuth 2.0 Implementation</strong> — Follows industry best practices for OAuth 2.0 authorization.</li>
                <li><strong>Secure Token Handling</strong> — Uses JWT tokens with proper signature verification.</li>
                <li><strong>Multiple Grant Types</strong> — Supports authorization code flow with PKCE.</li>
                <li><strong>User Management</strong> — Complete user registration and profile management system.</li>
                <li><strong>Scoped Permissions</strong> — Fine-grained control over what data applications can access.</li>
                <li><strong>Token Refresh</strong> — Support for refresh tokens to maintain long-lived sessions.</li>
              </ul>

              <h3 className="text-2xl font-bold mt-10 mb-4">When to Use ModderAuth</h3>
              <p className="text-gray-700">ModderAuth is ideal for:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Web applications that need to authenticate users</li>
                <li>APIs that require secure access control</li>
                <li>Mobile applications connecting to your services</li>
                <li>Third-party applications that need access to your resources</li>
              </ul>

              <div className="mt-12">
                <Link href="/dashboard">
                  <Button className="bg-primary text-white hover:bg-blue-700">
                    Create Your First OAuth Client
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="getting-started" className="py-8">
            <div className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold mb-6">Getting Started with ModderAuth</h2>
              
              <p className="text-lg text-gray-700">
                Follow these steps to integrate ModderAuth into your application:
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4">Step 1: Register Your Application</h3>
              <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                <li>
                  <strong>Create an account</strong> or <strong>log in</strong> to your ModderAuth account.
                </li>
                <li>
                  Navigate to the <Link href="/dashboard"><span className="text-primary hover:text-blue-700 cursor-pointer">Dashboard</span></Link> and create a new OAuth client.
                </li>
                <li>
                  Provide your application details:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Application name</li>
                    <li>Redirect URI(s) for OAuth callbacks</li>
                    <li>Scopes your application needs</li>
                  </ul>
                </li>
                <li>
                  After registration, you'll receive a <strong>Client ID</strong> and <strong>Client Secret</strong>.
                </li>
              </ol>

              <h3 className="text-2xl font-bold mt-10 mb-4">Step 2: Integrate the Client Library</h3>
              <p className="text-gray-700">Add the ModderAuth client library to your application:</p>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">npm installation</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>npm install modderauth-client</code>
                  </pre>
                </div>
              </div>

              <p className="mt-4 text-gray-700">Or include it via CDN:</p>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">script tag</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`<script src="https://cdn.modderauth.com/client/latest.js"></script>`}</code>
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Step 3: Initialize the Client</h3>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">JavaScript</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`// Initialize ModderAuth client
const modderAuth = new ModderAuth({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET', // Only for trusted server-side applications
  redirectUri: 'https://your-app.com/callback',
  scope: 'profile email'
});`}</code>
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Step 4: Implement Login</h3>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">JavaScript</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`// Redirect to authorization URL
function login() {
  const authUrl = modderAuth.getAuthorizationUrl({
    // Optional: custom scopes
    scope: 'profile email',
    // Optional: custom state for CSRF protection
    state: generateRandomString(),
    // Optional: use PKCE for public clients
    codeChallengeMethod: 'S256'
  });
  
  window.location.href = authUrl;
}`}</code>
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Step 5: Handle the Callback</h3>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">JavaScript</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`// In your callback route (e.g., /callback)
async function handleCallback() {
  // Get code and state from URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  
  // Verify state to prevent CSRF attacks
  if (state !== sessionStorage.getItem('modderauth_state')) {
    throw new Error('Invalid state parameter');
  }
  
  try {
    // Exchange code for tokens
    const tokens = await modderAuth.exchangeCodeForTokens(code);
    
    // Store tokens securely
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    
    // Get user info
    const userInfo = await modderAuth.getUserInfo(tokens.access_token);
    
    console.log('User logged in:', userInfo);
    
    // Redirect to your app's main page
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Authentication error:', error);
  }
}`}</code>
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Next Steps</h3>
              <p className="text-gray-700">
                Now that you have the basic authentication flow set up, explore more advanced features:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Implement token refresh to maintain user sessions</li>
                <li>Add logout functionality</li>
                <li>Secure your API endpoints using the access token</li>
                <li>Customize the authorization screen</li>
              </ul>

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                <p className="text-blue-700">
                  <strong>Tip:</strong> For public clients (like SPAs and mobile apps), always use PKCE to enhance security.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="auth-flows" className="py-8">
            <div className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold mb-6">OAuth 2.0 Authorization Flows</h2>
              
              <p className="text-lg text-gray-700">
                ModderAuth supports the following OAuth 2.0 flows:
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4">Authorization Code Flow</h3>
              <p className="text-gray-700">
                The authorization code flow is the most secure OAuth 2.0 flow, ideal for server-side applications that can securely store client secrets.
              </p>
              
              <div className="mt-6 bg-gray-100 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Flow Diagram</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</div>
                    <div className="ml-3 text-sm text-gray-700">User clicks login in your application</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">2</div>
                    <div className="ml-3 text-sm text-gray-700">Your app redirects to ModderAuth's authorize endpoint</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</div>
                    <div className="ml-3 text-sm text-gray-700">User logs in and grants permissions</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">4</div>
                    <div className="ml-3 text-sm text-gray-700">ModderAuth redirects back with authorization code</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">5</div>
                    <div className="ml-3 text-sm text-gray-700">Your server exchanges code for access & refresh tokens</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">6</div>
                    <div className="ml-3 text-sm text-gray-700">Your server uses access token to call APIs</div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Authorization Code Flow with PKCE</h3>
              <p className="text-gray-700">
                The PKCE (Proof Key for Code Exchange) extension enhances the authorization code flow for public clients by 
                preventing authorization code interception attacks.
              </p>
              
              <div className="mt-6 bg-gray-100 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">Key Differences</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Client generates a random code verifier and its code challenge</li>
                  <li>Authorization request includes the code challenge</li>
                  <li>Token request includes the original code verifier</li>
                  <li>ModderAuth verifies the code challenge matches the code verifier</li>
                </ul>
              </div>

              <p className="mt-6 text-gray-700">
                PKCE Implementation:
              </p>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-4">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">JavaScript - PKCE Authorization</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`// Generate code verifier and challenge
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=/g, '');
}

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
}

// Redirect to authorization URL with PKCE
async function loginWithPKCE() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  // Store code verifier for later use
  localStorage.setItem('code_verifier', codeVerifier);
  
  const authUrl = \`https://auth.modderauth.com/oauth/authorize?
    response_type=code&
    client_id=YOUR_CLIENT_ID&
    redirect_uri=YOUR_REDIRECT_URI&
    scope=profile+email&
    code_challenge=\${codeChallenge}&
    code_challenge_method=S256\`;
    
  window.location.href = authUrl;
}`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden mt-6">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">JavaScript - PKCE Token Exchange</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`// Exchange code for tokens with PKCE
async function exchangeCodeForTokens(code) {
  const codeVerifier = localStorage.getItem('code_verifier');
  
  const response = await fetch('https://auth.modderauth.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'YOUR_CLIENT_ID',
      code: code,
      redirect_uri: 'YOUR_REDIRECT_URI',
      code_verifier: codeVerifier
    })
  });
  
  return await response.json();
}`}</code>
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Refresh Token Flow</h3>
              <p className="text-gray-700">
                The refresh token flow allows you to obtain a new access token when the current one expires, without requiring the user to log in again.
              </p>
              
              <div className="bg-gray-800 rounded-lg overflow-hidden mt-6">
                <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                  <span className="text-sm text-white">JavaScript - Refresh Token</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-white">
                    <code>{`// Refresh access token using refresh token
async function refreshAccessToken(refreshToken) {
  const response = await fetch('https://auth.modderauth.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: 'YOUR_CLIENT_ID',
      refresh_token: refreshToken
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  
  const data = await response.json();
  
  // Update stored tokens
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  
  return data;
}`}</code>
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Always use HTTPS for all OAuth requests</li>
                <li>Use PKCE for public clients (SPAs, mobile apps)</li>
                <li>Store refresh tokens securely, preferably in HTTP-only cookies</li>
                <li>Validate state parameters to prevent CSRF attacks</li>
                <li>Use the shortest-lived access tokens appropriate for your application</li>
                <li>Implement proper token validation on your server</li>
              </ul>

              <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
                <p className="text-yellow-700">
                  <strong>Security Note:</strong> Never include client secrets in client-side code. When building SPAs,
                  implement a backend-for-frontend pattern to handle token exchange securely.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api-reference" className="py-8">
            <div className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold mb-6">API Reference</h2>
              
              <p className="text-lg text-gray-700">
                Complete documentation of ModderAuth's endpoints and client libraries.
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4">OAuth Endpoints</h3>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-2">Authorization Endpoint</h4>
                  <code className="block bg-gray-100 p-2 rounded mb-4">/oauth/authorize</code>
                  
                  <p className="text-gray-700 mb-4">
                    Initiates the OAuth 2.0 authorization flow.
                  </p>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">HTTP Method</h5>
                  <p className="mb-4">GET</p>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">Request Parameters</h5>
                  <table className="min-w-full mb-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">response_type</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Must be "code" for authorization code flow</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">client_id</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Your application's client ID</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">redirect_uri</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                        <td className="px-6 py-4 text-sm text-gray-500">URI to redirect after authorization</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">scope</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Space-separated list of scopes</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">state</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Recommended</td>
                        <td className="px-6 py-4 text-sm text-gray-500">Value for CSRF protection</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">code_challenge</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">For PKCE</td>
                        <td className="px-6 py-4 text-sm text-gray-500">PKCE code challenge</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">code_challenge_method</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">For PKCE</td>
                        <td className="px-6 py-4 text-sm text-gray-500">"plain" or "S256" (recommended)</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">Response</h5>
                  <p className="mb-2">
                    Redirects to the specified redirect_uri with:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>code: The authorization code (short-lived)</li>
                    <li>state: The same state value sent in the request</li>
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="mb-2 font-medium">Example Redirect:</p>
                    <code className="text-sm">https://your-app.com/callback?code=abc123&state=xyz789</code>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-2">Token Endpoint</h4>
                  <code className="block bg-gray-100 p-2 rounded mb-4">/oauth/token</code>
                  
                  <p className="text-gray-700 mb-4">
                    Exchanges an authorization code for access and refresh tokens, or refreshes an access token.
                  </p>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">HTTP Method</h5>
                  <p className="mb-4">POST</p>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">Request Parameters</h5>
                  <p className="mb-2">Content-Type: application/x-www-form-urlencoded</p>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-2">For Authorization Code Exchange:</p>
                    <table className="min-w-full mb-4">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">grant_type</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Must be "authorization_code"</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">code</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">The authorization code received</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">client_id</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Your application's client ID</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">client_secret</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">For confidential clients</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Your application's client secret</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">redirect_uri</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Same redirect URI used in authorization request</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">code_verifier</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">For PKCE</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Original code verifier (for PKCE)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mb-6">
                    <p className="font-medium mb-2">For Refresh Token Exchange:</p>
                    <table className="min-w-full mb-4">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">grant_type</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Must be "refresh_token"</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">refresh_token</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">The refresh token</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">client_id</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yes</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Your application's client ID</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">client_secret</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">For confidential clients</td>
                          <td className="px-6 py-4 text-sm text-gray-500">Your application's client secret</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">Response</h5>
                  <p className="mb-2">JSON response with:</p>
                  
                  <div className="bg-gray-800 rounded-lg overflow-hidden mt-4 mb-6">
                    <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                      <span className="text-sm text-white">JSON</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-white">
                        <code>{`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "8xLOxBtZp8",
  "scope": "profile email"
}`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <h3 className="text-2xl font-bold mt-10 mb-4">Resource Endpoints</h3>
              
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-2">User Info Endpoint</h4>
                  <code className="block bg-gray-100 p-2 rounded mb-4">/api/userinfo</code>
                  
                  <p className="text-gray-700 mb-4">
                    Returns information about the authenticated user based on the scopes granted.
                  </p>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">HTTP Method</h5>
                  <p className="mb-4">GET</p>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">Authorization</h5>
                  <p className="mb-4">Bearer token in Authorization header</p>
                  
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
                    <p className="mb-2 font-medium">Example Request:</p>
                    <code className="text-sm">Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...</code>
                  </div>
                  
                  <h5 className="font-semibold text-gray-700 mb-2">Response</h5>
                  <p className="mb-2">JSON response with user information (fields vary based on granted scopes):</p>
                  
                  <div className="bg-gray-800 rounded-lg overflow-hidden mt-4 mb-4">
                    <div className="px-4 py-2 bg-gray-700 flex justify-between items-center">
                      <span className="text-sm text-white">JSON</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-white">
                        <code>{`{
  "sub": "123",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <h3 className="text-2xl font-bold mt-10 mb-4">Client Library</h3>
              <p className="text-gray-700 mb-6">
                The ModderAuth client library simplifies OAuth integration in your applications.
              </p>
              
              <h4 className="text-xl font-semibold mb-4">ModderAuth Class Reference</h4>
              
              <table className="min-w-full mb-8 border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">constructor(config)</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Initializes the ModderAuth client with configuration options</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">getAuthorizationUrl(options)</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Generates the authorization URL for redirecting users</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">exchangeCodeForTokens(code, codeVerifier)</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Exchanges an authorization code for tokens</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">refreshAccessToken(refreshToken)</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Gets a new access token using a refresh token</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">getUserInfo(accessToken)</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Retrieves user information using an access token</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">revokeToken(token, tokenTypeHint)</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Revokes an access or refresh token</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                <p className="text-blue-700">
                  <strong>Note:</strong> For detailed method signatures and parameters, refer to the 
                  <a href="#" className="text-blue-600 hover:underline"> TypeScript definitions</a>.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="py-8">
            <div className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold mb-6">Security Considerations</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Security is a critical aspect of any authentication system. ModderAuth implements industry-standard 
                security practices to protect your users and data.
              </p>

              <h3 className="text-2xl font-bold mt-10 mb-4">Protecting Client Secrets</h3>
              <p className="text-gray-700 mb-4">
                The client secret is a confidential credential that must be securely stored. Follow these guidelines:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Never expose client secrets in client-side code</strong> (JavaScript, mobile apps)</li>
                <li>Store client secrets securely in environment variables or configuration files with restricted access</li>
                <li>For client-side applications (SPAs, mobile apps), use the Authorization Code Flow with PKCE</li>
                <li>Consider implementing a backend-for-frontend pattern to handle token exchange</li>
                <li>Rotate client secrets periodically for critical applications</li>
              </ul>

              <h3 className="text-2xl font-bold mt-10 mb-4">Token Security</h3>
              <p className="text-gray-700 mb-4">
                Proper token handling is essential for maintaining security:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Access Tokens:</strong> Short-lived and should be properly validated</li>
                <li><strong>Refresh Tokens:</strong> Long-lived and should be stored securely (e.g., HTTP-only cookies)</li>
                <li>Store tokens securely, protecting them from XSS and other client-side attacks</li>
                <li>Implement token revocation when users log out</li>
                <li>Validate tokens on each API request</li>
              </ul>

              <h3 className="text-2xl font-bold mt-10 mb-4">PKCE (Proof Key for Code Exchange)</h3>
              <p className="text-gray-700 mb-4">
                PKCE is an extension to the authorization code flow that provides additional security for public clients:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Always use PKCE for public clients (SPAs, mobile apps)</li>
                <li>Prefer the S256 code challenge method over plain</li>
                <li>Generate a cryptographically secure random string for the code verifier</li>
                <li>Store the code verifier securely until token exchange</li>
              </ul>

              <div className="bg-gray-100 p-6 rounded-lg mt-8 mb-8">
                <h4 className="text-xl font-semibold mb-4">Security Checklist</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use HTTPS for all OAuth interactions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Validate redirect URIs against pre-registered values</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use state parameters to prevent CSRF attacks</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Implement PKCE for public clients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use short-lived access tokens</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Protect refresh tokens in HTTP-only cookies</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Implement token validation on your server</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Implement proper token revocation</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4">Common Vulnerabilities</h3>
              
              <table className="min-w-full mb-8 border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Vulnerability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">CSRF</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Cross-Site Request Forgery attacks can trick users into initiating unwanted actions</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Use the state parameter to maintain session information and validate it</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">XSS</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Cross-Site Scripting can expose tokens stored in JavaScript-accessible storage</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Store tokens in HTTP-only cookies, implement proper Content Security Policy</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">Authorization Code Interception</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Attackers can intercept the authorization code and exchange it for tokens</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Use PKCE for public clients, validate redirect URIs</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">Open Redirector</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Applications with open redirects can be exploited in OAuth flows</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Validate and restrict redirect URIs</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-200">Token Leakage</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Access tokens can be leaked through referrer headers, logs, or browser history</td>
                    <td className="px-6 py-4 text-sm text-gray-500 border border-gray-200">Use fragment response mode, proper Referrer-Policy, avoid including tokens in URLs</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-2xl font-bold mt-10 mb-4">Additional Resources</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><a href="#" className="text-blue-600 hover:underline">OAuth 2.0 Security Best Practices</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">OAuth 2.0 Threat Model and Security Considerations (RFC 6819)</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">OAuth 2.0 for Browser-Based Apps</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">ModderAuth Security Bulletin</a></li>
              </ul>

              <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                <p className="text-red-700">
                  <strong>Security Alert:</strong> Always keep your ModderAuth implementation up to date with the latest security patches.
                  Subscribe to our security newsletter for updates on vulnerabilities and best practices.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Docs;

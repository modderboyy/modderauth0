import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500">
                Introducing
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">ModderAuth</span>
                <span className="block text-primary">OAuth 2.0 System</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              A powerful, secure, and easy-to-integrate OAuth 2.0 authentication system for your applications.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/register">
                    <Button className="w-full px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10 bg-primary text-white hover:bg-blue-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/docs">
                    <Button variant="outline" className="w-full px-8 py-3 text-base font-medium md:py-4 md:text-lg md:px-10 text-primary bg-blue-50 hover:bg-blue-100 border-blue-100">
                      Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <div className="p-8 bg-gray-100 rounded-lg">
                  <div className="text-xl font-semibold text-gray-900 mb-4">ModderAuth Flow</div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</div>
                      <div className="ml-3 text-sm text-gray-700">User requests authorization</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">2</div>
                      <div className="ml-3 text-sm text-gray-700">App redirects to ModderAuth</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</div>
                      <div className="ml-3 text-sm text-gray-700">User authenticates</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">4</div>
                      <div className="ml-3 text-sm text-gray-700">Authorization code returned</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">5</div>
                      <div className="ml-3 text-sm text-gray-700">App exchanges code for token</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">6</div>
                      <div className="ml-3 text-sm text-gray-700">API access granted</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for authentication
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            ModderAuth provides a complete OAuth 2.0 solution with security and ease of use in mind.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">User Registration & Login</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Complete user authentication system with secure registration, login, and account management.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">OAuth 2.0 Compliance</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Full implementation of the OAuth 2.0 authorization framework for secure API access delegation.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Token Management</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Secure generation, validation, and refresh of access tokens with configurable expiration.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customization</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Flexible configuration options for scopes, token lifetimes, and user permissions.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

const DeveloperTools = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Developer Tools</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple integration for developers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            ModderAuth provides comprehensive documentation and tools to make integration straightforward.
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Start Integration</h3>
              
              <div className="mt-4 bg-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                  <span className="text-sm text-white">OAuth Client Setup</span>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-3 text-white font-mono text-sm overflow-x-auto">
                  <pre>
{`// Initialize ModderAuth client
const modderAuth = new ModderAuth({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://your-app.com/callback',
  scope: 'profile email'
});

// Redirect to authorization URL
function login() {
  const authUrl = modderAuth.getAuthorizationUrl();
  window.location.href = authUrl;
}

// Handle the callback
async function handleCallback(code) {
  try {
    const tokens = await modderAuth.exchangeCodeForTokens(code);
    
    // Store tokens securely
    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
    
    // Get user info
    const userInfo = await modderAuth.getUserInfo(tokens.accessToken);
    
    console.log('User logged in:', userInfo);
  } catch (error) {
    console.error('Authentication error:', error);
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900">API Endpoints</h4>
                <div className="mt-2 border border-gray-200 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Endpoint
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          /oauth/authorize
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          GET
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Authorization endpoint
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          /oauth/token
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          POST
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Token exchange endpoint
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          /api/userinfo
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          GET
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          User information endpoint
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          /oauth/revoke
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          POST
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Token revocation endpoint
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySection = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Security</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Built with security in mind
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            ModderAuth implements industry-standard security practices to protect your users and data.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Secure Token Storage</h3>
              <p className="mt-2 text-base text-gray-500">
                Tokens are encrypted at rest and in transit. Access tokens are short-lived while refresh tokens use secure rotation.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">PKCE Support</h3>
              <p className="mt-2 text-base text-gray-500">
                Proof Key for Code Exchange implementation to protect authorization code flow for public clients.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Fraud Detection</h3>
              <p className="mt-2 text-base text-gray-500">
                Advanced anomaly detection systems to identify and prevent suspicious authentication attempts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <HeroSection />
      <Features />
      <DeveloperTools />
      <SecuritySection />
    </>
  );
};

export default Home;

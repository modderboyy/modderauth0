import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  Code, 
  Cpu, 
  Database, 
  Gauge, 
  Globe, 
  Key, 
  Lock, 
  Server, 
  Shield, 
  Fingerprint,
  UserCheck,
  ArrowRight,
  MessageSquare,
  BookOpen,
  Github,
  ChevronRight
} from 'lucide-react';

// Code examples for different languages
const codeExamples = {
  javascript: `// Install ModderAuth client
npm install modderauth-client

// Initialize the client
import { ModderAuth } from 'modderauth-client';

const auth = new ModderAuth({
  clientId: 'YOUR_CLIENT_ID',
  redirectUri: 'https://yourapp.com/callback',
  scope: 'profile email'
});

// Redirect to authorization page
const authUrl = auth.getAuthorizationUrl();
window.location.href = authUrl;

// In your callback page
const code = new URLSearchParams(window.location.search).get('code');
const tokens = await auth.exchangeCodeForTokens(code);
console.log(tokens.access_token);`,

  python: `# Install ModderAuth client
pip install modderauth-client

# Initialize the client
from modderauth import ModderAuth

auth = ModderAuth(
    client_id="YOUR_CLIENT_ID",
    redirect_uri="https://yourapp.com/callback",
    scope="profile email"
)

# Redirect to authorization page
auth_url = auth.get_authorization_url()
# In your web framework, redirect to auth_url

# In your callback route
def callback(request):
    code = request.GET.get('code')
    tokens = auth.exchange_code_for_tokens(code)
    print(tokens['access_token'])
    # Store tokens and authenticate user`,

  java: `// Add dependency to your build tool
// Maven: com.modderauth:modderauth-client:1.0.0

// Initialize the client
import com.modderauth.ModderAuth;
import com.modderauth.ModderAuthConfig;

ModderAuthConfig config = new ModderAuthConfig.Builder()
    .clientId("YOUR_CLIENT_ID")
    .redirectUri("https://yourapp.com/callback")
    .scope("profile email")
    .build();

ModderAuth auth = new ModderAuth(config);

// Redirect to authorization page
String authUrl = auth.getAuthorizationUrl();
// Redirect to authUrl in your web framework

// In your callback endpoint
public void callback(HttpServletRequest request) {
    String code = request.getParameter("code");
    TokenResponse tokens = auth.exchangeCodeForTokens(code);
    System.out.println(tokens.getAccessToken());
    // Store tokens and authenticate user
}`,

  csharp: `// Install ModderAuth client
// Install-Package ModderAuth.Client

// Initialize the client
using ModderAuth.Client;

var config = new ModderAuthConfig
{
    ClientId = "YOUR_CLIENT_ID",
    RedirectUri = "https://yourapp.com/callback",
    Scope = "profile email"
};

var auth = new ModderAuth(config);

// Redirect to authorization page
var authUrl = auth.GetAuthorizationUrl();
// Redirect to authUrl in your web framework

// In your callback endpoint
public async Task Callback(string code)
{
    var tokens = await auth.ExchangeCodeForTokensAsync(code);
    Console.WriteLine(tokens.AccessToken);
    // Store tokens and authenticate user
}`,

  go: `// Install ModderAuth client
// go get github.com/modderauth/modderauth-go

// Initialize the client
package main

import (
    "fmt"
    "net/http"
    "github.com/modderauth/modderauth-go"
)

func main() {
    auth := modderauth.New(modderauth.Config{
        ClientID:    "YOUR_CLIENT_ID",
        RedirectURI: "https://yourapp.com/callback",
        Scope:       "profile email",
    })

    // Redirect to authorization page
    http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
        authURL := auth.GetAuthorizationURL()
        http.Redirect(w, r, authURL, http.StatusFound)
    })

    // In your callback handler
    http.HandleFunc("/callback", func(w http.ResponseWriter, r *http.Request) {
        code := r.URL.Query().Get("code")
        tokens, err := auth.ExchangeCodeForTokens(code)
        if err != nil {
            // Handle error
            return
        }
        fmt.Println(tokens.AccessToken)
        // Store tokens and authenticate user
    })
}`,

  ruby: `# Install ModderAuth client
# gem install modderauth

# Initialize the client
require 'modderauth'

auth = ModderAuth::Client.new(
  client_id: 'YOUR_CLIENT_ID',
  redirect_uri: 'https://yourapp.com/callback',
  scope: 'profile email'
)

# Redirect to authorization page
auth_url = auth.authorization_url
# In your web framework, redirect to auth_url

# In your callback route
def callback
  code = params[:code]
  tokens = auth.exchange_code_for_tokens(code)
  puts tokens[:access_token]
  # Store tokens and authenticate user
end`,

  php: `// Install ModderAuth client
// composer require modderauth/modderauth-php

// Initialize the client
<?php
require_once 'vendor/autoload.php';

use ModderAuth\\Client;

$auth = new Client([
    'client_id' => 'YOUR_CLIENT_ID',
    'redirect_uri' => 'https://yourapp.com/callback',
    'scope' => 'profile email'
]);

// Redirect to authorization page
$authUrl = $auth->getAuthorizationUrl();
header('Location: ' . $authUrl);
exit;

// In your callback page
$code = $_GET['code'];
$tokens = $auth->exchangeCodeForTokens($code);
echo $tokens['access_token'];
// Store tokens and authenticate user
?>`,
};

export default function Home() {
  const [codeLanguage, setCodeLanguage] = useState('javascript');

  return (
    <>
      <Head>
        <title>ModderAuth - Modern OAuth 2.0 Authentication System</title>
        <meta name="description" content="ModderAuth is a complete OAuth 2.0 authentication system for modern applications. Easy to integrate, secure, and scalable." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="spotlight"></div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <Lock className="h-4 w-4 text-primary" />
              <span>Secure OAuth 2.0 Authentication</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="gradient-text">ModderAuth</span> for Modern Applications
            </h1>
            <p className="max-w-[42rem] text-xl text-muted-foreground">
              A complete authentication solution with OAuth 2.0 features, multi-language SDKs, and developer-friendly APIs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link href="/docs">
                <Button size="lg" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/yourusername/modderauth" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modern Authentication for <span className="gradient-text">Every Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              ModderAuth provides all the features you need for secure authentication, with SDKs for every major programming language.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>OAuth 2.0 Flows</CardTitle>
                <CardDescription>
                  Complete implementation of Authorization Code, Implicit, Client Credentials, and PKCE flows.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Key className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Token Management</CardTitle>
                <CardDescription>
                  Secure creation, storage, and validation of access tokens, refresh tokens, and JWT support.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Code className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multiple SDKs</CardTitle>
                <CardDescription>
                  Client libraries for JavaScript, Python, Java, C#, Go, Ruby, PHP, and more.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Gauge className="h-10 w-10 text-primary mb-2" />
                <CardTitle>High Performance</CardTitle>
                <CardDescription>
                  Built for scale with optimized database queries and efficient token validation.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Customizable UI</CardTitle>
                <CardDescription>
                  White-label login, registration, and consent screens that match your brand.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Fingerprint className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure by Default</CardTitle>
                <CardDescription>
                  CSRF protection, PKCE support, and secure storage for all sensitive data.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold mb-6">
                  Easy Integration with <span className="gradient-text">Any Language</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  ModderAuth provides client libraries for all major programming languages, making it easy to integrate authentication into your applications regardless of your tech stack.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Simple API with clear documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Consistent interfaces across languages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Regular updates and security patches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Extensive examples and tutorials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Community support and contributions</span>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/docs/sdks">
                    <Button variant="outline" className="gap-2">
                      View All SDKs
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 overflow-hidden">
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                <div className="flex overflow-x-auto no-scrollbar border-b border-border">
                  {Object.keys(codeExamples).map((lang) => (
                    <button
                      key={lang}
                      className={`code-lang-tab ${codeLanguage === lang ? 'active' : ''}`}
                      onClick={() => setCodeLanguage(lang)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <pre className="p-4 overflow-x-auto rounded-b-xl text-sm">
                  <code>{codeExamples[codeLanguage]}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Use Cases</span> & Applications
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              ModderAuth provides authentication solutions for a wide range of applications and use cases.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>API & Microservices</CardTitle>
                <CardDescription>
                  Secure your APIs and microservices with token-based authentication and fine-grained scopes.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/docs/use-cases/api-microservices" className="flex items-center text-primary text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Server className="h-10 w-10 text-primary mb-2" />
                <CardTitle>SaaS Applications</CardTitle>
                <CardDescription>
                  Add secure login, registration, and multi-tenant access control to your SaaS platform.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/docs/use-cases/saas-applications" className="flex items-center text-primary text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Database className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Enterprise Systems</CardTitle>
                <CardDescription>
                  Integrate with existing identity providers and corporate directories for SSO capabilities.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/docs/use-cases/enterprise-systems" className="flex items-center text-primary text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Social & Community</CardTitle>
                <CardDescription>
                  Allow users to sign up and log in with social providers while maintaining data privacy.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/docs/use-cases/social-community" className="flex items-center text-primary text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Developer Tools</CardTitle>
                <CardDescription>
                  Create developer platforms with API key management and OAuth app registration.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/docs/use-cases/developer-tools" className="flex items-center text-primary text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="feature-card border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <UserCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Mobile Applications</CardTitle>
                <CardDescription>
                  Implement secure native authentication flows in iOS, Android, and cross-platform apps.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/docs/use-cases/mobile-applications" className="flex items-center text-primary text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of developers who trust ModderAuth for their authentication needs. Sign up now to start building secure applications with our powerful authentication platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register">
                    <Button size="lg" className="gap-2">
                      Create Free Account
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline" size="lg" className="gap-2">
                      Read Documentation
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* You can replace this with an actual image or illustration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                    <Lock className="h-24 w-24 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
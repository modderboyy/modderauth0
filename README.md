# ModderAuth

A modern OAuth 2.0 authentication system with standard OAuth flows and developer-friendly integration.

## Features

- Complete OAuth 2.0 implementation with all standard flows
- Multiple language SDKs for easy integration
- Secure token management
- User-friendly authentication screens
- Developer dashboard for application management

## Quick Start

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/modderauth)

## Environment Variables

These environment variables need to be set in your Netlify site:

```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API Documentation

ModderAuth provides a comprehensive API for authentication and authorization:

- `/oauth/authorize` - OAuth 2.0 authorization endpoint
- `/oauth/token` - OAuth 2.0 token endpoint
- `/api/userinfo` - User information endpoint
- `/oauth/revoke` - Token revocation endpoint

## SDK Examples

### JavaScript

```javascript
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
console.log(tokens.access_token);
```

### Python

```python
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
    # Store tokens and authenticate user
```

## License

MIT
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Authorize = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [authRequest, setAuthRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the auth request data from the session
    const fetchAuthRequest = async () => {
      try {
        const response = await fetch('/api/me', {
          credentials: 'include'
        });
        
        if (response.status === 401) {
          // Not logged in, redirect to login
          setLocation(`/login?return_to=${encodeURIComponent('/authorize')}`);
          return;
        }
        
        // Get the auth request from session
        setAuthRequest({
          client_name: new URLSearchParams(window.location.search).get('client_name') || 'Unknown App',
          response_type: new URLSearchParams(window.location.search).get('response_type') || 'code',
          client_id: new URLSearchParams(window.location.search).get('client_id') || '',
          redirect_uri: new URLSearchParams(window.location.search).get('redirect_uri') || '',
          scope: new URLSearchParams(window.location.search).get('scope') || '',
          state: new URLSearchParams(window.location.search).get('state') || '',
          scopes: (new URLSearchParams(window.location.search).get('scope') || '').split(' ')
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching auth request:', error);
        toast({
          title: "Error",
          description: "Could not load authorization request.",
          variant: "destructive",
        });
      }
    };

    fetchAuthRequest();
  }, [setLocation, toast]);

  const authorizeMutation = useMutation({
    mutationFn: async (consent: boolean) => {
      const response = await apiRequest("POST", "/api/authorize", { consent });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Authorization failed",
        description: error.message || "An error occurred during authorization.",
        variant: "destructive",
      });
    },
  });

  const handleAuthorize = () => {
    authorizeMutation.mutate(true);
  };

  const handleDeny = () => {
    authorizeMutation.mutate(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-gray-600">Loading authorization request...</p>
        </div>
      </div>
    );
  }

  if (!authRequest) {
    return (
      <div className="max-w-md mx-auto mt-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Authorization Error</CardTitle>
            <CardDescription>No authorization request found</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              There was an issue with your authorization request. Please try again or contact support.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Authorize Application</CardTitle>
          <CardDescription>
            {authRequest.client_name} wants to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-center mb-6">
              <svg className="h-16 w-16 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5s-.5-.22-.5-.5zm1-12c2.76 0 5 2.24 5 5 0 2.24-1.38 4.14-3.34 4.91-.18.08-.36-.04-.36-.23v-1.04c1.06-.42 1.82-1.46 1.82-2.67 0-1.59-1.29-2.87-2.87-2.87S9.38 9.88 9.38 11.47c0 1.21.76 2.25 1.82 2.67v1.04c0 .19-.18.31-.36.23-1.96-.77-3.34-2.67-3.34-4.91 0-2.76 2.24-5 5-5z" />
              </svg>
            </div>
            
            <p className="mb-4 text-gray-700">
              {authRequest.client_name} would like permission to:
            </p>
            
            <ul className="space-y-2 mb-4">
              {authRequest.scopes.includes('profile') && (
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access your profile information</span>
                </li>
              )}
              {authRequest.scopes.includes('email') && (
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access your email address</span>
                </li>
              )}
            </ul>
            
            <p className="text-sm text-gray-500">
              By authorizing, you allow this application to use your information in accordance with their terms of service and privacy policy.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full bg-primary hover:bg-blue-700"
            onClick={handleAuthorize}
            disabled={authorizeMutation.isPending}
          >
            {authorizeMutation.isPending ? "Authorizing..." : "Authorize"}
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDeny}
            disabled={authorizeMutation.isPending}
          >
            Deny
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Authorize;

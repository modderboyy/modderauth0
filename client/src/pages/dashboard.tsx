import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Clipboard, Copy, Eye, EyeOff, RefreshCw, Plus, Trash } from "lucide-react";

// Types matching our backend schemas
interface OAuthClient {
  id: number;
  clientId: string;
  clientSecret: string;
  name: string;
  userId: number;
  redirectUris: string; // JSON encoded array
  allowedScopes: string; // JSON encoded array
  createdAt: string;
}

interface CreateClientFormData {
  name: string;
  redirectUris: string[];
  allowedScopes: string[];
}

const Dashboard = () => {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  
  // Create client form state
  const [newClient, setNewClient] = useState<CreateClientFormData>({
    name: "",
    redirectUris: [""],
    allowedScopes: ["profile", "email"]
  });

  // Get current user
  const { data: user, isLoading: userLoading, isError: userError } = useQuery({
    queryKey: ['/api/me'],
    onError: () => {
      toast({
        title: "Not authorized",
        description: "Please sign in to view this page",
        variant: "destructive",
      });
      setLocation("/login?return_to=/dashboard");
    }
  });

  // Get user's OAuth clients
  const { 
    data: clients, 
    isLoading: clientsLoading, 
    isError: clientsError 
  } = useQuery({
    queryKey: ['/api/clients'],
    enabled: !!user,
  });

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: async (clientData: CreateClientFormData) => {
      const response = await apiRequest("POST", "/api/clients", clientData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      toast({
        title: "Client created",
        description: "Your OAuth client has been created successfully",
      });
      setNewClient({
        name: "",
        redirectUris: [""],
        allowedScopes: ["profile", "email"]
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create client",
        description: error.message || "An error occurred while creating the client",
        variant: "destructive",
      });
    },
  });

  // Handle creating a new client
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newClient.name.trim()) {
      toast({
        title: "Validation error",
        description: "Client name is required",
        variant: "destructive",
      });
      return;
    }
    
    if (newClient.redirectUris.length === 0 || !newClient.redirectUris[0].trim()) {
      toast({
        title: "Validation error",
        description: "At least one redirect URI is required",
        variant: "destructive",
      });
      return;
    }
    
    if (newClient.allowedScopes.length === 0) {
      toast({
        title: "Validation error",
        description: "At least one scope is required",
        variant: "destructive",
      });
      return;
    }
    
    // Submit form
    createClientMutation.mutate(newClient);
  };

  // Handle adding a new redirect URI input field
  const handleAddRedirectUri = () => {
    setNewClient({
      ...newClient,
      redirectUris: [...newClient.redirectUris, ""]
    });
  };

  // Handle updating a redirect URI
  const handleUpdateRedirectUri = (index: number, value: string) => {
    const updatedUris = [...newClient.redirectUris];
    updatedUris[index] = value;
    setNewClient({
      ...newClient,
      redirectUris: updatedUris
    });
  };

  // Handle removing a redirect URI
  const handleRemoveRedirectUri = (index: number) => {
    if (newClient.redirectUris.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "At least one redirect URI is required",
        variant: "destructive",
      });
      return;
    }
    
    const updatedUris = [...newClient.redirectUris];
    updatedUris.splice(index, 1);
    setNewClient({
      ...newClient,
      redirectUris: updatedUris
    });
  };

  // Handle toggling a scope
  const handleToggleScope = (scope: string) => {
    if (newClient.allowedScopes.includes(scope)) {
      setNewClient({
        ...newClient,
        allowedScopes: newClient.allowedScopes.filter(s => s !== scope)
      });
    } else {
      setNewClient({
        ...newClient,
        allowedScopes: [...newClient.allowedScopes, scope]
      });
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description,
      });
    }, () => {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    });
  };

  // Toggle showing a client secret
  const toggleShowSecret = (clientId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>You need to be logged in to view this page</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please log in to access your dashboard.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setLocation("/login?return_to=/dashboard")}>
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your ModderAuth applications and credentials
        </p>
      </div>

      <Tabs defaultValue="clients">
        <TabsList className="mb-8">
          <TabsTrigger value="clients">OAuth Clients</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your OAuth Clients</CardTitle>
              <CardDescription>
                Manage your registered OAuth 2.0 clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {clientsLoading ? (
                <div className="text-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <p className="mt-2 text-gray-600">Loading OAuth clients...</p>
                </div>
              ) : clientsError ? (
                <div className="text-center py-12 text-red-500">
                  <p>Failed to load OAuth clients. Please try again.</p>
                </div>
              ) : clients && clients.length > 0 ? (
                <div className="space-y-6">
                  {clients.map((client: OAuthClient) => {
                    const redirectUris = JSON.parse(client.redirectUris) as string[];
                    const allowedScopes = JSON.parse(client.allowedScopes) as string[];
                    
                    return (
                      <Card key={client.id} className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-xl flex justify-between items-center">
                            <span>{client.name}</span>
                            <span className="text-sm font-normal text-gray-500">
                              Created: {new Date(client.createdAt).toLocaleDateString()}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm text-gray-500">Client ID</Label>
                            <div className="mt-1 flex items-center">
                              <code className="bg-gray-100 p-2 rounded-md text-sm flex-1 font-mono">
                                {client.clientId}
                              </code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(client.clientId, "Client ID copied to clipboard")}
                                className="ml-2"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm text-gray-500">Client Secret</Label>
                            <div className="mt-1 flex items-center">
                              <code className="bg-gray-100 p-2 rounded-md text-sm flex-1 font-mono">
                                {showSecrets[client.clientId] ? client.clientSecret : '••••••••••••••••••••••••••••••••'}
                              </code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleShowSecret(client.clientId)}
                                className="ml-2"
                              >
                                {showSecrets[client.clientId] ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(client.clientSecret, "Client Secret copied to clipboard")}
                                className="ml-2"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm text-gray-500">Redirect URIs</Label>
                            <div className="mt-1 space-y-2">
                              {redirectUris.map((uri, index) => (
                                <div key={`${client.id}-uri-${index}`} className="bg-gray-100 p-2 rounded-md text-sm">
                                  {uri}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm text-gray-500">Allowed Scopes</Label>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {allowedScopes.map((scope) => (
                                <span 
                                  key={`${client.id}-scope-${scope}`} 
                                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                                >
                                  {scope}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">You don't have any OAuth clients yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New OAuth Client</CardTitle>
              <CardDescription>
                Register a new application to use with ModderAuth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateClient} className="space-y-6">
                <div>
                  <Label htmlFor="client-name">Application Name</Label>
                  <Input
                    id="client-name"
                    placeholder="My Amazing App"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Redirect URIs</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Where should we redirect after successful authorization?
                  </p>
                  
                  {newClient.redirectUris.map((uri, index) => (
                    <div key={`new-uri-${index}`} className="flex items-center mb-2">
                      <Input
                        placeholder="https://your-app.com/callback"
                        value={uri}
                        onChange={(e) => handleUpdateRedirectUri(index, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRedirectUri(index)}
                        className="ml-2"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddRedirectUri}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Redirect URI
                  </Button>
                </div>

                <div>
                  <Label>Allowed Scopes</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    What data should this application be able to access?
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="scope-profile"
                        checked={newClient.allowedScopes.includes("profile")}
                        onCheckedChange={() => handleToggleScope("profile")}
                      />
                      <Label htmlFor="scope-profile">profile (user's basic information)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="scope-email"
                        checked={newClient.allowedScopes.includes("email")}
                        onCheckedChange={() => handleToggleScope("email")}
                      />
                      <Label htmlFor="scope-email">email (user's email address)</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="mt-6 bg-primary hover:bg-blue-700"
                  disabled={createClientMutation.isPending}
                >
                  {createClientMutation.isPending ? "Creating..." : "Create OAuth Client"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                View and update your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label className="text-sm text-gray-500">Username</Label>
                      <div className="mt-1 font-medium">{user.username}</div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-500">Email</Label>
                      <div className="mt-1 font-medium">{user.email}</div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-500">First Name</Label>
                      <div className="mt-1 font-medium">{user.firstName || "—"}</div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-500">Last Name</Label>
                      <div className="mt-1 font-medium">{user.lastName || "—"}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Profile management features coming soon
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

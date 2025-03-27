import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Get return_to parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const returnTo = searchParams.get("return_to") || "/dashboard";

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        variant: "default",
      });
      setLocation(returnTo);
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center">
              <svg className="h-12 w-12 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5s-.5-.22-.5-.5zm1-12c2.76 0 5 2.24 5 5 0 2.24-1.38 4.14-3.34 4.91-.18.08-.36-.04-.36-.23v-1.04c1.06-.42 1.82-1.46 1.82-2.67 0-1.59-1.29-2.87-2.87-2.87S9.38 9.88 9.38 11.47c0 1.21.76 2.25 1.82 2.67v1.04c0 .19-.18.31-.36.23-1.96-.77-3.34-2.67-3.34-4.91 0-2.76 2.24-5 5-5z" />
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">ModderAuth</h2>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <Tabs defaultValue="signin" className="mt-8">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register" onClick={() => setLocation("/register" + (returnTo !== "/dashboard" ? `?return_to=${returnTo}` : ""))}>
                  Register
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm font-medium text-primary hover:text-blue-500">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-700"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign in"}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.545 10.239v3.822h5.445c-.228 1.41-1.67 4.115-5.445 4.115-3.275 0-5.953-2.729-5.953-6.077s2.678-6.077 5.953-6.077c1.869 0 3.12.800 3.84 1.485l2.607-2.500C17.102 3.219 14.96 2.256 12.546 2.256c-5.18 0-9.397 4.215-9.397 9.477 0 5.265 4.218 9.477 9.397 9.477 5.427 0 9.025-3.827 9.025-9.197 0-.682-.069-1.196-.173-1.774h-8.853z"/>
                      </svg>
                    </button>
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.113-1.644-.172-2.467-.17-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.245h3.312z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

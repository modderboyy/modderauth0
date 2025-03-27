import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Get return_to parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  const returnTo = searchParams.get("return_to") || "/dashboard";

  const registerMutation = useMutation({
    mutationFn: async (userData: { 
      username: string; 
      email: string; 
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const response = await apiRequest("POST", "/api/register", userData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
        variant: "default",
      });
      setLocation("/login" + (returnTo !== "/dashboard" ? `?return_to=${returnTo}` : ""));
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    registerMutation.mutate({ 
      username, 
      email, 
      password,
      firstName,
      lastName
    });
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
              <p className="mt-2 text-gray-600">Create a new account</p>
            </div>

            <Tabs defaultValue="register" className="mt-8">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin" onClick={() => setLocation("/login" + (returnTo !== "/dashboard" ? `?return_to=${returnTo}` : ""))}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="register">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-primary hover:bg-blue-700"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="font-medium text-primary hover:text-blue-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-primary hover:text-blue-500">
                    Privacy Policy
                  </a>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

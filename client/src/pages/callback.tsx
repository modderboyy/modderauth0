import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Callback = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get code and state from URL
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (error) {
          setStatus("error");
          setMessage(errorDescription || "Authorization was denied.");
          return;
        }

        if (!code) {
          setStatus("error");
          setMessage("No authorization code received.");
          return;
        }

        // Simulate code exchange - in a real app, this would be done server-side
        // or through a client library that handles the token exchange
        setTimeout(() => {
          setStatus("success");
          setMessage("Authorization successful! The code has been exchanged for access tokens.");
        }, 1000);
        
      } catch (error) {
        console.error("Error processing callback:", error);
        setStatus("error");
        setMessage("An error occurred while processing the authorization callback.");
      }
    };

    processCallback();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {status === "loading" && "Processing Authorization"}
            {status === "success" && "Authorization Successful"}
            {status === "error" && "Authorization Failed"}
          </CardTitle>
          <CardDescription>
            {status === "loading" && "Please wait while we complete the authorization process..."}
            {status === "success" && "Your application has been successfully authorized."}
            {status === "error" && "There was a problem with the authorization process."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" && (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {(status === "success" || status === "error") && (
            <div className={`text-center py-4 ${status === "error" ? "text-red-600" : "text-green-600"}`}>
              {status === "success" && (
                <svg className="h-12 w-12 mx-auto text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {status === "error" && (
                <svg className="h-12 w-12 mx-auto text-red-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p>{message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Callback;

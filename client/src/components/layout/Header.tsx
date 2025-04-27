import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

const Header = () => {
  const [location] = useLocation();
  
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/me'],
    queryFn: async ({ queryKey }) => {
      try {
        const res = await fetch(queryKey[0] as string, {
          credentials: 'include',
        });
        
        if (res.status === 401) {
          return null;
        }
        
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        
        return res.json();
      } catch (error) {
        return null;
      }
    }
  });

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/logout", {});
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path: string) => {
    return location === path ? "border-primary text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5s-.5-.22-.5-.5zm1-12c2.76 0 5 2.24 5 5 0 2.24-1.38 4.14-3.34 4.91-.18.08-.36-.04-.36-.23v-1.04c1.06-.42 1.82-1.46 1.82-2.67 0-1.59-1.29-2.87-2.87-2.87S9.38 9.88 9.38 11.47c0 1.21.76 2.25 1.82 2.67v1.04c0 .19-.18.31-.36.23-1.96-.77-3.34-2.67-3.34-4.91 0-2.76 2.24-5 5-5z" />
              </svg>
              <Link href="/" className="ml-2 text-xl font-semibold text-gray-900 cursor-pointer">
                ModderAuth
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`${isActive("/")} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Home
              </Link>
              <Link href="/docs" className={`${isActive("/docs")} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                Docs
              </Link>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                API
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Support
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isLoading && user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="inline-block">
                  <Button className="bg-primary text-white hover:bg-blue-700">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="inline-block">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register" className="inline-block">
                  <Button className="bg-primary text-white hover:bg-blue-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button type="button" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

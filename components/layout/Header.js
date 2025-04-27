import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, X, Moon, Sun, 
  Github, Codepen, Languages, 
  Code, Lock, Key, Settings, 
  LogOut, Home, FileText, 
  BarChart, Database, Server 
} from 'lucide-react';

const languages = [
  { code: 'javascript', name: 'JavaScript', icon: <Code size={16} /> },
  { code: 'python', name: 'Python', icon: <Code size={16} /> },
  { code: 'java', name: 'Java', icon: <Code size={16} /> },
  { code: 'csharp', name: 'C#', icon: <Code size={16} /> },
  { code: 'go', name: 'Go', icon: <Code size={16} /> },
  { code: 'php', name: 'PHP', icon: <Code size={16} /> },
  { code: 'ruby', name: 'Ruby', icon: <Code size={16} /> },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // For dynamic user fetching
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/me'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/me');
        if (!response.ok) {
          return null;
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    },
  });

  // Function to check if the path is active
  const isActive = (path) => {
    return router.pathname === path ? 'border-primary text-primary' : 'border-transparent text-foreground/80 hover:text-foreground';
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6 px-2 py-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">ModderAuth</span>
                </div>
                <nav className="flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
                      <Home size={18} />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/docs" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
                      <FileText size={18} />
                      <span>Documentation</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/examples" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
                      <Code size={18} />
                      <span>Examples</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/pricing" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
                      <BarChart size={18} />
                      <span>Pricing</span>
                    </Link>
                  </SheetClose>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex w-full justify-start gap-2 px-3 py-6">
                        <Languages size={18} />
                        <span>Language SDKs</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {languages.map((lang) => (
                        <DropdownMenuItem key={lang.code} className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            {lang.icon}
                            <span>{lang.name} SDK</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
                
                <div className="mt-4 border-t border-border pt-4">
                  {!userLoading && user ? (
                    <div className="flex flex-col gap-2">
                      <SheetClose asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
                          <Database size={18} />
                          <span>Dashboard</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-secondary">
                          <Settings size={18} />
                          <span>Settings</span>
                        </Link>
                      </SheetClose>
                      <Button
                        variant="ghost"
                        className="flex w-full justify-start gap-2 px-3 py-2 hover:bg-secondary"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <SheetClose asChild>
                        <Link href="/login">
                          <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/register">
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold hidden md:inline-flex">ModderAuth</span>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className={`${isActive('/')} border-b-2 py-4 text-sm font-medium transition-colors hover:text-foreground`}>
            Home
          </Link>
          <Link href="/docs" className={`${isActive('/docs')} border-b-2 py-4 text-sm font-medium transition-colors hover:text-foreground`}>
            Documentation
          </Link>
          <Link href="/examples" className={`${isActive('/examples')} border-b-2 py-4 text-sm font-medium transition-colors hover:text-foreground`}>
            Examples
          </Link>
          <Link href="/pricing" className={`${isActive('/pricing')} border-b-2 py-4 text-sm font-medium transition-colors hover:text-foreground`}>
            Pricing
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1 font-medium">
                <Languages size={16} className="mr-1" />
                SDKs
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    {lang.icon}
                    <span>{lang.name} SDK</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle theme">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {!userLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 overflow-hidden">
                  <Avatar>
                    <AvatarImage src={user.avatar || ''} alt={user.username} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {user.username?.slice(0, 2).toUpperCase() || "MA"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard" className="flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          
          <Link href="https://github.com/yourusername/modderauth" target="_blank" rel="noopener noreferrer" className="hidden md:flex">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
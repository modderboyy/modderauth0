import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Github, Twitter, Linkedin, Facebook, Instagram, Mail, Heart,
  Globe, CheckCircle, Lock, Shield, Clock, Database
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ModderAuth</span>
            </div>
            <p className="text-muted-foreground">
              Powerful, developer-friendly OAuth 2.0 authentication system for modern applications.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="GitHub">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sdk/javascript" className="text-muted-foreground hover:text-foreground transition-colors">
                  JavaScript SDK
                </Link>
              </li>
              <li>
                <Link href="/sdk/python" className="text-muted-foreground hover:text-foreground transition-colors">
                  Python SDK
                </Link>
              </li>
              <li>
                <Link href="/sdk/java" className="text-muted-foreground hover:text-foreground transition-colors">
                  Java SDK
                </Link>
              </li>
              <li>
                <Link href="/sdk/csharp" className="text-muted-foreground hover:text-foreground transition-colors">
                  C# SDK
                </Link>
              </li>
              <li>
                <Link href="/sdk/go" className="text-muted-foreground hover:text-foreground transition-colors">
                  Go SDK
                </Link>
              </li>
              <li>
                <Link href="/sdk/ruby" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ruby SDK
                </Link>
              </li>
              <li>
                <Link href="/sdk/php" className="text-muted-foreground hover:text-foreground transition-colors">
                  PHP SDK
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} ModderAuth. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Made with <Heart className="inline-block h-4 w-4 text-red-500" /> for developers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  KeyRound, 
  FileText, 
  Home, 
  Menu, 
  X,
  Globe,
  Github
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8",
        isScrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-xl transition-all hover:opacity-80"
        >
          <Globe className="h-6 w-6 text-accent" />
          <span className="hidden sm:inline">TrafficManager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" isActive={isActive('/')}>
            <Home className="h-4 w-4 mr-1" />
            Home
          </NavLink>
          <NavLink to="/docs" isActive={isActive('/docs')}>
            <FileText className="h-4 w-4 mr-1" />
            Documentation
          </NavLink>
          <NavLink to="/generator" isActive={isActive('/generator')}>
            <KeyRound className="h-4 w-4 mr-1" />
            Generate API Key
          </NavLink>

          <div className="h-5 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            GitHub
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/docs">API Docs</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/generator">Get API Key</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 shadow-lg animate-fade-down">
          <div className="px-6 py-4 flex flex-col gap-4">
            <MobileNavLink to="/" isActive={isActive('/')}>
              <Home className="h-5 w-5 mr-2" />
              Home
            </MobileNavLink>
            <MobileNavLink to="/docs" isActive={isActive('/docs')}>
              <FileText className="h-5 w-5 mr-2" />
              Documentation
            </MobileNavLink>
            <MobileNavLink to="/generator" isActive={isActive('/generator')}>
              <KeyRound className="h-5 w-5 mr-2" />
              Generate API Key
            </MobileNavLink>
            
            <div className="h-px w-full bg-gray-200 dark:bg-gray-800 my-2"></div>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </a>
            
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/docs">API Docs</Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link to="/generator">Get API Key</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ 
  children, 
  to, 
  isActive 
}: { 
  children: React.ReactNode;
  to: string;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center text-sm font-medium transition-colors",
      isActive 
        ? "text-foreground" 
        : "text-muted-foreground hover:text-foreground"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  children, 
  to, 
  isActive 
}: { 
  children: React.ReactNode;
  to: string;
  isActive: boolean;
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
      isActive 
        ? "text-accent bg-accent/10" 
        : "text-foreground hover:bg-muted"
    )}
  >
    {children}
  </Link>
);

export default Navbar;

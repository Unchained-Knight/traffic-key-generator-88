
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, BarChart3, FileText, Traffic, Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomNavbar = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800">
          <div className="relative">
            <Traffic className="h-5 w-5 text-primary" />
            <div className="absolute -inset-0.5 rounded-full bg-primary/20 animate-pulse-ring opacity-75"></div>
          </div>
          <span>AI Traffic Control</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavButton 
            to="/"
            active={location.pathname === "/"}
            label="Dashboard"
            icon={<Gauge className="h-4 w-4 mr-1.5" />}
          />
          <NavButton 
            to="/simulator"
            active={location.pathname === "/simulator"}
            label="Simulator"
            icon={<Car className="h-4 w-4 mr-1.5" />}
          />
          <NavButton 
            to="/green-light"
            active={location.pathname === "/green-light"}
            label="Traffic Analysis"
            icon={<BarChart3 className="h-4 w-4 mr-1.5" />}
          />
          <NavButton 
            to="/docs"
            active={location.pathname === "/docs"}
            label="API Docs"
            icon={<FileText className="h-4 w-4 mr-1.5" />}
          />
          <NavButton 
            to="/generator"
            active={location.pathname === "/generator"}
            label="API Keys"
            icon={<Key className="h-4 w-4 mr-1.5" />}
          />
        </nav>
      </div>
    </header>
  );
};

interface NavButtonProps {
  to: string;
  active: boolean;
  label: string;
  icon: React.ReactNode;
}

const NavButton = ({ to, active, label, icon }: NavButtonProps) => (
  <Button 
    variant={active ? "default" : "ghost"}
    size="sm" 
    asChild
    className={cn(
      active 
        ? "bg-primary hover:bg-primary/90" 
        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    )}
  >
    <Link to={to} className="flex items-center">
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  </Button>
);

export default CustomNavbar;

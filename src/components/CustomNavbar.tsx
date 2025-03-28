
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';

const CustomNavbar = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800">
          <Car className="h-5 w-5 text-blue-500" />
          <span>Traffic Manager</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant={location.pathname === "/" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={location.pathname === "/" ? "bg-blue-500 hover:bg-blue-600" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}
          >
            <Link to="/">Home</Link>
          </Button>
          <Button 
            variant={location.pathname === "/simulator" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={location.pathname === "/simulator" ? "bg-blue-500 hover:bg-blue-600" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}
          >
            <Link to="/simulator">Simulator</Link>
          </Button>
          <Button 
            variant={location.pathname === "/green-light" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={location.pathname === "/green-light" ? "bg-blue-500 hover:bg-blue-600" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}
          >
            <Link to="/green-light">Green Light</Link>
          </Button>
          <Button 
            variant={location.pathname === "/docs" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={location.pathname === "/docs" ? "bg-blue-500 hover:bg-blue-600" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}
          >
            <Link to="/docs">Docs</Link>
          </Button>
          <Button 
            variant={location.pathname === "/generator" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={location.pathname === "/generator" ? "bg-blue-500 hover:bg-blue-600" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}
          >
            <Link to="/generator">API Keys</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default CustomNavbar;

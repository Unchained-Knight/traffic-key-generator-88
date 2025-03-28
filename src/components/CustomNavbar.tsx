
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, BarChart3, FileText, Globe, Gauge, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomNavbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect if page is scrolled
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
        scrolled ? "border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm" : "bg-transparent",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl text-gray-800 transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <Globe className="h-5 w-5 text-primary animate-pulse-soft" />
            <div className="absolute -inset-0.5 rounded-full bg-primary/20 animate-pulse-ring opacity-75"></div>
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">AI Traffic Control</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item, index) => (
            <NavButton 
              key={item.to}
              to={item.to}
              active={location.pathname === item.to}
              label={item.label}
              icon={item.icon}
              delay={index * 100}
            />
          ))}
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
  delay?: number;
}

const NavButton = ({ to, active, label, icon, delay = 0 }: NavButtonProps) => (
  <Button 
    variant={active ? "default" : "ghost"}
    size="sm" 
    asChild
    className={cn(
      "overflow-hidden transition-all duration-300",
      active 
        ? "bg-primary hover:bg-primary/90" 
        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
    )}
    style={{ 
      animationDelay: `${delay}ms`,
      transform: "translateY(0)",
      opacity: 1,
      animation: "fade-down 0.5s ease-out backwards" 
    }}
  >
    <Link to={to} className="flex items-center">
      {icon}
      <span className="hidden sm:inline ml-1.5">{label}</span>
    </Link>
  </Button>
);

// Navigation items data
const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: <Gauge className="h-4 w-4 mr-1.5" />,
  },
  {
    to: "/simulator",
    label: "Simulator", 
    icon: <Car className="h-4 w-4 mr-1.5" />,
  },
  {
    to: "/green-light",
    label: "Traffic Analysis",
    icon: <BarChart3 className="h-4 w-4 mr-1.5" />,
  },
  {
    to: "/docs",
    label: "API Docs",
    icon: <FileText className="h-4 w-4 mr-1.5" />,
  },
  {
    to: "/generator",
    label: "API Keys",
    icon: <KeyRound className="h-4 w-4 mr-1.5" />,
  }
];

export default CustomNavbar;

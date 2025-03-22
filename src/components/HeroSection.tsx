
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, LineChart, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10" 
        aria-hidden="true"
      />
      
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDJCNDAiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzAgNjBWME0wIDMwaDYwIi8+PC9nPjwvc3ZnPg==')]"
        style={{ opacity: 0.07 }}
        aria-hidden="true"
      />

      <div className="container px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-accent/10 text-accent animate-fade-in">
            <span className="flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Traffic management made simple
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up [animation-delay:200ms] text-balance">
            The modern API for
            <span className="relative">
              <span className="relative z-10 px-2 whitespace-nowrap">traffic management</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-accent/20 -z-10 skew-x-3"></span>
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8 animate-fade-up [animation-delay:400ms] text-balance">
            Our powerful API provides developers with the tools they need to monitor, manage, and optimize traffic flow across their applications.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-up [animation-delay:600ms]">
            <Button asChild size="lg" className="h-12 px-6">
              <Link to="/generator">
                Get your API key
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6">
              <Link to="/docs">
                Read the docs
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-up [animation-delay:800ms]">
          <StatsCard 
            icon={<Globe className="w-5 h-5 text-blue-500" />}
            value="99.99%"
            label="Global uptime"
            gradient="from-blue-500/20 to-blue-600/5"
          />
          <StatsCard 
            icon={<LineChart className="w-5 h-5 text-green-500" />}
            value="500ms"
            label="Average latency"
            gradient="from-green-500/20 to-green-600/5"
          />
          <StatsCard 
            icon={<Shield className="w-5 h-5 text-purple-500" />}
            value="100%"
            label="Request security"
            gradient="from-purple-500/20 to-purple-600/5"
          />
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
}

const StatsCard = ({ icon, value, label, gradient }: StatsCardProps) => {
  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden p-6 glass-panel transition-all duration-300 hover:scale-105",
      "before:absolute before:inset-0 before:opacity-20 before:bg-gradient-to-br",
      `before:${gradient}`
    )}>
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-sm">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

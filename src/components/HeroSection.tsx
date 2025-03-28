
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, BarChart3, Gauge, Zap, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    { icon: <Car className="w-6 h-6" />, title: "Vehicle Detection", description: "99.8% accurate vehicle detection with cutting-edge computer vision AI" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Real-time Analytics", description: "Process and analyze traffic patterns as they develop" },
    { icon: <Gauge className="w-6 h-6" />, title: "Adaptive Control", description: "Optimize signal timing based on actual traffic conditions" }
  ];
  
  // Feature rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Initial animation for elements with fade-up class
  useEffect(() => {
    const animateElements = document.querySelectorAll('.animate-fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => observer.observe(el));
    
    return () => {
      animateElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const handleDemoToast = () => {
    toast({
      title: "Demo Notification",
      description: "This is a sample notification to demonstrate the toasts system",
      variant: "default",
    });
  };
  
  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent -z-10"
        aria-hidden="true"
      />
      
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDJCNDAiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzAgNjBWME0wIDMwaDYwIi8+PC9nPjwvc3ZnPg==')] opacity-[0.07]"
        aria-hidden="true"
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-flex items-center justify-center px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in"
          >
            <span className="flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 animate-pulse-soft" />
              AI-powered traffic management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up [animation-delay:200ms] text-balance">
            Intelligent
            <span className="relative">
              <span className="relative z-10 px-2 whitespace-nowrap text-primary"> traffic control </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10 skew-x-3"></span>
            </span>
            with AI vision
          </h1>

          <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8 animate-fade-up [animation-delay:400ms] text-balance">
            Our advanced computer vision AI identifies vehicles at intersections and optimizes traffic signal timing for maximum flow efficiency and reduced congestion.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-up [animation-delay:600ms]">
            <Button asChild size="lg" className="h-12 px-6 animate-pulse-soft transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Link to="/simulator">
                Try the simulator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 transition-all duration-300 hover:scale-105 backdrop-blur bg-white/10 hover:bg-white/20 border-white/20">
              <Link to="/docs">
                API Documentation
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="h-12 px-6 transition-all duration-300 hover:scale-105" onClick={handleDemoToast}>
              Notification Demo
            </Button>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="max-w-md mx-auto mb-16 glass-panel p-6 rounded-xl animate-fade-up [animation-delay:800ms]">
          <div className="relative h-[120px] overflow-hidden">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-500 flex items-start gap-4",
                  index === activeFeature 
                    ? "opacity-100 translate-x-0" 
                    : index < activeFeature 
                      ? "opacity-0 -translate-x-full" 
                      : "opacity-0 translate-x-full"
                )}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {features.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeFeature ? "bg-primary w-6" : "bg-gray-300 dark:bg-gray-700"
                )}
                onClick={() => setActiveFeature(index)}
                aria-label={`View feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatsCard 
            icon={<Car className="w-5 h-5 text-primary" />}
            value="99.8%"
            label="Vehicle detection accuracy"
            gradient="from-primary/20 to-primary/5"
            delay={0}
          />
          <StatsCard 
            icon={<BarChart3 className="w-5 h-5 text-green-500" />}
            value="32%"
            label="Congestion reduction"
            gradient="from-green-500/20 to-green-600/5"
            delay={200}
          />
          <StatsCard 
            icon={<Gauge className="w-5 h-5 text-amber-500" />}
            value="45%"
            label="Faster travel times"
            gradient="from-amber-500/20 to-amber-600/5"
            delay={400}
          />
        </div>

        {/* Key Benefits */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 animate-fade-up">Key Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Reduce traffic congestion by up to 32%",
              "Decrease fuel consumption and emissions",
              "Improve emergency response times",
              "Enhance pedestrian and cyclist safety",
              "Lower maintenance costs for infrastructure",
              "Generate detailed traffic analytics"
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 animate-fade-up"
                style={{ animationDelay: `${index * 100 + 1000}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-base">{benefit}</p>
              </div>
            ))}
          </div>
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
  delay?: number;
}

const StatsCard = ({ icon, value, label, gradient, delay = 0 }: StatsCardProps) => {
  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden p-6 glass-panel transition-all duration-500 hover:scale-105 hover:shadow-lg",
        "before:absolute before:inset-0 before:opacity-20 before:bg-gradient-to-br",
        `before:${gradient}`,
        "animate-fade-up"
      )}
      style={{ animationDelay: `${800 + delay}ms` }}
    >
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

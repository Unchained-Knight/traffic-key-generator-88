
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, BarChart3, Gauge, Zap, CheckCircle, Battery, Cpu, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  const features = [
    { icon: <Car className="w-6 h-6" />, title: "Vehicle Detection", description: "99.8% accurate vehicle detection with cutting-edge computer vision AI" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Real-time Analytics", description: "Process and analyze traffic patterns as they develop" },
    { icon: <Gauge className="w-6 h-6" />, title: "Adaptive Control", description: "Optimize signal timing based on actual traffic conditions" },
    { icon: <Cpu className="w-6 h-6" />, title: "Edge Processing", description: "Powerful on-device AI for minimal latency and maximum reliability" },
    { icon: <LineChart className="w-6 h-6" />, title: "Predictive Modeling", description: "Anticipate traffic surges before they occur with ML algorithms" }
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

  // Parallax mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDemoToast = () => {
    toast({
      title: "AI System Notification",
      description: "Traffic optimization algorithm has been updated with latest data",
      variant: "default",
    });
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden pt-32 pb-24"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent -z-10 transition-all duration-500"
        style={{ 
          transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)`,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.1), transparent 70%)',
        }}
        aria-hidden="true"
      />
      
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDJCNDAiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzAgNjBWME0wIDMwaDYwIi8+PC9nPjwvc3ZnPg==')] opacity-[0.07] transition-opacity duration-1000 hover:opacity-[0.09]"
        style={{ transform: `translate3d(${mousePosition.x * -10}px, ${mousePosition.y * -10}px, 0)` }}
        aria-hidden="true"
      />
      
      {/* Floating decorative elements with parallax effect */}
      <div 
        className="absolute top-40 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-10 animate-float transition-transform duration-300" 
        style={{ transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)` }}
      />
      <div 
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10 animate-float transition-transform duration-300" 
        style={{ 
          animationDelay: "2s",
          transform: `translate3d(${mousePosition.x * -40}px, ${mousePosition.y * -40}px, 0)` 
        }}
      />
      
      {/* Small particles that follow cursor */}
      <div 
        className="absolute w-4 h-4 rounded-full bg-blue-500/30 blur-sm -z-10 transition-transform duration-200"
        style={{ 
          left: `calc(50% + ${mousePosition.x * 100}px)`, 
          top: `calc(50% + ${mousePosition.y * 100}px)`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        className="absolute w-6 h-6 rounded-full bg-purple-500/20 blur-sm -z-10 transition-transform duration-300"
        style={{ 
          left: `calc(50% + ${mousePosition.x * 150}px)`, 
          top: `calc(50% + ${mousePosition.y * 150}px)`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div className="container px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-flex items-center justify-center px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in backdrop-blur-sm hover:bg-primary/20 transition-colors duration-300 cursor-default group"
          >
            <span className="flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 animate-pulse-soft group-hover:animate-none" />
              <span className="group-hover:scale-105 transition-transform duration-300">AI-powered traffic management</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up [animation-delay:200ms] text-balance">
            Intelligent
            <span className="relative mx-2">
              <span className="relative z-10 px-2 whitespace-nowrap text-primary"> traffic control </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10 skew-x-3 group-hover:bg-primary/30 transition-colors duration-300"></span>
            </span>
            with AI vision
          </h1>

          <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8 animate-fade-up [animation-delay:400ms] text-balance">
            Our advanced computer vision AI identifies vehicles at intersections and optimizes traffic signal timing for maximum flow efficiency and reduced congestion.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-up [animation-delay:600ms]">
            <Button 
              asChild 
              size="lg" 
              className="h-12 px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 group"
            >
              <Link to="/simulator">
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-[-4px]">Try the simulator</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="h-12 px-6 transition-all duration-300 hover:scale-105 backdrop-blur bg-white/10 hover:bg-white/20 border-white/20 shadow-sm"
            >
              <Link to="/docs">
                API Documentation
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="h-12 px-6 transition-all duration-300 hover:scale-105 shadow-sm relative overflow-hidden group" 
              onClick={handleDemoToast}
            >
              <span className="relative z-10">Notification Demo</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </div>
        </div>

        {/* Feature Showcase - Enhanced with interactive animations */}
        <div className="max-w-md mx-auto mb-16 glass-panel p-6 rounded-xl animate-fade-up [animation-delay:800ms] backdrop-blur-md hover:shadow-lg transition-all duration-300">
          <div className="relative h-[120px] overflow-hidden">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-700 flex items-start gap-4",
                  index === activeFeature 
                    ? "opacity-100 translate-x-0" 
                    : index < activeFeature 
                      ? "opacity-0 -translate-x-full" 
                      : "opacity-0 translate-x-full"
                )}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:bg-primary/20">
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
                  "w-2 h-2 rounded-full transition-all duration-500",
                  index === activeFeature ? "bg-primary w-6" : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/50 dark:hover:bg-primary/50"
                )}
                onClick={() => setActiveFeature(index)}
                aria-label={`View feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats with enhanced hover interactions */}
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

        {/* Key Benefits - Enhanced with animation on hover */}
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
                className="flex items-start gap-3 p-4 rounded-lg backdrop-blur-sm bg-white/5 dark:bg-gray-800/20 border border-gray-200/20 dark:border-gray-700/20 animate-fade-up hover:bg-white/10 dark:hover:bg-gray-800/30 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100 + 1000}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 text-center max-w-2xl mx-auto animate-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to revolutionize traffic flow?</h2>
          <p className="text-muted-foreground mb-8">Experience the future of intelligent traffic management with our cutting-edge AI technology.</p>
          <Button 
            asChild 
            size="lg" 
            className="h-12 px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-500 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 group"
          >
            <Link to="/simulator">
              Start Simulation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
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
        "relative rounded-xl overflow-hidden p-6 glass-panel transition-all duration-500 hover:scale-105 hover:shadow-lg group cursor-default",
        "before:absolute before:inset-0 before:opacity-20 before:bg-gradient-to-br",
        `before:${gradient}`,
        "animate-fade-up"
      )}
      style={{ animationDelay: `${800 + delay}ms` }}
    >
      <div className="relative z-10 flex items-center gap-4">
        <div className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">{value}</div>
          <div className="text-sm text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">{label}</div>
        </div>
      </div>
      
      {/* Background animation effect */}
      <div className="absolute -bottom-1 -right-1 w-20 h-20 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default HeroSection;

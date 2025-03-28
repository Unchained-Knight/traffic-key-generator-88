
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, BarChart3, Gauge, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallaxElementsRef = useRef<NodeListOf<Element> | null>(null);
  
  useEffect(() => {
    // Initialize parallax elements
    if (parallaxRef.current) {
      parallaxElementsRef.current = parallaxRef.current.querySelectorAll('.parallax-element');
    }
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Apply parallax effect to elements
      if (parallaxElementsRef.current) {
        parallaxElementsRef.current.forEach((el) => {
          const htmlElement = el as HTMLElement;
          const speed = parseFloat(htmlElement.dataset.speed || '0.1');
          const direction = htmlElement.dataset.direction || 'up';
          
          let yPos;
          if (direction === 'up') {
            yPos = `-${scrollY * speed}px`;
          } else {
            yPos = `${scrollY * speed}px`;
          }
          
          htmlElement.style.transform = `translate3d(0, ${yPos}, 0)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial animation triggers for elements with fade-up class
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
      window.removeEventListener('scroll', handleScroll);
      animateElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden pt-28 pb-20" ref={parallaxRef}>
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent -z-10 parallax-element"
        data-speed="0.05"
        data-direction="up"
        aria-hidden="true"
      />
      
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDJCNDAiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzAgNjBWME0wIDMwaDYwIi8+PC9nPjwvc3ZnPg==')]"
        style={{ opacity: 0.07 }}
        aria-hidden="true"
        className="parallax-element"
        data-speed="0.1"
        data-direction="down"
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl -z-10 parallax-element" data-speed="0.2" data-direction="up" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10 parallax-element" data-speed="0.15" data-direction="down" />

      <div className="container px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="inline-flex items-center justify-center px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary animate-fade-in"
          >
            <span className="flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              AI-powered traffic management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up [animation-delay:200ms] text-balance parallax-element" data-speed="0.05" data-direction="up">
            Intelligent
            <span className="relative">
              <span className="relative z-10 px-2 whitespace-nowrap text-primary"> traffic control </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10 skew-x-3 parallax-element" data-speed="0.12" data-direction="up"></span>
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
        `before:${gradient}`
      )}
      style={{ animationDelay: `${800 + delay}ms` }}
      className="animate-fade-up"
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

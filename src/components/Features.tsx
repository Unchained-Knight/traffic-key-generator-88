
import React from 'react';
import { 
  BarChart3, 
  Shield, 
  Eye, 
  Zap, 
  TrafficCone,
  Car,
  Clock,
  Truck,
  Gauge,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div 
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" 
        aria-hidden="true"
      />
      
      <div className="container px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            AI-powered traffic management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Our computer vision technology monitors traffic in real-time to optimize signal timing and improve traffic flow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Eye />}
            title="Computer Vision Detection"
            description="Advanced AI identifies and tracks vehicles, pedestrians, and cyclists with 99.8% accuracy."
            color="primary"
            delay={100}
          />
          <FeatureCard 
            icon={<Gauge />}
            title="Real-time Analysis"
            description="Process traffic camera feeds to analyze vehicle density and traffic patterns instantly."
            color="indigo"
            delay={200}
          />
          <FeatureCard 
            icon={<BarChart3 />}
            title="Dynamic Signal Timing"
            description="Automatically adjust green light durations based on current traffic conditions at each approach."
            color="violet"
            delay={300}
          />
          <FeatureCard 
            icon={<Car />}
            title="Vehicle Classification"
            description="Distinguish between cars, buses, and emergency vehicles to prioritize traffic accordingly."
            color="amber"
            delay={400}
          />
          <FeatureCard 
            icon={<Clock />}
            title="Predictive Modeling"
            description="Forecast traffic patterns based on historical data to prepare for rush hours and events."
            color="green"
            delay={500}
          />
          <FeatureCard 
            icon={<TrafficCone />}
            title="Congestion Prevention"
            description="Identify bottlenecks before they form and adjust signal timing to prevent traffic jams."
            color="cyan"
            delay={600}
          />
          <FeatureCard 
            icon={<Truck />}
            title="Emergency Vehicle Priority"
            description="Automatically detect emergency vehicles and provide green light corridors for faster response times."
            color="red"
            delay={700}
          />
          <FeatureCard 
            icon={<Shield />}
            title="Secure Implementation"
            description="End-to-end encryption and secure API access ensure your traffic system remains protected."
            color="purple"
            delay={800}
          />
          <FeatureCard 
            icon={<MapPin />}
            title="Intersection Mapping"
            description="Create digital twins of intersections for optimal camera placement and signal coordination."
            color="teal"
            delay={900}
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, color, delay }: FeatureCardProps) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90",
      blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
      violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
      purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
      green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
      red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      teal: "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
    };
    
    return colorMap[color] || colorMap.primary;
  };
  
  return (
    <div 
      className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
        getColorClasses(color)
      )}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: "w-6 h-6" 
        })}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Features;

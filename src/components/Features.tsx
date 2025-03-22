
import React from 'react';
import { 
  RefreshCw, 
  Shield, 
  BarChart3, 
  Zap, 
  Globe, 
  Lock,
  Server,
  Gauge,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Features = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="features">
      {/* Background decoration */}
      <div 
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" 
        aria-hidden="true"
      />
      
      <div className="container px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            Designed for developers, by developers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Our platform provides all the tools you need to manage traffic with precision and confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Gauge />}
            title="Real-time Monitoring"
            description="Track traffic patterns, bottlenecks, and performance metrics with sub-second accuracy."
            color="blue"
            delay={100}
          />
          <FeatureCard 
            icon={<Shield />}
            title="Advanced Security"
            description="Protect your infrastructure with our state-of-the-art security protocols and DDoS protection."
            color="indigo"
            delay={200}
          />
          <FeatureCard 
            icon={<BarChart3 />}
            title="Detailed Analytics"
            description="Gain insights into traffic patterns with comprehensive reporting and visualization tools."
            color="violet"
            delay={300}
          />
          <FeatureCard 
            icon={<Zap />}
            title="High Performance"
            description="Engineered for speed and reliability, with global CDN support for minimal latency."
            color="amber"
            delay={400}
          />
          <FeatureCard 
            icon={<Clock />}
            title="Scheduled Operations"
            description="Set up automated traffic rules and policies based on time, load, or custom triggers."
            color="green"
            delay={500}
          />
          <FeatureCard 
            icon={<Globe />}
            title="Global Infrastructure"
            description="Leverage our worldwide network of servers for optimal performance everywhere."
            color="cyan"
            delay={600}
          />
          <FeatureCard 
            icon={<Server />}
            title="Edge Computing"
            description="Process requests at the network edge for faster response times and reduced bandwidth."
            color="red"
            delay={700}
          />
          <FeatureCard 
            icon={<Lock />}
            title="Access Control"
            description="Implement fine-grained access controls with role-based permissions and token authentication."
            color="purple"
            delay={800}
          />
          <FeatureCard 
            icon={<RefreshCw />}
            title="Seamless Integration"
            description="Easy integration with popular frameworks and platforms through our comprehensive SDKs."
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
    
    return colorMap[color] || colorMap.blue;
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

import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import ApiGenerator from '@/components/ApiGenerator';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Car, Cpu, Zap, Activity } from 'lucide-react';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Traffic flow animation in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: i % 3 === 0 ? 'rgba(59, 130, 246, 0.7)' : i % 3 === 1 ? 'rgba(99, 102, 241, 0.5)' : 'rgba(16, 185, 129, 0.6)',
      });
    }

    // Resize canvas to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines (representing roads)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges with some randomness
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
          particle.speedX += (Math.random() * 0.2 - 0.1);
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
          particle.speedY += (Math.random() * 0.2 - 0.1);
        }
        
        // Keep speed in bounds
        particle.speedX = Math.max(-3, Math.min(3, particle.speedX));
        particle.speedY = Math.max(-3, Math.min(3, particle.speedY));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
      />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl animate-pulse-soft z-0" />
      <div className="absolute bottom-1/3 left-10 w-32 h-32 rounded-full bg-primary/10 blur-xl animate-float z-0" />
      
      {/* Floating icons with parallax effect */}
      <motion.div 
        className="absolute left-[10%] top-[15%] text-primary/20 opacity-70 z-0"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.7, 0.4, 0.7]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <Car size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute right-[15%] top-[60%] text-green-500/20 opacity-50 z-0"
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <Cpu size={80} />
      </motion.div>
      
      <motion.div 
        className="absolute left-[20%] top-[70%] text-purple-500/20 opacity-60 z-0"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      >
        <Zap size={50} />
      </motion.div>
      
      <motion.div 
        className="absolute right-[25%] top-[25%] text-blue-500/20 opacity-40 z-0"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <Activity size={70} />
      </motion.div>

      <CustomNavbar />
      
      <main className="flex-grow relative z-10">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Features />
        </motion.div>
        
        <motion.section 
          className="py-20 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-950/90 z-0"></div>
          <div className="container px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Ready to get started?
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Generate your API key now and start managing your traffic in minutes.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="transition-all duration-300"
            >
              <ApiGenerator />
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

// TypeScript interface for particles
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export default Index;

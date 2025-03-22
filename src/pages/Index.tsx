
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import ApiGenerator from '@/components/ApiGenerator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <main className="flex-grow">
        <HeroSection />
        <Features />
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative">
          <div className="container px-4 sm:px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Generate your API key now and start managing your traffic in minutes.
              </p>
            </div>
            <ApiGenerator />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

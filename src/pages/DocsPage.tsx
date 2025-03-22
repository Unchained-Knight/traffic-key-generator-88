
import React from 'react';
import Navbar from '@/components/Navbar';
import Documentation from '@/components/Documentation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DocsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Everything you need to know about integrating with the Traffic Manager API.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/generator">
                  Get API Key
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <Documentation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocsPage;


import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import GreenLightCalculator from '@/components/GreenLightCalculator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart } from 'lucide-react';

const GreenLightPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Smart Green Light Calculator</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Calculate optimal green light timings based on detected vehicles at intersections.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/simulator">
                  <BarChart className="mr-2 h-4 w-4" />
                  View Full Traffic Simulator
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  API Documentation
                </Link>
              </Button>
            </div>
          </div>
          
          <GreenLightCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GreenLightPage;

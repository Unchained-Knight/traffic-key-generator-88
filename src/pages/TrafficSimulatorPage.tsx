
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import TrafficSimulator from '@/components/TrafficSimulator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const TrafficSimulatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Traffic Signal Simulator</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Upload intersection images and calculate optimal signal timings based on traffic volume.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  View API Documentation
                </Link>
              </Button>
            </div>
          </div>
          
          <TrafficSimulator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrafficSimulatorPage;

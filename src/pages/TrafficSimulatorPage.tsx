
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import TrafficSimulator from '@/components/TrafficSimulator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart, Gauge } from 'lucide-react';

const TrafficSimulatorPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10 text-primary">
              <BarChart className="h-5 w-5" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">AI Traffic Simulator</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Simulate and test how our AI analyzes traffic patterns to optimize intersection signal timing.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50">
                <Link to="/green-light">
                  <BarChart className="mr-2 h-4 w-4" />
                  Traffic Analysis
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50">
                <Link to="/">
                  <Gauge className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  API Documentation
                </Link>
              </Button>
            </div>
          </div>
          
          <TrafficSimulator />
          
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">How the AI Traffic Simulator Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-3">1</div>
                <h4 className="font-medium mb-2">Image Analysis</h4>
                <p className="text-sm text-muted-foreground">Our computer vision model processes traffic camera feeds to detect and classify vehicles.</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-3">2</div>
                <h4 className="font-medium mb-2">Traffic Calculation</h4>
                <p className="text-sm text-muted-foreground">Traffic density is calculated based on vehicle count, type, and distribution at each approach.</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-3">3</div>
                <h4 className="font-medium mb-2">Signal Optimization</h4>
                <p className="text-sm text-muted-foreground">AI algorithms generate optimal traffic signal timing to maximize flow and minimize wait times.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrafficSimulatorPage;


import React, { useState } from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import TrafficSimulator from '@/components/TrafficSimulator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TrafficSimulatorPage = () => {
  const [flaskUrl, setFlaskUrl] = useState<string | null>(null);
  
  // Extract the ngrok URL from the console output
  const extractNgrokUrl = (text: string) => {
    const match = text.match(/Public URL: (https:\/\/[a-z0-9\-]+\.ngrok(?:-free)?\.(?:app|io))/i);
    if (match && match[1]) {
      setFlaskUrl(match[1]);
      return match[1];
    }
    return null;
  };

  // Handle pasting the console output
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const url = extractNgrokUrl(text);
      if (!url) {
        alert("Couldn't find an ngrok URL in the pasted text. Please make sure you copied the entire console output that includes 'Public URL: https://...'");
      }
    } catch (err) {
      alert("Unable to access clipboard. Please enter the ngrok URL manually.");
    }
  };

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
            
            {!flaskUrl && (
              <Alert className="mb-6 bg-blue-50 border-blue-100 text-blue-800">
                <Info className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  Connect to your Flask backend by pasting the console output from Google Colab below.
                </AlertDescription>
                <Button 
                  onClick={handlePaste} 
                  variant="outline" 
                  className="ml-4 bg-white hover:bg-gray-50"
                >
                  Paste from Clipboard
                </Button>
              </Alert>
            )}
            
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  View API Documentation
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/green-light">
                  <Info className="mr-2 h-4 w-4" />
                  Green Light Calculator
                </Link>
              </Button>
            </div>
          </div>
          
          <TrafficSimulator initialApiUrl={flaskUrl ? `${flaskUrl}/upload` : undefined} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrafficSimulatorPage;

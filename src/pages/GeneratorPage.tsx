
import React from 'react';
import Navbar from '@/components/Navbar';
import ApiGenerator from '@/components/ApiGenerator';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const GeneratorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">API Key Generator</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Generate API keys to authenticate your requests to the Traffic Manager API.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/docs">
                  <FileText className="mr-2 h-4 w-4" />
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>
          
          <ApiGenerator />

          <div className="max-w-3xl mx-auto mt-16 p-6 border border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-yellow-800 dark:text-yellow-300">
              Security Notice
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              Keep your secret API key confidential. Never share it in publicly accessible areas such as GitHub, 
              client-side code, or expose it in your frontend application. The keys generated here are for 
              demonstration purposes only and do not provide actual access to any services.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GeneratorPage;


import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Footer from '@/components/Footer';
import GreenLightCalculator from '@/components/GreenLightCalculator';
import LoginForm from '@/components/LoginForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, BarChart, LogOut, Car, Gauge } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const GreenLightPage = () => {
  const { user, logout, isAdmin } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10 text-primary">
              <Car className="h-5 w-5" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">AI Traffic Analysis</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Our computer vision technology analyzes traffic cameras to optimize signal timing for maximum flow efficiency.
            </p>
            
            {user && (
              <>
                <div className="flex justify-center items-center mb-6">
                  <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      isAdmin ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isAdmin ? 'Administrator' : 'Viewer'}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={logout}
                      className="ml-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
                
                {isAdmin && (
                  <p className="text-sm bg-primary/10 text-primary p-2 rounded mb-6">
                    As an administrator, you have full access to modify traffic data and signal timing.
                  </p>
                )}
                
                {!isAdmin && (
                  <p className="text-sm bg-gray-50 text-gray-800 p-2 rounded mb-6">
                    As a viewer, you can view traffic data but cannot modify signal timing.
                  </p>
                )}
              </>
            )}
            
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="bg-white hover:bg-gray-50">
                <Link to="/simulator">
                  <Car className="mr-2 h-4 w-4" />
                  Full Traffic Simulator
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
          
          {!user ? (
            <div className="max-w-md mx-auto">
              <LoginForm />
            </div>
          ) : (
            <GreenLightCalculator isAdmin={isAdmin} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GreenLightPage;

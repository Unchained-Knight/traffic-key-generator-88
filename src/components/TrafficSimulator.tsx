
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Trash, Upload, Key, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface TrafficSimulatorProps {
  initialApiUrl?: string;
}

const TrafficSimulator = ({ initialApiUrl }: TrafficSimulatorProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [greenTimes, setGreenTimes] = useState<number[]>([0, 0, 0, 0]);
  const [vehicleData, setVehicleData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>(initialApiUrl || 'https://e75e-34-106-114-213.ngrok-free.app/upload');
  const [apiKey, setApiKey] = useState<string>('your_secret_key_here'); // Default to match Flask server
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (initialApiUrl) {
      setApiUrl(initialApiUrl);
    }
  }, [initialApiUrl]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files);
    setError(null);
    setSuccess(false);

    if (selectedFiles.length !== 4) {
      setError('Please select exactly 4 images.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select exactly 4 images.",
      });
      setImageFiles([]);
      setImages([]);
      return;
    }

    setImageFiles(selectedFiles);

    // Create preview URLs for displaying the images
    const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setImages(imagePreviews);
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(imageUrl => URL.revokeObjectURL(imageUrl));
    };
  }, [images]);

  // Handle API URL change
  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
  };

  // Handle API Key change
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length !== 4) {
      setError('Please select exactly 4 images.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select exactly 4 images.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Create FormData object
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      console.log(`Sending request to: ${apiUrl}`);

      // Make POST request to Flask server with API key in headers
      const response = await axios.post(
        apiUrl,
        formData,
        {
          timeout: 120000, // 2 minute timeout for image processing
          headers: {
            'X-API-KEY': apiKey
          }
        }
      );

      console.log('Server Response:', response.data);

      // Check if response has the expected data
      if (response.data && 
          Array.isArray(response.data.green_light_times) && 
          Array.isArray(response.data.vehicle_data)) {
          
        setGreenTimes(response.data.green_light_times);
        setVehicleData(response.data.vehicle_data);
        setSuccess(true);
        toast({
          title: "Success!",
          description: "Traffic signal timings calculated.",
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err: any) {
      console.error('Error processing images:', err);
      let errorMessage = 'Error connecting to server';
      
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        if (err.response.status === 401) {
          errorMessage = 'Authentication failed: Invalid API key';
        } else {
          errorMessage = `Server error: ${err.response.data?.error || err.response.statusText}`;
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection and the server URL.';
      } else {
        // Something else caused the error
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Draw images with bounding boxes
  useEffect(() => {
    if (images.length === 4 && vehicleData.length === 4) {
      images.forEach((src, index) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const img = new Image();
        img.onload = () => {
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          // Draw image
          ctx.drawImage(img, 0, 0);
          // Draw bounding boxes
          if (vehicleData[index] && vehicleData[index].vehicles) {
            vehicleData[index].vehicles.forEach((vehicle: any) => {
              const [x1, y1, x2, y2] = vehicle.bbox;
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 2;
              ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
              ctx.fillStyle = 'red';
              ctx.font = '16px Arial';
              ctx.fillText(vehicle.label, x1, y1 - 10);
            });
          }
        };
        img.src = src;
      });
    }
  }, [images, vehicleData]);

  // Clear all data
  const handleReset = () => {
    setImages([]);
    setImageFiles([]);
    setGreenTimes([0, 0, 0, 0]);
    setVehicleData([]);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="apiUrl" className="block mb-2 font-medium">
              Server URL:
            </label>
            <Input 
              id="apiUrl" 
              value={apiUrl} 
              onChange={handleApiUrlChange} 
              placeholder="Enter your ngrok URL here"
              className="w-full"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the URL from your Flask server
            </p>
          </div>
          
          <div>
            <label htmlFor="apiKey" className="block mb-2 font-medium">
              API Key:
            </label>
            <div className="relative">
              <Input 
                id="apiKey" 
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Enter the API key for authentication"
                className="w-full"
                type="password"
              />
              <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              This should match the API_KEY in your Flask server
            </p>
          </div>
        </div>
      </div>

      {/* Image Upload Form */}
      <form onSubmit={handleSubmit}>
        <div className="p-6 mb-6 border-2 border-dashed rounded-lg bg-background/50">
          <h3 className="mb-3 text-lg font-medium">Upload Traffic Images</h3>
          <p className="mb-4 text-muted-foreground">
            Select 4 images of traffic at different intersection approaches
          </p>

          <div className="mb-6">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
          </div>

          {/* Image Previews with Canvas */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
              {images.map((src, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-black/70 text-white rounded-full">
                    Lane {index + 1}
                  </div>
                  <div className="overflow-hidden border rounded-lg">
                    <canvas 
                      ref={el => canvasRefs.current[index] = el}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={isLoading || imageFiles.length !== 4}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Calculate Signal Timings
                </>
              )}
            </Button>

            <Button 
              type="button" 
              onClick={handleReset}
              variant="destructive"
            >
              <Trash className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {success && (
        <Alert className="mb-6 border-green-200 text-green-800 bg-green-50 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Traffic signal timings calculated.</AlertDescription>
        </Alert>
      )}

      {/* Traffic Signal Display */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <h2 className="mb-6 text-2xl font-bold text-center">
            Traffic Signal Timings
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {greenTimes.map((time, index) => (
              <div key={index} className="p-4 bg-white border rounded-lg shadow-sm dark:bg-gray-800">
                <div className="mb-2 text-lg font-medium text-center">
                  Lane {index + 1}
                </div>

                {/* Traffic Light */}
                <div className={`
                  w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold text-xl
                  ${time > 0 ? 'bg-green-500' : 'bg-red-500'} 
                  border-4 border-gray-700 shadow-md
                `}>
                  {time}s
                </div>

                <div className="flex justify-between p-2 text-sm bg-gray-100 rounded dark:bg-gray-700">
                  <span>Vehicles:</span>
                  <span className="font-bold">{vehicleData[index]?.count || 0}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            <p>
              Green light timings are calculated based on detected vehicles.
              Each vehicle adds proportional time to the cycle (minimum 15s, maximum 60s).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficSimulator;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Trash, Upload, RefreshCw, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface GreenLightCalculatorProps {
  isAdmin: boolean;
}

const GreenLightCalculator = ({ isAdmin }: GreenLightCalculatorProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [greenTimes, setGreenTimes] = useState<number[]>([0, 0, 0, 0]);
  const [vehicleData, setVehicleData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [apiUrl, setApiUrl] = useState<string>('https://e75e-34-106-114-213.ngrok-free.app/upload');
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const { toast } = useToast();

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

    const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setImages(imagePreviews);
  };

  useEffect(() => {
    return () => {
      images.forEach(imageUrl => URL.revokeObjectURL(imageUrl));
    };
  }, [images]);

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "You need administrator privileges to modify data.",
      });
      return;
    }

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

    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      console.log(`Sending request to: ${apiUrl}`);

      const response = await axios.post(
        apiUrl,
        formData,
        {
          timeout: 120000,
        }
      );

      console.log('Server Response:', response.data);

      if (response.data && 
          Array.isArray(response.data.green_light_times) && 
          Array.isArray(response.data.vehicle_data)) {
          
        setGreenTimes(response.data.green_light_times);
        setVehicleData(response.data.vehicle_data);
        setSuccess(true);
        toast({
          title: "Success!",
          description: "Green light timings calculated successfully.",
        });
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err: any) {
      console.error('Error processing images:', err);
      setError(`Error: ${err.message}`);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (images.length === 4 && vehicleData.length === 4) {
      images.forEach((src, index) => {
        const canvas = canvasRefs.current[index];
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
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

  const handleReset = () => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "You need administrator privileges to reset data.",
      });
      return;
    }

    setImages([]);
    setImageFiles([]);
    setGreenTimes([0, 0, 0, 0]);
    setVehicleData([]);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 border border-gray-100 bg-white shadow-sm mb-8">
        <div className="mb-6">
          <label htmlFor="apiUrl" className="block mb-2 font-medium text-gray-700">
            Server URL
          </label>
          <Input 
            id="apiUrl" 
            value={apiUrl} 
            onChange={handleApiUrlChange} 
            placeholder="Enter your ngrok URL here"
            className="w-full bg-gray-50 border-gray-200"
            disabled={!isAdmin}
          />
          <p className="mt-1 text-sm text-muted-foreground">
            {isAdmin 
              ? "Enter the URL provided by ngrok when you start your Flask server" 
              : "Only administrators can change the server URL"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`p-6 mb-6 border-2 border-dashed rounded-lg border-gray-200 bg-gray-50/50 ${!isAdmin ? 'opacity-75' : ''}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-gray-800">Upload Intersection Images</h3>
              {!isAdmin && (
                <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  <Lock className="h-3 w-3 mr-1" />
                  View only
                </div>
              )}
            </div>
            
            <p className="mb-4 text-muted-foreground">
              {isAdmin 
                ? "Select 4 images of traffic at different intersection approaches" 
                : "Only administrators can upload and process new images"}
            </p>

            <div className="mb-6">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 bg-white border-gray-200"
                disabled={!isAdmin}
              />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                {images.map((src, index) => (
                  <div key={index} className="relative">
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-white/90 text-gray-700 rounded-full shadow-sm">
                      Lane {index + 1}
                    </div>
                    <div className="overflow-hidden border rounded-lg border-gray-200 bg-white shadow-sm">
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
                disabled={isLoading || imageFiles.length !== 4 || !isAdmin}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Calculate Green Light Timings
                  </>
                )}
              </Button>

              <Button 
                type="button" 
                onClick={handleReset}
                variant="outline"
                className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                disabled={!isAdmin}
              >
                <Trash className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {!isAdmin && (
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Please contact an administrator if you need to upload new traffic data.
              </div>
            )}
          </div>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-100 text-green-800 bg-green-50">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Green light timings calculated.</AlertDescription>
        </Alert>
      )}

      {success && (
        <Card className="mt-8 border border-gray-100 bg-white shadow-sm overflow-hidden">
          <CardContent className="pt-6">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Optimal Green Light Timings
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {greenTimes.map((time, index) => (
                <div key={index} className="p-4 bg-white border rounded-lg shadow-sm border-gray-100">
                  <div className="mb-3 text-lg font-medium text-center text-gray-700">
                    Lane {index + 1}
                  </div>

                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white font-bold
                    ${time > 0 ? 'bg-green-500' : 'bg-red-500'} 
                    border-4 border-gray-200 shadow-md
                  `}>
                    {time}s
                  </div>

                  <div className="flex justify-between p-2 text-sm bg-gray-50 rounded border border-gray-100">
                    <span className="text-gray-600">Vehicles:</span>
                    <span className="font-bold text-gray-800">{vehicleData[index]?.count || 0}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-center text-muted-foreground">
              <p>
                Green light timings are calculated based on the number of vehicles detected.
                Each vehicle adds 5 seconds to the base time (minimum 15s, maximum 60s).
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GreenLightCalculator;

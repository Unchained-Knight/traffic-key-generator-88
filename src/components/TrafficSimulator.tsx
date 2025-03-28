
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash, Upload, RefreshCw, Eye, Car } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TrafficSimulator = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [greenTimes, setGreenTimes] = useState<number[]>([0, 0, 0, 0]);
  const [vehicleData, setVehicleData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const { toast } = useToast();

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
        description: "Please select exactly 4 images of intersection approaches.",
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageFiles.length !== 4) {
      setError('Please select exactly 4 images.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select exactly 4 images of intersection approaches.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Simulate API call with mock data
    setTimeout(() => {
      // Mock response data
      const mockResponse = {
        green_light_times: [45, 30, 15, 25],
        vehicle_data: [
          {
            count: 9,
            vehicles: Array(9).fill(0).map((_, i) => ({
              bbox: [100 + (i * 50), 100, 150 + (i * 50), 150],
              label: 'car',
              confidence: 0.92
            }))
          },
          {
            count: 6,
            vehicles: Array(6).fill(0).map((_, i) => ({
              bbox: [80 + (i * 60), 120, 130 + (i * 60), 170],
              label: 'car',
              confidence: 0.94
            }))
          },
          {
            count: 3,
            vehicles: Array(3).fill(0).map((_, i) => ({
              bbox: [150 + (i * 70), 90, 200 + (i * 70), 140],
              label: 'car',
              confidence: 0.91
            }))
          },
          {
            count: 5,
            vehicles: Array(5).fill(0).map((_, i) => ({
              bbox: [110 + (i * 55), 110, 160 + (i * 55), 160],
              label: 'car',
              confidence: 0.93
            }))
          }
        ]
      };

      setGreenTimes(mockResponse.green_light_times);
      setVehicleData(mockResponse.vehicle_data);
      setSuccess(true);
      setIsLoading(false);

      toast({
        title: "Analysis Complete",
        description: "AI traffic analysis completed successfully.",
      });
    }, 2500);
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
              
              // Draw detection box with semi-transparent fill
              ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
              ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
              
              // Draw border
              ctx.strokeStyle = '#3b82f6';
              ctx.lineWidth = 2;
              ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
              
              // Add detection label with background
              const label = `${vehicle.label} (${Math.round(vehicle.confidence * 100)}%)`;
              ctx.font = 'bold 16px Inter';
              const textWidth = ctx.measureText(label).width;
              
              ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
              ctx.fillRect(x1, y1 - 24, textWidth + 16, 24);
              
              ctx.fillStyle = 'white';
              ctx.fillText(label, x1 + 8, y1 - 8);
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
    toast({
      title: "Reset Complete",
      description: "All traffic data has been cleared.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border border-gray-100 bg-white shadow-sm mb-8 overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="flex items-center text-xl">
            <Car className="h-5 w-5 mr-2 text-primary" />
            AI Traffic Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Image Upload Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 mb-6 border-2 border-dashed rounded-lg bg-gray-50/50 border-gray-200">
              <h3 className="mb-3 text-lg font-medium flex items-center">
                <Eye className="w-5 h-5 mr-2 text-primary" />
                Upload Intersection Images
              </h3>
              <p className="mb-4 text-muted-foreground">
                Select 4 images of traffic at different intersection approaches for AI analysis
              </p>

              <div className="mb-6">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4 bg-white border-gray-200"
                />
              </div>

              {/* Image Previews with Canvas */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                  {images.map((src, index) => (
                    <div key={index} className="relative">
                      <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-md shadow-sm z-10">
                        Approach {index + 1}
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
                  disabled={isLoading || imageFiles.length !== 4}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Analyze Traffic & Calculate Timing
                    </>
                  )}
                </Button>

                <Button 
                  type="button" 
                  onClick={handleReset}
                  variant="outline"
                  className="bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {success && (
        <Alert className="mb-6 border-green-100 text-green-800 bg-green-50">
          <AlertTitle className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            Analysis Complete
          </AlertTitle>
          <AlertDescription>AI traffic analysis has successfully calculated optimal signal timing.</AlertDescription>
        </Alert>
      )}

      {/* Traffic Signal Display */}
      {success && (
        <Card className="mt-8 border border-gray-100 bg-white shadow-sm overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-xl">AI-Recommended Signal Timing</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {greenTimes.map((time, index) => (
                <div key={index} className="relative">
                  <div className="p-4 bg-white border rounded-lg shadow-sm border-gray-100">
                    <div className="mb-3 text-lg font-medium text-center text-gray-700">
                      Approach {index + 1}
                    </div>

                    <div className="relative mx-auto mb-6 w-full">
                      {/* Traffic light container */}
                      <div className="w-20 h-56 mx-auto bg-gray-800 rounded-lg p-2 flex flex-col justify-between items-center">
                        {/* Red light */}
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center 
                          ${time === 0 ? 'bg-red-500 traffic-light-red' : 'bg-red-900/30'}`}>
                          {time === 0 && <span className="text-white font-bold">STOP</span>}
                        </div>
                        
                        {/* Yellow light */}
                        <div className="w-14 h-14 rounded-full bg-amber-900/30"></div>
                        
                        {/* Green light */}
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center 
                          ${time > 0 ? 'bg-green-500 traffic-light-green' : 'bg-green-900/30'}`}>
                          {time > 0 && <span className="text-white font-bold">{time}s</span>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between p-2 text-sm bg-gray-50 rounded-md border border-gray-100">
                        <span className="text-gray-600">Vehicles:</span>
                        <span className="font-bold text-gray-800">{vehicleData[index]?.count || 0}</span>
                      </div>
                      
                      <div className="flex justify-between p-2 text-sm bg-gray-50 rounded-md border border-gray-100">
                        <span className="text-gray-600">Traffic Density:</span>
                        <span className={`font-bold ${
                          vehicleData[index]?.count > 7 ? 'text-red-600' : 
                          vehicleData[index]?.count > 4 ? 'text-amber-600' : 'text-green-600'
                        }`}>
                          {vehicleData[index]?.count > 7 ? 'High' : 
                           vehicleData[index]?.count > 4 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <h4 className="font-medium mb-2">AI Analysis Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Total vehicles detected:</span>
                  <span className="text-xl font-bold">
                    {vehicleData.reduce((sum, data) => sum + (data?.count || 0), 0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Detection confidence:</span>
                  <span className="text-xl font-bold">96.8%</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Our AI has analyzed traffic at each approach and optimized the signal timing based on vehicle density, 
                flow direction, and historical patterns. Approaching traffic is classified by vehicle type and count 
                to determine the optimal green light duration.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrafficSimulator;

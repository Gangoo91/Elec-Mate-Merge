import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface TestResultsPhotoCaptureProps {
  onAnalysisComplete: (data: any) => void;
  onClose: () => void;
}

const TestResultsPhotoCapture = ({ onAnalysisComplete, onClose }: TestResultsPhotoCaptureProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const MAX_IMAGES = 3;

  const compressImage = async (file: File, maxSizeMB: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate scaling to fit within size limit
          const maxDimension = 2048;
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Start with quality 0.8 and reduce if needed
          let quality = 0.8;
          const tryCompress = () => {
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            const sizeInMB = (dataUrl.length * 0.75) / (1024 * 1024);
            
            if (sizeInMB > maxSizeMB && quality > 0.3) {
              quality -= 0.1;
              tryCompress();
            } else {
              resolve(dataUrl);
            }
          };
          tryCompress();
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageCapture = async (file: File) => {
    if (images.length >= MAX_IMAGES) {
      toast({
        title: "Maximum Photos Reached",
        description: `You can upload up to ${MAX_IMAGES} photos at once.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // Dynamic compression based on number of images
      const maxSizePerImage = images.length === 0 ? 7.5 : images.length === 1 ? 3.75 : 2.5;
      const compressedImage = await compressImage(file, maxSizePerImage);
      setImages(prev => [...prev, compressedImage]);
      
      toast({
        title: "Photo Added",
        description: `${images.length + 1} of ${MAX_IMAGES} photos captured`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).slice(0, MAX_IMAGES - images.length).forEach(handleImageCapture);
    }
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyse = async () => {
    if (images.length === 0) {
      toast({
        title: "No Photos",
        description: "Please capture at least one photo of your test results.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalysing(true);

    try {
      const response = await fetch(
        'https://yulrjfdmkjcoeddorawg.supabase.co/functions/v1/test-results-scan',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ images }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      
      toast({
        title: "Analysis Complete",
        description: `Extracted ${data.circuits?.length || 0} circuit(s) from test results`,
      });

      onAnalysisComplete(data);
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyse test results",
        variant: "destructive",
      });
    } finally {
      setIsAnalysing(false);
    }
  };


  return (
    <Card className="p-4 sm:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Scan Test Results</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Photograph your handwritten test results. The AI will extract circuit data automatically.
      </p>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-1.5">
          <Button
            onClick={handleCameraCapture}
            disabled={images.length >= MAX_IMAGES || isAnalysing}
            className="flex-1 text-sm"
          >
            <Camera className="h-3.5 w-3.5 mr-2" />
            Take Photo ({images.length}/{MAX_IMAGES})
          </Button>
          <Button
            onClick={handleUploadClick}
            variant="outline"
            disabled={images.length >= MAX_IMAGES || isAnalysing}
            className="flex-1 text-sm"
          >
            <Upload className="h-3.5 w-3.5 mr-2" />
            Upload Photo
          </Button>
        </div>

        {/* Camera input - mobile camera */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {/* Upload input - file picker */}
        <input
          ref={uploadInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                <img src={image} alt={`Test result ${index + 1}`} className="object-cover w-full h-full" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeImage(index)}
                  disabled={isAnalysing}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          onClick={handleAnalyse}
          disabled={images.length === 0 || isAnalysing}
          className="w-full text-sm"
        >
          {isAnalysing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
              Analysing {images.length} Photo{images.length > 1 ? 's' : ''}...
            </>
          ) : (
            <>
              Analyse {images.length} Photo{images.length > 1 ? 's' : ''}
            </>
          )}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-0.5">
        <p className="font-semibold">Tips:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Good lighting, clear handwriting</li>
          <li>Keep sheets flat and straight</li>
          <li>Include circuit refs and test values</li>
        </ul>
      </div>
    </Card>
  );
};

export default TestResultsPhotoCapture;

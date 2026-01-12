import React, { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  Upload,
  X,
  RotateCcw,
  Zap,
  Check,
  Image as ImageIcon,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaptureScreenProps {
  onCapture: (images: string[]) => void;
  onCancel: () => void;
  isMobile: boolean;
}

/**
 * Full-screen camera capture UI for board scanning
 * Supports both camera capture and file upload
 */
export const CaptureScreen: React.FC<CaptureScreenProps> = ({
  onCapture,
  onCancel,
  isMobile,
}) => {
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to start camera:', error);
      setIsCapturing(false);
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  }, []);

  // Haptic feedback helper
  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'medium') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  // Capture photo from camera
  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;

    // Haptic feedback on capture
    triggerHaptic('medium');

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImages(prev => [...prev, dataUrl]);
    }
  }, [triggerHaptic]);

  // Handle file upload
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  // Remove captured image
  const removeImage = useCallback((index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Submit captured images
  const handleSubmit = useCallback(() => {
    triggerHaptic('heavy'); // Strong feedback on submit
    stopCamera();
    onCapture(capturedImages);
  }, [capturedImages, onCapture, stopCamera, triggerHaptic]);

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Main content - full height since parent has header */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {isCapturing ? (
          /* Camera viewfinder */
          <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Overlay guide */}
            <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <Badge className="bg-black/60 text-white">
                Position the distribution board within the frame
              </Badge>
            </div>
          </div>
        ) : capturedImages.length > 0 ? (
          /* Preview captured images */
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-2 gap-3">
              {capturedImages.map((img, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-800">
                  <img src={img} alt={`Captured ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <Badge className="absolute bottom-2 left-2 bg-black/60">
                    {index + 1}
                  </Badge>
                </div>
              ))}
              {/* Add more button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center gap-2 text-white/60 hover:text-white hover:border-white/50 transition-colors"
              >
                <ImageIcon className="h-8 w-8" />
                <span className="text-sm">Add More</span>
              </button>
            </div>
          </div>
        ) : (
          /* Initial capture options */
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                <Camera className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white">Capture Board Photo</h3>
              <p className="text-white/60">
                Take a clear photo of the distribution board for AI analysis
              </p>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                onClick={startCamera}
                className={cn(
                  'w-full gap-3 touch-manipulation active:scale-[0.98] transition-transform',
                  isMobile ? 'h-16 text-lg' : 'h-14'
                )}
              >
                <Camera className="h-5 w-5" />
                Open Camera
              </Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-white/40 text-sm">or</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'w-full gap-3 border-white/30 text-white hover:bg-white/10 touch-manipulation',
                  isMobile ? 'h-14' : 'h-12'
                )}
              >
                <Upload className="h-5 w-5" />
                Upload Photo
              </Button>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
      </main>

      {/* Tips card */}
      {!isCapturing && capturedImages.length === 0 && (
        <Card className="mx-4 mb-4 bg-white/5 border-white/10">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-white/70">
                <p className="font-medium text-white/90">Tips for best results:</p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-400" />
                    Good lighting - natural light works best
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-400" />
                    Capture the full board including circuit labels
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-400" />
                    Keep camera steady and parallel to board
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Camera controls - iOS style */}
      {isCapturing && (
        <div className="p-6 bg-black/80 backdrop-blur flex items-center justify-center gap-8" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
          <Button
            variant="outline"
            size="icon"
            onClick={stopCamera}
            className="h-14 w-14 rounded-full border-white/30 text-white hover:bg-white/10 touch-manipulation"
          >
            <X className="h-6 w-6" />
          </Button>
          {/* iOS-style shutter button */}
          <button
            onClick={capturePhoto}
            className="h-20 w-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center active:scale-95 transition-transform touch-manipulation"
          >
            <div className="h-16 w-16 rounded-full bg-white" />
          </button>
          {capturedImages.length > 0 ? (
            <Button
              onClick={handleSubmit}
              className="h-14 px-6 rounded-full touch-manipulation"
            >
              Analyse ({capturedImages.length})
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="h-14 w-14 rounded-full border-white/30 text-white hover:bg-white/10 touch-manipulation"
            >
              <Upload className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}

      {/* Submit button when images captured */}
      {capturedImages.length > 0 && !isCapturing && (
        <div className="p-4 bg-black/80 backdrop-blur space-y-3" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <Button
            size="lg"
            onClick={handleSubmit}
            className={cn(
              'w-full gap-2 active:scale-[0.98] transition-transform',
              isMobile ? 'h-14 text-lg' : 'h-12'
            )}
          >
            <Zap className="h-5 w-5" />
            Analyse {capturedImages.length} Photo{capturedImages.length > 1 ? 's' : ''}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setCapturedImages([]);
              startCamera();
            }}
            className="w-full gap-2 border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            Retake
          </Button>
        </div>
      )}
    </div>
  );
};

export default CaptureScreen;

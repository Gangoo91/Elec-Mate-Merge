/**
 * Serial Number Scanner Sheet
 * Bottom sheet for scanning panel serial numbers via camera with AI OCR
 * Uses Gemini Flash 3.0 Preview for text extraction
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Camera,
  X,
  RotateCcw,
  Check,
  Loader2,
  Flashlight,
  SwitchCamera,
  Scan,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SerialNumberScannerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSerialExtracted: (serialNumber: string, photoBase64: string) => void;
}

export function SerialNumberScannerSheet({
  open,
  onOpenChange,
  onSerialExtracted
}: SerialNumberScannerSheetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<'camera' | 'preview'>('camera');
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedSerial, setExtractedSerial] = useState<string | null>(null);

  // Check for multiple cameras
  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(videoInputs.length > 1);
    });
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    setError(null);
    setCapturedImage(null);
    setExtractedSerial(null);
    setMode('camera');

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);

        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
        setHasTorch(!!capabilities?.torch);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;

      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Could not access camera. Please try again.');
      }
    }
  }, [facingMode]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setTorchOn(false);
  }, []);

  // Toggle torch/flash
  const toggleTorch = useCallback(async () => {
    if (!streamRef.current || !hasTorch) return;

    const track = streamRef.current.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as MediaTrackConstraintSet],
      });
      setTorchOn(!torchOn);
    } catch (err) {
      console.error('Torch error:', err);
    }
  }, [torchOn, hasTorch]);

  // Switch camera
  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  }, []);

  // Restart camera when facing mode changes
  useEffect(() => {
    if (mode === 'camera' && open && !capturedImage) {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-start camera when sheet opens
  useEffect(() => {
    if (open) {
      startCamera();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageData);
    setMode('preview');
    stopCamera();
  }, [stopCamera]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setExtractedSerial(null);
    startCamera();
  }, [startCamera]);

  // Process photo with AI
  const processWithAI = useCallback(async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Extract base64 data (remove data URL prefix)
      const base64Data = capturedImage.split(',')[1];

      const { data, error: fnError } = await supabase.functions.invoke('parse-serial-number', {
        body: {
          image_base64: base64Data,
          image_type: 'image/jpeg'
        }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to process image');
      }

      if (data?.serial_number) {
        setExtractedSerial(data.serial_number);
        toast.success('Serial number extracted!');
      } else {
        setError('Could not find a serial number in the image. Try again with better lighting.');
      }
    } catch (err: any) {
      console.error('AI processing error:', err);
      setError(err.message || 'Failed to extract serial number. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage]);

  // Confirm extracted serial
  const confirmSerial = useCallback(() => {
    if (extractedSerial && capturedImage) {
      onSerialExtracted(extractedSerial, capturedImage);
      onOpenChange(false);
    }
  }, [extractedSerial, capturedImage, onSerialExtracted, onOpenChange]);

  // Handle sheet close/open
  useEffect(() => {
    if (!open) {
      stopCamera();
      setCapturedImage(null);
      setExtractedSerial(null);
      setError(null);
      setMode('camera');
      setIsProcessing(false);
    }
  }, [open, stopCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-black">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/10 bg-black/90 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white text-lg flex items-center gap-2">
                <Scan className="h-5 w-5 text-elec-yellow" />
                Scan Serial Number
              </SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-elec-yellow/20 flex items-center justify-center mb-4">
                <Loader2 className="h-10 w-10 text-elec-yellow animate-spin" />
              </div>
              <p className="text-white font-semibold text-lg">Reading Serial Number...</p>
              <p className="text-white/60 text-sm mt-2">AI is extracting the text</p>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 relative">
            {/* Camera View */}
            {mode === 'camera' && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Scanning Guide Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="h-full flex flex-col items-center justify-center">
                    {/* Target box */}
                    <div className="w-[85%] h-24 border-2 border-elec-yellow rounded-xl relative">
                      <div className="absolute -top-8 left-0 right-0 text-center">
                        <span className="text-white/90 text-sm bg-black/60 px-3 py-1 rounded-full">
                          Position serial number here
                        </span>
                      </div>
                      {/* Corner highlights */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-elec-yellow rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-elec-yellow rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-elec-yellow rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-elec-yellow rounded-br-lg" />
                    </div>
                  </div>
                </div>

                {/* Camera not streaming message */}
                {!isStreaming && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
                      <p className="text-white/70">Starting camera...</p>
                    </div>
                  </div>
                )}

                {/* Error state */}
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="h-8 w-8 text-red-400" />
                      </div>
                      <p className="text-white font-medium mb-2">Camera Error</p>
                      <p className="text-white/60 text-sm mb-6">{error}</p>
                      <Button
                        onClick={startCamera}
                        className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}

                {/* Camera Controls */}
                {isStreaming && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black/90 to-transparent">
                    {/* Top controls - torch and switch camera */}
                    <div className="flex justify-center gap-4 mb-6">
                      {hasTorch && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleTorch}
                          className={cn(
                            'h-12 w-12 rounded-full border-2',
                            torchOn
                              ? 'bg-elec-yellow text-black border-elec-yellow'
                              : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                          )}
                        >
                          <Flashlight className="h-5 w-5" />
                        </Button>
                      )}
                      {hasMultipleCameras && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={switchCamera}
                          className="h-12 w-12 rounded-full bg-white/10 text-white border-2 border-white/30 hover:bg-white/20"
                        >
                          <SwitchCamera className="h-5 w-5" />
                        </Button>
                      )}
                    </div>

                    {/* Capture button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={capturePhoto}
                        className="h-20 w-20 rounded-full bg-white border-4 border-elec-yellow hover:bg-white/90 active:scale-95 transition-transform"
                      >
                        <Camera className="h-8 w-8 text-black" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Preview Mode */}
            {mode === 'preview' && capturedImage && (
              <div className="h-full flex flex-col">
                {/* Preview Image */}
                <div className="flex-1 relative">
                  <img
                    src={capturedImage}
                    alt="Captured serial"
                    className="w-full h-full object-contain bg-black"
                  />
                </div>

                {/* Extracted Serial Display */}
                {extractedSerial && (
                  <div className="p-4 bg-green-500/20 border-t border-green-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-400 text-xs font-medium uppercase tracking-wider">Extracted Serial Number</p>
                        <p className="text-white text-xl font-mono font-bold mt-0.5">{extractedSerial}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && !isProcessing && (
                  <div className="p-4 bg-red-500/20 border-t border-red-500/30">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="p-4 pb-8 bg-black/90 border-t border-white/10">
                  {!extractedSerial ? (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={retakePhoto}
                        className="flex-1 h-14 border-white/30 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Retake
                      </Button>
                      <Button
                        onClick={processWithAI}
                        disabled={isProcessing}
                        className="flex-1 h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                      >
                        <Scan className="h-5 w-5 mr-2" />
                        Read Serial
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={retakePhoto}
                        className="flex-1 h-14 border-white/30 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Retake
                      </Button>
                      <Button
                        onClick={confirmSerial}
                        className="flex-1 h-14 bg-green-600 text-white hover:bg-green-700 font-semibold"
                      >
                        <Check className="h-5 w-5 mr-2" />
                        Use Serial
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SerialNumberScannerSheet;

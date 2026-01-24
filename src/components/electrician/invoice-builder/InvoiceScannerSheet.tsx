/**
 * Invoice Scanner Sheet
 * Bottom sheet for scanning supplier invoices via camera or file upload
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Camera,
  Upload,
  X,
  RotateCcw,
  Check,
  Loader2,
  Flashlight,
  SwitchCamera,
  FileImage,
  AlertCircle,
  Scan
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvoiceScannerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (imageData: string, file: File) => void;
  onUpload: (file: File) => void;
  isProcessing?: boolean;
  progress?: string;
}

export function InvoiceScannerSheet({
  open,
  onOpenChange,
  onCapture,
  onUpload,
  isProcessing = false,
  progress = ''
}: InvoiceScannerSheetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<'select' | 'camera' | 'preview'>('select');
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);

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
        setError('Camera access denied. Please allow camera permissions in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Could not access camera. Please try again or upload an image instead.');
      }
      setMode('select');
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

  // Toggle torch
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
    if (mode === 'camera' && !capturedImage) {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

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
    startCamera();
  }, [startCamera]);

  // Confirm and process photo
  const confirmPhoto = useCallback(async () => {
    if (!capturedImage) return;

    const response = await fetch(capturedImage);
    const blob = await response.blob();
    const file = new File([blob], `invoice-${Date.now()}.jpg`, { type: 'image/jpeg' });

    onCapture(capturedImage, file);
  }, [capturedImage, onCapture]);

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (20MB max)
    if (file.size > 20 * 1024 * 1024) {
      setError('Image must be smaller than 20MB');
      return;
    }

    onUpload(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onUpload]);

  // Handle sheet close/open
  useEffect(() => {
    if (!open) {
      stopCamera();
      setCapturedImage(null);
      setError(null);
      setMode('select');
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
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white text-lg flex items-center gap-2">
                <Scan className="h-5 w-5 text-elec-yellow" />
                Scan Invoice
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
            <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-elec-yellow/20 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
              </div>
              <p className="text-white font-medium text-lg">{progress || 'Processing...'}</p>
              <p className="text-white/60 text-sm mt-1">This may take a few seconds</p>
            </div>
          )}

          {/* Mode Selection */}
          {mode === 'select' && (
            <div className="flex-1 p-4 flex flex-col">
              {/* Info Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <FileImage className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-white">AI-Powered Scanning</p>
                    <p className="text-[12px] text-white/60">
                      Take a photo or upload an invoice image. AI will extract all line items automatically.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-[13px] text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={startCamera}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                    <Camera className="h-7 w-7 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="text-[16px] font-medium text-white">Take Photo</p>
                    <p className="text-[13px] text-white/60">Use camera to capture invoice</p>
                  </div>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <Upload className="h-7 w-7 text-white/70" />
                  </div>
                  <div className="text-left">
                    <p className="text-[16px] font-medium text-white">Upload Image</p>
                    <p className="text-[13px] text-white/60">Select from gallery or files</p>
                  </div>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Tips */}
              <div className="mt-auto pt-6">
                <p className="text-[12px] text-white/40 uppercase tracking-wide mb-3">Tips for best results</p>
                <ul className="space-y-2 text-[13px] text-white/60">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Ensure good lighting and avoid shadows
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Keep the invoice flat and capture all line items
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Works best with printed invoices from Screwfix, Toolstation, etc.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Camera View */}
          {(mode === 'camera' || mode === 'preview') && (
            <div className="flex-1 relative bg-black">
              {/* Video Preview */}
              {mode === 'camera' && (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    muted
                  />

                  {/* Document Guide Overlay */}
                  {isStreaming && (
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div
                        className="relative border-2 border-white/40 border-dashed rounded-lg"
                        style={{ width: '90%', aspectRatio: '210 / 297' }}
                      >
                        {/* Corner markers */}
                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-elec-yellow rounded-tl" />
                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-elec-yellow rounded-tr" />
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-elec-yellow rounded-bl" />
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-elec-yellow rounded-br" />

                        {/* Center text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-white/50 text-sm text-center px-4">
                            Position invoice within frame
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Loading state */}
                  {!isStreaming && !error && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-10 w-10 text-white animate-spin" />
                    </div>
                  )}
                </>
              )}

              {/* Captured Image Preview */}
              {mode === 'preview' && capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captured invoice"
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                />
              )}

              {/* Hidden canvas for capture */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Camera Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                {mode === 'camera' ? (
                  <div className="flex items-center justify-center gap-4">
                    {/* Back button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-white/20 text-white"
                      onClick={() => { stopCamera(); setMode('select'); }}
                    >
                      <X className="h-5 w-5" />
                    </Button>

                    {/* Torch button */}
                    {hasTorch && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          'h-12 w-12 rounded-full',
                          torchOn ? 'bg-elec-yellow text-black' : 'bg-white/20 text-white'
                        )}
                        onClick={toggleTorch}
                      >
                        <Flashlight className="h-5 w-5" />
                      </Button>
                    )}

                    {/* Capture button */}
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-white hover:bg-white/90 text-black"
                      onClick={capturePhoto}
                      disabled={!isStreaming}
                    >
                      <Camera className="h-7 w-7" />
                    </Button>

                    {/* Switch camera button */}
                    {hasMultipleCameras && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-white/20 text-white"
                        onClick={switchCamera}
                      >
                        <SwitchCamera className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    {/* Retake button */}
                    <Button
                      variant="outline"
                      className="h-12 flex-1 max-w-[140px] border-white/30 text-white bg-transparent hover:bg-white/10"
                      onClick={retakePhoto}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retake
                    </Button>

                    {/* Use Photo button */}
                    <Button
                      className="h-12 flex-1 max-w-[140px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                      onClick={confirmPhoto}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Use Photo
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

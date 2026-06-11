/**
 * Invoice Scanner Sheet
 * Bottom sheet for scanning supplier invoices via camera or file upload
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
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
  Scan,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvoiceScannerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (imageData: string, file: File) => void;
  onUpload: (files: File[]) => void;
  isProcessing?: boolean;
  progress?: string;
}

export function InvoiceScannerSheet({
  open,
  onOpenChange,
  onCapture,
  onUpload,
  isProcessing = false,
  progress = '',
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
        const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & {
          torch?: boolean;
        };
        setHasTorch(!!capabilities?.torch);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;

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

  // Camera button handler — uses Capacitor Camera on native, getUserMedia stream on web
  const handleCameraPress = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      setError(null);
      try {
        const photo = await CapCamera.getPhoto({
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera,
          quality: 90,
          correctOrientation: true,
        });
        const dataUrl = `data:image/jpeg;base64,${photo.base64String}`;
        setCapturedImage(dataUrl);
        setMode('preview');
      } catch (err: any) {
        const msg = err?.message || '';
        if (!msg.includes('cancelled') && !msg.includes('User cancelled')) {
          setError('Could not access camera. Please try again.');
        }
      }
    } else {
      startCamera();
    }
  }, [startCamera]);

  // Toggle torch
  const toggleTorch = useCallback(async () => {
    if (!streamRef.current || !hasTorch) return;

    const track = streamRef.current.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as MediaTrackConstraintSet],
      });
      setTorchOn(!torchOn);
    } catch {
      // Torch toggle failed silently
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

  // Handle file selection (supports multiple files)
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      // Validate all files
      for (const file of files) {
        if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
          setError(`${file.name} is not a supported file type`);
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          setError(`${file.name} exceeds 20MB limit`);
          return;
        }
      }

      onUpload(files);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onUpload]
  );

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
      <SheetContent
        side="bottom"
        className={cn(
          'p-0 rounded-t-2xl overflow-hidden border-t border-white/[0.10]',
          mode === 'select' ? 'max-h-[85vh]' : 'h-[85vh]'
        )}
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-lg flex items-center gap-2">
              <Scan className="h-5 w-5 text-elec-yellow" />
              Scan Invoice
            </SheetTitle>
          </SheetHeader>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-elec-yellow/20 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
              </div>
              <p className="text-white font-medium text-lg">{progress || 'Processing...'}</p>
              <p className="text-white text-sm mt-1">This may take a few seconds</p>
            </div>
          )}

          {/* Mode Selection */}
          {mode === 'select' && (
            <div className="p-4 sm:p-6">
              <p className="text-[12px] text-white/60 mb-4 -mt-1">
                Take a photo or upload an image/PDF — every line item is extracted automatically.
              </p>

              {/* Error Display */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-[13px] text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Action tiles */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCameraPress}
                  className="flex flex-col items-start gap-3 p-4 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/[0.2] hover:bg-elec-yellow/[0.1] touch-manipulation active:scale-[0.98] transition-all select-none"
                >
                  <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center">
                    <Camera className="h-5 w-5 text-black" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-semibold text-white">Take photo</p>
                    <p className="text-[11px] text-white/60 mt-0.5">Use the camera</p>
                  </div>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all select-none"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <Upload className="h-5 w-5 text-white/85" />
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-semibold text-white">Upload file</p>
                    <p className="text-[11px] text-white/60 mt-0.5">Image or PDF</p>
                  </div>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Tips — compact */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] pb-[max(8px,env(safe-area-inset-bottom))]">
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-white/55">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-elec-yellow/70" />
                    Good lighting, no shadows
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-elec-yellow/70" />
                    Keep it flat, capture all lines
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-elec-yellow/70" />
                    Best with printed invoices (Screwfix, Toolstation…)
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
                          <p className="text-white text-sm text-center px-4">
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
                      onClick={() => {
                        stopCamera();
                        setMode('select');
                      }}
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

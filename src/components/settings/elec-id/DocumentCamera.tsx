import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Camera as CapCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface DocumentCameraProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (imageData: string, file: File) => void;
  documentType?: string;
}

const DOCUMENT_GUIDES = {
  ecs_card: {
    title: 'ECS Card',
    tips: ['Place card on flat surface', 'Ensure all text is visible', 'Avoid glare and shadows'],
    aspectRatio: '85.6 / 54',
  },
  qualification: {
    title: 'Qualification Certificate',
    tips: ['Capture entire document', 'Keep edges straight', 'Good lighting helps OCR'],
    aspectRatio: '210 / 297',
  },
  driving_licence: {
    title: 'Driving Licence',
    tips: [
      'Place on dark background',
      'Capture both sides if needed',
      'Ensure hologram is visible',
    ],
    aspectRatio: '85.6 / 54',
  },
  default: {
    title: 'Document',
    tips: ['Fill frame with document', 'Keep camera steady', 'Ensure good lighting'],
    aspectRatio: '4 / 3',
  },
};

const isNative = Capacitor.isNativePlatform();

const DocumentCamera = ({
  open,
  onOpenChange,
  onCapture,
  documentType = 'default',
}: DocumentCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);

  const guide =
    DOCUMENT_GUIDES[documentType as keyof typeof DOCUMENT_GUIDES] || DOCUMENT_GUIDES.default;

  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(videoInputs.length > 1);
    });
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setCapturedImage(null);

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
    } catch (err: unknown) {
      const name = (err as { name?: string })?.name;
      if (name === 'AbortError') return;
      console.error('Camera error:', err);
      if (name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions.');
      } else if (name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Could not access camera. Please try again.');
      }
    }
  }, [facingMode]);

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

  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  }, []);

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
    stopCamera();
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const confirmPhoto = useCallback(async () => {
    if (!capturedImage) return;
    setIsProcessing(true);

    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `document-${Date.now()}.jpg`, { type: 'image/jpeg' });

      onCapture(capturedImage, file);
      onOpenChange(false);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage, onCapture, onOpenChange]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!open || !isNative) return;

    CapCamera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 90,
      correctOrientation: true,
    })
      .then(async (photo) => {
        const dataUrl = `data:image/jpeg;base64,${photo.base64String}`;
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], `document-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(dataUrl, file);
        onOpenChange(false);
      })
      .catch((err) => {
        const msg = err?.message || '';
        if (!msg.includes('cancelled') && !msg.includes('User cancelled')) {
          console.warn('[DocumentCamera] Native capture failed:', err);
        }
        onOpenChange(false);
      });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isNative) return;
    if (open) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
      setError(null);
    }

    return () => {
      stopCamera();
    };
  }, [open, startCamera, stopCamera]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (open && !capturedImage) {
      startCamera();
    }
  }, [facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 bg-black overflow-hidden">
        <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg">Scan {guide.title}</DialogTitle>
            <Button
              variant="ghost"
              className="h-11 w-11 p-0 text-white hover:bg-white/20 rounded-full touch-manipulation"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <span aria-hidden className="text-xl leading-none">
                ×
              </span>
            </Button>
          </div>
          <DialogDescription className="sr-only">
            Use your camera to capture a photo of your {guide.title.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="relative aspect-[3/4] bg-black">
          {!capturedImage && (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
              />

              {isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div
                    className="relative border-2 border-white border-dashed rounded-lg"
                    style={{ width: '85%', aspectRatio: guide.aspectRatio }}
                  >
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-elec-yellow rounded-tl" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-elec-yellow rounded-tr" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-elec-yellow rounded-bl" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-elec-yellow rounded-br" />
                  </div>
                </div>
              )}

              {!isStreaming && !error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
                </div>
              )}
            </>
          )}

          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured document"
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-red-500/20 border border-red-500/40 rounded-2xl p-4 text-center max-w-sm">
                <p className="text-white font-medium mb-2">Camera Error</p>
                <p className="text-sm text-white mb-4">{error}</p>
                <Button
                  variant="outline"
                  className="border-white text-white bg-transparent rounded-xl h-11 touch-manipulation"
                  onClick={startCamera}
                >
                  Try again
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {isStreaming && !capturedImage && (
          <div className="absolute bottom-32 left-0 right-0 px-4">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white text-center">
                {guide.tips[Math.floor(Date.now() / 3000) % guide.tips.length]}
              </p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          {!capturedImage ? (
            <div className="flex items-center justify-center gap-4">
              {hasTorch && (
                <Button
                  variant="ghost"
                  className={cn(
                    'h-12 w-12 p-0 rounded-full touch-manipulation text-sm font-medium',
                    torchOn ? 'bg-elec-yellow text-black' : 'bg-white/20 text-white'
                  )}
                  onClick={toggleTorch}
                  aria-label="Torch"
                >
                  Torch
                </Button>
              )}

              <Button
                className="h-16 w-16 p-0 rounded-full bg-white hover:bg-white/90 text-black touch-manipulation"
                onClick={capturePhoto}
                disabled={!isStreaming}
                aria-label="Capture"
              >
                <span className="h-12 w-12 rounded-full border-4 border-black" aria-hidden />
              </Button>

              {hasMultipleCameras && (
                <Button
                  variant="ghost"
                  className="h-12 w-12 p-0 rounded-full bg-white/20 text-white touch-manipulation text-sm font-medium"
                  onClick={switchCamera}
                  aria-label="Switch camera"
                >
                  Flip
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                className="h-12 flex-1 max-w-[140px] border-white text-white bg-transparent rounded-xl touch-manipulation"
                onClick={retakePhoto}
                disabled={isProcessing}
              >
                Retake
              </Button>

              <Button
                className="h-12 flex-1 max-w-[140px] bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation"
                onClick={confirmPhoto}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing…' : 'Use photo'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentCamera;

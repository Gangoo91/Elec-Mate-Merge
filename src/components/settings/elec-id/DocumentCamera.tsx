import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  X,
  RotateCcw,
  Check,
  Loader2,
  Flashlight,
  SwitchCamera,
  Focus,
  Maximize2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentCameraProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (imageData: string, file: File) => void;
  documentType?: string;
}

const DOCUMENT_GUIDES = {
  ecs_card: {
    title: "ECS Card",
    tips: ["Place card on flat surface", "Ensure all text is visible", "Avoid glare and shadows"],
    aspectRatio: "85.6 / 54", // Credit card ratio
  },
  qualification: {
    title: "Qualification Certificate",
    tips: ["Capture entire document", "Keep edges straight", "Good lighting helps OCR"],
    aspectRatio: "210 / 297", // A4 ratio
  },
  driving_licence: {
    title: "Driving Licence",
    tips: ["Place on dark background", "Capture both sides if needed", "Ensure hologram is visible"],
    aspectRatio: "85.6 / 54",
  },
  default: {
    title: "Document",
    tips: ["Fill frame with document", "Keep camera steady", "Ensure good lighting"],
    aspectRatio: "4 / 3",
  },
};

const DocumentCamera = ({
  open,
  onOpenChange,
  onCapture,
  documentType = "default",
}: DocumentCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [torchOn, setTorchOn] = useState(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);

  const guide = DOCUMENT_GUIDES[documentType as keyof typeof DOCUMENT_GUIDES] || DOCUMENT_GUIDES.default;

  // Check for multiple cameras
  useEffect(() => {
    navigator.mediaDevices?.enumerateDevices().then((devices) => {
      const videoInputs = devices.filter((d) => d.kind === "videoinput");
      setHasMultipleCameras(videoInputs.length > 1);
    });
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    setError(null);
    setCapturedImage(null);

    try {
      // Stop any existing stream
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

        // Check for torch capability
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
        setHasTorch(!!capabilities?.torch);
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      if (err.name === "NotAllowedError") {
        setError("Camera access denied. Please allow camera permissions.");
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else {
        setError("Could not access camera. Please try again.");
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

  // Toggle torch/flashlight
  const toggleTorch = useCallback(async () => {
    if (!streamRef.current || !hasTorch) return;

    const track = streamRef.current.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as MediaTrackConstraintSet],
      });
      setTorchOn(!torchOn);
    } catch (err) {
      console.error("Torch error:", err);
    }
  }, [torchOn, hasTorch]);

  // Switch camera
  const switchCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  }, []);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);

    // Get image data
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);
    stopCamera();
  }, [stopCamera]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // Confirm and use photo
  const confirmPhoto = useCallback(async () => {
    if (!capturedImage) return;

    setIsProcessing(true);

    try {
      // Convert base64 to blob/file
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], `document-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      onCapture(capturedImage, file);
      onOpenChange(false);
    } catch (err) {
      console.error("Error processing image:", err);
      setError("Failed to process image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage, onCapture, onOpenChange]);

  // Start camera when dialog opens
  useEffect(() => {
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

  // Restart camera when facing mode changes
  useEffect(() => {
    if (open && !capturedImage) {
      startCamera();
    }
  }, [facingMode, open, capturedImage, startCamera]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 bg-black overflow-hidden">
        <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg">
              Scan {guide.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative aspect-[3/4] bg-black">
          {/* Video preview */}
          {!capturedImage && (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                playsInline
                muted
              />

              {/* Document guide overlay */}
              {isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div
                    className="relative border-2 border-white/50 border-dashed rounded-lg"
                    style={{
                      width: "85%",
                      aspectRatio: guide.aspectRatio,
                    }}
                  >
                    {/* Corner markers */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-elec-yellow rounded-tl" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-elec-yellow rounded-tr" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-elec-yellow rounded-bl" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-elec-yellow rounded-br" />

                    {/* Center focus indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Focus className="h-12 w-12 text-white/30" />
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

          {/* Captured image preview */}
          {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured document"
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <Card className="bg-red-500/20 border-red-500/50">
                <CardContent className="p-4 text-center">
                  <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                  <p className="text-white font-medium mb-2">Camera Error</p>
                  <p className="text-sm text-white/70 mb-4">{error}</p>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white"
                    onClick={startCamera}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Tips */}
        {isStreaming && !capturedImage && (
          <div className="absolute bottom-32 left-0 right-0 px-4">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs text-white/80 text-center">
                {guide.tips[Math.floor(Date.now() / 3000) % guide.tips.length]}
              </p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          {!capturedImage ? (
            <div className="flex items-center justify-center gap-4">
              {/* Torch button */}
              {hasTorch && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full",
                    torchOn
                      ? "bg-elec-yellow text-elec-dark"
                      : "bg-white/20 text-white"
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
                className="h-12 flex-1 max-w-[140px] border-white/30 text-white"
                onClick={retakePhoto}
                disabled={isProcessing}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake
              </Button>

              {/* Confirm button */}
              <Button
                className="h-12 flex-1 max-w-[140px] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                onClick={confirmPhoto}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Use Photo
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentCamera;

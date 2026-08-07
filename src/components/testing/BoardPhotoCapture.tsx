import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';

interface BoardPhotoCaptureProps {
  /**
   * Hands the captured image URLs to the parent, which runs the streaming
   * analysis via `BoardScannerStream`. (The legacy in-component
   * `board-read-enhanced` flow was removed — this component is capture-only.)
   */
  onPhotosReady: (imageUrls: string[]) => void;
}

export const BoardPhotoCapture: React.FC<BoardPhotoCaptureProps> = ({ onPhotosReady }) => {
  const haptic = useHaptic();
  const [capturedImages, setCapturedImages] = useState<
    Array<{ url: string; status: 'compressing' | 'ready'; quality?: 'ok' | 'blurry' }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Connect stream to video element once both exist (fixes race condition where
  // setShowCamera(true) hasn't rendered the <video> yet when srcObject is assigned)
  useEffect(() => {
    if (stream && showCamera && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, showCamera]);

  // Stop camera tracks on unmount to release the camera (prevents LED staying on)
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const TOTAL_CAP_MB = 8.0;

  // Aggressive target size for faster upload/processing
  const calculateTargetSizePerPhoto = (photoCount: number): number => {
    return 2.0; // 2MB max per image - balance of quality and speed
  };

  // Utility to calculate base64 image size in MB
  const getDataUrlSizeMB = (dataUrl: string): number => {
    const base64 = dataUrl.split(',')[1];
    return (base64.length * 0.75) / (1024 * 1024);
  };

  // ── Quality gate ──────────────────────────────────────────────────────
  // Cheap canvas checks run on the already-decoded image during compression.
  // Advisory only — a flagged photo is kept (field conditions vary) but gets
  // a visible "May be too blurry" badge so the user can retake if they want.
  const MIN_LONG_EDGE_PX = 800;
  // Conservative, deliberately LOW threshold for the gradient-energy
  // (Laplacian-variance approximation) score — only genuinely blurry shots
  // should fall under it. Sharp board photos score well into the hundreds.
  const SHARPNESS_THRESHOLD = 12;

  /**
   * Gradient-energy sharpness score on a downsampled 200px centre crop:
   * grayscale, then the mean of squared differences between each pixel and
   * its right + down neighbours. Blurry images score low.
   * Returns Infinity when measurement is impossible so we never false-flag.
   */
  const measureSharpness = (img: HTMLImageElement): number => {
    try {
      const SIZE = 200;
      const canvas = document.createElement('canvas');
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return Number.POSITIVE_INFINITY;

      // Centre crop — half the frame each way, where the board usually sits.
      const srcW = Math.max(1, Math.floor(img.naturalWidth / 2));
      const srcH = Math.max(1, Math.floor(img.naturalHeight / 2));
      const sx = Math.floor((img.naturalWidth - srcW) / 2);
      const sy = Math.floor((img.naturalHeight - srcH) / 2);
      ctx.drawImage(img, sx, sy, srcW, srcH, 0, 0, SIZE, SIZE);

      const { data } = ctx.getImageData(0, 0, SIZE, SIZE);
      const gray = new Float32Array(SIZE * SIZE);
      for (let i = 0; i < SIZE * SIZE; i++) {
        const o = i * 4;
        gray[i] = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2];
      }

      let sum = 0;
      let count = 0;
      for (let y = 0; y < SIZE - 1; y++) {
        for (let x = 0; x < SIZE - 1; x++) {
          const i = y * SIZE + x;
          const dRight = gray[i + 1] - gray[i];
          const dDown = gray[i + SIZE] - gray[i];
          sum += dRight * dRight + dDown * dDown;
          count += 2;
        }
      }
      return count > 0 ? sum / count : Number.POSITIVE_INFINITY;
    } catch {
      return Number.POSITIVE_INFINITY;
    }
  };

  /** True when the photo should carry the "May be too blurry" flag. */
  const assessQuality = (img: HTMLImageElement): boolean => {
    const longEdge = Math.max(img.naturalWidth, img.naturalHeight);
    if (longEdge < MIN_LONG_EDGE_PX) return true;
    return measureSharpness(img) < SHARPNESS_THRESHOLD;
  };

  const flagBlurryPhoto = (count = 1) => {
    haptic.warning();
    toast.warning(
      count > 1
        ? `${count} photos look blurry or low-res — retake with the board filling the frame`
        : 'Photo looks blurry or low-res — retake with the board filling the frame',
      { duration: 5000 }
    );
  };

  // Compress image inline with optimized settings for better AI accuracy.
  // Also runs the quality gate on the decoded image and reports the flag.
  const compressImage = async (
    dataUrl: string,
    maxSizeMB: number
  ): Promise<{ url: string; blurry: boolean }> => {
    return new Promise((resolve, reject) => {
      // Timeout to prevent hanging on corrupt images
      const timeout = setTimeout(() => {
        reject(new Error('Image processing timeout - file may be too large or corrupted'));
      }, 15000);

      const img = new Image();

      img.onload = () => {
        clearTimeout(timeout);

        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Canvas not supported on this device'));
            return;
          }

          // Optimized resolution for speed while maintaining readability
          const maxDim = 1600; // Balanced for electrical text clarity
          let { width, height } = img;

          // Check for valid dimensions
          if (width === 0 || height === 0) {
            reject(new Error('Invalid image dimensions'));
            return;
          }

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = (height / width) * maxDim;
              width = maxDim;
            } else {
              width = (width / height) * maxDim;
              height = maxDim;
            }
          }

          canvas.width = Math.round(width);
          canvas.height = Math.round(height);

          // Apply subtle sharpening filter for better text clarity
          ctx.filter = 'contrast(1.1) brightness(1.05)';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Aggressive compression for speed - electrical text is high contrast
          const quality = 0.78;
          const compressed = canvas.toDataURL('image/jpeg', quality);

          // Verify the output is valid
          if (!compressed || compressed === 'data:,') {
            reject(new Error('Failed to generate compressed image'));
            return;
          }

          // Quality gate — advisory flag, never a hard block.
          const blurry = assessQuality(img);

          resolve({ url: compressed, blurry });
        } catch (err) {
          // Canvas operations can fail on memory-constrained devices
          console.error('Canvas compression error:', err);
          reject(new Error('Device memory issue - try a smaller image'));
        }
      };

      img.onerror = (e) => {
        clearTimeout(timeout);
        console.error('Image load error:', e);
        reject(
          new Error(
            'Could not read image - if using iPhone, try taking a new photo instead of selecting from library'
          )
        );
      };

      img.src = dataUrl;
    });
  };

  const startCamera = async () => {
    try {
      // First check if camera API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('Camera not supported on this browser. Please use "Upload photos" instead.', {
          duration: 6000,
        });
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (caught) {
      // getUserMedia rejects with a DOMException — name drives the guidance.
      const error = caught as DOMException;
      // Provide specific guidance based on error type
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast.error(
          'Camera permission denied. Please enable camera access in your browser settings and try again.',
          { duration: 7000 }
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast.error('No camera found on this device. Please use "Upload photos" instead.', {
          duration: 6000,
        });
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        toast.error('Camera is in use by another app. Please close other apps and try again.', {
          duration: 6000,
        });
      } else if (
        error.name === 'OverconstrainedError' ||
        error.name === 'ConstraintNotSatisfiedError'
      ) {
        // Camera exists but doesn't support our requirements - try fallback
        toast.loading('Trying alternative camera settings...', { id: 'fallback' });
        tryFallbackCamera();
      } else if (error.name === 'NotSupportedError') {
        toast.error('Camera API not supported. Please use "Upload photos" instead.', {
          duration: 6000,
        });
      } else if (error.name === 'SecurityError') {
        toast.error(
          'Camera access blocked for security reasons. Please ensure you\'re using HTTPS and try "Upload photos" instead.',
          { duration: 7000 }
        );
      } else {
        toast.error(
          `Could not access camera: ${error.message}. Please use "Upload photos" instead.`,
          { duration: 6000 }
        );
      }
    }
  };

  const tryFallbackCamera = async () => {
    try {
      // Try with minimal constraints (no resolution requirements)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      toast.dismiss('fallback');
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      toast.success('Camera started with basic settings');
    } catch {
      toast.dismiss('fallback');
      toast.error(
        'Could not access camera even with basic settings. Please use "Upload photos" instead.',
        { duration: 6000 }
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const originalDataUrl = canvas.toDataURL('image/jpeg', 0.95);

        // Show photo immediately and start compression
        setCapturedImages((prev) => [...prev, { url: originalDataUrl, status: 'compressing' }]);
        toast.success('Photo captured');

        // Compress in background
        const targetMB = calculateTargetSizePerPhoto(capturedImages.length + 1);
        compressImage(originalDataUrl, targetMB)
          .then(({ url: compressed, blurry }) => {
            setCapturedImages((prev) =>
              prev.map((img) =>
                img.url === originalDataUrl
                  ? { url: compressed, status: 'ready', quality: blurry ? 'blurry' : 'ok' }
                  : img
              )
            );
            if (blurry) flagBlurryPhoto();
          })
          .catch((error) => {
            console.error('Camera photo compression failed:', error);
            // Keep the original image instead of removing it
            setCapturedImages((prev) =>
              prev.map((img) =>
                img.url === originalDataUrl
                  ? { url: originalDataUrl, status: 'ready' } // Use original as fallback
                  : img
              )
            );
            toast.error(error?.message || 'Photo processing failed - using original image');
          });

        stopCamera();
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const targetMB = calculateTargetSizePerPhoto(capturedImages.length + files.length);

      // Load all files in parallel
      const filePromises = Array.from(files).map(
        (file) =>
          new Promise<{ file: File; dataUrl: string }>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) =>
              resolve({
                file,
                dataUrl: e.target?.result as string,
              });
            reader.readAsDataURL(file);
          })
      );

      const loadedFiles = await Promise.all(filePromises);

      // Add all images immediately
      loadedFiles.forEach(({ dataUrl }) => {
        setCapturedImages((prev) => [...prev, { url: dataUrl, status: 'compressing' }]);
      });

      toast.success(`Added ${files.length} photo${files.length > 1 ? 's' : ''} - compressing...`);

      // Compress all in parallel
      Promise.all(
        loadedFiles.map(({ dataUrl }) =>
          compressImage(dataUrl, targetMB)
            .then(({ url: compressed, blurry }) => ({
              original: dataUrl,
              compressed,
              blurry,
              failed: false,
            }))
            .catch((error) => {
              console.error('File compression failed:', error);
              // Return original as fallback instead of null
              return { original: dataUrl, compressed: dataUrl, blurry: false, failed: true };
            })
        )
      ).then((results) => {
        const failedCount = results.filter((r) => r?.failed).length;
        if (failedCount > 0) {
          toast.error(
            `${failedCount} photo${failedCount > 1 ? 's' : ''} couldn't be compressed - using original${failedCount > 1 ? 's' : ''}`
          );
        }

        const blurryCount = results.filter((r) => r?.blurry).length;
        if (blurryCount > 0) flagBlurryPhoto(blurryCount);

        setCapturedImages((prev) =>
          prev.map((img) => {
            const result = results.find((r) => r?.original === img.url);
            return result
              ? {
                  url: result.compressed,
                  status: 'ready' as const,
                  quality: result.blurry ? ('blurry' as const) : ('ok' as const),
                }
              : img;
          })
        );
      });

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const analyzeImages = async () => {
    if (capturedImages.length === 0) return;

    // Check if all images are compressed
    const stillCompressing = capturedImages.some((img) => img.status === 'compressing');
    if (stillCompressing) {
      toast.loading('Finishing compression...', { duration: 2000 });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Check total payload size
    const totalSizeMB = capturedImages.reduce((sum, img) => sum + getDataUrlSizeMB(img.url), 0);

    if (totalSizeMB > TOTAL_CAP_MB) {
      toast.error(`Photos too large (${totalSizeMB.toFixed(1)}MB). Maximum is ${TOTAL_CAP_MB}MB.`);
      return;
    }

    // Hand image URLs to the parent, which runs the SSE pipeline through
    // `BoardScannerStream`.
    onPhotosReady(capturedImages.map((img) => img.url));
  };

  // Capture content — the parent (BoardScannerOverlay) provides the sheet
  // container and header.
  const content = (
    <>
      {/* Hidden file input - always mounted for reliable mobile access */}
      {/* Note: Restricted to JPEG/PNG/WebP - browsers can't decode HEIC from iPhones */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        key="file-input"
      />

      {capturedImages.length === 0 && !showCamera && (
        <div className="flex flex-1 flex-col justify-between gap-6 outline-none">
          {/* Intro — one line of guidance under the sheet header */}
          <p className="text-[14px] sm:text-[15px] text-white/85 leading-relaxed max-w-[58ch]">
            Snap the board and the scanner streams every circuit it can see — labels, ratings,
            RCBOs, three-phase, the lot. Edit anything before it goes through to the schedule.
          </p>

          {/* Visual hero — stylised distribution board inside a volt viewfinder */}
          <div className="flex flex-col items-center">
            <div aria-hidden="true" className="relative w-full max-w-sm px-4 py-4">
              {/* Viewfinder corner brackets */}
              <span className="absolute left-0 top-0 h-5 w-5 rounded-tl border-l-2 border-t-2 border-elec-yellow/70 motion-safe:animate-pulse" />
              <span className="absolute right-0 top-0 h-5 w-5 rounded-tr border-r-2 border-t-2 border-elec-yellow/70 motion-safe:animate-pulse" />
              <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl border-b-2 border-l-2 border-elec-yellow/70 motion-safe:animate-pulse" />
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br border-b-2 border-r-2 border-elec-yellow/70 motion-safe:animate-pulse" />

              {/* Board — enclosure with a recessed DIN rail, a proper main
                  switch, a 3P block, and breakers that flash volt in sequence
                  (board-read keyframe) — the scanner reading module by module. */}
              <div className={cn('rounded-2xl border border-white/[0.2] p-2 sm:p-2.5', CARD_SURFACE)}>
                {/* DIN recess */}
                <div className="rounded-xl bg-black/40 p-2 shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)] sm:p-2.5">
                  <div className="flex items-stretch gap-1.5">
                    {/* Main switch — double module, volt lever ON */}
                    <div className="flex w-11 shrink-0 flex-col items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.16] px-1.5 py-1.5">
                      <span className="block h-1 w-full rounded-sm bg-white/[0.35]" />
                      <span className="block h-3.5 w-2 rounded-sm bg-elec-yellow" />
                      <span className="block h-1 w-full rounded-sm bg-white/[0.2]" />
                    </div>
                    {/* Breaker modules — top row leads with a 3P triple */}
                    <div className="grid flex-1 grid-cols-8 gap-1">
                      {/* 3P block spanning three ways */}
                      <span className="col-span-3 flex h-8 items-center justify-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.12]">
                        {[0, 1, 2].map((p) => (
                          <span key={p} className="block h-3 w-1.5 rounded-sm bg-white/[0.4]" />
                        ))}
                      </span>
                      {Array.from({ length: 13 }).map((_, i) => (
                        <span
                          key={i}
                          style={{ animationDelay: `${(i + 1) * 0.28}s` }}
                          className="flex h-8 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.10] motion-safe:animate-[board-read_5s_ease-in-out_infinite]"
                        >
                          <span className="block h-3 w-1.5 rounded-sm bg-white/[0.4]" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Circuit legend — the handwritten strip under the breakers */}
                <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/[0.10] px-2.5 py-2">
                  <span className="h-1.5 w-1/4 rounded-full bg-white/[0.3]" />
                  <span className="h-1.5 w-1/6 rounded-full bg-white/[0.22]" />
                  <span className="h-1.5 w-1/5 rounded-full bg-white/[0.3]" />
                  <span className="h-1.5 w-1/6 rounded-full bg-white/[0.22]" />
                  <span className="h-1.5 flex-1 rounded-full bg-white/[0.16]" />
                </div>
              </div>
            </div>
            <p className="mt-1 text-center text-[12px] text-white/85">
              Frame the whole unit, legend included
            </p>
          </div>

          {/* What it reads + tip */}
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { t: 'Circuit labels', s: 'Reads handwritten and printed legends, expands UK abbreviations.' },
                { t: 'Devices', s: 'MCB, RCBO, RCD, AFDD, MCCB, isolators — by I∆n marking and model code.' },
                { t: 'Board structure', s: 'Brand, model, layout, main switch, surge protection, three-phase.' },
              ].map(({ t, s }) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4"
                >
                  <p className="text-[13px] font-semibold text-white leading-snug">{t}</p>
                  <p className="mt-1 text-[12px] text-white/85 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>

            {/* Reading direction note */}
            <p className="mt-4 text-[12px] text-white/85 leading-relaxed max-w-[58ch]">
              <span className="font-semibold text-white">Tip:</span> the scanner reads circuits
              left to right. If your main switch is on the right, tap{' '}
              <span className="font-medium text-white">Reverse</span> after the scan completes.
            </p>
          </div>

          {/* CTAs — anchored at the bottom, equal-height row */}
          <div className="flex flex-col gap-3 pb-[env(safe-area-inset-bottom)] sm:flex-row">
            {(() => {
              const isCoarsePointer =
                typeof window !== 'undefined' &&
                window.matchMedia &&
                window.matchMedia('(pointer: coarse)').matches;

              const primaryUpload = (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    haptic.medium();
                    fileInputRef.current?.click();
                  }}
                  className="h-12 w-full sm:flex-[2] rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                >
                  Upload photos
                </button>
              );

              const secondaryCamera = (
                <button
                  onClick={() => {
                    haptic.light();
                    startCamera();
                  }}
                  className="h-12 w-full sm:flex-1 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
                >
                  {isCoarsePointer ? 'Take photo' : 'Use webcam'}
                </button>
              );

              return (
                <>
                  {primaryUpload}
                  {secondaryCamera}
                </>
              );
            })()}
          </div>
        </div>
      )}

      {showCamera && (
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Frame the whole board
          </h3>
          <p className="mt-0.5 text-[12px] text-white/85">Live camera</p>

          <div className="mt-6 relative rounded-xl overflow-hidden border border-white/[0.14] bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-video object-cover"
            />
            {/* Viewfinder corner brackets — matches the intro hero */}
            <div className="pointer-events-none absolute inset-6">
              <span className="absolute left-0 top-0 h-5 w-5 rounded-tl border-l-2 border-t-2 border-elec-yellow/70" />
              <span className="absolute right-0 top-0 h-5 w-5 rounded-tr border-r-2 border-t-2 border-elec-yellow/70" />
              <span className="absolute bottom-0 left-0 h-5 w-5 rounded-bl border-b-2 border-l-2 border-elec-yellow/70" />
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-br border-b-2 border-r-2 border-elec-yellow/70" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={stopCamera}
              className="h-12 rounded-xl border border-white/[0.14] bg-white/[0.06] px-5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                haptic.medium();
                capturePhoto();
              }}
              className="h-12 px-8 rounded-xl text-[15px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation active:scale-[0.98]"
            >
              Capture
            </button>
          </div>
        </div>
      )}

      {capturedImages.length > 0 && (
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Review your shots, then scan
          </h3>
          <p className="mt-0.5 text-[12px] text-white/85 tabular-nums">
            {capturedImages.length} photo{capturedImages.length > 1 ? 's' : ''} ready
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-1">
            {capturedImages.map((img, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-white/[0.14] bg-white/[0.04]"
              >
                <img
                  src={img.url}
                  alt={`Board photo ${idx + 1}`}
                  className="w-full object-cover aspect-video"
                />
                {img.status === 'compressing' && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white">Compressing…</span>
                  </div>
                )}
                {img.status === 'ready' && img.quality === 'blurry' && (
                  <span className="absolute bottom-2 left-2 rounded-md border border-orange-500/40 bg-black/70 px-2 py-1 text-[11px] font-semibold text-orange-300 backdrop-blur-sm">
                    May be too blurry
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    removeImage(idx);
                  }}
                  className="absolute top-2 right-2 h-11 px-4 rounded-lg text-[12px] font-semibold bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm transition-colors touch-manipulation active:scale-[0.98]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                haptic.medium();
                analyzeImages();
              }}
              className="w-full h-12 rounded-xl text-[15px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation active:scale-[0.98]"
            >
              Scan {capturedImages.length} photo{capturedImages.length > 1 ? 's' : ''}
            </button>
            <div className="flex items-center justify-center gap-6 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="h-11 px-3 text-[13px] font-semibold text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                Add more
              </button>
              <span className="text-white/15">·</span>
              <button
                type="button"
                onClick={() => {
                  setCapturedImages([]);
                  setShowCamera(false);
                }}
                className="h-11 px-3 text-[13px] font-semibold text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return <div className="flex min-h-full flex-1 flex-col outline-none">{content}</div>;
};

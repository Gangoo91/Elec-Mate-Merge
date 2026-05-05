import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

type AnalysisStage = 'idle' | 'uploading' | 'detecting' | 'reading' | 'verifying' | 'complete';

interface BoardPhotoCaptureProps {
  onAnalysisComplete: (data: any) => void;
  onClose: () => void;
  renderContentOnly?: boolean; // When true, skip Card wrapper (used when parent provides container)
  /** Callback for progress updates during analysis - includes photo URL on first call */
  onProgressUpdate?: (
    stage: AnalysisStage,
    progress: number,
    circuitsFound?: number,
    photoUrl?: string
  ) => void;
  /**
   * When set, the capture step skips the in-built (legacy `board-read-enhanced`)
   * analysis and instead hands the captured image URLs to the parent. The
   * parent then runs its own streaming flow via `BoardScannerStream`.
   */
  onPhotosReady?: (imageUrls: string[]) => void;
}

export const BoardPhotoCapture: React.FC<BoardPhotoCaptureProps> = ({
  onAnalysisComplete,
  onClose,
  renderContentOnly = false,
  onProgressUpdate,
  onPhotosReady,
}) => {
  const [capturedImages, setCapturedImages] = useState<
    Array<{ url: string; status: 'compressing' | 'ready' }>
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  /**
   * Auto-save photo for training data pipeline
   * Runs in background after successful analysis - doesn't block UI
   */
  const autoSaveForTraining = async (
    photoDataUrl: string,
    analysisResult: any,
    scanSessionId: string
  ) => {
    try {
      // Convert data URL to blob
      const response = await fetch(photoDataUrl);
      const blob = await response.blob();

      // Upload to training folder
      const fileName = `training/auto/${scanSessionId}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('board-reference-images')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (uploadError) {
        console.log('Training photo upload skipped:', uploadError.message);
        return; // Don't throw - this is background, non-critical
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('board-reference-images').getPublicUrl(fileName);

      // Determine image characteristics from analysis
      const hasLowConfidence = analysisResult.circuits?.some(
        (c: any) => c.confidence === 'low' || c.conf === 'low'
      );
      const circuitCount = analysisResult.circuits?.length || 0;
      const brand = analysisResult.brand || analysisResult.board?.brand || 'Unknown';

      // Insert metadata for training pipeline
      await supabase.from('board_reference_images').insert({
        manufacturer: brand,
        model_series: analysisResult.model || null,
        image_type: hasLowConfidence ? 'in_situ_dirty' : 'in_situ_clean',
        image_url: publicUrl,
        source_type: 'user_contributed',
        description: `Auto-captured: ${brand} board, ${circuitCount} circuits detected`,
        device_types_shown: [
          ...new Set(
            analysisResult.circuits?.map((c: any) => c.device?.category || c.device || 'MCB') || []
          ),
        ],
        ratings_visible: [
          ...new Set(
            analysisResult.circuits
              ?.map((c: any) => c.device?.rating_amps || c.rating)
              .filter(Boolean)
              .map((r: number) => `${r}A`) || []
          ),
        ],
        lighting_conditions: hasLowConfidence ? 'moderate' : 'good',
        verified: false, // Needs human verification
        metadata: {
          scan_session_id: scanSessionId,
          auto_captured: true,
          circuit_count: circuitCount,
          low_confidence_circuits: hasLowConfidence,
          captured_at: new Date().toISOString(),
        },
      });

      console.log(`Training photo auto-saved: ${scanSessionId}`);
    } catch (error) {
      // Silent fail - training capture is non-critical
      console.log('Training auto-save skipped:', error);
    }
  };

  // Utility to calculate base64 image size in MB
  const getDataUrlSizeMB = (dataUrl: string): number => {
    const base64 = dataUrl.split(',')[1];
    return (base64.length * 0.75) / (1024 * 1024);
  };

  // Compress image inline with optimized settings for better AI accuracy
  const compressImage = async (dataUrl: string, maxSizeMB: number): Promise<string> => {
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

          resolve(compressed);
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

  const checkPhotoQuality = async (
    dataUrl: string
  ): Promise<{
    ok: boolean;
    issue?: string;
    autofix?: string;
  }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve({ ok: true });

        const sampleSize = 200;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

        const x = Math.max(0, (img.width - sampleSize) / 2);
        const y = Math.max(0, (img.height - sampleSize) / 2);
        ctx.drawImage(img, x, y, sampleSize, sampleSize, 0, 0, sampleSize, sampleSize);

        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        let totalBrightness = 0;
        let totalContrast = 0;
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r + g + b) / 3;
          totalBrightness += brightness;

          if (i > 0) {
            const prevBrightness = (pixels[i - 4] + pixels[i - 3] + pixels[i - 2]) / 3;
            totalContrast += Math.abs(brightness - prevBrightness);
          }
        }

        const avgBrightness = totalBrightness / (sampleSize * sampleSize);
        const avgContrast = totalContrast / (sampleSize * sampleSize);

        if (avgBrightness < 40) {
          resolve({
            ok: false,
            issue: '📷 Photo too dark - circuit labels may be unreadable',
            autofix: 'Try: Turn on room lights or use torch/flash',
          });
        } else if (avgBrightness > 230) {
          resolve({
            ok: false,
            issue: '📷 Photo overexposed - details washed out',
            autofix: 'Try: Reduce lighting or avoid direct glare on board',
          });
        } else if (avgContrast < 5) {
          resolve({
            ok: false,
            issue: '📷 Photo appears blurry or out of focus',
            autofix: 'Try: Hold phone steady, tap screen to focus on MCB labels',
          });
        } else if (avgBrightness < 80) {
          resolve({
            ok: true,
            autofix: '💡 Photo slightly dark - AI will try to enhance contrast',
          });
        } else {
          resolve({ ok: true });
        }
      };
      img.onerror = () => resolve({ ok: true });
      img.src = dataUrl;
    });
  };

  const startCamera = async () => {
    try {
      // First check if camera API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error('Camera not supported on this browser. Please use "Upload Photos" instead.', {
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
    } catch (error: any) {
      // Provide specific guidance based on error type
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast.error(
          'Camera permission denied. Please enable camera access in your browser settings and try again.',
          { duration: 7000 }
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast.error('No camera found on this device. Please use "Upload Photos" instead.', {
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
        toast.error('Camera API not supported. Please use "Upload Photos" instead.', {
          duration: 6000,
        });
      } else if (error.name === 'SecurityError') {
        toast.error(
          'Camera access blocked for security reasons. Please ensure you\'re using HTTPS and try "Upload Photos" instead.',
          { duration: 7000 }
        );
      } else {
        toast.error(
          `Could not access camera: ${error.message}. Please use "Upload Photos" instead.`,
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
    } catch (error: any) {
      toast.dismiss('fallback');
      toast.error(
        'Could not access camera even with basic settings. Please use "Upload Photos" instead.',
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
          .then((compressed) => {
            setCapturedImages((prev) =>
              prev.map((img) =>
                img.url === originalDataUrl ? { url: compressed, status: 'ready' } : img
              )
            );
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
            .then((compressed) => ({ original: dataUrl, compressed, failed: false }))
            .catch((error) => {
              console.error('File compression failed:', error);
              // Return original as fallback instead of null
              return { original: dataUrl, compressed: dataUrl, failed: true };
            })
        )
      ).then((results) => {
        const failedCount = results.filter((r) => r?.failed).length;
        if (failedCount > 0) {
          toast.error(
            `${failedCount} photo${failedCount > 1 ? 's' : ''} couldn't be compressed - using original${failedCount > 1 ? 's' : ''}`
          );
        }

        setCapturedImages((prev) =>
          prev.map((img) => {
            const result = results.find((r) => r?.original === img.url);
            return result ? { url: result.compressed, status: 'ready' as const } : img;
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

    // New streaming flow — hand image URLs to the parent and let it run the
    // SSE pipeline through `BoardScannerStream`. Skip the legacy single-shot
    // edge function entirely.
    if (onPhotosReady) {
      const firstPhotoUrl = capturedImages[0]?.url || null;
      onProgressUpdate?.('uploading', 100, undefined, firstPhotoUrl || undefined);
      onPhotosReady(capturedImages.map((img) => img.url));
      return;
    }

    setIsAnalyzing(true);

    // Notify parent of progress start - include first photo URL for display during analysis
    const firstPhotoUrl = capturedImages[0]?.url || null;
    onProgressUpdate?.('uploading', 5, undefined, firstPhotoUrl || undefined);

    const stage2Timer = setTimeout(() => {
      onProgressUpdate?.('uploading', 15);
    }, 1000);

    const stage3Timer = setTimeout(() => {
      onProgressUpdate?.('detecting', 30);
    }, 3000);

    const stage4Timer = setTimeout(() => {
      onProgressUpdate?.('reading', 50);
    }, 6000);

    const stage5Timer = setTimeout(() => {
      onProgressUpdate?.('verifying', 75);
    }, 9000);

    const timeoutId = setTimeout(() => {
      toast.warning(
        'This is taking longer than usual — three-phase boards can take up to a minute. Please wait or try again with better lighting.',
        {
          id: 'timeout-warning',
        }
      );
    }, 60000);

    // Hard timeout to prevent infinite hangs - 2 minutes for complex 3-phase boards
    const ANALYSIS_TIMEOUT_MS = 200000; // 200s - 3-phase boards with retry need extra time

    try {
      const hints = {
        main_switch_side: 'right',
      };

      // Create a timeout promise that rejects after 2 minutes
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(
          () =>
            reject(
              new Error(
                'Analysis timed out. Large boards may need multiple photos - try scanning sections separately.'
              )
            ),
          ANALYSIS_TIMEOUT_MS
        );
      });

      // Race between the actual call and the timeout
      const { data, error: invokeError } = (await Promise.race([
        supabase.functions.invoke('board-read-enhanced', {
          body: { images: capturedImages.map((img) => img.url), hints },
        }),
        timeoutPromise,
      ])) as { data: any; error: any };

      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(stage4Timer);
      clearTimeout(stage5Timer);
      clearTimeout(timeoutId);
      toast.dismiss('timeout-warning');

      if (invokeError) {
        // Friendly error messages instead of raw API errors
        const msg = invokeError.message?.toLowerCase() || '';
        if (msg.includes('non-2xx') || msg.includes('503') || msg.includes('timeout') || msg.includes('timed out')) {
          throw new Error('Sorry, there was a hiccup analysing your board. Please try again — three-phase boards can take a bit longer.');
        }
        throw new Error(invokeError.message || 'Sorry, something went wrong. Please try again.');
      }

      // Display warnings if present
      if (data?.warnings && data.warnings.length > 0) {
        console.warn('Analysis warnings:', data.warnings);
        data.warnings.forEach((warning: string) => {
          toast.warning(warning, { duration: 2000, closeButton: true });
        });
      }

      if (data?.error) {
        toast.error(data.error);
        // Still process partial results if available
        if (data.circuits && data.circuits.length > 0) {
          toast.warning(`Partial results: ${data.circuits.length} circuits detected`);
          onAnalysisComplete(data);
        }
        return;
      }

      if (data.circuits && data.circuits.length > 0) {
        // Notify parent of completion with circuit count
        onProgressUpdate?.('complete', 100, data.circuits.length);

        // Auto-save photo for training pipeline (background, non-blocking)
        const scanSessionId = uuidv4();
        if (capturedImages.length > 0) {
          autoSaveForTraining(capturedImages[0].url, data, scanSessionId);
        }

        const photoText = capturedImages.length > 1 ? `${capturedImages.length} photos` : 'image';

        // Check for circuit count mismatch
        if (data.metadata?.boardSize && data.circuits?.length) {
          const expected = data.metadata.boardSize;
          const detected = data.circuits.length;

          if (detected < expected * 0.9) {
            toast.warning(
              `Circuit count warning: Expected ${expected} ways but detected ${detected}. Please review carefully and consider re-capturing if circuits are missing.`,
              { duration: 6000 }
            );
          }
        }

        // Transform backend response to frontend format with safe defaults and unique keys
        const transformedCircuits = (data.circuits as any[])
          .map((circuit: any, i: number) => {
            const rawIndex = Number.isFinite(circuit?.index) ? Number(circuit.index) : null;
            const position = rawIndex && rawIndex > 0 ? rawIndex : i + 1;
            const confRaw = (circuit?.conf ?? circuit?.confidence ?? '').toString().toLowerCase();
            const confidence: 'high' | 'medium' | 'low' = confRaw.startsWith('h')
              ? 'high'
              : confRaw.startsWith('m')
                ? 'medium'
                : 'low';

            // Pictogram handling - use pictograms as fallback labels
            const pictograms = circuit?.pictograms || [];
            let displayLabel = circuit?.label_text ?? circuit?.label ?? '';

            // If label is blank/unclear but pictogram exists, use pictogram type as label
            if (
              (!displayLabel || displayLabel.toLowerCase().includes('unlabelled')) &&
              pictograms.length > 0
            ) {
              const primaryPictogram = pictograms[0].type;
              // Convert pictogram enum to readable label (e.g., "COOKER_OVEN" → "Cooker Oven")
              displayLabel = primaryPictogram
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/\b\w/g, (char: string) => char.toUpperCase());
            }

            return {
              id: `${position}-${i}-${Date.now()}`,
              position,
              label: displayLabel,
              pictograms,
              device: circuit?.device?.category ?? circuit?.device?.type ?? 'MCB',
              curve: circuit?.device?.curve ?? null,
              rating: circuit?.device?.rating_amps ?? circuit?.device?.rating ?? null,
              liveConductorSize: circuit?.live_conductor_size_mm2
                ? `${circuit.live_conductor_size_mm2}mm²`
                : null,
              cpcSize: circuit?.cpc_size_mm2 ? `${circuit.cpc_size_mm2}mm²` : null,
              kaRating: circuit?.device?.breaking_capacity_kA
                ? `${circuit.device.breaking_capacity_kA}kA`
                : null,
              confidence,
              evidence: circuit?.evidence,
              notes: circuit?.notes ?? '',
              phase: circuit?.phase ?? '1P',
              phases: circuit?.phases ?? null,
              wayNumber: circuit?.way_number ?? null,
              phaseDesignation: circuit?.phase_designation ?? null,
              boardSide: circuit?.board_side ?? null,
            };
          })
          .sort((a, b) => a.position - b.position);

        const resolvedWays =
          data?.estimated_total_ways ?? data?.metadata?.boardSize ?? transformedCircuits.length;

        const transformedBoard = {
          make: data?.brand || 'Unknown',
          model: data?.model || data?.brand || 'Unknown',
          mainSwitch: data?.main_switch_rating ? `${data.main_switch_rating}A` : 'Unknown',
          spd:
            data?.spd_status === 'green_ok'
              ? 'OK'
              : data?.spd_status === 'red_replace'
                ? 'Replace'
                : data?.spd_status === 'yellow_check'
                  ? 'Check'
                  : 'Unknown',
          totalWays: data?.total_ways || resolvedWays,
          waysPerSide: data?.ways_per_side || null,
          evidence: data?.evidence,
          boardLayout: data?.board_layout ?? '1P',
          waysPerCircuit: data?.ways_per_circuit ?? 1,
        };

        const transformedData = {
          circuits: transformedCircuits,
          board: transformedBoard,
          metadata: { ...data?.metadata, boardSize: resolvedWays, scanSessionId },
          warnings: data?.warnings,
          decisions: data?.decisions,
          photoUrl: capturedImages[0]?.url || null, // Pass photo for training
        };

        toast.success(`Found ${data.circuits.length} circuits`);
        onAnalysisComplete(transformedData);
      } else {
        toast.error(
          'AI could not detect any circuits. Please try another angle or ensure the board is clearly visible and well-lit.'
        );
      }
    } catch (error) {
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(stage4Timer);
      clearTimeout(stage5Timer);
      clearTimeout(timeoutId);
      const rawMsg = error instanceof Error ? error.message : String(error);
      // Show friendly message, not raw API errors
      const errorMessage = rawMsg.includes('non-2xx') || rawMsg.includes('503') || rawMsg.includes('abort')
        ? 'Sorry, there was a hiccup. Please try again.'
        : rawMsg;
      toast.error(errorMessage);
    } finally {
      toast.dismiss('timeout-warning');
      setIsAnalyzing(false);
    }
  };

  // Content that's shared between both render modes
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

      {/* Only show internal header when NOT renderContentOnly (parent provides header) */}
      {!renderContentOnly && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1.5 md:gap-2">
            <Camera className="h-4 w-4 md:h-5 md:w-5 text-elec-blue" />
            Scan Electrical Board
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] md:h-9 md:w-9 active:scale-95 transition-all touch-manipulation"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      )}

      {capturedImages.length === 0 && !showCamera && (
        <div className="flex flex-col">
          {/* Editorial intro paragraph — replaces the icon hero + checkmark list */}
          <p className="text-[15px] sm:text-[16px] text-white/65 leading-relaxed max-w-[58ch]">
            Snap the board and the scanner streams every circuit it can see — labels, ratings, RCBOs, three-phase, the lot. Edit anything you need to before sending it through to the schedule.
          </p>

          {/* What it reads — three numbered rows in editorial language, no icons */}
          <ul className="mt-8 border-t border-white/[0.06]">
            {[
              { n: '01', t: 'Circuit labels', s: 'Reads handwritten and printed legends, expands UK abbreviations.' },
              { n: '02', t: 'Devices', s: 'MCB, RCBO, RCD, AFDD, MCCB, isolators — by I∆n marking and model code.' },
              { n: '03', t: 'Board structure', s: 'Brand, model, layout, main switch, surge protection, three-phase.' },
            ].map(({ n, t, s }) => (
              <li
                key={n}
                className="border-b border-white/[0.06] py-4 sm:py-5 flex items-baseline gap-4 sm:gap-6"
              >
                <span className="flex-shrink-0 w-8 sm:w-10 text-[18px] sm:text-[20px] font-light text-elec-yellow/70 tabular-nums leading-tight">
                  {n}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug">
                    {t}
                  </div>
                  <p className="mt-1 text-[13px] sm:text-[14px] text-white/55 leading-relaxed max-w-[55ch]">
                    {s}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Reading direction note — editorial, no callout box */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-elec-yellow">
              Tip
            </div>
            <p className="mt-1.5 text-[13px] sm:text-[14px] text-white/65 leading-relaxed max-w-[55ch]">
              The scanner reads circuits left to right. If your main switch is on the right, tap <span className="text-white font-medium">Reverse</span> after the scan completes.
            </p>
          </div>

          {/* CTAs — editorial yellow rectangles, no icons */}
          <div className="mt-10 space-y-3">
            {(() => {
              const isCoarsePointer =
                typeof window !== 'undefined' &&
                window.matchMedia &&
                window.matchMedia('(pointer: coarse)').matches;

              const primaryCamera = (
                <button
                  onClick={startCamera}
                  className="w-full h-12 rounded-xl text-[14px] font-semibold tracking-tight bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/80 transition-colors touch-manipulation shadow-[0_8px_30px_-8px_rgba(252,196,25,0.45)]"
                >
                  Use camera →
                </button>
              );

              const primaryUpload = (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="w-full h-12 rounded-xl text-[14px] font-semibold tracking-tight bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/80 transition-colors touch-manipulation shadow-[0_8px_30px_-8px_rgba(252,196,25,0.45)]"
                >
                  Upload photos →
                </button>
              );

              const secondaryCamera = (
                <button
                  onClick={startCamera}
                  className="w-full h-11 text-[12px] uppercase tracking-[0.18em] font-semibold text-white/65 hover:text-white touch-manipulation transition-colors"
                >
                  Use webcam
                </button>
              );

              const secondaryUpload = (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="w-full h-11 text-[12px] uppercase tracking-[0.18em] font-semibold text-white/65 hover:text-white touch-manipulation transition-colors"
                >
                  Upload from gallery
                </button>
              );

              return isCoarsePointer ? (
                <>
                  {primaryCamera}
                  {secondaryUpload}
                </>
              ) : (
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
          <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-elec-yellow">
            Live
          </div>
          <h3 className="mt-2 text-[20px] sm:text-[24px] leading-tight font-semibold text-white tracking-tight">
            Frame the whole board.
          </h3>

          <div className="mt-6 relative rounded-xl overflow-hidden border border-white/[0.08] bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full aspect-video object-cover"
            />
            {/* Editorial frame guide */}
            <div className="pointer-events-none absolute inset-6 border border-white/15 rounded-lg" />
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={stopCamera}
              className="text-[12px] uppercase tracking-[0.18em] font-semibold text-white/65 hover:text-white transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <button
              onClick={capturePhoto}
              className="h-12 px-6 rounded-xl text-[14px] font-semibold tracking-tight bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/80 transition-colors touch-manipulation shadow-[0_8px_30px_-8px_rgba(252,196,25,0.45)]"
            >
              Capture →
            </button>
          </div>
        </div>
      )}

      {capturedImages.length > 0 && (
        <div>
          <div className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-elec-yellow">
            {capturedImages.length} photo{capturedImages.length > 1 ? 's' : ''} ready
          </div>
          <h3 className="mt-2 text-[20px] sm:text-[24px] leading-tight font-semibold text-white tracking-tight">
            Review your shots, then scan.
          </h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-1">
            {capturedImages.map((img, idx) => (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]"
              >
                <img
                  src={img.url}
                  alt={`Board photo ${idx + 1}`}
                  className="w-full object-cover aspect-video"
                />
                {img.status === 'compressing' && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/85">
                      Compressing
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 h-7 px-2.5 rounded-md text-[10.5px] uppercase tracking-[0.18em] font-semibold bg-black/55 text-white/85 hover:bg-black/75 hover:text-white backdrop-blur-sm transition-colors touch-manipulation"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            {!isAnalyzing ? (
              <>
                <button
                  onClick={analyzeImages}
                  className="w-full h-12 rounded-xl text-[14px] font-semibold tracking-tight bg-elec-yellow text-black hover:bg-elec-yellow/90 active:bg-elec-yellow/80 transition-colors touch-manipulation shadow-[0_8px_30px_-8px_rgba(252,196,25,0.45)]"
                >
                  Scan {capturedImages.length} photo{capturedImages.length > 1 ? 's' : ''} →
                </button>
                <div className="flex items-center justify-center gap-6 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-[12px] uppercase tracking-[0.18em] font-semibold text-white/65 hover:text-white transition-colors touch-manipulation"
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
                    className="text-[12px] uppercase tracking-[0.18em] font-semibold text-white/65 hover:text-white transition-colors touch-manipulation"
                  >
                    Clear all
                  </button>
                </div>
              </>
            ) : (
              <button
                disabled
                className="w-full h-12 rounded-xl text-[14px] font-semibold tracking-tight bg-white/[0.04] text-white/55 cursor-not-allowed"
              >
                Reading {capturedImages.length} photo{capturedImages.length > 1 ? 's' : ''}…
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );

  // Return with or without Card wrapper based on renderContentOnly prop
  if (renderContentOnly) {
    return <div className="space-y-3 md:space-y-4">{content}</div>;
  }

  return (
    <Card className="border-2 border-elec-blue w-full max-w-2xl">
      <CardContent className="p-3 md:p-6 space-y-3 md:space-y-4">{content}</CardContent>
    </Card>
  );
};

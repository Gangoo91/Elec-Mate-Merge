import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Camera, X, Check, Loader2, Upload, Info, Zap, Radio, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AIResultsPreview } from './AIResultsPreview';
import { enhanceImageForAI, assessImageQuality, detectThreePhaseBoard, getDataUrlSizeMB } from '@/utils/boardAnalysis/imagePreprocessor';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useStreamingBoardAnalysis } from '@/hooks/useStreamingBoardAnalysis';

interface BoardPhotoCaptureProps {
  onAnalysisComplete: (data: any) => void;
  onClose: () => void;
}

interface AnalysisOptions {
  useEnhancedScanner: boolean;
  useStreaming: boolean;
  fastMode: boolean;
  isThreePhase: boolean;
}

export const BoardPhotoCapture: React.FC<BoardPhotoCaptureProps> = ({
  onAnalysisComplete,
  onClose
}) => {
  const [capturedImages, setCapturedImages] = useState<Array<{ url: string; status: 'compressing' | 'ready' }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Enhanced scanner state
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<{
    circuits: any[];
    board: any;
    metadata?: any;
  } | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<AnalysisOptions>({
    useEnhancedScanner: true,
    useStreaming: true,
    fastMode: false,
    isThreePhase: false
  });

  // Streaming analysis hook
  const streaming = useStreamingBoardAnalysis();

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

  // Compress image inline with optimized settings for better AI accuracy
  const compressImage = async (dataUrl: string, maxSizeMB: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Optimized resolution for speed while maintaining readability
        const maxDim = 1600; // Balanced for electrical text clarity
        let { width, height } = img;
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = (height / width) * maxDim;
            width = maxDim;
          } else {
            width = (width / height) * maxDim;
            height = maxDim;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Apply subtle sharpening filter for better text clarity
        ctx.filter = 'contrast(1.1) brightness(1.05)';
        ctx.drawImage(img, 0, 0, width, height);
        
        // Aggressive compression for speed - electrical text is high contrast
        const quality = 0.78;
        const compressed = canvas.toDataURL('image/jpeg', quality);
        const sizeMB = getDataUrlSizeMB(compressed);
        
        console.log(`Compressed to ${sizeMB.toFixed(2)}MB at ${maxDim}px (quality: ${quality})`);
        resolve(compressed);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    });
  };

  const checkPhotoQuality = async (dataUrl: string): Promise<{
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
            const prevBrightness = (pixels[i-4] + pixels[i-3] + pixels[i-2]) / 3;
            totalContrast += Math.abs(brightness - prevBrightness);
          }
        }
        
        const avgBrightness = totalBrightness / (sampleSize * sampleSize);
        const avgContrast = totalContrast / (sampleSize * sampleSize);
        
        if (avgBrightness < 40) {
          resolve({ 
            ok: false, 
            issue: '📷 Photo too dark - circuit labels may be unreadable',
            autofix: 'Try: Turn on room lights or use torch/flash'
          });
        } else if (avgBrightness > 230) {
          resolve({ 
            ok: false, 
            issue: '📷 Photo overexposed - details washed out',
            autofix: 'Try: Reduce lighting or avoid direct glare on board'
          });
        } else if (avgContrast < 5) {
          resolve({ 
            ok: false, 
            issue: '📷 Photo appears blurry or out of focus',
            autofix: 'Try: Hold phone steady, tap screen to focus on MCB labels'
          });
        } else if (avgBrightness < 80) {
          resolve({
            ok: true,
            autofix: '💡 Photo slightly dark - AI will try to enhance contrast'
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
          duration: 6000
        });
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', 
          width: { ideal: 1920 }, 
          height: { ideal: 1080 } 
        }
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error: any) {
      console.error('Camera access error:', error.name, error.message);
      
      // Provide specific guidance based on error type
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        toast.error(
          'Camera permission denied. Please enable camera access in your browser settings and try again.',
          { duration: 7000 }
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        toast.error(
          'No camera found on this device. Please use "Upload Photos" instead.',
          { duration: 6000 }
        );
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        toast.error(
          'Camera is in use by another app. Please close other apps and try again.',
          { duration: 6000 }
        );
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        // Camera exists but doesn't support our requirements - try fallback
        toast.loading('Trying alternative camera settings...', { id: 'fallback' });
        tryFallbackCamera();
      } else if (error.name === 'NotSupportedError') {
        toast.error(
          'Camera API not supported. Please use "Upload Photos" instead.',
          { duration: 6000 }
        );
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
        video: { facingMode: 'environment' }
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
      console.error('Fallback camera error:', error);
      toast.error(
        'Could not access camera even with basic settings. Please use "Upload Photos" instead.',
        { duration: 6000 }
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
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
        setCapturedImages(prev => [...prev, { url: originalDataUrl, status: 'compressing' }]);
        toast.success('Photo captured');
        
        // Compress in background
        const targetMB = calculateTargetSizePerPhoto(capturedImages.length + 1);
        compressImage(originalDataUrl, targetMB).then(compressed => {
          setCapturedImages(prev => prev.map(img => 
            img.url === originalDataUrl 
              ? { url: compressed, status: 'ready' }
              : img
          ));
        }).catch(error => {
          console.error('Compression error:', error);
          toast.error('Photo compression failed');
          setCapturedImages(prev => prev.filter(img => img.url !== originalDataUrl));
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
      const filePromises = Array.from(files).map(file => 
        new Promise<{ file: File; dataUrl: string }>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ 
            file, 
            dataUrl: e.target?.result as string 
          });
          reader.readAsDataURL(file);
        })
      );
      
      const loadedFiles = await Promise.all(filePromises);
      
      // Add all images immediately
      loadedFiles.forEach(({ dataUrl }) => {
        setCapturedImages(prev => [...prev, { url: dataUrl, status: 'compressing' }]);
      });
      
      toast.success(`Added ${files.length} photo${files.length > 1 ? 's' : ''} - compressing...`);
      
      // Compress all in parallel
      Promise.all(
        loadedFiles.map(({ dataUrl }) => 
          compressImage(dataUrl, targetMB)
            .then(compressed => ({ original: dataUrl, compressed }))
            .catch(error => {
              console.error('Compression error:', error);
              return null;
            })
        )
      ).then(results => {
        setCapturedImages(prev => 
          prev.map(img => {
            const result = results.find(r => r?.original === img.url);
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
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handler for applying circuits from AI preview
  const handleApplyFromPreview = (circuits: any[]) => {
    if (!previewData) return;

    const transformedData = {
      circuits,
      board: previewData.board,
      metadata: previewData.metadata,
      warnings: previewData.metadata?.warnings,
      decisions: previewData.metadata?.decisions
    };

    onAnalysisComplete(transformedData);
    setShowPreview(false);
    setPreviewData(null);
  };

  // Handler for re-scan from preview
  const handleRescan = () => {
    setShowPreview(false);
    setPreviewData(null);
    // Images are still captured, user can adjust and re-analyze
  };

  const analyzeImages = async () => {
    if (capturedImages.length === 0) return;

    // Check if all images are compressed
    const stillCompressing = capturedImages.some(img => img.status === 'compressing');
    if (stillCompressing) {
      toast.loading('Finishing compression...', { duration: 2000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Check total payload size
    const totalSizeMB = capturedImages.reduce((sum, img) => sum + getDataUrlSizeMB(img.url), 0);
    console.log(`Total payload size: ${totalSizeMB.toFixed(2)}MB for ${capturedImages.length} photos`);

    if (totalSizeMB > TOTAL_CAP_MB) {
      toast.error(`Photos too large (${totalSizeMB.toFixed(1)}MB). Maximum is ${TOTAL_CAP_MB}MB.`);
      return;
    }

    setIsAnalyzing(true);

    // Check for three-phase indicators in first image
    let detectedThreePhase = options.isThreePhase;
    if (!options.fastMode && capturedImages.length > 0) {
      try {
        const threePhaseResult = await detectThreePhaseBoard(capturedImages[0].url);
        if (threePhaseResult.isLikelyThreePhase && !detectedThreePhase) {
          detectedThreePhase = true;
          toast.info('Three-phase board detected', { duration: 3000 });
        }
      } catch (e) {
        console.warn('Three-phase detection failed:', e);
      }
    }

    const hints = {
      main_switch_side: 'right' as const,
      is_three_phase: detectedThreePhase,
      board_type: 'domestic' as const
    };

    const analysisOptions = {
      fast_mode: options.fastMode,
      use_claude_ocr: !options.fastMode,
      use_openai_components: !options.fastMode
    };

    // =========================================================================
    // STREAMING MODE - Progressive results
    // =========================================================================
    if (options.useStreaming && options.useEnhancedScanner) {
      try {
        const result = await streaming.analyzeImages(
          capturedImages.map(img => img.url),
          hints,
          analysisOptions
        );

        if (result.circuits.length > 0) {
          const photoText = capturedImages.length > 1 ? `${capturedImages.length} photos` : 'image';
          toast.success(`Found ${result.circuits.length} circuits from ${photoText}`);

          // Transform streaming results to match expected format
          const transformedCircuits = result.circuits.map((circuit, i) => ({
            id: circuit.id || `${circuit.index}-${i}-${Date.now()}`,
            position: circuit.index,
            label: circuit.label_text || `Circuit ${circuit.index}`,
            pictograms: circuit.pictograms || [],
            device: circuit.device?.category || 'MCB',
            curve: circuit.device?.curve || null,
            rating: circuit.device?.rating_amps || null,
            kaRating: circuit.device?.breaking_capacity_kA ? `${circuit.device.breaking_capacity_kA}kA` : null,
            confidence: circuit.confidence || 'medium',
            evidence: circuit.evidence,
            phase: circuit.phase || '1P',
            phases: circuit.phases || null
          }));

          const transformedBoard = {
            make: result.board?.brand || 'Unknown',
            model: result.board?.model || 'Unknown',
            mainSwitch: result.board?.main_switch_rating ? `${result.board.main_switch_rating}A` : 'Unknown',
            spd: result.board?.spd_status === 'green_ok' ? 'OK' :
                 result.board?.spd_status === 'red_replace' ? 'Replace' :
                 result.board?.spd_status === 'yellow_check' ? 'Check' : 'Unknown',
            totalWays: result.board?.estimated_total_ways || result.circuits.length,
            boardLayout: result.board?.board_layout || '1P'
          };

          // Show preview dialog
          setPreviewData({
            circuits: transformedCircuits,
            board: transformedBoard,
            metadata: {
              analysisTime: result.metadata?.analysisTime,
              modelsUsed: result.metadata?.modelsUsed || ['gemini'],
              decisions: streaming.decisions || [],
              warnings: streaming.warnings || []
            }
          });
          setShowPreview(true);
        } else {
          toast.error('AI could not detect any circuits. Please try another angle or ensure the board is clearly visible.');
        }
      } catch (error) {
        console.error('Streaming analysis error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to analyze images');
      } finally {
        setIsAnalyzing(false);
      }
      return;
    }

    // =========================================================================
    // STANDARD MODE - Wait for full results
    // =========================================================================
    toast.loading('📤 Preparing images for AI analysis...', { id: 'analysis' });

    const stage2Timer = setTimeout(() => {
      toast.loading(`📤 Uploading ${capturedImages.length} photo(s) to AI...`, { id: 'analysis' });
    }, 1000);

    const stage3Timer = setTimeout(() => {
      toast.loading('🤖 AI reading protective devices (MCBs/RCBOs)...', { id: 'analysis' });
    }, 3000);

    const stage4Timer = setTimeout(() => {
      toast.loading('🔍 Extracting circuit labels and ratings...', { id: 'analysis' });
    }, 6000);

    const stage5Timer = setTimeout(() => {
      toast.loading('✅ Verifying board configuration...', { id: 'analysis' });
    }, 9000);

    const timeoutId = setTimeout(() => {
      toast.warning('This is taking longer than usual. Please ensure good lighting and try again if needed.', {
        id: 'timeout-warning'
      });
    }, 20000);

    try {
      // Use enhanced scanner if enabled, otherwise fall back to simple
      const functionName = options.useEnhancedScanner ? 'board-read-enhanced' : 'board-read-simple';

      const { data, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: {
          images: capturedImages.map(img => img.url),
          hints,
          options: analysisOptions
        }
      });

      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(stage4Timer);
      clearTimeout(stage5Timer);
      clearTimeout(timeoutId);
      toast.dismiss('analysis');
      toast.dismiss('timeout-warning');

      if (invokeError) {
        throw new Error(invokeError.message || 'Failed to analyse images');
      }
      
      // Display warnings if present
      if (data?.warnings && data.warnings.length > 0) {
        console.warn("Analysis warnings:", data.warnings);
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
        const transformedCircuits = (data.circuits as any[]).map((circuit: any, i: number) => {
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
          if ((!displayLabel || displayLabel.toLowerCase().includes('unlabelled')) && pictograms.length > 0) {
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
            liveConductorSize: circuit?.live_conductor_size_mm2 ? `${circuit.live_conductor_size_mm2}mm²` : null,
            cpcSize: circuit?.cpc_size_mm2 ? `${circuit.cpc_size_mm2}mm²` : null,
            kaRating: circuit?.device?.breaking_capacity_kA ? `${circuit.device.breaking_capacity_kA}kA` : null,
            confidence,
            evidence: circuit?.evidence,
            notes: circuit?.notes ?? '',
            phase: circuit?.phase ?? '1P',
            phases: circuit?.phases ?? null
          };
        }).sort((a, b) => a.position - b.position);

        const resolvedWays = data?.estimated_total_ways ?? data?.metadata?.boardSize ?? transformedCircuits.length;

        const transformedBoard = {
          make: data?.brand || 'Unknown',
          model: data?.model || data?.brand || 'Unknown',
          mainSwitch: data?.main_switch_rating ? `${data.main_switch_rating}A` : 'Unknown',
          spd: data?.spd_status === 'green_ok' ? 'OK' : 
               data?.spd_status === 'red_replace' ? 'Replace' : 
               data?.spd_status === 'yellow_check' ? 'Check' : 'Unknown',
          totalWays: resolvedWays,
          evidence: data?.evidence,
          boardLayout: data?.board_layout ?? '1P',
          waysPerCircuit: data?.ways_per_circuit ?? 1
        };

        const transformedData = {
          circuits: transformedCircuits,
          board: transformedBoard,
          metadata: { ...data?.metadata, boardSize: resolvedWays },
          warnings: data?.warnings,
          decisions: data?.decisions
        };
        
        toast.success(`Found ${data.circuits.length} circuits from ${photoText}`);

        // Show preview dialog for enhanced scanner, or apply directly for simple
        if (options.useEnhancedScanner) {
          setPreviewData({
            circuits: transformedCircuits,
            board: transformedBoard,
            metadata: {
              analysisTime: data?.metadata?.analysisTime,
              modelsUsed: data?.metadata?.modelsUsed || ['gemini'],
              decisions: data?.decisions || [],
              warnings: data?.warnings || []
            }
          });
          setShowPreview(true);
        } else {
          onAnalysisComplete(transformedData);
        }
        
        const lowConfCircuits = transformedCircuits.filter(c => c.confidence === 'low');
        if (lowConfCircuits.length > 0) {
          toast.warning(
            `⚠️ ${lowConfCircuits.length} circuit(s) detected with low confidence: ${lowConfCircuits.map(c => `#${c.position}`).join(', ')}. Please verify these manually before finalising.`,
            { duration: 8000 }
          );
        }

        const mediumConfCount = transformedCircuits.filter(c => c.confidence === 'medium').length;
        if (mediumConfCount > transformedCircuits.length * 0.3) {
          toast.warning(
            `⚠️ ${mediumConfCount} of ${transformedCircuits.length} circuits have medium confidence. Consider retaking photos with better lighting and closer angle.`,
            { duration: 6000 }
          );
        }
      } else {
        toast.error('AI could not detect any circuits. Please try another angle or ensure the board is clearly visible and well-lit.');
      }
    } catch (error) {
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(stage4Timer);
      clearTimeout(stage5Timer);
      clearTimeout(timeoutId);
      console.error('Error analyzing images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze images';
      toast.error(errorMessage);
    } finally {
      toast.dismiss('analysis');
      toast.dismiss('timeout-warning');
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-2 border-elec-blue w-full max-w-2xl">
      <CardContent className="p-3 md:p-6 space-y-3 md:space-y-4">
        {/* Hidden file input - always mounted for reliable mobile access */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          key="file-input"
        />
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm md:text-lg font-semibold flex items-center gap-1.5 md:gap-2">
            <Camera className="h-4 w-4 md:h-5 md:w-5 text-elec-blue" />
            Scan Electrical Board
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 md:h-9 md:w-9">
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        {/* AI Reading Direction Guidance */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 md:p-4">
          <div className="flex gap-2 md:gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-xs md:text-sm font-medium text-blue-900 dark:text-blue-100">
                AI reads circuits left → right
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                If your <span className="font-semibold">main switch is on the right side</span>, use the <span className="font-semibold">"Reverse Order"</span> button after analysis to correct circuit numbering.
              </p>
            </div>
          </div>
        </div>

        {capturedImages.length === 0 && !showCamera && (
          <div className="space-y-2.5 md:space-y-3">
            <p className="text-xs md:text-sm text-muted-foreground">
              Take multiple photos of the consumer unit from different angles for better accuracy.
              <span className="block mt-1 text-yellow-600 dark:text-yellow-500 font-medium">
                Note: You'll need to allow camera access when prompted by your browser.
              </span>
            </p>
            <div className="flex flex-col gap-2 md:gap-3">
              <Button onClick={startCamera} className="w-full h-10 md:h-12 text-sm md:text-base">
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="w-full h-10 md:h-12 text-sm md:text-base"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>
          </div>
        )}

        {showCamera && (
          <div className="space-y-2.5 md:space-y-3">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg aspect-video object-cover"
            />
            <div className="flex gap-2">
              <Button onClick={capturePhoto} className="flex-1 h-10 md:h-12 text-sm md:text-base">
                <Camera className="h-4 w-4 mr-2" />
                Capture Photo
              </Button>
              <Button variant="outline" onClick={stopCamera} className="h-10 md:h-12 text-sm md:text-base">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {capturedImages.length > 0 && (
          <div className="space-y-2.5 md:space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[40vh] md:max-h-[50vh] overflow-y-auto">
              {capturedImages.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img.url}
                    alt={`Board photo ${idx + 1}`}
                    className="w-full rounded-lg border object-cover aspect-video"
                  />
                  {img.status === 'compressing' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                      <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin text-foreground" />
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1.5 right-1.5 md:top-2 md:right-2 h-7 w-7 md:h-8 md:w-8 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(idx)}
                  >
                    <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {/* Enhanced Scanner Options */}
            <div className="flex items-center justify-between py-2 border-t border-b border-border">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Switch
                    id="enhanced-mode"
                    checked={options.useEnhancedScanner}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, useEnhancedScanner: checked }))}
                  />
                  <Label htmlFor="enhanced-mode" className="text-xs cursor-pointer flex items-center gap-1">
                    <Zap className="h-3 w-3 text-primary" />
                    Enhanced AI
                  </Label>
                </div>
                {options.useEnhancedScanner && (
                  <>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="stream-mode"
                        checked={options.useStreaming}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, useStreaming: checked }))}
                      />
                      <Label htmlFor="stream-mode" className="text-xs cursor-pointer flex items-center gap-1">
                        <Activity className="h-3 w-3 text-green-500" />
                        Live
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="fast-mode"
                        checked={options.fastMode}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, fastMode: checked }))}
                      />
                      <Label htmlFor="fast-mode" className="text-xs cursor-pointer">
                        Fast
                      </Label>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="three-phase"
                  checked={options.isThreePhase}
                  onCheckedChange={(checked) => setOptions(prev => ({ ...prev, isThreePhase: checked }))}
                />
                <Label htmlFor="three-phase" className="text-xs cursor-pointer">
                  3-Phase
                </Label>
              </div>
            </div>

            {/* Live Streaming Progress */}
            {streaming.isStreaming && (
              <div className="space-y-3 p-3 bg-muted/50 rounded-lg border border-border animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Live Analysis</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{streaming.progress}%</span>
                </div>

                <Progress value={streaming.progress} className="h-2" />

                <p className="text-xs text-muted-foreground">{streaming.stageMessage}</p>

                {/* Live board info */}
                {streaming.board && (
                  <div className="text-xs bg-background/50 p-2 rounded border">
                    <span className="font-medium">{streaming.board.brand}</span>
                    {streaming.board.main_switch_rating && (
                      <span className="text-muted-foreground ml-2">{streaming.board.main_switch_rating}A Main</span>
                    )}
                    {streaming.board.estimated_total_ways && (
                      <span className="text-muted-foreground ml-2">{streaming.board.estimated_total_ways} ways</span>
                    )}
                  </div>
                )}

                {/* Live circuits count */}
                {streaming.circuits.length > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600 dark:text-green-400">
                      {streaming.circuits.length} circuits detected
                    </span>
                    <div className="flex gap-1">
                      {streaming.circuits.slice(-5).map((c, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-primary/10 rounded text-[10px] animate-in slide-in-from-right duration-200"
                        >
                          #{c.index}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cancel button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    streaming.abort();
                    setIsAnalyzing(false);
                  }}
                  className="w-full text-xs"
                >
                  Cancel Analysis
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {!isAnalyzing ? (
                <>
                  <Button onClick={analyzeImages} className="flex-1 min-w-full sm:min-w-0 h-10 md:h-12 text-sm md:text-base">
                    {options.useEnhancedScanner ? <Zap className="h-4 w-4 mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                    {options.useEnhancedScanner ? 'Enhanced Analyse' : 'Analyse'} {capturedImages.length} Photo{capturedImages.length > 1 ? 's' : ''}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="h-10 md:h-12 text-sm md:text-base"
                  >
                    Add More
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCapturedImages([]);
                      setShowCamera(false);
                    }}
                    className="h-10 md:h-12 text-sm md:text-base"
                  >
                    Clear
                  </Button>
                </>
              ) : (
                <Button disabled className="w-full h-10 md:h-12 text-sm md:text-base">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analysing {capturedImages.length} Photo{capturedImages.length > 1 ? 's' : ''}...
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>

      {/* AI Results Preview Dialog */}
      {previewData && (
        <AIResultsPreview
          open={showPreview}
          onOpenChange={setShowPreview}
          circuits={previewData.circuits}
          board={previewData.board}
          imageUrl={capturedImages[0]?.url}
          metadata={previewData.metadata}
          onApply={handleApplyFromPreview}
          onRescan={handleRescan}
        />
      )}
    </Card>
  );
};

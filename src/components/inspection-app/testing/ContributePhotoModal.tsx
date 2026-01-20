/**
 * ContributePhotoModal - User contribution flow for board scanner training
 *
 * Allows users to contribute their board scan photos to help improve
 * the AI. Strips EXIF data and stores anonymously.
 */

import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Bot, Shield, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface DetectedCircuit {
  id: string;
  position: number;
  label: string;
  device: string;
  rating: number | null;
  curve: string | null;
  confidence: 'high' | 'medium' | 'low';
  phase?: '1P' | '3P';
  pictograms?: Array<{ type: string; confidence: number }>;
  notes?: string;
  evidence?: string;
}

interface ContributePhotoModalProps {
  open: boolean;
  onClose: () => void;
  photoUrl: string;
  photoBase64?: string;
  circuits: DetectedCircuit[];
  originalCircuits: DetectedCircuit[];
  board: {
    make?: string;
    model?: string;
    mainSwitch?: string;
    totalWays?: number;
  };
}

type UploadStatus = 'idle' | 'compressing' | 'uploading' | 'saving' | 'complete' | 'error';

export const ContributePhotoModal: React.FC<ContributePhotoModalProps> = ({
  open,
  onClose,
  photoUrl,
  photoBase64,
  circuits,
  originalCircuits,
  board,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Compress image and strip EXIF by redrawing on canvas
  const compressAndStripExif = useCallback(async (imageUrl: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 1920;
        const maxHeight = 1920;

        let { width, height } = img;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Drawing to canvas strips all EXIF metadata
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          'image/jpeg',
          0.85 // 85% quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  }, []);

  // Generate anonymous user hash for deduplication
  const generateAnonymousHash = useCallback(async (): Promise<string> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return uuidv4();

    // Create a hash that's consistent for the user but not reversible
    const encoder = new TextEncoder();
    const data = encoder.encode(user.id + 'board-scanner-training');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
  }, []);

  // Check what fields were corrected
  const getCorrections = useCallback(() => {
    const corrections: Array<{
      circuit_position: number;
      ai_device_type: string | null;
      ai_rating: string | null;
      ai_curve: string | null;
      ai_label: string | null;
      correct_device_type: string | null;
      correct_rating: string | null;
      correct_curve: string | null;
      correct_label: string | null;
      device_type_changed: boolean;
      rating_changed: boolean;
      curve_changed: boolean;
      label_changed: boolean;
    }> = [];

    circuits.forEach((corrected) => {
      const original = originalCircuits.find(o => o.id === corrected.id);
      if (!original) return;

      const deviceTypeChanged = corrected.device !== original.device;
      const ratingChanged = corrected.rating !== original.rating;
      const curveChanged = corrected.curve !== original.curve;
      const labelChanged = corrected.label !== original.label;

      // Only include if something was changed
      if (deviceTypeChanged || ratingChanged || curveChanged || labelChanged) {
        corrections.push({
          circuit_position: corrected.position,
          ai_device_type: original.device,
          ai_rating: original.rating?.toString() || null,
          ai_curve: original.curve,
          ai_label: original.label,
          correct_device_type: corrected.device,
          correct_rating: corrected.rating?.toString() || null,
          correct_curve: corrected.curve,
          correct_label: corrected.label,
          device_type_changed: deviceTypeChanged,
          rating_changed: ratingChanged,
          curve_changed: curveChanged,
          label_changed: labelChanged,
        });
      }
    });

    return corrections;
  }, [circuits, originalCircuits]);

  const handleContribute = async () => {
    try {
      setUploadStatus('compressing');
      setUploadProgress(10);

      // Compress and strip EXIF
      const imageSource = photoBase64 || photoUrl;
      const compressedBlob = await compressAndStripExif(imageSource);

      setUploadStatus('uploading');
      setUploadProgress(30);

      // Generate filename and upload
      const fileName = `training/${uuidv4()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('board-reference-images')
        .upload(fileName, compressedBlob, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      setUploadProgress(60);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('board-reference-images')
        .getPublicUrl(fileName);

      setUploadStatus('saving');
      setUploadProgress(80);

      // Get user info
      const anonymousHash = await generateAnonymousHash();
      const { data: { user } } = await supabase.auth.getUser();
      const scanSessionId = uuidv4();

      // Get corrections
      const corrections = getCorrections();

      // Insert training data for each circuit
      const trainingRecords = circuits.map((circuit, index) => {
        const correction = corrections.find(c => c.circuit_position === circuit.position);

        return {
          image_url: publicUrl,
          board_brand: board.make || null,
          board_model: board.model || null,
          circuit_position: circuit.position,
          scan_session_id: scanSessionId,
          ai_device_type: correction?.ai_device_type || circuit.device,
          ai_rating: correction?.ai_rating || circuit.rating?.toString() || null,
          ai_curve: correction?.ai_curve || circuit.curve,
          ai_label: correction?.ai_label || circuit.label,
          ai_confidence: circuit.confidence,
          ai_model_used: 'gemini-2.0-flash',
          correct_device_type: correction?.correct_device_type || circuit.device,
          correct_rating: correction?.correct_rating || circuit.rating?.toString() || null,
          correct_curve: correction?.correct_curve || circuit.curve,
          correct_label: correction?.correct_label || circuit.label,
          device_type_changed: correction?.device_type_changed || false,
          rating_changed: correction?.rating_changed || false,
          curve_changed: correction?.curve_changed || false,
          label_changed: correction?.label_changed || false,
          user_id: isAnonymous ? null : user?.id || null,
          used_for_training: false,
        };
      });

      const { error: dbError } = await supabase
        .from('board_scanner_training')
        .insert(trainingRecords);

      if (dbError) {
        throw new Error(`Failed to save training data: ${dbError.message}`);
      }

      setUploadProgress(100);
      setUploadStatus('complete');

      toast.success('Thanks for contributing! Your scan will help improve the AI.');

      // Close after brief delay
      setTimeout(() => {
        onClose();
        setUploadStatus('idle');
        setUploadProgress(0);
      }, 1500);

    } catch (error) {
      console.error('Contribution error:', error);
      setUploadStatus('error');
      toast.error(error instanceof Error ? error.message : 'Failed to contribute photo');
    }
  };

  const handleClose = () => {
    if (uploadStatus === 'idle' || uploadStatus === 'complete' || uploadStatus === 'error') {
      onClose();
      setUploadStatus('idle');
      setUploadProgress(0);
    }
  };

  const isUploading = uploadStatus !== 'idle' && uploadStatus !== 'complete' && uploadStatus !== 'error';
  const correctionsCount = getCorrections().length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-background">
        <DialogHeader className="p-4 pb-3 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <DialogTitle className="text-base">Help improve AI?</DialogTitle>
              <DialogDescription className="text-sm mt-0.5">
                Share this scan to train our board detector
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-4 space-y-4">
          {/* Photo preview */}
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted/20 border border-border/30">
            <img
              src={photoUrl}
              alt="Board scan"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {circuits.length} circuits detected
            </div>
            {correctionsCount > 0 && (
              <div className="absolute bottom-2 right-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                {correctionsCount} correction{correctionsCount !== 1 ? 's' : ''} made
              </div>
            )}
          </div>

          {/* Privacy info */}
          <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Privacy protected</p>
                <ul className="space-y-0.5 text-xs">
                  <li>Photo compressed & EXIF stripped</li>
                  <li>No GPS or location data stored</li>
                  <li>No personal information included</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Anonymous checkbox */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked === true)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <Label htmlFor="anonymous" className="text-sm cursor-pointer">
              Contribute anonymously
            </Label>
          </div>

          {/* Upload progress */}
          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {uploadStatus === 'compressing' && 'Preparing image...'}
                {uploadStatus === 'uploading' && 'Uploading...'}
                {uploadStatus === 'saving' && 'Saving training data...'}
              </p>
            </div>
          )}

          {uploadStatus === 'complete' && (
            <div className="text-center py-2">
              <p className="text-green-500 font-medium">Thanks for contributing!</p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="text-center py-2">
              <p className="text-red-500 text-sm">Something went wrong. Try again?</p>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 pt-0 flex-row gap-3">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isUploading}
            className="flex-1 h-11 touch-manipulation"
          >
            Not Now
          </Button>
          <Button
            onClick={handleContribute}
            disabled={isUploading || uploadStatus === 'complete'}
            className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
          >
            {isUploading ? 'Contributing...' : 'Contribute'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContributePhotoModal;

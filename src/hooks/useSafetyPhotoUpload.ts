import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export interface UploadProgress {
  status: 'idle' | 'compressing' | 'uploading' | 'saving' | 'complete' | 'error';
  progress: number;
  message: string;
}

export interface UploadOptions {
  description: string;
  category: string;
  location?: string;
  tags?: string[];
  projectReference?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  addWatermark?: boolean;
}

export interface CopyFromInspectionOptions {
  sourceUrl: string; // inspection photo URL
  projectReference: string; // auto-generated from cert
  description: string; // from observation
  category: string; // mapped from defect code
  defectCode?: string; // C1, C2, C3, etc.
  location?: string; // installation address
  certificateNumber?: string; // for tags
  certificateType?: string; // for tags
}

export function useSafetyPhotoUpload() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
    message: '',
  });

  // Apply professional watermark with timestamp, location, category
  const applyWatermark = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, options: UploadOptions) => {
      const padding = Math.max(12, width * 0.015);
      const fontSize = Math.max(11, Math.min(16, width * 0.012));
      const barHeight = Math.max(48, fontSize * 3.5);

      // Semi-transparent bottom bar
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(0, height - barHeight, width, barHeight);

      // Top-left yellow accent line
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(padding, height - barHeight + padding * 0.8, 3, barHeight - padding * 1.6);

      ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textBaseline = 'top';

      const textX = padding + 10;
      let textY = height - barHeight + padding * 0.8;

      // Date and time
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const timeStr = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      ctx.fillText(`${dateStr}  ${timeStr}`, textX, textY);
      textY += fontSize + 4;

      // Category and location
      ctx.font = `${fontSize * 0.85}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      const parts: string[] = [];
      if (options.category) {
        const catLabel = options.category
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase());
        parts.push(catLabel);
      }
      if (options.location) parts.push(options.location);
      if (options.projectReference) parts.push(`Ref: ${options.projectReference}`);

      if (parts.length > 0) {
        ctx.fillText(parts.join('  |  '), textX, textY);
      }

      // Elec-Mate branding (small, bottom-right)
      ctx.font = `${fontSize * 0.7}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.textAlign = 'right';
      ctx.fillText('Elec-Mate', width - padding, height - padding);
      ctx.textAlign = 'left';
    },
    []
  );

  // Compress image to reasonable size for mobile uploads
  const compressImage = useCallback(
    async (file: File, watermarkOptions?: UploadOptions): Promise<File> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
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
              resolve(file);
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            // Apply watermark if requested
            if (watermarkOptions?.addWatermark) {
              applyWatermark(ctx, width, height, watermarkOptions);
            }

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  resolve(file);
                }
              },
              'image/jpeg',
              0.8 // 80% quality
            );
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    },
    [applyWatermark]
  );

  // Extract GPS from image EXIF data
  const extractGPS = useCallback(async (file: File): Promise<{ lat?: number; lng?: number }> => {
    // For now, we'll use the browser's geolocation API as a fallback
    // EXIF extraction could be added with a library like exif-js
    return {};
  }, []);

  // Get current location
  const getCurrentLocation = useCallback((): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );
    });
  }, []);

  // Upload photo with all metadata
  const uploadPhoto = useCallback(
    async (file: File, options: UploadOptions) => {
      if (!session?.user?.id) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to upload photos',
          variant: 'destructive',
        });
        return null;
      }

      try {
        // Step 1: Compress image
        setUploadProgress({
          status: 'compressing',
          progress: 20,
          message: 'Compressing image...',
        });

        const compressedFile = await compressImage(
          file,
          options.addWatermark ? options : undefined
        );

        // Step 2: Upload to storage
        setUploadProgress({
          status: 'uploading',
          progress: 40,
          message: 'Uploading...',
        });

        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('safety-photos')
          .upload(filePath, compressedFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Step 3: Get public URL
        setUploadProgress({
          status: 'saving',
          progress: 70,
          message: 'Saving photo details...',
        });

        const {
          data: { publicUrl },
        } = supabase.storage.from('safety-photos').getPublicUrl(filePath);

        // Get GPS coordinates if available
        let gpsLat = options.gpsLatitude;
        let gpsLng = options.gpsLongitude;

        if (!gpsLat && !gpsLng) {
          const location = await getCurrentLocation();
          if (location) {
            gpsLat = location.lat;
            gpsLng = location.lng;
          }
        }

        // Step 4: Create database record
        const { data: photoData, error: dbError } = await supabase
          .from('safety_photos')
          .insert({
            user_id: session.user.id,
            filename: fileName,
            file_url: publicUrl,
            description: options.description,
            category: options.category,
            location: options.location || null,
            tags: options.tags || null,
            project_reference: options.projectReference || null,
            gps_latitude: gpsLat || null,
            gps_longitude: gpsLng || null,
            file_size: compressedFile.size,
            mime_type: compressedFile.type,
          })
          .select()
          .single();

        if (dbError) {
          // Clean up uploaded file if database insert fails
          await supabase.storage.from('safety-photos').remove([filePath]);
          throw new Error(`Failed to save photo: ${dbError.message}`);
        }

        // Step 5: Complete
        setUploadProgress({
          status: 'complete',
          progress: 100,
          message: 'Photo uploaded!',
        });

        // Invalidate queries to refresh lists
        queryClient.invalidateQueries({ queryKey: ['safety-photos'] });
        queryClient.invalidateQueries({ queryKey: ['safety-photo-stats'] });
        queryClient.invalidateQueries({ queryKey: ['safety-photo-projects'] });

        toast({
          title: 'Photo uploaded',
          description: 'Your photo has been saved successfully',
        });

        // Reset progress after short delay
        setTimeout(() => {
          setUploadProgress({
            status: 'idle',
            progress: 0,
            message: '',
          });
        }, 1500);

        return photoData;
      } catch (error: unknown) {
        console.error('Upload error:', error);
        const msg = error instanceof Error ? error.message : 'Upload failed';
        setUploadProgress({
          status: 'error',
          progress: 0,
          message: msg,
        });

        toast({
          title: 'Upload failed',
          description: msg,
          variant: 'destructive',
        });

        return null;
      }
    },
    [session, compressImage, getCurrentLocation, queryClient]
  );

  // Upload multiple photos
  const uploadMultiple = useCallback(
    async (files: File[], options: UploadOptions) => {
      const results = [];
      for (let i = 0; i < files.length; i++) {
        const result = await uploadPhoto(files[i], {
          ...options,
          description: `${options.description} (${i + 1}/${files.length})`,
        });
        if (result) {
          results.push(result);
        }
      }
      return results;
    },
    [uploadPhoto]
  );

  const resetProgress = useCallback(() => {
    setUploadProgress({
      status: 'idle',
      progress: 0,
      message: '',
    });
  }, []);

  // Copy a photo from inspection/certificate to safety photo documentation
  const copyFromInspection = useCallback(
    async (options: CopyFromInspectionOptions) => {
      if (!session?.user?.id) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to copy photos',
          variant: 'destructive',
        });
        return null;
      }

      try {
        setUploadProgress({
          status: 'uploading',
          progress: 20,
          message: 'Fetching photo...',
        });

        // Fetch the image from the source URL
        const response = await fetch(options.sourceUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch source photo');
        }
        const blob = await response.blob();

        setUploadProgress({
          status: 'uploading',
          progress: 50,
          message: 'Copying to Photo Docs...',
        });

        // Generate filename
        const fileExt = options.sourceUrl.split('.').pop()?.split('?')[0] || 'jpg';
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        // Upload to safety-photos bucket
        const { error: uploadError } = await supabase.storage
          .from('safety-photos')
          .upload(filePath, blob, {
            cacheControl: '3600',
            upsert: false,
            contentType: blob.type || 'image/jpeg',
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        setUploadProgress({
          status: 'saving',
          progress: 75,
          message: 'Saving photo details...',
        });

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('safety-photos').getPublicUrl(filePath);

        // Build tags array
        const tags: string[] = [];
        if (options.defectCode) tags.push(options.defectCode);
        if (options.certificateType) tags.push(options.certificateType);
        if (options.certificateNumber) tags.push(options.certificateNumber);

        // Create database record
        const { data: photoData, error: dbError } = await supabase
          .from('safety_photos')
          .insert({
            user_id: session.user.id,
            filename: fileName,
            file_url: publicUrl,
            description: options.description,
            category: options.category,
            location: options.location || null,
            tags: tags.length > 0 ? tags : null,
            project_reference: options.projectReference,
            file_size: blob.size,
            mime_type: blob.type || 'image/jpeg',
          })
          .select()
          .single();

        if (dbError) {
          // Clean up uploaded file if database insert fails
          await supabase.storage.from('safety-photos').remove([filePath]);
          throw new Error(`Failed to save photo: ${dbError.message}`);
        }

        setUploadProgress({
          status: 'complete',
          progress: 100,
          message: 'Photo copied!',
        });

        // Invalidate queries to refresh lists
        queryClient.invalidateQueries({ queryKey: ['safety-photos'] });
        queryClient.invalidateQueries({ queryKey: ['safety-photo-stats'] });
        queryClient.invalidateQueries({ queryKey: ['safety-photo-projects'] });

        // Reset progress after short delay
        setTimeout(() => {
          setUploadProgress({
            status: 'idle',
            progress: 0,
            message: '',
          });
        }, 1500);

        return photoData;
      } catch (error: unknown) {
        console.error('Copy from inspection error:', error);
        const msg = error instanceof Error ? error.message : 'Copy failed';
        setUploadProgress({
          status: 'error',
          progress: 0,
          message: msg,
        });

        toast({
          title: 'Copy failed',
          description: msg,
          variant: 'destructive',
        });

        return null;
      }
    },
    [session, queryClient]
  );

  return {
    uploadPhoto,
    uploadMultiple,
    copyFromInspection,
    uploadProgress,
    resetProgress,
    isUploading:
      uploadProgress.status !== 'idle' &&
      uploadProgress.status !== 'complete' &&
      uploadProgress.status !== 'error',
    getCurrentLocation,
  };
}

import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

export interface UploadProgress {
  status: "idle" | "compressing" | "uploading" | "saving" | "complete" | "error";
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
}

export function useSafetyPhotoUpload() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: "idle",
    progress: 0,
    message: "",
  });

  // Compress image to reasonable size for mobile uploads
  const compressImage = useCallback(async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
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

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            0.8 // 80% quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }, []);

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
          title: "Authentication required",
          description: "Please sign in to upload photos",
          variant: "destructive",
        });
        return null;
      }

      try {
        // Step 1: Compress image
        setUploadProgress({
          status: "compressing",
          progress: 20,
          message: "Compressing image...",
        });

        const compressedFile = await compressImage(file);

        // Step 2: Upload to storage
        setUploadProgress({
          status: "uploading",
          progress: 40,
          message: "Uploading...",
        });

        const fileExt = file.name.split(".").pop() || "jpg";
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("safety-photos")
          .upload(filePath, compressedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        // Step 3: Get public URL
        setUploadProgress({
          status: "saving",
          progress: 70,
          message: "Saving photo details...",
        });

        const {
          data: { publicUrl },
        } = supabase.storage.from("safety-photos").getPublicUrl(filePath);

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
          .from("safety_photos")
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
          await supabase.storage.from("safety-photos").remove([filePath]);
          throw new Error(`Failed to save photo: ${dbError.message}`);
        }

        // Step 5: Complete
        setUploadProgress({
          status: "complete",
          progress: 100,
          message: "Photo uploaded!",
        });

        // Invalidate queries to refresh lists
        queryClient.invalidateQueries({ queryKey: ["safety-photos"] });
        queryClient.invalidateQueries({ queryKey: ["safety-photo-stats"] });
        queryClient.invalidateQueries({ queryKey: ["safety-photo-projects"] });

        toast({
          title: "Photo uploaded",
          description: "Your photo has been saved successfully",
        });

        // Reset progress after short delay
        setTimeout(() => {
          setUploadProgress({
            status: "idle",
            progress: 0,
            message: "",
          });
        }, 1500);

        return photoData;
      } catch (error: any) {
        console.error("Upload error:", error);
        setUploadProgress({
          status: "error",
          progress: 0,
          message: error.message || "Upload failed",
        });

        toast({
          title: "Upload failed",
          description: error.message || "Failed to upload photo",
          variant: "destructive",
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
      status: "idle",
      progress: 0,
      message: "",
    });
  }, []);

  return {
    uploadPhoto,
    uploadMultiple,
    uploadProgress,
    resetProgress,
    isUploading: uploadProgress.status !== "idle" && uploadProgress.status !== "complete" && uploadProgress.status !== "error",
    getCurrentLocation,
  };
}

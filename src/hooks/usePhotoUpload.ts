import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedPhoto {
  id: string;
  url: string;
  publicUrl: string;
  fileName: string;
  uploadedAt: Date;
}

export const usePhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);

  const uploadPhoto = useCallback(async (file: File): Promise<UploadedPhoto | null> => {
    setIsUploading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to upload photos');
        return null;
      }

      // Compress image if too large
      const maxSize = 2 * 1024 * 1024; // 2MB
      let uploadFile = file;

      if (file.size > maxSize) {
        toast.info('Compressing image...');
        uploadFile = await compressImage(file, maxSize);
      }

      // Generate unique filename
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('visual-uploads')
        .upload(filePath, uploadFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload photo');
        return null;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('visual-uploads')
        .getPublicUrl(data.path);

      const uploadedPhoto: UploadedPhoto = {
        id: uuidv4(),
        url: data.path,
        publicUrl,
        fileName: uploadFile.name,
        uploadedAt: new Date(),
      };

      setUploadedPhotos(prev => [...prev, uploadedPhoto]);
      toast.success('Photo uploaded successfully');

      return uploadedPhoto;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const deletePhoto = useCallback(async (photoPath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('visual-uploads')
        .remove([photoPath]);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete photo');
        return false;
      }

      setUploadedPhotos(prev => prev.filter(p => p.url !== photoPath));
      toast.success('Photo deleted');
      return true;
    } catch (error) {
      console.error('Error deleting photo:', error);
      return false;
    }
  }, []);

  return {
    isUploading,
    uploadedPhotos,
    uploadPhoto,
    deletePhoto,
  };
};

// Helper function to compress images
async function compressImage(file: File, maxSize: number): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions maintaining aspect ratio
        const maxDimension = 1920;
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
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
    };
  });
}

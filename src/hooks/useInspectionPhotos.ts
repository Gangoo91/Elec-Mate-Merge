import { useState, useEffect as React_useEffect } from 'react';
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { InspectionPhoto } from '@/types/inspection';

interface UseInspectionPhotosProps {
  reportId: string;
  reportType: 'eicr' | 'eic';
  itemId?: string;
  observationId?: string;
  observationContext?: {
    classification: string;
    itemLocation: string;
    description: string;
    recommendation?: string;
    installationType?: string;
  };
}

export const useInspectionPhotos = ({ reportId, reportType, itemId, observationId, observationContext }: UseInspectionPhotosProps) => {
  const [photos, setPhotos] = useState<InspectionPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isScanning, setIsScanning] = useState<string | null>(null);
  const { toast } = useToast();

  // Load existing photos for this item or observation
  React.useEffect(() => {
    const loadPhotos = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: reportData } = await supabase
          .from('reports')
          .select('id')
          .eq('report_id', reportId)
          .eq('user_id', user.id)
          .maybeSingle();

        let photosQuery = supabase.from('inspection_photos').select('*');

        if (reportData?.id) {
          // Migrate any temp photos to real report_id if needed
          if (isUuid(reportId) && reportId !== reportData.id) {
            await supabase.from('inspection_photos')
              .update({ report_id: reportData.id })
              .eq('report_id', reportId);
          }
          photosQuery = photosQuery.eq('report_id', reportData.id);
        } else if (isUuid(reportId)) {
          // Temp flow - allow loading photos with temporary UUID
          photosQuery = photosQuery.eq('report_id', reportId);
        } else {
          // No real report and not a temp UUID – nothing to fetch yet
          return;
        }

        // Filter by either itemId or observationId
        if (observationId) {
          photosQuery = photosQuery.eq('observation_id', observationId);
        } else if (itemId) {
          photosQuery = photosQuery.eq('item_id', itemId);
        }

        const { data, error } = await photosQuery;

        if (error) throw error;

        if (data) {
          const loadedPhotos: InspectionPhoto[] = data.map(photo => {
            const { data: { publicUrl } } = supabase.storage
              .from('inspection-photos')
              .getPublicUrl(photo.file_path);

            return {
              id: photo.id,
              itemId: photo.item_id,
              url: publicUrl,
              thumbnailUrl: publicUrl,
              uploadedAt: new Date(photo.uploaded_at),
              faultCode: photo.fault_code as any,
              observationId: photo.observation_id,
              faultDescription: photo.fault_description,
              aiAnalysis: photo.ai_analysis as any,
            };
          });

          setPhotos(loadedPhotos);
        }
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    };

    if (reportId && (itemId || observationId)) {
      loadPhotos();
    }
  }, [reportId, itemId, observationId]);

  const uploadPhoto = async (file: File, faultCode?: string, faultDescription?: string) => {
    // Allow upload with either itemId or observationId
    if (!itemId && !observationId) {
      toast({
        title: 'Upload failed',
        description: 'Item ID or Observation ID is required to upload photos',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: reportData } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', reportId)
        .eq('user_id', user.id)
        .maybeSingle();

      let reportUuid: string;
      if (reportData?.id) {
        reportUuid = reportData.id;
      } else if (isUuid(reportId)) {
        // Temporary report, allow upload now
        reportUuid = reportId;
      } else {
        throw new Error('Please save the report details first before adding photos');
      }

      // Compress image if needed (max 1920px width)
      const compressedFile = await compressImage(file);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      // Use itemId if available, otherwise use observationId for the folder path
      const folderIdentifier = itemId || observationId;
      const filePath = `${user.id}/${reportId}/${folderIdentifier}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('inspection-photos')
        .upload(filePath, compressedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('inspection-photos')
        .getPublicUrl(filePath);

      // Create database record with fault code
      const { data: photoData, error: dbError } = await supabase
        .from('inspection_photos')
        .insert({
          report_id: reportUuid, // Use the UUID instead of the string ID
          report_type: reportType,
          item_id: folderIdentifier!, // Use folderIdentifier (itemId or observationId)
          file_path: filePath,
          thumbnail_path: filePath,
          user_id: user.id,
          fault_code: faultCode || null,
          fault_description: faultDescription || null,
          observation_id: observationId || null, // Convert empty string to null
        })
        .select()
        .single();

      if (dbError) throw dbError;

      const newPhoto: InspectionPhoto = {
        id: photoData.id,
        itemId: folderIdentifier!, // Use folderIdentifier
        url: publicUrl,
        thumbnailUrl: publicUrl,
        uploadedAt: new Date(photoData.uploaded_at),
        faultCode: photoData.fault_code as any,
        observationId: photoData.observation_id,
        faultDescription: photoData.fault_description,
      };

      setPhotos(prev => [...prev, newPhoto]);

      toast({
        title: 'Photo uploaded',
        description: faultCode ? `Photo added with ${faultCode} fault code` : 'Photo added successfully',
      });

      return newPhoto;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload photo',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const linkPhotoToObservation = async (photoId: string, observationId: string) => {
    try {
      const { error } = await supabase
        .from('inspection_photos')
        .update({ observation_id: observationId })
        .eq('id', photoId);

      if (error) throw error;

      setPhotos(prev => 
        prev.map(photo => 
          photo.id === photoId 
            ? { ...photo, observationId } 
            : photo
        )
      );

      toast({
        title: 'Photo linked',
        description: 'Photo has been linked to observation',
      });
    } catch (error) {
      console.error('Error linking photo to observation:', error);
      toast({
        title: 'Link failed',
        description: 'Failed to link photo to observation',
        variant: 'destructive',
      });
    }
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const photo = photos.find(p => p.id === photoId);
      if (!photo) return;

      // Delete from database
      const { error: dbError } = await supabase
        .from('inspection_photos')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      // Get file path from database first
      const { data: photoRecord } = await supabase
        .from('inspection_photos')
        .select('file_path')
        .eq('id', photoId)
        .single();

      // Delete from storage
      if (photoRecord?.file_path) {
        await supabase.storage
          .from('inspection-photos')
          .remove([photoRecord.file_path]);
      }

      setPhotos(prev => prev.filter(p => p.id !== photoId));

      toast({
        title: 'Photo deleted',
        description: 'Photo removed successfully',
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: 'Delete failed',
        description: 'Failed to delete photo',
        variant: 'destructive',
      });
    }
  };

  const scanPhotoWithAI = async (photoId: string) => {
    setIsScanning(photoId);
    try {
      const photo = photos.find(p => p.id === photoId);
      if (!photo) return;

      const { data, error } = await supabase.functions.invoke('scan-inspection-photo', {
        body: {
          photoUrl: photo.url,
          observationContext: observationContext ? {
            ...observationContext,
            reportType,
          } : undefined,
        },
      });

      if (error) throw error;

      // Store comprehensive AI analysis
      const aiAnalysis = {
        aiClassification: data.aiClassification,
        confidence: data.confidence,
        qualityAssurance: data.qualityAssurance,
        regulations: data.regulations || [],
        observations: data.observations,
        inspectorGuidance: data.inspectorGuidance,
        photoQuality: data.photoQuality,
      };

      const updatedPhoto: InspectionPhoto = {
        ...photo,
        aiAnalysis: aiAnalysis as any,
      };

      setPhotos(prev => prev.map(p => p.id === photoId ? updatedPhoto : p));

      // Update database with full AI analysis
      await supabase
        .from('inspection_photos')
        .update({ ai_analysis: aiAnalysis })
        .eq('id', photoId);

      // Show appropriate toast based on agreement
      const qaBadge = data.qualityAssurance.agreesWithInspector 
        ? '✓ Confirmed' 
        : data.aiClassification === 'NO_DEFECT_VISIBLE'
        ? '🔍 Query'
        : `⚠️ Suggests ${data.aiClassification}`;

      toast({
        title: 'AI Quality Assurance Complete',
        description: `${qaBadge} - ${Math.round(data.confidence)}% confidence`,
      });

      return aiAnalysis;
    } catch (error) {
      console.error('Error scanning photo:', error);
      toast({
        title: 'AI scan failed',
        description: error instanceof Error ? error.message : 'Failed to analyze photo',
        variant: 'destructive',
      });
    } finally {
      setIsScanning(null);
    }
  };

  return {
    photos,
    isUploading,
    isScanning,
    uploadPhoto,
    deletePhoto,
    scanPhotoWithAI,
    linkPhotoToObservation,
  };
};

// Helper function to detect UUID strings
function isUuid(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

// Helper function to compress images
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 1920;
        const scaleSize = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          0.8
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

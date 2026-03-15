import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const BUCKET = 'project_documents';

export interface TaskPhoto {
  id: string;
  task_id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  uploaded_at: string;
  signedUrl?: string;
}

export function useTaskPhotos(taskId: string) {
  const [photos, setPhotos] = useState<TaskPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchPhotos = useCallback(async () => {
    if (!taskId) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_documents')
        .select('*')
        .eq('task_id', taskId)
        .eq('doc_type', 'photo')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      // Generate signed URLs
      const withUrls = await Promise.all(
        (data || []).map(async (row) => {
          const { data: signed } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(row.file_path, 3600);
          return { ...row, signedUrl: signed?.signedUrl };
        })
      );

      setPhotos(withUrls as TaskPhoto[]);
    } catch (err) {
      console.error('[useTaskPhotos] fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  const uploadPhoto = useCallback(
    async (file: File) => {
      if (!taskId) return;
      if (file.size > MAX_FILE_SIZE) throw new Error('File too large (max 25 MB)');

      setIsUploading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const ext = file.name.split('.').pop() || 'jpg';
        const path = `tasks/${taskId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { upsert: false });
        if (uploadError) throw uploadError;

        const { error: dbError } = await supabase.from('project_documents').insert({
          task_id: taskId,
          user_id: user.id,
          name: file.name,
          file_path: path,
          file_type: file.type,
          file_size: file.size,
          doc_type: 'photo',
        });
        if (dbError) throw dbError;

        await fetchPhotos();
      } finally {
        setIsUploading(false);
      }
    },
    [taskId, fetchPhotos]
  );

  const deletePhoto = useCallback(
    async (photo: TaskPhoto) => {
      try {
        await supabase.storage.from(BUCKET).remove([photo.file_path]);
        await supabase.from('project_documents').delete().eq('id', photo.id);
        setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
      } catch (err) {
        console.error('[useTaskPhotos] delete error:', err);
      }
    },
    []
  );

  return { photos, isLoading, isUploading, fetchPhotos, uploadPhoto, deletePhoto };
}

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectDocument {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  doc_type: 'photo' | 'drawing';
  description: string | null;
  uploaded_at: string;
  signedUrl?: string;
}

export function useProjectDocuments(projectId: string) {
  const [photos, setPhotos] = useState<ProjectDocument[]>([]);
  const [drawings, setDrawings] = useState<ProjectDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_documents')
        .select('*')
        .eq('project_id', projectId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      // Batch sign all URLs
      const docsWithUrls = await Promise.all(
        (data || []).map(async (doc) => {
          const { data: urlData } = await supabase.storage
            .from('project-documents')
            .createSignedUrl(doc.file_path, 3600);
          return { ...doc, signedUrl: urlData?.signedUrl } as ProjectDocument;
        })
      );

      setPhotos(docsWithUrls.filter((d) => d.doc_type === 'photo'));
      setDrawings(docsWithUrls.filter((d) => d.doc_type === 'drawing'));
    } catch (err) {
      console.error('Error fetching project documents:', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const uploadDocument = useCallback(
    async (file: File, docType: 'photo' | 'drawing', description?: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      setIsUploading(true);
      try {
        const ext = file.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = `${user.id}/${projectId}/${docType}s/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('project-documents')
          .upload(filePath, file, { contentType: file.type });

        if (uploadError) throw uploadError;

        const { error: dbError } = await supabase.from('project_documents').insert({
          project_id: projectId,
          user_id: user.id,
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          doc_type: docType,
          description: description || null,
        });

        if (dbError) {
          await supabase.storage.from('project-documents').remove([filePath]);
          throw dbError;
        }

        await fetchDocuments();
      } finally {
        setIsUploading(false);
      }
    },
    [projectId, fetchDocuments]
  );

  const deleteDocument = useCallback(
    async (doc: ProjectDocument) => {
      try {
        await supabase.storage.from('project-documents').remove([doc.file_path]);
        await supabase.from('project_documents').delete().eq('id', doc.id);
        await fetchDocuments();
      } catch (err) {
        console.error('Error deleting document:', err);
      }
    },
    [fetchDocuments]
  );

  return {
    photos,
    drawings,
    isLoading,
    isUploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  };
}

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type DocType = 'photo' | 'drawing' | 'document';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const ALLOWED_EXTENSIONS = new Set([
  // Documents
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'csv',
  'txt',
  'rtf',
  // Images
  'jpg',
  'jpeg',
  'png',
  'heic',
  'heif',
  'gif',
  'webp',
  'svg',
  // CAD / technical drawings
  'dwg',
  'dxf',
  // Archives
  'zip',
]);

export interface ProjectDocument {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  doc_type: DocType;
  description: string | null;
  uploaded_at: string;
  signedUrl?: string;
}

export function useProjectDocuments(projectId: string) {
  const [photos, setPhotos] = useState<ProjectDocument[]>([]);
  const [drawings, setDrawings] = useState<ProjectDocument[]>([]);
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
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
      setDocuments(docsWithUrls.filter((d) => d.doc_type === 'document'));
    } catch (err) {
      console.error('Error fetching project documents:', err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const uploadDocument = useCallback(
    async (file: File, docType: DocType, description?: string) => {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File too large. Maximum size is 25 MB.');
      }

      // Validate file extension
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        throw new Error(
          `File type .${ext} is not allowed. Accepted: PDF, Word, Excel, images, drawings, ZIP.`
        );
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      setIsUploading(true);
      try {
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = `${user.id}/${projectId}/${docType}s/${fileName}`;

        // Upload, catching both Supabase-reported errors and browser-level
        // network failures. On Android, files picked from a cloud source
        // like Google Drive can arrive as `content://` URIs the WebView
        // can't stream — the SDK then throws a generic "Failed to fetch"
        // pointing at the Supabase host, which is useless to the user.
        // Rewrite that case into actionable guidance; pass other errors
        // through verbatim so we don't mask real problems.
        let uploadError: { message?: string } | null = null;
        try {
          const result = await supabase.storage
            .from('project-documents')
            .upload(filePath, file, { contentType: file.type });
          uploadError = result.error;
        } catch (networkErr) {
          throw new Error(
            networkErr instanceof TypeError
              ? 'Could not upload this file. If you picked it from a cloud source like Google Drive, download it to your device first, then try again.'
              : networkErr instanceof Error
                ? networkErr.message
                : 'Upload failed. Please try again.'
          );
        }
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
    documents,
    isLoading,
    isUploading,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  };
}

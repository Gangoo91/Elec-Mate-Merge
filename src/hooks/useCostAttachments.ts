import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { CostAttachment } from '@/types/cost-estimate-inputs';

const BUCKET = 'cost-engineer-attachments';
const MAX_BYTES = 50 * 1024 * 1024; // 50 MB
const MAX_FILES = 10;

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'application/pdf',
]);

const isImage = (mime: string) => mime.startsWith('image/');

const inferKind = (file: File): CostAttachment['kind'] => {
  const lower = file.name.toLowerCase();
  if (isImage(file.type)) {
    if (lower.includes('floor') || lower.includes('plan') || lower.includes('layout')) {
      return 'floor-plan';
    }
    return 'photo';
  }
  if (file.type === 'application/pdf') {
    if (lower.includes('floor') || lower.includes('plan') || lower.includes('layout')) {
      return 'floor-plan';
    }
    return 'specification';
  }
  return 'other';
};

const sanitiseName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);

interface UploadingItem {
  fileName: string;
  progress: number;
}

export const useCostAttachments = () => {
  const { user } = useAuth();
  const [attachments, setAttachments] = useState<CostAttachment[]>([]);
  const [uploading, setUploading] = useState<UploadingItem[]>([]);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!user) return 'Sign in to upload attachments.';
      if (file.size > MAX_BYTES) {
        return `${file.name} is over the 50 MB limit.`;
      }
      if (!ALLOWED_MIME.has(file.type)) {
        return `${file.name}: only JPEG, PNG, WebP, HEIC and PDF are supported.`;
      }
      return null;
    },
    [user]
  );

  const uploadOne = useCallback(
    async (file: File): Promise<CostAttachment | null> => {
      if (!user) return null;
      const err = validateFile(file);
      if (err) {
        toast({ title: 'Upload rejected', description: err, variant: 'destructive' });
        return null;
      }

      const cleanName = sanitiseName(file.name);
      const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${cleanName}`;

      setUploading((prev) => [...prev, { fileName: file.name, progress: 0 }]);

      try {
        const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });
        if (error) throw error;

        const attachment: CostAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          storagePath: path,
          kind: inferKind(file),
          uploadedAt: new Date().toISOString(),
        };
        setAttachments((prev) => [...prev, attachment]);
        return attachment;
      } catch (error: any) {
        console.error('Cost attachment upload failed:', error);
        toast({
          title: 'Upload failed',
          description: error?.message ?? 'Could not upload file. Try again.',
          variant: 'destructive',
        });
        return null;
      } finally {
        setUploading((prev) => prev.filter((u) => u.fileName !== file.name));
      }
    },
    [user, validateFile]
  );

  const uploadMany = useCallback(
    async (files: File[]) => {
      if (attachments.length + files.length > MAX_FILES) {
        toast({
          title: 'Too many files',
          description: `Up to ${MAX_FILES} attachments per estimate.`,
          variant: 'destructive',
        });
        return;
      }
      // Sequential uploads keep the progress UI sane and avoid hammering Storage.
      for (const file of files) {
        await uploadOne(file);
      }
    },
    [attachments.length, uploadOne]
  );

  const remove = useCallback(async (attachment: CostAttachment) => {
    setAttachments((prev) => prev.filter((a) => a.id !== attachment.id));
    // Best-effort delete from storage. RLS will scope to the user.
    const { error } = await supabase.storage.from(BUCKET).remove([attachment.storagePath]);
    if (error) {
      console.warn('Failed to delete attachment from storage:', error.message);
    }
  }, []);

  const reset = useCallback(() => {
    setAttachments([]);
    setUploading([]);
  }, []);

  const getSignedUrl = useCallback(
    async (attachment: CostAttachment, expiresInSec = 600): Promise<string | null> => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(attachment.storagePath, expiresInSec);
      if (error) {
        console.error('Failed to create signed URL:', error);
        return null;
      }
      return data?.signedUrl ?? null;
    },
    []
  );

  return {
    attachments,
    setAttachments,
    uploading,
    uploadMany,
    remove,
    reset,
    getSignedUrl,
  };
};

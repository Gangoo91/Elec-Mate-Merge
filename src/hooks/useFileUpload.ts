import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  uploadFile,
  uploadFiles,
  deleteFile,
  saveAttachment,
  getMessageAttachments,
  validateFile,
  FileUploadResult,
  MessageAttachment,
} from '@/services/fileUploadService';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for uploading files with progress tracking
 */
export const useFileUpload = (conversationId: string) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const uploadSingleFile = useCallback(async (file: File): Promise<FileUploadResult | null> => {
    const validation = validateFile(file);
    if (!validation.valid) {
      toast({
        title: 'Upload Failed',
        description: validation.error,
        variant: 'destructive',
      });
      return null;
    }

    try {
      setUploading(true);
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

      // Simulate progress (actual progress would need XHR or fetch with ReadableStream)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: Math.min((prev[file.name] || 0) + 10, 90),
        }));
      }, 100);

      const result = await uploadFile(file, conversationId);

      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));

      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress(prev => {
          const { [file.name]: _, ...rest } = prev;
          return rest;
        });
      }, 1000);

      return result;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  }, [conversationId]);

  const uploadMultipleFiles = useCallback(async (files: File[]): Promise<FileUploadResult[]> => {
    const results: FileUploadResult[] = [];

    for (const file of files) {
      const result = await uploadSingleFile(file);
      if (result) {
        results.push(result);
      }
    }

    return results;
  }, [uploadSingleFile]);

  return {
    uploadFile: uploadSingleFile,
    uploadFiles: uploadMultipleFiles,
    uploadProgress,
    uploading,
  };
};

/**
 * Hook for saving attachment records after upload
 */
export const useSaveAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, upload }: { messageId: string; upload: FileUploadResult }) =>
      saveAttachment(messageId, upload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['attachments', variables.messageId] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to save attachment record.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook for fetching message attachments
 */
export const useMessageAttachments = (messageId: string | undefined) => {
  return useQuery({
    queryKey: ['attachments', messageId],
    queryFn: () => getMessageAttachments(messageId!),
    enabled: !!messageId,
    staleTime: 60000, // Cache for 1 minute
  });
};

/**
 * Hook for deleting files
 */
export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      toast({
        title: 'File Deleted',
        description: 'The file has been removed.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete file.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Drag and drop hook for file uploads
 */
export const useFileDrop = (onDrop: (files: File[]) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onDrop(files);
    }
  }, [onDrop]);

  return {
    isDragging,
    dragHandlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
};

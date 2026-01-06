import { supabase } from '@/integrations/supabase/client';

export interface FileUploadResult {
  path: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  thumbnailPath?: string;
  thumbnailUrl?: string;
}

export interface MessageAttachment {
  id: string;
  message_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  thumbnail_path: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

const BUCKET_NAME = 'message-attachments';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
];
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

/**
 * Validate file before upload
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'File type not supported' };
  }

  return { valid: true };
};

/**
 * Generate a unique file path for storage
 */
const generateFilePath = (conversationId: string, fileName: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${conversationId}/${timestamp}-${randomStr}-${sanitizedFileName}`;
};

/**
 * Upload a file to Supabase Storage
 */
export const uploadFile = async (
  file: File,
  conversationId: string
): Promise<FileUploadResult> => {
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const filePath = generateFilePath(conversationId, file.name);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    path: data.path,
    url: urlData.publicUrl,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
};

/**
 * Upload multiple files
 */
export const uploadFiles = async (
  files: File[],
  conversationId: string
): Promise<FileUploadResult[]> => {
  const results = await Promise.all(
    files.map(file => uploadFile(file, conversationId))
  );
  return results;
};

/**
 * Delete a file from storage
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Save attachment record to database
 */
export const saveAttachment = async (
  messageId: string,
  upload: FileUploadResult
): Promise<MessageAttachment> => {
  const { data, error } = await supabase
    .from('employer_message_attachments')
    .insert({
      message_id: messageId,
      file_name: upload.fileName,
      file_type: upload.fileType,
      file_size: upload.fileSize,
      storage_path: upload.path,
      thumbnail_path: upload.thumbnailPath || null,
      metadata: { url: upload.url, thumbnailUrl: upload.thumbnailUrl },
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving attachment:', error);
    throw error;
  }

  return data;
};

/**
 * Get attachments for a message
 */
export const getMessageAttachments = async (messageId: string): Promise<MessageAttachment[]> => {
  const { data, error } = await supabase
    .from('employer_message_attachments')
    .select('*')
    .eq('message_id', messageId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching attachments:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get signed URL for private files (if needed)
 */
export const getSignedUrl = async (filePath: string, expiresIn = 3600): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }

  return data.signedUrl;
};

/**
 * Check if file is an image
 */
export const isImageFile = (fileType: string): boolean => {
  return ALLOWED_IMAGE_TYPES.includes(fileType);
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file icon based on type
 */
export const getFileIcon = (fileType: string): string => {
  if (isImageFile(fileType)) return 'image';
  if (fileType === 'application/pdf') return 'file-text';
  if (fileType.includes('word')) return 'file-text';
  if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'table';
  if (fileType.includes('text')) return 'file-text';
  return 'file';
};

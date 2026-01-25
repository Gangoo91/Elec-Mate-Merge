import { supabase } from '@/integrations/supabase/client';

const BUCKET_NAME = 'expense-receipts';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const TARGET_SIZE = 1024 * 1024; // 1MB after compression
const MAX_DIMENSION = 1920; // Max width/height

export interface UploadResult {
  url: string | null;
  error: string | null;
}

/**
 * Compress an image file to reduce size
 */
export async function compressImage(file: File, maxSizeKB: number = 1024): Promise<File> {
  // If file is not an image or already small enough, return as is
  if (!file.type.startsWith('image/') || file.size <= maxSizeKB * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down if larger than max dimension
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
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

        // Start with high quality and reduce if needed
        let quality = 0.8;
        const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

        const tryCompress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // If still too large and quality can be reduced, try again
              if (blob.size > maxSizeKB * 1024 && quality > 0.3) {
                quality -= 0.1;
                tryCompress();
                return;
              }

              const compressedFile = new File([blob], file.name, {
                type: mimeType,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            mimeType,
            quality
          );
        };

        tryCompress();
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => reject(reader.error);
  });
}

/**
 * Upload an expense receipt to Supabase storage
 */
export async function uploadReceipt(
  file: File,
  expenseId: string
): Promise<UploadResult> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return {
        url: null,
        error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
      };
    }

    // Validate file type - include HEIC/HEIF for iOS devices
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'];
    // Also check file extension for HEIC as some browsers report empty type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const isHeic = fileExt === 'heic' || fileExt === 'heif';

    if (!allowedTypes.includes(file.type) && !isHeic) {
      return {
        url: null,
        error: 'Invalid file type. Supported: JPG, PNG, WebP, HEIC, PDF',
      };
    }

    // Compress image files
    let fileToUpload = file;
    if (file.type.startsWith('image/')) {
      fileToUpload = await compressImage(file, TARGET_SIZE / 1024);
    }

    // Generate unique filename (reuse fileExt from validation)
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const fileName = `${expenseId}-${timestamp}-${randomId}.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, fileToUpload, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading receipt:', uploadError);
      return {
        url: null,
        error: uploadError.message || 'Failed to upload receipt',
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Error in uploadReceipt:', error);
    return {
      url: null,
      error: 'An unexpected error occurred while uploading',
    };
  }
}

/**
 * Delete a receipt from storage
 */
export async function deleteReceipt(receiptUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const url = new URL(receiptUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];

    if (!fileName) {
      console.error('Could not extract filename from URL');
      return false;
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting receipt:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteReceipt:', error);
    return false;
  }
}

/**
 * Get a signed URL for temporary access (useful for private buckets)
 */
export async function getSignedReceiptUrl(
  receiptUrl: string,
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    const url = new URL(receiptUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, expiresIn);

    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error in getSignedReceiptUrl:', error);
    return null;
  }
}

/**
 * Convert a File object to base64 for preview
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Check if URL is a valid receipt URL
 */
export function isValidReceiptUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

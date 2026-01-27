/**
 * Image Upload Utilities
 *
 * Provides compression and HEIC support for large image uploads.
 * Compresses images to a target size suitable for AI processing.
 */

const MAX_ORIGINAL_SIZE = 50 * 1024 * 1024; // 50MB - allow large originals
const TARGET_SIZE_KB = 2048; // Compress to ~2MB for upload
const MAX_DIMENSION = 2048; // Max width/height

export interface CompressResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  wasCompressed: boolean;
}

/**
 * Check if a file is an image (including HEIC)
 */
export function isImageFile(file: File): boolean {
  if (file.type.startsWith('image/')) return true;

  const ext = file.name.toLowerCase().split('.').pop();
  return ext === 'heic' || ext === 'heif';
}

/**
 * Validate image file size
 */
export function validateImageSize(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_ORIGINAL_SIZE) {
    return {
      valid: false,
      error: `Image must be under ${MAX_ORIGINAL_SIZE / 1024 / 1024}MB`
    };
  }
  return { valid: true };
}

/**
 * Compress an image file for upload
 * - Handles HEIC by converting to JPEG via canvas
 * - Resizes large images to max dimension
 * - Compresses to target size iteratively
 */
export async function compressImageForUpload(
  file: File,
  targetSizeKB: number = TARGET_SIZE_KB
): Promise<File> {
  // If already small enough, return as-is (unless HEIC which needs conversion)
  const isHeic = file.name.toLowerCase().endsWith('.heic') ||
                 file.name.toLowerCase().endsWith('.heif');

  if (file.size <= targetSizeKB * 1024 && !isHeic) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        try {
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

          // Start with good quality and reduce if needed
          let quality = 0.85;
          const mimeType = 'image/jpeg'; // Always output JPEG for consistency

          const tryCompress = () => {
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file);
                  return;
                }

                // If still too large and quality can be reduced, try again
                if (blob.size > targetSizeKB * 1024 && quality > 0.3) {
                  quality -= 0.1;
                  tryCompress();
                  return;
                }

                // If still too large, reduce dimensions
                if (blob.size > targetSizeKB * 1024 && width > 1024) {
                  width = Math.round(width * 0.8);
                  height = Math.round(height * 0.8);
                  canvas.width = width;
                  canvas.height = height;
                  ctx.drawImage(img, 0, 0, width, height);
                  quality = 0.8;
                  tryCompress();
                  return;
                }

                // Create new filename (convert HEIC to .jpg)
                const baseName = file.name.replace(/\.(heic|heif)$/i, '');
                const newName = baseName.endsWith('.jpg') || baseName.endsWith('.jpeg')
                  ? baseName
                  : `${baseName}.jpg`;

                const compressedFile = new File([blob], newName, {
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
        } catch (error) {
          console.error('Compression error:', error);
          resolve(file);
        }
      };

      img.onerror = () => {
        console.error('Failed to load image for compression');
        reject(new Error('Failed to load image'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Compress image and return detailed result
 */
export async function compressImageWithStats(
  file: File,
  targetSizeKB: number = TARGET_SIZE_KB
): Promise<CompressResult> {
  const originalSize = file.size;
  const compressed = await compressImageForUpload(file, targetSizeKB);

  return {
    file: compressed,
    originalSize,
    compressedSize: compressed.size,
    wasCompressed: compressed !== file
  };
}

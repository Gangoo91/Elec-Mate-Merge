/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm Photo Upload — matches EICR InspectionPhotoUpload pattern
 * Two inputs: camera (capture="environment") + file picker
 * Compression, HEIC support, validation
 */

import { useRef, useState } from 'react';
import { Camera, Upload, Loader2, X, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface FireAlarmPhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  title?: string;
  maxPhotos?: number;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

async function compressToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      // Fallback: read raw if compression hangs
      const fallbackReader = new FileReader();
      fallbackReader.onload = () => resolve(fallbackReader.result as string);
      fallbackReader.onerror = () => reject(new Error('Failed to read file'));
      fallbackReader.readAsDataURL(file);
    }, 10000);

    const reader = new FileReader();
    reader.onerror = () => {
      clearTimeout(timeout);
      reject(new Error('Failed to read file'));
    };
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => {
        // Can't decode (e.g. HEIC on some browsers) — use raw
        clearTimeout(timeout);
        resolve(e.target?.result as string);
      };
      img.onload = () => {
        try {
          const maxWidth = 1920;
          const needsDownscale = img.width > maxWidth;
          const canvas = document.createElement('canvas');
          canvas.width = needsDownscale ? maxWidth : img.width;
          canvas.height = needsDownscale ? img.height * (maxWidth / img.width) : img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          clearTimeout(timeout);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } catch {
          clearTimeout(timeout);
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function FireAlarmPhotoUpload({
  photos,
  onPhotosChange,
  title = 'Photos',
  maxPhotos = 20,
}: FireAlarmPhotoUploadProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 20MB.`);
      return false;
    }
    const name = file.name.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext));
    const hasValidType = ALLOWED_TYPES.includes(file.type) || file.type === '';
    if (!hasValidType && !hasValidExt) {
      toast.error('Unsupported format. Use JPEG, PNG, WebP or HEIC.');
      return false;
    }
    if (photos.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`);
      return false;
    }
    return true;
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    e.target.value = '';

    setIsProcessing(true);
    try {
      const newPhotos: string[] = [];
      for (const file of Array.from(files)) {
        if (!validateFile(file)) continue;
        if (photos.length + newPhotos.length >= maxPhotos) break;
        const compressed = await compressToBase64(file);
        newPhotos.push(compressed);
      }
      if (newPhotos.length > 0) {
        onPhotosChange([...photos, ...newPhotos]);
        toast.success(`${newPhotos.length} photo${newPhotos.length > 1 ? 's' : ''} added`);
      }
    } catch {
      toast.error('Failed to process photo');
    } finally {
      setIsProcessing(false);
    }
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Upload buttons — matches EICR InspectionPhotoUpload */}
      <div className="flex gap-2">
        {/* Camera — capture="environment" triggers native camera on iOS/Android */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          disabled={isProcessing}
          className="flex-1 h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center gap-2 text-sm font-medium text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
          Take Photo
        </button>

        {/* File picker — for gallery/files */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
          multiple
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="flex-1 h-12 rounded-xl border border-white/[0.08] bg-white/[0.04] flex items-center justify-center gap-2 text-sm font-medium text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Upload
        </button>
      </div>

      {/* Photo grid */}
      {photos.length > 0 ? (
        <div className="space-y-2">
          <p className="text-xs text-white">
            {photos.length} photo{photos.length !== 1 ? 's' : ''} attached
          </p>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo: string, i: number) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
                <img
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center touch-manipulation active:scale-90"
                >
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-1.5">
                  <span className="text-[10px] text-white font-medium">{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-white/[0.02] border border-dashed border-white/[0.08] p-6 text-center">
          <ImageIcon className="h-8 w-8 text-white/20 mx-auto mb-2" />
          <p className="text-xs text-white">No photos yet</p>
          <p className="text-[10px] text-white/30 mt-0.5">
            Take a photo or upload from gallery
          </p>
        </div>
      )}
    </div>
  );
}

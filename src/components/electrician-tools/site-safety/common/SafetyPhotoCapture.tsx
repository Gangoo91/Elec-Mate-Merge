import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Loader2, ImagePlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface SafetyPhotoCaptureProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  label?: string;
}

function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Compression failed'));
          resolve(
            new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            })
          );
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export function SafetyPhotoCapture({
  photos,
  onPhotosChange,
  maxPhotos = 5,
  label = 'Evidence Photos',
}: SafetyPhotoCaptureProps) {
  const { session } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      const remaining = maxPhotos - photos.length;
      if (remaining <= 0) {
        toast({ title: `Maximum ${maxPhotos} photos`, variant: 'destructive' });
        return;
      }

      const validFiles = files
        .filter((f) => f.type.startsWith('image/') && f.size <= 15 * 1024 * 1024)
        .slice(0, remaining);

      if (validFiles.length === 0) {
        toast({ title: 'No valid images selected', variant: 'destructive' });
        return;
      }

      if (!session?.user?.id) {
        toast({ title: 'Please sign in to upload photos', variant: 'destructive' });
        return;
      }

      setUploading(true);
      const newUrls: string[] = [];

      try {
        for (const file of validFiles) {
          const compressed = await compressImage(file);
          const ext = 'jpg';
          const filePath = `${session.user.id}/${uuidv4()}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from('safety-photos')
            .upload(filePath, compressed, { cacheControl: '3600', upsert: false });

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage.from('safety-photos').getPublicUrl(filePath);

          if (urlData?.publicUrl) {
            newUrls.push(urlData.publicUrl);
          }
        }

        onPhotosChange([...photos, ...newUrls]);
        toast({ title: `${newUrls.length} photo${newUrls.length > 1 ? 's' : ''} uploaded` });
      } catch (err) {
        console.error('Photo upload error:', err);
        toast({ title: 'Upload failed', description: 'Please try again', variant: 'destructive' });
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    },
    [photos, maxPhotos, session, onPhotosChange, toast]
  );

  const removePhoto = useCallback(
    (index: number) => {
      onPhotosChange(photos.filter((_, i) => i !== index));
    },
    [photos, onPhotosChange]
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">{label}</label>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((url, i) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10"
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setPreviewUrl(url)}
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1.5 right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 transition-colors touch-manipulation"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Photo Button */}
      {photos.length < maxPhotos && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-14 rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center gap-3 text-white text-sm font-medium touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Camera className="h-5 w-5" />
              Add Photo ({photos.length}/{maxPhotos})
            </>
          )}
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <button
              className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 touch-manipulation"
              onClick={() => setPreviewUrl(null)}
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <img
              src={previewUrl}
              alt=""
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SafetyPhotoCapture;

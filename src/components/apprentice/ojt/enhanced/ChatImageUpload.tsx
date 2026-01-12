/**
 * ChatImageUpload
 *
 * Image capture/upload component for AI chat.
 * Camera-first design with gallery fallback.
 */

import { useState, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Camera,
  Image as ImageIcon,
  X,
  Loader2,
  Check,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatImageUploadProps {
  onImageReady: (imageUrl: string) => void;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatImageUpload({
  onImageReady,
  onCancel,
  open,
  onOpenChange,
}: ChatImageUploadProps) {
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Reset state
  const reset = () => {
    setPreviewUrl('');
    setIsUploading(false);
    setUploadProgress(0);
  };

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be under 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    await uploadImage(file);

    // Reset input
    e.target.value = '';
  };

  // Upload to Supabase Storage
  const uploadImage = async (file: File) => {
    if (!user?.id) {
      toast.error('Please sign in to upload images');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `chat-images/${user.id}/${Date.now()}.${fileExt}`;

      setUploadProgress(50);

      const { data, error } = await supabase.storage
        .from('portfolio-evidence')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
        // Fall back to base64 data URL if storage fails
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setUploadProgress(100);
          onImageReady(dataUrl);
          onOpenChange(false);
          reset();
        };
        reader.readAsDataURL(file);
        return;
      }

      setUploadProgress(80);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-evidence')
        .getPublicUrl(data.path);

      setUploadProgress(100);

      // Send URL to parent
      onImageReady(urlData.publicUrl);
      onOpenChange(false);
      reset();
      toast.success('Image ready to send');

    } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Failed to upload image');
      setIsUploading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset();
    onCancel();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[60vh] rounded-t-2xl p-0">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <SheetHeader className="px-4 pb-3">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Camera className="h-5 w-5 text-elec-yellow" />
            Add Photo
          </SheetTitle>
        </SheetHeader>

        <div className="px-4 pb-6 space-y-4">
          {/* Preview Area */}
          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative aspect-video rounded-xl overflow-hidden bg-muted"
              >
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                {/* Upload Progress Overlay */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                    <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mb-2" />
                    <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-elec-yellow rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-white/70 mt-2">Uploading...</p>
                  </div>
                )}

                {/* Remove Button */}
                {!isUploading && (
                  <button
                    onClick={handleCancel}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-3"
              >
                {/* Camera Button */}
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 p-6 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 hover:bg-elec-yellow/20 transition-colors touch-manipulation"
                >
                  <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <span className="text-sm font-medium">Take Photo</span>
                  <span className="text-xs text-muted-foreground">Use camera</span>
                </button>

                {/* Gallery Button */}
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-manipulation"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-foreground/70" />
                  </div>
                  <span className="text-sm font-medium">Choose Photo</span>
                  <span className="text-xs text-muted-foreground">From gallery</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <AlertCircle className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-300">
              Take a clear photo of wiring, boards, or components. Dave can identify issues and give specific advice.
            </p>
          </div>

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * ImagePreviewBadge
 *
 * Shows attached image preview above input
 */
export function ImagePreviewBadge({
  imageUrl,
  onRemove,
}: {
  imageUrl: string;
  onRemove: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="relative inline-flex items-center gap-2 px-2 py-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30"
    >
      <div className="w-8 h-8 rounded overflow-hidden">
        <img src={imageUrl} alt="Attached" className="w-full h-full object-cover" />
      </div>
      <span className="text-xs text-foreground/70">Photo attached</span>
      <button
        onClick={onRemove}
        className="p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-3.5 w-3.5 text-foreground/50" />
      </button>
    </motion.div>
  );
}

export default ChatImageUpload;

import { useState, useRef } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PhotoUploadButtonProps {
  onPhotoUploaded?: (photoUrl: string) => void;
  onPhotosUploaded?: (photoUrls: string[]) => void;
  maxPhotos?: number;
  disabled?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const PhotoUploadButton = ({ 
  onPhotoUploaded, 
  onPhotosUploaded, 
  maxPhotos = 1, 
  disabled, 
  className, 
  layout = 'vertical' 
}: PhotoUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (photos.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('visual-uploads')
        .getPublicUrl(data.path);

      const newPhotos = [...photos, publicUrl];
      setPhotos(newPhotos);
      
      toast.success(`Photo ${newPhotos.length}/${maxPhotos} uploaded`);
      
      // Call legacy single photo callback for backwards compatibility
      if (onPhotoUploaded) onPhotoUploaded(publicUrl);
      
      // Call multi-photo callback
      if (onPhotosUploaded) onPhotosUploaded(newPhotos);
      
      setTimeout(() => setPreview(null), 2000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    if (onPhotosUploaded) onPhotosUploaded(newPhotos);
    toast.success('Photo removed');
  };

  return (
    <div className={cn("space-y-3", className)}>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} className="hidden" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} className="hidden" />

      <div className={cn("flex gap-2", layout === 'horizontal' ? 'flex-row' : 'flex-col')}>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          disabled={disabled || isUploading || photos.length >= maxPhotos}
          onClick={() => cameraInputRef.current?.click()} 
          className={cn("shrink-0", layout === 'horizontal' ? 'h-9 w-9' : 'h-10 w-10')} 
          aria-label="Take photo"
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          disabled={disabled || isUploading || photos.length >= maxPhotos}
          onClick={() => fileInputRef.current?.click()} 
          className={cn("shrink-0", layout === 'horizontal' ? 'h-9 w-9' : 'h-10 w-10')} 
          aria-label="Upload photo"
        >
          <Upload className="h-4 w-4" />
        </Button>
        {maxPhotos > 1 && (
          <span className="text-xs text-white/70 flex items-center">
            {photos.length}/{maxPhotos} photos
          </span>
        )}
      </div>

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photoUrl, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border/50 bg-card">
              <img src={photoUrl} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemovePhoto(index)}
                className="absolute top-1 right-1 p-1 bg-red-500/90 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove photo"
              >
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-1 left-1 bg-black/60 px-2 py-0.5 rounded text-xs text-white">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {preview && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border/50 bg-card">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
            <div className="flex gap-1">
              {[0, 100, 200].map((delay, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-elec-yellow animate-pulse" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

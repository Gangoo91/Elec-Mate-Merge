import { useState, useRef } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PhotoUploadButtonProps {
  onPhotoUploaded: (photoUrl: string) => void;
  disabled?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const PhotoUploadButton = ({ onPhotoUploaded, disabled, className, layout = 'vertical' }: PhotoUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
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

      toast.success('Photo uploaded');
      onPhotoUploaded(publicUrl);
      setTimeout(() => setPreview(null), 2000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} className="hidden" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])} className="hidden" />

      <div className={cn("flex gap-1", layout === 'horizontal' ? 'flex-row' : 'flex-col')}>
        <Button type="button" variant="ghost" size="icon" disabled={disabled || isUploading}
          onClick={() => cameraInputRef.current?.click()} 
          className={cn("shrink-0", layout === 'horizontal' ? 'h-7 w-7' : 'h-9 w-9')} 
          aria-label="Take photo">
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
        </Button>
        <Button type="button" variant="ghost" size="icon" disabled={disabled || isUploading}
          onClick={() => fileInputRef.current?.click()} 
          className={cn("shrink-0", layout === 'horizontal' ? 'h-7 w-7' : 'h-9 w-9')} 
          aria-label="Upload photo">
          <Upload className="h-4 w-4" />
        </Button>
      </div>

      {preview && (
        <div className="absolute bottom-full mb-2 right-0 w-32 h-32 rounded-lg overflow-hidden border border-border/50 bg-card">
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

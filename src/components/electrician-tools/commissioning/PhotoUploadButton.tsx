import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PhotoUploadButtonProps {
  onPhotoUploaded: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

const PhotoUploadButton = ({ onPhotoUploaded, disabled, className }: PhotoUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error('Image must be less than 20MB');
      return;
    }

    setIsUploading(true);

    try {
      // Generate preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Check authentication
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be logged in to upload images');
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('visual-uploads')
        .getPublicUrl(data.path);

      onPhotoUploaded(publicUrl);
      toast.success('Photo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload photo');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-purple-500/20 bg-elec-dark">
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview(null);
              if (cameraInputRef.current) cameraInputRef.current.value = '';
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
          
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 text-purple-400 border-purple-400/40 hover:bg-purple-400/10 touch-manipulation"
            onClick={() => cameraInputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            <Camera className="h-5 w-5 mr-2" />
            {isUploading ? 'Uploading...' : 'Take Photo'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 text-purple-400 border-purple-400/40 hover:bg-purple-400/10 touch-manipulation"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            <Upload className="h-5 w-5 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Photo'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadButton;

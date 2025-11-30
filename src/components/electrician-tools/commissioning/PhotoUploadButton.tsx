import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PhotoUploadButtonProps {
  onPhotoUploaded?: (url: string) => void;
  onPhotosUploaded?: (urls: string[]) => void;
  maxPhotos?: number;
  disabled?: boolean;
  className?: string;
}

const PhotoUploadButton = ({ 
  onPhotoUploaded, 
  onPhotosUploaded, 
  maxPhotos = 1, 
  disabled, 
  className 
}: PhotoUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (photos.length >= maxPhotos) {
      toast.error(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

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

      const newPhotos = [...photos, publicUrl];
      setPhotos(newPhotos);

      // Call legacy single photo callback for backwards compatibility
      if (onPhotoUploaded) onPhotoUploaded(publicUrl);
      
      // Call multi-photo callback
      if (onPhotosUploaded) onPhotosUploaded(newPhotos);

      toast.success(`Photo ${newPhotos.length}/${maxPhotos} uploaded`);
      setTimeout(() => setPreview(null), 2000);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload photo');
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
    <div className={className}>
      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="mb-4 space-y-2">
          <div className="text-xs text-white/70 font-medium">
            Uploaded Photos ({photos.length}/{maxPhotos})
          </div>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photoUrl, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-elec-yellow/20 bg-elec-dark">
                <img src={photoUrl} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500/90 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
                <div className="absolute bottom-1 left-1 bg-black/60 px-2 py-0.5 rounded text-xs text-white">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mb-4 relative w-full aspect-video rounded-lg overflow-hidden border border-elec-yellow/20 bg-elec-dark">
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-3">
            <div className="flex gap-1">
              {[0, 100, 200].map((delay, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-elec-yellow animate-pulse" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Buttons */}
      {photos.length < maxPhotos && (
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
            className="flex-1 h-12 text-elec-yellow border-elec-yellow/40 hover:bg-elec-yellow/10 touch-manipulation"
            onClick={() => cameraInputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            <Camera className="h-5 w-5 mr-2" />
            {isUploading ? 'Uploading...' : photos.length > 0 ? 'Add Photo' : 'Take Photo'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 text-elec-yellow border-elec-yellow/40 hover:bg-elec-yellow/10 touch-manipulation"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || isUploading}
          >
            <Upload className="h-5 w-5 mr-2" />
            {isUploading ? 'Uploading...' : photos.length > 0 ? 'Add Photo' : 'Upload Photo'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadButton;

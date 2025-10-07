import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { cn } from "@/lib/utils";

interface PhotoUploadButtonProps {
  onPhotoUploaded: (photoUrl: string) => void;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export const PhotoUploadButton = ({
  onPhotoUploaded,
  className,
  size = "default",
}: PhotoUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, uploadPhoto } = usePhotoUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return;
    }

    const uploadedPhoto = await uploadPhoto(file);
    if (uploadedPhoto) {
      onPhotoUploaded(uploadedPhoto.publicUrl);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button
        type="button"
        variant="outline"
        size={size}
        onClick={handleClick}
        disabled={isUploading}
        className={cn(
          "border-elec-yellow/30 hover:bg-elec-yellow/10",
          className
        )}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </Button>
    </>
  );
};

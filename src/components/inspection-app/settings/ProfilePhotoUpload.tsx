import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, User } from "lucide-react";
import { toast } from "sonner";

interface ProfilePhotoUploadProps {
  photoUrl?: string;
  onPhotoChange: (dataUrl: string | undefined) => void;
  label?: string;
  isLogo?: boolean;
}

export function ProfilePhotoUpload({ 
  photoUrl, 
  onPhotoChange, 
  label = "Profile Photo",
  isLogo = false 
}: ProfilePhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(photoUrl);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreview(dataUrl);
      onPhotoChange(dataUrl);
      toast.success(`${label} uploaded successfully`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onPhotoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success(`${label} removed`);
  };

  return (
    <div className="space-y-3">
      <Label className="text-foreground font-semibold">{label}</Label>
      
      <div className="flex items-center gap-4">
        {/* Preview */}
        <div className={`relative ${isLogo ? 'w-24 h-24' : 'w-20 h-20'} bg-elec-gray-dark border-2 border-elec-gray-light rounded-lg overflow-hidden flex items-center justify-center`}>
          {preview ? (
            <img 
              src={preview} 
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-white/60" />
          )}
        </div>

        {/* Upload/Remove Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="border-elec-yellow/50 text-foreground hover:bg-elec-yellow/10 min-h-[44px]"
          >
            <Upload className="w-4 h-4 mr-2" />
            {preview ? 'Change' : 'Upload'}
          </Button>
          
          {preview && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 min-h-[44px]"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <p className="text-xs text-white/80">
        Recommended: Square image, max 5MB (JPG, PNG, WEBP)
      </p>
    </div>
  );
}

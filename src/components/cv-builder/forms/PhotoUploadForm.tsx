
import React, { useState, useCallback, useRef } from "react";
import { Camera, Upload, X, User } from "lucide-react";
import { CVData } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PhotoUploadFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({ cvData, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to upload a photo');
        return;
      }

      const fileName = `${user.id}/cv-photo/${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('visual-uploads')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('visual-uploads')
        .getPublicUrl(fileName);

      onChange({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          photoUrl: publicUrl
        }
      });

      toast.success('Photo uploaded');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  }, [cvData, onChange]);

  const handleRemovePhoto = useCallback(() => {
    onChange({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        photoUrl: ''
      }
    });
    toast.success('Photo removed');
  }, [cvData, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-4 flex items-center gap-2">
          <Camera className="h-5 w-5 text-elec-yellow" />
          Profile Photo
        </h3>
        <p className="text-sm text-elec-light/60 mb-6">
          Add a professional photo to make your CV stand out. Photos help employers put a face to your application.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Photo Preview */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-elec-gray overflow-hidden bg-elec-gray/50 flex items-center justify-center">
              {cvData.personalInfo.photoUrl ? (
                <img
                  src={cvData.personalInfo.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-elec-light/30" />
              )}
            </div>
            {cvData.personalInfo.photoUrl && (
              <button
                onClick={handleRemovePhoto}
                className="absolute -top-1 -right-1 p-1.5 bg-red-500 rounded-full shadow-lg touch-manipulation active:scale-95"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            )}
          </div>

          {/* Upload Buttons */}
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-lg bg-elec-yellow text-black font-medium touch-manipulation active:scale-95 disabled:opacity-50"
            >
              <Camera className="h-5 w-5" />
              {isUploading ? 'Uploading...' : 'Take Photo'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] rounded-lg bg-elec-gray border border-elec-light/20 text-elec-light font-medium touch-manipulation active:scale-95 disabled:opacity-50"
            >
              <Upload className="h-5 w-5" />
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </button>
          </div>
        </div>

        {/* Hidden inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleInputChange}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {/* Tips */}
        <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-light/10">
          <h4 className="text-sm font-semibold text-elec-light mb-2">Photo Tips</h4>
          <ul className="text-xs text-elec-light/60 space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
              Use a clear, front-facing headshot
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
              Dress professionally (smart casual works well)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
              Plain or neutral background is best
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
              Good lighting - natural light is ideal
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

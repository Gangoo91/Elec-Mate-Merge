import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2 } from 'lucide-react';

interface InspectionPhotoUploadProps {
  onPhotoCapture: (file: File) => Promise<void>;
  isUploading: boolean;
}

const InspectionPhotoUpload: React.FC<InspectionPhotoUploadProps> = ({
  onPhotoCapture,
  isUploading,
}) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Pre-upload validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    // Validate file size
    if (file.size > maxSize) {
      alert(`File size too large. Maximum allowed size is 10MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`);
      e.target.value = ''; // Reset input
      return;
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      alert(`Invalid file type. Only JPEG, JPG, PNG, and WEBP images are allowed.`);
      e.target.value = ''; // Reset input
      return;
    }

    // Validate file extension (double check)
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      alert('Invalid file extension. Only .jpg, .jpeg, .png, and .webp files are allowed.');
      e.target.value = ''; // Reset input
      return;
    }

    // All validation passed, proceed with upload
    await onPhotoCapture(file);
    
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {/* Camera Capture (Mobile) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => cameraInputRef.current?.click()}
        disabled={isUploading}
        className="flex-1 sm:flex-none"
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Camera className="h-4 w-4 mr-2" />
        )}
        Take Photo
      </Button>

      {/* File Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex-1 sm:flex-none"
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Upload className="h-4 w-4 mr-2" />
        )}
        Upload Photo
      </Button>
    </div>
  );
};

export default InspectionPhotoUpload;

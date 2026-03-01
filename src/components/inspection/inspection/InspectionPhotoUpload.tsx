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
    const maxSize = 20 * 1024 * 1024; // 20MB (desktop photos can be larger)
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'image/heic', 'image/heif', // iPhone/desktop photos
    ];

    // Validate file size
    if (file.size > maxSize) {
      alert(
        `File size too large. Maximum allowed size is 20MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`
      );
      e.target.value = ''; // Reset input
      return;
    }

    // Validate file type — some browsers report HEIC with empty type, fall back to extension check
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    const hasValidType = allowedTypes.includes(file.type) || file.type === '';

    if (!hasValidType && !hasValidExtension) {
      alert(`Invalid file type. Supported formats: JPEG, PNG, WEBP, HEIC.`);
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
        accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
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

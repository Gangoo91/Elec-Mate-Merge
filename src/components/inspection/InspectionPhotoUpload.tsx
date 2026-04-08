import React, { useRef } from 'react';
import { Loader2 } from 'lucide-react';

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

    const maxSize = 20 * 1024 * 1024;
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
      'image/heic', 'image/heif',
    ];

    if (file.size > maxSize) {
      alert(`File too large. Max 20MB. Yours: ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
      e.target.value = '';
      return;
    }

    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    const hasValidType = allowedTypes.includes(file.type) || file.type === '';

    if (!hasValidType && !hasValidExtension) {
      alert('Invalid file type. Use JPEG, PNG, WEBP, or HEIC.');
      e.target.value = '';
      return;
    }

    await onPhotoCapture(file);
    e.target.value = '';
  };

  return (
    <div className="grid grid-cols-2 gap-1">
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => cameraInputRef.current?.click()}
        disabled={isUploading}
        className="h-9 rounded-lg text-[10px] font-semibold bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1"
      >
        {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        Take Photo
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="h-9 rounded-lg text-[10px] font-semibold bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1"
      >
        {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        Upload
      </button>
    </div>
  );
};

export default InspectionPhotoUpload;

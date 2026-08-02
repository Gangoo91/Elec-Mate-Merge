import React, { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface InspectionPhotoUploadProps {
  onPhotoCapture: (file: File) => Promise<void>;
  isUploading: boolean;
}

const InspectionPhotoUpload: React.FC<InspectionPhotoUploadProps> = ({
  onPhotoCapture,
  isUploading,
}) => {
  const { toast } = useToast();
  const haptic = useHaptic();
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
      haptic.warning();
      toast({
        title: 'File too large',
        description: `Maximum size is 20MB. Yours: ${(file.size / 1024 / 1024).toFixed(1)}MB.`,
        variant: 'destructive',
      });
      e.target.value = '';
      return;
    }

    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
    const hasValidType = allowedTypes.includes(file.type) || file.type === '';

    if (!hasValidType && !hasValidExtension) {
      haptic.warning();
      toast({
        title: 'Invalid file type',
        description: 'Use JPEG, PNG, WEBP, or HEIC.',
        variant: 'destructive',
      });
      e.target.value = '';
      return;
    }

    await onPhotoCapture(file);
    e.target.value = '';
  };

  return (
    <div className="grid grid-cols-2 gap-2">
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
        onClick={() => {
          haptic.light();
          cameraInputRef.current?.click();
        }}
        disabled={isUploading}
        className="h-11 rounded-xl text-[13px] font-semibold bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5 transition-colors"
      >
        {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        Take photo
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
        onClick={() => {
          haptic.light();
          fileInputRef.current?.click();
        }}
        disabled={isUploading}
        className="h-11 rounded-xl text-[13px] font-semibold bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.1] touch-manipulation active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1.5 transition-colors"
      >
        {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
        Upload photo
      </button>
    </div>
  );
};

export default InspectionPhotoUpload;

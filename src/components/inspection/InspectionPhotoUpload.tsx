import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import DocumentCamera from '@/components/settings/elec-id/DocumentCamera';

interface InspectionPhotoUploadProps {
  onPhotoCapture: (file: File) => Promise<void>;
  isUploading: boolean;
}

const MAX_SIZE = 20 * 1024 * 1024;
const ALLOWED_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'image/heic', 'image/heif',
];
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];

const InspectionPhotoUpload: React.FC<InspectionPhotoUploadProps> = ({
  onPhotoCapture,
  isUploading,
}) => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  /** Returns true when the file is within size and type limits. */
  const isAcceptable = (file: File) => {
    if (file.size > MAX_SIZE) {
      haptic.warning();
      toast({
        title: 'File too large',
        description: `${file.name} is ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum is 20MB.`,
        variant: 'destructive',
      });
      return false;
    }

    const fileName = file.name.toLowerCase();
    const hasValidExtension = VALID_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const hasValidType = ALLOWED_TYPES.includes(file.type) || file.type === '';

    if (!hasValidType && !hasValidExtension) {
      haptic.warning();
      toast({
        title: 'Invalid file type',
        description: `${file.name} is not a JPEG, PNG, WEBP or HEIC.`,
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // Sequential, not Promise.all — each upload writes a row keyed off the
    // current photo list, so running them together loses all but the last.
    for (const file of files) {
      if (isAcceptable(file)) {
        await onPhotoCapture(file);
      }
    }

    e.target.value = '';
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {/* Take photo — routed through the shared camera rather than a
          `capture="environment"` input. That attribute is honoured on mobile
          only; on a laptop the browser ignores it and silently falls back to
          the file picker, so "Take photo" and "Upload photo" did exactly the
          same thing. DocumentCamera uses the native camera under Capacitor and
          getUserMedia on the web, so the button now works everywhere. */}
        <button
          type="button"
          onClick={() => {
            haptic.light();
            setCameraOpen(true);
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
          multiple
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

      <DocumentCamera
        open={cameraOpen}
        onOpenChange={setCameraOpen}
        documentType="observation"
        onCapture={(_imageData, file) => {
          void onPhotoCapture(file);
        }}
      />
    </>
  );
};

export default InspectionPhotoUpload;

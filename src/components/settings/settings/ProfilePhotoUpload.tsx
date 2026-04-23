import { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProfilePhotoUploadProps {
  photoUrl?: string;
  onPhotoChange: (dataUrl: string | undefined) => void;
  label?: string;
  isLogo?: boolean;
}

export function ProfilePhotoUpload({
  photoUrl,
  onPhotoChange,
  label = 'Profile Photo',
  isLogo = false,
}: ProfilePhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(photoUrl);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
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
      <Label className="text-white font-medium text-[13px]">{label}</Label>

      <div className="flex items-center gap-4">
        <div
          className={cn(
            'relative bg-[#0a0a0a] border border-white/[0.08] rounded-2xl overflow-hidden flex items-center justify-center shrink-0',
            isLogo ? 'w-24 h-24' : 'w-20 h-20'
          )}
        >
          {preview ? (
            <img src={preview} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
              {isLogo ? 'Logo' : 'Photo'}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
          >
            {preview ? `Change ${isLogo ? 'logo' : 'photo'}` : `Upload ${isLogo ? 'logo' : 'photo'}`}
          </button>

          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="h-11 px-4 rounded-xl border border-red-500/30 text-red-400 text-[13px] font-medium hover:bg-red-500/10 transition-colors touch-manipulation"
            >
              Remove
            </button>
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

      <p className="text-[11.5px] text-white">Recommended: Square image, max 5MB (JPG, PNG, WEBP)</p>
    </div>
  );
}

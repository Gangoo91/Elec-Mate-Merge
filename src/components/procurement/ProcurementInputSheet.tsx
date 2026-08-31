import { useState, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn } from '@/components/shared/surfaceStyles';
import { textareaCn } from '@/components/forms/fieldStyles';

interface ProcurementInputSheetProps {
  onSubmitText: (text: string) => void;
  onSubmitPhoto: (base64: string, mimeType: string) => void;
  isProcessing: boolean;
}

type InputTab = 'text' | 'photo';

/**
 * Getting the materials list in — typed out, or photographed.
 */
export function ProcurementInputSheet({
  onSubmitText,
  onSubmitPhoto,
  isProcessing,
}: ProcurementInputSheetProps) {
  const [activeTab, setActiveTab] = useState<InputTab>('text');
  const [pasteText, setPasteText] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = () => {
    if (!pasteText.trim() || isProcessing) return;
    onSubmitText(pasteText.trim());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:image/jpeg;base64,..."
      const base64 = result.split(',')[1];
      const mimeType = file.type || 'image/jpeg';

      setPhotoPreview(result);
      onSubmitPhoto(base64, mimeType);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Two options — chips, not a segmented control with icons. */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={cn(chipBase, 'h-10 px-4 text-[13px]', activeTab === 'text' ? chipOn : chipOff)}
        >
          Paste a list
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('photo')}
          className={cn(chipBase, 'h-10 px-4 text-[13px]', activeTab === 'photo' ? chipOn : chipOff)}
        >
          Photograph one
        </button>
      </div>

      {/* Text tab */}
      {activeTab === 'text' && (
        <div className="space-y-3">
          <p className="text-sm text-white">
            One item a line. Quantities like "10x" are picked up automatically.
          </p>
          <Textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder={
              '10x 2.5mm T&E 100m\n5x double sockets\n3x MCB 32A Type B\n6x LED downlights\n2x 6mm SWA 25m'
            }
            className={cn(textareaCn, 'min-h-[160px]')}
            disabled={isProcessing}
          />
          <button
            type="button"
            onClick={handleTextSubmit}
            disabled={!pasteText.trim() || isProcessing}
            className="h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
          >
            {isProcessing ? 'Checking every supplier…' : 'Compare prices'}
          </button>
        </div>
      )}

      {/* Photo tab */}
      {activeTab === 'photo' && (
        <div className="space-y-3">
          <p className="text-sm text-white">
            A photo of a written list, a printed one or a screenshot — all get read the same way.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          {photoPreview ? (
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08]">
              <img
                src={photoPreview}
                alt="Materials list"
                className="w-full max-h-[300px] object-contain bg-black"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mx-auto mb-2" />
                    <p className="text-sm font-medium text-white">Reading the list…</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className={cn(
                'w-full py-12 rounded-xl border-2 border-dashed border-white/[0.15] bg-white/[0.02]',
                'flex flex-col items-center justify-center gap-3 touch-manipulation',
                'hover:border-elec-yellow/30 hover:bg-white/[0.04] transition-all'
              )}
            >
              <Camera className="h-10 w-10 text-white" />
              <div className="text-center">
                <p className="text-sm font-medium text-white">Tap to take a photo or upload one</p>
                <p className="text-xs text-white mt-1">
                  Handwritten, printed or a screenshot
                </p>
              </div>
            </button>
          )}

          {photoPreview && !isProcessing && (
            <button
              type="button"
              onClick={() => {
                setPhotoPreview(null);
                fileInputRef.current?.click();
              }}
              className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
            >
              Try another photo
            </button>
          )}
        </div>
      )}
    </div>
  );
}

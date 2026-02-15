import { useState, useRef } from 'react';
import { ClipboardPaste, Camera, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ProcurementInputSheetProps {
  onSubmitText: (text: string) => void;
  onSubmitPhoto: (base64: string, mimeType: string) => void;
  isProcessing: boolean;
}

type InputTab = 'text' | 'photo';

/**
 * Input section for the procurement page.
 * Two tabs: "Paste Text" and "Take Photo / Upload"
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
      {/* Tab switcher */}
      <div className="flex gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/[0.08]">
        <button
          onClick={() => setActiveTab('text')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium touch-manipulation transition-all',
            activeTab === 'text'
              ? 'bg-elec-yellow text-black'
              : 'text-white hover:bg-white/[0.05]'
          )}
        >
          <ClipboardPaste className="h-4 w-4" />
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('photo')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium touch-manipulation transition-all',
            activeTab === 'photo'
              ? 'bg-elec-yellow text-black'
              : 'text-white hover:bg-white/[0.05]'
          )}
        >
          <Camera className="h-4 w-4" />
          Photo / Upload
        </button>
      </div>

      {/* Text tab */}
      {activeTab === 'text' && (
        <div className="space-y-3">
          <p className="text-sm text-white">
            Paste your materials list below. One item per line, quantities like "10x" are detected
            automatically.
          </p>
          <Textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder={
              '10x 2.5mm T&E 100m\n5x double sockets\n3x MCB 32A Type B\n6x LED downlights\n2x 6mm SWA 25m'
            }
            className="min-h-[160px] text-base touch-manipulation"
            disabled={isProcessing}
          />
          <Button
            onClick={handleTextSubmit}
            disabled={!pasteText.trim() || isProcessing}
            className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Compare Prices
              </>
            )}
          </Button>
        </div>
      )}

      {/* Photo tab */}
      {activeTab === 'photo' && (
        <div className="space-y-3">
          <p className="text-sm text-white">
            Take a photo or upload an image of your materials list. We'll use AI to read and extract
            items automatically.
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
                    <p className="text-sm text-white font-medium">Reading materials...</p>
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
                <p className="text-sm font-medium text-white">Tap to take photo or upload</p>
                <p className="text-xs text-white mt-1">
                  Supports handwritten, printed, and screenshot formats
                </p>
              </div>
            </button>
          )}

          {photoPreview && !isProcessing && (
            <Button
              onClick={() => {
                setPhotoPreview(null);
                fileInputRef.current?.click();
              }}
              variant="outline"
              className="w-full h-11 touch-manipulation"
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Another Photo
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

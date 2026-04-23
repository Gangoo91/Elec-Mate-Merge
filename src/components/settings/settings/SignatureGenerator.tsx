import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface SignatureGeneratorProps {
  onSave: (signatureData: string) => void;
  initialValue?: string;
}

const SIGNATURE_FONTS = [
  { id: 'style1', name: 'Elegant Script', font: "'Brush Script MT', cursive" },
  { id: 'style2', name: 'Classic Signature', font: "'Lucida Handwriting', cursive" },
  { id: 'style3', name: 'Modern Flow', font: "'Segoe Script', cursive" },
  { id: 'style4', name: 'Professional', font: "'Dancing Script', cursive" },
];

export function SignatureGenerator({ onSave, initialValue }: SignatureGeneratorProps) {
  const [text, setText] = useState(initialValue ?? '');
  const [selectedFont, setSelectedFont] = useState('style1');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, selectedFont]);

  const generateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const font =
      SIGNATURE_FONTS.find((f) => f.id === selectedFont)?.font || SIGNATURE_FONTS[0].font;

    ctx.fillStyle = '#000000';
    ctx.font = `48px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text) return;

    const signatureData = canvas.toDataURL('image/png');
    onSave(signatureData);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="signatureName" className="text-white font-medium text-[13px]">
          Your name
        </Label>
        <Input
          id="signatureName"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your full name"
          className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
        />
      </div>

      <div className="space-y-3">
        <Eyebrow>Font Style</Eyebrow>
        <div className="grid grid-cols-2 gap-3">
          {SIGNATURE_FONTS.map((font) => {
            const isSelected = selectedFont === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => setSelectedFont(font.id)}
                className={cn(
                  'flex flex-col items-center justify-center rounded-2xl border p-4 min-h-[72px] transition-colors touch-manipulation',
                  isSelected
                    ? 'border-elec-yellow/60 bg-elec-yellow/10'
                    : 'border-white/[0.08] bg-[#0a0a0a] hover:bg-[hsl(0_0%_15%)]'
                )}
                aria-pressed={isSelected}
              >
                <span className="text-[11px] uppercase tracking-[0.14em] text-white mb-1.5">
                  {font.name}
                </span>
                <span
                  style={{ fontFamily: font.font, fontSize: '22px' }}
                  className="text-white"
                >
                  {text || 'Sample'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Eyebrow>Preview</Eyebrow>
        <div className="w-full overflow-hidden">
          <div className="bg-white rounded-2xl p-4">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="w-full max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={!text}
        className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save signature
      </button>
    </div>
  );
}

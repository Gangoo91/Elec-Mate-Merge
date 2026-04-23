import { useCallback } from 'react';
import { SCHEMES, getSchemeInfo } from '@/constants/schemeLogos';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SchemeLogoPickerProps {
  scheme: string;
  registrationNumber: string;
  registrationExpiry?: string;
  onSchemeChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onLogoDataUrlChange?: (dataUrl: string | null) => void;
}

async function fetchLogoAsDataUrl(logoPath: string): Promise<string | null> {
  try {
    const response = await fetch(logoPath);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function SchemeLogoPicker({
  scheme,
  registrationNumber,
  registrationExpiry,
  onSchemeChange,
  onNumberChange,
  onExpiryChange,
  onLogoDataUrlChange,
}: SchemeLogoPickerProps) {
  const showFields = scheme && scheme !== 'none';

  const handleSelect = useCallback(
    async (value: string) => {
      onSchemeChange(value);

      if (onLogoDataUrlChange) {
        if (value === 'none' || value === 'other') {
          onLogoDataUrlChange(null);
        } else {
          const info = getSchemeInfo(value);
          if (info) {
            const dataUrl = await fetchLogoAsDataUrl(info.logoPath);
            onLogoDataUrlChange(dataUrl);
          }
        }
      }
    },
    [onSchemeChange, onLogoDataUrlChange]
  );

  return (
    <div className="space-y-4">
      <Label className="text-white font-medium text-[13px]">Registration scheme</Label>

      <div className="grid grid-cols-3 gap-2.5">
        {/* None option */}
        <button
          type="button"
          onClick={() => handleSelect('none')}
          className={cn(
            'relative flex items-center justify-center rounded-2xl border p-3 h-16 transition-colors touch-manipulation',
            scheme === 'none' || !scheme
              ? 'border-elec-yellow/60 bg-elec-yellow/10'
              : 'border-white/[0.08] bg-[#0a0a0a] hover:bg-[hsl(0_0%_15%)]'
          )}
        >
          {(scheme === 'none' || !scheme) && (
            <span className="absolute top-1.5 right-1.5 text-[11px] font-semibold text-elec-yellow">
              ✓
            </span>
          )}
          <span className="text-xs text-white font-medium">None</span>
        </button>

        {/* Scheme logos */}
        {SCHEMES.map((s) => {
          const isSelected = scheme === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => handleSelect(s.value)}
              className={cn(
                'relative flex items-center justify-center rounded-2xl border p-2 h-16 transition-colors touch-manipulation',
                isSelected
                  ? 'bg-elec-yellow/10'
                  : 'border-white/[0.08] bg-[#0a0a0a] hover:bg-[hsl(0_0%_15%)]'
              )}
              style={isSelected ? { borderColor: s.brandColor } : undefined}
            >
              {isSelected && (
                <span
                  className="absolute top-1.5 right-1.5 text-[11px] font-semibold"
                  style={{ color: s.brandColor }}
                >
                  ✓
                </span>
              )}
              <img
                src={s.logoPath}
                alt={s.label}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </button>
          );
        })}

        {/* Other option */}
        <button
          type="button"
          onClick={() => handleSelect('other')}
          className={cn(
            'relative flex items-center justify-center rounded-2xl border p-3 h-16 transition-colors touch-manipulation',
            scheme === 'other'
              ? 'border-elec-yellow/60 bg-elec-yellow/10'
              : 'border-white/[0.08] bg-[#0a0a0a] hover:bg-[hsl(0_0%_15%)]'
          )}
        >
          {scheme === 'other' && (
            <span className="absolute top-1.5 right-1.5 text-[11px] font-semibold text-elec-yellow">
              ✓
            </span>
          )}
          <span className="text-xs text-white font-medium">Other</span>
        </button>
      </div>

      {showFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="schemeRegNumber" className="text-white font-medium text-[13px]">
              Registration number <span className="text-red-400">*</span>
            </Label>
            <Input
              id="schemeRegNumber"
              value={registrationNumber}
              onChange={(e) => onNumberChange(e.target.value)}
              placeholder="Enter registration number"
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="schemeExpiry" className="text-white font-medium text-[13px]">
              Expiry date
            </Label>
            <Input
              id="schemeExpiry"
              type="date"
              value={registrationExpiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
            />
          </div>
        </div>
      )}
    </div>
  );
}

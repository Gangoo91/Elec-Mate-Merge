import { useState, useEffect, useCallback } from 'react';
import { SCHEMES, getSchemeInfo, type SchemeInfo } from '@/constants/schemeLogos';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Calendar, X } from 'lucide-react';
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

  const handleSelect = useCallback(async (value: string) => {
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
  }, [onSchemeChange, onLogoDataUrlChange]);

  return (
    <div className="space-y-4">
      <Label className="text-foreground font-semibold">Registration Scheme</Label>

      {/* Logo grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* None option */}
        <button
          type="button"
          onClick={() => handleSelect('none')}
          className={cn(
            'relative flex items-center justify-center rounded-xl border-2 p-3 h-16 transition-all touch-manipulation',
            scheme === 'none' || !scheme
              ? 'border-white/40 bg-white/10'
              : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.06]'
          )}
        >
          {(scheme === 'none' || !scheme) && (
            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
          <span className="text-xs text-white/50 font-medium">None</span>
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
                'relative flex items-center justify-center rounded-xl border-2 p-2 h-16 transition-all touch-manipulation',
                isSelected
                  ? 'bg-white/10'
                  : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.06]'
              )}
              style={isSelected ? { borderColor: s.brandColor } : undefined}
            >
              {isSelected && (
                <div
                  className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: s.brandColor }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
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
            'relative flex items-center justify-center rounded-xl border-2 p-3 h-16 transition-all touch-manipulation',
            scheme === 'other'
              ? 'border-white/40 bg-white/10'
              : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.06]'
          )}
        >
          {scheme === 'other' && (
            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
          <span className="text-xs text-white/50 font-medium">Other</span>
        </button>
      </div>

      {/* Registration number + expiry fields */}
      {showFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-elec-yellow/30">
          <div>
            <Label htmlFor="schemeRegNumber" className="text-foreground font-semibold">
              Registration Number <span className="text-red-500 text-base font-bold">*</span>
            </Label>
            <Input
              id="schemeRegNumber"
              value={registrationNumber}
              onChange={(e) => onNumberChange(e.target.value)}
              placeholder="Enter registration number"
              className="mt-1.5 h-11 text-base touch-manipulation"
            />
          </div>

          <div>
            <Label htmlFor="schemeExpiry" className="text-foreground font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              Expiry Date
            </Label>
            <Input
              id="schemeExpiry"
              type="date"
              value={registrationExpiry || ''}
              onChange={(e) => onExpiryChange(e.target.value)}
              className="mt-1.5 h-11 text-base touch-manipulation"
            />
          </div>
        </div>
      )}
    </div>
  );
}

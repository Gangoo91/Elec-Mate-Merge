import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAutoLocation } from '@/hooks/useAutoLocation';

interface LocationAutoFillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function LocationAutoFill({
  value,
  onChange,
  placeholder = 'Enter location or tap to auto-detect',
  label = 'Location',
}: LocationAutoFillProps) {
  const { isLocating, requestLocation } = useAutoLocation();

  const handleLocate = async () => {
    const address = await requestLocation();
    if (address) {
      onChange(address);
    }
  };

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-white">{label}</label>}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 flex-1"
        />
        <button
          type="button"
          onClick={handleLocate}
          disabled={isLocating}
          className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white active:bg-white/10 transition-colors touch-manipulation disabled:opacity-50"
        >
          {isLocating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default LocationAutoFill;

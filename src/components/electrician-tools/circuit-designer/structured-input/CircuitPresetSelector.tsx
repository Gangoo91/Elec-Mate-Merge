import { useState } from 'react';
import { CircuitPreset } from '@/types/installation-design';
import {
  DOMESTIC_TEMPLATES,
  COMMERCIAL_TEMPLATES,
  INDUSTRIAL_TEMPLATES,
} from '@/lib/circuit-templates';
import { cn } from '@/lib/utils';

interface CircuitPresetSelectorProps {
  installationType: 'domestic' | 'commercial' | 'industrial';
  onSelectPreset: (preset: CircuitPreset) => void;
}

export const CircuitPresetSelector = ({
  installationType,
  onSelectPreset,
}: CircuitPresetSelectorProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const templates =
    installationType === 'domestic'
      ? DOMESTIC_TEMPLATES
      : installationType === 'commercial'
        ? COMMERCIAL_TEMPLATES
        : INDUSTRIAL_TEMPLATES;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
          Start from a template
        </span>
        <span className="text-[11px] text-white/50 tabular-nums">
          {templates.length} available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {templates.map((template, i) => {
          const isSelected = selectedId === template.id;
          const previewNames = template.circuits.slice(0, 3).map((c) => c.name).join(' · ');
          const extra = template.circuits.length > 3 ? ` +${template.circuits.length - 3} more` : '';

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => {
                setSelectedId(template.id);
                onSelectPreset(template);
              }}
              className={cn(
                'group relative bg-[hsl(0_0%_10%)] border rounded-2xl px-4 py-5 sm:px-5 sm:py-6 flex flex-col text-left touch-manipulation transition-all min-h-[140px]',
                'hover:bg-[hsl(0_0%_15%)] active:scale-[0.99]',
                isSelected
                  ? 'border-elec-yellow/60 bg-gradient-to-br from-elec-yellow/[0.10] via-amber-500/[0.03] to-transparent'
                  : 'border-white/[0.10] hover:border-white/20'
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={cn(
                    'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums',
                    isSelected ? 'text-elec-yellow' : 'text-white/50'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/50 tabular-nums">
                  {template.circuits.length} circuits
                </span>
              </div>
              <div
                className={cn(
                  'mt-2 text-[18px] sm:text-[20px] font-semibold tracking-tight leading-[1.15]',
                  isSelected ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {template.name}
              </div>
              <div className="mt-1 text-[12.5px] leading-snug text-white/70">
                {template.description}
              </div>
              <div className="mt-3 text-[11.5px] leading-snug text-white/50">
                {previewNames}
                {extra}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

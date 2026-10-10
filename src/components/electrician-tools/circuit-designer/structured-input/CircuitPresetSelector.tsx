import { useState } from 'react';
import { CircuitPreset } from '@/types/installation-design';
import {
  DOMESTIC_TEMPLATES,
  COMMERCIAL_TEMPLATES,
  INDUSTRIAL_TEMPLATES,
} from '@/lib/circuit-templates';
import { cn } from '@/lib/utils';
import { Section } from './wizardUi';

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
    <Section title="Start from a template" aside={`${templates.length} available`}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          const previewNames = template.circuits
            .slice(0, 3)
            .map((c) => c.name)
            .join(', ');
          const extra =
            template.circuits.length > 3 ? ` +${template.circuits.length - 3} more` : '';

          return (
            <button
              key={template.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                setSelectedId(template.id);
                onSelectPreset(template);
              }}
              className={cn(
                'flex min-h-[44px] flex-col rounded-xl border bg-[hsl(0_0%_10%)] px-4 py-3.5 text-left transition-colors touch-manipulation active:scale-[0.99]',
                isSelected
                  ? 'border-elec-yellow'
                  : 'border-white/[0.12] hover:border-white/[0.25] hover:bg-[hsl(0_0%_13%)]'
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[15px] font-semibold leading-snug text-white">
                  {template.name}
                </span>
                <span className="shrink-0 text-[13px] tabular-nums text-white">
                  {template.circuits.length} circuits
                </span>
              </div>
              <div className="mt-1 text-[13px] leading-snug text-white">{template.description}</div>
              <div className="mt-1 text-[12px] leading-snug text-white">
                {previewNames}
                {extra}
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
};

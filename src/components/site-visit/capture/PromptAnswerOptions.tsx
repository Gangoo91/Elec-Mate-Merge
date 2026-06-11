import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptAnswerOptionsProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

/**
 * One-tap answer rows for smart prompts. Replaces dropdowns — on site,
 * one-handed, a Select is three interactions (open, scroll, pick) where
 * this is one. Short option pairs sit side-by-side; longer lists stack as
 * full-width 44px rows with a check on the chosen one.
 */
export const PromptAnswerOptions = ({ options, value, onSelect }: PromptAnswerOptionsProps) => {
  const sideBySide = options.length <= 2 && options.every((o) => o.length <= 14);

  if (sideBySide) {
    return (
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              'h-11 flex-1 rounded-xl border text-sm font-medium transition-colors touch-manipulation active:scale-[0.98]',
              value === opt
                ? 'border-elec-yellow/60 bg-elec-yellow/[0.14] text-elec-yellow'
                : 'border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08]'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08]">
      {options.map((opt, i) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              'flex min-h-[44px] w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13.5px] transition-colors touch-manipulation active:bg-white/[0.08]',
              i > 0 && 'border-t border-white/[0.05]',
              active
                ? 'bg-elec-yellow/[0.12] font-medium text-elec-yellow'
                : 'bg-white/[0.02] text-white/85'
            )}
          >
            <span>{opt}</span>
            {active && <Check className="h-4 w-4 flex-shrink-0 text-elec-yellow" />}
          </button>
        );
      })}
    </div>
  );
};

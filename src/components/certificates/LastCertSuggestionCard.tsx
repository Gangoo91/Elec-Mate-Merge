import React from 'react';
import { Clock, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import type { LastCertSuggestion } from '@/hooks/useCertPrefill';

interface LastCertSuggestionCardProps {
  suggestion: LastCertSuggestion;
  onApply: () => void;
  onDismiss: () => void;
}

const CERT_LABEL: Record<string, string> = {
  eic: 'EIC',
  eicr: 'EICR',
  'minor-works': 'Minor Works',
};

const formatDate = (iso: string): string => {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};

const LastCertSuggestionCard: React.FC<LastCertSuggestionCardProps> = ({
  suggestion,
  onApply,
  onDismiss,
}) => {
  const haptic = useHaptic();
  const fieldCount = Object.keys(suggestion.fields).length;
  const certTypeLabel = CERT_LABEL[suggestion.certType] || suggestion.certType;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-9 w-9 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
          <Clock className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">
            Reuse details from your last {certTypeLabel}?
          </p>
          <p className="text-xs text-white/55 mt-1 leading-relaxed">
            From {formatDate(suggestion.date)} — copies {fieldCount} field
            {fieldCount === 1 ? '' : 's'} (supply, earthing, BS amendment). You can edit anything
            afterwards.
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            haptic.success();
            onApply();
          }}
          className={cn(
            'h-11 flex-1 rounded-lg text-sm font-semibold transition-all touch-manipulation active:scale-[0.98]',
            'bg-elec-yellow text-black hover:bg-elec-yellow/90',
            'flex items-center justify-center gap-1.5'
          )}
        >
          <Check className="h-4 w-4" />
          Copy details
        </button>
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onDismiss();
          }}
          className={cn(
            'h-11 px-4 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-[0.98]',
            'bg-white/[0.05] border border-white/[0.1] text-white/80',
            'flex items-center justify-center gap-1.5'
          )}
        >
          <X className="h-4 w-4" />
          No thanks
        </button>
      </div>
    </div>
  );
};

export default LastCertSuggestionCard;

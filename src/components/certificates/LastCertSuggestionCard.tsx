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
    <div className="rounded-lg border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/[0.06] to-amber-600/[0.03] p-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-8 w-8 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center flex-shrink-0">
          <Clock className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-white font-medium">
            Use details from your last {certTypeLabel} here?
          </p>
          <p className="text-[10px] text-white/60 mt-0.5">
            {formatDate(suggestion.date)} — copies {fieldCount} field{fieldCount === 1 ? '' : 's'}{' '}
            (supply, earthing, BS amendment). You can edit any of them after.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          type="button"
          onClick={() => {
            haptic.success();
            onApply();
          }}
          className={cn(
            'h-10 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98]',
            'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow',
            'flex items-center justify-center gap-1.5'
          )}
        >
          <Check className="h-3.5 w-3.5" />
          Copy
        </button>
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onDismiss();
          }}
          className={cn(
            'h-10 rounded-lg text-xs font-medium transition-all touch-manipulation active:scale-[0.98]',
            'bg-white/[0.05] border border-white/[0.08] text-white',
            'flex items-center justify-center gap-1.5'
          )}
        >
          <X className="h-3.5 w-3.5" />
          No thanks
        </button>
      </div>
    </div>
  );
};

export default LastCertSuggestionCard;

import React from 'react';
import { Clock, Check, X, ListPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import type { LastCertSuggestion } from '@/hooks/useCertPrefill';

interface LastCertSuggestionCardProps {
  suggestion: LastCertSuggestion;
  onApply: () => void;
  onDismiss: () => void;
  /**
   * EICR only — apply the previous cert's circuit skeleton (structure kept,
   * readings stripped). The button renders only when this callback is
   * provided, the suggestion carries schedule rows, AND the current cert has
   * no circuits yet. Other cert types simply omit these props.
   */
  onApplyCircuits?: () => void;
  /** Number of schedule-of-tests rows already on the current cert. */
  currentCircuitCount?: number;
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
  onApplyCircuits,
  currentCircuitCount,
}) => {
  const haptic = useHaptic();
  const fieldCount = Object.keys(suggestion.fields).length;
  const certTypeLabel = CERT_LABEL[suggestion.certType] || suggestion.certType;

  const circuitCount = suggestion.scheduleOfTests?.length ?? 0;
  const showCircuitCopy =
    !!onApplyCircuits && circuitCount > 0 && (currentCircuitCount ?? 0) === 0;

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
          <p className="text-xs text-white/80 mt-1 leading-relaxed">
            From {formatDate(suggestion.date)}
            {fieldCount > 0 && (
              <>
                {' '}
                — copies {fieldCount} field{fieldCount === 1 ? '' : 's'} (supply, earthing and
                property details)
              </>
            )}
            {showCircuitCopy && (
              <>
                {fieldCount > 0 ? '.' : ' —'} {circuitCount} circuit
                {circuitCount === 1 ? '' : 's'} can be copied without test readings
              </>
            )}
            . You can edit anything afterwards.
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex gap-2">
          {fieldCount > 0 && (
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
          )}
          <button
            type="button"
            onClick={() => {
              haptic.light();
              onDismiss();
            }}
            className={cn(
              'h-11 rounded-lg text-sm font-medium transition-all touch-manipulation active:scale-[0.98]',
              'bg-white/[0.05] border border-white/[0.1] text-white/80',
              'flex items-center justify-center gap-1.5',
              fieldCount > 0 ? 'px-4' : 'flex-1'
            )}
          >
            <X className="h-4 w-4" />
            No thanks
          </button>
        </div>
        {showCircuitCopy && (
          <button
            type="button"
            onClick={() => {
              haptic.success();
              onApplyCircuits?.();
            }}
            className={cn(
              'h-11 w-full rounded-lg text-sm font-semibold transition-all touch-manipulation active:scale-[0.98]',
              'bg-white/[0.06] border border-white/[0.12] text-white',
              'flex items-center justify-center gap-1.5'
            )}
          >
            <ListPlus className="h-4 w-4 text-elec-yellow" />
            Copy circuits (without readings)
          </button>
        )}
      </div>
    </div>
  );
};

export default LastCertSuggestionCard;

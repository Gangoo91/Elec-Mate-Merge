/**
 * BulkLuminaireActions — bulk add + bulk test pass for large installations
 */

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface Luminaire {
  id: string;
  location: string;
  luminaireType: string;
  category: string;
  manufacturer: string;
  model: string;
  wattage: number;
  batteryType: string;
  ratedDuration: number;
  functionalTestResult?: string;
  durationTestResult?: string;
  notes?: string;
}

interface BulkLuminaireActionsProps {
  luminaires: Luminaire[];
  onAddLuminaires: (count: number) => void;
  onCloneLuminaire: (luminaire: Luminaire) => void;
  onMarkAllPass: () => void;
  onMarkAllDurationPass?: () => void;
  className?: string;
}

const GroupHeading = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const BulkLuminaireActions: React.FC<BulkLuminaireActionsProps> = ({
  luminaires,
  onAddLuminaires,
  onCloneLuminaire,
  onMarkAllPass,
  onMarkAllDurationPass,
  className,
}) => {
  const [isMarkingPass, setIsMarkingPass] = useState(false);
  const [isMarkingDurationPass, setIsMarkingDurationPass] = useState(false);
  const { toast } = useToast();
  const haptic = useHaptic();

  const handleBulkAdd = (count: number) => {
    onAddLuminaires(count);
    toast({ title: `${count} luminaires added` });
  };

  const handleMarkAllPass = () => {
    if (luminaires.length === 0) {
      toast({ title: 'Add luminaires first', variant: 'destructive' });
      return;
    }
    setIsMarkingPass(true);
    onMarkAllPass();
    toast({ title: `${luminaires.length} marked functional PASS` });
    setTimeout(() => setIsMarkingPass(false), 500);
  };

  const handleMarkAllDurationPass = () => {
    if (luminaires.length === 0 || !onMarkAllDurationPass) return;
    setIsMarkingDurationPass(true);
    onMarkAllDurationPass();
    toast({ title: `${luminaires.length} marked duration PASS` });
    setTimeout(() => setIsMarkingDurationPass(false), 500);
  };

  // Duplicate the last row — the fastest way to add the next of a run of
  // identical bulkheads. onCloneLuminaire was passed in but never rendered,
  // so the clone path had no way to be reached.
  const lastLuminaire = luminaires[luminaires.length - 1];
  const handleDuplicateLast = () => {
    if (!lastLuminaire) return;
    onCloneLuminaire(lastLuminaire);
    toast({ title: 'Luminaire duplicated' });
  };

  return (
    <div
      className={cn('space-y-3', className)}
      // Delegated press haptic — every chip/button tap here buzzes without
      // wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Bulk add */}
      <GroupHeading title="Bulk add" />
      <div className="grid grid-cols-4 gap-2">
        {[5, 10, 20, 50].map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => handleBulkAdd(count)}
            className="h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] text-sm font-semibold text-white touch-manipulation active:scale-[0.98]"
          >
            +{count}
          </button>
        ))}
      </div>
      {lastLuminaire && (
        <button
          type="button"
          onClick={handleDuplicateLast}
          className="h-11 w-full rounded-xl bg-white/[0.06] border border-white/[0.12] text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Duplicate last{lastLuminaire.location ? ` (${lastLuminaire.location})` : ''}
        </button>
      )}

      {/* Bulk test results */}
      {luminaires.length > 0 && (
        <>
          <GroupHeading title="Bulk results" />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleMarkAllPass}
              className={cn(
                'h-11 rounded-xl text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
                isMarkingPass
                  ? 'bg-green-500 border border-green-500 text-black'
                  : 'bg-white/[0.06] border border-white/[0.12] text-white'
              )}
            >
              {isMarkingPass ? 'Done' : `All functional PASS (${luminaires.length})`}
            </button>
            {onMarkAllDurationPass && (
              <button
                type="button"
                onClick={handleMarkAllDurationPass}
                className={cn(
                  'h-11 rounded-xl text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all',
                  isMarkingDurationPass
                    ? 'bg-green-500 border border-green-500 text-black'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white'
                )}
              >
                {isMarkingDurationPass ? 'Done' : `All duration PASS (${luminaires.length})`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BulkLuminaireActions;

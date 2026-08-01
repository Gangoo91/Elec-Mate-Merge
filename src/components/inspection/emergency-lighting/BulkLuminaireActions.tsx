/**
 * BulkLuminaireActions — bulk add + bulk test pass for large installations
 */

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  <div className="flex items-center gap-3">
    <p className="text-[13px] font-semibold text-white shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.08]" />
  </div>
);

const BulkLuminaireActions: React.FC<BulkLuminaireActionsProps> = ({
  luminaires,
  onAddLuminaires,
  onMarkAllPass,
  onMarkAllDurationPass,
  className,
}) => {
  const [isMarkingPass, setIsMarkingPass] = useState(false);
  const [isMarkingDurationPass, setIsMarkingDurationPass] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className={cn('space-y-3', className)}>
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
              {isMarkingPass ? 'Done!' : `All Functional PASS (${luminaires.length})`}
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
                {isMarkingDurationPass ? 'Done!' : `All Duration PASS (${luminaires.length})`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BulkLuminaireActions;

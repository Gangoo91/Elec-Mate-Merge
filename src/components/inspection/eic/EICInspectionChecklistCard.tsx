import React from 'react';
import { EICInspectionItem } from '@/data/bs7671EICChecklistData';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

interface EICInspectionChecklistCardProps {
  inspectionItems: EICInspectionItem[];
  onUpdateItem: (id: string, field: keyof EICInspectionItem, value: any) => void;
  onAutoCreateObservation?: (inspectionItem: {
    id: string;
    item: string;
    itemNumber?: string;
    notes?: string;
    defectCode?: 'limitation';
  }) => string;
  onNavigateToObservations?: () => void;
}

const OUTCOME_OPTIONS = [
  { value: 'satisfactory' as const, label: '✓', short: 'OK' },
  { value: 'not-applicable' as const, label: 'N/A', short: 'N/A' },
  { value: 'limitation' as const, label: 'LIM', short: 'LIM' },
];

const EICInspectionChecklistCard: React.FC<EICInspectionChecklistCardProps> = ({
  inspectionItems,
  onUpdateItem,
  onAutoCreateObservation,
  onNavigateToObservations,
}) => {
  const haptic = useHaptic();

  const handleOutcomeChange = (
    id: string,
    outcome: 'satisfactory' | 'not-applicable' | 'limitation'
  ) => {
    haptic.light();
    const currentItem = inspectionItems.find((item) => item.id === id);
    if (currentItem?.outcome === outcome) {
      onUpdateItem(id, 'outcome', '');
    } else {
      onUpdateItem(id, 'outcome', outcome);
      if (outcome === 'limitation' && currentItem && onAutoCreateObservation) {
        onAutoCreateObservation({
          id: currentItem.id,
          item: currentItem.description,
          itemNumber: currentItem.itemNumber,
          notes: currentItem.notes,
          defectCode: 'limitation',
        });
        if (onNavigateToObservations) {
          setTimeout(() => onNavigateToObservations(), 300);
        }
      }
    }
  };

  return (
    <div className="space-y-3">
      <SectionTitle title="Schedule of Inspections" />
      <p className="text-[10px] text-white">
        BS 7671:18+A3:2024 — Residential and similar premises with up to 100 A supply
      </p>

      {inspectionItems.length === 0 ? (
        <div className="text-center py-8 text-white text-xs">
          No inspection items found
        </div>
      ) : (
        <div className="space-y-2">
          {inspectionItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/[0.03] rounded-lg border border-white/[0.06] p-3 space-y-2"
            >
              <div className="flex items-start gap-2">
                <span className="text-xs font-semibold text-elec-yellow flex-shrink-0 w-10 mt-0.5">
                  {item.itemNumber}
                </span>
                <p className="text-xs text-white flex-1">{item.description}</p>
              </div>

              <div className="flex items-center gap-1.5 pl-10">
                {OUTCOME_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOutcomeChange(item.id, option.value)}
                    className={cn(
                      'h-9 px-3 rounded-lg text-xs font-semibold transition-all touch-manipulation active:scale-[0.98] flex-1',
                      item.outcome === option.value
                        ? option.value === 'satisfactory'
                          ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                          : option.value === 'limitation'
                            ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                            : 'bg-white/[0.08] border border-white/[0.15] text-white'
                        : 'bg-white/[0.03] border border-white/[0.06] text-white'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {item.outcome && (
                <div className="pl-10">
                  <Textarea
                    placeholder="Notes (optional)"
                    value={item.notes || ''}
                    onChange={(e) => onUpdateItem(item.id, 'notes', e.target.value)}
                    className="text-sm touch-manipulation min-h-[60px] bg-white/[0.06] border-white/[0.08] resize-none"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EICInspectionChecklistCard;

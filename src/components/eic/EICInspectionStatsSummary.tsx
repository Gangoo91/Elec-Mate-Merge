import React from 'react';

interface EICInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: '' | 'satisfactory' | 'not-applicable' | 'limitation';
  notes?: string;
}

interface EICInspectionStatsSummaryProps {
  inspectionItems: EICInspectionItem[];
  onMarkAllOk?: () => void;
}

const EICInspectionStatsSummary: React.FC<EICInspectionStatsSummaryProps> = ({
  inspectionItems,
  onMarkAllOk,
}) => {
  const totalItems = inspectionItems.length;
  const completed = inspectionItems.filter((item) => item.outcome !== '').length;
  const satisfactory = inspectionItems.filter((item) => item.outcome === 'satisfactory').length;
  const limitation = inspectionItems.filter((item) => item.outcome === 'limitation').length;
  const progressPercent = totalItems > 0 ? Math.round((completed / totalItems) * 100) : 0;
  const allDone = completed === totalItems;

  return (
    <div className="space-y-3">
      {/* Progress bar + count */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-white">{completed}/{totalItems} completed</span>
          <span className="text-[12px] font-semibold text-elec-yellow">{progressPercent}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-green-500' : 'bg-elec-yellow'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick stats + Mark all OK */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white">
          <span className="font-semibold text-green-400">{satisfactory} satisfactory</span>
          <span>{totalItems - completed} remaining</span>
          {limitation > 0 && <span className="font-semibold text-amber-400">{limitation} LIM</span>}
        </div>
        {onMarkAllOk && completed < totalItems && (
          <button
            type="button"
            onClick={onMarkAllOk}
            className="h-11 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98] transition-all"
          >
            Mark all OK
          </button>
        )}
      </div>
    </div>
  );
};

export default EICInspectionStatsSummary;

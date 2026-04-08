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
          <span className="text-[10px] text-white">{completed}/{totalItems} completed</span>
          <span className="text-[10px] font-semibold text-elec-yellow">{progressPercent}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-green-500' : 'bg-elec-yellow'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick stats + Mark All OK */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 flex-1 text-[10px]">
          <span className="text-green-400 font-semibold">{satisfactory} ✓</span>
          <span className="text-white">{totalItems - completed - limitation} remaining</span>
          {limitation > 0 && <span className="text-amber-400 font-semibold">{limitation} LIM</span>}
        </div>
        {onMarkAllOk && completed < totalItems && (
          <button
            type="button"
            onClick={onMarkAllOk}
            className="h-8 px-3 rounded-lg text-[10px] font-semibold bg-green-500/20 border border-green-500/30 text-green-400 touch-manipulation active:scale-[0.98]"
          >
            Mark All ✓
          </button>
        )}
      </div>
    </div>
  );
};

export default EICInspectionStatsSummary;

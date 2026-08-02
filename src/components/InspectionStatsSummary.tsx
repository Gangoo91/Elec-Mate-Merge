import React from 'react';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome:
    | 'satisfactory'
    | 'C1'
    | 'C2'
    | 'C3'
    | 'FI'
    | 'not-applicable'
    | 'not-verified'
    | 'limitation'
    | '';
  notes?: string;
}

interface InspectionStatsSummaryProps {
  inspectionItems: InspectionItem[];
}

const InspectionStatsSummary = ({ inspectionItems }: InspectionStatsSummaryProps) => {
  const c1Count = inspectionItems.filter((item) => item.outcome === 'C1').length;
  const c2Count = inspectionItems.filter((item) => item.outcome === 'C2').length;
  const c3Count = inspectionItems.filter((item) => item.outcome === 'C3').length;
  const fiCount = inspectionItems.filter((item) => item.outcome === 'FI').length;
  const satisfactory = inspectionItems.filter((item) => item.outcome === 'satisfactory').length;
  const notApplicable = inspectionItems.filter((item) => item.outcome === 'not-applicable').length;
  const notVerified = inspectionItems.filter((item) => item.outcome === 'not-verified').length;
  const limitation = inspectionItems.filter((item) => item.outcome === 'limitation').length;

  const completed =
    satisfactory +
    c1Count +
    c2Count +
    c3Count +
    fiCount +
    notApplicable +
    notVerified +
    limitation;
  const total = inspectionItems.length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Only show if there are any stats to display
  if (completed === 0) {
    return null;
  }

  return (
    <div className="hidden rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 lg:block">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Inspection summary
        </h2>
        <span className="text-sm font-semibold text-elec-yellow tabular-nums">
          {progressPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressPercent === 100 ? 'bg-green-500' : 'bg-elec-yellow'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs text-white">
          <span>{completed} completed</span>
          <span>{total - completed} remaining</span>
        </div>
      </div>

      {/* Stats row — solid count chips, matching the outcome chip colours */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/[0.1] pt-3 text-[11px]">
        {satisfactory > 0 && (
          <span className="rounded-md bg-green-500 px-2 py-0.5 font-bold text-black tabular-nums">
            {satisfactory} OK
          </span>
        )}
        {c1Count > 0 && (
          <span className="rounded-md bg-red-600 px-2 py-0.5 font-bold text-white tabular-nums">
            {c1Count} C1
          </span>
        )}
        {c2Count > 0 && (
          <span className="rounded-md bg-orange-500 px-2 py-0.5 font-bold text-black tabular-nums">
            {c2Count} C2
          </span>
        )}
        {c3Count > 0 && (
          <span className="rounded-md bg-elec-yellow px-2 py-0.5 font-bold text-black tabular-nums">
            {c3Count} C3
          </span>
        )}
        {fiCount > 0 && (
          <span className="rounded-md bg-blue-500 px-2 py-0.5 font-bold text-white tabular-nums">
            {fiCount} FI
          </span>
        )}
        {notApplicable > 0 && (
          <span className="rounded-md bg-white/[0.18] px-2 py-0.5 font-bold text-white tabular-nums">
            {notApplicable} N/A
          </span>
        )}
      </div>
    </div>
  );
};

export default InspectionStatsSummary;

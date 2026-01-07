import React, { useState } from 'react';
import { Check, AlertTriangle, XCircle, AlertCircle, ChevronUp, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface InspectionStatsSummaryProps {
  inspectionItems: InspectionItem[];
}

const InspectionStatsSummary = ({ inspectionItems }: InspectionStatsSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const c1Count = inspectionItems.filter(item => item.outcome === 'C1').length;
  const c2Count = inspectionItems.filter(item => item.outcome === 'C2').length;
  const c3Count = inspectionItems.filter(item => item.outcome === 'C3').length;
  const satisfactory = inspectionItems.filter(item => item.outcome === 'satisfactory').length;
  const notApplicable = inspectionItems.filter(item => item.outcome === 'not-applicable').length;
  const notVerified = inspectionItems.filter(item => item.outcome === 'not-verified').length;
  const limitation = inspectionItems.filter(item => item.outcome === 'limitation').length;

  const completed = satisfactory + c1Count + c2Count + c3Count + notApplicable + notVerified + limitation;
  const total = inspectionItems.length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Only show if there are any stats to display
  if (completed === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile: Floating Stats Pill */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="eicr-stats-pill touch-manipulation"
        >
          {/* Compact stats */}
          <div className="flex items-center gap-3">
            {/* Satisfactory */}
            <div className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-green-400" />
              <span className="text-sm font-semibold text-green-400">{satisfactory}</span>
            </div>

            {/* Critical (C1/C2) */}
            {(c1Count + c2Count) > 0 && (
              <div className="flex items-center gap-1">
                <XCircle className="h-3.5 w-3.5 text-red-400" />
                <span className="text-sm font-semibold text-red-400">{c1Count + c2Count}</span>
              </div>
            )}

            {/* Improvements (C3) */}
            {c3Count > 0 && (
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">{c3Count}</span>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="w-px h-4 bg-white/20" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white/50">{progressPercent}%</span>
            <ChevronUp className={cn(
              "h-4 w-4 text-white/50 transition-transform",
              isExpanded && "rotate-180"
            )} />
          </div>
        </button>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm
                          bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4
                          shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
            <h4 className="text-sm font-semibold text-white mb-3">Inspection Progress</h4>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-white/50">{completed} of {total} items</span>
                <span className="text-elec-yellow font-semibold">{progressPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 rounded-lg bg-green-500/10">
                <div className="text-lg font-bold text-green-400">{satisfactory}</div>
                <div className="text-[10px] text-green-400/70">OK</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-red-500/10">
                <div className="text-lg font-bold text-red-400">{c1Count}</div>
                <div className="text-[10px] text-red-400/70">C1</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-orange-500/10">
                <div className="text-lg font-bold text-orange-400">{c2Count}</div>
                <div className="text-[10px] text-orange-400/70">C2</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-yellow-500/10">
                <div className="text-lg font-bold text-yellow-400">{c3Count}</div>
                <div className="text-[10px] text-yellow-400/70">C3</div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Circle className="h-3 w-3 text-white/40" />
                <span className="text-xs text-white/50">{notApplicable} N/A</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-white/50">{notVerified} N/V</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-3 w-3 text-purple-400" />
                <span className="text-xs text-white/50">{limitation} LIM</span>
              </div>
            </div>
          </div>
        )}

        {/* Overlay when expanded */}
        {isExpanded && (
          <div
            className="fixed inset-0 z-30 bg-black/30"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>

      {/* Desktop: Inline Stats Card */}
      <div className="hidden lg:block eicr-section-card p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Inspection Summary</h4>
          <span className="text-sm text-elec-yellow font-semibold">{progressPercent}% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-white/50 mt-1.5">
            <span>{completed} completed</span>
            <span>{total - completed} remaining</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-green-400" />
            </div>
            <span className="text-sm font-semibold text-green-400">{satisfactory}</span>
            <span className="text-xs text-white/40">OK</span>
          </div>

          {c1Count > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="h-3.5 w-3.5 text-red-400" />
              </div>
              <span className="text-sm font-semibold text-red-400">{c1Count}</span>
              <span className="text-xs text-white/40">C1</span>
            </div>
          )}

          {c2Count > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
              </div>
              <span className="text-sm font-semibold text-orange-400">{c2Count}</span>
              <span className="text-xs text-white/40">C2</span>
            </div>
          )}

          {c3Count > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertCircle className="h-3.5 w-3.5 text-yellow-400" />
              </div>
              <span className="text-sm font-semibold text-yellow-400">{c3Count}</span>
              <span className="text-xs text-white/40">C3</span>
            </div>
          )}

          {notApplicable > 0 && (
            <div className="flex items-center gap-1.5 text-white/50">
              <span className="text-sm font-semibold">{notApplicable}</span>
              <span className="text-xs">N/A</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InspectionStatsSummary;

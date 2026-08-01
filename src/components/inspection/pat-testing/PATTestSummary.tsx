/**
 * PATTestSummary — Auto-calculated summary for Tab 3
 * Neutral stat tiles with coloured numbers, rendered inside the
 * "Test summary" section card in PATTestingDeclarations.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Appliance, PAT_REPAIR_CODES } from '@/types/pat-testing';

interface PATTestSummaryProps {
  appliances: Appliance[];
}

const PATTestSummary: React.FC<PATTestSummaryProps> = ({ appliances }) => {
  const total = appliances.length;
  const passed = appliances.filter((a) => a.overallResult === 'pass').length;
  const failed = appliances.filter((a) => a.overallResult === 'fail').length;
  const untested = total - passed - failed;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  const failedAppliances = appliances.filter((a) => a.overallResult === 'fail');

  const getRepairLabel = (code: string) => {
    const found = PAT_REPAIR_CODES.find((c) => c.value === code);
    return found ? found.label : 'N/A';
  };

  return (
    <div className="space-y-4">
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: total, color: 'text-white' },
          { label: 'Passed', value: passed, color: 'text-green-400' },
          { label: 'Failed', value: failed, color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
            <p className="mt-0.5 text-[11px] font-medium text-white/80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pass rate bar */}
      {total > 0 && (
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-white">Pass rate</span>
            <span className="text-sm font-bold text-white">{passRate}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                passRate >= 80 ? 'bg-green-500' : passRate >= 50 ? 'bg-amber-400' : 'bg-red-500'
              )}
              style={{ width: `${passRate}%` }}
            />
          </div>
          {untested > 0 && (
            <p className="mt-2 text-[11px] text-white/80">
              {untested} appliance{untested !== 1 ? 's' : ''} still untested
            </p>
          )}
        </div>
      )}

      {/* Failed appliances */}
      {failedAppliances.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold tracking-tight text-white">
            Failed ({failedAppliances.length})
          </h3>

          <div>
            {failedAppliances.map((app, i) => (
              <div key={app.id} className="border-t border-white/[0.08] py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <p className="text-sm font-semibold text-white">
                    {app.description || app.assetNumber || `Appliance ${i + 1}`}
                  </p>
                </div>
                {(app.assetNumber || app.location) && (
                  <p className="mt-0.5 text-[11px] text-white/80">
                    {[app.assetNumber ? `#${app.assetNumber}` : null, app.location]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                {app.repairCode && (
                  <p className="mt-1 text-[11px] font-semibold text-red-400">
                    {app.repairCode} — {getRepairLabel(app.repairCode).split(' — ')[1] || getRepairLabel(app.repairCode)}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-red-500/40 bg-white/[0.05] px-3.5 py-3">
            <p className="text-[12px] text-white leading-relaxed">
              <span className="font-semibold">Important:</span> Failed appliances must be removed
              from service until rectified and retested.
            </p>
          </div>
        </div>
      )}

      {/* All clear */}
      {total > 0 && failed === 0 && untested === 0 && (
        <div className="rounded-xl border border-green-500/40 bg-white/[0.05] p-4">
          <p className="text-sm font-bold text-green-400">All appliances passed</p>
          <p className="mt-0.5 text-[12px] text-white/80">
            {total} appliance{total !== 1 ? 's' : ''} tested — all satisfactory
          </p>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="rounded-xl bg-white/[0.05] p-6 text-center">
          <p className="text-sm font-medium text-white">No appliances tested yet</p>
          <p className="mt-1 text-[12px] text-white/80">
            Go to the Items tab to add and test appliances
          </p>
        </div>
      )}
    </div>
  );
};

export default PATTestSummary;

/**
 * PATTestSummary — Auto-calculated summary for Tab 3
 * HubCard style KPIs with gradient accent lines.
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
      {/* Stats Grid — HubCard style */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: total, accent: 'from-elec-yellow/40 to-elec-yellow/10', color: 'text-white' },
          { label: 'Passed', value: passed, accent: 'from-emerald-500/40 to-emerald-500/10', color: 'text-emerald-400' },
          { label: 'Failed', value: failed, accent: 'from-red-500/40 to-red-500/10', color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="relative overflow-hidden card-surface-interactive rounded-xl">
            <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r rounded-full', stat.accent)} />
            <div className="relative z-10 p-3 text-center">
              <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
              <p className="text-[10px] font-medium text-white mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pass Rate Bar */}
      {total > 0 && (
        <div className="relative overflow-hidden card-surface-interactive rounded-xl">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5 rounded-full" />
          <div className="relative z-10 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white">Pass Rate</span>
              <span className="text-sm font-bold text-white">{passRate}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  passRate >= 80 ? 'bg-emerald-400' : passRate >= 50 ? 'bg-amber-400' : 'bg-red-400'
                )}
                style={{ width: `${passRate}%` }}
              />
            </div>
            {untested > 0 && (
              <p className="text-[10px] text-white mt-2">
                {untested} appliance{untested !== 1 ? 's' : ''} still untested
              </p>
            )}
          </div>
        </div>
      )}

      {/* Failed Appliances */}
      {failedAppliances.length > 0 && (
        <div className="space-y-2">
          <div className="border-b border-white/[0.06] pb-1">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-red-500/40 to-red-500/10 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">
              Failed ({failedAppliances.length})
            </h2>
          </div>

          <div className="space-y-2">
            {failedAppliances.map((app, i) => (
              <div key={app.id} className="relative overflow-hidden card-surface-interactive rounded-xl">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-rose-400 to-pink-400 opacity-50" />
                <div className="relative z-10 p-3">
                  <p className="text-white text-sm font-semibold">
                    {app.description || app.assetNumber || `Appliance ${i + 1}`}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {app.assetNumber && <span className="text-white text-[11px]">#{app.assetNumber}</span>}
                    {app.location && <span className="text-white text-[11px]">{app.location}</span>}
                  </div>
                  {app.repairCode && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-red-500/15 text-red-400 text-[10px] font-bold">
                      {app.repairCode} — {getRepairLabel(app.repairCode).split(' — ')[1] || getRepairLabel(app.repairCode)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
            <p className="text-white text-[11px]">
              <span className="font-bold">Important:</span> Failed appliances must be removed from service until rectified and retested.
            </p>
          </div>
        </div>
      )}

      {/* All Clear */}
      {total > 0 && failed === 0 && untested === 0 && (
        <div className="relative overflow-hidden card-surface-interactive rounded-xl">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 opacity-60" />
          <div className="relative z-10 p-4">
            <p className="text-emerald-400 font-bold text-sm">All Appliances Passed</p>
            <p className="text-white text-xs mt-0.5">
              {total} appliance{total !== 1 ? 's' : ''} tested — all satisfactory
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="card-surface-interactive rounded-xl p-6 text-center">
          <p className="text-white text-sm font-medium">No appliances tested yet</p>
          <p className="text-white text-xs mt-1">Go to the Items tab to add and test appliances</p>
        </div>
      )}
    </div>
  );
};

export default PATTestSummary;

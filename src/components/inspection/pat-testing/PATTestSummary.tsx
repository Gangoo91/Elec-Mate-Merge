/**
 * PATTestSummary — Auto-calculated summary for Tab 3
 *
 * Shows total tested/passed/failed, pass rate bar, and
 * failed appliances with repair codes.
 */

import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Plug } from 'lucide-react';
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
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{total}</p>
          <p className="text-xs text-white mt-0.5">Total</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{passed}</p>
          <p className="text-xs text-white mt-0.5">Passed</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-red-400">{failed}</p>
          <p className="text-xs text-white mt-0.5">Failed</p>
        </div>
      </div>

      {/* Pass Rate Bar */}
      {total > 0 && (
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Pass Rate</span>
            <span className="text-sm font-bold text-white">{passRate}%</span>
          </div>
          <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                passRate === 100
                  ? 'bg-green-500'
                  : passRate >= 80
                    ? 'bg-green-500'
                    : passRate >= 50
                      ? 'bg-amber-500'
                      : 'bg-red-500'
              )}
              style={{ width: `${passRate}%` }}
            />
          </div>
          {untested > 0 && (
            <p className="text-xs text-white mt-2">
              {untested} appliance{untested !== 1 ? 's' : ''} still untested
            </p>
          )}
        </div>
      )}

      {/* Failed Appliances */}
      {failedAppliances.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm font-semibold text-white">
              Failed Appliances ({failedAppliances.length})
            </span>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl divide-y divide-red-500/10">
            {failedAppliances.map((app, i) => (
              <div key={app.id} className="p-3 flex items-start gap-3">
                <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {app.description || app.assetNumber || `Appliance ${i + 1}`}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {app.assetNumber && (
                      <span className="text-white text-xs">#{app.assetNumber}</span>
                    )}
                    {app.location && <span className="text-white text-xs">{app.location}</span>}
                  </div>
                  {app.repairCode && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-red-500/15 text-red-400 text-xs font-medium">
                      {app.repairCode} —{' '}
                      {getRepairLabel(app.repairCode).split(' — ')[1] ||
                        getRepairLabel(app.repairCode)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3">
            <p className="text-white text-sm">
              <strong>Important:</strong> Any failed appliances must be removed from service until
              the defect has been rectified and the appliance retested.
            </p>
          </div>
        </div>
      )}

      {/* All Clear */}
      {total > 0 && failed === 0 && untested === 0 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-green-400 shrink-0" />
          <div>
            <p className="text-green-400 font-semibold text-sm">All Appliances Passed</p>
            <p className="text-white text-xs mt-0.5">
              {total} appliance{total !== 1 ? 's' : ''} tested — all satisfactory
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-6 text-center">
          <Plug className="h-8 w-8 text-white mx-auto mb-2" />
          <p className="text-white text-sm">No appliances tested yet</p>
          <p className="text-white text-xs mt-1">
            Go to the Appliances tab to add and test appliances
          </p>
        </div>
      )}
    </div>
  );
};

export default PATTestSummary;

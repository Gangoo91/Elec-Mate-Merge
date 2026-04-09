/**
 * PATApplianceCard — Appliance list item card
 * HubCard style with gradient accent line based on pass/fail status.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Appliance } from '@/types/pat-testing';

interface PATApplianceCardProps {
  appliance: Appliance;
  index: number;
  onTap: () => void;
}

const PATApplianceCard: React.FC<PATApplianceCardProps> = ({ appliance, index, onTap }) => {
  const result = appliance.overallResult;
  const photoCount = (appliance.photos || []).length;

  const accent =
    result === 'pass' ? 'from-emerald-500 via-emerald-400 to-green-400'
    : result === 'fail' ? 'from-red-500 via-rose-400 to-pink-400'
    : 'from-elec-yellow/40 to-elec-yellow/10';

  const numberStyle =
    result === 'pass' ? 'bg-green-500/15 text-green-400 border-green-500/20'
    : result === 'fail' ? 'bg-red-500/15 text-red-400 border-red-500/20'
    : 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';

  const statusBadge =
    result === 'pass' ? { label: 'Pass', style: 'bg-green-500/15 text-green-400' }
    : result === 'fail' ? { label: 'Fail', style: 'bg-red-500/15 text-red-400' }
    : { label: 'Untested', style: 'bg-white/[0.08] text-white/60' };

  // Build subtitle
  const subtitleParts: string[] = [];
  if (appliance.assetNumber) subtitleParts.push(appliance.assetNumber);
  if (appliance.location) subtitleParts.push(appliance.location);
  if (appliance.make) subtitleParts.push(`${appliance.make}${appliance.model ? ` ${appliance.model}` : ''}`);
  if (photoCount > 0) subtitleParts.push(`${photoCount} photo${photoCount !== 1 ? 's' : ''}`);

  return (
    <button
      type="button"
      onClick={onTap}
      className="block w-full text-left focus:outline-none rounded-2xl touch-manipulation"
    >
      <div className="group relative overflow-hidden card-surface-interactive rounded-2xl active:scale-[0.98] transition-all duration-200">
        <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity', accent)} />
        <div className="relative z-10 flex items-center gap-3 px-4 py-3">
          {/* Number badge */}
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold border', numberStyle)}>
            {index + 1}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                {appliance.description || `Appliance ${index + 1}`}
              </h3>
              {appliance.applianceClass && (
                <span className="text-[10px] font-medium text-white/50 px-1 py-0.5 bg-white/[0.04] rounded shrink-0">
                  {appliance.applianceClass}
                </span>
              )}
            </div>
            {subtitleParts.length > 0 && (
              <p className="text-[11px] text-white mt-0.5">
                {subtitleParts.join(' · ')}
              </p>
            )}
          </div>

          {/* Status + chevron */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', statusBadge.style)}>
              {statusBadge.label}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <svg className="w-3 h-3 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default PATApplianceCard;

/**
 * PATApplianceCard — Appliance list entry
 * Flattened repeating-group row: border-t separated inside the parent
 * section card, solid green/red pass-fail status.
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

  const statusBadge =
    result === 'pass' ? { label: 'Pass', style: 'bg-green-500 text-black' }
    : result === 'fail' ? { label: 'Fail', style: 'bg-red-500 text-white' }
    : { label: 'Untested', style: 'bg-white/[0.08] text-white' };

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
      className="block w-full min-h-11 text-left border-t border-white/[0.08] py-3 touch-manipulation transition-opacity active:opacity-70 focus:outline-none"
    >
      <div className="flex items-center gap-3">
        {/* Number badge */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-semibold text-white">
          {index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold leading-tight text-white">
              {appliance.description || `Appliance ${index + 1}`}
            </h3>
            {appliance.applianceClass && (
              <span className="shrink-0 rounded bg-white/[0.06] px-1 py-0.5 text-[10px] font-medium text-white/80">
                {appliance.applianceClass}
              </span>
            )}
          </div>
          {subtitleParts.length > 0 && (
            <p className="mt-0.5 truncate text-[11px] text-white/80">
              {subtitleParts.join(' · ')}
            </p>
          )}
        </div>

        {/* Status + chevron */}
        <div className="flex shrink-0 items-center gap-2">
          <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', statusBadge.style)}>
            {statusBadge.label}
          </span>
          <svg className="h-3.5 w-3.5 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </div>
      </div>
    </button>
  );
};

export default PATApplianceCard;

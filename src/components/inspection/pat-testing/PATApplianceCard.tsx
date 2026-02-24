/**
 * PATApplianceCard — List item card for the Appliances tab (Tab 2)
 *
 * Shows asset number, description, location, status badge (untested/pass/fail),
 * and photo count. Tappable to open the PATTestSheet.
 */

import React from 'react';
import { ChevronRight, Camera, MapPin, Plug } from 'lucide-react';
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

  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full text-left bg-white/[0.06] border border-white/[0.08] rounded-2xl p-3.5 flex items-center gap-3 touch-manipulation hover:bg-white/[0.08] transition-colors active:scale-[0.99]"
    >
      {/* Index circle */}
      <div
        className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold',
          result === 'pass'
            ? 'bg-green-500/15 text-green-400'
            : result === 'fail'
              ? 'bg-red-500/15 text-red-400'
              : 'bg-white/[0.06] text-white'
        )}
      >
        {index + 1}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-semibold truncate">
            {appliance.description || appliance.assetNumber || `Appliance ${index + 1}`}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          {appliance.assetNumber && (
            <span className="text-white text-xs flex items-center gap-1">
              <Plug className="h-3 w-3" />
              {appliance.assetNumber}
            </span>
          )}
          {appliance.location && (
            <span className="text-white text-xs flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3" />
              {appliance.location}
            </span>
          )}
          {photoCount > 0 && (
            <span className="text-white text-xs flex items-center gap-1">
              <Camera className="h-3 w-3" />
              {photoCount}
            </span>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div
        className={cn(
          'shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold border',
          result === 'pass'
            ? 'bg-green-500/15 text-green-400 border-green-500/20'
            : result === 'fail'
              ? 'bg-red-500/15 text-red-400 border-red-500/20'
              : 'bg-white/[0.06] text-white border-white/[0.08]'
        )}
      >
        {result === 'pass' ? 'Pass' : result === 'fail' ? 'Fail' : 'Untested'}
      </div>

      <ChevronRight className="h-4 w-4 text-white shrink-0" />
    </button>
  );
};

export default PATApplianceCard;

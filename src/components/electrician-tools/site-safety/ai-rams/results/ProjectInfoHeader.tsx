import React from 'react';
import type { MethodStatementData } from '@/types/method-statement';

interface ProjectInfoHeaderProps {
  methodData: Partial<MethodStatementData>;
  projectName?: string;
  location?: string;
}

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="py-3 flex items-baseline gap-4">
    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 w-28 sm:w-32 shrink-0">
      {label}
    </span>
    <span className="text-[14px] font-medium text-white flex-1 min-w-0">{value}</span>
  </div>
);

/**
 * Project info header — editorial. No icons, no chip backgrounds.
 * Hero title with sub-rows for location/contractor/supervisor/duration.
 */
export const ProjectInfoHeader: React.FC<ProjectInfoHeaderProps> = ({
  methodData,
  projectName,
  location,
}) => {
  const title = methodData.jobTitle || projectName || 'Untitled project';
  const locationValue = methodData.location || location;

  return (
    <section className="space-y-5">
      {/* Hero title */}
      <div className="space-y-2">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Method statement
        </div>
        <h2 className="text-[22px] sm:text-[28px] font-semibold tracking-tight leading-[1.15] text-white">
          {title}
        </h2>
      </div>

      {/* Info rows */}
      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {locationValue && <InfoRow label="Location" value={locationValue} />}
        {methodData.contractor && <InfoRow label="Contractor" value={methodData.contractor} />}
        {methodData.supervisor && <InfoRow label="Supervisor" value={methodData.supervisor} />}
        {(methodData.duration || methodData.totalEstimatedTime) && (
          <InfoRow
            label="Duration"
            value={methodData.totalEstimatedTime || methodData.duration || ''}
          />
        )}
        {methodData.teamSize && <InfoRow label="Team" value={methodData.teamSize} />}
      </div>
    </section>
  );
};

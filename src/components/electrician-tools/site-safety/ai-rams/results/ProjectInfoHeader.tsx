import React from 'react';
import { MapPin, Users, User, Clock, Building2 } from 'lucide-react';
import type { MethodStatementData } from '@/types/method-statement';

interface ProjectInfoHeaderProps {
  methodData: Partial<MethodStatementData>;
  projectName?: string;
  location?: string;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-2">
    <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-wider text-white font-medium">{label}</p>
      <p className="text-sm font-semibold text-white truncate">{value}</p>
    </div>
  </div>
);

export const ProjectInfoHeader: React.FC<ProjectInfoHeaderProps> = ({
  methodData,
  projectName,
  location
}) => {
  const title = methodData.jobTitle || projectName || 'Untitled Project';
  const locationValue = methodData.location || location;

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header with title */}
      <div className="px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-elec-yellow rounded-full shrink-0" />
          <h2 className="text-base font-bold text-white leading-tight">{title}</h2>
        </div>
      </div>

      {/* Info Grid */}
      <div className="px-4 py-2 divide-y divide-white/[0.05]">
        {locationValue && (
          <InfoItem
            icon={<MapPin className="h-4 w-4 text-elec-yellow" />}
            label="Location"
            value={locationValue}
          />
        )}

        {methodData.contractor && (
          <InfoItem
            icon={<Building2 className="h-4 w-4 text-elec-yellow" />}
            label="Contractor"
            value={methodData.contractor}
          />
        )}

        {methodData.supervisor && (
          <InfoItem
            icon={<User className="h-4 w-4 text-elec-yellow" />}
            label="Supervisor"
            value={methodData.supervisor}
          />
        )}

        {(methodData.duration || methodData.totalEstimatedTime) && (
          <InfoItem
            icon={<Clock className="h-4 w-4 text-elec-yellow" />}
            label="Duration"
            value={methodData.totalEstimatedTime || methodData.duration || ''}
          />
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { MethodStatementData } from '@/types/method-statement';

interface SiteLogisticsCardProps {
  methodData: MethodStatementData;
}

interface LogisticsRowProps {
  label: string;
  value?: string;
  tone?: 'default' | 'warning';
}

const LogisticsRow: React.FC<LogisticsRowProps> = ({ label, value, tone = 'default' }) => {
  if (!value) return null;
  return (
    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
      <span
        className={`text-[10.5px] font-semibold uppercase tracking-[0.18em] sm:w-44 shrink-0 ${
          tone === 'warning' ? 'text-red-400' : 'text-white'
        }`}
      >
        {label}
      </span>
      <span className="text-[13.5px] text-white leading-relaxed flex-1 min-w-0">{value}</span>
    </div>
  );
};

/**
 * Site logistics — editorial. No icons, no green chrome.
 */
export function SiteLogisticsCard({ methodData }: SiteLogisticsCardProps) {
  const logistics = methodData.siteLogistics;
  if (!logistics) return null;

  const hasAny =
    logistics.vehicleAccess ||
    logistics.parking ||
    logistics.materialStorage ||
    logistics.wasteManagement ||
    logistics.welfareFacilities ||
    logistics.siteRestrictions;
  if (!hasAny) return null;

  return (
    <section className="space-y-5">
      {/* No heading here — the section card supplies it. This component used
          to print its own eyebrow AND a large h3, so the page showed the same
          title three times over. */}
      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        <LogisticsRow label="Vehicle access" value={logistics.vehicleAccess} />
        <LogisticsRow label="Parking" value={logistics.parking} />
        <LogisticsRow label="Material storage" value={logistics.materialStorage} />
        <LogisticsRow label="Waste management" value={logistics.wasteManagement} />
        <LogisticsRow label="Welfare facilities" value={logistics.welfareFacilities} />
        <LogisticsRow label="Site restrictions" value={logistics.siteRestrictions} tone="warning" />
      </div>
    </section>
  );
}

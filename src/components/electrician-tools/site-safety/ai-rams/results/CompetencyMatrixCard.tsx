import React from 'react';
import { MethodStatementData } from '@/types/method-statement';

interface CompetencyMatrixCardProps {
  methodData: MethodStatementData;
}

interface CompetencyRowProps {
  label: string;
  value?: string;
  tone?: 'default' | 'warning';
}

const CompetencyRow: React.FC<CompetencyRowProps> = ({ label, value, tone = 'default' }) => {
  if (!value) return null;
  return (
    <div className="py-4 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
      <span
        className={`text-[10.5px] font-semibold uppercase tracking-[0.18em] sm:w-44 shrink-0 ${
          tone === 'warning' ? 'text-amber-400' : 'text-white'
        }`}
      >
        {label}
      </span>
      <span className="text-[13.5px] text-white leading-relaxed flex-1 min-w-0">{value}</span>
    </div>
  );
};

/**
 * Competency & training requirements — editorial.
 */
export function CompetencyMatrixCard({ methodData }: CompetencyMatrixCardProps) {
  const competency = methodData.competencyMatrix;
  if (!competency) return null;

  const hasAny =
    competency.competencyRequirements ||
    competency.trainingRequired ||
    competency.supervisionLevel ||
    competency.additionalCertifications;
  if (!hasAny) return null;

  return (
    <section className="space-y-5">
      {/* No heading here — the section card supplies it. This component used
          to print its own eyebrow AND a large h3, so the page showed the same
          title three times over. */}
      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        <CompetencyRow label="Competency required" value={competency.competencyRequirements} />
        <CompetencyRow label="Training required" value={competency.trainingRequired} />
        <CompetencyRow label="Supervision" value={competency.supervisionLevel} tone="warning" />
        <CompetencyRow label="Additional certs" value={competency.additionalCertifications} />
      </div>

      <p className="text-[12px] text-white leading-relaxed">
        All personnel must have appropriate qualifications verified before commencing work.
      </p>
    </section>
  );
}

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
          tone === 'warning' ? 'text-amber-400' : 'text-white/55'
        }`}
      >
        {label}
      </span>
      <span className="text-[13.5px] text-white/85 leading-relaxed flex-1 min-w-0">{value}</span>
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
      <div className="space-y-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Competency &amp; training
        </div>
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
          Who is qualified to work.
        </h3>
      </div>

      <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        <CompetencyRow label="Competency required" value={competency.competencyRequirements} />
        <CompetencyRow label="Training required" value={competency.trainingRequired} />
        <CompetencyRow label="Supervision" value={competency.supervisionLevel} tone="warning" />
        <CompetencyRow
          label="Additional certs"
          value={competency.additionalCertifications}
        />
      </div>

      <p className="text-[12px] text-white/55 leading-relaxed">
        All personnel must have appropriate qualifications verified before commencing work.
      </p>
    </section>
  );
}

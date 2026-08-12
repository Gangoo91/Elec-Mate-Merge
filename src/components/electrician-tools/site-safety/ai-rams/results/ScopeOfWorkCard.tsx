import React from 'react';
import { MethodStatementData } from '@/types/method-statement';

interface ScopeOfWorkCardProps {
  methodData: MethodStatementData;
}

/** Fields the method agent actually writes, none of which are on the base type. */
type ScopeFields = MethodStatementData & {
  scope?: string;
  executive_summary?: string;
  exclusions?: string | string[];
};

const Para: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
      {label}
    </span>
    <p className="text-[13.5px] leading-relaxed text-white">{children}</p>
  </div>
);

/**
 * Scope of work.
 *
 * This card rendered nothing at all: it read `methodData.scopeOfWork`, an object
 * the agent has never written. With it undefined every guard failed and the
 * component returned null, so an empty card sat on the page — while the agent's
 * `executive_summary`, `scope`, `description` and `exclusions` all went unused.
 * Field names verified against live job data before wiring.
 */
export function ScopeOfWorkCard({ methodData }: ScopeOfWorkCardProps) {
  const m = methodData as ScopeFields;
  const legacy = methodData.scopeOfWork;

  const summary = m.executive_summary || legacy?.description;
  const scope = m.scope || m.description;
  const deliverables = legacy?.keyDeliverables ?? [];
  const exclusionsRaw = m.exclusions ?? legacy?.exclusions;
  const exclusions = Array.isArray(exclusionsRaw)
    ? exclusionsRaw.filter(Boolean)
    : exclusionsRaw
      ? [exclusionsRaw]
      : [];

  if (!summary && !scope && !deliverables.length && !exclusions.length) {
    return <p className="text-[13px] text-white">No scope recorded for this job.</p>;
  }

  return (
    <div className="space-y-5">
      {summary && <Para label="Summary">{summary}</Para>}
      {scope && summary !== scope && <Para label="In scope">{scope}</Para>}

      {deliverables.length > 0 && (
        <div className="space-y-2">
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Key deliverables
          </span>
          <ul className="space-y-1.5">
            {deliverables.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13.5px] leading-relaxed text-white"
              >
                <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-elec-yellow" />
                <span className="min-w-0 flex-1">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {exclusions.length > 0 && (
        <div className="space-y-2">
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
            Out of scope
          </span>
          <ul className="space-y-1.5">
            {exclusions.map((e, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[13.5px] leading-relaxed text-white"
              >
                <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-red-400" />
                <span className="min-w-0 flex-1">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

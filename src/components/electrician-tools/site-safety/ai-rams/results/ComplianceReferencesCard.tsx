import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MethodStatementData } from '@/types/method-statement';

interface ComplianceReferencesCardProps {
  methodData: MethodStatementData;
}

/**
 * Compliance & regulations — editorial. Reg chips as monospace pills,
 * warnings as divide-y rows with red eyebrow, citations as collapsible
 * editorial rows.
 */
export function ComplianceReferencesCard({ methodData }: ComplianceReferencesCardProps) {
  const [expandedCitation, setExpandedCitation] = useState<number | null>(null);

  const complianceRegulations = methodData.complianceRegulations || [];
  const complianceWarnings = methodData.complianceWarnings || [];
  const ragCitations = methodData.ragCitations || [];

  const hasAny =
    complianceRegulations.length > 0 ||
    complianceWarnings.length > 0 ||
    ragCitations.length > 0;
  if (!hasAny) return null;

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Compliance &amp; regulations
        </div>
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
          What this work cites.
        </h3>
      </div>

      {complianceRegulations.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Referenced
          </div>
          <div className="flex flex-wrap gap-2">
            {complianceRegulations.map((reg, idx) => (
              <span
                key={idx}
                className="inline-flex items-center h-7 px-2.5 rounded-md text-[11.5px] font-medium tabular-nums bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white/85"
              >
                {reg}
              </span>
            ))}
          </div>
        </div>
      )}

      {complianceWarnings.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
            Warnings
          </div>
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {complianceWarnings.map((warning, idx) => (
              <li key={idx} className="py-3 flex items-baseline gap-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-red-400 w-8 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-[13.5px] text-white/85 leading-relaxed flex-1">
                  {warning}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {ragCitations.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Detailed citations
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {ragCitations.map((citation, idx) => {
              const isOpen = expandedCitation === idx;
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setExpandedCitation(isOpen ? null : idx)}
                    className="w-full py-3 flex items-baseline gap-3 text-left touch-manipulation"
                  >
                    <span className="text-[11.5px] font-medium tabular-nums text-elec-yellow shrink-0">
                      {citation.regulation}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/45 shrink-0">
                      {citation.source === 'health-safety' ? 'H&S' : 'Installer'}
                    </span>
                    {citation.linkedToStep !== undefined && citation.linkedToStep > 0 && (
                      <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/45 shrink-0 tabular-nums">
                        Step {citation.linkedToStep}
                      </span>
                    )}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white/55 ml-auto transition-transform duration-200 shrink-0',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-4 text-[13px] text-white/80 leading-relaxed whitespace-pre-wrap">
                      {citation.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[12px] text-white/55 leading-relaxed">
        All work must comply with current UK regulations and industry standards. Consult the
        latest editions of referenced documents.
      </p>
    </section>
  );
}

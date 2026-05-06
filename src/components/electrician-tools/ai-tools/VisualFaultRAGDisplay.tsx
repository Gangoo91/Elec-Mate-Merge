/**
 * VisualFaultRAGDisplay — editorial fault classification display.
 *
 * Drops the destructive/orange/yellow/blue badge floods and inline icons
 * for editorial gradient surface with semantic text accents only. Code
 * (C1/C2/C3/FI) shown in big tabular nums with tone-coloured headline.
 */

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface RegulationReference {
  number: string;
  section: string;
  content: string;
  similarity: number;
  severity_justification: string;
}

interface VisualFaultRAGDisplayProps {
  faultCode: 'C1' | 'C2' | 'C3' | 'FI';
  regulationReferences: RegulationReference[];
  gn3Guidance: string;
  confidence: number;
  reasoning: string;
  verificationStatus?: string;
}

const codeMeta = (code: string) => {
  switch (code) {
    case 'C1':
      return {
        tone: 'text-red-300',
        accent: 'border-red-500/40 bg-red-500/[0.08]',
        title: 'Danger — act now',
      };
    case 'C2':
      return {
        tone: 'text-orange-300',
        accent: 'border-orange-500/40 bg-orange-500/[0.08]',
        title: 'Urgent remedial required',
      };
    case 'C3':
      return {
        tone: 'text-amber-300',
        accent: 'border-amber-500/40 bg-amber-500/[0.08]',
        title: 'Improvement recommended',
      };
    case 'FI':
      return {
        tone: 'text-blue-300',
        accent: 'border-blue-500/40 bg-blue-500/[0.08]',
        title: 'Investigation required',
      };
    default:
      return {
        tone: 'text-white',
        accent: 'border-white/15 bg-white/[0.04]',
        title: '',
      };
  }
};

const VisualFaultRAGDisplay = ({
  faultCode,
  regulationReferences,
  gn3Guidance,
  confidence,
  reasoning,
  verificationStatus,
}: VisualFaultRAGDisplayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const meta = codeMeta(faultCode);
  const confidencePct = Math.round(confidence * 100);

  return (
    <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div>
        <Eyebrow>CLASSIFICATION</Eyebrow>
        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
          <span className={cn('text-[40px] sm:text-[48px] font-semibold tabular-nums leading-none', meta.tone)}>
            {faultCode}
          </span>
          <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-white">
            {meta.title}
          </h3>
        </div>
        <p className="mt-2 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
          {confidencePct}% confidence
        </p>
      </div>

      {/* Verification status */}
      <div
        className={cn(
          'rounded-xl border px-4 py-3',
          verificationStatus
            ? 'border-emerald-500/30 bg-emerald-500/[0.05]'
            : 'border-amber-500/30 bg-amber-500/[0.05]'
        )}
      >
        <p
          className={cn(
            'text-[12.5px] leading-relaxed',
            verificationStatus ? 'text-emerald-200' : 'text-amber-200'
          )}
        >
          {verificationStatus || 'Manual verification required — AI classification pending review.'}
        </p>
      </div>

      {/* Reasoning */}
      <section className="space-y-2 pt-3 border-t border-white/[0.06]">
        <Eyebrow>AI REASONING</Eyebrow>
        <p className="text-[13px] leading-relaxed text-white">{reasoning}</p>
      </section>

      {/* GN3 guidance */}
      {gn3Guidance && gn3Guidance !== 'No specific GN3 guidance found' && (
        <section className="space-y-2 pt-3 border-t border-white/[0.06]">
          <Eyebrow>GN3 GUIDANCE · INSPECTION + TESTING</Eyebrow>
          <p className="text-[13px] leading-relaxed text-white">{gn3Guidance}</p>
        </section>
      )}

      {/* Regulation refs */}
      {regulationReferences &&
        regulationReferences.length > 0 &&
        regulationReferences[0]?.number !== 'N/A' && (
          <section className="space-y-3 pt-3 border-t border-white/[0.06]">
            <Eyebrow>BS 7671 REGS · {regulationReferences.length}</Eyebrow>
            <ul className="flex flex-wrap gap-1.5">
              {regulationReferences.map((reg, idx) => (
                <li
                  key={idx}
                  className="inline-flex items-center text-[10.5px] uppercase tracking-[0.14em] font-mono font-semibold text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-2 py-1"
                >
                  Reg {reg.number}
                </li>
              ))}
            </ul>

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="w-full flex items-center justify-between rounded-xl border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.20] px-4 py-3 touch-manipulation transition-colors">
                <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-white/85">
                  {isOpen ? 'Hide details' : 'View regulation details'}
                </span>
                <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-elec-yellow">
                  {isOpen ? 'Close' : 'Open'}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2">
                {regulationReferences.map((reg, idx) => {
                  const relevance = Math.round(reg.similarity * 100);
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 space-y-3"
                    >
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <span className="font-mono text-[12px] uppercase tracking-[0.14em] font-semibold text-elec-yellow">
                          Reg {reg.number}
                        </span>
                        <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                          {relevance}% relevance
                        </span>
                      </div>
                      <h5 className="text-[14px] font-semibold tracking-tight text-white leading-snug">
                        {reg.section}
                      </h5>
                      <p className="text-[12.5px] leading-relaxed text-white/85 border-l-2 border-white/[0.08] pl-3">
                        {reg.content}
                      </p>
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.05] px-3 py-2">
                        <Eyebrow>WHY IT MATTERS</Eyebrow>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-amber-200">
                          {reg.severity_justification}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          </section>
        )}
    </div>
  );
};

export default VisualFaultRAGDisplay;

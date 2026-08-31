import React from 'react';
import { cn } from '@/lib/utils';
import {
  OUTCOME_COPY,
  type AssessmentBasis,
  type AssessmentFinding,
  type PlugInSolarAssessmentResult,
} from '@/lib/plugInSolarAssessment';

/**
 * The verdict banner.
 *
 * The one thing this component must never do is blur the line between law and
 * advice. Findings are grouped by where they come from and each carries its
 * citation, because the difference between "the specification prohibits this"
 * and "this is prudent" is the difference between a defensible record and an
 * overclaim. See ELE-1660 for why that matters commercially as well as legally.
 */

const BASIS_LABEL: Record<AssessmentBasis, string> = {
  statutory: 'Regulations',
  'product-spec': 'Product specification',
  network: 'Network connection (G98)',
  bs7671: 'BS 7671',
  guidance: 'Professional judgement',
};

/*
 * Colour carries meaning through the BORDER and the tag, never through a wash
 * over the whole panel.
 *
 * These were tinted fills (`bg-orange-500/10`, `bg-red-500/[0.08]`). The cards
 * they sit inside already carry a warm `from-white/[0.08]` gradient, so a low
 * opacity orange laid over it composited to **brown** — muddy, and nothing like
 * the rest of the app. A neutral surface with a saturated edge reads as the same
 * severity, stays legible, and keeps the palette to the house yellow.
 */
const outcomeTone = {
  pass: 'border-white/[0.1] border-l-4 border-l-emerald-400 bg-white/[0.05]',
  'needs-work': 'border-white/[0.1] border-l-4 border-l-elec-yellow bg-white/[0.05]',
  refer: 'border-white/[0.1] border-l-4 border-l-red-500 bg-white/[0.05]',
} as const;

const outcomeAccent = {
  pass: 'text-emerald-400',
  'needs-work': 'text-elec-yellow',
  refer: 'text-red-400',
} as const;

const severityTone = {
  blocker: 'border-white/[0.1] border-l-4 border-l-red-500 bg-white/[0.05]',
  action: 'border-white/[0.1] border-l-4 border-l-elec-yellow bg-white/[0.05]',
  advisory: 'border-white/[0.1] border-l-4 border-l-white/25 bg-white/[0.03]',
} as const;

const severityAccent = {
  blocker: 'text-red-400',
  action: 'text-elec-yellow',
  advisory: 'text-white',
} as const;

const severityLabel = {
  blocker: 'Stops the install',
  action: 'Work needed',
  advisory: 'For the record',
} as const;

const FindingCard: React.FC<{ finding: AssessmentFinding }> = ({ finding }) => (
  <div className={cn('rounded-xl border p-3', severityTone[finding.severity])}>
    <div className="mb-1 flex flex-wrap items-center gap-2">
      <span
        className={cn(
          'text-[10px] font-semibold uppercase tracking-[0.12em]',
          severityAccent[finding.severity],
        )}
      >
        {severityLabel[finding.severity]}
      </span>
      <span className="text-[10px] text-white">·</span>
      <span className="text-[10px] font-medium text-white">{BASIS_LABEL[finding.basis]}</span>
    </div>
    <p className="text-[14px] font-semibold leading-snug text-white">{finding.summary}</p>
    <p className="mt-1 text-[12px] leading-relaxed text-white">{finding.detail}</p>
    <p className="mt-2 text-[11px] font-medium text-white">{finding.citation}</p>
    {finding.remedialWork && (
      <p className="mt-2 border-t border-white/[0.1] pt-2 text-[12px] leading-snug text-white">
        <span className="font-semibold">Work implied: </span>
        {finding.remedialWork}
      </p>
    )}
  </div>
);

const Group: React.FC<{ title: string; blurb: string; findings: AssessmentFinding[] }> = ({
  title,
  blurb,
  findings,
}) => {
  if (findings.length === 0) return null;
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-[11px] leading-snug text-white">{blurb}</p>
      </div>
      {findings.map((f) => (
        <FindingCard key={f.id} finding={f} />
      ))}
    </div>
  );
};

export const PlugInSolarVerdict: React.FC<{ result: PlugInSolarAssessmentResult }> = ({
  result,
}) => {
  const copy = OUTCOME_COPY[result.outcome];

  return (
    <div className="space-y-4">
      <div className={cn('rounded-2xl border p-4', outcomeTone[result.outcome])}>
        <p
          className={cn(
            'text-[11px] font-semibold uppercase tracking-[0.14em]',
            outcomeAccent[result.outcome],
          )}
        >
          Assessment result
        </p>
        <h2 className="mt-1 text-[19px] font-semibold tracking-tight text-white">{copy.title}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-white">{copy.body}</p>
      </div>

      <Group
        title="Requirements"
        blurb="From the regulations, the product specification, or network connection rules."
        findings={result.statutoryFindings}
      />

      <Group
        title="Standards and professional judgement"
        blurb="BS 7671 selection and erection, plus advice that is not itself a legal requirement."
        findings={result.guidanceFindings}
      />

      {result.suggestedWork.length > 0 && (
        <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3">
          <h3 className="mb-2 text-sm font-semibold text-white">Follow-on work</h3>
          <ul className="space-y-1">
            {result.suggestedWork.map((w) => (
              <li key={w} className="text-[13px] leading-snug text-white">
                — {w}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] leading-snug text-white">
            Carried through to the Remedial works step, where each item can be quoted and given
            its own certificate.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlugInSolarVerdict;

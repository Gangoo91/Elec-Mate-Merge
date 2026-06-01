/**
 * ACAuditTimeline
 *
 * Per-AC audit chain — evidence → assessor sign-off → IQA verdict.
 * Rendered inside the AC details bottom sheet so the apprentice (and
 * tutor & EPAO during a review) see the full provenance at a glance.
 *
 * Icon-free by design: each stage is a node on a vertical rail —
 * filled = done, red = action needed, hollow = pending. Status reads
 * through colour + a dot + text, matching the portfolio's editorial
 * language (no glyphs).
 */

import { cn } from '@/lib/utils';
import { Eyebrow } from './PortfolioPrimitives';
import type { ACSignoffRecord } from '@/hooks/portfolio/useACSignoffs';

interface ACAuditTimelineProps {
  signoff?: ACSignoffRecord;
  /** Number of evidence items linked. Stays compatible with the existing acEvidenceMap. */
  evidenceCount: number;
  lastEvidenceAt?: string | null;
}

const fmt = (iso: string | null | undefined) => {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return null;
  }
};

interface Step {
  key: string;
  label: string;
  /** Short date — right-aligned, mono. */
  when?: string | null;
  /** Plain-language sub-line (instruction / context). */
  note?: string | null;
  /** Assessor/IQA narrative — italic. */
  detail?: string | null;
  state: 'done' | 'warn' | 'pending';
}

export function ACAuditTimeline({ signoff, evidenceCount, lastEvidenceAt }: ACAuditTimelineProps) {
  const steps: Step[] = [];

  // 1. Evidence
  if (evidenceCount > 0) {
    steps.push({
      key: 'evidence',
      label:
        evidenceCount === 1
          ? '1 piece of evidence captured'
          : `${evidenceCount} pieces of evidence captured`,
      when: fmt(lastEvidenceAt),
      state: 'done',
    });
  } else {
    steps.push({
      key: 'evidence',
      label: 'No evidence yet',
      note: 'Tap “Capture for this AC” to add a piece of work.',
      state: 'pending',
    });
  }

  // 2. Assessor verdict
  if (signoff?.assessorVerdict === 'passed') {
    steps.push({
      key: 'assessor',
      label: signoff.assessorName
        ? `Signed off by ${signoff.assessorName}`
        : 'Assessor signed off',
      when: fmt(signoff.assessorSignedAt),
      detail: signoff.assessorNarrative,
      state: 'done',
    });
  } else if (signoff?.assessorVerdict === 'referred') {
    steps.push({
      key: 'assessor',
      label: signoff.assessorName
        ? `Referred back by ${signoff.assessorName}`
        : 'Referred back by assessor',
      when: fmt(signoff.assessorSignedAt),
      detail: signoff.assessorNarrative || 'See assessor note.',
      state: 'warn',
    });
  } else if (signoff?.assessorVerdict === 'not_yet') {
    steps.push({
      key: 'assessor',
      label: signoff.assessorName
        ? `Marked “not yet” by ${signoff.assessorName}`
        : 'Marked “not yet” by assessor',
      when: fmt(signoff.assessorSignedAt),
      detail: signoff.assessorNarrative,
      state: 'warn',
    });
  } else {
    steps.push({
      key: 'assessor',
      label: 'Awaiting assessor sign-off',
      note:
        evidenceCount > 0
          ? 'Your evidence is queued for your assessor to review.'
          : 'Add evidence first; your assessor reviews after.',
      state: 'pending',
    });
  }

  // 3. IQA verdict
  if (signoff?.iqaVerdict === 'confirmed') {
    steps.push({
      key: 'iqa',
      label: signoff.iqaName ? `IQA confirmed by ${signoff.iqaName}` : 'IQA confirmed',
      when: fmt(signoff.iqaSampledAt),
      detail: signoff.iqaFeedback,
      state: 'done',
    });
  } else if (signoff?.iqaVerdict === 'returned') {
    steps.push({
      key: 'iqa',
      label: signoff.iqaName ? `IQA returned by ${signoff.iqaName}` : 'IQA returned',
      when: fmt(signoff.iqaSampledAt),
      detail: signoff.iqaFeedback,
      state: 'warn',
    });
  } else if (signoff?.assessorVerdict === 'passed') {
    // Sign-off complete but IQA not yet sampled
    steps.push({
      key: 'iqa',
      label: 'Awaiting IQA sample',
      note: 'Internal Quality Assurance samples a subset of signed-off ACs.',
      state: 'pending',
    });
  }

  return (
    <div className="space-y-2.5">
      <Eyebrow>Audit chain</Eyebrow>
      <ol>
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          const node =
            step.state === 'done'
              ? 'bg-elec-yellow border-elec-yellow'
              : step.state === 'warn'
                ? 'bg-red-400 border-red-400'
                : 'bg-transparent border-white/35';
          const card =
            step.state === 'done'
              ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
              : step.state === 'warn'
                ? 'border-red-500/40 bg-red-500/[0.07]'
                : 'border-white/[0.08] bg-white/[0.02]';

          return (
            <li key={step.key} className="flex gap-3">
              {/* Rail — dot node + connector */}
              <div className="flex flex-col items-center self-stretch">
                <span className={cn('w-3 h-3 rounded-full border-2 shrink-0 mt-[18px]', node)} />
                {!last && <span className="w-[2px] flex-1 bg-white/[0.10] my-1" />}
              </div>

              {/* Card */}
              <div className={cn('flex-1 min-w-0 rounded-xl border p-3.5 mb-2.5', card)}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13.5px] font-medium text-white leading-snug">{step.label}</p>
                  {step.when && (
                    <span className="text-[11px] text-white/55 font-mono tabular-nums shrink-0">
                      {step.when}
                    </span>
                  )}
                </div>
                {step.note && (
                  <p className="text-[12px] text-white/60 leading-snug mt-1">{step.note}</p>
                )}
                {step.detail && (
                  <p className="text-[12px] text-white/75 leading-relaxed italic mt-1.5 pl-2.5 border-l-2 border-white/10">
                    {step.detail}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

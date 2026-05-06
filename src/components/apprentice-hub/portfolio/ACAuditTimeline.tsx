/**
 * ACAuditTimeline
 *
 * Per-AC audit chain — evidence → assessor sign-off → IQA verdict.
 * Rendered inside the AC details bottom sheet so the apprentice (and
 * tutor & EPAO during a review) see the full provenance at a glance.
 *
 * The chain is the differentiator: most apprentice portfolios show
 * "evidenced or not". A best-in-class UK portfolio shows the audit
 * trail every party signed.
 */

import { CheckCircle2, AlertTriangle, FileCheck, ShieldCheck, Clock } from 'lucide-react';
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
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  meta?: string | null;
  detail?: string | null;
  state: 'done' | 'warn' | 'pending';
}

export function ACAuditTimeline({ signoff, evidenceCount, lastEvidenceAt }: ACAuditTimelineProps) {
  const steps: Step[] = [];

  // 1. Evidence
  if (evidenceCount > 0) {
    steps.push({
      key: 'evidence',
      icon: FileCheck,
      label:
        evidenceCount === 1
          ? '1 piece of evidence captured'
          : `${evidenceCount} pieces of evidence captured`,
      meta: fmt(lastEvidenceAt) ? `Last added ${fmt(lastEvidenceAt)}` : null,
      state: 'done',
    });
  } else {
    steps.push({
      key: 'evidence',
      icon: Clock,
      label: 'No evidence yet',
      meta: 'Tap "Capture for this AC" to add a piece of work.',
      state: 'pending',
    });
  }

  // 2. Assessor verdict
  if (signoff?.assessorVerdict === 'passed') {
    steps.push({
      key: 'assessor',
      icon: CheckCircle2,
      label: signoff.assessorName
        ? `Signed off by ${signoff.assessorName}`
        : 'Assessor signed off',
      meta: fmt(signoff.assessorSignedAt),
      detail: signoff.assessorNarrative,
      state: 'done',
    });
  } else if (signoff?.assessorVerdict === 'referred') {
    steps.push({
      key: 'assessor',
      icon: AlertTriangle,
      label: signoff.assessorName
        ? `Referred back by ${signoff.assessorName}`
        : 'Referred back by assessor',
      meta: fmt(signoff.assessorSignedAt),
      detail: signoff.assessorNarrative || 'See assessor note.',
      state: 'warn',
    });
  } else if (signoff?.assessorVerdict === 'not_yet') {
    steps.push({
      key: 'assessor',
      icon: Clock,
      label: signoff.assessorName
        ? `Marked "not yet" by ${signoff.assessorName}`
        : 'Marked "not yet" by assessor',
      meta: fmt(signoff.assessorSignedAt),
      detail: signoff.assessorNarrative,
      state: 'warn',
    });
  } else {
    steps.push({
      key: 'assessor',
      icon: Clock,
      label: 'Awaiting assessor sign-off',
      meta:
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
      icon: ShieldCheck,
      label: signoff.iqaName ? `IQA confirmed by ${signoff.iqaName}` : 'IQA confirmed',
      meta: fmt(signoff.iqaSampledAt),
      detail: signoff.iqaFeedback,
      state: 'done',
    });
  } else if (signoff?.iqaVerdict === 'returned') {
    steps.push({
      key: 'iqa',
      icon: AlertTriangle,
      label: signoff.iqaName
        ? `IQA returned by ${signoff.iqaName}`
        : 'IQA returned',
      meta: fmt(signoff.iqaSampledAt),
      detail: signoff.iqaFeedback,
      state: 'warn',
    });
  } else if (signoff?.assessorVerdict === 'passed') {
    // Sign-off complete but IQA not yet sampled
    steps.push({
      key: 'iqa',
      icon: Clock,
      label: 'Awaiting IQA sample',
      meta: 'Internal Quality Assurance samples a subset of signed-off ACs.',
      state: 'pending',
    });
  }

  return (
    <div className="space-y-3">
      <Eyebrow>Audit chain</Eyebrow>
      <ol className="relative space-y-3 pl-1">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const tone =
            step.state === 'done'
              ? 'border-elec-yellow/30 bg-elec-yellow/[0.06]'
              : step.state === 'warn'
                ? 'border-red-500/30 bg-red-500/[0.04]'
                : 'border-white/[0.06] bg-white/[0.02]';
          const iconTone =
            step.state === 'done'
              ? 'text-elec-yellow'
              : step.state === 'warn'
                ? 'text-red-300'
                : 'text-white/40';

          return (
            <li key={step.key} className="relative">
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[14px] top-[28px] bottom-[-12px] w-px bg-white/[0.06]"
                />
              )}
              <div className={cn('rounded-xl border p-3 sm:p-4', tone)}>
                <div className="flex items-start gap-3">
                  <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', iconTone)} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <p className="text-[13px] font-medium text-white leading-snug">
                        {step.label}
                      </p>
                      {step.meta && (
                        <span className="text-[11px] text-white/55 font-mono flex-shrink-0">
                          {step.meta}
                        </span>
                      )}
                    </div>
                    {step.detail && (
                      <p className="text-[12px] text-white/70 leading-relaxed italic">
                        {step.detail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

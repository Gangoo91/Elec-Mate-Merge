/**
 * FromCollegeCallout
 *
 * Surfaces tutor-side signals on the apprentice's portfolio workspace —
 * referrals (action-required), recent assessor sign-offs, IQA confirms,
 * unread tutor comments. Closes the loop without the apprentice having
 * to bounce to /apprentice/college-plan.
 *
 * Signals (priority order):
 *   1. Referrals      — assessor pushed an AC back; action required
 *   2. Action comments — unresolved tutor/assessor comments needing reply
 *   3. Recent confirms — assessor or IQA verdicts in the last 14 days (good news)
 *   4. Pending sign-offs — evidenced > 5 days ago, no verdict yet
 */

import { useMemo } from 'react';
import { AlertTriangle, MessageSquare, ShieldCheck, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eyebrow, SectionHeader } from './PortfolioPrimitives';
import type {
  ACSignoffRecord,
  ACComplianceState,
} from '@/hooks/portfolio/useACSignoffs';
import type { PortfolioComment } from '@/hooks/portfolio/usePortfolioComments';

interface FromCollegeCalloutProps {
  signoffRecords: Map<string, ACSignoffRecord>;
  comments: PortfolioComment[];
  onACClick?: (acRef: string, acText: string, unitCode: string) => void;
}

interface Signal {
  key: string;
  kind: 'referral' | 'comment' | 'confirm' | 'pending';
  title: string;
  meta: string;
  detail?: string;
  onClick?: () => void;
}

const DAYS = (n: number) => n * 24 * 60 * 60 * 1000;
const fmtDate = (iso?: string | null) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return '';
  }
};

export function FromCollegeCallout({
  signoffRecords,
  comments,
  onACClick,
}: FromCollegeCalloutProps) {
  const navigate = useNavigate();

  const signals = useMemo<Signal[]>(() => {
    const out: Signal[] = [];
    const now = Date.now();
    const seenKeys = new Set<string>();

    // 1. Referrals — assessor pushed back, action required
    for (const [key, r] of signoffRecords.entries()) {
      if (!key.includes(':')) continue;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      if (r.status === 'referred') {
        out.push({
          key: `ref-${key}`,
          kind: 'referral',
          title: `${r.unitCode} ${r.acCode} — referred back`,
          meta: r.assessorName
            ? `${r.assessorName} · ${fmtDate(r.assessorSignedAt)}`
            : fmtDate(r.assessorSignedAt),
          detail: r.assessorNarrative || 'Open the AC for the assessor note.',
          onClick: () =>
            onACClick?.(r.acCode, '', r.unitCode),
        });
      }
    }

    // 2. Action-required comments from tutors/assessors
    const actionable = comments
      .filter(
        (c) =>
          (c.authorRole === 'tutor' || c.authorRole === 'assessor') &&
          c.requiresAction &&
          !c.isResolved
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    for (const c of actionable) {
      out.push({
        key: `cmt-${c.id}`,
        kind: 'comment',
        title: `${c.authorName} — comment needs a reply`,
        meta: fmtDate(c.createdAt),
        detail: c.content.slice(0, 140),
      });
    }

    // 3. Recent confirms (good news) — last 14 days
    const recentConfirms: Array<Signal> = [];
    seenKeys.clear();
    for (const [key, r] of signoffRecords.entries()) {
      if (!key.includes(':')) continue;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      const stamp =
        r.iqaSampledAt || r.assessorSignedAt ? new Date(r.iqaSampledAt || r.assessorSignedAt!).getTime() : 0;
      if (!stamp) continue;
      if (now - stamp > DAYS(14)) continue;
      if (r.status === 'iqa_confirmed') {
        recentConfirms.push({
          key: `iqa-${key}`,
          kind: 'confirm',
          title: `${r.unitCode} ${r.acCode} — IQA confirmed`,
          meta: r.iqaName ? `${r.iqaName} · ${fmtDate(r.iqaSampledAt)}` : fmtDate(r.iqaSampledAt),
          detail: r.iqaFeedback || 'Locked in. Nice work.',
          onClick: () => onACClick?.(r.acCode, '', r.unitCode),
        });
      } else if (r.status === 'signed_off') {
        recentConfirms.push({
          key: `so-${key}`,
          kind: 'confirm',
          title: `${r.unitCode} ${r.acCode} — signed off`,
          meta: r.assessorName
            ? `${r.assessorName} · ${fmtDate(r.assessorSignedAt)}`
            : fmtDate(r.assessorSignedAt),
          detail: r.assessorNarrative || 'Awaiting IQA sample.',
          onClick: () => onACClick?.(r.acCode, '', r.unitCode),
        });
      }
    }
    out.push(...recentConfirms.slice(0, 3));

    // 4. Pending sign-offs — evidenced > 5 days, no verdict
    const pending: Signal[] = [];
    seenKeys.clear();
    for (const [key, r] of signoffRecords.entries()) {
      if (!key.includes(':')) continue;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      const status: ACComplianceState = r.status;
      if (status !== 'evidenced') continue;
      if (!r.lastEvidenceAt) continue;
      const stamp = new Date(r.lastEvidenceAt).getTime();
      if (now - stamp < DAYS(5)) continue;
      pending.push({
        key: `pend-${key}`,
        kind: 'pending',
        title: `${r.unitCode} ${r.acCode} — awaiting assessor`,
        meta: `Evidenced ${fmtDate(r.lastEvidenceAt)}`,
        detail: 'Has been waiting more than 5 days. Nudge your tutor if it stalls.',
        onClick: () => onACClick?.(r.acCode, '', r.unitCode),
      });
    }
    // Cap pending list to keep callout calm
    out.push(...pending.slice(0, 3));

    return out;
  }, [signoffRecords, comments, onACClick]);

  if (signals.length === 0) return null;

  // Quick aggregate counts for the header
  const counts = signals.reduce(
    (acc, s) => {
      acc[s.kind] = (acc[s.kind] || 0) + 1;
      return acc;
    },
    {} as Record<Signal['kind'], number>
  );

  return (
    <div className="space-y-3">
      <SectionHeader
        eyebrow="From your college"
        title="What's new from your tutors"
        meta={
          [
            counts.referral ? `${counts.referral} referred` : null,
            counts.comment ? `${counts.comment} reply needed` : null,
            counts.confirm ? `${counts.confirm} signed off recently` : null,
            counts.pending ? `${counts.pending} waiting` : null,
          ]
            .filter(Boolean)
            .join(' · ') || 'Live tutor activity'
        }
        action={
          <button
            type="button"
            onClick={() => navigate('/apprentice/college-plan')}
            className="text-[12px] text-elec-yellow font-medium touch-manipulation flex items-center gap-0.5"
          >
            College plan →
          </button>
        }
      />

      <ul className="space-y-2">
        {signals.map((s) => {
          const tone =
            s.kind === 'referral'
              ? 'border-red-500/30 bg-red-500/[0.04]'
              : s.kind === 'comment'
                ? 'border-elec-yellow/25 bg-elec-yellow/[0.03]'
                : s.kind === 'confirm'
                  ? 'border-elec-yellow/30 bg-elec-yellow/[0.05]'
                  : 'border-white/[0.06] bg-[hsl(0_0%_10%)]';
          const Icon =
            s.kind === 'referral'
              ? AlertTriangle
              : s.kind === 'comment'
                ? MessageSquare
                : s.kind === 'confirm'
                  ? ShieldCheck
                  : Clock;
          const iconTone =
            s.kind === 'referral'
              ? 'text-red-300'
              : s.kind === 'confirm'
                ? 'text-elec-yellow'
                : s.kind === 'comment'
                  ? 'text-elec-yellow/85'
                  : 'text-white/55';
          const Tag = s.onClick ? 'button' : 'div';
          return (
            <li key={s.key}>
              <Tag
                onClick={s.onClick}
                className={cn(
                  'w-full text-left rounded-xl border px-4 py-3 sm:px-5 sm:py-4 transition-colors',
                  tone,
                  s.onClick && 'hover:bg-white/[0.04] touch-manipulation'
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', iconTone)} />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <p className="text-[13px] font-medium text-white leading-snug">
                        {s.title}
                      </p>
                      {s.meta && (
                        <span className="text-[11px] text-white/55 font-mono flex-shrink-0">
                          {s.meta}
                        </span>
                      )}
                    </div>
                    {s.detail && (
                      <p className="text-[12px] text-white/70 leading-relaxed italic">
                        {s.detail}
                      </p>
                    )}
                  </div>
                  {s.onClick && (
                    <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0 self-center" />
                  )}
                </div>
              </Tag>
            </li>
          );
        })}
      </ul>

      <Eyebrow className="block text-center pt-1">
        Same data your tutor sees · realtime sync
      </Eyebrow>
    </div>
  );
}

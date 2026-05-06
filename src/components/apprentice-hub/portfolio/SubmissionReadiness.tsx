/**
 * SubmissionReadiness
 *
 * Compliance checklist that drives the apprentice toward an EPA-gateway-
 * ready portfolio. Each line shows a single requirement, the live status,
 * and a tap-through if there's an action.
 *
 * The 5 gates (UK ST0152 / typical EPAO):
 *   1. Coverage      — every AC has at least one piece of evidence
 *   2. Sign-off      — every AC signed off by an assessor (not_yet/refer count against)
 *   3. IQA sample    — IQA has confirmed at least 25% of signed-off ACs
 *   4. Currency      — all evidence < 12 months old
 *   5. Quality       — average evidence-quality grade B (≥70) or higher
 *
 * The checklist is the difference between "looks done" and "actually
 * submission-ready". Same data the assessor / IQA / EPAO see.
 */

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Eyebrow, SectionHeader } from './PortfolioPrimitives';
import type { PortfolioEntry } from '@/types/portfolio';
import type {
  ACSignoffRecord,
  ACComplianceState,
} from '@/hooks/portfolio/useACSignoffs';

const IQA_TARGET_PCT = 25; // typical sampling rate for distinction-grade EPAOs
const CURRENCY_DAYS = 365;
const QUALITY_PASS_SCORE = 70;

type Verdict = 'green' | 'amber' | 'red';

interface Gate {
  key: string;
  label: string;
  detail: string;
  verdict: Verdict;
  metric?: string;
}

interface SubmissionReadinessProps {
  qualificationCode: string | null;
  totalACs: number;
  evidencedCount: number;
  portfolioEntries: PortfolioEntry[];
  signoffRecords: Map<string, ACSignoffRecord>;
}

interface ValidationRow {
  overall_score: number | null;
  overall_grade: string | null;
}

export function SubmissionReadiness({
  qualificationCode,
  totalACs,
  evidencedCount,
  portfolioEntries,
  signoffRecords,
}: SubmissionReadinessProps) {
  const { user } = useAuth();
  const [validations, setValidations] = useState<ValidationRow[]>([]);

  // Pull average quality grade once
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase
          .from('evidence_quality_validations')
          .select('overall_score, overall_grade')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);
        if (!cancelled) setValidations((data || []) as ValidationRow[]);
      } catch {
        if (!cancelled) setValidations([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const gates = useMemo<Gate[]>(() => {
    const gateList: Gate[] = [];

    // 1. Coverage
    const coveragePct =
      totalACs > 0 ? Math.round((evidencedCount / totalACs) * 100) : 0;
    gateList.push({
      key: 'coverage',
      label: 'Every AC evidenced',
      detail:
        coveragePct >= 100
          ? 'All assessment criteria have at least one piece of evidence.'
          : coveragePct >= 70
            ? 'Most ACs covered — fill the gaps before requesting gateway.'
            : 'Significant ACs still missing evidence.',
      metric: `${evidencedCount}/${totalACs} · ${coveragePct}%`,
      verdict: coveragePct >= 100 ? 'green' : coveragePct >= 70 ? 'amber' : 'red',
    });

    // 2. Sign-off
    let signedCount = 0;
    let referredCount = 0;
    let notYetCount = 0;
    const seen = new Set<string>();
    for (const [key, r] of signoffRecords.entries()) {
      if (!key.includes(':')) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      const s: ACComplianceState = r.status;
      if (s === 'signed_off' || s === 'iqa_confirmed') signedCount++;
      else if (s === 'referred') referredCount++;
      else if (s === 'not_yet') notYetCount++;
    }
    const signedPct = totalACs > 0 ? Math.round((signedCount / totalACs) * 100) : 0;
    gateList.push({
      key: 'signoff',
      label: 'Assessor sign-off',
      detail:
        referredCount > 0
          ? `${referredCount} AC${referredCount === 1 ? ' is' : 's are'} referred — fix and resubmit.`
          : notYetCount > 0
            ? `${notYetCount} AC${notYetCount === 1 ? '' : 's'} marked "not yet" — keep working.`
            : signedPct >= 100
              ? 'Every AC carries an assessor verdict.'
              : 'Assessor still working through your evidence.',
      metric: `${signedCount}/${totalACs} · ${signedPct}%`,
      verdict:
        referredCount > 0
          ? 'red'
          : signedPct >= 100
            ? 'green'
            : signedPct >= 70
              ? 'amber'
              : 'red',
    });

    // 3. IQA
    let iqaCount = 0;
    for (const [key, r] of signoffRecords.entries()) {
      if (!key.includes(':')) continue;
      if (r.status === 'iqa_confirmed') iqaCount++;
    }
    const iqaPct =
      signedCount > 0 ? Math.round((iqaCount / signedCount) * 100) : 0;
    gateList.push({
      key: 'iqa',
      label: 'IQA sample',
      detail:
        signedCount === 0
          ? "Nothing's been signed off yet — IQA samples after sign-off."
          : iqaPct >= IQA_TARGET_PCT
            ? `IQA has confirmed ${iqaPct}% of your signed-off work.`
            : `IQA usually samples at least ${IQA_TARGET_PCT}% of signed-off ACs before gateway.`,
      metric:
        signedCount > 0
          ? `${iqaCount}/${signedCount} · ${iqaPct}%`
          : '—',
      verdict:
        signedCount === 0
          ? 'amber'
          : iqaPct >= IQA_TARGET_PCT
            ? 'green'
            : iqaPct >= 10
              ? 'amber'
              : 'red',
    });

    // 4. Currency
    const cutoff = Date.now() - CURRENCY_DAYS * 24 * 60 * 60 * 1000;
    let currentCount = 0;
    let expiringCount = 0;
    let expiredCount = 0;
    const ninety = Date.now() - (CURRENCY_DAYS - 90) * 24 * 60 * 60 * 1000;
    portfolioEntries.forEach((e) => {
      const t = new Date(e.dateCreated).getTime();
      if (isNaN(t)) return;
      if (t < cutoff) expiredCount++;
      else if (t < ninety) expiringCount++;
      else currentCount++;
    });
    gateList.push({
      key: 'currency',
      label: 'Evidence currency',
      detail:
        expiredCount > 0
          ? `${expiredCount} item${expiredCount === 1 ? '' : 's'} older than 12 months — refresh before submitting.`
          : expiringCount > 0
            ? `${expiringCount} item${expiringCount === 1 ? '' : 's'} expiring within 90 days.`
            : 'All evidence is within the 12-month window.',
      metric: `${currentCount} fresh · ${expiringCount} ageing · ${expiredCount} expired`,
      verdict: expiredCount > 0 ? 'red' : expiringCount > 0 ? 'amber' : 'green',
    });

    // 5. Quality
    const scored = validations.filter((v): v is { overall_score: number; overall_grade: string | null } =>
      typeof v.overall_score === 'number'
    );
    const avg =
      scored.length > 0
        ? Math.round(scored.reduce((s, v) => s + v.overall_score, 0) / scored.length)
        : null;
    gateList.push({
      key: 'quality',
      label: 'Evidence quality',
      detail:
        avg === null
          ? 'No quality validations run yet — use the AI evidence checker before submitting.'
          : avg >= QUALITY_PASS_SCORE
            ? `Average quality ${avg}/100 — meets the ${QUALITY_PASS_SCORE}+ pass threshold.`
            : `Average ${avg}/100 — assessors expect ≥ ${QUALITY_PASS_SCORE}.`,
      metric: avg === null ? '—' : `${avg}/100 · ${scored.length} graded`,
      verdict:
        avg === null
          ? 'amber'
          : avg >= QUALITY_PASS_SCORE
            ? 'green'
            : avg >= 50
              ? 'amber'
              : 'red',
    });

    return gateList;
  }, [totalACs, evidencedCount, portfolioEntries, signoffRecords, validations]);

  if (!qualificationCode || totalACs === 0) return null;

  const greens = gates.filter((g) => g.verdict === 'green').length;
  const allGreen = greens === gates.length;

  return (
    <div className="space-y-3">
      <SectionHeader
        eyebrow="Submission readiness"
        title={
          allGreen
            ? 'Gateway-ready'
            : `${greens}/${gates.length} gates passed`
        }
        meta={
          allGreen
            ? 'All compliance gates green — talk to your tutor about EPA booking.'
            : 'These are the gates EPAOs check — close them in order.'
        }
      />
      <ul className="space-y-2">
        {gates.map((g) => (
          <li
            key={g.key}
            className={cn(
              'rounded-xl border p-4 sm:p-5 space-y-2',
              g.verdict === 'green'
                ? 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
                : g.verdict === 'amber'
                  ? 'border-orange-400/25 bg-orange-400/[0.04]'
                  : 'border-red-500/30 bg-red-500/[0.04]'
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-2">
                {g.verdict === 'green' ? (
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow flex-shrink-0 self-center" />
                ) : g.verdict === 'amber' ? (
                  <Clock className="h-4 w-4 text-orange-300 flex-shrink-0 self-center" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0 self-center" />
                )}
                <span className="text-[14px] font-medium text-white">{g.label}</span>
              </div>
              {g.metric && (
                <span className="text-[11px] font-mono text-white/85 tabular-nums flex-shrink-0">
                  {g.metric}
                </span>
              )}
            </div>
            <p className="text-[12px] text-white/70 leading-relaxed pl-6">{g.detail}</p>
          </li>
        ))}
      </ul>
      <Eyebrow className="block text-center pt-1">
        EPAOs use these gates to decide gateway readiness. Same data your tutor sees.
      </Eyebrow>
    </div>
  );
}

/**
 * PortfolioNeedsYou — the portfolio's single answer to "what do I do next?".
 *
 * It replaces three panels that each answered that question their own way, in
 * two different columns, in three visual languages:
 *
 *   • MyProgressCheckCard   — tutor-side risk signals (no observations, no
 *                             OTJ logged, attendance gaps)
 *   • PortfolioAttentionPanel — stuck supervisor signatures, and evidence
 *                             ageing out of the 12-month currency window
 *   • TodaysFocusPanel      — which assessment criteria to capture next
 *
 * The data behind them is genuinely different. The apprentice's question is
 * not: they open this page asking one thing, and got nudged three times.
 *
 * Ranked by what it actually costs to ignore, not by which hook produced it:
 *
 *   1. Work a tutor has REFERRED BACK — already done, currently worth nothing
 *   2. A signature that is STUCK      — done, unsigned, and going stale
 *   3. Evidence EXPIRING              — will stop counting at gateway
 *   4. Programme-level GAPS           — no observations, no OTJ, attendance
 *   5. Criteria to CAPTURE next       — the ordinary work
 *
 * Items 1–4 are one-liners. Item 5 is the actual job, so the criterion text
 * becomes the row's title rather than being flattened away — that text is what
 * tells you what to go and do.
 */

import { useMemo, useState } from 'react';
import { HubWorkList, type HubWorkItem } from '@/components/hub/HubPrimitives';
import { useSupervisorVerification } from '@/hooks/portfolio/useSupervisorVerification';
import { useMyProgressCheck } from '@/hooks/useMyProgressCheck';
import { SupervisorVerificationQRSheet } from '@/components/portfolio-hub/SupervisorVerificationQRSheet';
import type { FocusAC } from '@/hooks/portfolio/usePortfolioFocus';
import type { PortfolioEntry } from '@/types/portfolio';
import type { ApprenticeHubTab } from '../ApprenticeHubNav';

const DAY = 24 * 60 * 60 * 1000;
const CURRENCY_DAYS = 365;
/** Start nudging this many days before evidence passes the 12-month window. */
const EXPIRING_WINDOW = 90;
/** A pending supervisor signature reads as "stuck" after this. */
const STALE_VERIFY_DAYS = 3;

/** Where the programme-level nudges send you. */
const ROUTE_BY_KEY: Record<string, string> = {
  otj_none: '/apprentice/ojt-hub',
  behind_pace: '/apprentice/ojt-hub',
  portfolio_empty: 'capture',
  portfolio_stale: 'capture',
  ac_velocity_zero: 'capture',
  no_observations: '/apprentice/college-plan',
  attendance_low: '/apprentice/college-plan',
  attendance_unknown: '/apprentice/college-plan',
  ilp_overdue: '/apprentice/college-plan',
};

interface Props {
  entries: PortfolioEntry[];
  /** Criteria ranked for capture, from usePortfolioFocus. */
  acFocus: FocusAC[];
  /** Criteria a tutor has sent back. */
  referredCount: number;
  onNavigate: (tab: ApprenticeHubTab) => void;
  onCapture: (ac: FocusAC) => void;
  onGoTo: (route: string) => void;
}

export function PortfolioNeedsYou({
  entries,
  acFocus,
  referredCount,
  onNavigate,
  onCapture,
  onGoTo,
}: Props) {
  const { verifications, getVerificationUrl } = useSupervisorVerification();
  const { focus: programmeFocus } = useMyProgressCheck();
  const [qrFor, setQrFor] = useState<string | null>(null);

  // Pending supervisor signatures, oldest first — the oldest is the one worth
  // chasing, so it is the one the row acts on.
  const pending = useMemo(() => {
    const now = Date.now();
    return verifications
      .filter((v) => v.is_active && !v.verified_at && new Date(v.expires_at).getTime() > now)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [verifications]);

  // Currency uses the date the WORK happened, not when it was uploaded —
  // matching the SubmissionReadiness gate so the two never disagree.
  const currency = useMemo(() => {
    const now = Date.now();
    let expired = 0;
    let expiring = 0;
    for (const e of entries) {
      const workDate = (e.metadata as { workDate?: string } | undefined)?.workDate;
      const t = new Date(workDate || e.dateCreated).getTime();
      if (isNaN(t)) continue;
      const ageDays = (now - t) / DAY;
      if (ageDays >= CURRENCY_DAYS) expired++;
      else if (ageDays >= CURRENCY_DAYS - EXPIRING_WINDOW) expiring++;
    }
    return { expired, expiring };
  }, [entries]);

  const items = useMemo(() => {
    const list: HubWorkItem[] = [];
    const oldest = pending[0];
    const oldestDays = oldest
      ? Math.floor((Date.now() - new Date(oldest.created_at).getTime()) / DAY)
      : 0;

    // 1 — referred back. Work already done that currently counts for nothing.
    if (referredCount > 0) {
      list.push({
        id: 'referred',
        title: `${referredCount} ${referredCount === 1 ? 'criterion' : 'criteria'} sent back`,
        reason: 'Your tutor wants changes before these count',
        trailing: 'Fix',
        urgent: true,
        onClick: () => onNavigate('work'),
      });
    }

    // 2 — a signature that has gone stale.
    if (pending.length > 0) {
      list.push({
        id: 'verify',
        title:
          pending.length === 1
            ? 'A supervisor signature is outstanding'
            : `${pending.length} supervisor signatures outstanding`,
        reason:
          oldestDays >= STALE_VERIFY_DAYS
            ? `The oldest has been waiting ${oldestDays} days — re-share the link`
            : 'Sent and waiting to be signed',
        trailing: `${oldestDays}d`,
        urgent: oldestDays >= STALE_VERIFY_DAYS,
        onClick: () => setQrFor(oldest.id),
      });
    }

    // 3 — evidence ageing out of the 12-month window.
    if (currency.expired > 0 || currency.expiring > 0) {
      const expired = currency.expired > 0;
      list.push({
        id: 'currency',
        title: expired
          ? `${currency.expired} ${currency.expired === 1 ? 'item is' : 'items are'} over 12 months old`
          : `${currency.expiring} ${currency.expiring === 1 ? 'item' : 'items'} nearing 12 months`,
        reason: expired
          ? 'Past the currency window — refresh before your gateway'
          : 'Will stop counting within 90 days',
        trailing: expired ? `${currency.expired}` : `${currency.expiring}`,
        urgent: expired,
        onClick: () => onNavigate('work'),
      });
    }

    // 4 — programme-level gaps from the college side.
    for (const [i, f] of programmeFocus.entries()) {
      const route = (f.key && ROUTE_BY_KEY[f.key]) || '/apprentice/college-plan';
      list.push({
        id: `programme-${f.key ?? i}`,
        title: f.label,
        reason: f.detail || 'Worth clearing before it builds up',
        onClick: () => onGoTo(route),
      });
    }

    // 5 — the ordinary work. The criterion text IS the row, because that is
    // what tells you what to go and photograph.
    for (const ac of acFocus.slice(0, 3)) {
      list.push({
        id: `ac-${ac.acFullRef}`,
        title: ac.acText,
        reason: `${ac.acRef} · Unit ${ac.unitCode} — ${ac.reason}`,
        trailing: 'Capture',
        urgent: ac.reasonKind === 'referred',
        onClick: () => onCapture(ac),
      });
    }

    return list;
  }, [
    referredCount,
    pending,
    currency,
    programmeFocus,
    acFocus,
    onNavigate,
    onCapture,
    onGoTo,
  ]);

  const qrVerification = qrFor ? (verifications.find((v) => v.id === qrFor) ?? null) : null;
  const qrTitle =
    (qrVerification?.evidence_snapshot?.title as string | undefined) ??
    (qrVerification
      ? entries.find((e) => e.id === qrVerification.portfolio_item_id)?.title
      : undefined) ??
    'Evidence';

  return (
    <>
      {/* Renders nothing when there is nothing to do — a short page on a good
          day is the reward for staying on top of it. */}
      <HubWorkList label="Needs you" items={items} unit="thing" visible={6} />

      {qrVerification && (
        <SupervisorVerificationQRSheet
          open={!!qrFor}
          onOpenChange={(o) => {
            if (!o) setQrFor(null);
          }}
          verification={qrVerification}
          verificationUrl={getVerificationUrl(qrVerification.verification_token)}
          evidenceTitle={qrTitle}
        />
      )}
    </>
  );
}

export default PortfolioNeedsYou;

/**
 * PortfolioAttentionPanel
 *
 * Two apprentice-side "do this now" nudges on the portfolio home:
 *   • Chase stuck supervisor verifications (pending, oldest highlighted) with
 *     one-tap re-share of the signing link.
 *   • Refresh evidence that's ageing out of the 12-month currency window
 *     before it counts against the gateway.
 *
 * Icon-free editorial — status reads through colour + text only. Self-hides
 * when there's nothing to action.
 */

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useSupervisorVerification } from '@/hooks/portfolio/useSupervisorVerification';
import { SupervisorVerificationQRSheet } from '@/components/portfolio-hub/SupervisorVerificationQRSheet';
import type { PortfolioEntry } from '@/types/portfolio';
import type { ApprenticeHubTab } from '../ApprenticeHubNav';

const DAY = 24 * 60 * 60 * 1000;
const CURRENCY_DAYS = 365;
const EXPIRING_WINDOW = 90; // days before expiry to start nudging
const STALE_VERIFY_DAYS = 3; // a pending verification reads as "stuck" after this

interface Props {
  entries: PortfolioEntry[];
  onNavigate: (tab: ApprenticeHubTab) => void;
}

export function PortfolioAttentionPanel({ entries, onNavigate }: Props) {
  const { verifications, getVerificationUrl } = useSupervisorVerification();
  const [qrFor, setQrFor] = useState<string | null>(null);

  // A — pending supervisor verifications, oldest first
  const pending = useMemo(() => {
    const now = Date.now();
    return verifications
      .filter((v) => v.is_active && !v.verified_at && new Date(v.expires_at).getTime() > now)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [verifications]);

  const oldestPending = pending[0];
  const oldestPendingDays = oldestPending
    ? Math.floor((Date.now() - new Date(oldestPending.created_at).getTime()) / DAY)
    : 0;

  // B — evidence currency (matches the SubmissionReadiness gate window)
  const currency = useMemo(() => {
    const now = Date.now();
    let expired = 0;
    let expiring = 0;
    for (const e of entries) {
      // Currency is the age of the WORK, so prefer the recorded work date.
      const workDate = (e.metadata as { workDate?: string } | undefined)?.workDate;
      const t = new Date(workDate || e.dateCreated).getTime();
      if (isNaN(t)) continue;
      const ageDays = (now - t) / DAY;
      if (ageDays >= CURRENCY_DAYS) expired++;
      else if (ageDays >= CURRENCY_DAYS - EXPIRING_WINDOW) expiring++;
    }
    return { expired, expiring };
  }, [entries]);

  const showVerify = pending.length > 0;
  const showCurrency = currency.expired > 0 || currency.expiring > 0;
  if (!showVerify && !showCurrency) return null;

  const qrVerification = qrFor ? (verifications.find((v) => v.id === qrFor) ?? null) : null;
  const qrTitle =
    (qrVerification?.evidence_snapshot?.title as string | undefined) ??
    (qrVerification
      ? entries.find((e) => e.id === qrVerification.portfolio_item_id)?.title
      : undefined) ??
    'Evidence';

  return (
    <div className="space-y-2.5">
      {/* A — chase stuck verifications */}
      {showVerify && (
        <div
          className={cn(
            'rounded-xl border p-4 space-y-1.5',
            oldestPendingDays >= STALE_VERIFY_DAYS
              ? 'border-orange-400/40 bg-orange-400/[0.08]'
              : 'border-white/[0.08] bg-white/[0.02]'
          )}
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-orange-200/85">
              {pending.length === 1 ? 'Verification pending' : `Verifications pending · ${pending.length}`}
            </span>
            <span className="text-[11px] font-mono tabular-nums text-white/60">
              oldest {oldestPendingDays}d
            </span>
          </div>
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            {pending.length === 1
              ? `Your supervisor hasn't signed this off yet${oldestPendingDays >= STALE_VERIFY_DAYS ? ` — it's been ${oldestPendingDays} days` : ''}.`
              : `${pending.length} pieces are waiting on a supervisor signature${oldestPendingDays >= STALE_VERIFY_DAYS ? `, the oldest ${oldestPendingDays} days` : ''}.`}
          </p>
          <button
            onClick={() => setQrFor(oldestPending.id)}
            className="text-[12px] font-semibold text-orange-200 underline underline-offset-2 touch-manipulation"
          >
            Re-share the link →
          </button>
        </div>
      )}

      {/* B — evidence currency */}
      {showCurrency && (
        <div
          className={cn(
            'rounded-xl border p-4 space-y-1.5',
            currency.expired > 0
              ? 'border-red-500/40 bg-red-500/[0.08]'
              : 'border-amber-400/35 bg-amber-400/[0.07]'
          )}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-amber-200/85">
            Evidence currency
          </span>
          <p className="text-[12.5px] text-white/85 leading-relaxed">
            {currency.expired > 0
              ? `${currency.expired} item${currency.expired === 1 ? '' : 's'} ${currency.expired === 1 ? 'is' : 'are'} older than 12 months — refresh ${currency.expired === 1 ? 'it' : 'them'} before your gateway.`
              : `${currency.expiring} item${currency.expiring === 1 ? '' : 's'} will pass the 12-month window within 90 days.`}
          </p>
          <button
            onClick={() => onNavigate('work')}
            className="text-[12px] font-semibold text-amber-200 underline underline-offset-2 touch-manipulation"
          >
            Review evidence →
          </button>
        </div>
      )}

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
    </div>
  );
}

export default PortfolioAttentionPanel;

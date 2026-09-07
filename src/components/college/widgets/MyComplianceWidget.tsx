import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { useMyComplianceSummary } from '@/hooks/useMyComplianceSummary';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';

/* ==========================================================================
   MyComplianceWidget — personal compliance card for the College home.
   Auto-scoped to the logged-in user via college_staff.user_id. The whole
   card is the button and opens the shared StaffComplianceDrawer in place,
   so tutors never leave home to manage their own DBS / qualifications / CPD.

   Hub card language: CARD_NEUTRAL (it is tappable), 15px volt title, the
   state word on the right, a figure row divided by hairlines. Red is kept
   for one thing only — an expired record, which is a real problem. The old
   red / amber / purple / blue / emerald borders, ring and cells are gone.
   ========================================================================== */

const CARD_BUTTON = cn(
  // flex-col, not block: a <button> centres its content vertically, so when
  // the grid stretched this card to match a taller neighbour the whole body
  // floated to the middle with dead space above and below. Top-aligned, with
  // the footer pinned to the bottom edge.
  'group flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-colors touch-manipulation',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
  CARD_NEUTRAL
);

export function MyComplianceWidget() {
  const { summary, loading, linked } = useMyComplianceSummary();
  const [open, setOpen] = useState(false);

  if (linked === false) return null; // user not linked to a college_staff row
  if (loading || !summary) return <Skeleton />;

  // No applicable requirements — say so instead of a misleading "0/0 · 0%".
  if (summary.totals.total === 0) {
    return (
      <>
        <button type="button" onClick={() => setOpen(true)} className={CARD_BUTTON}>
          <div className="px-4 py-3.5 sm:px-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
              Your compliance
            </h3>
          </div>
          <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-relaxed text-white sm:px-5">
            No statutory or training requirements are mapped to your role yet. Open the vault to log
            CPD or upload qualifications.
          </p>
          <span className="flex h-11 items-center justify-end border-t border-white/[0.10] px-4 text-[12px] font-bold text-elec-yellow sm:px-5">
            Open vault
          </span>
        </button>
        <StaffComplianceDrawer open={open} onOpenChange={setOpen} staffId={summary.staffId} />
      </>
    );
  }

  const { name, totals, percent, needsAction, awaitingVerification, nextExpiry } = summary;
  // Setup-pending = no evidence anywhere yet (everything missing).
  const allMissing =
    totals.total > 0 &&
    totals.valid === 0 &&
    totals.expiring === 0 &&
    totals.expired === 0 &&
    totals.missing === totals.total;
  const hasExpired = totals.expired > 0;
  const headlineLabel = needsAction
    ? hasExpired
      ? 'Action needed'
      : 'Setup pending'
    : awaitingVerification
      ? 'Awaiting DSL verification'
      : totals.expiring > 0
        ? 'Up to date · expiry soon'
        : 'All in date';

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={CARD_BUTTON}>
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Your compliance
          </h3>
          <span
            className={cn(
              'shrink-0 text-[11px] font-semibold',
              hasExpired ? 'text-red-300' : 'text-white'
            )}
          >
            {headlineLabel}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold leading-tight text-white">
              {name}
            </div>
            <div className="mt-0.5 text-[12px] leading-snug text-white">
              {allMissing ? (
                `${totals.missing} document${totals.missing === 1 ? '' : 's'} to upload — DBS, ID, qualifications.`
              ) : nextExpiry && totals.expiring > 0 ? (
                <>
                  Next expiry{' '}
                  <span className="font-semibold text-elec-yellow">{formatExpiry(nextExpiry)}</span>
                </>
              ) : needsAction ? (
                'Open the vault to upload missing evidence.'
              ) : (
                'Fully covered — keep CPD ticking over.'
              )}
            </div>
          </div>
          <Ring percent={percent} bad={hasExpired} />
        </div>

        {!allMissing && (
          <div
            className={cn(
              'grid divide-x divide-white/[0.10] border-t border-white/[0.10]',
              totals.pending_verification > 0 ? 'grid-cols-5' : 'grid-cols-4'
            )}
          >
            <Cell value={totals.valid + totals.expiring} label="In date" />
            <Cell value={totals.expiring} label="Expiring" />
            <Cell value={totals.expired} label="Expired" bad={hasExpired} />
            <Cell value={totals.missing} label="Missing" />
            {totals.pending_verification > 0 && (
              <Cell value={totals.pending_verification} label="Pending" />
            )}
          </div>
        )}

        <span className="mt-auto flex h-11 items-center justify-end border-t border-white/[0.10] px-4 text-[12px] font-bold text-elec-yellow sm:px-5">
          {allMissing ? 'Upload' : 'Open vault'}
        </span>
      </button>

      <StaffComplianceDrawer open={open} onOpenChange={setOpen} staffId={summary.staffId} />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function Ring({ percent, bad }: { percent: number; bad: boolean }) {
  const size = 52;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, percent)) / 100);
  return (
    <span
      aria-hidden
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="fill-none stroke-white/[0.10]"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={cn('fill-none transition-all', bad ? 'stroke-red-400' : 'stroke-white')}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold tabular-nums text-white">
        {percent}
      </span>
    </span>
  );
}

function Cell({ value, label, bad = false }: { value: number; label: string; bad?: boolean }) {
  return (
    <div className="px-3 py-3">
      <div
        className={cn(
          'text-[18px] font-semibold leading-none tabular-nums',
          bad && value > 0 ? 'text-red-300' : 'text-white'
        )}
      >
        {value}
      </div>
      <div className="mt-1 text-[11px] text-white">{label}</div>
    </div>
  );
}

function formatExpiry(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const days = Math.round((d.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days <= 60) return `in ${days}d`;
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

function Skeleton() {
  return (
    <section
      className={cn(
        'animate-pulse overflow-hidden rounded-2xl border border-elec-yellow/35',
        CARD_SURFACE
      )}
    >
      <div className="px-4 py-3.5 sm:px-5">
        <div className="h-4 w-32 rounded bg-white/[0.10]" />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-1/3 rounded bg-white/[0.10]" />
          <div className="h-2.5 w-1/2 rounded bg-white/[0.10]" />
        </div>
        <div className="h-[52px] w-[52px] rounded-full bg-white/[0.10]" />
      </div>
    </section>
  );
}

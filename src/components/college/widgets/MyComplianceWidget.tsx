import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useMyComplianceSummary } from '@/hooks/useMyComplianceSummary';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';

/* ==========================================================================
   MyComplianceWidget — personal compliance card for the College home.
   Auto-scoped to the logged-in user via college_staff.user_id. Opens the
   shared StaffComplianceDrawer in-place so tutors never leave home to
   manage their own DBS / qualifications / CPD.
   ========================================================================== */

export function MyComplianceWidget() {
  const { summary, loading, linked } = useMyComplianceSummary();
  const [open, setOpen] = useState(false);

  if (linked === false) return null; // user not linked to a college_staff row
  if (loading || !summary) return <Skeleton />;

  // No applicable requirements — show a friendly null-state instead of a
  // misleading "0/0 in date · 0%" donut.
  if (summary.totals.total === 0) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 hover:bg-[hsl(0_0%_14%)] active:bg-[hsl(0_0%_16%)] hover:border-white/[0.12] transition-colors touch-manipulation"
        >
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Your compliance
          </div>
          <div className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight truncate">
            {summary.name.split(' ')[0]}, your vault
          </div>
          <p className="mt-2 text-[12.5px] text-white/65 leading-relaxed max-w-prose">
            No statutory or training requirements are mapped to your role yet. Open the vault to log
            CPD or upload qualifications.
          </p>
          <span className="mt-3 inline-flex text-[12px] font-medium text-white/55 group-hover:text-white transition-colors">
            Open vault →
          </span>
        </button>
        <StaffComplianceDrawer open={open} onOpenChange={setOpen} staffId={summary.staffId} />
      </>
    );
  }

  const { name, totals, percent, needsAction, awaitingVerification, nextExpiry } = summary;
  const tone = needsAction
    ? totals.expired > 0
      ? ('red' as const)
      : ('blue' as const)
    : awaitingVerification
      ? ('purple' as const)
      : totals.expiring > 0
        ? ('amber' as const)
        : ('emerald' as const);
  const headlineLabel = needsAction
    ? totals.expired > 0
      ? 'Action needed'
      : 'Setup pending'
    : awaitingVerification
      ? 'Awaiting DSL verification'
      : totals.expiring > 0
        ? 'Up to date · expiry soon'
        : 'All in date';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group w-full text-left bg-[hsl(0_0%_12%)] border rounded-2xl px-5 py-5 transition-colors touch-manipulation',
          'hover:bg-[hsl(0_0%_14%)] active:bg-[hsl(0_0%_16%)]',
          tone === 'red'
            ? 'border-red-500/25 hover:border-red-500/40'
            : tone === 'amber'
              ? 'border-amber-500/25 hover:border-amber-500/40'
              : tone === 'blue'
                ? 'border-blue-500/25 hover:border-blue-500/40'
                : tone === 'purple'
                  ? 'border-purple-500/25 hover:border-purple-500/40'
                  : 'border-emerald-500/25 hover:border-emerald-500/40'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Your compliance
            </div>
            <div className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight truncate">
              {name.split(' ')[0]}, your vault
            </div>
            <div
              className={cn(
                'mt-1 text-[12.5px] font-medium',
                tone === 'red'
                  ? 'text-red-300'
                  : tone === 'amber'
                    ? 'text-amber-300'
                    : tone === 'blue'
                      ? 'text-blue-300'
                      : tone === 'purple'
                        ? 'text-purple-300'
                        : 'text-emerald-300'
              )}
            >
              {headlineLabel}
            </div>
          </div>
          <Ring percent={percent} tone={tone} />
        </div>

        <div
          className={cn(
            'mt-4 grid gap-px bg-white/[0.04] border border-white/[0.06] rounded-xl overflow-hidden',
            totals.pending_verification > 0
              ? 'grid-cols-2 sm:grid-cols-5'
              : 'grid-cols-2 sm:grid-cols-4'
          )}
        >
          <Cell value={totals.valid + totals.expiring} label="In date" tone="emerald" />
          <Cell value={totals.expiring} label="Expiring" tone="amber" />
          <Cell value={totals.expired} label="Expired" tone="red" />
          <Cell value={totals.missing} label="Missing" tone="blue" />
          {totals.pending_verification > 0 && (
            <Cell value={totals.pending_verification} label="Pending" tone="purple" />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-[11.5px]">
          <div className="text-white/65 truncate">
            {nextExpiry && totals.expiring > 0 ? (
              <>
                <span className="text-white/45">Next expiry: </span>
                <span className="text-amber-300 font-medium">{formatExpiry(nextExpiry)}</span>
              </>
            ) : needsAction ? (
              <span>Open vault to upload missing evidence.</span>
            ) : (
              <span>You're fully covered — keep CPD ticking over.</span>
            )}
          </div>
          <span className="shrink-0 text-[12px] font-medium text-white/55 group-hover:text-white transition-colors">
            Open →
          </span>
        </div>
      </button>

      <StaffComplianceDrawer open={open} onOpenChange={setOpen} staffId={summary.staffId} />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function Ring({
  percent,
  tone,
}: {
  percent: number;
  tone: 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
}) {
  const size = 56;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, percent)) / 100);
  const ringClass =
    tone === 'red'
      ? 'stroke-red-400'
      : tone === 'amber'
        ? 'stroke-amber-400'
        : tone === 'blue'
          ? 'stroke-blue-400'
          : tone === 'purple'
            ? 'stroke-purple-400'
            : 'stroke-emerald-400';
  return (
    <span
      aria-hidden
      className="relative shrink-0 inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="stroke-white/[0.08] fill-none"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={cn('fill-none transition-all', ringClass)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-white tabular-nums">
        {percent}
      </span>
    </span>
  );
}

function Cell({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: 'emerald' | 'amber' | 'red' | 'blue' | 'purple';
}) {
  const valueClass =
    value === 0
      ? 'text-white/45'
      : tone === 'red'
        ? 'text-red-300'
        : tone === 'amber'
          ? 'text-amber-300'
          : tone === 'blue'
            ? 'text-blue-300'
            : tone === 'purple'
              ? 'text-purple-300'
              : 'text-emerald-300';
  return (
    <div className="bg-[hsl(0_0%_10%)] px-3 py-3">
      <div className={cn('text-[18px] font-semibold tabular-nums leading-none', valueClass)}>
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</div>
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
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-2 w-24 bg-white/[0.06] rounded" />
          <div className="h-5 w-2/3 bg-white/[0.06] rounded" />
          <div className="h-3 w-1/3 bg-white/[0.04] rounded" />
        </div>
        <div className="h-14 w-14 rounded-full bg-white/[0.06]" />
      </div>
      <div className="mt-4 h-12 bg-white/[0.04] rounded-xl" />
    </div>
  );
}

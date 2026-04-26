import { useNavigate } from 'react-router-dom';
import { Sparkles, Inbox, ShieldCheck, AlertTriangle, CalendarX, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCollegeDailyDigest } from '@/hooks/useCollegeDailyDigest';

/* ==========================================================================
   DailyDigestCard — what's-new-since-last-login summary on the College Hub.
   Four counts, each clickable and routing to the relevant view.
   ========================================================================== */

export function DailyDigestCard() {
  const navigate = useNavigate();
  const d = useCollegeDailyDigest();

  if (d.loading) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4 animate-pulse h-[88px]" />
    );
  }

  if (!d.collegeId) return null;

  if (d.total === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/[0.18] bg-emerald-500/[0.04] px-5 py-4 flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-emerald-300 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
            All caught up
          </div>
          <p className="mt-0.5 text-[12px] text-white/85">
            No portfolio backlog, no pending verdicts, no attendance dips, no fresh flags.
          </p>
        </div>
      </div>
    );
  }

  // Any tile click counts as "seen" — they've engaged with the digest.
  const handleTileClick = (target: string) => {
    d.markSeen();
    navigate(target);
  };

  // Surface "since last viewed" if we have a prior timestamp
  const sinceLabel = d.lastSeenAt
    ? `since you last looked · ${formatRelative(d.lastSeenAt)}`
    : 'so far today';

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            What's new
          </div>
          <span className="text-[10px] text-white/45 normal-case tracking-normal">{sinceLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/45 tabular-nums">
            {d.total} item{d.total === 1 ? '' : 's'}
          </span>
          <button
            type="button"
            onClick={() => d.markSeen()}
            className="inline-flex items-center gap-1 h-6 px-2 rounded-full bg-white/[0.04] border border-white/[0.10] text-[10.5px] text-white/65 hover:text-white hover:bg-white/[0.08] touch-manipulation"
            title="Mark this digest as seen"
          >
            <Check className="h-3 w-3" />
            Mark seen
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <Tile
          icon={<Inbox className="h-3.5 w-3.5 text-blue-300" />}
          label="Portfolio awaiting review"
          value={d.awaitingReview}
          onClick={() => handleTileClick('/college/students')}
          tone="blue"
        />
        <Tile
          icon={<ShieldCheck className="h-3.5 w-3.5 text-elec-yellow" />}
          label="EPA verdicts ready to co-sign"
          value={d.awaitingCoSign}
          onClick={() => handleTileClick('/college/epa')}
          tone="yellow"
        />
        <Tile
          icon={<CalendarX className="h-3.5 w-3.5 text-amber-300" />}
          label="Attendance dips this week"
          value={d.attendanceDips}
          onClick={() => handleTileClick('/college/students')}
          tone="amber"
        />
        <Tile
          icon={<AlertTriangle className="h-3.5 w-3.5 text-red-300" />}
          label="New flags in 24h"
          value={d.newFlags}
          onClick={() => handleTileClick('/college/students')}
          tone="red"
        />
      </div>
    </div>
  );
}

function formatRelative(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const mins = Math.floor((now.getTime() - d.getTime()) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

function Tile({
  icon,
  label,
  value,
  onClick,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onClick: () => void;
  tone: 'blue' | 'yellow' | 'amber' | 'red';
}) {
  const empty = value === 0;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={empty}
      className={cn(
        'flex flex-col items-start gap-2 px-5 py-4 text-left border-r border-b border-white/[0.04] last:border-r-0 transition-colors touch-manipulation',
        empty ? 'cursor-default opacity-55' : 'hover:bg-white/[0.03]'
      )}
    >
      <div className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          'text-[28px] font-semibold tabular-nums leading-none',
          empty
            ? 'text-white/35'
            : tone === 'blue'
              ? 'text-blue-300'
              : tone === 'yellow'
                ? 'text-elec-yellow'
                : tone === 'amber'
                  ? 'text-amber-300'
                  : 'text-red-300'
        )}
      >
        {value}
      </div>
    </button>
  );
}

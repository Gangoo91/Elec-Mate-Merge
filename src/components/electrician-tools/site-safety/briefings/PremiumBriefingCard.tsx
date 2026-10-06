/**
 * The two briefing rows on the Team Briefings list — one for work outstanding,
 * one for work finished.
 *
 * Both were `bg-[#1e1e1e]` with an icon tile, and both ended in a row of
 * equal-weight buttons in three different accent colours: blue "View", yellow
 * "Share", purple "PDF" on the history card; blue/blue/yellow on the template
 * card. Three colours across three buttons is three primary actions, which is
 * none — the eye has nothing to land on. They now carry the app's card material
 * (`CARD_SURFACE` + a volt hairline); the whole card opens the briefing, and
 * the only extra control (Share, on finished briefings) is a quiet outline.
 *
 * Status is a word on a neutral surface rather than a tinted wash. A coloured
 * fill behind a label is the app's signal for a *selected* control or a binary
 * safety verdict; spending it on "Scheduled" leaves nothing louder for the
 * things that actually need acting on.
 *
 * `TemplateCard` used to live here too. Nothing imported it — the templates tab
 * renders its own ruled list from `briefing_templates` — so it was 100 lines of
 * unreachable UI carrying the same three-colour button wall.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

type BriefingStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'draft';

interface BriefingHistory {
  id: string;
  name: string;
  location: string;
  date: string;
  time?: string;
  attendeeCount: number;
  status: BriefingStatus;
  signedCount?: number;
  icon?: string;
}

/** Neutral surface, coloured text. The label carries the meaning, not the fill. */
const statusConfig: Record<BriefingStatus, { text: string; label: string }> = {
  scheduled: { text: 'text-white', label: 'Scheduled' },
  in_progress: { text: 'text-amber-400', label: 'In progress' },
  completed: { text: 'text-emerald-400', label: 'Completed' },
  cancelled: { text: 'text-red-400', label: 'Cancelled' },
  draft: { text: 'text-white', label: 'Draft' },
};

const cardCn = cn(
  'relative overflow-hidden rounded-2xl border border-elec-yellow/35',
  CARD_SURFACE,
  'transition-[background-image,border-color,transform] duration-150 ease-out',
  'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]'
);

/**
 * The tappable body of a row. The whole card opens the briefing: a list of
 * seven briefings used to carry seven full-width yellow "Continue briefing"
 * buttons, so the screen was a wall of identical primary actions and the
 * names, places and signature counts were the quiet part.
 */
const openAreaCn = cn(
  'block w-full p-4 text-left touch-manipulation',
  'transition-[background-color] duration-150 active:bg-white/[0.04]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
);

const quietBtn = cn(
  'flex h-11 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] px-4',
  'text-[14px] font-medium text-white touch-manipulation',
  'transition-[background-color,transform] duration-150 active:scale-[0.97] active:bg-white/[0.12]'
);

/** "08:00:00" -> "08:00". Postgres `time` comes back with seconds nobody needs. */
const shortTime = (t?: string) => (t ? t.slice(0, 5) : '');

/** One reading line: when, then who has signed. An empty register says so. */
function factsLine(b: BriefingHistory, signed: number) {
  const when = [b.date, shortTime(b.time)].filter(Boolean).join(' · ');
  const register =
    b.attendeeCount === 0 ? 'No one on the register yet' : `${signed} of ${b.attendeeCount} signed`;
  return `${when} · ${register}`;
}

function ChevronRight() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="mt-1 h-4 w-4 shrink-0 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RegisterBar({ signed, total, done }: { signed: number; total: number; done: boolean }) {
  if (total <= 0) return null;
  return (
    <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(signed / total) * 100}%` }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className={cn('h-full rounded-full', done ? 'bg-elec-yellow' : 'bg-amber-400')}
      />
    </div>
  );
}

// ─── Completed / recent briefings ───────────────────────────────────────────

interface HistoryCardProps {
  briefing: BriefingHistory;
  onView?: () => void;
  onShare?: () => void;
  index?: number;
}

export function HistoryCard({ briefing, onView, onShare, index = 0 }: HistoryCardProps) {
  const status = statusConfig[briefing.status] || statusConfig.draft;
  const signed = briefing.signedCount ?? 0;
  const fullySigned = briefing.attendeeCount > 0 && signed === briefing.attendeeCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22 }}
      className={cardCn}
    >
      <button
        type="button"
        onClick={onView}
        disabled={!onView}
        aria-label={`Open briefing: ${briefing.name}`}
        className={openAreaCn}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white">
              {briefing.name}
            </h3>
            {briefing.location && (
              <p className="mt-0.5 truncate text-[13px] text-white">{briefing.location}</p>
            )}
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1',
              'text-[11px] font-medium',
              status.text
            )}
          >
            {status.label}
          </span>
          {onView && <ChevronRight />}
        </div>

        <p className="mt-3 border-t border-white/[0.1] pt-3 text-[13px] tabular-nums text-white">
          {factsLine(briefing, signed)}
        </p>
        <RegisterBar signed={signed} total={briefing.attendeeCount} done={fullySigned} />
      </button>

      {onShare && (
        <div className="flex justify-end px-4 pb-4">
          <button type="button" onClick={onShare} className={quietBtn}>
            Share signing link
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Briefings still waiting on signatures ──────────────────────────────────

interface PendingCardProps {
  briefing: BriefingHistory;
  onContinue?: () => void;
  index?: number;
}

export function PendingCard({ briefing, onContinue, index = 0 }: PendingCardProps) {
  const signed = briefing.signedCount ?? 0;
  const pendingCount = Math.max(briefing.attendeeCount - signed, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22 }}
      className={cardCn}
    >
      <button
        type="button"
        onClick={onContinue}
        disabled={!onContinue}
        aria-label={`Continue briefing: ${briefing.name}`}
        className={openAreaCn}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-white">
              {briefing.name}
            </h3>
            {briefing.location && (
              <p className="mt-0.5 truncate text-[13px] text-white">{briefing.location}</p>
            )}
          </div>
          {pendingCount > 0 ? (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium tabular-nums text-amber-400">
              {pendingCount} to sign
            </span>
          ) : briefing.attendeeCount === 0 ? (
            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-white">
              Add people
            </span>
          ) : null}
          {onContinue && <ChevronRight />}
        </div>

        <p className="mt-3 border-t border-white/[0.1] pt-3 text-[13px] tabular-nums text-white">
          {factsLine(briefing, signed)}
        </p>
        <RegisterBar signed={signed} total={briefing.attendeeCount} done={false} />
      </button>
    </motion.div>
  );
}

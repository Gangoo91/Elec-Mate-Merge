/**
 * The two briefing rows on the Team Briefings list — one for work outstanding,
 * one for work finished.
 *
 * Both were `bg-[#1e1e1e]` with an icon tile, and both ended in a row of
 * equal-weight buttons in three different accent colours: blue "View", yellow
 * "Share", purple "PDF" on the history card; blue/blue/yellow on the template
 * card. Three colours across three buttons is three primary actions, which is
 * none — the eye has nothing to land on. They now carry the app's card material
 * (`CARD_SURFACE` + a volt hairline) and exactly one solid action each, with
 * anything secondary as a quiet outline.
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
  'relative overflow-hidden rounded-2xl border border-elec-yellow/35 p-4',
  CARD_SURFACE,
  'transition-[background-image,border-color,transform] duration-150 ease-out',
  'touch-manipulation select-none [-webkit-tap-highlight-color:transparent]'
);

/** Press feel: scale down and BRIGHTEN. Dimming on a dark ground reads as disabled. */
const primaryBtn = cn(
  'flex h-11 flex-1 items-center justify-center rounded-xl bg-elec-yellow px-4',
  'text-[14px] font-semibold text-black touch-manipulation',
  'transition-[filter,transform] duration-150 active:scale-[0.97] active:brightness-110'
);

const quietBtn = cn(
  'flex h-11 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.06] px-4',
  'text-[14px] font-medium text-white touch-manipulation',
  'transition-[background-color,transform] duration-150 active:scale-[0.97] active:bg-white/[0.12]'
);

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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-white">{briefing.name}</h3>
          <p className="mt-0.5 truncate text-[13px] text-white">{briefing.location}</p>
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
      </div>

      {/* Facts as a single ruled line — date and register in one reading, no
          icon repeating what the words already say. */}
      <p className="mt-3 border-t border-white/[0.1] pt-3 text-[13px] tabular-nums text-white">
        {briefing.date}
        {briefing.time ? ` · ${briefing.time}` : ''} · {signed} of {briefing.attendeeCount} signed
      </p>

      {briefing.attendeeCount > 0 && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(signed / briefing.attendeeCount) * 100}%` }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={cn('h-full rounded-full', fullySigned ? 'bg-elec-yellow' : 'bg-amber-400')}
          />
        </div>
      )}

      {(onView || onShare) && (
        <div className="mt-4 flex gap-2">
          {onView && (
            <button type="button" onClick={onView} className={primaryBtn}>
              Open
            </button>
          )}
          {onShare && (
            <button type="button" onClick={onShare} className={quietBtn}>
              Share
            </button>
          )}
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold text-white">{briefing.name}</h3>
          <p className="mt-0.5 truncate text-[13px] text-white">{briefing.location}</p>
        </div>
        {pendingCount > 0 && (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium tabular-nums text-amber-400">
            {pendingCount} to sign
          </span>
        )}
      </div>

      <p className="mt-3 border-t border-white/[0.1] pt-3 text-[13px] tabular-nums text-white">
        {briefing.date}
        {briefing.time ? ` · ${briefing.time}` : ''} · {signed} of {briefing.attendeeCount} signed
      </p>

      {briefing.attendeeCount > 0 && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(signed / briefing.attendeeCount) * 100}%` }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="h-full rounded-full bg-amber-400"
          />
        </div>
      )}

      {onContinue && (
        <button type="button" onClick={onContinue} className={cn(primaryBtn, 'mt-4 w-full')}>
          Continue briefing
        </button>
      )}
    </motion.div>
  );
}

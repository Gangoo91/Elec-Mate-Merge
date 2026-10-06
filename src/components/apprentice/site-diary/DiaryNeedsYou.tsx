/**
 * DiaryNeedsYou — the few things in the diary that need the apprentice.
 *
 * 6 Oct 2026 rebuild. Replaces four separate portfolio nudges (an
 * opportunities card, the coach's suggestions, a badge on each card and the
 * detail sheet) with one list, hidden when empty:
 *   - training time that didn't send, or didn't update → send it again;
 *   - training a tutor or employer didn't accept → open it (with their reason);
 *   - a question that isn't shared with the college yet (college learners);
 *   - entries ready for the portfolio (a photo and what you learned).
 * Only the last 14 days, at most 3 rows until "Show N more", and every nag can
 * be turned down ("Keep private", "Not for portfolio") — it used to grow
 * forever ("40 entries ready") with no way to say no.
 */
import { useMemo, useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TONE_DOT } from '@/lib/site-diary/statusColour';
import { formatMinutes, type SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import { addDismissed, getDismissed, type DismissKind } from '@/lib/site-diary/dismissals';
import { daysBetweenISO, todayLocalISO } from '@/lib/localDate';
import type { OtjState } from './DiaryEntryCard';

interface Props {
  entries: SiteDiaryEntry[];
  collegeLinked: boolean;
  otjStatus: Record<string, OtjState>;
  otjRationale: Record<string, string>;
  syncFailed: Record<string, true>;
  uid: string | null;
  /** The learner turned logging reminders off — no portfolio nags. */
  hidePortfolio?: boolean;
  onOpenEntry: (entry: SiteDiaryEntry) => void;
  onRetryTraining: (id: string) => Promise<boolean>;
  /** Told after a "Keep private" / "Not for portfolio", so the page can drop
   *  the whole card once the last item goes. */
  onDismissed?: () => void;
}

const WINDOW_DAYS = 14;
const CAP = 3;

const dayLabel = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

type Item =
  | { kind: 'unsent'; e: SiteDiaryEntry }
  | { kind: 'rejected'; e: SiteDiaryEntry }
  | { kind: 'question'; e: SiteDiaryEntry }
  | { kind: 'portfolio'; e: SiteDiaryEntry };

export function needsYouItems(
  entries: SiteDiaryEntry[],
  opts: {
    collegeLinked: boolean;
    otjStatus: Record<string, OtjState>;
    syncFailed: Record<string, true>;
    uid: string | null;
    hidePortfolio?: boolean;
  }
): Item[] {
  const today = todayLocalISO();
  const recent = entries.filter((e) => daysBetweenISO(today, e.date) <= WINDOW_DAYS);
  const notPortfolio = getDismissed(opts.uid, 'portfolio');
  const privateQ = getDismissed(opts.uid, 'question');
  const items: Item[] = [];
  for (const e of recent)
    if ((e.training_minutes ?? 0) > 0 && (!e.linked_otj_entry_id || opts.syncFailed[e.id]))
      items.push({ kind: 'unsent', e });
  for (const e of recent)
    if ((e.training_minutes ?? 0) > 0 && opts.otjStatus[e.id] === 'rejected')
      items.push({ kind: 'rejected', e });
  if (opts.collegeLinked)
    for (const e of recent)
      if (isRealQuestion(e.issues_or_questions) && !e.share_with_tutor && !privateQ.has(e.id))
        items.push({ kind: 'question', e });
  if (!opts.hidePortfolio)
    for (const e of recent)
      if (
        e.photos.length > 0 &&
        (e.what_i_learned ?? '').trim() &&
        !e.linked_portfolio_id &&
        !notPortfolio.has(e.id)
      )
        items.push({ kind: 'portfolio', e });
  return items;
}

export function DiaryNeedsYou({
  entries,
  collegeLinked,
  otjStatus,
  otjRationale,
  syncFailed,
  uid,
  hidePortfolio = false,
  onOpenEntry,
  onRetryTraining,
  onDismissed,
}: Props) {
  const [sending, setSending] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  // Bumped on dismiss so the list re-reads local storage.
  const [dismissTick, setDismissTick] = useState(0);
  const items = useMemo(
    () => needsYouItems(entries, { collegeLinked, otjStatus, syncFailed, uid, hidePortfolio }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entries, collegeLinked, otjStatus, syncFailed, uid, hidePortfolio, dismissTick]
  );
  if (!items.length) return null;
  const shown = showAll ? items : items.slice(0, CAP);

  const dismiss = (kind: DismissKind, id: string) => {
    addDismissed(uid, kind, id);
    setDismissTick((t) => t + 1);
    onDismissed?.();
  };

  const main =
    'flex min-h-[52px] min-w-0 flex-1 items-center justify-between gap-3 py-2.5 text-left touch-manipulation';
  const side =
    'h-11 shrink-0 rounded-xl border border-white/[0.18] px-3 text-[12.5px] font-semibold text-white touch-manipulation';

  return (
    <div>
      <div className="divide-y divide-white/[0.08]">
        {shown.map((it) => {
          const e = it.e;
          if (it.kind === 'unsent')
            return (
              <button
                key={`t-${e.id}`}
                type="button"
                disabled={sending === e.id}
                onClick={async () => {
                  setSending(e.id);
                  await onRetryTraining(e.id);
                  setSending(null);
                }}
                className={main + ' w-full'}
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                    <span
                      aria-hidden
                      className={cn('h-2 w-2 shrink-0 rounded-full', TONE_DOT.back)}
                    />
                    Send {formatMinutes(e.training_minutes ?? 0)} training again
                  </span>
                  <span className="block truncate text-[12.5px] text-white">
                    {e.site_name} · {dayLabel(e.date)} — it didn’t send when you saved
                  </span>
                </span>
                {sending === e.id ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                )}
              </button>
            );
          if (it.kind === 'rejected')
            return (
              <button
                key={`r-${e.id}`}
                type="button"
                onClick={() => onOpenEntry(e)}
                className={main + ' w-full'}
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                    <span
                      aria-hidden
                      className={cn('h-2 w-2 shrink-0 rounded-full', TONE_DOT.back)}
                    />
                    {formatMinutes(e.training_minutes ?? 0)} training sent back to fix
                  </span>
                  <span className="block truncate text-[12.5px] text-white">
                    {e.site_name} · {dayLabel(e.date)}
                    {otjRationale[e.id] ? ` — “${otjRationale[e.id]}”` : ' — fix it and send again'}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
              </button>
            );
          if (it.kind === 'question')
            return (
              <div key={`q-${e.id}`} className="flex items-center gap-2">
                <button type="button" onClick={() => onOpenEntry(e)} className={main}>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                      <span
                        aria-hidden
                        className={cn('h-2 w-2 shrink-0 rounded-full', TONE_DOT.waiting)}
                      />
                      Share your question with college?
                    </span>
                    <span className="block truncate text-[12.5px] text-white">
                      {dayLabel(e.date)} — “{e.issues_or_questions}”
                    </span>
                  </span>
                </button>
                <button type="button" onClick={() => dismiss('question', e.id)} className={side}>
                  Keep private
                </button>
              </div>
            );
          return (
            <div key={`p-${e.id}`} className="flex items-center gap-2">
              <button type="button" onClick={() => onOpenEntry(e)} className={main}>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                    <span
                      aria-hidden
                      className={cn('h-2 w-2 shrink-0 rounded-full', TONE_DOT.portfolio)}
                    />
                    Ready for your portfolio
                  </span>
                  <span className="block truncate text-[12.5px] text-white">
                    {e.site_name} · {dayLabel(e.date)} — a photo and what you learned
                  </span>
                </span>
              </button>
              <button type="button" onClick={() => dismiss('portfolio', e.id)} className={side}>
                Not for portfolio
              </button>
            </div>
          );
        })}
      </div>
      {items.length > CAP && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="mt-2 h-11 rounded-xl border border-white/[0.22] px-4 text-[13px] font-semibold text-white touch-manipulation"
        >
          {showAll ? 'Show fewer' : `Show ${items.length - CAP} more`}
        </button>
      )}
    </div>
  );
}

export default DiaryNeedsYou;

/** "none", "n/a", "-" and the like aren't questions — don't nag about them. */
function isRealQuestion(q: string | null | undefined): boolean {
  const t = (q ?? '')
    .trim()
    .toLowerCase()
    .replace(/[.!]+$/, '');
  return (
    t.length > 2 &&
    !['none', 'n/a', 'na', 'no', 'nothing', 'nope', 'nil', 'no questions'].includes(t)
  );
}

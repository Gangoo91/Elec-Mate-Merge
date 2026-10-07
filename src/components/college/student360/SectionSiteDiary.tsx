import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { EvidenceImage } from '@/components/shared/EvidenceImage';

/* ==========================================================================
   SectionSiteDiary — the site-diary entries a learner chose to share.

   Read through `college_shared_diary_entries` (6 Oct 2026), never the table:
   the learner is promised staff never see how the day felt, and RLS can't
   hide a column, so the function leaves mood_rating out. Only entries with
   share_with_tutor set come back, and only to staff at the learner's college.

   Questions come first — a learner who wrote one and shared it is asking.
   ========================================================================== */

const supabase = typedSupabase as unknown as SupabaseClient;

interface SharedDiaryEntry {
  id: string;
  date: string;
  site_name: string | null;
  supervisor: string | null;
  tasks_completed: string[] | null;
  what_i_learned: string | null;
  issues_or_questions: string | null;
  photos: string[] | null;
  training_minutes: number | null;
  training_type: string | null;
  unit_codes: string[] | null;
  linked_otj_entry_id: string | null;
  linked_portfolio_id: string | null;
  updated_at: string;
}

const CARD = cn('overflow-hidden rounded-2xl border border-white/[0.14]', CARD_SURFACE);
const TEXT_BTN =
  'inline-flex h-11 shrink-0 items-center px-2 text-[12px] font-semibold transition-colors touch-manipulation';

/** "none", "n/a", "no" aren't questions — the learner filled the box. */
function isRealQuestion(q: string | null): q is string {
  const t = (q ?? '')
    .trim()
    .toLowerCase()
    .replace(/[.!]+$/, '');
  return t.length > 2 && !['none', 'n/a', 'na', 'nope', 'nothing', 'no'].includes(t);
}

function fmtDate(d: string): string {
  return new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function fmtMins(m: number): string {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h === 0 ? `${r}m` : r === 0 ? `${h}h` : `${h}h ${r}m`;
}

export function SectionSiteDiary({
  id,
  studentName,
  userId,
  onMessage,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  onMessage?: () => void;
}) {
  const [entries, setEntries] = useState<SharedDiaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  // `&focus=<entry id>` (the "asked a question in their diary" alert):
  // open that day, showing it even when it is older than the first five.
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get('focus');
  useEffect(() => {
    if (!focusId) return;
    const i = entries.findIndex((e) => e.id === focusId);
    if (i < 0) return;
    if (i >= 5) setExpanded(true);
    setOpenId(focusId);
  }, [focusId, entries]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    supabase
      .rpc('college_shared_diary_entries', { p_learner: userId })
      .then(({ data, error: e }) => {
        if (cancelled) return;
        if (e) setError('Couldn’t load the shared diary.');
        else setEntries((data ?? []) as SharedDiaryEntry[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const questions = useMemo(
    () => entries.filter((e) => isRealQuestion(e.issues_or_questions)).slice(0, 5),
    [entries]
  );
  const visible = expanded ? entries : entries.slice(0, 5);
  const firstName = studentName.split(' ')[0];

  if (!userId) return null;

  return (
    <section id={id} className="scroll-mt-6 space-y-3">
      <div className="flex items-end justify-between gap-3">
        <CollegeHeading>Site diary</CollegeHeading>
        {onMessage && (
          <div className="no-print -my-2 -mr-2 flex items-center">
            <button type="button" onClick={onMessage} className={cn(TEXT_BTN, 'text-elec-yellow')}>
              Message {firstName}
            </button>
          </div>
        )}
      </div>

      {loading && entries.length === 0 ? (
        <div className={cn(CARD, 'h-24 animate-pulse')} />
      ) : error ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[13px] text-white">{error}</p>
        </div>
      ) : entries.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[13px] leading-relaxed text-white">
            {firstName} hasn&apos;t shared any diary entries. Learners choose which days to share —
            you&apos;ll see the work, what they learned and any question, never how the day felt.
          </p>
        </div>
      ) : (
        <>
          {questions.length > 0 && (
            <div className={CARD}>
              <div className="border-b border-white/[0.10] px-4 py-3 sm:px-5">
                <div className="text-[13px] font-semibold text-white">
                  {questions.length === 1 ? 'A question' : `${questions.length} questions`} from{' '}
                  {firstName}&apos;s diary
                </div>
              </div>
              <ul className="divide-y divide-white/[0.08]">
                {questions.map((q) => (
                  <li key={q.id} className="px-4 py-3 sm:px-5">
                    <p className="text-[14px] leading-snug text-white">
                      “{q.issues_or_questions!.trim()}”
                    </p>
                    <p className="mt-1 text-[12px] text-white">
                      {fmtDate(q.date)}
                      {q.site_name ? ` · ${q.site_name}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={CARD}>
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
              <div className="text-[13px] font-semibold text-white">Shared days</div>
              <div className="text-[12px] tabular-nums text-white">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </div>
            </div>
            <ul className="divide-y divide-white/[0.08]">
              {visible.map((e) => (
                <DiaryRow
                  key={e.id}
                  entry={e}
                  open={openId === e.id}
                  onToggle={() => setOpenId(openId === e.id ? null : e.id)}
                />
              ))}
            </ul>
            {entries.length > 5 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="h-11 w-full border-t border-white/[0.10] text-[13px] font-semibold text-white touch-manipulation"
              >
                {expanded ? 'Show fewer' : `Show all ${entries.length}`}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function DiaryRow({
  entry,
  open,
  onToggle,
}: {
  entry: SharedDiaryEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const tasks = entry.tasks_completed ?? [];
  const photos = entry.photos ?? [];
  const units = entry.unit_codes ?? [];
  const meta = [
    tasks.length ? tasks.slice(0, 3).join(' · ') : null,
    entry.training_minutes ? `${fmtMins(entry.training_minutes)} training` : null,
    photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'}` : null,
    entry.linked_portfolio_id ? 'In portfolio' : null,
  ].filter(Boolean);

  return (
    <li data-focus-id={entry.id}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-start gap-3 px-4 py-3 text-left touch-manipulation sm:px-5"
      >
        <div className="w-[64px] shrink-0 text-[12px] font-semibold text-white">
          {fmtDate(entry.date)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[14px] font-semibold text-white">
            {entry.site_name || 'Site'}
          </div>
          {entry.what_i_learned && (
            <p className={cn('mt-0.5 text-[13px] italic text-white', !open && 'line-clamp-2')}>
              “{entry.what_i_learned}”
            </p>
          )}
          {meta.length > 0 && <p className="mt-1 text-[12px] text-white">{meta.join(' · ')}</p>}
        </div>
        {photos[0] && !open && (
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
            <EvidenceImage
              src={photos[0]}
              alt=""
              className="h-full w-full object-cover"
              fallback={<div className="h-full w-full bg-white/[0.06]" />}
            />
          </div>
        )}
      </button>

      {open && (
        <div className="space-y-3 px-4 pb-4 sm:px-5 sm:pl-[92px]">
          {tasks.length > 3 && (
            <p className="text-[13px] text-white">
              <span className="font-semibold">Did:</span> {tasks.join(' · ')}
            </p>
          )}
          {entry.supervisor && (
            <p className="text-[13px] text-white">
              <span className="font-semibold">Supervisor:</span> {entry.supervisor}
            </p>
          )}
          {units.length > 0 && (
            <p className="text-[13px] text-white">
              <span className="font-semibold">Units:</span> {units.join(', ')}
            </p>
          )}
          {isRealQuestion(entry.issues_or_questions) && (
            <p className="text-[13px] text-white">
              <span className="font-semibold">Question:</span> {entry.issues_or_questions}
            </p>
          )}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {photos.slice(0, 8).map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.06]"
                >
                  <EvidenceImage
                    src={src}
                    alt={`Photo from ${entry.site_name || 'site'}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </li>
  );
}

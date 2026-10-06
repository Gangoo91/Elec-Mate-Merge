/**
 * SiteDiary — the apprentice's daily logbook.
 *
 * Rebuilt 6 Oct 2026 after a full audit (Andrew: "they should feel this is
 * right and can use it daily"). Saving had failed for everyone since
 * February (fixed in useSiteDiaryEntries), and the page was a wall of
 * controls: a stats ribbon, 8 filter chips that filtered on optional tags, an
 * always-open AI coach, four separate portfolio nudges and a "24.5h from this
 * diary" figure that was mostly someone else's tracker time.
 *
 * Now, top to bottom:
 *   1. Today — log today in one tap, or today's summary.
 *   2. This week — Mon–Fri logged/gaps (tap to backfill), training sent or
 *      signed off (honestly worded, links to the OTJ hub), one streak line.
 *   3. Needs you — only when there's something: portfolio-ready entries,
 *      questions not shared with the tutor, training that didn't send.
 *   4. History by week, with a weekly reflection on demand.
 *   5. Calendar — the secondary view, for finding and filling gaps.
 * Desktop: a ~720px main column with This week / Needs you / mini calendar
 * in a right rail. Phones stack.
 *
 * Deep links: ?new=1 opens the entry sheet; ?date=YYYY-MM-DD opens it for
 * that day (the hub's "Log a diary entry" uses ?new=1).
 *
 * Review round (6 Oct pm): days can be marked college / off / holiday / sick
 * (no more "missed" college days); every day in the week strip does something;
 * Needs you is the last 14 days and can be turned down; reflections use the
 * whole week even mid-search; after saving, the toast offers the next step
 * (add to portfolio, or ask the supervisor to confirm the training); sharing
 * says "college", which is who can see it (through a no-mood function).
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, List, MapPin, Plus, Search, X } from 'lucide-react';
import { displaySite } from '@/lib/site-diary/format';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { todayLocalISO } from '@/lib/localDate';
import { toast } from 'sonner';
import { useLoggingReminders } from '@/hooks/useLoggingReminders';
import {
  formatMinutes,
  isOtjSignedOff,
  useSiteDiaryEntries,
  type NewDiaryEntry,
  type SiteDiaryEntry,
} from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryDayMarks } from '@/hooks/site-diary/useDiaryDayMarks';
import { shareAttestLink } from '@/lib/site-diary/attest';
import { useDiaryStreak } from '@/hooks/site-diary/useDiaryStreak';
import { useDiaryCoach } from '@/hooks/site-diary/useDiaryCoach';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import {
  DiaryFeed,
  groupByWeek,
  type WeekGroup,
} from '@/components/apprentice/site-diary/DiaryFeed';
import { DiaryCalendarView } from '@/components/apprentice/site-diary/DiaryCalendarView';
import { DiaryEntryCard } from '@/components/apprentice/site-diary/DiaryEntryCard';
import { DiaryWeeklySummary } from '@/components/apprentice/site-diary/DiaryWeeklySummary';
import { DiaryNeedsYou, needsYouItems } from '@/components/apprentice/site-diary/DiaryNeedsYou';
import { DiaryEntrySheet } from '@/components/apprentice/site-diary/DiaryEntrySheet';
import { DiaryEntryDetailSheet } from '@/components/apprentice/site-diary/DiaryEntryDetailSheet';

type ViewMode = 'history' | 'calendar';

const CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';
const H2 = 'mb-3 text-[15px] font-semibold tracking-tight text-white';

export default function SiteDiary() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const {
    entries,
    isLoading,
    loadError,
    otjStatus,
    otjRationale,
    otjReturnedBy,
    syncFailed,
    createEntry,
    updateEntry,
    deleteEntry,
    retryTraining,
    recentSites,
    refresh,
  } = useSiteDiaryEntries();
  const { marks, setMark } = useDiaryDayMarks();
  const markedDays = useMemo(() => Object.keys(marks), [marks]);
  const { streakMessage, currentStreak } = useDiaryStreak(entries, markedDays);
  const { qualificationCode } = useStudentQualification();
  const {
    reflectionsFor,
    reflect,
    reflectingWeek,
    error: reflectionError,
  } = useDiaryCoach(qualificationCode);
  const { hidden: hideReminders } = useLoggingReminders();
  const { entries: portfolioEntries } = usePortfolioData();

  // College learners can share an entry (and its question) with their tutor.
  const [collegeLinked, setCollegeLinked] = useState(false);
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    void supabase
      .from('college_students')
      .select('id')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (!cancelled) setCollegeLinked(!!data?.length);
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  // AC refs already evidenced in the portfolio, as "301.2.3". The old regex
  // kept the trailing colon ("113.1.1:"), so the detail sheet's lookup never
  // matched and every AC read "Needed".
  const evidencedACSet = useMemo(() => {
    const set = new Set<string>();
    for (const pe of portfolioEntries)
      for (const ac of pe.assessmentCriteria || []) {
        const m = ac.match(/^(\S+)\s+AC\s+(\d+(?:\.\d+)*)/);
        if (m) set.add(`${m[1]}.${m[2]}`);
      }
    return set;
  }, [portfolioEntries]);

  // The apprentice's own recent tasks for the sheet's one-tap chips.
  const recentTasks = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const e of entries)
      for (const t of e.tasks_completed) {
        const k = t.trim().toLowerCase();
        if (!k || seen.has(k)) continue;
        seen.add(k);
        out.push(t.trim());
        if (out.length >= 12) return out;
      }
    return out;
  }, [entries]);

  const [view, setView] = useState<ViewMode>('history');
  // Bumped when a Needs-you item is dismissed: the re-render re-reads the
  // dismissals, so the card goes once its last item does.
  const [, setNeedsTick] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetDate, setSheetDate] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<SiteDiaryEntry | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const detailEntry = useMemo(
    () => entries.find((e) => e.id === detailId) ?? null,
    [entries, detailId]
  );

  const [sheetSite, setSheetSite] = useState<string | null>(null);
  const openNew = useCallback((date?: string | null, site?: string | null) => {
    setEditEntry(null);
    setSheetDate(date ?? null);
    setSheetSite(site ?? null);
    setSheetOpen(true);
  }, []);
  const openEntry = useCallback((e: SiteDiaryEntry) => setDetailId(e.id), []);

  // ?new=1 and ?date= deep links (the hub's "Log a diary entry").
  useEffect(() => {
    const date = params.get('date');
    if (params.get('new') === '1' || (date && /^\d{4}-\d{2}-\d{2}$/.test(date))) {
      openNew(date && date <= todayLocalISO() ? date : null);
      const next = new URLSearchParams(params);
      next.delete('new');
      next.delete('date');
      setParams(next, { replace: true });
    }
  }, [params, setParams, openNew]);

  // Return the row (or null) so the sheet only closes on success. A new
  // entry's toast offers the next step instead of just "Saved".
  const handleSave = useCallback(
    async (entry: NewDiaryEntry) => {
      if (editEntry) return updateEntry(editEntry.id, entry);
      const res = await createEntry(entry);
      if (!res) return null;
      const saved = res.entry;
      const mins = saved.training_minutes ?? 0;
      if (res.trainingFailed)
        toast.warning('Saved — but the training time didn’t send. It’s under Needs you.');
      else if (mins > 0 && !res.hasCollege && saved.linked_otj_entry_id) {
        const otjId = saved.linked_otj_entry_id;
        toast.success(`Saved as ${formatMinutes(mins)} training`, {
          description: 'Ask your supervisor to confirm it — nobody else is told.',
          action: {
            label: 'Ask supervisor',
            onClick: () => void shareAttestLink(otjId, mins, saved.site_name),
          },
          duration: 10000,
        });
      } else {
        // A photo and what you learned is portfolio evidence — offer it even
        // when the message is about the training (one action per toast).
        const evidence = saved.photos.length > 0 && !!(saved.what_i_learned ?? '').trim();
        const title =
          mins > 0
            ? `Saved · ${formatMinutes(mins)} training sent to your tutor`
            : 'Saved to your diary';
        if (evidence)
          toast.success(title, {
            description: 'It has a photo and what you learned, so it can go in your portfolio.',
            action: { label: 'Add to portfolio', onClick: () => setDetailId(saved.id) },
            duration: 8000,
          });
        else toast.success(title);
      }
      return saved;
    },
    [editEntry, updateEntry, createEntry]
  );

  const today = todayLocalISO();
  const todays = entries.filter((e) => e.date === today);

  const filtered = useMemo(() => {
    let list = entries;
    if (dateFilter) list = list.filter((e) => e.date === dateFilter);
    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter(
        (e) =>
          e.site_name.toLowerCase().includes(q) ||
          e.tasks_completed.some((t) => t.toLowerCase().includes(q)) ||
          (e.unit_codes ?? []).some((u) => u.toLowerCase().includes(q)) ||
          (e.what_i_learned ?? '').toLowerCase().includes(q) ||
          (e.issues_or_questions ?? '').toLowerCase().includes(q) ||
          (e.supervisor ?? '').toLowerCase().includes(q)
      );
    return list;
  }, [entries, dateFilter, query]);

  // At a glance — this calendar month, from the entries already loaded.
  const glance = useMemo(() => {
    const month = todayLocalISO().slice(0, 7);
    const inMonth = entries.filter((e) => e.date.startsWith(month));
    let mins = 0;
    let signed = 0;
    for (const e of inMonth) {
      const m = e.training_minutes ?? 0;
      mins += m;
      const st = otjStatus[e.id];
      if (st === 'verified' || st === 'verified_by_employer') signed += m;
    }
    return {
      days: new Set(inMonth.map((e) => e.date)).size,
      mins,
      signed,
      portfolio: entries.filter((e) => e.linked_portfolio_id).length,
    };
  }, [entries, otjStatus]);
  const filtering = !!dateFilter || !!query.trim();
  // Searching, one day, or the calendar: show just that, straight under the
  // header — otherwise the tap changes nothing above the fold on a phone.
  const focused = filtering || view === 'calendar';
  const allWeeks = useMemo(() => groupByWeek(entries), [entries]);
  const reflections = reflectionsFor(allWeeks);
  // Always the WHOLE week, even while a search narrows the rows.
  const onReflect = useCallback(
    (w: WeekGroup) => {
      const week = allWeeks.find((x) => x.key === w.key) ?? w;
      return reflect(
        week.key,
        week.entries,
        entries.filter((e) => e.date < week.key)
      );
    },
    [reflect, entries, allWeeks]
  );

  const hasNeeds =
    needsYouItems(entries, {
      collegeLinked,
      otjStatus,
      syncFailed,
      uid,
      hidePortfolio: hideReminders,
    }).length > 0;

  const weekBody = (
    <DiaryWeeklySummary
      entries={entries}
      otjStatus={otjStatus}
      marks={marks}
      collegeLinked={collegeLinked}
      streakMessage={hideReminders ? null : streakMessage}
      onLogDay={(d) => openNew(d)}
      onShowDay={(d) => {
        setDateFilter(d);
        setView('history');
      }}
      onMarkDay={(d, k) => void setMark(d, k)}
      onOpenOtjHub={() => navigate('/apprentice/ojt-hub')}
    />
  );
  const weekPanel = (
    <section className={CARD}>
      <h2 className={H2}>This week</h2>
      {weekBody}
    </section>
  );
  const needsPanel = hasNeeds ? (
    <section className={CARD}>
      <h2 className={H2}>Needs you</h2>
      <DiaryNeedsYou
        entries={entries}
        collegeLinked={collegeLinked}
        otjStatus={otjStatus}
        otjRationale={otjRationale}
        syncFailed={syncFailed}
        uid={uid}
        hidePortfolio={hideReminders}
        onOpenEntry={openEntry}
        onRetryTraining={retryTraining}
        onDismissed={() => setNeedsTick((t) => t + 1)}
      />
    </section>
  ) : null;

  const todayLabel = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex min-h-0 flex-col bg-background">
      {/* Header — sticky, compact */}
      <header
        className="sticky z-20 border-b border-white/[0.1] bg-background"
        // Just under the app's own top bar (Header.tsx publishes its height) —
        // at top 0 it slid underneath it when scrolled.
        style={{ top: 'var(--header-height, 56px)' }}
      >
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-2 px-4 lg:px-8">
          <button
            type="button"
            onClick={() => {
              // Back to wherever they came from (the dashboard, the hub…);
              // the hub when the diary was opened directly.
              const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
              if (idx > 0) navigate(-1);
              else navigate('/apprentice/hub');
            }}
            aria-label="Back"
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-[17px] font-bold text-white">Site diary</h1>
          {/* Nothing to search or browse yet, and the page's own button logs
              the first day — so a first visit shows just the title. */}
          {entries.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((o) => !o);
                  if (searchOpen) setQuery('');
                }}
                aria-label={searchOpen ? 'Close search' : 'Search the diary'}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setView((v) => (v === 'history' ? 'calendar' : 'history'));
                  setDateFilter(null);
                  // The calendar doesn't search — don't leave a filter looking live.
                  setSearchOpen(false);
                  setQuery('');
                }}
                aria-label={view === 'history' ? 'Show the calendar' : 'Show the history'}
                // Desktop has the calendar in the side rail already.
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06] lg:hidden"
              >
                {view === 'history' ? (
                  <CalendarDays className="h-5 w-5" />
                ) : (
                  <List className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => openNew(null)}
                className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-elec-yellow px-3.5 text-[14px] font-bold text-black touch-manipulation"
              >
                <Plus className="h-4 w-4" />
                {/* "Log today" squeezed the title to "Sit…" on a phone. */}
                <span className="sm:hidden">Log</span>
                <span className="hidden sm:inline">Log today</span>
              </button>
            </>
          )}
        </div>
        {searchOpen && (
          <div className="mx-auto max-w-[1440px] px-4 pb-3 lg:px-8">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your diary"
              aria-label="Search sites, tasks, what you learned, units and questions"
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
          </div>
        )}
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-10 lg:px-8">
        <div className="min-w-0 space-y-5">
          {isLoading && entries.length === 0 ? (
            <div className="flex justify-center py-16" aria-label="Loading your diary">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : loadError && entries.length === 0 ? (
            <section className={CARD}>
              <p className="text-[14px] text-white">
                Couldn’t load your diary. Check your connection and try again.
              </p>
              <button
                type="button"
                onClick={() => void refresh()}
                className="mt-3 h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
              >
                Try again
              </button>
            </section>
          ) : entries.length === 0 ? (
            /* First visit — show what a day looks like, not just describe it. */
            <section className={cn(CARD, 'space-y-4')}>
              <div>
                <h2 className="text-[20px] font-bold leading-tight text-white">
                  Your logbook for site days
                </h2>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-white">
                  A minute at the end of the day: where you were, what you did and one thing you
                  learned.
                </p>
              </div>

              {/* A sample day, in the same card the history uses */}
              <div aria-hidden className="pointer-events-none">
                <p className="mb-1.5 text-[12px] font-semibold text-white">A day looks like this</p>
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-3">
                  <div className="flex w-12 shrink-0 flex-col items-center rounded-xl border border-white/[0.12] bg-white/[0.04] py-1.5">
                    <span className="text-[11px] font-semibold leading-none text-white">Tue</span>
                    <span className="mt-1 text-[20px] font-bold leading-none text-white">14</span>
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="truncate text-[15px] font-semibold text-white">
                      Riverside flats, block B
                    </p>
                    <p className="truncate text-[13px] text-white">
                      Second fix sockets · Safe isolation
                    </p>
                    <p className="line-clamp-2 text-[13px] italic leading-snug text-white">
                      “Prove the tester on a known live source before and after proving dead”
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-[13.5px] leading-snug text-white">
                <li className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                  />
                  Add a photo and the day can go straight into your portfolio.
                </li>
                <li className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                  />
                  Training time you log goes off to be signed off as off-the-job hours.
                </li>
                <li className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-elec-yellow"
                  />
                  College day or off? Mark it, and it doesn’t count as missed.
                </li>
              </ul>

              <button
                type="button"
                onClick={() => openNew(null)}
                className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation sm:w-auto sm:px-8"
              >
                Log today
              </button>
            </section>
          ) : (
            <>
              {/* 1 · Today — hidden while searching or looking at one day, so
                  the results sit right under the search box. */}
              {!focused && (
                <section className={cn(CARD, 'relative overflow-hidden')}>
                  {/* Gold hairline — the one place the page says "start here". */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow to-transparent"
                  />
                  <p className="text-[12.5px] font-semibold text-elec-yellow">{todayLabel}</p>
                  {todays.length === 0 ? (
                    <>
                      <h2 className="mt-1 text-[18px] font-bold text-white">
                        What did you do on site today?
                      </h2>
                      <p className="mt-1 text-[13.5px] text-white">
                        Where you were, what you did and one thing you learned.
                      </p>
                      <button
                        type="button"
                        onClick={() => openNew(null)}
                        className="mt-3 h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation sm:w-auto sm:px-8"
                      >
                        Log today
                      </button>
                      {recentSites.length > 0 && (
                        // One tap: the form opens with the site filled in.
                        <div className="mt-3">
                          <p className="mb-2 text-[12.5px] font-semibold text-white">
                            Or start at a recent site
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {recentSites.slice(0, 3).map((site) => (
                              <button
                                key={site}
                                type="button"
                                onClick={() => openNew(null, site)}
                                aria-label={`Log today at ${site}`}
                                className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.16] bg-white/[0.06] px-4 text-[14px] font-medium text-white touch-manipulation hover:border-elec-yellow"
                              >
                                <MapPin className="h-4 w-4" aria-hidden />
                                {displaySite(site)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="mt-1 space-y-3">
                      <h2 className="text-[18px] font-bold text-white">
                        Today’s logged{todays.length > 1 ? ` · ${todays.length} sites` : ''}
                      </h2>
                      {/* Same card as the history: photo, status, tap to open. */}
                      <div className="space-y-2">
                        {todays.map((e) => (
                          <DiaryEntryCard
                            key={e.id}
                            entry={e}
                            onTap={openEntry}
                            otjState={otjStatus[e.id]}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => openNew(today)}
                        className="h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
                      >
                        Add another site today
                      </button>
                    </div>
                  )}

                  {/* Phones: the week lives in the same card as today — one
                    place to look, not two grey slabs. Desktop has it in the rail. */}
                  <div className="mt-5 border-t border-white/[0.1] pt-4 lg:hidden">
                    <h2 className={H2}>This week</h2>
                    {weekBody}
                  </div>
                </section>
              )}

              {/* At a glance — a solid colour bar per figure, matching the
                  status dots (violet = portfolio, green = signed off). */}
              {!focused && (
                <section aria-label="At a glance" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    {
                      bar: 'bg-elec-yellow',
                      value: currentStreak,
                      label: currentStreak === 1 ? 'day in a row' : 'days in a row',
                    },
                    {
                      bar: 'bg-sky-400',
                      value: glance.days,
                      label: `${glance.days === 1 ? 'day' : 'days'} logged this month`,
                    },
                    {
                      bar: 'bg-emerald-400',
                      value: formatMinutes(glance.mins),
                      label: glance.signed
                        ? `training this month · ${formatMinutes(glance.signed)} signed off`
                        : 'training this month',
                    },
                    {
                      bar: 'bg-violet-400',
                      value: glance.portfolio,
                      label:
                        glance.portfolio === 1 ? 'day in your portfolio' : 'days in your portfolio',
                    },
                  ].map((g) => (
                    <div
                      key={g.bar}
                      className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] px-4 pb-3 pt-4"
                    >
                      <span aria-hidden className={cn('absolute inset-x-0 top-0 h-1', g.bar)} />
                      <p className="text-[24px] font-bold leading-none tabular-nums text-white">
                        {g.value}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-snug text-white">{g.label}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* 2 · This week and 3 · Needs you — on phones, in the flow */}
              {needsPanel && !focused && <div className="lg:hidden">{needsPanel}</div>}

              {/* 4 · History, or 5 · Calendar */}
              {view === 'calendar' && !dateFilter ? (
                <section className={CARD}>
                  <h2 className={H2}>Calendar</h2>
                  <DiaryCalendarView
                    entries={entries}
                    marks={marks}
                    onMarkDay={(d, k) => void setMark(d, k)}
                    onDayTap={(d) => {
                      setDateFilter(d);
                      setView('history');
                    }}
                    onEmptyDayTap={(d) => openNew(d)}
                  />
                </section>
              ) : (
                <section>
                  {(dateFilter || query.trim()) && (
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-[13px] text-white">
                        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
                        {dateFilter &&
                          ` on ${new Date(dateFilter + 'T00:00:00').toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}`}
                        {query.trim() && ` matching “${query.trim()}”`}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setDateFilter(null);
                          setQuery('');
                        }}
                        className="h-11 rounded-xl border border-white/[0.22] px-3.5 text-[13px] font-semibold text-white touch-manipulation"
                      >
                        Show all
                      </button>
                    </div>
                  )}
                  {filtered.length === 0 ? (
                    <p className="py-6 text-[14px] text-white">Nothing matches that.</p>
                  ) : (
                    <DiaryFeed
                      entries={filtered}
                      allEntries={entries}
                      onEntryTap={openEntry}
                      otjStatus={otjStatus}
                      reflections={reflections}
                      reflectingWeek={reflectingWeek}
                      reflectionError={reflectionError}
                      onReflect={onReflect}
                    />
                  )}
                </section>
              )}
            </>
          )}
        </div>

        {/* Desktop rail */}
        {entries.length > 0 && (
          <aside className="hidden space-y-5 lg:block">
            {weekPanel}
            {needsPanel}
            <section className={cn(CARD, 'space-y-2')}>
              <h2 className={H2}>Calendar</h2>
              <DiaryCalendarView
                compact
                entries={entries}
                marks={marks}
                onMarkDay={(d, k) => void setMark(d, k)}
                selectedDate={dateFilter}
                onDayTap={(d) => {
                  setDateFilter((cur) => (cur === d ? null : d));
                  setView('history');
                }}
                onEmptyDayTap={(d) => openNew(d)}
              />
            </section>
          </aside>
        )}
      </div>

      <DiaryEntrySheet
        open={sheetOpen}
        onOpenChange={(o) => {
          setSheetOpen(o);
          if (!o) {
            setEditEntry(null);
            setSheetDate(null);
            setSheetSite(null);
          }
        }}
        onSave={handleSave}
        recentSites={recentSites}
        recentTasks={recentTasks}
        datesWithEntries={entries.map((e) => e.date)}
        existingEntry={editEntry}
        initialDate={sheetDate}
        initialSite={sheetSite}
        trainingLocked={!!editEntry && isOtjSignedOff(otjStatus[editEntry.id])}
      />

      <DiaryEntryDetailSheet
        entry={detailEntry}
        open={!!detailEntry}
        onOpenChange={(o) => !o && setDetailId(null)}
        onEdit={(e) => {
          setDetailId(null);
          setEditEntry(e);
          setSheetDate(null);
          setSheetOpen(true);
        }}
        onDelete={async (id) => {
          await deleteEntry(id);
          setDetailId(null);
        }}
        relatedEntries={
          detailEntry
            ? entries
                .filter(
                  (e) =>
                    e.id !== detailEntry.id &&
                    e.site_name.trim().toLowerCase() === detailEntry.site_name.trim().toLowerCase()
                )
                .slice(0, 3)
            : []
        }
        evidencedACs={evidencedACSet}
        otjStatus={detailEntry ? otjStatus[detailEntry.id] : undefined}
        otjRationale={detailEntry ? otjRationale[detailEntry.id] : undefined}
        otjReturnedBy={detailEntry ? otjReturnedBy[detailEntry.id] : undefined}
        trainingSyncFailed={detailEntry ? !!syncFailed[detailEntry.id] : false}
        onRetryTraining={retryTraining}
        onChanged={() => void refresh()}
        onOpenEntry={openEntry}
      />
    </div>
  );
}

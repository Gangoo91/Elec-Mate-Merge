import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ChevronDown, ChevronRight, Eye, Search } from 'lucide-react';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { AGE_BAND_LABEL, FigureLine, bandRows } from '@/components/college/QueueFigures';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import {
  INBOX_KIND_LABEL,
  INBOX_KIND_ORDER,
  useUnifiedInbox,
  type InboxItem,
  type InboxKind,
} from '@/hooks/useUnifiedInbox';
import { callOtjStatusEdgeFn } from '@/hooks/useTutorOtjInbox';
import { useCollegeScope, SCOPE_LABEL } from '@/components/college/scope/useCollegeScope';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';
import { QuietTabs } from '@/components/college/otj/hoursUi';
import {
  BulkBar,
  KeyHint,
  QueueRow,
  SwipeRow,
  useQueueKeys,
  useSelection,
} from '@/components/college/assessment/AssessmentKit';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/* ==========================================================================
   UnifiedInboxPage — /college/inbox. Everything a tutor has to act on.

   Rebuilt 6 Oct 2026 (Andrew: "we need this to be designed excellent… make
   sure it all works, everything will come through this"). One list from
   get_college_inbox plus quiz marking: hours to verify, app learning to
   approve, evidence to assess, comments and messages to answer, IQA
   verdicts, progress reviews, check-ins and marking. Each row opens the
   exact item. Doing the work clears it; the dot only means "not seen yet".

   Layout: kinds down the left on a wide screen (chips on a phone), the list
   on the right, waiting-too-long first. Whose work follows the one College
   Hub scope in the masthead (Mine / My cohorts / Whole college, ELE-1886).

   ELE-1889 (7 Oct): filter by cohort and by age; tick rows for bulk Verify
   (hours) and Mark seen; a desktop keyboard (j/k move, Enter or v opens to
   decide, Shift+V verifies hours, r replies, x ticks); swipe on a phone
   (right for the row's verb, left to mark seen or tick).
   ========================================================================== */

type Filter = 'all' | 'urgent' | InboxKind;
type Age = 'any' | 'new' | 'days' | 'week';

const AGE_LABEL: Record<Age, string> = {
  any: 'Any age',
  new: 'Today or yesterday',
  days: '2 to 6 days',
  week: 'A week or more',
};
const ageOf = (d: number): Exclude<Age, 'any'> => (d <= 1 ? 'new' : d < 7 ? 'days' : 'week');
const REPLY_KINDS: InboxKind[] = ['message', 'comment'];

const KIND_HINT: Record<InboxKind, string> = {
  hours: 'Off-the-job entries to verify',
  app_learning: 'Learning in the app to approve',
  evidence: 'Portfolio evidence to assess',
  comment: 'Learner replies on their portfolio',
  message: 'Learner messages to answer',
  iqa: 'Samples waiting for your verdict',
  review: 'Progress reviews to book, write up or sign',
  checkin: 'Learners the risk check flags',
  marking: 'Written quiz answers to sign off',
  deadline: 'Funding-rules dates due or passed, such as choosing the EPA organisation',
};

// Old links (?tab=otj etc.) still land somewhere sensible.
const TAB_ALIAS: Record<string, Filter> = { otj: 'hours', portfolio: 'evidence' };

const HELP: PageHelpContent = {
  id: 'college-inbox',
  title: 'Your inbox',
  what: 'Everything at your college that needs a tutor, in one list: hours, app learning, evidence, comments, messages, IQA, progress reviews, check-ins and marking. Each one opens exactly where it is done, and leaves the inbox when it is.',
  steps: [
    {
      title: 'Start at the top',
      body: 'Anything that has waited too long comes first, marked orange. A learner’s hours and evidence start to cost them after a week.',
    },
    {
      title: 'Open and act',
      body: 'The button says what to do: Verify, Assess, Reply, Book. It takes you straight to that item, not just the learner.',
    },
    {
      title: 'Narrow it down',
      body: 'Pick a kind on the left, a cohort or how long it has waited, or search for a learner. The switch at the top picks Mine, My cohorts or Whole college for the whole College Hub.',
    },
    {
      title: 'Do several at once',
      body: 'Tick rows to verify hours or mark them seen together. On a desktop: j and k move, Enter or v opens, Shift+V verifies hours, r replies, x ticks. On a phone, swipe right for the button’s action and left to mark seen.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-500',
      label: 'Waiting too long',
      body: 'Hours or evidence over a week, a message over two days, a review overdue.',
    },
    {
      swatch: 'bg-elec-yellow',
      label: 'Not seen yet',
      body: 'A dot until you open it. Doing the work is what clears it.',
    },
  ],
  notes: [
    {
      title: 'The same list everywhere',
      body: 'The home page’s Needs you and the bell read this list, so the counts always match.',
    },
  ],
};

const waitingText = (i: InboxItem) => {
  if (i.kind === 'review') return i.waitingDays > 0 ? `${i.waitingDays} days overdue` : 'Coming up';
  if (i.kind === 'checkin') return 'Flagged today';
  // The group heading says how long things have waited; the row's own age
  // reads plainly, in white (showcase pass, 10 Oct).
  return i.waitingDays <= 0
    ? 'Sent today'
    : i.waitingDays === 1
      ? 'Sent yesterday'
      : `Sent ${i.waitingDays} days ago`;
};

const initialsOf = (i: InboxItem) => {
  if (i.kind === 'marking') return 'Q';
  if (i.kind === 'iqa') return 'IQ';
  const name = (i.learner ?? i.title).replace(/\(.*?\)/g, '');
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
};

export default function UnifiedInboxPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, stats, loading, error, refresh, markSeen, markAllAsRead } = useUnifiedInbox();

  const [filter, setFilter] = useState<Filter>(() => {
    const t = searchParams.get('tab');
    if (!t) return 'all';
    if (t in TAB_ALIAS) return TAB_ALIAS[t];
    return t === 'urgent' || (INBOX_KIND_ORDER as string[]).includes(t) ? (t as Filter) : 'all';
  });
  const [cohortFilter, setCohortFilter] = useState<string>(
    () => searchParams.get('cohort') ?? 'all'
  );
  const [age, setAge] = useState<Age>(() => {
    const a = searchParams.get('age');
    return a === 'new' || a === 'days' || a === 'week' ? a : 'any';
  });
  const [search, setSearch] = useState('');
  const [acting, setActing] = useState(false);
  const scope = useCollegeScope();

  // Keep the filter in the URL so a link (or Back) lands on the same view.
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (filter === 'all') next.delete('tab');
    else next.set('tab', filter);
    if (cohortFilter === 'all') next.delete('cohort');
    else next.set('cohort', cohortFilter);
    if (age === 'any') next.delete('age');
    else next.set('age', age);
    if (next.toString() !== searchParams.toString()) setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, cohortFilter, age]);

  // "Yours": one of MY learners (the scope's Mine), or an item about no
  // learner that the server marked as the caller's.
  // Only worth saying on Whole college: in Mine or My cohorts every row is
  // already yours, and a chip on all ninety rows says nothing (Today does the same).
  const isYours = useCallback(
    (i: InboxItem) =>
      scope.level === 'college' &&
      (!i.studentId && !i.userId && !i.cohort
        ? i.mine
        : scope.isMine({ studentId: i.studentId, userId: i.userId ?? null, cohortName: i.cohort })),
    [scope]
  );
  // useUnifiedInbox already narrows to the scope.
  const inScope = items;
  const cohortOptions = useMemo(
    () => Array.from(new Set(inScope.map((i) => i.cohort).filter((c): c is string => !!c))).sort(),
    [inScope]
  );
  // A cohort that left the view (scope changed) stops filtering.
  useEffect(() => {
    if (
      cohortFilter !== 'all' &&
      !scope.membership.loading &&
      !loading &&
      !cohortOptions.includes(cohortFilter)
    )
      setCohortFilter('all');
  }, [cohortFilter, cohortOptions, scope.membership.loading, loading]);
  const scoped = useMemo(
    () =>
      inScope.filter(
        (i) =>
          (cohortFilter === 'all' || i.cohort === cohortFilter) &&
          (age === 'any' || ageOf(i.waitingDays) === age)
      ),
    [inScope, cohortFilter, age]
  );
  const mineCount = useMemo(() => scoped.filter(isYours).length, [scoped, isYours]);
  const counts = useMemo(() => {
    const c: Record<string, number> = {
      all: scoped.length,
      urgent: scoped.filter((i) => i.urgent).length,
    };
    for (const k of INBOX_KIND_ORDER) c[k] = scoped.filter((i) => i.kind === k).length;
    return c;
  }, [scoped]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scoped.filter(
      (i) =>
        (filter === 'all' || (filter === 'urgent' ? i.urgent : i.kind === filter)) &&
        (!q ||
          [i.learner, i.title, i.body, i.cohort].some((v) => (v ?? '').toLowerCase().includes(q)))
    );
  }, [scoped, filter, search]);

  const groups = useMemo(() => bandRows(visible, (i) => i.waitingDays), [visible]);
  const oldestDays = scoped.reduce((m, i) => Math.max(m, i.waitingDays ?? 0), 0);

  const open = useCallback(
    (i: InboxItem) => {
      if (i.unread && i.kind !== 'marking') void markSeen([i.key]).catch(() => undefined);
      navigate(i.href);
    },
    [markSeen, navigate]
  );

  /* ── Bulk, keyboard, swipe (ELE-1889) ── */
  const ordered = useMemo(() => groups.flatMap((g) => g.rows), [groups]);
  const keys = useMemo(() => ordered.map((i) => i.key), [ordered]);
  const byKey = useMemo(() => new Map(ordered.map((i) => [i.key, i])), [ordered]);
  const sel = useSelection(keys);
  const picked = Array.from(sel.selected)
    .map((k) => byKey.get(k))
    .filter((i): i is InboxItem => !!i);
  const pickedHours = picked.filter((i) => i.kind === 'hours');
  const pickedUnseen = picked.filter((i) => i.unread && i.kind !== 'marking');
  const allTicked = keys.length > 0 && keys.every((k) => sel.has(k));

  // Hours verify through the same server path as the hours inbox
  // (notify-otj-status: verifies and tells the apprentice).
  const verifyHours = useCallback(
    async (rows: InboxItem[]) => {
      if (rows.length === 0) return;
      setActing(true);
      let failed = 0;
      for (const r of rows) {
        const err = await callOtjStatusEdgeFn(r.sourceId, 'verify');
        if (err) failed += 1;
      }
      setActing(false);
      sel.clear();
      await refresh();
      const ok = rows.length - failed;
      toast({
        title: failed
          ? `Verified ${ok}, ${failed} failed`
          : `Verified ${ok} ${ok === 1 ? 'entry' : 'entries'}`,
        description: failed ? 'Open the ones left to see why.' : 'The apprentices have been told.',
        variant: failed ? 'destructive' : undefined,
      });
    },
    [refresh, sel, toast]
  );

  const seen = useCallback(
    async (rows: InboxItem[]) => {
      const ks = rows.filter((i) => i.unread && i.kind !== 'marking').map((i) => i.key);
      if (ks.length === 0) return;
      try {
        await markSeen(ks);
        sel.clear();
        toast({ title: `${ks.length} marked as seen` });
      } catch (e) {
        toast({ title: 'Not marked', description: (e as Error).message, variant: 'destructive' });
      }
    },
    [markSeen, sel, toast]
  );

  const kb = useQueueKeys({
    keys,
    onOpen: (k) => {
      const i = byKey.get(k);
      if (i) open(i);
    },
    onToggle: (k) => sel.toggle(k),
    onClear: () => sel.clear(),
    extra: useMemo(
      () => ({
        // v: open it where the decision is made.
        v: (k: string) => {
          const i = byKey.get(k);
          if (i) open(i);
        },
        // Shift+V, never a bare key: verifying hours is final and tells the apprentice.
        V: (k: string) => {
          const i = byKey.get(k);
          if (i?.kind === 'hours') void verifyHours([i]);
          else if (i) open(i);
        },
        r: (k: string) => {
          const i = byKey.get(k);
          if (i && REPLY_KINDS.includes(i.kind)) open(i);
          else
            toast({ title: 'Nothing to reply to', description: 'r opens messages and comments.' });
        },
      }),
      [byKey, open, verifyHours, toast]
    ),
  });

  const markAll = async () => {
    try {
      const n = await markAllAsRead();
      toast({ title: n ? `${n} marked as seen` : 'Nothing new to mark' });
    } catch (e) {
      toast({ title: 'Not marked', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const kindsWithItems = INBOX_KIND_ORDER.filter((k) => counts[k] > 0);
  const filterOptions: Array<{ key: Filter; label: string; hint?: string }> = [
    { key: 'all', label: 'Everything' },
    { key: 'urgent', label: 'Waiting too long' },
    ...kindsWithItems.map((k) => ({
      key: k as Filter,
      label: INBOX_KIND_LABEL[k],
      hint: KIND_HINT[k],
    })),
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Inbox"
        backTo="/college"
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified the moment something lands in your inbox">
        {/* Hero */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-elec-yellow">Inbox</p>
            <h1 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              {loading
                ? 'Gathering your work…'
                : counts.all === 0
                  ? 'You’re clear'
                  : `${counts.all} ${counts.all === 1 ? 'thing needs' : 'things need'} you`}
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              {loading ? (
                'Hours, evidence, messages, reviews and marking from across your college.'
              ) : counts.all === 0 ? (
                'Nothing is waiting. New hours, evidence, messages and reviews land here as they arrive.'
              ) : (
                <FigureLine
                  items={[
                    counts.urgent
                      ? { n: counts.urgent, label: 'waiting too long', tone: 'warn' }
                      : { n: null, label: 'Nothing overdue', tone: 'good' },
                    oldestDays > 1
                      ? { n: `${oldestDays} days`, label: 'the oldest' }
                      : { n: null, label: '' },
                    scope.level === 'college' && mineCount
                      ? { n: mineCount, label: 'yours' }
                      : { n: null, label: '' },
                    stats.unread
                      ? { n: stats.unread, label: 'not seen yet' }
                      : { n: null, label: '' },
                  ]}
                />
              )}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            <CollegeScopeTabs />
            {stats.unread > 0 && (
              <button
                type="button"
                onClick={() => void markAll()}
                className="h-11 shrink-0 rounded-xl border border-white/[0.14] px-3.5 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
              >
                Mark seen
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-500/40 px-4 py-3">
            <p className="text-[13.5px] text-white">Couldn’t load the inbox: {error}</p>
            <button
              type="button"
              onClick={() => void refresh()}
              className="h-11 px-3 text-[13px] font-semibold text-elec-yellow"
            >
              Try again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Kinds: a rail on a wide screen, chips on a phone */}
          <nav aria-label="Inbox filters" className="lg:sticky lg:top-16">
            <QuietTabs
              label="Inbox filters"
              value={filter}
              onChange={setFilter}
              className="lg:hidden"
              tabs={filterOptions.map((f) => ({
                key: f.key,
                label: f.label,
                count: counts[f.key] ?? 0,
                warn: f.key === 'urgent',
              }))}
            />
            <ul className="hidden overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-2 lg:block">
              {filterOptions.map((f, idx) => (
                <li key={f.key}>
                  {idx === 2 && <div className="mx-3 my-2 border-t border-white/[0.08]" />}
                  <button
                    type="button"
                    aria-pressed={filter === f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left touch-manipulation transition-colors',
                      filter === f.key ? 'bg-white text-black' : 'text-white hover:bg-white/[0.05]'
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold">{f.label}</span>
                      {f.hint && (
                        <span
                          className={cn(
                            'block text-[12px] leading-snug',
                            filter === f.key ? 'text-black' : 'text-white'
                          )}
                        >
                          {f.hint}
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-[13px] font-bold tabular-nums',
                        filter === f.key
                          ? 'text-black'
                          : f.key === 'urgent' && (counts.urgent ?? 0) > 0
                            ? 'text-orange-300'
                            : 'text-white'
                      )}
                    >
                      {counts[f.key] ?? 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* The list */}
          <section className="min-w-0 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="relative min-w-0 flex-1">
                <Search
                  className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Find a learner, cohort or entry"
                  aria-label="Find a learner, cohort or entry"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="flex gap-2 sm:shrink-0">
                <Pick
                  label={cohortFilter === 'all' ? 'All cohorts' : cohortFilter}
                  active={cohortFilter !== 'all'}
                  options={[
                    { key: 'all', label: 'All cohorts' },
                    ...cohortOptions.map((c) => ({ key: c, label: c })),
                  ]}
                  onPick={setCohortFilter}
                  current={cohortFilter}
                  aria="Filter by cohort"
                />
                <Pick
                  label={AGE_LABEL[age]}
                  active={age !== 'any'}
                  options={(Object.keys(AGE_LABEL) as Age[]).map((k) => ({
                    key: k,
                    label: AGE_LABEL[k],
                  }))}
                  onPick={(k) => setAge(k as Age)}
                  current={age}
                  aria="Filter by how long it has waited"
                />
              </div>
            </div>

            {!loading && ordered.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => (allTicked ? sel.clear() : sel.setAll(keys))}
                  className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {allTicked ? 'Untick all' : `Tick all ${keys.length}`}
                </button>
                <KeyHint
                  items={[
                    ['j k', 'move'],
                    ['Enter v', 'open'],
                    ['Shift V', 'verify hours'],
                    ['r', 'reply'],
                    ['x', 'tick'],
                  ]}
                />
              </div>
            )}

            {loading ? (
              <div className="space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-6 py-10 text-center">
                <p className="text-[18px] font-semibold text-white">
                  {inScope.length === 0 ? 'Nothing needs you' : 'Nothing matches this view'}
                </p>
                <p className="mx-auto mt-2 max-w-md text-[14px] leading-relaxed text-white">
                  {inScope.length === 0
                    ? 'When a learner logs hours, submits evidence, sends a message or a review falls due, it lands here.'
                    : `Try another kind, cohort or age, clear the search, or switch from ${SCOPE_LABEL[scope.level]} to Whole college at the top.`}
                </p>
              </div>
            ) : (
              <>
                {groups.map((g) => (
                  <Group
                    key={g.band}
                    title={AGE_BAND_LABEL[g.band]}
                    tone={g.band === 'recent' ? undefined : 'urgent'}
                    rows={g.rows}
                    showKind={filter === 'all' || filter === 'urgent'}
                    onOpen={open}
                    sel={sel}
                    focus={kb.focus}
                    isYours={isYours}
                    onVerify={(i) => void verifyHours([i])}
                    onSeen={(i) => void seen([i])}
                  />
                ))}
              </>
            )}
          </section>
        </div>
      </HubBody>

      <BulkBar count={sel.count} onClear={sel.clear}>
        {pickedUnseen.length > 0 && (
          <button
            type="button"
            disabled={acting}
            onClick={() => void seen(pickedUnseen)}
            className="h-11 rounded-xl border border-white/[0.18] px-3.5 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06] disabled:opacity-50"
          >
            Mark {pickedUnseen.length} seen
          </button>
        )}
        {pickedHours.length > 0 && (
          <button
            type="button"
            disabled={acting}
            onClick={() => void verifyHours(pickedHours)}
            className="h-11 rounded-xl bg-elec-yellow px-3.5 text-[13px] font-bold text-black touch-manipulation disabled:opacity-50"
          >
            {acting
              ? 'Verifying…'
              : `Verify ${pickedHours.length} ${pickedHours.length === 1 ? 'entry' : 'entries'}`}
          </button>
        )}
        {pickedHours.length === 0 && pickedUnseen.length === 0 && (
          <span className="text-[12.5px] text-white">Open each one to decide it</span>
        )}
      </BulkBar>
    </HubPage>
  );
}

/** A compact filter picker (cohort, age) beside the search. A dropdown on
 *  desktop; a bottom sheet of 44px rows on a phone (college-mobile-standard 7). */
function Pick({
  label,
  active,
  options,
  onPick,
  aria,
  current,
}: {
  label: string;
  active: boolean;
  options: Array<{ key: string; label: string }>;
  onPick: (k: string) => void;
  aria: string;
  current: string;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const trigger = (
    <button
      type="button"
      aria-label={`${aria}: ${label}`}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={cn(
        'inline-flex h-11 min-w-0 flex-1 items-center justify-between gap-1.5 rounded-xl border px-3.5 text-[13px] font-semibold text-white touch-manipulation active:bg-white/[0.06] sm:max-w-[13rem] sm:flex-none',
        active ? 'border-white' : 'border-white/[0.14] hover:border-white/[0.3]'
      )}
    >
      <span className="truncate">{label}</span>
      <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </button>
  );
  if (isMobile) {
    return (
      <>
        {trigger}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            className="max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0 pb-[env(safe-area-inset-bottom)]"
          >
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-white/15" aria-hidden />
            <div className="px-4 pb-4 pt-3">
              <SheetTitle className="text-left text-[20px] font-semibold tracking-tight text-white">
                {aria}
              </SheetTitle>
              <SheetDescription className="sr-only">Pick one to filter the inbox.</SheetDescription>
              <ul className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {options.map((o) => {
                  const on = o.key === current;
                  return (
                    <li key={o.key}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          onPick(o.key);
                          setOpen(false);
                        }}
                        className="flex min-h-12 w-full items-center justify-between gap-3 py-2 text-left text-[15px] text-white touch-manipulation active:bg-white/[0.06]"
                      >
                        <span className={cn('min-w-0 break-words', on && 'font-semibold')}>
                          {o.label}
                        </span>
                        {on && (
                          <Check className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-80 w-60 overflow-y-auto border-white/[0.12] bg-[hsl(0_0%_10%)] p-1.5 text-white"
      >
        {options.map((o) => (
          <DropdownMenuItem
            key={o.key}
            onSelect={() => onPick(o.key)}
            className="min-h-11 cursor-pointer rounded-xl px-2.5 text-[13.5px] font-medium text-white focus:bg-white/[0.08] focus:text-white"
          >
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Group({
  title,
  rows,
  tone,
  showKind = true,
  onOpen,
  sel,
  focus,
  isYours,
  onVerify,
  onSeen,
}: {
  title: string;
  rows: InboxItem[];
  tone?: 'urgent';
  showKind?: boolean;
  onOpen: (i: InboxItem) => void;
  sel: { has: (k: string) => boolean; toggle: (k: string) => void };
  focus: string | null;
  isYours: (i: InboxItem) => boolean;
  onVerify: (i: InboxItem) => void;
  onSeen: (i: InboxItem) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between px-1">
        <h2
          className={cn(
            'text-[13px] font-semibold',
            tone === 'urgent' ? 'text-orange-300' : 'text-white'
          )}
        >
          {title}
        </h2>
        <span className="text-[12px] tabular-nums text-white">{rows.length}</span>
      </div>
      <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x">
        {rows.map((i) => {
          const ticked = sel.has(i.key);
          return (
            <li key={i.key} data-qkey={i.key}>
              <SwipeRow
                right={{
                  label: i.action,
                  icon: <ChevronRight className="h-5 w-5" aria-hidden="true" />,
                  tone: 'go',
                  onAction: () => (i.kind === 'hours' ? onVerify(i) : onOpen(i)),
                }}
                left={
                  i.unread && i.kind !== 'marking'
                    ? {
                        label: 'Seen',
                        icon: <Eye className="h-5 w-5" aria-hidden="true" />,
                        onAction: () => onSeen(i),
                      }
                    : {
                        label: ticked ? 'Untick' : 'Tick',
                        icon: <Check className="h-5 w-5" aria-hidden="true" />,
                        onAction: () => sel.toggle(i.key),
                      }
                }
              >
                <QueueRow
                  name={i.learner ?? i.title}
                  avatar={initialsOf(i)}

                  mine={isYours(i)}
                  title={i.learner ? i.title : undefined}
                  // App learning rows all carry the same explanation; the
                  // hours say what it is.
                  body={i.kind === 'app_learning' ? undefined : i.body || undefined}
                  meta={[
                    showKind ? INBOX_KIND_LABEL[i.kind] : null,
                    showKind ? waitingText(i).replace(/^S/, 's') : waitingText(i),
                    (i.cohort ?? '').replace(/\s*\(.*\)$/, '') || null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  urgent={false}
                  unread={i.unread}
                  action={i.action}
                  onOpen={() => onOpen(i)}
                  selectable
                  selected={ticked}
                  onToggle={() => sel.toggle(i.key)}
                  focused={focus === i.key}
                />
              </SwipeRow>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

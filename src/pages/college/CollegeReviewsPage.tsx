import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { inputCn } from '@/components/forms/fieldStyles';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  boardRowReviewId,
  daysUntil,
  fmtReviewDate,
  useReviewBoard,
  type BoardState,
  type ReviewBoardRow,
} from '@/hooks/useTripartiteReviews';
import { ReviewWorkspaceSheet } from '@/components/college/reviews/ReviewWorkspaceSheet';
import { QuietTabs } from '@/components/college/otj/hoursUi';
import { FigureLine } from '@/components/college/QueueFigures';

/* ==========================================================================
   CollegeReviewsPage — /college/reviews. Every learner's progress reviews.

   Funding rules 2025/26, para 97: a three-way review at least every 3
   calendar months (a review on 1 Aug means the next by 30 Nov), the employer
   attending in most of them (97.2.1), a signed summary shared with everyone
   (97.2.2). One row per learner: when the next is due, whether one is booked,
   who still has to sign, and how often the employer has attended.

   Figures come from get_review_board; the due date from tripartite_due_by.
   ========================================================================== */

type Filter = 'all' | 'overdue' | 'due_soon' | 'signatures' | 'booked' | 'employer';

// One meaning of "past due" everywhere on the page: the headline, the bar,
// Start here and this chip all count overdue, booked late and write-up
// rows. The chip used to say 4 while Start here said "Book 8 overdue".
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'overdue', label: 'Past due' },
  { key: 'due_soon', label: 'Due soon' },
  { key: 'signatures', label: 'To sign' },
  { key: 'booked', label: 'Booked' },
  { key: 'employer', label: 'Employer rarely attends' },
];

// Para 97.2.1: the employer attends in the majority of reviews.
const employerRarely = (r: ReviewBoardRow) =>
  r.reviews_done >= 2 && r.employer_attended * 2 <= r.reviews_done;

const matches = (r: ReviewBoardRow, f: Filter) =>
  f === 'all'
    ? true
    : f === 'overdue'
      ? r.state === 'overdue' || r.state === 'late' || r.state === 'write_up'
      : f === 'due_soon'
        ? r.state === 'due_soon'
        : f === 'signatures'
          ? r.state === 'signatures'
          : f === 'booked'
            ? r.state === 'scheduled'
            : employerRarely(r);

const HELP: PageHelpContent = {
  id: 'college-progress-reviews',
  title: 'Progress reviews',
  what: 'Every apprentice needs a three-way review with you and their employer at least every 3 calendar months. This page shows who is due, who is overdue and who still has to sign.',
  steps: [
    {
      title: 'Book the next one',
      body: 'Tap a learner who is due and schedule it. Their employer is added once and used every time.',
    },
    {
      title: 'Send the employer their link',
      body: 'They add their view in two minutes with no account. The invitation is kept as evidence they were asked.',
    },
    {
      title: 'Hold it and sign off',
      body: 'Everything the record knows is filled in. Work through the six steps, agree actions, and sign off; the apprentice and employer sign after.',
    },
  ],
  notes: [
    {
      title: 'What counts as overdue',
      body: 'A review on 1 August means the next is due by 30 November: the end of the third calendar month after.',
    },
    {
      title: 'The employer',
      body: 'They must attend most reviews. When they cannot, the link they were sent is the evidence they were given the chance to contribute.',
    },
  ],
  source: 'Apprenticeship funding rules 2025/26, paragraphs 97 and 98.',
};

export default function CollegeReviewsPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [filter, setFilter] = useState<Filter>(() => {
    const f = new URLSearchParams(window.location.search).get('filter') as Filter | null;
    return f && FILTERS.some((x) => x.key === f) ? f : 'all';
  });
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<{ row: ReviewBoardRow; reviewId: string | null } | null>(null);
  const collegeId = profile?.college_id ?? '';
  const { rows, loading, error, reload } = useReviewBoard(collegeId || null);

  // ?student=<id> (from the college inbox) opens that learner's next review,
  // or scheduling when none is booked.
  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get('student');
    if (!sid || rows.length === 0 || open) return;
    const row = rows.find((r) => r.student_id === sid);
    if (row) setOpen({ row, reviewId: boardRowReviewId(row) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  // /college/reviews?review=<id> (from a notification) opens that review.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('review');
    if (!id || rows.length === 0 || open) return;
    void supabase
      .from('college_tripartite_reviews')
      .select('student_id')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        const row = rows.find(
          (r) => r.student_id === (data as { student_id: string } | null)?.student_id
        );
        if (row) setOpen({ row, reviewId: id });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return rows.filter(
      (r) =>
        matches(r, filter) &&
        (!needle ||
          r.name.toLowerCase().includes(needle) ||
          (r.employer ?? '').toLowerCase().includes(needle))
    );
  }, [rows, filter, search]);

  const totals = useMemo(() => {
    const t = {
      overdue: 0,
      due_soon: 0,
      signatures: 0,
      booked: 0,
      employer: 0,
      attended: 0,
      done: 0,
    };
    for (const r of rows) {
      if (r.state === 'overdue' || r.state === 'late' || r.state === 'write_up') t.overdue += 1;
      if (r.state === 'due_soon') t.due_soon += 1;
      if (r.state === 'signatures') t.signatures += 1;
      if (r.state === 'scheduled') t.booked += 1;
      if (employerRarely(r)) t.employer += 1;
      t.attended += r.employer_attended;
      t.done += r.reviews_done;
    }
    return t;
  }, [rows]);

  const countFor = (f: Filter) =>
    f === 'all'
      ? rows.length
      : f === 'overdue'
        ? totals.overdue
        : f === 'due_soon'
          ? totals.due_soon
          : f === 'signatures'
            ? totals.signatures
            : f === 'booked'
              ? totals.booked
              : totals.employer;

  // One row per learner for the evidence file: due date, last held, what is
  // booked, signatures and employer attendance. Opens cleanly in Excel.
  const exportCsv = () => {
    const q = (v: unknown) => {
      const t = v == null ? '' : String(v);
      return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
    };
    const lines = [
      [
        'Learner',
        'Cohort',
        'Employer',
        'Review every (months)',
        'Last held',
        'Next due by',
        'Status',
        'Booked for',
        'Apprentice signed (last)',
        'Employer signed (last)',
        'Employer view in',
        'Reviews held',
        'Employer attended',
      ].join(','),
    ];
    for (const r of rows) {
      lines.push(
        [
          r.name,
          r.cohort,
          r.employer,
          r.frequency_months,
          r.last_held_on,
          r.due_by,
          STATE_PILL[r.state].label,
          r.next?.scheduled_at ? new Date(r.next.scheduled_at).toLocaleString('en-GB') : '',
          r.to_sign ? (r.to_sign.learner_signed ? 'Yes' : 'No') : '',
          r.to_sign ? (r.to_sign.employer_signed ? 'Yes' : 'No') : '',
          r.next ? (r.next.employer_input ? 'Yes' : 'No') : '',
          r.reviews_done,
          r.employer_attended,
        ]
          .map(q)
          .join(',')
      );
    }
    try {
      const blob = new Blob(['\ufeff', lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `progress-reviews-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast({ title: 'Export failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  // Readiness: in date = everything not overdue/late/write-up.
  const inDate = rows.filter((r) => !['overdue', 'late', 'write_up'].includes(r.state)).length;
  const seg = {
    ok: rows.filter((r) => r.state === 'ok').length,
    scheduled: rows.filter((r) => r.state === 'scheduled').length,
    due_soon: rows.filter((r) => r.state === 'due_soon').length,
    signatures: rows.filter((r) => r.state === 'signatures').length,
    overdue: rows.filter((r) => ['overdue', 'late', 'write_up'].includes(r.state)).length,
    toBook: rows.filter((r) => r.state === 'overdue').length,
    late: rows.filter((r) => r.state === 'late').length,
    writeUp: rows.filter((r) => r.state === 'write_up').length,
  };
  // The first four add up to "in date"; the last is past due.
  const SEG: Array<{
    k: 'ok' | 'scheduled' | 'due_soon' | 'signatures' | 'overdue';
    label: string;
    cn: string;
  }> = [
    { k: 'scheduled', label: 'Next one booked', cn: 'bg-emerald-400' },
    { k: 'ok', label: 'Not due yet', cn: 'bg-emerald-200' },
    { k: 'due_soon', label: 'Due within 3 weeks', cn: 'bg-white' },
    { k: 'signatures', label: 'Held, waiting to sign', cn: 'bg-white/40' },
    { k: 'overdue', label: 'Past due', cn: 'bg-orange-500' },
  ];
  const startHere =
    seg.overdue > 0
      ? {
          title: `${seg.overdue} ${seg.overdue === 1 ? 'review is' : 'reviews are'} past due`,
          body:
            [
              seg.toBook ? `${seg.toBook} to book` : null,
              seg.late ? `${seg.late} booked after the due date` : null,
              seg.writeUp ? `${seg.writeUp} held but not written up` : null,
            ]
              .filter(Boolean)
              .join(', ') + '. Book the earliest days you can and write up the ones already held.',
          filter: 'overdue' as Filter,
        }
      : seg.due_soon > 0
        ? {
            title: `Book ${seg.due_soon} due in the next 3 weeks`,
            body: 'Book them now so the employer has time to add their view.',
            filter: 'due_soon' as Filter,
          }
        : seg.signatures > 0
          ? {
              title: `Chase ${seg.signatures} ${seg.signatures === 1 ? 'signature' : 'signatures'}`,
              body: 'Reviews written up but not yet signed by everyone they need.',
              filter: 'signatures' as Filter,
            }
          : null;
  const comingUp = rows
    .filter(
      (r) =>
        r.next?.scheduled_at && new Date(r.next.scheduled_at).getTime() >= Date.now() - 3600_000
    )
    .sort((a, b) => (a.next!.scheduled_at as string).localeCompare(b.next!.scheduled_at as string))
    .slice(0, 6);
  const notInvited = comingUp.filter(
    (r) => !r.next?.employer_input && !r.next?.employer_invited
  ).length;
  const panel =
    'rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]';

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Progress reviews"
        backTo="/college"
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified when reviews fall due and when apprentices and employers sign">
        {/* Hero: the title and one status line of figures (showcase pass,
            10 Oct: the 70% figure dominated; the work is the list). */}
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[13px] font-semibold text-elec-yellow">Progress reviews</p>
            <h1 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              {loading ? 'Checking every learner…' : `${inDate} of ${rows.length} learners in date`}
            </h1>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white">
              A three-way review with the apprentice and their employer at least every 3 calendar
              months, signed by all three.
            </p>
            {!loading && rows.length > 0 && (
              <p className="mt-3">
                <FigureLine
                  items={[
                    { n: seg.scheduled + seg.ok, label: 'booked or not due', tone: 'good' },
                    totals.overdue > 0
                      ? { n: totals.overdue, label: 'past due', tone: 'warn' }
                      : { n: null, label: 'None past due', tone: 'good' },
                    { n: seg.due_soon, label: 'due in 3 weeks' },
                    totals.done > 0
                      ? {
                          n: `${totals.attended} of ${totals.done}`,
                          label: 'employer present',
                        }
                      : { n: null, label: '' },
                  ]}
                />
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={exportCsv}
            disabled={rows.length === 0}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation hover:border-elec-yellow active:bg-white/[0.06] disabled:opacity-60 lg:self-auto"
          >
            Export CSV
          </button>
        </header>

        {/* The list is the work, on the left; where things stand, what to do
            first and what is coming up sit beside it. On a phone: status,
            the list, then Coming up. */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] xl:grid-rows-[auto_1fr]">
          {/* Where things stand */}
          <section
            className={cn(
              panel,
              '-mx-4 rounded-none border-x-0 sm:mx-0 sm:rounded-3xl sm:border-x xl:col-start-2 xl:row-start-1'
            )}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-white">Where things stand</h2>
                <span className="text-[13px] tabular-nums text-white">
                  {loading ? '' : `${rows.length} learners`}
                </span>
              </div>
              <div
                className="mt-4 flex h-2 gap-[3px] overflow-hidden rounded-full"
                aria-hidden="true"
              >
                {rows.length === 0 ? (
                  <div className="flex-1 bg-white/[0.08]" />
                ) : (
                  SEG.map((g) =>
                    seg[g.k] > 0 ? (
                      <div
                        key={g.k}
                        className={cn(g.cn, 'first:rounded-l-full last:rounded-r-full')}
                        style={{ flexGrow: seg[g.k] }}
                      />
                    ) : null
                  )
                )}
              </div>
              <ul className="mt-4 divide-y divide-white/[0.06]">
                {SEG.map((g) => (
                  <li key={g.k} className="flex items-center gap-2.5 py-2 text-[13.5px] text-white">
                    <span className={cn('h-2 w-2 shrink-0 rounded-full', g.cn)} aria-hidden />
                    <span className="flex-1">{g.label}</span>
                    <span
                      className={cn(
                        'font-semibold tabular-nums',
                        g.k === 'overdue' && seg[g.k] > 0 ? 'text-orange-300' : 'text-white'
                      )}
                    >
                      {seg[g.k]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/[0.08] p-5 sm:p-6">
              <p className="text-[13px] font-semibold text-white">Start here</p>
              <p className="mt-1 text-[17px] font-semibold leading-snug text-white">
                {loading ? '…' : startHere ? startHere.title : 'Every review is in date'}
              </p>
              <p className="mt-1 text-[13.5px] leading-snug text-white">
                {loading
                  ? ''
                  : startHere
                    ? startHere.body
                    : 'New ones appear here three weeks before they fall due.'}
              </p>
              {startHere && (
                <button
                  type="button"
                  onClick={() => {
                    setFilter(startHere.filter);
                    window.setTimeout(
                      () =>
                        document
                          .getElementById('review-list')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                      50
                    );
                  }}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation active:scale-[0.98]"
                >
                  Show them
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </section>

          {/* The list */}
          <section
            id="review-list"
            className="min-w-0 scroll-mt-20 space-y-3 xl:col-start-1 xl:row-span-2 xl:row-start-1"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-[17px] font-semibold tracking-tight text-white">Every learner</h2>
              <div className="relative lg:w-72">
                <Search
                  className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Find a learner or employer"
                  aria-label="Find a learner or employer"
                  className={cn(inputCn, 'pl-7')}
                />
              </div>
            </div>

            <div className="-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x">
              <QuietTabs
                label="Filter reviews"
                value={filter}
                onChange={setFilter}
                className="mx-0 border-white/[0.06] px-2 sm:px-3"
                tabs={FILTERS.map((f) => ({
                  key: f.key,
                  label: f.label,
                  count: countFor(f.key),
                  warn: f.key !== 'all' && f.key !== 'booked',
                }))}
              />
              {loading ? (
                <div className="space-y-px animate-pulse">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white/[0.03]" />
                  ))}
                </div>
              ) : error ? (
                <p className="px-5 py-8 text-center text-[13px] text-white">
                  Could not load reviews. {error}
                </p>
              ) : filtered.length === 0 ? (
                <p className="px-5 py-10 text-center text-[14px] text-white">
                  {rows.length === 0
                    ? 'No learners have joined yet.'
                    : 'No learners match this view.'}
                </p>
              ) : (
                <ul className="-mb-px divide-y divide-white/[0.06]">
                  {filtered.map((r) => (
                    <li key={r.student_id}>
                      <BoardRow
                        row={r}
                        onClick={() => setOpen({ row: r, reviewId: boardRowReviewId(r) })}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Coming up */}
          <aside className="order-last flex min-w-0 flex-col gap-3 xl:order-none xl:col-start-2 xl:row-start-2">
            <div
              className={cn(
                panel,
                '-mx-4 overflow-hidden rounded-none border-x-0 sm:mx-0 sm:rounded-3xl sm:border-x'
              )}
            >
              <div className="flex items-baseline justify-between gap-3 px-5 pb-2 pt-4">
                <h2 className="text-[15px] font-semibold text-white">Coming up</h2>
                {comingUp.length > 0 && (
                  <span className="text-[13px] text-white">
                    {notInvited === comingUp.length
                      ? 'Employers not invited yet'
                      : `${comingUp.length - notInvited} of ${comingUp.length} employers invited`}
                  </span>
                )}
              </div>
              {comingUp.length === 0 ? (
                <p className="px-5 pb-6 pt-1 text-[13.5px] leading-relaxed text-white">
                  Nothing booked yet. Booked reviews show here by date, with whether the employer
                  has added their view.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                  {comingUp.map((r) => {
                    const d = new Date(r.next!.scheduled_at as string);
                    const invite = r.next!.employer_input
                      ? 'Employer view in'
                      : r.next!.employer_invited
                        ? 'Employer invited'
                        : 'Employer not invited';
                    return (
                      <li key={r.student_id}>
                        <button
                          type="button"
                          onClick={() => setOpen({ row: r, reviewId: r.next!.id })}
                          className="flex w-full items-center gap-4 px-5 py-3 text-left touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                        >
                          <span className="flex w-11 shrink-0 flex-col items-center">
                            <span className="text-[12px] font-medium text-white">
                              {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                            </span>
                            <span className="mt-0.5 text-[19px] font-bold leading-none tabular-nums text-white">
                              {d.getDate()}
                            </span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-[14.5px] font-semibold leading-snug text-white">
                              {r.name}
                            </span>
                            <span className="block text-[12.5px] leading-snug text-white">
                              {d.toLocaleDateString('en-GB', { month: 'short' })}{' '}
                              {d.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {notInvited === comingUp.length ? '' : ` · ${invite.toLowerCase()}`}
                            </span>
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </HubBody>

      {open && (
        <ReviewWorkspaceSheet
          open
          onOpenChange={(o) => {
            if (!o) {
              setOpen(null);
              void reload();
              if (/[?&](review|student)=/.test(window.location.search))
                navigate('/college/reviews', { replace: true });
            }
          }}
          reviewId={open.reviewId}
          studentId={open.row.student_id}
          studentName={open.row.name}
          collegeId={collegeId}
          onChanged={() => void reload()}
        />
      )}
    </HubPage>
  );
}

// Chips are border and text only: orange needs you, green is done or in
// hand, neutral otherwise.
const WARN = 'border-orange-400/60 text-orange-300';
const GOOD = 'border-emerald-400/50 text-emerald-300';
const PLAIN = 'border-white/[0.16] text-white';
const STATE_PILL: Record<BoardState, { label: string; cn: string; action: string }> = {
  overdue: { label: 'Past due', cn: WARN, action: 'Book' },
  late: { label: 'Booked late', cn: WARN, action: 'Open' },
  write_up: { label: 'Write up', cn: WARN, action: 'Write up' },
  due_soon: { label: 'Due soon', cn: WARN, action: 'Book' },
  signatures: { label: 'To sign', cn: PLAIN, action: 'Chase' },
  scheduled: { label: 'Booked', cn: GOOD, action: 'Open' },
  ok: { label: 'In date', cn: GOOD, action: 'Open' },
};

function BoardRow({ row, onClick }: { row: ReviewBoardRow; onClick: () => void }) {
  const days = daysUntil(row.due_by);
  const pill = STATE_PILL[row.state];
  const n = row.next;
  const urgent = ['overdue', 'late', 'write_up'].includes(row.state);
  const initials = row.name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  const when =
    row.state === 'signatures' && row.to_sign
      ? [
          !row.to_sign.learner_signed && 'apprentice to sign',
          row.to_sign.employer_must_sign &&
            !row.to_sign.employer_signed &&
            'employer must sign: plan changed',
        ]
          .filter(Boolean)
          .join(' · ')
      : n?.scheduled_at
        ? row.state === 'write_up'
          ? `held ${fmtReviewDate(n.scheduled_at, true)}, not written up`
          : `${fmtReviewDate(n.scheduled_at, true)}${n.employer_input ? ' · employer view in' : n.employer_invited ? ' · employer invited' : ' · employer not invited yet'}`
        : row.due_by
          ? days != null && days < 0
            ? `${-days} ${days === -1 ? 'day' : 'days'} over · was due ${fmtReviewDate(row.due_by)}`
            : `Due by ${fmtReviewDate(row.due_by)} · ${days} days left`
          : 'No start date';
  // Name on its own line, the state and the date under it; initials stay
  // neutral and the row's verb is outlined (one solid yellow per screen).
  // Only the state word carries colour (showcase pass, 10 Oct).
  const rarely = employerRarely(row);
  return (
    <button
      type="button"
      onClick={onClick}
      data-review-row={row.student_id}
      className="flex h-full w-full items-center gap-3 px-4 py-3.5 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.07] sm:gap-4 sm:px-5"
    >
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[13px] font-bold text-white sm:h-11 sm:w-11"
      >
        {initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block break-words text-[15px] font-semibold leading-snug text-white">
          {row.name}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-white">
          <span
            className={cn(
              'font-semibold',
              urgent || row.state === 'due_soon'
                ? 'text-orange-300'
                : row.state === 'scheduled' || row.state === 'ok'
                  ? 'text-emerald-300'
                  : 'text-white'
            )}
          >
            {pill.label}
          </span>
          {' · '}
          {when}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-white">
          {[
            row.employer ?? 'No employer recorded',
            (row.cohort ?? '').replace(/\s*\(.*\)$/, '') || null,
            row.last_held_on && `last held ${fmtReviewDate(row.last_held_on)}`,
          ]
            .filter(Boolean)
            .join(' · ')}
          {rarely && (
            <span className="font-semibold text-orange-300">
              {' · '}employer at {row.employer_attended} of {row.reviews_done}
            </span>
          )}
        </span>
      </span>
      <span className="hidden h-11 w-[96px] shrink-0 items-center justify-center rounded-xl border border-white/[0.18] text-[13px] font-semibold text-white sm:inline-flex">
        {pill.action}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden="true" />
    </button>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HowItWorks, PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
} from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, inputCn } from '@/components/forms/fieldStyles';
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

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'overdue', label: 'Overdue' },
  { key: 'due_soon', label: 'To book or write up' },
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
      ? r.state === 'overdue' || r.state === 'late'
      : f === 'due_soon'
        ? r.state === 'due_soon' || r.state === 'write_up'
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
    { title: 'Book the next one', body: 'Tap a learner who is due and schedule it. Their employer is added once and used every time.' },
    { title: 'Send the employer their link', body: 'They add their view in two minutes with no account. The invitation is kept as evidence they were asked.' },
    { title: 'Hold it and sign off', body: 'Everything the record knows is filled in. Work through the six steps, agree actions, and sign off; the apprentice and employer sign after.' },
  ],
  notes: [
    { title: 'What counts as overdue', body: 'A review on 1 August means the next is due by 30 November: the end of the third calendar month after.' },
    { title: 'The employer', body: 'They must attend most reviews. When they cannot, the link they were sent is the evidence they were given the chance to contribute.' },
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
        const row = rows.find((r) => r.student_id === (data as { student_id: string } | null)?.student_id);
        if (row) setOpen({ row, reviewId: id });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return rows.filter(
      (r) =>
        matches(r, filter) &&
        (!needle || r.name.toLowerCase().includes(needle) || (r.employer ?? '').toLowerCase().includes(needle))
    );
  }, [rows, filter, search]);

  const totals = useMemo(() => {
    const t = { overdue: 0, due_soon: 0, signatures: 0, booked: 0, employer: 0, attended: 0, done: 0 };
    for (const r of rows) {
      if (r.state === 'overdue' || r.state === 'late') t.overdue += 1;
      if (r.state === 'due_soon' || r.state === 'write_up') t.due_soon += 1;
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
        'Learner', 'Cohort', 'Employer', 'Review every (months)', 'Last held', 'Next due by', 'Status',
        'Booked for', 'Apprentice signed (last)', 'Employer signed (last)', 'Employer view in', 'Reviews held', 'Employer attended',
      ].join(','),
    ];
    for (const r of rows) {
      lines.push(
        [
          r.name, r.cohort, r.employer, r.frequency_months, r.last_held_on, r.due_by, STATE_PILL[r.state].label,
          r.next?.scheduled_at ? new Date(r.next.scheduled_at).toLocaleString('en-GB') : '',
          r.to_sign ? (r.to_sign.learner_signed ? 'Yes' : 'No') : '',
          r.to_sign ? (r.to_sign.employer_signed ? 'Yes' : 'No') : '',
          r.next ? (r.next.employer_input ? 'Yes' : 'No') : '', r.reviews_done, r.employer_attended,
        ].map(q).join(',')
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
  const pct = rows.length ? Math.round((100 * inDate) / rows.length) : 0;
  const seg = {
    ok: rows.filter((r) => r.state === 'ok').length,
    scheduled: rows.filter((r) => r.state === 'scheduled').length,
    due_soon: rows.filter((r) => r.state === 'due_soon').length,
    signatures: rows.filter((r) => r.state === 'signatures').length,
    overdue: rows.filter((r) => ['overdue', 'late', 'write_up'].includes(r.state)).length,
  };
  const SEG: Array<{ k: keyof typeof seg; label: string; cn: string }> = [
    { k: 'ok', label: 'In date', cn: 'bg-emerald-500' },
    { k: 'scheduled', label: 'Booked', cn: 'bg-emerald-300' },
    { k: 'due_soon', label: 'Due soon', cn: 'bg-white' },
    { k: 'signatures', label: 'To sign', cn: 'bg-sky-400' },
    { k: 'overdue', label: 'Overdue', cn: 'bg-red-500' },
  ];
  const startHere =
    seg.overdue > 0
      ? { title: `Book ${seg.overdue} overdue ${seg.overdue === 1 ? 'review' : 'reviews'}`, body: 'They are past the 3-month limit. Book the earliest days you can.', filter: 'overdue' as Filter }
      : seg.due_soon > 0
        ? { title: `Book ${seg.due_soon} due in the next 3 weeks`, body: 'Book them now so the employer has time to add their view.', filter: 'due_soon' as Filter }
        : seg.signatures > 0
          ? { title: `Chase ${seg.signatures} ${seg.signatures === 1 ? 'signature' : 'signatures'}`, body: 'Reviews written up but not yet signed by everyone they need.', filter: 'signatures' as Filter }
          : null;
  const comingUp = rows
    .filter((r) => r.next?.scheduled_at && new Date(r.next.scheduled_at).getTime() >= Date.now() - 3600_000)
    .sort((a, b) => (a.next!.scheduled_at as string).localeCompare(b.next!.scheduled_at as string))
    .slice(0, 6);
  const panel = 'rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]';

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Progress reviews"
        backTo="/college?section=assessmenthub"
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody pushContext="Get notified when reviews fall due and when apprentices and employers sign">
        {/* Hero */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">Progress reviews</p>
            <h1 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
              {loading ? 'Checking every learner…' : `${inDate} of ${rows.length} learners in date`}
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-white">
              A three-way review with the apprentice and their employer at least every 3 calendar months.
              {!loading && totals.done > 0
                ? ` Employers attended ${totals.attended} of ${totals.done} signed reviews.`
                : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            disabled={rows.length === 0}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.1] disabled:opacity-60 lg:self-auto"
          >
            Export CSV
          </button>
        </header>

        <HowItWorks help={HELP} />

        {/* Readiness */}
        <section className={cn(panel, '-mx-4 rounded-none border-x-0 p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-7')}>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <div>
              <p className="text-[13px] font-medium text-white">Learners with a review in date</p>
              <p className="mt-1 text-[52px] font-bold leading-none tabular-nums text-elec-yellow sm:text-[64px]">
                {loading ? '—' : `${pct}%`}
              </p>
              <div className="mt-5 flex h-3.5 gap-[3px] overflow-hidden rounded-full" aria-hidden="true">
                {rows.length === 0 ? (
                  <div className="flex-1 bg-white/[0.08]" />
                ) : (
                  SEG.map((g) =>
                    seg[g.k] > 0 ? <div key={g.k} className={cn(g.cn, 'first:rounded-l-full last:rounded-r-full')} style={{ flexGrow: seg[g.k] }} /> : null
                  )
                )}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 sm:flex sm:flex-wrap">
                {SEG.map((g) => (
                  <li key={g.k} className="flex items-center gap-2 text-[13px] text-white">
                    <span className={cn('h-2.5 w-2.5 rounded-full', g.cn)} />
                    <span className="font-semibold tabular-nums">{seg[g.k]}</span>
                    {g.label.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.08] bg-background p-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">Start here</p>
                <p className="mt-2 text-[19px] font-semibold leading-snug text-white">
                  {startHere ? startHere.title : 'Every review is in date'}
                </p>
                <p className="mt-1 text-[13.5px] text-white">
                  {startHere ? startHere.body : 'New ones appear here three weeks before they fall due.'}
                </p>
              </div>
              {startHere && (
                <button
                  type="button"
                  onClick={() => {
                    setFilter(startHere.filter);
                    window.setTimeout(() => document.getElementById('review-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
                  }}
                  className="inline-flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation active:scale-[0.98]"
                >
                  Show them
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* The list */}
          <section id="review-list" className="min-w-0 scroll-mt-20 space-y-3">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0">
                {FILTERS.map((f) => {
                  const active = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFilter(f.key)}
                      aria-pressed={active}
                      className={cn(
                        'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[12.5px] font-semibold touch-manipulation',
                        active ? 'border-white bg-white text-black' : 'border-white/[0.14] text-white'
                      )}
                    >
                      {f.label}
                      <span className="tabular-nums">{countFor(f.key)}</span>
                    </button>
                  );
                })}
              </div>
              <div className="relative lg:w-72">
                <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden="true" />
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
              {loading ? (
                <div className="space-y-px animate-pulse">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-white/[0.03]" />
                  ))}
                </div>
              ) : error ? (
                <p className="px-5 py-8 text-center text-[13px] text-white">Could not load reviews. {error}</p>
              ) : filtered.length === 0 ? (
                <p className="px-5 py-10 text-center text-[14px] text-white">
                  {rows.length === 0 ? 'No learners have joined yet.' : 'No learners match this view.'}
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {filtered.map((r) => (
                    <li key={r.student_id}>
                      <BoardRow row={r} onClick={() => setOpen({ row: r, reviewId: boardRowReviewId(r) })} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Coming up */}
          <aside className="space-y-3 xl:sticky xl:top-16">
            <h2 className="px-1 text-[15px] font-semibold text-white">Coming up</h2>
            <div className={cn(panel, 'overflow-hidden')}>
              {comingUp.length === 0 ? (
                <p className="px-5 py-6 text-[13.5px] leading-relaxed text-white">
                  Nothing booked yet. Booked reviews show here by date, with whether the employer has added their view.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {comingUp.map((r) => {
                    const d = new Date(r.next!.scheduled_at as string);
                    return (
                      <li key={r.student_id}>
                        <button
                          type="button"
                          onClick={() => setOpen({ row: r, reviewId: r.next!.id })}
                          className="flex w-full items-center gap-4 px-5 py-3.5 text-left touch-manipulation hover:bg-white/[0.04]"
                        >
                          <span className="flex w-12 shrink-0 flex-col items-center rounded-xl border border-white/[0.12] bg-background py-1.5">
                            <span className="text-[10.5px] font-semibold uppercase text-elec-yellow">
                              {d.toLocaleDateString('en-GB', { month: 'short' })}
                            </span>
                            <span className="text-[18px] font-bold leading-none tabular-nums text-white">{d.getDate()}</span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold text-white">{r.name}</span>
                            <span className="block truncate text-[12px] text-white">
                              {d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                              {' · '}
                              {r.next!.employer_input ? 'employer view in' : r.next!.employer_invited ? 'employer invited' : 'employer not invited'}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
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
              if (/[?&](review|student)=/.test(window.location.search)) navigate('/college/reviews', { replace: true });
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

const STATE_PILL: Record<BoardState, { label: string; cn: string; action: string }> = {
  overdue: { label: 'Overdue', cn: 'bg-red-500 text-white', action: 'Book' },
  late: { label: 'Booked late', cn: 'bg-orange-500 text-black', action: 'Open' },
  write_up: { label: 'Write up', cn: 'bg-orange-500 text-black', action: 'Write up' },
  due_soon: { label: 'Due soon', cn: 'bg-white text-black', action: 'Book' },
  signatures: { label: 'To sign', cn: 'bg-sky-400 text-black', action: 'Chase' },
  scheduled: { label: 'Booked', cn: 'bg-emerald-300 text-black', action: 'Open' },
  ok: { label: 'In date', cn: 'bg-emerald-500 text-black', action: 'Open' },
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
          row.to_sign.employer_must_sign && !row.to_sign.employer_signed && 'employer must sign: plan changed',
        ]
          .filter(Boolean)
          .join(' · ')
      : n?.scheduled_at
        ? `Booked ${fmtReviewDate(n.scheduled_at, true)}${n.employer_input ? ' · employer view in' : n.employer_invited ? ' · employer invited' : ' · employer not invited yet'}`
        : row.due_by
          ? days != null && days < 0
            ? `${-days} days overdue · was due by ${fmtReviewDate(row.due_by)}`
            : `Due by ${fmtReviewDate(row.due_by)} · ${days} days left`
          : 'No start date';
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 px-4 py-4 text-left touch-manipulation transition-colors hover:bg-white/[0.04] sm:px-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13.5px] font-bold',
          urgent ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
        )}
      >
        {initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="truncate text-[15px] font-semibold text-white">{row.name}</span>
          <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold', pill.cn)}>{pill.label}</span>
        </span>
        <span className={cn('mt-1 block text-[13px] leading-snug', urgent ? 'font-semibold text-orange-300' : 'text-white')}>{when}</span>
        <span className="mt-0.5 block truncate text-[12px] text-white">
          {[
            row.employer ?? 'No employer recorded',
            row.cohort,
            row.last_held_on && `last held ${fmtReviewDate(row.last_held_on)}`,
            row.reviews_done > 0 && `employer at ${row.employer_attended} of ${row.reviews_done}`,
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
      </span>
      <span
        className={cn(
          'hidden h-11 w-[104px] shrink-0 items-center justify-center rounded-xl text-[13px] font-bold sm:inline-flex',
          urgent ? 'bg-elec-yellow text-black' : 'border border-white/[0.18] text-white'
        )}
      >
        {pill.action}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden="true" />
    </button>
  );
}

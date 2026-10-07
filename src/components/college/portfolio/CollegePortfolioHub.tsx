import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  COLLEGE_BTN,
  COLLEGE_LINK,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegeLinkCard,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import { Bars, QueueGroup, QueueRow, daysSince, initialsOf, waitingLabel } from '@/components/college/assessment/AssessmentKit';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useMyScope } from '@/components/college/people/useMyScope';
import { FilterChips, ListLoading, SEARCH_CN, ScopeSwitch, plural } from '@/components/college/people/peopleKit';
import { STATE_SWATCH } from '@/hooks/portfolio/usePortfolioAcState';
import {
  passedOf,
  useCollegePortfolioOverview,
  type CriteriaCounts,
  type PortfolioLearner,
  type WaitingSubmission,
} from './useCollegePortfolioOverview';
import { PortfolioToolsSheet } from './PortfolioToolsSheet';

/* ==========================================================================
   CollegePortfolioHub — /college?section=portfolio. The tutor's portfolio
   home, rebuilt 7 Oct 2026 on the College Hub kit.

   Why it was empty: the old hub read college_student_assignments rows that
   name the caller as tutor, assessor or IQA. Learners who are yours because
   they sit in your cohort have no such row, so a tutor with a full cohort
   saw "Total students 0". It now reads college_portfolio_overview(), which
   covers every learner at the college; "My learners / Whole college" is the
   one College Hub switch (useMyScope).

   Where the old tabs went:
   - Review queue  → "Waiting for a decision" here; each row opens Student
                     360's assess area, where decisions are recorded on the
                     criteria (portfolio_assessment_decisions).
   - IQA sampling  → /college/iqa (sampling plan, verdicts, actions).
   - Student page  → Student 360 for criteria and evidence; extra
                     requirements and the EPA gateway checklist open in the
                     tools sheet on each learner row.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-portfolios',
  title: 'Portfolios',
  what: 'Every learner’s portfolio in one place: the evidence waiting for your decision, oldest first, and how far each learner is through their criteria.',
  steps: [
    {
      title: 'Clear what is waiting',
      body: 'Each row is evidence a learner has sent for assessment. Tap it to open their criteria in Student 360 and record passed, needs more or not yet. The learner sees your decision straight away.',
    },
    {
      title: 'Check progress',
      body: 'The learner list shows criteria passed out of the total for their qualification, when they last added evidence and anything still waiting. Filter to find learners who have gone quiet.',
    },
    {
      title: 'Set extra requirements or check the gateway',
      body: 'The slider button on a learner row opens extra evidence requirements for that learner and their EPA gateway checklist.',
    },
    {
      title: 'Sample for IQA',
      body: 'Internal quality assurance sampling, verdicts and actions live on the IQA page, linked at the bottom.',
    },
  ],
  notes: [
    {
      title: 'My learners or the whole college',
      body: 'My learners are those in cohorts you tutor, or where you are named tutor, assessor or IQA. The switch is shared with every College Hub screen.',
    },
    {
      title: 'Learners who have not joined',
      body: 'Their evidence lives in their own Elec-Mate account, so they show no criteria until they join with the cohort code.',
    },
  ],
  legend: [
    { swatch: STATE_SWATCH.iqa_confirmed, label: 'Passed or IQA confirmed', body: 'An assessor passed it.' },
    { swatch: STATE_SWATCH.submitted, label: 'Submitted', body: 'Sent for assessment, waiting for a decision.' },
    { swatch: STATE_SWATCH.referred, label: 'Needs more or not yet', body: 'Sent back with feedback.' },
    { swatch: STATE_SWATCH.claimed, label: 'Claimed', body: 'The learner linked evidence but has not sent it yet.' },
    { swatch: 'bg-orange-500', label: 'Waiting a week or more', body: 'Evidence that sits this long holds the learner up.' },
  ],
};

const STATUS_LABEL: Record<string, string> = {
  submitted: 'New',
  resubmitted: 'Resubmitted',
  under_review: 'In review',
};

type LearnerFilter = 'all' | 'waiting' | 'quiet' | 'not_joined';

const QUIET_DAYS = 30;
const WAIT_URGENT_DAYS = 7;

const fmtDate = (iso: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString('en-GB', sameYear ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' });
};

const isActive = (s: string | null) => {
  const v = (s ?? 'active').trim().toLowerCase();
  return v !== 'withdrawn' && v !== 'archived' && v !== 'completed';
};

/** Stacked bar of one learner's criteria, in the six-state colours. */
function CriteriaBar({ c }: { c: CriteriaCounts }) {
  const total = Math.max(1, c.total);
  const parts: Array<[number, string]> = [
    [c.iqa_confirmed, STATE_SWATCH.iqa_confirmed],
    [c.passed, STATE_SWATCH.passed],
    [c.submitted, STATE_SWATCH.submitted],
    [c.referred + c.iqa_rejected, STATE_SWATCH.referred],
    [c.claimed, STATE_SWATCH.claimed],
  ];
  return (
    <span className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
      {parts.map(([n, cls], i) =>
        n > 0 ? <span key={i} className={cn('h-full', cls)} style={{ width: `${Math.max(1.5, (n / total) * 100)}%` }} /> : null
      )}
    </span>
  );
}

function ChartEmpty({ text }: { text: string }) {
  return (
    <div className="flex min-h-[96px] items-center justify-center rounded-2xl border border-dashed border-white/[0.12] px-4 py-6 text-center text-[12.5px] text-white">
      {text}
    </div>
  );
}

export default function CollegePortfolioHub() {
  const navigate = useNavigate();
  const { staff, students, cohorts, isLoading: ctxLoading } = useCollegeSupabase();
  const scopeInfo = useMyScope({ staff, students, cohorts });
  const { scope, setScope, hasMine, myStudentIds } = scopeInfo;
  const { data, isLoading, isFetching, error, refetch } = useCollegePortfolioOverview();

  const [filter, setFilter] = useState<LearnerFilter>('all');
  const [search, setSearch] = useState('');
  const [showAllWaiting, setShowAllWaiting] = useState(false);
  const [toolsFor, setToolsFor] = useState<PortfolioLearner | null>(null);

  const allLearners = useMemo(() => (data?.learners ?? []).filter((l) => isActive(l.status)), [data]);
  const learners = useMemo(
    () => (scope === 'mine' ? allLearners.filter((l) => myStudentIds.has(l.student_id)) : allLearners),
    [allLearners, scope, myStudentIds]
  );
  const waiting = useMemo(() => {
    const rows = data?.waiting ?? [];
    const scoped = scope === 'mine' ? rows.filter((w) => myStudentIds.has(w.student_id)) : rows;
    return [...scoped].sort((a, b) => Date.parse(a.submitted_at) - Date.parse(b.submitted_at));
  }, [data, scope, myStudentIds]);
  const allWaitingCount = data?.waiting.length ?? 0;

  /* ── Figures ── */
  const figures = useMemo(() => {
    const withWork = learners.filter((l) => l.waiting > 0).length;
    const oldest = waiting[0] ?? null;
    const oldestDays = oldest ? daysSince(oldest.submitted_at) : null;
    let passed = 0;
    let total = 0;
    let assessed = 0;
    for (const l of learners) {
      if (!l.criteria) continue;
      passed += passedOf(l.criteria);
      total += l.criteria.total;
      assessed += 1;
    }
    return {
      withWork,
      oldest,
      oldestDays,
      passed,
      total,
      assessed,
      resubmitted: waiting.filter((w) => w.status === 'resubmitted').length,
      pct: total > 0 ? Math.round((passed / total) * 1000) / 10 : null,
    };
  }, [learners, waiting]);

  /* ── State distribution across the scoped learners ── */
  const distribution = useMemo(() => {
    const t = { iqa_confirmed: 0, passed: 0, submitted: 0, referred: 0, claimed: 0, suggested: 0, not_started: 0 };
    for (const l of learners) {
      const c = l.criteria;
      if (!c) continue;
      t.iqa_confirmed += c.iqa_confirmed;
      t.passed += c.passed;
      t.submitted += c.submitted;
      t.referred += c.referred + c.iqa_rejected;
      t.claimed += c.claimed;
      t.suggested += c.suggested;
      t.not_started += c.not_started;
    }
    return [
      { key: 'iqa_confirmed', label: 'IQA confirmed', n: t.iqa_confirmed, cls: STATE_SWATCH.iqa_confirmed },
      { key: 'passed', label: 'Passed', n: t.passed, cls: STATE_SWATCH.passed },
      { key: 'submitted', label: 'Submitted', n: t.submitted, cls: STATE_SWATCH.submitted },
      { key: 'referred', label: 'Needs more / not yet', n: t.referred, cls: STATE_SWATCH.referred },
      { key: 'claimed', label: 'Claimed', n: t.claimed, cls: STATE_SWATCH.claimed },
      { key: 'suggested', label: 'Suggested (AI)', n: t.suggested, cls: STATE_SWATCH.suggested },
    ];
  }, [learners]);

  const bands = useMemo(() => {
    const b = [
      { label: 'None passed', n: 0, cls: 'bg-white/[0.3]' },
      { label: 'Under a quarter', n: 0, cls: 'bg-sky-400' },
      { label: 'A quarter to half', n: 0, cls: 'bg-sky-300' },
      { label: 'Half to three quarters', n: 0, cls: 'bg-emerald-400' },
      { label: 'Three quarters or more', n: 0, cls: 'bg-emerald-300' },
    ];
    let notJoined = 0;
    for (const l of learners) {
      if (!l.criteria || l.criteria.total === 0) {
        notJoined += 1;
        continue;
      }
      const p = passedOf(l.criteria) / l.criteria.total;
      b[p === 0 ? 0 : p < 0.25 ? 1 : p < 0.5 ? 2 : p < 0.75 ? 3 : 4].n += 1;
    }
    return { rows: b, notJoined };
  }, [learners]);

  /* ── Learner list ── */
  const counts = useMemo(
    () => ({
      all: learners.length,
      waiting: learners.filter((l) => l.waiting > 0).length,
      quiet: learners.filter((l) => l.user_id && ((daysSince(l.last_evidence_at) ?? Infinity) >= QUIET_DAYS)).length,
      not_joined: learners.filter((l) => !l.user_id).length,
    }),
    [learners]
  );

  const shownLearners = useMemo(() => {
    const q = search.trim().toLowerCase();
    return learners
      .filter((l) => {
        if (filter === 'waiting' && l.waiting === 0) return false;
        if (filter === 'quiet' && !(l.user_id && (daysSince(l.last_evidence_at) ?? Infinity) >= QUIET_DAYS)) return false;
        if (filter === 'not_joined' && l.user_id) return false;
        if (!q) return true;
        return [l.name, l.cohort_name, l.qualification_code].some((s) => (s ?? '').toLowerCase().includes(q));
      })
      .sort((a, b) => {
        if (b.waiting !== a.waiting) return b.waiting - a.waiting;
        if (!!b.user_id !== !!a.user_id) return b.user_id ? 1 : -1;
        return a.name.localeCompare(b.name);
      });
  }, [learners, filter, search]);

  const openAssess = (studentId: string) =>
    navigate(`/college?section=student360&studentId=${encodeURIComponent(studentId)}#assess`);

  const header = (
    <CollegePageHeader
      eyebrow="Assessment"
      title="Portfolios"
      description="Evidence waiting for your decision, oldest first, and how far each learner is through their criteria."
      help={HELP}
      actions={
        <>
          <button type="button" className={COLLEGE_BTN} onClick={() => navigate('/college/iqa')}>
            IQA sampling
          </button>
          <button
            type="button"
            className={COLLEGE_BTN}
            onClick={() => void refetch()}
            disabled={isFetching}
            aria-label="Refresh"
          >
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} aria-hidden="true" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </>
      }
    />
  );

  if (isLoading || ctxLoading || !scopeInfo.ready) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {header}
        <div className={COLLEGE_LIST}>
          <ListLoading label="Loading portfolios…" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 sm:space-y-8">
        {header}
        <CollegeEmpty
          title="Portfolios didn't load"
          body={`${(error as Error).message}. Check your connection and try again.`}
          action={
            <button type="button" className={COLLEGE_BTN} onClick={() => void refetch()}>
              Try again
            </button>
          }
        />
      </div>
    );
  }

  const shownWaiting = showAllWaiting ? waiting : waiting.slice(0, 8);
  const scopeWord = scope === 'mine' ? 'your learners' : 'the college';

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      {header}

      <ScopeSwitch
        scope={scope}
        onChange={setScope}
        hasMine={hasMine}
        mineLabel="My learners"
        mineCount={allLearners.filter((l) => myStudentIds.has(l.student_id)).length}
        collegeCount={allLearners.length}
      />

      <CollegeStats
        items={[
          {
            label: 'Learners with work waiting',
            value: String(figures.withWork),
            sub: `of ${plural(learners.length, 'learner')}`,
            warn: figures.withWork > 0 && (figures.oldestDays ?? 0) >= WAIT_URGENT_DAYS,
            onClick: () => setFilter('waiting'),
          },
          {
            label: 'Submissions waiting',
            value: String(waiting.length),
            sub: figures.resubmitted > 0 ? `${figures.resubmitted} resubmitted` : waiting.length ? 'Oldest first below' : 'Nothing to assess',
            good: waiting.length === 0 && learners.length > 0,
          },
          {
            label: 'Oldest waiting, days',
            value: figures.oldestDays === null ? 'None' : String(figures.oldestDays),
            sub: figures.oldest ? figures.oldest.name : 'All caught up',
            warn: (figures.oldestDays ?? 0) >= WAIT_URGENT_DAYS,
            onClick: figures.oldest ? () => openAssess(figures.oldest!.student_id) : undefined,
          },
          {
            label: 'Criteria passed',
            value: figures.pct === null ? '—' : `${figures.pct}%`,
            sub:
              figures.total > 0
                ? `${figures.passed.toLocaleString('en-GB')} of ${figures.total.toLocaleString('en-GB')} criteria`
                : 'No joined learners yet',
          },
        ]}
      />

      {/* ── Waiting + charts ── */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <motion.section variants={itemVariants} className="min-w-0 space-y-3">
          <CollegeSectionTitle
            id="waiting"
            title="Waiting for a decision"
            sub={
              waiting.length
                ? `${plural(waiting.length, 'submission')} from ${scopeWord}, oldest first. Tap one to assess its criteria.`
                : `Nothing from ${scopeWord} is waiting.`
            }
          />
          {waiting.length === 0 ? (
            <CollegeEmpty
              title="Nothing waiting for a decision"
              body={
                scope === 'mine' && allWaitingCount > 0
                  ? `None of your learners has sent evidence for assessment. ${plural(allWaitingCount, 'submission')} from other learners at the college ${allWaitingCount === 1 ? 'is' : 'are'} waiting.`
                  : 'When a learner sends evidence for assessment it appears here, oldest first.'
              }
              action={
                scope === 'mine' && allWaitingCount > 0 ? (
                  <button type="button" className={COLLEGE_BTN} onClick={() => setScope('college')}>
                    See the whole college
                  </button>
                ) : undefined
              }
            />
          ) : (
            <QueueGroup title="Oldest first" count={waiting.length}>
              {shownWaiting.map((w: WaitingSubmission) => {
                const days = daysSince(w.submitted_at);
                const urgent = (days ?? 0) >= WAIT_URGENT_DAYS;
                const what = w.first_title || w.category_name || 'Evidence submission';
                const more = w.item_count > 1 ? ` and ${w.item_count - 1} more` : '';
                return (
                  <li key={w.submission_id}>
                    <QueueRow
                      name={w.name}
                      kind={STATUS_LABEL[w.status] ?? 'New'}
                      mine={scope === 'college' && myStudentIds.has(w.student_id)}
                      title={`${what}${more}`}
                      body={w.item_count === 0 ? 'No evidence attached' : plural(w.item_count, 'piece of evidence', 'pieces of evidence')}
                      meta={
                        <>
                          <b>{waitingLabel(days)}</b>
                          {w.cohort_name ? ` · ${w.cohort_name}` : ''}
                          {w.submission_count > 1 ? ` · attempt ${w.submission_count}` : ''}
                        </>
                      }
                      urgent={urgent}
                      action="Assess"
                      onOpen={() => openAssess(w.student_id)}
                    />
                  </li>
                );
              })}
            </QueueGroup>
          )}
          {waiting.length > 8 && (
            <button type="button" className={COLLEGE_LINK} onClick={() => setShowAllWaiting((v) => !v)}>
              {showAllWaiting ? 'Show fewer' : `Show all ${waiting.length}`}
            </button>
          )}
        </motion.section>

        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1">
          <motion.section variants={itemVariants} className={VIS_CARD}>
            <VisHead
              title="Where the criteria stand"
              sub={
                figures.total > 0
                  ? `${figures.total.toLocaleString('en-GB')} criteria across ${plural(figures.assessed, 'joined learner')}. ${distribution.find((d) => d.key === 'submitted')?.n ?? 0} sent and waiting.`
                  : 'Shows once a learner has joined and has a qualification.'
              }
            />
            <div className="mt-4">
              {figures.total > 0 ? (
                <Bars rows={distribution} labelWidth="9.5rem" />
              ) : (
                <ChartEmpty text={scope === 'mine' ? 'None of your learners has joined yet. Switch to the whole college to see everyone.' : 'No learner has joined with a qualification yet.'} />
              )}
            </div>
          </motion.section>
          <motion.section variants={itemVariants} className={VIS_CARD}>
            <VisHead
              title="Learners by criteria passed"
              sub={
                bands.notJoined > 0
                  ? `${plural(bands.notJoined, 'learner')} not joined yet, so not shown.`
                  : 'Share of their qualification’s criteria passed.'
              }
            />
            <div className="mt-4">
              {bands.notJoined < learners.length ? (
                <Bars rows={bands.rows} labelWidth="9.5rem" />
              ) : (
                <ChartEmpty text="Appears once a learner joins with the cohort code." />
              )}
            </div>
          </motion.section>
        </div>
      </div>

      {/* ── Learners ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle
          id="learners"
          title={scope === 'mine' ? 'Your learners' : 'Every learner'}
          sub="Tap a learner to assess their criteria. The slider button opens extra requirements and the EPA gateway."
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <FilterChips<LearnerFilter>
            label="Filter learners"
            value={filter}
            onChange={setFilter}
            items={[
              { value: 'all', label: 'All', count: counts.all },
              { value: 'waiting', label: 'Work waiting', count: counts.waiting },
              { value: 'quiet', label: `No evidence for ${QUIET_DAYS} days`, count: counts.quiet },
              { value: 'not_joined', label: 'Not joined', count: counts.not_joined },
            ]}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, cohort or qualification"
            aria-label="Search learners"
            className={cn(SEARCH_CN, 'lg:max-w-sm')}
          />
        </div>

        {learners.length === 0 ? (
          <CollegeEmpty
            title={scope === 'mine' ? 'No learners of yours yet' : 'No learners at the college yet'}
            body={
              scope === 'mine'
                ? 'Learners appear here when they are in a cohort you tutor, or you are named as their tutor, assessor or IQA.'
                : 'Add learners from People, then share the cohort join code so their portfolios link up.'
            }
            action={
              <button type="button" className={COLLEGE_BTN} onClick={() => (scope === 'mine' ? setScope('college') : navigate('/college?section=students'))}>
                {scope === 'mine' ? 'See the whole college' : 'Go to learners'}
              </button>
            }
          />
        ) : shownLearners.length === 0 ? (
          <CollegeEmpty
            title="No learners match"
            body="Try another filter or clear the search."
            action={
              <button
                type="button"
                className={COLLEGE_BTN}
                onClick={() => {
                  setFilter('all');
                  setSearch('');
                }}
              >
                Show everyone
              </button>
            }
          />
        ) : (
          <ul className={COLLEGE_LIST}>
            {shownLearners.map((l) => {
              const c = l.criteria;
              const passed = passedOf(c);
              const pct = c && c.total > 0 ? Math.round((passed / c.total) * 100) : null;
              const lastDays = daysSince(l.last_evidence_at);
              const quiet = !!l.user_id && (lastDays ?? Infinity) >= QUIET_DAYS;
              const waitDays = daysSince(l.oldest_waiting_at);
              const urgent = l.waiting > 0 && (waitDays ?? 0) >= WAIT_URGENT_DAYS;
              return (
                <li key={l.student_id} className="flex items-stretch">
                  <button
                    type="button"
                    onClick={() => openAssess(l.student_id)}
                    className="grid min-h-[72px] min-w-0 flex-1 grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5 lg:grid-cols-[2.75rem_minmax(0,1.3fr)_minmax(0,1.4fr)_9rem_7.5rem] lg:gap-x-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-full text-[13.5px] font-bold',
                        urgent ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
                      )}
                    >
                      {initialsOf(l.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="truncate text-[15px] font-semibold text-white">{l.name}</span>
                        {scope === 'college' && myStudentIds.has(l.student_id) && (
                          <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-black">Yours</span>
                        )}
                        {!l.user_id && (
                          <span className="shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                            Not joined
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-white">
                        {[l.cohort_name ?? 'No cohort', l.qualification_code].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    {/* Criteria bar: own row on a phone, its own column on desktop */}
                    <span className="col-span-2 min-w-0 lg:col-span-1">
                      {c && c.total > 0 ? (
                        <>
                          <CriteriaBar c={c} />
                          <span className="mt-1.5 block text-[12px] tabular-nums text-white">
                            <b className="font-semibold">{passed}</b> of {c.total} passed{pct !== null ? ` (${pct}%)` : ''}
                            {c.submitted > 0 ? ` · ${c.submitted} submitted` : ''}
                            {c.referred + c.iqa_rejected > 0 ? ` · ${c.referred + c.iqa_rejected} need more` : ''}
                          </span>
                        </>
                      ) : (
                        <span className="block text-[12px] text-white">
                          {l.user_id ? 'No qualification criteria yet' : 'Criteria show once they join'}
                        </span>
                      )}
                    </span>
                    <span className={cn('col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white lg:col-span-1 lg:block', !l.user_id && 'hidden')}>
                      <span className={cn('block', quiet && 'text-orange-300')}>
                        {l.last_evidence_at ? `Last evidence ${fmtDate(l.last_evidence_at)}` : l.user_id ? 'No evidence yet' : '—'}
                      </span>
                      {l.user_id && (
                        <span className="block lg:mt-0.5">
                          {plural(l.items, 'item')}
                          {l.witness_signed > 0 ? ` · ${l.witness_signed} witness` : ''}
                        </span>
                      )}
                    </span>
                    <span className={cn('col-span-2 lg:col-span-1 lg:block lg:text-right', l.waiting === 0 && 'hidden')}>
                      {l.waiting > 0 ? (
                        <span
                          className={cn(
                            'inline-flex h-7 items-center rounded-full px-2.5 text-[12px] font-bold',
                            urgent ? 'bg-orange-500 text-black' : 'bg-sky-400 text-black'
                          )}
                        >
                          {l.waiting} waiting
                        </span>
                      ) : (
                        <span className="hidden text-[12px] text-white lg:inline">Nothing waiting</span>
                      )}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setToolsFor(l)}
                    aria-label={`Requirements and EPA gateway for ${l.name}`}
                    title="Requirements and EPA gateway"
                    className="flex w-12 shrink-0 items-center justify-center border-l border-white/[0.06] text-white transition-colors touch-manipulation hover:bg-white/[0.04] hover:text-elec-yellow sm:w-14"
                  >
                    <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </motion.section>

      {/* ── Elsewhere ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle title="Quality and end-point" sub="The rest of the assessment loop." />
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
          <CollegeLinkCard
            title="IQA sampling"
            body="Sample assessed criteria, confirm or query decisions and track actions."
            figure={String(learners.reduce((n, l) => n + (l.criteria?.passed ?? 0), 0))}
            onClick={() => navigate('/college/iqa')}
          />
          <CollegeLinkCard
            title="EPA readiness"
            body="Who is ready for gateway, and what is still missing."
            onClick={() => navigate('/college/epa')}
          />
          <CollegeLinkCard
            title="Evidence packs"
            body="Funding and audit evidence for each learner, ready to hand over."
            onClick={() => navigate('/college/evidence-pack')}
          />
        </div>
        <p className="px-1 text-[12px] text-white">
          The IQA figure is criteria passed but not yet confirmed by an IQA, across {scopeWord}.
        </p>
      </motion.section>

      <PortfolioToolsSheet learner={toolsFor} onOpenChange={(o) => !o && setToolsFor(null)} />
    </motion.div>
  );
}

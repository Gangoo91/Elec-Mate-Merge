/**
 * Readiness — where the learner stands against the end of the programme, read
 * from the same honest figures as the rest of the portfolio:
 *
 *   criteria   get_portfolio_ac_state (via usePortfolio): only Passed and IQA
 *              confirmed count
 *   hours      get_otj_summary / get_otj_trajectory
 *   plan       the tutor's assessment plan (useAssessmentPlans)
 *
 * Replaces the older readiness dashboard, which read a second, older data
 * model and could disagree with the headline. Nothing here is a grade or a
 * prediction: the gateway decision is the tutor's and the employer's, and the
 * page says so.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HoursChart,
  ProgrammeJourney,
  Ring,
  VisHead,
  VIS_CARD,
} from '@/components/college/student360/Student360Visuals';
import type { LearnerCollegeContext } from '@/hooks/useMyCollegeContext';
import type { PortfolioItemView, UsePortfolioResult } from '@/hooks/portfolio/usePortfolio';
import { STATE_SWATCH, type AcState, type UnitGroup } from '@/hooks/portfolio/usePortfolioAcState';
import type { useAssessmentPlans } from '@/hooks/portfolio/useAssessmentPlans';
import { PortfolioStatementCard } from '../portfolio/PortfolioStatementCard';
import { GatewayGateCard } from '@/components/epa/GatewayGateCard';
import type { GateLink } from '@/hooks/epa/useGatewayReadiness';
import { P_BTN, StateChip, fmtDate } from './ui';
import { assessorWithQualifications } from '@/lib/assessorQualifications';
import { occasionsCheck } from '@/hooks/portfolio/useAcOccasions';

type Plans = ReturnType<typeof useAssessmentPlans>;

/** Bar order: done first, so the filled part reads left to right. */
const BAR_ORDER: AcState[] = [
  'iqa_confirmed',
  'passed',
  'submitted',
  'referred',
  'not_yet',
  'iqa_rejected',
  'claimed',
  'suggested',
];

function UnitBar({ g }: { g: UnitGroup }) {
  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
      {BAR_ORDER.map((s) =>
        g.counts[s] ? (
          <span
            key={s}
            className={STATE_SWATCH[s]}
            style={{ width: `${(g.counts[s] / g.total) * 100}%` }}
          />
        ) : null
      )}
    </div>
  );
}

type GateCheck = {
  key: string;
  title: string;
  line: string;
  state: 'done' | 'todo' | 'warn';
  action?: { label: string; run: () => void };
};

export function ReadinessView({
  portfolio,
  plans,
  learner,
  onOpenItem,
  onView,
  onCapture,
  onOpenGatewayPack,
}: {
  portfolio: UsePortfolioResult;
  plans: Plans;
  learner: LearnerCollegeContext | null;
  onOpenItem: (i: PortfolioItemView) => void;
  onView: (v: 'evidence' | 'coverage') => void;
  onCapture: () => void;
  /** Opens the gateway declarations (export sheet), ELE-1872. */
  onOpenGatewayPack?: () => void;
}) {
  const navigate = useNavigate();
  const { headline, items, ac, learnerId } = portfolio;
  const hours = portfolio.hours as { counted_hours?: number; required_hours?: number } | null;
  const [statementWritten, setStatementWritten] = useState<boolean | null>(null);

  const counted = Math.round(hours?.counted_hours ?? 0);
  const required = Math.round(hours?.required_hours ?? 0);
  const hoursPct = required > 0 ? Math.min(100, Math.round((counted / required) * 100)) : null;

  const witnessedItems = items.filter((i) => i.witnessed || i.observation).length;
  const witnessedPct = items.length ? Math.round((witnessedItems / items.length) * 100) : null;

  const planTotal = plans.open.length + plans.closed.filter((p) => p.status === 'done').length;
  const planDone = plans.closed.filter((p) => p.status === 'done').length;

  const todo = useMemo(() => items.filter((i) => i.next.actionable).slice(0, 6), [items]);
  const todoTotal = useMemo(() => items.filter((i) => i.next.actionable).length, [items]);

  const decisions = useMemo(
    () =>
      ac.rows
        .filter((r) => r.decided_at)
        .sort((a, b) => (b.decided_at ?? '').localeCompare(a.decided_at ?? ''))
        .slice(0, 6),
    [ac.rows]
  );

  const units = useMemo(
    () =>
      ac.units
        .slice()
        .sort(
          (a, b) =>
            b.passed / b.total - a.passed / a.total ||
            a.unit_code.localeCompare(b.unit_code, undefined, { numeric: true })
        ),
    [ac.units]
  );

  // A SEPARATE check, never folded into "every criterion passed" (the gate
  // card above is unchanged): workplace criteria need two separate assessed
  // occasions (C&G 5357-03 handbook p.14, held as qualification_occasion_rules).
  const occ = useMemo(
    () => occasionsCheck(ac.rows, portfolio.occasions.byKey),
    [ac.rows, portfolio.occasions.byKey]
  );

  // ELE-1872: criteria, hours, English and maths, duration and the
  // declarations are the gate (GatewayGateCard). This list is what else helps.
  const checks: GateCheck[] = [
    ...(occ.needing > 0
      ? [
          {
            key: 'occasions',
            title: 'Two occasions on workplace units',
            line:
              occ.short === 0
                ? `All ${occ.needing} workplace criteria have been passed on two separate occasions.`
                : `${occ.met} of ${occ.needing} workplace criteria passed on two separate occasions. This is checked separately from criteria passed.`,
            state: occ.short === 0 ? 'done' : 'todo',
            action:
              occ.short === 0
                ? undefined
                : { label: 'See coverage', run: () => onView('coverage') },
          } as GateCheck,
        ]
      : []),
    ...(planTotal > 0
      ? [
          {
            key: 'plan',
            title: "Your tutor's assessment plan",
            line: plans.open.length
              ? `${plans.open.length} still to do${plans.overdue ? `, ${plans.overdue} late` : ''}. ${planDone} done.`
              : `All ${planDone} done.`,
            state: plans.overdue ? 'warn' : plans.open.length ? 'todo' : 'done',
          } as GateCheck,
        ]
      : []),
    {
      key: 'statement',
      title: 'Statement to the assessor',
      line:
        statementWritten === null
          ? 'Checking…'
          : statementWritten
            ? 'Written and saved. It opens your exported record.'
            : 'Not written yet. It is the first thing an assessor reads.',
      state: statementWritten ? 'done' : 'todo',
      action: statementWritten
        ? undefined
        : {
            label: 'Write it',
            run: () =>
              document
                .getElementById('portfolio-statement-title')
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
          },
    },
    {
      key: 'am2',
      title: 'Practise for the AM2',
      line: 'Run sections in the simulator until each one is at the practice bar.',
      state: 'todo',
      action: { label: 'Open simulator', run: () => navigate('/apprentice/am2-simulator') },
    },
  ];
  const doneCount = checks.filter((c) => c.state === 'done').length;

  // Where each gate line is fixed, for the learner (ELE-1872). The start date
  // is the college's when they are on a college record; otherwise it is the
  // programme dates they set in the off-the-job hub (?programme=1 opens that
  // sheet). English and maths and NET's checklist are recorded by the
  // college: the learner has no screen for them, so those lines say who does
  // it instead of linking somewhere generic.
  const onCollegeRecord = !!learner?.student_id;
  const College = learner?.college_name || 'Your college';
  const openGateLink = (link: GateLink) => {
    if (link === 'coverage') onView('coverage');
    else if (link === 'hours') navigate('/apprentice/ojt-hub');
    else if (link === 'start_date') navigate('/apprentice/ojt-hub?programme=1');
    else if (link.startsWith('declaration_')) {
      if (onOpenGatewayPack) onOpenGatewayPack();
      else navigate('/apprentice/college/compliance');
    }
  };

  return (
    <div className="space-y-4 lg:space-y-5">
      {/* ELE-1872: the real gate first, the same lines your tutor sees. */}
      <GatewayGateCard
        className={VIS_CARD}
        learnerId={learnerId}
        audience="learner"
        onLink={openGateLink}
        linkLabel={{
          coverage: 'See criteria',
          hours: 'Open hours',
          declaration_learner: 'Sign it',
          declaration_employer: 'See declarations',
          declaration_provider: 'See declarations',
          start_date: onCollegeRecord ? null : 'Set your dates',
          english_maths: null,
          net_checklist: null,
        }}
        linkNote={{
          start_date: onCollegeRecord
            ? `${College} records your start date. Ask your tutor if it is missing or wrong.`
            : undefined,
          english_maths: `${College} records this. Give your tutor your certificate, or your employer's decision if you were 19 or over when you started.`,
          net_checklist: `${College} files this once you, your employer and the college have all signed it.`,
        }}
      />

      {/* The four figures that matter, as rings */}
      <div
        className={cn(
          'grid gap-4',
          learner?.start_date && learner?.expected_end_date
            ? 'xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]'
            : ''
        )}
      >
        <section className={VIS_CARD}>
          <VisHead
            title="Where you stand"
            sub="Only what your assessor has passed counts towards the qualification."
          />
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Ring
              pct={headline.total ? headline.percent : null}
              value={headline.total ? `${headline.percent}%` : '–'}
              label="Criteria passed"
              sub={headline.total ? `${headline.passed} of ${headline.total}` : 'No course yet'}
              onClick={() => onView('coverage')}
            />
            <Ring
              pct={hoursPct}
              value={hoursPct === null ? '–' : `${hoursPct}%`}
              label="Off-the-job hours"
              sub={required ? `${counted} of ${required}h` : 'No target yet'}
              onClick={() => navigate('/apprentice/ojt-hub')}
            />
            <Ring
              pct={witnessedPct}
              value={witnessedPct === null ? '–' : `${witnessedPct}%`}
              label="Seen by someone"
              sub={
                items.length
                  ? `${witnessedItems} of ${items.length} pieces witnessed or observed`
                  : 'No evidence yet'
              }
              onClick={() => onView('evidence')}
            />
            <Ring
              pct={planTotal ? Math.round((planDone / planTotal) * 100) : null}
              value={planTotal ? `${planDone}/${planTotal}` : '–'}
              label="Tutor's plan"
              sub={
                planTotal
                  ? plans.overdue
                    ? `${plans.overdue} late`
                    : `${plans.open.length} to do`
                  : 'Nothing set yet'
              }
              warn={plans.overdue > 0}
            />
          </div>
        </section>
        {learner?.start_date && learner?.expected_end_date && (
          <section className={VIS_CARD}>
            <VisHead title="Your programme" sub={learner.course_name ?? learner.college_name} />
            <div className="mt-5">
              <ProgrammeJourney
                start={learner.start_date}
                end={learner.expected_end_date}
                reviewDueBy={null}
              />
            </div>
            <p className="mt-4 text-[12.5px] leading-snug text-white">
              Your tutor and employer decide when you are ready for gateway. This page shows what
              your record says today.
            </p>
          </section>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {/* Before gateway */}
        <section className={VIS_CARD}>
          <VisHead title="Also on your list" sub={`${doneCount} of ${checks.length} done`} />
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {checks.map((c) => (
              <li key={c.key} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className={cn(
                    'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                    c.state === 'done'
                      ? 'border-emerald-400 bg-emerald-400 text-black'
                      : c.state === 'warn'
                        ? 'border-orange-400 text-orange-300'
                        : 'border-white/[0.3] text-white'
                  )}
                  aria-label={
                    c.state === 'done' ? 'Done' : c.state === 'warn' ? 'Needs attention' : 'To do'
                  }
                >
                  {c.state === 'done' ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : c.state === 'warn' ? (
                    '!'
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white">{c.title}</p>
                  <p
                    className={cn(
                      'mt-0.5 text-[12.5px] leading-snug',
                      c.state === 'warn' ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {c.line}
                  </p>
                </div>
                {c.action && (
                  <button
                    type="button"
                    onClick={c.action.run}
                    className="-my-2 inline-flex h-11 shrink-0 items-center gap-1 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    {c.action.label}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Needs you */}
        <section className={VIS_CARD}>
          <VisHead
            title="Needs a step from you"
            sub={
              todoTotal
                ? `${todoTotal} ${todoTotal === 1 ? 'piece' : 'pieces'} of evidence`
                : 'Nothing waiting on you'
            }
            aside={
              todoTotal > todo.length ? (
                <button
                  type="button"
                  onClick={() => onView('evidence')}
                  className="-my-2 h-11 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                >
                  See all
                </button>
              ) : undefined
            }
          />
          {todo.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-white/[0.14] px-5 py-6">
              <p className="text-[13px] leading-relaxed text-white">
                Every piece of evidence is either with your assessor or passed. Capture something
                new to keep moving.
              </p>
              <button type="button" className={cn(P_BTN, 'mt-3')} onClick={onCapture}>
                Add evidence
              </button>
            </div>
          ) : (
            <ul className="mt-3 divide-y divide-white/[0.06]">
              {todo.map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() => onOpenItem(i)}
                    className="group flex min-h-[56px] w-full items-center gap-3 py-2.5 text-left touch-manipulation"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-white">
                        {i.title}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block truncate text-[12.5px]',
                          i.state === 'needs_more' ? 'text-orange-300' : 'text-elec-yellow'
                        )}
                      >
                        {i.next.label}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Criteria by unit */}
        <section className={cn(VIS_CARD, 'lg:col-span-2 2xl:col-span-1')}>
          <VisHead
            title="Criteria by unit"
            sub={units.length ? `${units.length} units · furthest along first` : undefined}
            onOpen={() => onView('coverage')}
          />
          {units.length === 0 ? (
            <p className="mt-4 text-[13px] text-white">Choose your course to see its units.</p>
          ) : (
            <ul className="mt-4 grid gap-x-8 gap-y-3 lg:grid-cols-2 2xl:grid-cols-1">
              {units.slice(0, 10).map((g) => (
                <li key={g.unit_code} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[12.5px] font-semibold text-white">
                      {g.unit_code} {g.unit_title}
                    </span>
                    <span className="shrink-0 text-[12px] tabular-nums text-white">
                      {g.passed}/{g.total}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <UnitBar g={g} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          {units.length > 10 && (
            <button
              type="button"
              onClick={() => onView('coverage')}
              className="mt-3 h-11 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
            >
              and {units.length - 10} more units
            </button>
          )}
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {learnerId && (
          <HoursChart
            collegeStudentId={learner?.student_id ?? learnerId}
            userId={learnerId}
            first="You"
            onOpen={() => navigate('/apprentice/ojt-hub')}
          />
        )}

        {/* Recent decisions from the assessor */}
        <section className={VIS_CARD}>
          <VisHead
            title="Latest from your assessor"
            sub="The most recent decisions on your criteria"
          />
          {decisions.length === 0 ? (
            <p className="mt-4 text-[13px] leading-relaxed text-white">
              No decisions yet. When your assessor passes a criterion or asks for more, it shows
              here.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-white/[0.06]">
              {decisions.map((r) => (
                <li
                  key={`${r.unit_code}-${r.ac_code}`}
                  className="space-y-1 py-3 first:pt-1 last:pb-0"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13px] font-semibold text-white">
                      {r.unit_code} AC {r.ac_code}
                    </span>
                    <StateChip state={r.state} pending={r.countersign_pending} />
                    <span className="ml-auto text-[12px] text-white">
                      {r.assessor_name
                        ? `${assessorWithQualifications(r.assessor_name, r.assessor_qualifications)} · `
                        : ''}
                      {fmtDate(r.decided_at)}
                    </span>
                  </div>
                  {r.ac_text && (
                    <p className="line-clamp-1 text-[12.5px] text-white">{r.ac_text}</p>
                  )}
                  {r.decision_feedback && (
                    <p
                      className={cn(
                        'line-clamp-2 text-[12.5px]',
                        r.state === 'referred' ||
                          r.state === 'not_yet' ||
                          r.state === 'iqa_rejected'
                          ? 'text-orange-300'
                          : 'text-white'
                      )}
                    >
                      "{r.decision_feedback}"
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <PortfolioStatementCard onWrittenChange={setStatementWritten} />
    </div>
  );
}

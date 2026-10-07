/**
 * Coverage — every criterion on the learner's course in the honest six-state
 * legend (ELE-1862): Not started · Suggested (AI) · Claimed by you · Submitted
 * · Needs more · Passed · IQA confirmed. Read from get_portfolio_ac_state, the
 * same rows the assessor and Student 360 see. Only Passed and IQA confirmed
 * count as progress.
 */
import { useMemo, useState } from 'react';
import { ChevronDown, Plus, Search, Send, X } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { aiProvenanceLine } from '@/hooks/portfolio/usePortfolioAcState';
import { cn } from '@/lib/utils';
import {
  STATE_SWATCH,
  type AcState,
  type AcStateRow,
  type UnitGroup,
} from '@/hooks/portfolio/usePortfolioAcState';
import type { PortfolioItemView, UsePortfolioResult } from '@/hooks/portfolio/usePortfolio';
import {
  LEGEND_HELP,
  LEGEND_ORDER,
  P_BTN,
  P_BTN_PRIMARY,
  P_CARD,
  P_INPUT,
  P_LIST,
  StateChip,
} from './ui';
import { LEARNER_STATE_LABEL } from '@/hooks/portfolio/usePortfolioAcState';
import { SubmitEvidenceSheet } from './SubmitEvidenceSheet';
import {
  useWitnessedCriteria,
  witnessedByLine,
  type CriterionWitness,
} from '@/hooks/portfolio/useWitnessedCriteria';
import { assessorWithQualifications } from '@/lib/assessorQualifications';

/**
 * ELE-1863: what "Send these for unit X" sends. The learner's own evidence
 * that claims a criterion in the unit, is not already with the assessor and
 * is not fully passed. Assessor-recorded observations are never re-sent.
 */
function sendableFor(unitCode: string, items: PortfolioItemView[]): PortfolioItemView[] {
  return items.filter(
    (i) =>
      !i.observation &&
      i.claimed.some((c) => c.unit_code === unitCode) &&
      !i.submission?.open &&
      i.state !== 'passed'
  );
}

type Filter = 'all' | 'todo' | 'suggested' | 'claimed' | 'submitted' | 'needs' | 'passed' | 'iqa';

const FILTERS: { key: Filter; label: string; match: (s: AcState) => boolean }[] = [
  { key: 'all', label: 'All', match: () => true },
  { key: 'todo', label: 'Not started', match: (s) => s === 'not_started' },
  { key: 'suggested', label: 'Suggested', match: (s) => s === 'suggested' },
  { key: 'claimed', label: 'Claimed', match: (s) => s === 'claimed' },
  { key: 'submitted', label: 'Submitted', match: (s) => s === 'submitted' },
  {
    key: 'needs',
    label: 'Needs more',
    match: (s) => s === 'referred' || s === 'not_yet' || s === 'iqa_rejected',
  },
  { key: 'passed', label: 'Passed', match: (s) => s === 'passed' || s === 'iqa_confirmed' },
  { key: 'iqa', label: 'IQA confirmed', match: (s) => s === 'iqa_confirmed' },
];

/** Legend state → the filter it applies when tapped. */
const LEGEND_FILTER: Record<string, Filter> = {
  not_started: 'todo',
  suggested: 'suggested',
  claimed: 'claimed',
  submitted: 'submitted',
  referred: 'needs',
  passed: 'passed',
  iqa_confirmed: 'iqa',
};

/** Donut colours, matching STATE_SWATCH. */
const DONUT_FILL: Record<string, string> = {
  not_started: 'rgba(255,255,255,0.10)',
  suggested: 'rgba(255,255,255,0.28)',
  claimed: 'rgba(255,255,255,0.7)',
  submitted: 'hsl(199 89% 60%)',
  referred: 'hsl(27 96% 61%)',
  passed: 'hsl(152 69% 52%)',
  iqa_confirmed: 'hsl(152 76% 70%)',
};

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

export function CoverageView({
  portfolio,
  plannedDue,
  onOpenItem,
  onCaptureFor,
}: {
  portfolio: UsePortfolioResult;
  /** Criteria on the learner's open assessment plan (`unit|ac` → due date), ELE-1874. */
  plannedDue?: Map<string, string | null>;
  onOpenItem: (item: PortfolioItemView) => void;
  onCaptureFor: (unitCode: string, acRefs: string[]) => void;
}) {
  const { ac, items, headline } = portfolio;
  const [sendUnit, setSendUnit] = useState<string | null>(null);
  const sendItems = useMemo(
    () => (sendUnit ? sendableFor(sendUnit, items) : []),
    [sendUnit, items]
  );
  // Snapshot when the sheet opens, so items do not vanish from it once sent.
  const [sendSnapshot, setSendSnapshot] = useState<PortfolioItemView[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const [openUnit, setOpenUnit] = useState<string | null>(null);
  const itemById = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  // ELE-1869: "Witnessed by …" against each criterion a signed statement backs up.
  const witnessed = useWitnessedCriteria(portfolio.learnerId);
  const match = FILTERS.find((f) => f.key === filter)!.match;
  const needle = q.trim().toLowerCase();

  const units = useMemo(
    () =>
      ac.units
        .map((g) => ({
          g,
          rows: g.rows.filter(
            (r) =>
              match(r.state as AcState) &&
              (!needle ||
                `${r.unit_code} ac ${r.ac_code} ${r.ac_text ?? ''} ${g.unit_title}`
                  .toLowerCase()
                  .includes(needle))
          ),
        }))
        .filter((u) => u.rows.length > 0),
    [ac.units, match, needle]
  );

  if (ac.loading) {
    return <div className="h-40 animate-pulse rounded-3xl bg-white/[0.04]" />;
  }
  if (ac.rows.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-white/[0.2] p-6 text-[14px] text-white">
        Choose your qualification to see every criterion on it. Your college sets it for you if you
        are enrolled.
      </p>
    );
  }

  const counts: Partial<Record<AcState, number>> = {};
  for (const s of LEGEND_ORDER) counts[s] = ac.totals[s];
  counts.referred = ac.totals.referred + ac.totals.not_yet + ac.totals.iqa_rejected;
  const slices = LEGEND_ORDER.map((s) => ({ key: s, value: counts[s] ?? 0 })).filter(
    (s) => s.value > 0
  );
  const filtering = filter !== 'all' || !!needle;
  const shownCriteria = units.reduce((n, u) => n + u.rows.length, 0);
  const activeLegend = Object.entries(LEGEND_FILTER).find(([, f]) => f === filter)?.[0] as
    AcState | undefined;

  return (
    <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start lg:gap-5">
      {/* Summary: the whole course at a glance, the legend doubles as the filter */}
      <section className={cn(P_CARD, 'xl:sticky xl:top-20')} aria-label="Criteria summary">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Every criterion on your course
        </h2>
        <div className="mt-4 flex items-center gap-5 sm:flex-row xl:flex-col xl:items-stretch">
          <div className="relative h-36 w-36 shrink-0 self-center sm:h-40 sm:w-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={slices.length ? slices : [{ key: 'none', value: 1 }]}
                  dataKey="value"
                  innerRadius="72%"
                  outerRadius="100%"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive
                >
                  {(slices.length ? slices : [{ key: 'none' }]).map((s) => (
                    <Cell key={s.key} fill={DONUT_FILL[s.key] ?? 'rgba(255,255,255,0.08)'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[28px] font-bold leading-none tabular-nums text-white">
                {headline.passed}
              </span>
              <span className="mt-1 text-[11.5px] text-white">of {headline.total} passed</span>
            </span>
          </div>
          <ul
            className="grid min-w-0 flex-1 grid-cols-1 gap-0.5 sm:grid-cols-2 xl:grid-cols-1"
            aria-label="Filter by state"
          >
            {LEGEND_ORDER.map((s) => {
              const f = LEGEND_FILTER[s];
              const on = filter === f;
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setFilter(on ? 'all' : f)}
                    aria-pressed={on}
                    className={cn(
                      '-mx-2 flex h-11 w-[calc(100%+1rem)] items-center gap-2.5 rounded-xl px-2 text-left text-[13px] text-white transition-colors touch-manipulation',
                      on ? 'bg-white/[0.1] font-semibold' : 'hover:bg-white/[0.05]'
                    )}
                  >
                    <span
                      className={cn('h-2.5 w-2.5 shrink-0 rounded-full', STATE_SWATCH[s])}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 truncate">{LEARNER_STATE_LABEL[s]}</span>
                    <span className="tabular-nums font-semibold">{counts[s] ?? 0}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {activeLegend && (
          <p className="mt-3 border-t border-white/[0.08] pt-3 text-[12.5px] leading-snug text-white">
            {LEGEND_HELP[activeLegend]}
          </p>
        )}
      </section>

      <div className="min-w-0 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute left-1 top-3.5 h-4 w-4 text-white" />
            <input
              className={cn(P_INPUT, 'pl-7 pr-9')}
              placeholder="Search criteria"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search criteria"
            />
            {q && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQ('')}
                className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="text-[12.5px] text-white sm:ml-auto">
            {filtering ? (
              <>
                {shownCriteria} {shownCriteria === 1 ? 'criterion' : 'criteria'} in {units.length}{' '}
                {units.length === 1 ? 'unit' : 'units'}.{' '}
                <button
                  type="button"
                  className="h-11 font-semibold text-elec-yellow touch-manipulation"
                  onClick={() => {
                    setFilter('all');
                    setQ('');
                  }}
                >
                  Show all
                </button>
              </>
            ) : (
              `${ac.units.length} units · tap one to see its criteria`
            )}
          </p>
        </div>

        {units.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-white/[0.2] p-6 text-[14px] text-white">
            Nothing matches.
          </p>
        ) : (
          <ul className={P_LIST}>
            {units.map(({ g, rows }) => {
              const isOpen = openUnit === g.unit_code || filtering;
              const gaps = g.rows.filter(
                (r) => r.state === 'not_started' || r.state === 'suggested'
              );
              const sendable = portfolio.canReachAssessor ? sendableFor(g.unit_code, items) : [];
              const pct = g.total ? Math.round((g.passed / g.total) * 100) : 0;
              return (
                <li key={g.unit_code}>
                  <button
                    type="button"
                    onClick={() => setOpenUnit(openUnit === g.unit_code ? null : g.unit_code)}
                    className="flex min-h-[64px] w-full items-center gap-4 px-5 py-4 text-left touch-manipulation hover:bg-white/[0.03] sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="min-w-0 text-[14px] font-semibold leading-snug text-white">
                          <span className="text-elec-yellow">{g.unit_code}</span> {g.unit_title}
                        </p>
                        <span className="shrink-0 text-[13px] tabular-nums text-white">
                          <span className="font-semibold">{g.passed}</span>/{g.total} passed
                          <span className="hidden sm:inline"> · {pct}%</span>
                        </span>
                      </div>
                      <UnitBar g={g} />
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 text-white transition-transform',
                        isOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="space-y-3 px-5 pb-5 sm:px-6">
                      <ul className="grid gap-2 2xl:grid-cols-2">
                        {rows.map((r) => (
                          <CriterionRow
                            key={`${r.unit_code}-${r.ac_code}`}
                            r={r}
                            itemById={itemById}
                            onOpenItem={onOpenItem}
                            witnesses={witnessed.get(`${r.unit_code}|${r.ac_code}`)}
                            planned={
                              plannedDue?.has(`${r.unit_code}|${r.ac_code}`)
                                ? (plannedDue.get(`${r.unit_code}|${r.ac_code}`) ?? '')
                                : undefined
                            }
                          />
                        ))}
                      </ul>
                      {(gaps.length > 0 || sendable.length > 0) && (
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                          {sendable.length > 0 && (
                            <button
                              type="button"
                              className={cn(P_BTN_PRIMARY, 'w-full sm:w-auto')}
                              onClick={() => {
                                setSendSnapshot(sendable);
                                setSendUnit(g.unit_code);
                              }}
                            >
                              <Send className="h-4 w-4" />
                              {sendable.length === 1
                                ? `Send 1 piece for unit ${g.unit_code}`
                                : `Send these ${sendable.length} for unit ${g.unit_code}`}
                            </button>
                          )}
                          {gaps.length > 0 && (
                            <button
                              type="button"
                              className={cn(P_BTN, 'w-full sm:w-auto')}
                              onClick={() =>
                                onCaptureFor(
                                  g.unit_code,
                                  gaps.slice(0, 6).map((r) => `${r.unit_code} AC ${r.ac_code}`)
                                )
                              }
                            >
                              <Plus className="h-4 w-4" /> Capture for unit {g.unit_code}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <SubmitEvidenceSheet
        items={sendSnapshot.length ? sendSnapshot : sendItems}
        open={!!sendUnit}
        onOpenChange={(o) => {
          if (!o) {
            setSendUnit(null);
            setSendSnapshot([]);
          }
        }}
        selectable
      />
    </div>
  );
}

function CriterionRow({
  r,
  itemById,
  onOpenItem,
  planned,
  witnesses,
}: {
  r: AcStateRow;
  itemById: Map<string, PortfolioItemView>;
  onOpenItem: (item: PortfolioItemView) => void;
  /** Signed witness statements that name this criterion (ELE-1869). */
  witnesses?: CriterionWitness[];
  /** On the assessment plan: the due date ('' = no date); undefined = not planned. */
  planned?: string;
}) {
  const evidence = (r.evidence_item_ids ?? [])
    .map((id) => itemById.get(id))
    .filter(Boolean) as PortfolioItemView[];
  const suggested = (r.suggested_item_ids ?? [])
    .map((id) => itemById.get(id))
    .filter(Boolean) as PortfolioItemView[];
  const linked = evidence.length ? evidence : suggested;
  return (
    <li className="space-y-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[12.5px] font-semibold text-elec-yellow">AC {r.ac_code}</span>
        <StateChip state={r.state as AcState} />
        {planned !== undefined && (
          <span className="inline-flex shrink-0 items-center rounded-full border border-elec-yellow px-2 py-0.5 text-[11px] font-semibold text-white">
            On your plan
            {planned
              ? `, by ${new Date(`${planned}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
              : ''}
          </span>
        )}
      </div>
      {r.ac_text && <p className="text-[13px] leading-snug text-white">{r.ac_text}</p>}
      {witnesses?.map((w) => (
        <p key={w.id} className="text-[12.5px] font-medium text-white">
          {witnessedByLine(w)}
        </p>
      ))}
      {r.decision_feedback &&
        (r.state === 'referred' || r.state === 'not_yet' || r.state === 'iqa_rejected') && (
          <p className="text-[13px] text-orange-300">
            {assessorWithQualifications(
              r.assessor_name ?? 'Your assessor',
              r.assessor_qualifications
            )}
            : "{r.decision_feedback}"
          </p>
        )}
      {r.decision_feedback &&
        aiProvenanceLine(
          r.decision_feedback_source,
          r.assessor_name,
          r.decision_feedback_confirmed_at ?? r.decided_at
        ) && (
          <p className="text-[12px] text-white">
            {aiProvenanceLine(
              r.decision_feedback_source,
              r.assessor_name,
              r.decision_feedback_confirmed_at ?? r.decided_at
            )}
          </p>
        )}
      {linked.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {linked.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => onOpenItem(i)}
              className="inline-flex h-11 max-w-full items-center rounded-full border border-white/[0.14] px-3 text-[12px] text-white touch-manipulation hover:border-elec-yellow"
            >
              <span className="truncate">{i.title}</span>
            </button>
          ))}
        </div>
      )}
    </li>
  );
}

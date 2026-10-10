import { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuietTabs } from '@/components/college/quality/QualityChoices';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { HowItWorks, PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { inputCn } from '@/components/forms/fieldStyles';
import { RequirementsSheet } from '@/components/college/evidence/RequirementsSheet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  STATUS_LABEL,
  STATUS_PILL,
  isApplicable,
  useEvidenceBoard,
  type BoardRow,
  type ItemGroup,
  type ItemStatus,
} from '@/hooks/useEvidencePack';

/* ==========================================================================
   CollegeEvidencePackPage — /college/evidence-pack  (ELE-1908)

   The funding evidence pack for every apprentice, always current: built from
   the record each time it opens, against the funding rules (paras 309–318 and
   the evidence boxes throughout) plus the college's own requirements.

   Redesigned 6 Oct (Andrew): one readiness figure instead of four equal
   tiles; evidence grouped by stage with "x of n in place" per item, opening
   to the learners it affects; a coverage matrix on desktop (learners down,
   evidence across) for the at-a-glance view an inspector or head of
   department wants; and a by-learner list with a status strip each.
   ========================================================================== */

type View = 'evidence' | 'matrix' | 'learners';

const HELP: PageHelpContent = {
  id: 'college-evidence-pack',
  title: 'The evidence pack',
  what: (
    <>
      Everything the apprenticeship funding rules say a college must hold for each apprentice,
      checked live against your records. It replaces the folder you keep for an audit: what is in
      place, what is missing, and who it affects. Nothing to keep up to date by hand.
    </>
  ),
  steps: [
    {
      title: 'See the gaps',
      body: 'Start with the biggest gap, or use the matrix: one row per learner, one square per piece of evidence.',
    },
    {
      title: 'File the evidence',
      body: 'Open a learner, tap the item and add the document with who signed it. The square turns green.',
    },
    {
      title: 'Hand it over',
      body: 'Print any learner’s pack for an auditor or inspector, or export the whole grid as a spreadsheet.',
    },
    {
      title: 'Add your own',
      body: 'Under Your requirements, add anything else you want on every pack: an induction, a DBS check, a PPE record.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'In place', body: 'Filed, signed and in date.' },
    { swatch: 'bg-red-500', label: 'Missing', body: 'The rules need it now.' },
    { swatch: 'bg-orange-500', label: 'Needs action', body: 'Unsigned, expired or out of step.' },
    { swatch: 'bg-white', label: 'Due soon', body: 'For example a training plan by day 42.' },
    {
      swatch: 'border border-white/[0.3]',
      label: 'Not yet due',
      body: 'Comes later in the programme.',
    },
    {
      swatch: 'border border-dashed border-white/[0.3]',
      label: 'Not needed',
      body: 'Does not apply to this learner.',
    },
  ],
  notes: [
    {
      title: 'Documents are kept, never overwritten',
      body: 'Filing again creates a new version; the old one is kept and marked replaced, with a fingerprint showing the file is unaltered. Only your college’s staff can see them.',
    },
    {
      title: 'Your own requirements',
      body: 'Anything you add under Your requirements appears on every matching learner’s pack and is chased the same way: inductions, DBS checks, PPE records.',
    },
  ],
  source: (
    <>
      Built from the Apprenticeship funding rules of each learner&apos;s start year (2026/27:
      paragraphs 344 to 354 on evidence; 2025/26: 309 to 318; 2024/25: 282 to 291), and the evidence
      requirements throughout (eligibility, the agreement, the training plan, off-the-job training,
      progress reviews, gateway and completion).
    </>
  ),
};

const STAGE_TITLE: Record<ItemGroup | 'custom', string> = {
  start: 'At the start',
  during: 'During the apprenticeship',
  end: 'At gateway and the end',
  custom: 'Your college’s requirements',
};
const STAGE_ORDER: Array<ItemGroup | 'custom'> = ['start', 'during', 'end', 'custom'];

/** Short column labels for the matrix; the full title shows on hover/long-press. */
const SHORT: Record<string, string> = {
  id_residency: 'ID',
  identifiers: 'ULN/NI',
  eligibility: 'Elig.',
  employment: 'Job',
  agreement: 'Agmt',
  training_plan: 'Plan',
  initial_assessment: 'IA',
  planned_otj: 'Hours',
  english_maths: 'E&M',
  duration: 'Length',
  wage: 'Wage',
  care_leaver: 'Care',
  contract_for_services: 'CfS',
  monthly_otj: 'Monthly',
  reviews: 'Review',
  learning_support: 'LS',
  episodes: 'Breaks',
  gateway: 'Gate',
  epa_employment: 'Emp. EPA',
  epao_agreement: 'EPAO',
  net_readiness_checklist: 'NET checklist',
  epa_result: 'Result',
  otj_statement: 'P v A',
};

// Cell colours for the matrix and strips (solid, no tints).
const CELL: Record<ItemStatus, string> = {
  ok: 'bg-emerald-500',
  missing: 'bg-red-500',
  attention: 'bg-orange-500',
  due: 'bg-white',
  not_yet_due: 'border border-white/[0.25]',
  not_applicable: 'border border-dashed border-white/[0.18]',
};

const SEGMENTS: Array<{ s: ItemStatus; label: string; cn: string }> = [
  { s: 'ok', label: 'In place', cn: 'bg-emerald-500' },
  { s: 'attention', label: 'Needs action', cn: 'bg-orange-500' },
  { s: 'due', label: 'Due soon', cn: 'bg-white' },
  { s: 'missing', label: 'Missing', cn: 'bg-red-500' },
];

export default function CollegeEvidencePackPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();
  const collegeId = profile?.college_id ?? null;
  const { rows, loading, error, reload } = useEvidenceBoard(collegeId);
  const [view, setView] = useState<View>(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
      ? 'matrix'
      : 'evidence'
  );
  const [cohort, setCohort] = useState('all');
  const [search, setSearch] = useState('');
  // ?requirements=1 opens the college's requirements straight away.
  const [reqOpen, setReqOpen] = useState(
    () => new URLSearchParams(window.location.search).get('requirements') === '1'
  );

  const cohorts = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of rows) if (r.cohort_id) m.set(r.cohort_id, r.cohort ?? 'Cohort');
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [rows]);
  const inScope = useMemo(
    () => (cohort === 'all' ? rows : rows.filter((r) => r.cohort_id === cohort)),
    [rows, cohort]
  );

  // Every evidence item seen across the learners in view, in stage order.
  const catalog = useMemo(() => {
    const m = new Map<string, { key: string; title: string; stage: ItemGroup | 'custom' }>();
    for (const r of inScope)
      for (const c of r.catalog ?? [])
        if (!m.has(c.key))
          m.set(c.key, { key: c.key, title: c.title, stage: c.custom ? 'custom' : c.group });
    return STAGE_ORDER.flatMap((st) => [...m.values()].filter((c) => c.stage === st));
  }, [inScope]);

  // Per item: how many learners are in each state.
  const perItem = useMemo(() => {
    const out = new Map<string, Record<ItemStatus, number> & { applicable: number }>();
    for (const c of catalog) {
      const tally = {
        ok: 0,
        missing: 0,
        attention: 0,
        due: 0,
        not_yet_due: 0,
        not_applicable: 0,
        applicable: 0,
      };
      for (const r of inScope) {
        const st = r.statuses?.[c.key];
        if (!st) continue;
        tally[st] += 1;
        if (isApplicable(st)) tally.applicable += 1;
      }
      out.set(c.key, tally);
    }
    return out;
  }, [catalog, inScope]);

  const totals = useMemo(() => {
    const t = { ok: 0, missing: 0, attention: 0, due: 0, applicable: 0, ready: 0 };
    for (const r of inScope) {
      let gaps = 0;
      for (const st of Object.values(r.statuses ?? {})) {
        if (!isApplicable(st)) continue;
        t.applicable += 1;
        if (st === 'ok') t.ok += 1;
        else {
          t[st as 'missing' | 'attention' | 'due'] += 1;
          if (st !== 'due') gaps += 1;
        }
      }
      if (gaps === 0) t.ready += 1;
    }
    return t;
  }, [inScope]);
  const pct = totals.applicable ? Math.round((100 * totals.ok) / totals.applicable) : 0;

  const biggest = useMemo(() => {
    let best: { key: string; title: string; n: number } | null = null;
    for (const c of catalog) {
      const t = perItem.get(c.key);
      const n = (t?.missing ?? 0) + (t?.attention ?? 0);
      if (n > 0 && (!best || n > best.n)) best = { key: c.key, title: c.title, n };
    }
    return best;
  }, [catalog, perItem]);

  const exportCsv = () => {
    const q = (v: unknown) => {
      const t = v == null ? '' : String(v);
      return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
    };
    const lines = [['Learner', 'Cohort', ...catalog.map((c) => c.title)].map(q).join(',')];
    for (const r of inScope)
      lines.push(
        [
          r.name,
          r.cohort,
          ...catalog.map((c) => (r.statuses?.[c.key] ? STATUS_LABEL[r.statuses[c.key]] : '')),
        ]
          .map(q)
          .join(',')
      );
    try {
      const blob = new Blob(['﻿', lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `evidence-pack-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast({ title: 'Export failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const openLearner = (id: string) => navigate(`/college/evidence-pack/${id}`);

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Evidence pack" backTo="/college?section=qualityhub" />
      <HubBody pushContext="Get notified about evidence that is missing or due">
        {/* Hero: where the college stands, what this is, the two actions */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-2xl">
            <p className="text-[13px] font-semibold text-elec-yellow">Funding evidence</p>
            <div className="mt-2 flex items-start gap-3">
              <h1 className="text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
                {loading
                  ? 'Building the pack…'
                  : `${totals.ready} of ${inScope.length} learners audit-ready`}
              </h1>
              <PageHelpButton help={HELP} className="mt-0.5" />
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-white">
              What the funding rules need on file for every apprentice, checked live against your
              records. Close the gaps here before an auditor or inspector asks.
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2.5 sm:flex">
            <button type="button" onClick={() => setReqOpen(true)} className={toolCn}>
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span className="sm:hidden">Requirements</span>
              <span className="hidden sm:inline">Your requirements</span>
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={inScope.length === 0}
              className={toolCn}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export
            </button>
          </div>
        </header>

        <HowItWorks help={HELP} />

        {/* Readiness */}
        <section className={cn(surfaceCn, 'p-5 sm:p-7')}>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium text-white">Required evidence in place</p>
                  <p className="mt-1 text-[52px] font-bold leading-none tabular-nums text-elec-yellow sm:text-[64px]">
                    {loading ? '—' : `${pct}%`}
                  </p>
                </div>
                <p className="pb-1 text-right text-[13px] leading-snug text-white">
                  <span className="block text-[20px] font-semibold tabular-nums">
                    {totals.ok}/{totals.applicable}
                  </span>
                  items due now
                </p>
              </div>
              <div
                className="mt-5 flex h-3.5 gap-[3px] overflow-hidden rounded-full"
                aria-hidden="true"
              >
                {totals.applicable === 0 ? (
                  <div className="flex-1 bg-white/[0.08]" />
                ) : (
                  SEGMENTS.map((g) => {
                    const n = totals[g.s as 'ok' | 'missing' | 'attention' | 'due'];
                    return n > 0 ? (
                      <div
                        key={g.s}
                        className={cn(g.cn, 'first:rounded-l-full last:rounded-r-full')}
                        style={{ flexGrow: n }}
                      />
                    ) : null;
                  })
                )}
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 sm:flex sm:flex-wrap">
                {SEGMENTS.map((g) => (
                  <li key={g.s} className="flex items-center gap-2 text-[13px] text-white">
                    <span className={cn('h-2.5 w-2.5 rounded-full', g.cn)} />
                    <span className="font-semibold tabular-nums">
                      {totals[g.s as 'ok' | 'missing' | 'attention' | 'due']}
                    </span>
                    {g.label.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.08] bg-background p-5">
              <div>
                <p className="text-[13px] font-semibold text-elec-yellow">Start here</p>
                <p className="mt-2 text-[19px] font-semibold leading-snug text-white">
                  {biggest ? biggest.title : 'Everything due is in place'}
                </p>
                <p className="mt-1 text-[13.5px] text-white">
                  {biggest
                    ? `${biggest.n} ${biggest.n === 1 ? 'learner is' : 'learners are'} missing it or need action. It is your biggest gap.`
                    : 'New items appear here as they fall due.'}
                </p>
              </div>
              {biggest && (
                <button
                  type="button"
                  onClick={() => {
                    setView('evidence');
                    window.setTimeout(
                      () =>
                        document
                          .getElementById(`ev-${biggest.key}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                      50
                    );
                  }}
                  className="inline-flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation active:scale-[0.98]"
                >
                  Close this gap
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* View and cohort */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="inline-flex self-start rounded-xl border border-white/[0.12] p-1"
            role="tablist"
          >
            {(
              [
                ['evidence', 'By evidence'],
                ['matrix', 'Matrix'],
                ['learners', 'By learner'],
              ] as Array<[View, string]>
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={cn(
                  'h-11 rounded-lg px-4 text-[13px] font-semibold touch-manipulation',
                  v === 'matrix' && 'hidden lg:inline-flex lg:items-center',
                  view === v ? 'bg-white text-black' : 'text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {cohorts.length > 1 && (
            <QuietTabs
              className="lg:min-w-0 lg:flex-1 lg:border-b-0"
              label="Filter by cohort"
              tabs={[['all', 'All cohorts'] as [string, string], ...cohorts].map(([id, label]) => ({
                key: id,
                label,
              }))}
              value={cohort}
              onChange={setCohort}
            />
          )}
        </div>

        {loading ? (
          <div className="space-y-2 animate-pulse">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-2xl bg-white/[0.04]" />
            ))}
          </div>
        ) : error ? (
          <p className="py-8 text-center text-[13px] text-white">
            Could not build the pack. {error}{' '}
            <button
              type="button"
              onClick={() => void reload()}
              className="font-semibold text-elec-yellow underline"
            >
              Try again
            </button>
          </p>
        ) : inScope.length === 0 ? (
          <p className="py-8 text-center text-[14px] text-white">No learners in this view yet.</p>
        ) : view === 'matrix' ? (
          <Matrix catalog={catalog} rows={inScope} onOpen={openLearner} />
        ) : view === 'learners' ? (
          <LearnerList
            rows={inScope}
            catalog={catalog}
            search={search}
            setSearch={setSearch}
            onOpen={openLearner}
          />
        ) : (
          <EvidenceByStage
            catalog={catalog}
            perItem={perItem}
            rows={inScope}
            onOpen={openLearner}
          />
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white">
          {(
            ['ok', 'attention', 'due', 'missing', 'not_yet_due', 'not_applicable'] as ItemStatus[]
          ).map((s) => (
            <span key={s} className="inline-flex items-center gap-2">
              <span className={cn('h-3 w-3 rounded-[3px]', CELL[s])} />
              {STATUS_LABEL[s]}
            </span>
          ))}
        </div>
      </HubBody>

      {collegeId && (
        <RequirementsSheet
          open={reqOpen}
          onOpenChange={setReqOpen}
          collegeId={collegeId}
          onChanged={() => void reload()}
        />
      )}
    </HubPage>
  );
}

// The landing page's card: faint border, soft top-lit gradient, large radius.
const surfaceCn =
  '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x';

const toolCn =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] disabled:opacity-60';

type Catalog = Array<{ key: string; title: string; stage: ItemGroup | 'custom' }>;

/* ── By evidence: stage → item with "x of n in place" → learners ──────── */

function EvidenceByStage({
  catalog,
  perItem,
  rows,
  onOpen,
}: {
  catalog: Catalog;
  perItem: Map<string, Record<ItemStatus, number> & { applicable: number }>;
  rows: BoardRow[];
  onOpen: (id: string) => void;
}) {
  return (
    <div className="space-y-7">
      {STAGE_ORDER.map((stage) => {
        const items = catalog.filter((c) => c.stage === stage);
        if (!items.length) return null;
        return (
          <section key={stage}>
            <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
              {STAGE_TITLE[stage]}
            </h2>
            <ul className={cn(surfaceCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
              {items.map((c) => (
                <EvidenceRow
                  key={c.key}
                  item={c}
                  tally={perItem.get(c.key)}
                  rows={rows}
                  onOpen={onOpen}
                />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function EvidenceRow({
  item,
  tally,
  rows,
  onOpen,
}: {
  item: Catalog[number];
  tally?: Record<ItemStatus, number> & { applicable: number };
  rows: BoardRow[];
  onOpen: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const t = tally ?? {
    ok: 0,
    missing: 0,
    attention: 0,
    due: 0,
    not_yet_due: 0,
    not_applicable: 0,
    applicable: 0,
  };
  const gaps = t.missing + t.attention + t.due;
  const affected = rows.filter((r) => {
    const st = r.statuses?.[item.key];
    return st === 'missing' || st === 'attention' || st === 'due';
  });
  const notYet = t.applicable === 0;
  return (
    <li id={`ev-${item.key}`} className="scroll-mt-24">
      <button
        type="button"
        onClick={() => gaps > 0 && setOpen((v) => !v)}
        aria-expanded={gaps > 0 ? open : undefined}
        className={cn(
          'grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-4 py-4 text-left sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] sm:px-5',
          gaps > 0 && 'touch-manipulation hover:bg-white/[0.04]'
        )}
      >
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold leading-snug text-white">
            {item.title}
          </span>
          <span className="mt-0.5 block text-[12.5px] text-white">
            {notYet
              ? 'Not yet due for anyone in view'
              : `${t.ok} of ${t.applicable} in place` +
                (t.missing ? ` · ${t.missing} missing` : '') +
                (t.attention ? ` · ${t.attention} need action` : '') +
                (t.due ? ` · ${t.due} due` : '')}
          </span>
        </span>
        <span
          className="col-span-2 row-start-2 flex h-2 overflow-hidden rounded-full bg-white/[0.08] sm:col-span-1 sm:row-start-1"
          aria-hidden="true"
        >
          {!notYet &&
            SEGMENTS.map((g) =>
              t[g.s] > 0 ? (
                <span
                  key={g.s}
                  className={g.cn}
                  style={{ width: `${(100 * t[g.s]) / t.applicable}%` }}
                />
              ) : null
            )}
        </span>
        <span className="flex items-center gap-2">
          {gaps > 0 ? (
            <>
              <span className="rounded-full border border-orange-400/70 px-2.5 py-1 text-[12px] font-semibold tabular-nums text-orange-300">
                {gaps} {gaps === 1 ? 'gap' : 'gaps'}
              </span>
              <ChevronDown
                className={cn('h-4 w-4 text-white transition-transform', open && 'rotate-180')}
                aria-hidden="true"
              />
            </>
          ) : (
            <span
              className={cn(
                'rounded-full px-2.5 py-1 text-[12px] font-semibold',
                notYet ? STATUS_PILL.not_yet_due : STATUS_PILL.ok
              )}
            >
              {notYet ? 'Later' : 'All in place'}
            </span>
          )}
        </span>
      </button>
      {open && affected.length > 0 && (
        <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08] bg-background">
          {affected.map((r) => {
            const st = r.statuses?.[item.key] as ItemStatus;
            const detail = r.items?.find((i) => i.key === item.key)?.detail;
            return (
              <li key={r.student_id}>
                <button
                  type="button"
                  onClick={() => onOpen(r.student_id)}
                  className="flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5 sm:pl-8"
                >
                  <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', CELL[st])} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-white">
                      {r.name}
                    </span>
                    {detail && (
                      <span className="block truncate text-[12px] text-white">{detail}</span>
                    )}
                  </span>
                  <span className="hidden shrink-0 text-[12px] text-white sm:inline">
                    {r.cohort}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/* ── Matrix: learners down, evidence across (desktop) ───────────────── */

function Matrix({
  catalog,
  rows,
  onOpen,
}: {
  catalog: Catalog;
  rows: BoardRow[];
  onOpen: (id: string) => void;
}) {
  return (
    // Solid, so the pinned learner column can cover cells scrolling under it;
    // 14% is the middle of the landing card gradient the other cards use.
    <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[hsl(0_0%_14%)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="sticky left-0 z-10 min-w-[220px] border-r border-white/[0.08] bg-[hsl(0_0%_14%)] px-5 py-3 align-bottom text-[12px] font-semibold text-white"
            >
              Learner
            </th>
            {STAGE_ORDER.map((st) => {
              const n = catalog.filter((c) => c.stage === st).length;
              return n ? (
                <th
                  key={st}
                  colSpan={n}
                  className="border-l border-white/[0.08] px-3 pt-4 text-left text-[12px] font-semibold text-white"
                >
                  {STAGE_TITLE[st]}
                </th>
              ) : null;
            })}
          </tr>
          <tr className="border-b border-white/[0.12]">
            {catalog.map((c, i) => (
              <th
                key={c.key}
                title={c.title}
                className={cn(
                  'h-[88px] w-9 px-0.5 pb-2 align-bottom',
                  (i === 0 || catalog[i - 1].stage !== c.stage) && 'border-l border-white/[0.1]'
                )}
              >
                <span className="mx-auto block max-h-[80px] w-4 overflow-hidden text-[12px] font-medium text-white [writing-mode:vertical-rl] rotate-180">
                  {SHORT[c.key] ?? c.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const gaps = (r.items ?? []).length;
            return (
              <tr
                key={r.student_id}
                className="group border-b border-white/[0.06] last:border-b-0 hover:bg-[hsl(0_0%_16%)]"
              >
                <td className="sticky left-0 z-10 border-r border-white/[0.08] bg-[hsl(0_0%_14%)] px-5 py-2.5 group-hover:bg-[hsl(0_0%_16%)]">
                  <button
                    type="button"
                    onClick={() => onOpen(r.student_id)}
                    className="block w-full text-left"
                  >
                    <span className="block truncate text-[13.5px] font-semibold text-white">
                      {r.name}
                    </span>
                    <span className="block truncate text-[12px] text-white">
                      {gaps ? `${gaps} to do` : 'Audit-ready'}
                      {r.cohort ? ` · ${r.cohort}` : ''}
                    </span>
                  </button>
                </td>
                {catalog.map((c, i) => {
                  const st = r.statuses?.[c.key];
                  return (
                    <td
                      key={c.key}
                      className={cn(
                        'px-0.5 py-2 text-center',
                        (i === 0 || catalog[i - 1].stage !== c.stage) &&
                          'border-l border-white/[0.1]'
                      )}
                    >
                      {st ? (
                        <button
                          type="button"
                          onClick={() => onOpen(r.student_id)}
                          title={`${r.name} · ${c.title}: ${STATUS_LABEL[st]}`}
                          aria-label={`${r.name}, ${c.title}: ${STATUS_LABEL[st]}`}
                          className={cn(
                            'mx-auto block h-5 w-5 rounded-[4px] transition-transform hover:scale-125',
                            CELL[st]
                          )}
                        />
                      ) : (
                        <span className="mx-auto block h-5 w-5" />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── By learner: a status strip each ───────────────────────────────── */

function LearnerList({
  rows,
  catalog,
  search,
  setSearch,
  onOpen,
}: {
  rows: BoardRow[];
  catalog: Catalog;
  search: string;
  setSearch: (s: string) => void;
  onOpen: (id: string) => void;
}) {
  const list = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return rows
      .filter((r) => !needle || r.name.toLowerCase().includes(needle))
      .sort(
        (a, b) => (b.items ?? []).length - (a.items ?? []).length || a.name.localeCompare(b.name)
      );
  }, [rows, search]);
  return (
    <section className="space-y-3">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Find a learner"
        aria-label="Find a learner"
        className={inputCn}
      />
      <ul className={cn(surfaceCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
        {list.map((r) => {
          const gaps = (r.items ?? []).length;
          const applicable = Object.values(r.statuses ?? {}).filter(isApplicable);
          const ok = applicable.filter((s) => s === 'ok').length;
          return (
            <li key={r.student_id}>
              <button
                type="button"
                onClick={() => onOpen(r.student_id)}
                className="flex w-full items-center gap-4 px-4 py-3.5 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-[15px] font-semibold text-white">{r.name}</span>
                    <span className="shrink-0 text-[12.5px] tabular-nums text-white">
                      {ok}/{applicable.length}
                    </span>
                  </span>
                  <span className="mt-2 flex gap-[3px]" aria-hidden="true">
                    {catalog.map((c) => {
                      const st = r.statuses?.[c.key];
                      return st ? (
                        <span
                          key={c.key}
                          className={cn('h-2.5 min-w-0 flex-1 rounded-[2px]', CELL[st])}
                        />
                      ) : (
                        <Fragment key={c.key} />
                      );
                    })}
                  </span>
                  <span className="mt-1.5 block truncate text-[12px] text-white">
                    {gaps === 0
                      ? 'Audit-ready'
                      : (r.items ?? [])
                          .slice(0, 3)
                          .map((i) => i.title)
                          .join(' · ') + (gaps > 3 ? ` · +${gaps - 3} more` : '')}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

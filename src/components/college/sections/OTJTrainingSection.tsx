/**
 * OTJTrainingSection — each apprentice's verified off-the-job hours against
 * the fixed total their standard requires.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   header + help → figures → status and completion charts → apprentices
 *   (left) with how it is calculated beside them (right). Mine first.
 *
 * What went: the PageHero, the four-cell blue/green/amber/purple StatStrip,
 * the emerald/amber/red figure colours and the `text-white/70` meta lines.
 * Colour encodes state only: red on an apprentice at risk of missing their
 * hours, volt on one behind.
 *
 * 7 Oct 2026: the hours now come from get_college_otj, which wraps
 * get_otj_summary per learner, THE off-the-job figure (Andrew, 6 Oct: app
 * learning counts). This screen used to add up verified entries only, so it
 * disagreed with Student 360, the cohort hours page and the learner's own
 * app. Status is the RPC's risk (on track / slightly behind / behind).
 *
 * OTJ hours are a FIXED total per apprenticeship standard
 * (DfE Annex C, post Aug-2025) — NOT 20% of working hours. The required total
 * comes from the course (college_courses.otj_required_hours) and the
 * completed total is the learner's VERIFIED off-the-job entries, keyed by the
 * learner's auth uid (college_otj_entries.student_id = college_students.user_id),
 * not the college row id. The learner link still lands on Student 360's
 * off-the-job panel.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  COLLEGE_LINK,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { Ring, VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { Bars, ScopeToggle, useScope } from '@/components/college/assessment/AssessmentKit';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { CLearnerRow } from '@/components/college/assessment/CLearnerRow';
import { fetchCollegeOtj, type CollegeOtjRow, type OtjRisk } from '@/hooks/useOtjSummary';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

interface OTJTrainingSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type OTJStatus = 'On track' | 'Behind' | 'At risk' | 'Not judged';
type FilterOption = 'all' | OTJStatus;

const STATUS_OF: Record<OtjRisk, OTJStatus> = {
  on_track: 'On track',
  slightly_behind: 'Behind',
  behind: 'At risk',
  unknown: 'Not judged',
};

interface StudentOTJData {
  row: CollegeOtjRow;
  requiredHours: number | null;
  countedHours: number;
  plannedHours: number | null;
  progressPercent: number | null;
  expectedPercent: number | null;
  status: OTJStatus;
}

const round1 = (n: number) => Math.round(n * 10) / 10;
const fmtH = (n: number | null | undefined) => (n === null || n === undefined ? '\u2014' : `${Math.round(n)}h`);

const HELP: PageHelpContent = {
  id: 'college-otj-training',
  title: 'Off-the-job training',
  what: 'Every apprentice\u2019s off-the-job hours against the fixed total their standard requires, and whether they are on pace to reach it by the planned end date.',
  steps: [
    { title: 'Start with who is behind', body: 'The list is sorted furthest behind first. Tap an apprentice to open their hours in Student 360.' },
    { title: 'Clear what is waiting', body: 'Hours to verify and app learning to approve wait in the off-the-job inbox. Open it from the top of the page.' },
    { title: 'Check the monthly rule', body: 'Funding rules expect some off-the-job training every calendar month. The figure shows who has none yet this month.' },
  ],
  legend: [
    { swatch: 'bg-emerald-400', label: 'On track', body: 'At or ahead of the pace needed.' },
    { swatch: 'bg-elec-yellow', label: 'Behind', body: 'Slightly behind the planned pace.' },
    { swatch: 'bg-orange-500', label: 'At risk', body: 'Behind enough to miss the total without a change.' },
    { swatch: 'bg-white', label: 'Not judged', body: 'Under four weeks in, or no required total or dates set.' },
  ],
  notes: [
    { title: 'The figure', body: 'Counted hours are verified hours plus app learning not yet approved: the same figure Student 360, the cohort hours page and the apprentice\u2019s own app show.' },
    { title: 'My learners', body: 'Opens on the cohorts you lead. Switch to Everyone for the whole college.' },
  ],
  source: 'Apprenticeship funding rules 2025/26: off-the-job training is a fixed total per standard.',
};

function toData(row: CollegeOtjRow): StudentOTJData {
  const s = row.summary;
  const req = s.required_hours ?? null;
  const counted = s.counted_hours ?? 0;
  const planned = s.planned_to_date_hours ?? null;
  return {
    row,
    requiredHours: req,
    countedHours: counted,
    plannedHours: planned,
    progressPercent: req && req > 0 ? Math.min(100, (counted / req) * 100) : null,
    expectedPercent: req && req > 0 && planned !== null ? Math.min(100, (planned / req) * 100) : null,
    status: STATUS_OF[s.risk] ?? 'Not judged',
  };
}

const RANK: Record<OTJStatus, number> = { 'At risk': 0, Behind: 1, 'Not judged': 2, 'On track': 3 };

export function OTJTrainingSection({ onNavigate }: OTJTrainingSectionProps) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const my = useMyLearners();
  const [scope, setScope] = useScope('otjtraining', my);

  const { data: rows = [], isLoading, error, refetch } = useQuery({
    queryKey: ['college-otj-rows'],
    queryFn: () => fetchCollegeOtj(),
  });

  const allData = useMemo(
    () =>
      rows
        .map(toData)
        // Furthest behind first: by status, then by the gap to planned.
        .sort(
          (a, b) =>
            RANK[a.status] - RANK[b.status] ||
            (b.plannedHours ?? 0) - b.countedHours - ((a.plannedHours ?? 0) - a.countedHours)
        ),
    [rows]
  );
  const isMineRow = (d: StudentOTJData) =>
    my.isMine({ studentId: d.row.college_student_id, userId: d.row.user_id, cohortId: d.row.cohort_id });
  const mineCount = allData.filter(isMineRow).length;
  const otjData = scope === 'mine' ? allData.filter(isMineRow) : allData;

  const kpis = useMemo(() => {
    const total = otjData.length;
    const onTrack = otjData.filter((d) => d.status === 'On track').length;
    const behind = otjData.filter((d) => d.status === 'Behind').length;
    const atRisk = otjData.filter((d) => d.status === 'At risk').length;
    const notJudged = otjData.filter((d) => d.status === 'Not judged').length;
    const withPct = otjData.filter((d) => d.progressPercent !== null);
    const avgPct = withPct.length > 0 ? Math.round(withPct.reduce((s, d) => s + (d.progressPercent ?? 0), 0) / withPct.length) : null;
    const countedHours = round1(otjData.reduce((s, d) => s + d.countedHours, 0));
    const verifiedHours = round1(otjData.reduce((s, d) => s + (d.row.summary.verified_hours ?? 0), 0));
    const waitingApp = round1(otjData.reduce((s, d) => s + (d.row.unapproved_app_hours ?? 0), 0));
    const pending = round1(otjData.reduce((s, d) => s + (d.row.summary.pending_hours ?? 0), 0));
    const noneThisMonth = otjData.filter((d) => !d.row.trained_this_month).length;
    return { total, onTrack, behind, atRisk, notJudged, avgPct, countedHours, verifiedHours, waitingApp, pending, noneThisMonth };
  }, [otjData]);

  const bands = useMemo(() => {
    const defs = [
      { key: '100', label: 'Complete', lo: 100, hi: Infinity, cls: 'bg-emerald-400' },
      { key: '75', label: '75 to 99%', lo: 75, hi: 100, cls: 'bg-white' },
      { key: '50', label: '50 to 74%', lo: 50, hi: 75, cls: 'bg-white' },
      { key: '25', label: '25 to 49%', lo: 25, hi: 50, cls: 'bg-white' },
      { key: '0', label: 'Under 25%', lo: -1, hi: 25, cls: 'bg-white' },
    ];
    return defs.map((b) => ({
      ...b,
      n: otjData.filter((d) => d.progressPercent !== null && d.progressPercent >= b.lo && d.progressPercent < b.hi).length,
    }));
  }, [otjData]);

  const filteredData = activeFilter === 'all' ? otjData : otjData.filter((d) => d.status === activeFilter);
  const showList = () => document.getElementById('otj-apprentices')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const pick = (f: FilterOption) => {
    setActiveFilter(f);
    showList();
  };

  const requiredTotal = otjData.reduce((s, d) => s + (d.requiredHours ?? 0), 0);
  const overallPct = requiredTotal > 0 ? Math.round((otjData.reduce((s, d) => s + Math.min(d.countedHours, d.requiredHours ?? 0), 0) / requiredTotal) * 100) : null;

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Assessment"
        title="Off-the-job training"
        description={
          isLoading
            ? 'Each apprentice\u2019s hours against the total their standard requires.'
            : kpis.total === 0
              ? 'Each apprentice\u2019s hours against the total their standard requires.'
              : `${kpis.total} ${kpis.total === 1 ? 'apprentice' : 'apprentices'}${scope === 'mine' ? ' in your cohorts' : ''}. ${
                  kpis.atRisk + kpis.behind > 0 ? `${kpis.atRisk + kpis.behind} behind on hours.` : 'Everyone on pace.'
                }`
        }
        help={HELP}
        actions={
          <>
            <ScopeToggle scope={scope} onChange={setScope} my={my} mineCount={mineCount} allCount={allData.length} />
            <button type="button" onClick={() => navigate('/college/otj/inbox')} className={COLLEGE_BTN}>
              Hours to verify
            </button>
            <button type="button" onClick={() => navigate('/college/otj')} className={COLLEGE_BTN}>
              Cohort hours
            </button>
          </>
        }
      />

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-500/40 px-4 py-3">
          <p className="text-[13.5px] text-white">Couldn’t load hours: {(error as Error).message}</p>
          <button type="button" onClick={() => void refetch()} className={COLLEGE_LINK}>
            Try again
          </button>
        </div>
      )}

      <CollegeStats
        items={[
          {
            label: 'Behind on hours',
            value: String(kpis.behind + kpis.atRisk),
            sub: kpis.atRisk > 0 ? `${kpis.atRisk} at risk of missing the total` : kpis.behind > 0 ? 'Slightly behind the pace' : kpis.total > 0 ? 'Everyone on pace' : 'No apprentices yet',
            warn: kpis.behind + kpis.atRisk > 0,
            onClick: () => pick(kpis.atRisk > 0 ? 'At risk' : 'Behind'),
          },
          {
            label: 'On track',
            value: String(kpis.onTrack),
            sub: kpis.notJudged > 0 ? `${kpis.notJudged} too early to judge` : `${kpis.total} apprentice${kpis.total === 1 ? '' : 's'}`,
            good: kpis.onTrack > 0,
            onClick: () => pick('On track'),
          },
          {
            label: 'No training this month',
            value: String(kpis.noneThisMonth),
            sub: 'Some is expected every month',
            warn: kpis.noneThisMonth > 0,
          },
          {
            label: 'Hours counted',
            value: `${Math.round(kpis.countedHours).toLocaleString('en-GB')}h`,
            sub: `${Math.round(kpis.verifiedHours).toLocaleString('en-GB')}h verified${kpis.waitingApp > 0 ? ` · ${Math.round(kpis.waitingApp)}h app to approve` : ''}`,
            onClick: kpis.waitingApp + kpis.pending > 0 ? () => navigate('/college/otj/inbox') : undefined,
          },
        ]}
      />

      {otjData.length > 0 && (
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          <section className={VIS_CARD}>
            <VisHead title="On pace" sub="Against the planned hours to date. Tap to filter." />
            <div className="mt-4">
              <Bars
                labelWidth="6.5rem"
                onPick={(k) => pick(k as FilterOption)}
                rows={[
                  { key: 'At risk', label: 'At risk', n: kpis.atRisk, cls: 'bg-orange-500' },
                  { key: 'Behind', label: 'Behind', n: kpis.behind, cls: 'bg-elec-yellow' },
                  { key: 'On track', label: 'On track', n: kpis.onTrack, cls: 'bg-emerald-400' },
                  { key: 'Not judged', label: 'Not judged', n: kpis.notJudged, cls: 'bg-white' },
                ]}
              />
            </div>
          </section>
          <section className={VIS_CARD}>
            <VisHead title="Towards the total" sub="Share of each required total counted" />
            <div className="mt-4">
              <Bars labelWidth="6.5rem" rows={bands.map((b) => ({ key: b.key, label: b.label, n: b.n, cls: b.cls }))} />
            </div>
          </section>
          <section className={cn(VIS_CARD, 'flex flex-col')}>
            <VisHead title="All hours" sub={scope === 'mine' ? 'Your apprentices together' : 'Every apprentice together'} />
            <div className="flex flex-1 items-center justify-center pt-2">
              <Ring
                pct={overallPct}
                value={overallPct === null ? '\u2014' : `${overallPct}%`}
                label={`${Math.round(kpis.countedHours).toLocaleString('en-GB')}h of ${Math.round(requiredTotal).toLocaleString('en-GB')}h`}
                sub={kpis.avgPct === null ? 'No required totals set' : `Average apprentice ${kpis.avgPct}%`}
              />
            </div>
          </section>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0 space-y-3">
          <CollegeSectionTitle
            id="otj-apprentices"
            title="Apprentices"
            sub="Furthest behind first. Tap one to open their hours in Student 360."
          />
          {otjData.length > 0 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              {(
                [
                  ['all', 'All', kpis.total],
                  ['At risk', 'At risk', kpis.atRisk],
                  ['Behind', 'Behind', kpis.behind],
                  ['On track', 'On track', kpis.onTrack],
                  ['Not judged', 'Not judged', kpis.notJudged],
                ] as const
              ).map(([value, label, n]) => (
                <button key={value} type="button" onClick={() => setActiveFilter(value)} className={chipCn(activeFilter === value)}>
                  {label} <span className="tabular-nums">{n}</span>
                </button>
              ))}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[64px] animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          ) : otjData.length === 0 ? (
            <CollegeEmpty
              title={scope === 'mine' ? 'No hours for your learners yet' : 'No apprentices yet'}
              body={
                scope === 'mine'
                  ? 'Hours are logged in the app, so a learner shows here once they have joined with their invite. Switch to Everyone for the whole college.'
                  : 'Hours are tracked per apprentice once they are on the roll with a programme.'
              }
              action={
                scope === 'mine' ? (
                  <button type="button" onClick={() => setScope('all')} className={COLLEGE_LINK}>
                    Show everyone
                  </button>
                ) : (
                  <button type="button" onClick={() => onNavigate('students')} className={COLLEGE_LINK}>
                    View learners
                  </button>
                )
              }
            />
          ) : filteredData.length === 0 ? (
            <CollegeEmpty
              title="No apprentices in this band"
              action={
                <button type="button" onClick={() => setActiveFilter('all')} className={COLLEGE_LINK}>
                  Show all
                </button>
              }
            />
          ) : (
            <ul className={COLLEGE_LIST}>
              {filteredData.map((d) => {
                const pct = d.progressPercent === null ? null : Math.round(d.progressPercent);
                const expected = d.expectedPercent === null ? null : Math.round(d.expectedPercent);
                const sub = [
                  d.row.cohort_name ?? 'No cohort',
                  `${fmtH(d.countedHours)} of ${fmtH(d.requiredHours)}`,
                  expected !== null && expected > 0 ? `expected ${expected}% by now` : null,
                  !d.row.trained_this_month ? 'none this month' : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                const chips: Array<{ label: string; warn?: boolean }> = [];
                if (d.status !== 'On track') chips.push({ label: d.status, warn: d.status === 'At risk' });
                if ((d.row.unapproved_app_hours ?? 0) > 0) chips.push({ label: `${Math.round(d.row.unapproved_app_hours)}h app to approve` });
                return (
                  <CLearnerRow
                    key={d.row.college_student_id ?? d.row.user_id}
                    name={d.row.name}
                    chips={chips}
                    mine={scope === 'all' && isMineRow(d)}
                    sub={sub}
                    figure={pct === null ? '\u2014' : `${pct}%`}
                    pct={pct}
                    tone={d.status === 'At risk' ? 'warn' : d.status === 'On track' ? 'good' : 'plain'}
                    onOpen={() =>
                      navigate(`/college?section=student360&studentId=${encodeURIComponent(d.row.college_student_id)}#otj`)
                    }
                  />
                );
              })}
            </ul>
          )}
        </section>

        <aside className="space-y-3 xl:sticky xl:top-16">
          <CollegeSectionTitle title="How this is calculated" />
          <div className={cn(COLLEGE_CARD, 'p-0 sm:p-0')}>
            <ul className="divide-y divide-white/[0.06]">
              {[
                ['Required hours', 'Fixed total per apprenticeship standard (DfE Annex C, 2025/26), from the learner record or course'],
                ['Counted hours', 'Verified entries plus app learning not yet approved'],
                ['Expected by now', 'Planned hours to date between the start and planned end dates'],
                ['Behind / at risk', 'Pace since starting against the pace needed to reach the total'],
                ['Every month', 'Funding rules expect some off-the-job training each calendar month'],
              ].map(([label, value]) => (
                <li key={label} className="px-5 py-3.5 sm:px-6">
                  <p className="text-[13px] font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-white">{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

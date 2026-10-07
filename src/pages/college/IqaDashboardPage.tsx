import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { statusTone, textareaClass, type Tone } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import {
  BarList,
  Donut,
  SegmentBar,
  StatusPill,
  type Tone as QTone,
} from '@/components/college/quality/QualityKit';
import {
  IqaFlowStrip,
  uniqueLabels,
  useIqaSampleVerdicts,
  type FlowStep,
} from '@/components/college/quality/IqaVisuals';
import { useIqaSamplingPlans, type IqaSamplingPlan } from '@/hooks/useIqaSamplingPlans';
import {
  useIqaFindings,
  isFindingOpen,
  type IqaFinding,
  type FindingStatus,
} from '@/hooks/useIqaFindings';
import {
  useStandardisationMeetings,
  type StandardisationMeeting,
} from '@/hooks/useStandardisationMeetings';
import { AddIqaSamplingPlanDialog } from '@/components/college/dialogs/AddIqaSamplingPlanDialog';
import { AddIqaFindingDialog } from '@/components/college/dialogs/AddIqaFindingDialog';
import { AddStandardisationMeetingDialog } from '@/components/college/dialogs/AddStandardisationMeetingDialog';
import { CoverageMatrixTab } from '@/components/college/iqa/CoverageMatrixTab';
import { AssessorDriftPanel } from '@/components/college/iqa/AssessorDriftPanel';
import { useEqaVisitPackExport } from '@/hooks/useEqaVisitPackExport';

/* ==========================================================================
   IqaDashboardPage — /college/iqa (College Hub redesign, 7 Oct 2026).
   The IQA cycle (ELE-1871): plan → sample → verdict → actions → closure,
   then the standardisation record. Tabs: Sampling · Findings ·
   Standardisation · Coverage.
   ========================================================================== */

// Finding-status tone is local: 'open / in_progress / closed / escalated' is
// not one of the canonical statusTone domains. Finding *type* is routed
// through statusTone('iqaFinding', …) so it matches every other surface.
const FINDING_TYPE_LABEL: Record<string, string> = {
  commendation: 'Good practice',
  observation: 'For improvement',
  action: 'Action required',
  concern: 'Concern',
};

const FINDING_STATUS_TONE: Record<FindingStatus, Tone> = {
  open: 'amber',
  in_progress: 'blue',
  closed: 'emerald',
  escalated: 'red',
};

const HELP: PageHelpContent = {
  id: 'college-iqa-dashboard',
  title: 'Internal quality assurance',
  what: 'Where you check that assessors are making sound, consistent decisions. Plan what to sample, sample it, give a verdict, turn any problems into actions and close them, and keep a record of standardisation.',
  steps: [
    {
      title: 'Set a sampling plan',
      body: 'Pick the qualification or unit, the assessor and the period, and the percentage you will sample. 10 to 20% is usual for routine sampling.',
    },
    {
      title: 'Sample and give a verdict',
      body: 'Open a plan, add observations or off-the-job entries to the sample and mark each one agree, disagree or refer back.',
    },
    {
      title: 'Raise and close actions',
      body: 'A disagree or refer becomes a finding with an action plan and a due date. Close it with a note once it is resolved.',
    },
    {
      title: 'Standardise',
      body: 'Record each standardisation meeting with attendees, decisions and actions, so every assessor is marking to the same standard.',
    },
  ],
  notes: [
    {
      title: 'The EQA visit pack',
      body: 'Downloads a ZIP of the last 12 months: plans, verdicts, findings, meetings and coverage, ready for the external quality assurer.',
    },
    {
      title: 'Coverage',
      body: 'The coverage tab shows which units and assessors have been sampled, so gaps in the plan are easy to see.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'Agree, on target or closed' },
    { swatch: 'bg-orange-400', label: 'Behind target, refer back or open' },
    { swatch: 'bg-red-500', label: 'Disagree or overdue' },
  ],
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  const today = new Date();
  d.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86_400_000);
}

/** Map the college primitives' tone onto the quality kit's pill tone. */
function qTone(t: Tone): QTone {
  if (t === 'emerald' || t === 'green') return 'good';
  if (t === 'amber' || t === 'orange' || t === 'yellow') return 'warn';
  if (t === 'red') return 'bad';
  if (t === 'blue' || t === 'cyan' || t === 'indigo' || t === 'purple') return 'info';
  return 'neutral';
}

type Tab = 'sampling' | 'findings' | 'standardisation' | 'coverage';

export default function IqaDashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('sampling');
  const [search, setSearch] = useState('');
  const [addPlanOpen, setAddPlanOpen] = useState(false);
  // ELE-1898: plans and findings are IQA work (college_can 'iqa.sample'),
  // the same check the sampling and findings policies make.
  const { can } = useCollegeCan();
  const canIqa = can('iqa.sample');
  const [addFindingOpen, setAddFindingOpen] = useState(false);
  const [addMeetingOpen, setAddMeetingOpen] = useState(false);
  // In-app close-note flow (replaces window.prompt). Holds the finding being
  // closed plus the resolution-note draft and an in-flight flag.
  const [closingFinding, setClosingFinding] = useState<IqaFinding | null>(null);
  const [closeNote, setCloseNote] = useState('');
  const [closeSaving, setCloseSaving] = useState(false);
  const { exportPack, exporting: exportingPack } = useEqaVisitPackExport();

  const handleEqaPack = async () => {
    try {
      await exportPack({ sinceDays: 365 });
      toast({
        title: 'EQA pack downloaded',
        description: 'ZIP with plans, verdicts, findings, meetings and coverage. Last 12 months.',
      });
    } catch (e) {
      toast({
        title: 'EQA pack export failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  // Sampling report + standardisation record, rendered in PDFMonkey (ELE-2017).
  const [reportBusy, setReportBusy] = useState(false);
  const handleIqaReport = async () => {
    if (reportBusy) return;
    setReportBusy(true);
    try {
      await downloadLearnerDocument({ kind: 'iqa_report' });
    } catch (e) {
      toast({ title: 'Could not make the IQA report', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setReportBusy(false);
    }
  };

  const confirmCloseFinding = async () => {
    if (!closingFinding) return;
    setCloseSaving(true);
    try {
      await closeFinding(closingFinding.id, closeNote.trim());
      toast({ title: 'Finding closed' });
      setClosingFinding(null);
      setCloseNote('');
    } catch (e) {
      toast({
        title: 'Close failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setCloseSaving(false);
    }
  };

  const { plans, loading: plansLoading } = useIqaSamplingPlans();
  const {
    findings,
    loading: findingsLoading,
    close: closeFinding,
    remove: removeFinding,
  } = useIqaFindings();
  const {
    meetings,
    loading: meetingsLoading,
    remove: removeMeeting,
  } = useStandardisationMeetings();
  const verdictsQuery = useIqaSampleVerdicts(plans.map((p) => p.id));
  const verdicts = useMemo(() => verdictsQuery.data ?? [], [verdictsQuery.data]);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activePlans = plans.filter((p) => {
      const end = new Date(p.period_end);
      end.setHours(0, 0, 0, 0);
      return end.getTime() >= today.getTime();
    }).length;
    const openFindings = findings.filter((f) => isFindingOpen(f)).length;
    const overdueFindings = findings.filter(
      (f) => isFindingOpen(f) && f.due_date && new Date(f.due_date) < today
    ).length;
    const ninetyAgo = new Date();
    ninetyAgo.setDate(ninetyAgo.getDate() - 90);
    const recentMeetings = meetings.filter((m) => new Date(m.date) >= ninetyAgo).length;
    const plansOnTarget = plans.filter((p) => {
      // Never more than 100%: the stored total can lag the samples taken.
      const total = Math.max(p.total_assessments ?? 0, p.sampled_count ?? 0);
      const pct = total > 0 ? ((p.sampled_count ?? 0) / total) * 100 : 0;
      return pct >= (p.target_sample_percent ?? 0) && total > 0;
    }).length;
    const v = { agree: 0, disagree: 0, refer: 0, pending: 0 };
    for (const r of verdicts) v[r.verdict] += 1;
    const decided = v.agree + v.disagree + v.refer;
    const agreePct = decided > 0 ? Math.round((v.agree / decided) * 100) : null;
    const closed = findings.filter((f) => !isFindingOpen(f)).length;
    const escalated = findings.filter((f) => f.status === 'escalated').length;
    const lastMeeting = meetings.reduce<string | null>(
      (acc, m) => (!acc || m.date > acc ? m.date : acc),
      null
    );
    const meetingActions = meetings.reduce((n, m) => n + (m.action_items?.length ?? 0), 0);
    return {
      activePlans,
      openFindings,
      overdueFindings,
      recentMeetings,
      plansOnTarget,
      v,
      decided,
      agreePct,
      closed,
      escalated,
      lastMeeting,
      meetingActions,
    };
  }, [plans, findings, meetings, verdicts]);

  const heroAction = () => {
    if (activeTab === 'sampling') setAddPlanOpen(true);
    else if (activeTab === 'findings') setAddFindingOpen(true);
    else if (activeTab === 'standardisation') setAddMeetingOpen(true);
  };

  const goTab = (t: Tab) => {
    setActiveTab(t);
    setSearch('');
    window.requestAnimationFrame(() =>
      document.getElementById('iqa-work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  const totalSamples = verdicts.length;
  const flow: FlowStep[] = [
    {
      key: 'plan',
      label: 'Plan',
      value: `${plans.length} ${plans.length === 1 ? 'plan' : 'plans'}`,
      sub:
        stats.activePlans > 0
          ? `${stats.activePlans} running now`
          : plans.length > 0
            ? 'None running now'
            : 'Set your first plan',
      state: plans.length === 0 ? 'now' : 'done',
      onClick: () => goTab('sampling'),
    },
    {
      key: 'sample',
      label: 'Sample',
      value: String(totalSamples),
      sub: `${stats.plansOnTarget} of ${plans.length} plans at target`,
      state: plans.length === 0 ? 'todo' : stats.plansOnTarget < plans.length ? 'now' : 'done',
      onClick: () => goTab('sampling'),
    },
    {
      key: 'verdict',
      label: 'Verdict',
      value: stats.agreePct === null ? '—' : `${stats.agreePct}% agree`,
      sub:
        stats.v.pending > 0
          ? `${stats.v.pending} awaiting a verdict`
          : `${stats.decided} verdicts given`,
      state: totalSamples === 0 ? 'todo' : stats.v.pending > 0 ? 'now' : 'done',
      onClick: () => goTab('sampling'),
    },
    {
      key: 'actions',
      label: 'Actions',
      value: `${findings.length} raised`,
      sub:
        stats.openFindings > 0
          ? `${stats.openFindings} open${stats.overdueFindings ? `, ${stats.overdueFindings} overdue` : ''}`
          : stats.v.disagree + stats.v.refer > findings.length
            ? `${stats.v.disagree + stats.v.refer} disagree or refer back`
            : 'Nothing open',
      state:
        stats.openFindings > 0 || stats.v.disagree + stats.v.refer > findings.length
          ? 'now'
          : findings.length === 0
            ? 'todo'
            : 'done',
      onClick: () => goTab('findings'),
    },
    {
      key: 'closure',
      label: 'Closure',
      value: `${stats.closed} closed`,
      sub:
        findings.length > 0
          ? `${findings.length - stats.closed} still to close`
          : 'Closed actions show here',
      state: findings.length === 0 ? 'todo' : stats.closed === findings.length ? 'done' : 'now',
      onClick: () => goTab('findings'),
    },
  ];

  const coverageLabels = uniqueLabels(
    plans
      .slice(0, 8)
      .map((p) => `${p.qualification_code ?? 'All'}${p.unit_code ? ` · ${p.unit_code}` : ''}`)
  );
  const coverageRows = plans.slice(0, 8).map((p, i) => {
    // Never more than 100%: the stored total can lag the samples taken.
    const total = Math.max(p.total_assessments ?? 0, p.sampled_count ?? 0);
    const pct = total > 0 ? Math.round(((p.sampled_count ?? 0) / total) * 100) : 0;
    const target = p.target_sample_percent ?? 0;
    return {
      label: coverageLabels[i],
      sub: `Target ${target}% · ${p.sampled_count ?? 0} of ${total}`,
      n: pct,
      tone: (pct >= target ? 'good' : 'warn') as 'good' | 'warn',
      onClick: () => navigate(`/college/iqa/sampling/${p.id}`),
    };
  });

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="IQA" backTo="/college?section=qualityhub" />
      <HubBody pushContext="Get notified when IQA findings fall due and samples need a verdict">
        <CollegePageHeader
          eyebrow="Internal quality assurance"
          title={
            plansLoading
              ? 'Checking your plans…'
              : `${plans.length} sampling ${plans.length === 1 ? 'plan' : 'plans'}, ${stats.agreePct === null ? 'no verdicts yet' : `${stats.agreePct}% agreement`}`
          }
          description="Plan what to sample, give verdicts on assessor decisions, turn problems into actions and keep the standardisation record an EQA visit expects."
          help={HELP}
          actions={
            <>
              <button
                type="button"
                onClick={handleEqaPack}
                disabled={exportingPack}
                className={COLLEGE_BTN}
              >
                <Download className="h-4 w-4" aria-hidden />
                {exportingPack ? 'Building…' : 'EQA visit pack'}
              </button>
              <button type="button" onClick={handleIqaReport} disabled={reportBusy} className={COLLEGE_BTN}>
                <Download className="h-4 w-4" aria-hidden />
                {reportBusy ? 'Making the PDF…' : 'IQA report (PDF)'}
              </button>
              {activeTab !== 'coverage' && (activeTab === 'standardisation' || canIqa) && (
                <button type="button" onClick={heroAction} className={COLLEGE_BTN_PRIMARY}>
                  {activeTab === 'sampling'
                    ? 'New plan'
                    : activeTab === 'findings'
                      ? 'Log finding'
                      : 'New meeting'}
                </button>
              )}
            </>
          }
        />

        <IqaFlowStrip steps={flow} />

        <AreaHero
          figures={[
            {
              label: 'Active plans',
              value: String(stats.activePlans),
              sub: `${plans.length} in total`,
            },
            {
              label: 'Plans at target',
              value: `${stats.plansOnTarget}/${plans.length}`,
              sub: 'Sampled at or above the target %',
              warn: plans.length > 0 && stats.plansOnTarget < plans.length,
              good: plans.length > 0 && stats.plansOnTarget === plans.length,
            },
            {
              label: 'Agreement',
              value: stats.agreePct === null ? '—' : `${stats.agreePct}%`,
              sub: `${stats.v.agree} of ${stats.decided} verdicts agree`,
              warn: stats.agreePct !== null && stats.agreePct < 80,
              good: stats.agreePct !== null && stats.agreePct >= 90,
            },
            {
              label: 'Open findings',
              value: String(stats.openFindings),
              sub:
                stats.overdueFindings > 0 ? `${stats.overdueFindings} overdue` : 'Awaiting closure',
              warn: stats.overdueFindings > 0,
            },
          ]}
          chartTitle="Sampling coverage by plan (% sampled)"
          chart={
            coverageRows.length === 0 ? (
              <p className="text-[12.5px] text-white">
                No plans yet. Set a sampling plan to see coverage here.
              </p>
            ) : (
              <BarList rows={coverageRows} suffix="%" max={100} />
            )
          }
          side={
            <div>
              <p className="mb-3 text-[13px] font-semibold text-white">Sample verdicts</p>
              <Donut
                centre={String(totalSamples)}
                centreSub="sampled"
                emptyText="No samples yet"
                segments={[
                  { label: 'Agree', n: stats.v.agree, tone: 'good' },
                  { label: 'Disagree', n: stats.v.disagree, tone: 'bad' },
                  { label: 'Returned', n: stats.v.refer, tone: 'warn' },
                  { label: 'Awaiting verdict', n: stats.v.pending, tone: 'neutral' },
                ]}
              />
            </div>
          }
        />

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          <motion.section initial="hidden" animate="visible" className={VIS_CARD}>
            <VisHead
              title="Findings by status"
              sub="Every action raised from sampling, and how many are closed"
              onOpen={() => goTab('findings')}
            />
            <div className="mt-5">
              <SegmentBar
                emptyText="No findings logged yet"
                segments={[
                  // The database records findings as Open or Closed only.
                  {
                    label: 'Open',
                    n: findings.filter((f) => isFindingOpen(f)).length,
                    tone: 'warn',
                  },
                  { label: 'Closed', n: stats.closed, tone: 'good' },
                ]}
              />
            </div>
          </motion.section>
          <motion.section initial="hidden" animate="visible" className={VIS_CARD}>
            <VisHead
              title="Standardisation record"
              sub="Meetings that keep every assessor marking to the same standard"
              onOpen={() => goTab('standardisation')}
            />
            <dl className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <dt className="text-[12px] text-white">Last meeting</dt>
                <dd
                  className={cn(
                    'mt-1 text-[18px] font-bold leading-tight text-white',
                    !stats.lastMeeting && 'text-orange-400'
                  )}
                >
                  {stats.lastMeeting ? formatDate(stats.lastMeeting) : 'None yet'}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] text-white">Last 90 days</dt>
                <dd
                  className={cn(
                    'mt-1 text-[18px] font-bold tabular-nums',
                    stats.recentMeetings === 0 ? 'text-orange-400' : 'text-white'
                  )}
                >
                  {stats.recentMeetings}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] text-white">Actions agreed</dt>
                <dd className="mt-1 text-[18px] font-bold tabular-nums text-white">
                  {stats.meetingActions}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setAddMeetingOpen(true)}
              className={cn(COLLEGE_BTN, 'mt-5 w-full sm:w-auto')}
            >
              Record a meeting
            </button>
          </motion.section>
        </div>

        {/* Assessor drift — collapsible alert panel that surfaces assessors
            whose IQA agreement % has slipped. Renders nothing when no plans
            exist, or a small "all clear" pill when everyone is green. */}
        <AssessorDriftPanel />

        <section id="iqa-work" className="scroll-mt-20 space-y-4">
          <CollegeSectionTitle
            title={
              activeTab === 'sampling'
                ? 'Sampling plans'
                : activeTab === 'findings'
                  ? 'Findings and actions'
                  : activeTab === 'standardisation'
                    ? 'Standardisation meetings'
                    : 'Coverage'
            }
            sub={
              activeTab === 'sampling'
                ? 'Open a plan to add samples and give verdicts'
                : activeTab === 'findings'
                  ? 'Close each one with a note when it is resolved'
                  : activeTab === 'standardisation'
                    ? 'Topics, attendees, decisions and actions'
                    : 'Which units and assessors have been sampled'
            }
          />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
              {(
                [
                  { value: 'sampling', label: 'Sampling', count: plans.length },
                  { value: 'findings', label: 'Findings', count: findings.length },
                  { value: 'standardisation', label: 'Standardisation', count: meetings.length },
                  { value: 'coverage', label: 'Coverage' },
                ] as Array<{ value: Tab; label: string; count?: number }>
              ).map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setActiveTab(t.value)}
                  className={chipCn(activeTab === t.value)}
                >
                  {t.label}
                  {t.count !== undefined && <span className="ml-1.5 tabular-nums">{t.count}</span>}
                </button>
              ))}
            </div>
            {activeTab !== 'coverage' && (
              <label className="relative block w-full lg:w-80">
                <Search
                  className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                  aria-hidden
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    activeTab === 'sampling'
                      ? 'Search qualification, unit, IQA'
                      : activeTab === 'findings'
                        ? 'Search description, assessor'
                        : 'Search topic, outcome'
                  }
                  aria-label="Search"
                  className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base text-white placeholder:text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
              </label>
            )}
          </div>

          {activeTab === 'sampling' ? (
            <SamplingTab
              plans={plans}
              loading={plansLoading}
              search={search}
              onAdd={canIqa ? () => setAddPlanOpen(true) : undefined}
              onOpen={(id) => navigate(`/college/iqa/sampling/${id}`)}
            />
          ) : activeTab === 'findings' ? (
            <FindingsTab
              findings={findings}
              loading={findingsLoading}
              search={search}
              onAdd={canIqa ? () => setAddFindingOpen(true) : undefined}
              onClose={(f) => {
                setCloseNote('');
                setClosingFinding(f);
              }}
              onDelete={async (f) => {
                const ok = window.confirm(`Delete this finding? Logged in audit trail.`);
                if (!ok) return;
                try {
                  await removeFinding(f.id);
                  toast({ title: 'Finding removed' });
                } catch (e) {
                  toast({
                    title: 'Delete failed',
                    description: (e as Error).message,
                    variant: 'destructive',
                  });
                }
              }}
            />
          ) : activeTab === 'standardisation' ? (
            <StandardisationTab
              meetings={meetings}
              loading={meetingsLoading}
              search={search}
              onAdd={() => setAddMeetingOpen(true)}
              onDelete={async (m) => {
                const ok = window.confirm(`Delete meeting "${m.topic}"? Logged in audit trail.`);
                if (!ok) return;
                try {
                  await removeMeeting(m.id);
                  toast({ title: 'Meeting removed' });
                } catch (e) {
                  toast({
                    title: 'Delete failed',
                    description: (e as Error).message,
                    variant: 'destructive',
                  });
                }
              }}
            />
          ) : (
            <div className={COLLEGE_CARD}>
              <CoverageMatrixTab />
            </div>
          )}
        </section>

        <AddIqaSamplingPlanDialog open={addPlanOpen} onOpenChange={setAddPlanOpen} />
        <AddIqaFindingDialog open={addFindingOpen} onOpenChange={setAddFindingOpen} />
        <AddStandardisationMeetingDialog open={addMeetingOpen} onOpenChange={setAddMeetingOpen} />

        {/* Close-finding sheet — in-app resolution note (replaces window.prompt). */}
        <FormSheet
          open={!!closingFinding}
          onOpenChange={(open) => {
            if (!open && !closeSaving) {
              setClosingFinding(null);
              setCloseNote('');
            }
          }}
          width="wide"
          eyebrow="IQA · Findings"
          title="Close finding"
          description={
            closingFinding
              ? `Recorded on the audit trail. About ${closingFinding.assessor_name}.`
              : undefined
          }
          footer={
            <div className="flex gap-2">
              <button
                type="button"
                className={cn(COLLEGE_BTN, 'flex-1')}
                onClick={() => {
                  setClosingFinding(null);
                  setCloseNote('');
                }}
                disabled={closeSaving}
              >
                Cancel
              </button>
              <button
                type="button"
                className={cn(COLLEGE_BTN_PRIMARY, 'flex-1')}
                onClick={confirmCloseFinding}
                disabled={closeSaving}
              >
                {closeSaving ? 'Closing…' : 'Close finding'}
              </button>
            </div>
          }
        >
          <div className="grid gap-6 pt-2 lg:grid-cols-2">
            {closingFinding && (
              <div>
                <p className="text-[12px] font-medium text-white">The finding</p>
                <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">
                  {closingFinding.description}
                </p>
                {closingFinding.action_plan && (
                  <p className="mt-3 text-[13px] leading-relaxed text-white">
                    <span className="font-semibold">Action: </span>
                    {closingFinding.action_plan}
                  </p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="close-note" className="block text-[12px] font-medium text-white">
                Resolution notes (optional)
              </label>
              <textarea
                id="close-note"
                value={closeNote}
                onChange={(e) => setCloseNote(e.target.value)}
                rows={5}
                autoFocus
                placeholder="How was this finding resolved? Recorded on the audit trail."
                className={cn(textareaClass, 'mt-1 min-h-[120px] text-base')}
              />
            </div>
          </div>
        </FormSheet>
      </HubBody>
    </HubPage>
  );
}

/* ──────────────────────────────────────────────────────── */

function SamplingTab({
  plans,
  loading,
  search,
  onAdd,
  onOpen,
}: {
  plans: IqaSamplingPlan[];
  loading: boolean;
  search: string;
  onAdd?: () => void;
  onOpen: (id: string) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return plans;
    return plans.filter(
      (p) =>
        (p.qualification_code ?? '').toLowerCase().includes(q) ||
        (p.unit_code ?? '').toLowerCase().includes(q) ||
        (p.iqa_name_snapshot ?? '').toLowerCase().includes(q) ||
        (p.notes ?? '').toLowerCase().includes(q)
    );
  }, [plans, search]);

  if (loading && plans.length === 0) return <Skeleton />;
  if (plans.length === 0) {
    return (
      <CollegeEmpty
        title="No sampling plans yet"
        body="A sampling plan sets the IQA target % for an assessor's work over a period. Awarding bodies usually expect 10–20% routine sampling."
        action={
          onAdd ? (
            <button type="button" onClick={onAdd} className={COLLEGE_BTN_PRIMARY}>
              New plan
            </button>
          ) : undefined
        }
      />
    );
  }
  if (filtered.length === 0) {
    return <CollegeEmpty title="Nothing matches" body={`No plans match "${search}".`} />;
  }
  return (
    <div className={COLLEGE_LIST}>
      {filtered.map((p) => (
        <SamplingPlanRow key={p.id} plan={p} onOpen={() => onOpen(p.id)} />
      ))}
    </div>
  );
}

function SamplingPlanRow({ plan, onOpen }: { plan: IqaSamplingPlan; onOpen: () => void }) {
  const target = plan.target_sample_percent ?? 0;
  const sampled = plan.sampled_count ?? 0;
  // Never more than 100%: the stored total can lag the samples taken.
  const total = Math.max(plan.total_assessments ?? 0, sampled);
  const sampledPct = total > 0 ? Math.round((sampled / total) * 100) : 0;
  const onTrack = sampledPct >= target;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ended = new Date(plan.period_end) < today;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left px-5 sm:px-6 py-4 hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors touch-manipulation"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {ended ? (
              <StatusPill tone="neutral">Period ended</StatusPill>
            ) : (
              <StatusPill tone={onTrack ? 'good' : 'warn'}>
                {onTrack ? 'On track' : 'Catching up'}
              </StatusPill>
            )}
            <span className="text-[12px] tabular-nums text-white">Target {target}%</span>
          </div>
          <div className="mt-1 text-[14px] font-medium text-white group-hover:underline underline-offset-2">
            {plan.qualification_code ?? 'All qualifications'}
            {plan.unit_code && <span className="text-white"> · {plan.unit_code}</span>}
          </div>
          <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[12px] text-white tabular-nums">
            <span>{formatDate(plan.period_start)}</span>
            <span className="text-white">→</span>
            <span>{formatDate(plan.period_end)}</span>
            {plan.iqa_name_snapshot && (
              <>
                <span className="text-white">·</span>
                <span>IQA: {plan.iqa_name_snapshot}</span>
              </>
            )}
          </div>
          {plan.notes && (
            <p className="mt-2 text-[12.5px] text-white leading-snug line-clamp-2">{plan.notes}</p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[18px] font-semibold tabular-nums text-white">
            {sampled}
            <span className="text-white text-[12px]"> / {total}</span>
          </div>
          <div className="mt-0.5 text-[12px] text-white tabular-nums">{sampledPct}% sampled</div>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all', onTrack ? 'bg-emerald-400' : 'bg-amber-400')}
          style={{ width: `${Math.min(100, sampledPct)}%` }}
        />
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────────────── */

function FindingsTab({
  findings,
  loading,
  search,
  onAdd,
  onClose,
  onDelete,
}: {
  findings: IqaFinding[];
  loading: boolean;
  search: string;
  onAdd?: () => void;
  onClose: (f: IqaFinding) => void;
  onDelete: (f: IqaFinding) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return findings;
    return findings.filter(
      (f) =>
        f.description.toLowerCase().includes(q) ||
        f.assessor_name.toLowerCase().includes(q) ||
        (f.iqa_name_snapshot ?? '').toLowerCase().includes(q)
    );
  }, [findings, search]);

  if (loading && findings.length === 0) return <Skeleton />;
  if (findings.length === 0) {
    return (
      <CollegeEmpty
        title="No findings logged yet"
        body="Findings are how IQAs document commendations, observations, actions or concerns. They form the audit trail for awarding-body EQA visits."
        action={
          onAdd ? (
            <button type="button" onClick={onAdd} className={COLLEGE_BTN_PRIMARY}>
              Log finding
            </button>
          ) : undefined
        }
      />
    );
  }
  if (filtered.length === 0) {
    return <CollegeEmpty title="Nothing matches" body={`No findings match "${search}".`} />;
  }
  return (
    <div className={COLLEGE_LIST}>
      {filtered.map((f) => (
        <FindingRow
          key={f.id}
          finding={f}
          onClose={() => onClose(f)}
          onDelete={() => onDelete(f)}
          canAct={!!onAdd}
        />
      ))}
    </div>
  );
}

function FindingRow({
  finding,
  onClose,
  onDelete,
  canAct,
}: {
  finding: IqaFinding;
  onClose: () => void;
  onDelete: () => void;
  /** May close or delete (college_can iqa.sample). */
  canAct?: boolean;
}) {
  const tone = statusTone('iqaFinding', finding.finding_type);
  const statusToneValue = FINDING_STATUS_TONE[finding.status];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = isFindingOpen(finding) && finding.due_date && new Date(finding.due_date) < today;

  return (
    <div className="px-5 sm:px-6 py-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill tone={qTone(tone)}>
              {FINDING_TYPE_LABEL[finding.finding_type] ?? finding.finding_type}
            </StatusPill>
            <StatusPill tone={qTone(statusToneValue)} className="capitalize">
              {finding.status.replace(/_/g, ' ')}
            </StatusPill>
            {finding.severity && (
              <span
                className={cn(
                  'inline-flex items-center h-5 px-1.5 rounded-md border text-[11px] font-semibold tracking-[0.06em] uppercase',
                  finding.severity === 'critical'
                    ? 'bg-red-500/[0.08] border-red-500/30 text-white'
                    : 'bg-amber-500/[0.08] border-amber-500/30 text-white'
                )}
              >
                {finding.severity}
              </span>
            )}
            {overdue && (
              <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-red-500/[0.08] border border-red-500/30 text-[11px] font-semibold tracking-[0.06em] uppercase text-white">
                Overdue
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[13px] text-white leading-relaxed line-clamp-3">
            {finding.description}
          </p>
          <div className="mt-1.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[12px] text-white tabular-nums">
            <span>About {finding.assessor_name}</span>
            {finding.iqa_name_snapshot && (
              <>
                <span className="text-white">·</span>
                <span>IQA: {finding.iqa_name_snapshot}</span>
              </>
            )}
            <span className="text-white">·</span>
            <span>{formatDate(finding.created_at)}</span>
            {finding.due_date && (
              <>
                <span className="text-white">·</span>
                <span className={overdue ? 'text-orange-400' : ''}>
                  Due {formatDate(finding.due_date)}
                </span>
              </>
            )}
          </div>
          {finding.action_plan && (
            <div className="mt-2 pl-3 border-l-2 border-elec-yellow/40 text-[12.5px] text-white leading-snug">
              <span className="text-white font-medium">Action: </span>
              {finding.action_plan}
            </div>
          )}
          {finding.resolution_notes && !isFindingOpen(finding) && (
            <div className="mt-2 pl-3 border-l-2 border-emerald-500/40 text-[12.5px] text-white leading-snug">
              <span className="font-medium">Resolved: </span>
              {finding.resolution_notes}
              {finding.closed_at && (
                <span className="text-white"> · {formatDate(finding.closed_at)}</span>
              )}
            </div>
          )}
        </div>
      </div>
      {canAct ? (
      <div className="mt-3 flex items-center justify-end gap-2 flex-wrap">
        {isFindingOpen(finding) && (
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-4 rounded-xl border border-emerald-400/50 text-[12.5px] font-semibold text-white hover:bg-emerald-500/[0.12] transition-colors touch-manipulation"
          >
            Close finding
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="h-11 px-4 rounded-xl text-[12.5px] font-semibold text-white hover:bg-red-500/[0.10] transition-colors touch-manipulation"
        >
          Delete
        </button>
      </div>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function StandardisationTab({
  meetings,
  loading,
  search,
  onAdd,
  onDelete,
}: {
  meetings: StandardisationMeeting[];
  loading: boolean;
  search: string;
  onAdd: () => void;
  onDelete: (m: StandardisationMeeting) => void;
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return meetings;
    return meetings.filter(
      (m) =>
        m.topic.toLowerCase().includes(q) ||
        (m.outcome ?? '').toLowerCase().includes(q) ||
        (m.decisions ?? '').toLowerCase().includes(q)
    );
  }, [meetings, search]);

  if (loading && meetings.length === 0) return <Skeleton />;
  if (meetings.length === 0) {
    return (
      <CollegeEmpty
        title="No standardisation meetings yet"
        body="Awarding bodies expect regular standardisation meetings as evidence of consistent assessment. Log them here with attendees, decisions and action items."
        action={
          <button type="button" onClick={onAdd} className={COLLEGE_BTN_PRIMARY}>
            New meeting
          </button>
        }
      />
    );
  }
  if (filtered.length === 0) {
    return <CollegeEmpty title="Nothing matches" body={`No meetings match "${search}".`} />;
  }
  return (
    <div className={COLLEGE_LIST}>
      {filtered.map((m) => (
        <MeetingRow key={m.id} meeting={m} onDelete={() => onDelete(m)} />
      ))}
    </div>
  );
}

function MeetingRow({
  meeting,
  onDelete,
}: {
  meeting: StandardisationMeeting;
  onDelete: () => void;
}) {
  const upcomingActions = (meeting.action_items ?? []).slice(0, 3);
  const overflow = Math.max(0, (meeting.action_items?.length ?? 0) - 3);
  const days = daysUntil(meeting.date);
  return (
    <div className="px-5 sm:px-6 py-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill tone="info">Standardisation</StatusPill>
            <span className="text-[12px] text-white tabular-nums">
              {formatDate(meeting.date)}
              {days !== null && (
                <>
                  <span className="text-white"> · </span>
                  {/* daysUntil is positive for a meeting still to come. */}
                  <span>{days > 0 ? `in ${days}d` : days === 0 ? 'today' : `${-days}d ago`}</span>
                </>
              )}
            </span>
          </div>
          <div className="mt-1 text-[14px] font-medium text-white">{meeting.topic}</div>
          <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[12px] text-white tabular-nums">
            <span>{meeting.attendees_count ?? meeting.attendee_ids.length} attendees</span>
            {meeting.minutes_url && (
              <>
                <span className="text-white">·</span>
                <a
                  href={meeting.minutes_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-elec-yellow underline-offset-2 hover:underline"
                >
                  Minutes →
                </a>
              </>
            )}
          </div>
          {meeting.outcome && (
            <p className="mt-1.5 text-[12px] text-white leading-relaxed">{meeting.outcome}</p>
          )}
          {meeting.decisions && (
            <p className="mt-1.5 text-[12.5px] text-white leading-relaxed line-clamp-2">
              <span className="text-white font-medium">Decisions: </span>
              {meeting.decisions}
            </p>
          )}
          {upcomingActions.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {upcomingActions.map((a, i) => (
                <div key={i} className="text-[12.5px] text-white pl-3 relative leading-snug">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[7px] inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow"
                  />
                  {a}
                </div>
              ))}
              {overflow > 0 && (
                <div className="text-[12px] text-white pl-3 tabular-nums">
                  +{overflow} more action{overflow === 1 ? '' : 's'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onDelete}
          className="h-11 px-4 rounded-xl text-[12.5px] font-semibold text-white hover:bg-red-500/[0.10] transition-colors touch-manipulation"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className={cn(COLLEGE_LIST, 'animate-pulse')}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="px-5 sm:px-6 py-4 space-y-2">
          <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
          <div className="h-2 w-1/2 bg-white/[0.04] rounded" />
          <div className="h-2 w-2/3 bg-white/[0.04] rounded" />
        </div>
      ))}
    </div>
  );
}

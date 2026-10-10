/**
 * IQAWorkflowSection — Internal Quality Assurance workflow management.
 * Sampling plan, findings & actions, standardisation meetings, EQA preparation.
 *
 * All state is persisted via `useIqaWorkflow` (Supabase + realtime). Local
 * useState is reserved for UI surface (which sheet is open, which filter is
 * active, draft form fields).
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead,
 * so this is content only: an alert line pointing at the IQA dashboard →
 * a header sentence carrying sampling, findings and the EQA date (8 Oct
 * 2026: replaced four KPI tiles) → sampling → findings (Add finding is the
 * one solid volt control) → standardisation → EQA preparation.
 *
 * The sampling figures are now REAL. This section used to "sample" by
 * multiplying every assessor's grade count by the college's target
 * percentage and reporting the result as sampled — so the KPI read 10%
 * whether or not anyone had sampled anything. It now reads the plans in
 * `college_iqa_sampling` (the table the IQA dashboard writes; `assessor_id`
 * is `college_staff.id`) and shows what has actually been sampled against
 * each plan's target. An assessor with no plan says so.
 */

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { JoinedToggle } from '@/components/college/assessment/AssessmentTabs';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import {
  useIqaWorkflow,
  type FindingType,
  type IqaFinding,
  type IqaMeeting,
  type EqaChecklistItem,
} from '@/hooks/college/useIqaWorkflow';
import {
  Field,
  inputClass,
  textareaClass,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn } from '@/components/forms/fieldStyles';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_LINK,
  CollegeEmpty,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import {
  QBTN as COLLEGE_BTN,
  QBTN_PRIMARY as COLLEGE_BTN_PRIMARY,
  QCARD as COLLEGE_CARD,
  QLIST as COLLEGE_LIST,
  QROW as COLLEGE_ROW,
  QualityHeader,
} from '@/components/college/quality/QualityHubKit';
import { joinAnd, plural } from '@/components/college/quality/qualityText';
import { BarList, SegmentBar, StatusPill } from '@/components/college/quality/QualityKit';
import { uniqueLabels } from '@/components/college/quality/IqaVisuals';

const HELP: PageHelpContent = {
  id: 'college-iqa-workflow',
  title: 'IQA workflow',
  what: "A one-page view of internal quality assurance: how much of each assessor's work has been sampled, the findings and actions that came out of it, standardisation meetings, and readiness for the next external quality assurance (EQA) visit.",
  steps: [
    {
      title: 'Check sampling',
      body: 'Each bar is one assessor: how much of their work has been sampled against the target. Orange means behind. Set plans and give verdicts on the IQA dashboard.',
    },
    {
      title: 'Log findings and close them',
      body: 'Add a finding for good practice, something to improve, or an action required. Tap it to close it when it is resolved.',
    },
    {
      title: 'Record standardisation',
      body: 'Log each standardisation meeting with the number who attended and what was agreed.',
    },
    {
      title: 'Get ready for the EQA',
      body: 'Set the visit date and tick off the evidence checklist as each item is ready.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'On target or closed' },
    { swatch: 'bg-orange-400', label: 'Behind target or open' },
    { swatch: 'bg-red-500', label: 'Action required' },
  ],
};

interface IQAWorkflowSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

interface SamplingPlanRow {
  assessor_id: string;
  sampled_count: number | null;
  total_assessments: number | null;
  target_sample_percent: number | null;
  period_end: string | null;
}

const LIST_CARD =
  '-mx-4 overflow-hidden border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x';

function fmtDate(iso: string, long = false): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: long ? 'long' : 'short',
    year: long ? 'numeric' : undefined,
  });
}

/* ────────────────────────────────────────────────────────
   Main section
   ──────────────────────────────────────────────────────── */

export function IQAWorkflowSection({ onNavigate: _onNavigate }: IQAWorkflowSectionProps) {
  void _onNavigate;
  const navigate = useNavigate();
  const { staff } = useCollegeSupabase();
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? null;

  const {
    findings,
    meetings,
    checklist,
    nextEqaVisit,
    loading,
    error,
    canWrite,
    addFinding,
    closeFinding,
    reopenFinding,
    addMeeting,
    toggleChecklistItem,
    seedDefaultChecklist,
    setNextEqaVisit,
    refetch,
  } = useIqaWorkflow(collegeId);

  const { settings } = useCollegeSettings();
  const samplingTargetPercent = settings.iqa_sampling_target_percent;

  // `CollegeStaff.role` (collegeStaffService.ts) is typed
  // 'tutor' | 'head_of_department' | 'support' | 'admin' — no 'assessor' —
  // so the old `s.role === 'assessor'` never typed. Compare as strings.
  const assessors = useMemo(
    () =>
      staff.filter((s) => {
        const role = String(s.role ?? '').toLowerCase();
        return role === 'assessor' || role === 'tutor';
      }),
    [staff]
  );

  // Real sampling plans — the same rows the IQA dashboard maintains.
  const plansQuery = useQuery({
    queryKey: ['iqa-workflow', 'sampling-plans', collegeId],
    enabled: !!collegeId,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error: qErr } = await supabase
        .from('college_iqa_sampling')
        .select('assessor_id, sampled_count, total_assessments, target_sample_percent, period_end')
        .eq('college_id', collegeId!)
        .order('period_end', { ascending: false, nullsFirst: false });
      if (qErr) throw qErr;
      return (data ?? []) as SamplingPlanRow[];
    },
  });

  // Latest plan per assessor (the query is ordered newest period first).
  const planByAssessor = useMemo(() => {
    const m = new Map<string, SamplingPlanRow>();
    for (const p of plansQuery.data ?? []) {
      if (!m.has(p.assessor_id)) m.set(p.assessor_id, p);
    }
    return m;
  }, [plansQuery.data]);

  const assessorSampling = assessors.map((assessor) => {
    const plan = planByAssessor.get(assessor.id);
    const sampled = plan?.sampled_count ?? 0;
    // Never more than 100%: the stored total can lag the samples taken.
    const total = Math.max(plan?.total_assessments ?? 0, sampled);
    const target = plan?.target_sample_percent ?? samplingTargetPercent;
    const percent = total > 0 ? Math.round((sampled / total) * 100) : null;
    return {
      id: assessor.id,
      name: assessor.name,
      hasPlan: !!plan,
      total,
      sampled,
      target,
      percent,
      onTarget: percent !== null && percent >= target,
    };
  });

  const sampledTotal = Array.from(planByAssessor.values()).reduce(
    (acc, p) => {
      acc.sampled += p.sampled_count ?? 0;
      acc.total += Math.max(p.total_assessments ?? 0, p.sampled_count ?? 0);
      return acc;
    },
    { sampled: 0, total: 0 }
  );
  const samplingRate =
    sampledTotal.total > 0 ? Math.round((sampledTotal.sampled / sampledTotal.total) * 100) : null;
  const belowTarget = assessorSampling.filter((a) => a.hasPlan && !a.onTarget).length;
  const withoutPlan = assessorSampling.filter((a) => !a.hasPlan).length;

  // UI surface state — purely local
  const [findingFilter, setFindingFilter] = useState<'All' | 'Open' | 'Closed'>('All');
  const [showAddFinding, setShowAddFinding] = useState(false);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [editingEQADate, setEditingEQADate] = useState(false);
  const [draftEqaDate, setDraftEqaDate] = useState<string>('');

  // Draft form state
  const [newFinding, setNewFinding] = useState({
    assessor_name: '',
    finding_type: 'Area for Improvement' as FindingType,
    description: '',
    area: '',
  });
  const [newMeeting, setNewMeeting] = useState({
    topic: '',
    attendees_count: 0,
    outcome: '',
  });

  const openActions = findings.filter(
    (f: IqaFinding) => f.status === 'Open' || f.status === 'In Progress'
  ).length;
  const actionRequired = findings.filter(
    (f: IqaFinding) => f.status !== 'Closed' && f.finding_type === 'Action Required'
  ).length;

  const filteredFindings = findings.filter((f: IqaFinding) => {
    if (findingFilter === 'All') return true;
    if (findingFilter === 'Open') return f.status === 'Open' || f.status === 'In Progress';
    return f.status === 'Closed';
  });

  const checkedCount = checklist.filter((c: EqaChecklistItem) => c.status === 'complete').length;

  const handleAddFinding = async () => {
    if (!newFinding.description.trim() || !canWrite) return;
    await addFinding({
      finding_type: newFinding.finding_type,
      description: newFinding.description,
      assessor_name: newFinding.assessor_name || 'Unspecified',
      area: newFinding.area || null,
    });
    setNewFinding({
      assessor_name: '',
      finding_type: 'Area for Improvement',
      description: '',
      area: '',
    });
    setShowAddFinding(false);
  };

  const handleToggleFindingStatus = async (finding: IqaFinding) => {
    if (!canWrite) return;
    if (finding.status === 'Closed') {
      await reopenFinding(finding.id);
    } else {
      await closeFinding(finding.id);
    }
  };

  const handleAddMeeting = async () => {
    if (!newMeeting.topic.trim() || !canWrite) return;
    await addMeeting({
      topic: newMeeting.topic,
      attendees_count: newMeeting.attendees_count,
      outcome: newMeeting.outcome || null,
      scheduled_at: new Date().toISOString(),
    });
    setNewMeeting({ topic: '', attendees_count: 0, outcome: '' });
    setShowAddMeeting(false);
  };

  const handleSaveEqaDate = async () => {
    if (!canWrite) return;
    await setNextEqaVisit(draftEqaDate || null);
    setEditingEQADate(false);
  };

  const startEditingEqaDate = () => {
    setDraftEqaDate(nextEqaVisit ?? '');
    setEditingEQADate(true);
  };

  const handleSeedChecklist = async () => {
    if (!canWrite) return;
    await seedDefaultChecklist();
  };

  /* ── Render ───────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  const statusCount = (s: string) => findings.filter((f: IqaFinding) => f.status === s).length;
  const eqaDays = nextEqaVisit
    ? Math.round(
        (new Date(nextEqaVisit).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 86_400_000
      )
    : null;
  const checklistPct =
    checklist.length > 0 ? Math.round((checkedCount / checklist.length) * 100) : null;

  /* The sentence under the title: sampling, findings and the EQA, in words. */
  const withPlan = assessorSampling.filter((a) => a.hasPlan);
  const onTargetCount = withPlan.filter((a) => a.onTarget).length;
  const summary =
    assessors.length === 0
      ? 'No assessors yet. Add staff with the assessor or tutor role to start sampling.'
      : `${withPlan.length === 0 ? 'No assessor has a sampling plan yet' : `${onTargetCount} of ${plural(withPlan.length, 'assessor')} with a plan sampled to target`}${
          withoutPlan > 0 ? `, ${withoutPlan} without a plan` : ''
        }. ${
          openActions === 0
            ? findings.length > 0
              ? 'Every finding is closed.'
              : 'No findings recorded.'
            : `${plural(openActions, 'finding')} open${actionRequired > 0 ? `, ${actionRequired} needing action` : ''}.`
        }`;
  const summarySub =
    joinAnd([
      nextEqaVisit
        ? eqaDays !== null && eqaDays < 0
          ? `The EQA visit date (${fmtDate(nextEqaVisit, true)}) has passed; set the next one`
          : `Next EQA visit ${fmtDate(nextEqaVisit, true)}${eqaDays !== null ? `, in ${plural(eqaDays, 'day')}` : ''}`
        : 'No EQA visit date set',
      checklist.length > 0 ? `${checkedCount} of ${checklist.length} evidence items ready` : '',
      meetings.length === 0 ? 'no standardisation meetings recorded' : '',
    ]) + '.';

  return (
    <div className="space-y-8 sm:space-y-10">
      <QualityHeader
        eyebrow="Quality and compliance"
        title="IQA workflow"
        summary={summary}
        sub={summarySub}
        help={HELP}
        actions={
          <button type="button" onClick={() => navigate('/college/iqa')} className={COLLEGE_BTN}>
            Open the IQA dashboard
          </button>
        }
        primary={
          canWrite ? (
            <button
              type="button"
              onClick={() => setShowAddFinding(true)}
              className={COLLEGE_BTN_PRIMARY}
            >
              Add finding
            </button>
          ) : undefined
        }
      />

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-orange-400/50 px-4 py-3">
          <div className="text-[13px] text-white">
            <span className="font-semibold">Could not load IQA workflow.</span> {error}
          </div>
          <button
            type="button"
            onClick={() => void refetch()}
            className="-mr-2 flex h-11 shrink-0 items-center px-2 text-[12.5px] font-bold text-elec-yellow touch-manipulation"
          >
            Retry
          </button>
        </div>
      )}

      {!canWrite && (
        <div className={cn(COLLEGE_CARD, 'py-4 sm:py-4')}>
          <p className="text-[13px] leading-snug text-white">
            You have read access to this college's IQA records. Ask your quality nominee or an
            administrator if you need to add findings or meetings.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-5">
        {/* Sampling plan */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          <CollegeSectionTitle
            title="Sampling by assessor"
            sub={
              withoutPlan > 0
                ? `${withoutPlan} without a plan`
                : belowTarget > 0
                  ? `${belowTarget} below target`
                  : `Target ${samplingTargetPercent}% of each assessor's decisions`
            }
            action={
              <button
                type="button"
                onClick={() => navigate('/college/iqa')}
                className={COLLEGE_LINK}
              >
                Plans
              </button>
            }
          />
          <motion.div variants={itemVariants} className={cn(COLLEGE_CARD, 'flex-1')}>
            {assessors.length === 0 ? (
              <p className="text-[13px] leading-snug text-white">
                No assessors yet. Add staff with the assessor or tutor role to start sampling.
              </p>
            ) : (
              <BarList
                max={100}
                suffix="%"
                wideLabels
                rows={assessorSampling.map((a, i, all) => ({
                  label: uniqueLabels(all.map((x) => x.name))[i],
                  sub: a.hasPlan
                    ? `${a.sampled} of ${a.total} sampled · target ${a.target}% · ${a.onTarget ? 'on target' : 'below target'}`
                    : 'No sampling plan yet',
                  n: a.percent ?? 0,
                  tone: !a.hasPlan ? 'neutral' : a.onTarget ? 'good' : 'warn',
                  onClick: () => navigate('/college/iqa'),
                }))}
              />
            )}
          </motion.div>
        </motion.section>

        {/* Findings by status */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          <CollegeSectionTitle
            title="Findings by status"
            sub={
              actionRequired > 0
                ? `${actionRequired} action required`
                : openActions > 0
                  ? `${openActions} open`
                  : findings.length > 0
                    ? 'All closed'
                    : 'None yet'
            }
          />
          <motion.div variants={itemVariants} className={cn(COLLEGE_CARD, 'flex-1')}>
            <SegmentBar
              emptyText="No findings yet"
              segments={[
                {
                  label: 'Open',
                  n: statusCount('Open'),
                  tone: 'warn',
                  onClick: () => setFindingFilter('Open'),
                },
                {
                  label: 'In progress',
                  n: statusCount('In Progress'),
                  tone: 'info',
                  onClick: () => setFindingFilter('Open'),
                },
                {
                  label: 'Closed',
                  n: statusCount('Closed'),
                  tone: 'good',
                  onClick: () => setFindingFilter('Closed'),
                },
              ]}
            />
            <div className="mt-5 border-t border-white/[0.06] pt-4">
              <p className="text-[12.5px] font-semibold text-white">By type</p>
              <div className="mt-3">
                <BarList
                  rows={[
                    {
                      label: 'Good practice',
                      n: findings.filter((f: IqaFinding) => f.finding_type === 'Good Practice')
                        .length,
                      tone: 'good',
                    },
                    {
                      label: 'For improvement',
                      n: findings.filter(
                        (f: IqaFinding) => f.finding_type === 'Area for Improvement'
                      ).length,
                      tone: 'warn',
                    },
                    {
                      label: 'Action required',
                      n: findings.filter((f: IqaFinding) => f.finding_type === 'Action Required')
                        .length,
                      tone: 'bad',
                    },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Findings & actions */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <CollegeSectionTitle
          id="iqa-findings"
          title="Findings and actions"
          sub={
            canWrite
              ? 'Tap a finding to close it, or to reopen a closed one'
              : 'Decisions, actions and standardisation outcomes'
          }
        />
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <JoinedToggle
            ariaLabel="Which findings to show"
            value={findingFilter}
            onChange={setFindingFilter}
            items={(['All', 'Open', 'Closed'] as const).map((pill) => ({
              key: pill,
              label: pill,
              count: pill === 'Open' && openActions > 0 ? openActions : null,
            }))}
          />
          {canWrite && (
            <button
              type="button"
              onClick={() => setShowAddFinding(true)}
              className={cn(COLLEGE_BTN, 'w-full sm:w-auto')}
            >
              Add finding
            </button>
          )}
        </motion.div>

        {filteredFindings.length === 0 ? (
          <CollegeEmpty
            title={findingFilter === 'Closed' ? 'No closed findings yet' : 'No findings yet'}
            body={
              findingFilter === 'Closed'
                ? 'Findings show here once they are closed.'
                : 'Findings record the decisions, actions and standardisation outcomes an auditor expects to see. Add one after each sample or meeting.'
            }
          />
        ) : (
          <motion.ul
            variants={itemVariants}
            className={cn(COLLEGE_LIST, 'lg:grid lg:grid-cols-2 lg:divide-y-0')}
          >
            {filteredFindings.map((finding: IqaFinding) => {
              const closed = finding.status === 'Closed';
              const red = !closed && finding.finding_type === 'Action Required';
              return (
                <li key={finding.id} className="lg:border-b lg:border-white/[0.06] lg:odd:border-r">
                  <button
                    type="button"
                    onClick={() => void handleToggleFindingStatus(finding)}
                    disabled={!canWrite}
                    title={canWrite ? (closed ? 'Reopen' : 'Mark closed') : undefined}
                    className={cn(COLLEGE_ROW, 'h-full disabled:hover:bg-transparent')}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block text-[14px] font-semibold leading-snug text-white">
                        {finding.assessor_name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-white line-clamp-2">
                        {[finding.finding_type, finding.area, finding.description]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                    <StatusPill
                      tone={
                        closed
                          ? 'good'
                          : red
                            ? 'bad'
                            : finding.status === 'In Progress'
                              ? 'info'
                              : 'warn'
                      }
                    >
                      {finding.status}
                    </StatusPill>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </motion.section>

      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-5">
        {/* Standardisation meetings */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          <CollegeSectionTitle
            title="Standardisation record"
            sub={
              meetings.length > 0
                ? `${meetings.length} meeting${meetings.length === 1 ? '' : 's'} on record`
                : 'Keeps every assessor marking to the same standard'
            }
            action={
              canWrite ? (
                <button
                  type="button"
                  onClick={() => setShowAddMeeting(true)}
                  className={COLLEGE_LINK}
                >
                  Record meeting
                </button>
              ) : undefined
            }
          />
          {meetings.length === 0 ? (
            <CollegeEmpty
              title="No standardisation meetings yet"
              body="Agendas, decisions and actions recorded here give an EQA visit a clear paper trail."
              action={
                canWrite ? (
                  <button
                    type="button"
                    onClick={() => setShowAddMeeting(true)}
                    className={COLLEGE_BTN}
                  >
                    Record meeting
                  </button>
                ) : undefined
              }
            />
          ) : (
            <motion.ul variants={itemVariants} className={cn(COLLEGE_LIST, 'flex-1')}>
              {meetings.map((meeting: IqaMeeting) => {
                const when = meeting.scheduled_at ?? meeting.date;
                return (
                  <li
                    key={meeting.id}
                    className="flex min-h-[60px] items-center gap-3 px-4 py-3 sm:px-5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block text-[14px] font-semibold leading-snug text-white">
                        {meeting.topic}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-white line-clamp-2">
                        {[
                          meeting.attendees_count != null && meeting.attendees_count > 0
                            ? `${meeting.attendees_count} attendees`
                            : null,
                          meeting.outcome,
                        ]
                          .filter(Boolean)
                          .join(' · ') || 'No outcome recorded'}
                      </span>
                    </span>
                    <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-white">
                      {when ? fmtDate(when) : '—'}
                    </span>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </motion.section>

        {/* EQA preparation */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          <CollegeSectionTitle
            title="EQA preparation"
            sub="The visit date and the evidence the external quality assurer will ask for"
            action={
              canWrite ? (
                <button
                  type="button"
                  onClick={editingEQADate ? () => void handleSaveEqaDate() : startEditingEqaDate}
                  className={COLLEGE_LINK}
                >
                  {editingEQADate ? 'Save date' : 'Edit date'}
                </button>
              ) : undefined
            }
          />
          <motion.div variants={itemVariants} className={cn(COLLEGE_LIST, 'flex-1')}>
            <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-medium text-white">Next EQA visit</div>
                {editingEQADate ? (
                  <input
                    type="date"
                    value={draftEqaDate}
                    onChange={(e) => setDraftEqaDate(e.target.value)}
                    autoFocus
                    aria-label="Next EQA visit date"
                    className={cn(inputCn, 'mt-1 max-w-xs')}
                  />
                ) : (
                  <div className="mt-1 text-[22px] font-bold tabular-nums tracking-tight text-white">
                    {nextEqaVisit ? fmtDate(nextEqaVisit, true) : 'Not set'}
                  </div>
                )}
                {!editingEQADate && eqaDays !== null && (
                  <div
                    className={cn(
                      'mt-0.5 text-[12.5px]',
                      eqaDays < 0 ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {eqaDays < 0
                      ? `${Math.abs(eqaDays)} days ago`
                      : eqaDays === 0
                        ? 'Today'
                        : `In ${eqaDays} days`}
                  </div>
                )}
              </div>
              <div className="w-28 shrink-0 text-right">
                <div className="text-[13px] font-semibold tabular-nums text-white">
                  {checklist.length === 0
                    ? 'No checklist yet'
                    : `${checkedCount} of ${checklist.length} ready`}
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      checklistPct === 100 ? 'bg-emerald-500' : 'bg-elec-yellow'
                    )}
                    style={{ width: `${checklistPct ?? 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 px-4 pt-3 sm:px-5">
                <div className="text-[12.5px] font-semibold text-white">Required evidence</div>
                {checklist.length === 0 && canWrite && (
                  <button
                    type="button"
                    onClick={() => void handleSeedChecklist()}
                    className={COLLEGE_LINK}
                  >
                    Seed default checklist
                  </button>
                )}
              </div>

              {checklist.length === 0 ? (
                <p className="px-4 pb-4 pt-2 text-[13px] leading-snug text-white sm:px-5">
                  No checklist items for this EQA cycle yet.
                  {canWrite ? ' Seed the default checklist to start.' : ''}
                </p>
              ) : (
                <ul className="pb-2 pt-1">
                  {checklist.map((item: EqaChecklistItem) => {
                    const done = item.status === 'complete';
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => void toggleChecklistItem(item.id)}
                          disabled={!canWrite}
                          className="flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left transition-colors touch-manipulation hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:hover:bg-transparent sm:px-5"
                        >
                          <span
                            className={cn(
                              'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                              done ? 'border-emerald-500 bg-emerald-500' : 'border-white/[0.3]'
                            )}
                          >
                            {done && (
                              <span className="text-[12px] font-bold leading-none text-black">
                                ✓
                              </span>
                            )}
                          </span>
                          <span className={cn('text-[13px] text-white', done && 'line-through')}>
                            {item.item_label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* ── Add finding sheet ─────────────────────── */}
      <FormSheet
        open={showAddFinding}
        onOpenChange={setShowAddFinding}
        width="wide"
        eyebrow="IQA workflow"
        title="New finding"
        description="Recorded against this college and visible to all college staff."
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'flex-1')}
              onClick={() => setShowAddFinding(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={cn(COLLEGE_BTN_PRIMARY, 'flex-1')}
              onClick={() => void handleAddFinding()}
              disabled={!newFinding.description.trim() || !canWrite}
            >
              Save finding
            </button>
          </div>
        }
      >
        <div className="grid gap-x-10 gap-y-5 pt-2 lg:grid-cols-2">
          <div className="space-y-5">
            <Field label="Assessor name">
              <input
                type="text"
                placeholder="Name of the assessor reviewed"
                value={newFinding.assessor_name}
                onChange={(e) => setNewFinding((p) => ({ ...p, assessor_name: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Area">
              <input
                type="text"
                placeholder="e.g. Portfolio assessment, OTJ verification"
                value={newFinding.area}
                onChange={(e) => setNewFinding((p) => ({ ...p, area: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Type" required>
              <div className="flex flex-wrap gap-2">
                {(
                  ['Good Practice', 'Area for Improvement', 'Action Required'] as FindingType[]
                ).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewFinding((p) => ({ ...p, finding_type: t }))}
                    className={cn(chipCn(newFinding.finding_type === t), 'h-11')}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <Field label="Description" required>
            <textarea
              placeholder="What was observed? What action is required?"
              value={newFinding.description}
              onChange={(e) => setNewFinding((p) => ({ ...p, description: e.target.value }))}
              rows={8}
              className={cn(textareaClass, 'min-h-[180px]')}
            />
          </Field>
        </div>
      </FormSheet>

      {/* ── Add meeting sheet ─────────────────────── */}
      <FormSheet
        open={showAddMeeting}
        onOpenChange={setShowAddMeeting}
        width="wide"
        eyebrow="IQA workflow"
        title="Record standardisation meeting"
        description="Captures topic, attendance and outcome for the audit trail."
        footer={
          <div className="flex gap-2">
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'flex-1')}
              onClick={() => setShowAddMeeting(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={cn(COLLEGE_BTN_PRIMARY, 'flex-1')}
              onClick={() => void handleAddMeeting()}
              disabled={!newMeeting.topic.trim() || !canWrite}
            >
              Save meeting
            </button>
          </div>
        }
      >
        <div className="grid gap-x-10 gap-y-5 pt-2 lg:grid-cols-2">
          <div className="space-y-5">
            <Field label="Topic" required>
              <input
                type="text"
                placeholder="e.g. Standardisation of grading criteria"
                value={newMeeting.topic}
                onChange={(e) => setNewMeeting((p) => ({ ...p, topic: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Number of attendees">
              <input
                type="number"
                min={0}
                placeholder="0"
                value={newMeeting.attendees_count || ''}
                onChange={(e) =>
                  setNewMeeting((p) => ({
                    ...p,
                    attendees_count: parseInt(e.target.value, 10) || 0,
                  }))
                }
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Outcome summary">
            <textarea
              placeholder="Decisions made, actions agreed, next steps…"
              value={newMeeting.outcome}
              onChange={(e) => setNewMeeting((p) => ({ ...p, outcome: e.target.value }))}
              rows={8}
              className={cn(textareaClass, 'min-h-[180px]')}
            />
          </Field>
        </div>
      </FormSheet>
    </div>
  );
}

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
 * four KPIs → sampling → findings (Add finding is the one solid volt
 * control) → standardisation → EQA preparation.
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
  fieldLabelClass,
  inputClass,
  selectTriggerClass,
  textareaClass,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { buttonPrimaryCn, chipBase, chipOff, chipOn, inputCn } from '@/components/forms/fieldStyles';
import { HubAlertLine, HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';

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
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x';

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
    const total = plan?.total_assessments ?? 0;
    const sampled = plan?.sampled_count ?? 0;
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
      acc.total += p.total_assessments ?? 0;
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

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* This view predates the IQA dashboard, which holds the sampling
          plans, findings, standardisation and the coverage matrix. */}
      <HubAlertLine
        text="Sampling plans, findings and standardisation now live on the IQA dashboard"
        action="Open"
        onClick={() => navigate('/college/iqa')}
      />

      {error && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-400/40 px-4 py-3">
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
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={cn('rounded-2xl border border-elec-yellow/35 px-4 py-3 sm:px-5', CARD_SURFACE)}
        >
          <p className="text-[12.5px] leading-snug text-white">
            You have read access to this college's IQA records. Ask your quality nominee or an
            administrator if you need to add findings or meetings.
          </p>
        </motion.div>
      )}

      <HubKpiRow>
        <HubKpi
          accent
          label="Sampled"
          value={samplingRate === null ? '—' : `${samplingRate}%`}
          verdict={
            samplingRate === null
              ? 'No sampling plan yet'
              : belowTarget > 0
                ? `${belowTarget} assessor${belowTarget === 1 ? '' : 's'} below target`
                : 'Every plan on target'
          }
          context={
            sampledTotal.total > 0
              ? `${sampledTotal.sampled} of ${sampledTotal.total} decisions`
              : undefined
          }
          sentiment={belowTarget > 0 ? 'bad' : 'neutral'}
          onClick={() => navigate('/college/iqa')}
        />
        <HubKpi
          label="Open actions"
          value={String(openActions)}
          verdict={
            actionRequired > 0
              ? `${actionRequired} marked action required`
              : openActions > 0
                ? 'Close as they are resolved'
                : 'Nothing open'
          }
          sentiment={actionRequired > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Standardisation"
          value={String(meetings.length)}
          verdict={meetings.length > 0 ? 'Meetings on record' : 'No meetings recorded'}
        />
        <HubKpi
          label="Next EQA visit"
          value={nextEqaVisit ? fmtDate(nextEqaVisit) : '—'}
          verdict={
            nextEqaVisit
              ? `${checkedCount} of ${checklist.length} evidence items ready`
              : 'Date not set'
          }
        />
      </HubKpiRow>

      {/* Sampling plan */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Sampling by assessor</HubSectionHeading>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              belowTarget + withoutPlan > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {withoutPlan > 0
              ? `${withoutPlan} without a plan`
              : belowTarget > 0
                ? `${belowTarget} below target`
                : `Target ${samplingTargetPercent}%`}
          </span>
        </motion.div>
        <motion.div variants={itemVariants} className={cn(LIST_CARD, CARD_SURFACE)}>
          {assessors.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              No assessors yet. Add staff with the assessor or tutor role to start sampling.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {assessorSampling.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      a.hasPlan && a.onTarget ? 'bg-white/[0.25]' : 'bg-elec-yellow'
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {a.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {a.hasPlan
                        ? `${a.sampled} of ${a.total} decisions sampled · target ${a.target}%`
                        : 'No sampling plan — set one up on the IQA dashboard'}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[13px] font-semibold tabular-nums',
                      a.hasPlan && a.onTarget ? 'text-white' : 'text-elec-yellow'
                    )}
                  >
                    {a.percent === null ? '—' : `${a.percent}%`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.section>

      {/* Findings & actions */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Findings and actions</HubSectionHeading>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              actionRequired > 0 ? 'text-red-300' : openActions > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {actionRequired > 0
              ? `${actionRequired} action required`
              : openActions > 0
                ? `${openActions} open`
                : findings.length > 0
                  ? 'All closed'
                  : 'None yet'}
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {(['All', 'Open', 'Closed'] as const).map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setFindingFilter(pill)}
                className={cn(
                  chipBase,
                  'px-4 text-[12.5px]',
                  findingFilter === pill ? chipOn : chipOff
                )}
              >
                {pill}
                {pill === 'Open' && openActions > 0 && (
                  <span className="ml-1.5 tabular-nums">{openActions}</span>
                )}
              </button>
            ))}
          </div>
          {canWrite && (
            <button
              type="button"
              onClick={() => setShowAddFinding(true)}
              className={cn(buttonPrimaryCn, 'w-full px-5 sm:w-auto')}
            >
              Add finding
            </button>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className={cn(LIST_CARD, CARD_SURFACE)}>
          {filteredFindings.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              {findingFilter === 'Closed'
                ? 'No closed findings yet.'
                : 'No findings yet. Findings record the decisions, actions and standardisation outcomes an auditor expects to see.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredFindings.map((finding: IqaFinding) => {
                const closed = finding.status === 'Closed';
                const red = !closed && finding.finding_type === 'Action Required';
                return (
                  <li key={finding.id}>
                    <button
                      type="button"
                      onClick={() => void handleToggleFindingStatus(finding)}
                      disabled={!canWrite}
                      title={canWrite ? (closed ? 'Reopen' : 'Mark closed') : undefined}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] disabled:hover:bg-transparent sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          closed ? 'bg-white/[0.25]' : 'bg-elec-yellow'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {finding.assessor_name}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {[finding.finding_type, finding.area, finding.description]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[12px] font-semibold',
                          closed ? 'text-white' : red ? 'text-red-300' : 'text-elec-yellow'
                        )}
                      >
                        {finding.status}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      {/* Standardisation meetings */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Standardisation meetings</HubSectionHeading>
          {canWrite && (
            <button
              type="button"
              onClick={() => setShowAddMeeting(true)}
              className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
            >
              Record meeting
            </button>
          )}
        </motion.div>
        <motion.div variants={itemVariants} className={cn(LIST_CARD, CARD_SURFACE)}>
          {meetings.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              No standardisation meetings recorded yet. Agendas, decisions and actions recorded here
              give an EQA visit a clear paper trail.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {meetings.map((meeting: IqaMeeting) => {
                const when = meeting.scheduled_at ?? meeting.date;
                return (
                  <li key={meeting.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span
                      aria-hidden="true"
                      className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {meeting.topic}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
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
                    <span className="shrink-0 text-[12px] font-semibold tabular-nums text-white">
                      {when ? fmtDate(when) : '—'}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      {/* EQA preparation */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>EQA preparation</HubSectionHeading>
          {canWrite && (
            <button
              type="button"
              onClick={editingEQADate ? () => void handleSaveEqaDate() : startEditingEqaDate}
              className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
            >
              {editingEQADate ? 'Save date' : 'Edit date'}
            </button>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className={cn(LIST_CARD, CARD_SURFACE)}>
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-5">
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-medium text-white">Next EQA visit</div>
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
                <div className="mt-1 text-[20px] font-semibold tabular-nums tracking-tight text-white">
                  {nextEqaVisit ? fmtDate(nextEqaVisit, true) : 'Not set'}
                </div>
              )}
            </div>
            <span
              className={cn(
                'shrink-0 text-[12px] font-semibold tabular-nums',
                checklist.length > 0 && checkedCount === checklist.length
                  ? 'text-white'
                  : 'text-elec-yellow'
              )}
            >
              {checkedCount}/{checklist.length} ready
            </span>
          </div>

          <div className="border-t border-white/[0.10]">
            <div className="flex items-center justify-between gap-4 px-4 pt-3 sm:px-5">
              <div className="text-[12px] font-medium text-white">Required evidence</div>
              {checklist.length === 0 && canWrite && (
                <button
                  type="button"
                  onClick={() => void handleSeedChecklist()}
                  className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
                >
                  Seed default checklist
                </button>
              )}
            </div>

            {checklist.length === 0 ? (
              <p className="px-4 pb-4 pt-2 text-[12.5px] leading-snug text-white sm:px-5">
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
                        className="flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left transition-colors touch-manipulation hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:hover:bg-transparent sm:px-5"
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                            done ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.3]'
                          )}
                        >
                          {done && (
                            <span className="text-[10px] font-bold leading-none text-black">✓</span>
                          )}
                        </span>
                        <span
                          className={cn('text-[13px] text-white', done && 'line-through opacity-60')}
                        >
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

      {/* ── Add finding bottom sheet ─────────────────────── */}
      <Sheet open={showAddFinding} onOpenChange={setShowAddFinding}>
        <SheetContent hideCloseButton side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <SheetShell
            eyebrow="IQA Workflow"
            title="New finding"
            description="Recorded against this college and visible to all college staff."
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setShowAddFinding(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={() => void handleAddFinding()}
                  disabled={!newFinding.description.trim() || !canWrite}
                >
                  Save finding →
                </PrimaryButton>
              </>
            }
          >
            <Field label="Assessor name">
              <input
                type="text"
                placeholder="Name of the assessor reviewed"
                value={newFinding.assessor_name}
                onChange={(e) =>
                  setNewFinding((p) => ({ ...p, assessor_name: e.target.value }))
                }
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
              <label htmlFor="finding-type" className={fieldLabelClass + ' sr-only'}>
                Type
              </label>
              <select
                id="finding-type"
                value={newFinding.finding_type}
                onChange={(e) =>
                  setNewFinding((p) => ({
                    ...p,
                    finding_type: e.target.value as FindingType,
                  }))
                }
                className={cn(selectTriggerClass, 'w-full')}
              >
                <option value="Good Practice">Good Practice</option>
                <option value="Area for Improvement">Area for Improvement</option>
                <option value="Action Required">Action Required</option>
              </select>
            </Field>

            <Field label="Description" required>
              <textarea
                placeholder="What was observed? What action is required?"
                value={newFinding.description}
                onChange={(e) =>
                  setNewFinding((p) => ({ ...p, description: e.target.value }))
                }
                rows={6}
                className={cn(textareaClass, 'min-h-[140px]')}
              />
            </Field>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* ── Add meeting bottom sheet ─────────────────────── */}
      <Sheet open={showAddMeeting} onOpenChange={setShowAddMeeting}>
        <SheetContent hideCloseButton side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <SheetShell
            eyebrow="IQA Workflow"
            title="Record standardisation meeting"
            description="Captures topic, attendance and outcome for the audit trail."
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setShowAddMeeting(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={() => void handleAddMeeting()}
                  disabled={!newMeeting.topic.trim() || !canWrite}
                >
                  Save meeting →
                </PrimaryButton>
              </>
            }
          >
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

            <Field label="Outcome summary">
              <textarea
                placeholder="Decisions made, actions agreed, next steps…"
                value={newMeeting.outcome}
                onChange={(e) =>
                  setNewMeeting((p) => ({ ...p, outcome: e.target.value }))
                }
                rows={6}
                className={cn(textareaClass, 'min-h-[140px]')}
              />
            </Field>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </div>
  );
}

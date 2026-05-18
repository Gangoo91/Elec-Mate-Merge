/**
 * IQAWorkflowSection — Internal Quality Assurance workflow management.
 * Sampling plan, findings & actions, standardisation meetings, EQA preparation.
 *
 * All state is persisted via `useIqaWorkflow` (Supabase + realtime). Local
 * useState is now reserved purely for UI surface (which sheet is open, which
 * filter pill is active, draft form fields).
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  ListCard,
  ListRow,
  SectionHeader,
  Pill,
  EmptyState,
  Field,
  fieldLabelClass,
  inputClass,
  selectTriggerClass,
  textareaClass,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  type Tone,
} from '@/components/college/primitives';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface IQAWorkflowSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

/* ────────────────────────────────────────────────────────
   Skeleton blocks — shown during initial fetch
   ──────────────────────────────────────────────────────── */

function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-4">
          <div className="h-10 w-1 rounded-full bg-white/[0.06] animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-white/[0.06] animate-pulse" />
            <div className="h-2.5 w-2/3 rounded bg-white/[0.04] animate-pulse" />
          </div>
          <div className="h-5 w-16 rounded-full bg-white/[0.06] animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function StatStripSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-8 lg:px-7 lg:py-9 space-y-3">
          <div className="h-2 w-16 rounded bg-white/[0.08] animate-pulse" />
          <div className="h-9 w-20 rounded bg-white/[0.06] animate-pulse" />
          <div className="h-2 w-24 rounded bg-white/[0.04] animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 flex items-center justify-between gap-4">
      <div>
        <div className="text-[13px] font-semibold text-red-300">Could not load IQA workflow</div>
        <div className="text-[12px] text-red-200/80 mt-0.5">{message}</div>
      </div>
      <button
        onClick={onRetry}
        className="text-[12px] font-medium text-elec-yellow hover:underline touch-manipulation"
      >
        Retry →
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Main section
   ──────────────────────────────────────────────────────── */

export function IQAWorkflowSection({ onNavigate: _onNavigate }: IQAWorkflowSectionProps) {
  void _onNavigate;
  const { staff, grades } = useCollegeSupabase();
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

  const assessors = useMemo(
    () => staff.filter((s) => s.role === 'assessor' || s.role === 'tutor'),
    [staff]
  );

  // KPI data — sampling target is per-college configurable (defaults 10%)
  const samplingTargetPercent = settings.iqa_sampling_target_percent;
  const samplingTargetRatio = samplingTargetPercent / 100;
  const totalAssessments = grades.length;
  const sampledCount = Math.round(totalAssessments * samplingTargetRatio);
  const samplingRate =
    totalAssessments > 0 ? Math.round((sampledCount / totalAssessments) * 100) : 0;

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

  // Sampling plan — per-assessor breakdown, target from college settings
  const assessorSampling = assessors.map((assessor) => {
    const assessorGrades = grades.filter((g) => g.assessed_by === assessor.id);
    const total = assessorGrades.length;
    const sampled = Math.round(total * samplingTargetRatio);
    const percent = total > 0 ? Math.round((sampled / total) * 100) : 0;
    return {
      id: assessor.id,
      name: assessor.name,
      totalAssessments: total,
      sampledCount: sampled,
      percentSampled: percent,
      onTarget: percent >= samplingTargetPercent,
    };
  });

  // Open / closed counts (status is the persisted value)
  const openActions = findings.filter(
    (f: IqaFinding) => f.status === 'Open' || f.status === 'In Progress'
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

  // First-load: seed the default checklist if there are none for this cycle.
  // We only attempt once the initial query has resolved (loading=false) and
  // the user has write permission.
  const handleSeedChecklist = async () => {
    if (!canWrite) return;
    await seedDefaultChecklist();
  };

  /* ── Render ───────────────────────────────────────────── */

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-10 sm:space-y-14 pb-12"
    >
      {/* Hero */}
      <motion.div variants={itemVariants}>
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Tools · IQA Workflow
          </div>
          <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
            Internal quality assurance
          </h1>
          <p className="mt-3 text-[13px] sm:text-sm text-white max-w-2xl leading-relaxed">
            Sampling plan, standardisation meetings, action tracking and external assessment
            dates.
          </p>

          {/* Deprecation notice — this view computes theoretical sampling
              from the grades table whereas the IQA Dashboard reads actual
              plans. Encourage migration. */}
          <a
            href="/college/iqa"
            className="mt-4 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-amber-500/[0.10] border border-amber-400/30 text-[11.5px] font-semibold text-amber-200 hover:bg-amber-500/[0.18] transition-colors touch-manipulation"
          >
            ⚠ This view is legacy — open the new IQA Dashboard →
          </a>
        </div>
      </motion.div>

      {/* Error banner */}
      {error && !loading && (
        <motion.div variants={itemVariants}>
          <ErrorBanner message={error} onRetry={() => void refetch()} />
        </motion.div>
      )}

      {/* Read-only banner if user can't write */}
      {!loading && !canWrite && (
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
            <div className="text-[12.5px] text-amber-200/90">
              You have read access to this college's IQA records. Contact your quality
              nominee or admin if you need to add findings or meetings.
            </div>
          </div>
        </motion.div>
      )}

      {/* KPI Strip */}
      <motion.div variants={itemVariants}>
        {loading ? (
          <StatStripSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              {
                value: `${samplingRate}%`,
                label: 'Sampling',
                sub: 'Of assessor work',
                color: 'text-blue-400',
              },
              {
                value: openActions,
                label: 'Actions',
                sub: 'Open items',
                color: openActions > 0 ? 'text-amber-400' : 'text-emerald-400',
              },
              {
                value: meetings.length,
                label: 'Std. Meetings',
                sub: 'Recorded',
                color: 'text-purple-400',
              },
              {
                value: nextEqaVisit
                  ? new Date(nextEqaVisit).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                    })
                  : 'TBC',
                label: 'Next EQA',
                sub: 'External assessment',
                color: 'text-cyan-400',
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-8 lg:px-7 lg:py-9"
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  {String(i + 1).padStart(2, '0')} · {stat.label}
                </div>
                <div
                  className={cn(
                    'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                    'text-3xl sm:text-4xl lg:text-5xl',
                    stat.color
                  )}
                >
                  {stat.value}
                </div>
                <div className="mt-3 text-[11px] text-white">{stat.sub}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Sampling Plan */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Sampling Plan"
          title={`${samplingTargetPercent}% of each assessor's decisions`}
        />
        {assessors.length === 0 ? (
          <EmptyState
            title="No assessors found"
            description="Add staff with the assessor or tutor role to start sampling."
          />
        ) : (
          <ListCard>
            {assessorSampling.map((a) => (
              <ListRow
                key={a.id}
                title={a.name}
                subtitle={`${a.sampledCount} of ${a.totalAssessments} sampled · ${a.percentSampled}%`}
                trailing={
                  <Pill tone={a.onTarget ? 'green' : 'amber'}>
                    {a.onTarget ? 'On target' : 'Below target'}
                  </Pill>
                }
              />
            ))}
          </ListCard>
        )}
      </motion.section>

      {/* Findings & Actions */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="IQA Findings"
          title="Findings & actions"
          action={canWrite ? 'Add finding' : undefined}
          onAction={canWrite ? () => setShowAddFinding(true) : undefined}
        />

        <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full w-fit">
          {(['All', 'Open', 'Closed'] as const).map((pill) => (
            <button
              key={pill}
              onClick={() => setFindingFilter(pill)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow/40',
                findingFilter === pill
                  ? 'bg-elec-yellow text-black'
                  : 'text-white hover:text-white hover:bg-white/[0.04]'
              )}
            >
              {pill}
              {pill === 'Open' && openActions > 0 && (
                <span
                  className={cn(
                    'ml-1.5 tabular-nums text-[11px]',
                    findingFilter === pill ? 'text-black/60' : 'text-white'
                  )}
                >
                  {openActions}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <ListSkeleton rows={3} />
        ) : filteredFindings.length === 0 ? (
          <EmptyState
            title="No findings yet"
            description={
              findingFilter === 'Closed'
                ? 'Closed findings will appear here once they are resolved.'
                : 'First sample triggers an IQA verdict here. Findings record the decisions, actions and standardisation outcomes that auditors expect to see.'
            }
            action={canWrite && findingFilter !== 'Closed' ? 'Add your first finding' : undefined}
            onAction={canWrite ? () => setShowAddFinding(true) : undefined}
          />
        ) : (
          <ListCard>
            {filteredFindings.map((finding: IqaFinding) => {
              const typeTone: Tone =
                finding.finding_type === 'Good Practice'
                  ? 'green'
                  : finding.finding_type === 'Area for Improvement'
                    ? 'amber'
                    : 'red';
              const subtitleParts = [
                finding.area,
                finding.description.length > 80
                  ? finding.description.substring(0, 80) + '…'
                  : finding.description,
              ].filter(Boolean);
              return (
                <ListRow
                  key={finding.id}
                  onClick={() => void handleToggleFindingStatus(finding)}
                  accent={typeTone}
                  title={finding.assessor_name}
                  subtitle={subtitleParts.join(' · ')}
                  trailing={
                    <div className="flex items-center gap-2">
                      <Pill tone={typeTone}>{finding.finding_type}</Pill>
                      <Pill
                        tone={
                          finding.status === 'Closed'
                            ? 'green'
                            : finding.status === 'In Progress'
                              ? 'cyan'
                              : 'amber'
                        }
                      >
                        {finding.status}
                      </Pill>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
        )}
      </motion.section>

      {/* Standardisation Meetings */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Standardisation"
          title="Meetings & outcomes"
          action={canWrite ? 'Record meeting' : undefined}
          onAction={canWrite ? () => setShowAddMeeting(true) : undefined}
        />

        {loading ? (
          <ListSkeleton rows={2} />
        ) : meetings.length === 0 ? (
          <EmptyState
            title="No standardisation meetings recorded yet"
            description="Track agendas, decisions and action items so EQA visits have a clear paper trail."
            action={canWrite ? 'Record your first meeting' : undefined}
            onAction={canWrite ? () => setShowAddMeeting(true) : undefined}
          />
        ) : (
          <ListCard>
            {meetings.map((meeting: IqaMeeting) => {
              const when = meeting.scheduled_at ?? meeting.date;
              const dateText = when
                ? new Date(when).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : '—';
              const subtitleParts = [
                meeting.attendees_count != null && meeting.attendees_count > 0
                  ? `${meeting.attendees_count} attendees`
                  : null,
                meeting.outcome,
              ].filter(Boolean);
              return (
                <ListRow
                  key={meeting.id}
                  accent="purple"
                  title={meeting.topic}
                  subtitle={subtitleParts.join(' · ')}
                  trailing={
                    <span className="text-[11px] text-white tabular-nums">{dateText}</span>
                  }
                />
              );
            })}
          </ListCard>
        )}
      </motion.section>

      {/* EQA Preparation */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="External Assessment"
          title="EQA preparation"
          action={canWrite ? (editingEQADate ? 'Save' : 'Edit date') : undefined}
          onAction={
            canWrite
              ? editingEQADate
                ? () => void handleSaveEqaDate()
                : startEditingEqaDate
              : undefined
          }
        />

        {loading ? (
          <ListSkeleton rows={1} />
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  Next EQA Visit
                </div>
                {editingEQADate ? (
                  <input
                    type="date"
                    value={draftEqaDate}
                    onChange={(e) => setDraftEqaDate(e.target.value)}
                    autoFocus
                    className={cn(inputClass, 'mt-2')}
                  />
                ) : (
                  <div className="mt-1 text-lg sm:text-xl font-semibold text-white tabular-nums">
                    {nextEqaVisit
                      ? new Date(nextEqaVisit).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Not set'}
                  </div>
                )}
              </div>
              <Pill tone={checkedCount === checklist.length && checklist.length > 0 ? 'green' : 'cyan'}>
                {checkedCount}/{checklist.length} ready
              </Pill>
            </div>

            <div className="pt-5 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  Required Evidence
                </div>
                {checklist.length === 0 && canWrite && (
                  <button
                    onClick={() => void handleSeedChecklist()}
                    className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Seed default checklist →
                  </button>
                )}
              </div>

              {checklist.length === 0 ? (
                <div className="text-[12.5px] text-white/65 italic py-4">
                  No checklist items for this EQA cycle yet.
                  {canWrite ? ' Tap "Seed default checklist" to start.' : ''}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {checklist.map((item: EqaChecklistItem) => (
                    <button
                      key={item.id}
                      onClick={() => void toggleChecklistItem(item.id)}
                      disabled={!canWrite}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left touch-manipulation',
                        canWrite
                          ? 'hover:bg-white/[0.03]'
                          : 'cursor-not-allowed opacity-80'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all',
                          item.status === 'complete'
                            ? 'bg-elec-yellow border-elec-yellow'
                            : 'border-white/20 bg-transparent'
                        )}
                      >
                        {item.status === 'complete' && (
                          <span className="text-[9px] font-bold text-black leading-none">✓</span>
                        )}
                      </div>
                      <span
                        className={cn(
                          'text-[13px] text-white transition-opacity',
                          item.status === 'complete' && 'line-through opacity-50'
                        )}
                      >
                        {item.item_label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </motion.section>

      {/* ── Add finding bottom sheet ─────────────────────── */}
      <Sheet open={showAddFinding} onOpenChange={setShowAddFinding}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
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
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
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
    </motion.div>
  );
}

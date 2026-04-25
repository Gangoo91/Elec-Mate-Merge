import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  ListCard,
  Pill,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import {
  useIqaSamplingPlans,
  type IqaSamplingPlan,
} from '@/hooks/useIqaSamplingPlans';
import {
  useIqaFindings,
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

/* ==========================================================================
   IqaDashboardPage — /college/iqa
   Tabs: Sampling · Findings · Standardisation
   ========================================================================== */

const FINDING_TYPE_TONE = {
  commendation: 'green',
  observation: 'blue',
  action: 'amber',
  concern: 'red',
} as const;

const FINDING_STATUS_TONE: Record<FindingStatus, Tone> = {
  open: 'amber',
  in_progress: 'blue',
  closed: 'green',
  escalated: 'red',
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

export default function IqaDashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'sampling' | 'findings' | 'standardisation'>(
    'sampling'
  );
  const [search, setSearch] = useState('');
  const [addPlanOpen, setAddPlanOpen] = useState(false);
  const [addFindingOpen, setAddFindingOpen] = useState(false);
  const [addMeetingOpen, setAddMeetingOpen] = useState(false);

  const { plans, loading: plansLoading } = useIqaSamplingPlans();
  const { findings, loading: findingsLoading, close: closeFinding, remove: removeFinding } = useIqaFindings();
  const { meetings, loading: meetingsLoading, remove: removeMeeting } = useStandardisationMeetings();

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activePlans = plans.filter((p) => {
      const end = new Date(p.period_end);
      end.setHours(0, 0, 0, 0);
      return end.getTime() >= today.getTime();
    }).length;
    const openFindings = findings.filter((f) => f.status === 'open' || f.status === 'in_progress').length;
    const overdueFindings = findings.filter(
      (f) =>
        (f.status === 'open' || f.status === 'in_progress') &&
        f.due_date &&
        new Date(f.due_date) < today
    ).length;
    const recentMeetings = meetings.filter((m) => {
      const date = new Date(m.date);
      const ninetyAgo = new Date();
      ninetyAgo.setDate(ninetyAgo.getDate() - 90);
      return date >= ninetyAgo;
    }).length;
    return { activePlans, openFindings, overdueFindings, recentMeetings };
  }, [plans, findings, meetings]);

  const heroAction = () => {
    if (activeTab === 'sampling') setAddPlanOpen(true);
    else if (activeTab === 'findings') setAddFindingOpen(true);
    else setAddMeetingOpen(true);
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors no-print"
        >
          ← Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Quality assurance · IQA"
          title="Internal quality assurance"
          description="Sampling plans, findings, standardisation. Audit-grade trail for EQA visits."
          tone="blue"
          actions={
            <button
              onClick={heroAction}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              {activeTab === 'sampling'
                ? 'New plan →'
                : activeTab === 'findings'
                  ? 'Log finding →'
                  : 'New meeting →'}
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={4}
          stats={[
            { value: stats.activePlans, label: 'Active plans', sub: 'Sampling in flight', tone: 'blue' },
            {
              value: stats.openFindings,
              label: 'Open findings',
              sub: stats.overdueFindings > 0 ? `${stats.overdueFindings} overdue` : 'Awaiting closure',
              tone: stats.overdueFindings > 0 ? 'red' : 'amber',
            },
            { value: stats.recentMeetings, label: 'Meetings · 90d', sub: 'Standardisation', tone: 'green' },
            { value: meetings.length, label: 'All meetings', sub: 'Logged total', tone: 'purple' },
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'sampling', label: 'Sampling', count: plans.length },
            { value: 'findings', label: 'Findings', count: findings.length },
            { value: 'standardisation', label: 'Standardisation', count: meetings.length },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as typeof activeTab)}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={
            activeTab === 'sampling'
              ? 'Search by qualification, unit, IQA…'
              : activeTab === 'findings'
                ? 'Search description, assessor…'
                : 'Search topic, chair…'
          }
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5">
        {activeTab === 'sampling' ? (
          <SamplingTab
            plans={plans}
            loading={plansLoading}
            search={search}
            onAdd={() => setAddPlanOpen(true)}
            onOpen={(id) => navigate(`/college/iqa/sampling/${id}`)}
          />
        ) : activeTab === 'findings' ? (
          <FindingsTab
            findings={findings}
            loading={findingsLoading}
            search={search}
            onAdd={() => setAddFindingOpen(true)}
            onClose={async (f) => {
              const notes = window.prompt(
                `Close "${f.description.slice(0, 60)}…" with resolution notes (optional):`
              );
              if (notes === null) return;
              try {
                await closeFinding(f.id, notes);
                toast({ title: 'Finding closed' });
              } catch (e) {
                toast({
                  title: 'Close failed',
                  description: (e as Error).message,
                  variant: 'destructive',
                });
              }
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
        ) : (
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
        )}
      </motion.section>

      <AddIqaSamplingPlanDialog open={addPlanOpen} onOpenChange={setAddPlanOpen} />
      <AddIqaFindingDialog open={addFindingOpen} onOpenChange={setAddFindingOpen} />
      <AddStandardisationMeetingDialog
        open={addMeetingOpen}
        onOpenChange={setAddMeetingOpen}
      />
    </PageFrame>
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
  onAdd: () => void;
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
      <EmptyState
        title="No sampling plans yet"
        description="A sampling plan sets the IQA target % for an assessor's work over a period. Awarding bodies usually expect 10–20% routine sampling."
        action="New plan"
        onAction={onAdd}
      />
    );
  }
  if (filtered.length === 0) {
    return (
      <EmptyState
        title="Nothing matches"
        description={`No plans match "${search}".`}
      />
    );
  }
  return (
    <ListCard>
      {filtered.map((p) => (
        <SamplingPlanRow key={p.id} plan={p} onOpen={() => onOpen(p.id)} />
      ))}
    </ListCard>
  );
}

function SamplingPlanRow({
  plan,
  onOpen,
}: {
  plan: IqaSamplingPlan;
  onOpen: () => void;
}) {
  const target = plan.target_sample_percent ?? 0;
  const sampled = plan.sampled_count ?? 0;
  const total = plan.total_assessments ?? 0;
  const sampledPct = total > 0 ? Math.round((sampled / total) * 100) : 0;
  const onTrack = sampledPct >= target;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ended = new Date(plan.period_end) < today;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left px-5 sm:px-6 py-4 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors touch-manipulation"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {ended ? (
              <Pill tone="blue">Closed</Pill>
            ) : (
              <Pill tone={onTrack ? 'green' : 'amber'}>
                {onTrack ? 'On track' : 'Catching up'}
              </Pill>
            )}
            <span className="text-[11px] tabular-nums text-white/55">
              Target {target}%
            </span>
          </div>
          <div className="mt-1 text-[14px] font-medium text-white group-hover:underline underline-offset-2">
            {plan.qualification_code ?? 'All qualifications'}
            {plan.unit_code && (
              <span className="text-white/55"> · {plan.unit_code}</span>
            )}
          </div>
          <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55 tabular-nums">
            <span>{formatDate(plan.period_start)}</span>
            <span className="text-white/25">→</span>
            <span>{formatDate(plan.period_end)}</span>
            {plan.iqa_name_snapshot && (
              <>
                <span className="text-white/25">·</span>
                <span>IQA: {plan.iqa_name_snapshot}</span>
              </>
            )}
          </div>
          {plan.notes && (
            <p className="mt-2 text-[11.5px] text-white/65 leading-snug line-clamp-2">
              {plan.notes}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[18px] font-semibold tabular-nums text-white">
            {sampled}
            <span className="text-white/40 text-[12px]"> / {total}</span>
          </div>
          <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">
            {sampledPct}% sampled
          </div>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all',
            onTrack ? 'bg-emerald-400' : 'bg-amber-400'
          )}
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
  onAdd: () => void;
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
      <EmptyState
        title="No findings logged yet"
        description="Findings are how IQAs document commendations, observations, actions or concerns. They form the audit trail for awarding-body EQA visits."
        action="Log finding"
        onAction={onAdd}
      />
    );
  }
  if (filtered.length === 0) {
    return (
      <EmptyState
        title="Nothing matches"
        description={`No findings match "${search}".`}
      />
    );
  }
  return (
    <ListCard>
      {filtered.map((f) => (
        <FindingRow
          key={f.id}
          finding={f}
          onClose={() => onClose(f)}
          onDelete={() => onDelete(f)}
        />
      ))}
    </ListCard>
  );
}

function FindingRow({
  finding,
  onClose,
  onDelete,
}: {
  finding: IqaFinding;
  onClose: () => void;
  onDelete: () => void;
}) {
  const tone = FINDING_TYPE_TONE[finding.finding_type];
  const statusTone = FINDING_STATUS_TONE[finding.status];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue =
    (finding.status === 'open' || finding.status === 'in_progress') &&
    finding.due_date &&
    new Date(finding.due_date) < today;

  return (
    <div className="px-5 sm:px-6 py-4 border-b border-white/[0.04] last:border-b-0">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone={tone}>{finding.finding_type}</Pill>
            <Pill tone={statusTone}>{finding.status.replace(/_/g, ' ')}</Pill>
            {finding.severity && (
              <span
                className={cn(
                  'inline-flex items-center h-5 px-1.5 rounded-md border text-[10px] font-semibold tracking-[0.06em] uppercase',
                  finding.severity === 'critical'
                    ? 'bg-red-500/[0.08] border-red-500/30 text-red-200'
                    : 'bg-amber-500/[0.08] border-amber-500/30 text-amber-200'
                )}
              >
                {finding.severity}
              </span>
            )}
            {overdue && (
              <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-red-500/[0.08] border border-red-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-red-200">
                Overdue
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[13px] text-white leading-relaxed line-clamp-3">
            {finding.description}
          </p>
          <div className="mt-1.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55 tabular-nums">
            <span>About {finding.assessor_name}</span>
            {finding.iqa_name_snapshot && (
              <>
                <span className="text-white/25">·</span>
                <span>IQA: {finding.iqa_name_snapshot}</span>
              </>
            )}
            <span className="text-white/25">·</span>
            <span>{formatDate(finding.created_at)}</span>
            {finding.due_date && (
              <>
                <span className="text-white/25">·</span>
                <span className={overdue ? 'text-red-300' : ''}>
                  Due {formatDate(finding.due_date)}
                </span>
              </>
            )}
          </div>
          {finding.action_plan && (
            <div className="mt-2 pl-3 border-l-2 border-elec-yellow/40 text-[11.5px] text-white/75 leading-snug">
              <span className="text-elec-yellow/90 font-medium">Action: </span>
              {finding.action_plan}
            </div>
          )}
          {finding.resolution_notes && finding.status === 'closed' && (
            <div className="mt-2 pl-3 border-l-2 border-emerald-500/40 text-[11.5px] text-emerald-200/85 leading-snug">
              <span className="font-medium">Resolved: </span>
              {finding.resolution_notes}
              {finding.closed_at && (
                <span className="text-white/45">
                  {' '}
                  · {formatDate(finding.closed_at)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 flex-wrap">
        {finding.status !== 'closed' && (
          <button
            type="button"
            onClick={onClose}
            className="h-7 px-3 rounded-full bg-emerald-500/[0.12] border border-emerald-500/40 text-[11px] font-medium text-emerald-200 hover:bg-emerald-500/[0.18] transition-colors touch-manipulation"
          >
            Close finding
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="h-7 px-3 rounded-full text-[11px] font-medium text-white/55 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
        >
          Delete
        </button>
      </div>
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
      <EmptyState
        title="No standardisation meetings yet"
        description="Awarding bodies expect regular standardisation meetings as evidence of consistent assessment. Log them here with attendees, decisions and action items."
        action="New meeting"
        onAction={onAdd}
      />
    );
  }
  if (filtered.length === 0) {
    return (
      <EmptyState
        title="Nothing matches"
        description={`No meetings match "${search}".`}
      />
    );
  }
  return (
    <ListCard>
      {filtered.map((m) => (
        <MeetingRow key={m.id} meeting={m} onDelete={() => onDelete(m)} />
      ))}
    </ListCard>
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
    <div className="px-5 sm:px-6 py-4 border-b border-white/[0.04] last:border-b-0">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone="blue">Standardisation</Pill>
            <span className="text-[11px] text-white/55 tabular-nums">
              {formatDate(meeting.date)}
              {days !== null && days > 0 && (
                <>
                  <span className="text-white/25"> · </span>
                  <span>{days}d ago</span>
                </>
              )}
            </span>
          </div>
          <div className="mt-1 text-[14px] font-medium text-white">{meeting.topic}</div>
          <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55 tabular-nums">
            <span>{meeting.attendees_count ?? meeting.attendee_ids.length} attendees</span>
            {meeting.minutes_url && (
              <>
                <span className="text-white/25">·</span>
                <a
                  href={meeting.minutes_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-elec-yellow/85 hover:text-elec-yellow underline-offset-2 hover:underline"
                >
                  Minutes →
                </a>
              </>
            )}
          </div>
          {meeting.outcome && (
            <p className="mt-1.5 text-[12px] text-white/85 leading-relaxed">
              {meeting.outcome}
            </p>
          )}
          {meeting.decisions && (
            <p className="mt-1.5 text-[11.5px] text-white/65 leading-relaxed line-clamp-2">
              <span className="text-white/85 font-medium">Decisions: </span>
              {meeting.decisions}
            </p>
          )}
          {upcomingActions.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {upcomingActions.map((a, i) => (
                <div key={i} className="text-[11.5px] text-white/75 pl-3 relative leading-snug">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[7px] inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow/85"
                  />
                  {a}
                </div>
              ))}
              {overflow > 0 && (
                <div className="text-[11px] text-white/45 pl-3 tabular-nums">
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
          className="h-7 px-3 rounded-full text-[11px] font-medium text-white/55 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
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
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04] animate-pulse">
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

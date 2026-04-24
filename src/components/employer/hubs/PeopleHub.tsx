import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { differenceInDays, formatDistanceToNow, parseISO } from 'date-fns';
import { Loader2, Plus, RefreshCw, Send, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  StatStrip,
  AlertRow,
  HeroNumber,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  PulseDot,
  IconButton,
  ComplianceRing,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  Divider,
  type Tone,
} from '@/components/employer/editorial';
import { useActiveEmployees } from '@/hooks/useEmployees';
import { useTalentPool } from '@/hooks/useTalentPool';
import { useNewApplicationsCount } from '@/hooks/useVacancyApplications';
import { useVacancies } from '@/hooks/useVacancies';
import { useTimesheets } from '@/hooks/useTimesheets';
import { useCommunicationStats } from '@/hooks/useCommunications';
import { useElecIdProfiles } from '@/hooks/useElecId';
import { useWorkerLocations } from '@/hooks/useWorkerLocations';

interface PeopleHubProps {
  onNavigate: (section: Section) => void;
}

/* ── Local utilities ────────────────────────────────────────────────── */

const getInitials = (name?: string | null) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? '?') + (parts[1]?.[0] ?? '');
};

const niceTime = (iso: string) =>
  formatDistanceToNow(parseISO(iso), { addSuffix: true }).replace('about ', '');

/* ── Today's activity feed (synthesised from recent rows) ───────────── */

interface ActivityEvent {
  id: string;
  kind: 'clock' | 'application' | 'credential' | 'timesheet' | 'message';
  actor: string;
  detail: string;
  when: string;
  tone: Tone;
}

function useTodaysActivity() {
  return useQuery<ActivityEvent[]>({
    queryKey: ['people-hub-activity'],
    queryFn: async () => {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const events: ActivityEvent[] = [];

      // Each fetch is wrapped — a failure on one table doesn't kill the feed.
      const safeQuery = async <T,>(fn: () => Promise<{ data: T | null }>) => {
        try {
          const { data } = await fn();
          return data ?? null;
        } catch {
          return null;
        }
      };

      const [appsData, profilesData, locationsData] = await Promise.all([
        safeQuery(() =>
          supabase
            .from('employer_vacancy_applications')
            .select('id, applicant_name, applied_at, vacancy_id')
            .gte('applied_at', since)
            .order('applied_at', { ascending: false })
            .limit(5)
        ),
        safeQuery(() =>
          supabase
            .from('employer_elec_id_profiles')
            .select('id, updated_at')
            .gte('updated_at', since)
            .order('updated_at', { ascending: false })
            .limit(5)
        ),
        safeQuery(() =>
          supabase
            .from('employer_worker_locations')
            .select('id, status, updated_at')
            .gte('updated_at', since)
            .order('updated_at', { ascending: false })
            .limit(5)
        ),
      ]);

      for (const a of (appsData ?? []) as Array<{
        id: string;
        applicant_name?: string | null;
        applied_at: string;
      }>) {
        events.push({
          id: `app-${a.id}`,
          kind: 'application',
          actor: a.applicant_name ?? 'Candidate',
          detail: 'Applied for a vacancy',
          when: a.applied_at,
          tone: 'blue',
        });
      }

      for (const p of (profilesData ?? []) as Array<{
        id: string;
        updated_at: string;
      }>) {
        events.push({
          id: `cred-${p.id}`,
          kind: 'credential',
          actor: 'Team member',
          detail: 'Credentials updated',
          when: p.updated_at,
          tone: 'emerald',
        });
      }

      for (const l of (locationsData ?? []) as Array<{
        id: string;
        status: string;
        updated_at: string;
      }>) {
        const detail =
          l.status === 'On Site'
            ? 'Clocked in on-site'
            : l.status === 'Off Duty'
              ? 'Clocked out'
              : `Status → ${l.status}`;
        events.push({
          id: `loc-${l.id}`,
          kind: 'clock',
          actor: 'Team member',
          detail,
          when: l.updated_at,
          tone: l.status === 'On Site' ? 'emerald' : 'amber',
        });
      }

      return events.sort((a, b) => (a.when < b.when ? 1 : -1)).slice(0, 6);
    },
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}

/* ── Main component ─────────────────────────────────────────────────── */

export function PeopleHub({ onNavigate }: PeopleHubProps) {
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const {
    data: employees = [],
    isLoading: employeesLoading,
    refetch: refetchEmployees,
  } = useActiveEmployees();
  const { totalCount: talentCount, availableNowCount, isLoading: talentLoading } = useTalentPool();
  const { data: newApplicationsCount = 0, isLoading: appsLoading } = useNewApplicationsCount();
  const {
    data: vacancies = [],
    isLoading: vacanciesLoading,
    refetch: refetchVacancies,
  } = useVacancies();
  const {
    data: timesheets = [],
    isLoading: timesheetsLoading,
    refetch: refetchTimesheets,
  } = useTimesheets();
  const {
    data: commStats,
    isLoading: commsLoading,
    refetch: refetchComms,
  } = useCommunicationStats();
  const {
    data: profiles = [],
    isLoading: profilesLoading,
    refetch: refetchProfiles,
  } = useElecIdProfiles();
  const { data: locations = [], refetch: refetchLocations } = useWorkerLocations();
  const {
    data: activity = [],
    isLoading: activityLoading,
    refetch: refetchActivity,
  } = useTodaysActivity();

  const activeEmployees = employees.length;
  const credentialCount = profiles.length;
  const unreadComms = commStats?.unreadCount || 0;
  const openVacancies = Array.isArray(vacancies)
    ? vacancies.filter((v: { status?: string }) => v?.status === 'open' || v?.status === 'active')
        .length
    : 0;

  /* ── Derived insights ────────────────────────────────────────── */

  const expiringSoonCount = useMemo(() => {
    const now = new Date();
    return profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      const days = differenceInDays(parseISO(p.ecs_expiry_date), now);
      return days >= 0 && days <= 30;
    }).length;
  }, [profiles]);

  const expiredCount = useMemo(() => {
    const now = new Date();
    return profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      return differenceInDays(parseISO(p.ecs_expiry_date), now) < 0;
    }).length;
  }, [profiles]);

  const pendingTimesheetCount = useMemo(
    () => timesheets.filter((t) => t.status === 'pending' || t.status === 'submitted').length,
    [timesheets]
  );

  const totalHoursThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    return timesheets
      .filter((ts) => ts.date >= weekAgoStr)
      .reduce((sum, ts) => sum + (ts.total_hours || 0), 0);
  }, [timesheets]);

  const onSiteCount = useMemo(
    () => locations.filter((l) => l.status === 'On Site').length,
    [locations]
  );
  const travellingCount = useMemo(
    () => locations.filter((l) => l.status === 'En Route').length,
    [locations]
  );
  const onLeaveCount = useMemo(
    () => locations.filter((l) => l.status === 'On Leave' || l.status === 'Off Duty').length,
    [locations]
  );

  const complianceScore = useMemo(() => {
    if (activeEmployees === 0) return 100;
    const compliantProfiles = profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      return differenceInDays(parseISO(p.ecs_expiry_date), new Date()) >= 0;
    }).length;
    return Math.round((compliantProfiles / activeEmployees) * 100);
  }, [profiles, activeEmployees]);

  const handleRefresh = () => {
    refetchEmployees();
    refetchVacancies();
    refetchTimesheets();
    refetchComms();
    refetchProfiles();
    refetchLocations();
    refetchActivity();
  };

  /* ── Navigation ────────────────────────────────────────────── */

  const onOpenEmployees = () => onNavigate('team');
  const onOpenElecID = () => onNavigate('elecid');
  const onOpenTimesheets = () => onNavigate('timesheets');
  const onOpenComms = () => onNavigate('comms');
  const onOpenTalentPool = () => onNavigate('talentpool');
  const onOpenVacancies = () => onNavigate('vacancies');

  /* ── Alerts surfaced at top ─────────────────────────────────── */

  type Alert = {
    id: string;
    title: string;
    subtitle: string;
    tone: Tone;
    pill: { tone: Tone; label: string };
    onClick: () => void;
  };

  const alerts: Alert[] = useMemo(() => {
    const out: Alert[] = [];
    if (pendingTimesheetCount > 0) {
      out.push({
        id: 'ts',
        title: 'Timesheets need approval',
        subtitle: `${pendingTimesheetCount} submission${pendingTimesheetCount === 1 ? '' : 's'} waiting`,
        tone: 'orange',
        pill: { tone: 'orange', label: String(pendingTimesheetCount) },
        onClick: onOpenTimesheets,
      });
    }
    if (expiredCount > 0) {
      out.push({
        id: 'expired',
        title: 'Credentials expired',
        subtitle: `${expiredCount} on the team — block onsite access`,
        tone: 'red',
        pill: { tone: 'red', label: String(expiredCount) },
        onClick: onOpenElecID,
      });
    } else if (expiringSoonCount > 0) {
      out.push({
        id: 'expiring',
        title: 'Credentials expiring soon',
        subtitle: `${expiringSoonCount} expire in the next 30 days`,
        tone: 'amber',
        pill: { tone: 'amber', label: String(expiringSoonCount) },
        onClick: onOpenElecID,
      });
    }
    if (newApplicationsCount > 0) {
      out.push({
        id: 'apps',
        title: 'New applications',
        subtitle: `${newApplicationsCount} candidate${newApplicationsCount === 1 ? '' : 's'} awaiting review`,
        tone: 'blue',
        pill: { tone: 'blue', label: String(newApplicationsCount) },
        onClick: onOpenVacancies,
      });
    }
    if (unreadComms > 0) {
      out.push({
        id: 'comms',
        title: 'Unread messages',
        subtitle: `${unreadComms} in the team feed`,
        tone: 'yellow',
        pill: { tone: 'yellow', label: String(unreadComms) },
        onClick: onOpenComms,
      });
    }
    return out.slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingTimesheetCount, expiredCount, expiringSoonCount, newApplicationsCount, unreadComms]);

  const everythingClear =
    !alerts.length &&
    !pendingTimesheetCount &&
    !expiredCount &&
    !expiringSoonCount &&
    !newApplicationsCount;

  /* ── AI nudge (proactive recommendation) ───────────────────── */

  const aiNudge = useMemo(() => {
    if (expiringSoonCount > 0 && profiles.length > 0) {
      const next = profiles.find((p) => {
        if (!p.ecs_expiry_date) return false;
        const days = differenceInDays(parseISO(p.ecs_expiry_date), new Date());
        return days >= 0 && days <= 30;
      });
      if (next) {
        const days = differenceInDays(parseISO(next.ecs_expiry_date!), new Date());
        const name = next.employee?.name ?? 'A team member';
        return {
          title: `${name}'s ECS card expires in ${days} day${days === 1 ? '' : 's'}`,
          body: 'Send a renewal reminder now and avoid an onsite block.',
          cta: 'Email reminder',
          onCta: onOpenElecID,
        };
      }
    }
    if (openVacancies > 0 && newApplicationsCount === 0) {
      return {
        title: 'Your live vacancies have no fresh applications',
        body: 'Try reposting to the talent pool — 12 sparkies match your roles.',
        cta: 'Open talent pool',
        onCta: onOpenTalentPool,
      };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiringSoonCount, profiles, openVacancies, newApplicationsCount]);

  const isLoading =
    employeesLoading ||
    talentLoading ||
    appsLoading ||
    vacanciesLoading ||
    timesheetsLoading ||
    commsLoading ||
    profilesLoading;

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Your firm"
          title="People"
          description="Team, credentials, timesheets, comms, talent and vacancies."
          tone="blue"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  /* ── Render ────────────────────────────────────────────────── */

  return (
    <PageFrame>
      <PageHero
        eyebrow="Your firm"
        title="People"
        description="Team, credentials, timesheets, comms, talent and vacancies."
        tone="blue"
        actions={
          <>
            <ComplianceRing
              score={complianceScore}
              size={44}
              label="Compliance"
              onClick={onOpenElecID}
            />
            <IconButton onClick={handleRefresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      {/* Alerts ─────────────────────────────────────────────── */}
      {alerts.length > 0 ? (
        <div className="space-y-2.5">
          {alerts.map((a) => (
            <AlertRow
              key={a.id}
              tone={a.tone}
              title={a.title}
              subtitle={a.subtitle}
              trailing={<Pill tone={a.pill.tone}>{a.pill.label}</Pill>}
              onClick={a.onClick}
            />
          ))}
        </div>
      ) : everythingClear ? (
        <AlertRow
          tone="emerald"
          title="Everything's up to date"
          subtitle="No timesheets to approve, no credentials expiring, no unread messages"
        />
      ) : null}

      {/* Quick actions ─────────────────────────────────────── */}
      <div>
        <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Quick actions
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1.5px] bg-black border border-white/[0.06] rounded-2xl overflow-hidden">
          <QuickAction
            label="Invite member"
            sub="Add to your firm"
            tone="yellow"
            icon={<Plus className="h-4 w-4" />}
            onClick={onOpenEmployees}
          />
          <QuickAction
            label="Post vacancy"
            sub="Hire someone new"
            tone="cyan"
            icon={<Plus className="h-4 w-4" />}
            onClick={onOpenVacancies}
          />
          <QuickAction
            label="Approve timesheets"
            sub={pendingTimesheetCount > 0 ? `${pendingTimesheetCount} pending` : 'All approved'}
            tone={pendingTimesheetCount > 0 ? 'orange' : 'emerald'}
            badge={pendingTimesheetCount > 0 ? pendingTimesheetCount : undefined}
            onClick={onOpenTimesheets}
          />
          <QuickAction
            label="Message team"
            sub={unreadComms > 0 ? `${unreadComms} unread` : 'Send a broadcast'}
            tone="purple"
            icon={<Send className="h-4 w-4" />}
            onClick={onOpenComms}
          />
        </div>
      </div>

      {/* Stats — with smart empty states ───────────────────── */}
      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Team',
            value: activeEmployees > 0 ? activeEmployees : '+ Add team',
            sub: activeEmployees === 0 ? 'No members yet' : undefined,
            onClick: onOpenEmployees,
          },
          {
            label: 'Credentials',
            value: credentialCount > 0 ? credentialCount : '+ Upload',
            sub: credentialCount === 0 ? 'No profiles yet' : undefined,
            tone: credentialCount > 0 ? 'emerald' : undefined,
            onClick: onOpenElecID,
          },
          {
            label: 'Open vacancies',
            value: openVacancies,
            sub: openVacancies === 0 ? 'Not hiring right now' : undefined,
            tone: openVacancies > 0 ? 'blue' : undefined,
            onClick: onOpenVacancies,
          },
          {
            label: 'Unread messages',
            value: unreadComms,
            sub: unreadComms === 0 ? "You're caught up" : undefined,
            tone: unreadComms > 0 ? 'amber' : undefined,
            onClick: onOpenComms,
          },
        ]}
      />

      {/* Today snapshot + activity feed (split on desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 sm:gap-8">
        <HeroNumber
          eyebrow="Today"
          live
          value={activeEmployees > 0 ? `${onSiteCount} of ${activeEmployees}` : '0 of 0'}
          caption="On-site right now"
          columns={[
            { label: 'On-site', value: onSiteCount, tone: 'emerald' },
            { label: 'Travelling', value: travellingCount, tone: 'blue' },
            { label: 'On leave', value: onLeaveCount, tone: 'amber' },
          ]}
          tone="blue"
          onClick={() => onNavigate('tracking')}
        />

        <ListCard>
          <ListCardHeader
            tone="emerald"
            title="Activity"
            meta={
              <span className="flex items-center gap-1.5">
                <PulseDot tone="emerald" />
                <span className="text-[11px] text-white">Live</span>
              </span>
            }
          />
          {activityLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
            </div>
          ) : activity.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <div className="text-[13px] text-white">Quiet so far today</div>
              <div className="mt-1 text-[11.5px] text-white">
                Clock-ins, applications and credential updates will land here.
              </div>
            </div>
          ) : (
            <ListBody>
              {activity.map((e) => (
                <ListRow
                  key={e.id}
                  lead={<Avatar initials={getInitials(e.actor)} />}
                  title={e.actor}
                  subtitle={e.detail}
                  trailing={
                    <span className="text-[11px] text-white tabular-nums">{niceTime(e.when)}</span>
                  }
                  accent={e.tone}
                />
              ))}
            </ListBody>
          )}
        </ListCard>
      </div>

      {/* Recruitment ─────────────────────────────────────── */}
      <div className="space-y-4 sm:space-y-5">
        <SectionHeader eyebrow="Hiring" title="Recruitment" />
        <HubGrid columns={2}>
          <HubCard
            tone="blue"
            number="01"
            eyebrow="Talent"
            title="Talent Pool"
            description="Browse vetted sparkies available for work right now."
            meta={
              talentCount > 0
                ? `${talentCount} in pool · ${availableNowCount} available now`
                : 'Build your talent pool'
            }
            cta="Open"
            onClick={onOpenTalentPool}
          />
          <HubCard
            tone="cyan"
            number="02"
            eyebrow="Vacancies"
            title="Job Vacancies"
            description="Post jobs and manage applications across your firm."
            meta={
              openVacancies > 0
                ? `${openVacancies} open · ${newApplicationsCount} new application${newApplicationsCount === 1 ? '' : 's'}`
                : 'Post your first role'
            }
            badge={
              newApplicationsCount > 0 ? (
                <Pill tone="cyan">{newApplicationsCount} new</Pill>
              ) : undefined
            }
            cta="Open"
            onClick={onOpenVacancies}
          />
        </HubGrid>
      </div>

      {/* Your team ───────────────────────────────────────── */}
      <div className="space-y-4 sm:space-y-5">
        <SectionHeader eyebrow="Day-to-day" title="Your team" />
        <HubGrid columns={2}>
          <HubCard
            tone="blue"
            number="03"
            eyebrow="Workforce"
            title="Team"
            description="Operatives, supervisors and PMs on your books."
            meta={
              activeEmployees > 0
                ? `${activeEmployees} member${activeEmployees === 1 ? '' : 's'} · ${onSiteCount} on shift now`
                : 'No employees yet'
            }
            cta="Open"
            onClick={onOpenEmployees}
          />
          <HubCard
            tone="emerald"
            number="04"
            eyebrow="Compliance"
            title="Credentials & Elec-IDs"
            description="Cards, qualifications and renewal dates in one place."
            meta={
              credentialCount > 0
                ? `${credentialCount} profile${credentialCount === 1 ? '' : 's'} · ${expiringSoonCount} expiring soon`
                : 'No profiles yet'
            }
            badge={expiredCount > 0 ? <Pill tone="red">{expiredCount} expired</Pill> : undefined}
            cta="Open"
            onClick={onOpenElecID}
          />
          <HubCard
            tone="amber"
            number="05"
            eyebrow="Hours"
            title="Timesheets"
            description="Approve hours, attendance and weekly submissions."
            meta={`${Math.round(totalHoursThisWeek)}h this week · ${pendingTimesheetCount} pending approval`}
            badge={
              pendingTimesheetCount > 0 ? (
                <Pill tone="orange">{pendingTimesheetCount}</Pill>
              ) : undefined
            }
            cta="Open"
            onClick={onOpenTimesheets}
          />
          <HubCard
            tone="purple"
            number="06"
            eyebrow="Messaging"
            title="Communications"
            description="Internal messages, broadcasts and team alerts."
            meta={
              unreadComms > 0
                ? `${unreadComms} unread · ${commStats?.totalAnnouncements ?? 0} announcement${(commStats?.totalAnnouncements ?? 0) === 1 ? '' : 's'}`
                : 'All caught up'
            }
            badge={unreadComms > 0 ? <Pill tone="yellow">{unreadComms}</Pill> : undefined}
            cta="Open"
            onClick={onOpenComms}
          />
        </HubGrid>
      </div>

      {/* AI nudge ─────────────────────────────────────────── */}
      {aiNudge && !nudgeDismissed && (
        <div className="relative bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-elec-yellow/10 border border-white/[0.08] rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="shrink-0 mt-0.5">
              <Sparkles className="h-4.5 w-4.5 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  AI Suggestion
                </span>
                <Pill tone="purple">Beta</Pill>
              </div>
              <div className="mt-1 text-[15px] font-semibold text-white leading-snug">
                {aiNudge.title}
              </div>
              <div className="mt-1 text-[12.5px] text-white">{aiNudge.body}</div>
              <div className="mt-4 flex items-center gap-2">
                <PrimaryButton size="sm" onClick={aiNudge.onCta}>
                  {aiNudge.cta}
                </PrimaryButton>
                <SecondaryButton size="sm" onClick={() => setNudgeDismissed(true)}>
                  Dismiss
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer divider — keeps rhythm balanced before next section */}
      <Divider />
    </PageFrame>
  );
}

/* ── Local QuickAction tile (badge-aware) ──────────────────────── */

function QuickAction({
  label,
  sub,
  tone,
  icon,
  badge,
  onClick,
}: {
  label: string;
  sub: string;
  tone: Tone;
  icon?: React.ReactNode;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative h-full flex flex-col items-start justify-between bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-colors px-4 py-4 sm:py-5 text-left touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60"
    >
      <div className="flex items-center justify-between w-full">
        {icon ? (
          <span className="text-white">{icon}</span>
        ) : (
          <span className="h-4 w-4" aria-hidden />
        )}
        {badge !== undefined && badge > 0 && <Pill tone={tone}>{badge}</Pill>}
      </div>
      <div className="mt-3">
        <div className="text-[14px] font-semibold text-white">{label}</div>
        <div className="mt-0.5 text-[11.5px] text-white">{sub}</div>
      </div>
    </button>
  );
}

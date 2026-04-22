import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  RefreshCw,
  Mail,
  MailPlus,
  Download,
  Plus,
  XCircle,
  CheckCheck,
  Eye,
} from 'lucide-react';
import {
  format,
  formatDistanceToNow,
  parseISO,
  startOfDay,
  addDays,
  formatDistance,
} from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useHaptic } from '@/hooks/useHaptic';
import { toast } from 'sonner';
import { calculateEngagementScore } from '@/utils/adminUtils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Dot,
  Eyebrow,
  IconButton,
  EmptyState,
  LoadingBlocks,
  type Tone,
} from '@/components/admin/editorial';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TrialUser {
  id: string;
  full_name: string;
  username: string;
  role: string | null;
  subscribed: boolean;
  created_at: string;
  signup_date: string;
  trial_ends: string;
  trial_status: 'active' | 'ending_today' | 'ending_tomorrow' | 'expired' | 'subscribed';
  days_remaining: number;
  email?: string | null;
  last_sign_in_at?: string | null;
  points?: number;
  streak?: number;
  last_active_date?: string | null;
  study_sessions?: number;
  quotes_count?: number;
  eic_count?: number;
  engagement_score?: number;
  first_action_at?: string;
  first_action_type?: string;
  time_to_first_value?: number;
  hidden?: boolean;
  login_count?: number;
  page_view_count?: number;
  feature_use_count?: number;
  total_seconds_tracked?: number;
  unique_pages_visited?: number;
  active_days?: number;
  trial_end?: string | null;
  daily_heatmap?: number[];
}

interface ActivityItem {
  id: string;
  action_type:
    | 'quote'
    | 'eic'
    | 'study'
    | 'time_track'
    | 'login'
    | 'points'
    | 'profile'
    | 'streak'
    | 'page_view'
    | 'session'
    | 'feature';
  action_detail: string;
  extra_info?: string;
  created_at: string;
}

interface UserEventSummary {
  login_count: number;
  page_view_count: number;
  feature_use_count: number;
  session_count: number;
  active_days: number;
  total_seconds_tracked: number;
  unique_pages_visited: number;
  last_activity: string | null;
}

interface BaseUser {
  id: string;
  full_name: string;
  username: string;
  role: string | null;
  subscribed: boolean;
  created_at: string;
  last_sign_in: string | null;
  email: string | null;
  trial_end?: string | null;
}

interface ActivityRow {
  user_id: string;
  points: number;
  streak: number;
  last_active_date: string | null;
}

interface EventSummaryRow {
  user_id: string;
  login_count: number;
  page_view_count: number;
  feature_use_count: number;
  session_count: number;
  active_days: number;
  total_seconds_tracked: number;
  unique_pages_visited: number;
  last_activity: string | null;
}

interface QuoteRow {
  id: string;
  quote_number: string;
  total: string;
  status: string;
  created_at: string;
}

interface EicRow {
  id: string;
  installation_address: string | null;
  status: string;
  created_at: string;
}

interface StudySessionRow {
  id: string;
  course_slug: string | null;
  activity: string | null;
  resource_type: string | null;
  duration: number | null;
  created_at: string;
}

interface TimeTrackRow {
  id: string;
  activity_type: string | null;
  duration: number | null;
  course_slug: string | null;
  created_at: string;
}

interface UserEventRow {
  id: string;
  event_type: string;
  event_name: string | null;
  page_path: string | null;
  created_at: string;
}

interface TrialStats {
  total_trials: number;
  ending_today: number;
  ending_tomorrow: number;
  expired: number;
  active: number;
  converted: number;
  conversion_rate: string;
  hot_leads: number;
  warm_leads: number;
  cold_leads: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_EXPIRED_DAYS = 365;
const FOUNDER_CUTOFF_DATE = new Date('2026-01-26T00:00:00Z');
const ENGAGEMENT_HOT = 15;
const ENGAGEMENT_WARM = 5;

function relativeTime(dateStr: string | undefined | null): string {
  if (!dateStr) return 'never';
  const ms = Date.now() - new Date(dateStr).getTime();
  if (ms < 60_000) return 'just now';
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}h ago`;
  const days = Math.floor(ms / 86_400_000);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function getInitials(name?: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatTimeSpent(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

function getEngagementLevel(score: number = 0): 'hot' | 'warm' | 'cold' {
  if (score >= ENGAGEMENT_HOT) return 'hot';
  if (score >= ENGAGEMENT_WARM) return 'warm';
  return 'cold';
}

function getEngagementPillTone(score: number = 0): Tone {
  if (score >= ENGAGEMENT_HOT) return 'red';
  if (score >= ENGAGEMENT_WARM) return 'amber';
  return 'blue';
}

function getEngagementLabel(score: number = 0): string {
  if (score >= ENGAGEMENT_HOT) return 'Hot';
  if (score >= ENGAGEMENT_WARM) return 'Warm';
  return 'Cold';
}

function getStatusText(user: TrialUser): string {
  if (user.trial_status === 'subscribed') return 'Subscribed';
  if (user.trial_status === 'expired') return 'Expired';
  if (user.days_remaining === 0) return 'Ends today';
  if (user.days_remaining === 1) return '1d left';
  return `${user.days_remaining}d left`;
}

function getStatusTone(user: TrialUser): Tone {
  if (user.trial_status === 'subscribed') return 'emerald';
  if (user.trial_status === 'expired') return 'red';
  if (user.trial_status === 'ending_today') return 'red';
  if (user.trial_status === 'ending_tomorrow') return 'orange';
  if (user.days_remaining <= 3) return 'amber';
  return 'blue';
}

function ActivityHeatmap({ counts }: { counts: number[] }) {
  const getColor = (n: number) => {
    if (n === 0) return 'bg-white/[0.08]';
    if (n <= 3) return 'bg-emerald-500/30';
    if (n <= 10) return 'bg-emerald-500/60';
    return 'bg-emerald-500';
  };

  return (
    <div className="flex items-center gap-0.5" title="7-day activity">
      {counts.map((c, i) => (
        <div key={i} className={`w-1.5 h-1.5 rounded-[2px] ${getColor(c)}`} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AdminTrials() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [roleFilter, setRoleFilter] = useState<string>(searchParams.get('role') || 'all');
  const [engagementFilter, setEngagementFilter] = useState<string>(
    searchParams.get('engagement') || 'all'
  );
  const [selectedUser, setSelectedUser] = useState<TrialUser | null>(null);
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    if (engagementFilter !== 'all') params.set('engagement', engagementFilter);
    setSearchParams(params, { replace: true });
  }, [statusFilter, roleFilter, engagementFilter, setSearchParams]);

  const [hiddenUserIds, setHiddenUserIds] = useState<Set<string>>(() => {
    const saved = storageGetJSONSync<string[]>('admin-hidden-trial-users', []);
    return new Set(saved);
  });

  const { data: baseUsers, isLoading: baseLoading, isFetching: baseFetching, refetch: refetchBase } = useAdminUsersBase();

  const {
    data: trialUsers,
    isLoading: enrichmentLoading,
    isFetching: enrichmentFetching,
    refetch: refetchEnrichment,
  } = useQuery({
    queryKey: ['admin-trial-users', statusFilter, roleFilter],
    queryFn: async () => {
      const users = baseUsers || [];
      const userIds = users.map((u: BaseUser) => u.id);

      const authDataMap = new Map<string, { last_sign_in: string | null; email: string | null }>();
      users.forEach((u: BaseUser) => {
        authDataMap.set(u.id, { last_sign_in: u.last_sign_in, email: u.email });
      });

      const sevenDaysAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

      const [activityData, quotesData, eicData, studyData, eventSummaryData, profilesData, heatmapEventsData] = await Promise.all([
        batchedInQuery(
          'user_activity',
          'user_id',
          userIds,
          'user_id, points, streak, last_active_date'
        ),
        batchedInQuery('quotes', 'user_id', userIds, 'user_id'),
        batchedInQuery('eic_schedules', 'user_id', userIds, 'user_id'),
        batchedInQuery('study_sessions', 'user_id', userIds, 'user_id'),
        batchedInQuery('user_activity_summary', 'user_id', userIds, '*'),
        batchedInQuery('profiles', 'id', userIds, 'id, trial_end'),
        batchedInQuery<{ user_id: string; created_at: string }>(
          'user_events',
          'user_id',
          userIds,
          'user_id, created_at',
          (q: any) => q.gte('created_at', sevenDaysAgo)
        ),
      ]);

      const trialEndsAtMap = new Map<string, string | null>();
      profilesData?.forEach((p: { id: string; trial_end: string | null }) => {
        trialEndsAtMap.set(p.id, p.trial_end);
      });

      const activityMap = new Map<
        string,
        { points: number; streak: number; last_active_date: string | null }
      >();
      activityData?.forEach((a: ActivityRow) => {
        activityMap.set(a.user_id, {
          points: a.points || 0,
          streak: a.streak || 0,
          last_active_date: a.last_active_date,
        });
      });

      const quotesCountMap = new Map<string, number>();
      quotesData?.forEach((q: { user_id: string }) => {
        quotesCountMap.set(q.user_id, (quotesCountMap.get(q.user_id) || 0) + 1);
      });

      const eicCountMap = new Map<string, number>();
      eicData?.forEach((e: { user_id: string }) => {
        eicCountMap.set(e.user_id, (eicCountMap.get(e.user_id) || 0) + 1);
      });

      const studyCountMap = new Map<string, number>();
      studyData?.forEach((s: { user_id: string }) => {
        studyCountMap.set(s.user_id, (studyCountMap.get(s.user_id) || 0) + 1);
      });

      const eventSummaryMap = new Map<string, UserEventSummary>();
      eventSummaryData?.forEach((e: EventSummaryRow) => {
        eventSummaryMap.set(e.user_id, {
          login_count: e.login_count || 0,
          page_view_count: e.page_view_count || 0,
          feature_use_count: e.feature_use_count || 0,
          session_count: e.session_count || 0,
          active_days: e.active_days || 0,
          total_seconds_tracked: e.total_seconds_tracked || 0,
          unique_pages_visited: e.unique_pages_visited || 0,
          last_activity: e.last_activity,
        });
      });

      const heatmapMap = new Map<string, number[]>();
      const todayStart = startOfDay(new Date());
      heatmapEventsData?.forEach((ev: { user_id: string; created_at: string }) => {
        const dayIndex = 6 - Math.floor((todayStart.getTime() - startOfDay(new Date(ev.created_at)).getTime()) / 86_400_000);
        if (dayIndex < 0 || dayIndex > 6) return;
        let arr = heatmapMap.get(ev.user_id);
        if (!arr) {
          arr = [0, 0, 0, 0, 0, 0, 0];
          heatmapMap.set(ev.user_id, arr);
        }
        arr[dayIndex]++;
      });

      const today = startOfDay(new Date());
      const maxExpiredDate = addDays(today, -MAX_EXPIRED_DAYS);

      return users
        .filter((user: BaseUser) => {
          const createdAt = parseISO(user.created_at);
          if (createdAt < FOUNDER_CUTOFF_DATE) return false;
          const trialEndsAtRaw = trialEndsAtMap.get(user.id);
          const trialEnds = trialEndsAtRaw ? parseISO(trialEndsAtRaw) : addDays(createdAt, 7);
          const trialEndsDate = startOfDay(trialEnds);
          return user.subscribed || trialEndsDate >= maxExpiredDate;
        })
        .map((user: BaseUser) => {
          const createdAt = parseISO(user.created_at);
          const trialEndsAtRaw = trialEndsAtMap.get(user.id);
          const trialEnds = trialEndsAtRaw ? parseISO(trialEndsAtRaw) : addDays(createdAt, 7);
          const trialEndsDate = startOfDay(trialEnds);
          const daysRemaining = Math.ceil(
            (trialEndsDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );

          let trialStatus: TrialUser['trial_status'] = 'active';
          if (user.subscribed) {
            trialStatus = 'subscribed';
          } else if (daysRemaining < 0) {
            trialStatus = 'expired';
          } else if (daysRemaining === 0) {
            trialStatus = 'ending_today';
          } else if (daysRemaining === 1) {
            trialStatus = 'ending_tomorrow';
          }

          const activity = activityMap.get(user.id) || {
            points: 0,
            streak: 0,
            last_active_date: null,
          };
          const authData = authDataMap.get(user.id) || { last_sign_in: null, email: null };
          const eventSummary = eventSummaryMap.get(user.id);
          const points = activity.points;
          const streak = activity.streak;
          const quotesCount = quotesCountMap.get(user.id) || 0;
          const eicCount = eicCountMap.get(user.id) || 0;
          const studySessions = studyCountMap.get(user.id) || 0;

          const timeSpentMinutes = Math.floor((eventSummary?.total_seconds_tracked || 0) / 60);
          const timeBonus = Math.min(30, Math.floor(timeSpentMinutes * 0.5));
          const pageViewBonus = Math.min(20, eventSummary?.unique_pages_visited || 0);
          const loginBonus = Math.min(10, (eventSummary?.login_count || 0) * 2);
          const featureBonus = (eventSummary?.feature_use_count || 0) * 3;

          const engagementScore =
            points +
            streak * 5 +
            studySessions * 3 +
            quotesCount * 8 +
            eicCount * 10 +
            timeBonus +
            pageViewBonus +
            loginBonus +
            featureBonus;

          return {
            id: user.id,
            full_name: user.full_name,
            username: user.username,
            role: user.role,
            subscribed: user.subscribed,
            created_at: user.created_at,
            email: authData.email,
            last_sign_in_at: authData.last_sign_in,
            signup_date: format(createdAt, 'yyyy-MM-dd'),
            trial_ends: format(trialEnds, 'yyyy-MM-dd'),
            trial_status: trialStatus,
            days_remaining: Math.max(0, daysRemaining),
            points,
            streak,
            last_active_date:
              eventSummary?.last_activity || activity.last_active_date || authData.last_sign_in,
            study_sessions: studySessions,
            quotes_count: quotesCount,
            eic_count: eicCount,
            engagement_score: engagementScore,
            login_count: eventSummary?.login_count || 0,
            page_view_count: eventSummary?.page_view_count || 0,
            feature_use_count: eventSummary?.feature_use_count || 0,
            total_seconds_tracked: eventSummary?.total_seconds_tracked || 0,
            unique_pages_visited: eventSummary?.unique_pages_visited || 0,
            active_days: eventSummary?.active_days || 0,
            trial_end: trialEndsAtRaw || null,
            daily_heatmap: heatmapMap.get(user.id) || [0, 0, 0, 0, 0, 0, 0],
          } as TrialUser;
        });
    },
    enabled: !!baseUsers,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const isLoading = baseLoading || enrichmentLoading;
  const isRefreshing = baseFetching || enrichmentFetching;
  const refetch = async () => {
    await refetchBase();
    await refetchEnrichment();
  };

  const { data: todayEmailSends } = useQuery({
    queryKey: ['admin-email-sends-today'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('trial_email_sends')
        .select('user_id, email_type, sent_at, success')
        .eq('sent_date', today)
        .eq('success', true);

      if (error) {
        console.error('Error fetching email sends:', error);
        return new Set<string>();
      }

      return new Set((data || []).map((d) => d.user_id));
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const emailedTodayUserIds = todayEmailSends || new Set<string>();

  const stats = useMemo<TrialStats>(() => {
    if (!trialUsers) {
      return {
        total_trials: 0,
        ending_today: 0,
        ending_tomorrow: 0,
        expired: 0,
        active: 0,
        converted: 0,
        conversion_rate: '0',
        hot_leads: 0,
        warm_leads: 0,
        cold_leads: 0,
      };
    }

    const nonSubscribed = trialUsers.filter((u) => !u.subscribed);
    const subscribed = trialUsers.filter((u) => u.subscribed);

    const activeTrials = nonSubscribed.filter((u) => u.trial_status !== 'expired');
    const hotLeads = activeTrials.filter((u) => (u.engagement_score || 0) >= ENGAGEMENT_HOT).length;
    const warmLeads = activeTrials.filter(
      (u) =>
        (u.engagement_score || 0) >= ENGAGEMENT_WARM && (u.engagement_score || 0) < ENGAGEMENT_HOT
    ).length;
    const coldLeads = activeTrials.filter(
      (u) => (u.engagement_score || 0) < ENGAGEMENT_WARM
    ).length;

    return {
      total_trials: nonSubscribed.length,
      ending_today: nonSubscribed.filter((u) => u.trial_status === 'ending_today').length,
      ending_tomorrow: nonSubscribed.filter((u) => u.trial_status === 'ending_tomorrow').length,
      expired: nonSubscribed.filter((u) => u.trial_status === 'expired').length,
      active: nonSubscribed.filter((u) => u.trial_status === 'active').length,
      converted: subscribed.length,
      conversion_rate:
        trialUsers.length > 0 ? ((subscribed.length / trialUsers.length) * 100).toFixed(1) : '0',
      hot_leads: hotLeads,
      warm_leads: warmLeads,
      cold_leads: coldLeads,
    };
  }, [trialUsers]);

  const groupedByDay = useMemo(() => {
    if (!trialUsers) return {};

    let filtered =
      statusFilter === 'subscribed'
        ? trialUsers.filter((u) => u.subscribed && !hiddenUserIds.has(u.id))
        : trialUsers.filter((u) => !u.subscribed && !hiddenUserIds.has(u.id));

    if (statusFilter !== 'all' && statusFilter !== 'subscribed') {
      filtered = filtered.filter((u) => u.trial_status === statusFilter);
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    if (engagementFilter !== 'all') {
      filtered = filtered.filter((u) => {
        const score = u.engagement_score || 0;
        if (engagementFilter === 'hot') return score >= ENGAGEMENT_HOT;
        if (engagementFilter === 'warm') return score >= ENGAGEMENT_WARM && score < ENGAGEMENT_HOT;
        if (engagementFilter === 'cold') return score < ENGAGEMENT_WARM;
        return true;
      });
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(searchLower) ||
          u.username?.toLowerCase().includes(searchLower)
      );
    }

    const groups: Record<string, TrialUser[]> = {};
    filtered.forEach((user) => {
      const date = user.trial_ends;
      if (!groups[date]) groups[date] = [];
      groups[date].push(user);
    });

    const sortedEntries = Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, users]) => [
        date,
        users.sort((a, b) => (b.engagement_score || 0) - (a.engagement_score || 0)),
      ]);

    return Object.fromEntries(sortedEntries);
  }, [trialUsers, statusFilter, roleFilter, engagementFilter, search, hiddenUserIds]);

  const flatUsers = useMemo(
    () => Object.values(groupedByDay).flat() as TrialUser[],
    [groupedByDay]
  );

  // Bucket by expiry window
  const bucketedUsers = useMemo(() => {
    const today: TrialUser[] = [];
    const tomorrow: TrialUser[] = [];
    const thisWeek: TrialUser[] = [];
    const later: TrialUser[] = [];
    const expired: TrialUser[] = [];

    flatUsers.forEach((u) => {
      if (u.trial_status === 'expired') {
        expired.push(u);
      } else if (u.trial_status === 'ending_today') {
        today.push(u);
      } else if (u.trial_status === 'ending_tomorrow') {
        tomorrow.push(u);
      } else if (u.days_remaining <= 7) {
        thisWeek.push(u);
      } else {
        later.push(u);
      }
    });

    return { today, tomorrow, thisWeek, later, expired };
  }, [flatUsers]);

  const { data: userActivityData, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-user-activity', selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser?.id) return { activities: [], firstAction: null, scoreBreakdown: null };

      const activities: ActivityItem[] = [];

      const { data: userActivityRecord } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', selectedUser.id)
        .maybeSingle();

      const { data: eventSummary } = await supabase
        .from('user_activity_summary')
        .select('*')
        .eq('user_id', selectedUser.id)
        .maybeSingle();

      const timeSpentMinutes = Math.floor((eventSummary?.total_seconds_tracked || 0) / 60);
      const timeBonus = Math.min(30, Math.floor(timeSpentMinutes * 0.5));
      const pageViewBonus = Math.min(20, eventSummary?.unique_pages_visited || 0);
      const loginBonus = Math.min(10, (eventSummary?.login_count || 0) * 2);
      const featureBonus = (eventSummary?.feature_use_count || 0) * 3;

      const scoreBreakdown = {
        points: userActivityRecord?.points || 0,
        streak: userActivityRecord?.streak || 0,
        streakBonus: (userActivityRecord?.streak || 0) * 5,
        studySessions: 0,
        studyBonus: 0,
        quotes: 0,
        quotesBonus: 0,
        eics: 0,
        eicsBonus: 0,
        loginCount: eventSummary?.login_count || 0,
        loginBonus,
        pageViews: eventSummary?.unique_pages_visited || 0,
        pageViewBonus,
        timeSpentMinutes,
        timeBonus,
        featureUseCount: eventSummary?.feature_use_count || 0,
        featureBonus,
        totalSecondsTracked: eventSummary?.total_seconds_tracked || 0,
        activeDays: eventSummary?.active_days || 0,
        lastActivity: eventSummary?.last_activity,
        total: 0,
      };

      if (userActivityRecord?.points && userActivityRecord.points > 0) {
        activities.push({
          id: `points-${selectedUser.id}`,
          action_type: 'points',
          action_detail: `Earned ${userActivityRecord.points} points`,
          extra_info: userActivityRecord.last_active_date
            ? `Last active: ${format(parseISO(userActivityRecord.last_active_date), 'dd MMM')}`
            : undefined,
          created_at:
            userActivityRecord.updated_at ||
            userActivityRecord.last_active_date ||
            selectedUser.created_at,
        });
      }

      if (userActivityRecord?.streak && userActivityRecord.streak > 0) {
        activities.push({
          id: `streak-${selectedUser.id}`,
          action_type: 'streak',
          action_detail: `${userActivityRecord.streak} day streak`,
          extra_info: `+${userActivityRecord.streak * 5} bonus points`,
          created_at: userActivityRecord.last_active_date || selectedUser.created_at,
        });
      }

      const { data: quotes } = await supabase
        .from('quotes')
        .select('id, quote_number, total, status, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      scoreBreakdown.quotes = quotes?.length || 0;
      scoreBreakdown.quotesBonus = scoreBreakdown.quotes * 8;

      quotes?.forEach((q: QuoteRow) => {
        activities.push({
          id: `quote-${q.id}`,
          action_type: 'quote',
          action_detail: `Created ${q.status === 'approved' ? 'invoice' : 'quote'} #${q.quote_number}`,
          extra_info: `\u00A3${parseFloat(q.total).toFixed(2)}`,
          created_at: q.created_at,
        });
      });

      const { data: eics } = await supabase
        .from('eic_schedules')
        .select('id, installation_address, status, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      scoreBreakdown.eics = eics?.length || 0;
      scoreBreakdown.eicsBonus = scoreBreakdown.eics * 10;

      eics?.forEach((e: EicRow) => {
        activities.push({
          id: `eic-${e.id}`,
          action_type: 'eic',
          action_detail: 'Created EIC certificate',
          extra_info: e.installation_address?.substring(0, 30) || 'No address',
          created_at: e.created_at,
        });
      });

      const { data: sessions } = await supabase
        .from('study_sessions')
        .select('id, course_slug, activity, resource_type, duration, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      scoreBreakdown.studySessions = sessions?.length || 0;
      scoreBreakdown.studyBonus = scoreBreakdown.studySessions * 3;

      sessions?.forEach((s: StudySessionRow) => {
        activities.push({
          id: `study-${s.id}`,
          action_type: 'study',
          action_detail: s.activity || s.resource_type || 'Study session',
          extra_info: s.course_slug ? `Course: ${s.course_slug}` : undefined,
          created_at: s.created_at,
        });
      });

      const { data: timeTracks } = await supabase
        .from('time_tracking_sessions')
        .select('id, activity_type, duration, course_slug, created_at')
        .eq('user_id', selectedUser.id)
        .order('created_at', { ascending: false });

      timeTracks?.forEach((t: TimeTrackRow) => {
        activities.push({
          id: `time-${t.id}`,
          action_type: 'time_track',
          action_detail: `Logged ${t.duration || 0} mins`,
          extra_info: t.activity_type || t.course_slug || undefined,
          created_at: t.created_at,
        });
      });

      const { data: userEvents } = await supabase
        .from('user_events')
        .select('id, event_type, event_name, page_path, created_at')
        .eq('user_id', selectedUser.id)
        .in('event_type', ['login', 'page_view', 'feature_use', 'session_start'])
        .order('created_at', { ascending: false })
        .limit(50);

      userEvents?.forEach((e: UserEventRow) => {
        if (e.event_type === 'login') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'login',
            action_detail: 'Logged in',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === 'page_view') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'page_view',
            action_detail: 'Visited page',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === 'feature_use') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'feature',
            action_detail: e.event_name || 'Used feature',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === 'session_start') {
          activities.push({
            id: `event-${e.id}`,
            action_type: 'session',
            action_detail: 'Started session',
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        }
      });

      scoreBreakdown.total =
        scoreBreakdown.points +
        scoreBreakdown.streakBonus +
        scoreBreakdown.studyBonus +
        scoreBreakdown.quotesBonus +
        scoreBreakdown.eicsBonus +
        scoreBreakdown.timeBonus +
        scoreBreakdown.pageViewBonus +
        scoreBreakdown.loginBonus +
        scoreBreakdown.featureBonus;

      const sortedActivities = activities.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const realActivities = activities.filter(
        (a) => !['points', 'streak'].includes(a.action_type)
      );
      const firstAction =
        realActivities.length > 0
          ? realActivities.reduce((oldest, curr) =>
              new Date(curr.created_at) < new Date(oldest.created_at) ? curr : oldest
            )
          : null;

      return { activities: sortedActivities, firstAction, scoreBreakdown };
    },
    enabled: !!selectedUser?.id,
    staleTime: 30 * 1000,
  });

  const userActivity = userActivityData?.activities || [];
  const firstAction = userActivityData?.firstAction;
  const scoreBreakdown = userActivityData?.scoreBreakdown;

  const timeToFirstValue = useMemo(() => {
    if (!selectedUser?.created_at || !firstAction?.created_at) return null;

    const signupTime = new Date(selectedUser.created_at).getTime();
    const firstActionTime = new Date(firstAction.created_at).getTime();
    const diffMinutes = Math.round((firstActionTime - signupTime) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''}`;
    } else if (diffMinutes < 1440) {
      const hours = Math.round(diffMinutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.round(diffMinutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  }, [selectedUser?.created_at, firstAction?.created_at]);

  const hideUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const newHidden = new Set(hiddenUserIds).add(userId);
      storageSetJSONSync('admin-hidden-trial-users', [...newHidden]);
      return userId;
    },
    onSuccess: (userId) => {
      haptic.light();
      setHiddenUserIds((prev) => new Set(prev).add(userId));
      toast.success('User removed from list');
      setSelectedUser(null);
    },
  });

  const unhideAllUsers = () => {
    storageRemoveSync('admin-hidden-trial-users');
    setHiddenUserIds(new Set());
    toast.success('All hidden users restored');
  };

  const sendReminderMutation = useMutation({
    mutationFn: async ({ userId, type }: { userId: string; type: 'reminder' | 'offer' }) => {
      const { data, error } = await supabase.functions.invoke('send-trial-reminder', {
        body: { userId, type },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Email sent successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-trial-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-email-sends-today'] });
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error.message}`);
    },
  });

  const bulkEmailMutation = useMutation({
    mutationFn: async ({ userIds, type }: { userIds: string[]; type: 'reminder' | 'offer' }) => {
      const { data, error } = await supabase.functions.invoke('send-trial-reminder-bulk', {
        body: { userIds, type, batchSize: 5, batchDelayMs: 10000 },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      const sent = data?.sent || 0;
      const skipped = data?.skipped || 0;
      if (skipped > 0) {
        toast.success(`${sent} emails sent, ${skipped} skipped (already sent today)`);
      } else {
        toast.success(`Emails sent to ${sent} users`);
      }
      queryClient.invalidateQueries({ queryKey: ['admin-trial-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-email-sends-today'] });
    },
    onError: (error) => {
      toast.error(`Failed to send emails: ${error.message}`);
    },
  });

  const quickExtendMutation = useMutation({
    mutationFn: async (userId: string) => {
      const user = trialUsers?.find((u) => u.id === userId);
      const currentEnd = user?.trial_end
        ? parseISO(user.trial_end)
        : user?.created_at
          ? addDays(parseISO(user.created_at), 7)
          : new Date();
      const newEnd = addDays(currentEnd < new Date() ? new Date() : currentEnd, 7);
      const { error } = await supabase
        .from('profiles')
        .update({ trial_end: newEnd.toISOString() })
        .eq('id', userId);
      if (error) throw error;
      return { userId, newEnd };
    },
    onSuccess: ({ newEnd }) => {
      haptic.success();
      toast.success(`Trial extended to ${format(newEnd, 'dd MMM yyyy')}`);
      queryClient.invalidateQueries({ queryKey: ['admin-trial-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
    },
    onError: (error) => {
      toast.error(`Failed to extend trial: ${(error as Error).message}`);
    },
  });

  const funnelStats = useMemo(() => {
    if (!trialUsers) return { started: 0, engaged: 0, featureUsed: 0, subscribed: 0 };
    const started = trialUsers.length;
    const engaged = trialUsers.filter(
      (u) => (u.login_count || 0) > 0 || !!u.last_sign_in_at
    ).length;
    const featureUsed = trialUsers.filter((u) => (u.feature_use_count || 0) > 0).length;
    const subscribed = trialUsers.filter((u) => u.subscribed).length;
    return { started, engaged, featureUsed, subscribed };
  }, [trialUsers]);

  const getConversionTone = (user: TrialUser): Tone => {
    const engScore = calculateEngagementScore({
      login_count: user.login_count || 0,
      page_view_count: user.page_view_count || 0,
      total_seconds_tracked: user.total_seconds_tracked || 0,
      feature_use_count: user.feature_use_count || 0,
      active_days: user.active_days || 0,
      unique_pages_visited: user.unique_pages_visited || 0,
    });
    const days = user.days_remaining;
    const expired = user.trial_status === 'expired';

    if (expired || engScore < 25) return 'red';
    if (engScore > 55 && days > 2) return 'green';
    return 'amber';
  };

  const exportCSV = () => {
    const allFiltered = Object.values(groupedByDay).flat();
    if (allFiltered.length === 0) return;

    const headers = [
      'Name',
      'Email',
      'Role',
      'Trial Start',
      'Last Seen',
      'Engagement Score',
      'Status',
    ];
    const rows = allFiltered.map((u) => [
      u.full_name || '',
      u.email || '',
      u.role || '',
      u.created_at ? format(parseISO(u.created_at), 'yyyy-MM-dd HH:mm') : '',
      u.last_active_date ? format(parseISO(u.last_active_date), 'yyyy-MM-dd HH:mm') : '',
      String(u.engagement_score || 0),
      u.trial_status || '',
    ]);

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csv = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-trials-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const notEmailedCount = useMemo(
    () => flatUsers.filter((u) => !emailedTodayUserIds.has(u.id)).length,
    [flatUsers, emailedTodayUserIds]
  );

  const filterTabs = [
    { value: 'all', label: 'All', count: stats.total_trials + stats.converted },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'ending_today', label: 'Today', count: stats.ending_today },
    { value: 'ending_tomorrow', label: 'Tomorrow', count: stats.ending_tomorrow },
    { value: 'subscribed', label: 'Converted', count: stats.converted },
    { value: 'expired', label: 'Expired', count: stats.expired },
  ];

  const renderUserRow = (user: TrialUser) => {
    const statusText = getStatusText(user);
    const statusTone = getStatusTone(user);
    const engagementTone = getEngagementPillTone(user.engagement_score);
    const engagementLabel = getEngagementLabel(user.engagement_score);
    const conversionTone = getConversionTone(user);

    return (
      <ListRow
        key={user.id}
        accent={getEngagementLevel(user.engagement_score) === 'hot' ? 'red' : getEngagementLevel(user.engagement_score) === 'warm' ? 'amber' : 'blue'}
        lead={<Avatar initials={getInitials(user.full_name)} />}
        title={
          <div className="flex items-center gap-2">
            <span className="truncate">{user.full_name || 'Unknown'}</span>
            <Dot tone={conversionTone} />
            {emailedTodayUserIds.has(user.id) && (
              <CheckCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            )}
          </div>
        }
        subtitle={
          <div className="flex items-center gap-2">
            <span className="truncate">
              {user.role || 'visitor'} &middot; {relativeTime(user.last_active_date)}
            </span>
            <ActivityHeatmap counts={user.daily_heatmap || [0, 0, 0, 0, 0, 0, 0]} />
          </div>
        }
        trailing={
          <div className="flex items-center gap-2">
            <Pill tone={engagementTone}>
              {engagementLabel} {user.engagement_score || 0}
            </Pill>
            <Pill tone={statusTone}>{statusText}</Pill>
            {!user.subscribed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  quickExtendMutation.mutate(user.id);
                }}
                disabled={quickExtendMutation.isPending}
                className="h-8 px-2 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors touch-manipulation flex items-center gap-1 shrink-0 disabled:opacity-50"
                aria-label="Extend trial 7 days"
              >
                <Plus className="h-3 w-3" />
                7d
              </button>
            )}
          </div>
        }
        onClick={() => setSelectedUser(user)}
      />
    );
  };

  const bucketDefs: { key: keyof typeof bucketedUsers; title: string; tone: Tone; metaTone: Tone }[] = [
    { key: 'today', title: 'Expiring Today', tone: 'red', metaTone: 'red' },
    { key: 'tomorrow', title: 'Expiring Tomorrow', tone: 'orange', metaTone: 'orange' },
    { key: 'thisWeek', title: 'This Week', tone: 'amber', metaTone: 'amber' },
    { key: 'later', title: 'Later', tone: 'blue', metaTone: 'blue' },
    { key: 'expired', title: 'Expired', tone: 'red', metaTone: 'red' },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Subscriptions"
          title="Trials"
          description="Subscribers on trial, grouped by expiry window."
          tone="orange"
          actions={
            <>
              <IconButton onClick={exportCSV} aria-label="Export CSV">
                <Download className="h-4 w-4" />
              </IconButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh" disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Active',
              value: stats.active,
              tone: 'emerald',
              onClick: () => setStatusFilter(statusFilter === 'active' ? 'all' : 'active'),
            },
            {
              label: 'Expiring Today',
              value: stats.ending_today,
              tone: stats.ending_today > 0 ? 'red' : undefined,
              onClick: () =>
                setStatusFilter(statusFilter === 'ending_today' ? 'all' : 'ending_today'),
            },
            {
              label: 'Converted',
              value: stats.converted,
              accent: true,
              sub: `${stats.conversion_rate}% CVR`,
              onClick: () => setStatusFilter(statusFilter === 'subscribed' ? 'all' : 'subscribed'),
            },
            {
              label: 'Expired',
              value: stats.expired,
              onClick: () => setStatusFilter(statusFilter === 'expired' ? 'all' : 'expired'),
            },
          ]}
        />

        {!isLoading && funnelStats.started > 0 && (
          <section className="space-y-3">
            <SectionHeader
              eyebrow="Funnel"
              title="Conversion"
              meta={<Pill tone="yellow">{funnelStats.started} total</Pill>}
            />
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Started', value: funnelStats.started, pct: 100, tone: 'blue' as Tone },
                  {
                    label: 'Engaged',
                    value: funnelStats.engaged,
                    pct:
                      funnelStats.started > 0
                        ? Math.round((funnelStats.engaged / funnelStats.started) * 100)
                        : 0,
                    tone: 'amber' as Tone,
                  },
                  {
                    label: 'Feature Used',
                    value: funnelStats.featureUsed,
                    pct:
                      funnelStats.engaged > 0
                        ? Math.round((funnelStats.featureUsed / funnelStats.engaged) * 100)
                        : 0,
                    tone: 'orange' as Tone,
                  },
                  {
                    label: 'Subscribed',
                    value: funnelStats.subscribed,
                    pct:
                      funnelStats.featureUsed > 0
                        ? Math.round((funnelStats.subscribed / funnelStats.featureUsed) * 100)
                        : 0,
                    tone: 'emerald' as Tone,
                  },
                ].map((step) => (
                  <div key={step.label} className="text-center">
                    <Eyebrow>{step.label}</Eyebrow>
                    <div className="mt-2 text-2xl sm:text-3xl font-semibold text-white tabular-nums leading-none">
                      {step.value}
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-full ${
                          step.tone === 'blue'
                            ? 'bg-blue-400'
                            : step.tone === 'amber'
                              ? 'bg-amber-400'
                              : step.tone === 'orange'
                                ? 'bg-orange-400'
                                : 'bg-emerald-400'
                        }`}
                        style={{ width: `${step.pct}%` }}
                      />
                    </div>
                    <div className="mt-1.5 text-[11px] text-white tabular-nums">{step.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <FilterBar
          tabs={filterTabs}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search trials…"
          actions={
            hiddenUserIds.size > 0 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={unhideAllUsers}
                className="h-10 px-3 touch-manipulation text-white border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] gap-1.5"
              >
                <Eye className="h-4 w-4" />
                <span className="text-[12px]">Restore {hiddenUserIds.size}</span>
              </Button>
            ) : null
          }
        />

        <div className="flex items-center gap-2 flex-wrap">
          <Eyebrow>Lead heat</Eyebrow>
          {[
            { value: 'all', label: 'All', count: stats.hot_leads + stats.warm_leads + stats.cold_leads },
            { value: 'hot', label: 'Hot', count: stats.hot_leads, tone: 'red' as Tone },
            { value: 'warm', label: 'Warm', count: stats.warm_leads, tone: 'amber' as Tone },
            { value: 'cold', label: 'Cold', count: stats.cold_leads, tone: 'blue' as Tone },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setEngagementFilter(opt.value)}
              className={`px-3 h-8 rounded-full text-[12px] font-medium transition-colors touch-manipulation border ${
                engagementFilter === opt.value
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              {opt.label}
              <span className="ml-1.5 tabular-nums text-[11px] opacity-70">{opt.count}</span>
            </button>
          ))}
          <div className="flex-1" />
          {['all', 'apprentice', 'electrician', 'employer'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 h-8 rounded-full text-[12px] font-medium transition-colors touch-manipulation border capitalize ${
                roleFilter === r
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              {r === 'all' ? 'All roles' : r}
            </button>
          ))}
        </div>

        {flatUsers.length > 0 && (
          <div className="sticky top-0 z-20 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
            <div className="relative flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5">
              <div className="text-[13px] text-white">
                <span className="font-semibold text-white tabular-nums">{flatUsers.length}</span> shown
                {notEmailedCount > 0 && (
                  <>
                    <span className="text-white/30 mx-2">&middot;</span>
                    <span className="font-semibold text-elec-yellow tabular-nums">
                      {notEmailedCount}
                    </span>{' '}
                    not emailed
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const userIds = flatUsers
                    .filter((u) => !emailedTodayUserIds.has(u.id))
                    .map((u) => u.id);
                  if (userIds.length === 0) {
                    toast.info('All shown users have already been emailed today');
                    return;
                  }
                  bulkEmailMutation.mutate({ userIds, type: 'reminder' });
                }}
                disabled={bulkEmailMutation.isPending || notEmailedCount === 0}
                className="h-10 px-3.5 touch-manipulation gap-1.5 bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/20"
              >
                <MailPlus className="h-4 w-4" />
                Email All
              </Button>
            </div>
          </div>
        )}

        {isLoading ? (
          <LoadingBlocks />
        ) : flatUsers.length === 0 ? (
          <EmptyState
            title="No trials in this window"
            description="Trials matching your filters will appear here."
          />
        ) : (
          <div className="space-y-5">
            {bucketDefs.map((def) => {
              const users = bucketedUsers[def.key];
              if (users.length === 0) return null;
              return (
                <ListCard key={def.key}>
                  <ListCardHeader
                    tone={def.tone}
                    title={def.title}
                    meta={<Pill tone={def.metaTone}>{users.length}</Pill>}
                  />
                  <ListBody>{users.map(renderUserRow)}</ListBody>
                </ListCard>
              );
            })}
          </div>
        )}

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3">
                  <Avatar initials={getInitials(selectedUser?.full_name)} size="md" />
                  <div className="min-w-0">
                    <div className="text-left text-[15px] font-semibold text-white truncate">
                      {selectedUser?.full_name}
                    </div>
                    <div className="text-[12px] font-normal text-white truncate">
                      @{selectedUser?.username}
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {firstAction && (
                  <ListCard>
                    <div className="relative p-5">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/70 via-emerald-400/70 to-green-400/70 opacity-70" />
                      <Eyebrow>Time to first value</Eyebrow>
                      <div className="mt-2 text-3xl font-semibold text-white tabular-nums leading-none">
                        {timeToFirstValue}
                      </div>
                      <div className="mt-2 text-[12px] text-white">
                        First action: {firstAction.action_detail}
                      </div>
                      <div className="mt-1 text-[11px] text-white">
                        {format(parseISO(firstAction.created_at), 'dd MMM HH:mm')}
                      </div>
                    </div>
                  </ListCard>
                )}

                {scoreBreakdown &&
                  (scoreBreakdown.timeSpentMinutes > 0 ||
                    scoreBreakdown.pageViews > 0 ||
                    scoreBreakdown.loginCount > 0) && (
                    <StatStrip
                      columns={3}
                      stats={[
                        {
                          label: 'Time in app',
                          value: formatTimeSpent(scoreBreakdown.totalSecondsTracked || 0),
                          tone: 'cyan',
                        },
                        {
                          label: 'Pages visited',
                          value: scoreBreakdown.pageViews || 0,
                          tone: 'blue',
                        },
                        {
                          label: 'Logins',
                          value: scoreBreakdown.loginCount || 0,
                          tone: 'cyan',
                        },
                      ]}
                    />
                  )}

                {!activityLoading && !firstAction && !scoreBreakdown?.loginCount && (
                  <ListCard>
                    <div className="relative p-5">
                      <div
                        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 ${
                          selectedUser?.last_sign_in_at
                            ? 'from-amber-500/70 via-amber-400/70 to-yellow-400/70'
                            : 'from-blue-500/70 via-blue-400/70 to-cyan-400/70'
                        }`}
                      />
                      <Eyebrow>
                        {selectedUser?.last_sign_in_at
                          ? 'Logged in, no tracked activity'
                          : 'Never logged in'}
                      </Eyebrow>
                      <div className="mt-2 text-[14px] font-semibold text-white">
                        {selectedUser?.last_sign_in_at
                          ? `Last login ${formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), { addSuffix: true })}`
                          : "User hasn't returned since signup"}
                      </div>
                      <div className="mt-1 text-[12px] text-white">
                        {selectedUser?.last_sign_in_at
                          ? 'Activity tracking started recently — older sessions not captured'
                          : selectedUser?.created_at
                            ? `Signed up ${formatDistanceToNow(parseISO(selectedUser.created_at), { addSuffix: true })}`
                            : ''}
                      </div>
                    </div>
                  </ListCard>
                )}

                <ListCard>
                  <ListCardHeader tone="yellow" title="Trial status" />
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Status</span>
                      {selectedUser && (
                        <Pill tone={getStatusTone(selectedUser)}>
                          {getStatusText(selectedUser)}
                        </Pill>
                      )}
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Signed up</span>
                      <span className="text-[13px] text-white tabular-nums">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Trial ends</span>
                      <span className="text-[13px] text-white tabular-nums">
                        {selectedUser?.trial_ends &&
                          format(parseISO(selectedUser.trial_ends), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Role</span>
                      <span className="text-[13px] text-white capitalize">
                        {selectedUser?.role || 'Visitor'}
                      </span>
                    </div>
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="orange"
                    title="Engagement score"
                    meta={
                      selectedUser ? (
                        <Pill tone={getEngagementPillTone(selectedUser.engagement_score)}>
                          {getEngagementLabel(selectedUser.engagement_score)}{' '}
                          {selectedUser.engagement_score || 0}
                        </Pill>
                      ) : null
                    }
                  />
                  <div className="divide-y divide-white/[0.06]">
                    {[
                      {
                        label: `Time in app (${scoreBreakdown?.timeSpentMinutes || 0}m × 0.5, max 30)`,
                        value: `+${scoreBreakdown?.timeBonus || 0}`,
                        tone: 'cyan' as Tone,
                      },
                      {
                        label: `Pages visited (${scoreBreakdown?.pageViews || 0} unique, max 20)`,
                        value: `+${scoreBreakdown?.pageViewBonus || 0}`,
                        tone: 'blue' as Tone,
                      },
                      {
                        label: `Logins (${scoreBreakdown?.loginCount || 0} × 2, max 10)`,
                        value: `+${scoreBreakdown?.loginBonus || 0}`,
                        tone: 'cyan' as Tone,
                      },
                      {
                        label: `Features used (${scoreBreakdown?.featureUseCount || 0} × 3)`,
                        value: `+${scoreBreakdown?.featureBonus || 0}`,
                        tone: 'purple' as Tone,
                      },
                      {
                        label: 'Base points',
                        value: `${scoreBreakdown?.points || 0}`,
                        tone: 'amber' as Tone,
                      },
                      {
                        label: `Streak (${scoreBreakdown?.streak || 0} days × 5)`,
                        value: `+${scoreBreakdown?.streakBonus || 0}`,
                        tone: 'orange' as Tone,
                      },
                      {
                        label: `Study sessions (${scoreBreakdown?.studySessions || 0} × 3)`,
                        value: `+${scoreBreakdown?.studyBonus || 0}`,
                        tone: 'yellow' as Tone,
                      },
                      {
                        label: `Quotes (${scoreBreakdown?.quotes || 0} × 8)`,
                        value: `+${scoreBreakdown?.quotesBonus || 0}`,
                        tone: 'green' as Tone,
                      },
                      {
                        label: `Certificates (${scoreBreakdown?.eics || 0} × 10)`,
                        value: `+${scoreBreakdown?.eicsBonus || 0}`,
                        tone: 'yellow' as Tone,
                      },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center px-5 py-3">
                        <span className="text-[12.5px] text-white pr-3">{row.label}</span>
                        <span className="text-[13px] font-semibold text-white tabular-nums">
                          {row.value}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-5 py-3.5 bg-white/[0.03]">
                      <span className="text-[13px] font-semibold text-white">Total score</span>
                      <span className="text-xl font-semibold text-elec-yellow tabular-nums">
                        {scoreBreakdown?.total || selectedUser?.engagement_score || 0}
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Last login</span>
                      <span className="text-[13px] text-white">
                        {selectedUser?.last_sign_in_at
                          ? formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), {
                              addSuffix: true,
                            })
                          : 'Never'}
                      </span>
                    </div>
                    {selectedUser?.email && (
                      <div className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-[13px] text-white">Email</span>
                        <span className="text-[12px] text-white truncate max-w-[60%]">
                          {selectedUser.email}
                        </span>
                      </div>
                    )}
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="blue" title="Actions" />
                  <div className="p-4 sm:p-5 space-y-2.5">
                    {selectedUser && emailedTodayUserIds.has(selectedUser.id) ? (
                      <Button
                        className="w-full gap-2 h-12 touch-manipulation bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        variant="outline"
                        disabled
                      >
                        <CheckCheck className="h-4 w-4" />
                        Email sent today
                      </Button>
                    ) : (
                      <Button
                        className="w-full gap-2 h-12 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
                        onClick={() => {
                          if (selectedUser) {
                            sendReminderMutation.mutate({
                              userId: selectedUser.id,
                              type: 'reminder',
                            });
                          }
                        }}
                        disabled={sendReminderMutation.isPending}
                      >
                        <Mail className="h-4 w-4" />
                        Send trial reminder
                      </Button>
                    )}
                    {selectedUser && !selectedUser.subscribed && (
                      <Button
                        className="w-full gap-2 h-12 touch-manipulation bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                        variant="outline"
                        onClick={() => {
                          if (selectedUser) {
                            quickExtendMutation.mutate(selectedUser.id);
                          }
                        }}
                        disabled={quickExtendMutation.isPending}
                      >
                        <Plus className="h-4 w-4" />
                        Extend 7 days
                      </Button>
                    )}
                    <Button
                      className="w-full gap-2 h-12 touch-manipulation text-white hover:text-white hover:bg-white/[0.06]"
                      variant="ghost"
                      onClick={() => {
                        if (selectedUser) {
                          hideUserMutation.mutate(selectedUser.id);
                        }
                      }}
                      disabled={hideUserMutation.isPending}
                    >
                      <XCircle className="h-4 w-4" />
                      Remove from list
                    </Button>
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Activity timeline"
                    meta={<Pill tone="blue">{userActivity?.length || 0}</Pill>}
                  />
                  {activityLoading ? (
                    <div className="p-5 space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-white/[0.03] rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : !userActivity || userActivity.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="text-[13px] text-white">No activity recorded yet</div>
                      <div className="text-[11px] text-white mt-1">
                        User hasn't used any features
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/[0.06] max-h-[360px] overflow-y-auto">
                      {userActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 px-5 py-3">
                          <Dot tone="yellow" className="mt-1.5" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-white truncate">
                              {activity.action_detail}
                            </div>
                            {activity.extra_info && (
                              <div className="text-[11.5px] text-white truncate">
                                {activity.extra_info}
                              </div>
                            )}
                            <div className="text-[11px] text-white mt-0.5">
                              {formatDistance(parseISO(activity.created_at), new Date(), {
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="yellow" title="Account" />
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">User ID</span>
                      <span className="text-[11px] font-mono text-white truncate max-w-[60%]">
                        {selectedUser?.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5">
                      <span className="text-[13px] text-white">Time on platform</span>
                      <span className="text-[13px] text-white">
                        {selectedUser?.created_at &&
                          formatDistanceToNow(parseISO(selectedUser.created_at))}
                      </span>
                    </div>
                  </div>
                </ListCard>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}

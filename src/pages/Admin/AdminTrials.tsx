import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Calendar,
  Mail,
  Zap,
  GraduationCap,
  Briefcase,
  RefreshCw,
  Timer,
  Crown,
  Send,
  Flame,
  Snowflake,
  Activity,
  FileText,
  BookOpen,
  ClipboardCheck,
  Receipt,
  LogIn,
  Star,
  Rocket,
  Target,
  Eye,
  EyeOff,
  MailPlus,
  Download,
  Plus,
} from 'lucide-react';
import {
  format,
  formatDistanceToNow,
  parseISO,
  startOfDay,
  addDays,
  formatDistance,
} from 'date-fns';
import { CheckCheck, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { toast } from 'sonner';
import {
  calculateEngagementScore,
  getScoreColor,
  SCORE_COLOR_MAP,
} from '@/utils/adminUtils';

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

// Animation variants (same as AdminDashboard / AdminUsers)
const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

// Engagement border colour map
const ENGAGEMENT_BORDER: Record<string, string> = {
  hot: 'border-l-red-500',
  warm: 'border-l-amber-500',
  cold: 'border-l-blue-500',
};

/** Compact relative time: "2h ago", "3d ago", "just now" */
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

// ---------------------------------------------------------------------------
// Static helpers
// ---------------------------------------------------------------------------

const ROLE_BADGE_COLORS: Record<string, string> = {
  apprentice: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  electrician: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  employer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  default: 'bg-gray-500/20 text-white',
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ending_today: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
  ending_tomorrow: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  expired: { bg: 'bg-gray-500/20', text: 'text-white', border: 'border-gray-500/30' },
  active: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  subscribed: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
};

const getRoleBadgeColor = (role: string | null): string =>
  ROLE_BADGE_COLORS[role || ''] || ROLE_BADGE_COLORS.default;

const getRoleIcon = (role: string | null) => {
  switch (role) {
    case 'apprentice':
      return <GraduationCap className="h-4 w-4 text-yellow-400" />;
    case 'electrician':
      return <Zap className="h-4 w-4 text-yellow-400" />;
    case 'employer':
      return <Briefcase className="h-4 w-4 text-blue-400" />;
    default:
      return <Users className="h-4 w-4 text-white" />;
  }
};

const getStatusBadge = (status: string, daysRemaining: number) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.active;

  let label = '';
  let icon = null;

  switch (status) {
    case 'ending_today':
      label = 'Ends Today';
      icon = <AlertTriangle className="h-3 w-3" />;
      break;
    case 'ending_tomorrow':
      label = 'Ends Tomorrow';
      icon = <Clock className="h-3 w-3" />;
      break;
    case 'expired':
      label = 'Expired';
      icon = <XCircle className="h-3 w-3" />;
      break;
    case 'subscribed':
      label = 'Subscribed';
      icon = <Crown className="h-3 w-3" />;
      break;
    default:
      label = `${daysRemaining} days left`;
      icon = <Timer className="h-3 w-3" />;
  }

  return (
    <Badge
      className={`${colors.bg} ${colors.text} ${colors.border} text-xs flex items-center gap-1`}
    >
      {icon}
      {label}
    </Badge>
  );
};

const getActivityIcon = (type: ActivityItem['action_type']) => {
  switch (type) {
    case 'quote':
      return { icon: Receipt, color: 'text-green-400', bg: 'bg-green-500/20' };
    case 'eic':
      return { icon: ClipboardCheck, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    case 'study':
      return { icon: BookOpen, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    case 'time_track':
      return { icon: Timer, color: 'text-blue-400', bg: 'bg-blue-500/20' };
    case 'login':
      return { icon: LogIn, color: 'text-cyan-400', bg: 'bg-cyan-500/20' };
    case 'points':
      return { icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/20' };
    case 'streak':
      return { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/20' };
    case 'profile':
      return { icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/20' };
    case 'page_view':
      return { icon: Eye, color: 'text-sky-400', bg: 'bg-sky-500/20' };
    case 'session':
      return { icon: Timer, color: 'text-teal-400', bg: 'bg-teal-500/20' };
    case 'feature':
      return { icon: Zap, color: 'text-pink-400', bg: 'bg-pink-500/20' };
    default:
      return { icon: Activity, color: 'text-white', bg: 'bg-gray-500/20' };
  }
};

const formatTimeSpent = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const getEngagementBadge = (score: number = 0) => {
  if (score >= ENGAGEMENT_HOT) {
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs flex items-center gap-1">
        <Flame className="h-3 w-3" />
        Hot
      </Badge>
    );
  } else if (score >= ENGAGEMENT_WARM) {
    return (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs flex items-center gap-1">
        <Activity className="h-3 w-3" />
        Warm
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs flex items-center gap-1">
        <Snowflake className="h-3 w-3" />
        Cold
      </Badge>
    );
  }
};

function getEngagementLevel(score: number = 0): 'hot' | 'warm' | 'cold' {
  if (score >= ENGAGEMENT_HOT) return 'hot';
  if (score >= ENGAGEMENT_WARM) return 'warm';
  return 'cold';
}

function getStatusText(user: TrialUser): string {
  if (user.trial_status === 'subscribed') return 'Subscribed';
  if (user.trial_status === 'expired') return 'Expired';
  if (user.days_remaining === 0) return 'Ends today';
  if (user.days_remaining === 1) return '1d left';
  return `${user.days_remaining}d left`;
}

// ---------------------------------------------------------------------------
// Inline 7-day activity heatmap
// ---------------------------------------------------------------------------

function ActivityHeatmap({ counts }: { counts: number[] }) {
  const getColor = (n: number) => {
    if (n === 0) return 'bg-white/[0.06]';
    if (n <= 3) return 'bg-green-500/30';
    if (n <= 10) return 'bg-green-500/60';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center gap-0.5" title="7-day activity">
      {counts.map((c, i) => (
        <div key={i} className={`w-2 h-2 rounded-[2px] ${getColor(c)}`} />
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

  // Persist filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    if (engagementFilter !== 'all') params.set('engagement', engagementFilter);
    setSearchParams(params, { replace: true });
  }, [statusFilter, roleFilter, engagementFilter, setSearchParams]);

  // Track hidden user IDs in local state (persisted via localStorage)
  const [hiddenUserIds, setHiddenUserIds] = useState<Set<string>>(() => {
    const saved = storageGetJSONSync<string[]>('admin-hidden-trial-users', []);
    return new Set(saved);
  });

  // Shared cached edge function call
  const { data: baseUsers, isLoading: baseLoading, isFetching: baseFetching, refetch: refetchBase } = useAdminUsersBase();

  // -------------------------------------------------------------------------
  // Enrichment query (unchanged)
  // -------------------------------------------------------------------------
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

      // Build per-user 7-day heatmap: array of 7 event counts (index 0 = 6 days ago, 6 = today)
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
  const refetch = async () => {
    await refetchBase();
    await refetchEnrichment();
  };

  // -------------------------------------------------------------------------
  // Today's email sends (unchanged)
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Stats memo (unchanged)
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // groupedByDay memo (kept for filtering, rendered flat)
  // -------------------------------------------------------------------------
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

  // Flat list derived from groupedByDay
  const flatUsers = useMemo(
    () => Object.values(groupedByDay).flat() as TrialUser[],
    [groupedByDay]
  );

  // -------------------------------------------------------------------------
  // Detail sheet: user activity query (unchanged)
  // -------------------------------------------------------------------------
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

  // -------------------------------------------------------------------------
  // Mutations (unchanged)
  // -------------------------------------------------------------------------
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
      // Get current trial_end from the user in our list
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

  // -------------------------------------------------------------------------
  // Conversion funnel stats
  // -------------------------------------------------------------------------
  const funnelStats = useMemo(() => {
    if (!trialUsers) return { started: 0, engaged: 0, featureUsed: 0, subscribed: 0 };
    const started = trialUsers.length;
    const engaged = trialUsers.filter(
      (u) => (u.login_count || 0) > 0 || (u.total_seconds_tracked || 0) > 60
    ).length;
    const featureUsed = trialUsers.filter((u) => (u.feature_use_count || 0) > 0).length;
    const subscribed = trialUsers.filter((u) => u.subscribed).length;
    return { started, engaged, featureUsed, subscribed };
  }, [trialUsers]);

  // -------------------------------------------------------------------------
  // Predicted conversion helper
  // -------------------------------------------------------------------------
  const getConversionDot = (user: TrialUser) => {
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

    let color: 'green' | 'amber' | 'red';
    if (expired || engScore < 25) {
      color = 'red';
    } else if (engScore > 55 && days > 2) {
      color = 'green';
    } else {
      color = 'amber';
    }

    const dotColors = {
      green: 'bg-green-400',
      amber: 'bg-amber-400',
      red: 'bg-red-400',
    };

    return <span className={`inline-block w-2 h-2 rounded-full ${dotColors[color]} shrink-0`} />;
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

  // -------------------------------------------------------------------------
  // Bulk email bar helpers
  // -------------------------------------------------------------------------
  const notEmailedCount = useMemo(
    () => flatUsers.filter((u) => !emailedTodayUserIds.has(u.id)).length,
    [flatUsers, emailedTodayUserIds]
  );

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-3 sm:space-y-4 pb-20">
        <AdminPageHeader
          title="Trials"
          subtitle="Free trial users & retention tracking"
          icon={Clock}
          iconColor="text-orange-400"
          iconBg="bg-orange-500/10 border-orange-500/20"
          accentColor="from-orange-500 via-amber-400 to-orange-500"
          onRefresh={() => refetch()}
          isRefreshing={baseFetching || enrichmentFetching}
        />

        {/* ================================================================
            0. CONVERSION FUNNEL
        ================================================================ */}
        {!isLoading && funnelStats.started > 0 && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4">
              <p className="text-xs font-semibold text-white uppercase tracking-wide mb-3">Conversion Funnel</p>
              <div className="flex items-end gap-1">
                {/* Trial Started */}
                <div className="flex-1 text-center">
                  <p className="text-lg font-bold text-blue-400">{funnelStats.started}</p>
                  <div className="h-2 rounded-l-full bg-blue-500/60 w-full" />
                  <p className="text-[10px] text-white mt-1">Started</p>
                  <p className="text-[10px] text-white">100%</p>
                </div>
                {/* Connector */}
                <div className="w-1.5 h-2 bg-white/10 shrink-0 -mb-[calc(0.25rem+10px+0.25rem+10px)]" />
                {/* Engaged */}
                <div className="flex-1 text-center">
                  <p className="text-lg font-bold text-green-400">{funnelStats.engaged}</p>
                  <div className="h-2 bg-green-500/60 w-full" />
                  <p className="text-[10px] text-white mt-1">Engaged</p>
                  <p className="text-[10px] text-white">
                    {funnelStats.started > 0 ? Math.round((funnelStats.engaged / funnelStats.started) * 100) : 0}%
                  </p>
                </div>
                {/* Connector */}
                <div className="w-1.5 h-2 bg-white/10 shrink-0 -mb-[calc(0.25rem+10px+0.25rem+10px)]" />
                {/* Feature Used */}
                <div className="flex-1 text-center">
                  <p className="text-lg font-bold text-amber-400">{funnelStats.featureUsed}</p>
                  <div className="h-2 bg-amber-500/60 w-full" />
                  <p className="text-[10px] text-white mt-1">Feature Used</p>
                  <p className="text-[10px] text-white">
                    {funnelStats.engaged > 0 ? Math.round((funnelStats.featureUsed / funnelStats.engaged) * 100) : 0}%
                  </p>
                </div>
                {/* Connector */}
                <div className="w-1.5 h-2 bg-white/10 shrink-0 -mb-[calc(0.25rem+10px+0.25rem+10px)]" />
                {/* Subscribed */}
                <div className="flex-1 text-center">
                  <p className="text-lg font-bold text-emerald-400">{funnelStats.subscribed}</p>
                  <div className="h-2 rounded-r-full bg-emerald-500/60 w-full" />
                  <p className="text-[10px] text-white mt-1">Subscribed</p>
                  <p className="text-[10px] text-white">
                    {funnelStats.featureUsed > 0 ? Math.round((funnelStats.subscribed / funnelStats.featureUsed) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ================================================================
            1. HERO STATS ��� Single Glass Card
        ================================================================ */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative overflow-hidden glass-premium rounded-2xl"
        >
          {/* 2px gradient accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 opacity-60" />
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-amber-500 via-orange-400 to-amber-500 opacity-[0.03] blur-3xl pointer-events-none" />

          <div className="relative z-10 p-4 sm:p-5">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Trials & Retention</h2>
                  <p className="text-2xl font-bold text-white">
                    <AnimatedCounter value={(stats.total_trials || 0) + (stats.converted || 0)} />
                    <span className="text-sm font-normal text-white ml-1.5">total</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={exportCSV}
                  className="h-11 w-11 p-0 touch-manipulation text-white"
                  title="Export CSV"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refetch()}
                  className="h-11 w-11 p-0 touch-manipulation text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mini stat grid */}
            <div className="grid grid-cols-4 gap-2">
              {/* Active */}
              <button
                className={`text-center p-2.5 rounded-xl bg-white/[0.04] touch-manipulation active:scale-[0.97] transition-transform ${statusFilter === 'active' ? 'ring-2 ring-amber-400' : ''}`}
                onClick={() => setStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
              >
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  {stats.ending_today > 0 && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                  <p className="text-lg font-bold text-white">
                    <AnimatedCounter value={stats.active} />
                  </p>
                </div>
                <p className="text-xs text-white">Active</p>
              </button>

              {/* Converted */}
              <button
                className={`text-center p-2.5 rounded-xl bg-white/[0.04] touch-manipulation active:scale-[0.97] transition-transform ${statusFilter === 'subscribed' ? 'ring-2 ring-amber-400' : ''}`}
                onClick={() =>
                  setStatusFilter(statusFilter === 'subscribed' ? 'all' : 'subscribed')
                }
              >
                <p className="text-lg font-bold text-white mb-0.5">
                  <AnimatedCounter value={stats.converted} />
                </p>
                <p className="text-xs text-white">Converted</p>
              </button>

              {/* Expired */}
              <button
                className={`text-center p-2.5 rounded-xl bg-white/[0.04] touch-manipulation active:scale-[0.97] transition-transform ${statusFilter === 'expired' ? 'ring-2 ring-amber-400' : ''}`}
                onClick={() => setStatusFilter(statusFilter === 'expired' ? 'all' : 'expired')}
              >
                <p className="text-lg font-bold text-white mb-0.5">
                  <AnimatedCounter value={stats.expired} />
                </p>
                <p className="text-xs text-white">Expired</p>
              </button>

              {/* CVR */}
              <button
                className={`text-center p-2.5 rounded-xl bg-white/[0.04] touch-manipulation active:scale-[0.97] transition-transform ${statusFilter === 'all' && engagementFilter === 'all' ? 'ring-2 ring-amber-400' : ''}`}
                onClick={() => {
                  setStatusFilter('all');
                  setEngagementFilter('all');
                }}
              >
                <p className="text-lg font-bold text-white mb-0.5">{stats.conversion_rate}%</p>
                <p className="text-xs text-white">CVR</p>
              </button>
            </div>
          </div>
        </motion.section>

        {/* ================================================================
            2. SEARCH + FILTERS
        ================================================================ */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="space-y-2"
        >
          {/* Search + action buttons */}
          <div className="flex items-center gap-2">
            <AdminSearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search users..."
              className="flex-1"
            />
            {hiddenUserIds.size > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={unhideAllUsers}
                className="h-11 px-2.5 touch-manipulation text-white border-white/20"
              >
                <Eye className="h-4 w-4" />
                <span className="ml-1">{hiddenUserIds.size}</span>
              </Button>
            )}
          </div>
          {/* Filter dropdowns */}
          <div className="grid grid-cols-3 gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 touch-manipulation text-xs sm:text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                <SelectItem value="all" className="h-11">
                  All Status
                </SelectItem>
                <SelectItem value="ending_today" className="h-11">
                  Ending Today
                </SelectItem>
                <SelectItem value="ending_tomorrow" className="h-11">
                  Ending Tomorrow
                </SelectItem>
                <SelectItem value="active" className="h-11">
                  Active
                </SelectItem>
                <SelectItem value="expired" className="h-11">
                  Expired
                </SelectItem>
                <SelectItem value="subscribed" className="h-11">
                  Subscribed
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={engagementFilter} onValueChange={setEngagementFilter}>
              <SelectTrigger className="h-11 touch-manipulation text-xs sm:text-sm">
                <SelectValue placeholder="Lead" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                <SelectItem value="all" className="h-11">
                  All Leads
                </SelectItem>
                <SelectItem value="hot" className="h-11">
                  Hot ({stats.hot_leads})
                </SelectItem>
                <SelectItem value="warm" className="h-11">
                  Warm ({stats.warm_leads})
                </SelectItem>
                <SelectItem value="cold" className="h-11">
                  Cold ({stats.cold_leads})
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-11 touch-manipulation text-xs sm:text-sm">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                <SelectItem value="all" className="h-11">
                  All Roles
                </SelectItem>
                <SelectItem value="apprentice" className="h-11">
                  Apprentice
                </SelectItem>
                <SelectItem value="electrician" className="h-11">
                  Electrician
                </SelectItem>
                <SelectItem value="employer" className="h-11">
                  Employer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* ================================================================
            4. BULK EMAIL BAR
        ================================================================ */}
        {flatUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-premium rounded-2xl overflow-hidden relative sticky top-0 z-20"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 opacity-60" />
            <div className="relative z-10 px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-white">
                <span className="font-semibold">{flatUsers.length}</span> users shown
                {notEmailedCount > 0 && (
                  <>
                    {' '}
                    &middot; <span className="font-semibold text-amber-400">
                      {notEmailedCount}
                    </span>{' '}
                    not emailed
                  </>
                )}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-11 px-3 touch-manipulation gap-1.5 text-white border-white/20"
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
              >
                <MailPlus className="h-4 w-4" />
                Email All
              </Button>
            </div>
          </motion.div>
        )}

        {/* ================================================================
            5. USER LIST — Flat (no day grouping)
        ================================================================ */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-premium rounded-2xl overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 opacity-60" />
                <div className="relative z-10 p-4">
                  <div className="h-16 bg-white/[0.04] rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : flatUsers.length === 0 ? (
          <div className="glass-premium rounded-2xl overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 opacity-60" />
            <div className="relative z-10 p-6">
              <AdminEmptyState
                icon={Users}
                title="No trial users found"
                description="Trial users matching your filters will appear here."
              />
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1.5"
          >
            {flatUsers.map((user) => {
              const level = getEngagementLevel(user.engagement_score);
              const borderClass = ENGAGEMENT_BORDER[level];

              return (
                <motion.div
                  key={user.id}
                  variants={listItemVariants}
                  className={`glass-premium rounded-2xl overflow-hidden relative border-l-4 ${borderClass} touch-manipulation active:scale-[0.97] transition-transform cursor-pointer`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="px-3 py-3 sm:px-4">
                    <div className="flex items-center gap-3">
                      {/* Role icon */}
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center shrink-0">
                        {getRoleIcon(user.role)}
                      </div>

                      {/* Name + meta */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-sm text-white truncate">
                            {user.full_name || 'Unknown'}
                          </p>
                          {getConversionDot(user)}
                          {emailedTodayUserIds.has(user.id) && (
                            <CheckCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-white truncate">
                            {getStatusText(user)} &middot; {relativeTime(user.last_active_date)}
                          </p>
                          <ActivityHeatmap counts={user.daily_heatmap || [0, 0, 0, 0, 0, 0, 0]} />
                        </div>
                      </div>

                      {/* Quick Extend */}
                      {!user.subscribed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 rounded-lg text-[10px] font-bold bg-green-500/10 text-green-400 ring-1 ring-green-500/20 touch-manipulation shrink-0 hover:bg-green-500/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            quickExtendMutation.mutate(user.id);
                          }}
                          disabled={quickExtendMutation.isPending}
                        >
                          <Plus className="h-3 w-3 mr-0.5" />
                          7d
                        </Button>
                      )}

                      {/* Score */}
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-white leading-none">
                          {user.engagement_score || 0}
                        </p>
                        <p className="text-[10px] text-white uppercase tracking-wide">score</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ================================================================
            6. USER DETAIL SHEET
        ================================================================ */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                    {getRoleIcon(selectedUser?.role || null)}
                  </div>
                  <div>
                    <p className="text-left">{selectedUser?.full_name}</p>
                    <p className="text-sm font-normal text-white">@{selectedUser?.username}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Time to First Value */}
                {firstAction && (
                  <div className="glass-premium rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 opacity-60" />
                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <Rocket className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-green-400 font-medium">Time to First Value</p>
                          <p className="text-xl font-bold text-white">{timeToFirstValue}</p>
                          <p className="text-xs text-white mt-0.5">
                            First action: {firstAction.action_detail}
                          </p>
                        </div>
                        <div className="text-right">
                          <Target className="h-5 w-5 text-green-400 mb-1" />
                          <p className="text-xs text-white">
                            {format(parseISO(firstAction.created_at), 'dd MMM HH:mm')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Activity Summary */}
                {scoreBreakdown &&
                  (scoreBreakdown.timeSpentMinutes > 0 ||
                    scoreBreakdown.pageViews > 0 ||
                    scoreBreakdown.loginCount > 0) && (
                    <div className="glass-premium rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500 opacity-60" />
                      <div className="relative z-10 p-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <Timer className="h-5 w-5 text-teal-400 mx-auto mb-1" />
                            <p className="text-lg font-bold text-white">
                              {formatTimeSpent(scoreBreakdown.totalSecondsTracked || 0)}
                            </p>
                            <p className="text-xs text-white">Time in App</p>
                          </div>
                          <div>
                            <Eye className="h-5 w-5 text-sky-400 mx-auto mb-1" />
                            <p className="text-lg font-bold text-white">
                              {scoreBreakdown.pageViews || 0}
                            </p>
                            <p className="text-xs text-white">Pages Visited</p>
                          </div>
                          <div>
                            <LogIn className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                            <p className="text-lg font-bold text-white">
                              {scoreBreakdown.loginCount || 0}
                            </p>
                            <p className="text-xs text-white">Logins</p>
                          </div>
                        </div>
                        {scoreBreakdown.activeDays > 0 && (
                          <p className="text-xs text-center text-white mt-2">
                            Active on {scoreBreakdown.activeDays} day
                            {scoreBreakdown.activeDays !== 1 ? 's' : ''} in the last 30 days
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                {/* No Activity Warning */}
                {!activityLoading && !firstAction && !scoreBreakdown?.loginCount && (
                  <div className="glass-premium rounded-2xl overflow-hidden relative">
                    <div
                      className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${selectedUser?.last_sign_in_at ? 'from-amber-500 via-orange-400 to-amber-500' : 'from-blue-500 via-cyan-400 to-blue-500'} opacity-60`}
                    />
                    <div className="relative z-10 p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${selectedUser?.last_sign_in_at ? 'bg-amber-500/20' : 'bg-blue-500/20'} flex items-center justify-center`}
                        >
                          {selectedUser?.last_sign_in_at ? (
                            <LogIn className="h-6 w-6 text-amber-400" />
                          ) : (
                            <Snowflake className="h-6 w-6 text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          {selectedUser?.last_sign_in_at ? (
                            <>
                              <p className="text-xs text-amber-400 font-medium">
                                Logged In But No Tracked Activity
                              </p>
                              <p className="text-sm font-semibold text-white">
                                Last login:{' '}
                                {formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), {
                                  addSuffix: true,
                                })}
                              </p>
                              <p className="text-xs text-white mt-0.5">
                                Activity tracking started recently - older sessions not captured
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-xs text-blue-400 font-medium">Never Logged In</p>
                              <p className="text-sm font-semibold text-white">
                                User hasn't returned since signup
                              </p>
                              <p className="text-xs text-white mt-0.5">
                                Signed up{' '}
                                {selectedUser?.created_at &&
                                  formatDistanceToNow(parseISO(selectedUser.created_at), {
                                    addSuffix: true,
                                  })}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trial Status */}
                <div className="glass-premium rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 opacity-60" />
                  <div className="relative z-10 p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Timer className="h-4 w-4 text-yellow-400" />
                      Trial Status
                    </h3>
                    <div className="flex justify-between items-center min-h-[44px]">
                      <span className="text-sm text-white">Status</span>
                      {selectedUser &&
                        getStatusBadge(selectedUser.trial_status, selectedUser.days_remaining)}
                    </div>
                    <div className="flex justify-between items-center min-h-[44px]">
                      <span className="text-sm text-white">Signed Up</span>
                      <span className="text-sm text-white">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center min-h-[44px]">
                      <span className="text-sm text-white">Trial Ends</span>
                      <span className="text-sm text-white">
                        {selectedUser?.trial_ends &&
                          format(parseISO(selectedUser.trial_ends), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center min-h-[44px]">
                      <span className="text-sm text-white">Role</span>
                      <Badge className={getRoleBadgeColor(selectedUser?.role || null)}>
                        <span className="capitalize">{selectedUser?.role || 'Visitor'}</span>
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Engagement Score Breakdown */}
                <div className="glass-premium rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 opacity-60" />
                  <div className="relative z-10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-400" />
                        Engagement Score Breakdown
                      </h3>
                      {selectedUser && getEngagementBadge(selectedUser.engagement_score)}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <Timer className="h-3.5 w-3.5 text-teal-400" />
                          Time in App ({scoreBreakdown?.timeSpentMinutes || 0}m x 0.5, max 30)
                        </span>
                        <span
                          className={`font-medium ${(scoreBreakdown?.timeBonus || 0) > 0 ? 'text-teal-400' : 'text-white'}`}
                        >
                          +{scoreBreakdown?.timeBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <Eye className="h-3.5 w-3.5 text-sky-400" />
                          Pages Visited ({scoreBreakdown?.pageViews || 0} unique, max 20)
                        </span>
                        <span
                          className={`font-medium ${(scoreBreakdown?.pageViewBonus || 0) > 0 ? 'text-sky-400' : 'text-white'}`}
                        >
                          +{scoreBreakdown?.pageViewBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <LogIn className="h-3.5 w-3.5 text-cyan-400" />
                          Logins ({scoreBreakdown?.loginCount || 0} x 2, max 10)
                        </span>
                        <span
                          className={`font-medium ${(scoreBreakdown?.loginBonus || 0) > 0 ? 'text-cyan-400' : 'text-white'}`}
                        >
                          +{scoreBreakdown?.loginBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-pink-400" />
                          Features Used ({scoreBreakdown?.featureUseCount || 0} x 3)
                        </span>
                        <span
                          className={`font-medium ${(scoreBreakdown?.featureBonus || 0) > 0 ? 'text-pink-400' : 'text-white'}`}
                        >
                          +{scoreBreakdown?.featureBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <Star className="h-3.5 w-3.5 text-amber-400" />
                          Base Points
                        </span>
                        <span className="font-medium text-white">
                          {scoreBreakdown?.points || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <Flame className="h-3.5 w-3.5 text-orange-400" />
                          Streak ({scoreBreakdown?.streak || 0} days x 5)
                        </span>
                        <span className="font-medium text-orange-400">
                          +{scoreBreakdown?.streakBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 text-yellow-400" />
                          Study Sessions ({scoreBreakdown?.studySessions || 0} x 3)
                        </span>
                        <span className="font-medium text-yellow-400">
                          +{scoreBreakdown?.studyBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <Receipt className="h-3.5 w-3.5 text-green-400" />
                          Quotes ({scoreBreakdown?.quotes || 0} x 8)
                        </span>
                        <span className="font-medium text-green-400">
                          +{scoreBreakdown?.quotesBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                        <span className="text-white flex items-center gap-2">
                          <ClipboardCheck className="h-3.5 w-3.5 text-yellow-400" />
                          Certificates ({scoreBreakdown?.eics || 0} x 10)
                        </span>
                        <span className="font-medium text-yellow-400">
                          +{scoreBreakdown?.eicsBonus || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 bg-white/[0.04] rounded-lg px-2 mt-2">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <Target className="h-4 w-4 text-white" />
                          Total Score
                        </span>
                        <span className="text-lg font-bold text-white">
                          {scoreBreakdown?.total || selectedUser?.engagement_score || 0}
                        </span>
                      </div>
                    </div>

                    {/* Last Active / Last Login */}
                    <div className="pt-2 border-t border-border/50 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white flex items-center gap-1.5">
                          <LogIn className="h-3.5 w-3.5" />
                          Last Login
                        </span>
                        <span className="text-sm text-white">
                          {selectedUser?.last_sign_in_at
                            ? formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), {
                                addSuffix: true,
                              })
                            : 'Never'}
                        </span>
                      </div>
                      {selectedUser?.email && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" />
                            Email
                          </span>
                          <span className="text-xs text-white truncate max-w-[180px]">
                            {selectedUser.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="glass-premium rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-60" />
                  <div className="relative z-10 p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Send className="h-4 w-4 text-blue-400" />
                      Actions
                    </h3>
                    {selectedUser && emailedTodayUserIds.has(selectedUser.id) ? (
                      <Button
                        className="w-full gap-2 h-12 touch-manipulation bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        variant="outline"
                        disabled
                      >
                        <CheckCheck className="h-4 w-4" />
                        Email Sent Today
                      </Button>
                    ) : (
                      <Button
                        className="w-full gap-2 h-12 touch-manipulation bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
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
                        Send Trial Reminder
                      </Button>
                    )}
                    <Button
                      className="w-full gap-2 h-12 touch-manipulation text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      variant="ghost"
                      onClick={() => {
                        if (selectedUser) {
                          hideUserMutation.mutate(selectedUser.id);
                        }
                      }}
                      disabled={hideUserMutation.isPending}
                    >
                      <XCircle className="h-4 w-4" />
                      Remove from List
                    </Button>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="glass-premium rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 opacity-60" />
                  <div className="relative z-10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <FileText className="h-4 w-4 text-cyan-400" />
                        Activity Timeline
                      </h3>
                      <Badge variant="outline" className="text-xs text-white border-white/20">
                        {userActivity?.length || 0} actions
                      </Badge>
                    </div>

                    {activityLoading ? (
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-white/[0.04] rounded-lg animate-pulse" />
                        ))}
                      </div>
                    ) : !userActivity || userActivity.length === 0 ? (
                      <div className="text-center py-6">
                        <Snowflake className="h-8 w-8 text-blue-400 mx-auto mb-2 opacity-50" />
                        <p className="text-sm text-white">No activity recorded yet</p>
                        <p className="text-xs text-white mt-1">User hasn't used any features</p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {userActivity.map((activity) => {
                          const { icon: Icon, color, bg } = getActivityIcon(activity.action_type);
                          return (
                            <div
                              key={activity.id}
                              className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.04] transition-colors"
                            >
                              <div
                                className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}
                              >
                                <Icon className={`h-4 w-4 ${color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {activity.action_detail}
                                </p>
                                {activity.extra_info && (
                                  <p className="text-xs text-white truncate">
                                    {activity.extra_info}
                                  </p>
                                )}
                                <p className="text-xs text-white mt-0.5">
                                  {formatDistance(parseISO(activity.created_at), new Date(), {
                                    addSuffix: true,
                                  })}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Info */}
                <div className="glass-premium rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 opacity-60" />
                  <div className="relative z-10 p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Users className="h-4 w-4 text-yellow-400" />
                      Account Info
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">User ID</span>
                      <span className="text-xs font-mono text-white truncate max-w-[180px]">
                        {selectedUser?.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Time on Platform</span>
                      <span className="text-sm text-white">
                        {selectedUser?.created_at &&
                          formatDistanceToNow(parseISO(selectedUser.created_at))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}

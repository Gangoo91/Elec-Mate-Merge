import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Calendar,
  Mail,
  ChevronRight,
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
} from "lucide-react";
import { format, formatDistanceToNow, isToday, isTomorrow, parseISO, startOfDay, addDays, formatDistance } from "date-fns";
import AdminSearchInput from "@/components/admin/AdminSearchInput";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { toast } from "sonner";

interface TrialUser {
  id: string;
  full_name: string;
  username: string;
  role: string | null;
  subscribed: boolean;
  created_at: string;
  signup_date: string;
  trial_ends: string;
  trial_status: "active" | "ending_today" | "ending_tomorrow" | "expired" | "subscribed";
  days_remaining: number;
  // Engagement data
  email?: string | null;
  last_sign_in_at?: string | null; // From auth - when they actually logged in
  points?: number;
  streak?: number;
  last_active_date?: string | null; // Combined: user_activity or last_sign_in
  study_sessions?: number;
  quotes_count?: number;
  eic_count?: number;
  engagement_score?: number;
  // Time to first value
  first_action_at?: string;
  first_action_type?: string;
  time_to_first_value?: number; // minutes from signup to first action
  // Hidden from list
  hidden?: boolean;
  // Real activity tracking from user_events
  login_count?: number;
  page_view_count?: number;
  feature_use_count?: number;
  total_seconds_tracked?: number;
  unique_pages_visited?: number;
  active_days?: number;
}

interface ActivityItem {
  id: string;
  action_type: "quote" | "eic" | "study" | "time_track" | "login" | "points" | "profile" | "streak" | "page_view" | "session" | "feature";
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

// Max days to show expired trials (filter out older ones) - set to 365 to show all
const MAX_EXPIRED_DAYS = 365;

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

// Static role styles
const ROLE_BADGE_COLORS: Record<string, string> = {
  apprentice: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  electrician: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  employer: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  default: "bg-gray-500/20 text-gray-400",
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ending_today: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
  ending_tomorrow: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
  expired: { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30" },
  active: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
  subscribed: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
};

const getRoleBadgeColor = (role: string | null): string =>
  ROLE_BADGE_COLORS[role || ""] || ROLE_BADGE_COLORS.default;

const getRoleIcon = (role: string | null) => {
  switch (role) {
    case "apprentice":
      return <GraduationCap className="h-4 w-4 text-purple-400" />;
    case "electrician":
      return <Zap className="h-4 w-4 text-yellow-400" />;
    case "employer":
      return <Briefcase className="h-4 w-4 text-blue-400" />;
    default:
      return <Users className="h-4 w-4 text-gray-400" />;
  }
};

const getStatusBadge = (status: string, daysRemaining: number) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.active;

  let label = "";
  let icon = null;

  switch (status) {
    case "ending_today":
      label = "Ends Today";
      icon = <AlertTriangle className="h-3 w-3" />;
      break;
    case "ending_tomorrow":
      label = "Ends Tomorrow";
      icon = <Clock className="h-3 w-3" />;
      break;
    case "expired":
      label = "Expired";
      icon = <XCircle className="h-3 w-3" />;
      break;
    case "subscribed":
      label = "Subscribed";
      icon = <Crown className="h-3 w-3" />;
      break;
    default:
      label = `${daysRemaining} days left`;
      icon = <Timer className="h-3 w-3" />;
  }

  return (
    <Badge className={`${colors.bg} ${colors.text} ${colors.border} text-xs flex items-center gap-1`}>
      {icon}
      {label}
    </Badge>
  );
};

// Activity type icon and colors
const getActivityIcon = (type: ActivityItem["action_type"]) => {
  switch (type) {
    case "quote":
      return { icon: Receipt, color: "text-green-400", bg: "bg-green-500/20" };
    case "eic":
      return { icon: ClipboardCheck, color: "text-yellow-400", bg: "bg-yellow-500/20" };
    case "study":
      return { icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/20" };
    case "time_track":
      return { icon: Timer, color: "text-blue-400", bg: "bg-blue-500/20" };
    case "login":
      return { icon: LogIn, color: "text-cyan-400", bg: "bg-cyan-500/20" };
    case "points":
      return { icon: Star, color: "text-amber-400", bg: "bg-amber-500/20" };
    case "streak":
      return { icon: Flame, color: "text-orange-400", bg: "bg-orange-500/20" };
    case "profile":
      return { icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/20" };
    case "page_view":
      return { icon: Eye, color: "text-sky-400", bg: "bg-sky-500/20" };
    case "session":
      return { icon: Timer, color: "text-teal-400", bg: "bg-teal-500/20" };
    case "feature":
      return { icon: Zap, color: "text-pink-400", bg: "bg-pink-500/20" };
    default:
      return { icon: Activity, color: "text-gray-400", bg: "bg-gray-500/20" };
  }
};

// Format seconds into human readable time
const formatTimeSpent = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Engagement thresholds - lowered to be more realistic
const ENGAGEMENT_HOT = 15;
const ENGAGEMENT_WARM = 5;

// Engagement level badge - Hot, Warm, Cold based on activity score
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

export default function AdminTrials() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [engagementFilter, setEngagementFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<TrialUser | null>(null);
  const queryClient = useQueryClient();

  // Track hidden user IDs in local state (persisted via localStorage)
  const [hiddenUserIds, setHiddenUserIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("admin-hidden-trial-users");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Fetch trial users with computed status and engagement data
  const { data: trialUsers, isLoading, refetch } = useQuery({
    queryKey: ["admin-trial-users", statusFilter, roleFilter],
    queryFn: async () => {
      // Fetch users with auth data (includes last_sign_in) via admin edge function
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke("admin-get-users");

      if (edgeError) {
        console.error("Edge function error:", edgeError);
        throw edgeError;
      }

      const users = edgeData?.users || [];

      // Create auth data map for last_sign_in
      const authDataMap = new Map<string, { last_sign_in: string | null; email: string | null }>();
      users.forEach((u: any) => {
        authDataMap.set(u.id, {
          last_sign_in: u.last_sign_in,
          email: u.email,
        });
      });

      // Fetch user_activity separately
      const { data: activityData } = await supabase
        .from("user_activity")
        .select("user_id, points, streak, last_active_date");

      const activityMap = new Map<string, { points: number; streak: number; last_active_date: string | null }>();
      activityData?.forEach((a: any) => {
        activityMap.set(a.user_id, {
          points: a.points || 0,
          streak: a.streak || 0,
          last_active_date: a.last_active_date,
        });
      });

      // Fetch quotes count per user
      const { data: quotesData } = await supabase
        .from("quotes")
        .select("user_id");

      const quotesCountMap = new Map<string, number>();
      quotesData?.forEach((q: { user_id: string }) => {
        quotesCountMap.set(q.user_id, (quotesCountMap.get(q.user_id) || 0) + 1);
      });

      // Fetch EIC schedules count per user
      const { data: eicData } = await supabase
        .from("eic_schedules")
        .select("user_id");

      const eicCountMap = new Map<string, number>();
      eicData?.forEach((e: { user_id: string }) => {
        eicCountMap.set(e.user_id, (eicCountMap.get(e.user_id) || 0) + 1);
      });

      // Fetch study sessions count per user
      const { data: studyData } = await supabase
        .from("study_sessions")
        .select("user_id");

      const studyCountMap = new Map<string, number>();
      studyData?.forEach((s: { user_id: string }) => {
        studyCountMap.set(s.user_id, (studyCountMap.get(s.user_id) || 0) + 1);
      });

      // Fetch user_events summary (NEW - real activity tracking)
      const { data: eventSummaryData } = await supabase
        .from("user_activity_summary")
        .select("*");

      const eventSummaryMap = new Map<string, UserEventSummary>();
      eventSummaryData?.forEach((e: any) => {
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

      // Calculate trial status and engagement client-side
      const today = startOfDay(new Date());
      const maxExpiredDate = addDays(today, -MAX_EXPIRED_DAYS);

      return users.filter((user: any) => {
        // Filter out users whose trial expired more than MAX_EXPIRED_DAYS ago
        const createdAt = parseISO(user.created_at);
        const trialEnds = addDays(createdAt, 7);
        const trialEndsDate = startOfDay(trialEnds);
        // Keep if subscribed, or trial hasn't expired, or expired within MAX_EXPIRED_DAYS
        return user.subscribed || trialEndsDate >= maxExpiredDate;
      }).map((user: any) => {
        const createdAt = parseISO(user.created_at);
        const trialEnds = addDays(createdAt, 7);
        const trialEndsDate = startOfDay(trialEnds);
        const daysRemaining = Math.ceil((trialEndsDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        let trialStatus: TrialUser["trial_status"] = "active";
        if (user.subscribed) {
          trialStatus = "subscribed";
        } else if (daysRemaining < 0) {
          trialStatus = "expired";
        } else if (daysRemaining === 0) {
          trialStatus = "ending_today";
        } else if (daysRemaining === 1) {
          trialStatus = "ending_tomorrow";
        }

        // Get activity data from map
        const activity = activityMap.get(user.id) || { points: 0, streak: 0, last_active_date: null };
        const authData = authDataMap.get(user.id) || { last_sign_in: null, email: null };
        const eventSummary = eventSummaryMap.get(user.id);
        const points = activity.points;
        const streak = activity.streak;
        const quotesCount = quotesCountMap.get(user.id) || 0;
        const eicCount = eicCountMap.get(user.id) || 0;
        const studySessions = studyCountMap.get(user.id) || 0;

        // Calculate engagement score with REAL activity data
        // Time spent in app now counts! Each minute = 0.5 points (capped at 30)
        const timeSpentMinutes = Math.floor((eventSummary?.total_seconds_tracked || 0) / 60);
        const timeBonus = Math.min(30, Math.floor(timeSpentMinutes * 0.5));

        // Page views count - each unique page = 1 point (capped at 20)
        const pageViewBonus = Math.min(20, eventSummary?.unique_pages_visited || 0);

        // Login count - each login = 2 points (capped at 10)
        const loginBonus = Math.min(10, (eventSummary?.login_count || 0) * 2);

        // Feature usage - each feature = 3 points
        const featureBonus = (eventSummary?.feature_use_count || 0) * 3;

        const engagementScore =
          points +
          (streak * 5) +
          (studySessions * 3) +
          (quotesCount * 8) +
          (eicCount * 10) +
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
          signup_date: format(createdAt, "yyyy-MM-dd"),
          trial_ends: format(trialEnds, "yyyy-MM-dd"),
          trial_status: trialStatus,
          days_remaining: Math.max(0, daysRemaining),
          points,
          streak,
          last_active_date: eventSummary?.last_activity || activity.last_active_date || authData.last_sign_in,
          study_sessions: studySessions,
          quotes_count: quotesCount,
          eic_count: eicCount,
          engagement_score: engagementScore,
          // New activity tracking data
          login_count: eventSummary?.login_count || 0,
          page_view_count: eventSummary?.page_view_count || 0,
          feature_use_count: eventSummary?.feature_use_count || 0,
          total_seconds_tracked: eventSummary?.total_seconds_tracked || 0,
          unique_pages_visited: eventSummary?.unique_pages_visited || 0,
          active_days: eventSummary?.active_days || 0,
        } as TrialUser;
      });
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Auto-refresh every minute
  });

  // Calculate stats
  const stats = useMemo<TrialStats>(() => {
    if (!trialUsers) {
      return {
        total_trials: 0,
        ending_today: 0,
        ending_tomorrow: 0,
        expired: 0,
        active: 0,
        converted: 0,
        conversion_rate: "0",
        hot_leads: 0,
        warm_leads: 0,
        cold_leads: 0,
      };
    }

    const nonSubscribed = trialUsers.filter(u => !u.subscribed);
    const subscribed = trialUsers.filter(u => u.subscribed);

    // Calculate engagement levels for non-expired, non-subscribed
    const activeTrials = nonSubscribed.filter(u => u.trial_status !== "expired");
    const hotLeads = activeTrials.filter(u => (u.engagement_score || 0) >= ENGAGEMENT_HOT).length;
    const warmLeads = activeTrials.filter(u => (u.engagement_score || 0) >= ENGAGEMENT_WARM && (u.engagement_score || 0) < ENGAGEMENT_HOT).length;
    const coldLeads = activeTrials.filter(u => (u.engagement_score || 0) < ENGAGEMENT_WARM).length;

    return {
      total_trials: nonSubscribed.length,
      ending_today: nonSubscribed.filter(u => u.trial_status === "ending_today").length,
      ending_tomorrow: nonSubscribed.filter(u => u.trial_status === "ending_tomorrow").length,
      expired: nonSubscribed.filter(u => u.trial_status === "expired").length,
      active: nonSubscribed.filter(u => u.trial_status === "active").length,
      converted: subscribed.length,
      conversion_rate: trialUsers.length > 0
        ? ((subscribed.length / trialUsers.length) * 100).toFixed(1)
        : "0",
      hot_leads: hotLeads,
      warm_leads: warmLeads,
      cold_leads: coldLeads,
    };
  }, [trialUsers]);

  // Group users by signup day
  const groupedByDay = useMemo(() => {
    if (!trialUsers) return {};

    // Filter based on status - if "subscribed" show converted users, otherwise show non-subscribed
    let filtered = statusFilter === "subscribed"
      ? trialUsers.filter(u => u.subscribed && !hiddenUserIds.has(u.id))
      : trialUsers.filter(u => !u.subscribed && !hiddenUserIds.has(u.id));

    // Apply status filter (only for non-subscribed statuses)
    if (statusFilter !== "all" && statusFilter !== "subscribed") {
      filtered = filtered.filter(u => u.trial_status === statusFilter);
    }

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    // Apply engagement filter
    if (engagementFilter !== "all") {
      filtered = filtered.filter(u => {
        const score = u.engagement_score || 0;
        if (engagementFilter === "hot") return score >= ENGAGEMENT_HOT;
        if (engagementFilter === "warm") return score >= ENGAGEMENT_WARM && score < ENGAGEMENT_HOT;
        if (engagementFilter === "cold") return score < ENGAGEMENT_WARM;
        return true;
      });
    }

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        u => u.full_name?.toLowerCase().includes(searchLower) ||
             u.username?.toLowerCase().includes(searchLower)
      );
    }

    // Group by trial_ends date (expiring soonest first)
    const groups: Record<string, TrialUser[]> = {};
    filtered.forEach(user => {
      const date = user.trial_ends;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(user);
    });

    // Sort by trial end date ascending (expiring soonest first)
    // Within each group, sort by engagement score descending (hottest first)
    const sortedEntries = Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, users]) => [
        date,
        users.sort((a, b) => (b.engagement_score || 0) - (a.engagement_score || 0))
      ]);

    return Object.fromEntries(sortedEntries);
  }, [trialUsers, statusFilter, roleFilter, engagementFilter, search, hiddenUserIds]);

  // Fetch detailed activity for selected user
  const { data: userActivityData, isLoading: activityLoading } = useQuery({
    queryKey: ["admin-user-activity", selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser?.id) return { activities: [], firstAction: null, scoreBreakdown: null };

      const activities: ActivityItem[] = [];

      // Fetch user_activity data (points, streak, etc.)
      // Use maybeSingle() instead of single() to handle missing rows gracefully
      const { data: userActivityRecord } = await supabase
        .from("user_activity")
        .select("*")
        .eq("user_id", selectedUser.id)
        .maybeSingle();

      // Get real activity data from user_events
      const { data: eventSummary } = await supabase
        .from("user_activity_summary")
        .select("*")
        .eq("user_id", selectedUser.id)
        .maybeSingle();

      // Calculate bonuses from real activity
      const timeSpentMinutes = Math.floor((eventSummary?.total_seconds_tracked || 0) / 60);
      const timeBonus = Math.min(30, Math.floor(timeSpentMinutes * 0.5));
      const pageViewBonus = Math.min(20, eventSummary?.unique_pages_visited || 0);
      const loginBonus = Math.min(10, (eventSummary?.login_count || 0) * 2);
      const featureBonus = (eventSummary?.feature_use_count || 0) * 3;

      // Calculate score breakdown
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
        // New real activity metrics
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

      // If user has points, add as activity
      if (userActivityRecord?.points && userActivityRecord.points > 0) {
        activities.push({
          id: `points-${selectedUser.id}`,
          action_type: "points",
          action_detail: `Earned ${userActivityRecord.points} points`,
          extra_info: userActivityRecord.last_active_date
            ? `Last active: ${format(parseISO(userActivityRecord.last_active_date), "dd MMM")}`
            : undefined,
          created_at: userActivityRecord.updated_at || userActivityRecord.last_active_date || selectedUser.created_at,
        });
      }

      // If user has streak, add as activity
      if (userActivityRecord?.streak && userActivityRecord.streak > 0) {
        activities.push({
          id: `streak-${selectedUser.id}`,
          action_type: "streak",
          action_detail: `${userActivityRecord.streak} day streak`,
          extra_info: `+${userActivityRecord.streak * 5} bonus points`,
          created_at: userActivityRecord.last_active_date || selectedUser.created_at,
        });
      }

      // Fetch quotes
      const { data: quotes } = await supabase
        .from("quotes")
        .select("id, quote_number, total, status, created_at")
        .eq("user_id", selectedUser.id)
        .order("created_at", { ascending: false });

      scoreBreakdown.quotes = quotes?.length || 0;
      scoreBreakdown.quotesBonus = scoreBreakdown.quotes * 8;

      quotes?.forEach((q: any) => {
        activities.push({
          id: `quote-${q.id}`,
          action_type: "quote",
          action_detail: `Created ${q.status === "approved" ? "invoice" : "quote"} #${q.quote_number}`,
          extra_info: `£${parseFloat(q.total).toFixed(2)}`,
          created_at: q.created_at,
        });
      });

      // Fetch EIC schedules
      const { data: eics } = await supabase
        .from("eic_schedules")
        .select("id, installation_address, status, created_at")
        .eq("user_id", selectedUser.id)
        .order("created_at", { ascending: false });

      scoreBreakdown.eics = eics?.length || 0;
      scoreBreakdown.eicsBonus = scoreBreakdown.eics * 10;

      eics?.forEach((e: any) => {
        activities.push({
          id: `eic-${e.id}`,
          action_type: "eic",
          action_detail: "Created EIC certificate",
          extra_info: e.installation_address?.substring(0, 30) || "No address",
          created_at: e.created_at,
        });
      });

      // Fetch study sessions
      const { data: sessions } = await supabase
        .from("study_sessions")
        .select("id, course_slug, activity, resource_type, duration, created_at")
        .eq("user_id", selectedUser.id)
        .order("created_at", { ascending: false });

      scoreBreakdown.studySessions = sessions?.length || 0;
      scoreBreakdown.studyBonus = scoreBreakdown.studySessions * 3;

      sessions?.forEach((s: any) => {
        activities.push({
          id: `study-${s.id}`,
          action_type: "study",
          action_detail: s.activity || s.resource_type || "Study session",
          extra_info: s.course_slug ? `Course: ${s.course_slug}` : undefined,
          created_at: s.created_at,
        });
      });

      // Fetch time tracking
      const { data: timeTracks } = await supabase
        .from("time_tracking_sessions")
        .select("id, activity_type, duration, course_slug, created_at")
        .eq("user_id", selectedUser.id)
        .order("created_at", { ascending: false });

      timeTracks?.forEach((t: any) => {
        activities.push({
          id: `time-${t.id}`,
          action_type: "time_track",
          action_detail: `Logged ${t.duration || 0} mins`,
          extra_info: t.activity_type || t.course_slug,
          created_at: t.created_at,
        });
      });

      // Fetch real user_events (page views, logins, feature use)
      const { data: userEvents } = await supabase
        .from("user_events")
        .select("id, event_type, event_name, page_path, created_at")
        .eq("user_id", selectedUser.id)
        .in("event_type", ["login", "page_view", "feature_use", "session_start"])
        .order("created_at", { ascending: false })
        .limit(50);

      userEvents?.forEach((e: any) => {
        if (e.event_type === "login") {
          activities.push({
            id: `event-${e.id}`,
            action_type: "login",
            action_detail: "Logged in",
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === "page_view") {
          activities.push({
            id: `event-${e.id}`,
            action_type: "page_view",
            action_detail: `Visited page`,
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === "feature_use") {
          activities.push({
            id: `event-${e.id}`,
            action_type: "feature",
            action_detail: e.event_name || "Used feature",
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        } else if (e.event_type === "session_start") {
          activities.push({
            id: `event-${e.id}`,
            action_type: "session",
            action_detail: "Started session",
            extra_info: e.page_path,
            created_at: e.created_at,
          });
        }
      });

      // Calculate total score
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

      // Sort all activities by date (newest first for display)
      const sortedActivities = activities.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Find first action (oldest) - exclude points/streak synthetic entries
      const realActivities = activities.filter(a =>
        !["points", "streak"].includes(a.action_type)
      );
      const firstAction = realActivities.length > 0
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

  // Calculate time to first value
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

  // Hide user mutation (local only - no database needed)
  const hideUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const newHidden = new Set(hiddenUserIds).add(userId);
      localStorage.setItem("admin-hidden-trial-users", JSON.stringify([...newHidden]));
      return userId;
    },
    onSuccess: (userId) => {
      setHiddenUserIds(prev => new Set(prev).add(userId));
      toast.success("User removed from list");
      setSelectedUser(null);
    },
  });

  // Unhide all users
  const unhideAllUsers = () => {
    localStorage.removeItem("admin-hidden-trial-users");
    setHiddenUserIds(new Set());
    toast.success("All hidden users restored");
  };

  // Send reminder email mutation
  const sendReminderMutation = useMutation({
    mutationFn: async ({ userId, type }: { userId: string; type: "reminder" | "offer" }) => {
      const { data, error } = await supabase.functions.invoke("send-trial-reminder", {
        body: { userId, type },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Email sent successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-trial-users"] });
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error.message}`);
    },
  });

  // Bulk email mutation
  const bulkEmailMutation = useMutation({
    mutationFn: async ({ userIds, type }: { userIds: string[]; type: "reminder" | "offer" }) => {
      const { data, error } = await supabase.functions.invoke("send-trial-reminder-bulk", {
        body: { userIds, type },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      toast.success(`Emails sent to ${variables.userIds.length} users`);
      queryClient.invalidateQueries({ queryKey: ["admin-trial-users"] });
    },
    onError: (error) => {
      toast.error(`Failed to send emails: ${error.message}`);
    },
  });

  const getDayLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    const today = startOfDay(new Date());
    const dateDay = startOfDay(date);
    const diffDays = Math.round((dateDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Expired ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 0) {
      return "⚠️ Expires TODAY";
    } else if (diffDays === 1) {
      return "⏰ Expires TOMORROW";
    } else if (diffDays <= 7) {
      return `Expires in ${diffDays} days (${format(date, "EEE d MMM")})`;
    } else {
      return `Expires ${format(date, "EEE d MMM")}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          className={`bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-transform ${statusFilter === "ending_today" ? "ring-2 ring-red-500" : ""}`}
          onClick={() => setStatusFilter(statusFilter === "ending_today" ? "all" : "ending_today")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.ending_today}</p>
                <p className="text-xs text-muted-foreground">Ending Today</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-transform ${statusFilter === "ending_tomorrow" ? "ring-2 ring-orange-500" : ""}`}
          onClick={() => setStatusFilter(statusFilter === "ending_tomorrow" ? "all" : "ending_tomorrow")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.ending_tomorrow}</p>
                <p className="text-xs text-muted-foreground">Ending Tomorrow</p>
              </div>
              <Clock className="h-6 w-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 cursor-pointer touch-manipulation active:scale-[0.98] transition-transform ${statusFilter === "active" ? "ring-2 ring-green-500" : ""}`}
          onClick={() => setStatusFilter(statusFilter === "active" ? "all" : "active")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active Trials</p>
              </div>
              <Timer className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.conversion_rate}%</p>
                <p className="text-xs text-muted-foreground">Conversion</p>
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card
          className={`cursor-pointer touch-manipulation active:scale-[0.98] transition-transform ${statusFilter === "subscribed" ? "ring-2 ring-emerald-500" : ""}`}
          onClick={() => setStatusFilter(statusFilter === "subscribed" ? "all" : "subscribed")}
        >
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-lg font-bold">{stats.converted}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Crown className="h-3 w-3 text-emerald-400" />
              Converted
            </p>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer touch-manipulation active:scale-[0.98] transition-transform ${statusFilter === "expired" ? "ring-2 ring-gray-500" : ""}`}
          onClick={() => setStatusFilter(statusFilter === "expired" ? "all" : "expired")}
        >
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-lg font-bold">{stats.expired}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <XCircle className="h-3 w-3 text-gray-400" />
              Expired
            </p>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer touch-manipulation active:scale-[0.98] transition-transform ${statusFilter === "all" && engagementFilter === "all" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => { setStatusFilter("all"); setEngagementFilter("all"); }}
        >
          <CardContent className="pt-4 pb-4 text-center">
            <p className="text-lg font-bold">{stats.total_trials}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Users className="h-3 w-3 text-blue-400" />
              Total Trials
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-orange-400" />
            Engagement Levels (Active Trials)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div
              className={`text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 touch-manipulation active:scale-[0.98] cursor-pointer transition-all ${engagementFilter === "hot" ? "ring-2 ring-red-500" : ""}`}
              onClick={() => setEngagementFilter(engagementFilter === "hot" ? "all" : "hot")}
            >
              <Flame className="h-5 w-5 text-red-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{stats.hot_leads}</p>
              <p className="text-xs text-muted-foreground">Hot</p>
              <p className="text-[10px] text-red-400/70">{ENGAGEMENT_HOT}+ score</p>
            </div>
            <div
              className={`text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 touch-manipulation active:scale-[0.98] cursor-pointer transition-all ${engagementFilter === "warm" ? "ring-2 ring-amber-500" : ""}`}
              onClick={() => setEngagementFilter(engagementFilter === "warm" ? "all" : "warm")}
            >
              <Activity className="h-5 w-5 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{stats.warm_leads}</p>
              <p className="text-xs text-muted-foreground">Warm</p>
              <p className="text-[10px] text-amber-400/70">{ENGAGEMENT_WARM}-{ENGAGEMENT_HOT - 1} score</p>
            </div>
            <div
              className={`text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 touch-manipulation active:scale-[0.98] cursor-pointer transition-all ${engagementFilter === "cold" ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setEngagementFilter(engagementFilter === "cold" ? "all" : "cold")}
            >
              <Snowflake className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{stats.cold_leads}</p>
              <p className="text-xs text-muted-foreground">Cold</p>
              <p className="text-[10px] text-blue-400/70">&lt;{ENGAGEMENT_WARM} score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search trials..."
                className="flex-1 max-w-xs"
              />
              <div className="flex gap-2">
                {hiddenUserIds.size > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={unhideAllUsers}
                    className="gap-2 h-11 touch-manipulation text-muted-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Restore</span> {hiddenUserIds.size}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="gap-2 h-11 touch-manipulation"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] h-11 touch-manipulation">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all" className="h-11">All Status</SelectItem>
                  <SelectItem value="ending_today" className="h-11">Ending Today</SelectItem>
                  <SelectItem value="ending_tomorrow" className="h-11">Ending Tomorrow</SelectItem>
                  <SelectItem value="active" className="h-11">Active</SelectItem>
                  <SelectItem value="expired" className="h-11">Expired</SelectItem>
                </SelectContent>
              </Select>
              <Select value={engagementFilter} onValueChange={setEngagementFilter}>
                <SelectTrigger className="w-[120px] h-11 touch-manipulation">
                  <SelectValue placeholder="Engagement" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all" className="h-11">All Leads</SelectItem>
                  <SelectItem value="hot" className="h-11">🔥 Hot</SelectItem>
                  <SelectItem value="warm" className="h-11">🌡️ Warm</SelectItem>
                  <SelectItem value="cold" className="h-11">❄️ Cold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[120px] h-11 touch-manipulation">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="all" className="h-11">All Roles</SelectItem>
                  <SelectItem value="apprentice" className="h-11">Apprentice</SelectItem>
                  <SelectItem value="electrician" className="h-11">Electrician</SelectItem>
                  <SelectItem value="employer" className="h-11">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trial Users by Day */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4">
                <div className="h-20 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : Object.keys(groupedByDay).length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={Users}
              title="No trial users found"
              description="Trial users matching your filters will appear here."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByDay).map(([date, users]) => {
            const dateObj = parseISO(date);
            const today = startOfDay(new Date());
            const diffDays = Math.round((startOfDay(dateObj).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isUrgent = diffDays <= 1; // Today or tomorrow

            return (
            <Card key={date} className={isUrgent ? "border-red-500/30" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className={`h-4 w-4 ${isUrgent ? "text-red-400" : "text-yellow-400"}`} />
                    {getDayLabel(date)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 gap-1 text-xs text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        const userIds = users.map(u => u.id);
                        bulkEmailMutation.mutate({ userIds, type: "reminder" });
                      }}
                      disabled={bulkEmailMutation.isPending}
                    >
                      <MailPlus className="h-3.5 w-3.5" />
                      Email All
                    </Button>
                    <Badge variant="outline" className="text-xs">
                      {users.length} {users.length === 1 ? "user" : "users"}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center shrink-0">
                          {getRoleIcon(user.role)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate text-sm">{user.full_name || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {getEngagementBadge(user.engagement_score)}
                        {getStatusBadge(user.trial_status, user.days_remaining)}
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
          })}
        </div>
      )}

      {/* User Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <SheetHeader className="px-4 pb-4 border-b border-border">
              <SheetTitle className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                  {getRoleIcon(selectedUser?.role || null)}
                </div>
                <div>
                  <p className="text-left">{selectedUser?.full_name}</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    @{selectedUser?.username}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Time to First Value - Key Metric */}
              {firstAction && (
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Rocket className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-green-400 font-medium">Time to First Value</p>
                        <p className="text-xl font-bold">{timeToFirstValue}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          First action: {firstAction.action_detail}
                        </p>
                      </div>
                      <div className="text-right">
                        <Target className="h-5 w-5 text-green-400 mb-1" />
                        <p className="text-[10px] text-muted-foreground">
                          {format(parseISO(firstAction.created_at), "dd MMM HH:mm")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Activity Summary Card - Show time spent, pages visited, etc. */}
              {scoreBreakdown && (scoreBreakdown.timeSpentMinutes > 0 || scoreBreakdown.pageViews > 0 || scoreBreakdown.loginCount > 0) && (
                <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border-teal-500/20">
                  <CardContent className="pt-4 pb-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <Timer className="h-5 w-5 text-teal-400 mx-auto mb-1" />
                        <p className="text-lg font-bold">{formatTimeSpent(scoreBreakdown.totalSecondsTracked || 0)}</p>
                        <p className="text-[10px] text-muted-foreground">Time in App</p>
                      </div>
                      <div>
                        <Eye className="h-5 w-5 text-sky-400 mx-auto mb-1" />
                        <p className="text-lg font-bold">{scoreBreakdown.pageViews || 0}</p>
                        <p className="text-[10px] text-muted-foreground">Pages Visited</p>
                      </div>
                      <div>
                        <LogIn className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                        <p className="text-lg font-bold">{scoreBreakdown.loginCount || 0}</p>
                        <p className="text-[10px] text-muted-foreground">Logins</p>
                      </div>
                    </div>
                    {scoreBreakdown.activeDays > 0 && (
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        Active on {scoreBreakdown.activeDays} day{scoreBreakdown.activeDays !== 1 ? 's' : ''} in the last 30 days
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* No Activity Warning - but show login info if available */}
              {!activityLoading && !firstAction && !scoreBreakdown?.loginCount && (
                <Card className={`bg-gradient-to-br ${selectedUser?.last_sign_in_at ? "from-amber-500/10 to-orange-500/5 border-amber-500/20" : "from-blue-500/10 to-cyan-500/5 border-blue-500/20"}`}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${selectedUser?.last_sign_in_at ? "bg-amber-500/20" : "bg-blue-500/20"} flex items-center justify-center`}>
                        {selectedUser?.last_sign_in_at ? (
                          <LogIn className="h-6 w-6 text-amber-400" />
                        ) : (
                          <Snowflake className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        {selectedUser?.last_sign_in_at ? (
                          <>
                            <p className="text-xs text-amber-400 font-medium">Logged In But No Tracked Activity</p>
                            <p className="text-sm font-semibold">
                              Last login: {formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), { addSuffix: true })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Activity tracking started recently - older sessions not captured
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-blue-400 font-medium">Never Logged In</p>
                            <p className="text-sm font-semibold">User hasn't returned since signup</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Signed up {selectedUser?.created_at && formatDistanceToNow(parseISO(selectedUser.created_at), { addSuffix: true })}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Trial Status */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Timer className="h-4 w-4 text-yellow-400" />
                    Trial Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center min-h-[44px]">
                    <span className="text-sm text-muted-foreground">Status</span>
                    {selectedUser && getStatusBadge(selectedUser.trial_status, selectedUser.days_remaining)}
                  </div>
                  <div className="flex justify-between items-center min-h-[44px]">
                    <span className="text-sm text-muted-foreground">Signed Up</span>
                    <span className="text-sm">
                      {selectedUser?.created_at && format(parseISO(selectedUser.created_at), "dd MMM yyyy HH:mm")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center min-h-[44px]">
                    <span className="text-sm text-muted-foreground">Trial Ends</span>
                    <span className="text-sm">
                      {selectedUser?.trial_ends && format(parseISO(selectedUser.trial_ends), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center min-h-[44px]">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <Badge className={getRoleBadgeColor(selectedUser?.role || null)}>
                      <span className="capitalize">{selectedUser?.role || "Visitor"}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Engagement / Activity */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-orange-400" />
                      Engagement Score Breakdown
                    </span>
                    {selectedUser && getEngagementBadge(selectedUser.engagement_score)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Score Breakdown Table */}
                  <div className="space-y-2 text-sm">
                    {/* Time in App - Most Important */}
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Timer className="h-3.5 w-3.5 text-teal-400" />
                        Time in App ({scoreBreakdown?.timeSpentMinutes || 0}m × 0.5, max 30)
                      </span>
                      <span className={`font-medium ${(scoreBreakdown?.timeBonus || 0) > 0 ? "text-teal-400" : "text-muted-foreground"}`}>
                        +{scoreBreakdown?.timeBonus || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5 text-sky-400" />
                        Pages Visited ({scoreBreakdown?.pageViews || 0} unique, max 20)
                      </span>
                      <span className={`font-medium ${(scoreBreakdown?.pageViewBonus || 0) > 0 ? "text-sky-400" : "text-muted-foreground"}`}>
                        +{scoreBreakdown?.pageViewBonus || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <LogIn className="h-3.5 w-3.5 text-cyan-400" />
                        Logins ({scoreBreakdown?.loginCount || 0} × 2, max 10)
                      </span>
                      <span className={`font-medium ${(scoreBreakdown?.loginBonus || 0) > 0 ? "text-cyan-400" : "text-muted-foreground"}`}>
                        +{scoreBreakdown?.loginBonus || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-pink-400" />
                        Features Used ({scoreBreakdown?.featureUseCount || 0} × 3)
                      </span>
                      <span className={`font-medium ${(scoreBreakdown?.featureBonus || 0) > 0 ? "text-pink-400" : "text-muted-foreground"}`}>
                        +{scoreBreakdown?.featureBonus || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                        Base Points
                      </span>
                      <span className="font-medium">{scoreBreakdown?.points || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Flame className="h-3.5 w-3.5 text-orange-400" />
                        Streak ({scoreBreakdown?.streak || 0} days × 5)
                      </span>
                      <span className="font-medium text-orange-400">+{scoreBreakdown?.streakBonus || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                        Study Sessions ({scoreBreakdown?.studySessions || 0} × 3)
                      </span>
                      <span className="font-medium text-purple-400">+{scoreBreakdown?.studyBonus || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Receipt className="h-3.5 w-3.5 text-green-400" />
                        Quotes ({scoreBreakdown?.quotes || 0} × 8)
                      </span>
                      <span className="font-medium text-green-400">+{scoreBreakdown?.quotesBonus || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <ClipboardCheck className="h-3.5 w-3.5 text-yellow-400" />
                        Certificates ({scoreBreakdown?.eics || 0} × 10)
                      </span>
                      <span className="font-medium text-yellow-400">+{scoreBreakdown?.eicsBonus || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-muted/50 rounded-lg px-2 mt-2">
                      <span className="font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-white" />
                        Total Score
                      </span>
                      <span className="text-lg font-bold">{scoreBreakdown?.total || selectedUser?.engagement_score || 0}</span>
                    </div>
                  </div>

                  {/* Last Active / Last Login */}
                  <div className="pt-2 border-t border-border/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <LogIn className="h-3.5 w-3.5" />
                        Last Login
                      </span>
                      <span className="text-sm">
                        {selectedUser?.last_sign_in_at
                          ? formatDistanceToNow(parseISO(selectedUser.last_sign_in_at), { addSuffix: true })
                          : "Never"}
                      </span>
                    </div>
                    {selectedUser?.email && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          Email
                        </span>
                        <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {selectedUser.email}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Send className="h-4 w-4 text-blue-400" />
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full gap-2 h-12 touch-manipulation bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
                    onClick={() => {
                      if (selectedUser) {
                        sendReminderMutation.mutate({ userId: selectedUser.id, type: "reminder" });
                      }
                    }}
                    disabled={sendReminderMutation.isPending}
                  >
                    <Mail className="h-4 w-4" />
                    Send Trial Reminder
                  </Button>
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
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-cyan-400" />
                      Activity Timeline
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {userActivity?.length || 0} actions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activityLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 bg-muted/50 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : !userActivity || userActivity.length === 0 ? (
                    <div className="text-center py-6">
                      <Snowflake className="h-8 w-8 text-blue-400 mx-auto mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">No activity recorded yet</p>
                      <p className="text-xs text-muted-foreground mt-1">User hasn't used any features</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {userActivity.map((activity) => {
                        const { icon: Icon, color, bg } = getActivityIcon(activity.action_type);
                        return (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                              <Icon className={`h-4 w-4 ${color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{activity.action_detail}</p>
                              {activity.extra_info && (
                                <p className="text-xs text-muted-foreground truncate">{activity.extra_info}</p>
                              )}
                              <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                                {formatDistance(parseISO(activity.created_at), new Date(), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-400" />
                    Account Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">User ID</span>
                    <span className="text-xs font-mono text-muted-foreground truncate max-w-[180px]">
                      {selectedUser?.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time on Platform</span>
                    <span className="text-sm">
                      {selectedUser?.created_at && formatDistanceToNow(parseISO(selectedUser.created_at))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

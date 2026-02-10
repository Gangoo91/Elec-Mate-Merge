import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  Clock,
  RefreshCw,
  ChevronRight,
  Crown,
  Zap,
  Activity,
  UserPlus,
  Eye,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getInitials, getRoleColor } from "@/utils/adminUtils";
import UserManagementSheet from "@/components/admin/UserManagementSheet";
import UserActivitySheet from "@/components/admin/UserActivitySheet";
import { useAdminUsersBase } from "@/hooks/useAdminUsersBase";
import PullToRefresh from "@/components/admin/PullToRefresh";

// Stripe stats type
interface StripeStats {
  stripe: {
    activeSubscriptions: number;
    canceledLast30Days: number;
    tierCounts: {
      founder: number;
      apprentice: number;
      electrician: number;
      employer: number;
      unknown: number;
    };
    mrr: number;
  };
  discrepancies: {
    inStripeNotSupabase: number;
    inSupabaseNotStripe: number;
  };
  generatedAt: string;
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedOnlineUser, setSelectedOnlineUser] = useState<{
    userId: string;
    userName: string;
    userRole: string;
  } | null>(null);

  // Shared cached edge function call — reused across admin pages
  const { data: baseUsers } = useAdminUsersBase();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] }),
      queryClient.invalidateQueries({ queryKey: ["admin-stripe-live-stats"] }),
      queryClient.invalidateQueries({ queryKey: ["admin-online-users"] }),
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] }),
    ]);
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  // Fetch LIVE Stripe stats
  const { data: stripeStats, isLoading: stripeLoading } = useQuery<StripeStats>({
    queryKey: ["admin-stripe-live-stats"],
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 30000,
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase.functions.invoke('admin-stripe-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) throw error;
      return data as StripeStats;
    },
  });

  // Fetch dashboard stats
  const { data: stats, isLoading, isFetching } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      const [
        totalUsersRes,
        signupsTodayRes,
        signupsWeekRes,
        activeTodayRes,
        trialDataRes,
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", today.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", weekAgo.toISOString()),
        supabase.from("user_presence").select("*", { count: "exact", head: true }).gte("last_seen", dayAgo.toISOString()),
        // Trial users: not subscribed, no free access, and trial not expired (signed up within last 7 days)
        supabase.from("profiles").select("role, full_name, created_at")
          .gte("created_at", weekAgo.toISOString()) // Trial = signed up within 7 days
          .or("subscribed.is.null,subscribed.eq.false")
          .or("free_access_granted.is.null,free_access_granted.eq.false"),
      ]);

      const trialData = trialDataRes.data || [];
      // Use shared cached baseUsers instead of separate edge function call
      const usersWithEmails = baseUsers || [];

      return {
        totalUsers: totalUsersRes.count || 0,
        signupsToday: signupsTodayRes.count || 0,
        signupsThisWeek: signupsWeekRes.count || 0,
        activeToday: activeTodayRes.count || 0,
        trialUsers: trialData.length,
        recentSignups: usersWithEmails.slice(0, 5),
      };
    },
  });

  // Online users
  const { data: onlineUsers } = useQuery({
    queryKey: ["admin-online-users"],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_presence")
        .select("user_id, last_seen, status, session_started_at, current_page, device_info, profiles(full_name, role, avatar_url)")
        .order("last_seen", { ascending: false })
        .limit(10);
      return data || [];
    },
    staleTime: 10 * 1000,
    refetchInterval: 15000,
  });

  // Support messages from users
  const { data: supportMessages } = useQuery({
    queryKey: ["admin-support-inbox"],
    queryFn: async () => {
      // Get messages sent TO admins (i.e., support requests from users)
      const { data: adminProfiles } = await supabase
        .from("profiles")
        .select("id")
        .not("admin_role", "is", null);

      const adminIds = adminProfiles?.map((p) => p.id) || [];

      if (adminIds.length === 0) return [];

      // Get messages where recipient is an admin
      const { data } = await supabase
        .from("admin_messages")
        .select(`
          id,
          sender_id,
          recipient_id,
          subject,
          message,
          read_at,
          created_at,
          sender:profiles!admin_messages_sender_id_fkey(id, full_name, role, avatar_url)
        `)
        .in("recipient_id", adminIds)
        .order("created_at", { ascending: false })
        .limit(10);

      return data || [];
    },
    staleTime: 30 * 1000,
    refetchInterval: 60000,
  });

  const unreadSupportCount = supportMessages?.filter((m: any) => !m.read_at).length || 0;

  const liveUserCount = onlineUsers?.filter((a: any) =>
    new Date(a.last_seen).getTime() > Date.now() - 5 * 60 * 1000
  ).length || 0;

  if (isLoading || stripeLoading) {
    return (
      <div className="space-y-4 animate-pulse p-1">
        <div className="h-44 bg-gradient-to-br from-emerald-900/50 to-emerald-950/30 rounded-3xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/50 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const mrr = stripeStats?.stripe.mrr || 0;
  const arr = mrr * 12;
  const totalSubs = stripeStats?.stripe.activeSubscriptions || 0;

  return (
    <PullToRefresh onRefresh={async () => { await handleRefresh(); }}>
    <div className="space-y-4 pb-24">
      {/* Hero Revenue Card */}
      <div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 p-5 touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
        onClick={() => navigate("/admin/revenue")}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-emerald-200/80 text-xs font-medium uppercase tracking-wider">Live Revenue</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 text-white/60 hover:text-white hover:bg-white/10 touch-manipulation"
              onClick={(e) => { e.stopPropagation(); handleRefresh(); }}
              disabled={isFetching || isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4", (isFetching || isRefreshing) && "animate-spin")} />
            </Button>
          </div>

          {/* MRR */}
          <div className="mb-4">
            <p className="text-5xl font-bold text-white tracking-tight">
              £{mrr.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-emerald-200/60 text-sm mt-1">Monthly Recurring Revenue</p>
          </div>

          {/* Quick stats - stack on very small screens */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3">
              <p className="text-xl sm:text-2xl font-bold text-white">{totalSubs.toLocaleString()}</p>
              <p className="text-emerald-200/60 text-xs sm:text-[11px] uppercase">Paying</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3">
              <p className="text-xl sm:text-2xl font-bold text-white">
                {arr >= 10000 ? `£${(arr / 1000).toFixed(0)}k` : `£${(arr / 1000).toFixed(1)}k`}
              </p>
              <p className="text-emerald-200/60 text-xs sm:text-[11px] uppercase">ARR</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3">
              <div className="flex items-center justify-center gap-1">
                <Crown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400" />
                <p className="text-xl sm:text-2xl font-bold text-white">{(stripeStats?.stripe.tierCounts?.founder || 0).toLocaleString()}</p>
              </div>
              <p className="text-emerald-200/60 text-xs sm:text-[11px] uppercase">Founders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row - 2x2 on mobile, 4 cols on tablet+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Card
          className="bg-card/80 border-0 shadow-sm touch-manipulation active:scale-[0.97] transition-transform cursor-pointer"
          onClick={() => navigate("/admin/users")}
        >
          <CardContent className="p-3 sm:p-3 text-center">
            <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
            <p className="text-2xl sm:text-xl font-bold">{stats?.totalUsers?.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Users</p>
          </CardContent>
        </Card>

        <Card
          className="bg-card/80 border-0 shadow-sm touch-manipulation active:scale-[0.97] transition-transform cursor-pointer"
          onClick={() => navigate("/admin/users?filter=active")}
        >
          <CardContent className="p-3 sm:p-3 text-center">
            <Activity className="h-5 w-5 text-green-400 mx-auto mb-1" />
            <p className="text-2xl sm:text-xl font-bold">{stats?.activeToday?.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>

        <Card
          className="bg-card/80 border-0 shadow-sm touch-manipulation active:scale-[0.97] transition-transform cursor-pointer"
          onClick={() => navigate("/admin/users?filter=today")}
        >
          <CardContent className="p-3 sm:p-3 text-center">
            <UserPlus className="h-5 w-5 text-purple-400 mx-auto mb-1" />
            <p className="text-2xl sm:text-xl font-bold">{stats?.signupsToday?.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card
          className="bg-card/80 border-0 shadow-sm touch-manipulation active:scale-[0.97] transition-transform cursor-pointer"
          onClick={() => navigate("/admin/users?filter=trial")}
        >
          <CardContent className="p-3 sm:p-3 text-center">
            <Clock className="h-5 w-5 text-orange-400 mx-auto mb-1" />
            <p className="text-2xl sm:text-xl font-bold">{stats?.trialUsers?.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Trial</p>
          </CardContent>
        </Card>
      </div>

      {/* Live Users Section */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-sm">Live Now</span>
            <Badge variant="secondary" className="text-xs px-2 py-0">
              {liveUserCount} online
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-8 px-3" onClick={() => navigate("/admin/users")}>
            View All
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="divide-y divide-border/50">
          {onlineUsers?.slice(0, 5).map((activity: any) => {
            const lastSeenMs = new Date(activity.last_seen).getTime();
            const diffMins = Math.floor((Date.now() - lastSeenMs) / 60000);
            const isOnline = diffMins < 5;
            const profile = activity.profiles as any;
            const roleColor = getRoleColor(profile?.role);

            return (
              <button
                key={activity.user_id}
                onClick={() => setSelectedOnlineUser({
                  userId: activity.user_id,
                  userName: profile?.full_name || "Unknown",
                  userRole: profile?.role || ""
                })}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 active:bg-muted transition-colors touch-manipulation"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center relative font-semibold text-sm shrink-0",
                  roleColor.bg, roleColor.text
                )}>
                  {getInitials(profile?.full_name)}
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  )} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-sm truncate">{profile?.full_name || "Unknown"}</p>
                  <p className="text-xs text-muted-foreground">
                    {isOnline ? "Active now" : `${diffMins}m ago`}
                    {activity.current_page && ` • ${activity.current_page.replace(/^\//, '').split('/')[0] || 'Home'}`}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
            );
          })}
          {(!onlineUsers || onlineUsers.length === 0) && (
            <div className="p-8 text-center text-muted-foreground">
              <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No active users</p>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Signups */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-400" />
            <span className="font-semibold text-sm">Recent Signups</span>
          </div>
          <Badge variant="secondary" className="text-xs px-2 py-0">
            {stats?.signupsThisWeek} this week
          </Badge>
        </div>
        <div className="divide-y divide-border/50">
          {stats?.recentSignups?.slice(0, 5).map((user: any) => {
            const roleColor = getRoleColor(user.role);
            return (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 active:bg-muted transition-colors touch-manipulation"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm shrink-0",
                  roleColor.bg, roleColor.text
                )}>
                  {getInitials(user.full_name)}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-sm truncate">{user.full_name || "Unknown"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(user.created_at), { addSuffix: true }).replace("about ", "")}
                  </p>
                  {user.subscribed && (
                    <Badge className="text-[11px] px-1.5 py-0 bg-emerald-500/20 text-emerald-400 border-0">
                      Pro
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Support Inbox */}
      {supportMessages && supportMessages.length > 0 && (
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-pink-400" />
              <span className="font-semibold text-sm">Support Inbox</span>
            </div>
            {unreadSupportCount > 0 && (
              <Badge className="text-xs px-2 py-0 bg-pink-500 text-white">
                {unreadSupportCount} new
              </Badge>
            )}
          </div>
          <div className="divide-y divide-border/50">
            {supportMessages.slice(0, 5).map((msg: any) => {
              const sender = msg.sender as any;
              const roleColor = getRoleColor(sender?.role);
              const isUnread = !msg.read_at;

              return (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-start gap-3 p-3 touch-manipulation",
                    isUnread ? "bg-pink-500/5" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm shrink-0",
                    roleColor.bg, roleColor.text
                  )}>
                    {getInitials(sender?.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{sender?.full_name || "Unknown"}</p>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{msg.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Growth Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card
          className="border-0 shadow-sm touch-manipulation active:scale-[0.98] transition-transform cursor-pointer"
          onClick={() => navigate("/admin/analytics")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <Badge variant="outline" className="text-xs">7d</Badge>
            </div>
            <p className="text-2xl font-bold">{stats?.signupsThisWeek}</p>
            <p className="text-xs text-muted-foreground">New this week</p>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-sm touch-manipulation active:scale-[0.98] transition-transform cursor-pointer"
          onClick={() => navigate("/admin/analytics")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <Badge variant="outline" className="text-xs">Rate</Badge>
            </div>
            <p className="text-2xl font-bold">
              {stats?.totalUsers ? ((totalSubs / stats.totalUsers) * 100).toFixed(0) : 0}%
            </p>
            <p className="text-xs text-muted-foreground">Conversion</p>
          </CardContent>
        </Card>
      </div>

      {/* User Sheets */}
      <UserManagementSheet
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />

      <UserActivitySheet
        userId={selectedOnlineUser?.userId || null}
        userName={selectedOnlineUser?.userName || null}
        userRole={selectedOnlineUser?.userRole || null}
        open={!!selectedOnlineUser}
        onOpenChange={(open) => !open && setSelectedOnlineUser(null)}
      />
    </div>
    </PullToRefresh>
  );
}

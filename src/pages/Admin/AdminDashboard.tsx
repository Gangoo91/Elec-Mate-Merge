import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  UserCheck,
  CreditCard,
  TrendingUp,
  Clock,
  IdCard,
  Activity,
  Calendar,
  RefreshCw,
  ChevronRight,
  PoundSterling,
  Mail,
  Zap,
  GraduationCap,
  Building2,
  CheckCircle,
  Gift,
  Crown,
} from "lucide-react";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getInitials, getRoleColor } from "@/utils/adminUtils";
import UserManagementSheet from "@/components/admin/UserManagementSheet";
import UserActivitySheet from "@/components/admin/UserActivitySheet";

// UK Pricing tiers
const pricingTiers = {
  apprentice: { monthly: "£4.99", yearly: "£49.99" },
  electrician: { monthly: "£9.99", yearly: "£99.99" },
  employer: { monthly: "£29.99", yearly: "£299.99" },
  founder: { monthly: "£3.99", yearly: "£39.99" },
};

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

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  // Fetch dashboard stats - batch queries for performance
  const { data: stats, isLoading, isFetching } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      // Batch all count queries in parallel
      const [
        totalUsersRes,
        signupsTodayRes,
        signupsWeekRes,
        signupsMonthRes,
        activeTodayRes,
        elecIdCompleteRes,
        subscribedDataRes,
        edgeDataRes,
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", today.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", weekAgo.toISOString()),
        supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", monthAgo.toISOString()),
        supabase.from("user_presence").select("*", { count: "exact", head: true }).gte("last_seen", dayAgo.toISOString()),
        supabase.from("employer_elec_id_profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("subscription_tier, free_access_granted").eq("subscribed", true),
        supabase.functions.invoke("admin-get-users"),
      ]);

      const subscribedData = subscribedDataRes.data || [];
      const subscribedUsers = subscribedData.length;
      // Exclude free_access_granted users from paid counts (they pay £0)
      const paidSubscribers = subscribedData.filter(u => !u.free_access_granted);
      const freeSubscribers = subscribedData.filter(u => u.free_access_granted);
      const tierCounts = {
        apprentice: paidSubscribers.filter(u => u.subscription_tier === "Apprentice").length,
        electrician: paidSubscribers.filter(u => u.subscription_tier === "Electrician").length,
        employer: paidSubscribers.filter(u => u.subscription_tier === "Employer").length,
        founder: paidSubscribers.filter(u => u.subscription_tier === "Founder").length,
        free: freeSubscribers.length,
      };

      const mrr = (tierCounts.apprentice * 4.99) +
                  (tierCounts.electrician * 9.99) +
                  (tierCounts.employer * 29.99) +
                  (tierCounts.founder * 3.99);

      const usersWithEmails = edgeDataRes.data?.users || [];

      return {
        totalUsers: totalUsersRes.count || 0,
        signupsToday: signupsTodayRes.count || 0,
        signupsThisWeek: signupsWeekRes.count || 0,
        signupsThisMonth: signupsMonthRes.count || 0,
        activeToday: activeTodayRes.count || 0,
        elecIdComplete: elecIdCompleteRes.count || 0,
        subscribedUsers,
        tierCounts,
        mrr,
        recentSignups: usersWithEmails.slice(0, 8),
      };
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 60000, // Refresh every 60 seconds
  });

  // Separate query for online users - refreshes more frequently for real-time feel
  const { data: onlineUsers } = useQuery({
    queryKey: ["admin-online-users"],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_presence")
        .select("user_id, last_seen, status, session_started_at, current_page, device_info, profiles(full_name, role, avatar_url)")
        .order("last_seen", { ascending: false })
        .limit(20);
      return data || [];
    },
    staleTime: 10 * 1000, // 10 second cache
    refetchInterval: 15000, // Refresh every 15 seconds for real-time feel
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="h-8 bg-muted rounded w-16 mb-2" />
              <div className="h-4 bg-muted rounded w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Refresh Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-xs text-muted-foreground">Real-time platform stats</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 touch-manipulation"
          onClick={handleRefresh}
          disabled={isFetching || isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${(isFetching || isRefreshing) ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Revenue Hero Card */}
      <Card
        className="bg-gradient-to-br from-emerald-500/20 to-green-600/10 border-emerald-500/30 touch-manipulation cursor-pointer hover:border-emerald-500/50 active:scale-[0.99] transition-all"
        onClick={() => navigate("/admin/revenue")}
      >
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <PoundSterling className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400">£{stats?.mrr?.toFixed(2) || "0.00"}</p>
                <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              {stats?.subscribedUsers || 0} paying
            </Badge>
          </div>
          {/* Tier Breakdown */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
            <div
              className="bg-purple-500/10 rounded-xl p-2 sm:p-3 text-center cursor-pointer hover:bg-purple-500/20 transition-all active:scale-[0.98] touch-manipulation"
              onClick={(e) => { e.stopPropagation(); navigate("/admin/subscriptions?tier=apprentice"); }}
            >
              <GraduationCap className="h-4 w-4 text-purple-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-400">{stats?.tierCounts?.apprentice || 0}</p>
              <p className="text-[10px] text-muted-foreground">Apprentice</p>
              <p className="text-[10px] text-purple-400/70">{pricingTiers.apprentice.monthly}/mo</p>
            </div>
            <div
              className="bg-yellow-500/10 rounded-xl p-2 sm:p-3 text-center cursor-pointer hover:bg-yellow-500/20 transition-all active:scale-[0.98] touch-manipulation"
              onClick={(e) => { e.stopPropagation(); navigate("/admin/subscriptions?tier=electrician"); }}
            >
              <Zap className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-yellow-400">{stats?.tierCounts?.electrician || 0}</p>
              <p className="text-[10px] text-muted-foreground">Electrician</p>
              <p className="text-[10px] text-yellow-400/70">{pricingTiers.electrician.monthly}/mo</p>
            </div>
            <div
              className="bg-blue-500/10 rounded-xl p-2 sm:p-3 text-center cursor-pointer hover:bg-blue-500/20 transition-all active:scale-[0.98] touch-manipulation"
              onClick={(e) => { e.stopPropagation(); navigate("/admin/subscriptions?tier=employer"); }}
            >
              <Building2 className="h-4 w-4 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-400">{stats?.tierCounts?.employer || 0}</p>
              <p className="text-[10px] text-muted-foreground">Employer</p>
              <p className="text-[10px] text-blue-400/70">{pricingTiers.employer.monthly}/mo</p>
            </div>
            <div
              className="bg-amber-500/10 rounded-xl p-2 sm:p-3 text-center cursor-pointer hover:bg-amber-500/20 transition-all active:scale-[0.98] touch-manipulation"
              onClick={(e) => { e.stopPropagation(); navigate("/admin/founders"); }}
            >
              <Crown className="h-4 w-4 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-amber-400">{stats?.tierCounts?.founder || 0}</p>
              <p className="text-[10px] text-muted-foreground">Founder</p>
              <p className="text-[10px] text-amber-400/70">{pricingTiers.founder.monthly}/mo</p>
            </div>
            <div
              className="bg-emerald-500/10 rounded-xl p-2 sm:p-3 text-center cursor-pointer hover:bg-emerald-500/20 transition-all active:scale-[0.98] touch-manipulation"
              onClick={(e) => { e.stopPropagation(); navigate("/admin/users"); }}
            >
              <Gift className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-emerald-400">{stats?.tierCounts?.free || 0}</p>
              <p className="text-[10px] text-muted-foreground">Free Beta</p>
              <p className="text-[10px] text-emerald-400/70">£0/mo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card
          className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-blue-500/40"
          onClick={() => navigate("/admin/users")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
              <Users className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-green-500/40"
          onClick={() => navigate("/admin/users?filter=active")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.activeToday}</p>
                <p className="text-xs text-muted-foreground">Active Today</p>
              </div>
              <Activity className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-purple-500/40"
          onClick={() => navigate("/admin/users?filter=today")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.signupsToday}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-amber-500/40"
          onClick={() => navigate("/admin/users?filter=week")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.signupsThisWeek}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
              <Calendar className="h-6 w-6 text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-cyan-500/40"
          onClick={() => navigate("/admin/users?filter=month")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.signupsThisMonth}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
              <Calendar className="h-6 w-6 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-pink-500/40"
          onClick={() => navigate("/admin/elec-ids")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.elecIdComplete}</p>
                <p className="text-xs text-muted-foreground">Elec-IDs</p>
              </div>
              <IdCard className="h-6 w-6 text-pink-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-orange-500/40"
          onClick={() => navigate("/admin/analytics")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">
                  {stats?.totalUsers ? ((stats.subscribedUsers / stats.totalUsers) * 100).toFixed(0) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">Conversion</p>
              </div>
              <TrendingUp className="h-6 w-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 touch-manipulation active:scale-[0.98] transition-transform cursor-pointer hover:border-red-500/40"
          onClick={() => navigate("/admin/subscriptions")}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.subscribedUsers}</p>
                <p className="text-xs text-muted-foreground">Paying</p>
              </div>
              <CreditCard className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent Signups with Emails */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" />
              Recent Signups
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {stats?.recentSignups?.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4">No recent signups</p>
              ) : (
                stats?.recentSignups?.map((user: any) => {
                  const colors = getRoleColor(user.role);
                  return (
                    <button
                      key={user.id}
                      onClick={() => setSelectedUser(user)}
                      className="w-full flex items-center gap-3 p-3 touch-manipulation active:bg-muted/50 active:scale-[0.99] transition-all text-left"
                    >
                      {/* Avatar with initials */}
                      <div
                        className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm",
                          colors.bg,
                          colors.text
                        )}
                      >
                        {getInitials(user.full_name)}
                      </div>

                      {/* User info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-sm truncate">
                            {user.full_name || "Unknown"}
                          </p>
                          {user.role && (
                            <Badge className={cn("text-[10px] capitalize border", colors.badge)}>
                              {user.role}
                            </Badge>
                          )}
                        </div>
                        {user.email && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {user.email}
                          </p>
                        )}
                      </div>

                      {/* Right side - time and subscription */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {formatDistanceToNow(new Date(user.created_at), { addSuffix: true }).replace("about ", "")}
                        </span>
                        {user.subscribed ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] gap-0.5">
                            <CheckCircle className="h-3 w-3" />
                            Pro
                          </Badge>
                        ) : (
                          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-[10px] gap-0.5">
                            <Gift className="h-3 w-3" />
                            Grant
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Online Now - Improved */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 font-semibold">Live Users</span>
              <Badge className="ml-auto bg-green-500/20 text-green-400 text-xs px-2 py-0.5 border border-green-500/30">
                {onlineUsers?.filter((a: any) =>
                  new Date(a.last_seen).getTime() > Date.now() - 5 * 60 * 1000
                ).length || 0} online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              {onlineUsers?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Users className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">No users online</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {onlineUsers?.map((activity: any) => {
                    const lastSeenMs = new Date(activity.last_seen).getTime();
                    const nowMs = Date.now();
                    const diffMins = Math.floor((nowMs - lastSeenMs) / 60000);

                    // Calculate status from last_seen time
                    const isOnline = diffMins < 5;
                    const isAway = diffMins >= 5 && diffMins < 10;

                    const profile = activity.profiles as any;
                    const roleColor = getRoleColor(profile?.role);

                    // Status indicator color
                    const statusColor = isOnline ? "bg-green-500" : isAway ? "bg-yellow-500" : "bg-gray-500";

                    // Session duration
                    const sessionMins = activity.session_started_at
                      ? differenceInMinutes(new Date(), new Date(activity.session_started_at))
                      : 0;
                    const sessionDisplay = sessionMins < 60
                      ? `${sessionMins}m`
                      : `${Math.floor(sessionMins / 60)}h ${sessionMins % 60}m`;

                    // Device info
                    const deviceInfo = activity.device_info as { isMobile?: boolean } | null;
                    const isMobile = deviceInfo?.isMobile;

                    return (
                      <button
                        key={activity.user_id}
                        onClick={() => setSelectedOnlineUser({
                          userId: activity.user_id,
                          userName: profile?.full_name || "Unknown",
                          userRole: profile?.role || ""
                        })}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                          "hover:bg-muted/50 active:scale-[0.98] touch-manipulation",
                          "border border-transparent hover:border-border/50",
                          isOnline && "bg-green-500/5"
                        )}
                      >
                        {/* Avatar with status */}
                        <div className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center relative font-bold text-sm shrink-0",
                          roleColor.bg, roleColor.text
                        )}>
                          {getInitials(profile?.full_name)}
                          <div className={cn(
                            "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background",
                            statusColor
                          )} />
                        </div>

                        {/* User info - aligned */}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
                              {profile?.full_name || "Unknown User"}
                            </p>
                            {profile?.role && (
                              <Badge className={cn("text-[10px] capitalize shrink-0", roleColor.badge)}>
                                {profile.role}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={cn(
                              "text-xs",
                              isOnline ? "text-green-400" : isAway ? "text-yellow-400" : "text-muted-foreground"
                            )}>
                              {isOnline ? "Active" : isAway ? `Away ${diffMins}m` : `${diffMins}m ago`}
                            </span>
                            {activity.current_page && (
                              <>
                                <span className="text-muted-foreground/50">•</span>
                                <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                                  {activity.current_page}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Session time & device */}
                        <div className="text-right shrink-0">
                          {activity.session_started_at && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{sessionDisplay}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-end gap-1 mt-0.5">
                            {isMobile ? (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-500/30 text-blue-400">
                                Mobile
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-gray-500/30 text-gray-400">
                                Desktop
                              </Badge>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Sheet */}
      <UserManagementSheet
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />

      {/* User Activity Sheet - for online users */}
      <UserActivitySheet
        userId={selectedOnlineUser?.userId || null}
        userName={selectedOnlineUser?.userName || null}
        userRole={selectedOnlineUser?.userRole || null}
        open={!!selectedOnlineUser}
        onOpenChange={(open) => !open && setSelectedOnlineUser(null)}
      />
    </div>
  );
}

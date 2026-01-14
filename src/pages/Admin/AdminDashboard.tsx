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
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import UserManagementSheet from "@/components/admin/UserManagementSheet";

// Helper to get initials from name
const getInitials = (name: string | null): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Role color mapping
const roleColors: Record<string, { bg: string; text: string; badge: string }> = {
  apprentice: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  electrician: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  employer: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
};

// UK Pricing tiers
const pricingTiers = {
  apprentice: { monthly: "£4.99", yearly: "£49.99" },
  electrician: { monthly: "£9.99", yearly: "£99.99" },
  employer: { monthly: "£29.99", yearly: "£299.99" },
};

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  // Fetch dashboard stats
  const { data: stats, isLoading, isFetching } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      // Get total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Get users signed up today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: signupsToday } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      // Get users signed up this week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { count: signupsThisWeek } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekAgo.toISOString());

      // Get users signed up this month
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      const { count: signupsThisMonth } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthAgo.toISOString());

      // Get active users (last 24 hours) from presence
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      const { count: activeToday } = await supabase
        .from("user_presence")
        .select("*", { count: "exact", head: true })
        .gte("last_seen", dayAgo.toISOString());

      // Get Elec-ID completion stats
      const { count: elecIdComplete } = await supabase
        .from("employer_elec_id_profiles")
        .select("*", { count: "exact", head: true });

      // Get all subscribed users with tiers
      const { data: subscribedData } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("subscribed", true);

      const subscribedUsers = subscribedData?.length || 0;
      const tierCounts = {
        apprentice: subscribedData?.filter(u => u.subscription_tier === "Apprentice").length || 0,
        electrician: subscribedData?.filter(u => u.subscription_tier === "Electrician").length || 0,
        employer: subscribedData?.filter(u => u.subscription_tier === "Employer").length || 0,
      };

      // Calculate MRR (Monthly Recurring Revenue)
      const mrr = (tierCounts.apprentice * 4.99) +
                  (tierCounts.electrician * 9.99) +
                  (tierCounts.employer * 29.99);

      // Get recent signups with emails via edge function
      const { data: edgeData } = await supabase.functions.invoke("admin-get-users");
      const usersWithEmails = edgeData?.users || [];
      const recentSignups = usersWithEmails.slice(0, 8);

      // Get recent activity from presence
      const { data: recentActivity } = await supabase
        .from("user_presence")
        .select("user_id, last_seen, profiles(full_name)")
        .order("last_seen", { ascending: false })
        .limit(5);

      return {
        totalUsers: totalUsers || 0,
        signupsToday: signupsToday || 0,
        signupsThisWeek: signupsThisWeek || 0,
        signupsThisMonth: signupsThisMonth || 0,
        activeToday: activeToday || 0,
        elecIdComplete: elecIdComplete || 0,
        subscribedUsers,
        tierCounts,
        mrr,
        recentSignups: recentSignups || [],
        recentActivity: recentActivity || [],
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
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
      <Card className="bg-gradient-to-br from-emerald-500/20 to-green-600/10 border-emerald-500/30 touch-manipulation">
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
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-purple-500/10 rounded-xl p-3 text-center">
              <GraduationCap className="h-4 w-4 text-purple-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-400">{stats?.tierCounts?.apprentice || 0}</p>
              <p className="text-[10px] text-muted-foreground">Apprentice</p>
              <p className="text-[10px] text-purple-400/70">{pricingTiers.apprentice.monthly}/mo</p>
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-3 text-center">
              <Zap className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-yellow-400">{stats?.tierCounts?.electrician || 0}</p>
              <p className="text-[10px] text-muted-foreground">Electrician</p>
              <p className="text-[10px] text-yellow-400/70">{pricingTiers.electrician.monthly}/mo</p>
            </div>
            <div className="bg-blue-500/10 rounded-xl p-3 text-center">
              <Building2 className="h-4 w-4 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-400">{stats?.tierCounts?.employer || 0}</p>
              <p className="text-[10px] text-muted-foreground">Employer</p>
              <p className="text-[10px] text-blue-400/70">{pricingTiers.employer.monthly}/mo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 touch-manipulation active:scale-[0.98] transition-transform">
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
                  const colors = roleColors[user.role?.toLowerCase()] || {
                    bg: "bg-gray-500/20",
                    text: "text-gray-400",
                    badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
                  };
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

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {stats?.recentActivity?.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4">No recent activity</p>
              ) : (
                stats?.recentActivity?.map((activity: any) => (
                  <div
                    key={activity.user_id}
                    className="flex items-center justify-between p-3 touch-manipulation active:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center relative">
                        <Activity className="h-4 w-4 text-green-400" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {(activity.profiles as any)?.full_name || "Unknown User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.last_seen), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))
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
    </div>
  );
}

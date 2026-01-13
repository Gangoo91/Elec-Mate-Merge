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
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState, useCallback } from "react";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

      // Get active users (last 24 hours) from presence
      const dayAgo = new Date();
      dayAgo.setDate(dayAgo.getDate() - 1);
      const { count: activeToday } = await supabase
        .from("user_presence")
        .select("*", { count: "exact", head: true })
        .gte("last_seen", dayAgo.toISOString());

      // Get Elec-ID completion stats
      const { count: elecIdComplete } = await supabase
        .from("elec_id_profiles")
        .select("*", { count: "exact", head: true });

      // Get subscribed users count
      const { count: subscribedUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("subscribed", true);

      // Get recent signups
      const { data: recentSignups } = await supabase
        .from("profiles")
        .select("id, full_name, created_at, role, admin_role")
        .order("created_at", { ascending: false })
        .limit(5);

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
        activeToday: activeToday || 0,
        elecIdComplete: elecIdComplete || 0,
        subscribedUsers: subscribedUsers || 0,
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
                <p className="text-xs text-muted-foreground">Signups Today</p>
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

        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 touch-manipulation active:scale-[0.98] transition-transform">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.subscribedUsers}</p>
                <p className="text-xs text-muted-foreground">Subscribed</p>
              </div>
              <CreditCard className="h-6 w-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 touch-manipulation active:scale-[0.98] transition-transform">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">{stats?.elecIdComplete}</p>
                <p className="text-xs text-muted-foreground">Elec-IDs</p>
              </div>
              <IdCard className="h-6 w-6 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20 touch-manipulation active:scale-[0.98] transition-transform">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">
                  {stats?.totalUsers ? ((stats.elecIdComplete / stats.totalUsers) * 100).toFixed(0) : 0}%
                </p>
                <p className="text-xs text-muted-foreground">Elec-ID Rate</p>
              </div>
              <UserCheck className="h-6 w-6 text-pink-400" />
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
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent Signups */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              Recent Signups
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {stats?.recentSignups?.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4">No recent signups</p>
              ) : (
                stats?.recentSignups?.map((user: any) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 touch-manipulation active:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.full_name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.role && (
                        <Badge variant="outline" className="text-[10px]">
                          {user.role}
                        </Badge>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))
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
    </div>
  );
}

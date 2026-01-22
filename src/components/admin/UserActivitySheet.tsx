import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Clock,
  Monitor,
  Smartphone,
  MapPin,
  Activity,
  Zap,
  FileText,
  Shield,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import { getInitials, getRoleColor } from "@/utils/adminUtils";

interface UserActivitySheetProps {
  userId: string | null;
  userName: string | null;
  userRole: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserActivitySheet({
  userId,
  userName,
  userRole,
  open,
  onOpenChange,
}: UserActivitySheetProps) {
  // Fetch user presence and activity data
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["user-activity", userId],
    queryFn: async () => {
      if (!userId) return null;

      // Fetch presence, AI jobs, and profile in parallel
      const [presenceRes, costJobsRes, ramsJobsRes, circuitJobsRes, profileRes] = await Promise.all([
        supabase
          .from("user_presence")
          .select("*")
          .eq("user_id", userId)
          .single(),
        supabase
          .from("cost_engineer_jobs")
          .select("id, status, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("health_safety_jobs")
          .select("id, status, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("circuit_design_jobs")
          .select("id, status, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("profiles")
          .select("created_at, subscribed, subscription_tier, free_access_granted, role")
          .eq("id", userId)
          .single(),
      ]);

      return {
        presence: presenceRes.data,
        costJobs: costJobsRes.data || [],
        ramsJobs: ramsJobsRes.data || [],
        circuitJobs: circuitJobsRes.data || [],
        profile: profileRes.data,
      };
    },
    enabled: !!userId && open,
    refetchInterval: 10000, // Refresh every 10 seconds while open
  });

  const presence = activityData?.presence;
  const profile = activityData?.profile;
  const roleColor = getRoleColor(userRole);

  // Calculate session duration
  const sessionDuration = presence?.session_started_at
    ? differenceInMinutes(new Date(), new Date(presence.session_started_at))
    : 0;

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  // Status indicator
  const lastSeenMs = presence?.last_seen ? new Date(presence.last_seen).getTime() : 0;
  const nowMs = Date.now();
  const diffMins = Math.floor((nowMs - lastSeenMs) / 60000);
  const isOnline = diffMins < 5;
  const isAway = diffMins >= 5 && diffMins < 10;
  const statusColor = isOnline ? "bg-green-500" : isAway ? "bg-yellow-500" : "bg-gray-500";
  const statusText = isOnline ? "Online" : isAway ? "Away" : "Offline";

  // Device info
  const deviceInfo = presence?.device_info as { isMobile?: boolean; platform?: string } | null;
  const isMobile = deviceInfo?.isMobile;

  // AI usage stats
  const totalCostJobs = activityData?.costJobs?.length || 0;
  const totalRamsJobs = activityData?.ramsJobs?.length || 0;
  const totalCircuitJobs = activityData?.circuitJobs?.length || 0;
  const totalAiJobs = totalCostJobs + totalRamsJobs + totalCircuitJobs;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-border">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center relative font-bold text-xl",
                roleColor.bg, roleColor.text
              )}>
                {getInitials(userName)}
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                  statusColor
                )} />
              </div>

              <div className="flex-1">
                <SheetTitle className="text-xl text-left">{userName || "Unknown User"}</SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  {userRole && (
                    <Badge className={cn("text-xs capitalize", roleColor.badge)}>
                      {userRole}
                    </Badge>
                  )}
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    isOnline ? "border-green-500/50 text-green-400" :
                    isAway ? "border-yellow-500/50 text-yellow-400" :
                    "border-gray-500/50 text-gray-400"
                  )}>
                    {statusText}
                  </Badge>
                  {profile?.subscribed && (
                    <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      {profile.subscription_tier || "Subscribed"}
                    </Badge>
                  )}
                  {profile?.free_access_granted && !profile?.subscribed && (
                    <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                      Beta Access
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Session Info */}
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-400" />
                      Current Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    {/* Session Duration */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <Clock className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-xs text-muted-foreground">Session Time</p>
                        <p className="font-semibold text-green-400">
                          {presence?.session_started_at ? formatDuration(sessionDuration) : "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Device */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      {isMobile ? (
                        <Smartphone className="h-5 w-5 text-blue-400" />
                      ) : (
                        <Monitor className="h-5 w-5 text-blue-400" />
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground">Device</p>
                        <p className="font-semibold text-blue-400">
                          {isMobile ? "Mobile" : "Desktop"}
                        </p>
                      </div>
                    </div>

                    {/* Current Page */}
                    <div className="col-span-2 flex items-center gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <MapPin className="h-5 w-5 text-purple-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Current Page</p>
                        <p className="font-semibold text-purple-400 truncate">
                          {presence?.current_page || "Unknown"}
                        </p>
                      </div>
                    </div>

                    {/* Last Seen */}
                    <div className="col-span-2 flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Last Activity</p>
                        <p className="font-medium">
                          {presence?.last_seen
                            ? formatDistanceToNow(new Date(presence.last_seen), { addSuffix: true })
                            : "Never"
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Usage Stats */}
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      AI Tool Usage
                      <Badge className="ml-auto text-xs bg-yellow-500/20 text-yellow-400">
                        {totalAiJobs} total
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-3">
                    {/* Cost Engineer */}
                    <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <Calculator className="h-6 w-6 text-amber-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-amber-400">{totalCostJobs}</p>
                      <p className="text-[10px] text-muted-foreground">Cost Engineer</p>
                    </div>

                    {/* RAMS */}
                    <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <Shield className="h-6 w-6 text-red-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-red-400">{totalRamsJobs}</p>
                      <p className="text-[10px] text-muted-foreground">RAMS</p>
                    </div>

                    {/* Circuit Design */}
                    <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <FileText className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-blue-400">{totalCircuitJobs}</p>
                      <p className="text-[10px] text-muted-foreground">Circuit Design</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent AI Jobs */}
                {totalAiJobs > 0 && (
                  <Card className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Recent AI Jobs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {[
                        ...(activityData?.costJobs || []).map(j => ({ ...j, type: 'Cost Engineer', color: 'amber' })),
                        ...(activityData?.ramsJobs || []).map(j => ({ ...j, type: 'RAMS', color: 'red' })),
                        ...(activityData?.circuitJobs || []).map(j => ({ ...j, type: 'Circuit', color: 'blue' })),
                      ]
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 5)
                        .map((job) => (
                          <div
                            key={job.id}
                            className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                          >
                            <div className="flex items-center gap-2">
                              <Badge className={cn(
                                "text-[10px]",
                                job.color === 'amber' && "bg-amber-500/20 text-amber-400",
                                job.color === 'red' && "bg-red-500/20 text-red-400",
                                job.color === 'blue' && "bg-blue-500/20 text-blue-400"
                              )}>
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className={cn(
                                "text-[10px]",
                                job.status === 'completed' && "border-green-500/50 text-green-400",
                                job.status === 'processing' && "border-yellow-500/50 text-yellow-400",
                                job.status === 'failed' && "border-red-500/50 text-red-400"
                              )}>
                                {job.status}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                )}

                {/* Account Info */}
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Account Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span>
                        {profile?.created_at
                          ? new Date(profile.created_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })
                          : "Unknown"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subscription</span>
                      <span className={profile?.subscribed ? "text-green-400" : "text-muted-foreground"}>
                        {profile?.subscribed
                          ? profile.subscription_tier || "Active"
                          : profile?.free_access_granted
                            ? "Beta Access"
                            : "Free Trial"
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

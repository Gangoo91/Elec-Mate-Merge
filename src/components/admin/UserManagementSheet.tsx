import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Calendar,
  Zap,
  Gift,
  Crown,
  Loader2,
  CheckCircle,
  XCircle,
  GraduationCap,
  Building2,
  MessageSquare,
  Clock,
  Eye,
  Activity,
  Flame,
  Snowflake,
  LogIn,
  Send,
  Timer,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/utils";
import { getInitials, getRoleColor } from "@/utils/adminUtils";
import MessageUserSheet from "./MessageUserSheet";

interface UserData {
  id: string;
  full_name: string | null;
  email?: string;
  role?: string;
  subscribed?: boolean;
  subscription_tier?: string;
  stripe_customer_id?: string | null;
  free_access_granted?: boolean;
  free_access_expires_at?: string | null;
  free_access_reason?: string | null;
  created_at: string;
  last_sign_in_at?: string | null;
}

// Format seconds into human readable time
const formatTimeSpent = (seconds: number): string => {
  if (!seconds || seconds === 0) return "0m";
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

interface UserManagementSheetProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tierPricing: Record<string, string> = {
  Apprentice: "£4.99/mo",
  Electrician: "£9.99/mo",
  Employer: "£29.99/mo",
};

export default function UserManagementSheet({
  user,
  open,
  onOpenChange,
}: UserManagementSheetProps) {
  const queryClient = useQueryClient();
  const [selectedTier, setSelectedTier] = useState<string>("Employer");
  const [expiresOption, setExpiresOption] = useState<string>("never");
  const [customExpiry, setCustomExpiry] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [messageSheetOpen, setMessageSheetOpen] = useState(false);

  // Fetch user activity data
  const { data: activityData } = useQuery({
    queryKey: ["user-activity", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Get activity summary
      const { data: summary } = await supabase
        .from("user_activity_summary")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Get user_activity for points/streak
      const { data: userActivity } = await supabase
        .from("user_activity")
        .select("points, streak, last_active_date")
        .eq("user_id", user.id)
        .maybeSingle();

      return {
        loginCount: summary?.login_count || 0,
        pageViewCount: summary?.page_view_count || 0,
        featureUseCount: summary?.feature_use_count || 0,
        totalSecondsTracked: summary?.total_seconds_tracked || 0,
        uniquePagesVisited: summary?.unique_pages_visited || 0,
        activeDays: summary?.active_days || 0,
        lastActivity: summary?.last_activity,
        points: userActivity?.points || 0,
        streak: userActivity?.streak || 0,
      };
    },
    enabled: !!user?.id && open,
    staleTime: 30 * 1000,
  });

  // Send trial reminder email mutation
  const sendEmailMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user selected");
      const { data, error } = await supabase.functions.invoke("send-trial-reminder", {
        body: { userId: user.id, type: "reminder" },
      });
      if (error) throw error;
      if (data?.skipped) {
        throw new Error("Email already sent today");
      }
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Email Sent",
        description: `Trial reminder sent to ${user?.full_name}`,
      });
      queryClient.invalidateQueries({ queryKey: ["admin-email-sends-today"] });
    },
    onError: (error) => {
      toast({
        title: "Email Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Grant free access mutation
  const grantMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user selected");

      let expires_at: string | null = null;
      if (expiresOption === "30days") {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        expires_at = date.toISOString();
      } else if (expiresOption === "90days") {
        const date = new Date();
        date.setDate(date.getDate() + 90);
        expires_at = date.toISOString();
      } else if (expiresOption === "1year") {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        expires_at = date.toISOString();
      } else if (expiresOption === "custom" && customExpiry) {
        expires_at = new Date(customExpiry).toISOString();
      }

      const { data, error } = await supabase.functions.invoke(
        "admin-manage-subscription",
        {
          body: {
            action: "grant_free_access",
            target_user_id: user.id,
            subscription_tier: selectedTier,
            expires_at,
            reason: reason || undefined,
          },
        }
      );

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "Access Granted",
        description: `${user?.full_name} now has ${selectedTier} access`,
      });
      onOpenChange(false);
      setReason("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Revoke free access mutation
  const revokeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No user selected");

      const { data, error } = await supabase.functions.invoke(
        "admin-manage-subscription",
        {
          body: {
            action: "revoke_free_access",
            target_user_id: user.id,
            reason: reason || "Admin revoked",
          },
        }
      );

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "Access Revoked",
        description: `${user?.full_name}'s free access has been revoked`,
      });
      onOpenChange(false);
      setReason("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!user) return null;

  const colors = getRoleColor(user.role);

  const isLoading = grantMutation.isPending || revokeMutation.isPending;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          <SheetHeader className="px-4 pb-4 border-b border-border">
            <SheetTitle className="text-left">Manage User</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* User Header */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold",
                  colors.bg,
                  colors.text
                )}
              >
                {getInitials(user.full_name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {user.full_name || "Unknown"}
                </h3>
                {user.email && (
                  <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  {user.role && (
                    <Badge className={cn("text-xs capitalize", colors.bg, colors.text)}>
                      {user.role}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 h-11 touch-manipulation"
                onClick={() => setMessageSheetOpen(true)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message User
              </Button>
              {!user.subscribed && (
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  onClick={() => sendEmailMutation.mutate()}
                  disabled={sendEmailMutation.isPending}
                >
                  {sendEmailMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send Reminder
                </Button>
              )}
            </div>

            {/* Activity & Engagement */}
            <div className="rounded-xl border border-border p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-400" />
                Activity & Engagement
              </h4>

              {/* Activity Status Banner */}
              {(() => {
                const hasActivity = activityData && (activityData.loginCount > 0 || activityData.totalSecondsTracked > 0);
                const lastLogin = user.last_sign_in_at;
                const neverLoggedIn = !lastLogin && !hasActivity;
                const signedUpButLeft = lastLogin && !hasActivity;

                if (neverLoggedIn) {
                  return (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Snowflake className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-blue-400">Never Logged In</p>
                        <p className="text-xs text-muted-foreground">User hasn't returned since signup</p>
                      </div>
                    </div>
                  );
                }

                if (signedUpButLeft) {
                  return (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      <div>
                        <p className="text-sm font-medium text-amber-400">Signed Up & Left</p>
                        <p className="text-xs text-muted-foreground">
                          Last seen: {formatDistanceToNow(new Date(lastLogin), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                }

                if (hasActivity) {
                  const isHot = (activityData?.totalSecondsTracked || 0) > 300 || (activityData?.featureUseCount || 0) > 2;
                  return (
                    <div className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border",
                      isHot ? "bg-green-500/10 border-green-500/20" : "bg-amber-500/10 border-amber-500/20"
                    )}>
                      {isHot ? (
                        <Flame className="h-5 w-5 text-green-400" />
                      ) : (
                        <Activity className="h-5 w-5 text-amber-400" />
                      )}
                      <div>
                        <p className={cn("text-sm font-medium", isHot ? "text-green-400" : "text-amber-400")}>
                          {isHot ? "Engaged User" : "Some Activity"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activityData?.lastActivity
                            ? `Last active: ${formatDistanceToNow(new Date(activityData.lastActivity), { addSuffix: true })}`
                            : lastLogin
                              ? `Last login: ${formatDistanceToNow(new Date(lastLogin), { addSuffix: true })}`
                              : ""}
                        </p>
                      </div>
                    </div>
                  );
                }

                return null;
              })()}

              {/* Activity Stats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <Timer className="h-4 w-4 text-teal-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{formatTimeSpent(activityData?.totalSecondsTracked || 0)}</p>
                  <p className="text-[10px] text-muted-foreground">Time in App</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <Eye className="h-4 w-4 text-sky-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{activityData?.uniquePagesVisited || 0}</p>
                  <p className="text-[10px] text-muted-foreground">Pages Viewed</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <LogIn className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-lg font-bold">{activityData?.loginCount || 0}</p>
                  <p className="text-[10px] text-muted-foreground">Logins</p>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Features Used</span>
                  <span className="font-medium">{activityData?.featureUseCount || 0}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-muted-foreground">Active Days</span>
                  <span className="font-medium">{activityData?.activeDays || 0}</span>
                </div>
              </div>
            </div>

            {/* Current Subscription Status */}
            <div className="rounded-xl border border-border p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                Subscription Status
              </h4>

              {user.subscribed ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-green-400">Active</span>
                    {user.subscription_tier && (
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        {user.subscription_tier} - {tierPricing[user.subscription_tier] || ""}
                      </Badge>
                    )}
                  </div>

                  {user.free_access_granted && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Gift className="h-4 w-4 text-purple-400" />
                      <span>Admin-granted free access</span>
                    </div>
                  )}

                  {user.free_access_expires_at && (
                    <p className="text-sm text-muted-foreground">
                      Expires: {format(new Date(user.free_access_expires_at), "dd MMM yyyy")}
                    </p>
                  )}

                  {user.free_access_reason && (
                    <p className="text-sm text-muted-foreground">
                      Reason: {user.free_access_reason}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <span className="text-red-400">Not Subscribed</span>
                </div>
              )}
            </div>

            {/* Actions */}
            {!user.subscribed || user.free_access_granted ? (
              <div className="rounded-xl border border-border p-4 space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Gift className="h-4 w-4 text-purple-400" />
                  {user.free_access_granted ? "Manage Free Access" : "Grant Free Access"}
                </h4>

                {!user.free_access_granted && (
                  <>
                    {/* Tier Selection */}
                    <div className="space-y-2">
                      <Label>Subscription Tier</Label>
                      <Select value={selectedTier} onValueChange={setSelectedTier}>
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Apprentice">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-purple-400" />
                              Apprentice - £4.99/mo
                            </div>
                          </SelectItem>
                          <SelectItem value="Electrician">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-yellow-400" />
                              Electrician - £9.99/mo
                            </div>
                          </SelectItem>
                          <SelectItem value="Employer">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-blue-400" />
                              Employer - £29.99/mo
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Expiry Selection */}
                    <div className="space-y-2">
                      <Label>Access Duration</Label>
                      <Select value={expiresOption} onValueChange={setExpiresOption}>
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never expires</SelectItem>
                          <SelectItem value="30days">30 days</SelectItem>
                          <SelectItem value="90days">90 days</SelectItem>
                          <SelectItem value="1year">1 year</SelectItem>
                          <SelectItem value="custom">Custom date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {expiresOption === "custom" && (
                      <div className="space-y-2">
                        <Label>Expiry Date</Label>
                        <Input
                          type="date"
                          value={customExpiry}
                          onChange={(e) => setCustomExpiry(e.target.value)}
                          className="h-11 touch-manipulation"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    )}

                    {/* Reason */}
                    <div className="space-y-2">
                      <Label>Reason (optional)</Label>
                      <Input
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="e.g., Beta tester, Competition winner"
                        className="h-11 touch-manipulation"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
                <p className="text-sm text-amber-400">
                  This user has an active Stripe subscription. To manage their subscription,
                  they should use the customer portal or contact support.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <SheetFooter className="p-4 border-t border-border gap-2">
            {/* Show Revoke for any admin-granted access (free_access_granted OR subscribed without Stripe) */}
            {(user.free_access_granted || (user.subscribed && !user.stripe_customer_id)) ? (
              <Button
                variant="destructive"
                className="flex-1 h-12 touch-manipulation"
                onClick={() => revokeMutation.mutate()}
                disabled={isLoading}
              >
                {revokeMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Revoke Access
                  </>
                )}
              </Button>
            ) : !user.subscribed ? (
              <Button
                className="flex-1 h-12 touch-manipulation bg-purple-600 hover:bg-purple-700"
                onClick={() => grantMutation.mutate()}
                disabled={isLoading}
              >
                {grantMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Granting...
                  </>
                ) : (
                  <>
                    <Gift className="h-4 w-4 mr-2" />
                    Grant Free Access
                  </>
                )}
              </Button>
            ) : (
              <p className="flex-1 text-sm text-muted-foreground text-center py-3">
                Managed via Stripe subscription
              </p>
            )}
          </SheetFooter>
        </div>
      </SheetContent>

      {/* Message User Sheet */}
      <MessageUserSheet
        open={messageSheetOpen}
        onOpenChange={setMessageSheetOpen}
        user={user ? {
          id: user.id,
          full_name: user.full_name || undefined,
          email: user.email,
          role: user.role,
        } : null}
      />
    </Sheet>
  );
}

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Search,
  Shield,
  ShieldOff,
  ShieldCheck,
  UserCheck,
  IdCard,
  ChevronRight,
  RefreshCw,
  Users,
  Crown,
  Zap,
  Clock,
  Calendar,
  CreditCard,
  Mail,
  User,
  MoreHorizontal,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
  admin_role: string | null;
  subscribed: boolean;
  subscription_tier: string | null;
  created_at: string;
  updated_at: string | null;
  elec_id_enabled: boolean;
  onboarding_completed: boolean;
  last_seen?: string;
  isOnline?: boolean;
  email?: string | null;
  email_confirmed?: boolean;
  last_sign_in?: string | null;
}

const roleColors: Record<string, { bg: string; text: string; border: string }> = {
  electrician: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  apprentice: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  employer: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  college: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  visitor: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/30" },
};

const roleFilters = [
  { value: "all", label: "All" },
  { value: "electrician", label: "Sparks" },
  { value: "apprentice", label: "Apprentice" },
  { value: "employer", label: "Employer" },
  { value: "college", label: "College" },
];

export default function AdminUsers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch users with emails via edge function
  const { data: users, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-users", search, roleFilter],
    queryFn: async () => {
      // Use edge function to get users with emails
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke("admin-get-users");

      if (edgeError) {
        console.error("Edge function error:", edgeError);
        throw edgeError;
      }

      let allUsers = edgeData?.users || [];

      // Apply filters client-side
      if (search) {
        const searchLower = search.toLowerCase();
        allUsers = allUsers.filter((u: UserProfile) =>
          u.full_name?.toLowerCase().includes(searchLower) ||
          u.username?.toLowerCase().includes(searchLower) ||
          u.email?.toLowerCase().includes(searchLower)
        );
      }

      if (roleFilter !== "all") {
        allUsers = allUsers.filter((u: UserProfile) => u.role === roleFilter);
      }

      // Get presence data
      const { data: presenceData } = await supabase
        .from("user_presence")
        .select("user_id, last_seen")
        .in("user_id", allUsers?.map((u: UserProfile) => u.id) || []);

      const presenceMap = new Map(
        presenceData?.map((p) => [p.user_id, p.last_seen]) || []
      );

      return allUsers?.map((user: UserProfile) => ({
        ...user,
        last_seen: presenceMap.get(user.id) || user.last_seen,
        isOnline:
          presenceMap.get(user.id) &&
          new Date(presenceMap.get(user.id)!).getTime() > Date.now() - 5 * 60 * 1000,
      })) as UserProfile[];
    },
  });

  // Get stats
  const stats = {
    total: users?.length || 0,
    online: users?.filter((u) => u.isOnline).length || 0,
    subscribed: users?.filter((u) => u.subscribed).length || 0,
    admins: users?.filter((u) => u.admin_role).length || 0,
  };

  // Grant admin mutation
  const grantAdminMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | null }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ admin_role: role })
        .eq("id", userId);
      if (error) throw error;

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: role ? "grant_admin" : "revoke_admin",
        entity_type: "profile",
        entity_id: userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setSelectedUser(null);
      toast({ title: "Admin access updated" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleStyle = (role: string | null) => {
    return roleColors[role || "visitor"] || roleColors.visitor;
  };

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-lg font-bold">{stats.total}</p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-lg font-bold">{stats.online}</p>
                <p className="text-[10px] text-muted-foreground">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-amber-400" />
              <div>
                <p className="text-lg font-bold">{stats.subscribed}</p>
                <p className="text-[10px] text-muted-foreground">Subscribed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-lg font-bold">{stats.admins}</p>
                <p className="text-[10px] text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 touch-manipulation text-base rounded-xl"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 touch-manipulation rounded-xl"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Role Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {roleFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={roleFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => setRoleFilter(filter.value)}
            className={`shrink-0 h-9 px-4 rounded-full touch-manipulation ${
              roleFilter === filter.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50"
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* User Cards */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-32" />
                    <div className="h-3 bg-muted rounded w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : users?.length === 0 ? (
        <Card>
          <CardContent className="pt-8 pb-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No users found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {users?.map((user) => {
            const roleStyle = getRoleStyle(user.role);
            return (
              <Card
                key={user.id}
                className="touch-manipulation active:scale-[0.98] transition-all duration-150 cursor-pointer border-transparent hover:border-primary/20"
                onClick={() => setSelectedUser(user)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="h-14 w-14 rounded-2xl border-2 border-muted">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback className={`rounded-2xl text-lg font-bold ${roleStyle.bg} ${roleStyle.text}`}>
                          {getInitials(user.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Online indicator */}
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                      {/* Admin crown */}
                      {user.admin_role && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <Crown className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-base truncate">
                          {user.full_name || "No name"}
                        </p>
                        {user.subscribed && (
                          <Zap className="h-4 w-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      {user.email ? (
                        <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground truncate">
                          @{user.username || "unknown"}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0 h-5 ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}
                        >
                          {user.role || "visitor"}
                        </Badge>
                        {user.elec_id_enabled && (
                          <Badge variant="outline" className="text-[10px] px-2 py-0 h-5 bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                            <IdCard className="h-3 w-3 mr-1" />
                            ID
                          </Badge>
                        )}
                        {user.admin_role && (
                          <Badge className="text-[10px] px-2 py-0 h-5 bg-red-500/20 text-red-400 border-red-500/30">
                            {user.admin_role === "super_admin" ? "Super" : "Admin"}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* User Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* User Header */}
            <div className="px-6 pb-6 pt-2 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 rounded-3xl border-4 border-muted">
                    <AvatarImage src={selectedUser?.avatar_url || undefined} />
                    <AvatarFallback className={`rounded-3xl text-2xl font-bold ${getRoleStyle(selectedUser?.role).bg} ${getRoleStyle(selectedUser?.role).text}`}>
                      {getInitials(selectedUser?.full_name || null)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedUser?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-background" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedUser?.full_name || "No name"}</h2>
                  {selectedUser?.email && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {selectedUser.email}
                      {selectedUser.email_confirmed && (
                        <UserCheck className="h-3.5 w-3.5 text-green-400" />
                      )}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm">@{selectedUser?.username || "unknown"}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={`${getRoleStyle(selectedUser?.role).bg} ${getRoleStyle(selectedUser?.role).text}`}>
                      {selectedUser?.role || "visitor"}
                    </Badge>
                    {selectedUser?.subscribed && (
                      <Badge className="bg-amber-500/20 text-amber-400">
                        <Zap className="h-3 w-3 mr-1" />
                        {selectedUser.subscription_tier || "Subscribed"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card className={selectedUser?.isOnline ? "bg-green-500/10 border-green-500/30" : "bg-muted/50"}>
                  <CardContent className="pt-4 pb-4 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${selectedUser?.isOnline ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`} />
                    <p className="text-sm font-medium">{selectedUser?.isOnline ? "Online" : "Offline"}</p>
                    {selectedUser?.last_seen && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(selectedUser.last_seen), { addSuffix: true })}
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card className={selectedUser?.subscribed ? "bg-amber-500/10 border-amber-500/30" : "bg-muted/50"}>
                  <CardContent className="pt-4 pb-4 text-center">
                    <CreditCard className={`h-5 w-5 mx-auto mb-2 ${selectedUser?.subscribed ? "text-amber-400" : "text-muted-foreground"}`} />
                    <p className="text-sm font-medium">{selectedUser?.subscribed ? "Subscribed" : "Free"}</p>
                    {selectedUser?.subscription_tier && (
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{selectedUser.subscription_tier}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Info Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">User ID</span>
                    <span className="text-xs font-mono text-muted-foreground">{selectedUser?.id.slice(0, 8)}...</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Joined</span>
                    <span className="text-sm">
                      {selectedUser?.created_at && format(new Date(selectedUser.created_at), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Onboarding</span>
                    <Badge variant="outline" className={selectedUser?.onboarding_completed ? "bg-green-500/10 text-green-400" : ""}>
                      {selectedUser?.onboarding_completed ? "Complete" : "Incomplete"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Elec-ID</span>
                    <Badge variant="outline" className={selectedUser?.elec_id_enabled ? "bg-cyan-500/10 text-cyan-400" : ""}>
                      {selectedUser?.elec_id_enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Status Card */}
              <Card className={selectedUser?.admin_role ? "border-red-500/30 bg-red-500/5" : ""}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${selectedUser?.admin_role ? "text-red-400" : ""}`} />
                    Admin Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedUser?.admin_role ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold">
                          {selectedUser.admin_role === "super_admin" ? "Super Admin" : "Admin"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Has administrative privileges
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                        <User className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Regular User</p>
                        <p className="text-sm text-muted-foreground">
                          No administrative access
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Actions Footer */}
            {isSuperAdmin && selectedUser?.admin_role !== "super_admin" && (
              <SheetFooter className="p-4 border-t border-border">
                <Button
                  className={`w-full h-14 touch-manipulation rounded-2xl text-base font-semibold ${
                    selectedUser?.admin_role
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  }`}
                  onClick={() =>
                    selectedUser &&
                    grantAdminMutation.mutate({
                      userId: selectedUser.id,
                      role: selectedUser.admin_role ? null : "admin",
                    })
                  }
                  disabled={grantAdminMutation.isPending}
                >
                  {selectedUser?.admin_role ? (
                    <>
                      <ShieldOff className="h-5 w-5 mr-2" />
                      Remove Admin Access
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Grant Admin Access
                    </>
                  )}
                </Button>
              </SheetFooter>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

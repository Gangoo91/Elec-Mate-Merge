import { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
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
  Trash2,
  Gift,
  AlertTriangle,
  XCircle,
  CheckSquare,
  Square,
  Loader2,
  MessageSquare,
  Filter,
  X,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { getInitials, ROLE_COLORS } from "@/utils/adminUtils";
import MessageUserSheet from "@/components/admin/MessageUserSheet";
import { useAdminUsersBase } from "@/hooks/useAdminUsersBase";
import { useHaptic } from "@/hooks/useHaptic";
import PullToRefresh from "@/components/admin/PullToRefresh";

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
  admin_role: string | null;
  subscribed: boolean;
  subscription_tier: string | null;
  stripe_customer_id?: string | null;
  free_access_granted?: boolean;
  created_at: string;
  updated_at: string | null;
  elec_id_enabled: boolean;
  onboarding_completed: boolean;
  last_seen?: string;
  isOnline?: boolean;
  email?: string | null;
  email_confirmed?: boolean;
  last_sign_in?: string | null;
  elec_id_profile?: {
    id: string;
    elec_id_number: string | null;
    is_verified: boolean;
    activated: boolean;
    ecs_card_type: string | null;
  } | null;
}

const roleColors: Record<string, { bg: string; text: string; border: string }> = Object.fromEntries(
  Object.entries(ROLE_COLORS).map(([role, colors]) => [
    role,
    { bg: colors.bg.replace('/20', '/10'), text: colors.text, border: colors.badge.split(' ').pop() || 'border-gray-500/30' }
  ])
);

const roleFilters = [
  { value: "all", label: "All", icon: Users },
  { value: "electrician", label: "Sparks", icon: Zap },
  { value: "apprentice", label: "Apprentice", icon: User },
  { value: "employer", label: "Employer", icon: Crown },
];

const quickFilters = [
  { value: "all", label: "All Users" },
  { value: "subscribed", label: "Subscribers" },
  { value: "online", label: "Online Now" },
  { value: "recent", label: "New This Week" },
];

export default function AdminUsers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageSheetOpen, setMessageSheetOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionPending, setBulkActionPending] = useState(false);

  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (urlFilter && quickFilters.some(f => f.value === urlFilter)) {
      setQuickFilter(urlFilter);
    }
  }, [searchParams]);

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Shared cached edge function call — reused across AdminUsers/AdminTrials
  const { data: baseUsers, isLoading: baseLoading, refetch: refetchBase, isFetching: baseFetching } = useAdminUsersBase();

  const { data: users, isLoading: enrichmentLoading, refetch: refetchEnrichment, isFetching: enrichmentFetching } = useQuery({
    queryKey: ["admin-users-enriched", search, roleFilter, quickFilter],
    enabled: !!baseUsers,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    queryFn: async () => {
      let allUsers = [...(baseUsers || [])];
      const userIds = allUsers.map((u: UserProfile) => u.id);

      const [{ data: presenceData }, { data: elecIdData }] = await Promise.all([
        supabase
          .from("user_presence")
          .select("user_id, last_seen")
          .in("user_id", userIds),
        supabase
          .from("employer_elec_id_profiles")
          .select("id, employee_id, elec_id_number, is_verified, activated, ecs_card_type")
          .in("employee_id", userIds),
      ]);

      const elecIdMap = new Map(
        elecIdData?.map((p) => [p.employee_id, {
          id: p.id,
          elec_id_number: p.elec_id_number,
          is_verified: p.is_verified,
          activated: p.activated,
          ecs_card_type: p.ecs_card_type,
        }]) || []
      );

      allUsers = allUsers.map((user: UserProfile) => ({
        ...user,
        last_seen: presenceMap.get(user.id) || user.last_seen,
        isOnline:
          presenceMap.get(user.id) &&
          new Date(presenceMap.get(user.id)!).getTime() > Date.now() - 5 * 60 * 1000,
        elec_id_profile: elecIdMap.get(user.id) || null,
      }));

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

      if (quickFilter !== "all") {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        switch (quickFilter) {
          case "subscribed":
            allUsers = allUsers.filter((u: UserProfile) => u.subscribed);
            break;
          case "online":
            allUsers = allUsers.filter((u: UserProfile) => u.isOnline);
            break;
          case "recent":
            allUsers = allUsers.filter((u: UserProfile) =>
              u.created_at && new Date(u.created_at) >= weekAgo
            );
            break;
        }
      }

      return allUsers as UserProfile[];
    },
  });

  const isLoading = baseLoading || enrichmentLoading;
  const isFetching = baseFetching || enrichmentFetching;
  const refetch = async () => {
    await refetchBase();
    await refetchEnrichment();
  };

  const allUsersCount = useMemo(() => {
    return users?.length || 0;
  }, [users]);

  const stats = useMemo(() => ({
    total: users?.length || 0,
    online: users?.filter((u) => u.isOnline).length || 0,
    subscribed: users?.filter((u) => u.subscribed).length || 0,
    admins: users?.filter((u) => u.admin_role).length || 0,
    elecIds: users?.filter((u) => u.elec_id_profile).length || 0,
    thisWeek: users?.filter((u) => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return u.created_at && new Date(u.created_at) >= weekAgo;
    }).length || 0,
  }), [users]);

  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    if (!users) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [search, roleFilter, quickFilter]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedUsers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const isAllSelected = paginatedUsers.length > 0 && selectedIds.size === paginatedUsers.length;

  const bulkGrantMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      setBulkActionPending(true);
      const results = await Promise.allSettled(
        userIds.map((userId) =>
          supabase.functions.invoke("admin-grant-subscription", {
            body: { userId, tier: "Employer" },
          })
        )
      );
      const failures = results.filter((r) => r.status === "rejected").length;
      if (failures > 0) {
        throw new Error(`${failures} of ${userIds.length} grants failed`);
      }
      return results;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-enriched"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      setSelectedIds(new Set());
      toast({ title: "Access granted", description: `Granted access to ${selectedIds.size} users` });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
    onSettled: () => {
      setBulkActionPending(false);
    },
  });

  const bulkRevokeMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      setBulkActionPending(true);
      const results = await Promise.allSettled(
        userIds.map((userId) =>
          supabase.functions.invoke("admin-manage-subscription", {
            body: { action: "revoke_free_access", target_user_id: userId },
          })
        )
      );
      const failures = results.filter((r) => r.status === "rejected").length;
      if (failures > 0) {
        throw new Error(`${failures} of ${userIds.length} revokes failed`);
      }
      return results;
    },
    onSuccess: () => {
      haptic.warning();
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-enriched"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      setSelectedIds(new Set());
      toast({ title: "Access revoked", description: `Revoked access from ${selectedIds.size} users` });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
    onSettled: () => {
      setBulkActionPending(false);
    },
  });

  const grantAdminMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | null }) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-role", {
        body: { userId, adminRole: role },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: role ? "grant_admin" : "revoke_admin",
        entity_type: "profile",
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-enriched"] });
      setSelectedUser(null);
      toast({ title: "Admin access updated" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const grantSubscriptionMutation = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) => {
      const { data, error } = await supabase.functions.invoke("admin-grant-subscription", {
        body: { userId, tier },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "grant_subscription",
        entity_type: "profile",
        entity_id: userId,
        details: { tier },
      });

      return data;
    },
    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: ["admin-users-enriched"] });
      const previousUsers = queryClient.getQueryData(["admin-users-enriched", search, roleFilter, quickFilter]);

      queryClient.setQueryData(
        ["admin-users-enriched", search, roleFilter, quickFilter],
        (old: UserProfile[] | undefined) =>
          old?.map((u) =>
            u.id === userId ? { ...u, subscribed: true, free_access_granted: true } : u
          )
      );

      if (selectedUser?.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, subscribed: true, free_access_granted: true } : null
        );
      }

      toast({ title: "Granting access...", description: "Please wait" });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["admin-users-enriched", search, roleFilter, quickFilter], context.previousUsers);
      }
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
    onSuccess: () => {
      haptic.success();
      setSelectedUser(null);
      toast({ title: "Subscription granted", description: "User now has free access" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-enriched"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
  });

  const revokeSubscriptionMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-subscription", {
        body: { action: "revoke_free_access", target_user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "revoke_subscription",
        entity_type: "profile",
        entity_id: userId,
      });

      return data;
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ["admin-users-enriched"] });
      const previousUsers = queryClient.getQueryData(["admin-users-enriched", search, roleFilter, quickFilter]);

      queryClient.setQueryData(
        ["admin-users-enriched", search, roleFilter, quickFilter],
        (old: UserProfile[] | undefined) =>
          old?.map((u) =>
            u.id === userId ? { ...u, subscribed: false, free_access_granted: false } : u
          )
      );

      if (selectedUser?.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, subscribed: false, free_access_granted: false } : null
        );
      }

      toast({ title: "Revoking access...", description: "Please wait" });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["admin-users-enriched", search, roleFilter, quickFilter], context.previousUsers);
      }
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
    onSuccess: () => {
      haptic.warning();
      setSelectedUser(null);
      toast({ title: "Access revoked", description: "User subscription removed" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-enriched"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke("admin-delete-user", {
        body: { userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "delete_user",
        entity_type: "profile",
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      haptic.error();
      queryClient.invalidateQueries({ queryKey: ["admin-users-base"] });
      queryClient.invalidateQueries({ queryKey: ["admin-users-enriched"] });
      setSelectedUser(null);
      setDeleteDialogOpen(false);
      toast({ title: "User deleted", description: "The user has been permanently removed" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const getRoleStyle = useCallback((role: string | null) => {
    return roleColors[role || "visitor"] || roleColors.visitor;
  }, []);

  const handleUserClick = useCallback((user: UserProfile) => {
    setSelectedUser(user);
  }, []);

  const activeFiltersCount = (roleFilter !== "all" ? 1 : 0) + (quickFilter !== "all" ? 1 : 0);

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
    <div className="space-y-4 pb-20">
      {/* Hero Stats Card - Premium Purple/Violet Gradient */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-fuchsia-400/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
        <CardContent className="relative pt-6 pb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-purple-900/20">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Users</p>
                <p className="text-5xl font-bold text-white tracking-tight">{stats.total}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white touch-manipulation backdrop-blur-sm"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {/* Mini Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-lg font-bold text-white">{stats.online}</span>
              </div>
              <p className="text-[11px] text-purple-200 uppercase tracking-wide font-medium">Online</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-lg font-bold text-white">{stats.subscribed}</span>
              </div>
              <p className="text-[11px] text-purple-200 uppercase tracking-wide font-medium">Paid</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-lg font-bold text-white">{stats.thisWeek}</span>
              </div>
              <p className="text-[11px] text-purple-200 uppercase tracking-wide font-medium">New</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <IdCard className="h-3.5 w-3.5 text-cyan-300" />
                <span className="text-lg font-bold text-white">{stats.elecIds}</span>
              </div>
              <p className="text-[11px] text-purple-200 uppercase tracking-wide font-medium">IDs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="h-13 pl-12 pr-4 text-base rounded-2xl bg-card/80 border-border/30 focus:border-purple-500 focus:ring-purple-500/20 focus:ring-2 touch-manipulation placeholder:text-muted-foreground/50"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl hover:bg-purple-500/10"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className={`h-13 w-13 rounded-2xl touch-manipulation relative border-border/30 ${
            activeFiltersCount > 0 ? "border-purple-500 bg-purple-500/10" : "hover:border-purple-500/30 hover:bg-purple-500/5"
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className={`h-5 w-5 ${activeFiltersCount > 0 ? "text-purple-400" : ""}`} />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold shadow-lg">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Quick Filters - Always visible */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {quickFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={quickFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setQuickFilter(filter.value);
              if (filter.value === "all") {
                searchParams.delete("filter");
              } else {
                searchParams.set("filter", filter.value);
              }
              setSearchParams(searchParams);
            }}
            className={`shrink-0 h-11 px-5 rounded-full touch-manipulation font-semibold transition-all ${
              quickFilter === filter.value
                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-purple-500/30 border-0"
                : "bg-card border-border/30 hover:bg-muted hover:border-purple-500/30"
            }`}
          >
            {filter.label}
            {filter.value === "online" && stats.online > 0 && (
              <span className={`ml-1.5 text-xs ${quickFilter === filter.value ? "text-purple-100" : "text-muted-foreground"}`}>
                ({stats.online})
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Role Filters - Collapsible */}
      {showFilters && (
        <Card className="border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-foreground">Filter by Role</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {roleFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.value}
                    variant={roleFilter === filter.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRoleFilter(filter.value)}
                    className={`h-11 px-4 rounded-xl touch-manipulation font-medium ${
                      roleFilter === filter.value
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 border-0 shadow-md"
                        : "bg-card border-border/30 hover:border-purple-500/30"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-3 h-9 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                onClick={() => {
                  setRoleFilter("all");
                  setQuickFilter("all");
                  searchParams.delete("filter");
                  setSearchParams(searchParams);
                }}
              >
                <X className="h-4 w-4 mr-1" />
                Clear all filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <Card className="sticky top-0 z-10 border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 backdrop-blur-md shadow-lg">
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  className="border-purple-500/50 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <span className="text-sm font-bold text-purple-300">
                  {selectedIds.size} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-10 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 touch-manipulation rounded-xl font-semibold shadow-md"
                  onClick={() => bulkGrantMutation.mutate([...selectedIds])}
                  disabled={bulkActionPending}
                >
                  {bulkActionPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Gift className="h-4 w-4 mr-1.5" />
                  )}
                  Grant
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-10 touch-manipulation rounded-xl font-semibold"
                  onClick={() => bulkRevokeMutation.mutate([...selectedIds])}
                  disabled={bulkActionPending}
                >
                  <XCircle className="h-4 w-4 mr-1.5" />
                  Revoke
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 touch-manipulation rounded-xl text-muted-foreground hover:bg-white/10"
                  onClick={() => setSelectedIds(new Set())}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground font-medium">
          {users?.length === allUsersCount
            ? `${users?.length || 0} users`
            : `${users?.length || 0} of ${allUsersCount} users`}
        </p>
        {paginatedUsers.length > 0 && (
          <button
            onClick={toggleSelectAll}
            className="text-sm text-purple-400 hover:text-purple-300 font-semibold touch-manipulation"
          >
            {isAllSelected ? "Deselect all" : "Select all"}
          </button>
        )}
      </div>

      {/* User Cards */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse border-border/50">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-32" />
                    <div className="h-3 bg-muted rounded w-48" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : users?.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="py-12">
            <AdminEmptyState
              icon={Users}
              title="No users found"
              description="Try adjusting your search or filters."
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                className={`group relative bg-gradient-to-r from-card to-card/80 rounded-2xl border transition-all duration-200 touch-manipulation cursor-pointer active:scale-[0.98] ${
                  selectedIds.has(user.id)
                    ? "border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10"
                    : "border-border/40 hover:border-purple-500/30 hover:shadow-md"
                }`}
                onClick={() => handleUserClick(user)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Selection Checkbox */}
                    <div
                      className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(user.id);
                      }}
                    >
                      <Checkbox
                        checked={selectedIds.has(user.id)}
                        className="h-5 w-5 rounded-md border-2 border-muted-foreground/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                    </div>

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <Avatar className="h-14 w-14 rounded-2xl border-2 border-white/10 shadow-lg">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback className={`rounded-2xl text-base font-bold ${getRoleStyle(user.role).bg} ${getRoleStyle(user.role).text}`}>
                          {getInitials(user.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-green-500 rounded-full border-[3px] border-card shadow-lg shadow-green-500/50">
                          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-[15px] truncate text-foreground">{user.full_name || "No name"}</p>
                        {user.subscribed && (
                          <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                            <Sparkles className="h-3 w-3 text-white" />
                          </div>
                        )}
                        {user.admin_role && (
                          <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center shadow-sm">
                            <Shield className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-2">{user.email || `@${user.username}`}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          className={`text-[11px] px-2.5 py-0.5 h-6 font-semibold rounded-full ${getRoleStyle(user.role).bg} ${getRoleStyle(user.role).text} border-0 shadow-sm`}
                        >
                          {user.role || "visitor"}
                        </Badge>
                        {user.elec_id_profile && (
                          <Badge
                            className={`text-[11px] px-2.5 py-0.5 h-6 font-semibold rounded-full border-0 shadow-sm ${
                              user.elec_id_profile.is_verified
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-amber-500/15 text-amber-400"
                            }`}
                          >
                            <IdCard className="h-3 w-3 mr-1" />
                            {user.elec_id_profile.is_verified ? "Verified" : "Pending"}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Chevron with hover effect */}
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-muted/50 group-hover:bg-purple-500/10 flex items-center justify-center transition-colors">
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <AdminPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={users?.length || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(val) => {
                setItemsPerPage(val);
                setCurrentPage(1);
              }}
              className="mt-4"
            />
          )}
        </>
      )}

      {/* User Detail Sheet */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0 border-t border-border/50">
          <div className="flex flex-col h-full bg-background">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>

            {/* User Header */}
            <div className="px-6 pb-6 pt-2">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 rounded-3xl border-4 border-muted/50">
                    <AvatarImage src={selectedUser?.avatar_url || undefined} />
                    <AvatarFallback className={`rounded-3xl text-2xl font-bold ${getRoleStyle(selectedUser?.role).bg} ${getRoleStyle(selectedUser?.role).text}`}>
                      {getInitials(selectedUser?.full_name || null)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedUser?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold truncate">{selectedUser?.full_name || "No name"}</h2>
                  {selectedUser?.email && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 truncate">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{selectedUser.email}</span>
                      {selectedUser.email_confirmed && (
                        <UserCheck className="h-3.5 w-3.5 text-green-400 shrink-0" />
                      )}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge className={`${getRoleStyle(selectedUser?.role).bg} ${getRoleStyle(selectedUser?.role).text} border-0`}>
                      {selectedUser?.role || "visitor"}
                    </Badge>
                    {selectedUser?.subscribed && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-0">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {selectedUser.subscription_tier || "Subscribed"}
                      </Badge>
                    )}
                    {selectedUser?.admin_role && (
                      <Badge className="bg-red-500/20 text-red-400 border-0">
                        <Shield className="h-3 w-3 mr-1" />
                        {selectedUser.admin_role === "super_admin" ? "Super Admin" : "Admin"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* User Details - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className={`border-0 ${selectedUser?.isOnline ? "bg-green-500/10" : "bg-muted/30"}`}>
                  <CardContent className="py-4 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${selectedUser?.isOnline ? "bg-green-500 animate-pulse" : "bg-muted-foreground/30"}`} />
                    <p className="text-sm font-semibold">{selectedUser?.isOnline ? "Online" : "Offline"}</p>
                    {selectedUser?.last_seen && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDistanceToNow(new Date(selectedUser.last_seen), { addSuffix: true })}
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card className={`border-0 ${selectedUser?.subscribed ? "bg-amber-500/10" : "bg-muted/30"}`}>
                  <CardContent className="py-4 text-center">
                    <Sparkles className={`h-5 w-5 mx-auto mb-2 ${selectedUser?.subscribed ? "text-amber-400" : "text-muted-foreground/30"}`} />
                    <p className="text-sm font-semibold">{selectedUser?.subscribed ? "Subscribed" : "Free"}</p>
                    {selectedUser?.subscription_tier && (
                      <p className="text-xs text-muted-foreground mt-0.5 capitalize">{selectedUser.subscription_tier}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Account Details */}
              <Card className="border-0 bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 font-semibold">
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
                    <span className="text-sm font-medium">
                      {selectedUser?.created_at && format(new Date(selectedUser.created_at), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Onboarding</span>
                    <Badge variant="secondary" className={`text-xs border-0 ${selectedUser?.onboarding_completed ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}>
                      {selectedUser?.onboarding_completed ? "Complete" : "Incomplete"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Elec-ID Profile */}
              {selectedUser?.elec_id_profile && (
                <Card className={`border-0 ${selectedUser.elec_id_profile.is_verified ? "bg-green-500/10" : "bg-amber-500/10"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 font-semibold">
                      <IdCard className={`h-4 w-4 ${selectedUser.elec_id_profile.is_verified ? "text-green-400" : "text-amber-400"}`} />
                      Elec-ID Profile
                      <Badge
                        variant="secondary"
                        className={`text-xs px-1.5 py-0 h-5 ml-auto border-0 ${
                          selectedUser.elec_id_profile.is_verified
                            ? "bg-green-500/20 text-green-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {selectedUser.elec_id_profile.is_verified ? "Verified" : "Pending"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedUser.elec_id_profile.elec_id_number && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Elec-ID Number</span>
                        <span className="text-sm font-mono font-medium">{selectedUser.elec_id_profile.elec_id_number}</span>
                      </div>
                    )}
                    {selectedUser.elec_id_profile.ecs_card_type && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">ECS Card</span>
                        <Badge variant="secondary" className="text-xs border-0">{selectedUser.elec_id_profile.ecs_card_type}</Badge>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 h-10 touch-manipulation text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 rounded-xl"
                      onClick={() => window.location.href = `/admin/elec-ids`}
                    >
                      <IdCard className="h-4 w-4 mr-2" />
                      View Full Elec-ID Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-border/50 space-y-2 bg-background">
              {/* Message User */}
              <Button
                variant="outline"
                className="w-full h-12 touch-manipulation rounded-xl border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                onClick={() => setMessageSheetOpen(true)}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Message User
              </Button>

              {/* Subscription Actions */}
              {(selectedUser?.free_access_granted || (selectedUser?.subscribed && !selectedUser?.stripe_customer_id)) ? (
                <Button
                  variant="destructive"
                  className="w-full h-12 touch-manipulation rounded-xl"
                  onClick={() => selectedUser && revokeSubscriptionMutation.mutate(selectedUser.id)}
                  disabled={revokeSubscriptionMutation.isPending}
                >
                  {revokeSubscriptionMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  Revoke Access
                </Button>
              ) : !selectedUser?.subscribed ? (
                <Button
                  className="w-full h-12 touch-manipulation rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/20"
                  onClick={() =>
                    selectedUser &&
                    grantSubscriptionMutation.mutate({
                      userId: selectedUser.id,
                      tier: "Employer",
                    })
                  }
                  disabled={grantSubscriptionMutation.isPending}
                >
                  {grantSubscriptionMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Gift className="h-5 w-5 mr-2" />
                  )}
                  Grant Free Access
                </Button>
              ) : (
                <p className="w-full text-center text-sm text-muted-foreground py-3">
                  Subscription managed via Stripe
                </p>
              )}

              {/* Admin Controls */}
              {isSuperAdmin && selectedUser?.admin_role !== "super_admin" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 h-11 touch-manipulation rounded-xl ${
                      selectedUser?.admin_role
                        ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                        : "border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
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
                        <ShieldOff className="h-4 w-4 mr-2" />
                        Remove Admin
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Make Admin
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 touch-manipulation rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete User Permanently?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{selectedUser?.full_name || selectedUser?.email}</strong> and all their data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 rounded-xl"
              onClick={() => selectedUser && deleteUserMutation.mutate(selectedUser.id)}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Message User Sheet */}
      <MessageUserSheet
        open={messageSheetOpen}
        onOpenChange={setMessageSheetOpen}
        user={selectedUser ? {
          id: selectedUser.id,
          full_name: selectedUser.full_name || undefined,
          email: selectedUser.email || undefined,
          role: selectedUser.role || undefined,
        } : null}
      />
    </div>
    </PullToRefresh>
  );
}

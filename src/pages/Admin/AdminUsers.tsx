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
import AdminSearchInput from "@/components/admin/AdminSearchInput";
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
import { AdminUserCard } from "@/components/admin/cards/AdminUserCard";

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
  // Elec-ID profile data
  elec_id_profile?: {
    id: string;
    elec_id_number: string | null;
    is_verified: boolean;
    activated: boolean;
    ecs_card_type: string | null;
  } | null;
}

// Use ROLE_COLORS from adminUtils but map to the local format with border
const roleColors: Record<string, { bg: string; text: string; border: string }> = Object.fromEntries(
  Object.entries(ROLE_COLORS).map(([role, colors]) => [
    role,
    { bg: colors.bg.replace('/20', '/10'), text: colors.text, border: colors.badge.split(' ').pop() || 'border-gray-500/30' }
  ])
);

const roleFilters = [
  { value: "all", label: "All" },
  { value: "electrician", label: "Sparks" },
  { value: "apprentice", label: "Apprentice" },
  { value: "employer", label: "Employer" },
  { value: "college", label: "College" },
];

const elecIdFilters = [
  { value: "all", label: "All IDs" },
  { value: "has_id", label: "Has Elec-ID" },
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
  { value: "no_id", label: "No Elec-ID" },
];

const timeFilters = [
  { value: "all", label: "All Time" },
  { value: "active", label: "Active Today" },
  { value: "today", label: "Signed Up Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

export default function AdminUsers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [elecIdFilter, setElecIdFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState(() => searchParams.get("filter") || "all");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionPending, setBulkActionPending] = useState(false);

  // Sync timeFilter with URL params
  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (urlFilter && timeFilters.some(f => f.value === urlFilter)) {
      setTimeFilter(urlFilter);
    }
  }, [searchParams]);

  const isSuperAdmin = profile?.admin_role === "super_admin";

  // Fetch users with emails via edge function - live updates every 30 seconds
  const { data: users, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin-users", search, roleFilter, elecIdFilter, timeFilter],
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      // Use edge function to get users with emails
      const { data: edgeData, error: edgeError } = await supabase.functions.invoke("admin-get-users");

      if (edgeError) {
        console.error("Edge function error:", edgeError);
        throw edgeError;
      }

      let allUsers = edgeData?.users || [];

      // Get presence data first (needed for active filter)
      const { data: presenceData } = await supabase
        .from("user_presence")
        .select("user_id, last_seen")
        .in("user_id", allUsers?.map((u: UserProfile) => u.id) || []);

      const presenceMap = new Map(
        presenceData?.map((p) => [p.user_id, p.last_seen]) || []
      );

      // Get Elec-ID profile data for all users
      const { data: elecIdData } = await supabase
        .from("employer_elec_id_profiles")
        .select("id, employee_id, elec_id_number, is_verified, activated, ecs_card_type")
        .in("employee_id", allUsers?.map((u: UserProfile) => u.id) || []);

      const elecIdMap = new Map(
        elecIdData?.map((p) => [p.employee_id, {
          id: p.id,
          elec_id_number: p.elec_id_number,
          is_verified: p.is_verified,
          activated: p.activated,
          ecs_card_type: p.ecs_card_type,
        }]) || []
      );

      // Enrich users with presence and Elec-ID data
      allUsers = allUsers.map((user: UserProfile) => ({
        ...user,
        last_seen: presenceMap.get(user.id) || user.last_seen,
        isOnline:
          presenceMap.get(user.id) &&
          new Date(presenceMap.get(user.id)!).getTime() > Date.now() - 5 * 60 * 1000,
        elec_id_profile: elecIdMap.get(user.id) || null,
      }));

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        allUsers = allUsers.filter((u: UserProfile) =>
          u.full_name?.toLowerCase().includes(searchLower) ||
          u.username?.toLowerCase().includes(searchLower) ||
          u.email?.toLowerCase().includes(searchLower)
        );
      }

      // Apply role filter
      if (roleFilter !== "all") {
        allUsers = allUsers.filter((u: UserProfile) => u.role === roleFilter);
      }

      // Apply Elec-ID filter
      if (elecIdFilter !== "all") {
        switch (elecIdFilter) {
          case "has_id":
            allUsers = allUsers.filter((u: UserProfile) => u.elec_id_profile);
            break;
          case "verified":
            allUsers = allUsers.filter((u: UserProfile) => u.elec_id_profile?.is_verified);
            break;
          case "pending":
            allUsers = allUsers.filter((u: UserProfile) => u.elec_id_profile && !u.elec_id_profile.is_verified);
            break;
          case "no_id":
            allUsers = allUsers.filter((u: UserProfile) => !u.elec_id_profile);
            break;
        }
      }

      // Apply time filter
      if (timeFilter !== "all") {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        switch (timeFilter) {
          case "active":
            allUsers = allUsers.filter((u: UserProfile) =>
              u.last_seen && new Date(u.last_seen) >= dayAgo
            );
            break;
          case "today":
            allUsers = allUsers.filter((u: UserProfile) =>
              u.created_at && new Date(u.created_at) >= today
            );
            break;
          case "week":
            allUsers = allUsers.filter((u: UserProfile) =>
              u.created_at && new Date(u.created_at) >= weekAgo
            );
            break;
          case "month":
            allUsers = allUsers.filter((u: UserProfile) =>
              u.created_at && new Date(u.created_at) >= monthAgo
            );
            break;
        }
      }

      return allUsers as UserProfile[];
    },
  });

  // Get stats
  const stats = {
    total: users?.length || 0,
    online: users?.filter((u) => u.isOnline).length || 0,
    subscribed: users?.filter((u) => u.subscribed).length || 0,
    admins: users?.filter((u) => u.admin_role).length || 0,
    elecIds: users?.filter((u) => u.elec_id_profile).length || 0,
    verifiedIds: users?.filter((u) => u.elec_id_profile?.is_verified).length || 0,
    pendingIds: users?.filter((u) => u.elec_id_profile && !u.elec_id_profile.is_verified).length || 0,
  };

  // Pagination logic
  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    if (!users) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return users.slice(start, start + itemsPerPage);
  }, [users, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set()); // Clear selection on filter change
  }, [search, roleFilter, elecIdFilter, timeFilter]);

  // Bulk selection functions - memoized for child component stability
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
  const isSomeSelected = selectedIds.size > 0 && selectedIds.size < paginatedUsers.length;

  // Bulk grant subscription mutation
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
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
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

  // Bulk revoke subscription mutation
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
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
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

  // Grant admin mutation - uses edge function to bypass RLS
  const grantAdminMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: "admin" | null }) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-role", {
        body: { userId, adminRole: role },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: role ? "grant_admin" : "revoke_admin",
        entity_type: "profile",
        entity_id: userId,
      });

      return data;
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

  // Grant free subscription mutation - uses edge function with optimistic updates
  const grantSubscriptionMutation = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) => {
      const { data, error } = await supabase.functions.invoke("admin-grant-subscription", {
        body: { userId, tier },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "grant_subscription",
        entity_type: "profile",
        entity_id: userId,
        details: { tier },
      });

      return data;
    },
    // Optimistic update - show change immediately
    onMutate: async ({ userId }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["admin-users"] });

      // Snapshot current value
      const previousUsers = queryClient.getQueryData(["admin-users", search, roleFilter, elecIdFilter, timeFilter]);

      // Optimistically update the user
      queryClient.setQueryData(
        ["admin-users", search, roleFilter, elecIdFilter, timeFilter],
        (old: UserProfile[] | undefined) =>
          old?.map((u) =>
            u.id === userId ? { ...u, subscribed: true, free_access_granted: true } : u
          )
      );

      // Also update selectedUser if it matches
      if (selectedUser?.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, subscribed: true, free_access_granted: true } : null
        );
      }

      toast({ title: "Granting access...", description: "Please wait" });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["admin-users", search, roleFilter, elecIdFilter, timeFilter], context.previousUsers);
      }
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
    onSuccess: () => {
      setSelectedUser(null);
      toast({ title: "Subscription granted", description: "User now has free access" });
    },
    onSettled: () => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
  });

  // Revoke subscription mutation with optimistic updates
  const revokeSubscriptionMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-subscription", {
        body: { action: "revoke_free_access", target_user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "revoke_subscription",
        entity_type: "profile",
        entity_id: userId,
      });

      return data;
    },
    // Optimistic update - show change immediately
    onMutate: async (userId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["admin-users"] });

      // Snapshot current value
      const previousUsers = queryClient.getQueryData(["admin-users", search, roleFilter, elecIdFilter, timeFilter]);

      // Optimistically update the user
      queryClient.setQueryData(
        ["admin-users", search, roleFilter, elecIdFilter, timeFilter],
        (old: UserProfile[] | undefined) =>
          old?.map((u) =>
            u.id === userId ? { ...u, subscribed: false, free_access_granted: false } : u
          )
      );

      // Also update selectedUser if it matches
      if (selectedUser?.id === userId) {
        setSelectedUser((prev) =>
          prev ? { ...prev, subscribed: false, free_access_granted: false } : null
        );
      }

      toast({ title: "Revoking access...", description: "Please wait" });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["admin-users", search, roleFilter, elecIdFilter, timeFilter], context.previousUsers);
      }
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
    onSuccess: () => {
      setSelectedUser(null);
      toast({ title: "Access revoked", description: "User subscription removed" });
    },
    onSettled: () => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
  });

  // Delete user mutation (super admin only)
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      // Call edge function to delete user (requires admin privileges)
      const { data, error } = await supabase.functions.invoke("admin-delete-user", {
        body: { userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      // Log the action
      await supabase.from("admin_audit_logs").insert({
        user_id: profile?.id,
        action: "delete_user",
        entity_type: "profile",
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
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

  // Memoized callback for user click
  const handleUserClick = useCallback((user: UserProfile) => {
    setSelectedUser(user);
  }, []);

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-cyan-400" />
              <div>
                <p className="text-lg font-bold">{stats.elecIds}</p>
                <p className="text-[10px] text-muted-foreground">Elec-IDs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Elec-ID Summary Bar */}
      {stats.elecIds > 0 && (
        <Card className="border-cyan-500/30 bg-cyan-500/5">
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <IdCard className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm font-medium">Elec-ID Status</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-medium">{stats.verifiedIds}</span>
                    <span className="text-muted-foreground">verified</span>
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 font-medium">{stats.pendingIds}</span>
                    <span className="text-muted-foreground">pending</span>
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                onClick={() => window.location.href = "/admin/elec-ids"}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <div className="flex gap-2">
        <AdminSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
          className="flex-1"
        />
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

      {/* Time Filter Pills */}
      {timeFilter !== "all" && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={timeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setTimeFilter(filter.value);
                if (filter.value === "all") {
                  searchParams.delete("filter");
                } else {
                  searchParams.set("filter", filter.value);
                }
                setSearchParams(searchParams);
              }}
              className={`shrink-0 h-9 px-4 rounded-full touch-manipulation ${
                timeFilter === filter.value
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-muted/50"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      )}

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

      {/* Elec-ID Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <IdCard className="h-4 w-4 text-cyan-400 shrink-0 self-center mr-1" />
        {elecIdFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={elecIdFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => setElecIdFilter(filter.value)}
            className={`shrink-0 h-8 px-3 rounded-full touch-manipulation text-xs ${
              elecIdFilter === filter.value
                ? filter.value === "verified"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : filter.value === "pending"
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-muted/50"
            }`}
          >
            {filter.value === "verified" && <ShieldCheck className="h-3 w-3 mr-1" />}
            {filter.value === "pending" && <Clock className="h-3 w-3 mr-1" />}
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <Card className="sticky top-0 z-10 border-yellow-500/30 bg-yellow-500/10">
          <CardContent className="py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                />
                <span className="text-sm font-medium text-yellow-400">
                  {selectedIds.size} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-9 bg-green-600 hover:bg-green-700 touch-manipulation"
                  onClick={() => bulkGrantMutation.mutate([...selectedIds])}
                  disabled={bulkActionPending}
                >
                  {bulkActionPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Gift className="h-4 w-4 mr-1" />
                  )}
                  Grant Access
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-9 touch-manipulation"
                  onClick={() => bulkRevokeMutation.mutate([...selectedIds])}
                  disabled={bulkActionPending}
                >
                  {bulkActionPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  Revoke
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 touch-manipulation"
                  onClick={() => setSelectedIds(new Set())}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
          <CardContent className="pt-6">
            <AdminEmptyState
              icon={Users}
              title="No users found"
              description="Try adjusting your search or filters."
            />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Select All Header */}
          <div className="flex items-center gap-3 px-1 py-2">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={toggleSelectAll}
              className="border-muted-foreground/50"
            />
            <span className="text-xs text-muted-foreground">
              {isAllSelected ? "Deselect all" : "Select all on this page"}
            </span>
          </div>

          <div className="space-y-2">
            {paginatedUsers.map((user) => (
              <AdminUserCard
                key={user.id}
                user={user}
                isSelected={selectedIds.has(user.id)}
                onToggleSelection={toggleSelection}
                onClick={handleUserClick}
                roleStyle={getRoleStyle(user.role)}
              />
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

              {/* Elec-ID Profile Card */}
              {selectedUser?.elec_id_profile && (
                <Card className={selectedUser.elec_id_profile.is_verified ? "border-green-500/30 bg-green-500/5" : "border-amber-500/30 bg-amber-500/5"}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <IdCard className={`h-4 w-4 ${selectedUser.elec_id_profile.is_verified ? "text-green-400" : "text-amber-400"}`} />
                      Elec-ID Profile
                      {selectedUser.elec_id_profile.is_verified ? (
                        <Badge className="text-[10px] px-1.5 py-0 h-4 bg-green-500/20 text-green-400">
                          <ShieldCheck className="h-2.5 w-2.5 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="text-[10px] px-1.5 py-0 h-4 bg-amber-500/20 text-amber-400">
                          <Clock className="h-2.5 w-2.5 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedUser.elec_id_profile.elec_id_number && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Elec-ID Number</span>
                        <span className="text-sm font-mono">{selectedUser.elec_id_profile.elec_id_number}</span>
                      </div>
                    )}
                    {selectedUser.elec_id_profile.ecs_card_type && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">ECS Card</span>
                        <Badge variant="outline" className="text-xs">{selectedUser.elec_id_profile.ecs_card_type}</Badge>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Activated</span>
                      <Badge variant="outline" className={selectedUser.elec_id_profile.activated ? "bg-green-500/10 text-green-400" : ""}>
                        {selectedUser.elec_id_profile.activated ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 h-9 touch-manipulation text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
                      onClick={() => window.location.href = `/admin/elec-ids`}
                    >
                      <IdCard className="h-4 w-4 mr-2" />
                      View Full Elec-ID Profile
                    </Button>
                  </CardContent>
                </Card>
              )}

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
            <SheetFooter className="p-4 border-t border-border space-y-2">
              {/* Subscription Actions - Grant/Revoke/Stripe-managed */}
              {(selectedUser?.free_access_granted || (selectedUser?.subscribed && !selectedUser?.stripe_customer_id)) ? (
                // Show Revoke for admin-granted access
                <Button
                  variant="destructive"
                  className="w-full h-12 touch-manipulation rounded-xl"
                  onClick={() => selectedUser && revokeSubscriptionMutation.mutate(selectedUser.id)}
                  disabled={revokeSubscriptionMutation.isPending}
                >
                  {revokeSubscriptionMutation.isPending ? (
                    <>Revoking...</>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 mr-2" />
                      Revoke Access
                    </>
                  )}
                </Button>
              ) : !selectedUser?.subscribed ? (
                // Show Grant for non-subscribed users
                <Button
                  className="w-full h-12 touch-manipulation rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
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
                    <>Granting...</>
                  ) : (
                    <>
                      <Gift className="h-5 w-5 mr-2" />
                      Grant Free Access
                    </>
                  )}
                </Button>
              ) : (
                // Stripe-managed subscription
                <p className="w-full text-center text-sm text-muted-foreground py-3">
                  Subscription managed via Stripe
                </p>
              )}

              {/* Admin toggle - super admin only */}
              {isSuperAdmin && selectedUser?.admin_role !== "super_admin" && (
                <Button
                  variant="outline"
                  className={`w-full h-12 touch-manipulation rounded-xl ${
                    selectedUser?.admin_role
                      ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                      : "border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
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
                      Remove Admin
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Make Admin
                    </>
                  )}
                </Button>
              )}

              {/* Delete user - super admin only, can't delete other super admins */}
              {isSuperAdmin && selectedUser?.admin_role !== "super_admin" && (
                <Button
                  variant="ghost"
                  className="w-full h-10 touch-manipulation rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              )}
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => selectedUser && deleteUserMutation.mutate(selectedUser.id)}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

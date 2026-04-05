import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminPagination from '@/components/admin/AdminPagination';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
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
  Download,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { getInitials, ROLE_COLORS, calculateEngagementScore, getScoreColor, SCORE_COLOR_MAP, formatTimeShort } from '@/utils/adminUtils';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import SwipeableAdminRow from '@/components/admin/SwipeableAdminRow';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

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
    {
      bg: colors.bg.replace('/20', '/10'),
      text: colors.text,
      border: colors.badge.split(' ').pop() || 'border-gray-500/30',
    },
  ])
);

const roleBorderColors: Record<string, string> = {
  apprentice: 'border-l-purple-500',
  electrician: 'border-l-yellow-500',
  employer: 'border-l-blue-500',
  college: 'border-l-green-500',
  visitor: 'border-l-gray-500',
};

const roleFilters = [
  { value: 'all', label: 'All', icon: Users },
  { value: 'electrician', label: 'Sparks', icon: Zap },
  { value: 'apprentice', label: 'Apprentice', icon: User },
  { value: 'employer', label: 'Employer', icon: Crown },
];

const quickFilters = [
  { value: 'all', label: 'All' },
  { value: 'active_today', label: 'Active Today' },
  { value: 'trials', label: 'Trials' },
  { value: 'subscribed', label: 'Subscribed' },
  { value: 'free', label: 'Free' },
  { value: 'never_logged_in', label: 'Never Logged In' },
  { value: 'most_engaged', label: 'Most Engaged' },
];

/* ── Animation variants matching AdminDashboard ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

/** Compact relative time: "2h ago", "3d ago", "just now" */
function relativeTime(dateStr: string | undefined | null): string {
  if (!dateStr) return 'never';
  const ms = Date.now() - new Date(dateStr).getTime();
  if (ms < 60_000) return 'just now';
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}h ago`;
  const days = Math.floor(ms / 86_400_000);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function AdminUsers() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [quickFilter, setQuickFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageUser, setMessageUser] = useState<{
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionPending, setBulkActionPending] = useState(false);

  const [grantSheetUser, setGrantSheetUser] = useState<UserProfile | null>(null);
  const [grantTier, setGrantTier] = useState('');
  const [grantDuration, setGrantDuration] = useState('7');
  const [sortBy, setSortBy] = useState<'name' | 'joined' | 'last_active' | 'engagement'>('joined');

  useEffect(() => {
    const urlFilter = searchParams.get('filter');
    if (urlFilter && quickFilters.some((f) => f.value === urlFilter)) {
      setQuickFilter(urlFilter);
    }
  }, [searchParams]);

  const isSuperAdmin = profile?.admin_role === 'super_admin';

  // Shared cached edge function call — reused across AdminUsers/AdminTrials
  const {
    data: baseUsers,
    isLoading: baseLoading,
    refetch: refetchBase,
    isFetching: baseFetching,
  } = useAdminUsersBase();

  const {
    data: users,
    isLoading: enrichmentLoading,
    refetch: refetchEnrichment,
    isFetching: enrichmentFetching,
  } = useQuery({
    queryKey: ['admin-users-enriched', search, roleFilter, quickFilter],
    enabled: !!baseUsers,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    staleTime: 30000,
    queryFn: async () => {
      let allUsers = [...(baseUsers || [])];
      const userIds = allUsers.map((u: UserProfile) => u.id);

      const [presenceData, elecIdData] = await Promise.all([
        batchedInQuery('user_presence', 'user_id', userIds, 'user_id, last_seen'),
        batchedInQuery(
          'employer_elec_id_profiles',
          'employee_id',
          userIds,
          'id, employee_id, elec_id_number, is_verified, activated, ecs_card_type'
        ),
      ]);

      const presenceMap = new Map(presenceData?.map((p) => [p.user_id, p.last_seen]) || []);

      const elecIdMap = new Map(
        elecIdData?.map((p) => [
          p.employee_id,
          {
            id: p.id,
            elec_id_number: p.elec_id_number,
            is_verified: p.is_verified,
            activated: p.activated,
            ecs_card_type: p.ecs_card_type,
          },
        ]) || []
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
        allUsers = allUsers.filter(
          (u: UserProfile) =>
            u.full_name?.toLowerCase().includes(searchLower) ||
            u.username?.toLowerCase().includes(searchLower) ||
            u.email?.toLowerCase().includes(searchLower)
        );
      }

      if (roleFilter !== 'all') {
        allUsers = allUsers.filter((u: UserProfile) => u.role === roleFilter);
      }

      if (quickFilter !== 'all') {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        switch (quickFilter) {
          case 'active_today':
            allUsers = allUsers.filter(
              (u: UserProfile) => u.last_seen && new Date(u.last_seen).getTime() >= todayStart
            );
            break;
          case 'trials':
            allUsers = allUsers.filter(
              (u: UserProfile) => !u.subscribed && !u.free_access_granted
            );
            break;
          case 'subscribed':
            allUsers = allUsers.filter((u: UserProfile) => u.subscribed);
            break;
          case 'free':
            allUsers = allUsers.filter((u: UserProfile) => u.free_access_granted);
            break;
          case 'never_logged_in':
            allUsers = allUsers.filter((u: UserProfile) => !u.last_sign_in && !u.last_seen);
            break;
          // 'most_engaged' is handled in sortedUsers memo (needs engagementMap from separate query)
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

  // Engagement score data for visible users
  const visibleUserIds = useMemo(() => users?.map((u) => u.id) || [], [users]);
  const { data: engagementData } = useQuery({
    queryKey: ['admin-users-engagement', visibleUserIds],
    enabled: visibleUserIds.length > 0,
    staleTime: 60000,
    queryFn: async () => {
      const rows = await batchedInQuery(
        'user_activity_summary',
        'user_id',
        visibleUserIds,
        'user_id, login_count, page_view_count, total_seconds_tracked, feature_use_count, active_days, unique_pages_visited'
      );
      const scoreMap = new Map<string, number>();
      const rawMap = new Map<string, { login_count: number; page_view_count: number; total_seconds_tracked: number; unique_pages_visited: number }>();
      for (const row of rows || []) {
        scoreMap.set(row.user_id, calculateEngagementScore(row));
        rawMap.set(row.user_id, {
          login_count: row.login_count || 0,
          page_view_count: row.page_view_count || 0,
          total_seconds_tracked: row.total_seconds_tracked || 0,
          unique_pages_visited: row.unique_pages_visited || 0,
        });
      }
      return { scoreMap, rawMap };
    },
  });
  const engagementMap = engagementData?.scoreMap;
  const engagementRawMap = engagementData?.rawMap;

  const allUsersCount = useMemo(() => {
    return users?.length || 0;
  }, [users]);

  const stats = useMemo(
    () => ({
      total: users?.length || 0,
      online: users?.filter((u) => u.isOnline).length || 0,
      subscribed: users?.filter((u) => u.subscribed).length || 0,
      admins: users?.filter((u) => u.admin_role).length || 0,
      elecIds: users?.filter((u) => u.elec_id_profile).length || 0,
      thisWeek:
        users?.filter((u) => {
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return u.created_at && new Date(u.created_at) >= weekAgo;
        }).length || 0,
    }),
    [users]
  );

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    let filtered = [...users];

    // Handle most_engaged filter here (needs engagementMap from separate query)
    if (quickFilter === 'most_engaged') {
      filtered = filtered.filter((u) => {
        const score = engagementMap?.get(u.id);
        return score !== undefined && score > 55;
      });
    }

    const sorted = filtered;
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''));
        break;
      case 'joined':
        sorted.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'last_active':
        sorted.sort((a, b) => {
          const aTime = a.last_seen ? new Date(a.last_seen).getTime() : 0;
          const bTime = b.last_seen ? new Date(b.last_seen).getTime() : 0;
          return bTime - aTime;
        });
        break;
      case 'engagement':
        sorted.sort((a, b) => (engagementMap?.get(b.id) || 0) - (engagementMap?.get(a.id) || 0));
        break;
    }
    return sorted;
  }, [users, sortBy, engagementMap, quickFilter]);

  const totalPages = Math.ceil((sortedUsers.length || 0) / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    if (!sortedUsers.length) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(start, start + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
  }, [search, roleFilter, quickFilter, sortBy]);

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
          supabase.functions.invoke('admin-grant-subscription', {
            body: { userId, tier: 'Employer' },
          })
        )
      );
      const failures = results.filter((r) => r.status === 'rejected').length;
      if (failures > 0) {
        throw new Error(`${failures} of ${userIds.length} grants failed`);
      }
      return results;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
      setSelectedIds(new Set());
      toast({
        title: 'Access granted',
        description: `Granted access to ${selectedIds.size} users`,
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
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
          supabase.functions.invoke('admin-manage-subscription', {
            body: { action: 'revoke_free_access', target_user_id: userId },
          })
        )
      );
      const failures = results.filter((r) => r.status === 'rejected').length;
      if (failures > 0) {
        throw new Error(`${failures} of ${userIds.length} revokes failed`);
      }
      return results;
    },
    onSuccess: () => {
      haptic.warning();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
      setSelectedIds(new Set());
      toast({
        title: 'Access revoked',
        description: `Revoked access from ${selectedIds.size} users`,
      });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSettled: () => {
      setBulkActionPending(false);
    },
  });

  const grantAdminMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | null }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-role', {
        body: { userId, adminRole: role },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: role ? 'grant_admin' : 'revoke_admin',
        entity_type: 'profile',
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      setSelectedUser(null);
      toast({ title: 'Admin access updated' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const grantSubscriptionMutation = useMutation({
    mutationFn: async ({
      userId,
      tier,
      expiresAt,
    }: {
      userId: string;
      tier: string;
      expiresAt: string | null;
    }) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-subscription', {
        body: {
          action: 'grant_free_access',
          target_user_id: userId,
          subscription_tier: tier,
          expires_at: expiresAt,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'grant_subscription',
        entity_type: 'profile',
        entity_id: userId,
        details: { tier, expires_at: expiresAt },
      });

      return data;
    },
    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: ['admin-users-enriched'] });
      const previousUsers = queryClient.getQueryData([
        'admin-users-enriched',
        search,
        roleFilter,
        quickFilter,
      ]);

      queryClient.setQueryData(
        ['admin-users-enriched', search, roleFilter, quickFilter],
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

      toast({ title: 'Granting access...', description: 'Please wait' });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          ['admin-users-enriched', search, roleFilter, quickFilter],
          context.previousUsers
        );
      }
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSuccess: () => {
      haptic.success();
      setSelectedUser(null);
      setGrantSheetUser(null);
      toast({ title: 'Subscription granted', description: 'User now has free access' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
    },
  });

  const revokeSubscriptionMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-subscription', {
        body: { action: 'revoke_free_access', target_user_id: userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'revoke_subscription',
        entity_type: 'profile',
        entity_id: userId,
      });

      return data;
    },
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ['admin-users-enriched'] });
      const previousUsers = queryClient.getQueryData([
        'admin-users-enriched',
        search,
        roleFilter,
        quickFilter,
      ]);

      queryClient.setQueryData(
        ['admin-users-enriched', search, roleFilter, quickFilter],
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

      toast({ title: 'Revoking access...', description: 'Please wait' });

      return { previousUsers };
    },
    onError: (error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(
          ['admin-users-enriched', search, roleFilter, quickFilter],
          context.previousUsers
        );
      }
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
    onSuccess: () => {
      haptic.warning();
      setSelectedUser(null);
      toast({ title: 'Access revoked', description: 'User subscription removed' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-stats'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId },
      });
      if (error) {
        const errObj = error as Record<string, unknown> | undefined;
        const ctx = errObj?.context as Record<string, unknown> | undefined;
        const realMessage =
          (ctx?.error as string) || (errObj?.message as string) || 'Delete failed';
        throw new Error(realMessage);
      }
      if (data?.error) throw new Error(data.error);

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'delete_user',
        entity_type: 'profile',
        entity_id: userId,
      });

      return data;
    },
    onSuccess: () => {
      haptic.error();
      queryClient.invalidateQueries({ queryKey: ['admin-users-base'] });
      queryClient.invalidateQueries({ queryKey: ['admin-users-enriched'] });
      setSelectedUser(null);
      setDeleteDialogOpen(false);
      toast({ title: 'User deleted', description: 'The user has been permanently removed' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const getRoleStyle = useCallback((role: string | null) => {
    return roleColors[role || 'visitor'] || roleColors.visitor;
  }, []);

  const handleUserClick = useCallback((user: UserProfile) => {
    setSelectedUser(user);
  }, []);

  const openGrantSheet = useCallback((user: UserProfile) => {
    setGrantTier(
      user.role === 'apprentice'
        ? 'Apprentice'
        : user.role === 'employer'
          ? 'Employer'
          : 'Electrician'
    );
    setGrantDuration('7');
    setGrantSheetUser(user);
  }, []);

  const handleConfirmGrant = useCallback(() => {
    if (!grantSheetUser) return;
    const days = grantDuration === 'never' ? null : parseInt(grantDuration, 10);
    const expiresAt = days ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString() : null;
    grantSubscriptionMutation.mutate({
      userId: grantSheetUser.id,
      tier: grantTier,
      expiresAt,
    });
  }, [grantSheetUser, grantTier, grantDuration, grantSubscriptionMutation]);

  const exportCSV = () => {
    if (!users || users.length === 0) return;
    const headers = ['Name', 'Email', 'Role', 'Subscribed', 'Free Access', 'Created At'];
    const rows = users.map((u) => [
      u.full_name || '',
      u.email || '',
      u.role || '',
      u.subscribed ? 'Yes' : 'No',
      u.free_access_granted ? 'Yes' : 'No',
      u.created_at ? format(new Date(u.created_at), 'yyyy-MM-dd HH:mm') : '',
    ]);

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csv = [headers, ...rows].map((r) => r.map(escapeCsv).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeFiltersCount = (roleFilter !== 'all' ? 1 : 0) + (quickFilter !== 'all' ? 1 : 0);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        <AdminPageHeader
          title="Users"
          subtitle="Manage all registered users"
          icon={Users}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10 border-blue-500/20"
          accentColor="from-blue-500 via-blue-400 to-cyan-500"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
        />

        {/* ── Hero Stats Card ── */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative overflow-hidden glass-premium rounded-2xl"
        >
          {/* 2px gradient accent line */}
          <div className="h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative pt-6 pb-6 px-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Total Users</p>
                  <AnimatedCounter
                    value={stats.total}
                    className="text-5xl font-bold text-white tracking-tight"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white touch-manipulation backdrop-blur-sm"
                  onClick={exportCSV}
                  title="Export CSV"
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white touch-manipulation backdrop-blur-sm"
                  onClick={() => refetch()}
                  disabled={isFetching}
                >
                  <RefreshCw className={`h-5 w-5 ${isFetching ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <AnimatedCounter value={stats.online} className="text-lg font-bold text-white" />
                </div>
                <p className="text-[11px] text-white uppercase tracking-wide font-medium">Online</p>
              </div>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <AnimatedCounter
                    value={stats.subscribed}
                    className="text-lg font-bold text-white"
                  />
                </div>
                <p className="text-[11px] text-white uppercase tracking-wide font-medium">Paid</p>
              </div>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />
                  <AnimatedCounter
                    value={stats.thisWeek}
                    className="text-lg font-bold text-white"
                  />
                </div>
                <p className="text-[11px] text-white uppercase tracking-wide font-medium">New</p>
              </div>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-2.5 text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <IdCard className="h-3.5 w-3.5 text-cyan-300" />
                  <AnimatedCounter value={stats.elecIds} className="text-lg font-bold text-white" />
                </div>
                <p className="text-[11px] text-white uppercase tracking-wide font-medium">IDs</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Search & Sort & Filter Bar ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="flex gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="h-13 pl-12 pr-4 text-base rounded-2xl bg-card/80 border-border/30 focus:border-yellow-500 focus:ring-yellow-500/20 focus:ring-2 touch-manipulation placeholder:text-white/40"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl hover:bg-yellow-500/10 touch-manipulation"
                onClick={() => setSearch('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="h-13 w-[130px] shrink-0 rounded-2xl bg-card/80 border-border/30 focus:border-yellow-500 focus:ring-yellow-500/20 touch-manipulation text-sm text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50 text-white">
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="joined">Joined</SelectItem>
              <SelectItem value="last_active">Last Active</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className={`h-13 w-13 rounded-2xl touch-manipulation relative border-border/30 ${
              activeFiltersCount > 0
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'hover:border-yellow-500/30 hover:bg-yellow-500/5'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className={`h-5 w-5 ${activeFiltersCount > 0 ? 'text-yellow-400' : ''}`} />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs flex items-center justify-center font-bold shadow-lg">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </motion.div>

        {/* ── Quick Filter Chips ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex flex-wrap gap-2"
        >
          {quickFilters.map((filter) => {
            const isActive = quickFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => {
                  setQuickFilter(filter.value);
                  if (filter.value === 'all') {
                    searchParams.delete('filter');
                  } else {
                    searchParams.set('filter', filter.value);
                  }
                  setSearchParams(searchParams);
                }}
                className={`h-9 px-3.5 rounded-xl text-[12px] font-semibold touch-manipulation transition-all flex items-center active:scale-[0.97] ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'bg-white/[0.06] text-white ring-1 ring-white/[0.08]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Role Filters — Collapsible ── */}
        {showFilters && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="glass-premium rounded-2xl overflow-hidden"
          >
            {/* 2px accent line */}
            <div className="h-[2px] bg-gradient-to-r from-yellow-500/60 via-amber-400/40 to-transparent" />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold text-white">Filter by Role</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {roleFilters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.value}
                      variant={roleFilter === filter.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRoleFilter(filter.value)}
                      className={`h-11 px-4 rounded-xl touch-manipulation font-medium ${
                        roleFilter === filter.value
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 border-0 shadow-md'
                          : 'bg-card border-border/30 hover:border-yellow-500/30'
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
                  className="mt-3 h-11 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 touch-manipulation"
                  onClick={() => {
                    setRoleFilter('all');
                    setQuickFilter('all');
                    searchParams.delete('filter');
                    setSearchParams(searchParams);
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Bulk Action Bar ── */}
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-10 glass-premium rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500" />
            <div className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    className="border-yellow-500/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                  />
                  <span className="text-sm font-bold text-yellow-300">
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
                    className="h-10 w-10 touch-manipulation rounded-xl text-white hover:bg-white/10"
                    onClick={() => setSelectedIds(new Set())}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Results Count ── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex items-center justify-between px-1"
        >
          <p className="text-sm text-white font-medium">
            {users?.length === allUsersCount
              ? `${users?.length || 0} users`
              : `${users?.length || 0} of ${allUsersCount} users`}
          </p>
          {paginatedUsers.length > 0 && (
            <button
              onClick={toggleSelectAll}
              className="text-sm text-yellow-400 hover:text-yellow-300 font-semibold touch-manipulation"
            >
              {isAllSelected ? 'Deselect all' : 'Select all'}
            </button>
          )}
        </motion.div>

        {/* ── User Cards ── */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass-premium rounded-2xl animate-pulse overflow-hidden">
                <div className="h-[2px] bg-white/5" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06]" />
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/[0.06] rounded w-32" />
                      <div className="h-3 bg-white/[0.06] rounded w-48" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/[0.06] rounded-full w-20" />
                    <div className="h-6 bg-white/[0.06] rounded-full w-24" />
                  </div>
                  <div className="h-3 bg-white/[0.06] rounded w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : users?.length === 0 ? (
          <div className="glass-premium rounded-2xl overflow-hidden">
            <div className="py-12 px-4">
              <AdminEmptyState
                icon={Users}
                title="No users found"
                description="Try adjusting your search or filters."
              />
            </div>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {paginatedUsers.map((user) => {
                const roleKey = user.role?.toLowerCase() || 'visitor';
                const borderColor = roleBorderColors[roleKey] || roleBorderColors.visitor;
                const joinedDays = user.created_at
                  ? differenceInDays(new Date(), new Date(user.created_at))
                  : null;

                return (
                  <motion.div key={user.id} variants={listItemVariants}>
                    <SwipeableAdminRow
                      actions={[
                        {
                          icon: <MessageSquare className="h-4 w-4" />,
                          label: 'Message',
                          colour: 'bg-blue-500',
                          onClick: () => {
                            setMessageUser({
                              id: user.id,
                              full_name: user.full_name || undefined,
                              email: user.email || undefined,
                              role: user.role || undefined,
                            });
                          },
                        },
                        {
                          icon: <Gift className="h-4 w-4" />,
                          label: 'Grant',
                          colour: 'bg-green-500',
                          onClick: () => {
                            openGrantSheet(user);
                          },
                        },
                      ]}
                      className="rounded-2xl"
                    >
                      <div
                        className={`group relative glass-premium rounded-2xl overflow-hidden border-l-2 ${borderColor} transition-all duration-200 touch-manipulation cursor-pointer active:scale-[0.98] ${
                          selectedIds.has(user.id)
                            ? 'ring-1 ring-yellow-500/50 bg-yellow-500/5 shadow-lg shadow-yellow-500/10'
                            : 'hover:bg-white/5 hover:shadow-md'
                        }`}
                        onClick={() => handleUserClick(user)}
                      >
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <div
                              className="shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation -ml-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelection(user.id);
                              }}
                            >
                              <Checkbox
                                checked={selectedIds.has(user.id)}
                                className="h-5 w-5 rounded-md border-2 border-white/20 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                              />
                            </div>

                            {/* Avatar with online dot + engagement ring */}
                            <div className="relative shrink-0 mt-0.5">
                              <Avatar className="h-11 w-11 rounded-xl border-2 border-white/10">
                                <AvatarImage src={user.avatar_url || undefined} />
                                <AvatarFallback
                                  className={`rounded-xl text-sm font-bold ${getRoleStyle(user.role).bg} ${getRoleStyle(user.role).text}`}
                                >
                                  {getInitials(user.full_name)}
                                </AvatarFallback>
                              </Avatar>
                              {user.isOnline && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card" />
                              )}
                              {engagementMap?.has(user.id) && (() => {
                                const score = engagementMap.get(user.id)!;
                                const color = getScoreColor(score);
                                const strokeColor = SCORE_COLOR_MAP[color].stroke;
                                const circumference = Math.PI * 19;
                                const dashOffset = circumference - (score / 100) * circumference;
                                return (
                                  <svg width="22" height="22" viewBox="0 0 24 24" className="absolute -top-1.5 -right-1.5">
                                    <circle cx="12" cy="12" r="9.5" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                                    <circle cx="12" cy="12" r="9.5" fill="none" stroke={strokeColor} strokeWidth="2.5"
                                      strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" transform="rotate(-90 12 12)" />
                                    <text x="12" y="12" textAnchor="middle" dominantBaseline="central" fill={strokeColor} fontSize="7" fontWeight="700">{score}</text>
                                  </svg>
                                );
                              })()}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Line 1 — Full name */}
                              <div className="flex items-center gap-1.5">
                                <p className="font-bold text-[15px] text-white truncate">
                                  {user.full_name || 'No name'}
                                </p>
                                {user.subscribed && (
                                  <div className="shrink-0 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <Sparkles className="h-2.5 w-2.5 text-white" />
                                  </div>
                                )}
                                {user.admin_role && (
                                  <div className="shrink-0 w-4.5 h-4.5 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center">
                                    <Shield className="h-2.5 w-2.5 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Line 2 — Email */}
                              <p className="text-[13px] text-white truncate mt-0.5">
                                {user.email || `@${user.username}`}
                              </p>

                              {/* Line 3 — Badges */}
                              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                <Badge
                                  className={`text-[10px] px-2 py-0 h-5 font-semibold rounded-full ${getRoleStyle(user.role).bg} ${getRoleStyle(user.role).text} border-0`}
                                >
                                  {user.role || 'visitor'}
                                </Badge>
                                {user.subscribed && user.stripe_customer_id ? (
                                  <Badge className="text-[10px] px-2 py-0 h-5 font-semibold rounded-full bg-amber-500/15 text-amber-400 border-0">
                                    Pro{user.subscription_tier ? ` · ${user.subscription_tier}` : ''}
                                  </Badge>
                                ) : user.free_access_granted ? (
                                  <Badge className="text-[10px] px-2 py-0 h-5 font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border-0">
                                    Free Access
                                  </Badge>
                                ) : user.subscribed ? (
                                  <Badge className="text-[10px] px-2 py-0 h-5 font-semibold rounded-full bg-amber-500/15 text-amber-400 border-0">
                                    {user.subscription_tier || 'Subscribed'}
                                  </Badge>
                                ) : null}
                                {user.isOnline ? (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">Online</span>
                                ) : user.last_seen ? (
                                  <span className="text-[10px] font-medium text-white">{relativeTime(user.last_seen)}</span>
                                ) : null}
                              </div>

                              {/* Line 4 — Engagement stats */}
                              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-white">
                                <span>
                                  {joinedDays !== null
                                    ? joinedDays === 0 ? 'Joined today' : `Joined ${joinedDays}d ago`
                                    : 'Joined'}
                                </span>
                                {engagementRawMap?.has(user.id) && (() => {
                                  const raw = engagementRawMap.get(user.id)!;
                                  return (
                                    <>
                                      <span className="text-white/30">·</span>
                                      <span>{formatTimeShort(raw.total_seconds_tracked)}</span>
                                      <span className="text-white/30">·</span>
                                      <span>{raw.unique_pages_visited} pages</span>
                                      <span className="text-white/30">·</span>
                                      <span>{raw.login_count} logins</span>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>

                            {/* Chevron */}
                            <ChevronRight className="shrink-0 h-4 w-4 text-white mt-2" />
                          </div>
                        </div>
                      </div>
                    </SwipeableAdminRow>
                  </motion.div>
                );
              })}
            </motion.div>

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

        {/* ── User Detail Sheet ── */}
        <UserManagementSheet
          user={selectedUser ? {
            id: selectedUser.id,
            full_name: selectedUser.full_name,
            email: selectedUser.email || undefined,
            role: selectedUser.role || undefined,
            subscribed: selectedUser.subscribed,
            subscription_tier: selectedUser.subscription_tier || undefined,
            subscription_end: (selectedUser as Record<string, unknown>).subscription_end as string | undefined,
            stripe_customer_id: selectedUser.stripe_customer_id || undefined,
            free_access_granted: selectedUser.free_access_granted,
            free_access_expires_at: (selectedUser as Record<string, unknown>).free_access_expires_at as string | undefined,
            free_access_reason: (selectedUser as Record<string, unknown>).free_access_reason as string | undefined,
            created_at: selectedUser.created_at,
            last_sign_in: selectedUser.last_sign_in || undefined,
          } : null}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          extraActions={
            isSuperAdmin && selectedUser?.admin_role !== 'super_admin' ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`flex-1 h-11 touch-manipulation rounded-xl ${
                    selectedUser?.admin_role
                      ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                      : 'border-orange-500/30 text-orange-400 hover:bg-orange-500/10'
                  }`}
                  onClick={() =>
                    selectedUser &&
                    grantAdminMutation.mutate({
                      userId: selectedUser.id,
                      role: selectedUser.admin_role ? null : 'admin',
                    })
                  }
                  disabled={grantAdminMutation.isPending}
                >
                  {selectedUser?.admin_role ? (
                    <><ShieldOff className="h-4 w-4 mr-2" />Remove Admin</>
                  ) : (
                    <><Shield className="h-4 w-4 mr-2" />Make Admin</>
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
            ) : undefined
          }
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Delete User Permanently?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete{' '}
                <strong>{selectedUser?.full_name || selectedUser?.email}</strong> and all their
                data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 rounded-xl"
                onClick={() => selectedUser && deleteUserMutation.mutate(selectedUser.id)}
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Message User Sheet (from swipe action) */}
        <MessageUserSheet
          open={!!messageUser}
          onOpenChange={(open) => {
            if (!open) setMessageUser(null);
          }}
          user={messageUser}
        />

        {/* Grant Access Sheet */}
        <Sheet
          open={!!grantSheetUser}
          onOpenChange={(open) => {
            if (!open) setGrantSheetUser(null);
          }}
        >
          <SheetContent
            side="bottom"
            className="h-auto max-h-[50vh] rounded-t-3xl p-0 border-t border-border/50"
          >
            <div className="flex flex-col bg-background">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              <div className="px-6 pb-6 pt-2 space-y-5">
                {/* Header */}
                <div>
                  <h3 className="text-lg font-bold text-foreground">Grant Free Access</h3>
                  <p className="text-sm text-white mt-0.5">
                    {grantSheetUser?.full_name || 'User'} · {grantSheetUser?.role || 'visitor'}
                  </p>
                </div>

                {/* Tier Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tier</label>
                  <Select value={grantTier} onValueChange={setGrantTier}>
                    <SelectTrigger className="h-11 touch-manipulation bg-card border-border/50 focus:border-yellow-500 focus:ring-yellow-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="Apprentice">Apprentice</SelectItem>
                      <SelectItem value="Electrician">Electrician</SelectItem>
                      <SelectItem value="Employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Duration</label>
                  <Select value={grantDuration} onValueChange={setGrantDuration}>
                    <SelectTrigger className="h-11 touch-manipulation bg-card border-border/50 focus:border-yellow-500 focus:ring-yellow-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border/50">
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="never">Never Expires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Confirm Button */}
                <Button
                  className="w-full h-12 touch-manipulation rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/20 font-semibold text-base"
                  onClick={handleConfirmGrant}
                  disabled={grantSubscriptionMutation.isPending}
                >
                  {grantSubscriptionMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Gift className="h-5 w-5 mr-2" />
                  )}
                  Grant Access
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { batchedInQuery } from '@/utils/batchedQuery';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminPagination from '@/components/admin/AdminPagination';
import {
  RefreshCw,
  Shield,
  ShieldOff,
  Trash2,
  Gift,
  AlertTriangle,
  XCircle,
  Loader2,
  MessageSquare,
  Download,
  X,
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
import { format, differenceInDays } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import {
  getInitials,
  ROLE_COLORS,
  calculateEngagementScore,
  formatTimeShort,
} from '@/utils/adminUtils';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import UserManagementSheet from '@/components/admin/UserManagementSheet';
import SwipeableAdminRow from '@/components/admin/SwipeableAdminRow';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useHaptic } from '@/hooks/useHaptic';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  Dot,
  TextAction,
  type Tone,
} from '@/components/admin/editorial';

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

const roleToneMap: Record<string, Tone> = {
  apprentice: 'purple',
  electrician: 'yellow',
  employer: 'blue',
  college: 'green',
  visitor: 'cyan',
};

const roleFilters = [
  { value: 'all', label: 'All' },
  { value: 'electrician', label: 'Sparks' },
  { value: 'apprentice', label: 'Apprentice' },
  { value: 'employer', label: 'Employer' },
];

const quickFilters = [
  { value: 'all', label: 'All' },
  { value: 'active_today', label: 'Active today' },
  { value: 'trials', label: 'Trials' },
  { value: 'subscribed', label: 'Subscribed' },
  { value: 'free', label: 'Free' },
  { value: 'never_logged_in', label: 'Never logged in' },
  { value: 'most_engaged', label: 'Most engaged' },
];

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

  const needsFullEngagement = sortBy === 'engagement' || quickFilter === 'most_engaged';
  const allUserIds = useMemo(() => users?.map((u) => u.id) || [], [users]);
  const { data: engagementData } = useQuery({
    queryKey: ['admin-users-engagement', needsFullEngagement ? allUserIds : 'deferred'],
    enabled: needsFullEngagement && allUserIds.length > 0,
    staleTime: 60000,
    queryFn: async () => {
      const rows = await batchedInQuery(
        'user_activity_summary',
        'user_id',
        allUserIds,
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

  const paginatedUserIds = useMemo(() => paginatedUsers.map((u) => u.id), [paginatedUsers]);
  const { data: pageEngagementData } = useQuery({
    queryKey: ['admin-users-engagement-page', paginatedUserIds],
    enabled: !needsFullEngagement && paginatedUserIds.length > 0,
    staleTime: 60000,
    queryFn: async () => {
      const rows = await batchedInQuery(
        'user_activity_summary',
        'user_id',
        paginatedUserIds,
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

  const effectiveEngagementMap = engagementMap || pageEngagementData?.scoreMap;
  const effectiveEngagementRawMap = engagementRawMap || pageEngagementData?.rawMap;

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

  const tierPill = (user: UserProfile): { tone: Tone; label: string } | null => {
    if (user.subscribed && user.stripe_customer_id) {
      return {
        tone: 'amber',
        label: `Pro${user.subscription_tier ? ` · ${user.subscription_tier}` : ''}`,
      };
    }
    if (user.free_access_granted) {
      return { tone: 'emerald', label: 'Free access' };
    }
    if (user.subscribed) {
      return { tone: 'amber', label: user.subscription_tier || 'Subscribed' };
    }
    return null;
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Directory"
          title="Users"
          description="Manage every registered electrician, apprentice and employer on the platform."
          tone="yellow"
          actions={
            <>
              <IconButton onClick={exportCSV} aria-label="Export CSV">
                <Download className="h-4 w-4" />
              </IconButton>
              <IconButton
                onClick={() => refetch()}
                disabled={isFetching}
                aria-label="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Total', value: stats.total },
            { label: 'Online', value: stats.online, tone: 'green' },
            { label: 'Paying', value: stats.subscribed, accent: true },
            { label: 'New this week', value: stats.thisWeek, tone: 'emerald' },
          ]}
        />

        <div className="space-y-4">
          <FilterBar
            tabs={quickFilters.map((f) => ({ value: f.value, label: f.label }))}
            activeTab={quickFilter}
            onTabChange={(value) => {
              setQuickFilter(value);
              if (value === 'all') {
                searchParams.delete('filter');
              } else {
                searchParams.set('filter', value);
              }
              setSearchParams(searchParams);
            }}
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by name or email…"
            actions={
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger className="h-10 w-[140px] shrink-0 rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow/60 text-[13px] text-white touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] text-white">
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="joined">Joined</SelectItem>
                  <SelectItem value="last_active">Last active</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>
            }
          />

          <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full overflow-x-auto hide-scrollbar">
            {roleFilters.map((filter) => {
              const isActive = roleFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setRoleFilter(filter.value)}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation ${
                    isActive
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="sticky top-0 z-10 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70" />
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                  className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <span className="text-[13px] font-semibold text-white tabular-nums">
                  {selectedIds.size} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-10 rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation font-medium"
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
                  variant="ghost"
                  className="h-10 rounded-full text-white hover:text-white hover:bg-white/[0.06] touch-manipulation"
                  onClick={() => bulkRevokeMutation.mutate([...selectedIds])}
                  disabled={bulkActionPending}
                >
                  <XCircle className="h-4 w-4 mr-1.5" />
                  Revoke
                </Button>
                <IconButton
                  onClick={() => setSelectedIds(new Set())}
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <LoadingBlocks />
        ) : users?.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Try adjusting your search or filters."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title={users?.length === allUsersCount ? 'All users' : 'Filtered users'}
              meta={
                <div className="flex items-center gap-2">
                  <Pill tone="yellow">
                    {users?.length === allUsersCount
                      ? `${users?.length || 0}`
                      : `${users?.length || 0} / ${allUsersCount}`}
                  </Pill>
                  {paginatedUsers.length > 0 && (
                    <TextAction onClick={toggleSelectAll}>
                      {isAllSelected ? 'Deselect all' : 'Select all'}
                    </TextAction>
                  )}
                </div>
              }
            />
            <ListBody>
              {paginatedUsers.map((user) => {
                const roleKey = user.role?.toLowerCase() || 'visitor';
                const accentTone = roleToneMap[roleKey] || 'cyan';
                const joinedDays = user.created_at
                  ? differenceInDays(new Date(), new Date(user.created_at))
                  : null;
                const tier = tierPill(user);
                const engagementScore = effectiveEngagementMap?.get(user.id);
                const rawEngagement = effectiveEngagementRawMap?.get(user.id);
                const isSelected = selectedIds.has(user.id);

                return (
                  <SwipeableAdminRow
                    key={user.id}
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
                        colour: 'bg-emerald-500',
                        onClick: () => {
                          openGrantSheet(user);
                        },
                      },
                    ]}
                  >
                    <div
                      className={`relative ${
                        isSelected ? 'bg-white/[0.04]' : ''
                      }`}
                    >
                      <ListRow
                        accent={accentTone}
                        lead={
                          <div
                            className="flex items-center gap-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="min-h-[44px] min-w-[28px] flex items-center justify-center touch-manipulation"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelection(user.id);
                              }}
                              aria-label={isSelected ? 'Deselect' : 'Select'}
                            >
                              <Checkbox
                                checked={isSelected}
                                className="h-4 w-4 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black pointer-events-none"
                              />
                            </button>
                            <Avatar
                              initials={getInitials(user.full_name) || '—'}
                              online={user.isOnline ? true : undefined}
                            />
                          </div>
                        }
                        title={
                          <span className="flex items-center gap-1.5">
                            <span className="truncate">
                              {user.full_name || 'No name'}
                            </span>
                            {user.admin_role && (
                              <Shield className="h-3 w-3 text-elec-yellow shrink-0" />
                            )}
                          </span>
                        }
                        subtitle={
                          <span className="flex flex-col gap-1">
                            <span className="truncate">
                              {user.email || (user.username ? `@${user.username}` : '—')}
                            </span>
                            <span className="flex items-center gap-1.5 flex-wrap">
                              <Pill tone={accentTone}>
                                {user.role || 'visitor'}
                              </Pill>
                              {tier && <Pill tone={tier.tone}>{tier.label}</Pill>}
                              {engagementScore !== undefined && (
                                <Pill
                                  tone={
                                    engagementScore >= 70
                                      ? 'emerald'
                                      : engagementScore >= 40
                                        ? 'amber'
                                        : 'cyan'
                                  }
                                >
                                  {engagementScore}
                                </Pill>
                              )}
                            </span>
                            <span className="flex items-center gap-2 text-[10.5px] text-white">
                              <span>
                                {joinedDays !== null
                                  ? joinedDays === 0
                                    ? 'Joined today'
                                    : `Joined ${joinedDays}d ago`
                                  : 'Joined'}
                              </span>
                              {user.isOnline ? (
                                <>
                                  <span>·</span>
                                  <span className="flex items-center gap-1">
                                    <Dot tone="green" />
                                    Online
                                  </span>
                                </>
                              ) : user.last_seen ? (
                                <>
                                  <span>·</span>
                                  <span>{relativeTime(user.last_seen)}</span>
                                </>
                              ) : null}
                              {rawEngagement && (
                                <>
                                  <span>·</span>
                                  <span>
                                    {formatTimeShort(rawEngagement.total_seconds_tracked)}
                                  </span>
                                  <span>·</span>
                                  <span>{rawEngagement.login_count} logins</span>
                                </>
                              )}
                            </span>
                          </span>
                        }
                        onClick={() => handleUserClick(user)}
                      />
                    </div>
                  </SwipeableAdminRow>
                );
              })}
            </ListBody>
          </ListCard>
        )}

        {totalPages > 1 && !isLoading && users && users.length > 0 && (
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
          />
        )}

        <UserManagementSheet
          user={
            selectedUser
              ? {
                  id: selectedUser.id,
                  full_name: selectedUser.full_name,
                  email: selectedUser.email || undefined,
                  role: selectedUser.role || undefined,
                  subscribed: selectedUser.subscribed,
                  subscription_tier: selectedUser.subscription_tier || undefined,
                  subscription_end: (selectedUser as Record<string, unknown>)
                    .subscription_end as string | undefined,
                  stripe_customer_id: selectedUser.stripe_customer_id || undefined,
                  free_access_granted: selectedUser.free_access_granted,
                  free_access_expires_at: (selectedUser as Record<string, unknown>)
                    .free_access_expires_at as string | undefined,
                  free_access_reason: (selectedUser as Record<string, unknown>)
                    .free_access_reason as string | undefined,
                  created_at: selectedUser.created_at,
                  last_sign_in: selectedUser.last_sign_in || undefined,
                }
              : null
          }
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          extraActions={
            isSuperAdmin && selectedUser?.admin_role !== 'super_admin' ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] text-white hover:bg-white/[0.06]"
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
                    <>
                      <ShieldOff className="h-4 w-4 mr-2" />
                      Remove admin
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Make admin
                    </>
                  )}
                </Button>
                <IconButton
                  onClick={() => setDeleteDialogOpen(true)}
                  aria-label="Delete user"
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            ) : undefined
          }
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="rounded-2xl bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Delete user permanently?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will permanently delete{' '}
                <strong className="text-white">
                  {selectedUser?.full_name || selectedUser?.email}
                </strong>{' '}
                and all their data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-full bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() => selectedUser && deleteUserMutation.mutate(selectedUser.id)}
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? 'Deleting…' : 'Delete user'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <MessageUserSheet
          open={!!messageUser}
          onOpenChange={(open) => {
            if (!open) setMessageUser(null);
          }}
          user={messageUser}
        />

        <Sheet
          open={!!grantSheetUser}
          onOpenChange={(open) => {
            if (!open) setGrantSheetUser(null);
          }}
        >
          <SheetContent
            side="bottom"
            className="h-auto max-h-[60vh] rounded-t-3xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_10%)]"
          >
            <div className="flex flex-col">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/15" />
              </div>

              <div className="px-6 pb-6 pt-2 space-y-5">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    Grant
                  </div>
                  <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Free access
                  </h3>
                  <p className="mt-1 text-[13px] text-white">
                    {grantSheetUser?.full_name || 'User'} · {grantSheetUser?.role || 'visitor'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                    Tier
                  </label>
                  <Select value={grantTier} onValueChange={setGrantTier}>
                    <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_14%)] border-white/[0.08] focus:border-elec-yellow/60 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] text-white">
                      <SelectItem value="Apprentice">Apprentice</SelectItem>
                      <SelectItem value="Electrician">Electrician</SelectItem>
                      <SelectItem value="Employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                    Duration
                  </label>
                  <Select value={grantDuration} onValueChange={setGrantDuration}>
                    <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_14%)] border-white/[0.08] focus:border-elec-yellow/60 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] text-white">
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="never">Never expires</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full h-12 touch-manipulation rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold text-base"
                  onClick={handleConfirmGrant}
                  disabled={grantSubscriptionMutation.isPending}
                >
                  {grantSubscriptionMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Gift className="h-5 w-5 mr-2" />
                  )}
                  Grant access
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {isSuperAdmin && selectedUser?.subscribed && (
          <div className="hidden">
            <button
              onClick={() =>
                selectedUser && revokeSubscriptionMutation.mutate(selectedUser.id)
              }
              disabled={revokeSubscriptionMutation.isPending}
            >
              revoke
            </button>
          </div>
        )}
      </PageFrame>
    </PullToRefresh>
  );
}

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
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
import {
  ShieldCheck,
  ShieldX,
  Loader2,
  RefreshCw,
  Download,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
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
  Divider,
  Eyebrow,
  type Tone,
} from '@/components/admin/editorial';

interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string | null;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  bio: string | null;
  specialisations: string[] | null;
  profile_views: number;
  is_verified: boolean;
  verified_at: string | null;
  verification_tier: string | null;
  activated: boolean;
  activated_at: string | null;
  available_for_hire: boolean;
  created_at: string;
  profiles?: {
    full_name: string;
    username: string;
    role: string;
  } | null;
}

function getInitials(name?: string | null) {
  if (!name) return '--';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminElecIds() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkApproveDialog, setShowBulkApproveDialog] = useState(false);
  const [showBulkRejectDialog, setShowBulkRejectDialog] = useState(false);
  const [bulkRejectReason, setBulkRejectReason] = useState('');

  const {
    data: elecIds,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-elec-ids', search, statusFilter],
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      let query = supabase
        .from('employer_elec_id_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter === 'approved') {
        query = query.eq('is_verified', true);
      } else if (statusFilter === 'pending') {
        query = query.eq('is_verified', false);
      } else if (statusFilter === 'activated') {
        query = query.eq('activated', true);
      }

      const { data: elecIdData, error: elecIdError } = await query;
      if (elecIdError) throw elecIdError;

      if (!elecIdData || elecIdData.length === 0) {
        return [];
      }

      const employeeIds = elecIdData.map((p) => p.employee_id).filter(Boolean);
      const { data: employeesData, error: employeesError } = await supabase
        .from('employer_employees')
        .select('id, user_id')
        .in('id', employeeIds);

      if (employeesError) {
        console.error('Error fetching employees:', employeesError);
      }

      const employeeToUserMap = new Map(employeesData?.map((e) => [e.id, e.user_id]) || []);

      const userIds = employeesData?.map((e) => e.user_id).filter(Boolean) || [];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, username, role')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      const profilesMap = new Map(
        profilesData?.map((p) => [
          p.id,
          { full_name: p.full_name, username: p.username, role: p.role },
        ]) || []
      );

      let merged = elecIdData.map((elecId) => {
        const userId = employeeToUserMap.get(elecId.employee_id);
        const profile = userId ? profilesMap.get(userId) : null;
        return {
          ...elecId,
          profiles: profile || null,
        };
      }) as ElecIdProfile[];

      if (search) {
        const searchLower = search.toLowerCase();
        merged = merged.filter(
          (p) =>
            p.profiles?.full_name?.toLowerCase().includes(searchLower) ||
            p.elec_id_number?.toLowerCase().includes(searchLower) ||
            p.ecs_card_number?.toLowerCase().includes(searchLower)
        );
      }

      return merged;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['admin-elec-id-stats'],
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      const todayIso = new Date();
      todayIso.setHours(0, 0, 0, 0);

      const [totalRes, verifiedRes, activatedRes, pendingRes, todayRes] = await Promise.all([
        supabase.from('employer_elec_id_profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('employer_elec_id_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_verified', true),
        supabase
          .from('employer_elec_id_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('activated', true),
        supabase
          .from('employer_elec_id_profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_verified', false),
        supabase
          .from('employer_elec_id_profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', todayIso.toISOString()),
      ]);

      return {
        total: totalRes.count || 0,
        verified: verifiedRes.count || 0,
        activated: activatedRes.count || 0,
        pending: pendingRes.count || 0,
        today: todayRes.count || 0,
      };
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('admin-verify-elecid', {
        body: { action: 'approve', profileId: id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-elec-ids'] });
      queryClient.invalidateQueries({ queryKey: ['admin-elec-id-stats'] });
      setSelectedProfile(null);
      toast({ title: 'Profile approved', description: 'Elec-ID has been verified.' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { data, error } = await supabase.functions.invoke('admin-verify-elecid', {
        body: { action: 'reject', profileId: id, reason },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-elec-ids'] });
      queryClient.invalidateQueries({ queryKey: ['admin-elec-id-stats'] });
      setSelectedProfile(null);
      setShowRejectDialog(false);
      setRejectReason('');
      toast({ title: 'Profile rejected' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const bulkApproveMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const results = await Promise.allSettled(
        ids.map((id) =>
          supabase.functions.invoke('admin-verify-elecid', {
            body: { action: 'approve', profileId: id },
          })
        )
      );
      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        throw new Error(`${failures.length} of ${ids.length} approvals failed`);
      }
      return { approved: ids.length };
    },
    onSuccess: (data) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-elec-ids'] });
      queryClient.invalidateQueries({ queryKey: ['admin-elec-id-stats'] });
      setSelectedIds(new Set());
      setShowBulkApproveDialog(false);
      toast({
        title: 'Bulk approval complete',
        description: `${data.approved} profiles verified.`,
      });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Bulk approval failed', description: error.message, variant: 'destructive' });
    },
  });

  const bulkRejectMutation = useMutation({
    mutationFn: async ({ ids, reason }: { ids: string[]; reason: string }) => {
      const results = await Promise.allSettled(
        ids.map((id) =>
          supabase.functions.invoke('admin-verify-elecid', {
            body: { action: 'reject', profileId: id, reason },
          })
        )
      );
      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        throw new Error(`${failures.length} of ${ids.length} rejections failed`);
      }
      return { rejected: ids.length };
    },
    onSuccess: (data) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-elec-ids'] });
      queryClient.invalidateQueries({ queryKey: ['admin-elec-id-stats'] });
      setSelectedIds(new Set());
      setShowBulkRejectDialog(false);
      setBulkRejectReason('');
      toast({
        title: 'Bulk rejection complete',
        description: `${data.rejected} profiles rejected.`,
      });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Bulk rejection failed', description: error.message, variant: 'destructive' });
    },
  });

  const exportCSV = () => {
    if (!elecIds || elecIds.length === 0) return;
    const headers = ['Name', 'Elec-ID', 'ECS Card Type', 'Status', 'Created At'];
    const rows = elecIds.map((p) => [
      p.profiles?.full_name || '',
      p.elec_id_number || '',
      p.ecs_card_type || '',
      p.is_verified ? 'Verified' : 'Pending',
      p.created_at ? format(new Date(p.created_at), 'yyyy-MM-dd HH:mm') : '',
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
    a.download = `admin-elec-ids-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pendingProfiles = useMemo(
    () => elecIds?.filter((p) => !p.is_verified) || [],
    [elecIds]
  );

  const selectAllPending = () => {
    setSelectedIds(new Set(pendingProfiles.map((p) => p.id)));
  };
  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const statusTone = (profile: ElecIdProfile): Tone => {
    if (profile.is_verified) return 'emerald';
    return 'orange';
  };

  const statusLabel = (profile: ElecIdProfile) => {
    if (profile.is_verified) return 'Verified';
    return 'Pending';
  };

  const tierTone = (tier: string | null): Tone => {
    switch (tier) {
      case 'gold':
        return 'yellow';
      case 'silver':
        return 'cyan';
      case 'bronze':
        return 'orange';
      default:
        return 'blue';
    }
  };

  const headerTitle =
    statusFilter === 'pending'
      ? 'Pending Verification'
      : statusFilter === 'approved'
        ? 'Approved Profiles'
        : statusFilter === 'activated'
          ? 'Activated Profiles'
          : 'All Profiles';

  const headerTone: Tone =
    statusFilter === 'pending'
      ? 'orange'
      : statusFilter === 'approved'
        ? 'emerald'
        : statusFilter === 'activated'
          ? 'yellow'
          : 'blue';

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Moderation"
          title="Elec-IDs"
          description="Verify electrician qualifications and competent-person scheme status."
          tone="blue"
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
                <RefreshCw className={isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Queue',
              value: stats?.pending ?? 0,
              tone: 'orange',
              onClick: () => setStatusFilter('pending'),
            },
            {
              label: 'Today',
              value: stats?.today ?? 0,
              tone: 'blue',
            },
            {
              label: 'Approved',
              value: stats?.verified ?? 0,
              tone: 'emerald',
              onClick: () => setStatusFilter('approved'),
            },
            {
              label: 'Activated',
              value: stats?.activated ?? 0,
              tone: 'yellow',
              onClick: () => setStatusFilter('activated'),
            },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'pending', label: 'Pending', count: stats?.pending },
            { value: 'approved', label: 'Approved', count: stats?.verified },
            { value: 'activated', label: 'Activated', count: stats?.activated },
            { value: 'all', label: 'All', count: stats?.total },
          ]}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search name, Elec-ID, ECS..."
        />

        {pendingProfiles.length > 0 && statusFilter === 'pending' && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 sm:px-5 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={
                  selectedIds.size === pendingProfiles.length && selectedIds.size > 0
                    ? clearSelection
                    : selectAllPending
                }
                className="h-11 px-4 rounded-full border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
              >
                {selectedIds.size === pendingProfiles.length && selectedIds.size > 0
                  ? 'Clear selection'
                  : `Select all (${pendingProfiles.length})`}
              </button>
              {selectedIds.size > 0 && (
                <span className="text-[12px] text-white">{selectedIds.size} selected</span>
              )}
            </div>
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBulkRejectDialog(true)}
                  disabled={bulkRejectMutation.isPending}
                  className="h-11 px-4 rounded-full border border-white/[0.08] text-[12.5px] font-medium text-white hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50"
                >
                  Reject ({selectedIds.size})
                </button>
                <button
                  onClick={() => setShowBulkApproveDialog(true)}
                  disabled={bulkApproveMutation.isPending}
                  className="h-11 px-4 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50"
                >
                  Approve ({selectedIds.size})
                </button>
              </div>
            )}
          </div>
        )}

        {isLoading ? (
          <LoadingBlocks />
        ) : elecIds?.length === 0 ? (
          <EmptyState
            title="Queue is empty"
            description="All submissions reviewed."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone={headerTone}
              title={headerTitle}
              meta={
                <Pill tone={headerTone}>
                  {elecIds?.length ?? 0}
                </Pill>
              }
            />
            <ListBody>
              {elecIds?.map((profile) => (
                <ListRow
                  key={profile.id}
                  lead={
                    <Avatar
                      initials={getInitials(profile.profiles?.full_name)}
                    />
                  }
                  title={profile.profiles?.full_name || 'Unknown'}
                  subtitle={
                    <span className="tabular-nums">
                      {profile.elec_id_number || 'No ID'}
                      {profile.ecs_card_type ? ` \u00b7 ${profile.ecs_card_type}` : ''}
                      {profile.created_at
                        ? ` \u00b7 submitted ${formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}`
                        : ''}
                    </span>
                  }
                  trailing={
                    <>
                      {profile.verification_tier && (
                        <Pill tone={tierTone(profile.verification_tier)}>
                          {profile.verification_tier}
                        </Pill>
                      )}
                      <Pill tone={statusTone(profile)}>{statusLabel(profile)}</Pill>
                    </>
                  }
                  onClick={() => setSelectedProfile(profile)}
                  accent={selectedIds.has(profile.id) ? 'yellow' : undefined}
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_8%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle asChild>
                  <div className="flex items-center gap-3 text-left">
                    <Avatar initials={getInitials(selectedProfile?.profiles?.full_name)} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[15px] font-semibold text-white truncate">
                        {selectedProfile?.profiles?.full_name || 'Unknown'}
                      </div>
                      <div className="text-[12px] text-white tabular-nums truncate">
                        {selectedProfile?.elec_id_number || 'No Elec-ID'}
                      </div>
                    </div>
                    {selectedProfile && (
                      <Pill tone={statusTone(selectedProfile)}>
                        {statusLabel(selectedProfile)}
                      </Pill>
                    )}
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
                    <Eyebrow>Verification</Eyebrow>
                    <div className="mt-2 text-[15px] font-semibold text-white">
                      {selectedProfile?.is_verified ? 'Verified' : 'Pending'}
                    </div>
                    {selectedProfile?.verified_at && (
                      <div className="mt-1 text-[11px] text-white">
                        {format(new Date(selectedProfile.verified_at), 'dd MMM yyyy')}
                      </div>
                    )}
                  </div>
                  <div className="bg-[hsl(0_0%_10%)] px-4 py-4">
                    <Eyebrow>Activation</Eyebrow>
                    <div className="mt-2 text-[15px] font-semibold text-white">
                      {selectedProfile?.activated ? 'Active' : 'Not active'}
                    </div>
                    {selectedProfile?.activated_at && (
                      <div className="mt-1 text-[11px] text-white">
                        {format(new Date(selectedProfile.activated_at), 'dd MMM yyyy')}
                      </div>
                    )}
                  </div>
                </div>

                {selectedProfile?.ecs_card_number && (
                  <div>
                    <Divider label="ECS Card" />
                    <div className="mt-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-[12px] text-white">Type</span>
                        <span className="text-[13px] font-medium text-white">
                          {selectedProfile.ecs_card_type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-[12px] text-white">Number</span>
                        <span className="text-[13px] font-mono text-white tabular-nums">
                          {selectedProfile.ecs_card_number}
                        </span>
                      </div>
                      {selectedProfile.ecs_expiry_date && (
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-[12px] text-white">Expires</span>
                          <span className="text-[13px] text-white tabular-nums">
                            {format(new Date(selectedProfile.ecs_expiry_date), 'dd MMM yyyy')}
                          </span>
                        </div>
                      )}
                      {selectedProfile.verification_tier && (
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-[12px] text-white">Tier</span>
                          <Pill tone={tierTone(selectedProfile.verification_tier)}>
                            {selectedProfile.verification_tier}
                          </Pill>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Divider label="Profile" />
                  <div className="mt-3 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Profile views</span>
                      <span className="text-[13px] font-semibold text-white tabular-nums">
                        {selectedProfile?.profile_views || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Available for hire</span>
                      <Pill tone={selectedProfile?.available_for_hire ? 'emerald' : 'blue'}>
                        {selectedProfile?.available_for_hire ? 'Yes' : 'No'}
                      </Pill>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Submitted</span>
                      <span className="text-[13px] text-white">
                        {selectedProfile?.created_at &&
                          formatDistanceToNow(new Date(selectedProfile.created_at), {
                            addSuffix: true,
                          })}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedProfile?.specialisations && selectedProfile.specialisations.length > 0 && (
                  <div>
                    <Divider label="Specialisations" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProfile.specialisations.map((spec, i) => (
                        <Pill key={i} tone="blue">
                          {spec}
                        </Pill>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProfile?.bio && (
                  <div>
                    <Divider label="Bio" />
                    <p className="mt-3 text-[13px] leading-relaxed text-white">
                      {selectedProfile.bio}
                    </p>
                  </div>
                )}
              </div>

              {selectedProfile && !selectedProfile.is_verified && (
                <SheetFooter className="p-4 border-t border-white/[0.06]">
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setShowRejectDialog(true)}
                      disabled={approveMutation.isPending}
                      className="flex-1 h-12 rounded-full border border-white/[0.08] text-[13px] font-medium text-white hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <ShieldX className="h-4 w-4" />
                      Reject
                    </button>
                    <button
                      onClick={() =>
                        selectedProfile && approveMutation.mutate(selectedProfile.id)
                      }
                      disabled={approveMutation.isPending}
                      className="flex-1 h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {approveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                      {approveMutation.isPending ? 'Approving...' : 'Verify'}
                    </button>
                  </div>
                </SheetFooter>
              )}

            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Reject Verification?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Please provide a reason for rejection. This will be sent to the user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="min-h-[100px] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60"
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04]"
                disabled={rejectMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() =>
                  selectedProfile &&
                  rejectMutation.mutate({ id: selectedProfile.id, reason: rejectReason })
                }
                disabled={!rejectReason.trim() || rejectMutation.isPending}
              >
                {rejectMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  'Reject'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showBulkApproveDialog} onOpenChange={setShowBulkApproveDialog}>
          <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Bulk Approve {selectedIds.size} Profiles?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will verify {selectedIds.size} Elec-ID profiles. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04]"
                disabled={bulkApproveMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() => bulkApproveMutation.mutate(Array.from(selectedIds))}
                disabled={bulkApproveMutation.isPending}
              >
                {bulkApproveMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Approve All
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showBulkRejectDialog} onOpenChange={setShowBulkRejectDialog}>
          <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Bulk Reject {selectedIds.size} Profiles?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Please provide a reason for rejection. This will be sent to all {selectedIds.size}{' '}
                users.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              value={bulkRejectReason}
              onChange={(e) => setBulkRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="min-h-[100px] bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60"
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04]"
                disabled={bulkRejectMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() =>
                  bulkRejectMutation.mutate({
                    ids: Array.from(selectedIds),
                    reason: bulkRejectReason,
                  })
                }
                disabled={!bulkRejectReason.trim() || bulkRejectMutation.isPending}
              >
                {bulkRejectMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <ShieldX className="h-4 w-4 mr-2" />
                    Reject All
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import { RefreshCw, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
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
  Eyebrow,
  Divider,
  type Tone,
} from '@/components/admin/editorial';

interface ElecIdProfile {
  id: string;
  employee_id: string;
  elec_id_number: string | null;
  ecs_card_type: string | null;
  ecs_card_number: string | null;
  ecs_expiry_date: string | null;
  verification_status: string;
  verification_notes: string | null;
  rejection_reason: string | null;
  is_verified: boolean;
  created_at: string;
  profiles?: { full_name: string; username: string; role: string };
}

const STATUS_TONE: Record<string, Tone> = {
  pending: 'orange',
  under_review: 'blue',
  approved: 'emerald',
  rejected: 'red',
};

function getInitials(name?: string | null): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function inferType(p: ElecIdProfile): string {
  if (p.ecs_card_type) return 'Qualification';
  if (p.ecs_card_number) return 'Scheme';
  if (p.elec_id_number) return 'Identity';
  return 'Insurance';
}

export default function AdminVerificationQueue() {
  useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState<ElecIdProfile | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const {
    data: queue,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-verification-queue', statusFilter],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-verify-elecid', {
        body: { action: 'list', reason: statusFilter },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      let filtered = (data?.profiles || []) as ElecIdProfile[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.profiles?.full_name?.toLowerCase().includes(s) ||
            p.elec_id_number?.toLowerCase().includes(s) ||
            p.ecs_card_number?.toLowerCase().includes(s)
        );
      }
      return filtered;
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
      queryClient.invalidateQueries({ queryKey: ['admin-verification-queue'] });
      setSelectedProfile(null);
      toast({ title: 'Profile approved', description: 'Elec-ID has been verified.' });
    },
    onError: (error) => {
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
      queryClient.invalidateQueries({ queryKey: ['admin-verification-queue'] });
      setSelectedProfile(null);
      setShowRejectDialog(false);
      setRejectReason('');
      toast({ title: 'Profile rejected' });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const stats = useMemo(() => {
    const list = queue || [];
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return {
      pending: list.filter((p) => p.verification_status === 'pending').length,
      approved: list.filter((p) => p.verification_status === 'approved').length,
      rejected: list.filter((p) => p.verification_status === 'rejected').length,
      today: list.filter((p) => new Date(p.created_at).getTime() >= startOfDay.getTime()).length,
    };
  }, [queue]);

  const filtered = useMemo(() => {
    if (!queue) return [];
    if (typeFilter === 'all') return queue;
    return queue.filter((p) => inferType(p) === typeFilter);
  }, [queue, typeFilter]);

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <PageFrame>
        <PageHero
          eyebrow="Moderation"
          title="Verification"
          description="Review pending verifications across all types."
          tone="orange"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Pending', value: stats.pending, tone: 'orange' },
            { label: 'Today', value: stats.today, tone: 'blue' },
            { label: 'Approved', value: stats.approved, tone: 'emerald' },
            { label: 'Rejected', value: stats.rejected, tone: 'red' },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All types' },
            { value: 'Identity', label: 'Identity' },
            { value: 'Qualification', label: 'Qualification' },
            { value: 'Insurance', label: 'Insurance' },
            { value: 'Scheme', label: 'Scheme' },
          ]}
          activeTab={typeFilter}
          onTabChange={setTypeFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search name, Elec-ID, ECS number…"
        />

        <FilterBar
          tabs={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'all', label: 'All statuses' },
          ]}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Nothing to review"
            description="Verification requests will appear here as users submit their details."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="orange"
              title="Queue"
              meta={<Pill tone="orange">{filtered.length}</Pill>}
            />
            <ListBody>
              {filtered.map((item) => {
                const name = item.profiles?.full_name || 'Unknown';
                const type = inferType(item);
                const timeAgo = formatDistanceToNow(new Date(item.created_at), { addSuffix: true });
                const tone = STATUS_TONE[item.verification_status] || 'amber';
                return (
                  <ListRow
                    key={item.id}
                    lead={<Avatar initials={getInitials(name)} />}
                    title={name}
                    subtitle={`${type} · ${timeAgo}`}
                    trailing={
                      <Pill tone={tone}>{item.verification_status.replace('_', ' ')}</Pill>
                    }
                    onClick={() => setSelectedProfile(item)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <Avatar initials={getInitials(selectedProfile?.profiles?.full_name)} />
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-white truncate">
                      {selectedProfile?.profiles?.full_name || 'Unknown'}
                    </div>
                    <div className="mt-0.5 text-[12px] text-white truncate font-mono">
                      {selectedProfile?.elec_id_number || 'No Elec-ID'}
                    </div>
                  </div>
                  <div className="ml-auto shrink-0">
                    {selectedProfile && (
                      <Pill tone={STATUS_TONE[selectedProfile.verification_status] || 'amber'}>
                        {selectedProfile.verification_status.replace('_', ' ')}
                      </Pill>
                    )}
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div>
                  <Eyebrow>User details</Eyebrow>
                  <div className="mt-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Name</span>
                      <span className="text-[13px] text-white">
                        {selectedProfile?.profiles?.full_name || '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Username</span>
                      <span className="text-[13px] text-white">
                        @{selectedProfile?.profiles?.username || '—'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Role</span>
                      <Pill tone="yellow">{selectedProfile?.profiles?.role || '—'}</Pill>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] text-white">Submitted</span>
                      <span className="text-[13px] text-white">
                        {selectedProfile &&
                          format(new Date(selectedProfile.created_at), 'dd MMM yyyy · HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedProfile?.ecs_card_number && (
                  <div>
                    <Eyebrow>ECS card</Eyebrow>
                    <div className="mt-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-[12px] text-white">Type</span>
                        <span className="text-[13px] text-white">
                          {selectedProfile.ecs_card_type || '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-[12px] text-white">Number</span>
                        <span className="text-[13px] text-white font-mono">
                          {selectedProfile.ecs_card_number}
                        </span>
                      </div>
                      {selectedProfile.ecs_expiry_date && (
                        <div className="flex items-center justify-between px-4 py-3">
                          <span className="text-[12px] text-white">Expires</span>
                          <span className="text-[13px] text-white">
                            {format(new Date(selectedProfile.ecs_expiry_date), 'dd MMM yyyy')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedProfile?.verification_notes && (
                  <div>
                    <Eyebrow>Reviewer notes</Eyebrow>
                    <div className="mt-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
                      <p className="text-[13px] text-white leading-relaxed">
                        {selectedProfile.verification_notes}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProfile?.rejection_reason && (
                  <div>
                    <Eyebrow>Rejection reason</Eyebrow>
                    <div className="mt-3 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                        <p className="text-[13px] text-white leading-relaxed">
                          {selectedProfile.rejection_reason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Divider label="Audit trail" />
                <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Submitted</span>
                    <span className="text-[13px] text-white">
                      {selectedProfile &&
                        formatDistanceToNow(new Date(selectedProfile.created_at), {
                          addSuffix: true,
                        })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Employee ID</span>
                    <span className="text-[13px] text-white font-mono">
                      {selectedProfile?.employee_id || '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white">Verified</span>
                    <Pill tone={selectedProfile?.is_verified ? 'emerald' : 'amber'}>
                      {selectedProfile?.is_verified ? 'Yes' : 'No'}
                    </Pill>
                  </div>
                </div>
              </div>

              {selectedProfile?.verification_status === 'pending' && (
                <SheetFooter className="p-4 border-t border-white/[0.06]">
                  <div className="flex gap-3 w-full">
                    <button
                      className="flex-1 h-12 rounded-full border border-white/[0.08] bg-white/[0.04] text-white text-[13px] font-medium hover:bg-white/[0.08] transition-colors touch-manipulation disabled:opacity-50"
                      onClick={() => setShowRejectDialog(true)}
                      disabled={approveMutation.isPending}
                    >
                      Reject
                    </button>
                    <button
                      className="flex-1 h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold hover:brightness-110 transition touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
                      onClick={() =>
                        selectedProfile && approveMutation.mutate(selectedProfile.id)
                      }
                      disabled={approveMutation.isPending}
                    >
                      {approveMutation.isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {approveMutation.isPending ? 'Approving…' : 'Approve'}
                    </button>
                  </div>
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Reject verification?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Please provide a reason for rejection. This will be sent to the user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason…"
              className="min-h-[100px] bg-[hsl(0_0%_10%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow/60"
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                disabled={rejectMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:brightness-110"
                onClick={() =>
                  selectedProfile &&
                  rejectMutation.mutate({ id: selectedProfile.id, reason: rejectReason })
                }
                disabled={!rejectReason.trim() || rejectMutation.isPending}
              >
                {rejectMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rejecting…
                  </>
                ) : (
                  'Reject'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}

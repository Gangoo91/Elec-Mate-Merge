import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
import { RefreshCw, Check, X, Flag, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
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
  EmptyState,
  LoadingBlocks,
  IconButton,
  Divider,
  type Tone,
} from '@/components/admin/editorial';

interface PricingSubmission {
  id: string;
  user_id: string;
  postcode_district: string | null;
  job_type: string;
  actual_price: number;
  job_description: string | null;
  completion_date: string | null;
  materials_cost: number | null;
  labour_hours: number | null;
  complexity_notes: string | null;
  verification_status: string | null;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  profiles?: { full_name: string; username: string; role: string };
}

const REJECTION_REASONS = [
  { id: 'unrealistic', label: 'Price seems unrealistic' },
  { id: 'spam', label: 'Spam or test submission' },
  { id: 'incomplete', label: 'Missing required details' },
  { id: 'duplicate', label: 'Duplicate submission' },
  { id: 'other', label: 'Other' },
] as const;

function getInitials(name?: string | null) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function classifyJobType(jobType: string): 'material' | 'labour' | 'equipment' {
  const t = (jobType || '').toLowerCase();
  if (/(labour|hour|rate|day rate|call[- ]?out)/.test(t)) return 'labour';
  if (/(tool|equip|machine|hire|test ?kit|ladder|cable drum)/.test(t)) return 'equipment';
  return 'material';
}

function statusToTone(status: string | null): Tone {
  switch (status) {
    case 'approved':
      return 'emerald';
    case 'rejected':
      return 'red';
    case 'flagged':
      return 'orange';
    default:
      return 'blue';
  }
}

export default function AdminPricingModeration() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState<'all' | 'material' | 'labour' | 'equipment' | 'flagged'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<PricingSubmission | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const haptic = useHaptic();

  const toggleReason = (reasonId: string, checked: boolean) => {
    setSelectedReasons((prev) =>
      checked ? [...prev, reasonId] : prev.filter((id) => id !== reasonId)
    );
  };

  const {
    data: submissions,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-pricing-submissions', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('community_pricing_submissions')
        .select(`*, profiles:user_id (full_name, username, role)`)
        .order('created_at', { ascending: false })
        .limit(200);

      if (statusFilter !== 'all') {
        if (statusFilter === 'pending') {
          query = query.or('verification_status.is.null,verification_status.eq.pending');
        } else {
          query = query.eq('verification_status', statusFilter);
        }
      }

      const { data, error } = await query;
      if (error) throw error;

      let filtered = data as PricingSubmission[];
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.job_type?.toLowerCase().includes(s) ||
            p.postcode_district?.toLowerCase().includes(s) ||
            p.profiles?.full_name?.toLowerCase().includes(s) ||
            p.job_description?.toLowerCase().includes(s)
        );
      }
      return filtered;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ['admin-pricing-stats'],
    queryFn: async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const [pendingRes, approvedRes, rejectedRes, weekRes] = await Promise.all([
        supabase
          .from('community_pricing_submissions')
          .select('*', { count: 'exact', head: true })
          .or('verification_status.is.null,verification_status.eq.pending'),
        supabase
          .from('community_pricing_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'approved'),
        supabase
          .from('community_pricing_submissions')
          .select('*', { count: 'exact', head: true })
          .eq('verification_status', 'rejected'),
        supabase
          .from('community_pricing_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo.toISOString()),
      ]);

      const { data: avgData } = await supabase
        .from('community_pricing_submissions')
        .select('job_type, actual_price')
        .eq('verification_status', 'approved');

      const avgByType: Record<string, { total: number; count: number }> = {};
      avgData?.forEach((item) => {
        if (!avgByType[item.job_type]) {
          avgByType[item.job_type] = { total: 0, count: 0 };
        }
        avgByType[item.job_type].total += Number(item.actual_price);
        avgByType[item.job_type].count += 1;
      });

      return {
        pending: pendingRes.count || 0,
        approved: approvedRes.count || 0,
        rejected: rejectedRes.count || 0,
        thisWeek: weekRes.count || 0,
        avgByType,
      };
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('community_pricing_submissions')
        .update({
          verification_status: 'approved',
          verified_by: profile?.id,
          verified_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (error) throw error;

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'pricing_approved',
        entity_type: 'community_pricing_submissions',
        entity_id: id,
      });
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-stats'] });
      setSelectedSubmission(null);
      toast({ title: 'Price approved', description: 'Submission has been verified.' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({
      id,
      reasons,
      otherText,
    }: {
      id: string;
      reasons: string[];
      otherText?: string;
    }) => {
      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'pricing_deleted',
        entity_type: 'community_pricing_submissions',
        entity_id: id,
        new_values: { reasons, otherText },
      });

      const { error } = await supabase.from('community_pricing_submissions').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-stats'] });
      setSelectedSubmission(null);
      setShowRejectDialog(false);
      setSelectedReasons([]);
      setOtherReason('');
      toast({ title: 'Submission deleted' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const flagMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('community_pricing_submissions')
        .update({
          verification_status: 'flagged',
          verified_by: profile?.id,
          verified_at: new Date().toISOString(),
        })
        .eq('id', id);
      if (error) throw error;

      await supabase.from('admin_audit_logs').insert({
        user_id: profile?.id,
        action: 'pricing_flagged',
        entity_type: 'community_pricing_submissions',
        entity_id: id,
      });
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-pricing-stats'] });
      setSelectedSubmission(null);
      toast({ title: 'Price flagged for review' });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const isPriceSuspicious = (submission: PricingSubmission) => {
    const avgData = stats?.avgByType[submission.job_type];
    if (!avgData || avgData.count < 3) return null;
    const avg = avgData.total / avgData.count;
    const deviation = Math.abs(submission.actual_price - avg) / avg;
    return deviation > 0.5 ? { avg, deviation } : null;
  };

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];
    if (typeFilter === 'all') return submissions;
    if (typeFilter === 'flagged') {
      return submissions.filter(
        (s) => s.verification_status === 'flagged' || !!isPriceSuspicious(s)
      );
    }
    return submissions.filter((s) => classifyJobType(s.job_type) === typeFilter);
  }, [submissions, typeFilter, stats]);

  const statusTabs = [
    { value: 'pending', label: 'Pending', count: stats?.pending },
    { value: 'approved', label: 'Approved', count: stats?.approved },
    { value: 'rejected', label: 'Rejected', count: stats?.rejected },
    { value: 'all', label: 'All' },
  ];

  const typePills: { value: typeof typeFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'material', label: 'Materials' },
    { value: 'labour', label: 'Labour' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'flagged', label: 'Flagged' },
  ];

  const listTitle = useMemo(() => {
    if (statusFilter === 'pending') return 'Pending Submissions';
    if (statusFilter === 'approved') return 'Approved Submissions';
    if (statusFilter === 'rejected') return 'Rejected Submissions';
    return 'All Submissions';
  }, [statusFilter]);

  const listTone: Tone =
    statusFilter === 'approved'
      ? 'emerald'
      : statusFilter === 'rejected'
        ? 'red'
        : statusFilter === 'all'
          ? 'yellow'
          : 'emerald';

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Moderation"
          title="Pricing"
          description="Review user-submitted prices and labour rates before they enter the RAG index."
          tone="emerald"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Pending',
              value: stats?.pending ?? 0,
              tone: 'orange',
              onClick: () => setStatusFilter('pending'),
            },
            {
              label: 'This Week',
              value: stats?.thisWeek ?? 0,
              tone: 'emerald',
            },
            {
              label: 'Approved',
              value: stats?.approved ?? 0,
              tone: 'emerald',
              onClick: () => setStatusFilter('approved'),
            },
            {
              label: 'Rejected',
              value: stats?.rejected ?? 0,
              tone: 'red',
              onClick: () => setStatusFilter('rejected'),
            },
          ]}
        />

        <FilterBar
          tabs={statusTabs}
          activeTab={statusFilter}
          onTabChange={setStatusFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search job type, postcode, user…"
        />

        <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full overflow-x-auto hide-scrollbar">
          {typePills.map((p) => (
            <button
              key={p.value}
              onClick={() => setTypeFilter(p.value)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation ${
                typeFilter === p.value
                  ? 'bg-elec-yellow text-black'
                  : 'text-white hover:bg-white/[0.04]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingBlocks />
        ) : !filteredSubmissions || filteredSubmissions.length === 0 ? (
          <EmptyState
            title="No pricing submissions pending"
            description={
              statusFilter === 'pending'
                ? 'All caught up — nothing awaiting moderation right now.'
                : 'No submissions match this filter.'
            }
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone={listTone}
              title={listTitle}
              meta={<Pill tone={listTone}>{filteredSubmissions.length}</Pill>}
            />
            <ListBody>
              {filteredSubmissions.map((r) => {
                const suspicious = isPriceSuspicious(r);
                const typeLabel = classifyJobType(r.job_type);
                const statusLabel = r.verification_status || 'pending';
                const tone = statusToTone(r.verification_status);
                const submitter = r.profiles?.full_name || 'Unknown';
                const unit = typeLabel === 'labour' ? '/hr' : r.postcode_district ? `· ${r.postcode_district}` : '';
                return (
                  <ListRow
                    key={r.id}
                    accent={suspicious ? 'orange' : undefined}
                    lead={<Avatar initials={getInitials(submitter)} />}
                    title={
                      <span className="flex items-center gap-2">
                        <span className="truncate">{r.job_description || r.job_type}</span>
                        <span className="text-elec-yellow font-semibold tabular-nums shrink-0">
                          £{Number(r.actual_price).toLocaleString()}
                        </span>
                      </span>
                    }
                    subtitle={`${typeLabel} · £${Number(r.actual_price).toLocaleString()} ${unit} · by ${submitter}`}
                    trailing={
                      <>
                        {suspicious && (
                          <Pill tone="orange">
                            {suspicious.deviation > 1 ? 'Very High' : 'High'}
                          </Pill>
                        )}
                        <Pill tone={tone}>{statusLabel}</Pill>
                      </>
                    }
                    onClick={() => setSelectedSubmission(r)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-left">
                  <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    Review Submission
                  </div>
                  <div className="mt-1.5 text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    {selectedSubmission?.job_type}
                  </div>
                  <div className="mt-2 text-4xl sm:text-5xl font-semibold text-elec-yellow tabular-nums tracking-tight">
                    £{Number(selectedSubmission?.actual_price || 0).toLocaleString()}
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {selectedSubmission &&
                  (() => {
                    const suspicious = isPriceSuspicious(selectedSubmission);
                    const avgData = stats?.avgByType[selectedSubmission.job_type];
                    if (avgData && avgData.count >= 3) {
                      const avg = avgData.total / avgData.count;
                      const diff = selectedSubmission.actual_price - avg;
                      const pct = (diff / avg) * 100;
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                              Price Comparison
                            </div>
                            {suspicious && <Pill tone="orange">Outlier</Pill>}
                          </div>
                          <StatStrip
                            columns={3}
                            stats={[
                              {
                                label: 'Average',
                                value: `£${avg.toFixed(0)}`,
                              },
                              {
                                label: 'Difference',
                                value: `${pct > 0 ? '+' : ''}${pct.toFixed(0)}%`,
                                tone: diff > 0 ? 'red' : 'emerald',
                              },
                              {
                                label: 'Samples',
                                value: avgData.count,
                              },
                            ]}
                          />
                        </div>
                      );
                    }
                    return null;
                  })()}

                <div>
                  <Divider label="Submitter" />
                  <div className="mt-4 rounded-2xl border border-white/[0.06] overflow-hidden">
                    <div className="divide-y divide-white/[0.06]">
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Name</span>
                        <span className="text-[13px] font-medium text-white">
                          {selectedSubmission?.profiles?.full_name || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Username</span>
                        <span className="text-[13px] font-medium text-white">
                          @{selectedSubmission?.profiles?.username || 'unknown'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Role</span>
                        <Pill tone="blue">
                          {selectedSubmission?.profiles?.role || 'unknown'}
                        </Pill>
                      </div>
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Submitted</span>
                        <span className="text-[13px] font-medium text-white">
                          {selectedSubmission?.created_at &&
                            formatDistanceToNow(new Date(selectedSubmission.created_at), {
                              addSuffix: true,
                            })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Divider label="Job Details" />
                  <div className="mt-4 rounded-2xl border border-white/[0.06] overflow-hidden">
                    <div className="divide-y divide-white/[0.06]">
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Job Type</span>
                        <span className="text-[13px] font-medium text-white">
                          {selectedSubmission?.job_type}
                        </span>
                      </div>
                      {selectedSubmission?.postcode_district && (
                        <div className="flex items-center justify-between px-5 py-3.5">
                          <span className="text-[12px] text-white">Postcode</span>
                          <span className="text-[13px] font-medium text-white">
                            {selectedSubmission.postcode_district}
                          </span>
                        </div>
                      )}
                      {selectedSubmission?.completion_date && (
                        <div className="flex items-center justify-between px-5 py-3.5">
                          <span className="text-[12px] text-white">Completed</span>
                          <span className="text-[13px] font-medium text-white">
                            {format(new Date(selectedSubmission.completion_date), 'dd MMM yyyy')}
                          </span>
                        </div>
                      )}
                      {selectedSubmission?.materials_cost != null && (
                        <div className="flex items-center justify-between px-5 py-3.5">
                          <span className="text-[12px] text-white">Materials</span>
                          <span className="text-[13px] font-medium text-white tabular-nums">
                            £{Number(selectedSubmission.materials_cost).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {selectedSubmission?.labour_hours != null && (
                        <div className="flex items-center justify-between px-5 py-3.5">
                          <span className="text-[12px] text-white">Labour Hours</span>
                          <span className="text-[13px] font-medium text-white tabular-nums">
                            {selectedSubmission.labour_hours}h
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-[12px] text-white">Status</span>
                        <Pill tone={statusToTone(selectedSubmission?.verification_status ?? null)}>
                          {selectedSubmission?.verification_status || 'pending'}
                        </Pill>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSubmission?.job_description && (
                  <div>
                    <Divider label="Description" />
                    <p className="mt-4 text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                      {selectedSubmission.job_description}
                    </p>
                  </div>
                )}

                {selectedSubmission?.complexity_notes && (
                  <div>
                    <Divider label="Complexity Notes" />
                    <p className="mt-4 text-[13px] text-white whitespace-pre-wrap leading-relaxed">
                      {selectedSubmission.complexity_notes}
                    </p>
                  </div>
                )}
              </div>

              {(!selectedSubmission?.verification_status ||
                selectedSubmission?.verification_status === 'pending') && (
                <SheetFooter className="p-4 border-t border-white/[0.06]">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <Button
                      className="h-12 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
                      onClick={() =>
                        selectedSubmission && approveMutation.mutate(selectedSubmission.id)
                      }
                      disabled={approveMutation.isPending || flagMutation.isPending}
                    >
                      {approveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      {approveMutation.isPending ? '...' : 'Approve'}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 touch-manipulation border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                      onClick={() =>
                        selectedSubmission && flagMutation.mutate(selectedSubmission.id)
                      }
                      disabled={flagMutation.isPending || approveMutation.isPending}
                    >
                      {flagMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Flag className="h-4 w-4 mr-2" />
                      )}
                      {flagMutation.isPending ? '...' : 'Flag'}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 touch-manipulation border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]"
                      onClick={() => setShowRejectDialog(true)}
                      disabled={approveMutation.isPending || flagMutation.isPending}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog
          open={showRejectDialog}
          onOpenChange={(open) => {
            setShowRejectDialog(open);
            if (!open) {
              setSelectedReasons([]);
              setOtherReason('');
            }
          }}
        >
          <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Reject & Delete</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Select reason(s) for rejection. This will permanently delete the submission.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2 py-2">
              {REJECTION_REASONS.map((reason) => (
                <label
                  key={reason.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] cursor-pointer hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                >
                  <Checkbox
                    checked={selectedReasons.includes(reason.id)}
                    onCheckedChange={(checked) => toggleReason(reason.id, !!checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <span className="text-[13px] text-white">{reason.label}</span>
                </label>
              ))}
            </div>

            {selectedReasons.includes('other') && (
              <Textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Additional notes..."
                className="min-h-[80px] text-sm bg-[hsl(0_0%_10%)] border-white/[0.08] text-white placeholder:text-white"
              />
            )}

            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]"
                disabled={rejectMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
                onClick={() =>
                  selectedSubmission &&
                  rejectMutation.mutate({
                    id: selectedSubmission.id,
                    reasons: selectedReasons,
                    otherText: selectedReasons.includes('other') ? otherReason : undefined,
                  })
                }
                disabled={selectedReasons.length === 0 || rejectMutation.isPending}
              >
                {rejectMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Input } from '@/components/ui/input';
import { RefreshCw, Send, Eye, Loader2, ChevronDown } from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
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
  TextAction,
  Eyebrow,
  Divider,
  Dot,
} from '@/components/admin/editorial';

interface SegmentUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  trial_ended_at: string;
  stripe_customer_id: string | null;
}

interface Segments {
  neverSubscribed: SegmentUser[];
  cancelled: SegmentUser[];
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string;
  created_at: string;
  winback_offer_sent_at: string;
  subscribed: boolean;
  email: string | null;
  email_version: string;
}

interface WinbackStats {
  totalEligible: number;
  offersSent: number;
  conversions: number;
  conversionRate: string;
}

type SegmentKey = 'all' | 'never' | 'cancelled';
type ViewKey = 'target' | 'sent';
const BATCH_SIZE = 40;
const EMAIL_VERSION = 'v10';

function getInitials(name: string | null | undefined, fallback: string | null | undefined) {
  const source = (name || fallback || '').trim();
  if (!source) return '??';
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminWinback() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [activeSegment, setActiveSegment] = useState<SegmentKey>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<SegmentUser | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewKey>('target');
  const [showPreview, setShowPreview] = useState(false);
  const [confirmSegmentSend, setConfirmSegmentSend] = useState<SegmentKey | null>(null);

  const [batchSending, setBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    sent: 0,
    failed: 0,
    total: 0,
    batch: 0,
    totalBatches: 0,
  });

  const {
    data: segments,
    isLoading: segmentsLoading,
    refetch,
  } = useQuery<Segments>({
    queryKey: ['admin-winback-segments'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'get_segments' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as Segments;
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });

  const { data: stats } = useQuery<WinbackStats>({
    queryKey: ['admin-winback-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'get_stats' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as WinbackStats;
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    retry: false,
  });

  const { data: sentUsers, isLoading: sentLoading } = useQuery<SentUser[]>({
    queryKey: ['admin-winback-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'get_sent_history' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as SentUser[];
    },
    staleTime: 30 * 1000,
  });

  const { data: trackingEvents } = useQuery({
    queryKey: ['admin-winback-tracking'],
    queryFn: async () => {
      const { data, error } = await supabase
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .from('email_tracking_events' as any)
        .select('email_id, user_email, event_type, link_url, created_at')
        .order('created_at', { ascending: false })
        .limit(5000);
      if (error) throw error;
      return (data || []) as Array<{
        email_id: string;
        user_email: string | null;
        event_type: string;
        link_url: string | null;
        created_at: string;
      }>;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const trackingByEmail = useMemo(() => {
    const byEmail = new Map<string, Set<string>>();
    if (!trackingEvents) return byEmail;
    trackingEvents.forEach((e) => {
      if (e.user_email) {
        const key = e.user_email.toLowerCase();
        if (!byEmail.has(key)) byEmail.set(key, new Set());
        byEmail.get(key)!.add(e.event_type);
      }
    });
    return byEmail;
  }, [trackingEvents]);

  const performanceStats = useMemo(() => {
    if (!sentUsers) return { opened: 0, clicked: 0 };
    let opened = 0;
    let clicked = 0;
    sentUsers.forEach((u) => {
      if (!u.email) return;
      const events = trackingByEmail.get(u.email.toLowerCase());
      if (events?.has('email.opened')) opened++;
      if (events?.has('email.clicked')) clicked++;
    });
    return { opened, clicked };
  }, [sentUsers, trackingByEmail]);

  const neverSubscribed = useMemo(() => segments?.neverSubscribed || [], [segments]);
  const cancelled = useMemo(() => segments?.cancelled || [], [segments]);
  const totalEligible = neverSubscribed.length + cancelled.length;

  const visibleUsers = useMemo(() => {
    let list: SegmentUser[] = [];
    if (activeSegment === 'never') list = neverSubscribed;
    else if (activeSegment === 'cancelled') list = cancelled;
    else list = [...neverSubscribed, ...cancelled];
    if (!search) return list;
    const s = search.toLowerCase();
    return list.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(s) ||
        u.username?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s)
    );
  }, [neverSubscribed, cancelled, activeSegment, search]);

  const sendSingleMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_single', userId, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'V10 sent', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-segments'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
      setSelectedUser(null);
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_test', testEmail: email, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent — check your inbox', variant: 'success' });
      setTestEmail('');
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Test send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_manual', manualEmail: email, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'V10 sent to that address', variant: 'success' });
      setManualEmail('');
      queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const resetSentMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'reset_sent', userIds },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({
        title: `Reset ${data.resetCount ?? data.reset ?? 0} users — ready to re-send`,
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-segments'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendBatchedEmails = async (userIds: string[]) => {
    if (userIds.length === 0) return;
    const batches: string[][] = [];
    for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
      batches.push(userIds.slice(i, i + BATCH_SIZE));
    }

    setBatchSending(true);
    setBatchProgress({
      sent: 0,
      failed: 0,
      total: userIds.length,
      batch: 0,
      totalBatches: batches.length,
    });

    let totalSent = 0;
    let totalFailed = 0;

    for (let i = 0; i < batches.length; i++) {
      setBatchProgress((prev) => ({ ...prev, batch: i + 1 }));

      try {
        const { data, error } = await supabase.functions.invoke('send-winback-offer', {
          body: {
            action: 'send_bulk',
            userIds: batches[i],
            email_version: EMAIL_VERSION,
          },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        totalFailed += data.failed || 0;
        setBatchProgress((prev) => ({
          ...prev,
          sent: totalSent,
          failed: totalFailed,
        }));
      } catch {
        totalFailed += batches[i].length;
        setBatchProgress((prev) => ({ ...prev, failed: totalFailed }));
      }

      if (i < batches.length - 1) await new Promise((r) => setTimeout(r, 2000));
    }

    haptic.success();
    toast({
      title:
        totalFailed === 0
          ? `Sent ${totalSent} of ${userIds.length} emails`
          : `Sent ${totalSent} of ${userIds.length} (${totalFailed} failed)`,
      variant: totalFailed === 0 ? 'success' : 'warning',
    });
    setBatchSending(false);
    setBatchProgress({ sent: 0, failed: 0, total: 0, batch: 0, totalBatches: 0 });
    setSelectedUsers(new Set());
    queryClient.invalidateQueries({ queryKey: ['admin-winback-segments'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
  };

  const handleSendSegment = (seg: SegmentKey) => {
    let ids: string[] = [];
    if (seg === 'never') ids = neverSubscribed.map((u) => u.id);
    else if (seg === 'cancelled') ids = cancelled.map((u) => u.id);
    else ids = [...neverSubscribed, ...cancelled].map((u) => u.id);
    sendBatchedEmails(ids);
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === visibleUsers.length) setSelectedUsers(new Set());
    else setSelectedUsers(new Set(visibleUsers.map((u) => u.id)));
  };

  const refreshAll = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['admin-winback-tracking'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
  };

  const totalSent = stats?.offersSent || 0;
  const converted = stats?.conversions || 0;
  const openRate = totalSent > 0 ? Math.round((performanceStats.opened / totalSent) * 100) : 0;
  const clickRate = totalSent > 0 ? Math.round((performanceStats.clicked / totalSent) * 100) : 0;
  const convRate = totalSent > 0 ? Math.round((converted / totalSent) * 100) : 0;

  const confirmCount =
    confirmSegmentSend === 'never'
      ? neverSubscribed.length
      : confirmSegmentSend === 'cancelled'
        ? cancelled.length
        : totalEligible;

  const confirmLabel =
    confirmSegmentSend === 'never'
      ? 'never-subscribed'
      : confirmSegmentSend === 'cancelled'
        ? 'cancelled'
        : 'eligible';

  const daysSince = (iso: string | null | undefined) => {
    if (!iso) return 0;
    return Math.max(
      0,
      Math.floor((Date.now() - parseISO(iso).getTime()) / (1000 * 60 * 60 * 24))
    );
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Campaigns"
          title="Win-Back"
          description="Reactivate churned subscribers with targeted offers."
          tone="red"
          actions={
            <IconButton onClick={refreshAll} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        {segmentsLoading && !segments ? (
          <LoadingBlocks />
        ) : (
          <>
            <StatStrip
              columns={4}
              stats={[
                {
                  label: 'Churned',
                  value: totalEligible,
                  tone: 'red',
                  sub: 'Eligible to re-engage',
                },
                {
                  label: 'This Month',
                  value: cancelled.length,
                  tone: 'orange',
                  sub: 'Cancelled subscribers',
                },
                {
                  label: 'Targeted',
                  value: totalSent,
                  tone: 'emerald',
                  sub: `${EMAIL_VERSION.toUpperCase()} campaign`,
                },
                {
                  label: 'Recovered',
                  value: converted,
                  accent: true,
                  sub: totalSent > 0 ? `${convRate}% conversion` : 'No sends yet',
                },
              ]}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <Eyebrow>{EMAIL_VERSION.toUpperCase()} · Win-Back email</Eyebrow>
                <Pill tone="yellow">£9.99/mo</Pill>
              </div>
              <div className="flex items-center gap-2">
                <TextAction onClick={() => setShowPreview(true)}>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    Preview template
                  </span>
                </TextAction>
              </div>
            </div>

            {batchSending && (
              <div className="relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70" />
                <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                      <span className="text-sm font-semibold text-white">
                        Sending batch {batchProgress.batch}/{batchProgress.totalBatches}
                      </span>
                    </div>
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {batchProgress.sent}/{batchProgress.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          batchProgress.total > 0
                            ? (batchProgress.sent / batchProgress.total) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  {batchProgress.failed > 0 && (
                    <div className="flex items-center gap-2">
                      <Dot tone="red" />
                      <span className="text-[12px] text-white">
                        {batchProgress.failed} failed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <FilterBar
              tabs={[
                { value: 'target', label: 'Target', count: totalEligible },
                { value: 'sent', label: 'Sent', count: sentUsers?.length || 0 },
              ]}
              activeTab={activeView}
              onTabChange={(v) => setActiveView(v as ViewKey)}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search name or email..."
            />

            {activeView === 'target' && (
              <>
                <div
                  className="flex gap-1.5 overflow-x-auto -mx-1 px-1"
                  style={{ scrollbarWidth: 'none' }}
                >
                  <SegmentPill
                    active={activeSegment === 'all'}
                    onClick={() => {
                      setActiveSegment('all');
                      setSelectedUsers(new Set());
                    }}
                    label="All"
                    count={totalEligible}
                  />
                  <SegmentPill
                    active={activeSegment === 'never'}
                    onClick={() => {
                      setActiveSegment('never');
                      setSelectedUsers(new Set());
                    }}
                    label="Never subscribed"
                    count={neverSubscribed.length}
                  />
                  <SegmentPill
                    active={activeSegment === 'cancelled'}
                    onClick={() => {
                      setActiveSegment('cancelled');
                      setSelectedUsers(new Set());
                    }}
                    label="Cancelled"
                    count={cancelled.length}
                  />
                </div>

                {(activeSegment === 'all' || activeSegment === 'cancelled') &&
                  cancelled.length > 0 && (
                    <ListCard>
                      <ListCardHeader
                        tone="red"
                        title="Cancelled This Month"
                        meta={<Pill tone="red">{cancelled.length}</Pill>}
                        action={batchSending ? undefined : 'Send offer'}
                        onAction={
                          batchSending
                            ? undefined
                            : () => setConfirmSegmentSend('cancelled')
                        }
                      />
                      <ListBody>
                        {cancelled.slice(0, 50).map((u) => {
                          const days = daysSince(u.trial_ended_at);
                          return (
                            <ListRow
                              key={u.id}
                              lead={
                                <Avatar initials={getInitials(u.full_name, u.username)} />
                              }
                              title={u.full_name || u.username || 'Unknown'}
                              subtitle={`${u.email} · Previously paying`}
                              trailing={
                                <>
                                  <Pill tone="red">{days}d ago</Pill>
                                </>
                              }
                              onClick={() => setSelectedUser(u)}
                            />
                          );
                        })}
                      </ListBody>
                    </ListCard>
                  )}

                {(activeSegment === 'all' || activeSegment === 'never') &&
                  neverSubscribed.length > 0 && (
                    <ListCard>
                      <ListCardHeader
                        tone="orange"
                        title="Never Subscribed"
                        meta={<Pill tone="orange">{neverSubscribed.length}</Pill>}
                        action={batchSending ? undefined : 'Send offer'}
                        onAction={
                          batchSending ? undefined : () => setConfirmSegmentSend('never')
                        }
                      />
                      <ListBody>
                        {neverSubscribed.slice(0, 50).map((u) => {
                          const days = daysSince(u.trial_ended_at);
                          return (
                            <ListRow
                              key={u.id}
                              lead={
                                <Avatar initials={getInitials(u.full_name, u.username)} />
                              }
                              title={u.full_name || u.username || 'Unknown'}
                              subtitle={`${u.email} · Trial lapsed`}
                              trailing={
                                <>
                                  <Pill tone="orange">{days}d ago</Pill>
                                </>
                              }
                              onClick={() => setSelectedUser(u)}
                            />
                          );
                        })}
                      </ListBody>
                    </ListCard>
                  )}

                {search && (
                  <ListCard>
                    <ListCardHeader
                      tone="yellow"
                      title="Search Results"
                      meta={<Pill tone="yellow">{visibleUsers.length}</Pill>}
                    />
                    {visibleUsers.length === 0 ? (
                      <div className="px-5 sm:px-6 py-8">
                        <EmptyState
                          title="No matches"
                          description="No users match your search."
                        />
                      </div>
                    ) : (
                      <ListBody>
                        {visibleUsers.map((u) => {
                          const isCancelled = !!u.stripe_customer_id;
                          const days = daysSince(u.trial_ended_at);
                          return (
                            <ListRow
                              key={u.id}
                              lead={
                                <Avatar initials={getInitials(u.full_name, u.username)} />
                              }
                              title={u.full_name || u.username || 'Unknown'}
                              subtitle={`${u.email} · ${isCancelled ? 'Cancelled' : 'Trial lapsed'}`}
                              trailing={
                                <>
                                  <Pill tone={isCancelled ? 'red' : 'orange'}>
                                    {days}d ago
                                  </Pill>
                                </>
                              }
                              onClick={() => setSelectedUser(u)}
                            />
                          );
                        })}
                      </ListBody>
                    )}
                  </ListCard>
                )}

                {totalEligible > 0 && visibleUsers.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      title="Active Campaigns"
                      meta={
                        selectedUsers.size > 0 ? (
                          <Pill tone="yellow">{selectedUsers.size} selected</Pill>
                        ) : undefined
                      }
                      action={
                        selectedUsers.size > 0 && !batchSending
                          ? `Send to ${selectedUsers.size}`
                          : undefined
                      }
                      onAction={
                        selectedUsers.size > 0 && !batchSending
                          ? () => sendBatchedEmails(Array.from(selectedUsers))
                          : undefined
                      }
                    />
                    <div className="px-5 sm:px-6 py-4 flex items-center justify-between gap-3">
                      <label className="flex items-center gap-3 touch-manipulation">
                        <Checkbox
                          checked={
                            visibleUsers.length > 0 &&
                            selectedUsers.size === visibleUsers.length
                          }
                          onCheckedChange={toggleSelectAll}
                          disabled={batchSending}
                          className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                        />
                        <span className="text-sm text-white">
                          {selectedUsers.size > 0
                            ? `${selectedUsers.size} selected`
                            : 'Select all visible'}
                        </span>
                      </label>
                      {totalEligible > 0 && !batchSending && (
                        <TextAction onClick={() => setConfirmSegmentSend('all')}>
                          Send to all {totalEligible}
                        </TextAction>
                      )}
                    </div>
                    <ListBody>
                      {visibleUsers.slice(0, 100).map((u) => {
                        const isCancelled = !!u.stripe_customer_id;
                        const selected = selectedUsers.has(u.id);
                        return (
                          <div
                            key={u.id}
                            className="group w-full flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4"
                          >
                            <Checkbox
                              checked={selected}
                              onCheckedChange={() => toggleUserSelection(u.id)}
                              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                            />
                            <Avatar initials={getInitials(u.full_name, u.username)} />
                            <button
                              type="button"
                              onClick={() => setSelectedUser(u)}
                              className="flex-1 min-w-0 text-left touch-manipulation"
                            >
                              <div className="text-[14px] font-medium text-white truncate">
                                {u.full_name || u.username || 'Unknown'}
                              </div>
                              <div className="mt-0.5 text-[11.5px] text-white truncate">
                                {u.email}
                              </div>
                            </button>
                            <Pill tone={isCancelled ? 'red' : 'orange'}>
                              {isCancelled ? 'Cancelled' : 'Never'}
                            </Pill>
                          </div>
                        );
                      })}
                    </ListBody>
                  </ListCard>
                )}

                {!segmentsLoading && totalEligible === 0 && (
                  <EmptyState
                    title="Nothing to target"
                    description="No churned subscribers or lapsed trials right now."
                  />
                )}
              </>
            )}

            {activeView === 'sent' && (
              <>
                <Divider label="Campaign Performance" />
                <StatStrip
                  columns={4}
                  stats={[
                    {
                      label: 'Sent',
                      value: totalSent,
                      tone: 'blue',
                    },
                    {
                      label: 'Opened',
                      value: performanceStats.opened,
                      tone: 'emerald',
                      sub: totalSent > 0 ? `${openRate}% open rate` : undefined,
                    },
                    {
                      label: 'Clicked',
                      value: performanceStats.clicked,
                      tone: 'purple',
                      sub: totalSent > 0 ? `${clickRate}% click rate` : undefined,
                    },
                    {
                      label: 'Recovered',
                      value: converted,
                      accent: true,
                      sub: totalSent > 0 ? `${convRate}% conversion` : undefined,
                    },
                  ]}
                />

                {sentLoading ? (
                  <LoadingBlocks />
                ) : !sentUsers || sentUsers.length === 0 ? (
                  <EmptyState
                    title="No emails sent yet"
                    description="Send V10 to a segment to start tracking results here."
                    action="Go to Target"
                    onAction={() => setActiveView('target')}
                  />
                ) : (
                  <ListCard>
                    <ListCardHeader
                      tone="emerald"
                      title="Sent History"
                      meta={<Pill tone="emerald">{sentUsers.length}</Pill>}
                    />
                    <ListBody>
                      {sentUsers.map((u) => {
                        const userEmail = u.email?.toLowerCase();
                        const userEvents = userEmail
                          ? trackingByEmail.get(userEmail)
                          : undefined;
                        const wasOpened = userEvents?.has('email.opened') || false;
                        const wasClicked = userEvents?.has('email.clicked') || false;

                        return (
                          <ListRow
                            key={u.id}
                            lead={
                              <Avatar
                                initials={getInitials(u.full_name, u.username)}
                                online={u.subscribed}
                              />
                            }
                            title={u.full_name || u.username}
                            subtitle={`Sent ${formatDistanceToNow(
                              parseISO(u.winback_offer_sent_at),
                              { addSuffix: true }
                            )} · ${u.email_version?.toUpperCase() || 'V1'}`}
                            trailing={
                              <>
                                {wasOpened && <Pill tone="emerald">Opened</Pill>}
                                {wasClicked && <Pill tone="purple">Clicked</Pill>}
                                {u.subscribed ? (
                                  <Pill tone="emerald">Converted</Pill>
                                ) : (
                                  <Pill tone="blue">Pending</Pill>
                                )}
                              </>
                            }
                          />
                        );
                      })}
                    </ListBody>
                  </ListCard>
                )}
              </>
            )}

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Send Test Email"
                meta={<Pill tone="yellow">[TEST]</Pill>}
              />
              <div className="px-5 sm:px-6 py-4 space-y-3">
                <p className="text-[12.5px] text-white">
                  Preview V10 end-to-end. Subject prefixed [TEST]. Nobody marked sent.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 text-base touch-manipulation flex-1 bg-[hsl(0_0%_10%)] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow text-white placeholder:text-white"
                  />
                  <Button
                    onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                    disabled={!testEmail || sendTestMutation.isPending}
                    className="h-11 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold gap-1.5"
                  >
                    {sendTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Test
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </ListCard>

            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="w-full h-11 px-5 flex items-center justify-between bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  <span className="text-[13px] font-semibold text-white">Advanced</span>
                  <ChevronDown
                    className={`h-4 w-4 text-white transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[13px] font-semibold text-white">
                        Send real V10 to a specific address
                      </div>
                      <p className="mt-1 text-[11.5px] text-white leading-relaxed">
                        Full send — goes through suppression check, logged, counts as sent.
                        For testing, use the Test box above.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        value={manualEmail}
                        onChange={(e) => setManualEmail(e.target.value)}
                        placeholder="recipient@example.com"
                        className="h-11 text-base touch-manipulation flex-1 bg-[hsl(0_0%_10%)] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow text-white placeholder:text-white"
                      />
                      <Button
                        onClick={() =>
                          manualEmail && sendManualMutation.mutate(manualEmail)
                        }
                        disabled={!manualEmail || sendManualMutation.isPending}
                        className="h-11 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                      >
                        {sendManualMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {(sentUsers?.length || 0) > 0 && (
                    <div className="pt-4 border-t border-white/[0.06]">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const allSentIds = sentUsers?.map((u) => u.id) || [];
                          if (
                            confirm(
                              `Reset all ${allSentIds.length} sent users so they can be re-sent?`
                            )
                          ) {
                            resetSentMutation.mutate(allSentIds);
                          }
                        }}
                        disabled={resetSentMutation.isPending}
                        className="w-full h-11 touch-manipulation gap-2 bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04] hover:text-white"
                      >
                        {resetSentMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        Reset all sent users
                      </Button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent
            side="bottom"
            className="h-[70vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle asChild>
                  <div className="flex items-center gap-3 text-left">
                    <Avatar
                      initials={getInitials(
                        selectedUser?.full_name,
                        selectedUser?.username
                      )}
                    />
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold text-white truncate">
                        {selectedUser?.full_name || 'Unknown'}
                      </div>
                      <div className="text-[12px] text-white truncate">
                        {selectedUser?.email}
                      </div>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    {selectedUser?.stripe_customer_id ? (
                      <Pill tone="red">Cancelled</Pill>
                    ) : (
                      <Pill tone="orange">Never subscribed</Pill>
                    )}
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <span className="text-[12.5px] text-white">Signed up</span>
                    <span className="text-[13px] font-semibold text-white tabular-nums">
                      {selectedUser?.created_at &&
                        format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12.5px] text-white">Trial ended</span>
                    <span className="text-[13px] font-semibold text-white tabular-nums">
                      {selectedUser?.trial_ended_at &&
                        format(parseISO(selectedUser.trial_ended_at), 'dd MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12.5px] text-white">Days lapsed</span>
                    <Pill tone="red">
                      {selectedUser?.trial_ended_at
                        ? `${daysSince(selectedUser.trial_ended_at)} days`
                        : '—'}
                    </Pill>
                  </div>
                </div>

                <Button
                  className="w-full h-12 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold gap-2"
                  onClick={() => selectedUser && sendSingleMutation.mutate(selectedUser.id)}
                  disabled={sendSingleMutation.isPending}
                >
                  {sendSingleMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send V10 to this user
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog
          open={!!confirmSegmentSend}
          onOpenChange={(open) => !open && setConfirmSegmentSend(null)}
        >
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6 bg-[hsl(0_0%_10%)] border-white/[0.06]">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight text-white">
                Send V10 to {confirmCount} {confirmLabel} electricians?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2 text-white">
                  <p>
                    Sends in batches of {BATCH_SIZE} via Resend with a 2s gap between
                    batches.
                  </p>
                  <p className="text-[12px]">
                    Each recipient gets marked as sent and won&apos;t reappear in this
                    segment unless reset.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0 bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04] hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const seg = confirmSegmentSend;
                  setConfirmSegmentSend(null);
                  if (seg) handleSendSegment(seg);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold w-full sm:w-auto gap-2"
              >
                <Send className="h-4 w-4" />
                Send {confirmCount}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-3 border-b border-white/[0.06]">
                <SheetTitle asChild>
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-[13px] font-semibold text-white">
                      V10 Preview
                    </span>
                    <Pill tone="yellow">V10</Pill>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-black">
                <iframe
                  title="V10 email preview"
                  sandbox="allow-same-origin"
                  className="w-full h-full border-0"
                  srcDoc={`<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#e2e8f0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin:12px 0 8px;font-size:28px;letter-spacing:-0.5px}p{color:#a1a1aa;font-size:14px;line-height:1.6;max-width:320px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}.price{font-size:36px;color:#fff;font-weight:700;margin-top:18px;letter-spacing:-1px}.mut{color:#52525b;font-size:12px;margin-top:8px}</style></head><body><div class="badge">V10 · Win-Back</div><h2>We've been building.</h2><p>Hero card + I&amp;T redesign, Quotes &amp; Invoices, Room Planner, Stock Tracker, founder note.</p><div class="price">£9.99<span style="font-size:14px;color:#a1a1aa;font-weight:400">/mo</span></div><p class="mut">Send a test email (Advanced) to preview the full rendered template.</p></body></html>`}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}

function SegmentPill({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 h-9 px-3.5 rounded-full text-[12.5px] font-medium touch-manipulation transition-colors whitespace-nowrap ${
        active
          ? 'bg-elec-yellow text-black'
          : 'bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white hover:bg-white/[0.04]'
      }`}
    >
      {label}
      <span
        className={`ml-1.5 tabular-nums text-[11px] ${active ? 'text-black/60' : 'text-white'}`}
      >
        {count}
      </span>
    </button>
  );
}

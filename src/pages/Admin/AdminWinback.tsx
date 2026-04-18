import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Skeleton } from '@/components/ui/skeleton';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RotateCcw,
  Send,
  Users,
  Mail,
  ChevronRight,
  ChevronDown,
  Loader2,
  Clock,
  Eye,
  User,
  Target,
  CheckCheck,
  TestTube,
  MousePointerClick,
  MailOpen,
  FileText,
  Flame,
  HeartCrack,
  Settings,
  MailCheck,
  Sparkles,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

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
const BATCH_SIZE = 40;
const EMAIL_VERSION = 'v10';

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
  const [activeTab, setActiveTab] = useState<'target' | 'sent'>('target');
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
    isFetching,
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

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-24">
        <AdminPageHeader
          title="Win-Back Campaign"
          subtitle="V10 — We've been building. You should see it."
          icon={RotateCcw}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10 border-amber-500/20"
          accentColor="from-amber-500 via-yellow-400 to-amber-500"
          onRefresh={() => {
            refetch();
            queryClient.invalidateQueries({ queryKey: ['admin-winback-tracking'] });
            queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
            queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
          }}
          isRefreshing={isFetching}
        />

        {/* Campaign hero */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 overflow-hidden">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Badge className="bg-amber-500 text-black text-[10px] px-2 border-0 shrink-0 font-bold">
                  V10
                </Badge>
                <p className="text-sm font-semibold text-white truncate">
                  We&apos;ve been building.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(true)}
                className="h-9 gap-1.5 text-amber-400 hover:text-amber-300 shrink-0 touch-manipulation"
              >
                <Eye className="h-3.5 w-3.5" />
                Preview
              </Button>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/5">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <p className="text-[11px] text-white/80 leading-relaxed">
                Electricians only · £9.99/mo via Stripe · saves £5 vs App Store
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test send — always visible, check before bulk */}
        <Card className="border-yellow-500/20 bg-yellow-500/[0.03]">
          <CardContent className="pt-4 pb-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-yellow-500/15 flex items-center justify-center">
                <TestTube className="h-3.5 w-3.5 text-yellow-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">
                  Send yourself a test
                </p>
                <p className="text-[11px] text-white/60 leading-tight mt-0.5">
                  Preview V10 end-to-end. Subject prefixed [TEST]. Nobody marked sent.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your@email.com or any address"
                className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <Button
                onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                disabled={!testEmail || sendTestMutation.isPending}
                className="h-11 px-4 touch-manipulation bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-1.5"
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
          </CardContent>
        </Card>

        {/* Performance strip */}
        <div className="grid grid-cols-4 gap-2">
          <StatTile
            label="Sent"
            value={totalSent}
            sub={null}
            colorClass="text-blue-400 bg-blue-500/10 border-blue-500/20"
          />
          <StatTile
            label="Opened"
            value={performanceStats.opened}
            sub={totalSent > 0 ? `${openRate}%` : null}
            colorClass="text-green-400 bg-green-500/10 border-green-500/20"
          />
          <StatTile
            label="Clicked"
            value={performanceStats.clicked}
            sub={totalSent > 0 ? `${clickRate}%` : null}
            colorClass="text-violet-400 bg-violet-500/10 border-violet-500/20"
          />
          <StatTile
            label="Converted"
            value={converted}
            sub={totalSent > 0 ? `${convRate}%` : null}
            colorClass="text-amber-400 bg-amber-500/10 border-amber-500/20"
          />
        </div>

        {/* Segment tiles */}
        <div className="grid grid-cols-2 gap-3">
          <SegmentTile
            title="Never subscribed"
            subtitle="Trial expired, never paid"
            count={neverSubscribed.length}
            loading={segmentsLoading}
            active={activeSegment === 'never'}
            onFocus={() => {
              setActiveSegment('never');
              setActiveTab('target');
              setSelectedUsers(new Set());
            }}
            onSend={() => setConfirmSegmentSend('never')}
            icon={Flame}
            colorClass="from-rose-500/10 to-orange-500/5 border-rose-500/30"
            iconBgClass="bg-rose-500/15 text-rose-400"
            disabledSend={batchSending || neverSubscribed.length === 0}
          />
          <SegmentTile
            title="Cancelled"
            subtitle="Subscribed, then cancelled"
            count={cancelled.length}
            loading={segmentsLoading}
            active={activeSegment === 'cancelled'}
            onFocus={() => {
              setActiveSegment('cancelled');
              setActiveTab('target');
              setSelectedUsers(new Set());
            }}
            onSend={() => setConfirmSegmentSend('cancelled')}
            icon={HeartCrack}
            colorClass="from-violet-500/10 to-fuchsia-500/5 border-violet-500/30"
            iconBgClass="bg-violet-500/15 text-violet-400"
            disabledSend={batchSending || cancelled.length === 0}
          />
        </div>

        {/* Combined send */}
        {totalEligible > 0 && !batchSending && (
          <Button
            onClick={() => setConfirmSegmentSend('all')}
            className="w-full h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-2"
          >
            <Send className="h-4 w-4" />
            Send V10 to all {totalEligible} eligible electricians
          </Button>
        )}

        {/* Batch progress */}
        {batchSending && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="pt-4 pb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-amber-400 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending batch {batchProgress.batch}/{batchProgress.totalBatches}
                </span>
                <span className="text-white">
                  {batchProgress.sent}/{batchProgress.total}
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      batchProgress.total > 0 ? (batchProgress.sent / batchProgress.total) * 100 : 0
                    }%`,
                  }}
                />
              </div>
              {batchProgress.failed > 0 && (
                <p className="text-xs text-red-400">{batchProgress.failed} failed</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border">
          <Button
            variant={activeTab === 'target' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('target')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'target' ? 'bg-amber-500 text-black hover:bg-amber-600' : ''}`}
          >
            <Target className="h-3.5 w-3.5" />
            Target ({totalEligible})
          </Button>
          <Button
            variant={activeTab === 'sent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('sent')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'sent' ? 'bg-blue-500 text-black hover:bg-blue-600' : ''}`}
          >
            <Mail className="h-3.5 w-3.5" />
            Sent ({sentUsers?.length || 0})
          </Button>
        </div>

        {/* Target tab */}
        {activeTab === 'target' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4 space-y-3">
              {/* Segment pills */}
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
                  colorClass="bg-amber-500 text-black"
                />
                <SegmentPill
                  active={activeSegment === 'never'}
                  onClick={() => {
                    setActiveSegment('never');
                    setSelectedUsers(new Set());
                  }}
                  label="Never"
                  count={neverSubscribed.length}
                  colorClass="bg-rose-500/90 text-white"
                />
                <SegmentPill
                  active={activeSegment === 'cancelled'}
                  onClick={() => {
                    setActiveSegment('cancelled');
                    setSelectedUsers(new Set());
                  }}
                  label="Cancelled"
                  count={cancelled.length}
                  colorClass="bg-violet-500/90 text-white"
                />
              </div>

              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search name or email..."
              />

              {visibleUsers.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={
                        visibleUsers.length > 0 && selectedUsers.size === visibleUsers.length
                      }
                      onCheckedChange={toggleSelectAll}
                      disabled={batchSending}
                      className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <span className="text-sm text-white">
                      {selectedUsers.size > 0
                        ? `${selectedUsers.size} selected`
                        : 'Select all visible'}
                    </span>
                  </div>
                  {selectedUsers.size > 0 && !batchSending && (
                    <Button
                      size="sm"
                      onClick={() => sendBatchedEmails(Array.from(selectedUsers))}
                      className="gap-2 h-11 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                    >
                      <Send className="h-4 w-4" />
                      Send to {selectedUsers.size}
                    </Button>
                  )}
                </div>
              )}

              {/* List */}
              {segmentsLoading ? (
                <div className="space-y-2 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center gap-3"
                    >
                      <Skeleton className="w-9 h-9 rounded-lg" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : visibleUsers.length === 0 ? (
                <AdminEmptyState
                  icon={Users}
                  title={search ? 'No matches' : 'Segment is empty'}
                  description={
                    search
                      ? 'No users match your search.'
                      : 'Nothing to send in this segment right now.'
                  }
                />
              ) : (
                <div className="space-y-1.5">
                  {visibleUsers.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      selected={selectedUsers.has(user.id)}
                      onToggle={() => toggleUserSelection(user.id)}
                      onOpen={() => setSelectedUser(user)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Sent tab */}
        {activeTab === 'sent' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4">
              {sentLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : !sentUsers || sentUsers.length === 0 ? (
                <AdminEmptyState
                  icon={Mail}
                  title="No emails sent yet"
                  description="Send V10 to a segment above to see results here."
                />
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-white">{sentUsers.length} sent</p>
                  <div className="space-y-1.5">
                    {sentUsers.map((user) => {
                      const userEmail = user.email?.toLowerCase();
                      const userEvents = userEmail ? trackingByEmail.get(userEmail) : undefined;
                      const wasDelivered = userEvents?.has('email.delivered') || false;
                      const wasOpened = userEvents?.has('email.opened') || false;
                      const wasClicked = userEvents?.has('email.clicked') || false;

                      const versionColours: Record<string, string> = {
                        v1: 'bg-gray-500/20 text-gray-400',
                        v2: 'bg-green-500/20 text-green-400',
                        v3: 'bg-emerald-500/20 text-emerald-400',
                        v4: 'bg-amber-500/20 text-amber-400',
                        v4b: 'bg-purple-500/20 text-purple-400',
                        v5: 'bg-red-500/20 text-red-400',
                        v6: 'bg-indigo-500/20 text-indigo-400',
                        v7: 'bg-green-500/20 text-green-400',
                        v8: 'bg-amber-500/20 text-amber-400',
                        v9: 'bg-amber-500/20 text-amber-400',
                        v10: 'bg-emerald-500/20 text-emerald-400',
                      };
                      const vClass = versionColours[user.email_version] || versionColours.v1;

                      return (
                        <div
                          key={user.id}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50"
                        >
                          <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                            <User className="h-4 w-4 text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-white truncate">
                              {user.full_name || user.username}
                            </p>
                            <p className="text-xs text-white">
                              Sent{' '}
                              {formatDistanceToNow(parseISO(user.winback_offer_sent_at), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
                            <Badge className={`text-[9px] px-1.5 border-0 ${vClass}`}>
                              {user.email_version?.toUpperCase() || 'V1'}
                            </Badge>
                            {wasDelivered && (
                              <Badge className="bg-blue-500/20 text-blue-400 text-[9px] px-1 border-0">
                                <MailCheck className="h-2.5 w-2.5" />
                              </Badge>
                            )}
                            {wasOpened && (
                              <Badge className="bg-green-500/20 text-green-400 text-[9px] px-1 border-0">
                                <MailOpen className="h-2.5 w-2.5" />
                              </Badge>
                            )}
                            {wasClicked && (
                              <Badge className="bg-violet-500/20 text-violet-400 text-[9px] px-1 border-0">
                                <MousePointerClick className="h-2.5 w-2.5" />
                              </Badge>
                            )}
                            {user.subscribed ? (
                              <Badge className="bg-green-500/20 text-green-400 text-[10px] px-1.5 border-0">
                                <CheckCheck className="h-3 w-3 mr-0.5" />
                                Converted
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-500/20 text-gray-400 text-[10px] px-1.5 border-0">
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Advanced */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-11 justify-between touch-manipulation border-white/10"
            >
              <span className="flex items-center gap-2 text-sm text-white">
                <Settings className="h-4 w-4" />
                Advanced
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2">
              <CardContent className="pt-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-white/80">
                    Send real V10 to a specific address
                  </p>
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    Full send — goes through suppression check, logged, counts as sent. For testing,
                    use the Test box at the top.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="recipient@example.com"
                      className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                    <Button
                      onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                      disabled={!manualEmail || sendManualMutation.isPending}
                      className="h-11 px-4 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
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
                  <div className="pt-2 border-t border-white/5">
                    <Button
                      variant="outline"
                      size="sm"
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
                      className="w-full h-11 text-xs touch-manipulation gap-1.5"
                    >
                      {resetSentMutation.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <RotateCcw className="h-3.5 w-3.5" />
                      )}
                      Reset all sent users (allows re-sending)
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* User Detail Sheet */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p>{selectedUser?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-white">{selectedUser?.email}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardContent className="pt-4 pb-4 space-y-3">
                    <div className="flex items-center gap-2">
                      {selectedUser?.stripe_customer_id ? (
                        <Badge className="bg-violet-500/20 text-violet-400 border-0 gap-1">
                          <HeartCrack className="h-3 w-3" /> Cancelled
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-500/20 text-rose-400 border-0 gap-1">
                          <Flame className="h-3 w-3" /> Never subscribed
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Signed up</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Trial ended</span>
                      <span className="text-sm">
                        {selectedUser?.trial_ended_at &&
                          format(parseISO(selectedUser.trial_ended_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Days lapsed</span>
                      <Badge variant="outline" className="text-red-400">
                        {selectedUser?.trial_ended_at &&
                          Math.floor(
                            (Date.now() - parseISO(selectedUser.trial_ended_at).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                        days
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  className="w-full h-12 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                  onClick={() => selectedUser && sendSingleMutation.mutate(selectedUser.id)}
                  disabled={sendSingleMutation.isPending}
                >
                  {sendSingleMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send V10 to this user
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm segment send */}
        <AlertDialog
          open={!!confirmSegmentSend}
          onOpenChange={(open) => !open && setConfirmSegmentSend(null)}
        >
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send V10 to {confirmCount} {confirmLabel} electricians?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Sends in batches of {BATCH_SIZE} via Resend with a 2s gap between batches.
                  </p>
                  <p className="text-white/70 text-xs">
                    Each recipient gets marked as sent and won&apos;t reappear in this segment
                    unless reset.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const seg = confirmSegmentSend;
                  setConfirmSegmentSend(null);
                  if (seg) handleSendSegment(seg);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Send {confirmCount}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Preview */}
        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-3 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-amber-400" />
                  V10 Preview
                  <Badge className="bg-amber-500/20 text-amber-400 text-[10px] border-0">V10</Badge>
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
      </div>
    </PullToRefresh>
  );
}

function StatTile({
  label,
  value,
  sub,
  colorClass,
}: {
  label: string;
  value: number;
  sub: string | null;
  colorClass: string;
}) {
  return (
    <div className={`p-2.5 rounded-xl border text-center ${colorClass}`}>
      <p className="text-lg font-bold leading-tight">{value}</p>
      <p className="text-[10px] text-white mt-0.5">{label}</p>
      {sub && <p className="text-[9px] opacity-70 mt-0.5">{sub}</p>}
    </div>
  );
}

function SegmentTile({
  title,
  subtitle,
  count,
  loading,
  active,
  onFocus,
  onSend,
  icon: Icon,
  colorClass,
  iconBgClass,
  disabledSend,
}: {
  title: string;
  subtitle: string;
  count: number;
  loading: boolean;
  active: boolean;
  onFocus: () => void;
  onSend: () => void;
  icon: typeof Flame;
  colorClass: string;
  iconBgClass: string;
  disabledSend: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${colorClass} p-3 space-y-3 transition-all ${active ? 'ring-1 ring-amber-400/60' : ''}`}
    >
      <button
        type="button"
        onClick={onFocus}
        className="w-full text-left space-y-2 touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgClass}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-white leading-tight truncate">{title}</p>
            <p className="text-[10px] text-white/60 truncate">{subtitle}</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-white leading-none">
          {loading ? <Skeleton className="h-7 w-12" /> : count}
        </div>
      </button>
      <Button
        size="sm"
        disabled={disabledSend}
        onClick={onSend}
        className="w-full h-10 touch-manipulation text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10 gap-1.5"
      >
        <Send className="h-3.5 w-3.5" />
        Send V10
      </Button>
    </div>
  );
}

function SegmentPill({
  active,
  onClick,
  label,
  count,
  colorClass,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  colorClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 h-9 px-3 rounded-full text-xs font-semibold touch-manipulation transition-all ${active ? colorClass : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
    >
      {label} · {count}
    </button>
  );
}

function UserRow({
  user,
  selected,
  onToggle,
  onOpen,
}: {
  user: SegmentUser;
  selected: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  const isCancelled = !!user.stripe_customer_id;
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform">
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
      />
      <button type="button" onClick={onOpen} className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5">
          {isCancelled ? (
            <HeartCrack className="h-3 w-3 text-violet-400 shrink-0" />
          ) : (
            <Flame className="h-3 w-3 text-rose-400 shrink-0" />
          )}
          <p className="font-medium text-sm text-white truncate">{user.full_name || 'Unknown'}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="truncate max-w-[140px]">{user.email}</span>
          <span className="shrink-0">·</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(parseISO(user.trial_ended_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </button>
      <Button variant="ghost" size="sm" onClick={onOpen} className="h-11 px-2 touch-manipulation">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

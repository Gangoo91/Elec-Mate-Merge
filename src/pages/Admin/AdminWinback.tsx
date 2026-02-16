import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RefreshCw,
  Send,
  Users,
  CheckCircle,
  Mail,
  Calendar,
  TrendingUp,
  ChevronRight,
  Loader2,
  Clock,
  Zap,
  Gift,
  PoundSterling,
  Eye,
  User,
  Target,
  CheckCheck,
  TestTube,
  MousePointerClick,
  MailOpen,
  Ban,
  ExternalLink,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { useHaptic } from '@/hooks/useHaptic';

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  trial_ended_at: string;
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string;
  created_at: string;
  winback_offer_sent_at: string;
  subscribed: boolean;
}

interface WinbackStats {
  totalEligible: number;
  offersSent: number;
  conversions: number;
  conversionRate: string;
}

export default function AdminWinback() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [showSentHistory, setShowSentHistory] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'eligible' | 'sent'>('eligible');

  // Auto-batch state
  const [batchSending, setBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    sent: 0,
    failed: 0,
    total: 0,
    batch: 0,
    totalBatches: 0,
  });
  const [confirmResend, setConfirmResend] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [emailVersion, setEmailVersion] = useState<'v1' | 'v2'>('v2');

  // Fetch campaign stats
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery<WinbackStats>({
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

  // Fetch eligible users
  const {
    data: eligibleUsers,
    isLoading: usersLoading,
    refetch,
  } = useQuery<EligibleUser[]>({
    queryKey: ['admin-winback-eligible'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'get_eligible' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as EligibleUser[];
    },
    staleTime: 30 * 1000,
  });

  // Fetch sent history
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

  // Fetch email tracking events
  const { data: trackingEvents } = useQuery({
    queryKey: ['admin-winback-tracking'],
    queryFn: async () => {
      const { data, error } = await supabase
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

  // Compute tracking stats
  const trackingStats = useMemo(() => {
    const empty = {
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      complained: 0,
      openRate: '0',
      clickRate: '0',
      bounceRate: '0',
      topLinks: [] as Array<{ url: string; count: number }>,
      byEmail: new Map<string, Set<string>>(),
    };
    if (!trackingEvents || trackingEvents.length === 0) return empty;

    const delivered = new Set(
      trackingEvents.filter((e) => e.event_type === 'email.delivered').map((e) => e.email_id)
    ).size;
    const opened = new Set(
      trackingEvents.filter((e) => e.event_type === 'email.opened').map((e) => e.email_id)
    ).size;
    const clicked = new Set(
      trackingEvents.filter((e) => e.event_type === 'email.clicked').map((e) => e.email_id)
    ).size;
    const bounced = new Set(
      trackingEvents.filter((e) => e.event_type === 'email.bounced').map((e) => e.email_id)
    ).size;
    const complained = new Set(
      trackingEvents.filter((e) => e.event_type === 'email.complained').map((e) => e.email_id)
    ).size;

    // Per-email tracking status
    const byEmail = new Map<string, Set<string>>();
    trackingEvents.forEach((e) => {
      if (e.user_email) {
        const key = e.user_email.toLowerCase();
        if (!byEmail.has(key)) byEmail.set(key, new Set());
        byEmail.get(key)!.add(e.event_type);
      }
    });

    // Top clicked links
    const linkCounts = new Map<string, number>();
    trackingEvents
      .filter((e) => e.event_type === 'email.clicked' && e.link_url)
      .forEach((e) => {
        const url = e.link_url!;
        linkCounts.set(url, (linkCounts.get(url) || 0) + 1);
      });
    const topLinks = Array.from(linkCounts.entries())
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const base = delivered || 1;
    return {
      delivered,
      opened,
      clicked,
      bounced,
      complained,
      openRate: ((opened / base) * 100).toFixed(1),
      clickRate: ((clicked / base) * 100).toFixed(1),
      bounceRate: ((bounced / base) * 100).toFixed(1),
      topLinks,
      byEmail,
    };
  }, [trackingEvents]);

  // Send single email mutation
  const sendSingleMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_single', userId, email_version: emailVersion },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Win-back offer sent successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-winback-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
      setSelectedUser(null);
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        next.delete(selectedUser?.id || '');
        return next;
      });
    },
    onError: (error) => {
      haptic.error();
      toast.error(`Failed to send: ${error.message}`);
    },
  });

  // Auto-batched bulk send
  const BATCH_SIZE = 40;

  const sendBatchedEmails = async (userIds: string[]) => {
    const batches: string[][] = [];
    for (let i = 0; i < userIds.length; i += BATCH_SIZE) {
      batches.push(userIds.slice(i, i + BATCH_SIZE));
    }

    setBatchSending(true);
    setBatchProgress({ sent: 0, failed: 0, total: userIds.length, batch: 0, totalBatches: batches.length });

    let totalSent = 0;
    let totalFailed = 0;

    for (let i = 0; i < batches.length; i++) {
      setBatchProgress((prev) => ({ ...prev, batch: i + 1 }));

      try {
        const { data, error } = await supabase.functions.invoke('send-winback-offer', {
          body: { action: 'send_bulk', userIds: batches[i], email_version: emailVersion },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        totalFailed += data.failed || 0;
        setBatchProgress((prev) => ({ ...prev, sent: totalSent, failed: totalFailed }));
        toast.success(`Batch ${i + 1}/${batches.length} done — ${data.sent} sent`);
      } catch (err: any) {
        totalFailed += batches[i].length;
        setBatchProgress((prev) => ({ ...prev, failed: totalFailed }));
        toast.error(`Batch ${i + 1} failed: ${err.message}`);
      }

      if (i < batches.length - 1) await new Promise((r) => setTimeout(r, 2000));
    }

    haptic.success();
    toast.success(`All done! ${totalSent} sent, ${totalFailed} failed out of ${userIds.length}`);
    setBatchSending(false);
    setBatchProgress({ sent: 0, failed: 0, total: 0, batch: 0, totalBatches: 0 });
    setSelectedUsers(new Set());
    setConfirmSendAll(false);
    queryClient.invalidateQueries({ queryKey: ['admin-winback-eligible'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
  };

  // Send test email mutation
  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_test', testEmail: email, email_version: emailVersion },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Test email sent! Check your inbox.');
      setTestEmail('');
      setShowTestEmail(false);
    },
    onError: (error) => {
      haptic.error();
      toast.error(`Failed to send test email: ${error.message}`);
    },
  });

  // Send manual email mutation
  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_manual', manualEmail: email, email_version: emailVersion },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast.success('Win-back offer sent!');
      setManualEmail('');
      queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
    },
    onError: (error) => {
      haptic.error();
      toast.error(`Failed to send: ${error.message}`);
    },
  });

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!eligibleUsers) return [];
    if (!search) return eligibleUsers;
    const searchLower = search.toLowerCase();
    return eligibleUsers.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(searchLower) ||
        u.username?.toLowerCase().includes(searchLower) ||
        u.email?.toLowerCase().includes(searchLower)
    );
  }, [eligibleUsers, search]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) setSelectedUsers(new Set());
    else setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
  };

  const handleSendSelected = () => {
    if (selectedUsers.size === 0) return;
    sendBatchedEmails(Array.from(selectedUsers));
  };

  // Funnel bar helper
  const FunnelBar = ({ label, value, max, colour, icon: Icon }: { label: string; value: number; max: number; colour: string; icon: any }) => {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 w-24 shrink-0">
          <Icon className={`h-3.5 w-3.5 ${colour}`} />
          <span className="text-xs text-white font-medium">{label}</span>
        </div>
        <div className="flex-1 h-5 bg-muted/50 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(pct, 2)}%`, background: `var(--bar-${label.toLowerCase()})` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
            {value} ({pct.toFixed(1)}%)
          </span>
        </div>
      </div>
    );
  };

  const totalSent = stats?.offersSent || 0;

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <div
        className="space-y-4 pb-20"
        style={{
          '--bar-delivered': '#3b82f6',
          '--bar-opened': '#22c55e',
          '--bar-clicked': '#fbbf24',
          '--bar-bounced': '#ef4444',
        } as React.CSSProperties}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-400" />
              Win-Back Campaign
            </h2>
            <p className="text-sm text-white">
              Send discounted offers to expired trial electricians
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetch();
              queryClient.invalidateQueries({ queryKey: ['admin-winback-tracking'] });
              queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
              queryClient.invalidateQueries({ queryKey: ['admin-winback-sent'] });
            }}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Hero Stats — 6 cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { label: 'Eligible', value: stats?.totalEligible || 0, icon: Users, colour: 'text-amber-400', bg: 'from-amber-500/10 to-orange-500/5', border: 'border-amber-500/20' },
            { label: 'Sent', value: totalSent, icon: Mail, colour: 'text-blue-400', bg: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/20' },
            { label: 'Delivered', value: trackingStats.delivered, icon: CheckCircle, colour: 'text-sky-400', bg: 'from-sky-500/10 to-blue-500/5', border: 'border-sky-500/20' },
            { label: 'Opened', value: trackingStats.opened, icon: MailOpen, colour: 'text-green-400', bg: 'from-green-500/10 to-emerald-500/5', border: 'border-green-500/20' },
            { label: 'Clicked', value: trackingStats.clicked, icon: MousePointerClick, colour: 'text-yellow-400', bg: 'from-yellow-500/10 to-amber-500/5', border: 'border-yellow-500/20' },
            { label: 'Converted', value: stats?.conversions || 0, icon: TrendingUp, colour: 'text-emerald-400', bg: 'from-emerald-500/10 to-green-500/5', border: 'border-emerald-500/20' },
          ].map((s) => (
            <Card key={s.label} className={`bg-gradient-to-br ${s.bg} ${s.border}`}>
              <CardContent className="p-2.5 sm:p-3 text-center">
                <s.icon className={`h-4 w-4 ${s.colour} mx-auto mb-1`} />
                <p className="text-lg sm:text-xl font-bold">{statsLoading ? '...' : s.value.toLocaleString()}</p>
                <p className="text-[10px] sm:text-xs text-white">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Engagement Funnel */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-400" />
                Engagement Funnel
              </span>
              <a
                href="https://resend.com/emails"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 touch-manipulation"
              >
                Resend Dashboard <ExternalLink className="h-3 w-3" />
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Rates row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-base sm:text-lg font-bold text-green-400">{trackingStats.openRate}%</p>
                <p className="text-[10px] text-white">Open Rate</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-base sm:text-lg font-bold text-amber-400">{trackingStats.clickRate}%</p>
                <p className="text-[10px] text-white">Click Rate</p>
              </div>
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-base sm:text-lg font-bold text-red-400">{trackingStats.bounceRate}%</p>
                <p className="text-[10px] text-white">Bounce Rate</p>
              </div>
            </div>

            {/* Funnel bars */}
            <div className="space-y-2">
              <FunnelBar label="Delivered" value={trackingStats.delivered} max={totalSent || trackingStats.delivered} colour="text-blue-400" icon={CheckCircle} />
              <FunnelBar label="Opened" value={trackingStats.opened} max={trackingStats.delivered || 1} colour="text-green-400" icon={MailOpen} />
              <FunnelBar label="Clicked" value={trackingStats.clicked} max={trackingStats.delivered || 1} colour="text-amber-400" icon={MousePointerClick} />
              <FunnelBar label="Bounced" value={trackingStats.bounced} max={trackingStats.delivered || 1} colour="text-red-400" icon={Ban} />
            </div>

            {/* Top clicked links */}
            {trackingStats.topLinks.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-border/50">
                <p className="text-xs text-white font-semibold">Top Clicked Links</p>
                {trackingStats.topLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                    <ExternalLink className="h-3 w-3 text-white shrink-0" />
                    <span className="truncate flex-1 text-xs text-white">
                      {link.url.replace('https://', '').slice(0, 50)}
                    </span>
                    <Badge variant="outline" className="text-xs shrink-0">{link.count} clicks</Badge>
                  </div>
                ))}
              </div>
            )}

            {(trackingEvents?.length ?? 0) === 0 && (
              <p className="text-xs text-white text-center py-2">
                No tracking data yet. Events will appear here after emails are sent and recipients interact with them.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Campaign Controls */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4 text-amber-400" />
                Campaign Controls
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTestEmail(!showTestEmail)}
                className="gap-1.5 h-9 touch-manipulation text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/10"
              >
                <TestTube className="h-3.5 w-3.5" />
                Test
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Version toggle + pricing */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50 border border-border">
              <span className="text-xs text-white font-semibold mr-auto">Template:</span>
              <Button
                variant={emailVersion === 'v1' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEmailVersion('v1')}
                className={`h-8 touch-manipulation text-xs ${emailVersion === 'v1' ? 'bg-amber-500 text-black hover:bg-amber-600' : ''}`}
              >
                v1 Original
              </Button>
              <Button
                variant={emailVersion === 'v2' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEmailVersion('v2')}
                className={`h-8 touch-manipulation text-xs ${emailVersion === 'v2' ? 'bg-green-500 text-black hover:bg-green-600' : ''}`}
              >
                v2 Round-Up
              </Button>
            </div>

            {/* Pricing preview */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-green-400 font-semibold">Monthly</p>
                <p className="text-lg font-bold text-green-400">£7.99</p>
                <p className="text-[10px] text-white"><span className="line-through">£9.99</span> - 20% off</p>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-xs text-amber-400 font-semibold">Yearly</p>
                <p className="text-lg font-bold text-amber-400">£79.99</p>
                <p className="text-[10px] text-white"><span className="line-through">£99.99</span> - 20% off</p>
              </div>
            </div>

            {/* Test email section */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">
                  Send Test Email ({emailVersion === 'v2' ? 'Sunday Round-Up' : 'Original'})
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 text-base touch-manipulation flex-1"
                  />
                  <Button
                    onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                    disabled={!testEmail || sendTestMutation.isPending}
                    className="h-11 px-4 touch-manipulation bg-yellow-500 hover:bg-yellow-600"
                  >
                    {sendTestMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            {/* Manual email */}
            <div className="flex items-center gap-2">
              <Input
                type="email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                placeholder="Send to any email..."
                className="h-11 text-base touch-manipulation flex-1"
              />
              <Button
                onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                disabled={!manualEmail || sendManualMutation.isPending}
                className="h-11 px-4 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black shrink-0"
              >
                {sendManualMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>

            {/* Batch progress */}
            {batchSending && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending batch {batchProgress.batch}/{batchProgress.totalBatches}...
                  </span>
                  <span className="text-white">{batchProgress.sent}/{batchProgress.total}</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${batchProgress.total > 0 ? (batchProgress.sent / batchProgress.total) * 100 : 0}%` }}
                  />
                </div>
                {batchProgress.failed > 0 && (
                  <p className="text-xs text-red-400">{batchProgress.failed} failed</p>
                )}
              </div>
            )}

            {/* Big action buttons */}
            {!batchSending && (
              <div className="grid grid-cols-1 gap-2 pt-1">
                <Button
                  onClick={() => setConfirmResend(true)}
                  disabled={resetting || batchSending}
                  className="w-full h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-2"
                >
                  {resetting ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Resend New Email to All ({totalSent} users)
                </Button>
                <p className="text-[10px] text-white text-center">
                  Resets users sent 24h+ ago then sends the new email in batches of {BATCH_SIZE}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tab switcher: Eligible / Sent & Tracking */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border">
          <Button
            variant={activeTab === 'eligible' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('eligible')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'eligible' ? 'bg-amber-500 text-black hover:bg-amber-600' : ''}`}
          >
            <Target className="h-3.5 w-3.5" />
            Eligible ({filteredUsers.length})
          </Button>
          <Button
            variant={activeTab === 'sent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('sent')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'sent' ? 'bg-blue-500 text-black hover:bg-blue-600' : ''}`}
          >
            <Mail className="h-3.5 w-3.5" />
            Sent & Tracking ({sentUsers?.length || 0})
          </Button>
        </div>

        {/* Eligible Users Tab */}
        {activeTab === 'eligible' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4">
              <div className="space-y-3">
                <AdminSearchInput value={search} onChange={setSearch} placeholder="Search eligible users..." />

                {filteredUsers.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length}
                        onCheckedChange={toggleSelectAll}
                        disabled={batchSending}
                        className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <span className="text-sm text-white">
                        {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                      </span>
                    </div>
                    {selectedUsers.size > 0 && !batchSending && (
                      <Button
                        size="sm"
                        onClick={handleSendSelected}
                        className="gap-2 h-11 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                      >
                        <Send className="h-4 w-4" />
                        Send to {selectedUsers.size}
                      </Button>
                    )}
                  </div>
                )}

                {usersLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <AdminEmptyState
                    icon={Users}
                    title="No eligible users"
                    description={search ? 'No users match your search.' : 'All eligible users have been sent the offer.'}
                  />
                ) : (
                  <div className="space-y-1.5">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform"
                      >
                        <Checkbox
                          checked={selectedUsers.has(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setSelectedUser(user)}>
                          <p className="font-medium text-sm text-white truncate">{user.full_name || 'Unknown'}</p>
                          <div className="flex items-center gap-2 text-xs text-white">
                            <span className="truncate max-w-[140px]">{user.email}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(parseISO(user.trial_ended_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)} className="h-11 px-2 touch-manipulation">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sent & Tracking Tab */}
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
                <AdminEmptyState icon={Mail} title="No emails sent yet" description="Send win-back offers to see tracking data here." />
              ) : (
                <div className="space-y-1.5">
                  {sentUsers.map((user) => {
                    const emailEvents = trackingStats.byEmail;
                    // Try to match by username (we don't have email in sent history)
                    const wasDelivered = user.subscribed || false; // placeholder
                    const wasOpened = false; // will populate when we have per-user email tracking
                    const wasClicked = false;

                    return (
                      <div key={user.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-white truncate">{user.full_name || user.username}</p>
                          <p className="text-xs text-white">
                            Sent {formatDistanceToNow(parseISO(user.winback_offer_sent_at), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {user.subscribed ? (
                            <Badge className="bg-green-500/20 text-green-400 text-[10px] px-1.5">
                              <CheckCheck className="h-3 w-3 mr-0.5" />
                              Converted
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-500/20 text-gray-400 text-[10px] px-1.5">Pending</Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

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
                  <div>
                    <p className="text-left">{selectedUser?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-white">{selectedUser?.email}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      Trial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Signed Up</span>
                      <span className="text-sm">{selectedUser?.created_at && format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Trial Ended</span>
                      <span className="text-sm">{selectedUser?.trial_ended_at && format(parseISO(selectedUser.trial_ended_at), 'dd MMM yyyy')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Days Since Expiry</span>
                      <Badge variant="outline" className="text-red-400">
                        {selectedUser?.trial_ended_at && Math.floor((Date.now() - parseISO(selectedUser.trial_ended_at).getTime()) / (1000 * 60 * 60 * 24))} days
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
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Sending...</>
                  ) : (
                    <><Mail className="h-4 w-4 mr-2" />Send Win-Back Offer</>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm Resend Dialog */}
        <AlertDialog open={confirmResend} onOpenChange={setConfirmResend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Resend new email to all previously sent?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">
                This resets all users sent the old email 24+ hours ago (who haven't subscribed),
                then sends the new rewritten email in batches of {BATCH_SIZE}. One fresh email each.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  setConfirmResend(false);
                  setResetting(true);
                  try {
                    const { data, error } = await supabase.functions.invoke('send-winback-offer', {
                      body: { action: 'reset_sent' },
                    });
                    if (error) throw error;
                    if (data?.error) throw new Error(data.error);

                    haptic.success();
                    toast.success(`${data.reset} users reset — now sending new email...`);

                    await queryClient.invalidateQueries({ queryKey: ['admin-winback-eligible'] });
                    await queryClient.invalidateQueries({ queryKey: ['admin-winback-stats'] });
                    const freshData = await refetch();
                    const freshUsers = freshData.data || [];

                    setResetting(false);

                    if (freshUsers.length > 0) {
                      sendBatchedEmails(freshUsers.map((u: EligibleUser) => u.id));
                    } else {
                      toast.info('No users to resend to (all subscribed or sent < 24h ago)');
                    }
                  } catch (err: any) {
                    setResetting(false);
                    haptic.error();
                    toast.error(`Reset failed: ${err.message}`);
                  }
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset &amp; Resend All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Confirm Send All Dialog */}
        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send to all {eligibleUsers?.length || 0} eligible users?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">
                Sends the win-back offer in batches of {BATCH_SIZE}. Each person only receives one
                email ever. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmSendAll(false);
                  sendBatchedEmails(eligibleUsers?.map((u) => u.id) || []);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Send to All ({eligibleUsers?.length || 0})
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}

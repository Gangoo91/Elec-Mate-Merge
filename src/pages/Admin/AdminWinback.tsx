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
      if (error) {
        console.error('Stats invoke error:', error);
        throw error;
      }
      if (data?.error) {
        console.error('Stats data error:', data.error, data.stack);
        throw new Error(data.error);
      }
      return data as WinbackStats;
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    retry: false, // Don't retry on error so we see the issue
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
    enabled: showSentHistory,
  });

  // Send single email mutation
  const sendSingleMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_single', userId },
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

  // Auto-batched bulk send — sends in groups of 40 to avoid edge function timeouts
  const BATCH_SIZE = 40;

  const sendBatchedEmails = async (userIds: string[]) => {
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
          body: { action: 'send_bulk', userIds: batches[i] },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        totalFailed += data.failed || 0;
        setBatchProgress((prev) => ({ ...prev, sent: totalSent, failed: totalFailed }));

        toast.success(`Batch ${i + 1}/${batches.length} done — ${data.sent} sent`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        totalFailed += batches[i].length;
        setBatchProgress((prev) => ({ ...prev, failed: totalFailed }));
        toast.error(`Batch ${i + 1} failed: ${err.message}`);
      }

      // Small delay between batches to be safe
      if (i < batches.length - 1) {
        await new Promise((r) => setTimeout(r, 2000));
      }
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
        body: { action: 'send_test', testEmail: email },
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

  // Send manual email mutation (real email, not test)
  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-winback-offer', {
        body: { action: 'send_manual', manualEmail: email },
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

  // Toggle user selection
  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  // Select/deselect all
  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  // Handle send to selected — auto-batched
  const handleSendSelected = () => {
    if (selectedUsers.size === 0) return;
    sendBatchedEmails(Array.from(selectedUsers));
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Gift className="h-5 w-5 text-amber-400" />
              Win-Back Campaign
            </h2>
            <p className="text-sm text-muted-foreground">
              Send discounted offers to expired trial electricians
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Main Action Card — Reset & Send All */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-600/10">
          <CardContent className="p-4 space-y-3">
            {batchSending ? (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending batch {batchProgress.batch}/{batchProgress.totalBatches}...
                  </span>
                  <span className="text-muted-foreground">
                    {batchProgress.sent}/{batchProgress.total}
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${batchProgress.total > 0 ? (batchProgress.sent / batchProgress.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                {batchProgress.failed > 0 && (
                  <p className="text-xs text-red-400">{batchProgress.failed} failed</p>
                )}
              </>
            ) : resetting ? (
              <div className="flex items-center justify-center gap-2 py-4 text-amber-400">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-semibold">Resetting users...</span>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => setConfirmResend(true)}
                  disabled={resetting || batchSending}
                  className="w-full h-14 touch-manipulation text-base font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-3"
                >
                  <Send className="h-5 w-5" />
                  Resend New Email to All ({stats?.offersSent || 0} users)
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Resets previously sent users (24h+ ago) and sends them the new rewritten email in
                  batches
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20">
            <CardContent className="p-3 sm:pt-4 sm:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">
                    {statsLoading ? '...' : (stats?.totalEligible || 0).toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-xs text-muted-foreground">Eligible</p>
                </div>
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
            <CardContent className="p-3 sm:pt-4 sm:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">
                    {statsLoading ? '...' : (stats?.offersSent || 0).toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-xs text-muted-foreground">Sent</p>
                </div>
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
            <CardContent className="p-3 sm:pt-4 sm:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">
                    {statsLoading ? '...' : (stats?.conversions || 0).toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-xs text-muted-foreground">Converted</p>
                </div>
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border-yellow-500/20">
            <CardContent className="p-3 sm:pt-4 sm:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">
                    {statsLoading ? '...' : `${stats?.conversionRate || 0}%`}
                  </p>
                  <p className="text-xs sm:text-xs text-muted-foreground">Rate</p>
                </div>
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offer Preview Card */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-amber-400" />
                Win-Back Offer Details
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTestEmail(!showTestEmail)}
                className="gap-1.5 h-11 touch-manipulation text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/10"
              >
                <TestTube className="h-4 w-4" />
                <span className="hidden sm:inline">Test Email</span>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs sm:text-xs text-green-400 font-semibold mb-1">Monthly</p>
                <p className="text-xl sm:text-2xl font-bold text-green-400">£7.99</p>
                <p className="text-xs sm:text-xs text-muted-foreground">
                  <span className="line-through">£9.99</span> - 20% off
                </p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-xs sm:text-xs text-amber-400 font-semibold mb-1">Yearly</p>
                <p className="text-xl sm:text-2xl font-bold text-amber-400">£79.99</p>
                <p className="text-xs sm:text-xs text-muted-foreground">
                  <span className="line-through">£99.99</span> - 20% off
                </p>
              </div>
            </div>

            {/* Test Email Section */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-3">
                <p className="text-xs text-yellow-400 font-semibold">Send Test Email</p>
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
                    {sendTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Preview the win-back email in your inbox
                </p>
              </div>
            )}

            <p className="text-xs sm:text-xs text-muted-foreground text-center">
              Payment links go directly to Stripe checkout with discounted pricing
            </p>

            {/* Resend to previously sent users */}
            <div className="pt-3 border-t border-border/50">
              <Button
                variant="outline"
                onClick={() => setConfirmResend(true)}
                disabled={resetting || batchSending}
                className="w-full h-12 touch-manipulation gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-sm sm:text-sm"
              >
                {resetting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 shrink-0" />
                    <span>Resend New Email to All</span>
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Resets users sent 24h+ ago who haven't subscribed, then sends the new email
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filters & Actions */}
        <Card>
          <CardContent className="pt-4 pb-4 px-3 sm:px-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AdminSearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search..."
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSentHistory(!showSentHistory)}
                  className="gap-1.5 h-11 px-2.5 touch-manipulation text-muted-foreground shrink-0"
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">History</span>
                </Button>
              </div>

              {/* Manual Email Entry */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
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
                  {sendManualMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1.5" />
                      <span className="hidden sm:inline">Send</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Bulk Actions */}
              {filteredUsers.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length
                        }
                        onCheckedChange={toggleSelectAll}
                        disabled={batchSending}
                        className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <span className="text-sm text-muted-foreground">
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

                  {/* Batch progress */}
                  {batchSending && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-amber-400 font-semibold">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending batch {batchProgress.batch}/{batchProgress.totalBatches}...
                        </span>
                        <span className="text-muted-foreground">
                          {batchProgress.sent}/{batchProgress.total} sent
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${batchProgress.total > 0 ? (batchProgress.sent / batchProgress.total) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      {batchProgress.failed > 0 && (
                        <p className="text-xs text-red-400">{batchProgress.failed} failed</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Eligible Users List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-400" />
                Eligible Users
              </span>
              <Badge variant="outline" className="text-xs">
                {filteredUsers.length} users
              </Badge>
            </CardTitle>
            <CardDescription>
              Electricians who haven't subscribed 24+ hours after trial ended
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                description={
                  search
                    ? 'No users match your search criteria.'
                    : 'All eligible users have been sent the win-back offer.'
                }
              />
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform"
                  >
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />

                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {user.full_name || 'Unknown'}
                        </p>
                        <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                          <Zap className="h-2.5 w-2.5 mr-0.5" />
                          Electrician
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate max-w-[150px]">{user.email}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expired{' '}
                          {formatDistanceToNow(parseISO(user.trial_ended_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                        className="h-11 px-2 touch-manipulation"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sent History Sheet */}
        <Sheet open={showSentHistory} onOpenChange={setShowSentHistory}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="text-left flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" />
                  Sent History
                </SheetTitle>
                <p className="text-sm text-muted-foreground text-left">
                  Users who have received the win-back offer
                </p>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4">
                {sentLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                    ))}
                  </div>
                ) : !sentUsers || sentUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">No offers sent yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {user.full_name || user.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Sent{' '}
                            {formatDistanceToNow(parseISO(user.winback_offer_sent_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        {user.subscribed ? (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            <CheckCheck className="h-3 w-3 mr-1" />
                            Converted
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500/20 text-gray-400 text-xs">Pending</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

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
                    <p className="text-sm font-normal text-muted-foreground">
                      {selectedUser?.email}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* User Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      Trial Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Signed Up</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Trial Ended</span>
                      <span className="text-sm">
                        {selectedUser?.trial_ended_at &&
                          format(parseISO(selectedUser.trial_ended_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Days Since Expiry</span>
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

                {/* Send Action */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Send className="h-4 w-4 text-amber-400" />
                      Send Offer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                          Send Win-Back Offer
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Email includes links to £7.99/mo and £79.99/yr checkout
                    </p>
                  </CardContent>
                </Card>

                {/* Email Preview */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4 text-yellow-400" />
                      Email Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
                      <p>
                        <strong>Subject:</strong> We miss you! Special offer: £7.99/month
                      </p>
                      <div className="border-t border-border pt-3">
                        <p className="text-muted-foreground">
                          Hi {selectedUser?.full_name?.split(' ')[0] || 'there'},
                        </p>
                        <p className="text-muted-foreground mt-2">
                          We noticed you tried Elec-Mate but haven't come back yet. We'd love to
                          have you back - so here's a special offer just for you:
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Badge className="bg-green-500/20 text-green-400">£7.99/mo</Badge>
                          <Badge className="bg-amber-500/20 text-amber-400">£79.99/yr</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow, parseISO, format, differenceInDays } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminSearchInput from '@/components/admin/AdminSearchInput';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import { useHaptic } from '@/hooks/useHaptic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
import {
  Users,
  Send,
  Mail,
  Loader2,
  Target,
  ChevronRight,
  Clock,
  Eye,
  User,
  CheckCheck,
  GraduationCap,
  TrendingUp,
  Gift,
  RotateCcw,
  CalendarDays,
} from 'lucide-react';

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  created_at: string;
  last_sign_in?: string;
  apprentice_campaign_sent_at?: string;
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string;
  created_at: string;
  apprentice_campaign_sent_at: string;
  apprentice_campaign_type: string;
  subscribed: boolean;
}

const EMAIL_VERSIONS = {
  v1: { label: 'v1 — Full Feature List', description: 'Comprehensive breakdown of every feature' },
  v2: { label: 'v2 — Short & Punchy', description: 'Quick pitch with pricing upfront' },
  v3: {
    label: 'v3 — Personal from Andrew',
    description: "Friendly, personal tone acknowledging they've been away",
  },
} as const;

type EmailVersion = keyof typeof EMAIL_VERSIONS;

export default function AdminApprenticeCampaigns() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [showSentHistory, setShowSentHistory] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [emailVersion, setEmailVersion] = useState<EmailVersion>('v3');

  const campaignType = 'trial_winback' as const;

  // ─── Queries ────────────────────────────────────────────
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['apprentice-campaign-stats', campaignType],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_stats', campaignType },
      });
      if (error) throw error;
      return data;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });

  const { data: eligibleUsers, isLoading: usersLoading } = useQuery({
    queryKey: ['apprentice-campaign-eligible', campaignType],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_eligible', campaignType },
      });
      if (error) throw error;
      return data?.users || [];
    },
    staleTime: 30000,
  });

  const { data: sentUsers, isLoading: sentLoading } = useQuery({
    queryKey: ['apprentice-campaign-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'get_sent_history' },
      });
      if (error) throw error;
      return (data?.users || []) as SentUser[];
    },
    enabled: showSentHistory,
    staleTime: 30000,
  });

  // ─── Mutations ──────────────────────────────────────────
  const campaignParams = {
    campaignType,
    email_version: emailVersion,
  };

  const sendSingleMutation = useMutation({
    mutationFn: async (uid: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_single', userId: uid, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({ title: `Win-back email sent to ${data.email}`, variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] });
      setSelectedUser(null);
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        next.delete(data.email);
        return next;
      });
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to send email', variant: 'destructive' });
    },
  });

  const sendBulkMutation = useMutation({
    mutationFn: async (uids: string[]) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_bulk', userIds: uids, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({
        title: `Sent ${data.sent} of ${data.sent + (data.failed || 0)} emails${data.skipped ? ` (${data.skipped} skipped)` : ''}${data.failed ? ` (${data.failed} failed)` : ''}`,
        variant: data.failed ? 'warning' : 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] });
      setSelectedUsers(new Set());
      setConfirmSendAll(false);
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Bulk send failed', variant: 'destructive' });
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_test', testEmail: email, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent!', variant: 'success' });
      setTestEmail('');
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to send test email', variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'send_manual', manualEmail: email, ...campaignParams },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Email sent!', variant: 'success' });
      setManualEmail('');
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to send email', variant: 'destructive' });
    },
  });

  const resetSentMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-apprentice-campaign', {
        body: { action: 'reset_sent' },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({ title: data.message || `${data.reset} users reset`, variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-sent'] });
    },
    onError: (err: Error) => {
      haptic.error();
      toast({ title: err.message || 'Failed to reset sent status', variant: 'destructive' });
    },
  });

  // ─── Filtering & Selection ─────────────────────────────
  const filteredUsers = useMemo(() => {
    if (!eligibleUsers) return [];
    if (!search) return eligibleUsers;
    const q = search.toLowerCase();
    return eligibleUsers.filter(
      (u: EligibleUser) =>
        u.full_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q)
    );
  }, [eligibleUsers, search]);

  const toggleUserSelection = (uid: string) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(uid)) next.delete(uid);
      else next.add(uid);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u: EligibleUser) => u.id)));
    }
  };

  const handleSendSelected = () => {
    if (selectedUsers.size > 0) {
      setConfirmSendAll(true);
    }
  };

  // Compute date range from eligible users
  const dateRange = useMemo(() => {
    if (!eligibleUsers || eligibleUsers.length === 0) return null;
    const dates = eligibleUsers.map((u: EligibleUser) => new Date(u.created_at).getTime());
    const earliest = new Date(Math.min(...dates));
    const latest = new Date(Math.max(...dates));
    return {
      earliest: format(earliest, 'dd MMM'),
      latest: format(latest, 'dd MMM yyyy'),
    };
  }, [eligibleUsers]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] }),
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] }),
        ]);
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Apprentice Win-Back</h2>
            <p className="text-xs text-white">
              Re-engage lapsed trial apprentices with targeted emails
            </p>
          </div>
        </div>

        {/* Hero Stats Row */}
        <div className="grid grid-cols-4 gap-2">
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="pt-3 pb-2.5 px-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Target className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-[10px] text-white">Eligible</span>
              </div>
              <p className="text-xl font-bold">
                {statsLoading ? '...' : stats?.totalEligible || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="pt-3 pb-2.5 px-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Send className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-[10px] text-white">Sent</span>
              </div>
              <p className="text-xl font-bold">{statsLoading ? '...' : stats?.offersSent || 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="pt-3 pb-2.5 px-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <CheckCheck className="h-3.5 w-3.5 text-green-400" />
                <span className="text-[10px] text-white">Converted</span>
              </div>
              <p className="text-xl font-bold">{statsLoading ? '...' : stats?.conversions || 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="pt-3 pb-2.5 px-3">
              <div className="flex items-center gap-1.5 mb-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-[10px] text-white">Rate</span>
              </div>
              <p className="text-xl font-bold">
                {statsLoading ? '...' : `${stats?.conversionRate || 0}%`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Audience Insight */}
        <Card className="border-amber-500/20">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <CalendarDays className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">
                    {statsLoading ? '...' : stats?.totalEligible || 0} apprentices
                  </strong>{' '}
                  signed up
                  {dateRange ? ` between ${dateRange.earliest} \u2013 ${dateRange.latest}` : ''} and
                  didn't subscribe after their 7-day trial.
                  {stats?.offersSent === 0
                    ? ' None have been contacted yet.'
                    : ` ${stats?.offersSent || 0} have been contacted so far.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Version Selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-400" />
              Email Version
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(Object.keys(EMAIL_VERSIONS) as EmailVersion[]).map((v) => {
              const config = EMAIL_VERSIONS[v];
              const isActive = emailVersion === v;
              return (
                <button
                  key={v}
                  onClick={() => setEmailVersion(v)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl touch-manipulation transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/40'
                      : 'bg-muted/30 border border-transparent hover:bg-muted/50'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isActive ? 'border-amber-400' : 'border-white/30'
                    }`}
                  >
                    {isActive && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${isActive ? 'text-amber-400' : 'text-white'}`}
                    >
                      {config.label}
                    </p>
                    <p className="text-xs text-white">{config.description}</p>
                  </div>
                  {v === 'v3' && (
                    <Badge className="bg-green-500/20 text-green-400 text-[10px] shrink-0">
                      New
                    </Badge>
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Action Bar */}
        <Card>
          <CardContent className="pt-4 pb-4 px-4 space-y-3">
            {/* Test email */}
            <div>
              <label className="text-sm text-white mb-2 block">Send test email</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
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
              <p className="text-xs text-white mt-1">
                Preview the {EMAIL_VERSIONS[emailVersion].label.toLowerCase()} email in your inbox
              </p>
            </div>

            {/* Manual email */}
            <div className="pt-2 border-t border-border/50">
              <label className="text-sm text-white mb-2 block">Send to any email</label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="anyone@email.com"
                  className="h-11 text-base touch-manipulation flex-1 border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
                <Button
                  onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                  disabled={!manualEmail || sendManualMutation.isPending}
                  className="h-11 px-4 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white"
                >
                  {sendManualMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Reset & History */}
            <div className="flex gap-2 pt-2 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetSentMutation.mutate()}
                disabled={resetSentMutation.isPending}
                className="gap-1.5 h-11 touch-manipulation flex-1"
              >
                {resetSentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Reset Sent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSentHistory(true)}
                className="gap-1.5 h-11 touch-manipulation flex-1"
              >
                <Eye className="h-4 w-4" />
                Sent History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-400" />
                Lapsed Apprentices
              </span>
              <Badge variant="outline" className="text-xs">
                {filteredUsers.length} users
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Search & bulk actions */}
            <div className="flex items-center gap-2">
              <AdminSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search name or email..."
                className="flex-1"
              />
            </div>

            {filteredUsers.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={
                      filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length
                    }
                    onCheckedChange={toggleSelectAll}
                    className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <span className="text-sm text-white">
                    {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                  </span>
                </div>

                {selectedUsers.size > 0 && (
                  <Button
                    size="sm"
                    onClick={handleSendSelected}
                    disabled={sendBulkMutation.isPending}
                    className="gap-2 h-11 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white"
                  >
                    {sendBulkMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send to {selectedUsers.size}
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* User rows */}
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
                    : 'No lapsed apprentices eligible for win-back right now.'
                }
              />
            ) : (
              <div className="space-y-2">
                {filteredUsers.map((user: EligibleUser) => {
                  const daysSinceSignup = differenceInDays(new Date(), parseISO(user.created_at));
                  const daysSinceTrial = Math.max(0, daysSinceSignup - 7);

                  return (
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
                          <Badge className="bg-orange-500/20 text-orange-400 text-[10px]">
                            {daysSinceTrial}d lapsed
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white">
                          <span className="truncate max-w-[140px]">{user.email}</span>
                          <span>&middot;</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(parseISO(user.created_at), 'dd MMM yy')}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                        className="h-11 px-2 touch-manipulation"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
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
                <p className="text-sm text-white text-left">
                  Win-back emails sent to lapsed apprentices
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
                    <Mail className="h-10 w-10 text-white mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-white">No win-back emails sent yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                      >
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {user.full_name || user.username}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-white">
                            <span>
                              {formatDistanceToNow(parseISO(user.apprentice_campaign_sent_at), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                        {user.subscribed ? (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            <CheckCheck className="h-3 w-3 mr-1" />
                            Subscribed
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                            Pending
                          </Badge>
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
                    <p className="text-sm font-normal text-white">{selectedUser?.email}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                      User Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Signed Up</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Trial Ended</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(
                            new Date(
                              new Date(selectedUser.created_at).getTime() + 7 * 24 * 60 * 60 * 1000
                            ),
                            'dd MMM yyyy'
                          )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Days Since Trial</span>
                      <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                        {selectedUser?.created_at
                          ? `${Math.max(0, differenceInDays(new Date(), parseISO(selectedUser.created_at)) - 7)} days`
                          : '-'}
                      </Badge>
                    </div>
                    {selectedUser?.last_sign_in && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Last Active</span>
                        <span className="text-sm">
                          {formatDistanceToNow(parseISO(selectedUser.last_sign_in), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                    {selectedUser?.apprentice_campaign_sent_at && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">Last Campaign</span>
                        <span className="text-sm">
                          {formatDistanceToNow(parseISO(selectedUser.apprentice_campaign_sent_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Send className="h-4 w-4 text-amber-400" />
                      Send Win-Back Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-white mb-3">
                      Using {EMAIL_VERSIONS[emailVersion].label}
                    </p>
                    <Button
                      className="w-full h-12 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white font-semibold"
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
                          Send Win-Back Email
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm Bulk Send Dialog */}
        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Send win-back email to {selectedUsers.size} apprentices?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will send the {EMAIL_VERSIONS[emailVersion].label.toLowerCase()} email to{' '}
                {selectedUsers.size} lapsed apprentice{selectedUsers.size === 1 ? '' : 's'}. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => sendBulkMutation.mutate(Array.from(selectedUsers))}
                className="h-11 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white"
              >
                {sendBulkMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send to {selectedUsers.size}
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}

import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  TrendingUp,
  ChevronRight,
  Loader2,
  Clock,
  User,
  Target,
  CheckCheck,
  TestTube,
  GraduationCap,
  Zap,
  Square,
  CreditCard,
  ShieldCheck,
  MailWarning,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface EligibleUser {
  id: string;
  full_name: string | null;
  username: string;
  email: string;
  role: string | null;
  created_at: string;
}

interface SentUser {
  id: string;
  full_name: string | null;
  username: string;
  role: string | null;
  created_at: string;
  incomplete_signup_v3_sent_at: string;
  subscribed: boolean;
}

interface V3Stats {
  totalEligible: number;
  sent: number;
  totalAbandoned: number;
  conversions: number;
  conversionRate: string;
}

export default function AdminIncompleteSignup() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [activeTab, setActiveTab] = useState<'eligible' | 'sent'>('eligible');

  // Test email
  const [testEmail, setTestEmail] = useState('');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [testSending, setTestSending] = useState(false);

  // Confirm send
  const [confirmSend, setConfirmSend] = useState(false);

  // Batch state
  const [batchSending, setBatchSending] = useState(() => !!(window as any).__v3BatchRunning);
  const [batchProgress, setBatchProgress] = useState(
    () => (window as any).__v3BatchProgress || { sent: 0, remaining: 0 }
  );

  // ── Data Queries ──

  const { data: stats, refetch: refetchStats } = useQuery<V3Stats>({
    queryKey: ['admin-v3-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_v3_stats' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as V3Stats;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const {
    data: eligibleUsers,
    isLoading: usersLoading,
    refetch: refetchEligible,
  } = useQuery<EligibleUser[]>({
    queryKey: ['admin-v3-eligible'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_v3_eligible' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as EligibleUser[];
    },
    staleTime: 30 * 1000,
  });

  const { data: sentUsers, isLoading: sentLoading } = useQuery<SentUser[]>({
    queryKey: ['admin-v3-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_v3_sent' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as SentUser[];
    },
    staleTime: 30 * 1000,
  });

  // ── Actions ──

  const sendTest = async () => {
    if (!testEmail) return;
    setTestSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'send_v3_test', testEmail },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      haptic.success();
      toast({ title: 'Test email sent! Check your inbox.', variant: 'success' });
      setTestEmail('');
      setShowTestEmail(false);
    } catch (err: any) {
      haptic.error();
      toast({ title: `Failed: ${err.message}`, variant: 'destructive' });
    } finally {
      setTestSending(false);
    }
  };

  // Batch sender — window-based pattern (survives re-renders)
  const startBatchLoop = () => {
    if ((window as any).__v3BatchRunning) return;

    (window as any).__v3BatchRunning = true;
    (window as any).__v3BatchStopped = false;
    (window as any).__v3BatchTotal = 0;
    (window as any).__v3BatchProgress = { sent: 0, remaining: stats?.totalEligible || 0 };

    setBatchSending(true);
    setBatchProgress({ sent: 0, remaining: stats?.totalEligible || 0 });

    const sendOneBatch = async () => {
      if ((window as any).__v3BatchStopped) {
        toast({
          title: `Stopped — sent ${(window as any).__v3BatchTotal} emails so far`,
          variant: 'success',
        });
        cleanup();
        return;
      }

      try {
        const session = (await supabase.auth.getSession()).data.session;
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/send-incomplete-signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
            apikey: SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ action: 'send_v3_campaign' }),
        });

        const data = await resp.json();
        if (!resp.ok || data.error) throw new Error(data.error || `HTTP ${resp.status}`);

        (window as any).__v3BatchTotal += data.sent;
        const progress = {
          sent: (window as any).__v3BatchTotal,
          remaining: data.remaining,
        };
        (window as any).__v3BatchProgress = progress;
        setBatchProgress(progress);

        if (data.complete || data.sent === 0) {
          toast({
            title: `All done! Sent ${(window as any).__v3BatchTotal} emails`,
            variant: 'success',
          });
          cleanup();
          return;
        }

        toast({
          title: `Batch of ${data.sent} sent (${(window as any).__v3BatchTotal} total) — next batch in 10s...`,
        });

        (window as any).__v3BatchTimer = window.setTimeout(sendOneBatch, 10000);
      } catch (err: any) {
        toast({
          title: `Batch error: ${err.message} — retrying in 15s...`,
          variant: 'destructive',
        });
        (window as any).__v3BatchTimer = window.setTimeout(sendOneBatch, 15000);
      }
    };

    const cleanup = () => {
      (window as any).__v3BatchRunning = false;
      if ((window as any).__v3BatchTimer) {
        window.clearTimeout((window as any).__v3BatchTimer);
      }
      setBatchSending(false);
      setConfirmSend(false);
      invalidateAll();
    };

    sendOneBatch();
  };

  const stopBatchLoop = () => {
    (window as any).__v3BatchStopped = true;
    if ((window as any).__v3BatchTimer) {
      window.clearTimeout((window as any).__v3BatchTimer);
      toast({
        title: `Stopped — sent ${(window as any).__v3BatchTotal || 0} emails so far`,
        variant: 'success',
      });
      (window as any).__v3BatchRunning = false;
      setBatchSending(false);
      invalidateAll();
    }
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-v3-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-v3-eligible'] });
    queryClient.invalidateQueries({ queryKey: ['admin-v3-sent'] });
  };

  // ── Helpers ──

  const filteredUsers = useMemo(() => {
    if (!eligibleUsers) return [];
    if (!search) return eligibleUsers;
    const s = search.toLowerCase();
    return eligibleUsers.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(s) ||
        u.username?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s)
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
    if (selectedUsers.size === filteredUsers.length) setSelectedUsers(new Set());
    else setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
  };

  const getRoleBadge = (role: string | null) => {
    if (role === 'apprentice') {
      return (
        <Badge className="bg-purple-500/20 text-purple-400 text-[10px] px-1.5 border-0">
          <GraduationCap className="h-2.5 w-2.5 mr-0.5" />
          Apprentice
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 border-0">
        <Zap className="h-2.5 w-2.5 mr-0.5" />
        Electrician
      </Badge>
    );
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([refetchStats(), refetchEligible()]);
      }}
    >
      <div className="space-y-4 pb-20">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-red-400" />
              </div>
              Card Abandoners
            </h2>
            <p className="text-sm text-white mt-1">
              {stats?.totalAbandoned || 91} people who bailed at the card screen
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              invalidateAll();
              refetchEligible();
            }}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-4 gap-2">
          {[
            {
              label: 'Total',
              value: stats?.totalAbandoned || 0,
              icon: Users,
              colour: 'text-white',
              bg: 'from-white/5 to-white/[0.02]',
              border: 'border-white/10',
            },
            {
              label: 'Eligible',
              value: stats?.totalEligible || 0,
              icon: Target,
              colour: 'text-red-400',
              bg: 'from-red-500/10 to-orange-500/5',
              border: 'border-red-500/20',
            },
            {
              label: 'Sent',
              value: stats?.sent || 0,
              icon: Mail,
              colour: 'text-blue-400',
              bg: 'from-blue-500/10 to-cyan-500/5',
              border: 'border-blue-500/20',
            },
            {
              label: 'Converted',
              value: stats?.conversions || 0,
              icon: CheckCircle,
              colour: 'text-emerald-400',
              bg: 'from-emerald-500/10 to-green-500/5',
              border: 'border-emerald-500/20',
            },
          ].map((s) => (
            <Card key={s.label} className={`bg-gradient-to-br ${s.bg} ${s.border}`}>
              <CardContent className="p-2 sm:p-3 text-center">
                <s.icon className={`h-4 w-4 ${s.colour} mx-auto mb-1`} />
                <p className="text-lg sm:text-xl font-bold">
                  {stats ? s.value.toLocaleString() : '...'}
                </p>
                <p className="text-[10px] sm:text-xs text-white">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Email Preview Card ── */}
        <Card className="border-red-500/30 bg-gradient-to-br from-red-500/5 to-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MailWarning className="h-4 w-4 text-red-400" />
                V3 — "Card Deets" Campaign
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
            {/* Email preview */}
            <div className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-400 shrink-0" />
                <p className="text-xs text-white font-semibold">New Email — Addresses Card Fear</p>
              </div>
              <p className="text-xs text-red-400 font-medium">
                Subject: You got to the card bit and thought 'nah' — fair enough
              </p>
              <p className="text-xs text-white">
                From: Andrew at Elec-Mate &lt;founder@elec-mate.com&gt;
              </p>
              <div className="text-xs text-white space-y-1 pt-1 border-t border-border/30">
                <p>
                  Opens with empathy ("91 electricians walked away") then addresses the card fear
                  head-on — explains WHY the card is needed and exactly what happens.
                </p>
                <p>Features: certs, RAMS, quotes, job book, regs — all practical.</p>
                <p>One CTA: "Start Your Free Trial — No Charge for 7 Days"</p>
                <p>Ends with P.S. "last email you'll get from me" — urgency.</p>
              </div>
            </div>

            {/* Test email */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">Send V3 Test Email</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 text-base touch-manipulation flex-1"
                  />
                  <Button
                    onClick={sendTest}
                    disabled={!testEmail || testSending}
                    className="h-11 px-4 touch-manipulation bg-yellow-500 hover:bg-yellow-600"
                  >
                    {testSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Batch progress */}
            {batchSending && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-red-400 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                  <span className="text-white">
                    {batchProgress.sent} sent · {batchProgress.remaining} left
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        batchProgress.sent + batchProgress.remaining > 0
                          ? (batchProgress.sent /
                              (batchProgress.sent + batchProgress.remaining)) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 touch-manipulation text-red-400 border-red-500/30 hover:bg-red-500/10 gap-1.5"
                  onClick={stopBatchLoop}
                >
                  <Square className="h-3 w-3 fill-current" />
                  Stop Sending
                </Button>
              </div>
            )}

            {/* Send all button */}
            {!batchSending && (stats?.totalEligible || 0) > 0 && (
              <div className="pt-1">
                <Button
                  onClick={() => setConfirmSend(true)}
                  className="w-full h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send to All Eligible ({stats?.totalEligible || 0})
                </Button>
                <p className="text-[10px] text-white text-center mt-1">
                  Sends in batches of 10 · Excludes subscribed users · Reply-to: founder@elec-mate.com
                </p>
              </div>
            )}

            {!batchSending && (stats?.totalEligible || 0) === 0 && (stats?.sent || 0) > 0 && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <CheckCheck className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-sm text-emerald-400 font-semibold">All emails sent!</p>
                <p className="text-xs text-white mt-1">
                  {stats?.sent} sent · {stats?.conversions} converted · {stats?.conversionRate}% rate
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Tab Switcher ── */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border">
          <Button
            variant={activeTab === 'eligible' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('eligible')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'eligible' ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
          >
            <Target className="h-3.5 w-3.5" />
            Eligible ({filteredUsers.length})
          </Button>
          <Button
            variant={activeTab === 'sent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('sent')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'sent' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`}
          >
            <Mail className="h-3.5 w-3.5" />
            Sent ({sentUsers?.length || 0})
          </Button>
        </div>

        {/* ── Eligible Users Tab ── */}
        {activeTab === 'eligible' && (
          <Card>
            <CardContent className="pt-4 pb-4 px-3 sm:px-4">
              <div className="space-y-3">
                <AdminSearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search eligible users..."
                />

                {filteredUsers.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length
                        }
                        onCheckedChange={toggleSelectAll}
                        disabled={batchSending}
                        className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                      <span className="text-sm text-white">
                        {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                      </span>
                    </div>
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
                    description={
                      search
                        ? 'No users match your search.'
                        : 'All card abandoners have been sent the V3 email.'
                    }
                  />
                ) : (
                  <div className="space-y-1.5">
                    {filteredUsers.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform"
                      >
                        <Checkbox
                          checked={selectedUsers.has(u.id)}
                          onCheckedChange={() => toggleUserSelection(u.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                        />
                        <div
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => setSelectedUser(u)}
                        >
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-white truncate">
                              {u.full_name || 'Unknown'}
                            </p>
                            {getRoleBadge(u.role)}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white">
                            <span className="truncate max-w-[140px]">{u.email}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(parseISO(u.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUser(u)}
                          className="h-11 px-2 touch-manipulation"
                        >
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

        {/* ── Sent Tab ── */}
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
                  title="No V3 emails sent yet"
                  description="Send the V3 'card deets' email to see tracking data here."
                />
              ) : (
                <div className="space-y-1.5">
                  {sentUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-white truncate">
                            {u.full_name || u.username}
                          </p>
                          {getRoleBadge(u.role)}
                        </div>
                        <p className="text-xs text-white">
                          Sent{' '}
                          {formatDistanceToNow(parseISO(u.incomplete_signup_v3_sent_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {u.subscribed ? (
                          <Badge className="bg-green-500/20 text-green-400 text-[10px] px-1.5 border-0">
                            <CheckCheck className="h-3 w-3 mr-0.5" />
                            Converted
                          </Badge>
                        ) : (
                          <Badge className="bg-white/10 text-white text-[10px] px-1.5 border-0">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── User Detail Sheet ── */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-left">{selectedUser?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-white">{selectedUser?.email}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Signed Up</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy HH:mm')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Role</span>
                      {selectedUser && getRoleBadge(selectedUser.role)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Time Since Signup</span>
                      <Badge variant="outline" className="text-red-400">
                        {selectedUser?.created_at &&
                          formatDistanceToNow(parseISO(selectedUser.created_at), {
                            addSuffix: true,
                          })}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Status</span>
                      <Badge className="bg-red-500/20 text-red-400 border-0">
                        <CreditCard className="h-3 w-3 mr-1" />
                        Card Abandoned
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ── Confirm Send Dialog ── */}
        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send V3 "Card Deets" email to {stats?.totalEligible || 0} people?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">
                This sends the new empathetic "you got to the card bit" email to all abandoned
                checkout users who haven't received it yet. Sends in batches of 10. You can stop at
                any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmSend(false);
                  window.setTimeout(startBatchLoop, 200);
                }}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-red-500 hover:bg-red-600 text-white font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Send to All ({stats?.totalEligible || 0})
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PullToRefresh>
  );
}

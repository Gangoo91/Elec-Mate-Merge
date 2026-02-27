import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
  Calendar,
  TrendingUp,
  ChevronRight,
  Loader2,
  Clock,
  User,
  Target,
  CheckCheck,
  TestTube,
  UserPlus,
  GraduationCap,
  Zap,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
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
  incomplete_signup_sent_at: string;
  subscribed: boolean;
}

interface IncompleteSignupStats {
  totalEligible: number;
  offersSent: number;
  conversions: number;
  conversionRate: string;
}

export default function AdminIncompleteSignup() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
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

  // Fetch campaign stats
  const { data: stats, isLoading: statsLoading } = useQuery<IncompleteSignupStats>({
    queryKey: ['admin-incomplete-signup-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_stats' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as IncompleteSignupStats;
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
    queryKey: ['admin-incomplete-signup-eligible'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
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
    queryKey: ['admin-incomplete-signup-sent'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_sent_history' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as SentUser[];
    },
    staleTime: 30 * 1000,
  });

  // Send single email mutation
  const sendSingleMutation = useMutation({
    mutationFn: async (uid: string) => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'send_single', userId: uid },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Email sent successfully', variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-eligible'] });
      queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-stats'] });
      queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-sent'] });
      setSelectedUser(null);
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        next.delete(selectedUser?.id || '');
        return next;
      });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Failed to send: ${error.message}`, variant: 'destructive' });
    },
  });

  // Auto-batched bulk send
  const BATCH_SIZE = 40;

  const sendBatchedEmails = async (ids: string[]) => {
    const batches: string[][] = [];
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      batches.push(ids.slice(i, i + BATCH_SIZE));
    }

    setBatchSending(true);
    setBatchProgress({
      sent: 0,
      failed: 0,
      total: ids.length,
      batch: 0,
      totalBatches: batches.length,
    });

    let totalSent = 0;
    let totalFailed = 0;

    for (let i = 0; i < batches.length; i++) {
      setBatchProgress((prev) => ({ ...prev, batch: i + 1 }));

      try {
        const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
          body: { action: 'send_bulk', userIds: batches[i] },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        totalFailed += data.failed || 0;
        setBatchProgress((prev) => ({ ...prev, sent: totalSent, failed: totalFailed }));
      } catch (err: unknown) {
        totalFailed += batches[i].length;
        setBatchProgress((prev) => ({ ...prev, failed: totalFailed }));
      }

      if (i < batches.length - 1) await new Promise((r) => setTimeout(r, 2000));
    }

    haptic.success();
    toast({
      title:
        totalFailed === 0
          ? `Sent ${totalSent} of ${ids.length} emails`
          : `Sent ${totalSent} of ${ids.length} emails (${totalFailed} failed)`,
      variant: totalFailed === 0 ? 'success' : 'warning',
    });
    setBatchSending(false);
    setBatchProgress({ sent: 0, failed: 0, total: 0, batch: 0, totalBatches: 0 });
    setSelectedUsers(new Set());
    setConfirmSendAll(false);
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-eligible'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-sent'] });
  };

  // Send test email mutation
  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'send_test', testEmail: email },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent! Check your inbox.', variant: 'success' });
      setTestEmail('');
      setShowTestEmail(false);
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Failed to send test email: ${error.message}`, variant: 'destructive' });
    },
  });

  // Send manual email mutation
  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'send_manual', manualEmail: email },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Email sent!', variant: 'success' });
      setManualEmail('');
      queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-stats'] });
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Failed to send: ${error.message}`, variant: 'destructive' });
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

  const handleSendSelected = () => {
    if (selectedUsers.size === 0) return;
    sendBatchedEmails(Array.from(selectedUsers));
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
        await refetch();
      }}
    >
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-orange-400" />
              Abandoned Checkouts
            </h2>
            <p className="text-sm text-white">Users who signed up but didn't complete checkout</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              refetch();
              queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-stats'] });
              queryClient.invalidateQueries({ queryKey: ['admin-incomplete-signup-sent'] });
            }}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            {
              label: 'Eligible',
              value: stats?.totalEligible || 0,
              icon: Users,
              colour: 'text-orange-400',
              bg: 'from-orange-500/10 to-red-500/5',
              border: 'border-orange-500/20',
            },
            {
              label: 'Sent',
              value: stats?.offersSent || 0,
              icon: Mail,
              colour: 'text-blue-400',
              bg: 'from-blue-500/10 to-cyan-500/5',
              border: 'border-blue-500/20',
            },
            {
              label: 'Converted',
              value: stats?.conversions || 0,
              icon: TrendingUp,
              colour: 'text-emerald-400',
              bg: 'from-emerald-500/10 to-green-500/5',
              border: 'border-emerald-500/20',
            },
            {
              label: 'Conv. Rate',
              value: `${stats?.conversionRate || 0}%`,
              icon: CheckCircle,
              colour: 'text-green-400',
              bg: 'from-green-500/10 to-emerald-500/5',
              border: 'border-green-500/20',
              isString: true,
            },
          ].map((s) => (
            <Card key={s.label} className={`bg-gradient-to-br ${s.bg} ${s.border}`}>
              <CardContent className="p-2.5 sm:p-3 text-center">
                <s.icon className={`h-4 w-4 ${s.colour} mx-auto mb-1`} />
                <p className="text-lg sm:text-xl font-bold">
                  {statsLoading
                    ? '...'
                    : typeof s.value === 'string'
                      ? s.value
                      : s.value.toLocaleString()}
                </p>
                <p className="text-[10px] sm:text-xs text-white">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campaign Controls */}
        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4 text-orange-400" />
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
            {/* Test email section */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">
                  Send Test Email (Electrician template)
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
                    {sendTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
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
                className="h-11 px-4 touch-manipulation bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-black shrink-0"
              >
                {sendManualMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Batch progress */}
            {batchSending && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-orange-400 font-semibold">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending batch {batchProgress.batch}/{batchProgress.totalBatches}...
                  </span>
                  <span className="text-white">
                    {batchProgress.sent}/{batchProgress.total}
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
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
          </CardContent>
        </Card>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border">
          <Button
            variant={activeTab === 'eligible' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('eligible')}
            className={`flex-1 h-10 touch-manipulation text-sm gap-1.5 ${activeTab === 'eligible' ? 'bg-orange-500 text-black hover:bg-orange-600' : ''}`}
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
            Sent ({sentUsers?.length || 0})
          </Button>
        </div>

        {/* Eligible Users Tab */}
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
                        className="border-white/40 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <span className="text-sm text-white">
                        {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                      </span>
                    </div>
                    {selectedUsers.size > 0 && !batchSending && (
                      <Button
                        size="sm"
                        onClick={handleSendSelected}
                        className="gap-2 h-11 touch-manipulation bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-black"
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
                    description={
                      search
                        ? 'No users match your search.'
                        : 'All eligible users have been sent the email.'
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
                          className="border-white/40 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
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

        {/* Sent Tab */}
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
                  description="Send abandoned checkout emails to see tracking data here."
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
                          {formatDistanceToNow(parseISO(u.incomplete_signup_sent_at), {
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
                          <Badge className="bg-gray-500/20 text-white text-[10px] px-1.5 border-0">
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

        {/* User Detail Sheet */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-orange-400" />
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
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
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
                      <Badge variant="outline" className="text-orange-400">
                        {selectedUser?.created_at &&
                          formatDistanceToNow(parseISO(selectedUser.created_at), {
                            addSuffix: true,
                          })}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  className="w-full h-12 touch-manipulation bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-black font-semibold"
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
                      Send Abandoned Checkout Email
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm Send All Dialog */}
        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send to all {eligibleUsers?.length || 0} eligible users?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm leading-relaxed">
                Sends the abandoned checkout email in batches of {BATCH_SIZE}. Each person only
                receives one email. Role-specific templates will be used automatically.
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
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-orange-500 hover:bg-orange-600 text-black font-semibold w-full sm:w-auto"
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

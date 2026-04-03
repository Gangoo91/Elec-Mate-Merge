import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RefreshCw,
  RotateCcw,
  Send,
  Users,
  Mail,
  Calendar,
  Loader2,
  User,
  CheckCheck,
  TestTube,
  Smartphone,
  Eye,
  FileText,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface IncompleteUser {
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

interface Stats {
  totalEligible: number;
  sent: number;
  totalAbandoned: number;
  conversions: number;
  conversionRate: string;
}

export default function AdminIncompleteSignup() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [testEmail, setTestEmail] = useState('');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IncompleteUser | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Batch state
  const [batchSending, setBatchSending] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ sent: 0, total: 0 });
  const [resetting, setResetting] = useState(false);

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-eligible'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-sent'] });
  };

  // Fetch stats
  const { data: stats } = useQuery<Stats>({
    queryKey: ['admin-incomplete-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_v3_stats' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as Stats;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  // Fetch eligible users
  const {
    data: eligibleUsers,
    isLoading: usersLoading,
    refetch,
  } = useQuery<IncompleteUser[]>({
    queryKey: ['admin-incomplete-eligible'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'get_v3_eligible' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return (data?.users || []) as IncompleteUser[];
    },
    staleTime: 30 * 1000,
  });

  // Fetch sent history
  const { data: sentUsers, isLoading: sentLoading } = useQuery<SentUser[]>({
    queryKey: ['admin-incomplete-sent'],
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

  // Send test email
  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'send_v3_test', testEmail: email },
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
      toast({ title: `Failed: ${error.message}`, variant: 'destructive' });
    },
  });

  // Send manual email
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
      refreshAll();
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Failed: ${error.message}`, variant: 'destructive' });
    },
  });

  // Reset all sent
  const resetMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'reset_sent' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({ title: `Reset ${data.reset} users — ready to re-send`, variant: 'success' });
      refreshAll();
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  // Send campaign to all
  const sendCampaign = async () => {
    setConfirmSend(false);
    setResetting(true);

    try {
      // Reset first
      const { data: resetData, error: resetError } = await supabase.functions.invoke(
        'send-incomplete-signup',
        { body: { action: 'reset_sent' } }
      );
      if (resetError) throw resetError;

      toast({
        title: `${resetData?.reset || 0} users reset — now sending...`,
        variant: 'success',
      });

      refreshAll();
      setResetting(false);

      // Now send campaign
      setBatchSending(true);
      setBatchProgress({ sent: 0, total: stats?.totalAbandoned || 108 });

      const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
        body: { action: 'send_v3_campaign' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      haptic.success();
      toast({
        title: `Sent ${data.sent || 0} emails (${data.skipped || 0} skipped)`,
        variant: 'success',
      });
    } catch (err: unknown) {
      haptic.error();
      toast({
        title: `Failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setResetting(false);
      setBatchSending(false);
      setBatchProgress({ sent: 0, total: 0 });
      refreshAll();
    }
  };

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <div className="space-y-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-amber-400" />
              Incomplete Signups
            </h2>
            <p className="text-sm text-white">
              {stats?.totalAbandoned || 108} people who bailed before completing signup
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshAll}
            className="gap-2 h-11 touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Send Controls */}
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Send className="h-4 w-4 text-amber-400" />
                Send Controls
              </span>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500/20 text-amber-400 text-[10px] border-0">
                  V8
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTestEmail(!showTestEmail)}
                  className="gap-1.5 h-9 touch-manipulation text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/10"
                >
                  <TestTube className="h-3.5 w-3.5" />
                  Test
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Campaign info */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-black text-[10px] px-2 border-0">
                    V9 Quick Question
                  </Badge>
                  <span className="text-xs text-white font-medium">Launch announcement</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  className="h-7 touch-manipulation text-xs gap-1 text-amber-400 hover:text-amber-300"
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
              </div>
              <p className="text-[11px] text-white leading-relaxed">
                "Quick question" — Personal, asks why they didn't finish, App Store free trial
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-lg font-bold text-blue-400">{stats?.totalAbandoned || 0}</p>
                <p className="text-[10px] text-white">Total</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-lg font-bold text-amber-400">{stats?.sent || 0}</p>
                <p className="text-[10px] text-white">Sent</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                <p className="text-lg font-bold text-emerald-400">{stats?.conversions || 0}</p>
                <p className="text-[10px] text-white">Converted</p>
              </div>
            </div>

            {/* Test email */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">Send Test Email (V9)</p>
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
                className="h-11 px-4 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black shrink-0"
              >
                {sendManualMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Batch progress */}
            {(batchSending || resetting) && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-sm text-amber-400 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {resetting ? 'Resetting sent users...' : 'Sending campaign...'}
                </div>
              </div>
            )}

            {/* Action buttons */}
            {!batchSending && !resetting && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  onClick={() => {
                    if (confirm('Reset all sent users so they can be re-sent?')) {
                      resetMutation.mutate();
                    }
                  }}
                  disabled={resetMutation.isPending}
                  variant="outline"
                  className="h-12 touch-manipulation text-sm font-bold rounded-xl gap-2 border-amber-500/30"
                >
                  {resetMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}
                  Reset All Sent
                </Button>
                <Button
                  onClick={() => setConfirmSend(true)}
                  disabled={batchSending}
                  className="h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send to All ({stats?.totalAbandoned || 0})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Eligible users list */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-400" />
              Eligible ({eligibleUsers?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-3">
            {usersLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : !eligibleUsers || eligibleUsers.length === 0 ? (
              <AdminEmptyState
                icon={Users}
                title="No eligible users"
                description="All incomplete signups have been sent to. Use Reset to re-enable."
              />
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {eligibleUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 touch-manipulation active:scale-[0.99] transition-transform cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-white truncate">
                        {user.full_name || user.username || 'Unknown'}
                      </p>
                      <p className="text-xs text-white truncate">{user.email}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {user.role || 'unknown'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sent history */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" />
              Sent ({sentUsers?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-3">
            {sentLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : !sentUsers || sentUsers.length === 0 ? (
              <AdminEmptyState
                icon={Mail}
                title="No emails sent yet"
                description="Send the V9 email to see results here."
              />
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {sentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-white truncate">
                        {user.full_name || user.username || 'Unknown'}
                      </p>
                      <p className="text-xs text-white">
                        Sent{' '}
                        {formatDistanceToNow(parseISO(user.incomplete_signup_v3_sent_at), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
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
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Detail Sheet */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[50vh] rounded-t-2xl p-0">
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
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Role</span>
                      <Badge variant="outline">{selectedUser?.role || 'unknown'}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white">Signed Up</span>
                      <span className="text-sm">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Confirm Send Dialog */}
        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send V9 email to all incomplete signups?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Resets all previously sent users then sends the V9 Quick Question launch
                    email to all {stats?.totalAbandoned || 108} incomplete signups.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={sendCampaign}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Reset &amp; Send to All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Preview Sheet */}
        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-3 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-amber-400" />
                  Preview: Quick Question
                  <Badge className="bg-amber-500/20 text-amber-400 text-[10px] border-0">
                    V8
                  </Badge>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-slate-900">
                <iframe
                  title="Email Preview"
                  sandbox="allow-same-origin"
                  className="w-full h-full border-0"
                  srcDoc={`<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#e2e8f0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin-bottom:8px;font-size:24px}p{color:#fff;font-size:14px;line-height:1.6;max-width:300px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}</style></head><body><div class="badge">V9 — Quick Question</div><h2>We're on the App Store.</h2><p>Send a test email to preview the full rendered template in your inbox.</p></body></html>`}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}

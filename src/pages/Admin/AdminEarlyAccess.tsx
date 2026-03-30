import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RefreshCw,
  RotateCcw,
  Send,
  Loader2,
  TestTube,
  Smartphone,
  Eye,
  FileText,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface EAStats {
  total: number;
  sent: number;
  remaining: number;
}

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [testEmail, setTestEmail] = useState('');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ['ea-stats'] });
  };

  // Stats
  const { data: stats, refetch } = useQuery<EAStats>({
    queryKey: ['ea-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'get_ea_offer_status' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as EAStats;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  // Send test
  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_ea_offer_test', testEmail: email, email_version: 'v8' },
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

  // Reset
  const resetMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'reset_ea_offer_campaign' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      toast({ title: `Reset — ${data.remaining} now eligible`, variant: 'success' });
      refreshAll();
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  // Send campaign
  const sendCampaign = async () => {
    setConfirmSend(false);
    setResetting(true);

    try {
      // Reset first
      const { data: resetData, error: resetError } = await supabase.functions.invoke(
        'send-early-access-invite',
        { body: { action: 'reset_ea_offer_campaign' } }
      );
      if (resetError) throw resetError;

      toast({
        title: `${resetData?.remaining || 0} eligible — now sending V8...`,
        variant: 'success',
      });

      setResetting(false);
      setSending(true);

      // Send in rounds of 50 until complete
      let totalSent = 0;
      let complete = false;
      while (!complete) {
        const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
          body: { action: 'send_ea_offer_campaign', email_version: 'v8' },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        complete = data.complete || false;

        toast({
          title: complete
            ? `All done! Sent ${totalSent} total.`
            : `Sent ${totalSent} so far... ${data.remaining} remaining`,
          variant: 'success',
        });
        refreshAll();

        // 5s pause between rounds
        if (!complete) {
          await new Promise((r) => setTimeout(r, 5000));
        }
      }

      haptic.success();
    } catch (err: unknown) {
      haptic.error();
      toast({
        title: `Failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setResetting(false);
      setSending(false);
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
              Early Access
            </h2>
            <p className="text-sm text-white">
              {stats?.total || 0} early signups who never created an account
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
                    V8 App Store
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
                "We're on the App Store." — Download via Apple, Apprentice £6.99/mo, Electrician £14.99/mo
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-lg font-bold text-blue-400">{stats?.total || 0}</p>
                <p className="text-[10px] text-white">Total</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-lg font-bold text-amber-400">{stats?.sent || 0}</p>
                <p className="text-[10px] text-white">Sent</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                <p className="text-lg font-bold text-emerald-400">{stats?.remaining || 0}</p>
                <p className="text-[10px] text-white">Remaining</p>
              </div>
            </div>

            {/* Test email */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">Send Test Email (V8)</p>
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
                onClick={() => {
                  if (!manualEmail) return;
                  sendTestMutation.mutate(manualEmail);
                  setManualEmail('');
                }}
                disabled={!manualEmail || sendTestMutation.isPending}
                className="h-11 px-4 touch-manipulation bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black shrink-0"
              >
                {sendTestMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Progress */}
            {(sending || resetting) && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-sm text-amber-400 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {resetting ? 'Resetting...' : 'Sending in batches of 10 with 8s pauses...'}
                </div>
              </div>
            )}

            {/* Action buttons */}
            {!sending && !resetting && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  onClick={() => {
                    if (confirm('Reset all sent emails so they can be re-sent?')) {
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
                  disabled={sending}
                  className="h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send to All ({stats?.total || 0})
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Confirm Send Dialog */}
        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send V8 App Store email to all early access signups?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Resets all previously sent, then sends the App Store launch email to
                    ~{stats?.total || 0} people who signed up but never created an account.
                  </p>
                  <p className="text-white">
                    Sends in batches of 10 with 8 second pauses between batches.
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
                  Preview: App Store Launch
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
                  srcDoc={`<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#e2e8f0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin-bottom:8px;font-size:24px}p{color:#fff;font-size:14px;line-height:1.6;max-width:300px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}</style></head><body><div class="badge">V8 — App Store Launch</div><h2>We're on the App Store.</h2><p>Send a test email to preview the full rendered template in your inbox.</p></body></html>`}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </PullToRefresh>
  );
}

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  RotateCcw,
  Send,
  Loader2,
  TestTube,
  Eye,
  FileText,
  Rocket,
  ChevronDown,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';

interface EAStats {
  total: number;
  sent: number;
  remaining: number;
}

const EMAIL_VERSION = 'v10';

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [progress, setProgress] = useState({ sent: 0, total: 0, remaining: 0 });

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ['ea-stats'] });
    queryClient.invalidateQueries({ queryKey: ['ea-tracking'] });
  };

  const {
    data: stats,
    isFetching,
    refetch,
  } = useQuery<EAStats>({
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

  const { data: trackingEvents } = useQuery({
    queryKey: ['ea-tracking'],
    queryFn: async () => {
      const { data, error } = await supabase
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .from('email_tracking_events' as any)
        .select('user_email, event_type, created_at')
        .order('created_at', { ascending: false })
        .limit(5000);
      if (error) throw error;
      return (data || []) as Array<{
        user_email: string | null;
        event_type: string;
        created_at: string;
      }>;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  // Aggregate opens/clicks across EA recipients — filter by tracking events with early_access campaign tag
  // Simpler: count unique user_emails with open/click in tracking. EA count is approximate unless
  // we cross-reference the early_access_invites table, which we skip here for speed.
  const perf = useMemo(() => {
    const openedEmails = new Set<string>();
    const clickedEmails = new Set<string>();
    (trackingEvents || []).forEach((e) => {
      if (!e.user_email) return;
      const em = e.user_email.toLowerCase();
      if (e.event_type === 'email.opened') openedEmails.add(em);
      if (e.event_type === 'email.clicked') clickedEmails.add(em);
    });
    return { opened: openedEmails.size, clicked: clickedEmails.size };
  }, [trackingEvents]);

  const sendTestMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_ea_offer_test', testEmail: email, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test sent — check your inbox', variant: 'success' });
      setTestEmail('');
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Test send failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'send_ea_offer_manual', manualEmail: email, email_version: EMAIL_VERSION },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      toast({ title: 'V10 sent to that address', variant: 'success' });
      setManualEmail('');
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Send failed: ${error.message}`, variant: 'destructive' });
    },
  });

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
      toast({
        title: `Reset — ${data.remaining ?? data.reset ?? 0} now eligible`,
        variant: 'success',
      });
      refreshAll();
    },
    onError: (error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendCampaign = async () => {
    setConfirmSend(false);
    setSending(true);
    setProgress({ sent: 0, total: stats?.remaining || stats?.total || 0, remaining: 0 });

    try {
      let totalSent = 0;
      let complete = false;
      while (!complete) {
        const { data, error } = await supabase.functions.invoke('send-early-access-invite', {
          body: { action: 'send_ea_offer_campaign', email_version: EMAIL_VERSION },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        totalSent += data.sent || 0;
        complete = data.complete || false;
        setProgress({
          sent: totalSent,
          total: totalSent + (data.remaining || 0),
          remaining: data.remaining || 0,
        });

        if (!complete) await new Promise((r) => setTimeout(r, 2000));
      }

      haptic.success();
      toast({
        title: `All done — sent ${totalSent} V10 emails`,
        variant: 'success',
      });
      refreshAll();
    } catch (err: unknown) {
      haptic.error();
      toast({
        title: `Send failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const handleResetAndSend = async () => {
    setConfirmSend(false);
    setResetting(true);
    try {
      const { error: resetErr } = await supabase.functions.invoke('send-early-access-invite', {
        body: { action: 'reset_ea_offer_campaign' },
      });
      if (resetErr) throw resetErr;
      setResetting(false);
      await sendCampaign();
    } catch (err: unknown) {
      setResetting(false);
      haptic.error();
      toast({
        title: `Reset-and-send failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  const total = stats?.total || 0;
  const sent = stats?.sent || 0;
  const remaining = stats?.remaining || 0;
  const openRate = sent > 0 ? Math.round((perf.opened / sent) * 100) : 0;
  const clickRate = sent > 0 ? Math.round((perf.clicked / sent) * 100) : 0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-24">
        <AdminPageHeader
          title="Early Access"
          subtitle={`${total} waitlist signups — send V10 to anyone who hasn't converted`}
          icon={Rocket}
          iconColor="text-violet-400"
          iconBg="bg-violet-500/10 border-violet-500/20"
          accentColor="from-violet-500 via-purple-400 to-violet-500"
          onRefresh={refreshAll}
          isRefreshing={isFetching}
        />

        {/* Campaign hero */}
        <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-purple-500/5 overflow-hidden">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Badge className="bg-amber-500 text-black text-[10px] px-2 border-0 shrink-0 font-bold">
                  V10
                </Badge>
                <p className="text-sm font-semibold text-white truncate">We&apos;ve shipped.</p>
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
                Early access signups only · £9.99/mo via Stripe · saves £5 vs App Store
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test send — always visible */}
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
            value={sent}
            sub={null}
            colorClass="text-blue-400 bg-blue-500/10 border-blue-500/20"
          />
          <StatTile
            label="Opened"
            value={perf.opened}
            sub={sent > 0 ? `${openRate}%` : null}
            colorClass="text-green-400 bg-green-500/10 border-green-500/20"
          />
          <StatTile
            label="Clicked"
            value={perf.clicked}
            sub={sent > 0 ? `${clickRate}%` : null}
            colorClass="text-violet-400 bg-violet-500/10 border-violet-500/20"
          />
          <StatTile
            label="Remaining"
            value={remaining}
            sub={null}
            colorClass="text-amber-400 bg-amber-500/10 border-amber-500/20"
          />
        </div>

        {/* Segment tile */}
        <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/5">
          <CardContent className="pt-4 pb-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">
                  Waitlist signups &mdash; haven&apos;t converted
                </p>
                <p className="text-[11px] text-white/60 leading-tight mt-0.5">
                  Joined early access, never created an account. Non-bounced, unsent.
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white leading-none">{remaining}</p>
                <p className="text-[10px] text-white/60 mt-0.5">eligible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Send progress */}
        {sending && (
          <Card className="border-violet-500/30 bg-violet-500/5">
            <CardContent className="pt-4 pb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-violet-400 font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending V10 in batches of 100
                </span>
                <span className="text-white">
                  {progress.sent}/{progress.total}
                </span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.total > 0 ? (progress.sent / progress.total) * 100 : 0}%`,
                  }}
                />
              </div>
              {progress.remaining > 0 && (
                <p className="text-xs text-white/60">{progress.remaining} remaining</p>
              )}
            </CardContent>
          </Card>
        )}

        {resetting && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="pt-4 pb-4">
              <p className="flex items-center gap-2 text-sm text-amber-400 font-semibold">
                <Loader2 className="h-4 w-4 animate-spin" />
                Resetting previously sent...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Primary action area — adapts to state */}
        {!sending && !resetting && remaining > 0 && (
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Button
              onClick={sendCampaign}
              className="h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-2"
            >
              <Send className="h-4 w-4" />
              Send V10 to {remaining}
            </Button>
            {sent > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  if (
                    confirm(
                      `Reset all ${sent} previously sent users? They'll become eligible to receive V10 again.`
                    )
                  ) {
                    resetMutation.mutate();
                  }
                }}
                disabled={resetMutation.isPending}
                className="h-12 touch-manipulation text-sm font-semibold border-white/20 hover:bg-white/5 gap-2 px-4"
              >
                {resetMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Reset
              </Button>
            )}
          </div>
        )}

        {!sending && !resetting && remaining === 0 && total > 0 && (
          <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5">
            <CardContent className="pt-4 pb-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
                  <RotateCcw className="h-5 w-5 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white leading-tight">
                    All {sent} have been sent
                  </p>
                  <p className="text-[11px] text-white/70 leading-tight mt-0.5">
                    Reset everyone to re-send V10.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (
                      confirm(
                        `Reset all ${sent} previously sent users? They'll all become eligible to receive V10 again.`
                      )
                    ) {
                      resetMutation.mutate();
                    }
                  }}
                  disabled={resetMutation.isPending}
                  className="h-12 touch-manipulation text-sm font-semibold border-white/20 hover:bg-white/5 gap-2"
                >
                  {resetMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}
                  Reset all
                </Button>
                <Button
                  onClick={() => setConfirmSend(true)}
                  disabled={sending || resetting}
                  className="h-12 touch-manipulation text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black rounded-xl gap-2"
                >
                  <Send className="h-4 w-4" />
                  Reset &amp; send
                </Button>
              </div>
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
                    Full send without marking anyone in the waitlist as sent. For individual sends
                    outside the bulk campaign.
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

                {sent > 0 && (
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Reset all ${sent} sent so they can be re-sent?`)) {
                          resetMutation.mutate();
                        }
                      }}
                      disabled={resetMutation.isPending}
                      className="w-full h-11 text-xs touch-manipulation gap-1.5"
                    >
                      {resetMutation.isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <RotateCcw className="h-3.5 w-3.5" />
                      )}
                      Reset all sent ({sent})
                    </Button>
                    <Button
                      onClick={() => setConfirmSend(true)}
                      disabled={sending || resetting}
                      className="w-full h-11 text-xs touch-manipulation gap-1.5 bg-amber-500/80 hover:bg-amber-500 text-black"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset &amp; send to all ({total})
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Confirm reset-and-send */}
        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Reset all sent and re-send V10 to ~{total} signups?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Clears sent flags on all non-bounced invites, then sends V10 to everyone who
                    hasn&apos;t converted to a full account.
                  </p>
                  <p className="text-white/70 text-xs">
                    Uses Resend batch API (up to 100 per call), with suppression check, idempotency,
                    and exponential-backoff retries.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleResetAndSend}
                className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" />
                Reset &amp; send
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
                  V10 Preview — Early Access
                  <Badge className="bg-amber-500/20 text-amber-400 text-[10px] border-0">V10</Badge>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-black">
                <iframe
                  title="V10 email preview"
                  sandbox="allow-same-origin"
                  className="w-full h-full border-0"
                  srcDoc={`<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#e2e8f0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin:12px 0 8px;font-size:28px;letter-spacing:-0.5px}p{color:#a1a1aa;font-size:14px;line-height:1.6;max-width:320px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}.price{font-size:36px;color:#fff;font-weight:700;margin-top:18px;letter-spacing:-1px}.mut{color:#52525b;font-size:12px;margin-top:8px}</style></head><body><div class="badge">V10 · Early Access</div><h2>We've shipped.</h2><p>Same V10 template as Winback, tweaked intro for early-access signups. 6 features, testimonial, 3 real stats, founder signature.</p><div class="price">£9.99<span style="font-size:14px;color:#a1a1aa;font-weight:400">/mo</span></div><p class="mut">Send a test email at the top to preview the full rendered template.</p></body></html>`}
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

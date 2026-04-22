import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RefreshCw, Send, Loader2, Eye, RotateCcw, ChevronDown } from 'lucide-react';
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
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  Divider,
  Eyebrow,
} from '@/components/admin/editorial';

interface EAStats {
  total: number;
  sent: number;
  remaining: number;
}

const EMAIL_VERSION = 'v10';

type TabValue = 'overview' | 'advanced';

export default function AdminEarlyAccess() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('overview');
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
    isLoading,
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

  const recentActivity = useMemo(() => {
    const map = new Map<
      string,
      { email: string; event: string; at: string }
    >();
    (trackingEvents || []).slice(0, 40).forEach((e) => {
      if (!e.user_email) return;
      const key = `${e.user_email.toLowerCase()}::${e.event_type}`;
      if (!map.has(key)) {
        map.set(key, {
          email: e.user_email,
          event: e.event_type,
          at: e.created_at,
        });
      }
    });
    return Array.from(map.values()).slice(0, 12);
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

  const eventTone = (event: string) => {
    if (event === 'email.opened') return 'emerald' as const;
    if (event === 'email.clicked') return 'cyan' as const;
    if (event === 'email.bounced') return 'red' as const;
    if (event === 'email.delivered') return 'blue' as const;
    return 'yellow' as const;
  };

  const eventLabel = (event: string) =>
    event.replace('email.', '').replace(/^\w/, (c) => c.toUpperCase());

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const mins = Math.round(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.round(hrs / 24);
    return `${days}d ago`;
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
          title="Early Access"
          description="Users with early access to upcoming features."
          tone="cyan"
          actions={
            <IconButton
              onClick={() => {
                refreshAll();
                refetch();
              }}
              aria-label="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            <StatStrip
              columns={4}
              stats={[
                { label: 'Total', value: total },
                { label: 'This Week', value: perf.opened, tone: 'cyan' },
                { label: 'Active', value: sent, tone: 'emerald' },
                { label: 'Features Live', value: remaining, accent: true },
              ]}
            />

            <FilterBar
              tabs={[
                { value: 'overview', label: 'Overview' },
                { value: 'advanced', label: 'Advanced' },
              ]}
              activeTab={activeTab}
              onTabChange={(v) => setActiveTab(v as TabValue)}
              search={testEmail}
              onSearchChange={setTestEmail}
              searchPlaceholder="Enter email for test send…"
              actions={
                <button
                  onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                  disabled={!testEmail || sendTestMutation.isPending}
                  className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50"
                >
                  {sendTestMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin inline" />
                  ) : (
                    'Grant Access'
                  )}
                </button>
              }
            />

            {activeTab === 'overview' && (
              <>
                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Early Access Users"
                    meta={<Pill tone="cyan">{sent}</Pill>}
                    action="Preview email"
                    onAction={() => setShowPreview(true)}
                  />
                  {recentActivity.length === 0 ? (
                    <div className="px-5 sm:px-6 py-10">
                      <EmptyState
                        title="No activity yet"
                        description="Once V10 is sent, opens and clicks will appear here."
                      />
                    </div>
                  ) : (
                    <ListBody>
                      {recentActivity.map((a, i) => {
                        const initials = a.email
                          .split('@')[0]
                          .slice(0, 2)
                          .toUpperCase();
                        return (
                          <ListRow
                            key={`${a.email}-${a.event}-${i}`}
                            lead={
                              <div className="h-9 w-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[11px] font-semibold text-white">
                                {initials}
                              </div>
                            }
                            title={a.email}
                            subtitle={formatTime(a.at)}
                            trailing={
                              <Pill tone={eventTone(a.event)}>{eventLabel(a.event)}</Pill>
                            }
                          />
                        );
                      })}
                    </ListBody>
                  )}
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Features"
                    meta={<Pill tone="cyan">{EMAIL_VERSION.toUpperCase()}</Pill>}
                  />
                  <ListBody>
                    <ListRow
                      title="V10 Early Access Invite"
                      subtitle="Full-send template — £9.99/mo via Stripe, saves £5 vs App Store"
                      trailing={<Pill tone="cyan">{remaining}</Pill>}
                    />
                    <ListRow
                      title="Open-rate tracking"
                      subtitle="Resend webhook → email_tracking_events"
                      trailing={<Pill tone="emerald">{openRate}%</Pill>}
                    />
                    <ListRow
                      title="Click-through tracking"
                      subtitle="Unique clickers across all campaigns"
                      trailing={<Pill tone="cyan">{clickRate}%</Pill>}
                    />
                    <ListRow
                      title="Waitlist eligible"
                      subtitle="Signed up, not yet converted, non-bounced"
                      trailing={<Pill tone="yellow">{remaining}</Pill>}
                    />
                  </ListBody>
                </ListCard>

                {sending && (
                  <ListCard>
                    <ListCardHeader
                      tone="cyan"
                      title="Sending V10 in batches of 100"
                      meta={
                        <Pill tone="cyan">
                          {progress.sent}/{progress.total}
                        </Pill>
                      }
                    />
                    <div className="px-5 sm:px-6 py-4">
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-elec-yellow rounded-full transition-all duration-500"
                          style={{
                            width: `${progress.total > 0 ? (progress.sent / progress.total) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      {progress.remaining > 0 && (
                        <p className="mt-3 text-[11px] text-white">
                          {progress.remaining} remaining
                        </p>
                      )}
                    </div>
                  </ListCard>
                )}

                {resetting && (
                  <ListCard>
                    <div className="px-5 sm:px-6 py-4 flex items-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                      <span className="text-[13px] text-white font-medium">
                        Resetting previously sent…
                      </span>
                    </div>
                  </ListCard>
                )}

                {!sending && !resetting && remaining > 0 && (
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <button
                      onClick={sendCampaign}
                      className="h-12 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send V10 to {remaining}
                    </button>
                    {sent > 0 && (
                      <button
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
                        className="h-12 px-5 rounded-full bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {resetMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RotateCcw className="h-4 w-4" />
                        )}
                        Reset
                      </button>
                    )}
                  </div>
                )}

                {!sending && !resetting && remaining === 0 && total > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="yellow"
                      title={`All ${sent} have been sent`}
                      meta={<Pill tone="yellow">Complete</Pill>}
                    />
                    <div className="px-5 sm:px-6 py-5 space-y-3">
                      <p className="text-[13px] text-white">
                        Reset everyone to re-send V10, or run reset-and-send in one action.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
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
                          className="h-11 rounded-full bg-[hsl(0_0%_15%)] border border-white/[0.08] text-white text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {resetMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RotateCcw className="h-4 w-4" />
                          )}
                          Reset all
                        </button>
                        <button
                          onClick={() => setConfirmSend(true)}
                          disabled={sending || resetting}
                          className="h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Send className="h-4 w-4" />
                          Reset &amp; send
                        </button>
                      </div>
                    </div>
                  </ListCard>
                )}
              </>
            )}

            {activeTab === 'advanced' && (
              <>
                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Manual send"
                    meta={<Pill tone="cyan">V10</Pill>}
                  />
                  <div className="px-5 sm:px-6 py-5 space-y-3">
                    <div>
                      <Eyebrow>Target address</Eyebrow>
                      <p className="mt-2 text-[12.5px] text-white leading-relaxed">
                        Full send without marking anyone in the waitlist as sent. For individual
                        sends outside the bulk campaign.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={manualEmail}
                        onChange={(e) => setManualEmail(e.target.value)}
                        placeholder="recipient@example.com"
                        className="h-11 px-4 flex-1 bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                      />
                      <button
                        onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                        disabled={!manualEmail || sendManualMutation.isPending}
                        className="h-11 px-5 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {sendManualMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </ListCard>

                <Divider label="Campaign controls" />

                <ListCard>
                  <ListCardHeader
                    tone="yellow"
                    title="Bulk actions"
                    meta={<Pill tone="yellow">{total} signups</Pill>}
                  />
                  <ListBody>
                    <ListRow
                      title="Reset all sent"
                      subtitle={`Clears sent flags on ${sent} recipients — makes them eligible again`}
                      trailing={
                        <button
                          onClick={() => {
                            if (confirm(`Reset all ${sent} sent so they can be re-sent?`)) {
                              resetMutation.mutate();
                            }
                          }}
                          disabled={resetMutation.isPending || sent === 0}
                          className="h-9 px-4 rounded-full bg-[hsl(0_0%_15%)] border border-white/[0.08] text-white text-[12px] font-semibold touch-manipulation inline-flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {resetMutation.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <RotateCcw className="h-3.5 w-3.5" />
                          )}
                          Reset
                        </button>
                      }
                    />
                    <ListRow
                      title="Reset & send to all"
                      subtitle={`Re-sends V10 to all ${total} signups who haven't converted`}
                      trailing={
                        <button
                          onClick={() => setConfirmSend(true)}
                          disabled={sending || resetting}
                          className="h-9 px-4 rounded-full bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation inline-flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Run
                        </button>
                      }
                    />
                    <ListRow
                      title="Preview email"
                      subtitle="Open the V10 template in a bottom sheet"
                      trailing={
                        <button
                          onClick={() => setShowPreview(true)}
                          className="h-9 px-4 rounded-full bg-[hsl(0_0%_15%)] border border-white/[0.08] text-white text-[12px] font-semibold touch-manipulation inline-flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      }
                    />
                  </ListBody>
                </ListCard>
              </>
            )}
          </>
        )}

        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6 bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight text-white">
                Reset all sent and re-send V10 to ~{total} signups?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    Clears sent flags on all non-bounced invites, then sends V10 to everyone who
                    hasn&apos;t converted to a full account.
                  </p>
                  <p className="text-white text-xs">
                    Uses Resend batch API (up to 100 per call), with suppression check,
                    idempotency, and exponential-backoff retries.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-2">
              <AlertDialogCancel className="h-11 touch-manipulation text-sm w-full sm:w-auto mt-0 rounded-full bg-[hsl(0_0%_15%)] border-white/[0.08] text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleResetAndSend}
                className="h-11 touch-manipulation text-sm bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold w-full sm:w-auto rounded-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Reset &amp; send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_12%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-3 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-2 text-sm text-white">
                  V10 Preview — Early Access
                  <Pill tone="cyan">V10</Pill>
                  <ChevronDown className="h-3.5 w-3.5 text-white ml-auto" />
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-black">
                <iframe
                  title="V10 email preview"
                  sandbox="allow-same-origin"
                  className="w-full h-full border-0"
                  srcDoc={`<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#ffffff;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin:12px 0 8px;font-size:28px;letter-spacing:-0.5px}p{color:#ffffff;font-size:14px;line-height:1.6;max-width:320px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:#fbbf24;border-radius:20px;font-size:11px;font-weight:800;color:#000000;text-transform:uppercase;letter-spacing:0.5px}.price{font-size:36px;color:#fff;font-weight:700;margin-top:18px;letter-spacing:-1px}.mut{color:#ffffff;font-size:12px;margin-top:8px}</style></head><body><div class="badge">V10 · Early Access</div><h2>We've shipped.</h2><p>Same V10 template as Winback, tweaked intro for early-access signups. 6 features, testimonial, 3 real stats, founder signature.</p><div class="price">£9.99<span style="font-size:14px;color:#ffffff;font-weight:400">/mo</span></div><p class="mut">Send a test email at the top to preview the full rendered template.</p></body></html>`}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}

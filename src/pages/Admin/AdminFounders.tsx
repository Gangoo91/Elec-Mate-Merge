import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
import { Input } from '@/components/ui/input';
import { RefreshCw, Loader2, Play, Pause, Send, Timer, RotateCcw, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PullToRefresh from '@/components/admin/PullToRefresh';
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
  Avatar,
  Pill,
  IconButton,
  LoadingBlocks,
  EmptyState,
  TextAction,
} from '@/components/admin/editorial';

interface CampaignStatus {
  totalProspects: number;
  sent: number;
  remaining: number;
  sentEmails: string[];
  remainingEmails: string[];
}

function getInitials(email: string) {
  const name = email.split('@')[0];
  const parts = name.split(/[._-]/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function AdminFounders() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [isSending, setIsSending] = useState(false);
  const [showProspectList, setShowProspectList] = useState(false);
  const [confirmSendBatch, setConfirmSendBatch] = useState(false);
  const [confirmSendTest, setConfirmSendTest] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [autoSending, setAutoSending] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'remaining'>('all');
  const [search, setSearch] = useState('');
  const [lastBatchResult, setLastBatchResult] = useState<{
    sent: number;
    failed: number;
    remaining: number;
    sentEmails?: string[];
    errors?: string[];
  } | null>(null);

  const {
    data: status,
    isLoading,
    refetch,
  } = useQuery<CampaignStatus>({
    queryKey: ['founder-final-push-status'],
    refetchInterval: isSending ? 3000 : 30000,
    staleTime: 0,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'get_status' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'send_test', testEmail: 'founder@elec-mate.com' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      haptic.success();
      setConfirmSendTest(false);
      toast({
        title: 'Test email sent!',
        description: 'Check founder@elec-mate.com inbox',
      });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const sendInviteMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data: createData, error: createError } = await supabase.functions.invoke(
        'send-founder-invite',
        { body: { action: 'bulk_create', emails: [email] } }
      );
      if (createError) throw createError;
      if (createData?.error) throw new Error(createData.error);

      const { data: listData, error: listError } = await supabase.functions.invoke(
        'send-founder-invite',
        { body: { action: 'list' } }
      );
      if (listError) throw listError;
      const invite = listData?.invites?.find(
        (i: { email: string }) => i.email === email.trim().toLowerCase()
      );
      if (!invite) throw new Error('Invite created but could not find it to send');

      const { data: sendData, error: sendError } = await supabase.functions.invoke(
        'send-founder-invite',
        { body: { action: 'send_invite', inviteId: invite.id } }
      );
      if (sendError) throw sendError;
      if (sendData?.error) throw new Error(sendData.error);

      return sendData;
    },
    onSuccess: (data) => {
      haptic.success();
      setInviteEmail('');
      toast({
        title: 'Founder invite sent!',
        description: `Email sent to ${data.email}`,
      });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({
        title: 'Failed to send invite',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const sendBatchMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'send_batch', batchSize: 7 },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['founder-final-push-status'] });
      setLastBatchResult(data);

      if (data.remaining > 0) {
        toast({
          title: `Batch sent! (${data.sent} emails)`,
          description: `${data.remaining} remaining — next batch in 10s`,
        });
        if (autoSending) {
          setCountdown(10);
        }
      } else {
        setIsSending(false);
        setAutoSending(false);
        setCountdown(0);
        toast({
          title: 'All emails sent!',
          description: `Campaign complete - all emails delivered`,
        });
      }
    },
    onError: (error: Error) => {
      haptic.error();
      setIsSending(false);
      setAutoSending(false);
      setCountdown(0);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            countdownRef.current = null;
            sendBatchMutation.mutate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [countdown > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetCampaignMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('founder-final-push', {
        body: { action: 'reset_campaign' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: (data) => {
      haptic.success();
      setConfirmReset(false);
      setLastBatchResult(null);
      queryClient.invalidateQueries({ queryKey: ['founder-final-push-status'] });
      toast({
        title: 'Campaign reset!',
        description: `${data.reset} invites ready to re-send`,
      });
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const handleStartCampaign = () => {
    setConfirmSendBatch(false);
    setIsSending(true);
    setAutoSending(true);
    sendBatchMutation.mutate();
  };

  const handleSendNextBatch = () => {
    sendBatchMutation.mutate();
  };

  const handlePause = () => {
    setIsSending(false);
    setAutoSending(false);
    setCountdown(0);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const totalProspects = status?.totalProspects || 0;
  const sentCount = status?.sent || 0;
  const remainingCount = status?.remaining || 0;
  const progressPercent = totalProspects > 0 ? Math.round((sentCount / totalProspects) * 100) : 0;

  const sentEmails = status?.sentEmails ?? [];
  const remainingEmails = status?.remainingEmails ?? [];

  const filteredList = (() => {
    const base =
      activeTab === 'sent'
        ? sentEmails.map((e) => ({ email: e, status: 'sent' as const }))
        : activeTab === 'remaining'
          ? remainingEmails.map((e) => ({ email: e, status: 'remaining' as const }))
          : [
              ...sentEmails.map((e) => ({ email: e, status: 'sent' as const })),
              ...remainingEmails.map((e) => ({ email: e, status: 'remaining' as const })),
            ];
    if (!search.trim()) return base;
    const q = search.trim().toLowerCase();
    return base.filter((x) => x.email.toLowerCase().includes(q));
  })();

  const previewList = filteredList.slice(0, 8);

  const perks = [
    { title: 'Lifetime price lock', sub: '£3.99/month forever — never changes' },
    { title: 'Full platform access', sub: 'Inspection & testing, quotes, invoices' },
    { title: 'AI-powered features', sub: 'Circuit designer, cost engineer, health & safety' },
    { title: 'Elec-ID verification', sub: 'Stand out to employers and clients' },
    { title: 'Study centre', sub: 'Level 2, 3 and upskilling courses' },
    { title: 'Employer Hub access', sub: 'Worth £39.99/month on its own' },
  ];

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Community"
          title="Founders"
          description="Lifetime founder subscribers — tap to manage perks."
          tone="yellow"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
                { label: 'Total Founders', value: totalProspects, accent: true },
                { label: 'Active', value: sentCount, tone: 'emerald' },
                { label: 'New This Month', value: sentCount, tone: 'green' },
                {
                  label: 'Lifetime Revenue',
                  value: `£${(sentCount * 3.99).toFixed(2)}`,
                  sub: `${progressPercent}% activated`,
                },
              ]}
            />

            <FilterBar
              tabs={[
                { value: 'all', label: 'All', count: sentEmails.length + remainingEmails.length },
                { value: 'sent', label: 'Active', count: sentEmails.length },
                { value: 'remaining', label: 'Pending', count: remainingEmails.length },
              ]}
              activeTab={activeTab}
              onTabChange={(v) => setActiveTab(v as 'all' | 'sent' | 'remaining')}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search founders…"
            />

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Founders"
                meta={<Pill tone="yellow">{filteredList.length}</Pill>}
                action="View all"
                onAction={() => setShowProspectList(true)}
              />
              <ListBody>
                {previewList.length === 0 ? (
                  <div className="px-5 py-10">
                    <EmptyState
                      title="No founders yet"
                      description="Prospects will appear here once invites are created."
                    />
                  </div>
                ) : (
                  previewList.map((p, i) => (
                    <ListRow
                      key={`${p.email}-${i}`}
                      lead={<Avatar initials={getInitials(p.email)} online={p.status === 'sent'} />}
                      title={p.email.split('@')[0]}
                      subtitle={`${p.email} · ${p.status === 'sent' ? 'Activated' : 'Pending invite'}`}
                      trailing={
                        <>
                          <Pill tone="yellow">Founder</Pill>
                          <span className="text-[11px] text-white tabular-nums">£3.99</span>
                        </>
                      }
                      onClick={() => setShowProspectList(true)}
                    />
                  ))
                )}
              </ListBody>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Perks & benefits"
                meta={<Pill tone="yellow">{perks.length}</Pill>}
              />
              <ListBody>
                {perks.map((perk, i) => (
                  <ListRow
                    key={i}
                    lead={
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[11px] font-semibold text-white tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    }
                    title={perk.title}
                    subtitle={perk.sub}
                  />
                ))}
              </ListBody>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Send individual invite"
                meta={<Pill tone="emerald">£3.99</Pill>}
              />
              <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-3">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inviteEmail.trim() && inviteEmail.includes('@')) {
                      sendInviteMutation.mutate(inviteEmail.trim());
                    }
                  }}
                  className="h-11 text-[13px] bg-[hsl(0_0%_10%)] border-white/[0.08] text-white placeholder:text-white rounded-full px-4 touch-manipulation focus-visible:border-elec-yellow/60 focus-visible:ring-0"
                  disabled={sendInviteMutation.isPending}
                />
                <button
                  onClick={() => sendInviteMutation.mutate(inviteEmail.trim())}
                  disabled={
                    sendInviteMutation.isPending ||
                    !inviteEmail.trim() ||
                    !inviteEmail.includes('@')
                  }
                  className="w-full h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {sendInviteMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send founder invite
                </button>
              </div>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Batch campaign"
                meta={
                  <Pill tone={remainingCount > 0 ? 'yellow' : 'emerald'}>
                    {remainingCount > 0 ? `${remainingCount} left` : 'Complete'}
                  </Pill>
                }
              />
              <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-3">
                <div className="flex items-center justify-between text-[12px] text-white">
                  <span>Progress</span>
                  <span className="tabular-nums font-semibold">{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-elec-yellow transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {remainingCount > 0 ? (
                  <div className="space-y-2 pt-1">
                    {!isSending ? (
                      <button
                        onClick={() => setConfirmSendBatch(true)}
                        className="w-full h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        {sentCount > 0 ? 'Continue sending' : 'Start auto-send'}
                      </button>
                    ) : (
                      <>
                        {sendBatchMutation.isPending ? (
                          <div className="w-full h-11 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending batch…
                          </div>
                        ) : countdown > 0 ? (
                          <div className="w-full h-11 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-2">
                            <Timer className="h-4 w-4" />
                            Next batch in {countdown}s
                          </div>
                        ) : (
                          <button
                            onClick={handleSendNextBatch}
                            className="w-full h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Send next 7
                          </button>
                        )}
                        <button
                          onClick={handlePause}
                          disabled={sendBatchMutation.isPending}
                          className="w-full h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Pause className="h-4 w-4" />
                          Pause
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="pt-1 space-y-2">
                    <div className="text-[12px] text-white text-center py-2">
                      All {totalProspects} invites delivered.
                    </div>
                    <button
                      onClick={() => setConfirmReset(true)}
                      disabled={resetCampaignMutation.isPending}
                      className="w-full h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[13px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {resetCampaignMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RotateCcw className="h-4 w-4" />
                      )}
                      Reset & resend all
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-[13px] text-white font-medium">Test email</div>
                    <div className="text-[11.5px] text-white">
                      Preview before sending to the batch
                    </div>
                  </div>
                  <TextAction onClick={() => setConfirmSendTest(true)}>Send test →</TextAction>
                </div>
              </div>
            </ListCard>

            {lastBatchResult && (
              <ListCard>
                <ListCardHeader
                  tone={lastBatchResult.failed > 0 ? 'orange' : 'emerald'}
                  title="Last batch"
                  meta={
                    <Pill tone={lastBatchResult.failed > 0 ? 'orange' : 'emerald'}>
                      {lastBatchResult.sent} sent
                      {lastBatchResult.failed > 0 && ` · ${lastBatchResult.failed} failed`}
                    </Pill>
                  }
                />
                <ListBody>
                  {lastBatchResult.sentEmails?.map((email, i) => (
                    <ListRow
                      key={`sent-${i}`}
                      lead={<Avatar initials={getInitials(email)} size="sm" online />}
                      title={email}
                      trailing={<Pill tone="emerald">Sent</Pill>}
                    />
                  ))}
                  {lastBatchResult.errors?.map((err, i) => (
                    <ListRow
                      key={`err-${i}`}
                      title={err}
                      trailing={<Pill tone="red">Failed</Pill>}
                      accent="red"
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}
          </>
        )}

        <Sheet open={showProspectList} onOpenChange={setShowProspectList}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-3xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-6 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-white flex items-center gap-2">
                  All {totalProspects} founders
                  <Pill tone="yellow">{totalProspects}</Pill>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {sentEmails.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="emerald"
                      title="Active"
                      meta={<Pill tone="emerald">{sentEmails.length}</Pill>}
                    />
                    <ListBody>
                      {sentEmails.map((email, i) => (
                        <ListRow
                          key={`s-${i}`}
                          lead={<Avatar initials={getInitials(email)} size="sm" online />}
                          title={email.split('@')[0]}
                          subtitle={email}
                          trailing={<Pill tone="emerald">Founder</Pill>}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {remainingEmails.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="amber"
                      title="Pending"
                      meta={<Pill tone="amber">{remainingEmails.length}</Pill>}
                    />
                    <ListBody>
                      {remainingEmails.map((email, i) => (
                        <ListRow
                          key={`r-${i}`}
                          lead={<Avatar initials={getInitials(email)} size="sm" online={false} />}
                          title={email.split('@')[0]}
                          subtitle={email}
                          trailing={<Pill tone="amber">Pending</Pill>}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}

                {sentEmails.length === 0 && remainingEmails.length === 0 && (
                  <EmptyState
                    title="No prospects"
                    description="Founder invites will appear here once created."
                  />
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmSendBatch} onOpenChange={setConfirmSendBatch}>
          <AlertDialogContent className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Start campaign?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will send emails to {remainingCount} prospects in batches of 7 with a 10-second
                pause between each batch. You can pause at any time.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-full bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-full bg-elec-yellow text-black font-semibold"
                onClick={handleStartCampaign}
              >
                <Play className="h-4 w-4 mr-2" />
                Start sending
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
          <AlertDialogContent className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Reset campaign?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will reset all sent flags so every prospect receives the email again. People
                who already have accounts will still be filtered out automatically.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation rounded-full bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-full bg-elec-yellow text-black font-semibold"
                onClick={() => resetCampaignMutation.mutate()}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset & resend
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={confirmSendTest} onOpenChange={setConfirmSendTest}>
          <AlertDialogContent className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Send test email?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will send a test email to founder@elec-mate.com so you can preview how it
                looks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="h-11 touch-manipulation rounded-full bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]"
                disabled={sendTestMutation.isPending}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation rounded-full bg-elec-yellow text-black font-semibold"
                onClick={() => sendTestMutation.mutate()}
                disabled={sendTestMutation.isPending}
              >
                {sendTestMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send test
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>
    </PullToRefresh>
  );
}

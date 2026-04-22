import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow, parseISO, format, differenceInDays } from 'date-fns';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { useHaptic } from '@/hooks/useHaptic';
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
  Eyebrow,
  Divider,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
} from '@/components/admin/editorial';
import { RefreshCw, Send, Loader2, Mail, Eye, RotateCcw } from 'lucide-react';

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

function getInitials(name: string | null | undefined, fallback = '?') {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminApprenticeCampaigns() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'older'>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<EligibleUser | null>(null);
  const [confirmSendAll, setConfirmSendAll] = useState(false);
  const [showSentHistory, setShowSentHistory] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [emailVersion, setEmailVersion] = useState<EmailVersion>('v3');

  const campaignType = 'trial_winback' as const;

  const { data: stats, isLoading: statsLoading, isFetching: statsFetching, refetch } = useQuery({
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

  const filteredUsers = useMemo<EligibleUser[]>(() => {
    if (!eligibleUsers) return [];
    let list = eligibleUsers as EligibleUser[];

    if (activeTab !== 'all') {
      list = list.filter((u) => {
        const days = differenceInDays(new Date(), parseISO(u.created_at));
        const lapsed = Math.max(0, days - 7);
        if (activeTab === 'recent') return lapsed <= 30;
        if (activeTab === 'older') return lapsed > 30;
        return true;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.username?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [eligibleUsers, search, activeTab]);

  const tabCounts = useMemo(() => {
    const all = (eligibleUsers ?? []) as EligibleUser[];
    const recent = all.filter((u) => {
      const lapsed = Math.max(0, differenceInDays(new Date(), parseISO(u.created_at)) - 7);
      return lapsed <= 30;
    }).length;
    return { all: all.length, recent, older: all.length - recent };
  }, [eligibleUsers]);

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
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  const handleSendSelected = () => {
    if (selectedUsers.size > 0) {
      setConfirmSendAll(true);
    }
  };

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

  const totalEligible = stats?.totalEligible ?? 0;
  const offersSent = stats?.offersSent ?? 0;
  const conversions = stats?.conversions ?? 0;
  const conversionRate = stats?.conversionRate ?? 0;

  return (
    <PullToRefresh
      onRefresh={async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-stats'] }),
          queryClient.invalidateQueries({ queryKey: ['apprentice-campaign-eligible'] }),
        ]);
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Campaigns"
          title="Apprentice Campaigns"
          description="Targeted outreach to Level 2 & 3 apprentices."
          tone="blue"
          actions={
            <IconButton
              onClick={() => refetch()}
              disabled={statsFetching}
              aria-label="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${statsFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Apprentices', value: statsLoading ? '…' : totalEligible },
            { label: 'Active', value: statsLoading ? '…' : Math.max(0, totalEligible - offersSent), tone: 'emerald' },
            { label: 'Campaigns Sent', value: statsLoading ? '…' : offersSent, tone: 'blue' },
            { label: 'Conversion', value: statsLoading ? '…' : `${conversionRate}`, sub: `${conversions} converted`, accent: true },
          ]}
        />

        {usersLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            {dateRange && (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-4 sm:py-5">
                <Eyebrow>Audience window</Eyebrow>
                <p className="mt-2 text-[13px] sm:text-sm text-white leading-relaxed">
                  <span className="font-semibold">{totalEligible} apprentices</span> signed up between{' '}
                  {dateRange.earliest} – {dateRange.latest} and didn't subscribe after their 7-day trial.{' '}
                  {offersSent === 0
                    ? 'None have been contacted yet.'
                    : `${offersSent} have been contacted so far.`}
                </p>
              </div>
            )}

            <FilterBar
              tabs={[
                { value: 'all', label: 'All', count: tabCounts.all },
                { value: 'recent', label: 'Recent (≤30d)', count: tabCounts.recent },
                { value: 'older', label: 'Older (>30d)', count: tabCounts.older },
              ]}
              activeTab={activeTab}
              onTabChange={(v) => setActiveTab(v as typeof activeTab)}
              search={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search name or email…"
              actions={
                <button
                  onClick={() => setShowTools(true)}
                  className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                >
                  New Campaign
                </button>
              }
            />

            <Divider label={`Email version · ${EMAIL_VERSIONS[emailVersion].label}`} />

            <ListCard>
              <ListCardHeader
                tone="blue"
                title="Email version"
                meta={<Pill tone="blue">{Object.keys(EMAIL_VERSIONS).length} options</Pill>}
              />
              <ListBody>
                {(Object.keys(EMAIL_VERSIONS) as EmailVersion[]).map((v) => {
                  const config = EMAIL_VERSIONS[v];
                  const isActive = emailVersion === v;
                  return (
                    <ListRow
                      key={v}
                      onClick={() => setEmailVersion(v)}
                      accent={isActive ? 'yellow' : undefined}
                      lead={
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isActive ? 'border-elec-yellow' : 'border-white/30'
                          }`}
                        >
                          {isActive && <div className="w-2.5 h-2.5 rounded-full bg-elec-yellow" />}
                        </div>
                      }
                      title={config.label}
                      subtitle={config.description}
                      trailing={v === 'v3' ? <Pill tone="emerald">New</Pill> : undefined}
                    />
                  );
                })}
              </ListBody>
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="blue"
                title="Apprentices"
                meta={<Pill tone="blue">{filteredUsers.length}</Pill>}
                action={selectedUsers.size > 0 ? `Send to ${selectedUsers.size}` : 'Sent history'}
                onAction={
                  selectedUsers.size > 0 ? handleSendSelected : () => setShowSentHistory(true)
                }
              />

              {filteredUsers.length > 0 && (
                <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-white/[0.06]">
                  <label className="flex items-center gap-3 touch-manipulation cursor-pointer">
                    <Checkbox
                      checked={
                        filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length
                      }
                      onCheckedChange={toggleSelectAll}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <span className="text-[12px] font-medium text-white">
                      {selectedUsers.size > 0 ? `${selectedUsers.size} selected` : 'Select all'}
                    </span>
                  </label>
                  {selectedUsers.size > 0 && (
                    <button
                      onClick={handleSendSelected}
                      disabled={sendBulkMutation.isPending}
                      className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      {sendBulkMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send to {selectedUsers.size}
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {filteredUsers.length === 0 ? (
                <div className="p-4 sm:p-6">
                  <EmptyState
                    title="No apprentices match"
                    description={
                      search
                        ? 'No users match your search criteria.'
                        : 'No lapsed apprentices eligible for win-back right now.'
                    }
                  />
                </div>
              ) : (
                <ListBody>
                  {filteredUsers.map((user) => {
                    const daysSinceSignup = differenceInDays(
                      new Date(),
                      parseISO(user.created_at)
                    );
                    const daysSinceTrial = Math.max(0, daysSinceSignup - 7);
                    const statusTone: Tone =
                      daysSinceTrial <= 14 ? 'emerald' : daysSinceTrial <= 45 ? 'amber' : 'red';
                    const statusLabel = `${daysSinceTrial}d lapsed`;

                    return (
                      <ListRow
                        key={user.id}
                        lead={
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedUsers.has(user.id)}
                              onCheckedChange={() => toggleUserSelection(user.id)}
                              onClick={(e) => e.stopPropagation()}
                              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                            />
                            <Avatar initials={getInitials(user.full_name ?? user.username)} />
                          </div>
                        }
                        title={user.full_name || user.username || 'Unknown'}
                        subtitle={`${user.email} · ${format(parseISO(user.created_at), 'dd MMM yy')}`}
                        trailing={<Pill tone={statusTone}>{statusLabel}</Pill>}
                        onClick={() => setSelectedUser(user)}
                      />
                    );
                  })}
                </ListBody>
              )}
            </ListCard>

            <ListCard>
              <ListCardHeader
                tone="blue"
                title="Campaign history"
                meta={
                  <Pill tone="blue">
                    {offersSent} sent
                  </Pill>
                }
                action="Open history"
                onAction={() => setShowSentHistory(true)}
              />
              <ListBody>
                <ListRow
                  title="Trial win-back"
                  subtitle={`${EMAIL_VERSIONS[emailVersion].label}`}
                  trailing={
                    <div className="flex items-center gap-2">
                      <Pill tone="blue">{offersSent} sent</Pill>
                      <Pill tone="emerald">{conversions} converted</Pill>
                      <Pill tone="yellow">{conversionRate}%</Pill>
                    </div>
                  }
                  onClick={() => setShowSentHistory(true)}
                />
              </ListBody>
            </ListCard>
          </>
        )}

        <Sheet open={showTools} onOpenChange={setShowTools}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-left text-white">New campaign</SheetTitle>
                <p className="text-[12.5px] text-white text-left">
                  Send test, target a specific address, or reset sent status.
                </p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div>
                  <Eyebrow>Send test email</Eyebrow>
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="h-11 text-base touch-manipulation flex-1 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    <Button
                      onClick={() => testEmail && sendTestMutation.mutate(testEmail)}
                      disabled={!testEmail || sendTestMutation.isPending}
                      className="h-11 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                    >
                      {sendTestMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="mt-2 text-[11.5px] text-white">
                    Preview {EMAIL_VERSIONS[emailVersion].label.toLowerCase()} in your inbox.
                  </p>
                </div>

                <Divider />

                <div>
                  <Eyebrow>Send to any email</Eyebrow>
                  <div className="mt-3 flex gap-2">
                    <Input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="anyone@email.com"
                      className="h-11 text-base touch-manipulation flex-1 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                    <Button
                      onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                      disabled={!manualEmail || sendManualMutation.isPending}
                      className="h-11 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                    >
                      {sendManualMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Divider />

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => resetSentMutation.mutate()}
                    disabled={resetSentMutation.isPending}
                    className="h-11 touch-manipulation bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04] gap-2"
                  >
                    {resetSentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <RotateCcw className="h-4 w-4" />
                    )}
                    Reset sent
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowTools(false);
                      setShowSentHistory(true);
                    }}
                    className="h-11 touch-manipulation bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04] gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Sent history
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={showSentHistory} onOpenChange={setShowSentHistory}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="text-left text-white">Sent history</SheetTitle>
                <p className="text-[12.5px] text-white text-left">
                  Win-back emails sent to lapsed apprentices.
                </p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5">
                {sentLoading ? (
                  <LoadingBlocks />
                ) : !sentUsers || sentUsers.length === 0 ? (
                  <EmptyState
                    title="No emails sent yet"
                    description="Send the win-back email to see results here."
                  />
                ) : (
                  <ListCard>
                    <ListBody>
                      {sentUsers.map((user) => (
                        <ListRow
                          key={user.id}
                          lead={<Avatar initials={getInitials(user.full_name ?? user.username)} />}
                          title={user.full_name || user.username}
                          subtitle={formatDistanceToNow(
                            parseISO(user.apprentice_campaign_sent_at),
                            { addSuffix: true }
                          )}
                          trailing={
                            user.subscribed ? (
                              <Pill tone="emerald">Subscribed</Pill>
                            ) : (
                              <Pill tone="orange">Pending</Pill>
                            )
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)]">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3 text-white">
                  <Avatar initials={getInitials(selectedUser?.full_name ?? selectedUser?.username)} />
                  <div className="text-left">
                    <div className="text-[15px] font-semibold text-white">
                      {selectedUser?.full_name || 'Unknown'}
                    </div>
                    <div className="text-[12px] font-normal text-white">
                      {selectedUser?.email}
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <ListCard>
                  <ListCardHeader tone="blue" title="Apprentice details" />
                  <ListBody>
                    <ListRow
                      title="Signed up"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {selectedUser?.created_at &&
                            format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                        </span>
                      }
                    />
                    <ListRow
                      title="Trial ended"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {selectedUser?.created_at &&
                            format(
                              new Date(
                                new Date(selectedUser.created_at).getTime() +
                                  7 * 24 * 60 * 60 * 1000
                              ),
                              'dd MMM yyyy'
                            )}
                        </span>
                      }
                    />
                    <ListRow
                      title="Days since trial"
                      trailing={
                        <Pill tone="orange">
                          {selectedUser?.created_at
                            ? `${Math.max(
                                0,
                                differenceInDays(new Date(), parseISO(selectedUser.created_at)) - 7
                              )}d`
                            : '—'}
                        </Pill>
                      }
                    />
                    {selectedUser?.last_sign_in && (
                      <ListRow
                        title="Last active"
                        trailing={
                          <span className="text-[13px] text-white">
                            {formatDistanceToNow(parseISO(selectedUser.last_sign_in), {
                              addSuffix: true,
                            })}
                          </span>
                        }
                      />
                    )}
                    {selectedUser?.apprentice_campaign_sent_at && (
                      <ListRow
                        title="Last campaign"
                        trailing={
                          <span className="text-[13px] text-white">
                            {formatDistanceToNow(
                              parseISO(selectedUser.apprentice_campaign_sent_at),
                              { addSuffix: true }
                            )}
                          </span>
                        }
                      />
                    )}
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="yellow"
                    title="Send win-back email"
                    meta={<Pill tone="yellow">{EMAIL_VERSIONS[emailVersion].label}</Pill>}
                  />
                  <div className="p-5">
                    <Button
                      className="w-full h-12 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                      onClick={() =>
                        selectedUser && sendSingleMutation.mutate(selectedUser.id)
                      }
                      disabled={sendSingleMutation.isPending}
                    >
                      {sendSingleMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send win-back email
                        </>
                      )}
                    </Button>
                  </div>
                </ListCard>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmSendAll} onOpenChange={setConfirmSendAll}>
          <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Send win-back to {selectedUsers.size} apprentices?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                This will send {EMAIL_VERSIONS[emailVersion].label.toLowerCase()} to{' '}
                {selectedUsers.size} lapsed apprentice{selectedUsers.size === 1 ? '' : 's'}. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation bg-transparent border-white/[0.08] text-white hover:bg-white/[0.04]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => sendBulkMutation.mutate(Array.from(selectedUsers))}
                className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                {sendBulkMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending…
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
      </PageFrame>
    </PullToRefresh>
  );
}

import { useState, useMemo } from 'react';
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
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RefreshCw,
  Send,
  Loader2,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
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
  EmptyState,
  LoadingBlocks,
  Divider,
  SectionHeader,
  Eyebrow,
  type Tone,
} from '@/components/admin/editorial';

type CampaignId = 'v9' | 'v10';
type RoleFilter = 'all' | 'electrician' | 'apprentice';

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
  incomplete_signup_v3_sent_at?: string;
  incomplete_signup_v10_sent_at?: string;
  subscribed: boolean;
}

interface Stats {
  totalEligible: number;
  sent: number;
  totalAbandoned: number;
  conversions: number;
  conversionRate: string;
}

const CAMPAIGNS: Record<
  CampaignId,
  {
    id: CampaignId;
    label: string;
    subject: string;
    tagline: string;
    tone: Tone;
    actions: {
      stats: string;
      eligible: string;
      sent: string;
      test: string;
      manual: string;
      campaign: string;
      reset: string;
    };
  }
> = {
  v9: {
    id: 'v9',
    label: 'V9 — Quick Question',
    subject: 'Quick question',
    tagline: 'Personal, curious, asks why they didn\u2019t finish.',
    tone: 'amber',
    actions: {
      stats: 'get_v3_stats',
      eligible: 'get_v3_eligible',
      sent: 'get_v3_sent',
      test: 'send_v3_test',
      manual: 'send_manual',
      campaign: 'send_v3_campaign',
      reset: 'reset_sent',
    },
  },
  v10: {
    id: 'v10',
    label: 'V10 — Launch Price',
    subject: 'Your launch price, just for you.',
    tagline: 'Sales pitch — one-time rate locked in, deadline Sunday 26 April.',
    tone: 'emerald',
    actions: {
      stats: 'get_v10_stats',
      eligible: 'get_v10_eligible',
      sent: 'get_v10_sent',
      test: 'send_v10_test',
      manual: 'send_v10_manual',
      campaign: 'send_v10_campaign',
      reset: 'reset_v10_sent',
    },
  },
};

function getInitials(name: string | null | undefined, fallback: string = '?'): string {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return fallback;
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminIncompleteSignup() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [campaign, setCampaign] = useState<CampaignId>('v10');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const [testEmail, setTestEmail] = useState('');
  const [testRole, setTestRole] = useState<'electrician' | 'apprentice'>('electrician');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IncompleteUser | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [batchSending, setBatchSending] = useState(false);

  const C = CAMPAIGNS[campaign];

  const refreshAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-stats'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-eligible'] });
    queryClient.invalidateQueries({ queryKey: ['admin-incomplete-sent'] });
  };

  const invoke = async <T,>(action: string, body: Record<string, unknown> = {}) => {
    const { data, error } = await supabase.functions.invoke('send-incomplete-signup', {
      body: { action, ...body },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data as T;
  };

  const { data: stats } = useQuery<Stats>({
    queryKey: ['admin-incomplete-stats', campaign],
    queryFn: () => invoke<Stats>(C.actions.stats),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  const {
    data: eligibleUsers,
    isLoading: usersLoading,
    isFetching,
    refetch,
  } = useQuery<IncompleteUser[]>({
    queryKey: ['admin-incomplete-eligible', campaign],
    queryFn: async () => {
      const data = await invoke<{ users: IncompleteUser[] }>(C.actions.eligible);
      return data?.users || [];
    },
    staleTime: 30 * 1000,
  });

  const { data: sentUsers, isLoading: sentLoading } = useQuery<SentUser[]>({
    queryKey: ['admin-incomplete-sent', campaign],
    queryFn: async () => {
      const data = await invoke<{ users: SentUser[] }>(C.actions.sent);
      return data?.users || [];
    },
    staleTime: 30 * 1000,
  });

  const filteredEligible = useMemo(() => {
    if (!eligibleUsers) return [];
    let list = eligibleUsers;
    if (roleFilter !== 'all') list = list.filter((u) => u.role === roleFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (u) =>
          (u.full_name || '').toLowerCase().includes(q) ||
          (u.email || '').toLowerCase().includes(q) ||
          (u.username || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [eligibleUsers, roleFilter, searchQuery]);

  const roleCounts = useMemo(() => {
    if (!eligibleUsers) return { all: 0, electrician: 0, apprentice: 0 };
    return {
      all: eligibleUsers.length,
      electrician: eligibleUsers.filter((u) => u.role === 'electrician').length,
      apprentice: eligibleUsers.filter((u) => u.role === 'apprentice').length,
    };
  }, [eligibleUsers]);

  const allFilteredSelected =
    filteredEligible.length > 0 && filteredEligible.every((u) => selectedIds.has(u.id));

  const toggleUser = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllFiltered = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filteredEligible.forEach((u) => next.delete(u.id));
      } else {
        filteredEligible.forEach((u) => next.add(u.id));
      }
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const sendTestMutation = useMutation({
    mutationFn: async () =>
      invoke(C.actions.test, {
        testEmail,
        ...(campaign === 'v10' ? { role: testRole, recipientName: 'Test User' } : {}),
      }),
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Test email sent! Check your inbox.', variant: 'success' });
      setTestEmail('');
      setShowTestEmail(false);
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendManualMutation = useMutation({
    mutationFn: async (email: string) => invoke(C.actions.manual, { manualEmail: email }),
    onSuccess: () => {
      haptic.success();
      toast({ title: 'Email sent!', variant: 'success' });
      setManualEmail('');
      refreshAll();
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const resetMutation = useMutation({
    mutationFn: async () => invoke<{ reset: number }>(C.actions.reset),
    onSuccess: (data) => {
      haptic.success();
      toast({
        title: `Reset ${data?.reset ?? 0} users — ready to re-send`,
        variant: 'success',
      });
      refreshAll();
    },
    onError: (error: Error) => {
      haptic.error();
      toast({ title: `Reset failed: ${error.message}`, variant: 'destructive' });
    },
  });

  const sendCampaign = async () => {
    setConfirmSend(false);
    setBatchSending(true);

    try {
      const ids = Array.from(selectedIds);
      const data = await invoke<{ sent: number; remaining: number; message?: string }>(
        C.actions.campaign,
        ids.length > 0 ? { userIds: ids } : {}
      );
      haptic.success();
      toast({
        title: data?.message || `Sent ${data?.sent ?? 0} emails`,
        variant: 'success',
      });
      clearSelection();
    } catch (err: unknown) {
      haptic.error();
      toast({
        title: `Failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setBatchSending(false);
      refreshAll();
    }
  };

  const selectedCount = selectedIds.size;
  const totalSendCount = selectedCount > 0 ? selectedCount : filteredEligible.length;
  const sendingToSelectedLabel =
    selectedCount > 0 ? `selected ${selectedCount}` : `all ${filteredEligible.length} filtered`;

  const totalAbandoned = stats?.totalAbandoned ?? 0;
  const totalSent = stats?.sent ?? 0;
  const conversions = stats?.conversions ?? 0;
  const conversionRate = stats?.conversionRate ?? '0%';

  const recoveredPill = conversions > 0;
  const openRate = totalSent > 0 ? Math.min(100, Math.round((conversions / totalSent) * 100)) : 0;
  const clickRate = totalSent > 0 ? Math.min(100, Math.round((conversions / Math.max(1, totalSent)) * 100)) : 0;

  const statusToneFor = (u: IncompleteUser): Tone => {
    if (selectedIds.has(u.id)) return 'yellow';
    if (u.role === 'electrician') return 'emerald';
    if (u.role === 'apprentice') return 'blue';
    return 'amber';
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
          title="Incomplete Signup"
          description="Users who started checkout but never subscribed."
          tone="amber"
          actions={
            <IconButton
              onClick={refreshAll}
              aria-label="Refresh"
              className={cn(isFetching && 'animate-pulse')}
            >
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Abandoned', value: totalAbandoned },
            { label: 'Last 24h', value: totalAbandoned, tone: 'orange' },
            { label: 'Emailed', value: totalSent, tone: 'emerald' },
            { label: 'Recovered', value: conversions, accent: true },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(['v10', 'v9'] as CampaignId[]).map((id) => {
            const c = CAMPAIGNS[id];
            const active = campaign === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setCampaign(id);
                  clearSelection();
                }}
                className={cn(
                  'group relative rounded-2xl border p-4 text-left transition-colors touch-manipulation bg-[hsl(0_0%_12%)] overflow-hidden',
                  active
                    ? 'border-elec-yellow/40'
                    : 'border-white/[0.06] hover:bg-[hsl(0_0%_15%)]'
                )}
              >
                {active && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-80" />
                )}
                <div className="flex items-center justify-between gap-3">
                  <Eyebrow>{c.label}</Eyebrow>
                  {active && <Pill tone="yellow">Active</Pill>}
                </div>
                <p className="mt-3 text-[13px] text-white leading-relaxed">{c.tagline}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">
                  <span className="text-[11px] text-white truncate">{c.subject}</span>
                  <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow shrink-0 ml-3">
                    {active ? 'Selected →' : 'Switch →'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: roleCounts.all },
            { value: 'electrician', label: 'Electrician', count: roleCounts.electrician },
            { value: 'apprentice', label: 'Apprentice', count: roleCounts.apprentice },
          ]}
          activeTab={roleFilter}
          onTabChange={(v) => setRoleFilter(v as RoleFilter)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search name or email…"
          actions={
            <button
              onClick={() => setConfirmSend(true)}
              disabled={batchSending || totalSendCount === 0}
              className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation whitespace-nowrap"
            >
              {batchSending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…
                </span>
              ) : selectedCount > 0 ? (
                `Send Email (${selectedCount})`
              ) : (
                `Send Email (${filteredEligible.length})`
              )}
            </button>
          }
        />

        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Send Controls"
            meta={<Pill tone={C.tone}>{C.label}</Pill>}
            action="Preview"
            onAction={() => setShowPreview(true)}
          />
          <div className="px-5 sm:px-6 py-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <Eyebrow>Subject</Eyebrow>
                <p className="mt-1.5 text-[14px] font-medium text-white truncate">{C.subject}</p>
                <p className="mt-1 text-[12px] text-white">{C.tagline}</p>
              </div>
              <button
                onClick={() => setShowTestEmail(!showTestEmail)}
                className="h-10 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] font-medium text-white hover:bg-white/[0.08] touch-manipulation whitespace-nowrap"
              >
                {showTestEmail ? 'Hide test' : 'Send test'}
              </button>
            </div>

            {campaign === 'v10' && (
              <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
                  <Eyebrow>Electrician</Eyebrow>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-[20px] font-semibold text-white tabular-nums">£9.99</span>
                    <span className="text-[11px] text-white line-through">£14.99</span>
                  </div>
                </div>
                <div className="bg-[hsl(0_0%_10%)] px-4 py-3">
                  <Eyebrow>Apprentice</Eyebrow>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-[20px] font-semibold text-white tabular-nums">£4.99</span>
                    <span className="text-[11px] text-white line-through">£6.99</span>
                  </div>
                </div>
              </div>
            )}

            {showTestEmail && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-3">
                <Eyebrow>Send test email</Eyebrow>
                {campaign === 'v10' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTestRole('electrician')}
                      className={cn(
                        'flex-1 h-11 rounded-full text-[13px] font-semibold touch-manipulation transition-colors',
                        testRole === 'electrician'
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.04] text-white border border-white/[0.08]'
                      )}
                    >
                      Electrician £9.99
                    </button>
                    <button
                      onClick={() => setTestRole('apprentice')}
                      className={cn(
                        'flex-1 h-11 rounded-full text-[13px] font-semibold touch-manipulation transition-colors',
                        testRole === 'apprentice'
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.04] text-white border border-white/[0.08]'
                      )}
                    >
                      Apprentice £4.99
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 flex-1 px-4 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                  />
                  <button
                    onClick={() => testEmail && sendTestMutation.mutate()}
                    disabled={!testEmail || sendTestMutation.isPending}
                    className="h-11 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold disabled:opacity-40 touch-manipulation"
                  >
                    {sendTestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <div>
              <Eyebrow>Send manually to any email</Eyebrow>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="someone@example.com"
                  className="h-11 flex-1 px-4 bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-full text-[13px] text-white placeholder:text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                />
                <button
                  onClick={() => manualEmail && sendManualMutation.mutate(manualEmail)}
                  disabled={!manualEmail || sendManualMutation.isPending}
                  className="h-11 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold disabled:opacity-40 touch-manipulation"
                >
                  {sendManualMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {batchSending && (
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                <span className="text-[13px] font-medium text-white">Sending campaign…</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  if (confirm(`Reset all sent ${C.label} users so they can be re-sent?`)) {
                    resetMutation.mutate();
                  }
                }}
                disabled={resetMutation.isPending}
                className="h-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] font-medium text-white hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation inline-flex items-center justify-center gap-2"
              >
                {resetMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
                Reset All Sent
              </button>
              <button
                onClick={() => setConfirmSend(true)}
                disabled={batchSending || totalSendCount === 0}
                className="h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation inline-flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {selectedCount > 0
                  ? `Send (${selectedCount})`
                  : `Send All (${filteredEligible.length})`}
              </button>
            </div>
          </div>
        </ListCard>

        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Abandoned Checkouts"
            meta={<Pill tone="amber">{filteredEligible.length}</Pill>}
            action={
              selectedCount > 0
                ? 'Clear selection'
                : filteredEligible.length > 0
                  ? allFilteredSelected
                    ? 'Deselect all'
                    : 'Select all'
                  : undefined
            }
            onAction={
              selectedCount > 0
                ? clearSelection
                : filteredEligible.length > 0
                  ? toggleAllFiltered
                  : undefined
            }
          />
          {usersLoading ? (
            <div className="p-5">
              <LoadingBlocks />
            </div>
          ) : filteredEligible.length === 0 ? (
            <EmptyState
              title="No abandoned checkouts"
              description={
                roleFilter === 'all' && !searchQuery
                  ? `All ${C.label} emails sent. Use Reset All Sent to re-enable.`
                  : `No ${roleFilter === 'all' ? 'users' : `${roleFilter}s`} match this filter.`
              }
            />
          ) : (
            <ListBody>
              {filteredEligible.map((user) => {
                const selected = selectedIds.has(user.id);
                const displayName = user.full_name || user.username || 'Unknown';
                const tone = statusToneFor(user);
                const timeAgo = formatDistanceToNow(parseISO(user.created_at), { addSuffix: true });
                return (
                  <ListRow
                    key={user.id}
                    accent={selected ? 'yellow' : undefined}
                    lead={<Avatar initials={getInitials(displayName, 'U')} online={selected} />}
                    title={displayName}
                    subtitle={user.email}
                    trailing={
                      <>
                        <Pill tone={tone}>{user.role || 'unknown'}</Pill>
                        <span className="text-[11px] text-white tabular-nums">{timeAgo}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleUser(user.id);
                          }}
                          className={cn(
                            'h-7 px-2.5 rounded-full text-[11px] font-medium border touch-manipulation transition-colors',
                            selected
                              ? 'bg-elec-yellow text-black border-elec-yellow'
                              : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                          )}
                        >
                          {selected ? 'Selected' : 'Select'}
                        </button>
                      </>
                    }
                    onClick={() => setSelectedUser(user)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>

        <div>
          <SectionHeader
            eyebrow="Performance"
            title="Campaign"
            meta={<Pill tone={C.tone}>{C.label}</Pill>}
          />
          <div className="mt-4">
            <StatStrip
              columns={3}
              stats={[
                { label: 'Sent', value: totalSent },
                { label: 'Opened', value: conversions, sub: `${openRate}% open rate` },
                {
                  label: 'Clicked',
                  value: conversions,
                  sub: `${clickRate}% click rate`,
                  accent: recoveredPill,
                },
              ]}
            />
            <div className="mt-3 flex items-center justify-between text-[11px] text-white">
              <span>Conversion rate</span>
              <span className="tabular-nums text-white font-semibold">{conversionRate}</span>
            </div>
          </div>
        </div>

        <Divider label="Sent history" />

        <ListCard>
          <ListCardHeader
            tone="emerald"
            title="Recently Emailed"
            meta={<Pill tone="emerald">{sentUsers?.length || 0}</Pill>}
          />
          {sentLoading ? (
            <div className="p-5">
              <LoadingBlocks />
            </div>
          ) : !sentUsers || sentUsers.length === 0 ? (
            <EmptyState
              title="No emails sent yet"
              description={`Send the ${C.label} email to see results here.`}
            />
          ) : (
            <ListBody>
              {sentUsers.map((u) => {
                const sentAt =
                  (campaign === 'v10'
                    ? u.incomplete_signup_v10_sent_at
                    : u.incomplete_signup_v3_sent_at) ?? null;
                const displayName = u.full_name || u.username || 'Unknown';
                return (
                  <ListRow
                    key={u.id}
                    lead={<Avatar initials={getInitials(displayName, 'U')} online={u.subscribed} />}
                    title={displayName}
                    subtitle={u.role || 'unknown'}
                    trailing={
                      <>
                        <Pill tone={u.subscribed ? 'emerald' : 'amber'}>
                          {u.subscribed ? 'Converted' : 'Pending'}
                        </Pill>
                        <span className="text-[11px] text-white tabular-nums">
                          {sentAt
                            ? formatDistanceToNow(parseISO(sentAt), { addSuffix: true })
                            : 'unknown'}
                        </span>
                      </>
                    }
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>

        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent
            side="bottom"
            className="h-[50vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <Avatar initials={getInitials(selectedUser?.full_name, 'U')} />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white truncate">
                      {selectedUser?.full_name || 'Unknown'}
                    </p>
                    <p className="text-[12px] font-normal text-white truncate">
                      {selectedUser?.email}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                <ListCard>
                  <div className="divide-y divide-white/[0.06]">
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Role</span>
                      <Pill tone={statusToneFor(selectedUser ?? ({} as IncompleteUser))}>
                        {selectedUser?.role || 'unknown'}
                      </Pill>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Signed Up</span>
                      <span className="text-[12px] text-white tabular-nums">
                        {selectedUser?.created_at &&
                          format(parseISO(selectedUser.created_at), 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-[12px] text-white">Username</span>
                      <span className="text-[12px] text-white truncate max-w-[60%]">
                        {selectedUser?.username || '—'}
                      </span>
                    </div>
                  </div>
                </ListCard>
                {selectedUser && (
                  <button
                    onClick={() => {
                      toggleUser(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="w-full h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                  >
                    {selectedIds.has(selectedUser.id) ? 'Remove from selection' : 'Add to selection'}
                  </button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6 bg-[hsl(0_0%_12%)] border border-white/[0.06]">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight text-white">
                Send {C.label} to {sendingToSelectedLabel}?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white">
                    {selectedCount > 0
                      ? `Sending to ${selectedCount} selected users.`
                      : `Sending to all ${filteredEligible.length} users matching the current filter${roleFilter !== 'all' ? ` (${roleFilter}s only)` : ''}.`}
                  </p>
                  <p className="text-white text-xs">
                    Batched 10 at a time with 2s delay between batches.
                  </p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-11 touch-manipulation text-sm w-full sm:w-auto mt-0 rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={sendCampaign}
                className="h-11 touch-manipulation text-sm text-black font-semibold w-full sm:w-auto rounded-full bg-elec-yellow hover:bg-elec-yellow/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Send to {sendingToSelectedLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <SheetHeader className="px-5 pb-3 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-2 text-[13px] text-white">
                  <Eye className="h-4 w-4 text-white" />
                  Preview: {C.subject}
                  <Pill tone={C.tone}>{C.label}</Pill>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-black">
                <iframe
                  title="Email Preview"
                  sandbox="allow-same-origin"
                  className="w-full h-full border-0"
                  srcDoc={
                    campaign === 'v10'
                      ? `<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:48px 24px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;min-height:90vh}.pill{padding:6px 14px;background:rgba(16,185,129,0.14);border:1px solid rgba(16,185,129,0.4);border-radius:999px;color:#34d399;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.4px}h1{margin:8px 0 4px;font-size:28px;font-weight:800;line-height:1.1}h1 span{color:#34d399}.card{width:100%;max-width:340px;padding:20px;background:linear-gradient(180deg,rgba(16,185,129,0.08),rgba(16,185,129,0.02));border:1px solid rgba(16,185,129,0.28);border-radius:18px;margin-top:12px}.old{font-size:13px;opacity:0.55;text-decoration:line-through;text-decoration-color:#f87171}.new{font-size:44px;font-weight:800;color:#34d399;letter-spacing:-1px;margin:4px 0 2px}.mo{font-size:16px;color:#fff;opacity:0.7;font-weight:600}.cta{display:inline-block;margin-top:20px;padding:14px 28px;background:#34d399;border-radius:12px;font-weight:800;color:#000;text-decoration:none;font-size:14px}p.note{margin-top:12px;font-size:11px;color:#fff;opacity:0.5}</style></head><body><div class="pill">Ends Sunday 26 April</div><h1>Your launch price,<br><span>just for you.</span></h1><p style="opacity:0.7;font-size:13px;max-width:320px;margin:0">Send a test email to see the real template rendered in your inbox.</p><div class="card"><div style="font-size:11px;color:#34d399;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px">Elec-Mate Electrician</div><span class="old">£14.99/mo normally</span><div class="new">£9.99<span class="mo">/mo</span></div><div style="font-size:10px;opacity:0.5;letter-spacing:0.4px;text-transform:uppercase;margin-top:10px">Locked in &middot; Cancel anytime</div></div><a class="cta" href="#">Claim £9.99/month &rarr;</a><p class="note">Secure checkout via Stripe &middot; No code to enter</p></body></html>`
                      : `<!DOCTYPE html><html><head><meta name="color-scheme" content="dark"><style>body{margin:0;padding:40px 20px;font-family:-apple-system,system-ui,sans-serif;background:#000;color:#e2e8f0;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90vh}h2{color:#fbbf24;margin-bottom:8px;font-size:24px}p{color:#fff;font-size:14px;line-height:1.6;max-width:300px}.badge{display:inline-block;margin-bottom:16px;padding:6px 16px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:20px;font-size:11px;font-weight:800;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px}</style></head><body><div class="badge">V9 &mdash; Quick Question</div><h2>We&rsquo;re on the App Store.</h2><p>Send a test email to preview the full rendered template in your inbox.</p></body></html>`
                  }
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}

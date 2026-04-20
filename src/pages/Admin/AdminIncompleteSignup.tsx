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
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import AdminEmptyState from '@/components/admin/AdminEmptyState';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PullToRefresh from '@/components/admin/PullToRefresh';
import {
  RotateCcw,
  Send,
  Users,
  Mail,
  Loader2,
  User,
  CheckCheck,
  TestTube,
  Eye,
  FileText,
  AlertCircle,
  Sparkles,
  MessageCircleQuestion,
  Clock,
  Filter,
  SquareCheckBig,
  Square,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';

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

// Campaign definitions — one source of truth for the copy, colours, and
// which edge-function actions to hit. Adding a new variant is one entry here.
const CAMPAIGNS: Record<
  CampaignId,
  {
    id: CampaignId;
    label: string;
    subject: string;
    tagline: string;
    accent: string; // tailwind colour family, e.g. 'amber'
    icon: typeof MessageCircleQuestion;
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
    accent: 'amber',
    icon: MessageCircleQuestion,
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
    accent: 'emerald',
    icon: Sparkles,
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

export default function AdminIncompleteSignup() {
  const queryClient = useQueryClient();
  const haptic = useHaptic();

  const [campaign, setCampaign] = useState<CampaignId>('v10');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [testEmail, setTestEmail] = useState('');
  const [testRole, setTestRole] = useState<'electrician' | 'apprentice'>('electrician');
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [manualEmail, setManualEmail] = useState('');
  const [confirmSend, setConfirmSend] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IncompleteUser | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [batchSending, setBatchSending] = useState(false);

  const C = CAMPAIGNS[campaign];
  const accentBorder = `border-${C.accent}-500/30`;
  const accentBg = `bg-${C.accent}-500/10`;
  const accentText = `text-${C.accent}-400`;

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

  // Stats — keyed on campaign so switching variants re-fetches
  const { data: stats } = useQuery<Stats>({
    queryKey: ['admin-incomplete-stats', campaign],
    queryFn: () => invoke<Stats>(C.actions.stats),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });

  // Eligible users
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

  // Sent history
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
    if (roleFilter === 'all') return eligibleUsers;
    return eligibleUsers.filter((u) => u.role === roleFilter);
  }, [eligibleUsers, roleFilter]);

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

  // Test
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

  // Manual
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

  // Reset
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

  // Campaign send — selected users OR all eligible
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

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="space-y-4 pb-24">
        <AdminPageHeader
          title="Incomplete Signups"
          subtitle={`${stats?.totalAbandoned ?? 0} people who bailed before completing signup`}
          icon={AlertCircle}
          iconColor="text-orange-400"
          iconBg="bg-orange-500/10 border-orange-500/20"
          accentColor="from-orange-500 via-amber-400 to-orange-500"
          onRefresh={refreshAll}
          isRefreshing={isFetching}
        />

        {/* ═══ Campaign picker ═══ */}
        <div className="grid grid-cols-2 gap-2">
          {(['v10', 'v9'] as CampaignId[]).map((id) => {
            const c = CAMPAIGNS[id];
            const Icon = c.icon;
            const active = campaign === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setCampaign(id);
                  clearSelection();
                }}
                className={cn(
                  'rounded-2xl border p-3 text-left transition-all touch-manipulation active:scale-[0.98]',
                  active
                    ? id === 'v10'
                      ? 'border-emerald-500/60 bg-gradient-to-br from-emerald-500/15 to-teal-500/5 shadow-[0_0_24px_-8px_rgba(16,185,129,0.4)]'
                      : 'border-amber-500/60 bg-gradient-to-br from-amber-500/15 to-orange-500/5 shadow-[0_0_24px_-8px_rgba(251,191,36,0.4)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                      active
                        ? id === 'v10'
                          ? 'bg-emerald-500/25'
                          : 'bg-amber-500/25'
                        : 'bg-white/5'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-3.5 w-3.5',
                        active
                          ? id === 'v10'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                          : 'text-white/60'
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-xs font-bold',
                      active ? 'text-white' : 'text-white/70'
                    )}
                  >
                    {c.label}
                  </span>
                </div>
                <p className="text-[11px] text-white/60 leading-snug line-clamp-2">{c.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* ═══ Send controls ═══ */}
        <Card
          className={cn(
            'border bg-gradient-to-br',
            campaign === 'v10'
              ? 'border-emerald-500/30 from-emerald-500/5 to-teal-500/5'
              : 'border-amber-500/30 from-amber-500/5 to-orange-500/5'
          )}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Send className={cn('h-4 w-4', accentText)} />
                Send Controls
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
            {/* Campaign info + preview */}
            <div
              className={cn(
                'p-3 rounded-xl border',
                campaign === 'v10'
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : 'bg-amber-500/10 border-amber-500/20'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn(
                      'text-[10px] px-2 border-0 font-bold',
                      campaign === 'v10' ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black'
                    )}
                  >
                    {C.label}
                  </Badge>
                  <span className="text-xs text-white font-medium truncate">{C.subject}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  className={cn(
                    'h-7 touch-manipulation text-xs gap-1',
                    accentText,
                    'hover:text-white'
                  )}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </Button>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">{C.tagline}</p>
              {campaign === 'v10' && (
                <div className="mt-2 pt-2 border-t border-emerald-500/15 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-white/50">Electrician:</span>{' '}
                    <span className="text-emerald-300 font-bold">£9.99/mo</span>
                    <span className="text-white/40 line-through ml-1">£14.99</span>
                  </div>
                  <div>
                    <span className="text-white/50">Apprentice:</span>{' '}
                    <span className="text-emerald-300 font-bold">£4.99/mo</span>
                    <span className="text-white/40 line-through ml-1">£6.99</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              <StatPill
                label="Total"
                value={stats?.totalAbandoned ?? 0}
                tone="blue"
              />
              <StatPill
                label="Sent"
                value={stats?.sent ?? 0}
                tone={campaign === 'v10' ? 'emerald' : 'amber'}
              />
              <StatPill label="Converted" value={stats?.conversions ?? 0} tone="green" />
            </div>

            {/* Test email panel */}
            {showTestEmail && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 space-y-2">
                <p className="text-xs text-yellow-400 font-semibold">Send Test Email ({C.label})</p>
                {campaign === 'v10' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTestRole('electrician')}
                      className={cn(
                        'flex-1 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-colors',
                        testRole === 'electrician'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white/5 text-white/60'
                      )}
                    >
                      Electrician £9.99
                    </button>
                    <button
                      onClick={() => setTestRole('apprentice')}
                      className={cn(
                        'flex-1 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-colors',
                        testRole === 'apprentice'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white/5 text-white/60'
                      )}
                    >
                      Apprentice £4.99
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="h-11 text-base touch-manipulation flex-1"
                  />
                  <Button
                    onClick={() => testEmail && sendTestMutation.mutate()}
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
                className={cn(
                  'h-11 px-4 touch-manipulation text-black shrink-0 bg-gradient-to-r',
                  campaign === 'v10'
                    ? 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                    : 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                )}
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
              <div
                className={cn(
                  'p-3 rounded-xl border space-y-2',
                  campaign === 'v10'
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-amber-500/10 border-amber-500/20'
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-2 text-sm font-semibold',
                    accentText
                  )}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending campaign...
                </div>
              </div>
            )}

            {/* Action buttons */}
            {!batchSending && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button
                  onClick={() => {
                    if (confirm(`Reset all sent ${C.label} users so they can be re-sent?`)) {
                      resetMutation.mutate();
                    }
                  }}
                  disabled={resetMutation.isPending}
                  variant="outline"
                  className={cn(
                    'h-12 touch-manipulation text-sm font-bold rounded-xl gap-2',
                    accentBorder
                  )}
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
                  disabled={batchSending || totalSendCount === 0}
                  className={cn(
                    'h-12 touch-manipulation text-sm font-bold text-black rounded-xl gap-2 bg-gradient-to-r',
                    campaign === 'v10'
                      ? 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
                      : 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                  )}
                >
                  <Send className="h-4 w-4" />
                  {selectedCount > 0 ? `Send (${selectedCount})` : `Send All (${filteredEligible.length})`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ═══ Filter chips ═══ */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-white/60" />
                Filter
              </span>
              <button
                onClick={toggleAllFiltered}
                disabled={filteredEligible.length === 0}
                className="text-[11px] font-semibold text-white/80 hover:text-white disabled:opacity-30 flex items-center gap-1 touch-manipulation"
              >
                {allFilteredSelected ? (
                  <>
                    <Square className="h-3.5 w-3.5" />
                    Deselect all
                  </>
                ) : (
                  <>
                    <SquareCheckBig className="h-3.5 w-3.5" />
                    Select all ({filteredEligible.length})
                  </>
                )}
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-3 px-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {(
                [
                  { id: 'all', label: 'All', count: roleCounts.all },
                  { id: 'electrician', label: 'Electrician', count: roleCounts.electrician },
                  { id: 'apprentice', label: 'Apprentice', count: roleCounts.apprentice },
                ] as Array<{ id: RoleFilter; label: string; count: number }>
              ).map((f) => {
                const active = roleFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setRoleFilter(f.id)}
                    className={cn(
                      'h-9 px-3 rounded-full text-xs font-semibold touch-manipulation whitespace-nowrap transition-colors',
                      active
                        ? campaign === 'v10'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-amber-500 text-black'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    )}
                  >
                    {f.label}
                    <span
                      className={cn(
                        'ml-1.5 text-[10px]',
                        active ? 'text-black/70' : 'text-white/50'
                      )}
                    >
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* ═══ Eligible users list ═══ */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <Users className={cn('h-4 w-4', accentText)} />
                Eligible ({filteredEligible.length})
              </span>
              {selectedCount > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-[11px] text-white/60 hover:text-white"
                >
                  Clear selection
                </button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-3">
            {usersLoading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-lg" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEligible.length === 0 ? (
              <AdminEmptyState
                icon={Users}
                title="No eligible users"
                description={
                  roleFilter === 'all'
                    ? `All ${C.label} emails sent. Use Reset All Sent to re-enable.`
                    : `No ${roleFilter}s match this filter.`
                }
              />
            ) : (
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto">
                {filteredEligible.map((user) => {
                  const selected = selectedIds.has(user.id);
                  return (
                    <div
                      key={user.id}
                      className={cn(
                        'flex items-center gap-3 p-2.5 rounded-xl touch-manipulation transition-colors',
                        selected
                          ? campaign === 'v10'
                            ? 'bg-emerald-500/10 ring-1 ring-emerald-500/40'
                            : 'bg-amber-500/10 ring-1 ring-amber-500/40'
                          : 'bg-muted/50 hover:bg-muted/70'
                      )}
                    >
                      <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selected}
                          onCheckedChange={() => toggleUser(user.id)}
                          className={cn(
                            'h-5 w-5',
                            campaign === 'v10'
                              ? 'data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500'
                              : 'data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500'
                          )}
                        />
                      </div>
                      <div
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                      >
                        <div
                          className={cn(
                            'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                            campaign === 'v10' ? 'bg-emerald-500/20' : 'bg-amber-500/20'
                          )}
                        >
                          <User
                            className={cn(
                              'h-4 w-4',
                              campaign === 'v10' ? 'text-emerald-400' : 'text-amber-400'
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-white truncate">
                            {user.full_name || user.username || 'Unknown'}
                          </p>
                          <p className="text-xs text-white/60 truncate">{user.email}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] shrink-0">
                          {user.role || 'unknown'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ═══ Sent history ═══ */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" />
              Sent ({sentUsers?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-4 px-3">
            {sentLoading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-9 h-9 rounded-lg" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !sentUsers || sentUsers.length === 0 ? (
              <AdminEmptyState
                icon={Mail}
                title="No emails sent yet"
                description={`Send the ${C.label} email to see results here.`}
              />
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {sentUsers.map((u) => {
                  const sentAt =
                    (campaign === 'v10'
                      ? u.incomplete_signup_v10_sent_at
                      : u.incomplete_signup_v3_sent_at) ?? null;
                  return (
                    <div key={u.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-white truncate">
                          {u.full_name || u.username || 'Unknown'}
                        </p>
                        <p className="text-xs text-white/60 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {sentAt
                            ? formatDistanceToNow(parseISO(sentAt), { addSuffix: true })
                            : 'unknown'}
                        </p>
                      </div>
                      {u.subscribed ? (
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
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* User detail sheet */}
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent side="bottom" className="h-[50vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br',
                      campaign === 'v10'
                        ? 'from-emerald-500/20 to-teal-500/20'
                        : 'from-amber-500/20 to-orange-500/20'
                    )}
                  >
                    <User className={cn('h-6 w-6', accentText)} />
                  </div>
                  <div>
                    <p className="text-left">{selectedUser?.full_name || 'Unknown'}</p>
                    <p className="text-sm font-normal text-white/70">{selectedUser?.email}</p>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">Role</span>
                      <Badge variant="outline">{selectedUser?.role || 'unknown'}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">Signed Up</span>
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

        {/* Confirm send dialog */}
        <AlertDialog open={confirmSend} onOpenChange={setConfirmSend}>
          <AlertDialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-lg rounded-2xl p-5 sm:p-6">
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-base sm:text-lg leading-tight">
                Send {C.label} to {sendingToSelectedLabel}?
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="text-sm leading-relaxed space-y-2">
                  <p className="text-white/80">
                    {selectedCount > 0
                      ? `Sending to ${selectedCount} selected users.`
                      : `Sending to all ${filteredEligible.length} users matching the current filter${roleFilter !== 'all' ? ` (${roleFilter}s only)` : ''}.`}
                  </p>
                  <p className="text-white/60 text-xs">Batched 10 at a time with 2s delay between batches.</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-2 pt-2">
              <AlertDialogCancel className="h-12 sm:h-11 touch-manipulation text-base sm:text-sm w-full sm:w-auto mt-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={sendCampaign}
                className={cn(
                  'h-12 sm:h-11 touch-manipulation text-base sm:text-sm text-black font-semibold w-full sm:w-auto',
                  campaign === 'v10'
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-amber-500 hover:bg-amber-600'
                )}
              >
                <Send className="h-4 w-4 mr-2" />
                Send to {sendingToSelectedLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Preview sheet */}
        <Sheet open={showPreview} onOpenChange={setShowPreview}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
            <div className="flex flex-col h-full">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
              <SheetHeader className="px-4 pb-3 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-sm">
                  <FileText className={cn('h-4 w-4', accentText)} />
                  Preview: {C.subject}
                  <Badge
                    className={cn(
                      'text-[10px] border-0',
                      campaign === 'v10'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    )}
                  >
                    {C.label}
                  </Badge>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-hidden bg-slate-900">
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
      </div>
    </PullToRefresh>
  );
}

function StatPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'blue' | 'amber' | 'emerald' | 'green';
}) {
  const tones: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <div className={cn('p-2 rounded-lg border text-center', tones[tone])}>
      <p className={cn('text-lg font-bold', tones[tone].split(' ').pop())}>{value}</p>
      <p className="text-[10px] text-white/80">{label}</p>
    </div>
  );
}

/**
 * /admin/mate/:userId — Per-user drill-down for the Mate (Elec-AI) agent fleet.
 * Shows profile, summary metrics, tool breakdown, and last 100 tool calls.
 * Per-user actions: Rotate JWT, Pause/Resume.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import { ChevronLeft, KeyRound, Pause, Play, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';
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
  HeroNumber,
  StatStrip,
  Divider,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  TextAction,
  FilterBar,
  type Tone,
} from '@/components/admin/editorial';

interface MateAction {
  id: string;
  tool: string;
  outcome: string | null;
  error: string | null;
  duration_ms: number | null;
  created_at: string;
  is_rag: boolean;
}

interface MateUserDetail {
  profile: {
    id: string;
    full_name: string | null;
    role: string | null;
    email: string | null;
    agent_status: string | null;
    phone: string | null;
    agent_provisioned_at: string | null;
    jwt_expires_at: string | null;
    business_ai_enabled: boolean | null;
  };
  summary: {
    tool_calls_24h: number;
    tool_calls_7d: number;
    errors_24h: number;
    errors_7d: number;
    error_rate_24h: number;
    rag_calls_24h: number;
    rag_calls_7d: number;
    rag_share_24h: number;
    rag_share_7d: number;
    minutes_saved_24h: number;
    minutes_saved_7d: number;
    cost_24h: number;
    cost_7d: number;
    cost_30d: number;
    input_tokens_30d: number;
    output_tokens_30d: number;
    cache_read_tokens_30d: number;
    cache_write_tokens_30d: number;
    distinct_tools_7d: number;
  };
  tool_breakdown: { tool: string; count: number }[];
  actions: MateAction[];
  generated_at: string;
}

function statusTone(status: string | null): Tone {
  if (status === 'active') return 'emerald';
  if (status === 'provisioning') return 'amber';
  if (status === 'paused') return 'orange';
  if (!status) return 'red';
  return 'blue';
}

function jwtTone(expiresAt: string | null): Tone {
  if (!expiresAt) return 'red';
  const days = (parseISO(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (days < 7) return 'red';
  if (days < 14) return 'orange';
  return 'emerald';
}

function jwtLabel(expiresAt: string | null) {
  if (!expiresAt) return 'No JWT';
  const days = Math.floor((parseISO(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Expired';
  if (days === 0) return 'Today';
  return `${days}d`;
}

function formatMinutes(mins: number): { value: string; suffix: string } {
  if (mins <= 0) return { value: '0', suffix: 'm' };
  if (mins < 60) return { value: String(Math.round(mins)), suffix: 'm' };
  const hours = mins / 60;
  if (hours < 10) return { value: hours.toFixed(1), suffix: 'h' };
  if (hours < 100) return { value: String(Math.round(hours)), suffix: 'h' };
  const days = hours / 24;
  return { value: days.toFixed(1), suffix: 'd' };
}

function formatUsd(usd: number): string {
  if (usd <= 0) return '$0';
  if (usd < 10) return `$${usd.toFixed(2)}`;
  if (usd < 1000) return `$${usd.toFixed(0)}`;
  return `$${(usd / 1000).toFixed(1)}k`;
}

function formatTokens(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(1)}k`;
  return `${(n / 1_000_000).toFixed(2)}M`;
}

type PendingAction = 'pause' | 'rotate' | null;

export default function AdminMateUser() {
  const { userId } = useParams<{ userId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionFilter, setActionFilter] = useState<'all' | 'rag' | 'errors'>('all');
  const [pending, setPending] = useState<PendingAction>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data, isLoading, isFetching, error } = useQuery<MateUserDetail>({
    queryKey: ['admin-mate-user', userId],
    enabled: !!userId,
    refetchInterval: 60_000,
    staleTime: 30_000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-mate-user', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { user_id: userId },
      });
      if (error) throw error;
      return data as MateUserDetail;
    },
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['admin-mate-user', userId] });
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient, userId]);

  const callAction = useCallback(
    async (action: 'rotate_jwt' | 'set_status', extra: { status?: 'active' | 'paused' } = {}) => {
      if (!userId) return;
      setSubmitting(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error('Not authenticated');
        const { data, error } = await supabase.functions.invoke('admin-mate-actions', {
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: { action, user_id: userId, ...extra },
        });
        if (error) throw error;
        const result = data as {
          ok: boolean;
          error?: string;
          new_expires_at?: string;
          note?: string;
        };
        if (!result.ok) throw new Error(result.error ?? 'Action failed');
        if (action === 'rotate_jwt') {
          toast({
            title: 'JWT rotated',
            description: result.new_expires_at
              ? `Expires ${format(parseISO(result.new_expires_at), 'd MMM yyyy')}`
              : 'New 90-day token issued.',
          });
        } else if (action === 'set_status') {
          toast({
            title: extra.status === 'paused' ? 'Agent paused' : 'Agent resumed',
            description: result.note,
          });
        }
        await queryClient.invalidateQueries({ queryKey: ['admin-mate-user', userId] });
        await queryClient.invalidateQueries({ queryKey: ['admin-mate-health'] });
      } catch (err) {
        toast({
          title: 'Action failed',
          description: err instanceof Error ? err.message : String(err),
          variant: 'destructive',
        });
      } finally {
        setSubmitting(false);
        setPending(null);
      }
    },
    [queryClient, userId]
  );

  const filteredActions = useMemo(() => {
    if (!data) return [];
    if (actionFilter === 'rag') return data.actions.filter((a) => a.is_rag);
    if (actionFilter === 'errors') return data.actions.filter((a) => a.outcome === 'failure');
    return data.actions;
  }, [data, actionFilter]);

  if (isLoading) {
    return (
      <PageFrame>
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (error || !data) {
    return (
      <PageFrame>
        <PageHero eyebrow="Mate" title="Couldn't load user" tone="red" />
        <EmptyState
          title="User detail unavailable"
          description={(error as Error)?.message ?? 'Try refreshing in a moment.'}
          action="Back to Mate"
          onAction={() => navigate('/admin/mate')}
        />
      </PageFrame>
    );
  }

  const { profile, summary, tool_breakdown, actions } = data;
  const ragPct = Math.round(summary.rag_share_24h * 100);
  const errorPct = Math.round(summary.error_rate_24h * 100);
  const provisioned = profile.agent_provisioned_at
    ? format(parseISO(profile.agent_provisioned_at), 'd MMM yyyy')
    : '—';

  const filterTabs = [
    { value: 'all', label: 'All', count: actions.length },
    { value: 'rag', label: 'RAG', count: actions.filter((a) => a.is_rag).length },
    {
      value: 'errors',
      label: 'Errors',
      count: actions.filter((a) => a.outcome === 'failure').length,
    },
  ];

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <div className="-mb-4">
          <TextAction onClick={() => navigate('/admin/mate')}>
            <span className="inline-flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" /> Mate
            </span>
          </TextAction>
        </div>

        <PageHero
          eyebrow={`Mate · ${profile.role ?? 'user'}`}
          title={profile.full_name ?? 'Unknown'}
          description={[profile.phone, profile.email].filter(Boolean).join(' · ') || undefined}
          tone="yellow"
          live={{ label: 'Live' }}
          meta={
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone={statusTone(profile.agent_status)}>
                {profile.agent_status ?? 'unknown'}
              </Pill>
              <Pill tone={jwtTone(profile.jwt_expires_at)}>{jwtLabel(profile.jwt_expires_at)}</Pill>
              <span className="text-[11px] text-white/70 tabular-nums">Since {provisioned}</span>
            </div>
          }
          actions={
            <>
              <button
                onClick={() => setPending('rotate')}
                disabled={submitting || !profile.business_ai_enabled}
                className="h-10 px-3.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-[12.5px] font-medium hover:bg-white/[0.1] transition-colors touch-manipulation flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <KeyRound className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Rotate JWT</span>
                <span className="sm:hidden">JWT</span>
              </button>
              {profile.agent_status === 'paused' ? (
                <button
                  onClick={() => callAction('set_status', { status: 'active' })}
                  disabled={submitting}
                  className="h-10 px-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[12.5px] font-medium hover:bg-emerald-500/20 transition-colors touch-manipulation flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Play className="h-3.5 w-3.5" />
                  Resume
                </button>
              ) : (
                <button
                  onClick={() => setPending('pause')}
                  disabled={submitting || !profile.business_ai_enabled}
                  className="h-10 px-3.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white text-[12.5px] font-medium hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-300 transition-colors touch-manipulation flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Pause className="h-3.5 w-3.5" />
                  Pause
                </button>
              )}
              <IconButton
                onClick={handleRefresh}
                disabled={isFetching || isRefreshing}
                aria-label="Refresh"
              >
                <RefreshCw
                  className={cn('h-4 w-4', (isFetching || isRefreshing) && 'animate-spin')}
                />
              </IconButton>
            </>
          }
        />

        <HeroNumber
          eyebrow="RAG-grounded — last 24h"
          tone={ragPct >= 60 ? 'emerald' : ragPct >= 30 ? 'amber' : 'red'}
          value={<AnimatedCounter value={ragPct} suffix="%" />}
          caption={`${summary.rag_calls_24h} of ${summary.tool_calls_24h} tool calls hit BS 7671 / GN3 / OSG`}
          columns={[
            {
              label: 'Calls 24h',
              value: <AnimatedCounter value={summary.tool_calls_24h} />,
            },
            {
              label: 'Errors 24h',
              value: <AnimatedCounter value={summary.errors_24h} />,
              tone: summary.errors_24h > 0 ? 'red' : 'emerald',
            },
            {
              label: 'Error rate',
              value: <AnimatedCounter value={errorPct} suffix="%" />,
              tone: errorPct >= 5 ? 'red' : errorPct >= 1 ? 'orange' : 'emerald',
            },
          ]}
        />

        <StatStrip
          columns={4}
          stats={(() => {
            const t = formatMinutes(summary.minutes_saved_7d);
            return [
              {
                label: 'Time saved 7d',
                value: (
                  <span>
                    {t.value}
                    <span className="text-[0.55em] font-medium ml-0.5">{t.suffix}</span>
                  </span>
                ),
                accent: true,
              },
              {
                label: 'Calls 7d',
                value: <AnimatedCounter value={summary.tool_calls_7d} />,
              },
              {
                label: 'RAG 7d',
                value: (
                  <AnimatedCounter value={Math.round(summary.rag_share_7d * 100)} suffix="%" />
                ),
                tone:
                  summary.rag_share_7d >= 0.6
                    ? 'emerald'
                    : summary.rag_share_7d >= 0.3
                      ? 'amber'
                      : 'red',
              },
              {
                label: 'Errors 7d',
                value: <AnimatedCounter value={summary.errors_7d} />,
                tone: summary.errors_7d > 0 ? 'red' : 'emerald',
              },
            ];
          })()}
        />

        <Divider label="Spend" />

        <ListCard>
          <ListCardHeader
            tone="purple"
            title="Token spend — last 30d"
            meta={
              <span className="text-[11px] text-white tabular-nums">
                {formatUsd(summary.cost_30d)} total · {formatUsd(summary.cost_7d)} last 7d
              </span>
            }
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06]">
            <div className="bg-[hsl(0_0%_12%)] px-4 py-4">
              <div className="text-[10px] text-white/60 font-medium uppercase tracking-[0.14em]">
                Input
              </div>
              <div className="mt-1.5 text-[18px] font-semibold text-white tabular-nums">
                {formatTokens(summary.input_tokens_30d)}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-4 py-4">
              <div className="text-[10px] text-white/60 font-medium uppercase tracking-[0.14em]">
                Output
              </div>
              <div className="mt-1.5 text-[18px] font-semibold text-white tabular-nums">
                {formatTokens(summary.output_tokens_30d)}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-4 py-4">
              <div className="text-[10px] text-white/60 font-medium uppercase tracking-[0.14em]">
                Cache read
              </div>
              <div className="mt-1.5 text-[18px] font-semibold text-emerald-300 tabular-nums">
                {formatTokens(summary.cache_read_tokens_30d)}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-4 py-4">
              <div className="text-[10px] text-white/60 font-medium uppercase tracking-[0.14em]">
                Cache write
              </div>
              <div className="mt-1.5 text-[18px] font-semibold text-white tabular-nums">
                {formatTokens(summary.cache_write_tokens_30d)}
              </div>
            </div>
          </div>
        </ListCard>

        <Divider label="Tools" />

        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Tool breakdown — 7d"
            meta={
              <span className="text-[11px] text-white tabular-nums">
                {tool_breakdown.length} distinct
              </span>
            }
          />
          {tool_breakdown.length === 0 ? (
            <EmptyState
              title="No tool calls in the last 7 days"
              description="When this user uses Mate, their tool calls will appear here."
            />
          ) : (
            <ListBody>
              {tool_breakdown.map((t) => {
                const isRag = [
                  'lookup_regulation',
                  'lookup_practical_method',
                  'lookup_health_safety',
                  'lookup_pricing_guidance',
                  'lookup_design_guidance',
                  'lookup_training_content',
                ].includes(t.tool);
                return (
                  <ListRow
                    key={t.tool}
                    title={t.tool}
                    trailing={
                      <>
                        {isRag && <Pill tone="emerald">RAG</Pill>}
                        <span className="text-[13px] font-semibold tabular-nums text-white">
                          {t.count}
                        </span>
                      </>
                    }
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>

        <Divider label="Activity" />

        <FilterBar
          tabs={filterTabs}
          activeTab={actionFilter}
          onTabChange={(v) => setActionFilter(v as 'all' | 'rag' | 'errors')}
        />

        <ListCard>
          <ListCardHeader
            tone="indigo"
            title="Recent tool calls"
            meta={
              <span className="text-[11px] text-white tabular-nums">
                {filteredActions.length} of last 100
              </span>
            }
          />
          {filteredActions.length === 0 ? (
            <EmptyState
              title="No tool calls match"
              description={
                actionFilter === 'rag'
                  ? 'No RAG tools called yet — Mate may be answering from training data.'
                  : actionFilter === 'errors'
                    ? 'No errors. Tools all worked.'
                    : 'No activity in the last 7 days.'
              }
            />
          ) : (
            <ListBody>
              {filteredActions.map((a) => {
                const failed = a.outcome === 'failure';
                const ts = parseISO(a.created_at);
                const relative = formatDistanceToNow(ts, { addSuffix: true }).replace('about ', '');
                return (
                  <ListRow
                    key={a.id}
                    accent={failed ? 'red' : a.is_rag ? 'emerald' : undefined}
                    title={
                      <span className="truncate">
                        {a.tool}
                        {failed && a.error && (
                          <span className="text-red-400 hidden sm:inline">
                            {' · '}
                            {a.error}
                          </span>
                        )}
                      </span>
                    }
                    subtitle={
                      <span className="tabular-nums">
                        {relative}
                        {a.duration_ms != null && (
                          <span className="hidden sm:inline">
                            {' · '}
                            {a.duration_ms}ms
                          </span>
                        )}
                        {failed && a.error && (
                          <span className="text-red-400 sm:hidden">
                            {' · '}
                            {a.error}
                          </span>
                        )}
                      </span>
                    }
                    trailing={
                      <>
                        {a.is_rag && <Pill tone="emerald">RAG</Pill>}
                        {failed && <Pill tone="red">err</Pill>}
                      </>
                    }
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
      </PageFrame>

      <AlertDialog
        open={pending !== null}
        onOpenChange={(open) => !open && !submitting && setPending(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending === 'pause' && `Pause Mate for ${profile.full_name ?? 'this user'}?`}
              {pending === 'rotate' && 'Rotate JWT?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending === 'pause' && (
                <>
                  This sets <code>agent_status</code> to <code>paused</code> and writes an audit
                  entry. WhatsApp routing stays active until the binding is removed (coming in the
                  next slice), so the agent will still respond — but the status will reflect the
                  pause everywhere else.
                </>
              )}
              {pending === 'rotate' && (
                <>
                  Issues a fresh 90-day JWT and revokes the old one. The agent will keep working —
                  the new token is encrypted and stored, OpenClaw will pick it up on the next call.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={submitting}
              onClick={(e) => {
                e.preventDefault();
                if (pending === 'pause') callAction('set_status', { status: 'paused' });
                if (pending === 'rotate') callAction('rotate_jwt');
              }}
              className={cn(pending === 'pause' && 'bg-orange-500 hover:bg-orange-500/90')}
            >
              {submitting ? 'Working…' : pending === 'pause' ? 'Pause agent' : 'Rotate JWT'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PullToRefresh>
  );
}

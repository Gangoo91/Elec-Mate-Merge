/**
 * /admin/mate — Mate (Elec-AI agent fleet) health dashboard.
 * Read-only. Aggregates from agent_action_log via the admin-mate-health edge function.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Plus, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import PullToRefresh from '@/components/admin/PullToRefresh';
import ProvisionMateSheet from '@/components/admin/ProvisionMateSheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  FilterBar,
  type Tone,
} from '@/components/admin/editorial';

interface MateUser {
  user_id: string;
  full_name: string | null;
  phone: string | null;
  role: string | null;
  agent_status: string | null;
  agent_provisioned_at: string | null;
  jwt_expires_at: string | null;
  last_seen_at: string | null;
  sessions_24h: number;
  tool_calls_24h: number;
  tool_calls_7d: number;
  errors_24h: number;
  error_rate_24h: number;
  rag_calls_24h: number;
  minutes_saved_24h: number;
  minutes_saved_7d: number;
  cost_24h: number;
  cost_7d: number;
  cost_30d: number;
}

interface MateHealth {
  summary: {
    total_agents: number;
    active_24h: number;
    active_7d: number;
    tool_calls_24h: number;
    tool_calls_7d: number;
    errors_24h: number;
    error_rate_24h: number;
    rag_calls_24h: number;
    rag_share_24h: number;
    minutes_saved_24h: number;
    minutes_saved_7d: number;
    cost_24h: number;
    cost_7d: number;
    cost_30d: number;
    generated_at: string;
  };
  users: MateUser[];
  top_tools_24h: { tool: string; count: number }[];
  top_errors_24h: {
    tool: string;
    error: string;
    count: number;
    users_affected: number;
    last_seen: string;
  }[];
  tool_reliability_7d: {
    tool: string;
    calls: number;
    successes: number;
    failures: number;
    success_rate: number;
    p50_ms: number;
    p95_ms: number;
    users: number;
    last_error: string | null;
    last_error_at: string | null;
    last_seen: string | null;
  }[];
}

type FilterKey = 'all' | 'active' | 'errors' | 'jwt' | 'idle' | 'lowrag';
type SortKey = 'recent' | 'errors' | 'jwt' | 'active' | 'lowrag';

function getInitials(name: string | null) {
  if (!name) return '·';
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
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

function statusTone(status: string | null): Tone {
  if (status === 'active') return 'emerald';
  if (status === 'provisioning') return 'amber';
  if (status === 'paused') return 'orange';
  if (!status) return 'red';
  return 'blue';
}

function jwtDays(expiresAt: string | null): number {
  if (!expiresAt) return -Infinity;
  return (parseISO(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
}

function lastSeenAge(lastSeenAt: string | null): number {
  if (!lastSeenAt) return Infinity;
  return (Date.now() - parseISO(lastSeenAt).getTime()) / (1000 * 60 * 60);
}

function ragShare(u: MateUser): number {
  if (u.tool_calls_24h === 0) return 1; // ignore inactive users for "low RAG" detection
  return u.rag_calls_24h / u.tool_calls_24h;
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

export default function AdminMate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sort, setSort] = useState<SortKey>('recent');
  const [provisionOpen, setProvisionOpen] = useState(false);

  const { data, isLoading, isFetching, error } = useQuery<MateHealth>({
    queryKey: ['admin-mate-health'],
    refetchInterval: 60_000,
    staleTime: 30_000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');
      const { data, error } = await supabase.functions.invoke('admin-mate-health', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      return data as MateHealth;
    },
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['admin-mate-health'] });
    setTimeout(() => setIsRefreshing(false), 500);
  }, [queryClient]);

  const filterCounts = useMemo(() => {
    if (!data) return null;
    const u = data.users;
    return {
      all: u.length,
      active: u.filter((x) => lastSeenAge(x.last_seen_at) <= 24).length,
      errors: u.filter((x) => x.errors_24h > 0).length,
      jwt: u.filter((x) => jwtDays(x.jwt_expires_at) < 14).length,
      idle: u.filter((x) => lastSeenAge(x.last_seen_at) > 24 * 7).length,
      lowrag: u.filter((x) => x.tool_calls_24h > 0 && ragShare(x) < 0.3).length,
    };
  }, [data]);

  const filteredSortedUsers = useMemo(() => {
    if (!data) return [];
    let list = data.users.slice();

    if (filter === 'active') list = list.filter((x) => lastSeenAge(x.last_seen_at) <= 24);
    else if (filter === 'errors') list = list.filter((x) => x.errors_24h > 0);
    else if (filter === 'jwt') list = list.filter((x) => jwtDays(x.jwt_expires_at) < 14);
    else if (filter === 'idle') list = list.filter((x) => lastSeenAge(x.last_seen_at) > 24 * 7);
    else if (filter === 'lowrag')
      list = list.filter((x) => x.tool_calls_24h > 0 && ragShare(x) < 0.3);

    list.sort((a, b) => {
      if (sort === 'errors') return b.errors_24h - a.errors_24h;
      if (sort === 'jwt') return jwtDays(a.jwt_expires_at) - jwtDays(b.jwt_expires_at);
      if (sort === 'active') return b.tool_calls_24h - a.tool_calls_24h;
      if (sort === 'lowrag') return ragShare(a) - ragShare(b);
      return lastSeenAge(a.last_seen_at) - lastSeenAge(b.last_seen_at);
    });

    return list;
  }, [data, filter, sort]);

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
        <PageHero eyebrow="Mate" title="Couldn't load" tone="red" />
        <EmptyState
          title="Health snapshot unavailable"
          description={(error as Error)?.message ?? 'Try refreshing in a moment.'}
          action="Retry"
          onAction={handleRefresh}
        />
      </PageFrame>
    );
  }

  const { summary, top_errors_24h, tool_reliability_7d } = data;
  const ragPct = Math.round(summary.rag_share_24h * 100);
  const errorPct = Math.round(summary.error_rate_24h * 100);

  const filterTabs: { value: FilterKey; label: string; count?: number }[] = [
    { value: 'all', label: 'All', count: filterCounts?.all },
    { value: 'active', label: 'Active', count: filterCounts?.active },
    { value: 'errors', label: 'Errors', count: filterCounts?.errors },
    { value: 'jwt', label: 'JWT', count: filterCounts?.jwt },
    { value: 'idle', label: 'Idle', count: filterCounts?.idle },
    { value: 'lowrag', label: 'Low RAG', count: filterCounts?.lowrag },
  ];

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Mate"
          description="Health of the Elec-AI agent fleet. Tool calls, errors, and how often answers come from the RAG corpus."
          tone="yellow"
          live={{ label: 'Live' }}
          actions={
            <>
              <button
                onClick={() => setProvisionOpen(true)}
                className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Provision
              </button>
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
          live
          tone={ragPct >= 60 ? 'emerald' : ragPct >= 30 ? 'amber' : 'red'}
          value={<AnimatedCounter value={ragPct} suffix="%" />}
          caption={`${summary.rag_calls_24h} of ${summary.tool_calls_24h} tool calls hit BS 7671 / GN3 / OSG`}
          columns={[
            {
              label: 'Tool calls',
              value: <AnimatedCounter value={summary.tool_calls_24h} />,
            },
            {
              label: 'RAG calls',
              value: <AnimatedCounter value={summary.rag_calls_24h} />,
              tone: 'emerald',
            },
            {
              label: 'Error rate',
              value: <AnimatedCounter value={errorPct} suffix="%" />,
              tone: errorPct >= 5 ? 'red' : errorPct >= 1 ? 'orange' : 'emerald',
            },
          ]}
        />

        <StatStrip
          columns={5}
          stats={(() => {
            const t = formatMinutes(summary.minutes_saved_7d);
            return [
              {
                label: 'Agents',
                value: <AnimatedCounter value={summary.total_agents} />,
              },
              {
                label: 'Active 24h',
                value: <AnimatedCounter value={summary.active_24h} />,
                tone: 'green',
              },
              {
                label: 'Time saved 7d',
                value: (
                  <span>
                    {t.value}
                    <span className="text-[0.55em] font-medium ml-0.5">{t.suffix}</span>
                  </span>
                ),
                sub: 'Fleet',
                accent: true,
              },
              {
                label: 'Calls 7d',
                value: <AnimatedCounter value={summary.tool_calls_7d} />,
              },
              {
                label: 'Spend 30d',
                value: formatUsd(summary.cost_30d),
                sub: `${formatUsd(summary.cost_7d)} last 7d`,
                tone: 'purple',
              },
            ];
          })()}
        />

        <Divider label="Agents" />

        <FilterBar
          tabs={filterTabs}
          activeTab={filter}
          onTabChange={(v) => setFilter(v as FilterKey)}
          actions={
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-10 w-[170px] shrink-0 rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] focus:border-elec-yellow/60 text-[13px] text-white touch-manipulation">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                <SelectItem value="recent">Recently seen</SelectItem>
                <SelectItem value="active">Most active 24h</SelectItem>
                <SelectItem value="errors">Most errors</SelectItem>
                <SelectItem value="jwt">JWT expiring</SelectItem>
                <SelectItem value="lowrag">Lowest RAG</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Provisioned agents"
            meta={
              <span className="text-[11px] text-white tabular-nums">
                {filteredSortedUsers.length} shown
              </span>
            }
          />
          {filteredSortedUsers.length === 0 ? (
            <EmptyState
              title="No agents match"
              description={
                filter === 'all'
                  ? 'No agents provisioned yet — provision a user via the VPS and they will appear here.'
                  : 'Try a different filter or sort.'
              }
            />
          ) : (
            <ListBody>
              {filteredSortedUsers.map((u) => {
                const lastSeen = u.last_seen_at
                  ? formatDistanceToNow(parseISO(u.last_seen_at), {
                      addSuffix: true,
                    }).replace('about ', '')
                  : 'Never';
                const errPct = Math.round(u.error_rate_24h * 100);
                const lowRag = u.tool_calls_24h > 0 && ragShare(u) < 0.3;
                const jwtT = jwtTone(u.jwt_expires_at);
                const jwtUrgent = jwtT === 'red' || jwtT === 'orange';
                return (
                  <ListRow
                    key={u.user_id}
                    lead={<Avatar initials={getInitials(u.full_name)} />}
                    title={<span className="truncate">{u.full_name ?? 'Unknown'}</span>}
                    subtitle={
                      <span className="truncate">
                        <span className="hidden sm:inline">
                          {[u.phone, u.role].filter(Boolean).join(' · ') || '—'}
                          {' · '}
                        </span>
                        <span className="tabular-nums">{u.tool_calls_24h} calls</span>
                        {u.minutes_saved_7d > 0 && (
                          <span className="tabular-nums text-emerald-300/80">
                            {' · '}
                            {(() => {
                              const t = formatMinutes(u.minutes_saved_7d);
                              return `${t.value}${t.suffix} saved 7d`;
                            })()}
                          </span>
                        )}
                        {u.errors_24h > 0 && (
                          <span className="tabular-nums text-red-400">
                            {' · '}
                            {u.errors_24h} err
                          </span>
                        )}
                        <span className="tabular-nums text-white/70">
                          {' · '}
                          {lastSeen}
                        </span>
                      </span>
                    }
                    trailing={
                      <>
                        <Pill tone={statusTone(u.agent_status)}>{u.agent_status ?? '—'}</Pill>
                        <Pill tone={jwtT} className={cn(!jwtUrgent && 'hidden md:inline-flex')}>
                          JWT {jwtLabel(u.jwt_expires_at)}
                        </Pill>
                        {errPct >= 5 && (
                          <Pill tone="red" className="hidden sm:inline-flex">
                            {errPct}%
                          </Pill>
                        )}
                        {lowRag && (
                          <Pill tone="amber" className="hidden md:inline-flex">
                            Low RAG
                          </Pill>
                        )}
                      </>
                    }
                    onClick={() => navigate(`/admin/mate/${u.user_id}`)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>

        <Divider label="Tools" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ListCard>
            <ListCardHeader
              tone={tool_reliability_7d.some((t) => t.success_rate < 0.95) ? 'amber' : 'emerald'}
              title="Tool reliability — 7d"
              meta={
                <span className="text-[11px] text-white tabular-nums">
                  {tool_reliability_7d.length} tools ·{' '}
                  {tool_reliability_7d.filter((t) => t.failures > 0).length} with errors
                </span>
              }
            />
            {tool_reliability_7d.length === 0 ? (
              <EmptyState
                title="No tool calls in the last 7d"
                description="Reliability stats will appear here as agents work."
              />
            ) : (
              <ListBody>
                {tool_reliability_7d.map((t) => {
                  const pct = Math.round(t.success_rate * 100);
                  const tone: Tone =
                    t.success_rate >= 0.99 ? 'emerald' : t.success_rate >= 0.95 ? 'amber' : 'red';
                  const slowTone: Tone | undefined =
                    t.p95_ms > 5000 ? 'red' : t.p95_ms > 2000 ? 'amber' : undefined;
                  return (
                    <ListRow
                      key={t.tool}
                      accent={t.failures > 0 ? tone : undefined}
                      title={
                        <span className="truncate">
                          {t.tool}
                          {t.failures > 0 && t.last_error && (
                            <span className="text-red-400/80 hidden md:inline">
                              {' · '}
                              {t.last_error.slice(0, 60)}
                            </span>
                          )}
                        </span>
                      }
                      subtitle={
                        <span className="tabular-nums">
                          {t.calls} call{t.calls === 1 ? '' : 's'} · {t.users} user
                          {t.users === 1 ? '' : 's'} · p95{' '}
                          <span
                            className={cn(
                              slowTone === 'red' && 'text-red-400',
                              slowTone === 'amber' && 'text-amber-400'
                            )}
                          >
                            {t.p95_ms}ms
                          </span>
                          {t.failures > 0 && (
                            <>
                              {' · '}
                              <span className="text-red-400">{t.failures} fail</span>
                            </>
                          )}
                        </span>
                      }
                      trailing={<Pill tone={tone}>{pct}%</Pill>}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>

          <ListCard>
            <ListCardHeader
              tone={top_errors_24h.length > 0 ? 'red' : 'emerald'}
              title="Recent errors — 24h"
              meta={
                <span className="text-[11px] text-white tabular-nums">
                  {summary.errors_24h} total
                </span>
              }
            />
            {top_errors_24h.length === 0 ? (
              <EmptyState title="No errors" description="Nothing's failed in the last 24h. Nice." />
            ) : (
              <ListBody>
                {top_errors_24h.map((e, i) => (
                  <ListRow
                    key={`${e.tool}-${i}`}
                    accent="red"
                    title={
                      <span className="truncate">
                        {e.tool}
                        <span className="text-white/60 hidden sm:inline">
                          {' · '}
                          {e.error}
                        </span>
                      </span>
                    }
                    subtitle={
                      <span className="tabular-nums truncate">
                        <span className="sm:hidden text-white/60">{e.error} · </span>
                        {e.users_affected} user
                        {e.users_affected === 1 ? '' : 's'} · last{' '}
                        {formatDistanceToNow(parseISO(e.last_seen), {
                          addSuffix: true,
                        }).replace('about ', '')}
                      </span>
                    }
                    trailing={<Pill tone="red">{e.count}</Pill>}
                  />
                ))}
              </ListBody>
            )}
          </ListCard>
        </div>
      </PageFrame>

      <ProvisionMateSheet
        open={provisionOpen}
        onOpenChange={setProvisionOpen}
        onProvisioned={handleRefresh}
      />
    </PullToRefresh>
  );
}

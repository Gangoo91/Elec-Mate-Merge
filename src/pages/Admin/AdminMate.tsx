/**
 * /admin/mate — Mate (Elec-AI agent fleet) health dashboard.
 * Read-only. Aggregates from agent_action_log via the admin-mate-health edge function.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
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
}

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

export default function AdminMate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const { summary, users, top_tools_24h, top_errors_24h } = data;
  const ragPct = Math.round(summary.rag_share_24h * 100);
  const errorPct = Math.round(summary.error_rate_24h * 100);

  return (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Mate"
        description="Health of the Elec-AI agent fleet. Tool calls, errors, and how often answers come from the RAG corpus."
        tone="yellow"
        live={{ label: 'Live' }}
        actions={
          <IconButton
            onClick={handleRefresh}
            disabled={isFetching || isRefreshing}
            aria-label="Refresh"
          >
            <RefreshCw className={cn('h-4 w-4', (isFetching || isRefreshing) && 'animate-spin')} />
          </IconButton>
        }
      />

      {/* RAG-grounded hero — the A4:2026 truth meter */}
      <HeroNumber
        eyebrow="RAG-grounded — last 24h"
        live
        tone={ragPct >= 60 ? 'emerald' : ragPct >= 30 ? 'amber' : 'red'}
        value={<AnimatedCounter value={ragPct} suffix="%" />}
        caption={`${summary.rag_calls_24h} of ${summary.tool_calls_24h} tool calls hit the BS 7671 / GN3 / OSG corpus`}
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
        columns={4}
        stats={[
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
            label: 'Active 7d',
            value: <AnimatedCounter value={summary.active_7d} />,
            tone: 'blue',
          },
          {
            label: 'Calls 7d',
            value: <AnimatedCounter value={summary.tool_calls_7d} />,
          },
        ]}
      />

      <Divider label="Agents" />

      <ListCard>
        <ListCardHeader
          tone="yellow"
          title="Provisioned agents"
          meta={
            <span className="text-[11px] text-white tabular-nums">
              {users.length} total · {summary.active_24h} active 24h
            </span>
          }
        />
        {users.length === 0 ? (
          <EmptyState
            title="No agents provisioned yet"
            description="Once you provision a user via the VPS, they'll appear here."
          />
        ) : (
          <ListBody>
            {users.map((u) => {
              const lastSeen = u.last_seen_at
                ? formatDistanceToNow(parseISO(u.last_seen_at), {
                    addSuffix: true,
                  }).replace('about ', '')
                : 'Never';
              const errPct = Math.round(u.error_rate_24h * 100);
              return (
                <ListRow
                  key={u.user_id}
                  lead={<Avatar initials={getInitials(u.full_name)} />}
                  title={u.full_name ?? 'Unknown'}
                  subtitle={
                    <span className="truncate">
                      {[u.phone, u.role].filter(Boolean).join(' · ') || '—'}
                      {' · '}
                      <span className="tabular-nums">{u.tool_calls_24h} calls / 24h</span>
                      {u.errors_24h > 0 && (
                        <span className="tabular-nums text-red-400">
                          {' · '}
                          {u.errors_24h} err
                        </span>
                      )}
                    </span>
                  }
                  trailing={
                    <>
                      <Pill tone={statusTone(u.agent_status)}>{u.agent_status ?? 'unknown'}</Pill>
                      <Pill tone={jwtTone(u.jwt_expires_at)}>JWT {jwtLabel(u.jwt_expires_at)}</Pill>
                      {errPct >= 5 && <Pill tone="red">{errPct}% err</Pill>}
                      <span className="text-[11px] text-white tabular-nums whitespace-nowrap">
                        {lastSeen}
                      </span>
                    </>
                  }
                  onClick={() => navigate(`/admin/users?focus=${u.user_id}`)}
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
            tone="cyan"
            title="Top tools — 24h"
            meta={
              <span className="text-[11px] text-white tabular-nums">
                {top_tools_24h.length} distinct
              </span>
            }
          />
          {top_tools_24h.length === 0 ? (
            <EmptyState
              title="No tool calls in the last 24h"
              description="Activity will show up here as agents handle messages."
            />
          ) : (
            <ListBody>
              {top_tools_24h.map((t) => (
                <ListRow
                  key={t.tool}
                  title={t.tool}
                  trailing={
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {t.count}
                    </span>
                  }
                />
              ))}
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
                      <span className="text-white/60"> · {e.error}</span>
                    </span>
                  }
                  subtitle={
                    <span className="tabular-nums">
                      {e.users_affected} user
                      {e.users_affected === 1 ? '' : 's'} affected · last{' '}
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
  );
}

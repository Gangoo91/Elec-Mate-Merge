/**
 * AdminColdOutreach
 *
 * Live dashboard for the Instantly cold-outreach campaign. Shows:
 * - Event counts (sent, opened, replied, bounced, unsubscribed) — last 30 days
 * - Daily time-series over last 14 days
 * - Attribution: matched signups, by segment, trials + paid conversions
 * - Suppression source breakdown
 * - Live reply feed
 * - Attributed users list
 *
 * Data via edge function get-cold-outreach-stats; admin-only auth.
 */

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Send,
  MailOpen,
  MessageCircle,
  AlertTriangle,
  Ban,
  Users,
  Target,
  TrendingUp,
  Inbox,
  Calendar,
} from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

interface SummaryResponse {
  eventCountsLast30Days: Record<string, number>;
  totalAttributed: number;
  bySegment: Record<string, number>;
  trialsStarted: number;
  paidConversions: number;
  suppressionBySource: Record<string, number>;
  totalSuppressions: number;
  byDay: Array<{
    day: string;
    sent: number;
    opened: number;
    replied: number;
    bounced: number;
    unsubscribed: number;
  }>;
}

interface ReplyEvent {
  id: string;
  email: string;
  reply_subject: string | null;
  reply_text: string | null;
  occurred_at: string;
  campaign_id: string | null;
}

interface AttributedUser {
  id: string;
  email: string;
  source_segment: string | null;
  first_touch_at: string | null;
  signup_at: string;
  trial_started_at: string | null;
  converted_to_paid_at: string | null;
}

async function callStats<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke('get-cold-outreach-stats', {
    body: { action, ...payload },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data as T;
}

// ─── Small stat card ─────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'yellow',
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent?: 'yellow' | 'cyan' | 'red' | 'green' | 'purple';
  sub?: string;
}) {
  const accents: Record<string, string> = {
    yellow: 'bg-elec-yellow/15 text-elec-yellow border-elec-yellow/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  };
  return (
    <Card className="bg-elec-gray border-white/10">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">
              {label}
            </p>
            <p className="text-2xl font-bold text-white mt-1 tabular-nums">{value}</p>
            {sub && <p className="text-[11px] text-white/50 mt-1">{sub}</p>}
          </div>
          <div className={`rounded-lg p-2 border ${accents[accent]}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main ────────────────────────────────────────────────────────
export default function AdminColdOutreach() {
  const [activeTab, setActiveTab] = useState<'summary' | 'replies' | 'users'>('summary');

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['cold-outreach-summary'],
    queryFn: () => callStats<SummaryResponse>('summary'),
    staleTime: 60 * 1000,
    refetchInterval: 90 * 1000,
  });

  const { data: repliesData, isLoading: repliesLoading } = useQuery({
    queryKey: ['cold-outreach-replies'],
    queryFn: () => callStats<{ replies: ReplyEvent[] }>('replies'),
    staleTime: 60 * 1000,
    enabled: activeTab === 'replies',
  });

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['cold-outreach-users'],
    queryFn: () => callStats<{ users: AttributedUser[] }>('attributed_users'),
    staleTime: 60 * 1000,
    enabled: activeTab === 'users',
  });

  // Derived rates
  const openRate = useMemo(() => {
    if (!summary) return 0;
    const sent = summary.eventCountsLast30Days.email_sent || 0;
    const opened = summary.eventCountsLast30Days.email_opened || 0;
    if (sent === 0) return 0;
    return Math.round((opened / sent) * 1000) / 10;
  }, [summary]);

  const replyRate = useMemo(() => {
    if (!summary) return 0;
    const sent = summary.eventCountsLast30Days.email_sent || 0;
    const replied =
      (summary.eventCountsLast30Days.reply_received || 0) +
      (summary.eventCountsLast30Days.email_replied || 0);
    if (sent === 0) return 0;
    return Math.round((replied / sent) * 1000) / 10;
  }, [summary]);

  const bounceRate = useMemo(() => {
    if (!summary) return 0;
    const sent = summary.eventCountsLast30Days.email_sent || 0;
    const bounced = summary.eventCountsLast30Days.email_bounced || 0;
    if (sent === 0) return 0;
    return Math.round((bounced / sent) * 1000) / 10;
  }, [summary]);

  const ec = summary?.eventCountsLast30Days || {};
  const totalReplied = (ec.reply_received || 0) + (ec.email_replied || 0);
  const totalUnsub = (ec.lead_unsubscribed || 0) + (ec.email_unsubscribed || 0);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-4">
      <AdminPageHeader title="Cold Outreach" subtitle="Live stats from Instantly via Supabase" />

      <div className="px-3 sm:px-4 md:px-6 space-y-4">
        {/* Tab bar */}
        <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          {(['summary', 'replies', 'users'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`h-11 px-4 rounded-xl text-sm font-semibold whitespace-nowrap touch-manipulation ${
                activeTab === t
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {t === 'summary' ? 'Summary' : t === 'replies' ? 'Replies' : 'Attributed users'}
            </button>
          ))}
        </div>

        {activeTab === 'summary' && (
          <>
            {/* KPI cards */}
            {summaryLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <StatCard
                    label="Sent (30d)"
                    value={(ec.email_sent || 0).toLocaleString()}
                    icon={Send}
                    accent="yellow"
                  />
                  <StatCard
                    label="Opened"
                    value={(ec.email_opened || 0).toLocaleString()}
                    icon={MailOpen}
                    accent="cyan"
                    sub={`${openRate}% open rate`}
                  />
                  <StatCard
                    label="Replied"
                    value={totalReplied.toLocaleString()}
                    icon={MessageCircle}
                    accent="green"
                    sub={`${replyRate}% reply rate`}
                  />
                  <StatCard
                    label="Bounced"
                    value={(ec.email_bounced || 0).toLocaleString()}
                    icon={AlertTriangle}
                    accent="red"
                    sub={`${bounceRate}% bounce rate`}
                  />
                  <StatCard
                    label="Unsubbed"
                    value={totalUnsub.toLocaleString()}
                    icon={Ban}
                    accent="red"
                  />
                  <StatCard
                    label="Suppressed (total)"
                    value={(summary?.totalSuppressions || 0).toLocaleString()}
                    icon={Ban}
                    accent="red"
                  />
                </div>

                {/* Attribution block */}
                <Card className="bg-elec-gray border-white/10">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-elec-yellow" />
                      <h3 className="font-semibold text-white">
                        Attribution — cold email → signup
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <StatCard
                        label="Attributed signups"
                        value={summary?.totalAttributed || 0}
                        icon={Users}
                        accent="yellow"
                      />
                      <StatCard
                        label="Trials started"
                        value={summary?.trialsStarted || 0}
                        icon={TrendingUp}
                        accent="cyan"
                      />
                      <StatCard
                        label="Paid conversions"
                        value={summary?.paidConversions || 0}
                        icon={TrendingUp}
                        accent="green"
                      />
                      <StatCard
                        label="Conversion rate"
                        value={
                          summary?.totalAttributed
                            ? `${((summary.paidConversions / summary.totalAttributed) * 100).toFixed(1)}%`
                            : '—'
                        }
                        icon={TrendingUp}
                        accent="purple"
                      />
                    </div>

                    {summary && Object.keys(summary.bySegment).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {Object.entries(summary.bySegment).map(([seg, n]) => (
                          <Badge key={seg} variant="outline" className="border-white/20 text-white">
                            {seg}: {n}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Daily time series */}
                {summary && summary.byDay.length > 0 && (
                  <Card className="bg-elec-gray border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-5 w-5 text-cyan-400" />
                        <h3 className="font-semibold text-white">Last 14 days</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead>
                            <tr className="text-left text-white/60 border-b border-white/10">
                              <th className="py-2 pr-3">Day</th>
                              <th className="py-2 pr-3 tabular-nums">Sent</th>
                              <th className="py-2 pr-3 tabular-nums">Opened</th>
                              <th className="py-2 pr-3 tabular-nums">Replied</th>
                              <th className="py-2 pr-3 tabular-nums">Bounced</th>
                              <th className="py-2 tabular-nums">Unsub</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {summary.byDay
                              .slice()
                              .reverse()
                              .map((d) => (
                                <tr key={d.day} className="border-b border-white/5">
                                  <td className="py-2 pr-3 whitespace-nowrap">{d.day}</td>
                                  <td className="py-2 pr-3 tabular-nums">{d.sent}</td>
                                  <td className="py-2 pr-3 tabular-nums text-cyan-400">
                                    {d.opened}
                                  </td>
                                  <td className="py-2 pr-3 tabular-nums text-emerald-400">
                                    {d.replied}
                                  </td>
                                  <td className="py-2 pr-3 tabular-nums text-red-400">
                                    {d.bounced}
                                  </td>
                                  <td className="py-2 tabular-nums text-red-400">
                                    {d.unsubscribed}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Suppression breakdown */}
                <Card className="bg-elec-gray border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Ban className="h-5 w-5 text-red-400" />
                      <h3 className="font-semibold text-white">Suppression sources</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {summary &&
                        Object.entries(summary.suppressionBySource).map(([src, n]) => (
                          <Badge
                            key={src}
                            variant="outline"
                            className="border-red-500/30 text-red-300"
                          >
                            {src}: {n}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </>
        )}

        {activeTab === 'replies' && (
          <Card className="bg-elec-gray border-white/10">
            <CardContent className="p-0">
              {repliesLoading ? (
                <div className="p-4 space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))}
                </div>
              ) : repliesData?.replies && repliesData.replies.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {repliesData.replies.map((r) => (
                    <div key={r.id} className="p-4 touch-manipulation">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-white truncate">{r.email}</p>
                        <span className="text-[11px] text-white/50 whitespace-nowrap">
                          {formatDistanceToNow(parseISO(r.occurred_at), { addSuffix: true })}
                        </span>
                      </div>
                      {r.reply_subject && (
                        <p className="text-[13px] text-white/70 mt-1 truncate">{r.reply_subject}</p>
                      )}
                      {r.reply_text && (
                        <p className="text-[13px] text-white/80 mt-2 line-clamp-3 whitespace-pre-wrap">
                          {r.reply_text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-white/60">
                  <Inbox className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No replies yet.
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'users' && (
          <Card className="bg-elec-gray border-white/10">
            <CardContent className="p-0">
              {usersLoading ? (
                <div className="p-4 space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded-lg" />
                  ))}
                </div>
              ) : usersData?.users && usersData.users.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {usersData.users.map((u) => (
                    <div
                      key={u.id}
                      className="p-3 flex items-center justify-between gap-3 touch-manipulation"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">{u.email}</p>
                        <p className="text-[11px] text-white/60 mt-0.5">
                          {u.source_segment || '—'} · signed up{' '}
                          {formatDistanceToNow(parseISO(u.signup_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        {u.trial_started_at && (
                          <Badge className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
                            trial
                          </Badge>
                        )}
                        {u.converted_to_paid_at && (
                          <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                            paid
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-white/60">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No attributed signups yet.
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

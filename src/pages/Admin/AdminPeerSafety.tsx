/**
 * AdminPeerSafety — whether Mental Health Mates is safe to leave switched on.
 *
 * It used to be a moderation queue and nothing else: everything on the page
 * was driven by `mental_health_peer_reports`, a table that has never had a row
 * in it. So the page's permanent state was four zeroes and "nothing needs your
 * attention right now", while the things that genuinely needed attention were
 * invisible:
 *
 *   - Two people opened a Mental Health Mates conversation — 112 days ago and
 *     39 days ago — and not one message has ever been sent in either. Both are
 *     still marked active.
 *   - All three supporters show as available. Between them they have sent zero
 *     messages, ever. `last_active_at` has two writers — a supporter toggling
 *     their own availability on, and the conversation-insert trigger firing
 *     when somebody ELSE starts a chat with them — so it is never evidence
 *     that the supporter was present, and "last seen" was never what it
 *     claimed.
 *   - Deactivating a supporter was only reachable by resolving a report, and
 *     no report exists, so in practice the page's one action did not exist.
 *
 * Reports still get a section, and it says plainly that none has ever been
 * filed rather than implying a queue is being kept clear.
 */
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import {
  ShieldAlert,
  Loader2,
  CheckCheck,
  UserX,
  UserCheck,
  AlertTriangle,
  RefreshCw,
  MessageSquareOff,
  Send,
  Ban,
  CircleSlash,
} from 'lucide-react';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import { PageFrame, IconButton, LoadingBlocks } from '@/components/admin/editorial';
import {
  Panel,
  SectionHead,
  RoundAvatar,
  GOOD,
  SERIOUS,
  ACCENT,
} from '@/components/admin/overview/primitives';
import { usePeerSupportOverview, daysSince } from '@/hooks/usePeerSupportOverview';
import {
  usePeerConversations,
  usePeerBlocks,
  isStalled,
  isIgnored,
  bySeverity,
  type PeerConversation,
} from '@/hooks/usePeerConversations';

interface PeerReport {
  id: string;
  created_at: string;
  status: 'pending' | 'reviewed' | 'dismissed' | 'actioned';
  reason: string;
  additional_notes: string | null;
  admin_notes: string | null;
  reviewed_at: string | null;
  reviewed_by_name: string | null;
  conversation_id: string | null;
  reporter_id: string;
  reporter_name: string | null;
  reported_user_id: string;
  reported_name: string | null;
  reported_is_supporter: boolean;
  supporter_is_active: boolean;
}

interface ReportMessage {
  id: string;
  sender_id: string;
  sender_is_reported: boolean;
  content: string;
  created_at: string;
}

/* Status colours are reserved — never a categorical slot, always paired with a
   word rather than carrying the meaning alone. */
const WARN = '#FAB219';

const reasonLabel = (reason: string) =>
  reason.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

const getInitials = (name?: string | null) => {
  const src = (name && name.trim()) || '?';
  const parts = src.split(/[\s@._-]+/).filter(Boolean);
  return (parts[0]?.[0] ?? '?').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase();
};

/** Days, spoken the way a person would say it. */
const ageLabel = (days: number | null): string => {
  if (days === null) return 'never';
  if (days === 0) return 'today';
  if (days < 14) return `${days}d`;
  if (days < 60) return `${Math.floor(days / 7)}w`;
  return `${Math.floor(days / 30)}mo`;
};

export default function AdminPeerSafety() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<PeerReport | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const { data: peer, isLoading: peerLoading } = usePeerSupportOverview();
  const { data: conversations, isLoading: convLoading } = usePeerConversations();
  const { data: blocks } = usePeerBlocks();
  /* Reaching out to someone who was left sitting in an empty thread — the one
     thing the page had no way to do about the problem it was reporting. */
  const [messageTarget, setMessageTarget] = useState<{
    id: string;
    full_name?: string;
  } | null>(null);

  const {
    data: reports,
    isLoading: reportsLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-peer-reports'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_list_peer_reports' as never);
      if (error) throw error;
      return (data ?? []) as PeerReport[];
    },
    staleTime: 30 * 1000,
  });

  const { data: transcript, isLoading: transcriptLoading } = useQuery({
    queryKey: ['admin-peer-report-messages', selected?.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_get_peer_report_messages' as never, {
        p_report_id: selected!.id,
      } as never);
      if (error) throw error;
      return (data ?? []) as ReportMessage[];
    },
    enabled: !!selected?.id && !!selected?.conversation_id,
  });

  const resolveMutation = useMutation({
    mutationFn: async ({
      status,
      deactivate,
    }: {
      status: 'reviewed' | 'dismissed' | 'actioned';
      deactivate: boolean;
    }) => {
      const { error } = await supabase.rpc('admin_resolve_peer_report' as never, {
        p_report_id: selected!.id,
        p_status: status,
        p_admin_notes: adminNotes.trim() || null,
        p_deactivate_supporter: deactivate,
      } as never);
      if (error) throw error;
    },
    onSuccess: (_, { status, deactivate }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-peer-reports'] });
      queryClient.invalidateQueries({ queryKey: ['admin-peer-support-overview'] });
      setSelected(null);
      setAdminNotes('');
      toast({
        title: deactivate ? 'Supporter deactivated' : `Report ${status}`,
        description: deactivate
          ? 'They can no longer appear as a Mental Health Mate.'
          : 'The report has been updated.',
      });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to update', description: error.message, variant: 'destructive' });
    },
  });

  /*
    Rota changes without needing a report.

    `is_available` is the flag a person in distress is matched against, so
    being able to clear it directly is the whole point — and until now the only
    route to it was resolving a report that has never existed.
  */
  const rotaMutation = useMutation({
    mutationFn: async ({
      supporterId,
      isActive,
      isAvailable,
    }: {
      supporterId: string;
      isActive?: boolean;
      isAvailable?: boolean;
    }) => {
      const { error } = await supabase.rpc('admin_set_peer_supporter_state' as never, {
        p_supporter_id: supporterId,
        p_is_active: isActive ?? null,
        p_is_available: isAvailable ?? null,
      } as never);
      if (error) throw error;
    },
    onSuccess: (_, v) => {
      queryClient.invalidateQueries({ queryKey: ['admin-peer-support-overview'] });
      queryClient.invalidateQueries({ queryKey: ['admin-peer-conversations'] });
      toast({
        title:
          v.isActive === false
            ? 'Supporter deactivated'
            : v.isActive === true
              ? 'Supporter reactivated'
              : v.isAvailable === false
                ? 'Taken off the rota'
                : 'Put back on the rota',
        description:
          v.isAvailable === false || v.isActive === false
            ? 'Nobody new can be matched to them.'
            : 'They can be matched to someone again.',
      });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to update', description: error.message, variant: 'destructive' });
    },
  });

  const endMutation = useMutation({
    mutationFn: async (conversationId: string) => {
      const { error } = await supabase.rpc('admin_end_peer_conversation' as never, {
        p_conversation_id: conversationId,
      } as never);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-peer-conversations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-peer-support-overview'] });
      toast({
        title: 'Conversation closed',
        description: 'It no longer counts as live. Nobody has been notified.',
      });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to close', description: error.message, variant: 'destructive' });
    },
  });

  const pending = useMemo(() => reports?.filter((r) => r.status === 'pending') ?? [], [reports]);
  const stalled = useMemo(() => (conversations ?? []).filter(isStalled), [conversations]);
  /** Someone spoke and has never been answered. The sharpest failure there is. */
  const ignored = useMemo(() => (conversations ?? []).filter(isIgnored), [conversations]);

  /** Worst first — see `bySeverity`, which lives in the hook so it is testable. */
  const orderedConversations = useMemo(
    () => [...(conversations ?? [])].sort(bySeverity),
    [conversations]
  );

  /*
    Bookable and has never replied to anybody.

    Stronger than `staleAvailable`, which keys off `last_active_at` — a column
    with two writers, neither of which proves the supporter was present.
    `messages_sent` is counted from the messages table, so "has never replied
    to anyone" is a claim that cannot be wrong.
  */
  const bookableNeverReplied = useMemo(
    () => (peer?.supporters ?? []).filter((x) => x.is_active && x.is_available && x.messages_sent === 0),
    [peer]
  );

  /*
    Replies ever sent, by anybody on the rota.

    The supporter row carries its own `total_conversations` counter and it has
    drifted badly — the three rows add up to nine against two conversations
    that exist — so nothing here reads from it. Message counts are computed
    from the messages table on every call.
  */
  const repliesEver = useMemo(
    () => (peer?.supporters ?? []).reduce((t, s) => t + s.messages_sent, 0),
    [peer]
  );

  /** Real conversation counts per supporter, since the stored counter lies. */
  const convosBySupporter = useMemo(() => {
    const m = new Map<string, number>();
    (conversations ?? []).forEach((c) => {
      if (!c.supporter_row_id) return;
      m.set(c.supporter_row_id, (m.get(c.supporter_row_id) ?? 0) + 1);
    });
    return m;
  }, [conversations]);

  const isLoading = peerLoading || convLoading || reportsLoading;

  const openReport = (report: PeerReport) => {
    setSelected(report);
    setAdminNotes(report.admin_notes ?? '');
  };

  /*
    What the page leads with, in order of how bad it is.

    A filed report outranks everything. Then somebody who spoke and was never
    answered — the sharpest failure the feature has, and it used to rank below
    the quieter one. Then a conversation nobody is having. Then, failing all
    that, the rota's own state: when nothing is bookable the feature is shut
    whether or not anyone decided to shut it, and saying so beats reporting a
    cheerful nought.
  */
  const lead =
    pending.length > 0
      ? {
          eyebrow: 'Reports needing review',
          value: pending.length,
          line: `${pending.length} report${pending.length === 1 ? '' : 's'} waiting on you.`,
        }
      : ignored.length > 0
        ? {
            eyebrow: 'Asked, never answered',
            value: ignored.length,
            line: `${ignored.length} ${ignored.length === 1 ? 'person' : 'people'} wrote to a Mate and ${ignored.length === 1 ? 'has' : 'have'} had no reply at all.`,
          }
        : stalled.length > 0
          ? {
              eyebrow: 'Conversations going nowhere',
              value: stalled.length,
              line: `${stalled.length} open conversation${stalled.length === 1 ? '' : 's'} with no message in ${stalled.length === 1 ? 'it' : 'them'} from either side.`,
            }
          : (peer?.available ?? 0) === 0
            ? {
                eyebrow: 'Nobody bookable',
                value: 0,
                line: 'Mental Health Mates is effectively closed — someone looking for a person to talk to will be shown an empty list.',
              }
            : {
                eyebrow: 'Peer support',
                value: peer?.available ?? 0,
                line: `${peer?.available ?? 0} supporter${(peer?.available ?? 0) === 1 ? '' : 's'} bookable · ${conversations?.length ?? 0} conversation${(conversations?.length ?? 0) === 1 ? '' : 's'} all time.`,
              };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
        await queryClient.invalidateQueries({ queryKey: ['admin-peer-support-overview'] });
        await queryClient.invalidateQueries({ queryKey: ['admin-peer-conversations'] });
      }}
    >
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row — same shape as the dashboard, Trials, Revenue and Messages. */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Peer safety
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  background: pending.length > 0 || stalled.length > 0 ? SERIOUS : GOOD,
                }}
              />
              Mental Health Mates
            </div>
          </div>
          <IconButton onClick={() => refetch()} aria-label="Refresh" disabled={isFetching}>
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </IconButton>
        </div>

        <Panel tone="accent">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                {lead.eyebrow}
              </div>
              <div className="mt-3 text-[44px] font-semibold leading-[46px] tracking-[-0.03em] text-white lg:text-[56px] lg:leading-[56px]">
                {lead.value}
              </div>
              <div className="mt-2 text-[13px] leading-[18px] text-white">{lead.line}</div>

              {/*
                Name them. A count of stalled conversations is a statistic; the
                person who reached out in May and is still sitting in an empty
                thread is the reason the page exists.
              */}
              {stalled.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {stalled.slice(0, 3).map((c) => (
                    <li key={c.conversation_id} className="flex items-start gap-2 text-[12.5px]">
                      <MessageSquareOff
                        className="mt-[3px] h-3.5 w-3.5 shrink-0"
                        style={{ color: SERIOUS }}
                        aria-hidden
                      />
                      <span className="text-white">
                        <span className="font-semibold">{c.seeker_name ?? 'Someone'}</span> was
                        matched with {c.supporter_name ?? 'a supporter'}{' '}
                        <span style={{ color: SERIOUS }} className="font-semibold">
                          {formatDistanceToNowStrict(new Date(c.started_at))} ago
                        </span>
                        . Nothing has been said in it since.
                      </span>
                    </li>
                  ))}
                  {stalled.length > 3 && (
                    <li className="pl-[22px] text-[12.5px] text-white/70">
                      and {stalled.length - 3} more below.
                    </li>
                  )}
                </ul>
              )}

              {/*
                Supporters who are bookable and have never replied to anybody.

                This used to key off `staleAvailable` — `last_active_at` older
                than thirty days — but that column has two writers and neither
                proves the supporter was present, so it could say "recent" for
                someone who has never done a thing. `messages_sent` is counted
                from the messages table, so "never replied to anyone" is a
                claim that cannot be wrong.

                `last_active_at` is written in one place only — when a supporter
                toggles their own availability on — so this is "switched
                themselves on N ago", never "was here N ago". Saying "last seen"
                was claiming something the column cannot support.
              */}
              {bookableNeverReplied.length > 0 && (
                <div className="mt-5 rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-3">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: WARN }}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-white">
                        {bookableNeverReplied.length} bookable, never replied to anyone
                      </div>
                      <div className="mt-0.5 text-[12px] leading-[17px] text-white">
                        {bookableNeverReplied
                          .map((x) => {
                            const d = daysSince(x.last_active_at);
                            return `${x.display_name || 'Unnamed'} (last activity ${ageLabel(d)} ago)`;
                          })
                          .join(', ')}
                        . Someone in distress can be matched to any of them
                        right now. Their profile now reads &ldquo;Last active N
                        ago&rdquo; rather than the old &ldquo;Usually responds
                        within an hour&rdquo;, so at least the absence is
                        visible before anyone picks them.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Raised cards, not holes — elevation runs lighter than the panel. */}
            <div className="grid grid-cols-2 gap-2.5 self-start">
              {[
                {
                  label: 'Stalled',
                  value: stalled.length,
                  sub: 'no message either way',
                  accent: stalled.length > 0,
                },
                {
                  label: 'Bookable now',
                  value: peer?.available ?? 0,
                  sub: `of ${peer?.active ?? 0} active`,
                },
                {
                  label: 'Replies ever',
                  value: repliesEver,
                  sub: 'sent by all supporters',
                  accent: repliesEver === 0,
                },
                {
                  label: 'Reports',
                  value: pending.length,
                  sub: `${reports?.length ?? 0} ever filed`,
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5"
                >
                  <div
                    className={cn(
                      'text-[22px] font-semibold leading-none sm:text-[26px]',
                      c.accent ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {c.value}
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[11px] text-white">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          <>
            {/*
              The conversations. New to this page, and the reason for it.
            */}
            <Panel>
              <SectionHead
                title="Conversations"
                meta={
                  (conversations?.length ?? 0) === 0
                    ? 'none yet'
                    : `${conversations!.length} all time · ${stalled.length} stalled`
                }
              />
              {(conversations?.length ?? 0) === 0 ? (
                <p className="py-8 text-center text-[13px] text-white">
                  Nobody has opened a Mental Health Mates conversation yet.
                </p>
              ) : (
                <div className="mt-1">
                  {orderedConversations.map((c) => (
                    <ConversationRow
                      key={c.conversation_id}
                      conv={c}
                      onMessage={() =>
                        setMessageTarget({
                          id: c.seeker_id,
                          full_name: c.seeker_name ?? undefined,
                        })
                      }
                      onClose={() => endMutation.mutate(c.conversation_id)}
                      busy={endMutation.isPending}
                    />
                  ))}
                </div>
              )}
            </Panel>

            {/* The rota — with the actions that were unreachable before. */}
            <Panel>
              <SectionHead
                title="The rota"
                meta={
                  peer
                    ? `${peer.active} active · ${peer.available} bookable · ${repliesEver} replies ever`
                    : undefined
                }
              />
              {(peer?.supporters.length ?? 0) === 0 ? (
                <p className="py-8 text-center text-[13px] text-white">
                  Nobody has signed up as a Mental Health Mate.
                </p>
              ) : (
                <div className="mt-1">
                  {peer!.supporters.map((s) => {
                    const d = daysSince(s.last_active_at);
                    const stale = s.is_active && s.is_available && (d === null || d > 30);
                    const realConvos = convosBySupporter.get(s.supporter_id) ?? 0;
                    const state = !s.is_active
                      ? { label: 'Deactivated', colour: 'rgba(255,255,255,0.5)' }
                      : stale
                        ? { label: 'Bookable, absent', colour: WARN }
                        : s.is_available
                          ? { label: 'Bookable', colour: GOOD }
                          : { label: 'Off rota', colour: 'rgba(255,255,255,0.5)' };
                    return (
                      <div
                        key={s.supporter_id}
                        /*
                          The actions wrap to their own line on a phone.

                          As a plain `flex-1` beside two buttons the name column
                          got squeezed to nothing at 390px — the rota read "A.",
                          "B.", "C." with the names truncated to one character.
                          Giving the text block a full-width basis below `sm`
                          pushes the buttons onto the next row instead.
                        */
                        className="flex flex-wrap items-start gap-x-3 gap-y-2.5 border-b border-white/[0.06] py-3 last:border-b-0"
                      >
                        <span className="mt-0.5 shrink-0">
                          <RoundAvatar initials={getInitials(s.display_name || s.email)} />
                        </span>
                        <div className="min-w-0 flex-1 basis-[calc(100%-2.75rem)] sm:basis-auto">
                          <div className="flex items-baseline gap-2">
                            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold leading-[19px] text-white">
                              {s.display_name || 'Unnamed supporter'}
                            </span>
                            <span
                              className="shrink-0 text-[11px] font-semibold"
                              style={{ color: state.colour }}
                            >
                              {state.label}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] leading-4 text-white">
                            {/*
                              "Replies ever" rather than a conversation count:
                              the stored `total_conversations` says nine across
                              a rota that has had two conversations, and a
                              supporter who has never typed is the fact that
                              matters here.
                            */}
                            <span
                              className="font-semibold"
                              style={{ color: s.messages_sent === 0 ? SERIOUS : undefined }}
                            >
                              {s.messages_sent} repl{s.messages_sent === 1 ? 'y' : 'ies'} ever
                            </span>
                            <span className="text-white/70">
                              {realConvos} conversation{realConvos === 1 ? '' : 's'}
                            </span>
                            <span
                              className="text-white/70"
                              title="last_active_at moves when a supporter toggles their availability on, and when someone else starts a chat with them. Neither means they were present."
                            >
                              last activity {ageLabel(d)} ago
                            </span>
                            {s.reports_against > 0 && (
                              <span className="font-semibold" style={{ color: SERIOUS }}>
                                {s.reports_against} reported
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex w-full shrink-0 items-center gap-2 pl-11 sm:w-auto sm:pl-0">
                          {/*
                            Ask them before you act on them.

                            Every action here was something done TO a supporter
                            — off the rota, deactivated — with no way to ask the
                            obvious question first. All three have been absent
                            for weeks or months; "are you still up for this?" is
                            the step before taking anyone off.
                          */}
                          {s.user_id && (
                            <button
                              type="button"
                              aria-label={`Message ${s.display_name || 'supporter'}`}
                              title="Message them"
                              onClick={() =>
                                setMessageTarget({
                                  id: s.user_id,
                                  full_name: s.display_name ?? undefined,
                                })
                              }
                              className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-white/[0.12] text-white transition-colors hover:bg-white/[0.06] sm:h-9 sm:w-9"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          )}
                          {s.is_active && (
                            <button
                              type="button"
                              onClick={() =>
                                rotaMutation.mutate({
                                  supporterId: s.supporter_id,
                                  isAvailable: !s.is_available,
                                })
                              }
                              disabled={rotaMutation.isPending}
                              className="h-11 touch-manipulation whitespace-nowrap rounded-lg border border-white/[0.12] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06] disabled:opacity-40 sm:h-9"
                            >
                              {s.is_available ? 'Take off rota' : 'Put on rota'}
                            </button>
                          )}
                          <button
                            type="button"
                            aria-label={
                              s.is_active ? 'Deactivate supporter' : 'Reactivate supporter'
                            }
                            title={s.is_active ? 'Deactivate supporter' : 'Reactivate supporter'}
                            onClick={() =>
                              rotaMutation.mutate({
                                supporterId: s.supporter_id,
                                isActive: !s.is_active,
                              })
                            }
                            disabled={rotaMutation.isPending}
                            className={cn(
                              'flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border transition-colors disabled:opacity-40 sm:h-9 sm:w-9',
                              s.is_active
                                ? 'border-white/[0.12] text-white hover:border-[#E66767]/40 hover:text-[#E66767]'
                                : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
                            )}
                          >
                            {s.is_active ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>

            {/*
              Blocks. The other half of "peer safety", and it had no home.

              A person blocking the supporter they were matched with never
              files a report — they just leave — so a page that read only
              `mental_health_peer_reports` would never have seen it.
            */}
            {(blocks?.length ?? 0) > 0 && (
              <Panel>
                <SectionHead title="Blocks" meta={`${blocks!.length} all time`} />
                <div className="mt-1">
                  {blocks!.map((b) => (
                    <div
                      key={b.block_id}
                      className="flex items-start gap-3 border-b border-white/[0.06] py-3 last:border-b-0"
                    >
                      <Ban
                        className="mt-1 h-4 w-4 shrink-0"
                        style={{ color: SERIOUS }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] leading-[18px] text-white">
                          <span className="font-semibold">{b.blocker_name ?? 'Someone'}</span>{' '}
                          blocked{' '}
                          <span className="font-semibold">{b.blocked_name ?? 'someone'}</span>
                          {b.blocked_is_supporter &&
                            ` — a supporter, ${b.blocked_supporter_active ? 'still active' : 'since deactivated'}`}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white/70">
                          {formatDistanceToNowStrict(new Date(b.created_at))} ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {/* Reports. Small, because there have never been any. */}
            <Panel>
              <SectionHead
                title="Reports"
                meta={
                  (reports?.length ?? 0) === 0
                    ? `none ever filed · ${blocks?.length ?? 0} block${(blocks?.length ?? 0) === 1 ? '' : 's'}`
                    : `${pending.length} pending of ${reports!.length}`
                }
              />
              {(reports?.length ?? 0) === 0 ? (
                <p className="py-8 text-center text-[13px] leading-[18px] text-white">
                  No report has ever been filed from a Mental Health Mates chat.
                  <br />
                  <span className="text-white/70">
                    Reports arrive here the moment one is, with the conversation attached.
                  </span>
                </p>
              ) : (
                <div className="mt-1">
                  {reports!.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => openReport(r)}
                      className="flex w-full touch-manipulation items-start gap-3 border-b border-white/[0.06] py-3 text-left transition-colors last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          background:
                            r.status === 'pending'
                              ? SERIOUS
                              : r.status === 'actioned'
                                ? WARN
                                : 'rgba(255,255,255,0.3)',
                        }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span className="min-w-0 flex-1 truncate text-[14px] font-semibold leading-[19px] text-white">
                            {r.reported_name ?? 'Unknown user'}
                            {r.reported_is_supporter ? ' · supporter' : ''}
                          </span>
                          <span className="shrink-0 text-[11px] font-semibold capitalize text-white">
                            {r.status}
                          </span>
                        </span>
                        <span className="mt-1 block text-[12.5px] leading-[17px] text-white">
                          {reasonLabel(r.reason)} — reported by {r.reporter_name ?? 'unknown'} ·{' '}
                          {format(new Date(r.created_at), 'd MMM yyyy')}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </Panel>
          </>
        )}

        {/* Report detail */}
        <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
            {selected && (
              <div className="flex h-full flex-col bg-background">
                <SheetHeader className="border-b border-white/[0.06] px-5 pb-4 pt-5 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <ShieldAlert className="h-4 w-4" style={{ color: SERIOUS }} />
                    <SheetTitle className="text-[17px] text-white">
                      {selected.reported_name ?? 'Unknown user'}
                    </SheetTitle>
                    <span className="text-[11px] font-semibold capitalize text-white">
                      {selected.status}
                    </span>
                    {selected.reported_is_supporter && (
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: selected.supporter_is_active ? ACCENT : SERIOUS }}
                      >
                        {selected.supporter_is_active ? 'Active supporter' : 'Deactivated'}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[12.5px] text-white">
                    {reasonLabel(selected.reason)} — reported by{' '}
                    {selected.reporter_name ?? 'unknown'} on{' '}
                    {format(new Date(selected.created_at), 'd MMM yyyy, h:mm a')}
                  </p>
                  {selected.additional_notes && (
                    <p className="mt-2 rounded-xl border border-white/[0.06] bg-white/[0.04] px-3 py-2.5 text-[13px] text-white">
                      &ldquo;{selected.additional_notes}&rdquo;
                    </p>
                  )}
                  {/*
                    How it was resolved, and by whom.

                    `reviewed_by_name`, `reviewed_at` and `admin_notes` were all
                    on the record and none was ever rendered — so a report
                    closed months ago by a colleague opened looking exactly like
                    an untouched one, and the notes box silently repopulated
                    with their text under a fresh-looking header.
                  */}
                  {selected.status !== 'pending' && (
                    <p className="mt-2 text-[12px] leading-[17px] text-white/70">
                      {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                      {selected.reviewed_by_name ? ` by ${selected.reviewed_by_name}` : ''}
                      {selected.reviewed_at
                        ? ` ${formatDistanceToNowStrict(new Date(selected.reviewed_at))} ago`
                        : ''}
                      {selected.admin_notes ? ` — "${selected.admin_notes}"` : '. No notes left.'}
                    </p>
                  )}
                </SheetHeader>

                <div className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4">
                  {!selected.conversation_id ? (
                    <p className="py-8 text-center text-[13px] text-white">
                      No conversation attached to this report.
                    </p>
                  ) : transcriptLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  ) : !transcript || transcript.length === 0 ? (
                    <p className="py-8 text-center text-[13px] text-white">
                      No messages in this conversation.
                    </p>
                  ) : (
                    <>
                      <p className="pb-1 text-center text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white">
                        Conversation — moderation access via this report only
                      </p>
                      {transcript.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            'flex',
                            m.sender_is_reported ? 'justify-start' : 'justify-end'
                          )}
                        >
                          <div
                            className={cn(
                              'max-w-[85%] rounded-2xl border px-3.5 py-2.5',
                              m.sender_is_reported
                                ? 'rounded-bl-md border-white/[0.14] bg-white/[0.07] text-white'
                                : 'rounded-br-md border-white/[0.06] bg-white/[0.03] text-white'
                            )}
                          >
                            <p className="whitespace-pre-wrap text-[13px] leading-relaxed">
                              {m.content}
                            </p>
                            <span className="mt-1 block text-[10px] tabular-nums text-white">
                              {m.sender_is_reported ? 'Reported user' : 'Reporter side'} ·{' '}
                              {format(new Date(m.created_at), 'd MMM, h:mm a')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="space-y-3 border-t border-white/[0.06] p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Admin notes (kept on the report)…"
                    className="min-h-[64px] touch-manipulation border-white/30 bg-white/[0.03] text-base text-white focus:border-yellow-500 focus:ring-2 focus:ring-elec-yellow/20"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ status: 'dismissed', deactivate: false })
                      }
                      disabled={resolveMutation.isPending}
                      className="h-11 touch-manipulation rounded-xl border border-white/[0.1] bg-white/[0.06] text-[13px] font-medium text-white active:scale-[0.98] disabled:opacity-40"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ status: 'reviewed', deactivate: false })
                      }
                      disabled={resolveMutation.isPending}
                      className="inline-flex h-11 touch-manipulation items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.1] text-[13px] font-semibold text-white active:scale-[0.98] disabled:opacity-40"
                    >
                      <CheckCheck className="h-4 w-4" /> Mark reviewed
                    </button>
                  </div>
                  {selected.reported_is_supporter && selected.supporter_is_active && (
                    <button
                      onClick={() =>
                        resolveMutation.mutate({ status: 'actioned', deactivate: true })
                      }
                      disabled={resolveMutation.isPending}
                      className="inline-flex h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-xl border text-[13px] font-semibold active:scale-[0.98] disabled:opacity-40"
                      style={{ borderColor: 'rgba(230,103,103,0.4)', color: '#E66767' }}
                    >
                      {resolveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <UserX className="h-4 w-4" />
                      )}
                      Deactivate supporter &amp; close report
                    </button>
                  )}
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
        <MessageUserSheet
          open={!!messageTarget}
          onOpenChange={(open) => !open && setMessageTarget(null)}
          user={messageTarget}
        />
      </PageFrame>
    </PullToRefresh>
  );
}

/**
 * One peer conversation.
 *
 * The message counts are the substance: a thread where the seeker has spoken
 * and the supporter has not is a different failure from one where neither has,
 * and the page used to show neither because it showed no conversations at all.
 */
function ConversationRow({
  conv,
  onMessage,
  onClose,
  busy,
}: {
  conv: PeerConversation;
  onMessage: () => void;
  onClose: () => void;
  busy: boolean;
}) {
  const stalled = isStalled(conv);
  const ignored = isIgnored(conv);
  const state = stalled
    ? { label: 'Nothing said', colour: SERIOUS }
    : ignored
      ? { label: 'No reply', colour: SERIOUS }
      : conv.status === 'active'
        ? { label: 'Active', colour: GOOD }
        : { label: conv.status.charAt(0).toUpperCase() + conv.status.slice(1), colour: 'rgba(255,255,255,0.5)' };
  const live = conv.status === 'active';

  return (
    <div className="flex flex-wrap items-start gap-x-3 gap-y-2.5 border-b border-white/[0.06] py-3 last:border-b-0">
      <span className="mt-0.5 shrink-0">
        <RoundAvatar initials={getInitials(conv.seeker_name)} />
      </span>
      <div className="min-w-0 flex-1 basis-[calc(100%-2.75rem)] sm:basis-auto">
        <div className="flex items-baseline gap-2">
          <span className="min-w-0 flex-1 truncate text-[14px] font-semibold leading-[19px] text-white">
            {conv.seeker_name ?? 'Unknown'}
          </span>
          <span className="shrink-0 text-[11px] font-semibold" style={{ color: state.colour }}>
            {state.label}
          </span>
        </div>
        <div className="mt-1 text-[12.5px] leading-[17px] text-white">
          Matched with {conv.supporter_name ?? 'a supporter'}{' '}
          {formatDistanceToNowStrict(new Date(conv.started_at))} ago
          {!conv.supporter_is_available && conv.supporter_is_active && ' (now off the rota)'}
          {!conv.supporter_is_active && ' (since deactivated)'}
        </div>
        {/*
          Age is stated once. The line above already says how long ago the
          match was made, so a second "open 5w" beside it was the same fact in
          a different unit — 5 weeks and 1 month, two numbers for one thing.
        */}
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] leading-4 text-white">
          <span className="text-white/70">
            {conv.total_messages} message{conv.total_messages === 1 ? '' : 's'}
          </span>
          {conv.total_messages > 0 && (
            <span className="text-white/70">
              {conv.seeker_messages} from them · {conv.supporter_messages} back
            </span>
          )}
          {conv.ended_at && (
            <span className="text-white/70">
              closed {formatDistanceToNowStrict(new Date(conv.ended_at))} ago
            </span>
          )}
          {conv.reports_on_conversation > 0 && (
            <span className="font-semibold" style={{ color: SERIOUS }}>
              {conv.reports_on_conversation} reported
            </span>
          )}
        </div>
      </div>
      {/*
        Something to actually do about it.

        The page could name two people who had been sitting in an empty thread
        for months and offered no way to reach either of them, which made it a
        report rather than a tool. Messaging them is the primary action and
        goes through the same admin inbox as everything else; closing is the
        quiet one, and says in its toast that nobody is told.
      */}
      {live && (
        <div className="flex w-full shrink-0 items-center gap-2 pl-11 sm:w-auto sm:pl-0">
          <button
            type="button"
            onClick={onMessage}
            className="inline-flex h-11 touch-manipulation items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/[0.12] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06] sm:h-9"
          >
            <Send className="h-3.5 w-3.5" />
            Message them
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Close conversation"
            title="Close conversation"
            className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-white/[0.12] text-white transition-colors hover:bg-white/[0.06] disabled:opacity-40 sm:h-9 sm:w-9"
          >
            <CircleSlash className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

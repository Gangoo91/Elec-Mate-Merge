import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';
import { ApprenticeMessageSheet } from './ApprenticeMessageSheet';

/* ==========================================================================
   MyTutorMessagesCard — apprentice-side digest of tutor message threads.
   Shows unread count + last preview, primary CTA opens the conversation
   sheet. Realtime — new tutor messages bump the card without refresh.
   ========================================================================== */

interface ThreadRow {
  id: string;
  subject: string | null;
  last_message_at: string;
  unread_count_student: number;
}

interface LatestMsg {
  thread_id: string;
  body: string;
  sender_kind: string;
  created_at: string;
}

function fmtRel(iso: string): string {
  const t = new Date(iso).getTime();
  const mins = Math.round((Date.now() - t) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyTutorMessagesCard() {
  const { toast } = useToast();
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [latestMsg, setLatestMsg] = useState<LatestMsg | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // Track the previous unread total so we only toast on transitions
  // (new message arrived) rather than on every refetch.
  const prevUnreadRef = useRef<number | null>(null);

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    const { data: cs } = await supabase
      .from('college_students')
      .select('id')
      .eq('user_id', uid)
      .maybeSingle();
    const csId = (cs?.id as string | undefined) ?? null;
    if (!csId) {
      setLoading(false);
      return;
    }

    const { data: t } = await supabase
      .from('student_message_threads')
      .select('id, subject, last_message_at, unread_count_student')
      .eq('student_id', csId)
      .order('last_message_at', { ascending: false })
      .limit(10);
    const tRows = (t ?? []) as ThreadRow[];
    setThreads(tRows);

    if (tRows.length > 0) {
      // Pull the most-recent message across these threads for a preview line.
      const { data: m } = await supabase
        .from('student_messages')
        .select('thread_id, body, sender_kind, created_at')
        .in(
          'thread_id',
          tRows.map((r) => r.id)
        )
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      setLatestMsg((m as LatestMsg) ?? null);
    } else {
      setLatestMsg(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — new messages or thread bumps update the card.
  useEffect(() => {
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return;
      const { data: cs } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', uid)
        .maybeSingle();
      const csId = (cs?.id as string | undefined) ?? null;
      if (!csId) return;
      chan = supabase
        .channel(realtimeChannelName(`my_tutor_threads:${csId}`))
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'student_message_threads',
            filter: `student_id=eq.${csId}`,
          },
          () => fetchAll()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [fetchAll]);

  const unreadTotal = useMemo(
    () => threads.reduce((acc, t) => acc + (t.unread_count_student ?? 0), 0),
    [threads]
  );

  // Toast on unread total going up — fires whether the apprentice is
  // mid-screen on the hub or anywhere else this card is mounted. Only
  // when the sheet is closed (otherwise they'll see the message live).
  useEffect(() => {
    if (loading) return;
    const prev = prevUnreadRef.current;
    if (prev !== null && unreadTotal > prev && !open) {
      toast({
        title: 'New tutor message',
        description: latestMsg?.body
          ? latestMsg.body.slice(0, 100)
          : 'Open the conversation to read it.',
      });
    }
    prevUnreadRef.current = unreadTotal;
  }, [unreadTotal, loading, open, latestMsg?.body, toast]);

  if (loading) return <Skeleton />;

  const empty = threads.length === 0;

  return (
    <>
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-blue-300/85">
              Messages
            </div>
            {unreadTotal > 0 && (
              <span className="text-[10.5px] tabular-nums text-white/85">
                {unreadTotal} unread from your tutor
              </span>
            )}
          </div>

          {empty ? (
            <>
              <p className="mt-3 text-[12.5px] text-white/90 leading-snug">
                Got a question for your tutor? Start a conversation. They'll see it the next time
                they open your Student 360.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 w-full h-11 rounded-lg bg-white/[0.02] text-white text-[13px] font-semibold hover:bg-white/[0.02] transition-colors touch-manipulation"
              >
                Message your tutor
              </button>
            </>
          ) : (
            <>
              {latestMsg && (
                <div
                  className={cn('mt-3 border-l-2 pl-3 py-1',
                    latestMsg.sender_kind === 'tutor' ? 'border-white/[0.06]' : 'border-white/[0.10]'
                  )}
                >
                  <div className="text-[10.5px] uppercase tracking-[0.14em] text-white/95">
                    {latestMsg.sender_kind === 'tutor' ? 'Tutor' : 'You'} ·{' '}
                    {fmtRel(latestMsg.created_at)}
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-white/85 leading-snug line-clamp-2">
                    {latestMsg.body}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={cn('mt-4 w-full h-11 rounded-lg text-[13px] font-semibold transition-colors touch-manipulation',
                  unreadTotal > 0
                    ? 'bg-white/[0.02] text-white hover:bg-white/[0.02]'
                    : 'border border-white/[0.10] bg-white/[0.02] text-white/85 hover:text-white hover:border-white/[0.22]'
                )}
              >
                {unreadTotal > 0 ? 'Read tutor message →' : 'Open conversation'}
              </button>
            </>
          )}
        </div>
      </section>

      <ApprenticeMessageSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3">
        <div className="h-3 w-20 rounded-full bg-white/[0.05]" />
        <div className="h-12 rounded-md bg-white/[0.04]" />
        <div className="h-11 rounded-lg bg-white/[0.04]" />
      </div>
    </section>
  );
}

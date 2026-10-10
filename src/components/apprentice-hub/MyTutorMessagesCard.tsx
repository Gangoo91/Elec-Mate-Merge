import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyTutorMessagesCard() {
  const { toast } = useToast();
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [latestMsg, setLatestMsg] = useState<LatestMsg | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [deepThread, setDeepThread] = useState<string | null>(null);
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

  // ?thread=<id> (the "Do next" item, ELE-1896) opens that conversation.
  useEffect(() => {
    const id = searchParams.get('thread');
    if (!id) return;
    setDeepThread(id);
    setOpen(true);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('thread');
        return next;
      },
      { replace: true }
    );
  }, [searchParams, setSearchParams]);

  if (loading) return <Skeleton />;

  const empty = threads.length === 0;

  return (
    <>
      <section className={LC_FRAME}>
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-[15px] font-semibold tracking-tight text-white">Messages</div>
            {unreadTotal > 0 && (
              <span className={lcChip('action')}>{unreadTotal} new from your tutor</span>
            )}
          </div>

          {empty ? (
            <>
              <p className="mt-3 text-[12.5px] text-white leading-snug">
                Got a question for your tutor? Start a conversation. They'll see it the next time
                they open your Student 360.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 h-11 w-full rounded-xl border border-white/[0.14] text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
              >
                Message your tutor
              </button>
            </>
          ) : (
            <>
              {latestMsg && (
                <div className="mt-3 rounded-xl border border-white/[0.08] px-3.5 py-2.5">
                  <div className="text-[12px] font-semibold text-white">
                    {latestMsg.sender_kind === 'tutor' ? 'Your tutor' : 'You'},{' '}
                    {fmtRel(latestMsg.created_at)}
                  </div>
                  <p className="mt-0.5 text-[13.5px] text-white leading-snug line-clamp-2">
                    {latestMsg.body}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 h-11 w-full rounded-xl border border-white/[0.14] text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
              >
                {unreadTotal > 0 ? 'Read tutor message' : 'Open conversation'}
              </button>
            </>
          )}
        </div>
      </section>

      <ApprenticeMessageSheet open={open} onOpenChange={setOpen} initialThreadId={deepThread} />
    </>
  );
}

function Skeleton() {
  return (
    <section className={LC_FRAME}>
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3">
        <div className="h-3 w-20 rounded-full bg-white/[0.05]" />
        <div className="h-12 rounded-md bg-white/[0.04]" />
        <div className="h-11 rounded-lg bg-white/[0.04]" />
      </div>
    </section>
  );
}

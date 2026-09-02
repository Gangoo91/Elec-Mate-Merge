import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { cn } from '@/lib/utils';

/* ==========================================================================
   ApprenticeMessageSheet — apprentice-side mirror of StudentMessageSheet.
   Threaded conversation with their tutor. Optimistic-send + realtime.

   Schema: student_message_threads.student_id = college_students.id
           student_messages.sender_kind = 'student' for outgoing.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

interface Thread {
  id: string;
  subject: string | null;
  last_message_at: string;
  unread_count_student: number;
}

interface Message {
  id: string;
  thread_id: string;
  sender_kind: 'tutor' | 'student' | 'parent' | 'employer' | 'system';
  body: string;
  created_at: string;
  read_at: string | null;
}

interface TeamMember {
  role: 'Tutor' | 'Assessor' | 'IQA';
  name: string;
}

export function ApprenticeMessageSheet({ open, onOpenChange }: Props) {
  const { toast } = useToast();

  const [collegeStudentId, setCollegeStudentId] = useState<string | null>(null);
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [authUid, setAuthUid] = useState<string | null>(null);

  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [draft, setDraft] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [mode, setMode] = useState<'list' | 'thread' | 'new'>('list');
  const [sending, setSending] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Who actually reads these messages — tutor / assessor / IQA names so the
  // header isn't an anonymous void. Returns [] when nothing is assigned yet.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.rpc('get_my_college_team' as never);
      if (cancelled) return;
      const rows = data as unknown as TeamMember[] | null;
      setTeam(Array.isArray(rows) ? rows : []);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Resolve identity once on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id ?? null;
      if (cancelled) return;
      setAuthUid(uid);
      if (!uid) return;
      const { data: cs } = await supabase
        .from('college_students')
        .select('id, college_id')
        .eq('user_id', uid)
        .maybeSingle();
      if (cancelled) return;
      setCollegeStudentId((cs?.id as string | undefined) ?? null);
      setCollegeId((cs?.college_id as string | undefined) ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load threads when sheet opens
  useEffect(() => {
    if (!open || !collegeStudentId) return;
    let cancelled = false;
    setLoadingThreads(true);
    supabase
      .from('student_message_threads')
      .select('id, subject, last_message_at, unread_count_student')
      .eq('student_id', collegeStudentId)
      .order('last_message_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (cancelled) return;
        const rows = (data ?? []) as Thread[];
        setThreads(rows);
        if (rows.length === 0) setMode('new');
        else if (rows.length === 1) {
          setActiveThreadId(rows[0].id);
          setMode('thread');
        } else {
          setMode('list');
        }
        setLoadingThreads(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, collegeStudentId]);

  const loadMessages = useCallback(async (threadId: string) => {
    const { data } = await supabase
      .from('student_messages')
      .select('id, thread_id, sender_kind, body, created_at, read_at')
      .eq('thread_id', threadId)
      .order('created_at');
    setMessages((data ?? []) as Message[]);
  }, []);

  useEffect(() => {
    if (!activeThreadId) return;
    loadMessages(activeThreadId);
  }, [activeThreadId, loadMessages]);

  // Mark thread as read for the apprentice via the SECURITY DEFINER RPC.
  // Direct UPDATE on student_message_threads is blocked by RLS for the
  // apprentice — the RPC handles both the counter zero + read_at stamp.
  useEffect(() => {
    if (!activeThreadId || !open) return;
    let cancelled = false;
    (async () => {
      await supabase.rpc('mark_message_thread_read', { p_thread_id: activeThreadId });
      if (cancelled) return;
      setThreads((prev) =>
        prev.map((t) => (t.id === activeThreadId ? { ...t, unread_count_student: 0 } : t))
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [activeThreadId, open]);

  // Realtime — message-level for the active thread + thread-level for the
  // list view (so tutor's new replies bump the right thread to the top).
  // Gated on `open` so the channel tears down when the sheet closes.
  useEffect(() => {
    if (!open || !activeThreadId) return;
    const chan = supabase
      .channel(realtimeChannelName(`apprentice_messages:${activeThreadId}`))
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'student_messages',
          filter: `thread_id=eq.${activeThreadId}`,
        },
        (payload) => {
          const row = payload.new as Message;
          setMessages((prev) => (prev.some((m) => m.id === row.id) ? prev : [...prev, row]));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chan);
    };
  }, [open, activeThreadId]);

  useEffect(() => {
    if (!open || !collegeStudentId) return;
    const chan = supabase
      .channel(realtimeChannelName(`apprentice_threads:${collegeStudentId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_message_threads',
          filter: `student_id=eq.${collegeStudentId}`,
        },
        () => {
          supabase
            .from('student_message_threads')
            .select('id, subject, last_message_at, unread_count_student')
            .eq('student_id', collegeStudentId)
            .order('last_message_at', { ascending: false })
            .limit(50)
            .then(({ data }) => setThreads((data ?? []) as Thread[]));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chan);
    };
  }, [open, collegeStudentId]);

  // Auto-scroll on new messages
  useEffect(() => {
    // The scrolling element is FormSheet's body, not this div — ask the
    // browser to bring the end of the thread into view instead.
    scrollRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = draft.trim();
    if (!trimmed || !collegeStudentId || !collegeId || !authUid) return;

    const optToken = `opt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const optMsg: Message = {
      id: optToken,
      thread_id: activeThreadId ?? optToken,
      sender_kind: 'student',
      body: trimmed,
      created_at: new Date().toISOString(),
      read_at: null,
    };
    setMessages((prev) => [...prev, optMsg]);
    const subjForNew = newSubject.trim();
    setDraft('');
    setNewSubject('');
    if (mode === 'new') setMode('thread');
    setSending(true);

    try {
      let threadId = activeThreadId;
      if (!threadId) {
        const { data: nt, error: te } = await supabase
          .from('student_message_threads')
          .insert({
            student_id: collegeStudentId,
            college_id: collegeId,
            subject: subjForNew || null,
            // created_by FKs to college_staff.id (staff-initiated threads
            // only) — an auth uid here violates the FK and broke every
            // apprentice-started conversation. Apprentice threads carry null;
            // the student_id + sender_kind='student' on the message identify
            // the learner.
            created_by: null,
            // No counter seeding — the bump_thread_counters trigger
            // bumps unread_count_tutor when the message is inserted
            // immediately after.
          })
          .select('id, subject, last_message_at, unread_count_student')
          .maybeSingle();
        if (te || !nt) throw te ?? new Error('Could not create thread');
        threadId = nt.id;
        setThreads((t) => [nt as Thread, ...t]);
        setActiveThreadId(threadId);
      }

      const { data: ins, error: me } = await supabase
        .from('student_messages')
        .insert({
          thread_id: threadId,
          sender_kind: 'student',
          sender_id: authUid,
          body: trimmed,
        })
        .select('id, thread_id, sender_kind, body, created_at, read_at')
        .maybeSingle();
      if (me || !ins) throw me ?? new Error('Could not send');

      setMessages((prev) => prev.map((m) => (m.id === optToken ? (ins as Message) : m)));

      // No manual counter update — the bump_thread_counters trigger on
      // student_messages auto-bumps unread_count_tutor and last_message_at
      // server-side (and works regardless of apprentice RLS write perms).
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== optToken));
      setDraft(trimmed);
      toast({
        title: 'Could not send',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const tutor = team.find((m) => m.role === 'Tutor') ?? null;
  const others = team.filter((m) => m !== tutor);

  const headerAction =
    mode === 'thread' && threads.length > 1 ? (
      <button
        type="button"
        onClick={() => setMode('list')}
        className="h-11 px-2 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
      >
        All threads
      </button>
    ) : mode === 'list' ? (
      <button
        type="button"
        onClick={() => {
          setActiveThreadId(null);
          setMode('new');
        }}
        className={cn(buttonSecondaryCn, 'h-11 px-3.5 text-[12.5px] font-semibold')}
      >
        New thread
      </button>
    ) : undefined;

  const composer = (
    <div className="flex items-end gap-2">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={2}
        placeholder="Write a message…"
        // ELE-1419 — the OS capitalises the first letter otherwise.
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        className={cn(textareaCn, 'min-h-[44px] flex-1 resize-none')}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!draft.trim() || sending}
        className={cn(buttonPrimaryCn, 'h-11 shrink-0 px-5 text-[13px]')}
      >
        {sending ? '…' : 'Send'}
      </button>
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Messages · College team"
      title={tutor ? tutor.name : 'Your college team'}
      description={
        others.length > 0
          ? `Also sees this: ${others.map((m) => `${m.name} · ${m.role}`).join(', ')}`
          : team.length === 0
            ? 'Messages go to your college — a tutor will be assigned soon.'
            : undefined
      }
      headerTrailing={headerAction}
      footer={mode === 'thread' || mode === 'new' ? composer : undefined}
      bodyClassName="space-y-0"
    >
      <div ref={scrollRef} className="py-2">
        {mode === 'list' && (
          <ThreadList
            threads={threads}
            loading={loadingThreads}
            onPick={(id) => {
              setActiveThreadId(id);
              setMode('thread');
            }}
          />
        )}
        {mode === 'thread' && <MessageList messages={messages} />}
        {mode === 'new' && (
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject (optional)"
              className={inputCn}
            />
            <div className="flex items-center justify-center py-10">
              <EmptyThreadState />
            </div>
          </div>
        )}
      </div>
    </FormSheet>
  );
}

function ThreadList({
  threads,
  loading,
  onPick,
}: {
  threads: Thread[];
  loading: boolean;
  onPick: (id: string) => void;
}) {
  if (loading) return <div className="text-[12px] text-white">Loading…</div>;
  if (threads.length === 0)
    return (
      <p className="text-[12px] text-white leading-snug">
        No conversations yet. Start one — your college team sees it instantly.
      </p>
    );
  return (
    <ul className="divide-y divide-white/[0.06]">
      {threads.map((t) => (
        <li key={t.id}>
          <button
            type="button"
            onClick={() => onPick(t.id)}
            className="flex min-h-11 w-full items-baseline justify-between gap-3 px-1 py-3 text-left transition-colors hover:bg-white/[0.04] touch-manipulation"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-white truncate">
                {t.subject ?? 'Conversation'}
              </div>
              {t.unread_count_student > 0 && (
                <div className="mt-0.5 text-[10px] font-medium text-elec-yellow tabular-nums">
                  {t.unread_count_student} unread
                </div>
              )}
            </div>
            <span className="text-[10px] text-white tabular-nums whitespace-nowrap">
              {new Date(t.last_message_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function EmptyThreadState() {
  return (
    <div className="flex flex-col items-center gap-2 px-6 text-center">
      <MessageCircle className="h-6 w-6 text-white" strokeWidth={1.5} />
      <p className="text-[14px] font-medium text-white">Start the conversation</p>
      <p className="text-[12px] text-white leading-snug">
        Your college team sees this instantly — replies land right here.
      </p>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  if (messages.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <EmptyThreadState />
      </div>
    );
  return (
    <div className="space-y-3">
      {messages.map((m) => {
        const isMe = m.sender_kind === 'student';
        return (
          <div key={m.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug',
                isMe
                  ? 'rounded-br-md bg-elec-yellow text-black'
                  : cn('rounded-bl-md border border-white/[0.10] text-white', CARD_SURFACE)
              )}
            >
              <div className="whitespace-pre-wrap break-words">{m.body}</div>
              <div
                className={cn(
                  'mt-1 text-[10px] tabular-nums',
                  isMe ? 'text-right text-black/70' : 'text-left text-white'
                )}
              >
                {new Date(m.created_at).toLocaleTimeString('en-GB', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

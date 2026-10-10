import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';
import { buttonPrimaryCn, inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';

/* ==========================================================================
   StudentMessageSheet — threaded tutor ↔ apprentice messages for one student.
   Bottom sheet (85vh) on every size, the FormSheet shell. Phone shows one
   pane at a time; desktop is wide, threads left and the conversation right.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  studentId: string;
  studentName: string;
  /** Open this thread straight away (a message notification). */
  initialThreadId?: string | null;
}

interface Thread {
  id: string;
  subject: string | null;
  last_message_at: string;
  unread_count_tutor: number;
}

interface Message {
  id: string;
  thread_id: string;
  sender_kind: 'tutor' | 'student' | 'parent' | 'employer' | 'system';
  body: string;
  created_at: string;
  read_at: string | null;
}

export function StudentMessageSheet({
  open,
  onOpenChange,
  studentId,
  studentName,
  initialThreadId = null,
}: Props) {
  const keyboard = useMobileKeyboard();
  const { toast } = useToast();

  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [draft, setDraft] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [mode, setMode] = useState<'list' | 'thread' | 'new'>('list');
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset thread state when switching to a different student so the sheet
  // doesn't briefly render stale messages from the previous learner.
  useEffect(() => {
    setActiveThreadId(null);
    setMessages([]);
    setThreads([]);
    setMode('list');
  }, [studentId]);

  // Load threads on open
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoadingThreads(true);
    supabase
      .from('student_message_threads')
      .select('id, subject, last_message_at, unread_count_tutor')
      .eq('student_id', studentId)
      .order('last_message_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('Load threads failed:', error);
          toast({
            title: 'Could not load messages',
            description: error.message,
            variant: 'destructive',
          });
          setLoadingThreads(false);
          return;
        }
        const rows = (data ?? []) as Thread[];
        setThreads(rows);
        // The thread a notification named, else: only one thread, jump
        // straight in; otherwise show the list.
        const named = initialThreadId ? rows.find((t) => t.id === initialThreadId) : null;
        if (named) {
          setActiveThreadId(named.id);
          setMode('thread');
        } else if (rows.length === 0) setMode('new');
        else if (rows.length === 1) {
          setActiveThreadId(rows[0].id);
          setMode('thread');
        } else setMode('list');
        setLoadingThreads(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, studentId, toast, initialThreadId]);

  // The thread whose messages we last asked for. A response for any other
  // thread (tutor tapped A then B quickly) is dropped so A's messages never
  // render under B.
  const requestedThreadRef = useRef<string | null>(null);

  const loadMessages = useCallback(
    async (threadId: string) => {
      if (requestedThreadRef.current !== threadId) setMessages([]);
      requestedThreadRef.current = threadId;
      setLoadingMessages(true);
      const { data, error } = await supabase
        .from('student_messages')
        .select('id, thread_id, sender_kind, body, created_at, read_at')
        .eq('thread_id', threadId)
        .order('created_at');
      if (requestedThreadRef.current !== threadId) return;
      if (error) {
        console.error('Load messages failed:', error);
        toast({
          title: 'Could not load messages',
          description: error.message,
          variant: 'destructive',
        });
        setLoadingMessages(false);
        return;
      }
      setMessages((data ?? []) as Message[]);
      setLoadingMessages(false);
    },
    [toast]
  );

  useEffect(() => {
    if (!activeThreadId) {
      requestedThreadRef.current = null;
      setLoadingMessages(false);
      return;
    }
    loadMessages(activeThreadId);
  }, [activeThreadId, loadMessages]);

  // When the tutor opens a thread, mark it read via the RPC. The RPC
  // bypasses RLS in a single SECURITY DEFINER call: zeroes their counter
  // and stamps read_at on apprentice-sent messages. Replaces the previous
  // two-step UPDATE (which had race + RLS friction).
  useEffect(() => {
    if (!activeThreadId || !open) return;
    let cancelled = false;
    (async () => {
      const { error } = await supabase.rpc('mark_message_thread_read', {
        p_thread_id: activeThreadId,
      });
      if (cancelled) return;
      if (error) {
        // Non-fatal — read receipts are best-effort. Log so we notice
        // schema/RPC drift without breaking the user's flow.
        console.error('mark_message_thread_read failed:', error);
        return;
      }
      setThreads((prev) =>
        prev.map((t) => (t.id === activeThreadId ? { ...t, unread_count_tutor: 0 } : t))
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [activeThreadId, open]);

  // Realtime: thread-level changes (new threads, last_message_at bumps,
  // unread count from another tutor session). Keeps the list view live.
  useEffect(() => {
    if (!open) return;
    const channel = supabase
      .channel(realtimeChannelName(`student_message_threads:${studentId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_message_threads',
          filter: `student_id=eq.${studentId}`,
        },
        () => {
          supabase
            .from('student_message_threads')
            .select('id, subject, last_message_at, unread_count_tutor')
            .eq('student_id', studentId)
            .order('last_message_at', { ascending: false })
            .limit(50)
            .then(({ data }) => setThreads((data ?? []) as Thread[]));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [open, studentId]);

  // Realtime: merge new messages for the active thread as they arrive.
  // Gated on `open` so closing the sheet tears down the subscription —
  // otherwise reopening the same sheet would stack duplicate channels.
  useEffect(() => {
    if (!open || !activeThreadId) return;
    const channel = supabase
      .channel(realtimeChannelName(`student_messages:${activeThreadId}`))
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
          setMessages((prev) => {
            if (prev.some((m) => m.id === row.id)) return prev;
            return [...prev, row];
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [open, activeThreadId]);

  // Auto-scroll to bottom only if the user was already near the bottom.
  // This avoids yanking the tutor away from older messages they're reading
  // when realtime delivers a new arrival mid-scroll.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 120) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    // Optimistic bubble appears immediately with a local token id.
    const optimisticToken = `opt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const optimisticMsg: Message = {
      id: optimisticToken,
      thread_id: activeThreadId ?? optimisticToken,
      sender_kind: 'tutor',
      body: trimmed,
      created_at: new Date().toISOString(),
      read_at: null,
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setDraft('');
    const subjectForNewThread = newSubject.trim();
    setNewSubject('');
    if (mode === 'new') setMode('thread');
    setSending(true);

    try {
      const { data: userRes } = await supabase.auth.getUser();
      if (!userRes?.user) throw new Error('Not signed in');

      const collegeId = await getMyCollegeId(userRes.user.id);
      if (!collegeId) throw new Error('No college for current user');

      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', userRes.user.id)
        .eq('college_id', collegeId)
        .maybeSingle();

      let threadId = activeThreadId;
      if (!threadId) {
        const { data: newThread, error: threadErr } = await supabase
          .from('student_message_threads')
          .insert({
            student_id: studentId,
            college_id: collegeId,
            subject: subjectForNewThread || null,
            created_by: staff?.id ?? null,
            // No counter seeding — the bump_thread_counters trigger
            // sets unread_count_student when the tutor's first message
            // is inserted immediately after.
          })
          .select('id, subject, last_message_at, unread_count_tutor')
          .maybeSingle();
        if (threadErr || !newThread) throw threadErr ?? new Error('Thread create failed');
        threadId = newThread.id;
        setThreads((t) => [newThread as Thread, ...t]);
        // Claim the new thread first so loading it keeps the optimistic message.
        requestedThreadRef.current = threadId;
        setActiveThreadId(threadId);
      }

      const { data: inserted, error: msgErr } = await supabase
        .from('student_messages')
        .insert({
          thread_id: threadId,
          sender_kind: 'tutor',
          sender_id: staff?.id ?? null,
          body: trimmed,
        })
        .select('id, thread_id, sender_kind, body, created_at, read_at')
        .maybeSingle();
      if (msgErr || !inserted) throw msgErr ?? new Error('Message insert failed');

      // Reconcile: drop the optimistic placeholder, then add the server row
      // only if realtime hasn't already delivered it. Without this dedup we
      // get a brief duplicate when realtime fires before the insert resolves.
      const insertedRow = inserted as Message;
      setMessages((prev) => {
        const withoutOptimistic = prev.filter((m) => m.id !== optimisticToken);
        if (withoutOptimistic.some((m) => m.id === insertedRow.id)) {
          return withoutOptimistic;
        }
        return [...withoutOptimistic, insertedRow];
      });

      // No manual counter update — the bump_thread_counters trigger on
      // student_messages handles unread_count_student and last_message_at
      // atomically (avoids race + RLS friction).

      // No client push: the trg_notify_student_message trigger calls
      // notify-student-message, which writes the learner's bell and pushes
      // once with a link to this thread (ELE-1913; this used to push twice).
    } catch (e) {
      // Roll back the optimistic bubble
      setMessages((prev) => prev.filter((m) => m.id !== optimisticToken));
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

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) ?? null,
    [threads, activeThreadId]
  );

  const fmtWhen = (iso: string) =>
    new Date(iso).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });

  const startNew = () => {
    setActiveThreadId(null);
    setMessages([]);
    setMode('new');
  };

  // Phone: one pane at a time (list, or the conversation). Desktop is always
  // wide: the threads sit on the left and the conversation fills the right.
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        <div className="flex h-full flex-col">
          <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" aria-hidden />

          <div className="shrink-0 border-b border-white/[0.08] px-4 sm:px-6 lg:px-10">
            <div className="mx-auto w-full max-w-2xl lg:max-w-[88rem]">
              <SheetHeader className="pb-4 pt-2">
                <div className="flex items-start justify-between gap-3">
                  <SheetTitle className="min-w-0 text-left">
                    <span className="block text-[13px] font-medium text-elec-yellow">Messages</span>
                    <span className="mt-1 block text-[20px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
                      {studentName}
                    </span>
                  </SheetTitle>
                  {mode !== 'list' && threads.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('list');
                        setActiveThreadId(null);
                        setMessages([]);
                      }}
                      className="inline-flex h-11 shrink-0 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation lg:hidden"
                    >
                      All threads
                    </button>
                  )}
                </div>
                <SheetDescription className="text-left text-[13px] leading-snug text-white">
                  Private between you and {studentName.split(' ')[0] || 'the apprentice'}. They get
                  a notification when you send.
                </SheetDescription>
              </SheetHeader>
            </div>
          </div>

          <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 lg:max-w-[88rem] lg:px-10">
            {/* ── Threads ── */}
            <aside
              className={cn(
                'min-h-0 w-full flex-col lg:w-80 lg:shrink-0 lg:border-r lg:border-white/[0.08]',
                mode === 'list' ? 'flex' : 'hidden lg:flex'
              )}
            >
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {loadingThreads && threads.length === 0 ? (
                  <p className="px-4 py-6 text-[13px] text-white sm:px-6 lg:px-0 lg:pr-6">
                    Loading threads…
                  </p>
                ) : threads.length === 0 ? (
                  <p className="px-4 py-6 text-[13px] text-white sm:px-6 lg:px-0 lg:pr-6">
                    No messages yet. Start the first thread.
                  </p>
                ) : (
                  <ul className="divide-y divide-white/[0.06]">
                    {threads.map((t) => {
                      const on = t.id === activeThreadId;
                      return (
                        <li key={t.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveThreadId(t.id);
                              setMode('thread');
                            }}
                            className={cn(
                              'flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6 lg:pl-0 lg:pr-6',
                              on && 'lg:bg-white/[0.04]'
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'hidden h-8 w-0.5 shrink-0 rounded-full lg:block',
                                on ? 'bg-elec-yellow' : 'bg-transparent'
                              )}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[14px] font-semibold text-white">
                                {t.subject || 'Conversation'}
                              </div>
                              <div className="mt-0.5 text-[12px] tabular-nums text-white">
                                {fmtWhen(t.last_message_at)}
                              </div>
                            </div>
                            {t.unread_count_tutor > 0 && (
                              <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[12px] font-semibold tabular-nums text-black">
                                {t.unread_count_tutor}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div
                className="shrink-0 border-t border-white/[0.08] px-4 py-3 sm:px-6 lg:pl-0 lg:pr-6"
                style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
              >
                <button type="button" onClick={startNew} className={cn(buttonPrimaryCn, 'w-full')}>
                  New thread
                </button>
              </div>
            </aside>

            {/* ── Conversation ── */}
            <section
              className={cn(
                'min-h-0 min-w-0 flex-1 flex-col',
                mode === 'list' ? 'hidden lg:flex' : 'flex'
              )}
            >
              {mode === 'list' ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                  <p className="text-[15px] font-semibold text-white">Pick a conversation</p>
                  <p className="max-w-sm text-[13px] leading-relaxed text-white">
                    Open a thread on the left, or start a new one about something specific.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    ref={scrollRef}
                    className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 lg:px-8"
                  >
                    {mode === 'new' && (
                      <div className="pb-2">
                        <label htmlFor="sm-subject" className={labelCn}>
                          Subject (optional)
                        </label>
                        <input
                          id="sm-subject"
                          type="text"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                          placeholder="e.g. Catching up on Unit 302 evidence"
                          className={inputCn}
                        />
                      </div>
                    )}
                    {mode === 'thread' && activeThread?.subject && (
                      <h3 className="border-b border-white/[0.08] pb-3 text-[15px] font-semibold tracking-tight text-white">
                        {activeThread.subject}
                      </h3>
                    )}
                    {loadingMessages && messages.length === 0 ? (
                      <p className="text-[13px] text-white">Loading messages…</p>
                    ) : messages.length === 0 && mode === 'thread' ? (
                      <p className="text-[13px] text-white">No messages yet.</p>
                    ) : (
                      messages.map((m) => {
                        const fromTutor = m.sender_kind === 'tutor';
                        const isOptimistic = m.id.startsWith('opt-');
                        return (
                          <div
                            key={m.id}
                            className={cn('flex', fromTutor ? 'justify-end' : 'justify-start')}
                          >
                            <div
                              className={cn(
                                'max-w-[82%] rounded-2xl px-4 py-2.5 text-white transition-opacity lg:max-w-[70%]',
                                fromTutor
                                  ? 'rounded-br-md border border-white/[0.14] bg-white/[0.12]'
                                  : 'rounded-bl-md border border-white/[0.08] bg-white/[0.05]',
                                isOptimistic && 'opacity-60'
                              )}
                            >
                              <div className="whitespace-pre-wrap text-[14px] leading-relaxed">
                                {m.body}
                              </div>
                              <div className="mt-1 flex items-center gap-1.5 text-[12px] tabular-nums text-white">
                                <span>{fmtWhen(m.created_at)}</span>
                                {isOptimistic && (
                                  <>
                                    <span>·</span>
                                    <span>sending…</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Composer — lift above the on-screen keyboard so the textarea and
                      Send button stay visible on mobile (ELE-1085). */}
                  <div
                    className="shrink-0 border-t border-white/[0.08] px-4 py-3 sm:px-6 lg:px-8"
                    style={
                      keyboard.isVisible
                        ? { paddingBottom: keyboard.height + 12 }
                        : { paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }
                    }
                  >
                    <div className="flex items-end gap-2.5">
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        rows={2}
                        aria-label="Message"
                        placeholder="Write a message"
                        inputMode="text"
                        autoCapitalize="sentences"
                        autoCorrect="on"
                        spellCheck
                        className={cn(textareaCn, 'min-h-[48px] max-h-[160px] flex-1')}
                      />
                      <button
                        type="button"
                        onClick={sendMessage}
                        disabled={!draft.trim() || sending}
                        className={cn(buttonPrimaryCn, 'shrink-0 px-6')}
                      >
                        {sending ? 'Sending…' : 'Send'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

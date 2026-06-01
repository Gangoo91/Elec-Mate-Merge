import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';
import {
  Eyebrow,
  PrimaryButton,
  inputClass,
} from '@/components/college/primitives';

/* ==========================================================================
   StudentMessageSheet — threaded tutor ↔ apprentice messages for one student.
   Desktop: right side-sheet. Mobile: bottom sheet (85vh).
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  studentId: string;
  studentName: string;
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
}: Props) {
  const isMobile = useIsMobile();
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
        // If there's only one thread, jump straight in. Otherwise show the list.
        if (rows.length === 0) setMode('new');
        else if (rows.length === 1) {
          setActiveThreadId(rows[0].id);
          setMode('thread');
        } else setMode('list');
        setLoadingThreads(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, studentId, toast]);

  const loadMessages = useCallback(
    async (threadId: string) => {
      setLoadingMessages(true);
      const { data, error } = await supabase
        .from('student_messages')
        .select('id, thread_id, sender_kind, body, created_at, read_at')
        .eq('thread_id', threadId)
        .order('created_at');
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
    if (!activeThreadId) return;
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

      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userRes.user.id)
        .maybeSingle();
      if (!profile?.college_id) throw new Error('No college for current user');

      const { data: staff } = await supabase
        .from('college_staff')
        .select('id')
        .eq('user_id', userRes.user.id)
        .eq('college_id', profile.college_id)
        .maybeSingle();

      let threadId = activeThreadId;
      if (!threadId) {
        const { data: newThread, error: threadErr } = await supabase
          .from('student_message_threads')
          .insert({
            student_id: studentId,
            college_id: profile.college_id,
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

      // Fire-and-forget push notification to the apprentice. We resolve
      // the apprentice's auth uid from the college_students row (since
      // studentId here is college_students.id, not auth.users.id).
      void (async () => {
        try {
          const { data: cs } = await supabase
            .from('college_students')
            .select('user_id')
            .eq('id', studentId)
            .maybeSingle();
          const apprenticeUid = (cs as { user_id?: string | null } | null)?.user_id ?? null;
          if (!apprenticeUid) return;
          const { data: session } = await supabase.auth.getSession();
          const token = session.session?.access_token;
          if (!token) return;
          await fetch(
            `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/send-push-notification`,
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userId: apprenticeUid,
                title: 'New message from your tutor',
                body: trimmed.slice(0, 140),
                type: 'college',
                data: {
                  kind: 'tutor_message',
                  thread_id: threadId,
                  deeplink: '/apprentice/college-plan#plan',
                },
              }),
            }
          );
        } catch (err) {
          console.error('tutor message push failed:', (err as Error).message);
        }
      })();
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

  const side = isMobile ? 'bottom' : 'right';
  const sheetClasses = cn(
    'bg-[hsl(0_0%_8%)] border-white/[0.08]',
    isMobile
      ? 'h-[85vh] p-0 overflow-hidden flex flex-col'
      : 'w-[min(100vw,480px)] p-0 flex flex-col h-full'
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className={sheetClasses}>
        <SheetHeader className="px-5 sm:px-6 py-4 border-b border-white/[0.08] shrink-0">
          <Eyebrow className="text-elec-yellow/85">Messages</Eyebrow>
          <SheetTitle className="text-[18px] font-semibold text-white leading-tight tracking-tight">
            {studentName}
          </SheetTitle>
          {mode !== 'list' && threads.length > 1 && (
            <button
              onClick={() => {
                setMode('list');
                setActiveThreadId(null);
                setMessages([]);
              }}
              className="text-left text-[12px] text-white hover:text-elec-yellow transition-colors"
            >
              ← All threads
            </button>
          )}
        </SheetHeader>

        {/* Body */}
        {mode === 'list' ? (
          <div className="flex-1 overflow-y-auto">
            {loadingThreads && threads.length === 0 ? (
              <div className="p-6 text-[12.5px] text-white">Loading threads…</div>
            ) : threads.length === 0 ? (
              <div className="p-6 text-[12.5px] text-white">
                No messages yet. Start the first thread.
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => {
                        setActiveThreadId(t.id);
                        setMode('thread');
                      }}
                      className="w-full text-left px-5 sm:px-6 py-4 hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="text-[13.5px] font-medium text-white truncate">
                            {t.subject || 'Conversation'}
                          </div>
                          <div className="mt-0.5 text-[11px] text-white tabular-nums">
                            {new Date(t.last_message_at).toLocaleString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        {t.unread_count_tutor > 0 && (
                          <span className="shrink-0 text-[10.5px] font-semibold text-black bg-elec-yellow rounded-full px-2 py-0.5 tabular-nums">
                            {t.unread_count_tutor}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="p-5 sm:p-6 border-t border-white/[0.08]">
              <PrimaryButton
                fullWidth
                onClick={() => {
                  setActiveThreadId(null);
                  setMessages([]);
                  setMode('new');
                }}
              >
                + New thread
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
              {mode === 'new' && (
                <div>
                  <Eyebrow className="mb-2">Subject (optional)</Eyebrow>
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Catching up on Unit 302 evidence"
                    className={inputClass}
                  />
                </div>
              )}
              {mode === 'thread' && activeThread?.subject && (
                <div className="pb-2">
                  <Eyebrow>{activeThread.subject}</Eyebrow>
                </div>
              )}
              {loadingMessages && messages.length === 0 ? (
                <div className="text-[12.5px] text-white">Loading messages…</div>
              ) : messages.length === 0 && mode === 'thread' ? (
                <div className="text-[12.5px] text-white">No messages yet.</div>
              ) : (
                messages.map((m) => {
                  const fromTutor = m.sender_kind === 'tutor';
                  const isOptimistic = m.id.startsWith('opt-');
                  return (
                    <div
                      key={m.id}
                      className={cn(
                        'flex',
                        fromTutor ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[82%] rounded-2xl px-4 py-2.5 transition-opacity',
                          fromTutor
                            ? 'bg-elec-yellow/[0.1] border border-elec-yellow/25 text-white'
                            : 'bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white',
                          isOptimistic && 'opacity-60'
                        )}
                      >
                        <div className="text-[13px] leading-relaxed whitespace-pre-wrap">
                          {m.body}
                        </div>
                        <div className="mt-1 text-[10px] text-white/30 tabular-nums flex items-center gap-1.5">
                          <span>
                            {new Date(m.created_at).toLocaleString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {isOptimistic && (
                            <>
                              <span className="text-white/30">·</span>
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

            {/* Composer */}
            <div className="shrink-0 border-t border-white/[0.08] p-3 sm:p-4">
              <div className="flex items-end gap-2">
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
                  placeholder="Write a message… ⌘↵ to send"
                  inputMode="text"
                  autoCapitalize="sentences"
                  autoCorrect="on"
                  spellCheck
                  className="flex-1 min-h-[44px] max-h-[160px] bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl px-3 py-2.5 text-base text-white placeholder:text-white/65 focus:outline-none focus:ring-2 focus:ring-elec-yellow/40 focus:border-elec-yellow/60 transition-colors resize-none touch-manipulation"
                />
                <PrimaryButton
                  onClick={sendMessage}
                  disabled={!draft.trim() || sending}
                  className="shrink-0"
                >
                  {sending ? '…' : 'Send'}
                </PrimaryButton>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

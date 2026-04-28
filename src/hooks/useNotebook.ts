import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useNotebook — shared hook for the AI Notebook (apprentice + tutor sides).

   Owns: conversation list, active conversation, message list, send action
   (SSE streaming to ai-notebook edge fn). The persona + optional
   subject_student_id are configured on construction.

   Returned `send()` is a fire-and-forget that:
     1. optimistic-appends the user's message
     2. opens an SSE stream to the edge fn
     3. consumes 'open' / 'done' / 'error' events
     4. on 'done': appends assistant message + persists conversation_id
   ========================================================================== */

export type NotebookPersona = 'apprentice' | 'tutor';

export type CitationType = 'ac' | 'bs7671' | 'quiz' | 'portfolio' | 'otj' | 'observation';

export interface Citation {
  type: CitationType;
  ref: string;
  label: string;
}

export type ActionKind =
  | 'open_quiz'
  | 'open_portfolio'
  | 'add_reflection'
  | 'submit_otj'
  | 'open_brief'
  | 'open_simulator'
  | 'open_student_360'
  | 'log_observation'
  | 'draft_one_to_one'
  | 'edit_ilp'
  | 'message_tutor'
  | 'other';

export interface SuggestedAction {
  label: string;
  kind: ActionKind;
  href: string;
}

export interface NotebookConversation {
  id: string;
  title: string | null;
  pinned: boolean;
  subject_student_id: string | null;
  last_message_at: string | null;
  message_count: number;
  created_at: string;
}

/** DB allows 'user' | 'assistant' | 'system' but the UI only renders the
    first two — system rows (if any) are filtered out below. */
export type NotebookMessageRole = 'user' | 'assistant' | 'system';

export interface NotebookMessage {
  id: string;
  role: NotebookMessageRole;
  content: string;
  citations: Citation[] | null;
  suggested_actions: SuggestedAction[] | null;
  created_at: string;
  /** True while tokens are still streaming in. UI uses this to show the cursor. */
  streaming?: boolean;
}

interface UseNotebookOptions {
  persona: NotebookPersona;
  /** Tutor-only — the apprentice this conversation is about. */
  subjectStudentId?: string | null;
}

export function useNotebook({ persona, subjectStudentId = null }: UseNotebookOptions) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<NotebookConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<NotebookMessage[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // rAF-batched delta buffer — accumulates incoming tokens and flushes once
  // per animation frame, capping re-renders at 60fps regardless of how
  // quickly OpenAI sends chunks.
  const deltaBufferRef = useRef<string>('');
  const deltaRafRef = useRef<number | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!user) {
      setLoadingConversations(false);
      return;
    }
    let q = supabase
      .from('notebook_conversations')
      .select('id, title, pinned, subject_student_id, last_message_at, message_count, created_at')
      .eq('owner_uid', user.id)
      .eq('persona', persona)
      .order('pinned', { ascending: false })
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .limit(50);
    if (persona === 'tutor' && subjectStudentId) {
      q = q.eq('subject_student_id', subjectStudentId);
    }
    const { data } = await q;
    setConversations((data ?? []) as NotebookConversation[]);
    setLoadingConversations(false);
  }, [user, persona, subjectStudentId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const loadMessages = useCallback(async (conversationId: string) => {
    setLoadingMessages(true);
    const { data } = await supabase
      .from('notebook_messages')
      .select('id, role, content, citations, suggested_actions, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at');
    setMessages(((data ?? []) as NotebookMessage[]).filter((m) => m.role !== 'system'));
    setLoadingMessages(false);
  }, []);

  useEffect(() => {
    // Switching conversations cancels any in-flight stream — otherwise the
    // partial assistant message ends up in the wrong thread.
    abortRef.current?.abort();
    if (!activeId) {
      setMessages([]);
      return;
    }
    loadMessages(activeId);
  }, [activeId, loadMessages]);

  // Cancel any in-flight stream when the hook unmounts.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const newConversation = useCallback(() => {
    abortRef.current?.abort();
    setActiveId(null);
    setMessages([]);
    setError(null);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      setError(null);

      // Switching conversations mid-stream calls abortRef.current?.abort()
      // (see the activeId effect), so the in-flight fetch + reader throw
      // and we bail before any setMessages corrupts the new thread.

      // Optimistic user message — server creates the persisted row and we
      // reconcile on 'done'.
      const optId = `opt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const optMsg: NotebookMessage = {
        id: optId,
        role: 'user',
        content: trimmed,
        citations: null,
        suggested_actions: null,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optMsg]);
      setStreaming(true);

      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const { data: session } = await supabase.auth.getSession();
        const token = session.session?.access_token;
        if (!token) throw new Error('Not signed in');

        const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/ai-notebook`;
        const res = await fetch(url, {
          method: 'POST',
          signal: ac.signal,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conversation_id: activeId,
            message: trimmed,
            persona,
            ...(persona === 'tutor' && subjectStudentId
              ? { subject_student_id: subjectStudentId }
              : {}),
          }),
        });

        if (!res.ok || !res.body) {
          const errText = await res.text().catch(() => '');
          throw new Error(errText.slice(0, 200) || `request_${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let conversationIdFromServer: string | null = activeId;
        const streamingId = `stream-${Date.now()}`;
        let streamingMsgInserted = false;

        // Flush whatever's in the delta buffer in a single setMessages call.
        // Bound to one execution per animation frame for buttery streaming
        // even when OpenAI sends 10+ tiny chunks per frame.
        const flushDeltas = () => {
          deltaRafRef.current = null;
          const pending = deltaBufferRef.current;
          if (!pending) return;
          deltaBufferRef.current = '';
          setMessages((prev) => {
            if (!streamingMsgInserted) {
              streamingMsgInserted = true;
              return [
                ...prev,
                {
                  id: streamingId,
                  role: 'assistant',
                  content: pending,
                  citations: null,
                  suggested_actions: null,
                  created_at: new Date().toISOString(),
                  streaming: true,
                },
              ];
            }
            return prev.map((m) =>
              m.id === streamingId ? { ...m, content: m.content + pending } : m
            );
          });
        };
        const scheduleFlush = () => {
          if (deltaRafRef.current != null) return;
          deltaRafRef.current = requestAnimationFrame(flushDeltas);
        };

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const blocks = buffer.split('\n\n');
          buffer = blocks.pop() ?? '';
          for (const block of blocks) {
            const lines = block.split('\n');
            let eventName: string | null = null;
            let dataLine = '';
            for (const line of lines) {
              if (line.startsWith('event:')) eventName = line.slice(6).trim();
              else if (line.startsWith('data:')) dataLine += line.slice(5).trim();
            }
            if (!eventName) continue;
            if (eventName === 'open') {
              try {
                const payload = JSON.parse(dataLine) as { conversation_id?: string };
                if (payload.conversation_id) {
                  // Track locally only — DO NOT call setActiveId here. The
                  // activeId effect aborts in-flight streams when the id
                  // changes, which would kill our own reader on the first
                  // turn (was activeId=null, server creates new convo).
                  // setActiveId runs in the 'done' handler instead.
                  conversationIdFromServer = payload.conversation_id;
                }
              } catch {
                /* ignore */
              }
            } else if (eventName === 'delta') {
              try {
                const payload = JSON.parse(dataLine) as { text: string };
                if (!payload.text) continue;
                deltaBufferRef.current += payload.text;
                scheduleFlush();
              } catch {
                /* ignore */
              }
            } else if (eventName === 'done') {
              // Drain any pending tokens before applying the final payload
              // so we don't briefly render stale partial text.
              if (deltaRafRef.current != null) {
                cancelAnimationFrame(deltaRafRef.current);
                deltaRafRef.current = null;
              }
              deltaBufferRef.current = '';
              try {
                const payload = JSON.parse(dataLine) as {
                  conversation_id: string;
                  assistant_message_id: string | null;
                  answer: string;
                  citations: Citation[];
                  suggested_actions: SuggestedAction[];
                };
                conversationIdFromServer = payload.conversation_id;
                setActiveId(payload.conversation_id);
                const finalId = payload.assistant_message_id ?? `srv-${Date.now()}`;
                setMessages((prev) => {
                  if (streamingMsgInserted) {
                    return prev.map((m) =>
                      m.id === streamingId
                        ? {
                            ...m,
                            id: finalId,
                            content: payload.answer,
                            citations: payload.citations ?? null,
                            suggested_actions: payload.suggested_actions ?? null,
                            streaming: false,
                          }
                        : m
                    );
                  }
                  return [
                    ...prev,
                    {
                      id: finalId,
                      role: 'assistant',
                      content: payload.answer,
                      citations: payload.citations ?? null,
                      suggested_actions: payload.suggested_actions ?? null,
                      created_at: new Date().toISOString(),
                    },
                  ];
                });
              } catch {
                setError('Could not read AI response');
              }
            } else if (eventName === 'error') {
              try {
                const payload = JSON.parse(dataLine) as { error: string; detail?: string };
                setError(payload.detail || payload.error || 'Stream failed');
              } catch {
                setError('Stream failed');
              }
            }
          }
        }

        // Always refresh — the just-finished turn either created a new
        // conversation, set its title (first turn), or bumped its
        // last_message_at + message_count for ordering.
        await fetchConversations();
      } catch (e) {
        if ((e as Error).name === 'AbortError') return;
        setError((e as Error).message ?? 'Request failed');
        // Roll back optimistic user message — keep it locally so they
        // see what they typed and can retry.
      } finally {
        setStreaming(false);
        abortRef.current = null;
        if (deltaRafRef.current != null) {
          cancelAnimationFrame(deltaRafRef.current);
          deltaRafRef.current = null;
        }
        deltaBufferRef.current = '';
      }
    },
    [activeId, persona, streaming, subjectStudentId, fetchConversations]
  );

  const renameConversation = useCallback(async (conversationId: string, title: string) => {
    const trimmed = title.trim().slice(0, 80);
    if (!trimmed) return;
    const { error: err } = await supabase
      .from('notebook_conversations')
      .update({ title: trimmed })
      .eq('id', conversationId);
    if (!err) {
      setConversations((prev) =>
        prev.map((c) => (c.id === conversationId ? { ...c, title: trimmed } : c))
      );
    }
  }, []);

  const deleteConversation = useCallback(
    async (conversationId: string) => {
      const { error: err } = await supabase
        .from('notebook_conversations')
        .delete()
        .eq('id', conversationId);
      if (!err) {
        setConversations((prev) => prev.filter((c) => c.id !== conversationId));
        if (activeId === conversationId) setActiveId(null);
      }
    },
    [activeId]
  );

  const togglePinned = useCallback(async (conversationId: string, pinned: boolean) => {
    const { error: err } = await supabase
      .from('notebook_conversations')
      .update({ pinned })
      .eq('id', conversationId);
    if (!err) {
      setConversations((prev) => prev.map((c) => (c.id === conversationId ? { ...c, pinned } : c)));
    }
  }, []);

  return useMemo(
    () => ({
      conversations,
      activeId,
      setActiveId,
      messages,
      loadingConversations,
      loadingMessages,
      streaming,
      error,
      send,
      newConversation,
      renameConversation,
      deleteConversation,
      togglePinned,
      refresh: fetchConversations,
    }),
    [
      conversations,
      activeId,
      messages,
      loadingConversations,
      loadingMessages,
      streaming,
      error,
      send,
      newConversation,
      renameConversation,
      deleteConversation,
      togglePinned,
      fetchConversations,
    ]
  );
}

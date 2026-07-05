import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageSetSync, storageRemoveSync } from '@/utils/storage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  followUpQuestions?: string[];
  /** Legacy single-image — kept for back-compat with old saved sessions. */
  imageUrl?: string;
  /** Multi-image (≤5) — preferred field. */
  imageUrls?: string[];
}

export interface AIChatSession {
  id: string;
  title: string;
  messages: Message[];
  message_count: number;
  last_message_preview: string | null;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'elec-ai-conversation';
const STORAGE_EXPIRY_HOURS = 24;
const SAVE_DEBOUNCE_MS = 2000;

export function useAIChatHistory(scope: string = 'assistant') {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AIChatSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Per-surface storage key so e.g. the apprentice tutor (scope 'dave') and the
  // electrician assistant (scope 'assistant') never share a conversation.
  const storageKey = `${STORAGE_KEY}:${scope}`;

  // Fetch recent sessions on mount
  const fetchSessions = useCallback(async () => {
    setIsLoadingSessions(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('ai_chat_history' as any)
        .select('id, title, message_count, last_message_preview, created_at, updated_at')
        .eq('user_id', user.id)
        .eq('agent', scope)
        .is('archived_at', null)
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) {
        console.warn('Failed to fetch chat sessions:', error);
        return;
      }

      setSessions((data || []) as unknown as AIChatSession[]);
    } catch (e) {
      console.warn('Failed to fetch chat sessions:', e);
    } finally {
      setIsLoadingSessions(false);
    }
  }, [scope]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Save to localStorage as fallback. The sessionId rides along so resuming
  // a local chat continues the SAME server session instead of forking a
  // duplicate (pre-fix: sessionId was dropped, every device restore created
  // a new server row — ELE-584).
  const saveToLocalStorage = useCallback(
    (messages: Message[], sessionId?: string | null) => {
      try {
        if (messages.length === 0) {
          storageRemoveSync(storageKey);
          return;
        }
        storageSetSync(
          storageKey,
          JSON.stringify({
            messages,
            sessionId: sessionId ?? null,
            timestamp: new Date().toISOString(),
          })
        );
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
    },
    [storageKey]
  );

  // Load from localStorage (fallback for offline/unauthenticated)
  const loadFromLocalStorage = useCallback((): Message[] => {
    try {
      const stored = storageGetSync(storageKey);
      if (!stored) return [];

      const { messages, sessionId, timestamp } = JSON.parse(stored);
      const hoursSinceStored = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);
      if (hoursSinceStored > STORAGE_EXPIRY_HOURS) {
        storageRemoveSync(storageKey);
        return [];
      }

      // The stored timestamp refreshes on every save, so simply reopening the
      // page kept month-old chats alive forever. Judge staleness by when the
      // conversation itself last moved: no message in 48h → start fresh (it
      // stays available in History).
      const newestMessageAt = Math.max(
        0,
        ...(messages || []).map((m: Message) =>
          m.timestamp ? new Date(m.timestamp).getTime() : 0
        )
      );
      if (newestMessageAt > 0 && Date.now() - newestMessageAt > 48 * 60 * 60 * 1000) {
        storageRemoveSync(storageKey);
        return [];
      }

      // Rebind to the server session this chat belongs to, so continuing it
      // updates that session rather than creating a duplicate.
      if (sessionId) setCurrentSessionId(sessionId);

      return messages.map((m: Message) => ({
        ...m,
        timestamp: m.timestamp ? new Date(m.timestamp) : undefined,
      }));
    } catch {
      return [];
    }
  }, [storageKey]);

  /**
   * Cross-device resume (ELE-584): the local cache only exists on the device
   * that held the conversation. When it's empty (new device, iOS storage
   * purge, reinstall), pick up the user's most recent server session from
   * the last 48h so the chat follows them instead of starting cold.
   */
  const resumeLatestSession = useCallback(async (): Promise<Message[]> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];

      const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from('ai_chat_history' as any)
        .select('id, messages, updated_at')
        .eq('user_id', user.id)
        .eq('agent', scope)
        .is('archived_at', null)
        .gte('updated_at', cutoff)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return [];

      setCurrentSessionId((data as any).id);
      const rawMessages = (data as any).messages || [];
      return rawMessages.map((m: any) => ({
        ...m,
        timestamp: m.timestamp ? new Date(m.timestamp) : undefined,
      }));
    } catch (e) {
      console.warn('Failed to resume latest session:', e);
      return [];
    }
  }, [scope]);

  // Auto-title from first user message
  const generateTitle = useCallback((messages: Message[]): string => {
    const firstUserMsg = messages.find((m) => m.role === 'user');
    if (!firstUserMsg) return 'New Chat';
    const content = firstUserMsg.content.trim();
    return content.length > 60 ? content.substring(0, 57) + '...' : content;
  }, []);

  // Save session to Supabase (upsert by currentSessionId)
  const saveSession = useCallback(
    async (messages: Message[]): Promise<string> => {
      // Always save to localStorage as fallback (with the session binding)
      saveToLocalStorage(messages, currentSessionId);

      if (messages.length === 0) return currentSessionId || '';

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return currentSessionId || '';

        const title = generateTitle(messages);
        const lastMsg = messages[messages.length - 1];
        const preview = lastMsg.content.substring(0, 100);

        // Serialise messages (strip Date objects for JSON)
        const serialisedMessages = messages.map((m) => ({
          ...m,
          timestamp: m.timestamp ? m.timestamp.toISOString() : undefined,
        }));

        if (currentSessionId) {
          // Update existing session
          const { error } = await supabase
            .from('ai_chat_history' as any)
            .update({
              title,
              messages: serialisedMessages as any,
              message_count: messages.length,
              last_message_preview: preview,
              updated_at: new Date().toISOString(),
            } as any)
            .eq('id', currentSessionId);

          if (error) {
            console.warn('Failed to update chat session:', error);
          }

          // Update local sessions list
          setSessions((prev) =>
            prev.map((s) =>
              s.id === currentSessionId
                ? {
                    ...s,
                    title,
                    message_count: messages.length,
                    last_message_preview: preview,
                    updated_at: new Date().toISOString(),
                  }
                : s
            )
          );

          return currentSessionId;
        } else {
          // Create new session
          const { data, error } = await supabase
            .from('ai_chat_history' as any)
            .insert({
              user_id: user.id,
              agent: scope,
              title,
              messages: serialisedMessages as any,
              message_count: messages.length,
              last_message_preview: preview,
            } as any)
            .select('id')
            .single();

          if (error) {
            console.warn('Failed to create chat session:', error);
            return '';
          }

          const newId = (data as any).id;
          setCurrentSessionId(newId);

          // Add to top of sessions list
          setSessions((prev) => [
            {
              id: newId,
              title,
              messages: [],
              message_count: messages.length,
              last_message_preview: preview,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            ...prev,
          ]);

          return newId;
        }
      } catch (e) {
        console.warn('Failed to save chat session:', e);
        return currentSessionId || '';
      }
    },
    [currentSessionId, saveToLocalStorage, generateTitle, scope]
  );

  // Debounced save — called by the parent after streaming completes
  const debouncedSave = useCallback(
    (messages: Message[]) => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = setTimeout(() => {
        saveSession(messages);
      }, SAVE_DEBOUNCE_MS);
    },
    [saveSession]
  );

  // Load a specific session
  const loadSession = useCallback(async (id: string): Promise<Message[]> => {
    try {
      const { data, error } = await supabase
        .from('ai_chat_history' as any)
        .select('messages')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.warn('Failed to load chat session:', error);
        return [];
      }

      setCurrentSessionId(id);

      // Restore Date objects for timestamps
      const rawMessages = (data as any).messages || [];
      return rawMessages.map((m: any) => ({
        ...m,
        timestamp: m.timestamp ? new Date(m.timestamp) : undefined,
      }));
    } catch (e) {
      console.warn('Failed to load chat session:', e);
      return [];
    }
  }, []);

  // Soft-delete a session
  const deleteSession = useCallback(
    async (id: string) => {
      try {
        const { error } = await supabase
          .from('ai_chat_history' as any)
          .update({ archived_at: new Date().toISOString() } as any)
          .eq('id', id);

        if (error) {
          console.warn('Failed to delete chat session:', error);
          return;
        }

        setSessions((prev) => prev.filter((s) => s.id !== id));

        // If deleting the current session, clear it
        if (id === currentSessionId) {
          setCurrentSessionId(null);
        }
      } catch (e) {
        console.warn('Failed to delete chat session:', e);
      }
    },
    [currentSessionId]
  );

  // Start a fresh session
  const startNewSession = useCallback(() => {
    setCurrentSessionId(null);
    storageRemoveSync(storageKey);
  }, [storageKey]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  return {
    currentSessionId,
    sessions,
    isLoadingSessions,
    saveSession: debouncedSave,
    loadSession,
    deleteSession,
    startNewSession,
    fetchSessions,
    loadFromLocalStorage,
    resumeLatestSession,
  };
}

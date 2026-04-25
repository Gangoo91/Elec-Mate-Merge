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

export function useAIChatHistory() {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AIChatSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Save to localStorage as fallback
  const saveToLocalStorage = useCallback((messages: Message[]) => {
    try {
      if (messages.length === 0) {
        storageRemoveSync(STORAGE_KEY);
        return;
      }
      storageSetSync(
        STORAGE_KEY,
        JSON.stringify({ messages, timestamp: new Date().toISOString() })
      );
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, []);

  // Load from localStorage (fallback for offline/unauthenticated)
  const loadFromLocalStorage = useCallback((): Message[] => {
    try {
      const stored = storageGetSync(STORAGE_KEY);
      if (!stored) return [];

      const { messages, timestamp } = JSON.parse(stored);
      const hoursSinceStored = (Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60);
      if (hoursSinceStored > STORAGE_EXPIRY_HOURS) {
        storageRemoveSync(STORAGE_KEY);
        return [];
      }

      return messages.map((m: Message) => ({
        ...m,
        timestamp: m.timestamp ? new Date(m.timestamp) : undefined,
      }));
    } catch {
      return [];
    }
  }, []);

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
      // Always save to localStorage as fallback
      saveToLocalStorage(messages);

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
    [currentSessionId, saveToLocalStorage, generateTitle]
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
    storageRemoveSync(STORAGE_KEY);
  }, []);

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
  };
}

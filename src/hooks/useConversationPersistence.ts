import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

interface ContextEnvelope {
  requestId: string;
  sessionId?: string;
  timestamp: number;
  queryIntent: any;
  foundRegulations: any[];
  designDecisions: any[];
  sharedRegulations?: any[];
  sharedKnowledge?: any;
  designSummary?: any;
  ragPriority: any;
  embeddingCache?: any;
  previousAgent?: string;
  nextAgent?: string;
  agentChain: string[];
  totalTokens?: number;
  ragCallCount?: number;
  contextHistory?: any[];
}

export const useConversationPersistence = () => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState<string>(() => crypto.randomUUID());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save conversation state
  const saveConversation = useCallback(async (
    title: string,
    contextEnvelope: ContextEnvelope
  ) => {
    try {
      setIsSaving(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const conversationData = {
        user_id: user.id,
        title,
        context_envelope: contextEnvelope as any,
        last_agent: contextEnvelope.agentChain[contextEnvelope.agentChain.length - 1] || null,
        message_count: contextEnvelope.contextHistory?.length || 0,
        updated_at: new Date().toISOString()
      };

      // Upsert conversation
      const { data, error } = await supabase
        .from('conversations')
        .upsert([{ id: conversationId, ...conversationData }], {
          onConflict: 'id'
        })
        .select()
        .single();

      if (error) throw error;

      setConversationId(data.id);
      setLastSaved(new Date());

      return data.id;
    } catch (error) {
      console.error('Failed to save conversation:', error);
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [conversationId]);

  // Load conversation by ID
  const loadConversation = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setConversationId(data.id);
      return {
        id: data.id,
        title: data.title,
        contextEnvelope: data.context_envelope as unknown as ContextEnvelope,
        lastAgent: data.last_agent,
        messageCount: data.message_count,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Failed to load conversation:', error);
      toast.error('Failed to load conversation');
      return null;
    }
  }, []);

  // Get recent conversations list
  const getRecentConversations = useCallback(async (limit = 10) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, last_agent, message_count, updated_at, created_at')
        .eq('user_id', user.id)
        .is('archived_at', null)
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      return [];
    }
  }, []);

  // Archive conversation
  const archiveConversation = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ archived_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      toast.success('Conversation archived');
    } catch (error) {
      console.error('Failed to archive conversation:', error);
      toast.error('Failed to archive conversation');
    }
  }, []);

  // Create new conversation
  const createNewConversation = useCallback(() => {
    setConversationId(null);
    setLastSaved(null);
  }, []);

  return {
    conversationId,
    sessionId,
    isSaving,
    lastSaved,
    saveConversation,
    loadConversation,
    getRecentConversations,
    archiveConversation,
    createNewConversation
  };
};

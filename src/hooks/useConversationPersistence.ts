import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

interface ConversationMemory {
  id: string;
  session_id: string;
  project_name: string | null;
  conversation_data: Message[];
  plan_data: any;
  active_agents: string[];
  message_count: number;
  created_at: string;
  updated_at: string;
}

export const useConversationPersistence = (
  messages: Message[],
  planData: any,
  activeAgents: string[]
) => {
  const [sessionId] = useState(() => uuidv4());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    const timer = setTimeout(() => {
      saveConversation();
    }, 5000);

    return () => clearTimeout(timer);
  }, [messages, planData, activeAgents]);

  const saveConversation = useCallback(async () => {
    try {
      setIsSaving(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const conversationData = {
        user_id: user.id,
        session_id: sessionId,
        project_name: planData.installationType || 'Untitled Project',
        conversation_data: messages as any,
        plan_data: planData as any,
        active_agents: activeAgents,
        message_count: messages.length,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('conversation_memory')
        .upsert([conversationData], {
          onConflict: 'session_id'
        })
        .select()
        .single();

      if (error) throw error;

      setConversationId(data.id);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save conversation:', error);
    } finally {
      setIsSaving(false);
    }
  }, [messages, planData, activeAgents, sessionId]);

  const resumeConversation = useCallback(async (targetSessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('conversation_memory')
        .select('*')
        .eq('session_id', targetSessionId)
        .single();

      if (error) throw error;

      await supabase
        .from('conversation_memory')
        .update({ resumed_at: new Date().toISOString() })
        .eq('id', data.id);

      return {
        messages: (data.conversation_data as any) as Message[],
        planData: data.plan_data,
        activeAgents: data.active_agents as string[]
      };
    } catch (error) {
      console.error('Failed to resume conversation:', error);
      toast.error('Failed to load conversation');
      return null;
    }
  }, []);

  const getRecentConversations = useCallback(async (limit = 10) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('conversation_memory')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data as any) as ConversationMemory[];
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      return [];
    }
  }, []);

  return {
    sessionId,
    conversationId,
    isSaving,
    lastSaved,
    saveConversation,
    resumeConversation,
    getRecentConversations
  };
};

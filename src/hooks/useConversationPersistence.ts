import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { InstallPlanDataV2 } from '@/components/install-planner-v2/types';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  agentId?: string;
}

export const useConversationPersistence = (
  messages: Message[],
  planData: InstallPlanDataV2,
  activeAgents: string[],
  enabled: boolean = true
) => {
  const [sessionId] = useState(() => uuidv4());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const saveConversation = useCallback(async () => {
    if (!enabled || messages.length === 0) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setIsSaving(true);

    try {
      const conversationData = {
        session_id: sessionId,
        user_id: user.id,
        project_name: planData.loadType || 'Untitled Project',
        conversation_data: JSON.parse(JSON.stringify(messages)),
        plan_data: JSON.parse(JSON.stringify(planData)),
        active_agents: activeAgents,
        last_agent: activeAgents[activeAgents.length - 1] || null,
        message_count: messages.length,
      };

      const { error } = await supabase
        .from('conversation_memory')
        .upsert([conversationData], {
          onConflict: 'session_id',
        });

      if (error) {
        console.error('Failed to save conversation:', error);
      } else {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    } finally {
      setIsSaving(false);
    }
  }, [messages, planData, activeAgents, sessionId, enabled]);

  // Auto-save with debounce
  useEffect(() => {
    if (!enabled) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveConversation();
    }, 5000); // Save 5 seconds after last change

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [messages, planData, enabled, saveConversation]);

  const resumeConversation = useCallback(async (targetSessionId: string) => {
    const { data, error } = await supabase
      .from('conversation_memory')
      .select('*')
      .eq('session_id', targetSessionId)
      .single();

    if (error || !data) {
      console.error('Failed to resume conversation:', error);
      return null;
    }

    await supabase
      .from('conversation_memory')
      .update({ resumed_at: new Date().toISOString() })
      .eq('session_id', targetSessionId);

    return {
      messages: (data.conversation_data as any) as Message[],
      planData: (data.plan_data as any) as InstallPlanDataV2,
      activeAgents: data.active_agents as string[],
    };
  }, []);

  const getRecentConversations = useCallback(async (limit: number = 10) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('conversation_memory')
      .select('id, session_id, project_name, message_count, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch conversations:', error);
      return [];
    }

    return data || [];
  }, []);

  const deleteConversation = useCallback(async (targetSessionId: string) => {
    const { error } = await supabase
      .from('conversation_memory')
      .delete()
      .eq('session_id', targetSessionId);

    if (error) {
      console.error('Failed to delete conversation:', error);
      return false;
    }

    return true;
  }, []);

  const manualSave = useCallback(async () => {
    await saveConversation();
  }, [saveConversation]);

  return {
    sessionId,
    isSaving,
    lastSaved,
    resumeConversation,
    getRecentConversations,
    deleteConversation,
    manualSave,
  };
};

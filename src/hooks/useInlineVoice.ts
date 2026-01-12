import { useState, useCallback, useRef, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';

// Default electrician agent for inspection/testing
const DEFAULT_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';

interface UseInlineVoiceOptions {
  agentId?: string;
  onToolCall?: (toolName: string, params: Record<string, unknown>) => string | Promise<string>;
}

export function useInlineVoice(options: UseInlineVoiceOptions = {}) {
  const { agentId = DEFAULT_AGENT_ID, onToolCall } = options;
  const formContext = useOptionalVoiceFormContext();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [agentMessage, setAgentMessage] = useState('');
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log('[InlineVoice] Connected');
      setIsConnecting(false);
      setIsActive(true);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.success('Voice connected', {
        description: 'Start speaking to fill in test results',
        duration: 2000,
      });
    },
    onDisconnect: () => {
      console.log('[InlineVoice] Disconnected');
      setIsActive(false);
      setIsConnecting(false);
    },
    onError: (error) => {
      console.error('[InlineVoice] Error:', error);
      setIsConnecting(false);
      setIsActive(false);
      toast.error('Voice error', {
        description: error.message || 'Connection failed',
      });
    },
    onMessage: (message) => {
      if (message.type === 'transcript' && message.role === 'user') {
        setTranscript(message.text || '');
      } else if (message.type === 'agent_response') {
        setAgentMessage(message.text || '');
      }
    },
  });

  // Handle tool calls from ElevenLabs
  useEffect(() => {
    if (!conversation.status) return;

    const handleClientToolCall = async (toolName: string, params: Record<string, unknown>) => {
      console.log('[InlineVoice] Tool call:', toolName, params);

      // Try custom handler first
      if (onToolCall) {
        const result = await onToolCall(toolName, params);
        if (result) return result;
      }

      // Handle form filling via VoiceFormContext
      if (formContext?.activeForm) {
        if (toolName === 'fill_field' && params.field_name && params.value) {
          formContext.activeForm.onFillField(
            params.field_name as string,
            params.value as string
          );
          return `Set ${params.field_name} to ${params.value}`;
        }

        // Handle form actions
        if (formContext.activeForm.actions?.includes(toolName)) {
          const result = formContext.activeForm.onAction?.(toolName, params);
          if (result) return 'Action completed';
        }
      }

      return 'Done';
    };

    // Register client tools handler
    (conversation as any).clientTools = {
      fill_field: handleClientToolCall.bind(null, 'fill_field'),
      add_circuit: handleClientToolCall.bind(null, 'add_circuit'),
      next_circuit: handleClientToolCall.bind(null, 'next_circuit'),
      previous_circuit: handleClientToolCall.bind(null, 'previous_circuit'),
      select_circuit: handleClientToolCall.bind(null, 'select_circuit'),
      remove_circuit: handleClientToolCall.bind(null, 'remove_circuit'),
      set_polarity_ok: handleClientToolCall.bind(null, 'set_polarity_ok'),
      set_test_result: handleClientToolCall.bind(null, 'set_test_result'),
    };
  }, [conversation, formContext, onToolCall]);

  const startVoice = useCallback(async () => {
    if (isConnecting || isActive) return;

    setIsConnecting(true);

    try {
      // Request microphone
      console.log('[InlineVoice] Requesting microphone...');
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get conversation token
      console.log('[InlineVoice] Getting token...');
      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { agentId },
      });

      if (error || !data?.token) {
        throw new Error(error?.message || 'Failed to get conversation token');
      }

      // Set connection timeout
      connectionTimeoutRef.current = setTimeout(() => {
        console.error('[InlineVoice] Connection timeout');
        setIsConnecting(false);
        conversation.endSession();
        toast.error('Connection timed out');
      }, 15000);

      // Start session
      console.log('[InlineVoice] Starting session...');
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

      // Send initial context
      setTimeout(() => {
        if (conversation.status === 'connected' && formContext?.activeForm) {
          conversation.sendContextualUpdate(formContext.getFormContext());
        }
      }, 500);

    } catch (error) {
      console.error('[InlineVoice] Failed to start:', error);
      setIsConnecting(false);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.error('Failed to connect', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, [agentId, conversation, formContext, isConnecting, isActive]);

  const stopVoice = useCallback(async () => {
    await conversation.endSession();
    setIsActive(false);
    setIsConnecting(false);
  }, [conversation]);

  const toggleVoice = useCallback(() => {
    if (isActive) {
      stopVoice();
    } else {
      startVoice();
    }
  }, [isActive, startVoice, stopVoice]);

  return {
    isConnecting,
    isActive,
    isConnected: conversation.status === 'connected',
    isSpeaking: conversation.isSpeaking,
    transcript,
    agentMessage,
    startVoice,
    stopVoice,
    toggleVoice,
  };
}

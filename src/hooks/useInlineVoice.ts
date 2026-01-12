import { useState, useCallback, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { resolveFieldName } from '@/utils/voiceFieldAliases';

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

  // Refs for stable tool handler access (avoid stale closures)
  const onToolCallRef = useRef(onToolCall);
  const formContextRef = useRef(formContext);
  onToolCallRef.current = onToolCall;
  formContextRef.current = formContext;

  // Stable client tools handler
  const handleToolCall = useCallback(async (toolName: string, params: Record<string, unknown>) => {
    console.log('[InlineVoice] Tool call:', toolName, params);

    // Try custom handler first
    if (onToolCallRef.current) {
      const result = await onToolCallRef.current(toolName, params);
      if (result) return result;
    }

    // Handle form filling via VoiceFormContext
    if (formContextRef.current?.activeForm) {
      if (toolName === 'fill_field' && params.field_name && params.value) {
        formContextRef.current.activeForm.onFillField(
          params.field_name as string,
          params.value as string
        );
        return `Set ${params.field_name} to ${params.value}`;
      }

      if (formContextRef.current.activeForm.actions?.includes(toolName)) {
        formContextRef.current.activeForm.onAction?.(toolName, params);
        return 'Action completed';
      }
    }

    return 'Done';
  }, []);

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
      const msg = message as unknown as Record<string, unknown>;
      if (msg.type === 'user_transcript') {
        const event = msg.user_transcription_event as { user_transcript?: string } | undefined;
        setTranscript(event?.user_transcript || '');
      }
      if (msg.type === 'agent_response') {
        const event = msg.agent_response_event as { agent_response?: string } | undefined;
        setAgentMessage(event?.agent_response || '');
      }
    },
    // CLIENT TOOLS MUST BE PASSED HERE - not assigned via useEffect!
    clientTools: {
      fill_field: async (params: { field_name: string; value: string }) =>
        handleToolCall('fill_field', params),
      add_circuit: async (params: Record<string, unknown>) =>
        handleToolCall('add_circuit', params),
      next_circuit: async () =>
        handleToolCall('next_circuit', {}),
      previous_circuit: async () =>
        handleToolCall('previous_circuit', {}),
      select_circuit: async (params: { circuit_number: number }) =>
        handleToolCall('select_circuit', params),
      remove_circuit: async (params: { circuit_number: number }) =>
        handleToolCall('remove_circuit', params),
      set_polarity_ok: async (params: { circuit_number?: number; value: boolean }) =>
        handleToolCall('set_polarity_ok', params),
      set_test_result: async (params: { field: string; value: string; circuit_number?: number }) => {
        // Resolve spoken field name to actual TestResult property
        const resolvedField = resolveFieldName(params.field);
        if (!resolvedField) {
          console.warn('[InlineVoice] Unknown field:', params.field);
          return `Unknown field: ${params.field}`;
        }
        return handleToolCall('set_test_result', {
          ...params,
          field: resolvedField,
        });
      },
    },
  });

  const startVoice = useCallback(async () => {
    console.log('[InlineVoice] startVoice called, isConnecting:', isConnecting, 'isActive:', isActive);
    if (isConnecting || isActive) {
      console.log('[InlineVoice] Already connecting or active, returning early');
      return;
    }

    setIsConnecting(true);
    console.log('[InlineVoice] Set isConnecting to true');

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

      // Send initial context if form is active
      setTimeout(() => {
        if (conversation.status === 'connected' && formContextRef.current?.activeForm) {
          conversation.sendContextualUpdate(formContextRef.current.getFormContext());
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
  }, [agentId, conversation, isConnecting, isActive]);

  const stopVoice = useCallback(async () => {
    await conversation.endSession();
    setIsActive(false);
    setIsConnecting(false);
  }, [conversation]);

  const toggleVoice = useCallback(() => {
    console.log('[InlineVoice] toggleVoice called, isActive:', isActive, 'isConnecting:', isConnecting);
    toast.info('Voice button clicked');
    if (isActive) {
      stopVoice();
    } else {
      startVoice();
    }
  }, [isActive, isConnecting, startVoice, stopVoice]);

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

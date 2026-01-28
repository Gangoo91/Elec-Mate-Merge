import { useState, useCallback, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { resolveFieldName } from '@/utils/voiceFieldAliases';

// Default electrician agent for inspection/testing
const DEFAULT_AGENT_ID = 'agent_0601kg22prbze9c9j26y2vmx4fbd';

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
    // CLIENT TOOLS - Schedule of Tests tools for EICR/EIC certificates
    clientTools: {
      // ========== SESSION CONTROL ==========
      stop_session: async () => {
        console.log('[InlineVoice] stop_session called');
        return handleToolCall('stop_session', {});
      },

      // ========== FIELD-SPECIFIC TOOLS (for exact enum values) ==========
      // Dropdown fields
      set_wiring_type: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_wiring_type', params),
      set_reference_method: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_reference_method', params),
      set_live_size: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_live_size', params),
      set_cpc_size: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_cpc_size', params),
      set_bs_standard: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_bs_standard', params),
      set_device_type: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_device_type', params),
      set_device_curve: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_device_curve', params),
      set_device_rating: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_device_rating', params),
      set_rcd_bs_standard: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_bs_standard', params),
      set_rcd_type: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_type', params),
      set_rcd_ma_rating: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_ma_rating', params),
      set_insulation_voltage: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_insulation_voltage', params),
      set_insulation_ln: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_insulation_ln', params),
      set_insulation_le: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_insulation_le', params),
      set_polarity: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_polarity', params),
      set_rcd_test_button: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_test_button', params),
      set_afdd_test: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_afdd_test', params),
      set_functional_test: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_functional_test', params),
      set_phase_type: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_phase_type', params),
      set_phase_rotation: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_phase_rotation', params),

      // Numeric/text fields
      set_circuit_number: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_circuit_number', params),
      set_circuit_description: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_circuit_description', params),
      set_points_served: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_points_served', params),
      set_ka_rating: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_ka_rating', params),
      set_max_zs: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_max_zs', params),
      set_rcd_amp_rating: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_amp_rating', params),
      set_ring_r1: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_ring_r1', params),
      set_ring_rn: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_ring_rn', params),
      set_ring_r2: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_ring_r2', params),
      set_ring_readings: async (params: { circuit_number?: number; r1: string; rn: string; r2: string }) => handleToolCall('set_ring_readings', params),
      set_r1r2: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_r1r2', params),
      set_r2: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_r2', params),
      set_insulation_ne: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_insulation_ne', params),
      set_zs: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_zs', params),
      set_rcd_trip_time: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_trip_time', params),
      set_rcd_5x_time: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_rcd_5x_time', params),
      set_pfc: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_pfc', params),
      set_pfc_ln: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_pfc_ln', params),
      set_pfc_le: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_pfc_le', params),
      set_notes: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_notes', params),
      set_phase_balance_l1: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_phase_balance_l1', params),
      set_phase_balance_l2: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_phase_balance_l2', params),
      set_phase_balance_l3: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_phase_balance_l3', params),
      set_phase_balance: async (params: { circuit_number?: number; l1: string; l2: string; l3: string }) => handleToolCall('set_phase_balance', params),
      set_line_voltage: async (params: { circuit_number?: number; value: string }) => handleToolCall('set_line_voltage', params),

      // ========== CIRCUIT MANAGEMENT TOOLS ==========
      add_circuit: async (params: { circuit_type: string; description?: string }) => handleToolCall('add_circuit', params),
      delete_circuit: async (params: { circuit_number?: number }) => handleToolCall('delete_circuit', params),
      select_circuit: async (params: { circuit_number: number }) => handleToolCall('select_circuit', params),
      next_circuit: async () => handleToolCall('next_circuit', {}),
      previous_circuit: async () => handleToolCall('previous_circuit', {}),
      get_status: async (params?: { circuit_number?: number }) => handleToolCall('get_status', params || {}),
      validate_tests: async () => handleToolCall('validate_tests', {}),

      // ========== BULK TOOLS ==========
      bulk_set_polarity: async (params: { value: string }) => handleToolCall('bulk_set_polarity', params),
      bulk_set_wiring_type: async (params: { value: string }) => handleToolCall('bulk_set_wiring_type', params),
      bulk_set_reference_method: async (params: { value: string }) => handleToolCall('bulk_set_reference_method', params),
      bulk_set_insulation_voltage: async (params: { value: string }) => handleToolCall('bulk_set_insulation_voltage', params),
      bulk_set_insulation_readings: async (params: { value: string }) => handleToolCall('bulk_set_insulation_readings', params),
      bulk_set_functional_test: async (params: { value: string }) => handleToolCall('bulk_set_functional_test', params),
      bulk_set_rcd_test_button: async (params: { value: string }) => handleToolCall('bulk_set_rcd_test_button', params),

      // ========== LEGACY/GENERIC TOOLS ==========
      // PRIMARY TOOL: Fill schedule of tests (EICR/EIC)
      fill_schedule_of_tests: async (params: {
        action: string;
        circuit_type?: string;
        circuit_number?: number;
        field?: string;
        value?: string;
        description?: string;
        fields?: Record<string, string>;
      }) => {
        console.log('[InlineVoice] fill_schedule_of_tests called:', params);
        if ((params.action === 'update_field' || params.action === 'update_multiple_fields') && params.field) {
          const resolvedField = resolveFieldName(params.field);
          if (resolvedField) {
            params = { ...params, field: resolvedField };
          }
        }
        return handleToolCall('fill_schedule_of_tests', params);
      },

      // BULK TOOL: Set field on all circuits
      bulk_fill_circuits: async (params: {
        field: string;
        value: string;
        board?: string;
        only_empty?: boolean;
      }) => {
        console.log('[InlineVoice] bulk_fill_circuits called:', params);
        const resolvedField = resolveFieldName(params.field);
        return handleToolCall('bulk_fill_circuits', { ...params, field: resolvedField || params.field });
      },

      // LEGACY: Keep fill_eicr for backward compatibility
      fill_eicr: async (params: {
        action: string;
        circuit_type?: string;
        circuit_number?: number;
        field?: string;
        value?: string;
        description?: string;
      }) => {
        console.log('[InlineVoice] fill_eicr called (legacy):', params);
        if (params.action === 'update_field' && params.field) {
          const resolvedField = resolveFieldName(params.field);
          if (resolvedField) {
            params = { ...params, field: resolvedField };
          }
        }
        return handleToolCall('fill_schedule_of_tests', params);
      },

      fill_eic: async (params: {
        action: string;
        circuit_type?: string;
        circuit_number?: number;
        field?: string;
        value?: string;
        description?: string;
      }) => {
        console.log('[InlineVoice] fill_eic called (routing to fill_schedule_of_tests):', params);
        if (params.action === 'update_field' && params.field) {
          const resolvedField = resolveFieldName(params.field);
          if (resolvedField) {
            params = { ...params, field: resolvedField };
          }
        }
        return handleToolCall('fill_schedule_of_tests', params);
      },

      fill_minor_works: async (params: {
        action: string;
        circuit_type?: string;
        field?: string;
        value?: string;
        description?: string;
      }) => {
        console.log('[InlineVoice] fill_minor_works called:', params);
        if (params.action === 'update_field' && params.field) {
          const resolvedField = resolveFieldName(params.field);
          if (resolvedField) {
            params = { ...params, field: resolvedField };
          }
        }
        return handleToolCall('fill_minor_works', params);
      },

      // LEGACY BULK TOOLS - route to bulk_fill_circuits
      set_field_all_circuits: async (params: { field: string; value: string }) => {
        console.log('[InlineVoice] set_field_all_circuits called (legacy):', params);
        const resolvedField = resolveFieldName(params.field);
        return handleToolCall('bulk_fill_circuits', { ...params, field: resolvedField || params.field });
      },

      set_circuit_field: async (params: { circuit_number: number; field: string; value: string }) => {
        console.log('[InlineVoice] set_circuit_field called:', params);
        const resolvedField = resolveFieldName(params.field);
        return handleToolCall('set_circuit_field', { ...params, field: resolvedField || params.field });
      },

      set_multiple_fields: async (params: Record<string, unknown>) => {
        console.log('[InlineVoice] set_multiple_fields called:', params);
        return handleToolCall('set_multiple_fields', params);
      },

      get_circuits_status: async () => {
        console.log('[InlineVoice] get_circuits_status called');
        return handleToolCall('get_circuits_status', {});
      },

      // SUB-BOARD TOOLS
      select_board: async (params: { board: string }) => {
        console.log('[InlineVoice] select_board called:', params);
        return handleToolCall('select_board', params);
      },

      add_circuit_to_board: async (params: { board: string; type?: string; rating?: string; description?: string }) => {
        console.log('[InlineVoice] add_circuit_to_board called:', params);
        return handleToolCall('add_circuit_to_board', params);
      },

      set_board_field_all_circuits: async (params: { board: string; field: string; value: string }) => {
        console.log('[InlineVoice] set_board_field_all_circuits called:', params);
        const resolvedField = resolveFieldName(params.field);
        return handleToolCall('set_board_field_all_circuits', { ...params, field: resolvedField || params.field });
      },

      get_board_status: async (params: { board?: string }) => {
        console.log('[InlineVoice] get_board_status called:', params);
        return handleToolCall('get_board_status', params);
      },

      scan_board: async (params: { board: string }) => {
        console.log('[InlineVoice] scan_board called:', params);
        return handleToolCall('scan_board', params);
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

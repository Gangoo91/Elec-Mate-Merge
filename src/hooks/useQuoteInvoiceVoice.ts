import { useState, useCallback, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Quote/Invoice ElevenLabs agent
const QUOTE_INVOICE_AGENT_ID = 'agent_0801kdxbb7hhepg80gfpgq8kgpgs';

interface UseQuoteInvoiceVoiceOptions {
  currentSection?: 'quotes' | 'invoices';
  onToolResult?: () => void;
}

export function useQuoteInvoiceVoice(options: UseQuoteInvoiceVoiceOptions = {}) {
  const { currentSection = 'quotes', onToolResult } = options;

  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [agentMessage, setAgentMessage] = useState('');
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onToolResultRef = useRef(onToolResult);
  onToolResultRef.current = onToolResult;

  // Tool call handler - calls voice-tools edge function
  const callVoiceTools = useCallback(async (toolName: string, params: Record<string, unknown>) => {
    console.log(`[QuoteInvoiceVoice] ${toolName} called:`, params);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return 'Error: Not authenticated';
      }

      const { data, error } = await supabase.functions.invoke('voice-tools', {
        body: { tool: toolName, params },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) {
        console.error(`[QuoteInvoiceVoice] ${toolName} error:`, error);
        return `Error: ${error.message}`;
      }

      // Trigger refresh callback
      onToolResultRef.current?.();

      return data?.message || data?.result || 'Done';
    } catch (err) {
      console.error(`[QuoteInvoiceVoice] ${toolName} exception:`, err);
      return `Error: ${err instanceof Error ? err.message : 'Unknown error'}`;
    }
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log('[QuoteInvoiceVoice] Connected');
      setIsConnecting(false);
      setIsActive(true);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.success('Voice connected', {
        description: currentSection === 'quotes'
          ? 'Say "Send quote to..." or "What quotes are pending?"'
          : 'Say "Send invoice to..." or "Any overdue invoices?"',
        duration: 4000,
      });
    },
    onDisconnect: () => {
      console.log('[QuoteInvoiceVoice] Disconnected');
      setIsActive(false);
      setIsConnecting(false);
    },
    onError: (error) => {
      console.error('[QuoteInvoiceVoice] Error:', error);
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
    // Client tools matching ElevenLabs agent tool definitions - COMPLETE parameters
    clientTools: {
      // Send an existing quote by client name or quote number
      send_quote: async (params: { clientName?: string; quoteNumber?: string }) => {
        return callVoiceTools('send_quote', params);
      },

      // Send an existing invoice by client name or invoice number
      send_invoice: async (params: { clientName?: string; invoiceNumber?: string }) => {
        return callVoiceTools('send_invoice', params);
      },

      // Create a new quote with line items and send to client
      create_and_send_quote: async (params: {
        // Client details
        clientName: string;
        clientEmail: string;
        clientPhone?: string;
        clientAddress?: string;
        clientPostcode?: string;
        // Job details
        jobTitle: string;
        jobDescription?: string;
        jobLocation?: string;
        estimatedDuration?: string;
        workStartDate?: string;
        specialRequirements?: string;
        // Line item
        itemDescription: string;
        itemQuantity: number;
        itemUnitPrice: number;
        itemCategory?: string;
        // Settings
        labourRate?: number;
        overheadPercentage?: number;
        profitMargin?: number;
        vatRate?: number;
        vatRegistered?: boolean;
        breakdownMaterials?: boolean;
        // Extras
        notes?: string;
        expiryDays?: number;
      }) => {
        return callVoiceTools('create_and_send_quote', params);
      },

      // Convert quote to invoice OR create fresh invoice
      create_and_send_invoice: async (params: {
        // Quote conversion
        quoteNumber?: string;
        // Client details
        clientName?: string;
        clientEmail?: string;
        clientPhone?: string;
        clientAddress?: string;
        clientPostcode?: string;
        // Job details
        jobTitle?: string;
        jobDescription?: string;
        workCompletionDate?: string;
        // Line item
        itemDescription?: string;
        itemQuantity?: number;
        itemUnitPrice?: number;
        itemCategory?: string;
        // Financial settings
        vatRate?: number;
        vatRegistered?: boolean;
        breakdownMaterials?: boolean;
        // Invoice-specific
        paymentTerms?: string;
        paymentDays?: number;
        paymentMethod?: string;
        // Bank details
        bankName?: string;
        bankAccountName?: string;
        bankAccountNumber?: string;
        bankSortCode?: string;
        // Extras
        invoiceNotes?: string;
        purchaseOrder?: string;
      }) => {
        return callVoiceTools('create_and_send_invoice', params);
      },

      // Get information about quotes
      get_quote_info: async (params: { client?: string; status?: string }) => {
        return callVoiceTools('get_quote_info', params);
      },

      // Get information about invoices
      get_invoice_info: async (params: { client?: string; status?: string }) => {
        return callVoiceTools('get_invoice_info', params);
      },

      // Get list of overdue invoices
      get_overdue_invoices: async () => {
        return callVoiceTools('get_overdue_invoices', {});
      },
    },
  });

  const startVoice = useCallback(async () => {
    if (isConnecting || isActive) return;

    setIsConnecting(true);

    try {
      // Request microphone
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get conversation token
      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { agentId: QUOTE_INVOICE_AGENT_ID },
      });

      if (error || !data?.token) {
        throw new Error(error?.message || 'Failed to get conversation token');
      }

      // Set connection timeout
      connectionTimeoutRef.current = setTimeout(() => {
        console.error('[QuoteInvoiceVoice] Connection timeout');
        setIsConnecting(false);
        conversation.endSession();
        toast.error('Connection timed out');
      }, 15000);

      // Start session
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

      // Send initial context
      setTimeout(() => {
        if (conversation.status === 'connected') {
          conversation.sendContextualUpdate(`User is on the ${currentSection} page. Help them send or create ${currentSection === 'quotes' ? 'quotes' : 'invoices'}.`);
        }
      }, 500);

    } catch (error) {
      console.error('[QuoteInvoiceVoice] Failed to start:', error);
      setIsConnecting(false);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      toast.error('Failed to connect', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }, [conversation, isConnecting, isActive, currentSection]);

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

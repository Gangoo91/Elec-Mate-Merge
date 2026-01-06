import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, Volume2, X, Loader2, PhoneOff, AlertCircle, RefreshCw, Lightbulb, GripVertical, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { getSetting } from '@/services/settingsService';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { useQueryClient } from '@tanstack/react-query';

interface ElectricianVoiceAssistantProps {
  onNavigate?: (section: string) => void;
  currentSection?: string;
}

// Electrician-specific settings key - separate from employer
const ELECTRICIAN_AGENT_SETTINGS_KEY = 'elevenlabs_electrician_agent_id';

// Default agent ID - works out of the box
const DEFAULT_ELECTRICIAN_AGENT_ID = 'agent_9901ke9rd48cf6jva60jd90sgx1y';

type ConnectionStep = 'idle' | 'mic' | 'token' | 'connecting' | 'connected' | 'error';

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  'overview': 'Overview',
  'dashboard': 'Dashboard',
  'home': 'Home',
  'business': 'Business Hub',
  'quote-builder': 'Quote Builder',
  'quotes': 'Quotes',
  'invoices': 'Invoices',
  'cost-engineer': 'Cost Engineer',
  'ai-planner': 'AI Planner',
  'customers': 'Customers',
  'testing': 'Inspection & Testing',
  'certificates': 'Certificates',
  'settings': 'Settings',
};

const QUICK_PROMPTS = [
  { label: "New quote", message: "Create a new quote" },
  { label: "My quotes", message: "Show me my recent quotes" },
  { label: "Add labour", message: "Add labour to the quote" },
  { label: "Calculate total", message: "What's the total?" },
];

const ROTATING_TIPS = [
  "Create a new quote",
  "Add 8 hours labour at £50 per hour",
  "Add cable to materials",
  "What's the total so far?",
  "Go to invoices",
  "Next step",
  "Submit the quote",
  "Go back",
];

// Dock zone at bottom center
const DOCK_ZONE = {
  height: 80,
  width: 120,
};

// Dismiss zone at bottom left
const DISMISS_ZONE = {
  height: 80,
  width: 80,
};

export const ElectricianVoiceAssistant: React.FC<ElectricianVoiceAssistantProps> = ({
  onNavigate,
  currentSection = 'overview',
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const formContext = useOptionalVoiceFormContext();

  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState<ConnectionStep>('idle');
  const [connectionError, setConnectionError] = useState<string>('');
  const [isMinimised, setIsMinimised] = useState(true);
  const [isDocked, setIsDocked] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem('electrician-voice-dismissed') === 'true';
  });
  const [transcript, setTranscript] = useState('');
  const [lastAgentMessage, setLastAgentMessage] = useState('');
  const [agentId, setAgentId] = useState<string>('');
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [isInDockZone, setIsInDockZone] = useState(false);
  const [isInDismissZone, setIsInDismissZone] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const fabRef = useRef<HTMLButtonElement>(null);
  const lastFormContextRef = useRef<string>('');
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize position on mount
  useEffect(() => {
    const savedPos = localStorage.getItem('electrician-voice-position');
    const wasDocked = localStorage.getItem('electrician-voice-docked') === 'true';

    if (wasDocked) {
      setIsDocked(true);
    } else if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        setPosition(pos);
      } catch {
        // Default position
      }
    }
  }, []);

  // Save position when it changes
  useEffect(() => {
    if (!isDocked && (position.x !== 0 || position.y !== 0)) {
      localStorage.setItem('electrician-voice-position', JSON.stringify(position));
    }
    localStorage.setItem('electrician-voice-docked', isDocked.toString());
  }, [position, isDocked]);

  // Load electrician-specific agent ID (falls back to default)
  useEffect(() => {
    const loadAgentId = async () => {
      try {
        const value = await getSetting(ELECTRICIAN_AGENT_SETTINGS_KEY);
        // Use saved value or fall back to default
        setAgentId(value || DEFAULT_ELECTRICIAN_AGENT_ID);
      } catch (error) {
        console.error('Failed to load electrician agent ID:', error);
        // Still use default on error
        setAgentId(DEFAULT_ELECTRICIAN_AGENT_ID);
      } finally {
        setIsLoadingSettings(false);
      }
    };
    loadAgentId();
  }, []);

  // Execute server-side tool
  const executeServerTool = async (toolName: string, params: Record<string, unknown>) => {
    try {
      console.log('[ElectricianVoice] Server tool:', toolName, params);
      const { data, error } = await supabase.functions.invoke('voice-tools', {
        body: { tool: toolName, params },
      });

      if (error) throw error;

      // Invalidate relevant queries
      if (toolName.includes('quote') || toolName.includes('invoice')) {
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      }

      return data?.result || data?.message || 'Done';
    } catch (error) {
      console.error('[ElectricianVoice] Server tool error:', error);
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log('[ElectricianVoice] Connected successfully');
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      setIsConnecting(false);
      setConnectionStep('connected');
      setConnectionError('');
      toast({ title: 'Voice Assistant Active', description: 'Speak now - I\'m listening!' });
    },
    onDisconnect: () => {
      console.log('[ElectricianVoice] Disconnected');
      setConnectionStep('idle');
      setTranscript('');
      setLastAgentMessage('');
      setIsConnecting(false);
    },
    onError: (error: unknown) => {
      console.error('[ElectricianVoice] Error:', error);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      setIsConnecting(false);
      setConnectionStep('error');
      const errorMsg = error && typeof error === 'object' && 'message' in error
        ? String((error as { message: unknown }).message)
        : 'Connection failed';
      setConnectionError(errorMsg);
      toast({
        title: 'Voice Error',
        description: errorMsg + '. Tap Retry to try again.',
        variant: 'destructive',
      });
    },
    onMessage: (message) => {
      console.log('[ElectricianVoice] Message:', message);
      const msg = message as unknown as Record<string, unknown>;
      if (msg.type === 'user_transcript') {
        const event = msg.user_transcription_event as { user_transcript?: string } | undefined;
        setTranscript(event?.user_transcript || '');
      }
      if (msg.type === 'agent_response') {
        const event = msg.agent_response_event as { agent_response?: string } | undefined;
        setLastAgentMessage(event?.agent_response || '');
      }
    },
    clientTools: {
      // Navigation tools
      navigate_to: async ({ section }: { section: string }) => {
        const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
        const displayName = SECTION_DISPLAY_NAMES[sectionLower] || section;

        if (onNavigate) {
          onNavigate(sectionLower);
          toast({ title: 'Navigating', description: `Going to ${displayName}` });
        }
        return `Navigated to ${displayName}`;
      },

      go_back: async () => {
        window.history.back();
        return 'Going back';
      },

      scroll_up: async () => {
        window.scrollBy({ top: -300, behavior: 'smooth' });
        return 'Scrolled up';
      },

      scroll_down: async () => {
        window.scrollBy({ top: 300, behavior: 'smooth' });
        return 'Scrolled down';
      },

      refresh_data: async () => {
        queryClient.invalidateQueries();
        toast({ title: 'Refreshing', description: 'Data is being refreshed' });
        return 'Refreshing all data';
      },

      // Form filling tools
      fill_field: async ({ field, value }: { field: string; value: string }) => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.fillField(field, value);
        return success ? `Set ${field} to "${value}"` : `Could not find field "${field}"`;
      },

      // Quote-specific tools
      add_labour_item: async ({ description, hours, rate }: { description: string; hours: number; rate: number }) => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.executeAction('add_labour_item', { description, hours, rate });
        if (success) {
          const total = hours * rate;
          return `Added labour: ${description}, ${hours}h at £${rate}/hr = £${total}`;
        }
        return 'Cannot add labour item to this form';
      },

      add_material_item: async ({ description, quantity, unitPrice }: { description: string; quantity: number; unitPrice: number }) => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.executeAction('add_material_item', { description, quantity, unitPrice });
        if (success) {
          const total = quantity * unitPrice;
          return `Added material: ${description}, ${quantity} x £${unitPrice} = £${total}`;
        }
        return 'Cannot add material item to this form';
      },

      add_line_item: async ({ description, quantity, unitPrice, unit }: { description: string; quantity: number; unitPrice: number; unit?: string }) => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.executeAction('add_line_item', { description, quantity, unitPrice, unit: unit || 'each' });
        if (success) {
          const total = quantity * unitPrice;
          return `Added: ${description}, ${quantity} x £${unitPrice} = £${total}`;
        }
        return 'Cannot add line item to this form';
      },

      remove_last_item: async () => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.executeAction('remove_last_item', {});
        return success ? 'Removed last item' : 'No items to remove';
      },

      next_step: async () => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.executeAction('next_step', {});
        return success ? 'Moving to next step' : 'Cannot proceed to next step';
      },

      submit_form: async () => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.submitForm();
        return success ? 'Form submitted' : 'Could not submit form';
      },

      clear_form: async () => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.clearForm();
        return success ? 'Form cleared' : 'Could not clear form';
      },

      cancel_form: async () => {
        if (!formContext) return 'No form is currently open';
        const success = formContext.cancelForm();
        return success ? 'Form cancelled' : 'Could not cancel form';
      },

      // Query tools for electrician
      get_quote_info: async ({ client, status }: { client?: string; status?: string }) => executeServerTool('get_quote_info', { client, status }),
      get_invoice_info: async ({ client, status }: { client?: string; status?: string }) => executeServerTool('get_invoice_info', { client, status }),
      get_overdue_invoices: async () => executeServerTool('get_overdue_invoices', {}),
      lookup_price: async ({ searchTerm }: { searchTerm: string }) => executeServerTool('lookup_price', { searchTerm }),
    },
  });

  // Send form context to agent when it changes
  useEffect(() => {
    if (conversation.status !== 'connected' || !formContext) return;

    const currentFormContext = formContext.getFormContext();
    if (currentFormContext !== lastFormContextRef.current) {
      lastFormContextRef.current = currentFormContext;
      console.log('[ElectricianVoice] Sending form context update:', currentFormContext);
      conversation.sendContextualUpdate(currentFormContext);
    }
  }, [formContext?.activeForm, conversation.status]);

  // Rotate tips every 4 seconds when connected and listening
  useEffect(() => {
    const connected = conversation.status === 'connected';
    if (!connected || conversation.isSpeaking) return;

    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % ROTATING_TIPS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [conversation.status, conversation.isSpeaking]);

  // Handle quick prompt click
  const handleQuickPrompt = useCallback((message: string) => {
    if (conversation.status === 'connected') {
      conversation.sendUserMessage(message);
      setTranscript(message);
    }
  }, [conversation]);

  // Drag handlers
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (isDocked) return;

    const fab = fabRef.current;
    if (!fab) return;

    const rect = fab.getBoundingClientRect();
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  }, [isDocked]);

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;

    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const dockLeft = (screenWidth - DOCK_ZONE.width) / 2;
    const dockRight = dockLeft + DOCK_ZONE.width;
    const dockTop = screenHeight - DOCK_ZONE.height;

    const dismissRight = DISMISS_ZONE.width;
    const dismissTop = screenHeight - DISMISS_ZONE.height;

    const centerX = newX + 28;
    const centerY = newY + 28;

    const inDock = centerX >= dockLeft && centerX <= dockRight && centerY >= dockTop;
    const inDismiss = centerX <= dismissRight && centerY >= dismissTop;

    setIsInDockZone(inDock && !inDismiss);
    setIsInDismissZone(inDismiss);

    const maxX = screenWidth - 56;
    const maxY = screenHeight - 56;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  }, [isDragging, dragOffset]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (isInDismissZone) {
      setIsDismissed(true);
      sessionStorage.setItem('electrician-voice-dismissed', 'true');
      setIsInDismissZone(false);
      toast({
        title: 'Voice Assistant Hidden',
        description: 'Refresh page or go to settings to re-enable',
      });
    } else if (isInDockZone) {
      setIsDocked(true);
      setIsInDockZone(false);
    }
  }, [isDragging, isInDockZone, isInDismissZone, toast]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  }, [handleDragStart]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const startConversation = useCallback(async () => {
    if (!agentId) {
      toast({
        title: 'Setup Required',
        description: 'Please configure your Voice Assistant in Settings.',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    setIsMinimised(false);
    setConnectionStep('mic');
    setConnectionError('');

    try {
      console.log('[ElectricianVoice] Requesting microphone...');
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('[ElectricianVoice] Microphone granted');
      } catch (micError) {
        console.error('[ElectricianVoice] Microphone error:', micError);
        throw new Error('Microphone access denied. Please allow microphone access and try again.');
      }

      setConnectionStep('token');
      console.log('[ElectricianVoice] Getting token...');

      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token', {
        body: { agentId },
      });

      if (error) {
        console.error('[ElectricianVoice] Token error:', error);
        throw new Error(error.message || 'Failed to get conversation token');
      }

      if (!data?.token) {
        console.error('[ElectricianVoice] No token in response:', data);
        throw new Error('No token received from server');
      }

      console.log('[ElectricianVoice] Token received, connecting...');

      setConnectionStep('connecting');

      connectionTimeoutRef.current = setTimeout(() => {
        console.error('[ElectricianVoice] Connection timeout');
        setIsConnecting(false);
        setConnectionStep('error');
        setConnectionError('Connection timed out. Please try again.');
        conversation.endSession();
      }, 15000);

      let initialContext = `Current section: ${currentSection}`;
      if (formContext?.activeForm) {
        initialContext += `\n${formContext.getFormContext()}`;
      }

      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });

      setTimeout(() => {
        if (conversation.status === 'connected') {
          conversation.sendContextualUpdate(initialContext);
        }
      }, 500);
    } catch (error) {
      console.error('[ElectricianVoice] Failed to start conversation:', error);
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }
      setIsConnecting(false);
      setConnectionStep('error');
      const errorMsg = error instanceof Error ? error.message : 'Could not start voice assistant';
      setConnectionError(errorMsg);
      toast({
        title: 'Connection Failed',
        description: errorMsg,
        variant: 'destructive',
      });
    }
  }, [agentId, conversation, toast, currentSection, formContext]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const isConnected = conversation.status === 'connected';

  if (isLoadingSettings) return null;

  if (isDismissed) return null;

  // Docked state
  if (isDocked) {
    return (
      <>
        {isDragging && (
          <>
            <div className={cn(
              "fixed bottom-0 left-0 w-[80px] h-[80px] rounded-tr-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
              isInDismissZone
                ? "border-red-500 bg-red-500/20 scale-110"
                : "border-muted-foreground/30 bg-muted/20"
            )}>
              <X className={cn("h-6 w-6", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")} />
              <span className={cn("text-[10px] font-medium", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")}>Hide</span>
            </div>
            <div className={cn(
              "fixed bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[80px] rounded-t-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
              isInDockZone
                ? "border-elec-yellow bg-elec-yellow/20 scale-110"
                : "border-muted-foreground/30 bg-muted/20"
            )}>
              <Minimize2 className={cn("h-6 w-6", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")} />
              <span className={cn("text-[10px] font-medium", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")}>Dock</span>
            </div>
          </>
        )}

        <button
          onClick={() => {
            setIsDocked(false);
            setPosition({
              x: window.innerWidth - 70,
              y: window.innerHeight - 150,
            });
          }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
            "h-10 px-4 rounded-full",
            "flex items-center gap-2",
            "bg-elec-gray/90 backdrop-blur border border-elec-yellow/30",
            "shadow-lg hover:bg-elec-gray transition-all duration-200",
            "touch-feedback",
            isConnected && "border-green-500/50"
          )}
        >
          <div className={cn(
            "h-2 w-2 rounded-full",
            isConnected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
          )} />
          <Mic className={cn(
            "h-4 w-4",
            isConnected ? "text-green-500" : "text-elec-yellow"
          )} />
          <span className="text-xs font-medium text-foreground">Voice</span>
        </button>
      </>
    );
  }

  const fabStyle: React.CSSProperties = isDragging || position.x !== 0 || position.y !== 0
    ? {
        position: 'fixed',
        left: position.x,
        top: position.y,
        right: 'auto',
        bottom: 'auto',
      }
    : {
        position: 'fixed',
        right: 16,
        bottom: 80,
      };

  return (
    <>
      {isDragging && (
        <>
          <div className={cn(
            "fixed bottom-0 left-0 w-[80px] h-[80px] rounded-tr-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
            isInDismissZone
              ? "border-red-500 bg-red-500/20 scale-110"
              : "border-muted-foreground/30 bg-muted/20"
          )}>
            <X className={cn("h-6 w-6", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")} />
            <span className={cn("text-[10px] font-medium", isInDismissZone ? "text-red-500" : "text-muted-foreground/50")}>Hide</span>
          </div>
          <div className={cn(
            "fixed bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[80px] rounded-t-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-1 z-40",
            isInDockZone
              ? "border-elec-yellow bg-elec-yellow/20 scale-110"
              : "border-muted-foreground/30 bg-muted/20"
          )}>
            <Minimize2 className={cn("h-6 w-6", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")} />
            <span className={cn("text-[10px] font-medium", isInDockZone ? "text-elec-yellow" : "text-muted-foreground/50")}>Dock</span>
          </div>
        </>
      )}

      <div className="z-50" style={fabStyle}>
        {/* Expanded Panel */}
        {!isMinimised && (
          <div className="absolute bottom-16 right-0 w-80 max-w-[calc(100vw-32px)] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-elec-yellow/10 border-b border-border">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  isConnected ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
                )} />
                <span className="text-sm font-medium">Voice Assistant</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimised(true)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 min-h-[120px] max-h-[300px] overflow-y-auto">
              {isConnecting && (
                <div className="flex flex-col items-center justify-center py-6 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {connectionStep === 'mic' && 'Requesting microphone...'}
                      {connectionStep === 'token' && 'Getting authorisation...'}
                      {connectionStep === 'connecting' && 'Connecting...'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {connectionStep === 'mic' && 'Please allow microphone access'}
                      {connectionStep === 'token' && 'Authenticating with voice service'}
                      {connectionStep === 'connecting' && 'Almost ready...'}
                    </p>
                  </div>
                </div>
              )}

              {connectionStep === 'error' && !isConnecting && (
                <div className="flex flex-col items-center justify-center py-6 gap-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Connection Failed</p>
                    <p className="text-xs text-muted-foreground mt-1">{connectionError || 'Please try again'}</p>
                  </div>
                  <Button onClick={startConversation} size="sm" variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Retry
                  </Button>
                </div>
              )}

              {isConnected && (
                <>
                  <div className="flex items-center justify-center gap-2 py-2">
                    <div className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
                      conversation.isSpeaking
                        ? "bg-elec-yellow/10 text-elec-yellow"
                        : "bg-green-500/10 text-green-600"
                    )}>
                      {conversation.isSpeaking ? (
                        <>
                          <Volume2 className="h-3 w-3 animate-pulse" />
                          Speaking...
                        </>
                      ) : (
                        <>
                          <Mic className="h-3 w-3" />
                          Listening...
                        </>
                      )}
                    </div>
                  </div>

                  {!conversation.isSpeaking && !transcript && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground py-1">
                      <Lightbulb className="h-3 w-3 text-amber-500" />
                      <span>Try: "{ROTATING_TIPS[currentTipIndex]}"</span>
                    </div>
                  )}

                  {transcript && (
                    <div className="text-sm bg-muted/50 rounded-lg p-2">
                      <span className="text-xs text-muted-foreground block mb-1">You said:</span>
                      <p className="text-foreground">{transcript}</p>
                    </div>
                  )}
                  {lastAgentMessage && (
                    <div className="text-sm bg-elec-yellow/5 rounded-lg p-2">
                      <span className="text-xs text-elec-yellow block mb-1">Assistant:</span>
                      <p className="text-foreground">{lastAgentMessage}</p>
                    </div>
                  )}

                  {!conversation.isSpeaking && !lastAgentMessage && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs text-muted-foreground text-center">Quick prompts:</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {QUICK_PROMPTS.map((prompt) => (
                          <button
                            key={prompt.label}
                            onClick={() => handleQuickPrompt(prompt.message)}
                            className="text-xs px-2 py-1.5 rounded-md bg-muted/50 hover:bg-muted text-foreground transition-colors text-left truncate"
                          >
                            {prompt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {formContext?.activeForm && (
                    <div className="mt-2 p-2 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                      <p className="text-xs text-elec-yellow">
                        Form: {formContext.activeForm.formName}
                      </p>
                    </div>
                  )}
                </>
              )}

              {!isConnected && !isConnecting && connectionStep !== 'error' && (
                <div className="flex flex-col items-center justify-center py-6 gap-2">
                  <Mic className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Tap Start to begin
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-border bg-muted/30">
              {isConnected ? (
                <Button
                  onClick={stopConversation}
                  variant="destructive"
                  size="sm"
                  className="gap-2"
                >
                  <PhoneOff className="h-4 w-4" />
                  End
                </Button>
              ) : (
                <Button
                  onClick={startConversation}
                  disabled={isConnecting}
                  size="sm"
                  className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
                >
                  <Mic className="h-4 w-4" />
                  Start
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Draggable FAB */}
        <Button
          ref={fabRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            const moveDistance = Math.abs(e.clientX - startPos.x) + Math.abs(e.clientY - startPos.y);
            if (moveDistance < 10) {
              if (isMinimised) {
                setIsMinimised(false);
                if (!isConnected && !isConnecting) {
                  startConversation();
                }
              } else {
                setIsMinimised(true);
              }
            }
          }}
          size="lg"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all select-none",
            isConnected
              ? "bg-green-600 hover:bg-green-700"
              : "bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark",
            conversation.isSpeaking && "ring-4 ring-elec-yellow/30",
            isDragging && "cursor-grabbing scale-110 opacity-90",
            !isDragging && "cursor-grab"
          )}
        >
          {isDragging ? (
            <GripVertical className="h-6 w-6" />
          ) : isConnecting ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isConnected ? (
            conversation.isSpeaking ? (
              <Volume2 className="h-6 w-6 animate-pulse" />
            ) : (
              <Mic className="h-6 w-6" />
            )
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  );
};

export default ElectricianVoiceAssistant;

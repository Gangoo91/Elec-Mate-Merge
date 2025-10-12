import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles, XCircle, Calculator, CheckCircle2, AlertCircle, FileDown, Upload, Briefcase, Play, RotateCcw, Pause, ClipboardCheck, MoreVertical, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InstallPlanDataV2 } from "./types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { ReasoningPanel } from "./ReasoningPanel";
import { CitationBadge } from "./CitationBadge";
import { AgentSelector } from "./AgentSelector";
import { AgentSuggestions } from "./AgentSuggestions";
import { AgentResponseRenderer } from "./AgentResponseRenderer";
import { useNavigate, useLocation } from "react-router-dom";
import { transformAgentOutputToEIC } from "@/utils/eic-transformer";
import { exportEICScheduleToInspectionApp } from "@/utils/eic-export";
import { AgentCircuitOutput } from "@/types/eic-integration";
import { exportCompleteProject, AgentOutputs } from "@/utils/project-export";
import { InstallerAgentOutput } from "@/utils/rams-transformer";
import { HealthSafetyAgentOutput } from "@/utils/hs-to-rams-transformer";
import { CostEngineerOutput } from "@/utils/cost-to-quote-transformer";
import { useConversationPersistence } from "@/hooks/useConversationPersistence";
import { InChatAgentSelector, AgentType } from "./InChatAgentSelector";
import { PhotoUploadButton } from "./PhotoUploadButton";
import { MobileGestureHandler } from "@/components/ui/mobile-gesture-handler";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { DesignAlternatives } from "./DesignAlternatives";
import { AgentChatErrorBoundary } from "./AgentChatErrorBoundary";
import { AgentHealthBanner } from "./AgentHealthBanner";

import { v4 as uuidv4 } from 'uuid';

// Helper functions for agent display
const getAgentEmoji = (agent: string) => {
  const emojis: Record<string, string> = {
    'designer': '🎨',
    'cost-engineer': '💰',
    'installer': '🔧',
    'health-safety': '🦺',
    'commissioning': '✅',
    'project-manager': '📋',
    'cache': '⚡'
  };
  return emojis[agent] || '🤖';
};

const getAgentName = (agent: string) => {
  const names: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost-engineer': 'Cost Engineer',
    'installer': 'Installation Specialist',
    'health-safety': 'Health & Safety',
    'commissioning': 'Testing & Commissioning',
    'project-manager': 'Project Manager'
  };
  return names[agent] || agent;
};

const AGENT_WELCOME_MESSAGES: Record<string, string> = {
  'designer': `👋 **Circuit Designer here!**

I specialise in BS 7671-compliant circuit design and cable sizing.

**Example questions:**
- "I need a 32A radial for a kitchen"
- "Design a 6-way consumer unit for a flat"
- "What cable size for a 9.5kW shower at 18m?"

What can I design for you today?`,

  'cost-engineer': `👋 **Cost Engineer here!**

I provide accurate material and labour pricing for electrical installations.

**Example questions:**
- "What's the cost for a full rewire?"
- "Price up materials for a 10-way board upgrade"
- "Labour costs for installing 15 sockets?"

What pricing do you need?`,

  'installer': `👋 **Installation Specialist here!**

I provide practical, step-by-step installation guidance based on real-world experience.

**Example questions:**
- "How do I install a consumer unit upgrade?"
- "Best way to run cables in a solid wall?"
- "Installation sequence for a kitchen rewire?"

What installation advice do you need?`,

  'health-safety': `👋 **Health & Safety Advisor here!**

I ensure your installations meet all safety requirements and regulations.

**Example questions:**
- "Risk assessment for working in a occupied building"
- "PPE needed for a distribution board change?"
- "Emergency procedures for electrical fire?"

What safety information do you need?`,

  'commissioning': `👋 **Testing & Inspection Specialist here!**

I guide you through proper testing, inspection, and certification.

**Example questions:**
- "Testing sequence for a new circuit?"
- "What Zs value do I need for a 32A MCB?"
- "How to complete an EIC for a consumer unit change?"

What testing guidance do you need?`,

  'project-manager': `👋 **Project Manager here!**

I help you plan, coordinate, and deliver electrical projects on time and on budget.

**Example questions:**
- "Timeline for a 3-bed house rewire?"
- "How to structure a quote for a commercial job?"
- "Managing a project with multiple subcontractors?"

What project support do you need?`
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: any[];
  citations?: Array<{ number: string; title: string }>;
  costUpdates?: { materials: number; vat: number; total: number };
  activeAgents?: string[];
  agentName?: string;
  isTyping?: boolean;
  hasError?: boolean;
  retryUserMessage?: string;
  structuredData?: any;
  id?: string;
  timestamp?: string;
  isValidationError?: boolean;
  isThinking?: boolean;  // NEW: For proactive thinking display
  thinkingMessage?: string;  // NEW: What the agent is thinking about
}

interface IntelligentAIPlannerProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const IntelligentAIPlanner = ({ planData, updatePlanData, onReset }: IntelligentAIPlannerProps) => {
  const location = useLocation();
  const resumeState = location.state as any;
  
  const [messages, setMessages] = useState<Message[]>(
    resumeState?.resumeMessages || [
      {
        role: 'assistant',
        content: "Alright mate, what are we designing today? Shower? EV charger? Just tell me what you're installing and I'll help you spec it properly - all BS 7671 compliant obviously 👍"
      }
    ]
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>("");
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [reasoningSteps, setReasoningSteps] = useState<Array<{
    agent: string; 
    status: 'pending' | 'active' | 'complete'; 
    reasoning?: string;
    challenge?: {
      challenger: string;
      issue: string;
      resolution?: 'accepted' | 'defended' | 'compromised';
    };
  }>>([]);
  const [showReasoning, setShowReasoning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [consultationStarted, setConsultationStarted] = useState(!!resumeState?.resumeMessages);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [lastSentMessage, setLastSentMessage] = useState<string>("");
  const [lastSendFailed, setLastSendFailed] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Agent suggestions from responses
  const [suggestedAgents, setSuggestedAgents] = useState<Array<{agent: string; reason: string; priority?: string}>>([]);
  const [currentConversationId] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('conversationId');
    return resumeId || uuidv4();
  });
  const [completedAgentsCount, setCompletedAgentsCount] = useState(0);
  const [agentOutputHistory, setAgentOutputHistory] = useState<Array<{
    agent: string;
    output: any;
    timestamp: string;
  }>>([]);
  
  // Health check state
  const [unhealthyAgents, setUnhealthyAgents] = useState<string[]>([]);
  const [healthCheckDone, setHealthCheckDone] = useState(false);
  
  const navigate = useNavigate();
  
  const { sessionId, isSaving, lastSaved } = useConversationPersistence(messages, planData, activeAgents);
  
  // Health check on mount
  useEffect(() => {
    const checkAgentHealth = async () => {
      const AGENT_ENDPOINTS = ['designer-v3', 'cost-engineer-v3', 'installer-v3', 'health-safety-v3', 'commissioning-v3', 'project-mgmt-v3', 'agent-router'];
      const AGENT_IDS: Record<string, string> = {
        'designer-v3': 'designer',
        'cost-engineer-v3': 'cost-engineer',
        'installer-v3': 'installer',
        'health-safety-v3': 'health-safety',
        'commissioning-v3': 'commissioning',
        'project-mgmt-v3': 'project-manager'
      };
      
      const unhealthy: string[] = [];
      
      for (const endpoint of AGENT_ENDPOINTS) {
        try {
          const response = await fetch(`https://jtwygbeceundfgnkirof.supabase.co/functions/v1/${endpoint}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8'}`
            }
          });
          
          if (!response.ok) {
            const agentId = AGENT_IDS[endpoint];
            if (agentId) unhealthy.push(agentId);
          }
        } catch (error) {
          const agentId = AGENT_IDS[endpoint];
          if (agentId) unhealthy.push(agentId);
        }
      }
      
      setUnhealthyAgents(unhealthy);
      setHealthCheckDone(true);
      
      if (unhealthy.length > 0) {
        console.warn('⚠️ Unhealthy agents:', unhealthy);
      } else {
        console.log('✅ All agents healthy');
      }
    };
    
    checkAgentHealth();
  }, []);
  
  // Fetch completed agents count
  useEffect(() => {
    const fetchCompletedCount = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { count } = await supabase
        .from('consultation_results')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', currentConversationId);
      
      if (count) setCompletedAgentsCount(count);
    };
    
    fetchCompletedCount();
  }, [currentConversationId]);

  // Phase 5: Helper to extract circuit count from message
  const extractCircuitCount = (message: string): number => {
    const wayMatch = message.match(/(\d+)[\s-]?way/i);
    if (wayMatch) return parseInt(wayMatch[1]);
    
    const circuitMatch = message.match(/(\d+)\s+circuits?/i);
    if (circuitMatch) return parseInt(circuitMatch[1]);
    
    return 6; // Default assumption
  };

  // Phase 2: Message pagination - only render last 50 messages for performance
  const visibleMessages = useMemo(() => {
    if (messages.length <= 50) return messages;
    return messages.slice(-50);
  }, [messages]);

  // Check if consultation has meaningful content - show results button after first agent reply
  const hasMeaningfulContent = messages.length >= 2 && messages.some(m => m.role === 'assistant' && m.agentName);

  // Auto-populate pricing embeddings if empty
  useEffect(() => {
    const checkAndPopulatePricing = async () => {
      try {
        const { count } = await supabase
          .from('pricing_embeddings')
          .select('*', { count: 'exact', head: true });
        
        if (count === 0) {
          console.log('🔄 Pricing embeddings empty, populating from materials cache...');
          const { data, error } = await supabase.functions.invoke('populate-pricing-embeddings');
          
          if (error) {
            console.error('Failed to populate pricing embeddings:', error);
          } else {
            console.log('✅ Pricing embeddings populated:', data);
          }
        }
      } catch (error) {
        console.error('Error checking pricing embeddings:', error);
      }
    };
    
    checkAndPopulatePricing();
  }, []);

  // Handle resume from results page
  useEffect(() => {
    if (resumeState?.resumePlanData) {
      updatePlanData(resumeState.resumePlanData);
    }
    if (resumeState?.targetAgent) {
      toast.info(`Resuming consultation with ${resumeState.targetAgent}`, {
        description: "Ask your follow-up question"
      });
    }
  }, []);

  const { streamMessage, isStreaming } = useStreamingChat({
    onQuestionAnalysis: (data) => {
      console.log('📊 Question Analysis received:', data);
      sessionStorage.setItem('questionAnalysis', JSON.stringify(data));
    },
    onAgentThinking: (agent, message, step, totalSteps) => {
      console.log(`💭 ${agent} thinking: ${message} (${step}/${totalSteps})`);
      // Store for thinking panel display
      sessionStorage.setItem('agentThinking', JSON.stringify({
        agent,
        message,
        step,
        totalSteps,
        timestamp: Date.now()
      }));
    },
    onAgentChallenge: (data) => {
      console.log(`⚠️ ${data.challenger} challenges ${data.target}: ${data.issue}`);
      toast.warning(`${getAgentName(data.challenger)} raised a concern`, {
        description: data.issue
      });
      
      // Update reasoning steps to show challenge
      setReasoningSteps(prev => prev.map(step => 
        step.agent === data.target
          ? { 
              ...step, 
              challenge: {
                challenger: data.challenger,
                issue: data.issue
              }
            }
          : step
      ));
    },
    onAgentRevised: (data) => {
      console.log(`✅ ${data.agent} revised design based on ${data.challenger} feedback`);
      toast.success(`${getAgentName(data.agent)} updated design`, {
        description: data.agentResponse
      });
      
      // Update challenge resolution
      setReasoningSteps(prev => prev.map(step => 
        step.agent === data.agent && step.challenge
          ? { 
              ...step, 
              challenge: { ...step.challenge, resolution: 'accepted' }
            }
          : step
      ));
    },
    onAgentDefended: (data) => {
      console.log(`🛡️ ${data.agent} defended design against ${data.challenger}`);
      toast.info(`${getAgentName(data.agent)} maintained design`, {
        description: data.agentResponse
      });
      
      // Update challenge resolution
      setReasoningSteps(prev => prev.map(step => 
        step.agent === data.agent && step.challenge
          ? { 
              ...step, 
              challenge: { ...step.challenge, resolution: 'defended' }
            }
          : step
      ));
    },
    onAgentConsensus: (data) => {
      console.log(`🤝 ${data.agent} and ${data.challenger} reached consensus`);
      toast.success(`Design consensus reached`, {
        description: data.agentResponse
      });
      
      // Update challenge resolution
      setReasoningSteps(prev => prev.map(step => 
        step.agent === data.agent && step.challenge
          ? { 
              ...step, 
              challenge: { ...step.challenge, resolution: 'compromised' }
            }
          : step
      ));
    },
    onAgentResponse: async (agent, response, structuredData) => {
      console.log(`Agent ${agent} responded:`, response.slice(0, 100));
      
      // Pass response into structuredData for fallback rendering
      const enrichedStructuredData = structuredData ? {
        ...structuredData,
        response: response // Ensure narrative is always available
      } : null;
      
      if (enrichedStructuredData) {
        console.log('✅ Structured data received:', enrichedStructuredData);
        
        // Track agent output for context passing
        setAgentOutputHistory(prev => [
          ...prev,
          {
            agent,
            output: enrichedStructuredData,
            timestamp: new Date().toISOString()
          }
        ]);
        
        // Extract suggested agents if present
        if (enrichedStructuredData.suggestedNextAgents) {
          setSuggestedAgents(enrichedStructuredData.suggestedNextAgents);
        }
        
        // Phase 4: Save to Results if exportReady
        if (enrichedStructuredData.exportReady && currentAgent) {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
              await supabase.from('consultation_results').insert({
                conversation_id: currentConversationId,
                agent_type: currentAgent,
                output_data: enrichedStructuredData,
                user_id: session.user.id
              });
              
              setCompletedAgentsCount(prev => prev + 1);
              
              toast.success("Results Saved", {
                description: `${getAgentName(currentAgent)} results saved to Results page`
              });
            }
          } catch (error) {
            console.error('Failed to save results:', error);
          }
        }
      }
      
      // Remove "Analyzing..." and add actual response with enriched structured data
      setMessages(prev => {
        const filtered = prev.filter(m => !(m.agentName === agent && m.isTyping));
        
        return [...filtered, {
          role: 'assistant',
          content: response,
          activeAgents: [agent],
          agentName: agent,
          structuredData: enrichedStructuredData
        }];
      });
    },
    onAgentUpdate: (agents) => {
      setActiveAgents(agents);
    },
    onToolCall: (toolCall) => {
      toast.success(`✨ ${toolCall.toolName === 'add_circuit_to_design' ? 'Circuit added' : 'Action performed'}`);
    },
    onCitation: (citation) => {
      console.log('Citation received:', citation);
    },
    onError: (error) => {
      const msg = String(error || '').toLowerCase();
      if (msg.includes('still working')) {
        toast.info(String(error));
      } else if (msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('abort')) {
        // Silent: fallback will handle UX
        return;
      } else {
        toast.error(String(error));
      }
    }
  });

  // Smooth, throttled auto-scroll - only if user is near bottom
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const scrollContainer = scrollRef.current;
    const isNearBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 100;
    
    // Only auto-scroll if user is already near the bottom
    if (isNearBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const isInputMeaningful = (text: string): boolean => {
    const t = text.trim();
    if (t.length < 3) return false;
    if (/(.)\1{4,}/.test(t)) return false; // repeated chars
    const letters = t.replace(/[^a-z]/gi, '');
    const vowels = letters.match(/[aeiou]/gi)?.length || 0;
    const consonants = letters.length - vowels;
    if (consonants > 5 && vowels > 0 && consonants / Math.max(vowels, 1) > 5) return false;
    // allow if contains space, keywords, or numbers
    if (/\s/.test(t) || /(install|cable|kw|amp|circuit|socket|shower|ev|board|meter|length|run)/i.test(t) || /\d/.test(t)) return true;
    return true;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || isStreaming || !currentAgent) return;

    const userMessage = input.trim();
    const lastAssistant = [...messages].slice().reverse().find(m => m.role === 'assistant');
    const allowRetry = lastSendFailed || !!lastAssistant?.hasError;
    
    // Prevent duplicate sends, but allow if last attempt failed or last assistant message was an error
    if (userMessage === lastSentMessage && !allowRetry) {
      console.log('⏱️ Duplicate message detected, ignoring');
      return;
    }

    // Client-side gibberish pre-validation
    if (!isInputMeaningful(userMessage)) {
      const guidance: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I’m not quite sure what you mean. Could you rephrase? For example:\n• I need to install a 9.5 kW shower\n• Calculate cable size for a 7 kW cooker\n• Best cable for an outdoor socket, 25 m run",
        timestamp: new Date().toISOString(),
        isValidationError: true
      };
      setMessages(prev => [...prev, guidance]);
      return;
    }

    // Clear failure flag when attempting a new send
    setLastSendFailed(false);
    setLastSentMessage(userMessage);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = '44px';
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setReasoningSteps([]);

    // Add agent-specific typing indicator
    const agentDisplayName = getAgentName(currentAgent);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `Talking to ${agentDisplayName}… setting up your installation data…`,
      activeAgents: [currentAgent],
      agentName: currentAgent,
      isTyping: true
    }]);
    
    // PHASE 4: Add thinking message for proactive checklist (Designer only)
    if (currentAgent === 'designer') {
      // Detect what kind of thinking to show
      const lowerQuery = userMessage.toLowerCase();
      let thinkingMsg = '';
      
      if (parseInt(userMessage.match(/(\d+)\s*kw/i)?.[1] || '0') > 3) {
        thinkingMsg = '🤔 Checking isolation requirements for high-power appliances...';
      } else if (lowerQuery.includes('kitchen') || lowerQuery.includes('bathroom')) {
        thinkingMsg = '🤔 Verifying special location regulations...';
      } else if (lowerQuery.includes('outdoor') || lowerQuery.includes('garden') || lowerQuery.includes('outside')) {
        thinkingMsg = '🤔 Looking up outdoor cable protection requirements...';
      }
      
      if (thinkingMsg) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: thinkingMsg,
            agentName: currentAgent,
            isThinking: true
          }]);
        }, 500);
      }
    }

    try {
      await streamMessage(
        [...messages, { role: 'user', content: userMessage }],
        { 
          circuits: planData.circuits || [],
          conversationHistory: messages,
          agentOutputHistory
        },
        // On each token
        (token) => {
          // Tokens handled by onAgentResponse or simulated for single-agent
        },
        // On complete
        (fullMessage, data) => {
          // Final message updates handled by onAgentResponse
          // Mark reasoning steps as complete
          setReasoningSteps(prev => prev.map(step => ({ ...step, status: 'complete' as const })));

          // Handle tool calls
          if (data.toolCalls && data.toolCalls.length > 0) {
            for (const toolCall of data.toolCalls) {
              if (toolCall.toolName === 'add_circuit_to_design') {
                const newCircuit = {
                  id: toolCall.result?.circuitId || `circuit-${Date.now()}`,
                  ...toolCall.args,
                  enabled: true
                };
                updatePlanData({
                  ...planData,
                  circuits: [...(planData.circuits || []), newCircuit]
                });
              }
            }
          }

          // Extract and display agent suggestions from V3 structured data
          if (data.structuredData?.suggestedNextAgents) {
            setSuggestedAgents(data.structuredData.suggestedNextAgents);
          }

          setStreamingMessageIndex(null);
        },
        // Pass current agent as single-agent array
        currentAgent ? [currentAgent] : undefined,
        // Pass target agent if resuming
        resumeState?.targetAgent
      );

    } catch (error) {
      // Handle streaming errors with detailed inline error cards
      console.error('AI conversation error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      
      // Determine error type and provide helpful message
      let userFriendlyMessage = '';
      let errorType = 'general';
      
      if (errorMsg.includes('429') || errorMsg.includes('rate limit')) {
        userFriendlyMessage = '⏱️ **Rate Limit Reached**\n\nToo many requests in a short time. Please wait 30 seconds and try again.';
        errorType = 'rate-limit';
      } else if (errorMsg.includes('402') || errorMsg.includes('payment')) {
        userFriendlyMessage = '💳 **Credits Required**\n\nYour workspace needs more AI credits. Top up in Settings → Workspace → Usage.';
        errorType = 'payment';
      } else if (errorMsg.includes('max_tokens') || errorMsg.includes('max_completion_tokens')) {
        userFriendlyMessage = '⚙️ **AI Configuration Issue**\n\nModel parameter issue detected. This has been logged. Please try again.';
        errorType = 'config';
      } else if (errorMsg.includes('timeout') || errorMsg.includes('timed out')) {
        userFriendlyMessage = '⏱️ **Request Timed Out**\n\nThe AI is taking longer than expected. Try again or simplify your query.';
        errorType = 'timeout';
      } else {
        userFriendlyMessage = `⚠️ **Something Went Wrong**\n\n${errorMsg}\n\nClick "Retry" below to try again.`;
        errorType = 'general';
      }
      
      // Remove typing and thinking messages
      setMessages(prev => {
        const filtered = prev.filter(msg => {
          // Remove typing, thinking, and previous error messages
          if (msg.role === 'assistant' && (msg.isTyping || msg.isThinking || msg.hasError)) return false;
          return true;
        });
        return [...filtered, { 
          role: 'assistant', 
          content: userFriendlyMessage,
          hasError: true,
          agentName: currentAgent,
          timestamp: new Date().toISOString(),
          structuredData: { errorType, rawError: errorMsg }
        } as any];
      });
      setLastSendFailed(true);
      setLastSentMessage("");
      setStreamingMessageIndex(null);
      setReasoningSteps([]);
    } finally {
      setIsLoading(false);
      setCurrentAction("");
      setActiveAgents([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInput(textarea.value);
    
    // Reset height to recalculate
    textarea.style.height = 'auto';
    
    // Set new height based on scrollHeight, max 88px (2 lines)
    const newHeight = Math.min(textarea.scrollHeight, 88);
    textarea.style.height = `${newHeight}px`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && !isStreaming && input.trim()) {
      e.preventDefault();
      
      // Debounce rapid Enter presses
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        handleSend();
      }, 300);
      setDebounceTimer(timer);
    }
  };

  // Reset textarea height when input is cleared
  useEffect(() => {
    if (!input && textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }
  }, [input]);

  const handleExportPackage = async () => {
    const hasCompleteDesign = messages.length >= 5 && planData.circuits && planData.circuits.length > 0;
    
    if (!hasCompleteDesign) {
      toast.error("Need a complete design first", {
        description: "Have a conversation with the AI to design at least one circuit before exporting."
      });
      return;
    }

    setIsExporting(true);
    
    toast.info("Generating Package...", {
      description: "Creating 6 professional documents"
    });

    try {
      const { data, error } = await supabase.functions.invoke('generate-professional-package', {
        body: { 
          messages,
          designData: planData,
          companyName: "Your Company Name", // Could be from user profile
          clientName: "Client Name"
        }
      });

      if (error) {
        console.error('Export error:', error);
        toast.error("Export Failed", {
          description: "Couldn't generate the professional package. Please try again."
        });
        return;
      }

      // Download ZIP
      const blob = new Blob([data], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Electrical_Design_Package_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Package Ready! 🎉", {
        description: "6 professional documents downloaded as ZIP"
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export Failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportToEIC = async () => {
    const hasCompleteDesign = planData.circuits && planData.circuits.length > 0;
    
    if (!hasCompleteDesign) {
      toast.error("No circuits to export", {
        description: "Design at least one circuit before exporting to testing app."
      });
      return;
    }

    try {
      // Calculate cable sizes based on load (simplified - real values from AI agents)
      const getCableSize = (load: number, phases: string) => {
        if (phases === "three") return load > 10000 ? "10.0" : "6.0";
        if (load > 7000) return "6.0";
        if (load > 5000) return "4.0";
        if (load > 3000) return "2.5";
        return "1.5";
      };

      const getCPCSize = (liveSize: string) => {
        const sizes: Record<string, string> = {
          "1.5": "1.0", "2.5": "1.5", "4.0": "2.5", "6.0": "2.5",
          "10.0": "4.0", "16.0": "6.0"
        };
        return sizes[liveSize] || "1.5";
      };

      const getProtectiveDevice = (load: number, voltage: number) => {
        const current = load / voltage;
        if (current <= 6) return { device: "MCB B6", rating: 6, curve: "B" };
        if (current <= 10) return { device: "MCB B10", rating: 10, curve: "B" };
        if (current <= 16) return { device: "MCB B16", rating: 16, curve: "B" };
        if (current <= 20) return { device: "MCB B20", rating: 20, curve: "B" };
        if (current <= 32) return { device: "MCB B32", rating: 32, curve: "B" };
        return { device: "MCB B40", rating: 40, curve: "B" };
      };

      // Transform circuits to EIC format with calculated values
      const agentCircuits: AgentCircuitOutput[] = planData.circuits.map((circuit, index) => {
        const liveSize = getCableSize(circuit.totalLoad, circuit.phases);
        const cpcSize = getCPCSize(liveSize);
        const protDevice = getProtectiveDevice(circuit.totalLoad, circuit.voltage);

        return {
          circuitNumber: index + 1,
          description: circuit.name || `${circuit.loadType} Circuit ${index + 1}`,
          loadType: circuit.loadType,
          phases: circuit.phases,
          cableSize: `${liveSize}mm²`,
          cpcSize: `${cpcSize}mm²`,
          cableLength: circuit.cableLength,
          installationMethod: planData.installationMethod || "100",
          protectiveDevice: protDevice.device,
          protectiveDeviceRating: protDevice.rating,
          protectiveDeviceCurve: protDevice.curve,
          maxZs: protDevice.curve === "B" ? (protDevice.rating <= 32 ? 1.44 : 0.92) : 0.72,
          voltageDropCompliance: true,
          rcdProtection: circuit.loadType === "shower" || circuit.loadType === "ev-charger",
          isRingCircuit: circuit.loadType === "power" && circuit.totalLoad > 3000,
        };
      });

      const eicSchedule = transformAgentOutputToEIC(agentCircuits, {
        address: planData.siteInfo?.propertyAddress || "Installation Site",
        designerName: planData.projectInfo?.leadElectrician || "AI Design Assistant",
        conversationId: `conv-${Date.now()}`
      });

      // Export to Supabase
      const result = await exportEICScheduleToInspectionApp(eicSchedule);
      
      if (result.success) {
        toast.success("EIC Schedule Ready! ✅", {
          description: `${eicSchedule.circuits.length} circuits exported with expected test values`
        });
      }
    } catch (error) {
      console.error('EIC export error:', error);
      toast.error("Export Failed", {
        description: error instanceof Error ? error.message : "Failed to export EIC schedule"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCompleteProjectExport = async () => {
    if (!planData.circuits || planData.circuits.length === 0) {
      toast.error("No project data to export", {
        description: "Please complete the design consultation first"
      });
      return;
    }

    setIsExporting(true);
    toast.info("Generating project documents...", {
      description: "Creating EIC, RAMS, Method Statement, and Quote"
    });

    try {
      // Extract agent data from messages
      const installerMessages = messages.filter(m => m.agentName === 'installer');
      const healthSafetyMessages = messages.filter(m => m.agentName === 'health-safety');
      const costMessages = messages.filter(m => m.agentName === 'cost-engineer');

      // Build agent outputs
      const agentOutputs: AgentOutputs = {};

      // Generate EIC data from circuits
      if (planData.circuits.length > 0) {
        const getCableSize = (load: number, phases: 'single' | 'three') => {
          const current = phases === 'single' ? load / 230 : load / (Math.sqrt(3) * 400);
          if (current <= 13.5) return 1.5;
          if (current <= 20) return 2.5;
          if (current <= 27) return 4;
          if (current <= 37) return 6;
          if (current <= 50) return 10;
          return 16;
        };

        const agentCircuits: AgentCircuitOutput[] = planData.circuits.map((circuit, index) => ({
          circuitNumber: index + 1,
          description: circuit.name || `${circuit.loadType} Circuit`,
          loadType: circuit.loadType,
          phases: circuit.phases,
          cableSize: `${getCableSize(circuit.totalLoad, circuit.phases)}mm²`,
          cpcSize: `${getCableSize(circuit.totalLoad, circuit.phases) / 2}mm²`,
          cableLength: circuit.cableLength,
          installationMethod: planData.installationMethod || "100",
          protectiveDevice: "MCB B32",
          protectiveDeviceRating: 32,
          protectiveDeviceCurve: "B",
          maxZs: 1.44,
          voltageDropCompliance: true,
          rcdProtection: true,
          isRingCircuit: false,
        }));

        agentOutputs.eicData = transformAgentOutputToEIC(agentCircuits, {
          address: planData.siteInfo?.propertyAddress || "Installation Site",
          designerName: planData.projectInfo?.leadElectrician || "AI Design Assistant",
          conversationId: `conv-${Date.now()}`
        });
      }

      // Simplified installer output
      if (installerMessages.length > 0) {
        agentOutputs.installer = {
          steps: [
            {
              stepNumber: 1,
              description: "Isolate supply and prove dead",
              safetyRequirements: ["Lock off supply", "Test dead with voltage indicator"],
              toolsRequired: ["Voltage tester", "Lock off kit"],
              materialsNeeded: [],
              estimatedTime: "15 minutes",
              criticalPoints: ["Verify dead on all phases"],
            }
          ],
          totalDuration: "2-3 hours",
          requiredQualifications: ["18th Edition", "Level 3 Electrical Installation"],
          specialRequirements: [],
          overallRiskLevel: 'medium',
        };
      }

      // Simplified H&S output
      if (healthSafetyMessages.length > 0) {
        agentOutputs.healthSafety = {
          riskAssessment: {
            hazards: [
              {
                hazard: "Electrical shock from live conductors",
                likelihood: 3,
                severity: 5,
                riskRating: 15,
                controls: ["Isolate supply", "Lock off", "Test dead", "Use insulated tools"],
                residualRisk: 6,
              }
            ]
          },
          requiredPPE: ["Safety footwear", "Insulated gloves"],
          methodStatement: ["Isolate supply", "Install circuits", "Test and commission"],
          emergencyProcedures: ["Switch off at main isolator", "Call emergency services"],
          acopCitations: ["BS 7671:2018+A3:2024"],
          workActivities: ["Electrical installation work"],
        };
      }

      // Simplified cost output
      if (costMessages.length > 0) {
        agentOutputs.costEngineer = {
          materials: [
            {
              item: "Twin and Earth Cable",
              quantity: 50,
              unitPrice: 1.20,
              supplier: "CEF",
              total: 60,
            }
          ],
          labour: {
            hours: 4,
            rate: 45,
            total: 180,
          },
          totalCost: 240,
        };
      }

      // Export complete project
      const projectExport = await exportCompleteProject(
        agentOutputs,
        {
          projectName: "Electrical Installation Project",
          location: planData.siteInfo?.propertyAddress || "Installation Site",
          assessor: planData.projectInfo?.leadElectrician || "AI Design Assistant",
          jobTitle: "Electrical Installation",
          contractor: "Electrical Contractor",
          supervisor: planData.projectInfo?.leadElectrician || "Supervisor",
          teamSize: "2",
        },
        `conv-${Date.now()}`
      );

      // Count what was generated
      const generatedDocs = [];
      if (projectExport.eicSchedule) generatedDocs.push("EIC Schedule");
      if (projectExport.rams) generatedDocs.push("RAMS");
      if (projectExport.methodStatement) generatedDocs.push("Method Statement");
      if (projectExport.quote) generatedDocs.push("Quote");

      toast.success("Project Documentation Generated! 🎉", {
        description: `Created: ${generatedDocs.join(", ")}`,
        duration: 5000,
      });

    } catch (error) {
      console.error('Complete export error:', error);
      toast.error("Export Failed", {
        description: error instanceof Error ? error.message : "Failed to export complete project"
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Handle initial agent selection - show welcome message
  const handleAgentSelection = (agentId: string) => {
    console.log(`👤 User selected agent: ${agentId}`);
    setCurrentAgent(agentId);
    setConsultationStarted(true);
    
    // Show welcome message from selected agent
    const welcomeMessage = AGENT_WELCOME_MESSAGES[agentId] || 
      `👋 I'm your ${getAgentName(agentId)}. How can I help?`;
    
    setMessages([{
      role: 'assistant',
      content: welcomeMessage,
      agentName: agentId,
      activeAgents: [agentId]
    }]);
    
    // Clear any suggestions from initial screen
    setSuggestedAgents([]);
  };

  // Handle switching to suggested agent - includes handoff message
  const handleSwitchAgent = (newAgentId: string) => {
    console.log(`🔄 Switching from ${currentAgent} to ${newAgentId}`);
    
    const previousAgent = currentAgent;
    setCurrentAgent(newAgentId);
    
    // Contextual handoff message with context awareness
    const handoffMessage = `👋 ${getAgentName(newAgentId)} here! I can see ${getAgentName(previousAgent || 'the previous agent')} has shared their work with me. How can I help build on that?`;
    
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: handoffMessage,
      agentName: newAgentId,
      activeAgents: [newAgentId]
    }]);
    
    // Clear suggestions after switch
    setSuggestedAgents([]);
  };

  const handleViewResults = () => {
    // Compute selectedAgents from messages with agentName
    const consultedAgents = [...new Set(
      messages
        .filter(m => m.role === 'assistant' && m.agentName)
        .map(m => m.agentName!)
    )];
    
    navigate('/electrician/install-planner/results', {
      state: {
        messages,
        planData,
        activeAgents: consultedAgents.length > 0 ? consultedAgents : (planData.selectedAgents || [])
      }
    });
  };

  // If consultation hasn't started, show agent selector
  if (!consultationStarted) {
    return (
      <div className="flex flex-col h-screen bg-elec-dark">
        <div className="flex-1 flex items-center justify-center p-4">
          <AgentSelector onSelectAgent={handleAgentSelection} />
        </div>
      </div>
    );
  }

  // Clean agent text - convert markdown to HTML for rendering
  const cleanAgentText = (text: string): string => {
    return text
      // Remove agent name prefixes like "[Circuit Designer]:"
      .replace(/^\[.*?\]:\s*/gm, '')
      // Convert **bold** to <strong>
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Clean up section separators
      .replace(/^---+$/gm, '')
      // Remove empty brackets
      .replace(/\(\s*\)/g, '')
      // Fix checkmarks and ticks
      .replace(/✓/g, '✓ ')
      .replace(/⚠/g, '⚠ ')
      .trim();
  };

  // Parse agent responses into structured sections
  const parseAgentResponse = (content: string) => {
    const cleanContent = cleanAgentText(content);
    const sections: Array<{ title: string; content: string }> = [];
    const lines = cleanContent.split('\n');
    let currentSection = { title: '', content: '' };
    
    for (const line of lines) {
      const trimmed = line.trim();
      // Detect section headers
      if (
        (trimmed.match(/^[A-Z\s]{3,}$/) && trimmed.length < 50) ||
        trimmed.match(/^(CIRCUIT SPECIFICATION|CALCULATIONS|COMPLIANCE|MATERIALS BREAKDOWN|LABOUR ESTIMATE|PROJECT TOTAL|PRICING NOTES|INSTALLATION METHOD|STEP-BY-STEP PROCEDURE|SAFETY REQUIREMENTS|MATERIAL LIST|TIME ESTIMATE|TEST SEQUENCE|DEAD TESTS|LIVE TESTS|BREAKDOWN)/i)
      ) {
        if (currentSection.content.trim()) {
          sections.push({ ...currentSection });
        }
        currentSection = { title: trimmed.replace(/_/g, ' ').trim(), content: '' };
      } else if (trimmed) {
        currentSection.content += line + '\n';
      }
    }
    
    if (currentSection.content.trim()) {
      sections.push(currentSection);
    }
    
    // If no sections found, return content as single section
    if (sections.length === 0) {
      return [{ title: '', content: cleanContent }];
    }
    
    return sections;
  };

  const handleNewChat = () => {
    // Clear all state but stay in AI mode
    setMessages([]);
    setInput("");
    setCurrentAgent(null);
    setConsultationStarted(false); // This shows agent selector
    setSuggestedAgents([]);
    setActiveAgents([]);
    setReasoningSteps([]);
    setAgentOutputHistory([]);
    setCompletedAgentsCount(0);
    setStreamingMessageIndex(null);
    setLastSentMessage("");
    setLastSendFailed(false);
    
    // Clear conversation ID from URL if present
    window.history.replaceState({}, '', '/electrician/install-planner?mode=ai');
  };

  return (
    <div className="flex flex-col min-h-screen bg-elec-dark">
      {/* Minimal Header - Non-sticky */}
      <div className="flex-none px-3 md:px-4 py-1.5 md:py-2 border-b border-border/30 bg-elec-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <h2 className="font-semibold text-sm md:text-base text-white">AI Design</h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              if (hasMeaningfulContent) {
                setShowExitConfirm(true);
              } else {
                handleNewChat();
              }
            }}
            className="text-xs h-6 px-2 text-elec-yellow hover:bg-elec-yellow/10"
          >
            New Chat
          </Button>
        </div>
      </div>


      {/* Messages Area - WhatsApp style */}
      <div 
        ref={scrollRef}
        className="flex-1 bg-elec-dark"
      >
        <div className="px-3 md:px-4 py-3 md:py-4 space-y-3 md:space-y-4">
          {/* Simple loading indicator */}
          {isLoading && (
            <div className="flex gap-2 justify-start animate-fade-in mb-4">
              <div className="max-w-[95%] w-full">
                <Card className="p-4 bg-elec-card border-elec-yellow/20">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                    <span className="text-sm font-medium text-white">Processing your design...</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Reasoning Panel */}
          {showReasoning && reasoningSteps.length > 0 && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[95%]">
                <ReasoningPanel steps={reasoningSteps} isVisible={true} />
              </div>
            </div>
          )}

          {/* Health Check Banner */}
          {healthCheckDone && (
            <div className="mb-4">
              <AgentHealthBanner unhealthyAgents={unhealthyAgents} />
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${message.role === 'user' ? 'max-w-[95%] md:max-w-[90%]' : 'max-w-full w-full'} rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-elec-yellow text-elec-dark px-5 py-3'
                    : 'bg-elec-card text-white px-5 py-4'
                }`}
              >
                {/* Agent Name Badge for assistant messages */}
                {message.role === 'assistant' && message.agentName && (
                  <div className="mb-3 pb-2 border-b border-white/20">
                    <Badge variant="outline" className="text-xs font-semibold bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                      {getAgentName(message.activeAgents?.[0] || message.agentName)}
                    </Badge>
                  </div>
                )}
                
                {message.role === 'assistant' && message.content && !message.isTyping && (
                  <AgentChatErrorBoundary>
                    <AgentResponseRenderer 
                      content={message.content} 
                      agentId={message.agentName}
                      structuredData={message.structuredData}
                      conversationId={sessionId}
                      question={messages.find(m => m.role === 'user')?.content}
                      isThinking={message.isThinking}
                      onSelectAgent={(selectedAgentId: string) => {
                        // Directly switch to the selected agent
                        setCurrentAgent(selectedAgentId);
                        setInput(`I'd like help from the ${getAgentName(selectedAgentId)}`);
                        
                        // Focus the input
                        setTimeout(() => {
                          textareaRef.current?.focus();
                        }, 100);
                      }}
                    />
                  </AgentChatErrorBoundary>
                )}

                {message.role === 'assistant' && message.isTyping && (
                  <p className="text-[15px] text-white/70 text-left italic leading-[1.7]">
                    {message.content}
                  </p>
                )}

                {message.role === 'user' && (
                  <p className="text-[15px] whitespace-pre-wrap leading-[1.7] text-left">
                    {message.content}
                  </p>
                )}

                {/* Error with retry button */}
                {message.role === 'assistant' && message.hasError && (
                  <>
                    <p className="text-[15px] text-white/95 leading-[1.7] text-left mb-3">
                      {message.content}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Find the last user message and retry it
                        const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                        if (lastUserMsg) {
                          // Explicitly allow retry of the same message
                          setLastSendFailed(true);
                          setLastSentMessage("");
                          setInput(lastUserMsg.content);
                          setTimeout(() => handleSend(), 100);
                        }
                      }}
                      disabled={isLoading || isStreaming}
                      className="h-8 text-xs bg-elec-yellow/10 hover:bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  </>
                )}

                {/* Citations */}
                {message.role === 'assistant' && message.citations && message.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">References</p>
                    <div className="flex flex-wrap gap-2">
                      {message.citations.map((cite: any, idx: number) => (
                        <CitationBadge 
                          key={idx} 
                          citation={{
                            source: 'BS 7671',
                            section: cite.number || cite.section || 'Unknown',
                            title: cite.title || 'Regulation',
                            type: 'regulation'
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Agent Suggestions - show most recent valid suggestions */}
                {message.role === 'assistant' && index === messages.length - 1 && (() => {
                  // Find most recent message with suggestions (walk backwards from current)
                  const messageWithSuggestions = [...messages].reverse().find(m => 
                    m.role === 'assistant' && 
                    m.structuredData?.suggestedNextAgents?.length > 0
                  );
                  
                  if (messageWithSuggestions?.structuredData?.suggestedNextAgents) {
                    return (
                      <AgentSuggestions
                        suggestions={messageWithSuggestions.structuredData.suggestedNextAgents}
                        onSelectAgent={handleSwitchAgent}
                      />
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          ))}
          
          {/* Design Alternatives Component */}
          {messages.some(m => m.agentName === 'designer' && m.structuredData && (m.structuredData.cableSize || m.structuredData.protectionDevice)) && !isLoading && !isStreaming && (
            <div className="flex justify-start">
              <div className="max-w-[85%] md:max-w-[75%]">
                <DesignAlternatives 
                  messages={messages}
                  onSelectAlternative={(alt, newMessages) => {
                    setMessages(prev => [...prev, ...newMessages]);
                  }}
                />
              </div>
            </div>
          )}

          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Phase 1: Compact Input Area - Sticky at bottom on both mobile and desktop */}
      <div className="sticky bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-elec-dark via-elec-dark to-transparent pt-4 pb-safe border-t border-border/30">
        <div className="max-w-5xl mx-auto px-3 md:px-5 space-y-2">

          {/* Phase 1: Collapsed Export Menu */}
          {hasMeaningfulContent && (
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={handleViewResults}
                size="sm"
                className="text-xs h-8 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                Results
              </Button>
              <div className="relative">
                <Button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 border-elec-yellow/30"
                >
                  <MoreVertical className="h-3.5 w-3.5 mr-1.5" />
                  Export
                </Button>
                {showExportMenu && (
                  <div className="absolute bottom-full mb-1 right-0 bg-background border border-border rounded-lg shadow-lg p-1 min-w-[160px] z-50">
                    {planData.circuits && planData.circuits.length > 0 && (
                      <Button onClick={() => { handleExportToEIC(); setShowExportMenu(false); }} size="sm" variant="ghost" className="w-full justify-start h-8 text-xs">
                        <ClipboardCheck className="h-3.5 w-3.5 mr-2" />To Testing
                      </Button>
                    )}
                    <Button onClick={() => { handleExportPackage(); setShowExportMenu(false); }} size="sm" variant="ghost" disabled={isExporting} className="w-full justify-start h-8 text-xs">
                      {isExporting ? <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" /> : <FileDown className="h-3.5 w-3.5 mr-2" />}
                      Full Package
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Phase 1: Only 2 quick suggestions, auto-hide after first user message */}
          {messages.length === 1 && (
            <div className="flex gap-1.5">
              <button onClick={() => setInput("9.5kW shower, 15m from board")}
                className="h-7 px-3 text-xs rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1.5 flex-1">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                <span className="truncate text-white">Shower</span>
              </button>
              <button onClick={() => setInput("Full rewire 3-bed house")}
                className="h-7 px-3 text-xs rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1.5 flex-1">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                <span className="truncate text-white">Rewire</span>
              </button>
            </div>
          )}
          
          {/* Photo Upload + Current Agent + View Results - All in one row */}
          <div className="flex items-center gap-2">
            <PhotoUploadButton 
              onPhotoUploaded={(url) => {
                setInput(prev => prev + ` [Photo attached: ${url}]`);
                toast.success('Photo added to message');
              }}
              disabled={isLoading}
              layout="horizontal"
              className="bg-transparent hover:bg-white/10 active:scale-95 transition-all rounded-lg"
            />
            
            {currentAgent && (
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-elec-card/30 rounded-lg border border-elec-yellow/20">
                <span className="text-xl">{getAgentEmoji(currentAgent)}</span>
                <span className="text-xs font-medium text-foreground">
                  Talking to: {getAgentName(currentAgent)}
                </span>
              </div>
            )}
            
            {/* Phase 7: View Results Button */}
            {completedAgentsCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/electrician/install-planner/results/${currentConversationId}`)}
                className="gap-2 border-elec-yellow/30 hover:bg-elec-yellow/10 relative shrink-0"
              >
                <ClipboardCheck className="h-4 w-4" />
                View Results
                {completedAgentsCount > 1 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-[1.25rem] px-1">
                    {completedAgentsCount}
                  </Badge>
                )}
              </Button>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-end gap-2 pb-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              rows={1}
              className="!min-h-[44px] sm:!min-h-[44px] md:!min-h-[44px] lg:!min-h-[44px] max-h-[88px] resize-none overflow-y-auto w-full text-base font-medium rounded-xl px-3 py-2 bg-white/5 border border-white/10 text-white placeholder:text-white/80 leading-tight transition-all duration-150 focus-visible:border-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/20 focus-visible:outline-none"
              style={{ fontSize: '16px', height: '44px' }}
            />

            <Button 
              onClick={handleSend}
              disabled={isLoading || isStreaming || !input.trim() || !currentAgent}
              size="icon"
              className="self-end h-9 w-9 shrink-0 rounded-lg bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 active:scale-95 transition-all"
              aria-label="Send message"
            >
              {(isLoading || isStreaming) ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      <ConfirmationDialog
        open={showExitConfirm}
        onOpenChange={setShowExitConfirm}
        title="Start New Chat?"
        description="You have an active consultation with design work in progress. This will clear the current conversation and return you to agent selection. Are you sure?"
        confirmText="Start New Chat"
        cancelText="Stay Here"
        onConfirm={() => {
          setShowExitConfirm(false);
          handleNewChat();
        }}
        variant="destructive"
      />
    </div>
  );
};
import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles, XCircle, Calculator, CheckCircle2, AlertCircle, FileDown, Upload, Briefcase, Play, RotateCcw, Pause, ClipboardCheck, MoreVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InstallPlanDataV2 } from "./types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { ReasoningPanel } from "./ReasoningPanel";
import { CitationBadge } from "./CitationBadge";
import { AgentSelector } from "./AgentSelector";
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
import { v4 as uuidv4 } from 'uuid';

// Feature flag to toggle between orchestrator and legacy designer
const USE_ORCHESTRATOR = true;

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
  const [reasoningSteps, setReasoningSteps] = useState<Array<{agent: string; status: 'pending' | 'active' | 'complete'; reasoning?: string}>>([]);
  const [showReasoning, setShowReasoning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [consultationStarted, setConsultationStarted] = useState(!!resumeState?.resumeMessages);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [nextAgent, setNextAgent] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [lastSentMessage, setLastSentMessage] = useState<string>("");
  const [lastSendFailed, setLastSendFailed] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Phase 5: Progressive Disclosure UI
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [agentProgress, setAgentProgress] = useState<Record<string, 'pending' | 'active' | 'complete'>>({});
  
  const navigate = useNavigate();
  
  const { sessionId, isSaving, lastSaved } = useConversationPersistence(messages, planData, activeAgents);

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
      setCurrentAgent(resumeState.targetAgent);
      toast.info(`Resuming consultation with ${resumeState.targetAgent}`, {
        description: "Ask your follow-up question"
      });
    }
  }, []);

  const { streamMessage, isStreaming } = useStreamingChat({
    onPlan: (agents, complexity) => {
      console.log('Agent plan:', agents, complexity);
      setActiveAgents(agents);
      
      // Initialize progress tracking
      const progressMap: Record<string, 'pending' | 'active' | 'complete'> = {};
      agents.forEach(agent => progressMap[agent] = 'pending');
      setAgentProgress(progressMap);
      
      setReasoningSteps(agents.map(agent => ({
        agent,
        status: 'pending' as const,
        reasoning: `Waiting to consult...`
      })));
    },
    onEstimatedTime: (seconds) => {
      setEstimatedTime(seconds);
      setElapsedTime(0);
    },
    onElapsedTimeUpdate: (seconds) => {
      setElapsedTime(seconds);
    },
    onAgentProgress: (agent, status) => {
      setAgentProgress(prev => ({ ...prev, [agent]: status }));
    },
    onAgentStart: (agent, index, total) => {
      console.log(`Agent ${agent} starting (${index + 1}/${total})`);
      setCurrentAction(`Consulting ${agent}...`);
      setCurrentAgent(agent);
      
      // Phase 5: Update progress
      setAgentProgress(prev => ({ ...prev, [agent]: 'active' }));
      
      // Add "Analyzing..." message
      setMessages(prev => {
        const withoutAck = prev.filter((m, i) => {
          return !(m.role === 'assistant' && m.content.includes("Let me get you the right specialist"));
        });
        
        return [...withoutAck, {
          role: 'assistant',
          content: `${getAgentName(agent)}: Analyzing your requirements...`,
          activeAgents: [agent],
          agentName: agent,
          isTyping: true
        }];
      });
      
      setReasoningSteps(prev => prev.map(step => 
        step.agent === agent 
          ? { ...step, status: 'active' as const, reasoning: `Now speaking...` }
          : step
      ));
    },
    onAgentResponse: (agent, response, structuredData) => {
      console.log(`Agent ${agent} responded:`, response.slice(0, 100));
      if (structuredData) {
        console.log('✅ Structured data received:', structuredData);
      }
      
      // Remove "Analyzing..." and add actual response (without agent name prefix)
      setMessages(prev => {
        const filtered = prev.filter(m => !(m.agentName === agent && m.isTyping));
        
        return [...filtered, {
          role: 'assistant',
          content: response,
          activeAgents: [agent],
          agentName: agent,
          structuredData
        }];
      });
    },
    onAgentComplete: (agent, nextAgent) => {
      console.log(`Agent ${agent} complete, next: ${nextAgent}`);
      
      // Phase 5: Update progress
      setAgentProgress(prev => ({ ...prev, [agent]: 'complete' }));
      
      setReasoningSteps(prev => prev.map(step => 
        step.agent === agent 
          ? { ...step, status: 'complete' as const, reasoning: `Ready for questions` }
          : step
      ));
      setCurrentAgent(agent);
      setNextAgent(nextAgent);
      setCurrentAction('');
    },
    onAllAgentsComplete: (agentOutputs) => {
      console.log('All agents complete:', agentOutputs);
      setCurrentAction('');
      setReasoningSteps(prev => prev.map(step => ({ ...step, status: 'complete' as const })));
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
    if (!input.trim() || isLoading || isStreaming) return;

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

    // Add immediate acknowledgment message
    const acknowledgmentIndex = messages.length + 1; // +1 for user message
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: "Thanks! Let me get you the right specialist...",
      activeAgents: []
    }]);

    try {
      await streamMessage(
        [...messages, { role: 'user', content: userMessage }],
        { circuits: planData.circuits || [] },
        // On each token (legacy, not used in multi-agent mode)
        (token) => {
          // Tokens are now handled by onAgentResponse
        },
        // On complete
        (fullMessage, data) => {
          // Final message updates handled by onAgentResponse
          // Mark reasoning steps as complete
          setReasoningSteps(prev => prev.map(step => ({ ...step, status: 'complete' as const })));
          
          // Log client-side performance metrics
          console.log(`📊 CLIENT METRICS:
  - Perceived wait time: ${elapsedTime}s
  - Estimated time: ${estimatedTime}s
  - Accuracy: ${Math.abs(elapsedTime - estimatedTime) < 30 ? '✅ Good (<30s variance)' : '⚠️ Needs calibration'}
  - Active agents: ${activeAgents.join(', ')}
`);

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

          setStreamingMessageIndex(null);
        },
        // Pass selected agents
        planData.selectedAgents,
        // Pass target agent if resuming
        resumeState?.targetAgent
      );

    } catch (error) {
      // Fallback: Try non-streaming conversational-install-planner if streaming fails quickly
      console.error('Streaming error, attempting fallback:', error);
      
      try {
        const { data: fallbackData, error: fallbackError } = await supabase.functions.invoke('conversational-install-planner', {
          body: { 
            messages: [...messages, { role: 'user', content: userMessage }],
            currentData: planData
          }
        });

        if (fallbackError) throw fallbackError;

        // Handle validation errors from fallback
        if (fallbackData?.validationError) {
          const validationMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: fallbackData.response,
            timestamp: new Date().toISOString(),
            isValidationError: true
          };
          
          setMessages(prev => [...prev, validationMessage]);
          setIsLoading(false);
          return;
        }

        // Remove acknowledgment and add fallback response
        setMessages(prev => {
          const filtered = prev.filter((_, i) => i !== acknowledgmentIndex);
          return [...filtered, {
            role: 'assistant',
            content: fallbackData.response || 'Got your requirements. What else do you need?',
            activeAgents: ['fallback']
          }];
        });

        toast.info("Fallback mode used", {
          description: "Streaming temporarily unavailable"
        });

        setLastSendFailed(false);
        setReasoningSteps([]);
        return;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        // Continue to main error handler below
        error = fallbackError;
      }
      console.error('AI conversation error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      
      // Remove acknowledgment message and "Analyzing..." messages
      setMessages(prev => {
        const filtered = prev.filter((_, i) => {
          // Keep user message but remove acknowledgment, analyzing, and previous error messages
          if (i === acknowledgmentIndex) return false;
          const msg = prev[i];
          if (msg.role === 'assistant' && (msg.isTyping || msg.hasError)) return false;
          return true;
        });
        return [...filtered, { 
          role: 'assistant', 
          content: `Sorry mate, hit a snag: ${errorMsg}. Click below to try again.`,
          hasError: true
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

  const handleAgentSelection = (selectedAgents: string[]) => {
    console.log('Selected agents:', selectedAgents);
    updatePlanData({
      ...planData,
      selectedAgents
    });
    setConsultationStarted(true);
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
          <AgentSelector onStartConsultation={handleAgentSelection} />
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

  return (
    <div className="flex flex-col h-screen bg-elec-dark">
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
                onReset();
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
        className="flex-1 overflow-y-auto bg-elec-dark"
      >
        <div className="px-3 md:px-4 py-3 md:py-4 space-y-3 md:space-y-4">
          {/* Progress indicator with time estimate */}
          {isLoading && estimatedTime > 0 && (
            <div className="flex gap-2 justify-start animate-fade-in mb-4">
              <div className="max-w-[95%] w-full">
                <Card className="p-4 bg-elec-card border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Processing your design...</span>
                    <span className="text-sm text-white/60">
                      {elapsedTime}s / ~{estimatedTime}s
                    </span>
                  </div>
                  <div className="w-full bg-elec-dark/50 rounded-full h-2 mb-3">
                    <div 
                      className="bg-elec-yellow h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((elapsedTime / estimatedTime) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(agentProgress).map(([agent, status]) => (
                      <Badge 
                        key={agent} 
                        variant={status === 'complete' ? 'default' : 'outline'}
                        className={
                          status === 'complete' 
                            ? 'bg-elec-yellow text-elec-dark border-elec-yellow' 
                            : status === 'active'
                            ? 'border-elec-yellow/50 text-elec-yellow bg-elec-yellow/10'
                            : 'border-white/20 text-white/50'
                        }
                      >
                        {getAgentEmoji(agent)} {getAgentName(agent)}
                        {status === 'active' && <Loader2 className="ml-1 h-3 w-3 animate-spin" />}
                        {status === 'complete' && <CheckCircle2 className="ml-1 h-3 w-3" />}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Reasoning Panel (fallback for when no estimate) */}
          {showReasoning && reasoningSteps.length > 0 && estimatedTime === 0 && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[95%]">
                <ReasoningPanel steps={reasoningSteps} isVisible={true} />
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar - only for assistant messages */}
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-lg">
                  {message.activeAgents && message.activeAgents.length > 0 
                    ? getAgentEmoji(message.activeAgents[0])
                    : '✅'}
                </div>
              )}

              <div
                className={`max-w-[90%] rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-elec-yellow text-elec-dark px-5 py-3'
                    : 'bg-elec-card text-white px-5 py-4'
                }`}
              >
                {message.role === 'assistant' && message.content && !message.isTyping && (
                  <AgentResponseRenderer 
                    content={message.content} 
                    agentId={message.agentName}
                    structuredData={message.structuredData}
                  />
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
                {message.role === 'assistant' && message.citations && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <CitationBadge citations={message.citations} />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Design Alternatives Component */}
          {messages.some(m => m.agentName === 'designer') && !isLoading && !isStreaming && (
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

          {/* Loading indicator */}
          {(isLoading || isStreaming) && activeAgents.length > 0 && (
            <div className="flex justify-start gap-2">
              <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-lg">
                🤔
              </div>
              <div className="bg-elec-card rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span className="text-sm text-white">
                  {activeAgents.map(a => a === 'designer' ? '🎨' : a === 'cost-engineer' ? '💰' : a === 'installer' ? '🔧' : '✅').join(' ')} Working...
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Phase 1: Compact Input Area */}
      <div className="flex-none bg-elec-dark border-t border-border/30 px-3 md:px-5 py-1.5 md:py-2">
        <div className="space-y-2">
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
            <div className="flex gap-1.5 pb-1">
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
          
          {/* Agent Selector */}
          <InChatAgentSelector 
            selectedAgent={selectedAgent}
            onAgentSelect={setSelectedAgent}
            activeAgents={activeAgents}
            className="mb-2"
          />

          {/* Chat Input - Auto-expanding with External Controls */}
          <div className="flex items-end gap-2">
            {/* Photo Upload Button - Outside Left */}
            <div className="shrink-0">
              <PhotoUploadButton 
                onPhotoUploaded={(url) => {
                  setInput(prev => prev + ` [Photo attached: ${url}]`);
                  toast.success('Photo added to message');
                }}
                disabled={isLoading}
                className="h-9 w-9 shrink-0 bg-transparent hover:bg-white/10 active:scale-95 transition-all rounded-lg"
              />
            </div>

            {/* Textarea Container - Grows */}
            <div className="relative flex-1">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                rows={1}
                className="min-h-[44px] max-h-[88px] resize-none overflow-y-auto w-full text-base font-medium rounded-xl px-4 py-2.5 bg-white/5 border border-white/10 text-white placeholder:text-white/80 leading-tight transition-all duration-150 focus-visible:border-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/20 focus-visible:outline-none"
                style={{ fontSize: '16px', height: '44px' }}
              />
            </div>

            {/* Send Button - Outside Right */}
            <Button 
              onClick={handleSend}
              disabled={isLoading || isStreaming || !input.trim()}
              size="icon"
              className="mb-1 h-9 w-9 shrink-0 rounded-lg bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 active:scale-95 transition-all"
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
        title="Leave Consultation?"
        description="You have an active consultation with design work in progress. Starting a new chat will clear the current session. Are you sure?"
        confirmText="Start New Chat"
        cancelText="Stay Here"
        onConfirm={() => {
          setShowExitConfirm(false);
          onReset();
        }}
        variant="destructive"
      />
    </div>
  );
};
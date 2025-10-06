import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Sparkles, XCircle, Calculator, CheckCircle2, AlertCircle, FileDown, Upload, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InstallPlanDataV2 } from "./types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { ReasoningPanel } from "./ReasoningPanel";
import { CitationBadge } from "./CitationBadge";

// Feature flag to toggle between orchestrator and legacy designer
const USE_ORCHESTRATOR = true;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: any[];
  citations?: Array<{ number: string; title: string }>;
  costUpdates?: { materials: number; vat: number; total: number };
  activeAgents?: string[];
}

interface IntelligentAIPlannerProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const IntelligentAIPlanner = ({ planData, updatePlanData, onReset }: IntelligentAIPlannerProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Alright mate, what are we designing today? Shower? EV charger? Just tell me what you're installing and I'll help you spec it properly - all BS 7671 compliant obviously 👍"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>("");
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [reasoningSteps, setReasoningSteps] = useState<Array<{agent: string; status: 'pending' | 'active' | 'complete'; reasoning?: string}>>([]);
  const [showReasoning, setShowReasoning] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showComplexMode, setShowComplexMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { streamMessage, isStreaming } = useStreamingChat({
    onAgentUpdate: (agents) => {
      setActiveAgents(agents);
      // Update reasoning panel
      setReasoningSteps(agents.map(agent => ({
        agent,
        status: 'active' as const,
        reasoning: `Processing your request...`
      })));
    },
    onToolCall: (toolCall) => {
      toast.success(`✨ ${toolCall.toolName === 'add_circuit_to_design' ? 'Circuit added' : 'Action performed'}`);
    },
    onCitation: (citation) => {
      console.log('Citation received:', citation);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentAction, reasoningSteps]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setReasoningSteps([]);

    // Add empty assistant message for streaming
    const assistantMessageIndex = messages.length + 1;
    setStreamingMessageIndex(assistantMessageIndex);
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      await streamMessage(
        [...messages, { role: 'user', content: userMessage }],
        { circuits: planData.circuits || [] },
        // On each token
        (token) => {
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[assistantMessageIndex]) {
              newMessages[assistantMessageIndex] = {
                ...newMessages[assistantMessageIndex],
                content: newMessages[assistantMessageIndex].content + token
              };
            }
            return newMessages;
          });
        },
        // On complete
        (fullMessage, data) => {
          setMessages(prev => {
            const newMessages = [...prev];
            if (newMessages[assistantMessageIndex]) {
              newMessages[assistantMessageIndex] = {
                role: 'assistant',
                content: fullMessage,
                citations: data.citations,
                toolCalls: data.toolCalls,
                activeAgents: data.activeAgents
              };
            }
            return newMessages;
          });

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

          setStreamingMessageIndex(null);
        }
      );

    } catch (error) {
      console.error('AI conversation error:', error);
      // Remove the empty streaming message
      setMessages(prev => prev.slice(0, -1));
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry mate, hit a snag there. Can you try that again?" 
      }]);
      setStreamingMessageIndex(null);
    } finally {
      setIsLoading(false);
      setCurrentAction("");
      setActiveAgents([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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

  return (
    <div className="flex flex-col h-screen bg-elec-dark">
      {/* Header - Centered & Clean */}
      <div className="flex-none px-4 py-4 border-b border-border/30 bg-elec-dark">
        <div className="flex flex-col items-center gap-3">
          {/* Title Section */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
            <div className="text-center">
              <h2 className="font-semibold text-lg text-white">AI Design Assistant</h2>
              <p className="text-xs text-elec-yellow/80">BS 7671 Compliant • Multi-Agent System</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowComplexMode(!showComplexMode)}
              className="text-xs bg-white/5 hover:bg-white/10 border-white/10 text-white"
            >
              <Briefcase className="h-3 w-3 mr-1" />
              Complex Project
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportPackage}
              disabled={isExporting || messages.length < 5}
              className="text-xs bg-white/5 hover:bg-white/10 border-white/10 text-white"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <FileDown className="h-3 w-3 mr-1" />
                  Export Package
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-white hover:bg-white/10">
              New Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Complex Project Mode Panel */}
      {showComplexMode && (
        <div className="flex-none px-4 py-3 bg-elec-card border-b border-border/30">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-elec-yellow" />
              Bulk Input Mode - For Factories, Large Installations
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Upload a CSV/Excel file with your loads or paste a list below. The Project Manager Agent will break it into phases.
            </p>
            
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Handle file upload
                    toast.info("Processing file...", { description: `Reading ${file.name}` });
                    // TODO: Parse CSV/Excel and send to Project Manager Agent
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                <Upload className="h-3 w-3 mr-1" />
                Upload File
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInput("I need to design a factory with:\n- 50x LED high bay lights (150W each)\n- 10x 3-phase motors (5.5kW each)\n- Office area with 30x sockets\n- Emergency lighting system\n- Fire alarm integration");
                  setShowComplexMode(false);
                }}
                className="text-xs text-white hover:bg-white/10"
              >
                Use Example
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area - WhatsApp style */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-elec-dark"
      >
        <div className="px-4 py-4 space-y-2">
          {/* Reasoning Panel */}
          {showReasoning && reasoningSteps.length > 0 && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[95%]">
                <ReasoningPanel steps={reasoningSteps} isVisible={true} />
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-elec-yellow text-elec-dark'
                    : 'bg-elec-card text-white'
                }`}
              >
                {/* Active agents badge */}
                {message.role === 'assistant' && message.activeAgents && message.activeAgents.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {message.activeAgents.map((agent, i) => (
                      <Badge 
                        key={i}
                        variant="outline" 
                        className="text-xs bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow"
                      >
                        {agent === 'designer' && '🎨'}
                        {agent === 'health-safety' && '🦺'}
                        {agent === 'cost-engineer' && '💰'}
                        {agent === 'installer' && '🔧'}
                        {agent === 'commissioning' && '✅'}
                        {agent === 'cache' && '⚡'}
                        {' '}
                        {agent}
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-sm whitespace-pre-wrap leading-relaxed text-left">
                  {message.content}
                  {index === streamingMessageIndex && (
                    <span className="inline-block w-2 h-4 ml-1 bg-elec-yellow animate-pulse" />
                  )}
                </p>

                {/* Citations */}
                {message.role === 'assistant' && message.citations && (
                  <CitationBadge citations={message.citations} />
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {(isLoading || isStreaming) && activeAgents.length > 0 && (
            <div className="flex justify-start">
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

      {/* Input Area - WhatsApp style */}
      <div className="flex-none bg-elec-dark border-t border-border/30 px-4 py-3">
        <div className="space-y-2">
          {/* Quick suggestions - only show on first message */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("9.5kW shower, 18 metres from the board")}
                className="text-xs h-7 px-3 bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                Shower install
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("7kW EV charger in garage")}
                className="text-xs h-7 px-3 bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                EV charger
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Design complete board for 3-bed house")}
                className="text-xs h-7 px-3 bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                Whole house
              </Button>
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 h-11 text-sm rounded-full px-4 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || isStreaming || !input.trim()}
              size="icon"
              className="h-11 w-11 rounded-full shadow-sm shrink-0 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
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
    </div>
  );
};
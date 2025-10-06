import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Sparkles, XCircle, Calculator, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InstallPlanDataV2 } from "./types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentAction]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Choose function based on feature flag
      const functionName = USE_ORCHESTRATOR ? 'orchestrator-agent' : 'intelligent-install-designer';
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { 
          messages: [...messages, { role: 'user', content: userMessage }],
          currentDesign: {
            circuits: planData.circuits || []
          }
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Update active agents if using orchestrator
      if (data.activeAgents) {
        setActiveAgents(data.activeAgents);
      }

      // Show AI's response
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        toolCalls: data.toolCalls,
        citations: data.citations,
        costUpdates: data.costUpdates,
        activeAgents: data.activeAgents
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update design if circuit was added
      if (data.toolCalls && data.toolCalls.length > 0) {
        for (const toolCall of data.toolCalls) {
          if (toolCall.toolName === 'add_circuit_to_design') {
            // Add circuit to planData
            const newCircuit = {
              id: toolCall.result.circuitId,
              ...toolCall.args,
              enabled: true
            };
            updatePlanData({
              ...planData,
              circuits: [...(planData.circuits || []), newCircuit]
            });
            toast.success(`Circuit added: ${toolCall.args.circuitName}`);
          }
        }
      }

    } catch (error) {
      console.error('AI conversation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get AI response');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry mate, hit a snag there. Can you try that again?" 
      }]);
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

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-160px)] bg-elec-grey">
      {/* Header - WhatsApp style */}
      <div className="flex-none px-4 py-3 border-b border-border/30 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-elec-yellow" />
            <div>
              <h2 className="font-semibold text-base">AI Design Assistant</h2>
              <p className="text-xs text-muted-foreground">BS 7671 Compliant</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onReset} className="text-xs">
            New Chat
          </Button>
        </div>
      </div>

      {/* Messages Area - WhatsApp style */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-elec-grey"
      >
        <div className="px-4 py-4 space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-elec-yellow text-elec-dark'
                    : 'bg-white text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - WhatsApp style */}
      <div className="flex-none bg-white border-t border-border/30 px-4 py-3">
        <div className="space-y-2">
          {/* Quick suggestions - only show on first message */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("9.5kW shower, 18 metres from the board")}
                className="text-xs h-7 px-3 bg-elec-grey/50 hover:bg-elec-grey border-border/50"
              >
                Shower install
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("7kW EV charger in garage")}
                className="text-xs h-7 px-3 bg-elec-grey/50 hover:bg-elec-grey border-border/50"
              >
                EV charger
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Design complete board for 3-bed house")}
                className="text-xs h-7 px-3 bg-elec-grey/50 hover:bg-elec-grey border-border/50"
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
              className="flex-1 h-11 text-sm rounded-full px-4 bg-elec-grey/30 border-border/50"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-11 w-11 rounded-full shadow-sm shrink-0 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
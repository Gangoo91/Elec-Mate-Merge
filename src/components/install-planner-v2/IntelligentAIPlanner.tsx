import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Sparkles, XCircle, Calculator, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InstallPlanDataV2 } from "./types";
import { Card } from "@/components/ui/card";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolCalls?: any[];
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
      content: "👋 Alright, what are we designing today? Tell me about the installation and I'll guide you through it - proper job, BS 7671 compliant.\n\nJust chat naturally, like you would with a mate at the wholesaler. I'll ask questions as we go and show you all the calculations."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<string>("");
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
      const { data, error } = await supabase.functions.invoke('intelligent-install-designer', {
        body: { 
          messages: [...messages, { role: 'user', content: userMessage }],
          currentDesign: {
            circuits: planData.circuits || []
          }
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      // Show AI's response
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        toolCalls: data.toolCalls
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
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-160px)]">
      {/* Header */}
      <div className="flex-none px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-elec-yellow" />
            <h2 className="font-semibold text-foreground">Intelligent Designer</h2>
            <span className="text-xs text-muted-foreground hidden sm:inline">BS 7671:2018</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-foreground">
            <XCircle className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Messages Area - Full width on mobile, centered on desktop */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-background"
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-elec-yellow text-elec-dark font-medium'
                    : 'bg-card border border-border text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                
                {/* Tool Call Results */}
                {message.toolCalls && message.toolCalls.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.toolCalls.map((tool, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                        <div className="flex items-center gap-2 text-elec-yellow font-semibold">
                          <Calculator className="h-3 w-3" />
                          {tool.toolName.replace(/_/g, ' ').toUpperCase()}
                        </div>
                        
                        {tool.result.compliant !== undefined && (
                          <div className="flex items-center gap-2">
                            {tool.result.compliant ? (
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                            ) : (
                              <AlertCircle className="h-3 w-3 text-red-500" />
                            )}
                            <span className={tool.result.compliant ? 'text-green-600' : 'text-red-600'}>
                              {tool.result.compliant ? 'Compliant' : 'Non-compliant'}
                            </span>
                          </div>
                        )}
                        
                        {tool.result.reasoning && (
                          <p className="text-muted-foreground italic">{tool.result.reasoning}</p>
                        )}
                        
                        {tool.result.breakdown && (
                          <div className="mt-2 space-y-1">
                            {tool.result.breakdown.map((item: any, i: number) => (
                              <div key={i} className="flex justify-between">
                                <span>{item.item}</span>
                                <span className="font-mono">£{item.cost.toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between font-semibold pt-1 border-t border-border">
                              <span>Total</span>
                              <span className="font-mono">£{tool.result.totalCost?.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                <span className="text-sm text-muted-foreground">
                  {currentAction || "Thinking..."}
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Sticky bottom */}
      <div className="flex-none border-t border-border bg-card">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("9.5kW shower, 18 metres from the board")}
                className="text-xs"
              >
                Shower install
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("7kW EV charger in garage")}
                className="text-xs"
              >
                EV charger
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Design complete board for 3-bed house")}
                className="text-xs"
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
              placeholder="Just chat naturally - tell me what you're installing..."
              disabled={isLoading}
              className="flex-1 bg-background border-border"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
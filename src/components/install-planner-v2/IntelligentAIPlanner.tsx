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
      content: "👋 Alright, what are we designing today? Tell me about the installation and I'll guide you through it - proper job, BS 7671 compliant.\n\nJust chat naturally, like you would with a mate at the wholesaler. I'll ask questions as we go and show you all the calculations."
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
    <div className="flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-160px)]">
      {/* Header - Full width on mobile */}
      <div className="flex-none px-3 md:px-4 py-2.5 md:py-3 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between md:max-w-5xl md:mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
            <h2 className="font-semibold text-sm md:text-base text-foreground">Intelligent Designer</h2>
            <span className="text-xs text-muted-foreground hidden sm:inline">BS 7671:2018</span>
            
            {/* Agent Status Indicators */}
            {USE_ORCHESTRATOR && activeAgents.length > 0 && (
              <div className="flex gap-1 ml-2">
                {activeAgents.includes('designer') && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    🎨 Designer
                  </Badge>
                )}
                {activeAgents.includes('cost-engineer') && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    💰 Cost
                  </Badge>
                )}
                {activeAgents.includes('installer') && (
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                    🔧 Installer
                  </Badge>
                )}
                {activeAgents.includes('commissioning') && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                    ✅ Testing
                  </Badge>
                )}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-foreground h-8 text-xs md:text-sm">
            <XCircle className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-2" />
            <span className="hidden md:inline">Reset</span>
          </Button>
        </div>
      </div>

      {/* Messages Area - Full width on mobile, centered on desktop */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-background"
      >
        <div className="md:max-w-5xl md:mx-auto px-3 md:px-4 py-3 md:py-4 space-y-3 md:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] md:max-w-[80%] rounded-2xl md:rounded-3xl px-3.5 py-2.5 md:px-4 md:py-3 ${
                  message.role === 'user'
                    ? 'bg-elec-yellow text-elec-dark font-medium shadow-sm'
                    : 'bg-muted/50 md:bg-card md:border md:border-border text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                
                {/* Regulation Citations */}
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.citations.map((citation, idx) => (
                      <div key={idx} className="bg-blue-50 dark:bg-blue-950 p-2 rounded border-l-4 border-blue-500 text-xs">
                        <span className="font-semibold text-blue-700 dark:text-blue-300">📖 {citation.number}</span>
                        <span className="text-blue-600 dark:text-blue-400 ml-2">{citation.title}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Cost Updates */}
                {message.costUpdates && (
                  <Card className="mt-3 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <div className="p-3 space-y-1 text-xs">
                      <div className="flex justify-between text-green-700 dark:text-green-300">
                        <span>Materials:</span>
                        <span className="font-mono font-semibold">£{message.costUpdates.materials.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>VAT (20%):</span>
                        <span className="font-mono">£{message.costUpdates.vat.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-800 dark:text-green-200 pt-1 border-t border-green-300 dark:border-green-700">
                        <span>Total:</span>
                        <span className="font-mono">£{message.costUpdates.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>
                )}
                
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
              <div className="bg-muted/50 md:bg-card md:border md:border-border rounded-2xl md:rounded-3xl px-3.5 py-2.5 md:px-4 md:py-3 flex items-center gap-2 md:gap-3">
                <Loader2 className="h-3.5 w-3.5 md:h-4 md:w-4 animate-spin text-elec-yellow" />
                <span className="text-sm text-muted-foreground">
                  {currentAction || "Thinking..."}
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Sticky bottom, full width on mobile */}
      <div className="flex-none border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="md:max-w-5xl md:mx-auto px-3 md:px-4 py-2.5 md:py-3">
          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2.5 md:mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("9.5kW shower, 18 metres from the board")}
                className="text-xs h-7 md:h-8 px-2.5 md:px-3 bg-background"
              >
                Shower install
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("7kW EV charger in garage")}
                className="text-xs h-7 md:h-8 px-2.5 md:px-3 bg-background"
              >
                EV charger
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Design complete board for 3-bed house")}
                className="text-xs h-7 md:h-8 px-2.5 md:px-3 bg-background"
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
              placeholder="Tell me what you're installing..."
              disabled={isLoading}
              className="flex-1 bg-background border-border h-10 md:h-11 text-sm rounded-full md:rounded-lg px-4"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-10 w-10 md:h-11 md:w-11 rounded-full shadow-md"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
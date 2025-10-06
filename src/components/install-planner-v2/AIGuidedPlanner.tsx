import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Sparkles, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InstallPlanDataV2 } from "./types";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIGuidedPlannerProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const AIGuidedPlanner = ({ planData, updatePlanData, onReset }: AIGuidedPlannerProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Welcome to the AI Guided Installation Designer! I'm here to help you design your electrical installation to BS 7671:2018 standards.\n\nTell me what you're planning to install, and I'll guide you through the process, asking questions to ensure we get all the details right.\n\nFor example, you could say:\n- \"I need to install a shower in a bathroom\"\n- \"Planning an EV charger for the driveway\"\n- \"Design a complete consumer unit for a 3-bed house\""
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('conversational-install-planner', {
        body: { 
          messages: [...messages, { role: 'user', content: userMessage }],
          currentData: planData 
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      // Add assistant response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }]);

      // Update plan data if AI extracted structured data
      if (data.extractedData) {
        updatePlanData({ ...planData, ...data.extractedData });
        toast.success("Installation details updated");
      }

    } catch (error) {
      console.error('AI conversation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get AI response');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error. Please try again or start over." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Guided Installation Designer
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <ScrollArea 
            ref={scrollRef}
            className="h-[500px] rounded-lg border bg-muted/20 p-4"
          >
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-elec-grey border border-border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-elec-grey border border-border rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your installation or answer the AI's questions..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("I need to install a 9.5kW shower, 18 metres from the consumer unit");
                }}
              >
                Shower Installation
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("Design a complete board for a 3-bed house");
                }}
              >
                Whole House Design
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput("7kW EV charger in garage, 25m cable run");
                }}
              >
                EV Charger
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Collected Data Preview */}
      {(planData.loadType || planData.totalLoad > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Collected Installation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {planData.loadType && (
                <div>
                  <span className="text-muted-foreground">Load Type:</span>
                  <p className="font-medium">{planData.loadType}</p>
                </div>
              )}
              {planData.totalLoad > 0 && (
                <div>
                  <span className="text-muted-foreground">Load:</span>
                  <p className="font-medium">{planData.totalLoad}W</p>
                </div>
              )}
              {planData.cableLength > 0 && (
                <div>
                  <span className="text-muted-foreground">Cable Length:</span>
                  <p className="font-medium">{planData.cableLength}m</p>
                </div>
              )}
              {planData.installationMethod && (
                <div>
                  <span className="text-muted-foreground">Installation Method:</span>
                  <p className="font-medium">{planData.installationMethod}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

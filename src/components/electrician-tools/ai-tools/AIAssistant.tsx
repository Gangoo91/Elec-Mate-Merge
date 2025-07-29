
import { useState } from "react";
import { Brain, Loader, Send, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAIQuery = async () => {
    if (prompt.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a question or description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setAiResponse("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "general" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAiResponse(data.response);
      
      toast({
        title: "Response Generated",
        description: "AI has provided an answer to your query.",
      });
    } catch (error) {
      console.error('AI Query Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    "What's the cable size for a 32A circuit over 25m?",
    "RCD requirements for domestic installations",
    "How to test an EICR circuit safely?"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-gray/30 bg-elec-gray/50 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3 text-elec-light">
            <div className="w-10 h-10 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-elec-yellow" />
            </div>
            AI Assistant
          </CardTitle>
          <CardDescription className="text-elec-light/70 text-base">
            Get expert electrical guidance and BS 7671 advice from your AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Example Questions */}
          <div className="space-y-4">
            <h4 className="font-medium text-elec-light">Example questions to get started:</h4>
            <div className="grid grid-cols-1 gap-2">
              {exampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-elec-yellow/30 text-elec-light/80 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 h-auto py-3 px-4 text-left justify-start"
                  onClick={() => setPrompt(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <Textarea
              placeholder="Ask me anything about electrical work, BS 7671 regulations, safety requirements, calculations, or best practices..."
              className="min-h-[120px] bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/40 text-elec-light placeholder:text-elec-light/50 resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <Button 
              className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium py-3" 
              onClick={handleAIQuery} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                  Getting Answer...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Ask Assistant
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-6 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-elec-light font-medium">AI Assistant is thinking...</span>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-elec-gray/50" />
                <Skeleton className="h-4 w-3/4 bg-elec-gray/50" />
                <Skeleton className="h-4 w-5/6 bg-elec-gray/50" />
              </div>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && !isLoading && (
            <div className="p-6 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                </div>
                <h3 className="text-lg font-medium text-elec-light">Response</h3>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="text-sm text-elec-light/90 whitespace-pre-wrap leading-relaxed">
                  {aiResponse.split('\n').map((line, index) => (
                    <p 
                      key={index}
                      className={
                        line.match(/^(ANSWER|EXPLANATION|REQUIREMENTS|CALCULATION|REFERENCE):/) ?
                        'text-elec-yellow font-semibold text-base mt-6 mb-3 first:mt-0' :
                        line.endsWith(':') && line.length < 50 ?
                        'font-medium text-green-400 mt-4 mb-2' :
                        line.startsWith('•') || line.startsWith('-') ?
                        'text-elec-light/80 ml-4 my-1' :
                        'my-2'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;

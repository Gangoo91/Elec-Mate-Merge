
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
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/80 to-elec-card/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-elec-yellow/10 to-transparent">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Brain className="h-6 w-6 text-elec-yellow" />
            </div>
            ElectricalMate AI Assistant
          </CardTitle>
          <CardDescription className="text-elec-light/70 text-base">
            Your personal AI assistant for electrical queries and advice based on UK standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Quick Tips */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-elec-yellow mb-2">Ask about:</h4>
                <div className="text-sm text-elec-light/80 space-y-1">
                  <p>• UK regulations and BS 7671 compliance</p>
                  <p>• Cable sizing and load calculations</p>
                  <p>• Installation best practices and troubleshooting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example Queries */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-light">Try these examples:</h4>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-elec-yellow/30 text-elec-light/80 hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
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
              placeholder="e.g., What's the recommended cable size for a 32A circuit with 25m run length according to BS 7671?"
              className="min-h-[120px] bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/40 text-elec-light placeholder:text-elec-light/50 resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-elec-yellow to-yellow-400 hover:from-elec-yellow/90 hover:to-yellow-400/90 text-elec-dark font-semibold py-3 shadow-lg shadow-elec-yellow/20" 
              onClick={handleAIQuery} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                  Generating Response...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Ask ElectricalMate
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 p-6 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                </div>
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && !isLoading && (
            <div className="mt-6 p-6 bg-gradient-to-br from-elec-dark/60 to-elec-dark/80 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                </div>
                <h3 className="text-lg font-semibold text-elec-yellow">ElectricalMate Response</h3>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="text-sm text-elec-light/90 whitespace-pre-wrap leading-relaxed">
                  {aiResponse.split('\n').map((line, index) => (
                    <p key={index} className={
                      line.startsWith('#') ? 'text-elec-yellow font-semibold mt-4 mb-2' : 
                      line.startsWith('•') || line.startsWith('-') ? 'text-elec-light/80 ml-4 my-1' :
                      'my-2'
                    }>
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

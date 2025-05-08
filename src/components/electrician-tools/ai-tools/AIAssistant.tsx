
import { useState } from "react";
import { Brain, Loader } from "lucide-react";
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          ElectricalMate AI Assistant
        </CardTitle>
        <CardDescription>
          Your personal AI assistant for electrical queries and advice based on UK standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Ask about UK regulations, installation best practices, troubleshooting, or get help with calculations.
        </p>
        
        <Textarea
          placeholder="e.g., What's the recommended cable size for a 32A circuit with 25m run length according to BS 7671?"
          className="min-h-[100px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          onClick={handleAIQuery} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Generating Response...
            </>
          ) : (
            'Generate Response'
          )}
        </Button>

        {isLoading && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md animate-pulse">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}

        {aiResponse && !isLoading && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-elec-yellow">AI Response:</h3>
            <div className="text-sm whitespace-pre-wrap">
              {aiResponse.split('\n').map((line, index) => (
                <p key={index} className={line.startsWith('#') ? 'text-elec-yellow font-semibold mt-3' : 'my-2'}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistant;

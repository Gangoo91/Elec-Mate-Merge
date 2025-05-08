
import { useState } from "react";
import { Book, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const RegulationsAssistant = () => {
  const [regulationQuery, setRegulationQuery] = useState("");
  const [isRegulationLoading, setIsRegulationLoading] = useState(false);
  const [regulationResponse, setRegulationResponse] = useState("");

  const handleRegulationQuery = async () => {
    if (regulationQuery.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a regulation question first.",
        variant: "destructive",
      });
      return;
    }

    setIsRegulationLoading(true);
    setRegulationResponse("");

    try {
      // In a real implementation, this would call the electrician-ai-assistant with a focused prompt
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: `I need specific information about UK electrical regulations (BS 7671) regarding: ${regulationQuery}. Please provide the exact regulation references and explain the requirements in detail.` 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setRegulationResponse(data.response);
      
      toast({
        title: "Regulations Information Retrieved",
        description: "AI has provided regulation details for your query.",
      });
    } catch (error) {
      console.error('Regulation Query Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get regulation information",
        variant: "destructive",
      });
    } finally {
      setIsRegulationLoading(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Book className="h-5 w-5 text-elec-yellow" />
          Regulations Assistant
        </CardTitle>
        <CardDescription>
          Get instant answers to BS 7671 regulation questions with context-aware AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter your question about UK electrical regulations and standards to get precise answers with regulation references.
        </p>
        
        <Textarea
          placeholder="e.g., What are the requirements for bathroom zones and IP ratings for electrical equipment in each zone?"
          className="min-h-[100px]"
          value={regulationQuery}
          onChange={(e) => setRegulationQuery(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          onClick={handleRegulationQuery} 
          disabled={isRegulationLoading}
        >
          {isRegulationLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Searching Regulations...
            </>
          ) : (
            'Get Regulation Information'
          )}
        </Button>

        {regulationResponse && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Regulations Information:</h3>
            <div className="text-sm whitespace-pre-wrap">
              {regulationResponse.split('\n').map((line, index) => (
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

export default RegulationsAssistant;

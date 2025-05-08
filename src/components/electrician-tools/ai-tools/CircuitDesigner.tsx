
import { useState } from "react";
import { Zap, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CircuitDesigner = () => {
  const [circuitPrompt, setCircuitPrompt] = useState("");
  const [isCircuitLoading, setIsCircuitLoading] = useState(false);
  const [circuitResponse, setCircuitResponse] = useState("");

  const handleCircuitDesign = async () => {
    if (circuitPrompt.trim() === "") {
      toast({
        title: "Empty Description",
        description: "Please enter circuit requirements first.",
        variant: "destructive",
      });
      return;
    }

    setIsCircuitLoading(true);
    setCircuitResponse("");

    try {
      // In a real implementation, this would call the electrician-ai-assistant with a specialized prompt
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: `I need to design an electrical circuit based on these requirements: ${circuitPrompt}. Please provide a detailed circuit design including cable specifications, protective devices, load calculations, and any relevant diagrams or schematics. The design should comply with UK regulations BS 7671.` 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setCircuitResponse(data.response);
      
      toast({
        title: "Circuit Design Generated",
        description: "AI has provided a circuit design based on your requirements.",
      });
    } catch (error) {
      console.error('Circuit Design Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate circuit design",
        variant: "destructive",
      });
    } finally {
      setIsCircuitLoading(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Circuit Design Adviser
        </CardTitle>
        <CardDescription>
          AI-powered assistant for electrical circuit design
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Describe your electrical circuit requirements in plain English, and our AI will suggest the optimal design, 
          including component specifications, safety measures, and efficiency considerations.
        </p>
        
        <Textarea
          placeholder="e.g., I'm designing a lighting circuit for a three-bedroom house with LED downlights throughout. I need to include emergency lighting in the hallways."
          className="min-h-[100px]"
          value={circuitPrompt}
          onChange={(e) => setCircuitPrompt(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          onClick={handleCircuitDesign} 
          disabled={isCircuitLoading}
        >
          {isCircuitLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Designing Circuit...
            </>
          ) : (
            'Generate Circuit Design'
          )}
        </Button>

        {circuitResponse && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Circuit Design:</h3>
            <div className="text-sm whitespace-pre-wrap">
              {circuitResponse.split('\n').map((line, index) => (
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

export default CircuitDesigner;

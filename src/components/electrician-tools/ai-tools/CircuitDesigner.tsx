
import { useState } from "react";
import { Zap, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const CircuitDesigner = () => {
  const [designPrompt, setDesignPrompt] = useState("");
  const [designResults, setDesignResults] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDesign = async () => {
    if (designPrompt.trim() === "") {
      toast({
        title: "Empty Design Specification",
        description: "Please enter circuit design requirements first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setDesignResults("");

    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: designPrompt,
          type: "circuit"
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Circuit Designer');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      setDesignResults(data.response || "");
      
      toast({
        title: "Design Generated",
        description: "Your circuit design specifications have been generated.",
      });
    } catch (error) {
      console.error('Circuit Design Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate circuit design",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Electrical Circuit Designer
        </CardTitle>
        <CardDescription>
          Generate circuit designs, cable sizing, and load calculations to BS 7671 standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Describe your circuit requirements, including load details, distances, and environment. Our AI will provide circuit design parameters, cable specifications, and protection requirements based on the latest UK standards.
        </p>
        
        <div className="space-y-3">
          <Textarea
            placeholder="e.g., I need to design a circuit for a 9.5kW electric shower. The cable run is 18 metres from the consumer unit through a loft space (ambient temp 45°C in summer). What cable, protection devices, and earthing requirements do I need?"
            className="min-h-[120px]"
            value={designPrompt}
            onChange={(e) => setDesignPrompt(e.target.value)}
          />
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleGenerateDesign} 
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Generating Design...
            </>
          ) : (
            'Generate Circuit Design'
          )}
        </Button>

        {isGenerating && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md animate-pulse">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}

        {designResults && !isGenerating && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Circuit Design Specifications:</h3>
            <div className="text-sm whitespace-pre-wrap">
              {designResults.split('\n').map((line, index) => (
                <p 
                  key={index}
                  className={
                    line.match(/^(CIRCUIT DESIGN|CABLE SPECIFICATION|PROTECTION DEVICES|EARTHING REQUIREMENTS|CALCULATIONS):/) ?
                    'text-elec-yellow font-semibold mt-3 mb-1' :
                    line.endsWith(':') ?
                    'font-medium mt-2 mb-1' :
                    'my-1'
                  }
                >
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

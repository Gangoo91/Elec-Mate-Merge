
import { useState } from "react";
import { Lightbulb, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const ConceptExplainer = () => {
  const [query, setQuery] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConceptExplain = async () => {
    if (query.trim() === "") {
      toast({
        title: "Empty Query",
        description: "Please enter a question about an electrical concept first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setExplanation("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: query,
          type: "concept" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Concept Explainer');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setExplanation(data.response || "");
      
      toast({
        title: "Explanation Generated",
        description: "Your concept has been explained.",
      });
    } catch (error) {
      console.error('Concept Explanation Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get concept explanation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      setQuery("");
      setExplanation("");
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Concept Explainer
        </CardTitle>
        <CardDescription>
          Get clear explanations of complex electrical concepts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Ask questions about any electrical theory or practical concept and receive easy-to-understand
          explanations based on UK standards and regulations.
        </p>
        
        {isModalOpen ? (
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., What is the difference between a residual current device (RCD) and a residual current circuit breaker with overload protection (RCBO)?"
              className="min-h-[100px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={handleConceptExplain} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Explaining...
                  </>
                ) : (
                  'Get Explanation'
                )}
              </Button>
              <Button variant="outline" onClick={toggleModal}>
                Close
              </Button>
            </div>

            {isLoading && (
              <div className="mt-4 p-4 bg-elec-dark rounded-md animate-pulse">
                <Skeleton className="h-6 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            )}

            {explanation && !isLoading && (
              <div className="mt-4 p-4 bg-elec-dark rounded-md">
                <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Concept Explanation:</h3>
                <div className="text-sm whitespace-pre-wrap">
                  {explanation.split('\n').map((line, index) => (
                    <p 
                      key={index} 
                      className={
                        line.match(/^(Definition|Key Points|Applications|Example|Summary):/) ?
                        'text-elec-yellow font-semibold mt-3 mb-1' :
                        'my-1'
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button className="w-full" onClick={toggleModal}>
            Open Explainer
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptExplainer;

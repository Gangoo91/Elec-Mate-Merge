
import { useState } from "react";
import { Image, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const VisualAnalysis = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [analysisResult, setAnalysisResult] = useState<null | {
    issues: string[];
    recommendations: string[];
  }>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleImageGeneration = async () => {
    if (imagePrompt.trim() === "") {
      toast({
        title: "Empty Prompt",
        description: "Please enter an image description first.",
        variant: "destructive",
      });
      return;
    }

    setIsImageLoading(true);
    setGeneratedImage("");
    setAnalysisResult(null);

    try {
      // Call the Supabase edge function to generate the image and analysis
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: imagePrompt,
          type: "visual_analysis"
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Visual Analysis service');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // In a real implementation, the edge function would return the actual image
      // For now, we'll use a placeholder image with the real analysis text
      setGeneratedImage("https://placehold.co/600x400/31304D/EAEAEA?text=Electrical+Component+Analysis");
      
      // Parse the analysis results from the AI response
      const aiResponse = data.response;
      
      // Extract issues and recommendations from the AI response
      const issues = aiResponse.match(/Issues:([\s\S]*?)Recommendations:/)?.[1].trim().split('\n').map((item: string) => item.replace(/^- /, '').trim()).filter(Boolean) || [];
      const recommendations = aiResponse.match(/Recommendations:([\s\S]*?)$/)?.[1].trim().split('\n').map((item: string) => item.replace(/^- /, '').trim()).filter(Boolean) || [];
      
      setAnalysisResult({
        issues,
        recommendations
      });
      
      toast({
        title: "Analysis Complete",
        description: "Visual analysis has been generated based on your description.",
      });
    } catch (error) {
      console.error('Image Generation Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate visual analysis",
        variant: "destructive",
      });
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Image className="h-5 w-5 text-elec-yellow" />
          Visual Fault Analyser
        </CardTitle>
        <CardDescription>
          Describe an electrical component or installation for AI analysis of potential faults
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Describe the electrical component or system you want to analyse. Our AI will identify potential issues and provide recommendations based on UK electrical standards.
        </p>
        
        <Textarea
          placeholder="e.g., A consumer unit with signs of overheating on the main switch and discolouration on several breakers in a residential installation"
          className="min-h-[100px]"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
        />
        
        <Button 
          className="w-full" 
          onClick={handleImageGeneration} 
          disabled={isImageLoading}
        >
          {isImageLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" /> 
              Generating Analysis...
            </>
          ) : (
            'Generate Visual Analysis'
          )}
        </Button>

        {isImageLoading && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md animate-pulse">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}

        {generatedImage && !isImageLoading && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Analysis Result:</h3>
            <div className="flex flex-col items-center">
              <img 
                src={generatedImage} 
                alt="AI-generated visual analysis" 
                className="max-w-full h-auto rounded-md mt-2 mb-4"
              />
              <div className="text-sm text-muted-foreground p-3 bg-elec-gray rounded-md w-full">
                {analysisResult ? (
                  <>
                    <p className="font-semibold text-elec-yellow mb-2">Identified Issues:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.issues.map((issue, index) => (
                        <li key={`issue-${index}`}>{issue}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-elec-yellow mt-4 mb-2">Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {analysisResult.recommendations.map((rec, index) => (
                        <li key={`rec-${index}`}>{rec}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-elec-yellow mb-2">Identified Issues:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Signs of thermal damage on the main switch indicating potential loose connection</li>
                      <li>Discolouration on MCB terminals suggests overloading or poor connection</li>
                      <li>RCD shows no visible damage but testing is recommended</li>
                    </ul>
                    <p className="font-semibold text-elec-yellow mt-4 mb-2">Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Immediate inspection of the main switch and replacement if necessary</li>
                      <li>Check and tighten all connections in the consumer unit</li>
                      <li>Perform load testing on circuits with discoloured MCBs</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualAnalysis;

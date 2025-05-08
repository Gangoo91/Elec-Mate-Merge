
import { useState } from "react";
import { Image, Loader } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const VisualAnalysis = () => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
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

    try {
      // Simulate image generation (in a real implementation, this would call an edge function)
      setTimeout(() => {
        // This is a placeholder. In production, you would call a real image generation API
        setGeneratedImage("https://placehold.co/600x400/EAEAEA/31304D?text=Generated+Image+Based+On+Prompt");
        
        toast({
          title: "Image Generated",
          description: "AI has created an image based on your description.",
        });
        setIsImageLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Image Generation Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate image",
        variant: "destructive",
      });
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
          Upload or describe an electrical component to identify potential faults
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Describe the electrical component or system you want to analyze. Our AI will generate a visual representation and identify potential issues.
        </p>
        
        <Textarea
          placeholder="e.g., A consumer unit with signs of overheating on the main switch and discoloration on several breakers"
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
              Generating Image...
            </>
          ) : (
            'Generate Visual Analysis'
          )}
        </Button>

        {generatedImage && (
          <div className="mt-6 p-4 bg-elec-dark rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-elec-yellow">Analysis Result:</h3>
            <div className="flex flex-col items-center">
              <img 
                src={generatedImage} 
                alt="AI-generated visual analysis" 
                className="max-w-full h-auto rounded-md mt-2 mb-4"
              />
              <div className="text-sm text-muted-foreground p-3 bg-elec-gray rounded-md w-full">
                <p className="font-semibold text-elec-yellow mb-2">Identified Issues:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Signs of thermal damage on the main switch indicating potential loose connection</li>
                  <li>Discoloration on MCB terminals suggests overloading or poor connection</li>
                  <li>RCD shows no visible damage but testing is recommended</li>
                </ul>
                <p className="font-semibold text-elec-yellow mt-4 mb-2">Recommendations:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Immediate inspection of the main switch and replacement if necessary</li>
                  <li>Check and tighten all connections in the consumer unit</li>
                  <li>Perform load testing on circuits with discolored MCBs</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualAnalysis;

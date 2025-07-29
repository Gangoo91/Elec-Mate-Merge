
import { useState } from "react";
import { Image, Loader, Eye, AlertTriangle, CheckCircle } from "lucide-react";
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
      
      setGeneratedImage("https://placehold.co/600x400/31304D/EAEAEA?text=Electrical+Component+Analysis");
      
      const aiResponse = data.response;
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

  const examplePrompts = [
    "Consumer unit with signs of overheating",
    "Damaged socket outlet with burn marks",
    "Exposed cables in loft space"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/80 to-elec-card/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="h-6 w-6 text-blue-400" />
            </div>
            Visual Fault Analyser
          </CardTitle>
          <CardDescription className="text-elec-light/70 text-base">
            Describe an electrical component or installation for AI analysis of potential faults
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <span className="font-medium text-elec-light">Safety Issues</span>
              </div>
              <p className="text-sm text-elec-light/70">Identifies potential hazards and safety concerns</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="font-medium text-elec-light">UK Compliance</span>
              </div>
              <p className="text-sm text-elec-light/70">Checks against BS 7671 regulations</p>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-light">Example scenarios:</h4>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-blue-400/30 text-elec-light/80 hover:bg-blue-400/10 hover:border-blue-400/50"
                  onClick={() => setImagePrompt(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., A consumer unit with signs of overheating on the main switch and discolouration on several breakers in a residential installation"
              className="min-h-[120px] bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/40 text-elec-light placeholder:text-elec-light/50 resize-none"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500/90 hover:to-blue-600/90 text-white font-semibold py-3 shadow-lg shadow-blue-500/20" 
              onClick={handleImageGeneration} 
              disabled={isImageLoading}
            >
              {isImageLoading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                  Analysing...
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  Generate Analysis
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isImageLoading && (
            <div className="mt-6 p-6 bg-elec-dark/30 rounded-lg border border-blue-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-400" />
                </div>
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-40 w-full mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {generatedImage && !isImageLoading && (
            <div className="mt-6 p-6 bg-gradient-to-br from-elec-dark/60 to-elec-dark/80 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-blue-400">Analysis Complete</h3>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden border border-elec-yellow/20">
                  <img 
                    src={generatedImage} 
                    alt="AI-generated visual analysis" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                      <h4 className="font-semibold text-orange-400">Identified Issues</h4>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                      <ul className="space-y-2 text-sm text-elec-light/90">
                        {analysisResult ? (
                          analysisResult.issues.map((issue, index) => (
                            <li key={`issue-${index}`} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                              {issue}
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                              Signs of thermal damage on the main switch indicating potential loose connection
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                              Discolouration on MCB terminals suggests overloading or poor connection
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-green-400">Recommendations</h4>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <ul className="space-y-2 text-sm text-elec-light/90">
                        {analysisResult ? (
                          analysisResult.recommendations.map((rec, index) => (
                            <li key={`rec-${index}`} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                              {rec}
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                              Immediate inspection of the main switch and replacement if necessary
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                              Check and tighten all connections in the consumer unit
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualAnalysis;

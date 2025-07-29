import { useState } from "react";
import { Sparkles, Loader, Search, BookOpen, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [regulationsResult, setRegulationsResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);

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
    setAnalysisResult("");
    setRegulationsResult("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "structured_assistant" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Handle both structured and regular responses
      if (data.analysis && data.regulations) {
        // Structured response
        setAnalysisResult(data.analysis);
        setRegulationsResult(data.regulations);
      } else if (data.response) {
        // Fallback to regular response - split into sections
        const response = data.response;
        const sections = response.split(/(?=REGULATIONS?:|ANALYSIS:|TECHNICAL|COMPLIANCE)/i);
        
        if (sections.length > 1) {
          setAnalysisResult(sections[0].trim());
          setRegulationsResult(sections.slice(1).join('\n').trim());
        } else {
          // Single response - put in analysis section
          setAnalysisResult(response);
          setRegulationsResult("See analysis section for regulation details.");
        }
      } else {
        throw new Error("No valid response received from AI");
      }
      
      toast({
        title: "Analysis Complete",
        description: "AI has provided detailed analysis and regulation guidance.",
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
    "RCD bathroom requirements",
    "Cable sizing formula", 
    "Testing sequence",
    "Zs values for MCBs",
    "Bonding conductor sizes",
    "IP rating requirements"
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-6 lg:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-2xl border border-purple-400/30">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
            Intelligent Search
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            Ask questions about BS7671 electrical regulations in plain English. Get instant answers with relevant
            regulations, practical guidance, and safety tips.
          </p>
        </div>

        {/* AI Search Interface Component */}
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600 w-full max-w-6xl mx-auto">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              <CardTitle className="text-lg sm:text-xl text-white">Intelligent Search</CardTitle>
            </div>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Ask about electrical regulations, testing procedures, or installation requirements:
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
            {/* Input Area */}
            <div className="space-y-3 sm:space-y-4">
              <Textarea
                placeholder="e.g. 'What are the RCD requirements for bathrooms?' or 'How do I test earth fault loop impedance?'"
                className="min-h-[80px] sm:min-h-[100px] bg-neutral-700/50 border-neutral-600 focus:border-purple-400 text-white placeholder:text-gray-400 resize-none text-sm sm:text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base" 
                  onClick={handleAIQuery} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" /> 
                      Search
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Search
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-neutral-600 text-gray-300 hover:bg-neutral-700/50 px-4 sm:px-6 h-10 sm:h-12 text-sm sm:text-base"
                  onClick={() => setShowResults(!showResults)}
                >
                  {showResults ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                  <span className="hidden sm:inline ml-2">
                    {showResults ? 'Hide' : 'Show'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="p-4 sm:p-6 bg-purple-900/30 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">AI Assistant is thinking...</span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Skeleton className="h-3 sm:h-4 w-full bg-neutral-700/50" />
                  <Skeleton className="h-3 sm:h-4 w-3/4 bg-neutral-700/50" />
                  <Skeleton className="h-3 sm:h-4 w-5/6 bg-neutral-700/50" />
                </div>
              </div>
            )}

            {/* Quick Examples Section */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-medium text-gray-300 text-sm sm:text-base">Try these questions:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {exampleQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-neutral-600/50 text-gray-300 hover:bg-neutral-700/50 hover:border-neutral-500 h-auto py-2 sm:py-3 px-3 sm:px-4 text-left justify-start text-xs sm:text-sm"
                    onClick={() => setPrompt(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {(analysisResult || regulationsResult) && !isLoading && showResults && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full max-w-7xl mx-auto">
            {/* Analysis Section */}
            {analysisResult && (
              <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
                <CardHeader className="p-3 sm:p-4">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Search className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                    </div>
                    Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {analysisResult.split('\n').map((line, index) => (
                        <p 
                          key={index}
                          className={
                            line.match(/^(CALCULATION|SIZING|ASSESSMENT|ANALYSIS|RECOMMENDATION):/) ?
                            'text-blue-400 font-semibold text-sm sm:text-base mt-3 sm:mt-4 mb-1 sm:mb-2 first:mt-0' :
                            line.endsWith(':') && line.length < 50 ?
                            'font-medium text-blue-300 mt-2 sm:mt-3 mb-1' :
                            line.startsWith('•') || line.startsWith('-') ?
                            'text-gray-300 ml-3 sm:ml-4 my-1' :
                            line.trim() === '' ? 'my-1 sm:my-2' :
                            'my-1'
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Relevant Regulations */}
            {regulationsResult && (
              <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
                <CardHeader className="p-3 sm:p-4">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                    </div>
                    Relevant Regulations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {regulationsResult.split('\n').map((line, index) => (
                        <p 
                          key={index}
                          className={
                            line.match(/^(Regulation|BS 7671|IET|Section)/i) ?
                            'text-purple-400 font-semibold text-sm sm:text-base mt-3 sm:mt-4 mb-1 sm:mb-2 first:mt-0' :
                            line.match(/^\d{3}\.\d/) ?
                            'text-purple-400 font-medium mt-2 sm:mt-3 mb-1' :
                            line.endsWith(':') && line.length < 50 ?
                            'font-medium text-purple-300 mt-2 sm:mt-3 mb-1' :
                            line.startsWith('•') || line.startsWith('-') ?
                            'text-gray-300 ml-3 sm:ml-4 my-1' :
                            line.trim() === '' ? 'my-1 sm:my-2' :
                            'my-1'
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 w-full max-w-7xl mx-auto mt-6 sm:mt-8 lg:mt-12">
          <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Instant Answers</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Get immediate responses to complex electrical regulation questions using advanced AI.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">BS 7671 Compliant</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                All responses are based on the latest 18th edition wiring regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base">Practical Guidance</h3>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">
                Real-world applications with safety tips and best practices included.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
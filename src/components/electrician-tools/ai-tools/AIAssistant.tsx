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
        // Structured response - handle both string and object formats
        const analysisText = typeof data.analysis === 'string' ? data.analysis : 
          typeof data.analysis === 'object' ? Object.values(data.analysis).join('\n\n') : 
          String(data.analysis);
        
        const regulationsText = typeof data.regulations === 'string' ? data.regulations :
          typeof data.regulations === 'object' ? Object.values(data.regulations).join('\n\n') :
          String(data.regulations);
          
        setAnalysisResult(analysisText);
        setRegulationsResult(regulationsText);
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
      <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
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
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600 max-w-5xl mx-auto">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 max-w-6xl mx-auto">
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
                    <div className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed space-y-3">
                      {String(analysisResult || '').split('\n').map((line, index) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        
                        // Enhanced formatting with technical term highlighting
                        const technicalTerms = /\b(RCD|RCBO|MCB|MCCB|RCM|AFDD|SPD|CU|DB|EICR|PIR|EIC|PAT|Zs|Ze|Zdb|PFC|PSCC|TN-S|TN-C-S|TT|IT|IP\d{2}|CSA|CPC|PME|SWA|MICC|FP200|XLPE|PVC|LSZH|BS\s*7671|IET|Part\s*P)\b/gi;
                        const measurements = /\b(\d+(?:\.\d+)?)\s*(A|mA|V|kV|W|kW|VA|kVA|Ω|mΩ|mm²?|m|cm|Hz|°C|lx|lm|cd)\b/g;
                        const regulationNumbers = /\b(\d{3}\.\d+(?:\.\d+)?)\b/g;
                        
                        // Process text with highlighting
                        let processedText = trimmed
                          .replace(technicalTerms, '<span class="px-1.5 py-0.5 bg-blue-500/25 text-blue-200 rounded font-medium text-xs">$&</span>')
                          .replace(measurements, '<span class="px-1 py-0.5 bg-green-500/25 text-green-200 rounded font-mono text-xs">$&</span>')
                          .replace(regulationNumbers, '<span class="px-1.5 py-0.5 bg-purple-500/25 text-purple-200 rounded font-semibold text-xs">$&</span>');
                        
                        // Section headers
                        if (trimmed.match(/^(CALCULATION|SIZING|ASSESSMENT|ANALYSIS|RECOMMENDATION):?$/i)) {
                          return (
                            <div key={index} className="mt-4 mb-3 first:mt-0 pb-2 border-b border-blue-400/20">
                              <h4 className="text-blue-400 font-bold text-sm sm:text-base flex items-center gap-2">
                                {trimmed.includes('CALCULATION') && '🧮'}
                                {trimmed.includes('SIZING') && '📏'}
                                {trimmed.includes('ASSESSMENT') && '🎯'}
                                {trimmed.includes('ANALYSIS') && '🔍'}
                                {trimmed.includes('RECOMMENDATION') && '💡'}
                                <span>{trimmed}</span>
                              </h4>
                            </div>
                          );
                        }
                        
                        // Subsection headers (ending with :)
                        if (trimmed.endsWith(':') && trimmed.length < 60 && !trimmed.match(/^[\d\w\s]{1,3}:/)) {
                          return (
                            <div key={index} className="mt-3 mb-2">
                              <h5 className="font-semibold text-blue-300 text-sm" dangerouslySetInnerHTML={{ __html: processedText }} />
                            </div>
                          );
                        }
                        
                        // Bullet points
                        if (trimmed.match(/^[-•]\s+/)) {
                          const bulletText = processedText.replace(/^[-•]\s+/, '');
                          return (
                            <div key={index} className="ml-4 mb-2 flex items-start gap-2">
                              <span className="text-blue-400 text-sm mt-1">•</span>
                              <span className="text-gray-300 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: bulletText }} />
                            </div>
                          );
                        }
                        
                        // Calculations and formulas
                        if (trimmed.match(/[=×÷+\-]\s*\d+|formula|equation|calculate/i) || trimmed.includes('=')) {
                          return (
                            <div key={index} className="my-3 p-3 bg-green-500/15 border border-green-500/25 rounded-lg">
                              <div className="flex items-start gap-2">
                                <span className="text-green-400 text-sm">🧮</span>
                                <span className="text-green-200 font-mono text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: processedText }} />
                              </div>
                            </div>
                          );
                        }
                        
                        // Regular paragraphs
                        return (
                          <p key={index} className="text-gray-300 text-xs sm:text-sm my-2" dangerouslySetInnerHTML={{ __html: processedText }} />
                        );
                      }).filter(Boolean)}
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
                    <div className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed space-y-3">
                      {String(regulationsResult || '').split('\n').map((line, index) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        
                        // Enhanced formatting for regulations
                        const regulationNumbers = /\b(\d{3}\.\d+(?:\.\d+)?)\b/g;
                        const partNumbers = /(Part|Chapter|Section|Appendix)\s*(\d+)/gi;
                        const bsNumbers = /(BS\s*7671|IET)/gi;
                        
                        let processedText = trimmed
                          .replace(regulationNumbers, '<span class="px-2 py-1 bg-purple-500/30 text-purple-200 rounded font-bold text-xs">$&</span>')
                          .replace(partNumbers, '<span class="px-1.5 py-0.5 bg-indigo-500/25 text-indigo-200 rounded font-semibold text-xs">$&</span>')
                          .replace(bsNumbers, '<span class="px-2 py-1 bg-blue-500/30 text-blue-200 rounded font-bold text-xs">$&</span>');
                        
                        // Main regulation headers
                        if (trimmed.match(/^(Regulation|BS 7671|IET|REGULATIONS?):?$/i)) {
                          return (
                            <div key={index} className="mt-4 mb-3 first:mt-0 pb-2 border-b border-purple-400/20">
                              <h4 className="text-purple-400 font-bold text-sm sm:text-base flex items-center gap-2">
                                <span className="text-lg">📖</span>
                                <span>{trimmed}</span>
                              </h4>
                            </div>
                          );
                        }
                        
                        // Regulation numbers as standalone headers
                        if (trimmed.match(/^\d{3}\.\d+(?:\.\d+)?:?\s*$/)) {
                          return (
                            <div key={index} className="mt-3 mb-2 p-2 bg-purple-500/10 rounded border border-purple-500/20">
                              <h5 className="font-bold text-purple-300 text-sm flex items-center gap-2">
                                <span className="text-xs">📋</span>
                                <span dangerouslySetInnerHTML={{ __html: processedText }} />
                              </h5>
                            </div>
                          );
                        }
                        
                        // Section/Part headers (ending with :)
                        if (trimmed.endsWith(':') && trimmed.length < 60) {
                          return (
                            <div key={index} className="mt-3 mb-2">
                              <h5 className="font-semibold text-purple-300 text-sm" dangerouslySetInnerHTML={{ __html: processedText }} />
                            </div>
                          );
                        }
                        
                        // Bullet points
                        if (trimmed.match(/^[-•]\s+/)) {
                          const bulletText = processedText.replace(/^[-•]\s+/, '');
                          return (
                            <div key={index} className="ml-4 mb-2 flex items-start gap-2">
                              <span className="text-purple-400 text-sm mt-1">•</span>
                              <span className="text-gray-300 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: bulletText }} />
                            </div>
                          );
                        }
                        
                        // Compliance requirements (containing "must", "shall", "required")
                        if (trimmed.match(/\b(must|shall|required|mandatory|compliance)\b/gi)) {
                          return (
                            <div key={index} className="my-3 p-3 bg-amber-500/15 border border-amber-500/25 rounded-lg">
                              <div className="flex items-start gap-2">
                                <span className="text-amber-400 text-sm">⚖️</span>
                                <span className="text-amber-200 text-xs sm:text-sm font-medium" dangerouslySetInnerHTML={{ __html: processedText }} />
                              </div>
                            </div>
                          );
                        }
                        
                        // Regular regulation text
                        return (
                          <p key={index} className="text-gray-300 text-xs sm:text-sm my-2" dangerouslySetInnerHTML={{ __html: processedText }} />
                        );
                      }).filter(Boolean)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto mt-8 sm:mt-12">
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
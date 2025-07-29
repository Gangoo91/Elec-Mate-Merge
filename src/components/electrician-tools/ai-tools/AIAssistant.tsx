import { useState } from "react";
import { Brain, Loader, Send, Lightbulb, Search, BookOpen } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
          <Brain className="h-8 w-8 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-elec-light">AI Assistant</h1>
        <p className="text-elec-light/70 text-lg max-w-2xl mx-auto">
          Ask questions about BS7671 electrical regulations in plain English. Get instant answers
          with relevant regulations, practical guidance, and safety tips.
        </p>
      </div>

      {/* Main Search Card */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30 shadow-2xl max-w-4xl mx-auto">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-6 w-6 text-purple-400" />
            <CardTitle className="text-2xl text-white">AI Assistant</CardTitle>
          </div>
          <CardDescription className="text-purple-100/80 text-base">
            Ask about electrical regulations, testing procedures, or installation requirements:
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Input Area */}
          <div className="space-y-4">
            <Textarea
              placeholder="Ask me anything about electrical work, BS 7671 regulations, safety requirements, calculations, or best practices..."
              className="min-h-[100px] bg-elec-dark/50 border-purple-400/30 focus:border-purple-400 text-elec-light placeholder:text-elec-light/60 resize-none text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 h-12" 
                onClick={handleAIQuery} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="border-purple-400/30 text-purple-300 hover:bg-purple-500/10 px-6 h-12"
                onClick={() => {
                  setPrompt("");
                  setAnalysisResult("");
                  setRegulationsResult("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-6 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-elec-light font-medium">AI Assistant is thinking...</span>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-elec-gray/50" />
                <Skeleton className="h-4 w-3/4 bg-elec-gray/50" />
                <Skeleton className="h-4 w-5/6 bg-elec-gray/50" />
              </div>
            </div>
          )}

          {/* Example Questions */}
          <div className="space-y-4">
            <h4 className="font-medium text-purple-200">Try these questions:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-purple-400/20 text-purple-200/90 hover:bg-purple-500/10 hover:border-purple-400/40 h-auto py-3 px-4 text-left justify-start text-sm"
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
      {(analysisResult || regulationsResult) && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Analysis Section */}
          {analysisResult && (
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3 text-elec-light">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Search className="h-4 w-4 text-green-400" />
                  </div>
                  Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="text-sm text-elec-light/90 whitespace-pre-wrap leading-relaxed">
                    {analysisResult.split('\n').map((line, index) => (
                      <p 
                        key={index}
                        className={
                          line.match(/^(CALCULATION|SIZING|ASSESSMENT|ANALYSIS|RECOMMENDATION):/) ?
                          'text-green-400 font-semibold text-base mt-4 mb-2 first:mt-0' :
                          line.endsWith(':') && line.length < 50 ?
                          'font-medium text-green-300 mt-3 mb-1' :
                          line.startsWith('•') || line.startsWith('-') ?
                          'text-elec-light/80 ml-4 my-1' :
                          line.trim() === '' ? 'my-2' :
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
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-3 text-elec-light">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                  </div>
                  Relevant Regulations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="text-sm text-elec-light/90 whitespace-pre-wrap leading-relaxed">
                    {regulationsResult.split('\n').map((line, index) => (
                      <p 
                        key={index}
                        className={
                          line.match(/^(Regulation|BS 7671|IET|Section)/i) ?
                          'text-blue-400 font-semibold text-base mt-4 mb-2 first:mt-0' :
                          line.match(/^\d{3}\.\d/) ?
                          'text-purple-400 font-medium mt-3 mb-1' :
                          line.endsWith(':') && line.length < 50 ?
                          'font-medium text-blue-300 mt-3 mb-1' :
                          line.startsWith('•') || line.startsWith('-') ?
                          'text-elec-light/80 ml-4 my-1' :
                          line.trim() === '' ? 'my-2' :
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
    </div>
  );
};

export default AIAssistant;
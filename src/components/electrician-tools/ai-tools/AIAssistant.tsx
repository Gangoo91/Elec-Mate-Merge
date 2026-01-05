import { useState } from "react";
import { Sparkles, Loader, Copy, Lightbulb, ChevronDown, FileText, BookOpen, Wrench, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from 'react-markdown';
import { processElectricalText } from "@/lib/text-processor";
import { EnhancedTabContent } from "./EnhancedTabContent";

interface AIResponse {
  quick_answer: string;
  technical_answer: string;
  regulations: string;
  practical_guidance: string;
}

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressStage, setProgressStage] = useState<'parsing' | 'searching' | 'analyzing' | 'formatting' | null>(null);

  const handleCopyResponse = () => {
    if (!aiResponse) return;
    
    const fullText = `QUICK ANSWER:\n${aiResponse.quick_answer}\n\nTECHNICAL ANSWER:\n${aiResponse.technical_answer}\n\nREGULATIONS:\n${aiResponse.regulations}\n\nPRACTICAL GUIDANCE:\n${aiResponse.practical_guidance}`;
    
    navigator.clipboard.writeText(fullText);
    toast({
      title: "Copied to Clipboard",
      description: "Full AI response copied successfully",
      variant: "success",
    });
  };

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
    setAiResponse(null);
    
    // Stage 1: Parsing (0-2s)
    setProgressStage('parsing');
    
    setTimeout(() => {
      setProgressStage('searching');
    }, 2000);
    
    setTimeout(() => {
      setProgressStage('analyzing');
    }, 5000);
    
    setTimeout(() => {
      setProgressStage('formatting');
    }, 10000);
    
    try {
      const assistantResponse = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "structured_assistant",
          use_rag: true
        },
      });

      const { data, error } = assistantResponse;

      if (assistantResponse.error) {
        const status = (assistantResponse.error as any)?.status;
        if (status === 429) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please wait 30 seconds and try again.",
            variant: "destructive",
          });
          return;
        }
        if (status === 402) {
          toast({
            title: "Service Quota Exceeded",
            description: "AI service credits exhausted. Please contact support.",
            variant: "destructive",
          });
          return;
        }
        throw new Error(assistantResponse.error.message || 'Assistant error');
      }
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        if (data.code === 'QUOTA_EXCEEDED') {
          toast({
            title: "Service Quota Exceeded",
            description: "AI service credits exhausted. Please contact support.",
            variant: "destructive",
          });
          return;
        }
        if (data.retryAfter) {
          toast({
            title: "Rate Limit Exceeded",
            description: `Please wait ${data.retryAfter} seconds and try again.`,
            variant: "destructive",
          });
          return;
        }
        throw new Error(data.error);
      }
      
      // Handle new 4-section response format
      if (data.quick_answer && data.technical_answer && data.regulations && data.practical_guidance) {
        setAiResponse({
          quick_answer: data.quick_answer,
          technical_answer: data.technical_answer,
          regulations: data.regulations,
          practical_guidance: data.practical_guidance
        });
        
        toast({
          title: "Analysis Complete",
          description: "AI has provided detailed analysis and regulation guidance.",
          variant: "success",
        });
      } 
      // Fallback to old 3-section format
      else if (data.analysis && data.regulations && data.practical_guidance) {
        // Convert old format to new format
        setAiResponse({
          quick_answer: data.analysis.split('\n')[0] || "See technical answer for details.",
          technical_answer: data.analysis,
          regulations: data.regulations,
          practical_guidance: data.practical_guidance
        });
        
        toast({
          title: "Analysis Complete",
          description: "AI has provided detailed analysis and regulation guidance.",
          variant: "success",
        });
      } else {
        throw new Error("Invalid response format from AI");
      }
      
    } catch (error) {
      console.error('AI Query Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI assistant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgressStage(null);
    }
  };

  const exampleQueries = [
    "RCD bathroom requirements",
    "Cable sizing for 32A ring circuit",
    "Earth fault loop impedance testing procedure"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-elec-yellow/30 to-yellow-500/30 rounded-xl border border-elec-yellow/30">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Intelligent Search
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ask questions about BS7671 electrical regulations in plain English. Get instant answers with relevant
            regulations, practical guidance, and safety tips.
          </p>
        </div>

        {/* AI Search Interface */}
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20 max-w-6xl mx-auto">
          <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {/* Input Area */}
            <div className="space-y-3 sm:space-y-4">
              <Textarea
                placeholder="e.g. 'What are the RCD requirements for bathrooms?' or 'Cable sizing for 32A ring circuit'"
                className="min-h-[120px] sm:min-h-[160px] bg-muted/50 border-2 border-elec-yellow/40 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 text-foreground placeholder:text-gray-400 resize-none text-sm sm:text-base font-medium rounded-xl p-4 sm:p-5 leading-relaxed transition-all duration-200"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAIQuery();
                  }
                }}
              />
              
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold py-2.5 sm:py-3 h-10 sm:h-12 text-sm sm:text-base transition-all duration-200 hover:scale-[1.02]" 
                  onClick={handleAIQuery} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Analysing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Ask AI Assistant
                    </>
                  )}
                </Button>
              </div>

              {/* Example Queries */}
              {!aiResponse && !isLoading && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-gray-400 w-full mb-1">Try these:</span>
                  {exampleQueries.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(example)}
                      className="text-xs px-3 py-1.5 bg-muted/50 hover:bg-neutral-600/50 border border-elec-yellow/20 hover:border-elec-yellow/40 rounded-full text-gray-300 hover:text-foreground transition-all"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Unified AI Response Card */}
        {aiResponse && !isLoading && (
          <Card className="bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 border-2 border-elec-yellow/30 backdrop-blur-sm shadow-2xl max-w-6xl mx-auto">
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg sm:text-2xl font-bold text-foreground flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-elec-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-elec-yellow animate-pulse" />
                  </div>
                  <span className="hidden sm:inline">AI Response</span>
                  <span className="sm:hidden">Response</span>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-foreground hover:bg-white/10 h-8 sm:h-9"
                  onClick={handleCopyResponse}
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6">
              {/* Quick Answer Section (collapsible) */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-elec-yellow/10 rounded-xl border-l-4 border-elec-yellow hover:bg-elec-yellow/15 transition-colors cursor-pointer group">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-elec-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-elec-yellow/90 uppercase tracking-wide mb-1 sm:mb-1.5">
                        Quick Answer
                      </h3>
                      <CollapsibleContent>
              <div 
                className="text-foreground text-sm sm:text-base leading-relaxed text-left"
                dangerouslySetInnerHTML={{ 
                  __html: aiResponse.quick_answer
                    // Only highlight regulation numbers
                    .replace(/(\d{3}\.\d+\.\d+)/g, '<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-xs">$1</span>')
                    // Only highlight BS 7671
                    .replace(/BS 7671:?(\d{4})?(\+A\d:?\d{4})?/gi, '<span class="inline-flex items-center px-2 py-1 rounded-md bg-elec-yellow/20 text-elec-yellow font-medium text-sm">BS 7671$1$2</span>')
                    // Simple line breaks
                    .replace(/\n/g, '<br/>')
                }}
              />
                      </CollapsibleContent>
                    </div>
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
                  </div>
                </CollapsibleTrigger>
              </Collapsible>

              {/* Divider */}
              <div className="border-t border-elec-yellow/20"></div>

              {/* Tabbed Content */}
              <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-elec-yellow/20 rounded-lg p-1.5 h-auto gap-2">
                  <TabsTrigger 
                    value="technical" 
                    className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/40 data-[state=active]:shadow-lg text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-4 flex items-center justify-center gap-2 rounded-md border border-transparent transition-all duration-200"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Technical</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="regulations" 
                    className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:border-purple-500/40 data-[state=active]:shadow-lg text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-4 flex items-center justify-center gap-2 rounded-md border border-transparent transition-all duration-200"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Regulations</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="practical" 
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:border-green-500/40 data-[state=active]:shadow-lg text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-4 flex items-center justify-center gap-2 rounded-md border border-transparent transition-all duration-200"
                  >
                    <Wrench className="h-4 w-4" />
                    <span>Practical</span>
                  </TabsTrigger>
                </TabsList>

                {/* Technical Tab */}
                <TabsContent value="technical" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  <EnhancedTabContent content={aiResponse.technical_answer} type="technical" />
                </TabsContent>

                {/* Regulations Tab */}
                <TabsContent value="regulations" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  <EnhancedTabContent content={aiResponse.regulations} type="regulations" />
                </TabsContent>

                {/* Practical Tab */}
                <TabsContent value="practical" className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                  <EnhancedTabContent content={aiResponse.practical_guidance} type="practical" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Loading State with Progress Timeline */}
        {isLoading && (
          <Card className="bg-gradient-to-br from-neutral-800/90 to-neutral-900/90 border-2 border-elec-yellow/30 backdrop-blur-sm shadow-2xl max-w-6xl mx-auto">
            <CardContent className="p-6 sm:p-12 space-y-6 sm:space-y-8">
              {/* Animated Progress Indicator */}
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-elec-yellow/20 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-elec-yellow border-t-transparent rounded-full animate-spin"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow animate-pulse" />
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-foreground font-semibold text-sm sm:text-lg">
                    {progressStage === 'parsing' && 'Understanding Your Query...'}
                    {progressStage === 'searching' && 'Searching BS 7671 Regulations...'}
                    {progressStage === 'analyzing' && 'Analyzing Requirements...'}
                    {progressStage === 'formatting' && 'Preparing Response...'}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {progressStage === 'parsing' && 'Breaking down your question into searchable terms'}
                    {progressStage === 'searching' && 'Finding relevant regulations and guidance'}
                    {progressStage === 'analyzing' && 'Processing technical requirements with AI'}
                    {progressStage === 'formatting' && 'Structuring your comprehensive answer'}
                  </p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="max-w-2xl mx-auto">
                <div className="space-y-2 sm:space-y-3">
                  {/* Stage 1: Parsing */}
                  <div className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all ${
                    progressStage === 'parsing' ? 'bg-blue-500/20 border border-blue-500/40' : 
                    ['searching', 'analyzing', 'formatting'].includes(progressStage || '') ? 'bg-green-500/10 border border-green-500/30' : 
                    'bg-card/50 border border-border'
                  }`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      progressStage === 'parsing' ? 'bg-blue-500 animate-pulse' :
                      ['searching', 'analyzing', 'formatting'].includes(progressStage || '') ? 'bg-green-500' :
                      'bg-neutral-600'
                    }`}>
                      {['searching', 'analyzing', 'formatting'].includes(progressStage || '') ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm ${
                      progressStage === 'parsing' ? 'text-blue-400 font-semibold' :
                      ['searching', 'analyzing', 'formatting'].includes(progressStage || '') ? 'text-green-400' :
                      'text-gray-500'
                    }`}>
                      Understanding Query
                    </span>
                  </div>

                  {/* Stage 2: Searching */}
                  <div className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all ${
                    progressStage === 'searching' ? 'bg-blue-500/20 border border-blue-500/40' : 
                    ['analyzing', 'formatting'].includes(progressStage || '') ? 'bg-green-500/10 border border-green-500/30' : 
                    'bg-card/50 border border-border'
                  }`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      progressStage === 'searching' ? 'bg-blue-500 animate-pulse' :
                      ['analyzing', 'formatting'].includes(progressStage || '') ? 'bg-green-500' :
                      'bg-neutral-600'
                    }`}>
                      {['analyzing', 'formatting'].includes(progressStage || '') ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm ${
                      progressStage === 'searching' ? 'text-blue-400 font-semibold' :
                      ['analyzing', 'formatting'].includes(progressStage || '') ? 'text-green-400' :
                      'text-gray-500'
                    }`}>
                      Searching Regulations
                    </span>
                  </div>

                  {/* Stage 3: Analyzing */}
                  <div className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all ${
                    progressStage === 'analyzing' ? 'bg-blue-500/20 border border-blue-500/40' : 
                    progressStage === 'formatting' ? 'bg-green-500/10 border border-green-500/30' : 
                    'bg-card/50 border border-border'
                  }`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      progressStage === 'analyzing' ? 'bg-blue-500 animate-pulse' :
                      progressStage === 'formatting' ? 'bg-green-500' :
                      'bg-neutral-600'
                    }`}>
                      {progressStage === 'formatting' ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm ${
                      progressStage === 'analyzing' ? 'text-blue-400 font-semibold' :
                      progressStage === 'formatting' ? 'text-green-400' :
                      'text-gray-500'
                    }`}>
                      AI Analysis
                    </span>
                  </div>

                  {/* Stage 4: Formatting */}
                  <div className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all ${
                    progressStage === 'formatting' ? 'bg-blue-500/20 border border-blue-500/40' : 
                    'bg-card/50 border border-border'
                  }`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      progressStage === 'formatting' ? 'bg-blue-500 animate-pulse' :
                      'bg-neutral-600'
                    }`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className={`text-xs sm:text-sm ${
                      progressStage === 'formatting' ? 'text-blue-400 font-semibold' :
                      'text-gray-500'
                    }`}>
                      Formatting Response
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Estimate */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Typical response time: 10-15 seconds
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;

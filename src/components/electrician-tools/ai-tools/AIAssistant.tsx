import { useState } from "react";
import { Sparkles, Loader, Search, BookOpen, Eye, EyeOff, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import RegulationSources from "./RegulationSources";
import DrillDownSection from "./DrillDownSection";

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [regulationsResult, setRegulationsResult] = useState("");
  const [practicalGuidanceResult, setPracticalGuidanceResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [useRAG, setUseRAG] = useState(true);
  const [ragRegulations, setRagRegulations] = useState<any[]>([]);
  const [searchMethod, setSearchMethod] = useState<string>("");
  const [hasInstallation, setHasInstallation] = useState(false);
  const [hasTesting, setHasTesting] = useState(false);
  const [hasDesign, setHasDesign] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  // Helper function to process content and format it properly
  const processContent = (content: string, colorTheme: 'blue' | 'purple' | 'green') => {
    if (!content) return null;
    
    // Convert literal \n strings to actual newlines
    const normalizedContent = content.replace(/\\n/g, '\n');
    
    // Split into paragraphs (double newlines = paragraph break)
    const paragraphs = normalizedContent.split(/\n\n+/);
    const elements: JSX.Element[] = [];
    
    paragraphs.forEach((paragraph, pIndex) => {
      const lines = paragraph.split('\n').filter(l => l.trim());
      let listItems: string[] = [];
      let listType: 'ordered' | 'bullet' | null = null;
      
      const flushList = () => {
        if (listItems.length > 0) {
          if (listType === 'ordered') {
            elements.push(
              <ol key={`list-${elements.length}`} className="list-decimal list-outside space-y-2.5 my-4 ml-6 pl-2">
                {listItems.map((item, idx) => (
                  <li key={idx} className="text-white leading-relaxed text-base">{item}</li>
                ))}
              </ol>
            );
          } else {
            elements.push(
              <ul key={`list-${elements.length}`} className="list-disc list-outside space-y-2.5 my-4 ml-6 pl-2">
                {listItems.map((item, idx) => (
                  <li key={idx} className="text-white leading-relaxed text-base">{item}</li>
                ))}
              </ul>
            );
          }
          listItems = [];
          listType = null;
        }
      };
      
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        // Detect regulation format (e.g., "701.512.2 - Description")
        const regulationMatch = trimmed.match(/^(\d{3}\.\d+(?:\.\d+)?)\s*-\s*(.+)/);
        if (regulationMatch) {
          flushList();
          const [, regNumber, regText] = regulationMatch;
          elements.push(
            <div key={`reg-${elements.length}`} className="mb-6 p-4 bg-neutral-800/40 rounded-lg border-l-4 border-purple-500/50">
              <div className="text-purple-400 font-bold text-lg mb-2">
                {regNumber}
              </div>
              <div className="text-white leading-relaxed text-base">
                {regText}
              </div>
            </div>
          );
          return;
        }
        
        // Detect numbered lists (1. 2. 3.)
        const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
        if (numberedMatch) {
          if (listType !== 'ordered') {
            flushList();
            listType = 'ordered';
          }
          listItems.push(numberedMatch[2]);
          return;
        }
        
        // Detect bullet points (- or •)
        const bulletMatch = trimmed.match(/^[-•]\s+(.+)/);
        if (bulletMatch) {
          if (listType !== 'bullet') {
            flushList();
            listType = 'bullet';
          }
          listItems.push(bulletMatch[1]);
          return;
        }
        
        // Regular text - if we have a list going, this line belongs to the paragraph
        if (listType) {
          flushList();
        }
      });
      
      flushList();
      
      // If no lists were found, render as paragraph
      if (lines.length > 0 && listItems.length === 0) {
        const paragraphText = lines.join(' ');
        if (paragraphText.trim()) {
          elements.push(
            <p key={`p-${pIndex}`} className="text-white leading-relaxed text-base mb-4">
              {paragraphText.trim()}
            </p>
          );
        }
      }
    });
    
    return elements;
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
    setAnalysisResult("");
    setRegulationsResult("");
    setPracticalGuidanceResult("");
    setRagRegulations([]);
    setSearchMethod("");
    
    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "structured_assistant",
          use_rag: useRAG
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the AI assistant');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Store RAG regulations and metadata
      if (data.rag_regulations) {
        setRagRegulations(data.rag_regulations);
      }
      
      if (data.rag_metadata) {
        setSearchMethod(data.rag_metadata.search_method || 'vector');
        setHasInstallation(data.rag_metadata.has_installation || false);
        setHasTesting(data.rag_metadata.has_testing || false);
        setHasDesign(data.rag_metadata.has_design || false);
        setCurrentQuery(prompt);
      }
      
      // Handle structured responses with three sections
      if (data.analysis && data.regulations && data.practical_guidance) {
        const analysisText = typeof data.analysis === 'string' ? data.analysis : 
          typeof data.analysis === 'object' ? Object.values(data.analysis).join('\n\n') : 
          String(data.analysis);
        
        const regulationsText = typeof data.regulations === 'string' ? data.regulations :
          typeof data.regulations === 'object' ? Object.values(data.regulations).join('\n\n') :
          String(data.regulations);
        
        const practicalText = typeof data.practical_guidance === 'string' ? data.practical_guidance :
          typeof data.practical_guidance === 'object' ? Object.values(data.practical_guidance).join('\n\n') :
          String(data.practical_guidance);
          
        setAnalysisResult(analysisText);
        setRegulationsResult(regulationsText);
        setPracticalGuidanceResult(practicalText);
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
    "IP rating requirements",
    "EV charging point requirements",
    "Maximum Zs for B32 MCB",
    "Special location requirements",
    "AFDD installation rules",
    "Voltage drop calculations",
    "Ring circuit testing procedure"
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
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
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600 max-w-6xl mx-auto">
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
                
                <div className="flex items-center justify-between p-3 bg-neutral-800/40 rounded-lg border border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-400" />
                    <Label htmlFor="use-rag" className="text-white text-sm cursor-pointer">
                      Search BS 7671 Database
                    </Label>
                  </div>
                  <Switch
                    id="use-rag"
                    checked={useRAG}
                    onCheckedChange={setUseRAG}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
                
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
                    className="border-neutral-600/50 text-gray-300 hover:bg-neutral-700/50 hover:border-neutral-500 h-auto py-2 sm:py-3 px-3 sm:px-4 text-left justify-start text-xs sm:text-sm whitespace-normal"
                    onClick={() => setPrompt(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RAG Sources */}
        {ragRegulations.length > 0 && !isLoading && showResults && (
          <div className="w-full max-w-7xl mx-auto">
            <RegulationSources regulations={ragRegulations} searchMethod={searchMethod} />
          </div>
        )}

        {/* Results - Vertical stack on mobile, grid on desktop */}
        {(analysisResult || regulationsResult || practicalGuidanceResult) && !isLoading && showResults && (
          <div className="w-full max-w-7xl mx-auto">
            {/* Mobile: Vertical Stack */}
            <div className="md:hidden flex flex-col gap-6">
              {analysisResult && (
                <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Search className="h-4 w-4 text-blue-400" />
                      </div>
                      Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm text-white leading-relaxed space-y-3">
                        {processContent(analysisResult, 'blue')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {regulationsResult && (
                <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-purple-400" />
                      </div>
                      Relevant Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm text-white leading-relaxed space-y-3">
                        {processContent(regulationsResult, 'purple')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {practicalGuidanceResult && (
                <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base flex items-center gap-2 text-white">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-green-400" />
                      </div>
                      Practical Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm text-white leading-relaxed space-y-3">
                        {processContent(practicalGuidanceResult, 'green')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Desktop: Vertical Layout */}
            <div className="hidden md:flex md:flex-col gap-6">
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
                        
                        // Process text without highlighting
                        let processedText = trimmed;
                        
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
                    <div className="text-xs sm:text-sm text-gray-300 leading-relaxed space-y-4">
                      {(() => {
                        // Fallback parsing: Auto-split regulations if AI didn't format correctly
                        let regulationsText = String(regulationsResult || '');
                        const hasProperDividers = regulationsText.includes('━━━');
                        
                        if (!hasProperDividers) {
                          // Auto-insert dividers and formatting for paragraph-style output
                          regulationsText = regulationsText.replace(
                            /(\n|^)(Regulation\s+\d{3}\.\d+(?:\.\d+)?)/gi,
                            '\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📖 $2'
                          );
                          
                          if (!regulationsText.startsWith('━━━')) {
                            regulationsText = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + regulationsText;
                          }
                        }
                        
                        return regulationsText.split('\n').map((line, index) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;

                          // Process the text to highlight BS numbers and regulations
                          let processedText = trimmed;
                          processedText = processedText.replace(/\b(BS\s*7671)[:\s]*/gi, '<span class="text-purple-400 font-bold">$1</span>');
                          processedText = processedText.replace(/\b(\d{3}\.\d+(?:\.\d+)?(?:\.\d+)?)/g, '<span class="text-purple-300 font-semibold font-mono">$1</span>');
                          processedText = processedText.replace(/\b(Zone\s+[0-2])\b/gi, '<span class="text-amber-300 font-semibold">$1</span>');
                          processedText = processedText.replace(/\b(IPX[0-9X])\b/gi, '<span class="text-green-400 font-semibold">$1</span>');
                          processedText = processedText.replace(/(\d+mm²)/g, '<span class="text-blue-400 font-semibold">$1</span>');

                          // Divider lines - more prominent spacing
                          if (trimmed.match(/^━+$/)) {
                            return <hr key={index} className="border-elec-yellow/30 my-6" />;
                          }

                          // Regulation header with emoji (📖 Regulation 701.512.2)
                          if (trimmed.match(/^📖\s*Regulation\s+\d{3}\.\d+/i)) {
                            return (
                              <div key={index} className="mt-6 mb-3">
                                <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg px-4 py-2.5">
                                  <h5 className="font-bold text-elec-yellow text-sm">
                                    <span dangerouslySetInnerHTML={{ __html: processedText }} />
                                  </h5>
                                </div>
                              </div>
                            );
                          }

                          // Section headers (Requirements:, Compliance:, etc.)
                          if (trimmed.match(/^(Requirements|Compliance|Notes|Key Points):/i)) {
                            return (
                              <div key={index} className="mt-4 mb-2">
                                <span className="text-elec-yellow/90 font-semibold text-xs uppercase tracking-wider" dangerouslySetInnerHTML={{ __html: processedText }} />
                              </div>
                            );
                          }

                          // Bullet points starting with •
                          if (trimmed.match(/^[•●▪]\s+/)) {
                            const bulletContent = trimmed.replace(/^[•●▪]\s+/, '');
                            const processedBullet = bulletContent
                              .replace(/\b(BS\s*7671)[:\s]*/gi, '<span class="text-purple-400 font-bold">$1</span>')
                              .replace(/\b(\d{3}\.\d+(?:\.\d+)?(?:\.\d+)?)/g, '<span class="text-purple-300 font-semibold font-mono">$1</span>')
                              .replace(/\b(Zone\s+[0-2])\b/gi, '<span class="text-amber-300 font-semibold">$1</span>')
                              .replace(/\b(IPX[0-9X])\b/gi, '<span class="text-green-400 font-semibold">$1</span>')
                              .replace(/(\d+mm²)/g, '<span class="text-blue-400 font-semibold">$1</span>');
                            
                            return (
                              <div key={index} className="flex items-start gap-3 my-2 ml-4">
                                <span className="text-elec-yellow mt-1 flex-shrink-0 text-sm">•</span>
                                <span className="text-gray-300 flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedBullet }} />
                              </div>
                            );
                          }

                          // Compliance/Warning notes with ⚠️
                          if (trimmed.match(/^⚠️/)) {
                            const warningText = processedText.replace(/^⚠️\s*/, '');
                            return (
                              <div key={index} className="my-4 p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded-r">
                                <div className="flex items-start gap-2">
                                  <span className="text-amber-400 text-base flex-shrink-0">⚠️</span>
                                  <span className="text-amber-200 text-sm font-medium flex-1" dangerouslySetInnerHTML={{ __html: warningText }} />
                                </div>
                              </div>
                            );
                          }

                          // Standalone regulation numbers (fallback for old format)
                          if (trimmed.match(/^Regulation\s+\d{3}\.\d+/i) && !trimmed.startsWith('📖')) {
                            return (
                              <div key={index} className="mt-6 mb-3">
                                <div className="inline-block bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg px-4 py-2.5">
                                  <h5 className="font-bold text-elec-yellow text-sm flex items-center gap-2">
                                    <span className="text-xs">📖</span>
                                    <span dangerouslySetInnerHTML={{ __html: processedText }} />
                                  </h5>
                                </div>
                              </div>
                            );
                          }

                          // Regular text paragraphs (regulation descriptions)
                          return (
                            <p key={index} className="text-gray-300 text-sm my-2 leading-relaxed ml-4" dangerouslySetInnerHTML={{ __html: processedText }} />
                          );
                        }).filter(Boolean);
                      })()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Practical Guidance Section */}
            {practicalGuidanceResult && (
              <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border border-neutral-600">
                <CardHeader className="p-3 sm:p-4">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Wrench className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    </div>
                    Practical Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap leading-relaxed space-y-3">
                      {String(practicalGuidanceResult || '').split('\n').map((line, index) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        
                        let processedText = trimmed;
                        
                        // Section headers
                        if (trimmed.match(/^(PRACTICAL|GUIDANCE|INSTALLATION|TESTING|PROCEDURE):?$/i)) {
                          return (
                            <div key={index} className="mt-4 mb-3 first:mt-0 pb-2 border-b border-green-400/20">
                              <h4 className="text-green-400 font-bold text-sm sm:text-base flex items-center gap-2">
                                <span className="text-lg">🔧</span>
                                <span>{trimmed}</span>
                              </h4>
                            </div>
                          );
                        }
                        
                        // Subsection headers
                        if (trimmed.endsWith(':') && trimmed.length < 60 && !trimmed.match(/^[\d\w\s]{1,3}:/)) {
                          return (
                            <div key={index} className="mt-3 mb-2">
                              <h5 className="font-semibold text-green-300 text-sm" dangerouslySetInnerHTML={{ __html: processedText }} />
                            </div>
                          );
                        }
                        
                        // Bullet points
                        if (trimmed.match(/^[-•]\s+/)) {
                          const bulletText = processedText.replace(/^[-•]\s+/, '');
                          return (
                            <div key={index} className="ml-4 mb-2 flex items-start gap-2">
                              <span className="text-green-400 text-sm mt-1">•</span>
                              <span className="text-gray-300 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: bulletText }} />
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
            
            {/* Drill-Down Sections */}
            {(hasInstallation || hasTesting || hasDesign) && (
              <div className="space-y-3 mt-6">
                <DrillDownSection 
                  type="installation" 
                  query={currentQuery}
                  available={hasInstallation}
                />
                <DrillDownSection 
                  type="testing" 
                  query={currentQuery}
                  available={hasTesting}
                />
                <DrillDownSection 
                  type="design" 
                  query={currentQuery}
                  available={hasDesign}
                />
              </div>
            )}
            </div>
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
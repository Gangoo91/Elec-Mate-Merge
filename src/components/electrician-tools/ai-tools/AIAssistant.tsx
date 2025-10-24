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

// Parser function for designer agent responses
const parseDesignerResponse = (response: string) => {
  const sections = {
    specification: '',
    calculations: '',
    compliance: '',
    practicalGuidance: ''
  };
  
  // Split response by main section headers
  const specMatch = response.match(/CIRCUIT SPECIFICATION([\s\S]*?)(?=CALCULATIONS|$)/i);
  const calcMatch = response.match(/CALCULATIONS([\s\S]*?)(?=COMPLIANCE|$)/i);
  const compMatch = response.match(/COMPLIANCE([\s\S]*?)(?=RELEVANT REGULATIONS|DESIGN GUIDANCE|$)/i);
  
  if (specMatch) sections.specification = specMatch[1].trim();
  if (calcMatch) sections.calculations = calcMatch[1].trim();
  if (compMatch) sections.compliance = compMatch[1].trim();
  
  // Generate practical guidance from circuit type
  const circuitTypeMatch = response.toLowerCase();
  let guidance = "**Installation Steps:**\n\n";
  
  if (circuitTypeMatch.includes('shower')) {
    guidance += "1. Install isolator switch visible from shower location\n";
    guidance += "2. Run cable via shortest safe route avoiding zones\n";
    guidance += "3. Connect to dedicated 30mA RCD protection\n";
    guidance += "4. Label circuit clearly at consumer unit\n\n";
    guidance += "**Testing Required:**\n";
    guidance += "- Continuity of protective conductors\n";
    guidance += "- Insulation resistance ≥1.0MΩ\n";
    guidance += "- Earth fault loop impedance\n";
    guidance += "- RCD operation (30mA trip time)";
  } else if (circuitTypeMatch.includes('cooker')) {
    guidance += "1. Install control unit with isolator within 2m\n";
    guidance += "2. Use heat-resistant cable for final connection\n";
    guidance += "3. Ensure adequate ventilation clearances\n";
    guidance += "4. Connect control unit load terminals correctly\n\n";
    guidance += "**Testing Required:**\n";
    guidance += "- Continuity checks on all conductors\n";
    guidance += "- Polarity verification\n";
    guidance += "- Insulation resistance test";
  } else {
    guidance += "1. Plan cable route avoiding buried depths <50mm\n";
    guidance += "2. Install in safe zones or use 30mA RCD\n";
    guidance += "3. Use appropriate cable clips/fixings\n";
    guidance += "4. Ensure all connections are mechanically sound\n\n";
    guidance += "**Testing Required:**\n";
    guidance += "- R1+R2 continuity test\n";
    guidance += "- Insulation resistance ≥1.0MΩ at 500V DC\n";
    guidance += "- Zs earth fault loop test";
  }
  
  return sections;
};

const AIAssistant = () => {
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [regulationsResult, setRegulationsResult] = useState("");
  const [practicalGuidanceResult, setPracticalGuidanceResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  // RAG search is always enabled
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
      const trimmedPara = paragraph.trim();
      
      // Detect section headers with **bold** markdown
      const headerMatch = trimmedPara.match(/^\*\*(.+?)\*\*$/);
      if (headerMatch) {
        elements.push(
          <h3 key={`header-${pIndex}`} className="text-xl font-bold text-elec-yellow mb-3 mt-6 first:mt-0 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-elec-yellow rounded"></div>
            {headerMatch[1]}
          </h3>
        );
        return;
      }
      
      const lines = paragraph.split('\n').filter(l => l.trim());
      let listItems: string[] = [];
      let listType: 'ordered' | 'bullet' | null = null;
      
      const flushList = () => {
        if (listItems.length > 0) {
          if (listType === 'ordered') {
            elements.push(
              <ol key={`list-${elements.length}`} className="list-decimal list-outside space-y-2 my-3 sm:my-4 ml-4 sm:ml-6 pl-2">
                {listItems.map((item, idx) => (
                  <li key={idx} className="text-white leading-loose text-sm sm:text-base">{item}</li>
                ))}
              </ol>
            );
          } else {
            elements.push(
              <ul key={`list-${elements.length}`} className="list-disc list-outside space-y-2 my-3 sm:my-4 ml-4 sm:ml-6 pl-2">
                {listItems.map((item, idx) => (
                  <li key={idx} className="text-white leading-loose text-sm sm:text-base">{item}</li>
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
        
        // Detect key-value pairs (e.g., "Load: 9200W")
        const kvMatch = trimmed.match(/^(.+?):\s*(.+)$/);
        if (kvMatch && !trimmed.includes('**')) {
          flushList();
          const [, key, value] = kvMatch;
          elements.push(
            <div key={`kv-${elements.length}`} className="mb-3 flex flex-col sm:flex-row sm:gap-3 sm:items-baseline">
              <span className="text-gray-300 font-medium text-sm sm:text-base mb-1 sm:mb-0 sm:min-w-[140px]">{key}:</span>
              <span className="text-white font-semibold text-base sm:text-lg">{value}</span>
            </div>
          );
          return;
        }
        
        // Detect regulation format (e.g., "Regulation 433.1 - Description")
        const regulationMatch = trimmed.match(/^Reg(?:ulation)?\s*(\d{3}(?:\.\d+)?(?:\.\d+)?)\s*-\s*(.+)/i);
        if (regulationMatch) {
          flushList();
          const [, regNumber, regText] = regulationMatch;
          elements.push(
            <div key={`reg-${elements.length}`} className="mb-3 sm:mb-4 p-3 sm:p-4 bg-purple-500/10 rounded-lg border-l-4 border-purple-500/60">
              <div className="inline-block px-2 sm:px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 font-bold text-xs sm:text-sm mb-2">
                Regulation {regNumber}
              </div>
              <div className="text-white leading-loose text-sm sm:text-base">
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
        
        // Detect compliance indicators (COMPLIANT, EXCEEDS, etc.)
        if (trimmed.match(/COMPLIANT|EXCEEDS|REVIEW REQUIRED/i)) {
          flushList();
          const isCompliant = trimmed.includes('COMPLIANT');
          const isExceeds = trimmed.includes('EXCEEDS');
          elements.push(
            <div key={`status-${elements.length}`} className={`mb-3 p-3 rounded-lg border-l-4 ${
              isCompliant ? 'bg-green-500/10 border-green-500/60' : 
              isExceeds ? 'bg-amber-500/10 border-amber-500/60' : 
              'bg-blue-500/10 border-blue-500/60'
            }`}>
              <span className={`font-semibold ${
                isCompliant ? 'text-green-400' : 
                isExceeds ? 'text-amber-400' : 
                'text-blue-400'
              }`}>{trimmed}</span>
            </div>
          );
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
            <p key={`p-${pIndex}`} className="text-white leading-loose text-sm sm:text-base mb-3 sm:mb-4">
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
      // All queries go to electrician-ai-assistant with RAG enabled
      const assistantResponse = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: prompt,
          type: "structured_assistant",
          use_rag: true  // Always enable RAG for regulation/design queries
        },
      });

      const { data, error } = assistantResponse;

      // Enhanced error handling
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
        // Check for specific error codes from edge function
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
      
      // NEW: Handle direct regulation lookups (no AI processing)
      if (data.lookup_mode && data.regulations) {
        const regText = data.regulations.map((reg: any) => 
          `**${reg.regulation_number}** - ${reg.section}\n\n${reg.content}\n\n${reg.amendment ? `_Amendment: ${reg.amendment}_` : ''}`
        ).join('\n\n---\n\n');
        
        setAnalysisResult(data.message || 'Regulation Lookup Results');
        setRegulationsResult(regText);
        setPracticalGuidanceResult('For detailed interpretation and application guidance, try asking: "Explain [regulation number]" or "How does [regulation number] apply to [your situation]?"');
        
        toast({
          title: "Regulations Retrieved",
          description: `Found ${data.regulations.length} regulation(s)`,
        });
      }
      // Handle designer agent response
      else if (data.response && data.structuredData) {
        const parsed = parseDesignerResponse(data.response);
        
        // Combine specification and calculations for Analysis box
        const analysisContent = `**Circuit Specification**\n\n${parsed.specification}\n\n**Calculations & Sizing**\n\n${parsed.calculations}`;
        setAnalysisResult(analysisContent);
        
        // Extract regulations for Regulations box
        setRegulationsResult(parsed.compliance);
        
        // Set practical guidance
        setPracticalGuidanceResult(parsed.practicalGuidance);
      }
      // Handle structured responses with three sections from inspector
      else if (data.analysis && data.regulations && data.practical_guidance) {
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
    "Cable sizing for 32A ring circuit",
    "Earth fault loop impedance testing procedure"
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-elec-yellow/30 to-yellow-500/30 rounded-xl border border-elec-yellow/30">
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Intelligent Search
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ask questions about BS7671 electrical regulations in plain English. Get instant answers with relevant
            regulations, practical guidance, and safety tips.
          </p>
        </div>

        {/* AI Search Interface Component */}
        <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20 max-w-6xl mx-auto">
          <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* Input Area */}
              <div className="space-y-3 sm:space-y-4">
                <Textarea
                  placeholder="e.g. 'What are the RCD requirements for bathrooms?' or 'Cable sizing for 32A ring circuit'"
                  className="min-h-[180px] sm:min-h-[200px] bg-neutral-700/50 border-2 border-elec-yellow/40 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 text-white placeholder:text-gray-400 resize-none text-base sm:text-lg font-medium rounded-2xl p-5 sm:p-6 leading-relaxed transition-all duration-200"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                
                <div className="flex gap-3 sm:gap-4">
                <Button 
                  className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold py-3 sm:py-4 h-12 sm:h-14 text-base sm:text-lg transition-all duration-200 hover:scale-102" 
                  onClick={handleAIQuery} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 sm:h-6 sm:w-6 mr-2 animate-spin" /> 
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                      Search
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-elec-yellow/30 text-gray-300 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 px-5 sm:px-7 h-12 sm:h-14 text-base sm:text-lg transition-all duration-200"
                  onClick={() => setShowResults(!showResults)}
                >
                  {showResults ? <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" /> : <Eye className="h-5 w-5 sm:h-6 sm:w-6" />}
                  <span className="hidden sm:inline ml-2">
                    {showResults ? 'Hide' : 'Show'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="p-6 sm:p-8 bg-elec-yellow/10 rounded-2xl border-2 border-elec-yellow/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-elec-yellow/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold text-base sm:text-lg">AI Assistant is thinking...</span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <Skeleton className="h-5 sm:h-6 w-full bg-neutral-700/50" />
                  <Skeleton className="h-5 sm:h-6 w-3/4 bg-neutral-700/50" />
                  <Skeleton className="h-5 sm:h-6 w-5/6 bg-neutral-700/50" />
                </div>
              </div>
            )}

            {/* Quick Examples Section */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                {exampleQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-2 border-elec-yellow/30 text-gray-300 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 h-auto py-2.5 sm:py-3 px-3 sm:px-4 text-left justify-start text-xs sm:text-sm whitespace-normal transition-all duration-200"
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
                <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
                  <CardHeader className="p-5">
                    <CardTitle className="text-lg flex items-center gap-3 text-white font-bold">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Search className="h-5 w-5 text-blue-400" />
                      </div>
                      Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm sm:text-base text-white leading-loose space-y-3 sm:space-y-4">
                        {processContent(analysisResult, 'blue')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {regulationsResult && (
                <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
                  <CardHeader className="p-5">
                    <CardTitle className="text-lg flex items-center gap-3 text-white font-bold">
                      <div className="w-10 h-10 bg-elec-yellow/20 rounded-xl flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-elec-yellow" />
                      </div>
                      Relevant Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm sm:text-base text-white leading-loose space-y-3 sm:space-y-4">
                        {processContent(regulationsResult, 'purple')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {practicalGuidanceResult && (
                <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
                  <CardHeader className="p-5">
                    <CardTitle className="text-lg flex items-center gap-3 text-white font-bold">
                      <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-green-400" />
                      </div>
                      Practical Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-sm sm:text-base text-white leading-loose space-y-3 sm:space-y-4">
                        {processContent(practicalGuidanceResult, 'green')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Desktop: Vertical Layout */}
            <div className="hidden md:flex md:flex-col gap-8">
              {/* Analysis Section */}
              {analysisResult && (
              <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-4 text-white font-bold">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Search className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                    </div>
                    Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 pt-0">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-base sm:text-lg text-gray-300 whitespace-pre-wrap leading-relaxed space-y-4">
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
              <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-4 text-white font-bold">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-elec-yellow/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                    </div>
                    Relevant Regulations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 pt-0">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-base sm:text-lg text-gray-300 leading-relaxed space-y-5">
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
              <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-4 text-white font-bold">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                    </div>
                    Practical Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 pt-0">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-base sm:text-lg text-gray-300 whitespace-pre-wrap leading-relaxed space-y-4">
                      {String(practicalGuidanceResult || '').split('\n').map((line, index) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        
                        let processedText = trimmed;
                        
                         // Section headers
                        if (trimmed.match(/^(PRACTICAL|GUIDANCE|INSTALLATION|TESTING|PROCEDURE):?$/i)) {
                          return (
                            <div key={index} className="mt-6 mb-4 first:mt-0 pb-3 border-b border-green-400/20">
                              <h4 className="text-green-400 font-bold text-lg sm:text-xl flex items-center gap-3">
                                <span className="text-xl">🔧</span>
                                <span>{trimmed}</span>
                              </h4>
                            </div>
                          );
                        }
                        
                        // Subsection headers
                        if (trimmed.endsWith(':') && trimmed.length < 60 && !trimmed.match(/^[\d\w\s]{1,3}:/)) {
                          return (
                            <div key={index} className="mt-4 mb-3">
                              <h5 className="font-semibold text-green-300 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: processedText }} />
                            </div>
                          );
                        }
                        
                        // Bullet points
                        if (trimmed.match(/^[-•]\s+/)) {
                          const bulletText = processedText.replace(/^[-•]\s+/, '');
                          return (
                            <div key={index} className="ml-5 mb-3 flex items-start gap-3">
                              <span className="text-green-400 text-lg mt-1">•</span>
                              <span className="text-gray-300 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: bulletText }} />
                            </div>
                          );
                        }
                        
                        // Regular paragraphs
                        return (
                          <p key={index} className="text-gray-300 text-base sm:text-lg my-3" dangerouslySetInnerHTML={{ __html: processedText }} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mt-12 sm:mt-16">
          <Card className="bg-gradient-to-r from-neutral-800/50 to-neutral-700/50 border-2 border-elec-yellow/20">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 bg-elec-yellow/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-white text-base sm:text-lg">Instant Answers</h3>
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
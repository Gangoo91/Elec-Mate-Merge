import { useState } from "react";
import { Zap, Loader, Copy, Check, Brain, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CircuitDesigner = () => {
  const [designPrompt, setDesignPrompt] = useState("");
  const [designResults, setDesignResults] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Clean text formatting completely 
  const cleanText = (text: string) => {
    return text
      // Remove LaTeX formatting
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\\\/g, '')
      .replace(/\$([^$]+)\$/g, '$1')
      // Remove markdown formatting
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Remove hash symbols and bullet points
      .replace(/^[#\-•*]+\s*/gm, '')
      .replace(/^\d+\.\s*/gm, '')
      // Clean up multiple spaces and line breaks
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  };

  // Parse response into clean sections
  const parseAnalysisResults = (response: string) => {
    const cleanResponse = cleanText(response);
    const sections = [];
    
    // Split by section headers
    const sectionRegex = /(OVERVIEW|RECOMMENDATION|COMPLIANCE|PRACTICAL GUIDANCE)[\s:]*(.+?)(?=(?:OVERVIEW|RECOMMENDATION|COMPLIANCE|PRACTICAL GUIDANCE)|$)/gis;
    const matches = [...cleanResponse.matchAll(sectionRegex)];
    
    if (matches.length > 0) {
      matches.forEach(match => {
        const title = match[1].trim();
        const content = cleanText(match[2]).replace(/^\s*:?\s*/, '');
        
        if (content) {
          sections.push({
            title,
            content,
            type: title.toLowerCase().includes('compliance') ? 'compliance' :
                  title.toLowerCase().includes('overview') ? 'overview' :
                  title.toLowerCase().includes('recommendation') ? 'recommendation' :
                  'guidance'
          });
        }
      });
    } else {
      // Fallback if no sections detected
      sections.push({
        title: 'Analysis',
        content: cleanResponse,
        type: 'overview'
      });
    }
    
    return sections;
  };

  const handleGenerateAnalysis = async () => {
    if (designPrompt.trim() === "") {
      toast({
        title: "Empty Specification",
        description: "Please enter circuit requirements first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setDesignResults("");

    try {
      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: designPrompt,
          type: "circuit_summary"
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Circuit Analyser');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      setDesignResults(data.response || "");
      
      toast({
        title: "Analysis Complete",
        description: "Your circuit analysis report has been generated.",
      });
    } catch (error) {
      console.error('Circuit Analysis Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate circuit analysis",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReport = async () => {
    if (designResults) {
      try {
        await navigator.clipboard.writeText(designResults);
        setCopied(true);
        toast({
          title: "Report Copied",
          description: "Circuit analysis report copied to clipboard.",
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Could not copy report to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const examplePrompts = [
    "9.5kW electric shower, 18m cable run, loft space",
    "32A cooker circuit, 12m run, kitchen installation", 
    "EV charger 7.4kW, 25m garage run, outdoor cable"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/80 to-elec-card/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-elec-yellow/10 to-transparent">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Brain className="h-6 w-6 text-elec-yellow" />
            </div>
            Circuit Analyser
          </CardTitle>
          <CardDescription className="text-elec-light/70 text-base">
            Professional circuit analysis with BS 7671 compliance and practical guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* At a glance info */}
          <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium text-elec-light">Professional Analysis</span>
            </div>
            <p className="text-sm text-elec-light/70">
              Get comprehensive circuit analysis with clear recommendations, compliance explanations, and practical installation guidance
            </p>
          </div>

          {/* Example prompts */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-light">Common scenarios:</h4>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-elec-yellow/30 text-elec-light/80 hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                  onClick={() => setDesignPrompt(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your circuit requirements... e.g., I need to design a circuit for a 9.5kW electric shower. The cable run is 18 metres from the consumer unit through a loft space. What are my options?"
              className="min-h-[120px] bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/40 text-elec-light placeholder:text-elec-light/50 resize-none"
              value={designPrompt}
              onChange={(e) => setDesignPrompt(e.target.value)}
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-elec-yellow to-elec-yellow/80 hover:from-elec-yellow/90 hover:to-elec-yellow/70 text-elec-dark font-semibold py-3 shadow-lg shadow-elec-yellow/20" 
              onClick={handleGenerateAnalysis} 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                  Analysing Circuit...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 mr-2" />
                  Analyse Circuit
                </>
              )}
            </Button>
          </div>

          {/* Loading state */}
          {isGenerating && (
            <div className="mt-6 p-6 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-elec-yellow animate-pulse" />
                </div>
                <div className="text-elec-light font-medium">Generating Professional Analysis...</div>
              </div>
              <div className="space-y-2 text-sm text-elec-light/60">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full animate-pulse"></div>
                  <span>Calculating load requirements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full animate-pulse delay-100"></div>
                  <span>Checking BS 7671 compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-elec-yellow rounded-full animate-pulse delay-200"></div>
                  <span>Preparing recommendations</span>
                </div>
              </div>
            </div>
          )}

          {/* Analysis results */}
          {designResults && !isGenerating && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold text-elec-yellow">Circuit Analysis Report</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyReport}
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied' : 'Copy Report'}
                </Button>
              </div>

              <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card/60 to-elec-dark/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {parseAnalysisResults(designResults).map((section, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className={`text-lg font-semibold ${
                          section.type === 'compliance' ? 'text-green-400' :
                          section.type === 'recommendation' ? 'text-elec-yellow' :
                          section.type === 'overview' ? 'text-blue-400' :
                          'text-purple-400'
                        }`}>
                          {section.title}
                        </h4>
                        <div className={`p-4 rounded-lg border-l-4 ${
                          section.type === 'compliance' ? 'bg-green-500/5 border-l-green-500' :
                          section.type === 'recommendation' ? 'bg-elec-yellow/5 border-l-elec-yellow' :
                          section.type === 'overview' ? 'bg-blue-500/5 border-l-blue-500' :
                          'bg-purple-500/5 border-l-purple-500'
                        }`}>
                          <p className="text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitDesigner;
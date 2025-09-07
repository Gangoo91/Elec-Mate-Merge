
import { useState } from "react";
import { Zap, Loader, Calculator, Settings, Lightbulb, CheckCircle, AlertTriangle, Shield, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const CircuitDesigner = () => {
  const [designPrompt, setDesignPrompt] = useState("");
  const [designResults, setDesignResults] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Clean text formatting (remove LaTeX, markdown, etc.)
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
      // Remove hash symbols and dashes at start
      .replace(/^[#\-•*]+\s*/, '')
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Parse the response into structured sections
  const parseDesignResults = (response: string) => {
    const sections = [];
    const lines = response.split('\n').filter(line => line.trim());
    
    let currentSection = null;
    let currentContent = [];
    
    for (const line of lines) {
      const cleanLine = cleanText(line);
      
      if (cleanLine.match(/^(CIRCUIT DESIGN|CABLE SPECIFICATION|PROTECTION DEVICES|EARTHING REQUIREMENTS|CALCULATIONS|COMPLIANCE|AT A GLANCE|SUMMARY):/i) ||
          cleanLine.match(/^(Circuit Design|Cable Specification|Protection Devices|Earthing Requirements|Calculations|Compliance|Summary)$/i)) {
        
        if (currentSection) {
          sections.push({ ...currentSection, content: currentContent });
        }
        
        currentSection = {
          title: cleanLine.replace(':', ''),
          type: cleanLine.toLowerCase().includes('compliance') ? 'compliance' :
                cleanLine.toLowerCase().includes('summary') || cleanLine.toLowerCase().includes('at a glance') ? 'summary' :
                'normal'
        };
        currentContent = [];
      } else if (cleanLine && currentSection) {
        currentContent.push(cleanLine);
      } else if (cleanLine && !currentSection) {
        // Handle content before any section headers
        if (!sections.find(s => s.title === 'Overview')) {
          sections.push({
            title: 'Overview',
            type: 'summary',
            content: [cleanLine]
          });
        } else {
          sections[0].content.push(cleanLine);
        }
      }
    }
    
    if (currentSection) {
      sections.push({ ...currentSection, content: currentContent });
    }
    
    return sections;
  };

  const handleGenerateDesign = async () => {
    if (designPrompt.trim() === "") {
      toast({
        title: "Empty Design Specification",
        description: "Please enter circuit design requirements first.",
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
          type: "circuit"
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the Circuit Designer');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      setDesignResults(data.response || "");
      
      toast({
        title: "Design Generated",
        description: "Your circuit design specifications have been generated.",
      });
    } catch (error) {
      console.error('Circuit Design Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate circuit design",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const exampleDesigns = [
    "9.5kW electric shower, 18m cable run, loft space",
    "32A cooker circuit, 12m run, kitchen installation",
    "EV charger 7.4kW, 25m garage run, outdoor cable"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray/80 to-elec-card/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            Circuit Designer
          </CardTitle>
          <CardDescription className="text-elec-light/70 text-base">
            Generate circuit designs, cable sizing, and load calculations to BS 7671 standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="font-medium text-elec-light">Load Calculations</span>
              </div>
              <p className="text-sm text-elec-light/70">Precise electrical load calculations</p>
            </div>
            <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-elec-yellow" />
                <span className="font-medium text-elec-light">Cable Sizing</span>
              </div>
              <p className="text-sm text-elec-light/70">Optimal cable selection and sizing</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-green-400" />
                <span className="font-medium text-elec-light">Protection</span>
              </div>
              <p className="text-sm text-elec-light/70">RCD and MCB recommendations</p>
            </div>
          </div>

          {/* Design Tips */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Design Requirements to Include:</h4>
                <div className="text-sm text-elec-light/80 space-y-1">
                  <p>• Load details (power rating, current, voltage)</p>
                  <p>• Cable run distance and installation method</p>
                  <p>• Environmental conditions (temperature, location)</p>
                  <p>• Special requirements (isolation, emergency switching)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example Designs */}
          <div className="space-y-3">
            <h4 className="font-medium text-elec-light">Common design scenarios:</h4>
            <div className="flex flex-wrap gap-2">
              {exampleDesigns.map((design, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-purple-400/30 text-elec-light/80 hover:bg-purple-400/10 hover:border-purple-400/50"
                  onClick={() => setDesignPrompt(design)}
                >
                  {design}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <Textarea
              placeholder="e.g., I need to design a circuit for a 9.5kW electric shower. The cable run is 18 metres from the consumer unit through a loft space (ambient temp 45°C in summer). What cable, protection devices, and earthing requirements do I need?"
              className="min-h-[140px] bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/40 text-elec-light placeholder:text-elec-light/50 resize-none"
              value={designPrompt}
              onChange={(e) => setDesignPrompt(e.target.value)}
            />
            
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-500/90 hover:to-purple-600/90 text-white font-semibold py-3 shadow-lg shadow-purple-500/20" 
              onClick={handleGenerateDesign} 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                  Generating Design...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Circuit Design
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          {isGenerating && (
            <div className="mt-6 p-6 bg-elec-dark/30 rounded-lg border border-purple-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          )}

          {/* Design Results */}
          {designResults && !isGenerating && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-purple-400">Circuit Design Analysis</h3>
              </div>

              {parseDesignResults(designResults).map((section, index) => (
                <Card key={index} className={`border-l-4 ${
                  section.type === 'compliance' ? 'border-l-green-500 bg-green-500/5 border-green-500/20' :
                  section.type === 'summary' ? 'border-l-purple-500 bg-purple-500/5 border-purple-500/20' :
                  'border-l-elec-yellow bg-elec-yellow/5 border-elec-yellow/20'
                }`}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-lg flex items-center gap-3 ${
                      section.type === 'compliance' ? 'text-green-400' :
                      section.type === 'summary' ? 'text-purple-400' :
                      'text-elec-yellow'
                    }`}>
                      {section.type === 'compliance' && <Shield className="h-5 w-5" />}
                      {section.type === 'summary' && <Info className="h-5 w-5" />}
                      {section.type === 'normal' && <Settings className="h-5 w-5" />}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.content.map((item, itemIndex) => {
                        // Check if this looks like a compliance statement
                        const isCompliant = item.toLowerCase().includes('compliant') || 
                                          item.toLowerCase().includes('meets') ||
                                          item.toLowerCase().includes('satisfies');
                        const isWarning = item.toLowerCase().includes('exceed') || 
                                        item.toLowerCase().includes('warning') ||
                                        item.toLowerCase().includes('consider');
                        
                        return (
                          <div key={itemIndex} className={`p-3 rounded-lg ${
                            section.type === 'summary' ? 'bg-purple-500/10' :
                            isCompliant ? 'bg-green-500/10' :
                            isWarning ? 'bg-amber-500/10' :
                            'bg-muted/30'
                          }`}>
                            <div className="flex items-start gap-3">
                              {section.type === 'compliance' && (
                                isCompliant ? 
                                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" /> :
                                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              )}
                               <p className={`text-sm leading-relaxed ${
                                section.type === 'compliance' ? 
                                  (isCompliant ? 'text-green-200' : 'text-amber-200') :
                                'text-elec-light/90'
                              }`}>
                                {cleanText(item)}
                              </p>
                            </div>
                            
                            {/* Add regulation reference if this looks like a regulation */}
                            {item.match(/BS\s*7671|IET|regulation|regulation\s*\d+/i) && (
                              <div className="mt-2 pt-2 border-t border-current/20">
                                <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                                  BS 7671 Reference
                                </Badge>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Practical Guidance Footer */}
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-400 mb-2">Practical Guidance</h4>
                      <p className="text-sm text-amber-200/80">
                        Always verify calculations with manufacturer specifications and consider site-specific conditions. 
                        Ensure all work complies with current BS 7671 regulations and local building regulations.
                      </p>
                    </div>
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

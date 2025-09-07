import { useState } from "react";
import { Zap, Loader, Copy, Eye, EyeOff, ArrowLeft, ChevronDown, ChevronUp, Home, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const CircuitDesigner = () => {
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [hasExistingSupply, setHasExistingSupply] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    examples: false,
    guidance: false
  });

  const handleCircuitAnalysis = async () => {
    if (prompt.trim() === "") {
      toast({
        title: "Empty Description",
        description: "Please enter a circuit description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setAnalysisResult("");
    
    try {
      const enhancedPrompt = `Circuit Design Request: ${prompt}

Supply Context: ${hasExistingSupply ? 'There is an existing electrical supply available' : 'This is a new installation requiring a new supply from the main distribution board'}

Please provide a comprehensive response in the following format:

## CIRCUIT DESIGN OVERVIEW
Brief summary of the circuit requirements and approach

## SUPPLY ARRANGEMENT
${hasExistingSupply ? 
  '• Utilising existing supply - describe connection method\n• Required isolation and protection upgrades if needed' : 
  '• New sub-main cable run from main DB\n• Sub-distribution board requirements\n• Earthing and bonding considerations'}

## CABLE SIZING & PROTECTION
• Design current calculations
• Cable size selection with derating factors
• Protective device ratings
• Voltage drop calculations
• Earth fault loop impedance

## MATERIALS CHECKLIST
### Cables & Wiring
• [Specific cable types, sizes, and lengths]
• [Earth cables and protective conductors]

### Distribution & Protection
• [Consumer units, MCBs, RCDs, isolators]
• [Enclosures and mounting hardware]

### Installation Hardware
• [Cable cleats and clips - specific quantities]
• [Cable glands and entries - sizes and types]
• [Cable ties and management systems]
• [Conduit/trunking if required]

### Testing & Certification
• [Test equipment requirements]
• [Certification and documentation needed]

## INSTALLATION GUIDANCE
• Step-by-step installation sequence
• Key safety considerations
• Testing and commissioning procedures
• Common pitfalls to avoid

## BS 7671 COMPLIANCE
• Relevant regulation references
• Special location requirements if applicable
• Documentation requirements

Please provide exhaustive detail for materials - include everything from the smallest cable tie to major components.`;

      const { data, error } = await supabase.functions.invoke('electrician-ai-assistant', {
        body: { 
          prompt: enhancedPrompt,
          type: "circuit_summary" 
        },
      });
      
      if (error) {
        throw new Error(error.message || 'Error connecting to the circuit analyser');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setAnalysisResult(data.response || "No analysis result received");
      
      toast({
        title: "Analysis Complete",
        description: "Circuit analysis has been generated successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error('Circuit Analysis Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyse circuit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(analysisResult);
      toast({
        title: "Copied!",
        description: "Report copied to clipboard successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please select and copy manually.",
        variant: "destructive",
      });
    }
  };

  const exampleScenarios = [
    {
      title: "Garden Shed Supply",
      description: "Workshop with sockets, lighting & machinery",
      icon: Building2,
      prompt: "Garden shed workshop requiring sockets, LED lighting, and 16A single-phase machinery supply. Shed is 25m from house."
    },
    {
      title: "Kitchen Ring Circuit", 
      description: "Induction hob, oven & appliances",
      icon: Home,
      prompt: "Kitchen ring circuit for induction hob, built-in oven, dishwasher, and general sockets. New build property."
    },
    {
      title: "Electric Shower",
      description: "9.5kW shower installation",
      icon: Zap,
      prompt: "9.5kW electric shower installation in first-floor bathroom. Cable run 18m through loft space."
    },
    {
      title: "EV Charging Point",
      description: "7kW home charging station",
      icon: Zap,
      prompt: "7kW EV charging point in garage. Requires dedicated circuit from main consumer unit, 12m cable run."
    },
    {
      title: "Home Office",
      description: "UPS, servers & high-load IT equipment",
      icon: Building2,
      prompt: "Home office conversion requiring UPS system, server rack, and multiple high-spec workstations."
    },
    {
      title: "Garage Workshop",
      description: "Three-phase machinery & welding",
      icon: Building2,
      prompt: "Garage workshop conversion with three-phase supply for machinery, welding equipment, and general power."
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">

        {/* Hero Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 rounded-2xl border border-yellow-400/30">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
            Circuit Design
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            Professional circuit design with comprehensive materials lists and practical installation guidance.
          </p>
        </div>

        {/* Supply Context Toggle */}
        <Card className="bg-elec-grey border border-elec-yellow/20 max-w-5xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="supply-toggle" className="text-white font-medium">
                  Outbuilding/Remote Location Supply
                </Label>
                <p className="text-gray-400 text-sm">
                  Toggle if this installation is for an outbuilding (shed, garage, etc.)
                </p>
              </div>
              <Switch
                id="supply-toggle"
                checked={hasExistingSupply}
                onCheckedChange={setHasExistingSupply}
                className="data-[state=checked]:bg-elec-yellow"
              />
            </div>
            {hasExistingSupply && (
              <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  ✓ Will provide guidance for utilising existing supply with local distribution
                </p>
              </div>
            )}
            {!hasExistingSupply && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-300 text-sm">
                  ➤ Will include new sub-main installation from main distribution board
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Circuit Design Interface */}
        <Card className="bg-elec-grey border border-elec-yellow/20 max-w-5xl mx-auto">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
              <CardTitle className="text-lg sm:text-xl text-white">Circuit Design</CardTitle>
            </div>
            <CardDescription className="text-gray-300 text-sm sm:text-base">
              Describe your circuit requirements for comprehensive design with materials list:
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
            {/* Input Area */}
            <div className="space-y-3 sm:space-y-4">
              <Textarea
                placeholder="e.g. 'Garden shed workshop requiring sockets, LED lighting, and 16A single-phase machinery supply. Shed is 25m from house.'"
                className="min-h-[80px] sm:min-h-[100px] bg-elec-dark border-elec-yellow/30 focus:border-elec-yellow text-white placeholder:text-gray-400 resize-none text-sm sm:text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="flex gap-2 sm:gap-3">
                <Button 
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base" 
                  onClick={handleCircuitAnalysis} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" /> 
                      Designing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Design Circuit
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 px-4 sm:px-6 h-10 sm:h-12 text-sm sm:text-base"
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
              <div className="p-4 sm:p-6 bg-elec-dark rounded-lg border border-elec-yellow/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">Designing your circuit...</span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Skeleton className="h-3 sm:h-4 w-full bg-elec-dark" />
                  <Skeleton className="h-3 sm:h-4 w-3/4 bg-elec-dark" />
                  <Skeleton className="h-3 sm:h-4 w-5/6 bg-elec-dark" />
                </div>
              </div>
            )}
            
            {/* Quick Scenarios Section */}
            <Collapsible open={expandedSections.examples} onOpenChange={() => toggleSection('examples')}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-0 h-auto text-left hover:bg-transparent"
                >
                  <h4 className="font-medium text-gray-300 text-sm sm:text-base">Common Design Scenarios</h4>
                  {expandedSections.examples ? 
                    <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  }
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                <div className="grid grid-cols-1 gap-3">
                  {exampleScenarios.map((scenario, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full border-elec-yellow/30 text-left hover:bg-elec-yellow/20 hover:border-elec-yellow/50 h-auto p-4"
                      onClick={() => setPrompt(scenario.prompt)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <scenario.icon className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-white text-sm mb-1">{scenario.title}</h5>
                          <p className="text-gray-400 text-xs">{scenario.description}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysisResult && !isLoading && showResults && (
          <div className="max-w-5xl mx-auto">
            <Card className="bg-elec-grey border border-elec-yellow/20">
              <CardHeader className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2 sm:gap-3 text-white">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                    </div>
                    Circuit Design Report
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300">
                  <ReactMarkdown 
                    components={{
                      h1: ({children}) => <h1 className="text-yellow-400 font-bold text-lg sm:text-xl mb-3 mt-4 first:mt-0">{children}</h1>,
                      h2: ({children}) => <h2 className="text-yellow-400 font-bold text-base sm:text-lg mb-2 mt-4 first:mt-0">{children}</h2>,
                      h3: ({children}) => <h3 className="text-yellow-300 font-semibold text-sm sm:text-base mb-2 mt-3">{children}</h3>,
                      p: ({children}) => <p className="text-gray-300 mb-2 leading-relaxed">{children}</p>,
                      ul: ({children}) => <ul className="text-gray-300 mb-3 ml-4">{children}</ul>,
                      ol: ({children}) => <ol className="text-gray-300 mb-3 ml-4">{children}</ol>,
                      li: ({children}) => <li className="mb-1 leading-relaxed">{children}</li>,
                      strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                      em: ({children}) => <em className="text-yellow-300">{children}</em>,
                      code: ({children}) => <code className="bg-elec-dark px-1 py-0.5 rounded text-yellow-300 text-sm">{children}</code>,
                    }}
                  >
                    {analysisResult}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Guidance Section */}
        <Collapsible open={expandedSections.guidance} onOpenChange={() => toggleSection('guidance')}>
          <Card className="bg-elec-grey border border-elec-yellow/20 max-w-5xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-0 h-auto text-left hover:bg-transparent"
                >
                  <CardTitle className="text-lg sm:text-xl text-white">What You'll Get</CardTitle>
                  {expandedSections.guidance ? 
                    <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </Button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap className="h-4 w-4 text-yellow-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1">Circuit Calculations</h3>
                        <p className="text-gray-300 text-xs">
                          Cable sizing, voltage drop, protection ratings, and earth fault loop impedance
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Building2 className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1">Complete Materials List</h3>
                        <p className="text-gray-300 text-xs">
                          Every component from cables to cable ties, with specific quantities and sizes
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Copy className="h-4 w-4 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1">BS 7671 Compliance</h3>
                        <p className="text-gray-300 text-xs">
                          Regulation references and compliance guidance for 18th edition
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Eye className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm mb-1">Installation Steps</h3>
                        <p className="text-gray-300 text-xs">
                          Step-by-step guidance with safety considerations and testing procedures
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
};

export default CircuitDesigner;
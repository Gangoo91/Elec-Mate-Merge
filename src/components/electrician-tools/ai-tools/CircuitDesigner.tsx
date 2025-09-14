import { useState } from "react";
import { Zap, Loader, Copy, Eye, EyeOff, ChevronDown, ChevronUp, Home, Building2, Download, Share2, Clock, CheckCircle2, Sparkles, FileText, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";

const CircuitDesigner = () => {
  const [prompt, setPrompt] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(30);
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
    setProgress(0);
    setEstimatedTime(30);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
      setEstimatedTime(prev => Math.max(0, prev - 2));
    }, 1000);
    
    try {
      const enhancedPrompt = `Circuit Design Request: ${prompt}

Before providing your response, first determine: Does this sound like an outbuilding/remote location (shed, garage, workshop, etc.) or a standard domestic circuit? If outbuilding, assume there's an existing adequate supply unless specifically stated otherwise.

Please provide a comprehensive response in the following format:

## CIRCUIT DESIGN OVERVIEW
Brief summary of the circuit requirements and approach

## SUPPLY ARRANGEMENT
Based on your assessment of the installation type:
• If outbuilding: utilising existing supply or new sub-main as appropriate
• If standard domestic: connection from existing consumer unit
• Include isolation, protection, and earthing requirements

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
      setProgress(100);
      
      clearInterval(progressInterval);
      
      toast({
        title: "Analysis Complete",
        description: "Circuit analysis has been generated successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error('Circuit Analysis Error:', error);
      clearInterval(progressInterval);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyse circuit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">

        {/* Enhanced Hero Section */}
        <div className="text-center space-y-6 py-8 sm:py-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10 rounded-full blur-3xl w-32 h-32 mx-auto"></div>
            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/20 rounded-3xl border border-elec-yellow/40 backdrop-blur-sm">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-elec-yellow to-white bg-clip-text text-transparent">
              Circuit Design AI
            </h1>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Professional circuit design with comprehensive materials lists, BS 7671 compliance, and practical installation guidance
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
              <Calculator className="w-3 h-3 mr-1" />
              Precise Calculations
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <FileText className="w-3 h-3 mr-1" />
              Materials Lists
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              BS 7671 Compliant
            </Badge>
          </div>
        </div>

        {/* Enhanced Design Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-elec-grey/80 to-elec-grey/60 border border-elec-yellow/20 backdrop-blur-sm shadow-2xl">
            <CardHeader className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/20 rounded-xl flex items-center justify-center border border-elec-yellow/40">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-white font-semibold">Design Your Circuit</CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    Describe your electrical requirements and get comprehensive design documentation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 sm:p-8 pt-0 space-y-6">
              {/* Enhanced Input Area */}
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Describe your electrical requirements in detail... e.g., 'Garden shed workshop requiring sockets, LED lighting, and 16A single-phase machinery supply. Shed is 25m from house with existing consumer unit.'"
                    className="min-h-[120px] bg-elec-dark/50 border-elec-yellow/30 focus:border-elec-yellow text-white placeholder:text-gray-400 resize-none rounded-xl backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-elec-yellow/20"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {prompt.length}/500
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 hover:from-elec-yellow/90 hover:to-elec-yellow/70 text-elec-dark font-semibold py-3 h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-elec-yellow/30" 
                    onClick={handleCircuitAnalysis} 
                    disabled={isLoading || !prompt.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                        Designing Circuit...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Design
                      </>
                    )}
                  </Button>
                  
                  {analysisResult && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 px-4 h-12 rounded-xl"
                        onClick={() => setShowResults(!showResults)}
                      >
                        {showResults ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-500/30 text-green-400 hover:bg-green-500/20 px-4 h-12 rounded-xl"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 px-4 h-12 rounded-xl"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Loading State */}
              {isLoading && (
                <div className="p-6 bg-gradient-to-br from-elec-dark/80 to-elec-dark/60 rounded-xl border border-elec-yellow/30 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/20 rounded-xl flex items-center justify-center border border-elec-yellow/40">
                      <Sparkles className="h-6 w-6 text-elec-yellow animate-pulse" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg">Generating Circuit Design</span>
                      <p className="text-gray-400 text-sm">Calculating requirements and compliance checks...</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm text-elec-yellow">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-elec-grey rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/80 transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      Estimated time: {estimatedTime}s
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <Skeleton className="h-4 w-full bg-elec-grey/50" />
                    <Skeleton className="h-4 w-3/4 bg-elec-grey/50" />
                    <Skeleton className="h-4 w-5/6 bg-elec-grey/50" />
                  </div>
                </div>
              )}

              {/* Enhanced Quick Scenarios */}
              <Collapsible open={expandedSections.examples} onOpenChange={() => toggleSection('examples')}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-4 h-auto text-left hover:bg-elec-yellow/10 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-5 w-5 text-elec-yellow" />
                      <h4 className="font-medium text-white">Quick Start Examples</h4>
                    </div>
                    {expandedSections.examples ? 
                      <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exampleScenarios.map((scenario, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="border-elec-yellow/20 text-left hover:bg-elec-yellow/10 hover:border-elec-yellow/40 h-auto p-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] group"
                        onClick={() => setPrompt(scenario.prompt)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="w-10 h-10 bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-elec-yellow/30 group-hover:border-elec-yellow/50 transition-colors">
                            <scenario.icon className="h-5 w-5 text-elec-yellow" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-white text-sm mb-1 group-hover:text-elec-yellow transition-colors">{scenario.title}</h5>
                            <p className="text-gray-400 text-xs leading-relaxed">{scenario.description}</p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Results Section */}
        {analysisResult && !isLoading && showResults && (
          <div className="max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-elec-grey/90 to-elec-grey/70 border border-elec-yellow/20 backdrop-blur-sm shadow-2xl">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-xl flex items-center justify-center border border-green-500/40">
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white flex items-center gap-2">
                        Circuit Design Report
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                          Complete
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-400 text-sm mt-1">Professional electrical design documentation</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 rounded-lg"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 rounded-lg"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 rounded-lg"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                  <ReactMarkdown 
                    components={{
                      h1: ({children}) => (
                        <h1 className="text-elec-yellow font-bold text-2xl mb-4 mt-6 first:mt-0 flex items-center gap-3">
                          <div className="w-8 h-8 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-elec-yellow" />
                          </div>
                          {children}
                        </h1>
                      ),
                      h2: ({children}) => (
                        <h2 className="text-elec-yellow font-bold text-xl mb-3 mt-5 first:mt-0 border-b border-elec-yellow/20 pb-2">
                          {children}
                        </h2>
                      ),
                      h3: ({children}) => <h3 className="text-elec-yellow/90 font-semibold text-lg mb-2 mt-4">{children}</h3>,
                      p: ({children}) => <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>,
                      ul: ({children}) => <ul className="text-gray-300 mb-4 ml-6 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="text-gray-300 mb-4 ml-6 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="leading-relaxed">{children}</li>,
                      strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                      em: ({children}) => <em className="text-elec-yellow/80">{children}</em>,
                      code: ({children}) => <code className="bg-elec-dark/80 px-2 py-1 rounded-md text-elec-yellow text-sm border border-elec-yellow/20">{children}</code>,
                    }}
                  >
                    {analysisResult}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Enhanced Features Overview */}
        <div className="max-w-5xl mx-auto">
          <Collapsible open={expandedSections.guidance} onOpenChange={() => toggleSection('guidance')}>
            <Card className="bg-gradient-to-br from-elec-grey/70 to-elec-grey/50 border border-elec-yellow/20 backdrop-blur-sm">
              <CardHeader className="p-6">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-4 h-auto text-left hover:bg-elec-yellow/10 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/20 rounded-xl flex items-center justify-center border border-elec-yellow/40">
                        <FileText className="h-5 w-5 text-elec-yellow" />
                      </div>
                      <CardTitle className="text-xl text-white">What You'll Receive</CardTitle>
                    </div>
                    {expandedSections.guidance ? 
                      <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    }
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-elec-dark/30 rounded-xl border border-elec-yellow/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/20 rounded-xl flex items-center justify-center border border-elec-yellow/40 flex-shrink-0">
                          <Calculator className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">Precise Calculations</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Cable sizing, voltage drop, protection ratings, earth fault loop impedance, and derating factors
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-elec-dark/30 rounded-xl border border-blue-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/40 flex-shrink-0">
                          <Building2 className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">Comprehensive Materials</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Complete materials checklist with quantities, specifications, and part numbers for cables, protection, and hardware
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-elec-dark/30 rounded-xl border border-green-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-xl flex items-center justify-center border border-green-500/40 flex-shrink-0">
                          <Home className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">Installation Guidance</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Step-by-step installation procedures, safety considerations, testing requirements, and commissioning
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-elec-dark/30 rounded-xl border border-purple-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/40 flex-shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">BS 7671 Compliance</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Regulation references, special location requirements, and complete documentation for certification
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-elec-dark/30 rounded-xl border border-orange-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-xl flex items-center justify-center border border-orange-500/40 flex-shrink-0">
                          <Lightbulb className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">Expert Recommendations</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Professional insights, alternative solutions, cost optimisation tips, and industry best practices
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-elec-dark/30 rounded-xl border border-cyan-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 rounded-xl flex items-center justify-center border border-cyan-500/40 flex-shrink-0">
                          <FileText className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">Documentation Ready</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Export-ready formats for quotes, client reports, and certification documentation with professional formatting
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
    </div>
  );
};

export default CircuitDesigner;
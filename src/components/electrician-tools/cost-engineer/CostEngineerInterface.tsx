import { useState } from "react";
import { Calculator, Loader, Copy, Eye, EyeOff, ChevronDown, ChevronUp, Download, Clock, CheckCircle2, Sparkles, Lightbulb, PoundSterling, Clock4, TrendingUp, Home, Building2, Factory } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

const CostEngineerInterface = () => {
  const [prompt, setPrompt] = useState("");
  const [costingResult, setCostingResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(20);
  const [projectType, setProjectType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [expandedSections, setExpandedSections] = useState({
    examples: true,
  });

  const handleCostAnalysis = async () => {
    if (prompt.trim() === "") {
      toast({
        title: "Empty Description",
        description: "Please enter a project description first.",
        variant: "destructive",
      });
      return;
    }
    
    // Placeholder for now - show functionality in development
    toast({
      title: "Functionality In Development",
      description: "Full Cost Engineer capabilities will be enabled soon.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(costingResult);
      toast({
        title: "Copied!",
        description: "Cost analysis copied to clipboard successfully.",
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
      title: "Domestic Rewire Costing",
      description: "Complete 3-bed house rewire pricing",
      icon: PoundSterling,
      prompt: "Price out a complete 3-bed house rewire with new 18th Edition consumer unit, upgraded bonding, and LED downlights throughout."
    },
    {
      title: "Commercial Office Fit-Out",
      description: "LED panels & emergency lighting",
      icon: TrendingUp,
      prompt: "Cost estimate for commercial office lighting upgrade - 50 LED panels, emergency lights, Cat6 data points, and testing."
    },
    {
      title: "EV Charger Installation",
      description: "Materials & labour breakdown",
      icon: Calculator,
      prompt: "Materials and labour cost for 7kW EV charger installation, 15m cable run from consumer unit, including all accessories."
    },
    {
      title: "Consumer Unit Upgrade",
      description: "18th Edition RCBO board",
      icon: CheckCircle2,
      prompt: "Price breakdown for consumer unit upgrade from old fuse board to 18th Edition RCBO board with SPD."
    },
    {
      title: "External Supply to Outbuilding",
      description: "SWA supply & sub-board",
      icon: PoundSterling,
      prompt: "Cost analysis for 30m SWA supply to detached garage with 6-way sub-board, sockets, and LED lighting."
    },
    {
      title: "Solar PV Integration",
      description: "4kW system with battery storage",
      icon: TrendingUp,
      prompt: "Materials cost for 4kW solar PV system with battery storage integration, AC isolators, and generation metre."
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const fillExample = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    toast({
      title: "Example Loaded",
      description: "Click Generate Cost Analysis to see how it works.",
    });
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 lg:space-y-8">

        {/* Enhanced Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6 py-6 sm:py-8 lg:py-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-400/10 rounded-full blur-3xl w-32 h-32 mx-auto"></div>
            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400/30 to-green-400/20 rounded-3xl border border-green-400/40 backdrop-blur-sm">
              <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-green-400 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 break-words text-center">
              Cost Engineer AI
            </h1>
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2 text-center break-words">
              Accurate material pricing, labour cost estimates, and professional quotation generation for electrical installations
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2">
            <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
              <PoundSterling className="w-3 h-3 mr-1" />
              Material Pricing
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Clock4 className="w-3 h-3 mr-1" />
              Labour Costs
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Accurate Estimates
            </Badge>
          </div>
        </div>

        {/* Enhanced Design Interface */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <Card className="bg-gradient-to-br from-elec-grey/80 to-elec-grey/60 border border-green-400/20 backdrop-blur-sm shadow-2xl">
            <CardHeader className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400/30 to-green-400/20 rounded-xl flex items-center justify-center border border-green-400/40">
                  <Calculator className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl text-white font-semibold break-words">What electrical work do you need costed?</CardTitle>
                  <CardDescription className="text-gray-400 mt-1 break-words">
                    Describe your project requirements - AI will calculate materials and labour
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 lg:p-8 pt-0 space-y-4 sm:space-y-6">
              {/* Enhanced Input Area */}
              <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="e.g., Price out a complete 3-bed house rewire with new consumer unit, upgraded bonding, and LED downlights throughout"
                    className="min-h-[120px] bg-elec-dark/50 border-green-400/30 focus:border-green-400 text-white placeholder:text-gray-400 resize-none rounded-xl backdrop-blur-sm transition-all duration-300 focus:shadow-lg focus:shadow-green-400/20"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    {prompt.length}/500
                  </div>
                </div>

                {/* Project Type Selector */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Project Type:</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Button 
                      type="button"
                      className={projectType === 'domestic' 
                        ? "bg-gradient-to-r from-green-400 to-green-400/80 text-elec-dark" 
                        : "border-green-400/30 text-green-400 hover:bg-green-400/20"
                      }
                      variant={projectType === 'domestic' ? 'default' : 'outline'}
                      onClick={() => setProjectType('domestic')}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Domestic
                    </Button>
                    <Button 
                      type="button"
                      className={projectType === 'commercial' 
                        ? "bg-gradient-to-r from-green-400 to-green-400/80 text-elec-dark" 
                        : "border-green-400/30 text-green-400 hover:bg-green-400/20"
                      }
                      variant={projectType === 'commercial' ? 'default' : 'outline'}
                      onClick={() => setProjectType('commercial')}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Commercial
                    </Button>
                    <Button 
                      type="button"
                      className={projectType === 'industrial' 
                        ? "bg-gradient-to-r from-green-400 to-green-400/80 text-elec-dark" 
                        : "border-green-400/30 text-green-400 hover:bg-green-400/20"
                      }
                      variant={projectType === 'industrial' ? 'default' : 'outline'}
                      onClick={() => setProjectType('industrial')}
                    >
                      <Factory className="h-4 w-4 mr-2" />
                      Industrial
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-400 to-green-400/80 hover:from-green-400/90 hover:to-green-400/70 text-elec-dark font-semibold py-3 h-12 sm:h-14 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-green-400/30 touch-manipulation" 
                    onClick={handleCostAnalysis} 
                    disabled={isLoading || !prompt.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" /> 
                        <span className="text-sm sm:text-base">Analysing Costs...</span>
                      </>
                    ) : (
                      <>
                        <Calculator className="h-5 w-5 mr-2" />
                        <span className="text-sm sm:text-base">Generate Cost Analysis</span>
                      </>
                    )}
                  </Button>
                  
                  {costingResult && (
                    <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
                      <Button 
                        variant="outline" 
                        className="border-green-400/30 text-green-400 hover:bg-green-400/20 h-12 sm:h-14 rounded-xl touch-manipulation min-h-[44px]"
                        onClick={() => setShowResults(!showResults)}
                      >
                        {showResults ? (
                          <>
                            <EyeOff className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Show</span>
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-500/30 text-green-400 hover:bg-green-500/20 h-12 sm:h-14 rounded-xl touch-manipulation min-h-[44px]"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Copy</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 h-12 sm:h-14 rounded-xl touch-manipulation min-h-[44px] opacity-50 cursor-not-allowed"
                        disabled
                        title="Export functionality coming soon"
                      >
                        <Download className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Loading State */}
              {isLoading && (
                <div className="p-6 bg-gradient-to-br from-elec-dark/80 to-elec-dark/60 rounded-xl border border-green-400/30 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400/30 to-green-400/20 rounded-xl flex items-center justify-center border border-green-400/40">
                      <Calculator className="h-6 w-6 text-green-400 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg">Generating Cost Analysis</span>
                      <p className="text-gray-400 text-sm">Calculating materials, labour, and pricing...</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm text-green-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-elec-grey rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-400/80 transition-all duration-1000 ease-out rounded-full"
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
                    className="w-full justify-between p-4 h-auto text-left hover:bg-green-400/10 rounded-xl transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-5 w-5 text-green-400" />
                      <h4 className="font-medium text-white break-words">Example Costing Requests - Click to Use</h4>
                    </div>
                    {expandedSections.examples ? 
                      <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    }
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {exampleScenarios.map((scenario, idx) => {
                      const IconComponent = scenario.icon;
                      return (
                        <Card
                          key={idx}
                          className="bg-elec-dark/50 border-green-400/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer group"
                          onClick={() => fillExample(scenario.prompt)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-400/30 to-green-400/20 rounded-lg flex items-center justify-center border border-green-400/40 group-hover:scale-110 transition-transform">
                                <IconComponent className="h-5 w-5 text-green-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-white text-sm mb-1 break-words">{scenario.title}</h5>
                                <p className="text-xs text-gray-400 break-words">{scenario.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Results Area Placeholder */}
              {costingResult && showResults && (
                <div className="p-6 bg-gradient-to-br from-elec-dark/80 to-elec-dark/60 rounded-xl border border-green-400/30 backdrop-blur-sm">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white">{costingResult}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CostEngineerInterface;

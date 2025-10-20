import { useState } from "react";
import { Calculator, Loader, Copy, Eye, EyeOff, ChevronDown, Download, Clock, Lightbulb, PoundSterling, Clock4, TrendingUp, Home, Building2, Factory, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MobileInput } from "@/components/ui/mobile-input";
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
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    examples: true,
    projectInfo: false,
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
    <div className="space-y-3 sm:space-y-4 pb-6">
      {/* 1. HERO PROMPT SECTION */}
      <Card className="p-3 sm:p-6 bg-gradient-to-br from-green-500/5 via-background to-background border-green-500/20">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10 flex items-center justify-center animate-pulse">
              <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-foreground leading-tight">
                What electrical work do you need costed?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Describe your project requirements - AI will calculate materials and labour
              </p>
            </div>
          </div>

          <div className="relative">
            <Textarea
              placeholder="e.g., Price out a complete 3-bed house rewire with new consumer unit, upgraded bonding, and LED downlights throughout"
              className="min-h-[120px] sm:min-h-[140px] text-base resize-none touch-manipulation pr-16"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {prompt.length} chars
            </div>
          </div>
        </div>
      </Card>

      {/* 2. PROJECT TYPE SELECTOR */}
      <Card className="p-3 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
            <h3 className="text-base sm:text-lg font-semibold">Project Type</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="button"
              variant={projectType === 'domestic' ? 'default' : 'outline'}
              className={`flex-1 h-12 gap-2 touch-manipulation ${
                projectType === 'domestic' 
                  ? 'bg-gradient-to-r from-green-500 to-green-400 text-elec-dark hover:from-green-600 hover:to-green-500' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
              }`}
              onClick={() => setProjectType('domestic')}
            >
              <Home className="h-4 w-4" />
              Domestic
            </Button>
            <Button
              type="button"
              variant={projectType === 'commercial' ? 'default' : 'outline'}
              className={`flex-1 h-12 gap-2 touch-manipulation ${
                projectType === 'commercial' 
                  ? 'bg-gradient-to-r from-green-500 to-green-400 text-elec-dark hover:from-green-600 hover:to-green-500' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
              }`}
              onClick={() => setProjectType('commercial')}
            >
              <Building2 className="h-4 w-4" />
              Commercial
            </Button>
            <Button
              type="button"
              variant={projectType === 'industrial' ? 'default' : 'outline'}
              className={`flex-1 h-12 gap-2 touch-manipulation ${
                projectType === 'industrial' 
                  ? 'bg-gradient-to-r from-green-500 to-green-400 text-elec-dark hover:from-green-600 hover:to-green-500' 
                  : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
              }`}
              onClick={() => setProjectType('industrial')}
            >
              <Factory className="h-4 w-4" />
              Industrial
            </Button>
          </div>
        </div>
      </Card>

      {/* 3. PROJECT INFORMATION (Collapsible) */}
      <Collapsible open={expandedSections.projectInfo} onOpenChange={() => toggleSection('projectInfo')}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger className="w-full p-3 sm:p-6 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-semibold text-left">Project Information</h3>
              </div>
              <Badge variant="outline" className="text-xs whitespace-nowrap">Optional</Badge>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform flex-shrink-0 ml-2 ${expandedSections.projectInfo ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 sm:p-6 pt-0 space-y-3 sm:space-y-4">
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                <MobileInput
                  label="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Smith Residence Rewire"
                />
                <MobileInput
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., 123 High Street, London"
                />
                <MobileInput
                  label="Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., John Smith"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 4. EXAMPLE SCENARIOS (Collapsible - Default Open) */}
      <Collapsible open={expandedSections.examples} onOpenChange={() => toggleSection('examples')}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger className="w-full p-3 sm:p-6 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold text-left">Example Costing Requests</h3>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform flex-shrink-0 ml-2 ${expandedSections.examples ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-3 sm:p-6 pt-0">
              <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                Click any example to load it into the description field:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {exampleScenarios.map((scenario, idx) => {
                  const IconComponent = scenario.icon;
                  return (
                    <Card
                      key={idx}
                      className="p-3 sm:p-4 cursor-pointer hover:border-green-400/40 hover:scale-105 transition-all touch-manipulation"
                      onClick={() => fillExample(scenario.prompt)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base mb-1 text-foreground">
                            {scenario.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {scenario.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 5. GENERATE BUTTON */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          onClick={handleCostAnalysis}
          disabled={isLoading || !prompt.trim()}
          className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-elec-dark font-semibold text-base touch-manipulation"
        >
          {isLoading ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Analysing Costs...
            </>
          ) : (
            <>
              <Calculator className="h-5 w-5 mr-2" />
              Generate Cost Analysis
            </>
          )}
        </Button>
      </div>

      {/* 6. ACTION BUTTONS (when results exist) */}
      {costingResult && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResults(!showResults)}
            className="gap-2"
          >
            {showResults ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showResults ? 'Hide' : 'Show'} Results
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="gap-2"
            title="Coming soon"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      )}

      {/* 7. RESULTS DISPLAY */}
      {showResults && costingResult && (
        <Card className="p-4 sm:p-6">
          <div className="prose prose-invert max-w-none whitespace-pre-wrap">
            {costingResult}
          </div>
        </Card>
      )}

      {/* LOADING STATE */}
      {isLoading && (
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-green-400 animate-pulse" />
            </div>
            <div>
              <span className="font-semibold text-lg">Generating Cost Analysis</span>
              <p className="text-muted-foreground text-sm">Calculating materials, labour, and pricing...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-green-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-elec-grey rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Estimated time: {estimatedTime}s
            </div>
          </div>
          
          <div className="space-y-3 mt-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </Card>
      )}
    </div>
  );
};

export default CostEngineerInterface;

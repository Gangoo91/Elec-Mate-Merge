import { useState } from "react";
import { Wrench, Loader, Copy, Eye, EyeOff, ChevronDown, Download, Clock, CheckCircle2, Sparkles, Lightbulb, Zap, Building2, Home, Factory } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { InstallationMethodDisplay } from "./InstallationMethodDisplay";

const InstallationSpecialistInterface = () => {
  const [prompt, setPrompt] = useState("");
  const [installationGuide, setInstallationGuide] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(20);
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [expandedSections, setExpandedSections] = useState({
    examples: true,
  });
  const [methodData, setMethodData] = useState<any>(null);

  const handleGenerateGuide = async () => {
    if (prompt.trim() === "") {
      toast({
        title: "Empty Description",
        description: "Please enter an installation description first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setInstallationGuide("");
    setMethodData(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 1000);

    try {
      const { data, error } = await supabase.functions.invoke('installation-method-generator', {
        body: {
          installationDescription: prompt,
          installationType: installationType,
          context: {}
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate installation method');
      }

      setInstallationGuide(data.installationGuide);
      setMethodData({
        steps: data.steps,
        summary: data.summary
      });

      toast({
        title: "Installation Guide Generated",
        description: `${data.summary.totalSteps} steps created successfully`,
      });

    } catch (error) {
      console.error('Installation guide generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Could not generate installation guide. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
      setProgress(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installationGuide);
      toast({
        title: "Copied!",
        description: "Installation guide copied to clipboard successfully.",
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
      title: "Consumer Unit Installation",
      description: "Step-by-step 18th Edition board install",
      icon: CheckCircle2,
      prompt: "Step-by-step installation method for 18th Edition dual RCD consumer unit with SPD in domestic property, including isolation, testing, and certification requirements."
    },
    {
      title: "SWA Cable Installation",
      description: "Underground cable to garage/outbuilding",
      icon: Wrench,
      prompt: "Provide step-by-step installation method for 25mm 3-core SWA cable underground to garage, including trench depth, warning tape, gland termination, and testing procedures."
    },
    {
      title: "Electric Shower Circuit",
      description: "9.5kW shower with pull-cord switch",
      icon: Zap,
      prompt: "Installation method for 9.5kW shower circuit - 10mm² cable clipped direct, 18m run from consumer unit, through first floor to bathroom, including safe zone routing and testing."
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
      description: "Click Generate Installation Guide to see how it works.",
    });
  };

  return (
    <div className="space-y-3 sm:space-y-4 pb-6">
      {/* 1. HERO PROMPT SECTION */}
      <Card className="p-3 sm:p-6 bg-gradient-to-br from-blue-500/5 via-background to-background border-blue-500/20">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
              <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold text-foreground leading-tight">
                What installation work do you need guidance for?
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Describe your installation requirements - AI will provide step-by-step methods
              </p>
            </div>
          </div>

          <div className="relative">
            <Textarea
              placeholder="e.g., Step-by-step installation method for 9.5kW shower circuit, 10mm² cable clipped direct through first floor, 18m run from consumer unit"
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

      {/* 2. INSTALLATION TYPE SELECTOR */}
      <Card className="p-3 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <h3 className="text-base sm:text-lg font-semibold">Installation Type</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="button"
              variant={installationType === 'domestic' ? 'default' : 'outline'}
              className={`flex-1 h-12 gap-2 touch-manipulation ${
                installationType === 'domestic' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-elec-dark hover:from-blue-600 hover:to-blue-500' 
                  : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
              }`}
              onClick={() => setInstallationType('domestic')}
            >
              <Home className="h-4 w-4" />
              Domestic
            </Button>
            <Button
              type="button"
              variant={installationType === 'commercial' ? 'default' : 'outline'}
              className={`flex-1 h-12 gap-2 touch-manipulation ${
                installationType === 'commercial' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-elec-dark hover:from-blue-600 hover:to-blue-500' 
                  : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
              }`}
              onClick={() => setInstallationType('commercial')}
            >
              <Building2 className="h-4 w-4" />
              Commercial
            </Button>
            <Button
              type="button"
              variant={installationType === 'industrial' ? 'default' : 'outline'}
              className={`flex-1 h-12 gap-2 touch-manipulation ${
                installationType === 'industrial' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-elec-dark hover:from-blue-600 hover:to-blue-500' 
                  : 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
              }`}
              onClick={() => setInstallationType('industrial')}
            >
              <Factory className="h-4 w-4" />
              Industrial
            </Button>
          </div>
        </div>
      </Card>

      {/* 3. EXAMPLE SCENARIOS (Collapsible - Default Open) */}
      <Collapsible open={expandedSections.examples} onOpenChange={() => toggleSection('examples')}>
        <Card className="overflow-hidden">
          <CollapsibleTrigger className="w-full p-3 sm:p-6 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
              <h3 className="text-base sm:text-lg font-semibold text-left">Example Installation Methods</h3>
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
                      className="p-3 sm:p-4 cursor-pointer hover:border-blue-400/40 hover:scale-105 transition-all touch-manipulation"
                      onClick={() => fillExample(scenario.prompt)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-blue-400" />
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

      {/* 4. GENERATE BUTTON */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          onClick={handleGenerateGuide}
          disabled={isLoading || !prompt.trim()}
          className="flex-1 h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-elec-dark font-semibold text-base touch-manipulation"
        >
          {isLoading ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Generating Guide...
            </>
          ) : (
            <>
              <Wrench className="h-5 w-5 mr-2" />
              Generate Installation Guide
            </>
          )}
        </Button>
      </div>

      {/* 5. ACTION BUTTONS (when results exist) */}
      {installationGuide && (
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

      {/* 6. RESULTS DISPLAY */}
      {showResults && methodData && (
        <InstallationMethodDisplay
          installationGuide={installationGuide}
          steps={methodData.steps}
          summary={methodData.summary}
        />
      )}

      {/* LOADING STATE */}
      {isLoading && (
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-xl flex items-center justify-center">
              <Wrench className="h-6 w-6 text-blue-400 animate-pulse" />
            </div>
            <div>
              <span className="font-semibold text-lg">Generating Installation Guide</span>
              <p className="text-muted-foreground text-sm">Analysing installation requirements and safety procedures...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-blue-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-elec-grey rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000 ease-out rounded-full"
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

export default InstallationSpecialistInterface;

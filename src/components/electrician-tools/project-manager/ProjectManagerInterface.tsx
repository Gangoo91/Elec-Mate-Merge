import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Clipboard, 
  Calendar, 
  Building2, 
  Users, 
  Package, 
  MessageSquare, 
  FileCheck, 
  Home, 
  Factory,
  FileText,
  Lightbulb,
  ChevronDown,
  Copy,
  Download,
  Eye,
  EyeOff
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ExampleScenario {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    title: "Domestic Rewire Schedule",
    icon: Calendar,
    prompt: "Create a project plan for full 3-bedroom house rewire with timeline, labour requirements, and coordination with plasterer and decorator"
  },
  {
    title: "Commercial Fit-Out",
    icon: Building2,
    prompt: "Project management plan for office fit-out with 60 LED panels, 4 distribution boards, data cabling, and access control - client wants phased handover"
  },
  {
    title: "Multi-Trade Coordination",
    icon: Users,
    prompt: "Coordination plan for new build house where electrical first fix must work around plumber, HVAC, and timber frame contractor schedules"
  },
  {
    title: "Material Procurement",
    icon: Package,
    prompt: "Material ordering schedule for hotel refurbishment project - 120 rooms over 6 weeks, need to manage deliveries to avoid storage issues"
  },
  {
    title: "Client Communication",
    icon: MessageSquare,
    prompt: "What information should I include in weekly progress reports to client for commercial retail unit electrical installation?"
  },
  {
    title: "Handover Documentation",
    icon: FileCheck,
    prompt: "What documentation is required for handover of industrial factory electrical installation including O&M manuals and as-built drawings?"
  }
];

const ProjectManagerInterface = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    toast.success("Example loaded", {
      description: "Query filled in - ready to generate"
    });
  };

  const handleGenerate = () => {
    toast.info("Functionality In Development", {
      description: "Project Manager AI agent coming soon"
    });
  };

  const handleCopy = () => {
    toast.success("Copied to clipboard");
  };

  return (
    <form className="space-y-3 sm:space-y-4 pb-6" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
      {/* 1. HERO PROMPT CARD */}
      <Card className="p-3 sm:p-6 bg-gradient-to-br from-pink-500/5 via-background to-background border-pink-500/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-3 rounded-full animate-pulse">
            <Clipboard className="h-6 w-6 text-elec-dark" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">What project needs planning and coordination?</h3>
            <p className="text-sm text-muted-foreground">Describe the project scope and requirements...</p>
          </div>
        </div>
        <Textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a project plan for a commercial office fit-out with 40 LED panels, new distribution board, data cabling, and emergency lighting - 5 day installation window"
          className="min-h-[120px] text-sm sm:text-base resize-none"
          maxLength={500}
        />
        <div className="text-xs text-muted-foreground text-right mt-2">
          {prompt.length}/500
        </div>
      </Card>

      {/* 2. PROJECT TYPE SELECTOR */}
      <Card className="p-3 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Home className="h-5 w-5 text-pink-400" />
          <h4 className="font-semibold">Project Type</h4>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            type="button"
            className={selectedType === 'domestic' 
              ? 'bg-gradient-to-r from-pink-400 to-pink-400/80 text-white hover:from-pink-500 hover:to-pink-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-pink-400 border-pink-400/40 hover:bg-pink-400/10'
            }
            variant={selectedType === 'domestic' ? 'default' : 'outline'}
            onClick={() => setSelectedType('domestic')}
          >
            <Home className="h-4 w-4 mr-2" />
            Domestic
          </Button>
          <Button 
            type="button"
            className={selectedType === 'commercial' 
              ? 'bg-gradient-to-r from-pink-400 to-pink-400/80 text-white hover:from-pink-500 hover:to-pink-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-pink-400 border-pink-400/40 hover:bg-pink-400/10'
            }
            variant={selectedType === 'commercial' ? 'default' : 'outline'}
            onClick={() => setSelectedType('commercial')}
          >
            <Building2 className="h-4 w-4 mr-2" />
            Commercial
          </Button>
          <Button 
            type="button"
            className={selectedType === 'industrial' 
              ? 'bg-gradient-to-r from-pink-400 to-pink-400/80 text-white hover:from-pink-500 hover:to-pink-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-pink-400 border-pink-400/40 hover:bg-pink-400/10'
            }
            variant={selectedType === 'industrial' ? 'default' : 'outline'}
            onClick={() => setSelectedType('industrial')}
          >
            <Factory className="h-4 w-4 mr-2" />
            Industrial
          </Button>
        </div>
      </Card>

      {/* 3. OPTIONAL PROJECT DETAILS (Collapsible) */}
      <Collapsible>
        <Card>
          <CollapsibleTrigger asChild>
            <Button 
              type="button"
              variant="ghost" 
              className="w-full justify-between p-3 sm:p-6 hover:bg-transparent touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-pink-400" />
                <h4 className="font-semibold">Project Information</h4>
                <span className="text-xs bg-muted px-2 py-1 rounded">Optional</span>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-sm">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Retail Unit Fit-Out"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Birmingham, UK"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., Retail Corp Ltd"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm">Duration</Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 5 days"
                  className="h-12 touch-manipulation"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 4. EXAMPLE SCENARIOS (Collapsible - Default Open) */}
      <Collapsible defaultOpen={true}>
        <Card>
          <CollapsibleTrigger asChild>
            <Button 
              type="button"
              variant="ghost" 
              className="w-full justify-between p-3 sm:p-6 hover:bg-transparent touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-pink-400" />
                <h4 className="font-semibold">Example Project Requests</h4>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform duration-200" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {EXAMPLE_SCENARIOS.map((scenario, idx) => {
                  const IconComponent = scenario.icon;
                  return (
                    <Card 
                      key={idx}
                      className="p-3 sm:p-4 cursor-pointer hover:border-pink-400/40 transition-all hover:scale-[1.02] touch-manipulation"
                      onClick={() => handleExampleClick(scenario.prompt)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <IconComponent className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <h5 className="font-semibold text-sm">{scenario.title}</h5>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {scenario.prompt}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 5. GENERATE BUTTON */}
      <Button 
        type="submit"
        size="lg"
        disabled={!prompt.trim()}
        className="w-full bg-gradient-to-r from-pink-400 to-pink-400/80 hover:from-pink-500 hover:to-pink-500/80 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
      >
        <Clipboard className="h-5 w-5 mr-2" />
        Generate Project Plan
      </Button>

      {/* 6. RESULTS DISPLAY (when showResults) */}
      {showResults && (
        <Card className="p-3 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">Project Plan Results</h4>
            <div className="flex items-center gap-2">
              <Button 
                type="button"
                size="sm" 
                variant="outline"
                onClick={handleCopy}
                className="touch-manipulation"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      type="button"
                      size="sm" 
                      variant="outline"
                      disabled
                      className="touch-manipulation"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export functionality coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button 
                type="button"
                size="sm" 
                variant="ghost"
                onClick={() => setShowResults(false)}
                className="touch-manipulation"
              >
                {showResults ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-sm">
            <p className="text-muted-foreground">Results will appear here...</p>
          </div>
        </Card>
      )}
    </form>
  );
};

export default ProjectManagerInterface;

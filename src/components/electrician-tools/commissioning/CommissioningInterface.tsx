import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2, 
  Zap, 
  Building2, 
  Lightbulb, 
  AlertTriangle, 
  FileText, 
  Home, 
  Factory,
  Calendar,
  ChevronDown,
  Copy,
  Download,
  Eye,
  EyeOff
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";

interface ExampleScenario {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    title: "Consumer Unit Testing",
    icon: CheckCircle2,
    prompt: "Complete testing and commissioning procedure for new dual RCD consumer unit with 14 circuits in domestic property, all tests required for EIC"
  },
  {
    title: "EV Charger Verification",
    icon: Zap,
    prompt: "Testing procedure for 7kW Mode 3 EV charging point including O-PEN device testing, earth loop impedance, and RCD verification"
  },
  {
    title: "Commercial Distribution Board",
    icon: Building2,
    prompt: "Step-by-step commissioning of 3-phase TP&N distribution board feeding 8 submains in office building, including phase rotation and load balancing"
  },
  {
    title: "Emergency Lighting Testing",
    icon: Lightbulb,
    prompt: "Test and commission emergency lighting system with 20 fittings and central battery - what tests are required and what are the pass criteria?"
  },
  {
    title: "Fault Diagnosis",
    icon: AlertTriangle,
    prompt: "Insulation resistance test showing 0.3MΩ on lighting circuit - what's the fault finding procedure and acceptable values per BS 7671?"
  },
  {
    title: "EIC Completion",
    icon: FileText,
    prompt: "What information is required to complete an Electrical Installation Certificate for a kitchen rewire with new cooker and shower circuits?"
  }
];

const CommissioningInterface = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [clientName, setClientName] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  const { callAgent, isLoading, progress: agentProgress } = useSimpleAgent();

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    if (contextData) {
      try {
        // Extract installation details
        const circuits = contextData.circuits || [];
        const installationType = contextData.installationType || 'installation';
        
        setPrompt(instruction || `Testing and commissioning for ${circuits.length} circuits - ${installationType}`);
        
        if (contextData.projectName) setProjectName(contextData.projectName);
        if (contextData.location) setLocation(contextData.location);
        if (contextData.clientName) setClientName(contextData.clientName);
        
        toast.success('Context loaded', { description: 'Installation details loaded from previous agent' });
      } catch (error) {
        setPrompt(instruction || 'Testing and commissioning for forwarded work');
        toast.success('Context loaded');
      }
    }
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    toast.success("Example loaded", {
      description: "Query filled in - ready to generate"
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a testing requirement");
      return;
    }
    
    const response = await callAgent('commissioning', {
      query: prompt,
      projectContext: {
        projectType: selectedType,
        buildingAge: 'modern',
      },
      projectName,
      location,
      clientName,
      installationDate
    });
    
    if (response?.success) {
      setResults(response);
      setShowResults(true);
    }
  };

  const handleCopy = () => {
    if (results) {
      navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      toast.success("Copied to clipboard");
    }
  };

  const handleExportPDF = () => {
    if (!results) return;
    
    try {
      const { generateEICSchedulePDF } = require('@/utils/pdf-generators/eic-schedule-pdf');
      
      const pdfData = {
        projectName: projectName || 'Untitled Project',
        installationAddress: location || 'Not specified',
        inspector: 'AI Testing Specialist',
        inspectionDate: installationDate || new Date().toISOString().split('T')[0],
        circuits: results.circuits || [],
        overallResult: results.overallResult || 'Pass',
        notes: results.notes
      };
      
      const pdf = generateEICSchedulePDF(pdfData);
      pdf.save(`EIC-Schedule-${projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("PDF exported", { description: "EIC Schedule downloaded successfully" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Export failed", { description: "Could not generate PDF" });
    }
  };

  return (
    <form className="space-y-3 sm:space-y-4 pb-6" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
      {/* Agent Inbox */}
      <AgentInbox currentAgent="commissioning" onTaskAccept={handleTaskAccept} />

      {/* 1. HERO PROMPT CARD */}
      <Card className="p-3 sm:p-6 bg-gradient-to-br from-purple-500/5 via-background to-background border-purple-500/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-full animate-pulse">
            <CheckCircle2 className="h-6 w-6 text-elec-dark" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">What installation needs testing and commissioning?</h3>
            <p className="text-sm text-muted-foreground">Describe the installation and required tests...</p>
          </div>
        </div>
        <Textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Provide step-by-step testing and commissioning procedure for new 18th Edition consumer unit with 12 circuits, including all required tests and expected results"
          className="min-h-[120px] text-sm sm:text-base resize-none"
          maxLength={500}
        />
        <div className="text-xs text-muted-foreground text-right mt-2">
          {prompt.length}/500
        </div>
      </Card>

      {/* 2. INSTALLATION TYPE SELECTOR */}
      <Card className="p-3 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Home className="h-5 w-5 text-purple-400" />
          <h4 className="font-semibold">Installation Type</h4>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            type="button"
            className={selectedType === 'domestic' 
              ? 'bg-gradient-to-r from-purple-400 to-purple-400/80 text-white hover:from-purple-500 hover:to-purple-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-purple-400 border-purple-400/40 hover:bg-purple-400/10'
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
              ? 'bg-gradient-to-r from-purple-400 to-purple-400/80 text-white hover:from-purple-500 hover:to-purple-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-purple-400 border-purple-400/40 hover:bg-purple-400/10'
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
              ? 'bg-gradient-to-r from-purple-400 to-purple-400/80 text-white hover:from-purple-500 hover:to-purple-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-purple-400 border-purple-400/40 hover:bg-purple-400/10'
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
                <FileText className="h-5 w-5 text-purple-400" />
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
                  placeholder="e.g., Office Refurbishment"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Manchester, UK"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., XYZ Properties Ltd"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="installationDate" className="text-sm">Installation Date</Label>
                <Input
                  id="installationDate"
                  type="date"
                  value={installationDate}
                  onChange={(e) => setInstallationDate(e.target.value)}
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
                <Lightbulb className="h-5 w-5 text-purple-400" />
                <h4 className="font-semibold">Example Testing Requests</h4>
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
                      className="p-3 sm:p-4 cursor-pointer hover:border-purple-400/40 transition-all hover:scale-[1.02] touch-manipulation"
                      onClick={() => handleExampleClick(scenario.prompt)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <IconComponent className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
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
        disabled={!prompt.trim() || isLoading}
        className="w-full bg-gradient-to-r from-purple-400 to-purple-400/80 hover:from-purple-500 hover:to-purple-500/80 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
      >
        <CheckCircle2 className="h-5 w-5 mr-2" />
        {isLoading ? agentProgress?.message || 'Generating...' : 'Generate Testing Procedure'}
      </Button>

      {/* 6. RESULTS DISPLAY (when showResults) */}
      {showResults && (
        <Card className="p-3 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">Testing Procedure Results</h4>
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
              <Button 
                type="button"
                size="sm" 
                variant="outline"
                onClick={handleExportPDF}
                className="touch-manipulation"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                type="button"
                size="sm" 
                variant="ghost"
                onClick={() => setShowResults(false)}
                className="touch-manipulation"
              >
                {showResults ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <SendToAgentDropdown 
                currentAgent="commissioning" 
                currentOutput={{ prompt, selectedType, projectName, results }} 
              />
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-sm">
            {results?.response ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: (typeof results.response === 'string' 
                    ? results.response 
                    : results.response?.response || JSON.stringify(results.response)
                  ).replace(/\n/g, '<br />') 
                }} />
              </div>
            ) : (
              <p className="text-muted-foreground">Results will appear here...</p>
            )}
          </div>
        </Card>
      )}
    </form>
  );
};

export default CommissioningInterface;

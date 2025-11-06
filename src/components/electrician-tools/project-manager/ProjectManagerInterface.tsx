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
  EyeOff,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";
import ProjectManagerProcessingView from "./ProjectManagerProcessingView";

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
  const [results, setResults] = useState<any>(null);
  const [generationStartTime, setGenerationStartTime] = useState<number>(0);
  
  const { callAgent, isLoading, progress } = useSimpleAgent();

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    if (contextData) {
      try {
        // Aggregate all previous agent outputs
        const hasDesign = contextData.circuits && contextData.circuits.length > 0;
        const hasCost = contextData.totalCost !== undefined;
        const hasSafety = contextData.hazards !== undefined;
        
        const summary = [];
        if (hasDesign) summary.push(`${contextData.circuits.length} circuits designed`);
        if (hasCost) summary.push(`£${contextData.totalCost} estimated`);
        if (hasSafety) summary.push(`${contextData.hazards?.length || 0} hazards identified`);
        
        setPrompt(instruction || `Create project execution plan: ${summary.join(', ')}`);
        
        if (contextData.projectName) setProjectName(contextData.projectName);
        if (contextData.location) setLocation(contextData.location);
        if (contextData.clientName) setClientName(contextData.clientName);
        
        toast.success('Context loaded', { description: 'All agent outputs aggregated' });
      } catch (error) {
        setPrompt(instruction || 'Project planning for forwarded work');
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
    setShowResults(true);
    setResults(null);
    setGenerationStartTime(Date.now());
    
    const request = {
      query: prompt,
      projectType: selectedType,
      scope: prompt,
      timeline: duration || undefined
    };
    
    const response = await callAgent('project-manager', request);
    
    if (response?.success && response.data) {
      setResults(response.data);
      toast.success("Project Plan Generated", {
        description: "Your comprehensive project plan is ready"
      });
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
      const { generateProjectExecutionPlanPDF } = require('@/utils/pdf-generators/project-execution-plan-pdf');
      
      const pdfData = {
        projectName: projectName || 'Untitled Project',
        projectManager: 'AI Project Manager',
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: results.endDate || 'TBC',
        phases: results.phases || [],
        resources: results.resources || { materials: [], labour: [], totalCost: 0 },
        risks: results.risks || [],
        milestones: results.milestones || [],
        referencedDocuments: results.referencedDocuments || [],
        notes: results.notes
      };
      
      const pdf = generateProjectExecutionPlanPDF(pdfData);
      pdf.save(`Project-Plan-${projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("PDF exported", { description: "Project Execution Plan downloaded successfully" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Export failed", { description: "Could not generate PDF" });
    }
  };

  // Show loading view when generating
  if (showResults && isLoading) {
    return <ProjectManagerProcessingView progress={progress} startTime={generationStartTime} />;
  }

  // Show results when complete
  if (showResults && results) {
    return (
      <div className="space-y-4">
        <Card className="p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h4 className="font-semibold text-lg">Project Plan Results</h4>
            <div className="flex items-center gap-2 flex-wrap">
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
              <SendToAgentDropdown 
                currentAgent="project-manager" 
                currentOutput={{ prompt, selectedType, projectName, results }} 
              />
            </div>
          </div>

          {/* Project Plan Summary */}
          {results.response && (
            <Card className="p-4 mb-4 bg-muted/50">
              <h5 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-pink-400" />
                Project Overview
              </h5>
              <p className="text-sm whitespace-pre-wrap">{results.response}</p>
            </Card>
          )}

          {/* Phases */}
          {results.projectPlan?.phases && results.projectPlan.phases.length > 0 && (
            <Card className="p-4 mb-4">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-pink-400" />
                Project Phases ({results.projectPlan.totalDuration} {results.projectPlan.totalDurationUnit})
              </h5>
              <div className="space-y-3">
                {results.projectPlan.phases.map((phase: any, idx: number) => (
                  <div key={idx} className={`p-3 border rounded-lg ${phase.criticalPath ? 'border-pink-400 bg-pink-400/5' : 'border-muted'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-semibold flex items-center gap-2">
                          {phase.phase}
                          {phase.criticalPath && (
                            <span className="text-xs bg-pink-400/20 text-pink-400 px-2 py-0.5 rounded">Critical Path</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Duration: {phase.duration} {phase.durationUnit} • Start: {phase.startDay || 'Day 1'}
                        </div>
                      </div>
                    </div>
                    {phase.description && (
                      <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                    )}
                    {phase.tasks && phase.tasks.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">Tasks:</div>
                        {phase.tasks.map((task: any, taskIdx: number) => (
                          <div key={taskIdx} className="text-xs pl-3 border-l-2 border-pink-400/30 py-1">
                            • {task.task || task.name || task}
                            {task.duration && <span className="text-muted-foreground"> ({task.duration})</span>}
                          </div>
                        ))}
                      </div>
                    )}
                    {phase.dependencies && phase.dependencies.length > 0 && (
                      <div className="mt-2 text-xs">
                        <span className="text-muted-foreground">Dependencies: </span>
                        <span className="text-foreground">{phase.dependencies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Resources */}
          {results.projectPlan?.resources && (
            <Card className="p-4 mb-4">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-pink-400" />
                Resource Requirements
              </h5>
              <div className="space-y-4">
                {results.projectPlan.resources.labour && results.projectPlan.resources.labour.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Labour</div>
                    <div className="space-y-2">
                      {results.projectPlan.resources.labour.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded">
                          <span>{item.role || item.name || item}</span>
                          <span className="text-muted-foreground">{item.quantity || item.count || '1'} person</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {results.projectPlan.resources.materials && results.projectPlan.resources.materials.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Key Materials</div>
                    <div className="space-y-2">
                      {results.projectPlan.resources.materials.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between text-sm bg-muted/30 p-2 rounded">
                          <span>{item.description || item.name || item}</span>
                          <span className="text-muted-foreground">{item.quantity || item.amount || '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Risks */}
          {results.projectPlan?.risks && results.projectPlan.risks.length > 0 && (
            <Card className="p-4 mb-4">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-pink-400" />
                Risk Management
              </h5>
              <div className="space-y-3">
                {results.projectPlan.risks.map((risk: any, idx: number) => (
                  <div key={idx} className="p-3 border border-pink-400/20 rounded-lg bg-pink-400/5">
                    <div className="font-medium text-sm mb-1">{risk.risk || risk.description || risk}</div>
                    {risk.mitigation && (
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Mitigation:</span> {risk.mitigation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Milestones */}
          {results.projectPlan?.milestones && results.projectPlan.milestones.length > 0 && (
            <Card className="p-4 mb-4">
              <h5 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-pink-400" />
                Key Milestones
              </h5>
              <div className="space-y-2">
                {results.projectPlan.milestones.map((milestone: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm p-2 bg-muted/30 rounded">
                    <div className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
                    <div className="flex-1">
                      {milestone.milestone || milestone.name || milestone}
                    </div>
                    {milestone.date && (
                      <span className="text-muted-foreground text-xs">{milestone.date}</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Raw Response Fallback */}
          {!results.projectPlan && results.rawResponse && (
            <Card className="p-4">
              <h5 className="font-semibold mb-2">Detailed Plan</h5>
              <p className="text-sm whitespace-pre-wrap">{results.rawResponse}</p>
            </Card>
          )}
        </Card>

        {/* Start Over Button */}
        <Button 
          type="button"
          variant="outline"
          onClick={() => {
            setShowResults(false);
            setResults(null);
          }}
          className="w-full touch-manipulation"
        >
          Create New Plan
        </Button>
      </div>
    );
  }

  // Show input form by default
  return (
    <form className="space-y-3 sm:space-y-4 pb-6" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
      {/* Agent Inbox */}
      <AgentInbox currentAgent="project-manager" onTaskAccept={handleTaskAccept} />

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
        disabled={!prompt.trim() || isLoading}
        className="w-full bg-gradient-to-r from-pink-400 to-pink-400/80 hover:from-pink-500 hover:to-pink-500/80 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
      >
        <Clipboard className="h-5 w-5 mr-2" />
        {isLoading ? 'Generating Plan...' : 'Generate Project Plan'}
      </Button>
    </form>
  );
};

export default ProjectManagerInterface;

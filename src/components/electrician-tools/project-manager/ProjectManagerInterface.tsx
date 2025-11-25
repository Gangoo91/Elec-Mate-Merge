import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Clipboard, 
  Calendar, 
  Building2, 
  Users, 
  Package, 
  MessageSquare, 
  FileCheck,
  FileText,
  Lightbulb,
  Loader2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { MobileInput } from "@/components/ui/mobile-input";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";
import ProjectManagerProcessingView from "./ProjectManagerProcessingView";
import ProjectManagerResults from "./ProjectManagerResults";
import { FormSection } from "./FormSection";
import { InlineProjectTypeSelector } from "./InlineProjectTypeSelector";
import { CollapsibleFormSection } from "./CollapsibleFormSection";
import { ExampleProjectsGrid } from "./ExampleProjectsGrid";
import { TemplateLibrary } from "./templates/TemplateLibrary";
import { ScopeChecklist } from "./input/ScopeChecklist";
import { ConstraintsSection, ProjectConstraints } from "./input/ConstraintsSection";

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
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [constraints, setConstraints] = useState<ProjectConstraints>({
    accessRestrictions: '',
    workingHours: '',
    occupiedProperty: false,
    medicalEquipment: false,
    budgetLimit: undefined,
    otherTrades: '',
    specialRequirements: ''
  });
  
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

  const handleTemplateSelect = (templatePlan: Partial<any>) => {
    // Pre-fill form with template data
    if (templatePlan.phases && templatePlan.phases.length > 0) {
      const firstPhase = templatePlan.phases[0];
      setPrompt(`Use template with ${templatePlan.phases.length} phases: ${firstPhase.phaseName || 'Phase 1'}`);
    }
    toast.success("Template loaded", {
      description: "You can modify the scope and generate a customized plan"
    });
  };

  const handleGenerate = async () => {
    setShowResults(true);
    setResults(null);
    setGenerationStartTime(Date.now());
    
    // Build enhanced request with scope and constraints
    const scopeText = selectedScope.length > 0 
      ? `\n\nScope items: ${selectedScope.join(', ')}`
      : '';
    
    const constraintsText = Object.entries(constraints)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    
    const enhancedQuery = `${prompt}${scopeText}${constraintsText ? `\n\nConstraints: ${constraintsText}` : ''}`;
    
    const request = {
      query: enhancedQuery,
      projectType: selectedType,
      scope: selectedScope,
      constraints,
      timeline: duration || undefined,
      projectName: projectName || undefined,
      location: location || undefined,
      clientName: clientName || undefined,
      startDate: startDate || undefined
    };
    
    const response = await callAgent('project-manager', request);
    
    if (response?.success && response.data) {
      setResults(response.data);
      toast.success("Project Plan Generated", {
        description: "Your comprehensive project plan is ready"
      });
    }
  };


  // Show loading view when generating
  if (showResults && isLoading) {
    return <ProjectManagerProcessingView progress={progress} startTime={generationStartTime} />;
  }

  // Show results when complete
  if (showResults && results) {
    return (
      <ProjectManagerResults
        results={results}
        prompt={prompt}
        selectedType={selectedType}
        projectName={projectName}
        startDate={startDate}
        onStartOver={() => {
          setShowResults(false);
          setResults(null);
        }}
      />
    );
  }

  // Show input form by default
  return (
    <form className="space-y-0" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
      {/* Agent Inbox */}
      <AgentInbox currentAgent="project-manager" onTaskAccept={handleTaskAccept} />
      
      {/* Project Type - Inline Selector */}
      <FormSection>
        <InlineProjectTypeSelector 
          selectedType={selectedType}
          onChange={setSelectedType}
        />
      </FormSection>
      
      {/* Project Scope - Primary Section */}
      <FormSection>
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            What project needs planning and coordination?
            <span className="text-red-400 ml-1">*</span>
          </Label>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a project plan for a commercial office fit-out with 40 LED panels, new distribution board, data cabling, and emergency lighting - 5 day installation window"
            className="min-h-[120px] text-base resize-none"
            style={{ fontSize: '16px' }}
            maxLength={500}
          />
          <div className="flex justify-between items-center text-xs">
            <p className="text-muted-foreground">
              Include scope, timeline, and key deliverables
            </p>
            <p className={cn(
              "font-medium",
              prompt.length > 100 
                ? "text-pink-400" 
                : "text-muted-foreground"
            )}>
              {prompt.length} chars
            </p>
          </div>
        </div>
      </FormSection>
      
      {/* Project Information - Collapsed */}
      <CollapsibleFormSection 
        title="Project Information" 
        subtitle="Add project details for comprehensive planning"
        badge="optional"
        icon={<FileText className="h-5 w-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <MobileInput
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g., Retail Unit Fit-Out"
          />
          <MobileInput
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Birmingham, UK"
          />
          <MobileInput
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g., Retail Corp Ltd"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <MobileInput
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <MobileInput
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 5 days"
            />
          </div>
        </div>
      </CollapsibleFormSection>
      
      {/* Template Library - Collapsed */}
      <CollapsibleFormSection 
        title="Start from Template" 
        subtitle="Pre-built project plans to customise"
        badge="optional"
        icon={<FileText className="h-5 w-5" />}
        defaultOpen={false}
      >
        <TemplateLibrary projectType={selectedType} onSelectTemplate={handleTemplateSelect} />
      </CollapsibleFormSection>

      {/* Scope Checklist - Collapsed */}
      <CollapsibleFormSection 
        title="Scope Checklist" 
        subtitle="Select work items included in this project"
        badge="optional"
        icon={<Package className="h-5 w-5" />}
        defaultOpen={false}
      >
        <ScopeChecklist 
          onScopeChange={setSelectedScope}
          initialScope={selectedScope}
        />
      </CollapsibleFormSection>

      {/* Constraints - Collapsed */}
      <CollapsibleFormSection 
        title="Project Constraints" 
        subtitle="Access, timing, and special requirements"
        badge="optional"
        icon={<AlertCircle className="h-5 w-5" />}
        defaultOpen={false}
      >
        <ConstraintsSection 
          onConstraintsChange={setConstraints}
          initialConstraints={constraints}
        />
      </CollapsibleFormSection>

      {/* Example Project Requests - Collapsed */}
      <CollapsibleFormSection 
        title="Example Project Requests" 
        subtitle="Common scenarios to get started quickly"
        badge="optional"
        icon={<Lightbulb className="h-5 w-5" />}
        defaultOpen={false}
      >
        <ExampleProjectsGrid 
          examples={EXAMPLE_SCENARIOS}
          onSelect={handleExampleClick}
        />
      </CollapsibleFormSection>
      
      {/* Generate Button - Inline */}
      <FormSection>
        <Button 
          type="submit"
          size="lg"
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Generating Plan...
            </>
          ) : (
            <>
              <Clipboard className="h-5 w-5 mr-2" />
              Generate Project Plan
            </>
          )}
        </Button>
      </FormSection>
    </form>
  );
};

export default ProjectManagerInterface;

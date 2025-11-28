import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Clipboard, 
  FileText,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import { useSimpleAgent } from "@/hooks/useSimpleAgent";
import ProjectManagerProcessingView from "./ProjectManagerProcessingView";
import ProjectManagerResults from "./ProjectManagerResults";
import { FormSection } from "./FormSection";
import { InlineProjectTypeSelector } from "./InlineProjectTypeSelector";
import { CollapsibleFormSection } from "./CollapsibleFormSection";
import { ProjectTemplateGrid } from "./ProjectTemplateGrid";
import { ProjectTemplate } from "@/lib/project-templates";
import { ProjectConstraints } from "./input/ConstraintsSection";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setPrompt(template.promptTemplate);
    setDuration(template.estimatedDuration);
    
    toast.success("Template Applied", {
      description: "Template loaded. You can now edit and generate your plan."
    });
  };

  const handleGenerate = async () => {
    setShowResults(true);
    setResults(null);
    setGenerationStartTime(Date.now());
    
    // Build enhanced request with constraints
    const constraintsText = Object.entries(constraints)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    
    const enhancedQuery = `${prompt}${constraintsText ? `\n\nConstraints: ${constraintsText}` : ''}`;
    
    const request = {
      query: enhancedQuery,
      projectType: selectedType,
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
      
      {/* Hero Textarea - FIRST */}
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
          <p className="text-xs text-muted-foreground">
            Include scope, timeline, and key deliverables
          </p>
        </div>
      </FormSection>
      
      {/* Project Type - Inline Selector */}
      <FormSection>
        <InlineProjectTypeSelector 
          selectedType={selectedType}
          onChange={setSelectedType}
        />
      </FormSection>
      
      {/* Quick Start - Collapsed */}
      <CollapsibleFormSection 
        title="Quick Start" 
        subtitle="Start from a template"
        badge="optional"
        icon={<Lightbulb className="h-5 w-5" />}
        defaultOpen={false}
      >
        <ProjectTemplateGrid
          selectedCategory={selectedType}
          onSelectTemplate={handleTemplateSelect}
        />
      </CollapsibleFormSection>

      {/* Project Details - Collapsed (Simplified) */}
      <CollapsibleFormSection 
        title="Project Details" 
        subtitle="Add project information for comprehensive planning"
        badge="optional"
        icon={<FileText className="h-5 w-5" />}
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-sm font-medium text-left">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Retail Unit Fit-Out"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-left">Location/Address</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Birmingham, UK"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-sm font-medium text-left">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., Retail Corp Ltd"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-left">Start Date (Optional)</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-left">Duration (Optional)</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 5 days"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium text-left">Key Constraints</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="occupiedProperty"
                  checked={constraints.occupiedProperty}
                  onCheckedChange={(checked) => 
                    setConstraints(prev => ({ ...prev, occupiedProperty: checked as boolean }))
                  }
                />
                <label
                  htmlFor="occupiedProperty"
                  className="text-sm leading-none cursor-pointer text-left"
                >
                  Property will be occupied during work
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medicalEquipment"
                  checked={constraints.medicalEquipment}
                  onCheckedChange={(checked) => 
                    setConstraints(prev => ({ ...prev, medicalEquipment: checked as boolean }))
                  }
                />
                <label
                  htmlFor="medicalEquipment"
                  className="text-sm leading-none cursor-pointer text-left"
                >
                  Medical or critical equipment present
                </label>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleFormSection>
      
      {/* Generate Button */}
      <FormSection>
        <Button 
          type="submit"
          size="lg"
          disabled={!prompt.trim() || isLoading}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg font-semibold"
        >
          <Clipboard className="h-5 w-5 mr-2" />
          Generate Project Plan
        </Button>
      </FormSection>
    </form>
  );
};

export default ProjectManagerInterface;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  AlertTriangle, 
  HardHat, 
  FileText, 
  Lightbulb, 
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';
import { MobileInput } from '@/components/ui/mobile-input';
import { FormSection } from './FormSection';
import { InlineProjectTypeSelector } from './InlineProjectTypeSelector';
import { CollapsibleFormSection } from './CollapsibleFormSection';
import { ExampleScenariosGrid } from './ExampleScenariosGrid';
import { cn } from '@/lib/utils';

interface ExampleScenario {
  title: string;
  icon: typeof Shield;
  prompt: string;
}

const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    title: "Risk Assessment - Domestic Rewire",
    icon: Shield,
    prompt: "Create a comprehensive risk assessment for a full rewire of a 3-bedroom house with occupants remaining in situ during works"
  },
  {
    title: "Live Environment Working",
    icon: AlertTriangle,
    prompt: "Risk assessment for working on live distribution board in hospital critical care unit - isolation not possible, identify hazards and control measures"
  },
  {
    title: "Working at Height",
    icon: HardHat,
    prompt: "Risk assessment for installing external lighting 4 metres high on commercial building, including scaffold access and fall prevention"
  },
  {
    title: "Confined Space Entry",
    icon: Shield,
    prompt: "Risk assessment for cable pulling through underground ducting and inspection pit entry, including rescue procedures and atmosphere testing"
  },
  {
    title: "PPE Requirements",
    icon: Shield,
    prompt: "What PPE is required for installing a 400A 3-phase supply in a manufacturing plant with overhead cranes operating?"
  },
  {
    title: "Emergency Procedures",
    icon: AlertTriangle,
    prompt: "Emergency response procedures for electrical incident during maintenance on 11kV switchgear, including first aid and incident reporting"
  }
];

interface HealthSafetyInputProps {
  onGenerate: (query: string, projectInfo: any, workType: 'domestic' | 'commercial' | 'industrial') => void;
  isProcessing: boolean;
}

export const HealthSafetyInput = ({ onGenerate, isProcessing }: HealthSafetyInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [clientName, setClientName] = useState("");

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    if (contextData) {
      try {
        const voltages = contextData.circuits?.map((c: any) => c.voltage).join(', ') || '230V';
        const workType = contextData.workType || contextData.installationType || 'installation';
        
        setPrompt(instruction || `Risk assessment for ${workType}: ${voltages} system, ${contextData.location || 'site'}`);
        
        if (contextData.projectName) setProjectName(contextData.projectName);
        if (contextData.location) setLocation(contextData.location);
        if (contextData.clientName) setClientName(contextData.clientName);
        
        toast.success('Context loaded', { description: 'Work forwarded from another agent' });
      } catch (error) {
        setPrompt(instruction || 'Safety assessment for forwarded work');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt, { projectName, location, clientName }, selectedType);
  };

  return (
    <form className="space-y-0" onSubmit={handleSubmit}>
      <AgentInbox currentAgent="health-safety" onTaskAccept={handleTaskAccept} />

      {/* Safety Documentation Query - Hero Section */}
      <FormSection>
        <div className="space-y-3">
          <Label className="text-base font-semibold">
            What safety documentation do you need? 
            <span className="text-muted-foreground ml-1">(required)</span>
          </Label>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Provide a risk assessment for installing a 3-phase distribution board in an active commercial kitchen..."
            className="min-h-[120px] text-base resize-none"
            maxLength={500}
          />
          <div className="flex justify-between items-center text-xs">
            <p className="text-muted-foreground">
              Describe site conditions, hazards, and safety requirements
            </p>
            <p className={cn(
              "font-medium",
              prompt.length > 100 
                ? "text-orange-400" 
                : "text-muted-foreground"
            )}>
              {prompt.length} chars
            </p>
          </div>
        </div>
      </FormSection>
      
      {/* Project Type - Inline Selector */}
      <FormSection>
        <InlineProjectTypeSelector 
          selectedType={selectedType}
          onChange={setSelectedType}
        />
      </FormSection>
      
      {/* Project Information - Collapsed */}
      <CollapsibleFormSection 
        title="Project Information" 
        subtitle="Add project details for comprehensive documentation"
        badge="optional"
        icon={<FileText className="h-5 w-5" />}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <MobileInput
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g., Office Block Rewire"
          />
          <MobileInput
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., London, UK"
          />
          <MobileInput
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g., ABC Construction Ltd"
          />
        </div>
      </CollapsibleFormSection>
      
      {/* Example Safety Requests - Collapsed */}
      <CollapsibleFormSection 
        title="Example Safety Requests" 
        subtitle="Common scenarios to get started quickly"
        badge="optional"
        icon={<Lightbulb className="h-5 w-5" />}
        defaultOpen={false}
      >
        <ExampleScenariosGrid 
          scenarios={EXAMPLE_SCENARIOS}
          onSelect={handleExampleClick}
        />
      </CollapsibleFormSection>
      
      {/* Generate Button - Inline */}
      <FormSection>
        <Button 
          type="submit"
          size="lg"
          disabled={!prompt.trim() || isProcessing}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-foreground h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Shield className="h-5 w-5 mr-2" />
              Generate Safety Documentation
            </>
          )}
        </Button>
      </FormSection>
    </form>
  );
};

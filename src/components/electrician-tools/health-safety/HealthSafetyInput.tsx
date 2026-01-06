import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Shield,
  AlertTriangle,
  HardHat,
  FileText,
  Lightbulb,
  ChevronDown,
  Home,
  Building2,
  Factory
} from 'lucide-react';
import { toast } from 'sonner';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';
import { MobileInput } from '@/components/ui/mobile-input';
import { cn } from '@/lib/utils';
import { StickySubmitButton } from '@/components/agents/shared/StickySubmitButton';
import { AGENT_CONFIG } from '@/components/agents/shared/AgentConfig';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

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
  }
];

const TYPE_CONFIG = {
  domestic: { label: 'Domestic', icon: Home },
  commercial: { label: 'Commercial', icon: Building2 },
  industrial: { label: 'Industrial', icon: Factory }
} as const;

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
  const [showExamples, setShowExamples] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const config = AGENT_CONFIG['health-safety'];

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
    setShowExamples(false);
    toast.success("Example loaded", {
      description: "Query filled in - ready to generate"
    });
  };

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error("Please describe what safety documentation you need");
      return;
    }
    onGenerate(prompt, { projectName, location, clientName }, selectedType);
  };

  // Character count styling
  const getCharCountClass = () => {
    if (prompt.length < 50) return 'text-white/40';
    if (prompt.length < 300) return 'text-emerald-400';
    return 'text-amber-400';
  };

  const isValid = prompt.trim().length > 0;

  return (
    <div className="space-y-4 pb-24 sm:pb-6">
      <AgentInbox currentAgent="health-safety" onTaskAccept={handleTaskAccept} />

      {/* Safety Documentation Query */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ background: `${config.gradientFrom}20` }}
              >
                <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
              </div>
              Safety Requirements
            </Label>
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-lg transition-colors",
              getCharCountClass(),
              prompt.length >= 50 && "bg-white/5"
            )}>
              {prompt.length} {prompt.length >= 50 && '✓'}
            </span>
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe site conditions, hazards, and safety requirements..."
            className="agent-input"
            rows={5}
            autoComplete="off"
            spellCheck={true}
            maxLength={500}
          />

          <p className="text-xs sm:text-sm text-white/50">
            Include specific hazards and site conditions for accurate assessment
          </p>
        </div>
      </div>

      {/* Project Type */}
      <div className="agent-card p-4 sm:p-6" style={{ borderColor: `${config.gradientFrom}15` }}>
        <div className="space-y-3">
          <Label className="text-base sm:text-lg font-semibold">Project Type</Label>
          <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            {(Object.entries(TYPE_CONFIG) as [keyof typeof TYPE_CONFIG, typeof TYPE_CONFIG[keyof typeof TYPE_CONFIG]][]).map(([key, typeConfig]) => {
              const Icon = typeConfig.icon;
              const isSelected = selectedType === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedType(key)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl",
                    "transition-all duration-200 touch-manipulation active:scale-[0.98]",
                    "min-h-[56px] font-medium",
                    isSelected && "shadow-lg"
                  )}
                  style={
                    isSelected
                      ? {
                          background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                          color: '#000',
                        }
                      : {
                          background: 'transparent',
                          color: 'rgba(255,255,255,0.6)',
                        }
                  }
                >
                  <Icon
                    className={cn("h-5 w-5", !isSelected && "opacity-60")}
                    style={!isSelected ? { color: config.gradientFrom } : undefined}
                  />
                  <span className={cn(
                    "text-xs font-semibold",
                    !isSelected && "text-white/80"
                  )}>
                    {typeConfig.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <Collapsible open={showProjectDetails} onOpenChange={setShowProjectDetails}>
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Project Details</span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                Optional
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showProjectDetails && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0 space-y-4">
            <p className="text-xs text-white/50 pb-2">
              Add for comprehensive documentation
            </p>
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
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Example Scenarios */}
      <Collapsible open={showExamples} onOpenChange={setShowExamples}>
        <div className="agent-card overflow-hidden" style={{ borderColor: `${config.gradientFrom}15` }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-white/60" />
              <span className="text-sm sm:text-base font-medium">Example Scenarios</span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                Templates
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showExamples && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EXAMPLE_SCENARIOS.map((scenario, idx) => {
                const ScenarioIcon = scenario.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExampleClick(scenario.prompt)}
                    className="agent-template-card text-left"
                  >
                    <div className="flex items-start gap-3">
                      <ScenarioIcon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: config.gradientFrom }} />
                      <span className="text-sm text-white/80">{scenario.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Sticky Generate Button */}
      <StickySubmitButton
        agentType="health-safety"
        onClick={handleSubmit}
        isDisabled={!isValid}
        isLoading={isProcessing}
      />
    </div>
  );
};

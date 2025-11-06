import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Shield, 
  AlertTriangle, 
  HardHat, 
  Home, 
  Building2, 
  Factory, 
  FileText, 
  Lightbulb, 
  ChevronDown
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { AgentInbox } from '@/components/install-planner-v2/AgentInbox';

interface ExampleScenario {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    title: "RAMS - Domestic Rewire",
    icon: Shield,
    prompt: "Create a comprehensive risk assessment and method statement for a full rewire of a 3-bedroom house with occupants remaining in situ during works"
  },
  {
    title: "Live Environment Working",
    icon: AlertTriangle,
    prompt: "Risk assessment for working on live distribution board in hospital critical care unit - isolation not possible, identify hazards and control measures"
  },
  {
    title: "Working at Height",
    icon: HardHat,
    prompt: "Method statement for installing external lighting 4 metres high on commercial building, including scaffold access and fall prevention"
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
    <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
      <AgentInbox currentAgent="health-safety" onTaskAccept={handleTaskAccept} />

      <Card className="p-3 sm:p-6 bg-gradient-to-br from-orange-500/5 via-background to-background border-orange-500/20">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-full animate-pulse">
            <Shield className="h-6 w-6 text-elec-dark" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold">What safety documentation do you need?</h3>
            <p className="text-sm text-muted-foreground">Describe your requirements and site conditions...</p>
          </div>
        </div>
        <Textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Provide a risk assessment and method statement for installing a 3-phase distribution board in an active commercial kitchen, including live environment hazards and control measures"
          className="min-h-[120px] text-sm sm:text-base resize-none"
          maxLength={500}
        />
        <div className="text-xs text-muted-foreground text-right mt-2">
          {prompt.length}/500
        </div>
      </Card>

      <Card className="p-3 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Home className="h-5 w-5 text-orange-400" />
          <h4 className="font-semibold">Project Type</h4>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            type="button"
            className={selectedType === 'domestic' 
              ? 'bg-gradient-to-r from-orange-400 to-orange-400/80 text-white hover:from-orange-500 hover:to-orange-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-orange-400 border-orange-400/40 hover:bg-orange-400/10'
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
              ? 'bg-gradient-to-r from-orange-400 to-orange-400/80 text-white hover:from-orange-500 hover:to-orange-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-orange-400 border-orange-400/40 hover:bg-orange-400/10'
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
              ? 'bg-gradient-to-r from-orange-400 to-orange-400/80 text-white hover:from-orange-500 hover:to-orange-500/80 flex-1 h-12 touch-manipulation' 
              : 'flex-1 h-12 touch-manipulation text-orange-400 border-orange-400/40 hover:bg-orange-400/10'
            }
            variant={selectedType === 'industrial' ? 'default' : 'outline'}
            onClick={() => setSelectedType('industrial')}
          >
            <Factory className="h-4 w-4 mr-2" />
            Industrial
          </Button>
        </div>
      </Card>

      <Collapsible>
        <Card>
          <CollapsibleTrigger asChild>
            <Button 
              type="button"
              variant="ghost" 
              className="w-full justify-between p-3 sm:p-6 hover:bg-transparent touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-orange-400" />
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
                  placeholder="e.g., Office Block Rewire"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., London, UK"
                  className="h-12 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g., ABC Construction Ltd"
                  className="h-12 touch-manipulation"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible defaultOpen={true}>
        <Card>
          <CollapsibleTrigger asChild>
            <Button 
              type="button"
              variant="ghost" 
              className="w-full justify-between p-3 sm:p-6 hover:bg-transparent touch-manipulation min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-orange-400" />
                <h4 className="font-semibold">Example Safety Requests</h4>
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
                      className="p-3 sm:p-4 cursor-pointer hover:border-orange-400/40 transition-all hover:scale-[1.02] touch-manipulation"
                      onClick={() => handleExampleClick(scenario.prompt)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <IconComponent className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
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

      <Button 
        type="submit"
        size="lg"
        disabled={!prompt.trim() || isProcessing}
        className="w-full bg-gradient-to-r from-orange-400 to-orange-400/80 hover:from-orange-500 hover:to-orange-500/80 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg"
      >
        <Shield className="h-5 w-5 mr-2" />
        {isProcessing ? 'Generating...' : 'Generate Safety Documentation'}
      </Button>
    </form>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Camera
} from "lucide-react";
import { toast } from "sonner";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import PhotoUploadButton from "./PhotoUploadButton";
import { FormSection } from "./FormSection";
import { InlineInstallationTypeSelector } from "./InlineInstallationTypeSelector";
import { CollapsibleFormSection } from "./CollapsibleFormSection";
import { StickyGenerateButton } from "./StickyGenerateButton";

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

interface CommissioningInputProps {
  onGenerate: (data: {
    prompt: string;
    selectedType: 'domestic' | 'commercial' | 'industrial';
    projectName: string;
    location: string;
    clientName: string;
    installationDate: string;
    imageUrl?: string;
  }) => void;
  isProcessing: boolean;
}

const CommissioningInput = ({ onGenerate, isProcessing }: CommissioningInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [clientName, setClientName] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handlePhotoUploaded = (url: string) => {
    setImageUrl(url);
    if (!prompt.trim()) {
      setPrompt("Analyse this installation photo for safety issues, compliance problems, and testing requirements");
    }
    toast.success("Photo ready for analysis");
  };

  const handleTaskAccept = (contextData: any, instruction: string | null) => {
    if (contextData) {
      try {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a testing requirement");
      return;
    }
    
    onGenerate({
      prompt,
      selectedType,
      projectName,
      location,
      clientName,
      installationDate,
      imageUrl
    });
  };

  return (
    <form className="space-y-0 pb-20 sm:pb-6" onSubmit={handleSubmit}>
      {/* Agent Inbox */}
      <AgentInbox currentAgent="commissioning" onTaskAccept={handleTaskAccept} />

      {/* Hero Section - Testing Description */}
      <FormSection className="border-t-0">
        <div className="flex items-start gap-2 sm:gap-3 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10 flex-shrink-0">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold">What needs testing?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Describe the installation and required tests
            </p>
          </div>
        </div>
        <Textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Testing procedure for new 18th Edition consumer unit with 12 circuits..."
          className="min-h-[100px] sm:min-h-[120px] text-base resize-none focus:ring-2 focus:ring-purple-400"
          maxLength={500}
          autoComplete="off"
          spellCheck={true}
        />
        <div className="text-xs text-muted-foreground text-right mt-2">
          {prompt.length}/500 {prompt.length < 50 && "• 50+ chars recommended"}
        </div>
      </FormSection>

      {/* Installation Type - Inline Selector */}
      <FormSection>
        <InlineInstallationTypeSelector
          selectedType={selectedType}
          onChange={setSelectedType}
          disabled={isProcessing}
        />
      </FormSection>

      {/* Photo Upload - Collapsed */}
      <CollapsibleFormSection
        title="Upload Photo for Analysis"
        subtitle="AI visual inspection for safety & compliance"
        icon={Camera}
        badge="optional"
        defaultOpen={false}
      >
        <PhotoUploadButton 
          onPhotoUploaded={handlePhotoUploaded}
          disabled={isProcessing}
        />
        {imageUrl && (
          <div className="mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-400 font-medium">✓ Photo uploaded - AI will analyse for safety issues and compliance</p>
          </div>
        )}
      </CollapsibleFormSection>

      {/* Project Information - Collapsed */}
      <CollapsibleFormSection
        title="Project Information"
        subtitle="Add details for more accurate output"
        icon={FileText}
        badge="optional"
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-sm font-medium">Project Name</Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., Office Refurbishment"
              className="h-12 text-base"
              inputMode="text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Manchester, UK"
              className="h-12 text-base"
              inputMode="text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-sm font-medium">Client Name</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., XYZ Properties Ltd"
              className="h-12 text-base"
              inputMode="text"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="installationDate" className="text-sm font-medium">Installation Date</Label>
            <Input
              id="installationDate"
              type="date"
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>
      </CollapsibleFormSection>

      {/* Example Scenarios - Collapsed on mobile, open on desktop */}
      <CollapsibleFormSection
        title="Example Testing Requests"
        icon={Lightbulb}
        defaultOpen={false}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {EXAMPLE_SCENARIOS.map((scenario, idx) => {
            const IconComponent = scenario.icon;
            return (
              <Card 
                key={idx}
                className="p-3 cursor-pointer hover:border-purple-400/40 transition-all hover:scale-[1.02] touch-manipulation active:scale-95"
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
      </CollapsibleFormSection>

      {/* Generate Button - Sticky on mobile */}
      <StickyGenerateButton>
        <Button 
          type="submit"
          size="lg"
          disabled={!prompt.trim() || isProcessing}
          className="w-full bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white h-12 sm:h-14 touch-manipulation text-base sm:text-lg font-semibold shadow-lg active:scale-95 transition-transform"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Generating...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Generate Testing Procedure
            </>
          )}
        </Button>
      </StickyGenerateButton>
    </form>
  );
};

export default CommissioningInput;

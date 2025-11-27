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
  Camera,
  Loader2,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { AgentInbox } from "@/components/install-planner-v2/AgentInbox";
import PhotoUploadButton from "./PhotoUploadButton";
import { InlineInstallationTypeSelector } from "./InlineInstallationTypeSelector";
import { InputHeroBar } from "./redesign/InputHeroBar";
import { InputCardSection } from "./redesign/InputCardSection";


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
    <div className="space-y-6">
      {/* Hero Bar */}
      <InputHeroBar />

      <form className="space-y-4 px-2 sm:px-4" onSubmit={handleSubmit}>
        {/* Agent Inbox */}
        <AgentInbox currentAgent="commissioning" onTaskAccept={handleTaskAccept} />

        {/* Main Testing Description Card */}
        <Card className="bg-elec-card border-elec-yellow/20 hover:border-elec-yellow/30 transition-colors">
          <div className="p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3 mb-3">
              <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white">What needs testing?</h3>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                  Describe the installation and required tests
                </p>
              </div>
            </div>
            
            <div className="relative">
              {/* Decorative grid overlay */}
              <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-lg"
                style={{
                  backgroundImage: `linear-gradient(to right, hsl(var(--elec-yellow)) 1px, transparent 1px),
                                   linear-gradient(to bottom, hsl(var(--elec-yellow)) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              
              <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Testing procedure for new 18th Edition consumer unit with 12 circuits..."
                className="min-h-[140px] sm:min-h-[120px] text-base resize-none focus:ring-2 focus:ring-elec-yellow border-elec-yellow/20 bg-elec-dark/40 relative"
                maxLength={500}
                autoComplete="off"
                spellCheck={true}
              />
            </div>
            
            <div className="text-xs text-white/70 text-right mt-2">
              <span className="text-elec-yellow font-medium">{prompt.length}</span>/500 
              {prompt.length < 50 && <span className="ml-2 text-elec-yellow/80">• 50+ chars recommended</span>}
            </div>
          </div>
        </Card>

        {/* Installation Type Selector */}
        <Card className="bg-elec-card border-elec-yellow/20">
          <div className="p-3 sm:p-4">
            <InlineInstallationTypeSelector
              selectedType={selectedType}
              onChange={setSelectedType}
              disabled={isProcessing}
            />
          </div>
        </Card>

        {/* Photo Upload Section */}
        <InputCardSection
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
            <div className="mt-3 p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <p className="text-xs text-white/90 font-medium">Photo uploaded - AI will analyse for safety issues and compliance</p>
              </div>
            </div>
          )}
        </InputCardSection>

        {/* Project Information Section */}
        <InputCardSection
          title="Project Information"
          subtitle="Add details for more accurate output"
          icon={Settings}
          badge="optional"
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium text-white">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Office Refurbishment"
                className="h-12 text-base border-elec-yellow/20 focus:border-elec-yellow"
                inputMode="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-white">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Manchester, UK"
                className="h-12 text-base border-elec-yellow/20 focus:border-elec-yellow"
                inputMode="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-sm font-medium text-white">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., XYZ Properties Ltd"
                className="h-12 text-base border-elec-yellow/20 focus:border-elec-yellow"
                inputMode="text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationDate" className="text-sm font-medium text-white">Installation Date</Label>
              <Input
                id="installationDate"
                type="date"
                value={installationDate}
                onChange={(e) => setInstallationDate(e.target.value)}
                className="h-12 text-base border-elec-yellow/20 focus:border-elec-yellow"
              />
            </div>
          </div>
        </InputCardSection>

        {/* Example Scenarios Section */}
        <InputCardSection
          title="Example Testing Requests"
          subtitle="Quick start templates"
          icon={Lightbulb}
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXAMPLE_SCENARIOS.map((scenario, idx) => {
              const IconComponent = scenario.icon;
              return (
                <Card 
                  key={idx}
                  className="p-4 cursor-pointer border-elec-yellow/20 bg-elec-dark/40 hover:border-elec-yellow/40 hover:bg-elec-dark/60 transition-all hover:scale-[1.02] touch-manipulation active:scale-95"
                  onClick={() => handleExampleClick(scenario.prompt)}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <IconComponent className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <h5 className="font-semibold text-sm text-white">{scenario.title}</h5>
                  </div>
                   <p className="text-xs text-white/80 line-clamp-3">
                    {scenario.prompt}
                  </p>
                </Card>
              );
            })}
          </div>
        </InputCardSection>

        {/* Generate Button */}
        <div className="sticky bottom-0 pb-4 sm:pb-6 pt-3 sm:pt-4 bg-gradient-to-t from-elec-dark via-elec-dark to-transparent">
          <Button 
            type="submit"
            size="lg"
            disabled={!prompt.trim() || isProcessing}
            className="w-full bg-gradient-to-r from-elec-yellow/90 to-elec-yellow hover:from-elec-yellow hover:to-elec-yellow/90 text-elec-dark font-bold shadow-lg hover:shadow-xl hover:shadow-elec-yellow/20 transition-all h-14"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Testing Procedure...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Generate Testing Procedure
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommissioningInput;

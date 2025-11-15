import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DesignInputs, CircuitInput } from "@/types/installation-design";
import { ProjectInfoStep } from "./ProjectInfoStep";
import { SupplyDetailsStep } from "./SupplyDetailsStep";
import { CircuitBuilderStep } from "./CircuitBuilderStep";
import { ReviewStep } from "./ReviewStep";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface StructuredDesignWizardProps {
  onGenerate: (inputs: DesignInputs) => Promise<void>;
  isProcessing: boolean;
}

const STEPS = [
  { id: 'project', label: 'Project Info', description: 'Basic details' },
  { id: 'supply', label: 'Supply Details', description: 'Electrical characteristics' },
  { id: 'circuits', label: 'Build Circuits', description: 'Add your circuits' },
  { id: 'review', label: 'Review', description: 'Final check' }
] as const;

export const StructuredDesignWizard = ({ onGenerate, isProcessing }: StructuredDesignWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Project Info
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');
  const [installationType, setInstallationType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');

  // Supply Details
  const [voltage, setVoltage] = useState(230);
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [ze, setZe] = useState(0.35);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-C-S');
  const [pscc, setPscc] = useState<number | undefined>(undefined);
  const [ambientTemp, setAmbientTemp] = useState(25);
  const [installationMethod, setInstallationMethod] = useState('clipped-direct');
  const [groupingFactor, setGroupingFactor] = useState(1);
  const [mainSwitchRating, setMainSwitchRating] = useState<number | undefined>(undefined);
  const [propertyAge, setPropertyAge] = useState<'new-build' | 'modern' | 'older' | 'very-old' | undefined>(undefined);

  // Circuits
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);

  // Update defaults when installation type or phases change
  useEffect(() => {
    if (installationType === 'industrial') {
      setPhases('three');
      setVoltage(400);
    } else {
      setPhases('single');
      setVoltage(230);
    }
  }, [installationType]);

  useEffect(() => {
    setVoltage(phases === 'single' ? 230 : 400);
  }, [phases]);

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Project Info
        return projectName.trim() !== '' && location.trim() !== '';
      case 1: // Supply Details
        return voltage > 0 && ze > 0;
      case 2: // Circuits
        return circuits.length > 0 && circuits.every(c => c.name && c.loadPower);
      case 3: // Review
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      toast.error('Please complete all required fields');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleGenerate = async () => {
    if (!canProceed()) {
      toast.error('Please complete all required fields');
      return;
    }

    const inputs: DesignInputs = {
      projectName,
      location,
      clientName,
      electricianName,
      propertyType: installationType,
      voltage,
      phases,
      ze,
      earthingSystem,
      pscc,
      mainSwitchRating,
      ambientTemp,
      installationMethod: installationMethod as any,
      groupingFactor,
      propertyAge,
      circuits,
      additionalPrompt: `Structured input design with ${circuits.length} circuits`
    };

    await onGenerate(inputs);
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Design Your Installation</h3>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              {currentStep + 1} / {STEPS.length}
            </Badge>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="hidden sm:grid grid-cols-4 gap-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`text-center transition-all ${
                  index === currentStep
                    ? 'text-primary'
                    : index < currentStep
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground/50'
                }`}
              >
                <div
                  className={`text-xs sm:text-sm font-medium mb-1 ${
                    index === currentStep ? 'font-bold' : ''
                  }`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile: Current Step Only */}
          <div className="sm:hidden text-center">
            <div className="text-sm font-bold text-primary">{STEPS[currentStep].label}</div>
            <div className="text-xs text-muted-foreground">{STEPS[currentStep].description}</div>
          </div>
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-4 sm:p-6">
        {currentStep === 0 && (
          <ProjectInfoStep
            projectName={projectName}
            setProjectName={setProjectName}
            location={location}
            setLocation={setLocation}
            clientName={clientName}
            setClientName={setClientName}
            electricianName={electricianName}
            setElectricianName={setElectricianName}
            installationType={installationType}
            setInstallationType={setInstallationType}
          />
        )}

        {currentStep === 1 && (
          <SupplyDetailsStep
            voltage={voltage}
            setVoltage={setVoltage}
            phases={phases}
            setPhases={setPhases}
            ze={ze}
            setZe={setZe}
            earthingSystem={earthingSystem}
            setEarthingSystem={setEarthingSystem}
            pscc={pscc}
            setPscc={setPscc}
            ambientTemp={ambientTemp}
            setAmbientTemp={setAmbientTemp}
            installationMethod={installationMethod}
            setInstallationMethod={setInstallationMethod}
            groupingFactor={groupingFactor}
            setGroupingFactor={setGroupingFactor}
            installationType={installationType}
            mainSwitchRating={mainSwitchRating}
            setMainSwitchRating={setMainSwitchRating}
            propertyAge={propertyAge}
            setPropertyAge={setPropertyAge}
          />
        )}

        {currentStep === 2 && (
          <CircuitBuilderStep
            circuits={circuits}
            setCircuits={setCircuits}
            installationType={installationType}
          />
        )}

        {currentStep === 3 && (
          <ReviewStep
            inputs={{
              projectName,
              location,
              clientName,
              electricianName,
              propertyType: installationType,
              voltage,
              phases,
              ze,
              earthingSystem,
              pscc,
              ambientTemp,
              installationMethod: installationMethod as any,
              groupingFactor,
              circuits
            }}
          />
        )}
      </Card>

      {/* Navigation */}
      <div className="mt-6 mb-safe">
        <Card className="p-4 shadow-sm border-t-2 border-primary/20">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isProcessing}
              className="gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            
            <div className="flex-1 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Step {currentStep + 1} of {STEPS.length}
              </p>
            </div>

            {currentStep < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isProcessing}
                className="gap-2 touch-manipulation"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleGenerate}
                disabled={!canProceed() || isProcessing}
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 touch-manipulation"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span className="hidden sm:inline">Generating Design...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span className="hidden sm:inline">Generate Circuit Design</span>
                    <span className="sm:hidden">Generate</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

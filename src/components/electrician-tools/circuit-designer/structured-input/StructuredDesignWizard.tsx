import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      mainSwitchRating: undefined,
      ambientTemp,
      installationMethod: installationMethod as any,
      groupingFactor,
      circuits,
      additionalPrompt: `Structured input design with ${circuits.length} circuits`
    };

    await onGenerate(inputs);
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{STEPS[currentStep].label}</h3>
            <p className="text-sm text-muted-foreground">{STEPS[currentStep].description}</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />

        {/* Step Pills */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => index < currentStep && setCurrentStep(index)}
              disabled={index > currentStep}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : index < currentStep
                  ? 'bg-primary/20 text-primary hover:bg-primary/30'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {step.label}
            </button>
          ))}
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
      <Card className="p-4 sticky bottom-4 z-10 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isProcessing}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isProcessing}
              className="gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={!canProceed() || isProcessing}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-primary/80"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Generating Design...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Circuit Design
                </>
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

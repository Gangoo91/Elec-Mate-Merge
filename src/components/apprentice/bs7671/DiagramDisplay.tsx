
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Zap, Cable, Settings } from "lucide-react";
import { BS7671StepData } from "@/data/bs7671-steps/enhancedStepData";
import SafeIsolationDiagram from "./diagrams/SafeIsolationDiagram";
import ContinuityTestingDiagram from "./diagrams/ContinuityTestingDiagram";
import VisualInspectionDiagram from "./diagrams/VisualInspectionDiagram";
import MFTConnectionDiagram from "./diagrams/MFTConnectionDiagram";
import InsulationTestingDiagram from "./diagrams/InsulationTestingDiagram";
import EarthFaultLoopDiagram from "./diagrams/EarthFaultLoopDiagram";
import RCDTestingDiagram from "./diagrams/RCDTestingDiagram";
import InitialVerificationDiagram from "./diagrams/InitialVerificationDiagram";
import ComplianceChecklistDiagram from "./diagrams/ComplianceChecklistDiagram";
import DocumentationRequirementsDiagram from "./diagrams/DocumentationRequirementsDiagram";

interface DiagramDisplayProps {
  stepData: BS7671StepData;
  systemType?: string;
  installationType?: string;
}

const DiagramDisplay = ({ stepData, systemType, installationType }: DiagramDisplayProps) => {
  const getDiagramComponent = () => {
    const stepId = stepData.id;
    const category = stepData.category;
    const title = stepData.title.toLowerCase();

    // Initial verification and planning steps
    if (stepId === 1 || title.includes('initial verification') || title.includes('planning')) {
      return <InitialVerificationDiagram stepType={stepData.title} installationType={installationType} />;
    }

    // Compliance and regulation checking
    if (stepId === 2 || title.includes('compliance') || title.includes('regulation')) {
      return <ComplianceChecklistDiagram installationType={installationType} />;
    }

    // Documentation requirements
    if (stepId === 3 || title.includes('documentation') || title.includes('certificate')) {
      return <DocumentationRequirementsDiagram installationType={installationType} />;
    }

    // Safe isolation procedures
    if (stepId === 4 || title.includes('isolation')) {
      return <SafeIsolationDiagram systemType={systemType} />;
    }

    // Continuity testing (R1+R2)
    if (stepId === 5 || title.includes('continuity')) {
      return <ContinuityTestingDiagram systemType={systemType} installationType={installationType} />;
    }

    // Insulation resistance testing
    if (stepId === 6 || title.includes('insulation')) {
      return <InsulationTestingDiagram systemType={systemType} installationType={installationType} />;
    }

    // Earth fault loop impedance testing
    if (stepId === 8 || title.includes('earth fault loop') || title.includes('zs')) {
      return <EarthFaultLoopDiagram systemType={systemType} />;
    }

    // RCD testing
    if (stepId === 9 || title.includes('rcd')) {
      return <RCDTestingDiagram systemType={systemType} />;
    }

    // Visual inspection steps
    if (category === "Visual Inspection") {
      return <VisualInspectionDiagram stepType={stepData.title} installationType={installationType} />;
    }

    // MFT connection diagrams for electrical testing
    if (category === "Electrical Testing" && stepData.mftSettings) {
      return <MFTConnectionDiagram stepData={stepData} systemType={systemType} />;
    }

    // Default fallback for documentation steps
    if (category === "Documentation") {
      return <DocumentationRequirementsDiagram installationType={installationType} />;
    }

    return null;
  };

  const diagramComponent = getDiagramComponent();

  if (!diagramComponent) return null;

  return (
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-indigo-500/20 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="pb-3 relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border border-indigo-500/30">
            <Image className="h-5 w-5 text-indigo-400" />
          </div>
          Step Diagram & Visual Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="p-4 rounded-xl bg-white/10 border border-indigo-500/20">
          {diagramComponent}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiagramDisplay;

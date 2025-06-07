
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
    <Card className="border-indigo-500/30 bg-indigo-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-indigo-300">
          <Image className="h-5 w-5" />
          Step Diagram & Visual Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        {diagramComponent}
      </CardContent>
    </Card>
  );
};

export default DiagramDisplay;

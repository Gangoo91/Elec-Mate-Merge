
import { Button } from "@/components/ui/button";
import StudyPlanner from "@/components/apprentice/study/StudyPlanner";
import ConceptExplainer from "@/components/apprentice/study/ConceptExplainer";
import PowerFactorCalculator from "@/components/apprentice/calculators/PowerFactorCalculator";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import RegulationsSearch from "@/components/apprentice/study/RegulationsSearch";

type ActiveTool = null | "studyPlanner" | "conceptExplainer" | "powerCalculator" | "cableSizing" | "regulations";

interface ActiveToolContentProps {
  activeTool: ActiveTool;
  onClose: () => void;
}

const ActiveToolContent = ({ activeTool, onClose }: ActiveToolContentProps) => {
  if (!activeTool) return null;

  // Render the tool content based on the active tool
  const renderActiveTool = () => {
    switch (activeTool) {
      case "studyPlanner":
        return <StudyPlanner />;
      case "conceptExplainer":
        return <ConceptExplainer />;
      case "powerCalculator":
        return <PowerFactorCalculator />;
      case "cableSizing":
        return <CableSizingCalculator />;
      case "regulations":
        return <RegulationsSearch />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={onClose} className="mb-2">
        Back to Toolbox
      </Button>
      {renderActiveTool()}
    </div>
  );
};

export default ActiveToolContent;

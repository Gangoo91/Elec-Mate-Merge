
import { Button } from "@/components/ui/button";
import PowerFactorCalculator from "@/components/apprentice/calculators/PowerFactorCalculator";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";

type ActiveTool = null | "powerCalculator" | "cableSizing";

interface ActiveToolContentProps {
  activeTool: ActiveTool;
  onClose: () => void;
}

const ActiveToolContent = ({ activeTool, onClose }: ActiveToolContentProps) => {
  if (!activeTool) return null;

  // Render the tool content based on the active tool
  const renderActiveTool = () => {
    switch (activeTool) {
      case "powerCalculator":
        return <PowerFactorCalculator />;
      case "cableSizing":
        return <CableSizingCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={onClose} className="mb-2">
        Back to Guidance Area
      </Button>
      {renderActiveTool()}
    </div>
  );
};

export default ActiveToolContent;

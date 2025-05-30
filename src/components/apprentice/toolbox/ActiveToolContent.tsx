
import { Button } from "@/components/ui/button";
import PowerFactorCalculator from "@/components/apprentice/calculators/PowerFactorCalculator";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";

type ActiveTool = string | null;

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
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Tool Content</h2>
            <p className="text-muted-foreground">
              Content for {activeTool} is being developed and will be available soon.
            </p>
          </div>
        );
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

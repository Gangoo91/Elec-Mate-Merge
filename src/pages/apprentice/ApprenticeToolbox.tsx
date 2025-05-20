
import { useState, useEffect } from "react";
import ToolboxHeader from "@/components/apprentice/toolbox/ToolboxHeader";
import ToolboxGrid from "@/components/apprentice/toolbox/ToolboxGrid";
import ToolboxTips from "@/components/apprentice/toolbox/ToolboxTips";
import ActiveToolContent from "@/components/apprentice/toolbox/ActiveToolContent";
import { useTrainingActivityMonitor } from "@/hooks/useTrainingActivityMonitor";
import { useToast } from "@/components/ui/use-toast";

type ActiveTool = null | "studyPlanner" | "conceptExplainer" | "powerCalculator" | "cableSizing" | "regulations";

const ApprenticeToolbox = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const { toast } = useToast();
  
  // Monitor training activity
  useTrainingActivityMonitor();
  
  // Show welcome toast on first load
  useEffect(() => {
    toast({
      title: "Apprentice Toolbox",
      description: "Select a tool from the options below to help with your apprenticeship.",
    });
  }, [toast]);

  const handleToolSelection = (tool: ActiveTool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      <ToolboxHeader 
        title="Apprentice Toolbox" 
        linkPath="/apprentice" 
        linkText="Back to Apprentice Hub" 
      />

      {!activeTool && (
        <>
          <ToolboxGrid onToolSelection={handleToolSelection} />
          <ToolboxTips />
        </>
      )}

      {activeTool && (
        <ActiveToolContent activeTool={activeTool} onClose={() => setActiveTool(null)} />
      )}
    </div>
  );
};

export default ApprenticeToolbox;

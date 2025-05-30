
import { useState } from "react";
import ToolboxHeader from "@/components/apprentice/toolbox/ToolboxHeader";
import ToolboxGrid from "@/components/apprentice/toolbox/ToolboxGrid";
import ToolboxTips from "@/components/apprentice/toolbox/ToolboxTips";
import ActiveToolContent from "@/components/apprentice/toolbox/ActiveToolContent";

type ActiveTool = null | "powerCalculator" | "cableSizing";

const ApprenticeToolbox = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const handleToolSelection = (tool: ActiveTool) => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      <ToolboxHeader 
        title="Apprentice Toolbox" 
        linkPath="/apprentice/hub" 
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

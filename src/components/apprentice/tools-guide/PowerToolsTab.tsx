
import ToolCard from "./ToolCard";
import { CircuitBoard } from "lucide-react";

const PowerToolsTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Power Tools</h2>
      <p className="text-muted-foreground">
        While your employer often provides larger power tools, having some basics of your own is advantageous.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ToolCard
          title="Cordless Drill/Driver"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="An essential power tool for electrical installations."
          items={[
            "18V lithium-ion battery system",
            "Two batteries minimum (one charging while one in use)",
            "Fast charger",
            "HSS drill bit set",
            "Screwdriver bit set with magnetic holder"
          ]}
        />

        <ToolCard
          title="Inspection Tools"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="For accessing and examining difficult-to-reach areas."
          items={[
            "Inspection lamp/torch (preferably LED)",
            "Inspection mirror",
            "Flexible magnetic pick-up tool",
            "Cable fishing rods"
          ]}
        />
      </div>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">Power Tool Safety</h3>
        <p>
          Always ensure power tools are PAT tested annually (or as per company policy). Tools with damaged casings or cables should be immediately taken out of service. Follow manufacturer guidelines for usage and maintenance.
        </p>
      </div>
    </div>
  );
};

export default PowerToolsTab;

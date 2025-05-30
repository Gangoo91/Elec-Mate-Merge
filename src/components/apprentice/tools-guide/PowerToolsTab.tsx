
import ToolCard from "./ToolCard";
import { CircuitBoard, Lightbulb } from "lucide-react";

const PowerToolsTab = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-elec-yellow">Power Tools</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Whilst your employer often provides larger power tools, having some basics of your own gives you flexibility 
          and ensures you're never without essential equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolCard
          title="Cordless Drill/Driver"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="An essential power tool for electrical installations. Modern 18V systems offer excellent power-to-weight ratios and long battery life."
          items={[
            "18V lithium-ion battery system",
            "Two batteries minimum (one charging whilst one in use)",
            "Fast charger (1-hour charging preferred)",
            "HSS drill bit set for metalwork",
            "Screwdriver bit set with magnetic holder"
          ]}
        />

        <ToolCard
          title="Inspection Tools"
          icon={<Lightbulb className="h-8 w-8 text-elec-yellow" />}
          description="For accessing and examining difficult-to-reach areas safely. Essential for fault-finding and inspection work."
          items={[
            "LED inspection lamp/torch (rechargeable preferred)",
            "Inspection mirror (telescopic)",
            "Flexible magnetic pick-up tool",
            "Cable fishing rods (fiberglass)",
            "Borescope (for advanced inspections)"
          ]}
        />
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-red-300 mb-2 flex items-center gap-2">
          <CircuitBoard className="h-5 w-5" />
          Power Tool Safety
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Always ensure power tools are PAT tested annually (or as per company policy). Tools with damaged casings 
          or cables should be immediately taken out of service. Follow manufacturer guidelines for usage and maintenance. 
          Never use damaged or modified power tools - they pose serious safety risks.
        </p>
      </div>
    </div>
  );
};

export default PowerToolsTab;

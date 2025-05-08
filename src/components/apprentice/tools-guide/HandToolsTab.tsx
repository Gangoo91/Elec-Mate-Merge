
import ToolCard from "./ToolCard";
import { CircuitBoard, Ruler, Wrench } from "lucide-react";

const HandToolsTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Essential Hand Tools</h2>
      <p className="text-muted-foreground">
        Every apprentice electrician in the UK should have the following hand tools in their toolkit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ToolCard
          title="Screwdrivers"
          icon={<Wrench className="h-8 w-8 text-elec-yellow" />}
          description="You'll need a full set of insulated screwdrivers including flat-head (terminal and standard), Phillips, and Pozidriv. Look for VDE certified screwdrivers that are rated to 1000V."
          items={[
            "Flared terminal screwdriver (2.5mm & 4mm)",
            "Pozidriv (PZ1 & PZ2)",
            "Phillips (PH1 & PH2)",
            "Standard flat-head in various sizes",
            "VDE rating to BS EN 60900"
          ]}
        />

        <ToolCard
          title="Pliers & Cutters"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="A range of insulated pliers and cutters are essential for wire work and cable terminations."
          items={[
            "Combination pliers (160-180mm)",
            "Side cutters (160mm)",
            "Long nose pliers (200mm)",
            "Wire strippers with cable crimping function",
            "Cable sheath stripping knife (must be insulated)"
          ]}
        />

        <ToolCard
          title="Spanners & Wrenches"
          icon={<Wrench className="h-8 w-8 text-elec-yellow" />}
          description="For tightening nuts and bolts on electrical equipment and enclosures."
          items={[
            "Adjustable wrench (200-250mm)",
            "Set of combination spanners (8-17mm)",
            "Hexagon keys (metric)",
            "Conduit box spanner set"
          ]}
        />

        <ToolCard
          title="Measuring & Marking"
          icon={<Ruler className="h-8 w-8 text-elec-yellow" />}
          description="Precision is crucial for electrical installations and tracking material usage."
          items={[
            "Tape measure (5m minimum)",
            "Spirit level (600mm minimum)",
            "Steel rule (300mm)",
            "Cable measuring wheel",
            "Carpenter's pencil and permanent marker"
          ]}
        />
      </div>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">UK Electrical Standards Note</h3>
        <p>
          Tools used in the UK must comply with British Standards for electrical safety. Look for BS EN 60900 certification for insulated tools and the BS kite mark on safety equipment. Tools should be regularly inspected for damage to insulation or wear.
        </p>
      </div>
    </div>
  );
};

export default HandToolsTab;

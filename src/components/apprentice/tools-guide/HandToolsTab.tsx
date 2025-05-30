
import ToolCard from "./ToolCard";
import { CircuitBoard, Ruler, Wrench } from "lucide-react";

const HandToolsTab = () => {
  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow">Essential Hand Tools</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-2 sm:px-0">
          Every apprentice electrician in the UK should have these fundamental hand tools in their kit. 
          Quality hand tools will last your entire career when properly maintained.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ToolCard
          title="Screwdrivers"
          icon={<Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="You'll need a comprehensive set of insulated screwdrivers including flat-head (terminal and standard), Phillips, and Pozidriv. Look for VDE certified screwdrivers rated to 1000V for electrical safety."
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
          icon={<CircuitBoard className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="A range of insulated pliers and cutters are essential for wire work and cable terminations. Quality cutting tools ensure clean cuts and reduce cable damage."
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
          icon={<Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="For tightening nuts and bolts on electrical equipment and enclosures. Proper torque settings prevent loose connections and potential fire hazards."
          items={[
            "Adjustable wrench (200-250mm)",
            "Set of combination spanners (8-17mm)",
            "Hexagon keys (metric set)",
            "Conduit box spanner set"
          ]}
        />

        <ToolCard
          title="Measuring & Marking"
          icon={<Ruler className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="Precision is crucial for electrical installations and material calculations. Accurate measurements ensure professional results and material efficiency."
          items={[
            "Tape measure (5m minimum)",
            "Spirit level (600mm minimum)",
            "Steel rule (300mm)",
            "Cable measuring wheel",
            "Carpenter's pencil and permanent marker"
          ]}
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-medium text-amber-300 mb-2 flex items-center gap-2">
          <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
          UK Electrical Standards Note
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Tools used in the UK must comply with British Standards for electrical safety. Look for BS EN 60900 certification 
          for insulated tools and the BSI Kitemark on safety equipment. Tools should be regularly inspected for damage 
          to insulation or wear, and replaced immediately if compromised.
        </p>
      </div>
    </div>
  );
};

export default HandToolsTab;

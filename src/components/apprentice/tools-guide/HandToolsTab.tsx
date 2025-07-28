
import ToolCard from "./ToolCard";
import { CircuitBoard, Ruler, Wrench } from "lucide-react";

const HandToolsTab = () => {
  const screwdriverTools = [
    {
      name: "Flared terminal screwdriver (2.5mm & 4mm)",
      description: "Essential for electrical terminal work",
      priceRange: "£10-18 each",
      priority: "essential" as const,
      ukStandard: "VDE certified"
    },
    {
      name: "Pozidriv (PZ1 & PZ2)",
      description: "Most common screw type in UK electrical work",
      priceRange: "£8-15 each",
      priority: "essential" as const,
      ukStandard: "BS EN 60900"
    },
    {
      name: "Phillips (PH1 & PH2)",
      description: "Still used in some applications",
      priceRange: "£8-15 each",
      priority: "recommended" as const,
      ukStandard: "BS EN 60900"
    },
    {
      name: "Standard flat-head set (3mm, 5mm, 8mm)",
      description: "Various sizes for different applications",
      priceRange: "£18-32 set",
      priority: "essential" as const,
      ukStandard: "VDE 1000V"
    }
  ];

  const pliersTools = [
    {
      name: "Combination pliers (160-180mm)",
      description: "Gripping, cutting, and bending wire",
      priceRange: "£18-38",
      priority: "essential" as const,
      ukStandard: "BS EN 60900"
    },
    {
      name: "Side cutters (160mm)",
      description: "Clean cuts on cables up to 4mm²",
      priceRange: "£15-32",
      priority: "essential" as const,
      ukStandard: "VDE certified"
    },
    {
      name: "Long nose pliers (200mm)",
      description: "Precision work in tight spaces",
      priceRange: "£12-25",
      priority: "essential" as const,
      ukStandard: "Insulated to 1000V"
    },
    {
      name: "Wire strippers with crimping function",
      description: "Strip and crimp various cable sizes",
      priceRange: "£25-50",
      priority: "essential" as const,
      ukStandard: "0.5-6mm² capacity"
    },
    {
      name: "Insulated cable knife",
      description: "Safe stripping of cable sheaths",
      priceRange: "£10-18",
      priority: "essential" as const,
      ukStandard: "Retractable blade"
    }
  ];

  const spannersTools = [
    {
      name: "Adjustable wrench (200-250mm)",
      description: "Various bolt sizes on electrical equipment",
      priceRange: "£15-32",
      priority: "essential" as const
    },
    {
      name: "Combination spanners (8-17mm set)",
      description: "Earth bonding and equipment installation",
      priceRange: "£30-55",
      priority: "recommended" as const
    },
    {
      name: "Metric hexagon key set",
      description: "Modern electrical equipment fasteners",
      priceRange: "£10-18",
      priority: "recommended" as const
    },
    {
      name: "Conduit box spanner set",
      description: "20mm, 25mm, 32mm conduit connections",
      priceRange: "£18-38",
      priority: "optional" as const,
      ukStandard: "BS 4568 conduit"
    }
  ];

  const measuringTools = [
    {
      name: "Tape measure (5m minimum)",
      description: "Cable runs and spacing measurements",
      priceRange: "£10-18",
      priority: "essential" as const,
      ukStandard: "Class II accuracy"
    },
    {
      name: "Spirit level (600mm minimum)",
      description: "Level installation of equipment",
      priceRange: "£18-38",
      priority: "essential" as const
    },
    {
      name: "Steel rule (300mm)",
      description: "Precise measurements and marking",
      priceRange: "£6-12",
      priority: "recommended" as const
    },
    {
      name: "Cable measuring wheel",
      description: "Long cable run measurements",
      priceRange: "£30-65",
      priority: "optional" as const
    },
    {
      name: "Marking tools (pencil & permanent marker)",
      description: "Clear marking for cutting and installation",
      priceRange: "£4-10",
      priority: "essential" as const
    }
  ];

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
          description="You'll need a comprehensive set of insulated screwdrivers. VDE certified screwdrivers are essential for electrical safety."
          items={screwdriverTools}
          apprenticeTip="Start with the essential sizes first. Many employers provide basic screwdrivers, so check before buying duplicates. Always test your screwdrivers on a proving unit before use."
          ukConsideration="UK electrical work predominantly uses Pozidriv screws rather than Phillips. VDE certification to BS EN 60900 is mandatory for electrical work."
        />

        <ToolCard
          title="Pliers & Cutters"
          icon={<CircuitBoard className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="A range of insulated pliers and cutters are essential for wire work and cable terminations."
          items={pliersTools}
          apprenticeTip="Invest in quality cutting tools - they'll give cleaner cuts and last longer. Keep your wire strippers clean and check the cutting edges regularly."
          ukConsideration="Ensure all tools are insulated to 1000V for safety. Some apprentices prefer automatic wire strippers, but manual ones give better control for precision work."
        />

        <ToolCard
          title="Spanners & Wrenches"
          icon={<Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="For tightening nuts and bolts on electrical equipment and earth bonding connections."
          items={spannersTools}
          apprenticeTip="An adjustable wrench covers most needs initially. Add specific sizes as you encounter them on jobs. Don't over-tighten connections - follow manufacturer torque settings."
          ukConsideration="Earth bonding requires specific tightness. Learn the correct torque values for different connection types to prevent loose connections."
        />

        <ToolCard
          title="Measuring & Marking"
          icon={<Ruler className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />}
          description="Precision is crucial for electrical installations and material calculations."
          items={measuringTools}
          apprenticeTip="A good tape measure is worth the investment - it'll be used daily. Keep pencils sharp and have spare markers. Measure twice, cut once!"
          ukConsideration="UK building regulations have specific spacing requirements for electrical equipment. Accurate measurement ensures compliance and professional results."
        />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-medium text-amber-300 mb-2 flex items-center gap-2">
          <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
          UK Electrical Standards & Budget Guidance
        </h3>
        <div className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Safety Standards:</strong> All tools must comply with BS EN 60900 for electrical safety. 
            Look for VDE certification and the BSI Kitemark on safety equipment.
          </p>
          <p>
            <strong>Budget Expectations:</strong> A basic hand tool kit should cost £180-380. Spread purchases over your first year, 
            prioritising essential items first. Many suppliers offer apprentice discounts - always ask!
          </p>
          <p>
            <strong>Maintenance:</strong> Clean tools after use, especially in dusty conditions. Check insulation 
            regularly and replace damaged tools immediately. Properly maintained tools last decades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HandToolsTab;

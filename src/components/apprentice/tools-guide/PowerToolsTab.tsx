
import ToolCard from "./ToolCard";
import { CircuitBoard, Lightbulb, Zap } from "lucide-react";

const PowerToolsTab = () => {
  const drillTools = [
    {
      name: "18V cordless drill/driver",
      description: "Essential for most electrical installation work",
      priceRange: "£95-250",
      priority: "essential" as const,
      ukStandard: "Two-speed gearbox"
    },
    {
      name: "Lithium-ion batteries (2x minimum)",
      description: "One charging whilst one in use",
      priceRange: "£38-75 each",
      priority: "essential" as const,
      ukStandard: "3.0Ah+ capacity"
    },
    {
      name: "Fast charger (1-hour type)",
      description: "Minimise downtime with quick charging",
      priceRange: "£50-95",
      priority: "recommended" as const
    },
    {
      name: "HSS drill bit set (1-13mm)",
      description: "High-speed steel for metalwork",
      priceRange: "£18-38",
      priority: "essential" as const,
      ukStandard: "Cobalt tipped preferred"
    },
    {
      name: "Screwdriver bit set with holder",
      description: "PZ1, PZ2, PH1, PH2, flat bits with magnetic holder",
      priceRange: "£12-32",
      priority: "essential" as const
    }
  ];

  const inspectionTools = [
    {
      name: "LED inspection torch (rechargeable)",
      description: "Essential for fault-finding and dark areas",
      priceRange: "£18-50",
      priority: "essential" as const,
      ukStandard: "1000+ lumens"
    },
    {
      name: "Telescopic inspection mirror",
      description: "See behind panels and in tight spaces",
      priceRange: "£10-25",
      priority: "recommended" as const
    },
    {
      name: "Magnetic pick-up tool (telescopic)",
      description: "Retrieve dropped screws and small parts",
      priceRange: "£6-18",
      priority: "recommended" as const,
      ukStandard: "4.5kg lift capacity"
    },
    {
      name: "Cable fishing rods (fiberglass)",
      description: "Pull cables through conduit and voids",
      priceRange: "£25-65",
      priority: "optional" as const,
      ukStandard: "10m+ length"
    },
    {
      name: "Digital borescope/inspection camera",
      description: "Advanced inspections in inaccessible areas",
      priceRange: "£65-250",
      priority: "optional" as const,
      ukStandard: "5mm+ cable diameter"
    }
  ];

  const specialistTools = [
    {
      name: "Angle grinder (115mm)",
      description: "Cutting trunking, conduit, and metalwork",
      priceRange: "£50-125",
      priority: "optional" as const,
      ukStandard: "Safety guard essential"
    },
    {
      name: "SDS drill (corded)",
      description: "Heavy-duty drilling in masonry",
      priceRange: "£75-185",
      priority: "optional" as const,
      ukStandard: "3-function minimum"
    },
    {
      name: "Reciprocating saw",
      description: "Cutting in tight spaces and demolition work",
      priceRange: "£65-150",
      priority: "optional" as const
    },
    {
      name: "Cable puller/winch",
      description: "Heavy cable installation in long runs",
      priceRange: "£125-375",
      priority: "optional" as const,
      ukStandard: "1000kg+ capacity"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-elec-yellow">Power Tools</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Whilst your employer often provides larger power tools, having some basics of your own gives you flexibility 
          and ensures you're never without essential equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <ToolCard
          title="Cordless Drill System"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="An essential power tool for electrical installations. Modern 18V systems offer excellent power-to-weight ratios."
          items={drillTools}
          apprenticeTip="Stick to one battery platform - batteries are expensive! Many brands offer starter kits with drill, battery, and charger. Check if your employer uses a specific brand."
          ukConsideration="18V is the UK standard for professional tools. Lower voltages lack power for demanding work. Higher voltages are unnecessarily heavy for electrical work."
        />

        <ToolCard
          title="Inspection & Access Tools"
          icon={<Lightbulb className="h-8 w-8 text-elec-yellow" />}
          description="For accessing and examining difficult-to-reach areas safely. Essential for fault-finding and inspection work."
          items={inspectionTools}
          apprenticeTip="A good torch is used multiple times daily. Rechargeable LED torches save money on batteries and provide consistent brightness. Keep it charged!"
          ukConsideration="UK building regulations require access for inspection. These tools help you work safely without damaging property or structures."
        />

        <ToolCard
          title="Specialist Power Tools"
          icon={<Zap className="h-8 w-8 text-elec-yellow" />}
          description="Heavier tools usually provided by employers but useful to understand for future investment."
          items={specialistTools}
          apprenticeTip="Don't buy these until you're established - they're expensive and employers usually provide them. Learn to use them safely first."
          ukConsideration="These tools require additional safety training. Never use without proper instruction and appropriate PPE. Some require 110V supply on construction sites."
        />
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-red-300 mb-2 flex items-center gap-2">
          <CircuitBoard className="h-5 w-5" />
          Power Tool Safety & Maintenance
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>PAT Testing:</strong> All portable electrical tools must be PAT tested annually (or as per company policy). 
            Keep records and labels up to date.
          </p>
          <p>
            <strong>Daily Checks:</strong> Inspect tools before use - check casings, cables, and switches. 
            Damaged tools must be immediately taken out of service.
          </p>
          <p>
            <strong>110V on Sites:</strong> Many construction sites require 110V tools for safety. 
            Check site requirements and use appropriate transformers if needed.
          </p>
          <p>
            <strong>Battery Care:</strong> Store batteries at room temperature, charge regularly, and replace when capacity drops significantly. 
            Quality batteries last 3-5 years with proper care.
          </p>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-green-300 mb-2">Investment Timeline for Apprentices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-200 mb-2">Year 1-2: Basics (£185-320)</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Cordless drill with 2 batteries</li>
              <li>• LED torch</li>
              <li>• Basic drill bits and screwdriver bits</li>
              <li>• Simple inspection tools</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-200 mb-2">Year 3-4: Expansion (£250-485)</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Additional batteries and faster charger</li>
              <li>• More comprehensive bit sets</li>
              <li>• Advanced inspection equipment</li>
              <li>• Specialist tools as needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerToolsTab;

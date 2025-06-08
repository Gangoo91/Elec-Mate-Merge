
import ToolCard from "./ToolCard";
import { Shield, HardHat, AlertTriangle } from "lucide-react";

const PPETab = () => {
  const basicPPETools = [
    {
      name: "Safety boots (S3 rated)",
      description: "Steel toe caps, midsole protection, water resistant",
      priceRange: "£40-80",
      priority: "essential" as const,
      ukStandard: "BS EN ISO 20345"
    },
    {
      name: "Hard hat (adjustable)",
      description: "Impact protection with electrical insulation",
      priceRange: "£8-20",
      priority: "essential" as const,
      ukStandard: "BS EN 397"
    },
    {
      name: "Safety glasses (clear & tinted)",
      description: "Impact resistant with side protection",
      priceRange: "£5-15 each",
      priority: "essential" as const,
      ukStandard: "BS EN 166"
    },
    {
      name: "Work gloves (cut-resistant)",
      description: "General handling, not for electrical work",
      priceRange: "£3-10",
      priority: "essential" as const,
      ukStandard: "Cut level A2 minimum"
    },
    {
      name: "Hi-visibility vest (Class 2)",
      description: "Reflective strips for site visibility",
      priceRange: "£8-20",
      priority: "essential" as const,
      ukStandard: "BS EN ISO 20471"
    }
  ];

  const specialistPPETools = [
    {
      name: "Arc flash protection suit",
      description: "For live working on high voltage systems",
      priceRange: "£200-500",
      priority: "optional" as const,
      ukStandard: "CAT 2/3/4 rating"
    },
    {
      name: "Insulating gloves (Class 0/00)",
      description: "Electrical work up to 1000V",
      priceRange: "£30-80",
      priority: "recommended" as const,
      ukStandard: "BS EN 60903"
    },
    {
      name: "Ear defenders (32dB SNR)",
      description: "Drilling, grinding, noisy environments",
      priceRange: "£10-30",
      priority: "recommended" as const,
      ukStandard: "BS EN 352"
    },
    {
      name: "FFP3 dust masks",
      description: "Drilling concrete, dusty environments",
      priceRange: "£15-30 (box)",
      priority: "recommended" as const,
      ukStandard: "99% filtration"
    },
    {
      name: "Knee pads (gel-filled)",
      description: "Floor work and low-level installations",
      priceRange: "£15-35",
      priority: "optional" as const,
      ukStandard: "Type 2 protection"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-elec-yellow">PPE & Safety Equipment</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Personal Protective Equipment is essential for every UK electrical apprentice. Your safety is paramount - 
          never compromise on PPE quality or suitability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolCard
          title="Basic PPE (Required Daily)"
          icon={<Shield className="h-8 w-8 text-elec-yellow" />}
          description="Minimum safety equipment for everyday electrical work on construction sites and domestic installations."
          items={basicPPETools}
          apprenticeTip="Buy quality PPE that's comfortable - you'll wear it all day. Cheap safety boots will cause foot problems. Get properly fitted for safety glasses if you wear prescription glasses."
          ukConsideration="Site requirements vary. Some sites require specific colours or additional PPE. Check site induction requirements before starting work."
        />

        <ToolCard
          title="Specialist PPE (Task-Specific)"
          icon={<HardHat className="h-8 w-8 text-elec-yellow" />}
          description="Additional protection for specific tasks and higher-risk electrical work environments."
          items={specialistPPETools}
          apprenticeTip="Don't buy specialist PPE until you need it. Employers usually provide arc flash suits and Class 2+ electrical gloves. Focus on good basic PPE first."
          ukConsideration="Live working requires specific training and PPE. Only work live when it's absolutely necessary and with proper authorisation and equipment."
        />
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-orange-300 mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          PPE Regulations & Best Practices in the UK
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Legal Requirements:</strong> The Personal Protective Equipment at Work Regulations 1992 (amended in 2022) 
            requires employers to provide adequate PPE. However, apprentices should have their own basic kit for flexibility.
          </p>
          <p>
            <strong>Maintenance:</strong> PPE must be properly maintained, stored, and replaced when damaged. 
            Check PPE before each use - damaged equipment provides no protection.
          </p>
          <p>
            <strong>Training:</strong> You must be trained in the correct use of PPE. If you're unsure about any 
            equipment, ask your supervisor or trainer for guidance.
          </p>
          <p>
            <strong>Cost Expectations:</strong> Basic PPE kit: £80-150. This investment protects you throughout your career. 
            Quality items last longer and provide better protection.
          </p>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-red-300 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Critical PPE Safety Points
        </h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Never work without appropriate PPE - no job is worth an injury</li>
          <li>• Regular work gloves are NOT suitable for electrical work - use insulated gloves when required</li>
          <li>• Replace damaged PPE immediately - it won't protect you if it's compromised</li>
          <li>• Ensure PPE is correctly fitted - loose or tight equipment is less effective</li>
          <li>• Keep spare PPE items - safety glasses and gloves are easily lost or damaged</li>
        </ul>
      </div>
    </div>
  );
};

export default PPETab;


import ToolCard from "./ToolCard";
import { Shield, HardHat } from "lucide-react";

const PPETab = () => {
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
          title="Basic PPE"
          icon={<Shield className="h-8 w-8 text-elec-yellow" />}
          description="Minimum safety equipment for everyday electrical work on construction sites and domestic installations."
          items={[
            "Safety boots (compliant with BS EN ISO 20345)",
            "Hard hat (BS EN 397)",
            "Safety glasses (BS EN 166)",
            "Work gloves (cut-resistant)",
            "Hi-visibility vest (BS EN ISO 20471)"
          ]}
        />

        <ToolCard
          title="Specialist PPE"
          icon={<HardHat className="h-8 w-8 text-elec-yellow" />}
          description="Additional protection for specific tasks and higher-risk electrical work environments."
          items={[
            "Arc flash protection (when working on live equipment)",
            "Insulating gloves (BS EN 60903)",
            "Ear defenders (BS EN 352)",
            "FFP3 dust mask (for drilling and dusty environments)",
            "Knee pads (for floor and low-level work)"
          ]}
        />
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-orange-300 mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          PPE Regulations in the UK
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Personal Protective Equipment at Work Regulations 1992 (amended in 2022) requires employers to provide 
          adequate PPE. However, apprentices should have their own basic PPE kit for flexibility and familiarity. 
          Always ensure your PPE is in good condition, properly fitted, and appropriate for the task at hand. 
          Replace damaged or worn PPE immediately.
        </p>
      </div>
    </div>
  );
};

export default PPETab;

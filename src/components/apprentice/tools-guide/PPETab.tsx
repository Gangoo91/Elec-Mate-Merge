
import ToolCard from "./ToolCard";
import { Shield } from "lucide-react";

const PPETab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">PPE & Safety Equipment</h2>
      <p className="text-muted-foreground">
        Personal Protective Equipment is essential for every UK electrical apprentice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ToolCard
          title="Basic PPE"
          icon={<Shield className="h-8 w-8 text-elec-yellow" />}
          description="Minimum safety equipment for everyday work."
          items={[
            "Safety boots (compliant with BS EN ISO 20345)",
            "Hard hat (BS EN 397)",
            "Safety glasses (BS EN 166)",
            "Work gloves",
            "Hi-visibility vest (BS EN ISO 20471)"
          ]}
        />

        <ToolCard
          title="Specialist PPE"
          icon={<Shield className="h-8 w-8 text-elec-yellow" />}
          description="Additional protection for specific tasks."
          items={[
            "Arc flash protection (when working on live equipment)",
            "Insulating gloves (BS EN 60903)",
            "Ear defenders (BS EN 352)",
            "FFP3 dust mask (for drilling)",
            "Knee pads (for floor work)"
          ]}
        />
      </div>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">PPE Regulations in the UK</h3>
        <p>
          The Personal Protective Equipment at Work Regulations 1992 (amended in 2022) requires employers to provide adequate PPE. However, apprentices should have their own basic PPE. Always ensure your PPE is in good condition and appropriate for the task at hand.
        </p>
      </div>
    </div>
  );
};

export default PPETab;

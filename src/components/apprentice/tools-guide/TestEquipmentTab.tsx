
import ToolCard from "./ToolCard";
import { CircuitBoard } from "lucide-react";

const TestEquipmentTab = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-elec-yellow">Test Equipment</h2>
      <p className="text-muted-foreground">
        As you progress through your apprenticeship, you'll need appropriate test equipment that meets UK regulations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ToolCard
          title="Basic Test Equipment"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="Essential testing tools for day-to-day work."
          items={[
            "Voltage indicator (approved to GS38)",
            "Proving unit for testing your voltage indicator",
            "Continuity tester",
            "Socket tester",
            "Test leads with fused probes"
          ]}
        />

        <ToolCard
          title="Advanced Testing (Later Years)"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="Equipment needed as you progress to testing and inspection."
          items={[
            "Multifunction installation tester (compliant with 18th Edition)",
            "Earth loop impedance tester",
            "RCD tester",
            "Insulation resistance tester",
            "Test leads and accessories"
          ]}
        />
      </div>

      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">18th Edition Testing Requirements</h3>
        <p>
          The BS 7671:2018 Amendment 2:2022 (18th Edition) of the IET Wiring Regulations specifies requirements for electrical installations. Your test equipment must comply with these regulations. Always ensure your equipment is calibrated annually and has valid certificates.
        </p>
      </div>
    </div>
  );
};

export default TestEquipmentTab;

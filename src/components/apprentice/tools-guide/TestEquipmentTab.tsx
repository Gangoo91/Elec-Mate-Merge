
import ToolCard from "./ToolCard";
import { CircuitBoard, Shield } from "lucide-react";

const TestEquipmentTab = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-elec-yellow">Test Equipment</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          As you progress through your apprenticeship, you'll need appropriate test equipment that meets UK regulations. 
          Quality test equipment is essential for safety and compliance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ToolCard
          title="Basic Test Equipment"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="Essential testing tools for day-to-day electrical work. These form the foundation of your test equipment collection."
          items={[
            "Voltage indicator (approved to GS38)",
            "Proving unit for testing your voltage indicator",
            "Continuity tester",
            "Socket tester (13A plug-in type)",
            "Test leads with fused probes (GS38 compliant)"
          ]}
        />

        <ToolCard
          title="Advanced Testing (Later Years)"
          icon={<Shield className="h-8 w-8 text-elec-yellow" />}
          description="Equipment needed as you progress to testing and inspection work. Essential for certification and compliance testing."
          items={[
            "Multifunction installation tester (18th Edition compliant)",
            "Earth loop impedance tester (Ze, Zs measurements)",
            "RCD tester (30mA, 100mA, 300mA)",
            "Insulation resistance tester (500V, 1000V)",
            "Test leads and accessories"
          ]}
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          18th Edition Testing Requirements
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The BS 7671:2018 Amendment 2:2022 (18th Edition) of the IET Wiring Regulations specifies requirements 
          for electrical installations. Your test equipment must comply with these regulations and relevant standards. 
          Always ensure your equipment is calibrated annually and has valid certificates. Uncalibrated equipment 
          can give false readings, compromising safety.
        </p>
      </div>
    </div>
  );
};

export default TestEquipmentTab;


import ToolCard from "./ToolCard";
import { CircuitBoard, Shield, AlertTriangle } from "lucide-react";

const TestEquipmentTab = () => {
  const basicTestTools = [
    {
      name: "Voltage indicator (2-pole type)",
      description: "Proving dead before work - essential safety tool",
      priceRange: "£18-38",
      priority: "essential" as const,
      ukStandard: "GS38 compliant"
    },
    {
      name: "Proving unit for voltage indicator",
      description: "Test your tester before every use",
      priceRange: "£25-50",
      priority: "essential" as const,
      ukStandard: "Must match indicator"
    },
    {
      name: "Continuity tester (buzzer type)",
      description: "Basic continuity checks during installation",
      priceRange: "£12-32",
      priority: "essential" as const,
      ukStandard: "Low voltage output"
    },
    {
      name: "Socket tester (13A plug-in type)",
      description: "Quick checks of domestic socket wiring",
      priceRange: "£10-25",
      priority: "recommended" as const,
      ukStandard: "BS 1363 compliant"
    },
    {
      name: "Test leads with fused probes",
      description: "Safe connection to electrical systems",
      priceRange: "£18-45",
      priority: "essential" as const,
      ukStandard: "GS38 specification"
    }
  ];

  const advancedTestTools = [
    {
      name: "Multifunction installation tester",
      description: "Professional testing for certification work",
      priceRange: "£500-1500",
      priority: "essential" as const,
      ukStandard: "18th Edition compliant"
    },
    {
      name: "Earth loop impedance tester",
      description: "Ze and Zs measurements for safety verification",
      priceRange: "£375-985",
      priority: "essential" as const,
      ukStandard: "BS 7671 compliant"
    },
    {
      name: "RCD tester (all types)",
      description: "Test 30mA, 100mA, and 300mA RCDs",
      priceRange: "£250-625",
      priority: "essential" as const,
      ukStandard: "Type A, AC, F testing"
    },
    {
      name: "Insulation resistance tester",
      description: "500V and 1000V insulation testing",
      priceRange: "£185-485",
      priority: "essential" as const,
      ukStandard: "BS 7671 Part 6"
    },
    {
      name: "Professional test lead set",
      description: "Various probes and adaptors for all tests",
      priceRange: "£95-185",
      priority: "recommended" as const,
      ukStandard: "CAT III rated"
    }
  ];

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
          title="Basic Test Equipment (Year 1-2)"
          icon={<CircuitBoard className="h-8 w-8 text-elec-yellow" />}
          description="Essential testing tools for day-to-day electrical work during early apprenticeship."
          items={basicTestTools}
          apprenticeTip="Start with a good voltage indicator and proving unit - these are used daily. Many basic testers are included in apprentice starter kits. Always prove dead before starting work!"
          ukConsideration="GS38 compliance is mandatory for test equipment. Your voltage indicator must be 2-pole type for safety. Never use a multimeter for proving dead."
        />

        <ToolCard
          title="Advanced Testing (Year 3-4)"
          icon={<Shield className="h-8 w-8 text-elec-yellow" />}
          description="Professional equipment needed for testing and inspection work leading to certification."
          items={advancedTestTools}
          apprenticeTip="Don't rush to buy expensive test equipment early. Many employers provide these for qualified staff. Focus on understanding how to use them properly first."
          ukConsideration="18th Edition testing requires specific capabilities. Ensure any multifunction tester can perform all required tests to current standards. Annual calibration is mandatory."
        />
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-300 mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          18th Edition Testing Requirements & Progression Guide
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Year 1-2:</strong> Focus on basic safety equipment. Learn to use voltage indicators, 
            proving units, and simple continuity testers. Understand the principles before using complex equipment.
          </p>
          <p>
            <strong>Year 3-4:</strong> Begin using multifunction testers under supervision. Learn all test 
            sequences and understand what the readings mean. Practice on training installations first.
          </p>
          <p>
            <strong>Calibration:</strong> All test equipment must be calibrated annually with valid certificates. 
            Uncalibrated equipment can give false readings, compromising safety and invalidating test results.
          </p>
          <p>
             <strong>Investment Strategy:</strong> Basic equipment: £125-185. Advanced equipment: £1250-2485. 
            Consider finance options or employer schemes for expensive items.
          </p>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-red-300 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Critical Safety Reminders
        </h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Always prove your voltage indicator is working before and after use</li>
          <li>• Never use a digital multimeter to prove an installation is dead</li>
          <li>• Test equipment must be regularly PAT tested and calibrated</li>
          <li>• Follow the "prove dead" procedure every time - no exceptions</li>
          <li>• Damaged test equipment must be taken out of service immediately</li>
        </ul>
      </div>
    </div>
  );
};

export default TestEquipmentTab;

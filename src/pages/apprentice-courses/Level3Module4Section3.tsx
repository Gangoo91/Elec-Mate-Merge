import { ArrowLeft, CircuitBoard, Lightbulb, Shield, Zap, Thermometer, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Ring and Radial Circuit Faults",
    description: "Common faults in ring final and radial circuits and their diagnosis",
    icon: CircuitBoard,
    href: "../level3-module4-section3-1",
  },
  {
    number: "3.2",
    title: "Lighting Circuit Faults",
    description: "Fault finding in lighting circuits including switching and control problems",
    icon: Lightbulb,
    href: "../level3-module4-section3-2",
  },
  {
    number: "3.3",
    title: "Protective Device Tripping",
    description: "MCBs, RCDs, RCBOs tripping faults and protective device malfunctions",
    icon: Shield,
    href: "../level3-module4-section3-3",
  },
  {
    number: "3.4",
    title: "Earthing and Bonding Issues",
    description: "Earth continuity problems, bonding failures and earthing system faults",
    icon: Zap,
    href: "../level3-module4-section3-4",
  },
  {
    number: "3.5",
    title: "Appliance and Equipment Faults",
    description: "Fault diagnosis in electrical appliances and fixed equipment",
    icon: AlertTriangle,
    href: "../level3-module4-section3-5",
  },
  {
    number: "3.6",
    title: "Overheating and Insulation Breakdown",
    description: "Thermal faults, insulation failures and degradation problems",
    icon: Thermometer,
    href: "../level3-module4-section3-6",
  },
];

const Level3Module4Section3 = () => {
  useSEO(
    "Section 3: Common Faults in Electrical Systems - Level 3 Module 4",
    "Ring/radial circuits, lighting, protective devices, earthing and equipment faults"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
            {subsections.map((subsection, index) => (
              <ModuleCard
                key={index}
                number={subsection.number}
                title={subsection.title}
                description={subsection.description}
                icon={subsection.icon}
                href={subsection.href}
              />
            ))}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module4Section3;

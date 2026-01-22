import { ArrowLeft, Cable, Zap, Thermometer, Shield, Settings } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "6.1",
    title: "Conductor Materials and Properties",
    description: "Copper, aluminium and other conductor materials - properties and applications",
    icon: Cable,
    href: "../level3-module3-section6-1",
  },
  {
    number: "6.2",
    title: "Resistance and Voltage Drop",
    description: "Calculating conductor resistance and voltage drop in electrical circuits",
    icon: Zap,
    href: "../level3-module3-section6-2",
  },
  {
    number: "6.3",
    title: "Current-Carrying Capacity",
    description: "Factors affecting cable current ratings and derating calculations",
    icon: Settings,
    href: "../level3-module3-section6-3",
  },
  {
    number: "6.4",
    title: "Thermal Effects on Cables",
    description: "Temperature effects on cable performance and thermal protection",
    icon: Thermometer,
    href: "../level3-module3-section6-4",
  },
  {
    number: "6.5",
    title: "Insulation Types and Environmental Effects",
    description: "Cable insulation materials, environmental conditions and protection methods",
    icon: Shield,
    href: "../level3-module3-section6-5",
  },
];

const Level3Module3Section6 = () => {
  useSEO(
    "Section 6: Cables and Conductors - Level 3 Module 3",
    "Conductor materials, resistance, current-carrying capacity and thermal effects"
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
            <Link to="/study-centre/apprentice/level3-module3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
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

export default Level3Module3Section6;

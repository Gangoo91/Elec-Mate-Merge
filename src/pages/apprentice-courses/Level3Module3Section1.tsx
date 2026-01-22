import { ArrowLeft, Calculator, Ruler, Gauge, Target, Scale, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Ohm's Law and Power Equations",
    description: "Understanding the relationship between voltage, current, resistance and power calculations",
    icon: Calculator,
    href: "../level3-module3-section1-1",
  },
  {
    number: "1.2",
    title: "Electrical Quantities and Units",
    description: "Voltage, current, resistance, power and energy - their units and relationships",
    icon: Ruler,
    href: "../level3-module3-section1-2",
  },
  {
    number: "1.3",
    title: "Measurement Instruments",
    description: "Multimeters, clamp meters, insulation testers and their proper applications",
    icon: Gauge,
    href: "../level3-module3-section1-3",
  },
  {
    number: "1.4",
    title: "Accuracy, Tolerances and Errors",
    description: "Understanding measurement accuracy, instrument tolerances and sources of error",
    icon: Target,
    href: "../level3-module3-section1-4",
  },
  {
    number: "1.5",
    title: "SI Units and Conversions",
    description: "International System of Units and converting between different electrical units",
    icon: Scale,
    href: "../level3-module3-section1-5",
  },
];

const Level3Module3Section1 = () => {
  useSEO(
    "Section 1: Electrical Units and Measurements - Level 3 Module 3",
    "Ohm's Law, electrical quantities, measurement instruments, accuracy and SI units"
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

export default Level3Module3Section1;

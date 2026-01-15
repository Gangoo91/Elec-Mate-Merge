import { ArrowLeft, Gauge, TestTube, Zap, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Multimeters, Insulation Testers, Continuity Testers",
    description: "Essential diagnostic instruments for electrical fault finding and testing",
    icon: Gauge,
    href: "../level3-module4-section2-1",
  },
  {
    number: "2.2",
    title: "RCD and Loop Impedance Testers",
    description: "Specialist testers for protective device and earthing system verification",
    icon: TestTube,
    href: "../level3-module4-section2-2",
  },
  {
    number: "2.3",
    title: "Clamp Meters and Thermal Imaging",
    description: "Advanced diagnostic tools for current measurement and thermal fault detection",
    icon: Zap,
    href: "../level3-module4-section2-3",
  },
  {
    number: "2.4",
    title: "Safe Use, Calibration and Limitations of Instruments",
    description: "Proper instrument handling, calibration requirements and understanding limitations",
    icon: Shield,
    href: "../level3-module4-section2-4",
  },
];

const Level3Module4Section2 = () => {
  useSEO(
    "Section 2: Diagnostic Tools and Equipment - Level 3 Module 4",
    "Multimeters, testers, clamp meters, thermal imaging and safe instrument use"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Diagnostic Tools and Equipment
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Master the use of essential diagnostic tools and equipment for effective fault finding in electrical installations
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers diagnostic tools and equipment including multimeters and testers,
              RCD and loop impedance testers, clamp meters and thermal imaging,
              and safe use with calibration requirements.
            </p>
          </div>
        </section>

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

export default Level3Module4Section2;

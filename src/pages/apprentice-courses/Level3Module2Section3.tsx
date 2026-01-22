import { ArrowLeft, Sun, Wind, Waves, Battery, Plug, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Solar PV principles, components, and installation considerations",
    description: "Photovoltaic technology fundamentals, system components and installation requirements",
    icon: Sun,
    href: "../level3-module2-section3-1",
  },
  {
    number: "3.2",
    title: "Wind generation (small-scale systems)",
    description: "Small-scale wind turbine systems for residential and commercial applications",
    icon: Wind,
    href: "../level3-module2-section3-2",
  },
  {
    number: "3.3",
    title: "Hydro and microgeneration awareness",
    description: "Small-scale hydroelectric systems and microgeneration technologies",
    icon: Waves,
    href: "../level3-module2-section3-3",
  },
  {
    number: "3.4",
    title: "Battery storage technologies",
    description: "Energy storage systems, battery technologies and integration with renewable sources",
    icon: Battery,
    href: "../level3-module2-section3-4",
  },
  {
    number: "3.5",
    title: "Inverters and grid connection requirements",
    description: "Power inverter technology and grid connection standards for renewable systems",
    icon: Plug,
    href: "../level3-module2-section3-5",
  },
];

const Level3Module2Section3 = () => {
  useSEO(
    "Section 3: Renewable Energy Systems - Level 3 Module 2",
    "Solar, wind and other renewable energy technologies and their applications"
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
            <Link to="/study-centre/apprentice/level3-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
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

export default Level3Module2Section3;

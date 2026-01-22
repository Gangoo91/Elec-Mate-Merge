import { ArrowLeft, Car, Thermometer, Zap, Atom, Lightbulb } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "4.1",
    title: "Electric Vehicle (EV) charging infrastructure",
    description: "EV charging point installation, types and electrical infrastructure requirements",
    icon: Car,
    href: "../level3-module2-section4-1",
  },
  {
    number: "4.2",
    title: "Heat pumps (air source & ground source)",
    description: "Heat pump technology, electrical requirements and installation considerations",
    icon: Thermometer,
    href: "../level3-module2-section4-2",
  },
  {
    number: "4.3",
    title: "Combined Heat & Power (CHP) awareness",
    description: "CHP systems overview and electrical integration requirements",
    icon: Zap,
    href: "../level3-module2-section4-3",
  },
  {
    number: "4.4",
    title: "Hydrogen and fuel cell technologies (overview)",
    description: "Introduction to hydrogen fuel cells and their electrical applications",
    icon: Atom,
    href: "../level3-module2-section4-4",
  },
  {
    number: "4.5",
    title: "Future emerging technologies in the sector",
    description: "Emerging low carbon technologies and their potential electrical applications",
    icon: Lightbulb,
    href: "../level3-module2-section4-5",
  },
];

const Level3Module2Section4 = () => {
  useSEO(
    "Section 4: Low Carbon Technologies - Level 3 Module 2",
    "Carbon reduction technologies and their integration in building services"
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

export default Level3Module2Section4;

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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Low Carbon Technologies
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Carbon reduction technologies and their integration in building services
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers low carbon technologies including EV charging infrastructure,
              heat pumps, combined heat and power systems, hydrogen and fuel cell technologies,
              and emerging future technologies in the electrical sector.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  );
};

export default Level3Module2Section4;

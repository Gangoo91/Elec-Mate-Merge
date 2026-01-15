import { ArrowLeft, Zap, Cable, Target, Shield, Calculator, Thermometer } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Determining Design Current (Ib, In, Iz)",
    description: "Calculating design current, nominal current and current-carrying capacity",
    icon: Zap,
    href: "../level3-module6-section2-1",
  },
  {
    number: "2.2",
    title: "Cable Sizing and Voltage Drop Calculations",
    description: "Selecting appropriate cable sizes and calculating voltage drop in circuits",
    icon: Cable,
    href: "../level3-module6-section2-2",
  },
  {
    number: "2.3",
    title: "Earth Fault Loop Impedance and Disconnection Times",
    description: "Calculating earth fault loop impedance and verifying disconnection times",
    icon: Target,
    href: "../level3-module6-section2-3",
  },
  {
    number: "2.4",
    title: "RCD and RCBO Requirements in Design",
    description: "Determining RCD and RCBO requirements and incorporating them into designs",
    icon: Shield,
    href: "../level3-module6-section2-4",
  },
  {
    number: "2.5",
    title: "Diversity and Demand Calculations",
    description: "Applying diversity factors and calculating electrical demand for installations",
    icon: Calculator,
    href: "../level3-module6-section2-5",
  },
  {
    number: "2.6",
    title: "Thermal Effects and Grouping Factors",
    description: "Understanding thermal effects and applying appropriate grouping factors",
    icon: Thermometer,
    href: "../level3-module6-section2-6",
  },
];

const Level3Module6Section2 = () => {
  useSEO(
    "Section 2: Circuit Design Calculations - Level 3 Module 6",
    "Essential calculations for circuit design including current ratings, cable sizing and protection"
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
            <Link to="../level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
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
            Circuit Design Calculations
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Essential calculations for circuit design including current ratings, cable sizing and protection
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers circuit design calculations including design current,
              cable sizing and voltage drop, earth fault loop impedance,
              RCD requirements, diversity and demand, and thermal effects.
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

export default Level3Module6Section2;

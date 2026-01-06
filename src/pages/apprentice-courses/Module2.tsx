import { ArrowLeft, Calculator, Zap, GitBranch, Power, Wrench, TrendingUp } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Electrical Quantities and Units",
    description: "Understanding fundamental electrical quantities: voltage, current, resistance, and their units",
    icon: Calculator,
    href: "section1"
  },
  {
    number: "Section 2", 
    title: "Ohm's Law and Electrical Calculations",
    description: "Application of Ohm's Law for calculating voltage, current, and resistance relationships",
    icon: Zap,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Series and Parallel Circuits", 
    description: "Analysis and calculation of electrical parameters in series and parallel circuit configurations",
    icon: GitBranch,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "AC and DC Supply",
    description: "Understanding alternating and direct current characteristics, waveforms, and applications",
    icon: Power,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Electrical Materials and Resistance",
    description: "Properties of electrical materials, conductors, insulators, and factors affecting resistance",
    icon: Wrench,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Power, Energy, and Efficiency",
    description: "Calculating electrical power consumption, energy usage, and system efficiency",
    icon: TrendingUp,
    href: "section6"
  },
];

const Module2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Module 2: Electrical Principles and Science
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-3xl">
            Fundamental electrical theory, voltage, current, resistance and power calculations
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module2;
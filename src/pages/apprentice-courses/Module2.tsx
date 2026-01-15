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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Level 2</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Electrical Apprenticeship</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Module 2: Electrical Principles and Science
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Fundamental electrical theory, voltage, current, resistance and power calculations
            </p>
          </header>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 gap-4">
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
    </div>
  );
};

export default Module2;

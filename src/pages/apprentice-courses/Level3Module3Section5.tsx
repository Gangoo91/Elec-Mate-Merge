import { ArrowLeft, Calculator, TrendingDown, Zap, Leaf } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "5.1",
    title: "Power Equations",
    description: "Understanding P = VI, P = I2R, P = V2/R and their practical applications",
    icon: Calculator,
    href: "../level3-module3-section5-1",
  },
  {
    number: "5.2",
    title: "Efficiency and Losses",
    description: "Calculating efficiency in electrical circuits and understanding different types of losses",
    icon: TrendingDown,
    href: "../level3-module3-section5-2",
  },
  {
    number: "5.3",
    title: "Energy Consumption and kWh",
    description: "Energy calculations, kilowatt-hours and practical energy consumption analysis",
    icon: Zap,
    href: "../level3-module3-section5-3",
  },
  {
    number: "5.4",
    title: "Energy Efficiency in Installations",
    description: "Improving energy efficiency in electrical installations and sustainable practices",
    icon: Leaf,
    href: "../level3-module3-section5-4",
  },
];

const Level3Module3Section5 = () => {
  useSEO(
    "Section 5: Electrical Power and Energy - Level 3 Module 3",
    "Power equations, efficiency, energy consumption and efficiency in installations"
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
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Power and Energy
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Learn power calculations, efficiency analysis and energy consumption principles for electrical installations
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers electrical power and energy including power equations,
              efficiency calculations and losses, energy consumption in kWh,
              and energy efficiency in electrical installations.
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

export default Level3Module3Section5;

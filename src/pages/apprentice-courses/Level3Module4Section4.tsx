import { ArrowLeft, Eye, Zap, CheckCircle, Target, Settings } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "4.1",
    title: "Visual Inspection Techniques",
    description: "Systematic visual inspection methods for identifying electrical faults",
    icon: Eye,
    href: "../level3-module4-section4-1",
  },
  {
    number: "4.2",
    title: "Continuity and Insulation Resistance Testing",
    description: "Testing procedures for circuit continuity and insulation integrity",
    icon: Zap,
    href: "../level3-module4-section4-2",
  },
  {
    number: "4.3",
    title: "Polarity Checks",
    description: "Verifying correct polarity in electrical installations and circuits",
    icon: CheckCircle,
    href: "../level3-module4-section4-3",
  },
  {
    number: "4.4",
    title: "Earth Fault Loop Impedance Testing",
    description: "Testing earth fault loop impedance for protective device effectiveness",
    icon: Target,
    href: "../level3-module4-section4-4",
  },
  {
    number: "4.5",
    title: "Functional and Operational Testing",
    description: "Testing the operational performance and functionality of electrical systems",
    icon: Settings,
    href: "../level3-module4-section4-5",
  },
];

const Level3Module4Section4 = () => {
  useSEO(
    "Section 4: Systematic Fault-Finding Techniques - Level 3 Module 4",
    "Visual inspection, testing procedures, polarity checks and functional testing"
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
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Systematic Fault-Finding Techniques
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Learn systematic and methodical approaches to fault finding using proper testing techniques and procedures
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers systematic fault-finding techniques including visual inspection,
              continuity and insulation resistance testing, polarity checks,
              earth fault loop impedance testing, and functional testing.
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

export default Level3Module4Section4;

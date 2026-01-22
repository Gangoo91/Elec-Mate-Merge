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
            <Link to="/study-centre/apprentice/level3-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
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

export default Level3Module4Section4;

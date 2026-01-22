import { ArrowLeft, Building, Target, FileCheck, Award, MapPin, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Building Regulations Part L (conservation of fuel and power)",
    description: "Legal requirements for energy conservation and fuel efficiency in building design",
    icon: Building,
    href: "../level3-module2-section1-1",
  },
  {
    number: "1.2",
    title: "UK Net Zero targets & impact on electrical work",
    description: "Government net zero commitments and their implications for electrical installations",
    icon: Target,
    href: "../level3-module2-section1-2",
  },
  {
    number: "1.3",
    title: "BS7671 sustainability considerations",
    description: "IET Wiring Regulations requirements for sustainable electrical installations",
    icon: FileCheck,
    href: "../level3-module2-section1-3",
  },
  {
    number: "1.4",
    title: "Energy Performance Certificates (EPCs) and compliance",
    description: "Understanding EPCs and their role in building energy efficiency compliance",
    icon: Award,
    href: "../level3-module2-section1-4",
  },
  {
    number: "1.5",
    title: "Role of local authorities and planning permissions",
    description: "Local authority requirements and planning considerations for electrical installations",
    icon: MapPin,
    href: "../level3-module2-section1-5",
  },
];

const Level3Module2Section1 = () => {
  useSEO(
    "Section 1: Environmental Legislation and Standards - Level 3 Module 2",
    "Environmental laws, regulations and standards affecting electrical installations"
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

export default Level3Module2Section1;

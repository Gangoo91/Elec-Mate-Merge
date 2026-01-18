import { ArrowLeft, Droplets, Cloud, Factory, Car, HardHat, Flame, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "4.1",
    title: "Bathrooms and Locations Containing a Bath/Shower",
    description: "Special design considerations for bathrooms and wet locations",
    icon: Droplets,
    href: "../level3-module6-section4-1",
  },
  {
    number: "4.2",
    title: "Outdoor Installations and External Influences (IP ratings, UV, weatherproofing)",
    description: "Designing for outdoor installations considering environmental factors",
    icon: Cloud,
    href: "../level3-module6-section4-2",
  },
  {
    number: "4.3",
    title: "Agricultural and Industrial Installations",
    description: "Special requirements for agricultural and industrial electrical installations",
    icon: Factory,
    href: "../level3-module6-section4-3",
  },
  {
    number: "4.4",
    title: "EV Charging Points (OZEV guidance, Section 722)",
    description: "Design requirements for electric vehicle charging installations",
    icon: Car,
    href: "../level3-module6-section4-4",
  },
  {
    number: "4.5",
    title: "Temporary Installations (construction sites, exhibitions)",
    description: "Design considerations for temporary electrical installations",
    icon: HardHat,
    href: "../level3-module6-section4-5",
  },
  {
    number: "4.6",
    title: "Fire Alarm, Emergency Lighting and Data/Communications Integration",
    description: "Integrating safety systems and communications into electrical designs",
    icon: Flame,
    href: "../level3-module6-section4-6",
  },
];

const Level3Module6Section4 = () => {
  useSEO(
    "Section 4: Designing for Special Installations and Locations - Level 3 Module 6",
    "Design considerations for special locations and installations with specific requirements"
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
            <Link to="/study-centre/apprentice/level3-module6">
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
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Designing for Special Installations and Locations
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Design considerations for special locations and installations with specific requirements
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers special installations including bathrooms, outdoor locations,
              agricultural and industrial settings, EV charging points,
              temporary installations, and fire alarm and emergency lighting integration.
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

export default Level3Module6Section4;

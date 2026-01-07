import { ArrowLeft, Recycle, AlertTriangle, Leaf, Footprints, Users, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "6.1",
    title: "Waste management and recycling of materials",
    description: "Proper disposal and recycling procedures for electrical materials and components",
    icon: Recycle,
    href: "../level3-module2-section6-1",
  },
  {
    number: "6.2",
    title: "Safe disposal of hazardous components (batteries, lamps)",
    description: "Handling and disposal procedures for hazardous electrical components",
    icon: AlertTriangle,
    href: "../level3-module2-section6-2",
  },
  {
    number: "6.3",
    title: "Life-cycle thinking in material selection",
    description: "Considering environmental impact throughout the lifecycle of electrical materials",
    icon: Leaf,
    href: "../level3-module2-section6-3",
  },
  {
    number: "6.4",
    title: "Reducing carbon footprint on site (transport, energy use)",
    description: "Minimising environmental impact through efficient site operations and transport",
    icon: Footprints,
    href: "../level3-module2-section6-4",
  },
  {
    number: "6.5",
    title: "Promoting a culture of sustainability within teams",
    description: "Building environmental awareness and sustainable practices within work teams",
    icon: Users,
    href: "../level3-module2-section6-5",
  },
];

const Level3Module2Section6 = () => {
  useSEO(
    "Section 6: Sustainable Working Practices - Level 3 Module 2",
    "Environmentally responsible working methods and waste management practices"
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
            <span>Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Sustainable Working Practices
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Environmentally responsible working methods and waste management practices
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers sustainable working practices including waste management and recycling,
              safe disposal of hazardous components, life-cycle thinking in material selection,
              reducing carbon footprint on site, and promoting a culture of sustainability.
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

export default Level3Module2Section6;

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

export default Level3Module2Section6;

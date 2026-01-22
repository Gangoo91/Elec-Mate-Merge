import { ArrowLeft, AlertTriangle, Mountain, Box, Flame, Dumbbell, Cloud, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "4.1",
    title: "Common construction hazards (slips, trips, falls, sharps, dust, asbestos, silica)",
    description: "Identification and management of typical construction site hazards",
    icon: AlertTriangle,
    href: "../level3-module1-section4-1",
  },
  {
    number: "4.2",
    title: "Working at height (scaffolds, ladders, MEWPs)",
    description: "Safe working practices for elevated work platforms and access equipment",
    icon: Mountain,
    href: "../level3-module1-section4-2",
  },
  {
    number: "4.3",
    title: "Confined space hazards and permits",
    description: "Recognition of confined spaces and permit-to-work requirements",
    icon: Box,
    href: "../level3-module1-section4-3",
  },
  {
    number: "4.4",
    title: "Fire safety - prevention, extinguishers, evacuation",
    description: "Fire prevention measures, firefighting equipment and emergency evacuation procedures",
    icon: Flame,
    href: "../level3-module1-section4-4",
  },
  {
    number: "4.5",
    title: "Manual handling, noise, and vibration hazards",
    description: "Physical hazards from lifting, excessive noise and vibrating equipment",
    icon: Dumbbell,
    href: "../level3-module1-section4-5",
  },
  {
    number: "4.6",
    title: "Environmental hazards (contaminated ground, water ingress, extreme weather)",
    description: "Environmental factors affecting workplace safety and work planning",
    icon: Cloud,
    href: "../level3-module1-section4-6",
  },
];

const Level3Module1Section4 = () => {
  useSEO(
    "Section 4: Hazard Identification and Control - Level 3 Module 1",
    "Systematic hazard identification, evaluation and implementation of control measures"
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
            <Link to="/study-centre/apprentice/level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
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

export default Level3Module1Section4;

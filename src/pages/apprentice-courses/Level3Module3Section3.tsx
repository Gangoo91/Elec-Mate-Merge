import { ArrowLeft, Magnet, Zap, Link2, Box, RotateCcw } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Magnetic Fields and Flux",
    description: "Understanding magnetic field strength, flux density and magnetic circuit principles",
    icon: Magnet,
    href: "../level3-module3-section3-1",
  },
  {
    number: "3.2",
    title: "Electromagnetic Induction",
    description: "Faraday's and Lenz's Laws - the foundation of electrical generation and transformation",
    icon: Zap,
    href: "../level3-module3-section3-2",
  },
  {
    number: "3.3",
    title: "Self and Mutual Inductance",
    description: "Inductance in single circuits and the interaction between coupled circuits",
    icon: Link2,
    href: "../level3-module3-section3-3",
  },
  {
    number: "3.4",
    title: "Transformers - Theory and Applications",
    description: "Transformer principles, construction, efficiency and practical applications",
    icon: Box,
    href: "../level3-module3-section3-4",
  },
  {
    number: "3.5",
    title: "Motors and Generators",
    description: "Principles of operation for rotating electrical machines and their characteristics",
    icon: RotateCcw,
    href: "../level3-module3-section3-5",
  },
];

const Level3Module3Section3 = () => {
  useSEO(
    "Section 3: Electromagnetic Principles - Level 3 Module 3",
    "Magnetic fields, electromagnetic induction, transformers and rotating machines"
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

export default Level3Module3Section3;

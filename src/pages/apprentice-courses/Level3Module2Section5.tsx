import { ArrowLeft, Plug, ArrowUpCircle, Shield, Scale, TestTube, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "5.1",
    title: "Connection to consumer units & distribution boards",
    description: "Integrating environmental technologies with existing electrical distribution systems",
    icon: Plug,
    href: "../level3-module2-section5-1",
  },
  {
    number: "5.2",
    title: "Exporting energy back to the grid",
    description: "Grid export requirements, feed-in tariffs and bi-directional energy flow",
    icon: ArrowUpCircle,
    href: "../level3-module2-section5-2",
  },
  {
    number: "5.3",
    title: "Impact of renewables on earthing & protection systems",
    description: "Effects of renewable energy systems on electrical protection and earthing arrangements",
    icon: Shield,
    href: "../level3-module2-section5-3",
  },
  {
    number: "5.4",
    title: "Load balancing and harmonics considerations",
    description: "Managing electrical loads and harmonic distortion in integrated systems",
    icon: Scale,
    href: "../level3-module2-section5-4",
  },
  {
    number: "5.5",
    title: "Inspection, testing & certification of integrated systems",
    description: "Testing procedures and certification requirements for integrated renewable systems",
    icon: TestTube,
    href: "../level3-module2-section5-5",
  },
];

const Level3Module2Section5 = () => {
  useSEO(
    "Section 5: Integration with Electrical Installations - Level 3 Module 2",
    "Incorporating environmental technologies into conventional electrical systems"
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

export default Level3Module2Section5;

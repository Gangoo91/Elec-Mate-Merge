import { ArrowLeft, BookOpen, Wrench, Shield, TestTube, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Practical Assessment Guide",
    description: "Comprehensive guide to practical assessment requirements and expectations",
    icon: BookOpen,
    href: "../level3-module8-section2-1",
  },
  {
    number: "2.2",
    title: "Wiring Techniques Review",
    description: "Review of essential wiring techniques required for practical assessments",
    icon: Wrench,
    href: "../level3-module8-section2-2",
  },
  {
    number: "2.3",
    title: "Safe Isolation Practice",
    description: "Step-by-step safe isolation procedures for practical exam scenarios",
    icon: Shield,
    href: "../level3-module8-section2-3",
  },
  {
    number: "2.4",
    title: "Testing Procedures Guide",
    description: "Complete guide to testing procedures and sequence for practical assessments",
    icon: TestTube,
    href: "../level3-module8-section2-4",
  },
];

const Level3Module8Section2 = () => {
  useSEO(
    "Section 2: Practical Help - Level 3 Module 8",
    "Essential guidance and review materials for practical assessment preparation"
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
            <Link to="/study-centre/apprentice/level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
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

export default Level3Module8Section2;

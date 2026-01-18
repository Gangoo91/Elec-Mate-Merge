import { ArrowLeft, Zap, TestTube, Eye, Wrench, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Continuity of Protective Conductors (CPCs)",
    description: "Testing earth continuity in protective conductor circuits",
    icon: Zap,
    href: "4-1"
  },
  {
    number: "Subsection 2",
    title: "Continuity of Ring Circuits (Awareness Level)",
    description: "Basic understanding of ring circuit continuity testing",
    icon: TestTube,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Confirming Polarity of Switches and Accessories",
    description: "Verifying correct polarity in electrical installations",
    icon: Eye,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Common Faults Found During Continuity/Polarity Tests",
    description: "Identifying typical problems during continuity testing",
    icon: Wrench,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Recording Results and Actions Required",
    description: "Documenting test results and follow-up actions",
    icon: Shield,
    href: "4-5"
  }
];

const Section4 = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Continuity and Polarity Checks
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Testing for electrical continuity and correct polarity
            </p>
          </header>

          {/* Subsections Grid */}
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
        </div>
      </div>
    </div>
  );
};

export default Section4;

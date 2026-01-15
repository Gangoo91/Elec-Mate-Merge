import { ArrowLeft, TestTube, Eye, Wrench, Zap, Shield, FileText, Award } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Purpose of Inspection and Testing",
    description: "Understanding why inspection and testing are essential for electrical safety",
    icon: TestTube,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Visual Inspection of Electrical Installations",
    description: "Systematic visual inspection techniques for electrical systems",
    icon: Eye,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Basic Testing Procedures and Instruments",
    description: "Introduction to electrical testing equipment and procedures",
    icon: Wrench,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Continuity and Polarity Checks",
    description: "Testing for electrical continuity and correct polarity",
    icon: Zap,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Insulation Resistance Testing (Introduction Only)",
    description: "Basic introduction to insulation resistance testing principles",
    icon: Shield,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Recording Test Results and Defect Identification",
    description: "Documenting test results and identifying electrical defects",
    icon: FileText,
    href: "section6"
  },
  {
    number: "Section 7",
    title: "Introduction to Certification and Documentation",
    description: "Understanding electrical certification and compliance documentation",
    icon: Award,
    href: "section7"
  },
];

const Module6 = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Level 2
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Level 2</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Electrical Apprenticeship</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Module 6: Inspection, Testing & Certification
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Safe isolation procedures, continuity testing, insulation resistance and certification
            </p>
          </header>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 gap-4">
            {sections.map((section, index) => (
              <ModuleCard
                key={index}
                number={section.number}
                title={section.title}
                description={section.description}
                icon={section.icon}
                href={section.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module6;

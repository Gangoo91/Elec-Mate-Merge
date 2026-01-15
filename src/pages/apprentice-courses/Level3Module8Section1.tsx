import { ArrowLeft, ClipboardCheck, Timer, Zap, FileSearch } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Full Practice Exam",
    description: "Complete mock exams simulating real Level 3 exam conditions and format",
    icon: ClipboardCheck,
    href: "../level3-module8-section1-1",
  },
  {
    number: "1.2",
    title: "Timed Module Tests",
    description: "Focused tests on specific modules with realistic time constraints",
    icon: Timer,
    href: "../level3-module8-section1-2",
  },
  {
    number: "1.3",
    title: "Quick Fire Questions",
    description: "Rapid-response questions to test instant recall and knowledge retention",
    icon: Zap,
    href: "../level3-module8-section1-3",
  },
  {
    number: "1.4",
    title: "Past Paper Analysis",
    description: "Review and analysis of past exam papers to identify common themes and question styles",
    icon: FileSearch,
    href: "../level3-module8-section1-4",
  },
];

const Level3Module8Section1 = () => {
  useSEO(
    "Section 1: Mock Exams - Level 3 Module 8",
    "Practice exams and tests to prepare you for the real Level 3 assessments"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
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
            <span>Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mock Exams
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Practice exams and tests to prepare you for the real Level 3 assessments
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section provides comprehensive exam preparation including full practice exams,
              timed module tests, quick fire questions for instant recall,
              and past paper analysis to understand exam patterns.
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

export default Level3Module8Section1;

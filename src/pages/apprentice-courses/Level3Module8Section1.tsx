import { ArrowLeft, ClipboardCheck, Timer, Zap, FileSearch } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 1 - Mock Exams
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Practice exams and tests to prepare you for the real Level 3 assessments
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
};

export default Level3Module8Section1;

import { ArrowLeft, ClipboardCheck, Timer, Zap, FileSearch, Shuffle, Clock, Trophy } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Topic-Based Mock Exams",
    description: "Individual exams for each module - H&S, Science, Testing, Design & more",
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

        {/* Featured: Comprehensive Mock Exam */}
        <section className="mb-8">
          <Link to="../level3-module8-mock-exam8">
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border-2 border-elec-yellow/30 hover:border-elec-yellow/50 transition-all touch-manipulation active:scale-[0.98]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                  <Shuffle className="h-7 w-7 text-elec-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-elec-yellow bg-elec-yellow/20 px-2 py-0.5 rounded">COMPREHENSIVE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Full Practice Exam</h3>
                  <p className="text-sm text-white/60 mb-3">40 questions from all 7 modules • 90 minutes • 60% pass mark</p>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      90 mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3.5 w-3.5" />
                      60% to pass
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Exam Resources</h2>
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

import { Monitor, BookOpen, FileQuestion, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module6 = () => {
  useSEO(
    "Module 6: Online Knowledge Test - AM2 Preparation Course",
    "Comprehensive preparation for the AM2 online knowledge test including practice questions and strategies"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Format and structure of the online test",
      description: "Understanding the online test layout and requirements",
      icon: Monitor,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Core topics covered (regs, science, safety)",
      description: "Key subject areas in the knowledge test",
      icon: BookOpen,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Time management strategies",
      description: "Effective techniques for managing test time",
      icon: Clock,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Exam Techniques and Mindset",
      description: "Mental preparation and effective exam strategies",
      icon: FileQuestion,
      path: "section4"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AM2 Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-elec-yellow/10 border border-elec-yellow/20 rounded-full mb-4">
            <Monitor className="w-4 h-4 text-elec-yellow" />
            <span className="text-ios-footnote font-medium text-elec-yellow">Module 6</span>
          </div>
          <h1 className="text-ios-title-1 font-bold text-white mb-3">
            Online Knowledge Test
          </h1>
          <p className="text-ios-body text-white/70 max-w-2xl leading-relaxed">
            Master the AM2 online knowledge test with comprehensive preparation covering test format, core topics, time management, and exam techniques.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 gap-4">
          {sections.map((section) => (
            <ModuleCard
              key={section.id}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.path}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AM2Module6;

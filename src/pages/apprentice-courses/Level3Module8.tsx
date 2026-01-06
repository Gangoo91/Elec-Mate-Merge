import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock, Target, BarChart3 } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Mock Exams",
    description: "Practice exams and timed tests",
    icon: FileText,
    href: "level3-module8-section1"
  },
  {
    number: "Section 2",
    title: "Practical Help",
    description: "Practical assessment guides and techniques",
    icon: Target,
    href: "level3-module8-section2"
  },
  {
    number: "Section 3",
    title: "Exam Tips",
    description: "Time management, memory techniques, stress management",
    icon: Clock,
    href: "level3-module8-section3"
  },
  {
    number: "Section 4",
    title: "Results Review",
    description: "Score analysis and progress tracking",
    icon: BarChart3,
    href: "level3-module8-section4"
  }
];

const Level3Module8 = () => {
  useSEO(
    "Level 3 Module 8: Mock Examinations | Electrical Training",
    "Comprehensive mock examinations, practical guidance, and exam techniques for Level 3 electrical installation qualifications. Test your knowledge and prepare for success."
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="../.." 
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Level 3 Overview
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Module 8: Mock Examinations & Assessment
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.number}
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
  );
};

export default Level3Module8;
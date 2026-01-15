import { ArrowLeft, FileText, Clock, Target, BarChart3, CheckCircle, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Mock Exams",
    description: "Practice exams and timed tests to prepare for real assessments",
    icon: FileText,
    href: "../level3-module8-section1",
  },
  {
    number: "Section 2",
    title: "Practical Help",
    description: "Practical assessment guides and techniques for hands-on assessments",
    icon: Target,
    href: "../level3-module8-section2",
  },
  {
    number: "Section 3",
    title: "Exam Tips",
    description: "Time management, memory techniques and stress management strategies",
    icon: Clock,
    href: "../level3-module8-section3",
  },
  {
    number: "Section 4",
    title: "Results Review",
    description: "Score analysis and progress tracking to identify areas for improvement",
    icon: BarChart3,
    href: "../level3-module8-section4",
  },
];

const learningOutcomes = [
  "Practice with realistic mock examinations under timed conditions",
  "Develop effective practical assessment techniques",
  "Apply time management strategies for exam success",
  "Use memory techniques to retain key information",
  "Manage exam stress and maintain focus",
  "Track progress and identify areas requiring improvement",
];

const Level3Module8 = () => {
  useSEO(
    "Module 8: Mock Examinations & Assessment - Level 3 Electrical Course",
    "Comprehensive mock examinations, practical guidance, and exam techniques for Level 3 electrical installation qualifications"
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
            <Link to="../level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
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
            <span>Module 8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mock Examinations and Assessment
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Comprehensive mock examinations, practical guidance, and exam techniques for Level 3 electrical installation qualifications
          </p>
        </header>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {learningOutcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Sections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
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
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module8;

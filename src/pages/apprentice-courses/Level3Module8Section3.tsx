import { ArrowLeft, Clock, Search, Brain, Heart, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "Time Management Strategies",
    description: "Effective strategies for managing your time during exams and revision",
    icon: Clock,
    href: "../level3-module8-section3-1",
  },
  {
    number: "3.2",
    title: "Question Analysis Techniques",
    description: "How to read, understand and approach different types of exam questions",
    icon: Search,
    href: "../level3-module8-section3-2",
  },
  {
    number: "3.3",
    title: "Memory Techniques",
    description: "Proven memory techniques and mnemonics for retaining key information",
    icon: Brain,
    href: "../level3-module8-section3-3",
  },
  {
    number: "3.4",
    title: "Stress Management",
    description: "Techniques for managing exam stress and maintaining peak performance",
    icon: Heart,
    href: "../level3-module8-section3-4",
  },
];

const Level3Module8Section3 = () => {
  useSEO(
    "Section 3: Exam Tips - Level 3 Module 8",
    "Expert tips and techniques to maximise your exam performance"
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
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Exam Tips
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Expert tips and techniques to maximise your exam performance
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section provides essential exam strategies including time management,
              question analysis techniques, memory aids and mnemonics,
              and stress management for optimal performance.
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

export default Level3Module8Section3;

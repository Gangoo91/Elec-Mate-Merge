import { ArrowLeft, Clock, Search, Brain, Heart } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            Section 3 - Exam Tips
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Expert tips and techniques to maximise your exam performance
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

export default Level3Module8Section3;

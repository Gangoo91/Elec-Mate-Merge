import { ArrowLeft, BookOpen, Calendar, Monitor, ClipboardList, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "4.1",
    title: "Importance of Lifelong Learning in the Trade",
    description: "Understanding the value of continuous learning and skill development",
    icon: BookOpen,
    href: "../level3-module7-section4-1",
  },
  {
    number: "4.2",
    title: "Attending Courses and Seminars (e.g. 18th Edition updates)",
    description: "Participating in formal training courses and industry seminars",
    icon: Calendar,
    href: "../level3-module7-section4-2",
  },
  {
    number: "4.3",
    title: "Online Learning Platforms and Digital Resources",
    description: "Utilising digital learning platforms and online resources for skill development",
    icon: Monitor,
    href: "../level3-module7-section4-3",
  },
  {
    number: "4.4",
    title: "Recording and Tracking CPD",
    description: "Methods for documenting and tracking continuing professional development",
    icon: ClipboardList,
    href: "../level3-module7-section4-4",
  },
  {
    number: "4.5",
    title: "Future-proofing Skills (green tech, automation, smart systems)",
    description: "Developing skills in emerging technologies and future industry trends",
    icon: Zap,
    href: "../level3-module7-section4-5",
  },
];

const Level3Module7Section4 = () => {
  useSEO(
    "Section 4: Continuing Professional Development (CPD) - Level 3 Module 7",
    "Lifelong learning, skills development and staying current with industry changes"
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
            <Link to="/study-centre/apprentice/level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
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
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuing Professional Development (CPD)
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Lifelong learning, skills development and staying current with industry changes
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers continuing professional development including lifelong learning,
              formal courses and seminars, online learning resources,
              CPD recording and tracking, and future-proofing skills.
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

export default Level3Module7Section4;

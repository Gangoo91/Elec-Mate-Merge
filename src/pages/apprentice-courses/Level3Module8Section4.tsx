import { ArrowLeft, BarChart, Target, Calendar, TrendingUp, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "4.1",
    title: "Score Analysis",
    description: "Detailed analysis of your mock exam scores and performance metrics",
    icon: BarChart,
    href: "../level3-module8-section4-1",
  },
  {
    number: "4.2",
    title: "Weak Areas Identification",
    description: "Identify and understand your weak areas for targeted improvement",
    icon: Target,
    href: "../level3-module8-section4-2",
  },
  {
    number: "4.3",
    title: "Targeted Revision Plans",
    description: "Customised revision plans based on your performance data",
    icon: Calendar,
    href: "../level3-module8-section4-3",
  },
  {
    number: "4.4",
    title: "Progress Tracking",
    description: "Track your improvement over time and measure exam readiness",
    icon: TrendingUp,
    href: "../level3-module8-section4-4",
  },
];

const Level3Module8Section4 = () => {
  useSEO(
    "Section 4: Results Review - Level 3 Module 8",
    "Analyse your results and create targeted revision strategies for improvement"
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
            <span>Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Results Review
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Analyse your results and create targeted revision strategies for improvement
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section helps you analyse your performance including score analysis,
              weak areas identification, targeted revision planning,
              and progress tracking to measure exam readiness.
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

export default Level3Module8Section4;

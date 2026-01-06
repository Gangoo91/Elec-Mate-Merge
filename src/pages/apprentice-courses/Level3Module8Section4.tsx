import { ArrowLeft, BarChart, Target, Calendar, TrendingUp } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            Section 4 - Results Review
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Analyse your results and create targeted revision strategies for improvement
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

export default Level3Module8Section4;

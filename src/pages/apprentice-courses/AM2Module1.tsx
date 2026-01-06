import { ArrowLeft, FileText, BarChart3, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module1 = () => {
  useSEO(
    "Module 1: Introduction to the AM2 - AM2 Preparation Course",
    "Understanding the purpose, structure, marking criteria and common failure reasons for the AM2 assessment"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Purpose of the AM2 and who it's for",
      description: "Understanding the AM2 assessment objectives and target candidates",
      icon: FileText,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Structure and timings of the assessment",
      description: "Breakdown of AM2 components and time allocations",
      icon: BarChart3,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Marking criteria and pass/fail thresholds",
      description: "How the AM2 is marked and what constitutes a pass",
      icon: AlertTriangle,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Common reasons for failure",
      description: "Typical mistakes and areas where candidates fail",
      icon: X,
      path: "section4"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-card/50">
        <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4">
          <Button variant="ghost" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AM2 Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Module 1: Introduction to the AM2
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default AM2Module1;
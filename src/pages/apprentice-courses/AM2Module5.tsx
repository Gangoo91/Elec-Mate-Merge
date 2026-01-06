import { ArrowLeft, Bug, Search, Settings, CheckCircle, RotateCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module5 = () => {
  useSEO(
    "Module 5: Fault Diagnosis and Rectification - AM2 Preparation Course",
    "Systematic fault-finding techniques, test equipment use and rectification procedures for AM2 assessment"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Typical faults set in the AM2 assessment",
      description: "Common fault scenarios in AM2 examinations",
      icon: Bug,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Logical fault-finding process",
      description: "Systematic approach to fault diagnosis",
      icon: Search,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Using test equipment efficiently",
      description: "Effective use of test instruments for fault finding",
      icon: Settings,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Proving and recording rectification",
      description: "Demonstrating and documenting fault rectification",
      icon: CheckCircle,
      path: "section4"
    },
    {
      id: 5,
      number: "Section 5",
      title: "Re-testing procedures",
      description: "Post-rectification testing and verification",
      icon: RotateCcw,
      path: "section5"
    },
    {
      id: 6,
      number: "Section 6",
      title: "AM2 Fault Diagnosis & Rectification – Quick Reference Sheet",
      description: "Essential reference guide for AM2 fault-finding procedures",
      icon: FileText,
      path: "section6"
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
        <div className="mb-8">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Module 5: Fault Diagnosis and Rectification
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

export default AM2Module5;
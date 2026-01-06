import { ArrowLeft, Shield, FileCheck, Map, Timer, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module2 = () => {
  useSEO(
    "Module 2: Health, Safety and Documentation - AM2 Preparation Course",
    "Critical safety procedures, risk assessments, drawings and documentation requirements for AM2 success"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Safe isolation procedures (instant fail if wrong)",
      description: "Critical safe isolation techniques and procedures",
      icon: Shield,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Risk assessments and method statements (RAMS)",
      description: "Completing RAMS documentation for AM2 tasks",
      icon: FileCheck,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Working with drawings and specifications",
      description: "Interpreting technical drawings and specifications",
      icon: Map,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Completing paperwork under pressure",
      description: "Efficient documentation during timed assessments",
      icon: Timer,
      path: "section4"
    },
    {
      id: 5,
      number: "Section 5",
      title: "Avoiding critical safety errors",
      description: "Common safety mistakes that lead to instant failure",
      icon: AlertCircle,
      path: "section5"
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
            Module 2: Health, Safety and Documentation
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

export default AM2Module2;
import { ArrowLeft, ListChecks, Wrench, FileCheck, Activity, AlertTriangle, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const AM2Module4 = () => {
  useSEO(
    "Module 4: Inspection and Testing - AM2 Preparation Course",
    "Complete testing procedures, instrument use, certification and compliance recording for AM2 assessment"
  );

  const sections = [
    {
      id: 1,
      number: "Section 1",
      title: "Full test sequence and order of tests",
      description: "Correct testing sequence and methodology",
      icon: ListChecks,
      path: "section1"
    },
    {
      id: 2,
      number: "Section 2",
      title: "Safe use of test instruments (GS38 compliance)",
      description: "Proper test equipment use and safety requirements",
      icon: Wrench,
      path: "section2"
    },
    {
      id: 3,
      number: "Section 3",
      title: "Recording test results on certification",
      description: "Accurate completion of test certificates",
      icon: FileCheck,
      path: "section3"
    },
    {
      id: 4,
      number: "Section 4",
      title: "Functional and operational testing",
      description: "Testing system functionality and operation",
      icon: Activity,
      path: "section4"
    },
    {
      id: 5,
      number: "Section 5",
      title: "Identifying and reporting non-compliances",
      description: "Finding and documenting installation defects",
      icon: AlertTriangle,
      path: "section5"
    },
    {
      id: 6,
      number: "Section 6",
      title: "Time management during testing",
      description: "Efficient testing under exam time constraints",
      icon: Timer,
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
            Module 4: Inspection and Testing
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

export default AM2Module4;
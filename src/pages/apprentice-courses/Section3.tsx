import { ArrowLeft, Search, ClipboardList, FileCheck, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Purpose of Risk Assessments",
    description: "Understanding why risk assessments are essential for electrical work",
    icon: Search,
    href: "3-1"
  },
  {
    number: "Subsection 2", 
    title: "The Five Steps of Risk Assessment",
    description: "Step-by-step process for conducting effective risk assessments",
    icon: ClipboardList,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "What is a Method Statement?",
    description: "Documentation of safe working procedures and processes",
    icon: FileCheck,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Control Measures and the Hierarchy of Control",
    description: "Implementing effective controls to manage workplace risks",
    icon: Shield,
    href: "3-4"
  }
];

const Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 3: Risk Assessment and Method Statements (RAMS)
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl">
            Planning and documenting safe working procedures for electrical installations
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

export default Section3;
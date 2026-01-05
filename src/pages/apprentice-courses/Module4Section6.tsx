import { ArrowLeft, TestTube, FileText, Wrench, CheckCircle, Ruler, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Performing a Visual Inspection",
    description: "Systematic visual inspection of completed installation work",
    icon: TestTube,
    href: "6-1"
  },
  {
    number: "Subsection 2", 
    title: "Continuity and Polarity Checks (Functional, Non-Certified)",
    description: "Basic functional testing for continuity and polarity",
    icon: FileText,
    href: "6-2"
  },
  {
    number: "Subsection 3",
    title: "Basic Insulation Resistance Testing (Introduction Only)",
    description: "Introduction to insulation resistance testing principles",
    icon: Wrench,
    href: "6-3"
  },
  {
    number: "Subsection 4",
    title: "Checking Fixings, Cable Routes, and Terminations",
    description: "Verifying all fixings and connections are secure",
    icon: CheckCircle,
    href: "6-4"
  },
  {
    number: "Subsection 5",
    title: "Identifying and Rectifying Defects",
    description: "Finding and correcting installation defects",
    icon: Ruler,
    href: "6-5"
  },
  {
    number: "Subsection 6",
    title: "Recording Inspection and Test Results",
    description: "Legal requirements and best practices for documenting test results",
    icon: Shield,
    href: "6-6"
  }
];

const Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 6: Testing and Inspecting the Completed Installation
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Testing procedures and inspection of completed work
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

export default Section6;
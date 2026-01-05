import { ArrowLeft, Shield, FileText, Wrench, CheckCircle, Ruler } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Safe Manual Handling of Equipment and Materials",
    description: "Proper lifting and handling techniques for electrical materials",
    icon: Shield,
    href: "7-1"
  },
  {
    number: "Subsection 2", 
    title: "Using Hand and Power Tools Safely and Legally",
    description: "Safe operation of tools in compliance with regulations",
    icon: FileText,
    href: "7-2"
  },
  {
    number: "Subsection 3",
    title: "PPE for Cutting, Bending, and Fixing Work",
    description: "Appropriate personal protective equipment for installation tasks",
    icon: Wrench,
    href: "7-3"
  },
  {
    number: "Subsection 4",
    title: "Working in Voids, Risers, and Ceilings",
    description: "Safety considerations for working in confined or elevated spaces",
    icon: CheckCircle,
    href: "7-4"
  },
  {
    number: "Subsection 5",
    title: "Keeping the Work Area Safe and Organised",
    description: "Maintaining a clean, safe and organised workplace",
    icon: Ruler,
    href: "7-5"
  }
];

const Section7 = () => {
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
            Section 7: Safe Working and Tool Use During Installation
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Safety practices and proper tool use during installation work
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

export default Section7;
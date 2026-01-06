import { ArrowLeft, TestTube, Eye, Wrench, Zap, Shield, FileText, Award } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Purpose of Inspection and Testing",
    description: "Understanding why inspection and testing are essential for electrical safety",
    icon: TestTube,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Visual Inspection of Electrical Installations",
    description: "Systematic visual inspection techniques for electrical systems",
    icon: Eye,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Basic Testing Procedures and Instruments",
    description: "Introduction to electrical testing equipment and procedures",
    icon: Wrench,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Continuity and Polarity Checks",
    description: "Testing for electrical continuity and correct polarity",
    icon: Zap,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Insulation Resistance Testing (Introduction Only)",
    description: "Basic introduction to insulation resistance testing principles",
    icon: Shield,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Recording Test Results and Defect Identification",
    description: "Documenting test results and identifying electrical defects",
    icon: FileText,
    href: "section6"
  },
  {
    number: "Section 7",
    title: "Introduction to Certification and Documentation",
    description: "Understanding electrical certification and compliance documentation",
    icon: Award,
    href: "section7"
  },
];

const Module6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Module 6: Inspection, Testing & Certification
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl">
            Safe isolation procedures, continuity testing, insulation resistance and certification
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module6;
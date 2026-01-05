import { ArrowLeft, FileText, TestTube, Eye, Wrench, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "What to Record and Why It Matters",
    description: "Understanding the importance of accurate test documentation",
    icon: FileText,
    href: "6-1"
  },
  {
    number: "Subsection 2",
    title: "Interpreting Test Readings (Pass/Fail Awareness)",
    description: "Basic interpretation of electrical test results",
    icon: TestTube,
    href: "6-2"
  },
  {
    number: "Subsection 3",
    title: "Identifying Common Installation Defects",
    description: "Recognising typical electrical installation problems",
    icon: Eye,
    href: "6-3"
  },
  {
    number: "Subsection 4",
    title: "Corrective Action and Retesting",
    description: "Understanding remedial work and verification procedures",
    icon: Wrench,
    href: "6-4"
  },
  {
    number: "Subsection 5",
    title: "Test Sheets and Site Documentation (Intro Level)",
    description: "Introduction to electrical test documentation and forms",
    icon: Zap,
    href: "6-5"
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
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 6: Recording Test Results and Defect Identification
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Documenting test results and identifying electrical defects
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
import { ArrowLeft, TestTube, Search, Eye, Zap, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Using a Systematic Approach to Fault Diagnosis",
    description: "Logical methodology for electrical fault diagnosis",
    icon: TestTube,
    href: "4-1"
  },
  {
    number: "Subsection 2", 
    title: "Understanding the Sequence of Operation",
    description: "Analysing how electrical circuits should function normally",
    icon: Search,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Testing One Component or Section at a Time",
    description: "Methodical testing of individual circuit elements",
    icon: Eye,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Dividing the Circuit into Zones (Split and Isolate)",
    description: "Sectional approach to fault location and isolation",
    icon: Zap,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Interpreting Test Readings at a Basic Level",
    description: "Understanding basic electrical test measurements",
    icon: AlertTriangle,
    href: "4-5"
  },
  {
    number: "Subsection 6",
    title: "Knowing When to Escalate or Stop Work",
    description: "Recognising competence limits and safety boundaries",
    icon: TestTube,
    href: "4-6"
  }
];

const Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 4: Basic Fault-Finding Process and Logical Testing
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Systematic approach to electrical fault diagnosis
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

export default Section4;
import { ArrowLeft, Zap, TestTube, Eye, Wrench, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Continuity of Protective Conductors (CPCs)",
    description: "Testing earth continuity in protective conductor circuits",
    icon: Zap,
    href: "4-1"
  },
  {
    number: "Subsection 2", 
    title: "Continuity of Ring Circuits (Awareness Level)",
    description: "Basic understanding of ring circuit continuity testing",
    icon: TestTube,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Confirming Polarity of Switches and Accessories",
    description: "Verifying correct polarity in electrical installations",
    icon: Eye,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Common Faults Found During Continuity/Polarity Tests",
    description: "Identifying typical problems during continuity testing",
    icon: Wrench,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Recording Results and Actions Required",
    description: "Documenting test results and follow-up actions",
    icon: Shield,
    href: "4-5"
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
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 4: Continuity and Polarity Checks
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Testing for electrical continuity and correct polarity
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
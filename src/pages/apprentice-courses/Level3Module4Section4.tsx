import { ArrowLeft, Eye, Zap, CheckCircle, Target, Settings } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Visual Inspection Techniques",
    description: "Systematic visual inspection methods for identifying electrical faults",
    icon: Eye,
    href: "../level3-module4-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Continuity and Insulation Resistance Testing",
    description: "Testing procedures for circuit continuity and insulation integrity",
    icon: Zap,
    href: "../level3-module4-section4-4-2",
  },
  {
    number: "4.3",
    title: "Polarity Checks",
    description: "Verifying correct polarity in electrical installations and circuits",
    icon: CheckCircle,
    href: "../level3-module4-section4-4-3",
  },
  {
    number: "4.4",
    title: "Earth Fault Loop Impedance Testing",
    description: "Testing earth fault loop impedance for protective device effectiveness",
    icon: Target,
    href: "../level3-module4-section4-4-4",
  },
  {
    number: "4.5",
    title: "Functional and Operational Testing",
    description: "Testing the operational performance and functionality of electrical systems",
    icon: Settings,
    href: "../level3-module4-section4-4-5",
  },
];

const Level3Module4Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 4 - Systematic Fault-Finding Techniques
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Learn systematic and methodical approaches to fault finding using proper testing techniques and procedures
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default Level3Module4Section4;
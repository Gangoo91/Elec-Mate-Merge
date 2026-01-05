import { ArrowLeft, Zap, Eye, Search, Shield, FileText } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "Types of Faults",
    description: "Open circuit, short circuit, earth faults, high resistance and other common fault types",
    icon: Zap,
    href: "../level3-module4-section1-1-1",
  },
  {
    number: "1.2", 
    title: "Symptoms and Fault Indicators",
    description: "Recognising signs of electrical faults and understanding fault indicators",
    icon: Eye,
    href: "../level3-module4-section1-1-2",
  },
  {
    number: "1.3",
    title: "Diagnostic Sequence and Logical Problem-Solving",
    description: "Systematic approach to fault diagnosis and logical troubleshooting methods",
    icon: Search,
    href: "../level3-module4-section1-1-3",
  },
  {
    number: "1.4",
    title: "Safety Considerations Before and During Fault Finding",
    description: "Safe working practices and risk assessment for fault diagnosis work",
    icon: Shield,
    href: "../level3-module4-section1-1-4",
  },
  {
    number: "1.5",
    title: "Documentation of Findings",
    description: "Recording fault diagnosis results and maintaining accurate documentation",
    icon: FileText,
    href: "../level3-module4-section1-1-5",
  },
];

const Level3Module4Section1 = () => {
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
            Section 1 - Principles of Fault Diagnosis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Learn the fundamental principles of electrical fault diagnosis, including fault types, symptoms, systematic approaches and safety considerations
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

export default Level3Module4Section1;
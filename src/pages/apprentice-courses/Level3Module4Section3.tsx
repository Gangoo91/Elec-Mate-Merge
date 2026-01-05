import { ArrowLeft, CircuitBoard, Lightbulb, Shield, Zap, Thermometer, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "Ring and Radial Circuit Faults",
    description: "Common faults in ring final and radial circuits and their diagnosis",
    icon: CircuitBoard,
    href: "../level3-module4-section3-3-1",
  },
  {
    number: "3.2", 
    title: "Lighting Circuit Faults",
    description: "Fault finding in lighting circuits including switching and control problems",
    icon: Lightbulb,
    href: "../level3-module4-section3-3-2",
  },
  {
    number: "3.3",
    title: "Protective Device Tripping",
    description: "MCBs, RCDs, RCBOs tripping faults and protective device malfunctions",
    icon: Shield,
    href: "../level3-module4-section3-3-3",
  },
  {
    number: "3.4",
    title: "Earthing and Bonding Issues",
    description: "Earth continuity problems, bonding failures and earthing system faults",
    icon: Zap,
    href: "../level3-module4-section3-3-4",
  },
  {
    number: "3.5",
    title: "Appliance and Equipment Faults",
    description: "Fault diagnosis in electrical appliances and fixed equipment",
    icon: AlertTriangle,
    href: "../level3-module4-section3-3-5",
  },
  {
    number: "3.6",
    title: "Overheating and Insulation Breakdown",
    description: "Thermal faults, insulation failures and degradation problems",
    icon: Thermometer,
    href: "../level3-module4-section3-3-6",
  },
];

const Level3Module4Section3 = () => {
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
            Section 3 - Common Faults in Electrical Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Understand the most common types of faults encountered in electrical installations and their characteristics
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

export default Level3Module4Section3;
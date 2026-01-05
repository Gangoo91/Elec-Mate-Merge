import { ArrowLeft, Zap, Shield, Wrench, Thermometer, TrendingDown, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Conductors and Insulators – Definitions and Examples",
    description: "Understanding materials that conduct or prevent electrical flow",
    icon: Zap,
    href: "5-1"
  },
  {
    number: "5.2", 
    title: "Common Materials in Electrical Work (Copper, Aluminium, PVC, Rubber)",
    description: "Properties and applications of standard electrical materials",
    icon: Wrench,
    href: "5-2"
  },
  {
    number: "5.3",
    title: "Factors Affecting Resistance (Length, Area, Temperature, Material)",
    description: "Understanding how physical properties influence electrical resistance",
    icon: Thermometer,
    href: "5-3"
  },
  {
    number: "5.4",
    title: "Resistance in Practice – Cable Selection and Heating Effects",
    description: "Practical considerations for cable selection and managing heat generation",
    icon: TrendingDown,
    href: "5-4"
  },
  {
    number: "5.5",
    title: "Resistance and Voltage Drop",
    description: "Understanding how resistance causes voltage drop in electrical circuits",
    icon: Shield,
    href: "5-5"
  },
  {
    number: "5.6",
    title: "Real-World Impacts: Overheating, Efficiency Loss, Safety",
    description: "Practical consequences of resistance in electrical installations",
    icon: AlertTriangle,
    href: "5-6"
  },
];

const Module2Section2_5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 2.5 – Electrical Materials and Resistance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Properties of electrical materials, conductors, insulators, and factors affecting resistance
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

export default Module2Section2_5;
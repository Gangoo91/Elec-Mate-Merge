import { ArrowLeft, Gauge, TestTube, Zap, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Multimeters, Insulation Testers, Continuity Testers",
    description: "Essential diagnostic instruments for electrical fault finding and testing",
    icon: Gauge,
    href: "../level3-module4-section2-2-1",
  },
  {
    number: "2.2", 
    title: "RCD and Loop Impedance Testers",
    description: "Specialist testers for protective device and earthing system verification",
    icon: TestTube,
    href: "../level3-module4-section2-2-2",
  },
  {
    number: "2.3",
    title: "Clamp Meters and Thermal Imaging",
    description: "Advanced diagnostic tools for current measurement and thermal fault detection",
    icon: Zap,
    href: "../level3-module4-section2-2-3",
  },
  {
    number: "2.4",
    title: "Safe Use, Calibration and Limitations of Instruments",
    description: "Proper instrument handling, calibration requirements and understanding limitations",
    icon: Shield,
    href: "../level3-module4-section2-2-4",
  },
];

const Level3Module4Section2 = () => {
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
            Section 2 - Diagnostic Tools and Equipment
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Master the use of essential diagnostic tools and equipment for effective fault finding in electrical installations
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

export default Level3Module4Section2;
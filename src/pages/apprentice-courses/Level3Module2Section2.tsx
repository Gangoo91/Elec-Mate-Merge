import { ArrowLeft, Lightbulb, Zap, Power, Settings, BarChart3 } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Energy-efficient lighting (LED, controls, sensors)",
    description: "LED technology, lighting controls and automatic sensor systems for energy savings",
    icon: Lightbulb,
    href: "../level3-module2-section2-2-1",
  },
  {
    number: "2.2", 
    title: "Power factor correction",
    description: "Understanding and implementing power factor correction for improved efficiency",
    icon: Zap,
    href: "../level3-module2-section2-2-2",
  },
  {
    number: "2.3",
    title: "Reducing standby consumption (smart devices, timers)", 
    description: "Minimising standby power consumption through smart devices and timer controls",
    icon: Power,
    href: "../level3-module2-section2-2-3",
  },
  {
    number: "2.4",
    title: "Load management and diversity in design",
    description: "Optimising electrical load distribution and applying diversity factors in design",
    icon: Settings,
    href: "../level3-module2-section2-2-4",
  },
  {
    number: "2.5",
    title: "Smart meters and monitoring systems",
    description: "Smart metering technology and energy monitoring systems for consumption tracking",
    icon: BarChart3,
    href: "../level3-module2-section2-2-5",
  },
];

const Level3Module2Section2 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
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
            Section 2: Energy Efficiency in Electrical Installations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Techniques and technologies for improving energy efficiency in electrical systems
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

export default Level3Module2Section2;
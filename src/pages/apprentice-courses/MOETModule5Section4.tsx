import { ArrowLeft, Settings, RotateCcw, Wind, Wrench, Grid3x3, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule5Section4 = () => {
  useSEO(
    "Section 5.4: Process Control and Instrumentation - MOET Module 5",
    "PID control, pneumatic/hydraulic controls, DCS systems and instrument calibration"
  );

  const subsections = [
    {
      number: "5.4.1",
      title: "Principles of Process Control",
      description: "Open and closed loop control, feedback systems and control strategies",
      icon: Settings,
      href: "../m-o-e-t-module5-section4-1"
    },
    {
      number: "5.4.2",
      title: "PID Control Loops",
      description: "Proportional, integral and derivative control principles and tuning",
      icon: RotateCcw,
      href: "../m-o-e-t-module5-section4-2"
    },
    {
      number: "5.4.3",
      title: "Pneumatic and Hydraulic Controls (overview)",
      description: "Pneumatic and hydraulic control systems and components",
      icon: Wind,
      href: "../m-o-e-t-module5-section4-3"
    },
    {
      number: "5.4.4",
      title: "Control Valves and Actuators",
      description: "Valve types, actuator selection and control applications",
      icon: Wrench,
      href: "../m-o-e-t-module5-section4-4"
    },
    {
      number: "5.4.5",
      title: "Distributed Control Systems (DCS) (overview)",
      description: "DCS architecture, components and industrial applications",
      icon: Grid3x3,
      href: "../m-o-e-t-module5-section4-5"
    },
    {
      number: "5.4.6",
      title: "Calibration of Process Instruments",
      description: "Instrument calibration procedures and standards compliance",
      icon: Gauge,
      href: "../m-o-e-t-module5-section4-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 5.4: Process Control and Instrumentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            PID control, pneumatic/hydraulic controls, DCS systems and instrument calibration.
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

export default MOETModule5Section4;
import { ArrowLeft, Cpu, Thermometer, Radio, Network, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule8Section5 = () => {
  useSEO(
    "BMS Integration - HNC Module 8 Section 5 | HVAC Systems",
    "Master BMS integration: building management systems, control strategies, sensors, actuators, protocols and system optimisation for HVAC."
  );

  const subsections = [
    {
      number: "5.1",
      title: "BMS Fundamentals",
      description: "System architecture, outstations, head-end, network topology and system components",
      icon: Cpu,
      href: "../h-n-c-module8-section5-1"
    },
    {
      number: "5.2",
      title: "Sensors and Measurement",
      description: "Temperature, humidity, pressure, flow sensors, accuracy and calibration requirements",
      icon: Thermometer,
      href: "../h-n-c-module8-section5-2"
    },
    {
      number: "5.3",
      title: "Actuators and Output Devices",
      description: "Valve actuators, damper actuators, modulating vs on/off control and selection criteria",
      icon: Radio,
      href: "../h-n-c-module8-section5-3"
    },
    {
      number: "5.4",
      title: "Communication Protocols",
      description: "BACnet, Modbus, LonWorks, KNX, protocol gateways and system integration",
      icon: Network,
      href: "../h-n-c-module8-section5-4"
    },
    {
      number: "5.5",
      title: "Control Strategies",
      description: "PID control, cascade control, optimised start/stop, demand-based control and setpoint reset",
      icon: BarChart3,
      href: "../h-n-c-module8-section5-5"
    },
    {
      number: "5.6",
      title: "System Optimisation",
      description: "Energy monitoring, fault detection, performance analytics and continuous commissioning",
      icon: Settings,
      href: "../h-n-c-module8-section5-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 5: BMS Integration
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Integrate HVAC systems with building management systems for optimal control and efficiency
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers building management system (BMS) integration for HVAC control. You'll learn about BMS architecture, sensors and actuators, communication protocols, control strategies and how to optimise HVAC system performance through intelligent building controls.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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

export default HNCModule8Section5;

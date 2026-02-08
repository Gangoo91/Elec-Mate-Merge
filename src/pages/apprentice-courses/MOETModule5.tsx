import { ArrowLeft, Gauge, Cpu, Shield, Settings, TestTube, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule5 = () => {
  useSEO(
    "Module 5: Control, Automation and Instrumentation - MOET Course",
    "Control systems, PLCs, sensors, safety circuits, process control and industrial communication"
  );

  const sections = [
    {
      number: "5.1",
      title: "Sensors and Transducers",
      description: "Sensing principles, proximity sensors, temperature/pressure measurement and signal conditioning",
      icon: Gauge,
      href: "/study-centre/apprentice/m-o-e-t-module5-section1"
    },
    {
      number: "5.2", 
      title: "PLCs and Control Systems",
      description: "PLC hardware, I/O devices, ladder logic, programming software and troubleshooting",
      icon: Cpu,
      href: "/study-centre/apprentice/m-o-e-t-module5-section2"
    },
    {
      number: "5.3",
      title: "Safety Circuits and Interlocks", 
      description: "Emergency stops, interlocking devices, safety relays and functional safety principles",
      icon: Shield,
      href: "/study-centre/apprentice/m-o-e-t-module5-section3"
    },
    {
      number: "5.4",
      title: "Process Control and Instrumentation",
      description: "PID control, pneumatic/hydraulic controls, DCS systems and instrument calibration",
      icon: Settings,
      href: "/study-centre/apprentice/m-o-e-t-module5-section4"
    },
    {
      number: "5.5",
      title: "Testing and Calibration of Systems",
      description: "Calibration procedures, test instruments, adjustments and documentation",
      icon: TestTube,
      href: "/study-centre/apprentice/m-o-e-t-module5-section5"
    },
    {
      number: "5.6",
      title: "Networking and Industrial Communication",
      description: "Fieldbus, industrial Ethernet, wireless IoT and cybersecurity in industrial networks",
      icon: Network,
      href: "/study-centre/apprentice/m-o-e-t-module5-section6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/moet">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MOET Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 5: Control, Automation and Instrumentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Control systems, PLCs, sensors, safety circuits, process control and industrial communication.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MOETModule5;
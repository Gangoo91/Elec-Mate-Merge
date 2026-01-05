import { ArrowLeft, Gauge, BarChart, Thermometer, Waves, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule5Section1 = () => {
  useSEO(
    "Section 5.1: Sensors and Transducers - MOET Module 5",
    "Sensing principles, proximity sensors, temperature/pressure measurement and signal conditioning"
  );

  const subsections = [
    {
      number: "5.1.1",
      title: "Principles of Sensing (analogue vs digital)",
      description: "Understanding analogue and digital sensing principles and signal types",
      icon: Gauge,
      href: "../m-o-e-t-module5-section1-1"
    },
    {
      number: "5.1.2",
      title: "Proximity and Position Sensors",
      description: "Inductive, capacitive, optical and ultrasonic proximity sensors",
      icon: BarChart,
      href: "../m-o-e-t-module5-section1-2"
    },
    {
      number: "5.1.3",
      title: "Temperature and Pressure Sensors",
      description: "Thermocouples, RTDs, thermistors and pressure measurement devices",
      icon: Thermometer,
      href: "../m-o-e-t-module5-section1-3"
    },
    {
      number: "5.1.4",
      title: "Flow and Level Measurement",
      description: "Flow meters, level sensors and measurement techniques",
      icon: Waves,
      href: "../m-o-e-t-module5-section1-4"
    },
    {
      number: "5.1.5",
      title: "Signal Conditioning",
      description: "Amplification, filtering, linearisation and signal conversion",
      icon: Settings,
      href: "../m-o-e-t-module5-section1-5"
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
            Section 5.1: Sensors and Transducers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Sensing principles, proximity sensors, temperature/pressure measurement and signal conditioning.
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

export default MOETModule5Section1;
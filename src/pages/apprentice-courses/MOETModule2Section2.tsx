import { ArrowLeft, Battery, Zap, Settings, Activity, BarChart3, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule2Section2 = () => {
  useSEO(
    "AC/DC Systems and Components - MOET Module 2",
    "DC and AC principles, single/three-phase systems, reactance and power factor"
  );

  const subsections = [
    {
      number: "2.2.1",
      title: "Direct Current Principles",
      description: "Understanding DC circuits, characteristics and applications",
      icon: Battery,
      href: "../m-o-e-t-module2-section2-2-1"
    },
    {
      number: "2.2.2", 
      title: "Alternating Current Principles",
      description: "AC waveforms, RMS values and AC circuit behaviour",
      icon: Zap,
      href: "../m-o-e-t-module2-section2-2-2"
    },
    {
      number: "2.2.3",
      title: "Single-phase vs Three-phase Systems", 
      description: "Comparison and applications of single and three-phase systems",
      icon: Settings,
      href: "../m-o-e-t-module2-section2-2-3"
    },
    {
      number: "2.2.4",
      title: "Frequency and Waveforms",
      description: "Understanding frequency, period and waveform characteristics",
      icon: Activity,
      href: "../m-o-e-t-module2-section2-2-4"
    },
    {
      number: "2.2.5",
      title: "Reactance, Impedance, Power Factor",
      description: "Reactive components and power factor considerations",
      icon: BarChart3,
      href: "../m-o-e-t-module2-section2-2-5"
    },
    {
      number: "2.2.6",
      title: "Capacitors and Inductors",
      description: "Reactive components, characteristics and applications",
      icon: CircuitBoard,
      href: "../m-o-e-t-module2-section2-2-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module2">
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
            2.2 AC/DC Systems and Components
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            DC and AC principles, single/three-phase systems, reactance and power factor.
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

export default MOETModule2Section2;
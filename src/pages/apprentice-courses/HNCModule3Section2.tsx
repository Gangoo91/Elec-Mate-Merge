import { ArrowLeft, Magnet, Waves, RotateCcw, Zap, Filter, Radio, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section2 = () => {
  useSEO(
    "Inductance, Capacitance and Power Factor - HNC Module 3 Section 2",
    "Understanding reactive components, impedance, power factor correction and resonance in AC electrical systems"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Principles of inductance and capacitance",
      description: "Fundamental concepts of energy storage in magnetic and electric fields",
      icon: Magnet,
      href: "../h-n-c-module3-section2-2-1"
    },
    {
      number: "Subsection 2",
      title: "Reactance and impedance in AC circuits", 
      description: "Calculating inductive and capacitive reactance, complex impedance in AC systems",
      icon: Waves,
      href: "../h-n-c-module3-section2-2-2"
    },
    {
      number: "Subsection 3",
      title: "Phase angle and phasor diagrams",
      description: "Vector representation of AC quantities and phase relationships between voltage and current",
      icon: RotateCcw,
      href: "../h-n-c-module3-section2-2-3"
    },
    {
      number: "Subsection 4",
      title: "Power factor – causes and effects on systems",
      description: "Understanding power factor impact on electrical efficiency and system performance",
      icon: Zap,
      href: "../h-n-c-module3-section2-2-4"
    },
    {
      number: "Subsection 5",
      title: "Power factor correction methods (capacitors, active filters)",
      description: "Techniques for improving power factor using capacitor banks and electronic correction systems",
      icon: Filter,
      href: "../h-n-c-module3-section2-2-5"
    },
    {
      number: "Subsection 6",
      title: "Resonance in RLC circuits and practical issues",
      description: "Series and parallel resonance phenomena and their effects in electrical installations",
      icon: Radio,
      href: "../h-n-c-module3-section2-2-6"
    },
    {
      number: "Subsection 7",
      title: "Applications in lighting, HVAC and motors",
      description: "Practical application of reactive component principles in building services equipment",
      icon: Settings,
      href: "../h-n-c-module3-section2-2-7"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          3.2 Inductance, Capacitance and Power Factor
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master reactive component behaviour and power factor management in AC electrical systems
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

export default HNCModule3Section2;
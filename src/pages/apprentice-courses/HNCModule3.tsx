import { ArrowLeft, Calculator, Zap, BarChart3, Cog, Battery, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3 = () => {
  useSEO(
    "Electrical Principles in Building Services - HNC Module 3",
    "Master electrical circuit theory, power systems, AC/DC principles, three-phase systems, electrical machines and energy efficiency for building services"
  );

  const sections = [
    {
      number: "Section 1",
      title: "DC and AC Circuit Theory",
      description: "Ohm's Law, Kirchhoff's Laws, circuit analysis, Thevenin's and Norton's theorems, superposition and transient response",
      icon: Calculator,
      href: "../h-n-c-module3-section1"
    },
    {
      number: "Section 2", 
      title: "Inductance, Capacitance and Power Factor",
      description: "Reactive components, impedance, phase relationships, power factor correction and resonance in AC circuits",
      icon: Zap,
      href: "../h-n-c-module3-section2"
    },
    {
      number: "Section 3",
      title: "Alternating Current Theory and Waveforms", 
      description: "AC characteristics, waveforms, harmonics, power relationships and efficiency in AC systems",
      icon: BarChart3,
      href: "../h-n-c-module3-section3"
    },
    {
      number: "Section 4",
      title: "Three-Phase Systems and Distribution",
      description: "Star and delta configurations, balanced loads, three-phase power calculations and distribution systems",
      icon: Cog,
      href: "../h-n-c-module3-section4"
    },
    {
      number: "Section 5",
      title: "Electrical Machines and Transformers",
      description: "Electromagnetic induction, transformer theory, motor types, control systems and maintenance practices",
      icon: Battery,
      href: "../h-n-c-module3-section5"
    },
    {
      number: "Section 6",
      title: "Energy Efficiency in Electrical Systems",
      description: "Electrical losses, efficiency calculations, load management, smart controls and renewable integration",
      icon: Gauge,
      href: "../h-n-c-module3-section6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Module 3: Electrical Principles in Building Services
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master electrical theory, circuit analysis, power systems and energy efficiency principles essential for building services engineering
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.number}
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

export default HNCModule3;
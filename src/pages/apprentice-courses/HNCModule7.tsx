import { ArrowLeft, Zap, AlertTriangle, Lightbulb, SlidersHorizontal, BatteryCharging, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7 = () => {
  useSEO(
    "Power and Lighting Systems - HNC Module 7",
    "Master LV distribution design, emergency systems, lighting calculations, controls and energy-efficient solutions for commercial building electrical installations"
  );

  const sections = [
    {
      number: "Section 1",
      title: "LV Distribution Design",
      description: "Switchgear selection, busbar systems, cable sizing, discrimination studies and power quality for commercial installations",
      icon: Zap,
      href: "../h-n-c-module7-section1"
    },
    {
      number: "Section 2",
      title: "Emergency Systems",
      description: "Emergency lighting design, fire alarm systems, life safety power supplies, standby generators and UPS systems",
      icon: AlertTriangle,
      href: "../h-n-c-module7-section2"
    },
    {
      number: "Section 3",
      title: "Lighting Design Calculations",
      description: "Lumen method, point-by-point calculations, glare rating, uniformity ratios and compliance with CIBSE LG standards",
      icon: Lightbulb,
      href: "../h-n-c-module7-section3"
    },
    {
      number: "Section 4",
      title: "Lighting Controls",
      description: "DALI systems, occupancy sensing, daylight harvesting, scene setting and smart lighting integration",
      icon: SlidersHorizontal,
      href: "../h-n-c-module7-section4"
    },
    {
      number: "Section 5",
      title: "Energy Efficient Solutions",
      description: "LED technology, power factor correction, harmonic mitigation, energy metering and demand management",
      icon: BatteryCharging,
      href: "../h-n-c-module7-section5"
    },
    {
      number: "Section 6",
      title: "System Integration",
      description: "Distribution board design, circuit protection coordination, earthing systems and commissioning requirements",
      icon: Network,
      href: "../h-n-c-module7-section6"
    }
  ];

  return (
    <div className="bg-background">
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
          Module 7: Power and Lighting Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Design and specify commercial power distribution and lighting systems, from LV switchgear through to intelligent lighting controls and emergency systems
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

export default HNCModule7;

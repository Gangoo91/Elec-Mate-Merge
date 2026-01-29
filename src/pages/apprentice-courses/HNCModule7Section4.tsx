import { ArrowLeft, Radio, Users, Sun, Palette, Smartphone, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule7Section4 = () => {
  useSEO(
    "Lighting Controls - HNC Module 7 Section 4 | Lighting Systems",
    "Master lighting controls: DALI systems, occupancy sensing, daylight harvesting, scene setting and smart lighting integration for energy-efficient buildings."
  );

  const subsections = [
    {
      number: "4.1",
      title: "DALI Systems",
      description: "Digital Addressable Lighting Interface, addressing, grouping, gateways and system architecture",
      icon: Radio,
      href: "../h-n-c-module7-section4-1"
    },
    {
      number: "4.2",
      title: "Occupancy Sensing",
      description: "PIR, microwave and ultrasonic sensors, placement, sensitivity and hold-off times",
      icon: Users,
      href: "../h-n-c-module7-section4-2"
    },
    {
      number: "4.3",
      title: "Daylight Harvesting",
      description: "Photocell types, closed-loop control, sensor placement and integration with artificial lighting",
      icon: Sun,
      href: "../h-n-c-module7-section4-3"
    },
    {
      number: "4.4",
      title: "Scene Setting",
      description: "Scene controllers, preset configurations, tunable white, colour changing and circadian lighting",
      icon: Palette,
      href: "../h-n-c-module7-section4-4"
    },
    {
      number: "4.5",
      title: "Smart Lighting",
      description: "IoT integration, wireless protocols, app control, data analytics and predictive maintenance",
      icon: Smartphone,
      href: "../h-n-c-module7-section4-5"
    },
    {
      number: "4.6",
      title: "BMS Integration",
      description: "Lighting control interfaces, protocols, scheduling, energy monitoring and system optimisation",
      icon: Network,
      href: "../h-n-c-module7-section4-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 4: Lighting Controls
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design intelligent lighting control systems for energy efficiency and occupant comfort
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers modern lighting control systems from basic switching through to intelligent networked systems. You'll learn about DALI protocols, occupancy and daylight sensing, scene setting and how to integrate lighting controls with building management systems.
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

export default HNCModule7Section4;

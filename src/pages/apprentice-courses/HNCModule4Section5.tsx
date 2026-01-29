import { ArrowLeft, Server, LayoutGrid, GitBranch, Battery, Activity, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4Section5 = () => {
  useSEO(
    "Power Distribution Design - HNC Module 4 Section 5 | Building Services Design",
    "Master power distribution design: LV switchgear, distribution boards, busbar systems, UPS, standby power, power quality and metering."
  );

  const subsections = [
    {
      number: "5.1",
      title: "LV Switchgear Selection",
      description: "Switchboards, form separation, IP ratings, fault ratings and type-tested assemblies",
      icon: Server,
      href: "../h-n-c-module4-section5-1"
    },
    {
      number: "5.2",
      title: "Distribution Board Design",
      description: "Ways, diversity allowances, labelling requirements and accessibility considerations",
      icon: LayoutGrid,
      href: "../h-n-c-module4-section5-2"
    },
    {
      number: "5.3",
      title: "Busbar Systems",
      description: "Rising mains, busbar trunking, tap-off units and high-current distribution",
      icon: GitBranch,
      href: "../h-n-c-module4-section5-3"
    },
    {
      number: "5.4",
      title: "UPS and Standby Power",
      description: "UPS types, sizing calculations, generator coordination and critical load support",
      icon: Battery,
      href: "../h-n-c-module4-section5-4"
    },
    {
      number: "5.5",
      title: "Power Quality",
      description: "Voltage regulation, transient protection, earthing systems and EMC considerations",
      icon: Activity,
      href: "../h-n-c-module4-section5-5"
    },
    {
      number: "5.6",
      title: "Metering and Monitoring",
      description: "Sub-metering strategies, energy management systems and BMS integration",
      icon: Gauge,
      href: "../h-n-c-module4-section5-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 5: Power Distribution Design
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design robust power distribution systems that provide reliable, high-quality electrical supplies throughout buildings
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the design of power distribution infrastructure for building services, from main switchgear through to final distribution boards. Understanding these systems is essential for creating reliable, maintainable and efficient electrical installations.
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

export default HNCModule4Section5;

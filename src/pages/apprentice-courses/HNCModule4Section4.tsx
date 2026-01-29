import { ArrowLeft, Target, Calculator, AlertTriangle, Sliders, Sun, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule4Section4 = () => {
  useSEO(
    "Lighting Design - HNC Module 4 Section 4 | Building Services Design",
    "Master lighting design: design criteria, interior calculations, emergency lighting, controls, external lighting and energy efficient solutions."
  );

  const subsections = [
    {
      number: "4.1",
      title: "Lighting Design Criteria",
      description: "Task illuminance levels, uniformity ratios, glare control and colour rendering requirements",
      icon: Target,
      href: "../h-n-c-module4-section4-1"
    },
    {
      number: "4.2",
      title: "Interior Lighting Calculations",
      description: "Lumen method, utilisation factors, DIALux and Relux software applications",
      icon: Calculator,
      href: "../h-n-c-module4-section4-2"
    },
    {
      number: "4.3",
      title: "Emergency Lighting Design",
      description: "BS 5266 requirements, escape routes, open areas, maintained and non-maintained systems",
      icon: AlertTriangle,
      href: "../h-n-c-module4-section4-3"
    },
    {
      number: "4.4",
      title: "Lighting Controls",
      description: "DALI systems, presence detection, daylight linking and scene setting",
      icon: Sliders,
      href: "../h-n-c-module4-section4-4"
    },
    {
      number: "4.5",
      title: "External Lighting",
      description: "Security lighting, amenity lighting, Part L compliance and light pollution control",
      icon: Sun,
      href: "../h-n-c-module4-section4-5"
    },
    {
      number: "4.6",
      title: "Energy Efficient Lighting",
      description: "LED selection, Part L requirements, controls strategies and lighting energy calculations",
      icon: Leaf,
      href: "../h-n-c-module4-section4-6"
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
          Section 4: Lighting Design
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Design effective lighting systems that meet functional requirements, enhance wellbeing and minimise energy consumption
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers all aspects of lighting design for building services, from establishing design criteria through to specifying energy-efficient solutions. Good lighting design balances visual comfort, task performance, safety and sustainability.
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

export default HNCModule4Section4;

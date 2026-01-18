import { ArrowLeft, Zap, Cog, RotateCw, Battery, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule2Section3 = () => {
  useSEO(
    "Electrical Machines - MOET Module 2",
    "Transformers, induction motors, synchronous machines and motor starting"
  );

  const subsections = [
    {
      number: "2.3.1",
      title: "Transformers: principles and applications",
      description: "Transformer operation, types and practical applications",
      icon: Zap,
      href: "../m-o-e-t-module2-section3-3-1"
    },
    {
      number: "2.3.2", 
      title: "Induction Motors (single & three-phase)",
      description: "Induction motor principles, construction and characteristics",
      icon: Cog,
      href: "../m-o-e-t-module2-section3-3-2"
    },
    {
      number: "2.3.3",
      title: "Synchronous Motors and Generators", 
      description: "Synchronous machine operation and applications",
      icon: RotateCw,
      href: "../m-o-e-t-module2-section3-3-3"
    },
    {
      number: "2.3.4",
      title: "DC Motors and Their Control",
      description: "DC motor types, characteristics and control methods",
      icon: Battery,
      href: "../m-o-e-t-module2-section3-3-4"
    },
    {
      number: "2.3.5",
      title: "Motor Starting Methods",
      description: "Various motor starting techniques and protection",
      icon: Play,
      href: "../m-o-e-t-module2-section3-3-5"
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
            2.3 Electrical Machines
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Transformers, induction motors, synchronous machines and motor starting.
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

export default MOETModule2Section3;
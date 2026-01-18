import { ArrowLeft, Magnet, Zap, RotateCcw, Cog, Radio, Battery, Play, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section5 = () => {
  useSEO(
    "Electrical Machines and Transformers - HNC Module 3 Section 5",
    "Understanding electrical machines, transformers, motor control systems and maintenance practices for building services"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Principles of electromagnetic induction",
      description: "Fundamental electromagnetic principles governing electrical machine operation",
      icon: Magnet,
      href: "../h-n-c-module3-section5-5-1"
    },
    {
      number: "Subsection 2",
      title: "Transformer theory, losses and efficiency",
      description: "Transformer operating principles, loss mechanisms and efficiency calculations",
      icon: Zap,
      href: "../h-n-c-module3-section5-5-2"
    },
    {
      number: "Subsection 3",
      title: "Single-phase vs three-phase transformers",
      description: "Comparison of transformer types and their applications in building services",
      icon: RotateCcw,
      href: "../h-n-c-module3-section5-5-3"
    },
    {
      number: "Subsection 4",
      title: "Induction motors (construction, operation, performance)",
      description: "Three-phase induction motor principles, characteristics and performance analysis",
      icon: Cog,
      href: "../h-n-c-module3-section5-5-4"
    },
    {
      number: "Subsection 5", 
      title: "Synchronous machines – principles and uses",
      description: "Synchronous motor and generator theory and applications in electrical systems",
      icon: Radio,
      href: "../h-n-c-module3-section5-5-5"
    },
    {
      number: "Subsection 6",
      title: "DC machines (types, control, applications)",
      description: "DC motor and generator types, control methods and building services applications",
      icon: Battery,
      href: "../h-n-c-module3-section5-5-6"
    },
    {
      number: "Subsection 7",
      title: "Starting and speed control methods for motors",
      description: "Motor starting techniques and variable speed drive systems for HVAC applications",
      icon: Play,
      href: "../h-n-c-module3-section5-5-7"
    },
    {
      number: "Subsection 8",
      title: "Maintenance, testing and fault diagnosis",
      description: "Preventive maintenance practices and diagnostic techniques for electrical machines",
      icon: Wrench,
      href: "../h-n-c-module3-section5-5-8"
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
          3.5 Electrical Machines and Transformers
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master electrical machine principles, transformer theory and motor control systems for building services applications
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

export default HNCModule3Section5;
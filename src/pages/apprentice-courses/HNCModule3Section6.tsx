import { ArrowLeft, Zap, TrendingDown, BarChart3, Lightbulb, Cpu, FileText, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule3Section6 = () => {
  useSEO(
    "Energy Efficiency in Electrical Systems - HNC Module 3 Section 6", 
    "Understanding energy efficiency principles, loss reduction, smart controls and renewable integration in building electrical systems"
  );

  const subsections = [
    {
      number: "Subsection 1",
      title: "Electrical losses (I²R, eddy current, hysteresis)",
      description: "Understanding different types of electrical losses and their impact on system efficiency",
      icon: Zap,
      href: "../h-n-c-module3-section6-6-1"
    },
    {
      number: "Subsection 2",
      title: "Efficiency calculations for equipment and systems",
      description: "Methods for calculating and measuring electrical equipment and system efficiency",
      icon: TrendingDown,
      href: "../h-n-c-module3-section6-6-2"
    },
    {
      number: "Subsection 3",
      title: "Load management and demand reduction",
      description: "Strategies for optimising electrical loads and reducing peak demand in buildings",
      icon: BarChart3,
      href: "../h-n-c-module3-section6-6-3"
    },
    {
      number: "Subsection 4",
      title: "Energy-efficient motor and lighting design",
      description: "Selection and design of high-efficiency motors and lighting systems for buildings",
      icon: Lightbulb,
      href: "../h-n-c-module3-section6-6-4"
    },
    {
      number: "Subsection 5",
      title: "Smart controls and building automation",
      description: "Intelligent control systems for optimising energy use in building services",
      icon: Cpu,
      href: "../h-n-c-module3-section6-6-5"
    },
    {
      number: "Subsection 6",
      title: "BS7671, CIBSE and Part L requirements for energy efficiency",
      description: "Regulatory frameworks and standards governing energy efficiency in electrical installations",
      icon: FileText,
      href: "../h-n-c-module3-section6-6-6"
    },
    {
      number: "Subsection 7",
      title: "Integration with renewables and storage systems",
      description: "Incorporating renewable energy sources and energy storage into building electrical systems",
      icon: Leaf,
      href: "../h-n-c-module3-section6-6-7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
          3.6 Energy Efficiency in Electrical Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master energy efficiency principles, smart technologies and sustainable practices for modern building electrical systems
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

export default HNCModule3Section6;
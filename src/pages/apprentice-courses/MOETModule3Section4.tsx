import { ArrowLeft, Lightbulb, AlertTriangle, Plug, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule3Section4 = () => {
  useSEO(
    "Lighting and Power Installations - MOET Module 3",
    "General lighting, emergency systems, socket circuits and energy efficiency"
  );

  const subsections = [
    {
      number: "3.4.1",
      title: "General Lighting Circuits",
      description: "Lighting circuit design, installation and control methods",
      icon: Lightbulb,
      href: "/study-centre/apprentice/m-o-e-t-module3-section4-1"
    },
    {
      number: "3.4.2", 
      title: "Emergency Lighting Systems",
      description: "Emergency lighting requirements, testing and maintenance",
      icon: AlertTriangle,
      href: "/study-centre/apprentice/m-o-e-t-module3-section4-2"
    },
    {
      number: "3.4.3",
      title: "Socket Outlet and Small Power Circuits", 
      description: "Power outlet installation, ring and radial circuits",
      icon: Plug,
      href: "/study-centre/apprentice/m-o-e-t-module3-section4-3"
    },
    {
      number: "3.4.4",
      title: "Energy-Efficient Lighting Technologies",
      description: "LED technology, controls and energy efficiency measures",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module3-section4-4"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            3.4 Lighting and Power Installations
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            General lighting, emergency systems, socket circuits and energy efficiency.
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

export default MOETModule3Section4;
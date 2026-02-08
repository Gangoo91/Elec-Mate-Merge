import { ArrowLeft, Trash2, AlertTriangle, Zap, Leaf, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1Section5 = () => {
  useSEO(
    "Environmental and Sustainability Practices - MOET Module 1",
    "Waste management, COSHH, energy efficiency and environmental legislation"
  );

  const subsections = [
    {
      number: "1.5.1",
      title: "Waste Management and Recycling",
      description: "Proper disposal, segregation and recycling of maintenance waste",
      icon: Trash2,
      href: "/study-centre/apprentice/m-o-e-t-module1-section5-1"
    },
    {
      number: "1.5.2", 
      title: "Hazardous Substances (COSHH awareness)",
      description: "Control of substances hazardous to health in maintenance work",
      icon: AlertTriangle,
      href: "/study-centre/apprentice/m-o-e-t-module1-section5-2"
    },
    {
      number: "1.5.3",
      title: "Energy Efficiency in Maintenance", 
      description: "Maintaining and improving system energy efficiency",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module1-section5-3"
    },
    {
      number: "1.5.4",
      title: "Environmental Legislation & Local Policies",
      description: "Understanding environmental laws and site-specific policies",
      icon: Leaf,
      href: "/study-centre/apprentice/m-o-e-t-module1-section5-4"
    },
    {
      number: "1.5.5",
      title: "Sustainable Work Practices",
      description: "Implementing sustainable approaches to maintenance operations",
      icon: Recycle,
      href: "/study-centre/apprentice/m-o-e-t-module1-section5-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.5 Environmental and Sustainability Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Waste management, COSHH, energy efficiency and environmental legislation.
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

export default MOETModule1Section5;
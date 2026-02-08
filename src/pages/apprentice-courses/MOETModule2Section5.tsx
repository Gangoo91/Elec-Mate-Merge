import { ArrowLeft, Cable, Wrench, Zap, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule2Section5 = () => {
  useSEO(
    "Materials, Tools and Test Equipment - MOET Module 2",
    "Conductors, insulation, hand tools, power tools and test equipment"
  );

  const subsections = [
    {
      number: "2.5.1",
      title: "Conductors and Insulation Materials",
      description: "Electrical materials, properties and selection criteria",
      icon: Cable,
      href: "/study-centre/apprentice/m-o-e-t-module2-section5-1"
    },
    {
      number: "2.5.2", 
      title: "Selection and Use of Hand Tools",
      description: "Hand tool selection, maintenance and safe operation",
      icon: Wrench,
      href: "/study-centre/apprentice/m-o-e-t-module2-section5-2"
    },
    {
      number: "2.5.3",
      title: "Selection and Use of Power Tools", 
      description: "Power tool selection, safety and maintenance requirements",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module2-section5-3"
    },
    {
      number: "2.5.4",
      title: "Test Equipment (multimeters, clamp meters, megohmmeters)",
      description: "Electrical test equipment operation and calibration",
      icon: TestTube,
      href: "/study-centre/apprentice/m-o-e-t-module2-section5-4"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2">
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
            2.5 Materials, Tools and Test Equipment
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Conductors, insulation, hand tools, power tools and test equipment.
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

export default MOETModule2Section5;
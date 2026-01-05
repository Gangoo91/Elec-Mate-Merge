import { ArrowLeft, Wrench, TestTube, Zap, Shield, Gauge } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Essential Hand Tools (Strippers, Cutters, Drivers)",
    description: "Basic hand tools required for electrical installation work",
    icon: Wrench,
    href: "3-1"
  },
  {
    number: "Subsection 2", 
    title: "Common Power Tools (Drills, SDS, Jigsaws)",
    description: "Power tools used in electrical installation work",
    icon: TestTube,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "Test Equipment for Installation Work (Overview Only)",
    description: "Basic testing equipment used during installation",
    icon: Gauge,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Tool Inspection and Maintenance",
    description: "Maintaining tools in safe working condition",
    icon: Shield,
    href: "3-4"
  },
  {
    number: "Subsection 5",
    title: "Safe Use, Transport, and Storage of Tools",
    description: "Safe handling and storage practices for tools",
    icon: Zap,
    href: "3-5"
  },
  {
    number: "Subsection 6",
    title: "PPE Associated with Tool Use",
    description: "Personal protective equipment for tool operation",
    icon: Shield,
    href: "3-6"
  }
];

const Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 3: Electrical Tools and Equipment
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Essential tools, equipment and testing instruments for electrical installation work
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

export default Section3;
import { ArrowLeft, PenTool, Calculator, Settings, MapPin, FileText, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Design Principles and Requirements",
    description: "Understanding fundamental design principles, compliance requirements and client specifications",
    icon: PenTool,
    href: "../level3-module6-section1",
  },
  {
    number: "Section 2", 
    title: "Circuit Design Calculations",
    description: "Essential calculations for circuit design including current ratings, cable sizing and protection",
    icon: Calculator,
    href: "../level3-module6-section2",
  },
  {
    number: "Section 3",
    title: "Selection of Protective Devices and Equipment",
    description: "Choosing appropriate protective devices, equipment and accessories for electrical installations",
    icon: Settings,
    href: "../level3-module6-section3",
  },
  {
    number: "Section 4",
    title: "Designing for Special Installations and Locations",
    description: "Design considerations for special locations and installations with specific requirements",
    icon: MapPin,
    href: "../level3-module6-section4",
  },
  {
    number: "Section 5",
    title: "System Documentation and Drawings",
    description: "Creating comprehensive design documentation, drawings and specifications",
    icon: FileText,
    href: "../level3-module6-section5",
  },
  {
    number: "Section 6",
    title: "Verification of Design",
    description: "Checking and verifying electrical system designs for compliance and performance",
    icon: CheckCircle,
    href: "../level3-module6-section6",
  },
];

const Level3Module6 = () => {
  useSEO(
    "Level 3 Module 6 - Electrical Systems Design",
    "Master electrical systems design principles, calculations and compliance with BS7671"
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 6 - Electrical Systems Design
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Master the principles and practices of electrical systems design from initial concepts through to final verification and approval
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Level3Module6;
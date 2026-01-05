import { ArrowLeft, CheckCircle, FileText, Scale, Award, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Cable Support Distances (Horizontal/Vertical)",
    description: "Requirements for supporting cables at correct intervals",
    icon: FileText,
    href: "6-1"
  },
  {
    number: "Subsection 2", 
    title: "Routing Cables in Walls and Floors (Zones and Depths)",
    description: "Safe zones and depth requirements for concealed cables",
    icon: Scale,
    href: "6-2"
  },
  {
    number: "Subsection 3",
    title: "Fire Stopping and Sealing Penetrations",
    description: "Fire safety measures for cable penetrations",
    icon: Award,
    href: "6-3"
  },
  {
    number: "Subsection 4",
    title: "Safe Entry to Enclosures (Grommets, Bushes, Glands)",
    description: "Methods for safely entering electrical enclosures",
    icon: CheckCircle,
    href: "6-4"
  },
  {
    number: "Subsection 5",
    title: "Labelling, Identification, and Colour Codes",
    description: "Proper identification and labelling of electrical systems",
    icon: Shield,
    href: "6-5"
  },
  {
    number: "Subsection 6",
    title: "Following Manufacturer Instructions and Site Specs",
    description: "Importance of following specifications and instructions",
    icon: FileText,
    href: "6-6"
  }
];

const Section6 = () => {
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
            Section 6: Installation Standards and Best Practice
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Industry standards, regulations and best practice guidelines for electrical work
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

export default Section6;
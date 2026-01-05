import { ArrowLeft, Droplets, Cloud, Factory, Car, HardHat, Flame } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Bathrooms and Locations Containing a Bath/Shower",
    description: "Special design considerations for bathrooms and wet locations",
    icon: Droplets,
    href: "../level3-module6-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Outdoor Installations and External Influences (IP ratings, UV, weatherproofing)",
    description: "Designing for outdoor installations considering environmental factors",
    icon: Cloud,
    href: "../level3-module6-section4-4-2",
  },
  {
    number: "4.3",
    title: "Agricultural and Industrial Installations",
    description: "Special requirements for agricultural and industrial electrical installations",
    icon: Factory,
    href: "../level3-module6-section4-4-3",
  },
  {
    number: "4.4",
    title: "EV Charging Points (OZEV guidance, Section 722)",
    description: "Design requirements for electric vehicle charging installations",
    icon: Car,
    href: "../level3-module6-section4-4-4",
  },
  {
    number: "4.5",
    title: "Temporary Installations (construction sites, exhibitions)",
    description: "Design considerations for temporary electrical installations",
    icon: HardHat,
    href: "../level3-module6-section4-4-5",
  },
  {
    number: "4.6",
    title: "Fire Alarm, Emergency Lighting and Data/Communications Integration",
    description: "Integrating safety systems and communications into electrical designs",
    icon: Flame,
    href: "../level3-module6-section4-4-6",
  },
];

const Level3Module6Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 4 - Designing for Special Installations and Locations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Design considerations for special locations and installations with specific requirements
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

export default Level3Module6Section4;
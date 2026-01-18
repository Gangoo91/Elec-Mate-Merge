import { ArrowLeft, Zap, AlertTriangle, Flame, MapPin, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Electric Shock and Burns",
    description: "Understanding electrical injuries and their prevention",
    icon: Zap,
    href: "2-1"
  },
  {
    number: "Subsection 2", 
    title: "Overloads, Short Circuits and Arcing",
    description: "Electrical faults that can cause injury and damage",
    icon: AlertTriangle,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Fire Hazards and Explosive Environments",
    description: "Fire risks and working in potentially explosive atmospheres",
    icon: Flame,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Working at Height and Confined Spaces",
    description: "Special considerations for elevated and restricted work areas",
    icon: MapPin,
    href: "2-4"
  },
  {
    number: "Subsection 5",
    title: "Slip, Trip and Manual Handling Risks",
    description: "Common workplace hazards affecting electrical workers",
    icon: Users,
    href: "2-5"
  }
];

const Section2 = () => {
  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 2: Common Electrical Hazards
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl">
            Identification and understanding of typical electrical risks and dangers
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

export default Section2;
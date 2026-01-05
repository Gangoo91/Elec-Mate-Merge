import { ArrowLeft, AlertTriangle, Mountain, Box, Flame, Dumbbell, Cloud } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "Common construction hazards (slips, trips, falls, sharps, dust, asbestos, silica)",
    description: "Identification and management of typical construction site hazards",
    icon: AlertTriangle,
    href: "../level3-module1-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Working at height (scaffolds, ladders, MEWPs)",
    description: "Safe working practices for elevated work platforms and access equipment",
    icon: Mountain,
    href: "../level3-module1-section4-4-2",
  },
  {
    number: "4.3",
    title: "Confined space hazards and permits", 
    description: "Recognition of confined spaces and permit-to-work requirements",
    icon: Box,
    href: "../level3-module1-section4-4-3",
  },
  {
    number: "4.4",
    title: "Fire safety – prevention, extinguishers, evacuation",
    description: "Fire prevention measures, firefighting equipment and emergency evacuation procedures",
    icon: Flame,
    href: "../level3-module1-section4-4-4",
  },
  {
    number: "4.5",
    title: "Manual handling, noise, and vibration hazards",
    description: "Physical hazards from lifting, excessive noise and vibrating equipment",
    icon: Dumbbell,
    href: "../level3-module1-section4-4-5",
  },
  {
    number: "4.6", 
    title: "Environmental hazards (contaminated ground, water ingress, extreme weather)",
    description: "Environmental factors affecting workplace safety and work planning",
    icon: Cloud,
    href: "../level3-module1-section4-4-6",
  },
];

const Level3Module1Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
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
            Section 4: Hazard Identification and Control
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Systematic hazard identification, evaluation and implementation of control measures
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

export default Level3Module1Section4;
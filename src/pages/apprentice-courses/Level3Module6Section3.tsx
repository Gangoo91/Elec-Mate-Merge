import { ArrowLeft, Shield, Settings, Box, Target, Package } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "MCBs, Fuses, and RCBOs — Selection and Coordination",
    description: "Selecting and coordinating MCBs, fuses and RCBOs for effective protection",
    icon: Shield,
    href: "../level3-module6-section3-3-1",
  },
  {
    number: "3.2", 
    title: "Characteristics of Protective Devices (Icn, Ics, In, curve types)",
    description: "Understanding protective device characteristics and their application in design",
    icon: Settings,
    href: "../level3-module6-section3-3-2",
  },
  {
    number: "3.3",
    title: "Consumer Units and Distribution Boards",
    description: "Selecting appropriate consumer units and distribution boards for installations",
    icon: Box,
    href: "../level3-module6-section3-3-3",
  },
  {
    number: "3.4",
    title: "Earthing and Bonding Arrangements (TN-S, TN-C-S, TT)",
    description: "Designing appropriate earthing and bonding arrangements for different supply systems",
    icon: Target,
    href: "../level3-module6-section3-3-4",
  },
  {
    number: "3.5",
    title: "Selection of Accessories, Enclosures, and Equipment for Environment",
    description: "Choosing appropriate accessories and equipment based on environmental conditions",
    icon: Package,
    href: "../level3-module6-section3-3-5",
  },
];

const Level3Module6Section3 = () => {
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
            Section 3 - Selection of Protective Devices and Equipment
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Choosing appropriate protective devices, equipment and accessories for electrical installations
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

export default Level3Module6Section3;
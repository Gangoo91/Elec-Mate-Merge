import { ArrowLeft, Link2, Shield, RotateCcw, Target, TestTube, Power } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "Continuity of Protective Conductors and Ring Circuits",
    description: "Testing procedures for protective conductor continuity and ring circuit integrity",
    icon: Link2,
    href: "../level3-module5-section3-3-1",
  },
  {
    number: "3.2", 
    title: "Insulation Resistance Testing",
    description: "Comprehensive insulation resistance testing procedures and acceptance criteria",
    icon: Shield,
    href: "../level3-module5-section3-3-2",
  },
  {
    number: "3.3",
    title: "Polarity Testing",
    description: "Verification of correct polarity in electrical circuits and installations",
    icon: RotateCcw,
    href: "../level3-module5-section3-3-3",
  },
  {
    number: "3.4",
    title: "Earth Fault Loop Impedance Testing",
    description: "Testing earth fault loop impedance to verify protective device effectiveness",
    icon: Target,
    href: "../level3-module5-section3-3-4",
  },
  {
    number: "3.5",
    title: "RCD and RCBO Testing",
    description: "Testing procedures for residual current devices and RCBOs",
    icon: TestTube,
    href: "../level3-module5-section3-3-5",
  },
  {
    number: "3.6",
    title: "Prospective Fault Current and Verification of Protective Devices",
    description: "Testing prospective fault current and verifying protective device coordination",
    icon: Power,
    href: "../level3-module5-section3-3-6",
  },
];

const Level3Module5Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 3 - Testing Procedures
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive testing procedures for electrical installations including continuity, insulation and RCD testing
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

export default Level3Module5Section3;
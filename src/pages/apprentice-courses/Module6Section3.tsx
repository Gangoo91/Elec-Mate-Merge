import { ArrowLeft, Wrench, TestTube, Eye, Zap, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Introduction to Test Instruments (Multimeter, IR Tester, Continuity Tester)",
    description: "Overview of essential electrical testing equipment",
    icon: Wrench,
    href: "3-1"
  },
  {
    number: "Subsection 2", 
    title: "GS38 Compliance and Tester Safety",
    description: "Safety requirements for electrical test equipment",
    icon: TestTube,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "Setting Up and Zeroing Instruments",
    description: "Proper preparation and calibration of test equipment",
    icon: Eye,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Proving Dead and Safe to Test",
    description: "Essential safety procedure before testing begins",
    icon: Zap,
    href: "3-4"
  },
  {
    number: "Subsection 5",
    title: "Using a Proving Unit and Two-Pole Voltage Tester",
    description: "Safe voltage testing procedures and equipment",
    icon: Shield,
    href: "3-5"
  },
  {
    number: "Subsection 6",
    title: "When to Use Each Instrument and Why",
    description: "Selecting appropriate test equipment for different applications",
    icon: Wrench,
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
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 3: Basic Testing Procedures and Instruments
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Introduction to electrical testing equipment and procedures
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
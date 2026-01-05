import { ArrowLeft, Magnet, Zap, Link, Box, RotateCcw } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link as RouterLink } from "react-router-dom";

const subsections = [
  {
    number: "3.1",
    title: "Magnetic Fields and Flux",
    description: "Understanding magnetic field strength, flux density and magnetic circuit principles",
    icon: Magnet,
    href: "../level3-module3-section3-3-1",
  },
  {
    number: "3.2", 
    title: "Electromagnetic Induction",
    description: "Faraday's and Lenz's Laws - the foundation of electrical generation and transformation",
    icon: Zap,
    href: "../level3-module3-section3-3-2",
  },
  {
    number: "3.3",
    title: "Self and Mutual Inductance",
    description: "Inductance in single circuits and the interaction between coupled circuits",
    icon: Link,
    href: "../level3-module3-section3-3-3",
  },
  {
    number: "3.4",
    title: "Transformers - Theory and Applications",
    description: "Transformer principles, construction, efficiency and practical applications",
    icon: Box,
    href: "../level3-module3-section3-3-4",
  },
  {
    number: "3.5",
    title: "Motors and Generators",
    description: "Principles of operation for rotating electrical machines and their characteristics",
    icon: RotateCcw,
    href: "../level3-module3-section3-3-5",
  },
];

const Level3Module3Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <RouterLink to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </RouterLink>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 3 - Electromagnetic Principles
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Understand the fundamental electromagnetic principles that govern transformers, motors, generators and induction
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

export default Level3Module3Section3;
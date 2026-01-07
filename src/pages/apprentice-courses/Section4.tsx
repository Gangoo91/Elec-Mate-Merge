import { ArrowLeft, HardHat, Settings, Home, Wrench } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Types of PPE for Electrical Work",
    description: "Essential protective equipment for electrical installations",
    icon: HardHat,
    href: "4-1"
  },
  {
    number: "Subsection 2", 
    title: "Selecting and Maintaining PPE",
    description: "Choosing appropriate equipment and ensuring it remains effective",
    icon: Settings,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Site Housekeeping and Safety Signage",
    description: "Maintaining clean, organised and well-signposted work areas",
    icon: Home,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Manual Handling and Tool Safety",
    description: "Safe techniques for lifting and using electrical tools",
    icon: Wrench,
    href: "4-4"
  }
];

const Section4 = () => {
  return (
    <div className="min-h-screen bg-background">
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
            Section 4: Personal Protective Equipment (PPE) and Safe Working Practices
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl">
            Selection, use and maintenance of protective equipment and safe working methods
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

export default Section4;
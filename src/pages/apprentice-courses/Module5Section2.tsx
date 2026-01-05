import { ArrowLeft, Lightbulb, FileText, MapPin, Package, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "What Makes a 'Safe and Functional' Design",
    description: "Understanding the principles of safe electrical design",
    icon: Lightbulb,
    href: "2-1"
  },
  {
    number: "Subsection 2", 
    title: "Load Estimation and Circuit Requirements (Basic Awareness)",
    description: "Introduction to calculating electrical loads and circuit needs",
    icon: FileText,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Selecting Suitable Protective Devices (MCBs, RCDs – Intro Only)",
    description: "Basic introduction to choosing protection devices",
    icon: MapPin,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Zoning, Environmental Considerations, and Cable Choice",
    description: "Considering environment and location when selecting cables",
    icon: Package,
    href: "2-4"
  },
  {
    number: "Subsection 5",
    title: "Designing for Expansion, Maintenance, and Accessibility",
    description: "Planning electrical systems for future needs and maintenance",
    icon: Users,
    href: "2-5"
  }
];

const Section2 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 2: Basic Electrical Design Principles
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Fundamental principles of electrical system design
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
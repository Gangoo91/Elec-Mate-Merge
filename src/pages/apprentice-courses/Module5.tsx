import { ArrowLeft, FileText, Lightbulb, MapPin, Package, Users, MessageSquare, Clipboard } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Understanding Installation Specifications and Drawings",
    description: "Reading and interpreting technical drawings and specifications",
    icon: FileText,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Basic Electrical Design Principles",
    description: "Fundamental principles of electrical system design",
    icon: Lightbulb,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Planning Installation Work on Site",
    description: "Planning and organising electrical installation projects",
    icon: MapPin,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Materials, Tools, and Resource Planning",
    description: "Planning and managing resources for electrical installations",
    icon: Package,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Working with Other Trades and Site Personnel",
    description: "Collaboration and coordination with other construction trades",
    icon: Users,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Communicating Information Effectively",
    description: "Professional communication skills for electrical work",
    icon: MessageSquare,
    href: "section6"
  },
  {
    number: "Section 7",
    title: "Documentation, Labelling, and Record Keeping",
    description: "Maintaining accurate records and documentation",
    icon: Clipboard,
    href: "section7"
  },
];

const Module5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Module 5: Design, Planning & Communication
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Project planning, technical documentation and effective team communication
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module5;
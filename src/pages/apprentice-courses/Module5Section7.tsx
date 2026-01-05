import { ArrowLeft, Clipboard, FileText, Lightbulb, MapPin, Package } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Importance of Accurate Records for Compliance and Safety",
    description: "Understanding why accurate documentation is essential",
    icon: Clipboard,
    href: "7-1"
  },
  {
    number: "Subsection 2", 
    title: "Cable and Circuit Labelling Conventions",
    description: "Standard methods for labelling electrical systems",
    icon: FileText,
    href: "7-2"
  },
  {
    number: "Subsection 3",
    title: "Maintaining Work Logs and Handover Sheets",
    description: "Keeping records of work completed and handover information",
    icon: Lightbulb,
    href: "7-3"
  },
  {
    number: "Subsection 4",
    title: "Updating As-Built Drawings (Basic Awareness)",
    description: "Understanding the need to update drawings after installation",
    icon: MapPin,
    href: "7-4"
  },
  {
    number: "Subsection 5",
    title: "Site Documentation Storage and Access",
    description: "Managing and accessing site documentation effectively",
    icon: Package,
    href: "7-5"
  }
];

const Module5Section7 = () => {
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
            Section 7: Documentation, Labelling, and Record Keeping
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Maintaining accurate records and documentation
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

export default Module5Section7;
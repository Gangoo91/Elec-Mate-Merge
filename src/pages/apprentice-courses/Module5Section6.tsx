import { ArrowLeft, MessageSquare, FileText, Lightbulb, MapPin } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Verbal Communication: Being Clear, Concise, and Professional",
    description: "Effective verbal communication skills for electrical work",
    icon: MessageSquare,
    href: "6-1"
  },
  {
    number: "Subsection 2", 
    title: "Written Instructions and Handovers (Basic Notes, Labels)",
    description: "Creating clear written documentation and handover notes",
    icon: FileText,
    href: "6-2"
  },
  {
    number: "Subsection 3",
    title: "Communicating Faults, Risks, and Task Progress",
    description: "Reporting problems and progress effectively",
    icon: Lightbulb,
    href: "6-3"
  },
  {
    number: "Subsection 4",
    title: "Resolving Misunderstandings and Asking for Clarification",
    description: "Managing communication problems and seeking clarity",
    icon: MapPin,
    href: "6-4"
  }
];

const Section6 = () => {
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
            Section 6: Communicating Information Effectively
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Professional communication skills for electrical work
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

export default Section6;
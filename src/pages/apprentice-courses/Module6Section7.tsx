import { ArrowLeft, FileText, Award, ClipboardCheck, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Why Certification Is Required (BS 7671 Compliance)",
    description: "Understanding the legal requirement for electrical certification",
    icon: FileText,
    href: "7-1"
  },
  {
    number: "Subsection 2", 
    title: "Awareness of Electrical Installation Certificates (EICs)",
    description: "Introduction to electrical installation certificates",
    icon: Award,
    href: "7-2"
  },
  {
    number: "Subsection 3",
    title: "Minor Works Certificates (Awareness Level)",
    description: "Understanding minor works certification requirements",
    icon: ClipboardCheck,
    href: "7-3"
  },
  {
    number: "Subsection 4",
    title: "Who Can Sign Off Work and What Level 2 Can Do Legally",
    description: "Legal responsibilities and limitations for Level 2 electricians",
    icon: Users,
    href: "7-4"
  }
];

const Section7 = () => {
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
            Section 7: Introduction to Certification and Documentation
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Understanding electrical certification requirements and documentation
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

export default Section7;
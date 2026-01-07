import { ArrowLeft, FileText, Gavel, Shield, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "The Health and Safety at Work Act 1974",
    description: "Foundation legislation establishing the general duties of employers and employees",
    icon: FileText,
    href: "1-1"
  },
  {
    number: "Subsection 2", 
    title: "The Electricity at Work Regulations 1989",
    description: "Specific regulations governing electrical work and safety requirements",
    icon: Shield,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "Other Key Regulations (RIDDOR, PUWER, COSHH)",
    description: "Additional regulations affecting electrical work environments",
    icon: Gavel,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "The Role of Regulatory Bodies",
    description: "Understanding HSE, enforcement and compliance responsibilities",
    icon: AlertTriangle,
    href: "1-4"
  }
];

const Section1 = () => {
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
            Section 1: UK Health & Safety Legislation
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl">
            Essential legislation and regulations governing electrical work safety
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

export default Section1;
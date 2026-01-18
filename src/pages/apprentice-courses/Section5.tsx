import { ArrowLeft, Power, Wrench, ClipboardCheck, Lock, AlertTriangle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Why Safe Isolation is Essential",
    description: "Understanding the critical importance of proper electrical isolation",
    icon: Power,
    href: "5-1"
  },
  {
    number: "Subsection 2", 
    title: "Equipment Required for Isolation",
    description: "Tools and devices needed for safe electrical isolation procedures",
    icon: Wrench,
    href: "5-2"
  },
  {
    number: "Subsection 3",
    title: "The Safe Isolation Process – Step by Step",
    description: "Detailed procedure for safely isolating electrical circuits",
    icon: ClipboardCheck,
    href: "5-3"
  },
  {
    number: "Subsection 4",
    title: "Lockout/Tagout and Permit-to-Work Systems",
    description: "Systems to prevent unauthorised re-energisation of circuits",
    icon: Lock,
    href: "5-4"
  },
  {
    number: "Subsection 5",
    title: "Common Mistakes and How to Avoid Them",
    description: "Learning from typical errors in isolation procedures",
    icon: AlertTriangle,
    href: "5-5"
  }
];

const Section5 = () => {
  return (
    <div className="bg-background">
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
            Section 5: Safe Isolation Procedures
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl">
            Step-by-step procedures for safely isolating electrical circuits before work
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

export default Section5;
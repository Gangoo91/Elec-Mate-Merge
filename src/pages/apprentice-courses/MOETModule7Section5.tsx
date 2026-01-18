import { ArrowLeft, CheckSquare, DoorOpen, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule7Section5 = () => {
  useSEO(
    "Section 7.5: EPA Readiness and Final Review - MOET Module 7",
    "Gateway requirements, final revision and EPA day preparation"
  );

  const subsections = [
    {
      number: "7.5.1",
      title: "Employer and Training Provider Sign-Off",
      description: "Securing employer and training provider approval for EPA gateway",
      icon: CheckSquare,
      href: "../m-o-e-t-module7-section5-1"
    },
    {
      number: "7.5.2",
      title: "EPA Gateway Requirements",
      description: "Understanding and completing all EPA gateway documentation",
      icon: DoorOpen,
      href: "../m-o-e-t-module7-section5-2"
    },
    {
      number: "7.5.3",
      title: "Final Revision and Confidence Building",
      description: "Final preparation strategies and building confidence for assessment",
      icon: BookOpen,
      href: "../m-o-e-t-module7-section5-3"
    },
    {
      number: "7.5.4",
      title: "What to Expect on EPA Day",
      description: "EPA day procedures, assessment format and what to expect",
      icon: Calendar,
      href: "../m-o-e-t-module7-section5-4"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 7.5: EPA Readiness and Final Review
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Gateway requirements, final revision and EPA day preparation.
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

export default MOETModule7Section5;
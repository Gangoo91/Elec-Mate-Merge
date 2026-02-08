import { ArrowLeft, Settings, Scale, AlertTriangle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section7 = () => {
  useSEO(
    "Section 4.7: Reliability-Centred Maintenance - MOET Module 4",
    "RCM principles, balancing maintenance types, criticality analysis and industry best practices"
  );

  const subsections = [
    {
      number: "4.7.1",
      title: "Principles of Reliability-Centred Maintenance (RCM)",
      description: "Understanding RCM philosophy and implementation strategies",
      icon: Settings,
      href: "/study-centre/apprentice/m-o-e-t-module4-section7-1"
    },
    {
      number: "4.7.2",
      title: "Balancing PPM and Corrective Maintenance",
      description: "Optimising the balance between preventive and corrective maintenance",
      icon: Scale,
      href: "/study-centre/apprentice/m-o-e-t-module4-section7-2"
    },
    {
      number: "4.7.3",
      title: "Criticality Analysis of Equipment",
      description: "Assessing equipment criticality and prioritising maintenance activities",
      icon: AlertTriangle,
      href: "/study-centre/apprentice/m-o-e-t-module4-section7-3"
    },
    {
      number: "4.7.4",
      title: "Industry Best Practices in RCM",
      description: "Learning from industry standards and best practice examples",
      icon: BookOpen,
      href: "/study-centre/apprentice/m-o-e-t-module4-section7-4"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 4.7: Reliability-Centred Maintenance
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            RCM principles, balancing maintenance types, criticality analysis and industry best practices.
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

export default MOETModule4Section7;
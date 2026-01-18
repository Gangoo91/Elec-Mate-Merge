import { ArrowLeft, Search, BarChart3, Shield, FileCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1Section3 = () => {
  useSEO(
    "Risk Assessment & Method Statements - MOET Module 1",
    "Hazard identification, risk evaluation, controls and dynamic assessments"
  );

  const subsections = [
    {
      number: "1.3.1",
      title: "Hazard Identification",
      description: "Systematic identification of workplace hazards and risks",
      icon: Search,
      href: "../m-o-e-t-module1-section3-3-1"
    },
    {
      number: "1.3.2", 
      title: "Risk Evaluation (likelihood vs severity)",
      description: "Assessing and rating risks using likelihood and severity matrices",
      icon: BarChart3,
      href: "../m-o-e-t-module1-section3-3-2"
    },
    {
      number: "1.3.3",
      title: "Hierarchy of Controls", 
      description: "Elimination, substitution, engineering, administrative and PPE controls",
      icon: Shield,
      href: "../m-o-e-t-module1-section3-3-3"
    },
    {
      number: "1.3.4",
      title: "Writing and Following Method Statements",
      description: "Developing and implementing safe method statements",
      icon: FileCheck,
      href: "../m-o-e-t-module1-section3-3-4"
    },
    {
      number: "1.3.5",
      title: "Dynamic Risk Assessments (on-the-job)",
      description: "Real-time risk assessment and adaptation during work activities",
      icon: Activity,
      href: "../m-o-e-t-module1-section3-3-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.3 Risk Assessment & Method Statements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Hazard identification, risk evaluation, controls and dynamic assessments.
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

export default MOETModule1Section3;
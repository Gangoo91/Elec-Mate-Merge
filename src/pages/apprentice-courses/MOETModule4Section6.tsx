import { ArrowLeft, Search, HelpCircle, GitBranch, Target, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section6 = () => {
  useSEO(
    "Section 4.6: Root Cause Analysis - MOET Module 4",
    "Identifying underlying failures, 5 Whys technique, fishbone diagrams and corrective actions"
  );

  const subsections = [
    {
      number: "4.6.1",
      title: "Identifying Underlying Failures",
      description: "Techniques for identifying root causes rather than symptoms",
      icon: Search,
      href: "/study-centre/apprentice/m-o-e-t-module4-section6-1"
    },
    {
      number: "4.6.2",
      title: "The '5 Whys' Technique",
      description: "Using the 5 Whys method for systematic root cause investigation",
      icon: HelpCircle,
      href: "/study-centre/apprentice/m-o-e-t-module4-section6-2"
    },
    {
      number: "4.6.3",
      title: "Fishbone (Ishikawa) Diagrams",
      description: "Creating and using fishbone diagrams for cause analysis",
      icon: GitBranch,
      href: "/study-centre/apprentice/m-o-e-t-module4-section6-3"
    },
    {
      number: "4.6.4",
      title: "Corrective vs Preventive Actions",
      description: "Developing appropriate corrective and preventive action plans",
      icon: Target,
      href: "/study-centre/apprentice/m-o-e-t-module4-section6-4"
    },
    {
      number: "4.6.5",
      title: "Recording and Reporting RCA Outcomes",
      description: "Documentation and communication of root cause analysis results",
      icon: FileText,
      href: "/study-centre/apprentice/m-o-e-t-module4-section6-5"
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
            Section 4.6: Root Cause Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Identifying underlying failures, 5 Whys technique, fishbone diagrams and corrective actions.
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

export default MOETModule4Section6;
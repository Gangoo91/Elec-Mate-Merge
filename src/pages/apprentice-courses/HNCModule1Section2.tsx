import { ArrowLeft, Search, BarChart3, Layers, FileText, ClipboardCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section2 = () => {
  useSEO(
    "Risk Assessment and RAMS - HNC Module 1 Section 2 | Building Services Engineering",
    "Master risk assessment processes and RAMS documentation: hazard identification, risk matrices, hierarchy of control, method statements and safe systems of work."
  );

  const subsections = [
    {
      number: "2.1",
      title: "Hazard Identification Methods",
      description: "Workplace inspections, task analysis, incident data review and systematic hazard checklists",
      icon: Search,
      href: "../h-n-c-module1-section2-1"
    },
    {
      number: "2.2",
      title: "Risk Assessment Process",
      description: "Five-step methodology, likelihood and severity ratings, risk matrices and documentation",
      icon: BarChart3,
      href: "../h-n-c-module1-section2-2"
    },
    {
      number: "2.3",
      title: "Hierarchy of Control",
      description: "Elimination, substitution, engineering controls, administrative measures and PPE selection",
      icon: Layers,
      href: "../h-n-c-module1-section2-3"
    },
    {
      number: "2.4",
      title: "Method Statements",
      description: "Content requirements, format standards, task breakdown structure and control measures",
      icon: FileText,
      href: "../h-n-c-module1-section2-4"
    },
    {
      number: "2.5",
      title: "Safe Systems of Work",
      description: "Development processes, implementation strategies, monitoring requirements and review cycles",
      icon: ClipboardCheck,
      href: "../h-n-c-module1-section2-5"
    },
    {
      number: "2.6",
      title: "Dynamic Risk Assessment",
      description: "On-site assessment techniques, responding to changing conditions and real-time decision making",
      icon: RefreshCw,
      href: "../h-n-c-module1-section2-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 2: Risk Assessment and RAMS
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Develop competence in identifying hazards, assessing risks and producing professional RAMS documentation
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the systematic approach to risk assessment used throughout the building services industry - from initial hazard identification through to producing comprehensive Risk Assessments and Method Statements (RAMS) that ensure safe working practices on every project.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((subsection) => (
            <ModuleCard
              key={subsection.number}
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

export default HNCModule1Section2;

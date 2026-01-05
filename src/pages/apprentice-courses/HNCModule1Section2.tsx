import { ArrowLeft, Search, BarChart3, FileEdit, Shield, Activity, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section2 = () => {
  useSEO(
    "Risk Assessment and Method Statements (RAMS) - HNC Module 1",
    "Hazard identification, five steps to risk assessment, writing RAMS for electrical projects and hierarchy of control measures"
  );

  const subsections = [
    {
      number: "2.1",
      title: "Hazard identification",
      description: "Systematic identification of workplace hazards and potential risks",
      icon: Search,
      href: "../h-n-c-module1-section2-2-1"
    },
    {
      number: "2.2", 
      title: "Five steps to risk assessment",
      description: "HSE's five-step approach to conducting effective risk assessments",
      icon: BarChart3,
      href: "../h-n-c-module1-section2-2-2"
    },
    {
      number: "2.3",
      title: "Writing RAMS for electrical projects", 
      description: "Developing Risk Assessments and Method Statements for electrical work",
      icon: FileEdit,
      href: "../h-n-c-module1-section2-2-3"
    },
    {
      number: "2.4",
      title: "Hierarchy of control measures",
      description: "Elimination, substitution, engineering, administrative controls and PPE",
      icon: Shield,
      href: "../h-n-c-module1-section2-2-4"
    },
    {
      number: "2.5",
      title: "Dynamic risk assessments on site",
      description: "Real-time risk assessment and adaptation during work activities",
      icon: Activity,
      href: "../h-n-c-module1-section2-2-5"
    },
    {
      number: "2.6",
      title: "Control of subcontractors and visitors",
      description: "Managing risks associated with external personnel and site visitors",
      icon: Users,
      href: "../h-n-c-module1-section2-2-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.2 Risk Assessment & Method Statements (RAMS)
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Hazard identification, five steps to risk assessment, writing RAMS for electrical projects and hierarchy of control measures.
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

export default HNCModule1Section2;
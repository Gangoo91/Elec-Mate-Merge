import { ArrowLeft, FileText, Users, KeyRound, ClipboardCheck, Siren, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section3 = () => {
  useSEO(
    "Safety Management Systems - HNC Module 1 Section 3 | Building Services Engineering",
    "Master safety management systems: policy development, safety culture, permit to work, audits, emergency procedures and contractor management."
  );

  const subsections = [
    {
      number: "3.1",
      title: "Safety Policy and Organisation",
      description: "Policy content requirements, organisational responsibilities and effective communication",
      icon: FileText,
      href: "../h-n-c-module1-section3-1"
    },
    {
      number: "3.2",
      title: "Safety Culture and Leadership",
      description: "Behavioural safety approaches, visible leadership commitment and workforce engagement",
      icon: Users,
      href: "../h-n-c-module1-section3-2"
    },
    {
      number: "3.3",
      title: "Permit to Work Systems",
      description: "Permit types, procedures for isolation, hot works permits and confined space entry",
      icon: KeyRound,
      href: "../h-n-c-module1-section3-3"
    },
    {
      number: "3.4",
      title: "Safety Audits and Inspections",
      description: "Audit types, inspection frequency, reporting requirements and corrective actions",
      icon: ClipboardCheck,
      href: "../h-n-c-module1-section3-4"
    },
    {
      number: "3.5",
      title: "Emergency Procedures",
      description: "Emergency planning, response protocols, evacuation procedures, first aid and fire safety",
      icon: Siren,
      href: "../h-n-c-module1-section3-5"
    },
    {
      number: "3.6",
      title: "Contractor Management",
      description: "Contractor selection, site induction, monitoring performance and coordination requirements",
      icon: UserCog,
      href: "../h-n-c-module1-section3-6"
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
          Section 3: Safety Management Systems
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Understand the components of effective safety management systems in building services organisations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the systematic approach to managing health and safety in the workplace - from developing robust policies and fostering positive safety culture, through to implementing permit systems, conducting audits, and managing contractors safely on building services projects.
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

export default HNCModule1Section3;

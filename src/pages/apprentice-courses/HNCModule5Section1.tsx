import { ArrowLeft, Network, BarChart3, GitBranch, Users, ShieldAlert, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5Section1 = () => {
  useSEO(
    "Project Planning and Programming - HNC Module 5 Section 1 | Building Services",
    "Master project planning: WBS development, Gantt charts, critical path method, resource planning, risk management and MEP coordination for building services."
  );

  const subsections = [
    {
      number: "1.1",
      title: "Work Breakdown Structure",
      description: "WBS development, coding systems, hierarchical decomposition and scope definition for building services projects",
      icon: Network,
      href: "../h-n-c-module5-section1-1"
    },
    {
      number: "1.2",
      title: "Programme Development",
      description: "Gantt charts, bar charts, milestones, programme logic and scheduling techniques for MEP installations",
      icon: BarChart3,
      href: "../h-n-c-module5-section1-2"
    },
    {
      number: "1.3",
      title: "Critical Path Method",
      description: "Network analysis, float calculations, dependencies, activity-on-node diagrams and programme optimisation",
      icon: GitBranch,
      href: "../h-n-c-module5-section1-3"
    },
    {
      number: "1.4",
      title: "Resource Planning",
      description: "Labour allocation, materials procurement, plant requirements, resource levelling and productivity factors",
      icon: Users,
      href: "../h-n-c-module5-section1-4"
    },
    {
      number: "1.5",
      title: "Risk Management",
      description: "Risk identification, qualitative and quantitative assessment, mitigation strategies and contingency planning",
      icon: ShieldAlert,
      href: "../h-n-c-module5-section1-5"
    },
    {
      number: "1.6",
      title: "Building Services Coordination",
      description: "MEP sequencing, interface management, clash detection, coordination drawings and installation priorities",
      icon: Layers,
      href: "../h-n-c-module5-section1-6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../h-n-c-module5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
          Section 1: Project Planning and Programming
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Develop comprehensive project plans and programmes for building services installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers essential planning and programming techniques used to manage building services projects - from initial work breakdown structures through to detailed resource allocation and risk management strategies for MEP installations.
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

export default HNCModule5Section1;

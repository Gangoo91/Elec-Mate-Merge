import { ArrowLeft, ClipboardList, FileText, PoundSterling, CheckSquare, PlayCircle, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5 = () => {
  useSEO(
    "Project Management in Building Services - HNC Module 5",
    "Master project management for building services: planning, procurement, cost control, quality management, commissioning and CDM compliance"
  );

  const sections = [
    {
      number: "Section 1",
      title: "Project Planning and Programming",
      description: "Work breakdown structures, Gantt charts, critical path method, resource planning, risk management and MEP coordination",
      icon: ClipboardList,
      href: "../h-n-c-module5-section1"
    },
    {
      number: "Section 2",
      title: "Procurement and Contracts",
      description: "Procurement routes, JCT and NEC contracts, subcontract management, tendering and supply chain coordination",
      icon: FileText,
      href: "../h-n-c-module5-section2"
    },
    {
      number: "Section 3",
      title: "Cost Management",
      description: "Estimating methods, budget development, cost control, variations and claims, final accounts and value engineering",
      icon: PoundSterling,
      href: "../h-n-c-module5-section3"
    },
    {
      number: "Section 4",
      title: "Quality Management",
      description: "Quality systems, inspection and test plans, material approval, installation quality, testing and defects management",
      icon: CheckSquare,
      href: "../h-n-c-module5-section4"
    },
    {
      number: "Section 5",
      title: "Commissioning and Handover",
      description: "CIBSE commissioning codes, electrical and mechanical commissioning, BMS testing, witness testing and O&M documentation",
      icon: PlayCircle,
      href: "../h-n-c-module5-section5"
    },
    {
      number: "Section 6",
      title: "Site Management and CDM",
      description: "Site organisation, progress monitoring, interface coordination, CDM compliance, environmental management and practical completion",
      icon: HardHat,
      href: "../h-n-c-module5-section6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Module 5: Project Management in Building Services
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Master project management principles, procurement strategies, cost control and commissioning procedures for building services engineering projects
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ModuleCard
              key={section.number}
              number={section.number}
              title={section.title}
              description={section.description}
              icon={section.icon}
              href={section.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HNCModule5;

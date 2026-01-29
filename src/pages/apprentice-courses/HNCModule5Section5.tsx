import { ArrowLeft, FileSpreadsheet, Zap, Thermometer, Cpu, Eye, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5Section5 = () => {
  useSEO(
    "Commissioning and Handover - HNC Module 5 Section 5 | Building Services",
    "Master commissioning: CIBSE Code M, electrical and mechanical commissioning, BMS testing, witness testing and O&M documentation for building services."
  );

  const subsections = [
    {
      number: "5.1",
      title: "Commissioning Planning",
      description: "CIBSE Code M principles, commissioning management plans, scheduling and resource coordination for building services",
      icon: FileSpreadsheet,
      href: "../h-n-c-module5-section5-1"
    },
    {
      number: "5.2",
      title: "Electrical Commissioning",
      description: "Electrical testing procedures, verification requirements, certification and compliance documentation",
      icon: Zap,
      href: "../h-n-c-module5-section5-2"
    },
    {
      number: "5.3",
      title: "Mechanical Commissioning",
      description: "CIBSE codes A, W and R, system balancing, flow measurement, pressure testing and performance verification",
      icon: Thermometer,
      href: "../h-n-c-module5-section5-3"
    },
    {
      number: "5.4",
      title: "BMS Commissioning",
      description: "Point-to-point verification, functional performance testing, graphics testing and system integration checks",
      icon: Cpu,
      href: "../h-n-c-module5-section5-4"
    },
    {
      number: "5.5",
      title: "Witness Testing",
      description: "Client attendance requirements, documentation standards, sign-off procedures and acceptance protocols",
      icon: Eye,
      href: "../h-n-c-module5-section5-5"
    },
    {
      number: "5.6",
      title: "Handover Documentation",
      description: "O&M manual requirements, as-built drawings, training delivery and building log book compilation",
      icon: BookOpen,
      href: "../h-n-c-module5-section5-6"
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
          Section 5: Commissioning and Handover
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Plan and execute commissioning activities and handover procedures for building services systems
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers the commissioning and handover process for building services installations - from initial planning through electrical and mechanical commissioning, BMS testing, witness procedures and final documentation delivery.
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

export default HNCModule5Section5;

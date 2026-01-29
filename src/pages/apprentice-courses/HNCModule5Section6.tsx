import { ArrowLeft, Building2, BarChart2, Handshake, HardHat, Leaf, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5Section6 = () => {
  useSEO(
    "Site Management and CDM - HNC Module 5 Section 6 | Building Services",
    "Master site management: site organisation, progress monitoring, interface coordination, CDM compliance, environmental management and practical completion."
  );

  const subsections = [
    {
      number: "6.1",
      title: "Site Organisation",
      description: "Site facilities, welfare provisions, security arrangements, access control and temporary services coordination",
      icon: Building2,
      href: "../h-n-c-module5-section6-1"
    },
    {
      number: "6.2",
      title: "Progress Monitoring",
      description: "Site diaries, progress reports, programme updates, progress meetings and performance measurement",
      icon: BarChart2,
      href: "../h-n-c-module5-section6-2"
    },
    {
      number: "6.3",
      title: "Interface Coordination",
      description: "Coordination with other trades, client operations interface, occupied premises and live services management",
      icon: Handshake,
      href: "../h-n-c-module5-section6-3"
    },
    {
      number: "6.4",
      title: "CDM Site Compliance",
      description: "Construction phase plan requirements, site inductions, toolbox talks and CDM 2015 compliance procedures",
      icon: HardHat,
      href: "../h-n-c-module5-section6-4"
    },
    {
      number: "6.5",
      title: "Environmental Management",
      description: "Waste management, noise control, dust suppression, permit requirements and environmental compliance",
      icon: Leaf,
      href: "../h-n-c-module5-section6-5"
    },
    {
      number: "6.6",
      title: "Practical Completion",
      description: "Practical completion requirements, defects liability period, sectional completion and handover procedures",
      icon: CheckCircle2,
      href: "../h-n-c-module5-section6-6"
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
          Section 6: Site Management and CDM
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Manage site operations, coordinate interfaces and ensure CDM compliance for building services projects
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers site management responsibilities for building services contractors - from establishing site facilities and monitoring progress through to CDM compliance, environmental management and achieving practical completion.
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

export default HNCModule5Section6;

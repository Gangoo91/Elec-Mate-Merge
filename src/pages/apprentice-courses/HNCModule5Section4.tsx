import { ArrowLeft, Award, ClipboardCheck, Package, Hammer, TestTube, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule5Section4 = () => {
  useSEO(
    "Quality Management - HNC Module 5 Section 4 | Building Services",
    "Master quality management: ISO 9001 systems, inspection and test plans, material approval, installation quality, testing and defects management for building services."
  );

  const subsections = [
    {
      number: "4.1",
      title: "Quality Management Systems",
      description: "ISO 9001 requirements, quality procedures, documentation control and continuous improvement for building services",
      icon: Award,
      href: "../h-n-c-module5-section4-1"
    },
    {
      number: "4.2",
      title: "Inspection and Test Plans",
      description: "ITP development, hold points, witness points, notification procedures and inspection scheduling for MEP works",
      icon: ClipboardCheck,
      href: "../h-n-c-module5-section4-2"
    },
    {
      number: "4.3",
      title: "Material and Equipment Approval",
      description: "Submittal processes, sample approval, mock-up requirements, material specifications and equipment selection",
      icon: Package,
      href: "../h-n-c-module5-section4-3"
    },
    {
      number: "4.4",
      title: "Installation Quality",
      description: "Workmanship standards, supervision requirements, quality audits and installation verification procedures",
      icon: Hammer,
      href: "../h-n-c-module5-section4-4"
    },
    {
      number: "4.5",
      title: "Testing and Verification",
      description: "Test procedures, acceptance criteria, performance verification and compliance testing for building services systems",
      icon: TestTube,
      href: "../h-n-c-module5-section4-5"
    },
    {
      number: "4.6",
      title: "Defects and Snagging",
      description: "Defect identification, snagging procedures, tracking systems, rectification management and close-out documentation",
      icon: Bug,
      href: "../h-n-c-module5-section4-6"
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
          Section 4: Quality Management
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Implement quality management systems and processes for building services installations
        </p>
        <p className="text-base text-muted-foreground mb-12">
          This section covers quality management principles and practices for building services projects - from establishing quality systems and inspection plans through to installation verification, testing and defects management.
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

export default HNCModule5Section4;

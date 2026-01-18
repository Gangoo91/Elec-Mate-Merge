import { ArrowLeft, Calendar, Activity, Search, Wrench, TestTube, FileX, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4 = () => {
  useSEO(
    "Module 4: Maintenance Techniques and Fault Diagnosis - MOET Course",
    "Systematic maintenance approaches, fault finding techniques and diagnostic procedures for engineering systems"
  );

  const sections = [
    {
      number: "4.1",
      title: "Planned Preventive Maintenance (PPM)",
      description: "Principles of PPM, scheduling, records, lubrication, inspection routines and regulatory compliance",
      icon: Calendar,
      href: "../m-o-e-t-module4-section1"
    },
    {
      number: "4.2", 
      title: "Condition Monitoring Techniques",
      description: "Visual inspection, thermal imaging, vibration analysis, insulation testing and predictive maintenance",
      icon: Activity,
      href: "../m-o-e-t-module4-section2"
    },
    {
      number: "4.3",
      title: "Fault Finding and Diagnostics", 
      description: "Systematic diagnostic approach, test instruments, motor faults, control circuits and documentation",
      icon: Search,
      href: "../m-o-e-t-module4-section3"
    },
    {
      number: "4.4",
      title: "Repair and Replacement Procedures",
      description: "Safe isolation, component replacement, cable jointing, spare parts and recommissioning",
      icon: Wrench,
      href: "../m-o-e-t-module4-section4"
    },
    {
      number: "4.5",
      title: "Testing and Inspection",
      description: "Visual inspections, continuity, insulation resistance, earth fault testing and functional testing",
      icon: TestTube,
      href: "../m-o-e-t-module4-section5"
    },
    {
      number: "4.6",
      title: "Root Cause Analysis",
      description: "Identifying underlying failures, 5 Whys technique, fishbone diagrams and corrective actions",
      icon: FileX,
      href: "../m-o-e-t-module4-section6"
    },
    {
      number: "4.7",
      title: "Reliability-Centred Maintenance",
      description: "RCM principles, balancing maintenance types, criticality analysis and industry best practices",
      icon: Settings,
      href: "../m-o-e-t-module4-section7"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to MOET Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 4: Maintenance Techniques and Fault Diagnosis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Systematic maintenance approaches, fault finding techniques and diagnostic procedures for engineering systems.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <ModuleCard
              key={index}
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

export default MOETModule4;
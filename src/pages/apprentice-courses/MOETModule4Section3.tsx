import { ArrowLeft, AlertTriangle, Search, Gauge, Cog, Settings, Zap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule4Section3 = () => {
  useSEO(
    "Section 4.3: Fault Finding and Diagnostics - MOET Module 4",
    "Systematic diagnostic approach, test instruments, motor faults, control circuits and documentation"
  );

  const subsections = [
    {
      number: "4.3.1",
      title: "Symptom Recognition and Initial Assessment",
      description: "Identifying fault symptoms and conducting preliminary assessments",
      icon: AlertTriangle,
      href: "../m-o-e-t-module4-section3-1"
    },
    {
      number: "4.3.2",
      title: "Systematic Diagnostic Approach",
      description: "Structured fault-finding methodology and diagnostic procedures",
      icon: Search,
      href: "../m-o-e-t-module4-section3-2"
    },
    {
      number: "4.3.3",
      title: "Use of Electrical Test Instruments",
      description: "Selection and application of test equipment for fault diagnosis",
      icon: Gauge,
      href: "../m-o-e-t-module4-section3-3"
    },
    {
      number: "4.3.4",
      title: "Common Faults in Motors and Drives",
      description: "Typical motor and drive faults, causes and diagnostic techniques",
      icon: Cog,
      href: "../m-o-e-t-module4-section3-4"
    },
    {
      number: "4.3.5",
      title: "Control Circuit Faults",
      description: "Diagnosing faults in control circuits and automation systems",
      icon: Settings,
      href: "../m-o-e-t-module4-section3-5"
    },
    {
      number: "4.3.6",
      title: "Intermittent Faults and Environmental Factors",
      description: "Identifying intermittent faults and environmental influences on equipment",
      icon: Zap,
      href: "../m-o-e-t-module4-section3-6"
    },
    {
      number: "4.3.7",
      title: "Documentation of Faults",
      description: "Proper documentation, reporting and record keeping of fault diagnosis",
      icon: FileText,
      href: "../m-o-e-t-module4-section3-7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module4">
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
            Section 4.3: Fault Finding and Diagnostics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Systematic diagnostic approach, test instruments, motor faults, control circuits and documentation.
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

export default MOETModule4Section3;
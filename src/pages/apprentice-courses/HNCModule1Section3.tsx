import { ArrowLeft, FileText, AlertTriangle, ClipboardCheck, Search, TrendingUp, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section3 = () => {
  useSEO(
    "Safety Management Systems - HNC Module 1",
    "Safety policy and culture, accident reporting, permit-to-work systems, safety audits and emergency procedures"
  );

  const subsections = [
    {
      number: "3.1",
      title: "Safety policy and culture",
      description: "Developing and implementing effective safety policies and positive safety culture",
      icon: FileText,
      href: "../h-n-c-module1-section3-3-1"
    },
    {
      number: "3.2", 
      title: "Accident, incident and near-miss reporting",
      description: "Comprehensive reporting systems for accidents, incidents and near-miss events",
      icon: AlertTriangle,
      href: "../h-n-c-module1-section3-3-2"
    },
    {
      number: "3.3",
      title: "Permit-to-work systems", 
      description: "Implementation and management of permit-to-work procedures for high-risk activities",
      icon: ClipboardCheck,
      href: "../h-n-c-module1-section3-3-3"
    },
    {
      number: "3.4",
      title: "Safety audits and inspections",
      description: "Conducting systematic safety audits and workplace inspections",
      icon: Search,
      href: "../h-n-c-module1-section3-3-4"
    },
    {
      number: "3.5",
      title: "KPIs and continuous improvement",
      description: "Key Performance Indicators for safety and continuous improvement processes",
      icon: TrendingUp,
      href: "../h-n-c-module1-section3-3-5"
    },
    {
      number: "3.6",
      title: "Emergency procedures and drills",
      description: "Developing emergency response procedures and conducting regular safety drills",
      icon: Siren,
      href: "../h-n-c-module1-section3-3-6"
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
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            1.3 Safety Management Systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Safety policy and culture, accident reporting, permit-to-work systems, safety audits and emergency procedures.
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

export default HNCModule1Section3;
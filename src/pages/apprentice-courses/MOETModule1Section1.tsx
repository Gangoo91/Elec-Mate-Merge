import { ArrowLeft, FileText, Lock, Shield, HardHat, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1Section1 = () => {
  useSEO(
    "Safe Systems of Work - MOET Module 1",
    "Permit to work systems, isolation procedures, LOTO, work at height and confined spaces"
  );

  const subsections = [
    {
      number: "1.1.1",
      title: "Permit to Work Systems",
      description: "Understanding and implementing permit to work procedures",
      icon: FileText,
      href: "../m-o-e-t-module1-section1-1-1"
    },
    {
      number: "1.1.2", 
      title: "Isolation Procedures",
      description: "Safe isolation of electrical and mechanical systems",
      icon: Lock,
      href: "../m-o-e-t-module1-section1-1-2"
    },
    {
      number: "1.1.3",
      title: "Lock-Out / Tag-Out (LOTO)", 
      description: "LOTO procedures for energy isolation and control",
      icon: Shield,
      href: "../m-o-e-t-module1-section1-1-3"
    },
    {
      number: "1.1.4",
      title: "Safe Access and Work at Height",
      description: "Working safely at height and access equipment requirements",
      icon: HardHat,
      href: "../m-o-e-t-module1-section1-1-4"
    },
    {
      number: "1.1.5",
      title: "Working in Confined Spaces",
      description: "Safe entry and working procedures for confined spaces",
      icon: Home,
      href: "../m-o-e-t-module1-section1-1-5"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../m-o-e-t-module1">
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
            1.1 Safe Systems of Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Permit to work systems, isolation procedures, LOTO, work at height and confined spaces.
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

export default MOETModule1Section1;
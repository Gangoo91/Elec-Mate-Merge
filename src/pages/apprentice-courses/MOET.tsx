import { ArrowLeft, Shield, Zap, Cog, Wrench, Settings, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOET = () => {
  useSEO(
    "MOET - Maintenance Operations Engineering Technician Course",
    "Comprehensive maintenance operations engineering training covering health & safety, electrical theory, plant systems, diagnostics and assessment preparation"
  );

  const modules = [
    {
      number: "Module 1",
      title: "Health, Safety and Compliance",
      description: "Essential health and safety requirements, risk management and regulatory compliance for maintenance operations",
      icon: Shield,
      href: "../m-o-e-t-module1"
    },
    {
      number: "Module 2",
      title: "Engineering Principles and Electrical Theory",
      description: "Fundamental engineering principles, electrical theory and mathematical applications for maintenance engineering",
      icon: Zap,
      href: "../m-o-e-t-module2"
    },
    {
      number: "Module 3",
      title: "Electrical Plant, Equipment and Systems",
      description: "Understanding electrical plant, equipment specifications, system operations and maintenance requirements",
      icon: Cog,
      href: "../m-o-e-t-module3"
    },
    {
      number: "Module 4",
      title: "Maintenance Techniques and Fault Diagnosis",
      description: "Systematic maintenance approaches, fault finding techniques and diagnostic procedures for engineering systems",
      icon: Wrench,
      href: "../m-o-e-t-module4"
    },
    {
      number: "Module 5",
      title: "Control, Automation and Instrumentation",
      description: "Control systems, automation technology, instrumentation and monitoring systems for industrial applications",
      icon: Settings,
      href: "../m-o-e-t-module5"
    },
    {
      number: "Module 6",
      title: "Technical Documentation and Communication",
      description: "Technical reporting, documentation standards, communication skills and professional development",
      icon: FileText,
      href: "../m-o-e-t-module6"
    },
    {
      number: "Module 7",
      title: "End Point Assessment Preparation",
      description: "Comprehensive preparation for MOET end point assessment including practical tasks and knowledge evaluation",
      icon: Award,
      href: "../m-o-e-t-module7"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            MOET - Maintenance Operations Engineering Technician
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive maintenance operations engineering training covering health & safety, electrical theory, plant systems, diagnostics and assessment preparation.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
              number={module.number}
              title={module.title}
              description={module.description}
              icon={module.icon}
              href={module.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MOET;
import { ArrowLeft, Scale, FileCheck, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1 = () => {
  useSEO(
    "Health, Safety and Risk Management in Engineering - HNC Module 1",
    "Comprehensive health and safety protocols, risk assessment procedures, and professional responsibilities for engineering environments"
  );

  const sections = [
    {
      number: "Section 1",
      title: "Legislation and Standards",
      description: "HASAWA, EAWR, COSHH, PUWER, LOLER, CDM Regulations, RIDDOR requirements, environmental law and HSE enforcement",
      icon: Scale,
      href: "../h-n-c-module1-section1"
    },
    {
      number: "Section 2",
      title: "Risk Assessment and Method Statements (RAMS)",
      description: "Hazard identification, five steps to risk assessment, writing RAMS for electrical projects and hierarchy of control measures",
      icon: FileCheck,
      href: "../h-n-c-module1-section2"
    },
    {
      number: "Section 3",
      title: "Safety Management Systems",
      description: "Safety policy and culture, accident reporting, permit-to-work systems, safety audits and emergency procedures",
      icon: Shield,
      href: "../h-n-c-module1-section3"
    },
    {
      number: "Section 4",
      title: "Professional Responsibilities",
      description: "Ethical responsibilities of engineers, duty of care, accountability, safety representatives and CPD in health & safety",
      icon: UserCheck,
      href: "../h-n-c-module1-section4"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="../hnc">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to HNC Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Module 1: Health, Safety and Risk Management in Engineering
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive health and safety protocols and risk assessment procedures for engineering environments, covering legislation, standards, and professional responsibilities.
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

export default HNCModule1;
import { ArrowLeft, Scale, Building, FileText, Leaf, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section1 = () => {
  useSEO(
    "Legislation and Standards - HNC Module 1",
    "HASAWA, EAWR, COSHH, PUWER, LOLER, CDM Regulations, RIDDOR requirements, environmental law and HSE enforcement"
  );

  const subsections = [
    {
      number: "1.1",
      title: "HASAWA, EAWR, COSHH, PUWER, LOLER",
      description: "Core health and safety legislation governing workplace safety and equipment use",
      icon: Scale,
      href: "../h-n-c-module1-section1-1-1"
    },
    {
      number: "1.2", 
      title: "CDM Regulations and roles",
      description: "Construction Design and Management regulations - Client, Principal Designer, Contractor roles",
      icon: Building,
      href: "../h-n-c-module1-section1-1-2"
    },
    {
      number: "1.3",
      title: "RIDDOR requirements", 
      description: "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
      icon: FileText,
      href: "../h-n-c-module1-section1-1-3"
    },
    {
      number: "1.4",
      title: "Environmental and sustainability law",
      description: "Environmental legislation and sustainability requirements in engineering",
      icon: Leaf,
      href: "../h-n-c-module1-section1-1-4"
    },
    {
      number: "1.5",
      title: "Employer vs employee duties",
      description: "Understanding legal responsibilities and duties of employers and employees",
      icon: Users,
      href: "../h-n-c-module1-section1-1-5"
    },
    {
      number: "1.6",
      title: "Role of HSE inspectors and enforcement",
      description: "HSE powers, inspection procedures and enforcement actions",
      icon: ShieldCheck,
      href: "../h-n-c-module1-section1-1-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            1.1 Legislation and Standards
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            HASAWA, EAWR, COSHH, PUWER, LOLER, CDM Regulations, RIDDOR requirements, environmental law and HSE enforcement.
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

export default HNCModule1Section1;
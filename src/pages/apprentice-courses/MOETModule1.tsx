import { ArrowLeft, Shield, Zap, FileCheck, BookOpen, Leaf, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1 = () => {
  useSEO(
    "Module 1: Health, Safety and Compliance - MOET Course",
    "Essential health and safety requirements, risk management and regulatory compliance for maintenance operations"
  );

  const sections = [
    {
      number: "1.1",
      title: "Safe Systems of Work",
      description: "Permit to work, isolation procedures, LOTO, work at height and confined spaces",
      icon: Shield,
      href: "/study-centre/apprentice/m-o-e-t-module1-section1"
    },
    {
      number: "1.2", 
      title: "Electrical Safety",
      description: "Electrical dangers, safe use of tools, PPE, approach distances and earthing",
      icon: Zap,
      href: "/study-centre/apprentice/m-o-e-t-module1-section2"
    },
    {
      number: "1.3",
      title: "Risk Assessment & Method Statements", 
      description: "Hazard identification, risk evaluation, controls and dynamic assessments",
      icon: FileCheck,
      href: "/study-centre/apprentice/m-o-e-t-module1-section3"
    },
    {
      number: "1.4",
      title: "Regulations and Standards",
      description: "HSWA, Electricity at Work, BS7671, PUWER, LOLER and industry guidance",
      icon: BookOpen,
      href: "/study-centre/apprentice/m-o-e-t-module1-section4"
    },
    {
      number: "1.5",
      title: "Environmental and Sustainability Practices",
      description: "Waste management, COSHH, energy efficiency and environmental legislation",
      icon: Leaf,
      href: "/study-centre/apprentice/m-o-e-t-module1-section5"
    },
    {
      number: "1.6",
      title: "Emergency Procedures & First Aid",
      description: "Fire safety, electrical first aid, evacuation and incident reporting",
      icon: AlertTriangle,
      href: "/study-centre/apprentice/m-o-e-t-module1-section6"
    }
  ];

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="/study-centre/apprentice/moet">
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
            Module 1: Health, Safety and Compliance
          </h1>
          <p className="text-xl text-muted-foreground max-w-5xl">
            Essential health and safety requirements, risk management and regulatory compliance for maintenance operations.
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

export default MOETModule1;
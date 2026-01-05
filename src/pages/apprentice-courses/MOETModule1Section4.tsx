import { ArrowLeft, Shield, Zap, BookOpen, Cog, ArrowUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const MOETModule1Section4 = () => {
  useSEO(
    "Regulations and Standards - MOET Module 1",
    "HSWA, Electricity at Work, BS7671, PUWER, LOLER and industry guidance"
  );

  const subsections = [
    {
      number: "1.4.1",
      title: "Health & Safety at Work Act",
      description: "Foundation health and safety legislation and duties",
      icon: Shield,
      href: "../m-o-e-t-module1-section4-4-1"
    },
    {
      number: "1.4.2", 
      title: "Electricity at Work Regulations",
      description: "Legal requirements for electrical work and maintenance",
      icon: Zap,
      href: "../m-o-e-t-module1-section4-4-2"
    },
    {
      number: "1.4.3",
      title: "BS7671 Wiring Regulations", 
      description: "IET Wiring Regulations for electrical installations",
      icon: BookOpen,
      href: "../m-o-e-t-module1-section4-4-3"
    },
    {
      number: "1.4.4",
      title: "PUWER (Provision & Use of Work Equipment Regulations)",
      description: "Requirements for work equipment selection, maintenance and use",
      icon: Cog,
      href: "../m-o-e-t-module1-section4-4-4"
    },
    {
      number: "1.4.5",
      title: "LOLER (Lifting Operations & Lifting Equipment Regulations)",
      description: "Safety requirements for lifting equipment and operations",
      icon: ArrowUp,
      href: "../m-o-e-t-module1-section4-4-5"
    },
    {
      number: "1.4.6",
      title: "Other Industry-Specific Guidance",
      description: "HSG guidance, NFPA standards and site-specific rules",
      icon: FileText,
      href: "../m-o-e-t-module1-section4-4-6"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            1.4 Regulations and Standards
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            HSWA, Electricity at Work, BS7671, PUWER, LOLER and industry guidance.
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

export default MOETModule1Section4;
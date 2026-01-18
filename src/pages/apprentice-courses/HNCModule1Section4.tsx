import { ArrowLeft, Heart, Shield, AlertTriangle, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import useSEO from "@/hooks/useSEO";

const HNCModule1Section4 = () => {
  useSEO(
    "Professional Responsibilities - HNC Module 1",
    "Ethical responsibilities of engineers, duty of care, accountability, safety representatives and CPD in health & safety"
  );

  const subsections = [
    {
      number: "4.1",
      title: "Ethical responsibilities of engineers",
      description: "Professional ethics and moral obligations in engineering practice",
      icon: Heart,
      href: "../h-n-c-module1-section4-4-1"
    },
    {
      number: "4.2", 
      title: "Duty of care and accountability",
      description: "Legal and professional duty of care requirements and personal accountability",
      icon: Shield,
      href: "../h-n-c-module1-section4-4-2"
    },
    {
      number: "4.3",
      title: "Disciplinary actions for breaches", 
      description: "Consequences and disciplinary procedures for safety and professional breaches",
      icon: AlertTriangle,
      href: "../h-n-c-module1-section4-4-3"
    },
    {
      number: "4.4",
      title: "Safety reps and trade unions",
      description: "Role of safety representatives and trade union involvement in workplace safety",
      icon: Users,
      href: "../h-n-c-module1-section4-4-4"
    },
    {
      number: "4.5",
      title: "CPD in health & safety",
      description: "Continuing Professional Development requirements and opportunities in health and safety",
      icon: GraduationCap,
      href: "../h-n-c-module1-section4-4-5"
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
            1.4 Professional Responsibilities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Ethical responsibilities of engineers, duty of care, accountability, safety representatives and CPD in health & safety.
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

export default HNCModule1Section4;
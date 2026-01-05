import { ArrowLeft, Scale, Zap, FileWarning, Shield, Wrench, Mountain, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "1.1",
    title: "Health & Safety at Work Act (HASAWA) 1974",
    description: "Foundation legislation for workplace health and safety requirements",
    icon: Scale,
    href: "../level3-module1-section1-1-1",
  },
  {
    number: "1.2", 
    title: "Electricity at Work Regulations (EAWR) 1989",
    description: "Specific regulations governing electrical work safety and compliance",
    icon: Zap,
    href: "../level3-module1-section1-1-2",
  },
  {
    number: "1.3",
    title: "RIDDOR (Reporting of Injuries, Diseases & Dangerous Occurrences Regulations)", 
    description: "Mandatory reporting requirements for workplace incidents and accidents",
    icon: FileWarning,
    href: "../level3-module1-section1-1-3",
  },
  {
    number: "1.4",
    title: "COSHH (Control of Substances Hazardous to Health)",
    description: "Regulations for managing and controlling hazardous substances in the workplace",
    icon: Shield,
    href: "../level3-module1-section1-1-4",
  },
  {
    number: "1.5",
    title: "PUWER & LOLER (equipment and lifting regs)",
    description: "Equipment safety regulations and lifting operations requirements",
    icon: Wrench,
    href: "../level3-module1-section1-1-5",
  },
  {
    number: "1.6", 
    title: "Working at Height Regulations",
    description: "Legal requirements for safe working at height and fall prevention",
    icon: Mountain,
    href: "../level3-module1-section1-1-6",
  },
  {
    number: "1.7",
    title: "Employer vs. employee responsibilities under law",
    description: "Legal duties and responsibilities of employers and employees in workplace safety",
    icon: Users,
    href: "../level3-module1-section1-1-7",
  },
];

const Level3Module1Section1 = () => {
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
            Section 1: Legislation and Regulations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Key legislation, regulations and standards governing electrical work and building services
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

export default Level3Module1Section1;
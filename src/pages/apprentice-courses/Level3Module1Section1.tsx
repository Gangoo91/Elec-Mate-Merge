import { ArrowLeft, Scale, Zap, FileWarning, Shield, Wrench, Mountain, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "1.1",
    title: "Health & Safety at Work Act (HASAWA) 1974",
    description: "Foundation legislation for workplace health and safety requirements",
    icon: Scale,
    href: "../level3-module1-section1-1",
  },
  {
    number: "1.2",
    title: "Electricity at Work Regulations (EAWR) 1989",
    description: "Specific regulations governing electrical work safety and compliance",
    icon: Zap,
    href: "../level3-module1-section1-2",
  },
  {
    number: "1.3",
    title: "RIDDOR (Reporting of Injuries, Diseases & Dangerous Occurrences Regulations)",
    description: "Mandatory reporting requirements for workplace incidents and accidents",
    icon: FileWarning,
    href: "../level3-module1-section1-3",
  },
  {
    number: "1.4",
    title: "COSHH (Control of Substances Hazardous to Health)",
    description: "Regulations for managing and controlling hazardous substances in the workplace",
    icon: Shield,
    href: "../level3-module1-section1-4",
  },
  {
    number: "1.5",
    title: "PUWER & LOLER (equipment and lifting regs)",
    description: "Equipment safety regulations and lifting operations requirements",
    icon: Wrench,
    href: "../level3-module1-section1-5",
  },
  {
    number: "1.6",
    title: "Working at Height Regulations",
    description: "Legal requirements for safe working at height and fall prevention",
    icon: Mountain,
    href: "../level3-module1-section1-6",
  },
  {
    number: "1.7",
    title: "Employer vs. employee responsibilities under law",
    description: "Legal duties and responsibilities of employers and employees in workplace safety",
    icon: Users,
    href: "../level3-module1-section1-7",
  },
];

const Level3Module1Section1 = () => {
  useSEO(
    "Section 1: Legislation and Regulations - Level 3 Module 1",
    "Key legislation, regulations and standards governing electrical work and building services"
  );

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Legislation and Regulations
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Key legislation, regulations and standards governing electrical work and building services
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers the essential legislation and regulations that govern electrical work in the UK.
              You will learn about the Health and Safety at Work Act, Electricity at Work Regulations, RIDDOR,
              COSHH, PUWER, LOLER, and Working at Height Regulations, as well as the responsibilities of both
              employers and employees under these laws.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 gap-4">
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
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module1Section1;

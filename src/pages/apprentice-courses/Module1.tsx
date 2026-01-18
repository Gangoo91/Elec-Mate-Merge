import { ArrowLeft, Scale, AlertTriangle, FileCheck, Shield, Power, Phone } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "UK Health & Safety Legislation",
    description: "Overview of key health and safety laws and regulations governing electrical work",
    icon: Scale,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Common Electrical Hazards",
    description: "Identification and understanding of typical electrical risks and dangers in the workplace",
    icon: AlertTriangle,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Risk Assessment and Method Statements (RAMS)",
    description: "Planning and documenting safe working procedures for electrical installations",
    icon: FileCheck,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Personal Protective Equipment (PPE) and Safe Working Practices",
    description: "Selection, use and maintenance of protective equipment and safe working methods",
    icon: Shield,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Safe Isolation Procedures",
    description: "Step-by-step procedures for safely isolating electrical circuits before work",
    icon: Power,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Accidents, Reporting and Emergency Response",
    description: "Procedures for dealing with electrical accidents and emergency situations",
    icon: Phone,
    href: "section6"
  },
];

const Module1 = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Level 2</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Electrical Apprenticeship</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Module 1: Health and Safety in Building Services Engineering
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential health and safety practices for electrical work environments
            </p>
          </header>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 gap-4">
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
    </div>
  );
};

export default Module1;
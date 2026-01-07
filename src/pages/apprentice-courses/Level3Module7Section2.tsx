import { ArrowLeft, Heart, BookOpen, FileText, Handshake, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Duty of Care and Professional Ethics",
    description: "Understanding professional responsibilities and ethical obligations in electrical work",
    icon: Heart,
    href: "../level3-module7-section2-1",
  },
  {
    number: "2.2",
    title: "Codes of Practice and BS 7671 Compliance",
    description: "Adhering to industry codes of practice and maintaining regulatory compliance",
    icon: BookOpen,
    href: "../level3-module7-section2-2",
  },
  {
    number: "2.3",
    title: "Importance of Accurate Documentation and Record-keeping",
    description: "Maintaining proper documentation and records for professional accountability",
    icon: FileText,
    href: "../level3-module7-section2-3",
  },
  {
    number: "2.4",
    title: "Professional Behaviour on Site and Client Relations",
    description: "Maintaining professional standards in workplace behaviour and client interactions",
    icon: Handshake,
    href: "../level3-module7-section2-4",
  },
];

const Level3Module7Section2 = () => {
  useSEO(
    "Section 2: Professional Standards and Responsibilities - Level 3 Module 7",
    "Professional ethics, standards and responsibilities in electrical work"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Professional Standards and Responsibilities
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Professional ethics, standards and responsibilities in electrical work
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers professional standards including duty of care,
              codes of practice and compliance, documentation requirements,
              and professional behaviour with client relations.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  );
};

export default Level3Module7Section2;

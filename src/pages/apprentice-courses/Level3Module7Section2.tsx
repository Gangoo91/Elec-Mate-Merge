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
            <Link to="/study-centre/apprentice/level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

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

export default Level3Module7Section2;

import { ArrowLeft, Heart, BookOpen, FileText, Handshake } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Duty of Care and Professional Ethics",
    description: "Understanding professional responsibilities and ethical obligations in electrical work",
    icon: Heart,
    href: "../level3-module7-section2-2-1",
  },
  {
    number: "2.2", 
    title: "Codes of Practice and BS 7671 Compliance",
    description: "Adhering to industry codes of practice and maintaining regulatory compliance",
    icon: BookOpen,
    href: "../level3-module7-section2-2-2",
  },
  {
    number: "2.3",
    title: "Importance of Accurate Documentation and Record-keeping",
    description: "Maintaining proper documentation and records for professional accountability",
    icon: FileText,
    href: "../level3-module7-section2-2-3",
  },
  {
    number: "2.4",
    title: "Professional Behaviour on Site and Client Relations",
    description: "Maintaining professional standards in workplace behaviour and client interactions",
    icon: Handshake,
    href: "../level3-module7-section2-2-4",
  },
];

const Level3Module7Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 2 - Professional Standards and Responsibilities
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Professional ethics, standards and responsibilities in electrical work
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

export default Level3Module7Section2;
import { ArrowLeft, Clipboard, FileText, Lightbulb, MapPin, Package } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Importance of Accurate Records for Compliance and Safety",
    description: "Understanding why accurate documentation is essential",
    icon: Clipboard,
    href: "7-1"
  },
  {
    number: "Subsection 2",
    title: "Cable and Circuit Labelling Conventions",
    description: "Standard methods for labelling electrical systems",
    icon: FileText,
    href: "7-2"
  },
  {
    number: "Subsection 3",
    title: "Maintaining Work Logs and Handover Sheets",
    description: "Keeping records of work completed and handover information",
    icon: Lightbulb,
    href: "7-3"
  },
  {
    number: "Subsection 4",
    title: "Updating As-Built Drawings (Basic Awareness)",
    description: "Understanding the need to update drawings after installation",
    icon: MapPin,
    href: "7-4"
  },
  {
    number: "Subsection 5",
    title: "Site Documentation Storage and Access",
    description: "Managing and accessing site documentation effectively",
    icon: Package,
    href: "7-5"
  }
];

const Module5Section7 = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Module 5
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 7</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Documentation, Labelling, and Record Keeping
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Maintaining accurate records and documentation
            </p>
          </header>

          {/* Subsections Grid */}
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
        </div>
      </div>
    </div>
  );
};

export default Module5Section7;

import { ArrowLeft, FileText, Lightbulb, MapPin, Package, Users, MessageSquare } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "What Is a Specification and Why It Matters",
    description: "Understanding the importance of specifications in electrical work",
    icon: FileText,
    href: "1-1"
  },
  {
    number: "Subsection 2",
    title: "Reading Basic Electrical Installation Drawings",
    description: "Interpreting electrical installation drawings and plans",
    icon: Lightbulb,
    href: "1-2"
  },
  {
    number: "Subsection 3",
    title: "Symbols and Conventions (BS 7671 and Common Site Use)",
    description: "Understanding electrical symbols and drawing conventions",
    icon: MapPin,
    href: "1-3"
  },
  {
    number: "Subsection 4",
    title: "Interpreting Floorplans, Circuit Layouts, and Cable Routes",
    description: "Reading and understanding building plans and electrical layouts",
    icon: Package,
    href: "1-4"
  },
  {
    number: "Subsection 5",
    title: "Identifying Installation Requirements from Drawings",
    description: "Determining what work needs to be done from technical drawings",
    icon: Users,
    href: "1-5"
  },
  {
    number: "Subsection 6",
    title: "Dealing with Incomplete or Conflicting Information",
    description: "Managing situations where drawings or specifications are unclear",
    icon: MessageSquare,
    href: "1-6"
  }
];

const Section1 = () => {
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
              <span className="text-white/60">Section 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Understanding Installation Specifications and Drawings
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Reading and interpreting technical drawings and specifications
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

export default Section1;

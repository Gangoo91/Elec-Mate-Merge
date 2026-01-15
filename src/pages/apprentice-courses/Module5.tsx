import { ArrowLeft, FileText, Lightbulb, MapPin, Package, Users, MessageSquare, Clipboard } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Understanding Installation Specifications and Drawings",
    description: "Reading and interpreting technical drawings and specifications",
    icon: FileText,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Basic Electrical Design Principles",
    description: "Fundamental principles of electrical system design",
    icon: Lightbulb,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Planning Installation Work on Site",
    description: "Planning and organising electrical installation projects",
    icon: MapPin,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Materials, Tools, and Resource Planning",
    description: "Planning and managing resources for electrical installations",
    icon: Package,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Working with Other Trades and Site Personnel",
    description: "Collaboration and coordination with other construction trades",
    icon: Users,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Communicating Information Effectively",
    description: "Professional communication skills for electrical work",
    icon: MessageSquare,
    href: "section6"
  },
  {
    number: "Section 7",
    title: "Documentation, Labelling, and Record Keeping",
    description: "Maintaining accurate records and documentation",
    icon: Clipboard,
    href: "section7"
  },
];

const Module5 = () => {
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
              Module 5: Design, Planning & Communication
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Project planning, technical documentation and effective team communication
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

export default Module5;

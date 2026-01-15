import { ArrowLeft, Package, FileText, Lightbulb, MapPin, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Estimating Materials from Drawings or Site Walkthroughs",
    description: "Calculating material requirements from plans and site visits",
    icon: Package,
    href: "4-1"
  },
  {
    number: "Subsection 2",
    title: "Ordering Materials and Managing Deliveries",
    description: "Procurement and delivery coordination for electrical materials",
    icon: FileText,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Tool Selection and Availability",
    description: "Choosing and ensuring availability of required tools",
    icon: Lightbulb,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Managing Wastage and Shortages",
    description: "Controlling material waste and dealing with shortages",
    icon: MapPin,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Coordinating Equipment with Team Requirements",
    description: "Managing equipment needs across the installation team",
    icon: Users,
    href: "4-5"
  }
];

const Section4 = () => {
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
              <span className="text-white/60">Section 4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Materials, Tools, and Resource Planning
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Planning and managing resources for electrical installations
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

export default Section4;

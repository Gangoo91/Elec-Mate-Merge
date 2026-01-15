import { ArrowLeft, Package, Wrench, Shield, Layers, Cog } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Purpose of Containment in Electrical Installations",
    description: "Understanding why containment systems are essential",
    icon: Package,
    href: "2-1"
  },
  {
    number: "Subsection 2",
    title: "PVC and Metal Conduit (Surface/Recessed)",
    description: "Types of conduit systems and installation methods",
    icon: Wrench,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Plastic and Steel Trunking Systems",
    description: "Trunking systems for cable containment and protection",
    icon: Shield,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Cable Tray, Basket, and Ladder Systems",
    description: "Open containment systems for larger installations",
    icon: Layers,
    href: "2-4"
  },
  {
    number: "Subsection 5",
    title: "Underfloor Trunking and Dado Trunking",
    description: "Specialised trunking systems for concealed installations",
    icon: Cog,
    href: "2-5"
  },
  {
    number: "Subsection 6",
    title: "Fixings, Clips, and Cable Ties",
    description: "Hardware for securing containment and cables",
    icon: Package,
    href: "2-6"
  },
  {
    number: "Subsection 7",
    title: "Good Practice for Installing Containment",
    description: "Best practices and techniques for containment installation",
    icon: Wrench,
    href: "2-7"
  }
];

const Section2 = () => {
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
              Back to Module 3
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 3</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Cable Containment Systems
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Methods and systems for containing, protecting and supporting electrical cables
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

export default Section2;

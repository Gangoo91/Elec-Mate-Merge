import { ArrowLeft, HardHat, Ruler, Wrench, Package, Plug, TestTube, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "Section 1",
    title: "Preparing to Install Wiring Systems",
    description: "Planning and preparation for electrical installation work",
    icon: HardHat,
    href: "section1"
  },
  {
    number: "Section 2",
    title: "Measuring, Marking, and Setting Out",
    description: "Accurate measurement and marking techniques for installations",
    icon: Ruler,
    href: "section2"
  },
  {
    number: "Section 3",
    title: "Bending and Forming Conduit and Trunking",
    description: "Techniques for bending and shaping containment systems",
    icon: Wrench,
    href: "section3"
  },
  {
    number: "Section 4",
    title: "Installing Conduit, Trunking, Tray, and Cables",
    description: "Installation methods for containment systems and cable runs",
    icon: Package,
    href: "section4"
  },
  {
    number: "Section 5",
    title: "Installing Electrical Accessories and Terminations",
    description: "Installation of sockets, switches and cable terminations",
    icon: Plug,
    href: "section5"
  },
  {
    number: "Section 6",
    title: "Testing and Inspecting the Completed Installation",
    description: "Testing procedures and inspection of completed work",
    icon: TestTube,
    href: "section6"
  },
  {
    number: "Section 7",
    title: "Safe Working and Tool Use During Installation",
    description: "Safety practices and proper tool use during installation work",
    icon: Shield,
    href: "section7"
  },
];

const Module4 = () => {
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
              Module 4: Installing Wiring Systems & Enclosures
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Hands-on installation techniques for PVC, trunking, conduit and cable tray systems
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

export default Module4;

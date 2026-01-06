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
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a]/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Module 4: Installing Wiring Systems & Enclosures
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-3xl">
            Hands-on installation techniques for PVC, trunking, conduit and cable tray systems
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
  );
};

export default Module4;
import { ArrowLeft, Plug, FileText, Wrench, CheckCircle, Ruler, Shield, HardHat, Package } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Mounting Socket Outlets, Switches, and Spurs",
    description: "Installation techniques for common electrical accessories",
    icon: Plug,
    href: "5-1"
  },
  {
    number: "Subsection 2",
    title: "Installing Lighting Points and Pendants",
    description: "Proper installation of lighting fixtures and pendants",
    icon: FileText,
    href: "5-2"
  },
  {
    number: "Subsection 3",
    title: "Terminating Twin & Earth, Singles, and Flex",
    description: "Correct termination methods for different cable types",
    icon: Wrench,
    href: "5-3"
  },
  {
    number: "Subsection 4",
    title: "Using Ferrules, Sleeving, Glands, and Crimps",
    description: "Application of cable termination accessories",
    icon: CheckCircle,
    href: "5-4"
  },
  {
    number: "Subsection 5",
    title: "Dressing Cables Neatly Within Boxes and Enclosures",
    description: "Professional cable management in enclosures",
    icon: Ruler,
    href: "5-5"
  },
  {
    number: "Subsection 6",
    title: "Testing for Polarity and Continuity During Install",
    description: "Basic testing procedures during installation",
    icon: Shield,
    href: "5-6"
  },
  {
    number: "Subsection 7",
    title: "Making Final Fixes to Accessories",
    description: "Completing final installation and securing of accessories",
    icon: HardHat,
    href: "5-7"
  },
  {
    number: "Subsection 8",
    title: "Common Faults and How to Correct Them",
    description: "Identifying and rectifying common installation faults",
    icon: Package,
    href: "5-8"
  }
];

const Section5 = () => {
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
              Back to Module 4
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Installing Electrical Accessories and Terminations
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Installation of sockets, switches and cable terminations
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

export default Section5;

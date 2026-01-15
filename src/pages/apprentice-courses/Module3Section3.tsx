import { ArrowLeft, Wrench, TestTube, Zap, Shield, Gauge } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Essential Hand Tools (Strippers, Cutters, Drivers)",
    description: "Basic hand tools required for electrical installation work",
    icon: Wrench,
    href: "3-1"
  },
  {
    number: "Subsection 2",
    title: "Common Power Tools (Drills, SDS, Jigsaws)",
    description: "Power tools used in electrical installation work",
    icon: TestTube,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "Test Equipment for Installation Work (Overview Only)",
    description: "Basic testing equipment used during installation",
    icon: Gauge,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Tool Inspection and Maintenance",
    description: "Maintaining tools in safe working condition",
    icon: Shield,
    href: "3-4"
  },
  {
    number: "Subsection 5",
    title: "Safe Use, Transport, and Storage of Tools",
    description: "Safe handling and storage practices for tools",
    icon: Zap,
    href: "3-5"
  },
  {
    number: "Subsection 6",
    title: "PPE Associated with Tool Use",
    description: "Personal protective equipment for tool operation",
    icon: Shield,
    href: "3-6"
  }
];

const Section3 = () => {
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
              <span className="text-white/60">Section 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Electrical Tools and Equipment
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Essential tools, equipment and testing instruments for electrical installation work
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

export default Section3;

import { ArrowLeft, Wrench, TestTube, Eye, Zap, Shield } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Introduction to Test Instruments (Multimeter, IR Tester, Continuity Tester)",
    description: "Overview of essential electrical testing equipment",
    icon: Wrench,
    href: "3-1"
  },
  {
    number: "Subsection 2",
    title: "GS38 Compliance and Tester Safety",
    description: "Safety requirements for electrical test equipment",
    icon: TestTube,
    href: "3-2"
  },
  {
    number: "Subsection 3",
    title: "Setting Up and Zeroing Instruments",
    description: "Proper preparation and calibration of test equipment",
    icon: Eye,
    href: "3-3"
  },
  {
    number: "Subsection 4",
    title: "Proving Dead and Safe to Test",
    description: "Essential safety procedure before testing begins",
    icon: Zap,
    href: "3-4"
  },
  {
    number: "Subsection 5",
    title: "Using a Proving Unit and Two-Pole Voltage Tester",
    description: "Safe voltage testing procedures and equipment",
    icon: Shield,
    href: "3-5"
  },
  {
    number: "Subsection 6",
    title: "When to Use Each Instrument and Why",
    description: "Selecting appropriate test equipment for different applications",
    icon: Wrench,
    href: "3-6"
  }
];

const Section3 = () => {
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
              Back to Module 6
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Basic Testing Procedures and Instruments
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Introduction to electrical testing equipment and procedures
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

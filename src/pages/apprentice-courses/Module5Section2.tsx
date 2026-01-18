import { ArrowLeft, Lightbulb, FileText, MapPin, Package, Users } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "What Makes a 'Safe and Functional' Design",
    description: "Understanding the principles of safe electrical design",
    icon: Lightbulb,
    href: "2-1"
  },
  {
    number: "Subsection 2",
    title: "Load Estimation and Circuit Requirements (Basic Awareness)",
    description: "Introduction to calculating electrical loads and circuit needs",
    icon: FileText,
    href: "2-2"
  },
  {
    number: "Subsection 3",
    title: "Selecting Suitable Protective Devices (MCBs, RCDs – Intro Only)",
    description: "Basic introduction to choosing protection devices",
    icon: MapPin,
    href: "2-3"
  },
  {
    number: "Subsection 4",
    title: "Zoning, Environmental Considerations, and Cable Choice",
    description: "Considering environment and location when selecting cables",
    icon: Package,
    href: "2-4"
  },
  {
    number: "Subsection 5",
    title: "Designing for Expansion, Maintenance, and Accessibility",
    description: "Planning electrical systems for future needs and maintenance",
    icon: Users,
    href: "2-5"
  }
];

const Section2 = () => {
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
              <span className="text-white/60">Section 2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Basic Electrical Design Principles
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Fundamental principles of electrical system design
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

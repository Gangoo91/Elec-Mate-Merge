import { ArrowLeft, Users, FileText, Lightbulb, MapPin, Package } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Understanding Site Roles and Responsibilities",
    description: "Knowing who does what on construction sites",
    icon: Users,
    href: "5-1"
  },
  {
    number: "Subsection 2",
    title: "Communicating with Site Supervisors and Foremen",
    description: "Effective communication with site management",
    icon: FileText,
    href: "5-2"
  },
  {
    number: "Subsection 3",
    title: "Coordinating with Joiners, Plumbers, Plasterers, etc.",
    description: "Working alongside other construction trades",
    icon: Lightbulb,
    href: "5-3"
  },
  {
    number: "Subsection 4",
    title: "Avoiding Installation Conflicts (e.g. trunking vs pipework)",
    description: "Preventing clashes between different trade installations",
    icon: MapPin,
    href: "5-4"
  },
  {
    number: "Subsection 5",
    title: "Attending Briefings, Tool Box Talks, and Site Meetings",
    description: "Participating in site communication and safety meetings",
    icon: Package,
    href: "5-5"
  }
];

const Section5 = () => {
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
              <span className="text-white/60">Section 5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Working with Other Trades and Site Personnel
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Collaboration and coordination with other construction trades
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

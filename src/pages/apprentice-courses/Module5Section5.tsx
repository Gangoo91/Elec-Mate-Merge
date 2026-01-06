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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-6">
            Section 5: Working with Other Trades and Site Personnel
          </h1>
          <p className="text-base sm:text-xl text-white max-w-3xl">
            Collaboration and coordination with other construction trades
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
  );
};

export default Section5;
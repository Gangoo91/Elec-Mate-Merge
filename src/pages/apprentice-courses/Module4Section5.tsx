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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-12">
          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-6">
            Section 5: Installing Electrical Accessories and Terminations
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Installation of sockets, switches and cable terminations
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
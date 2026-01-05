import { ArrowLeft, Package, FileText, Wrench, CheckCircle, Ruler, Shield, HardHat } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "Subsection 1",
    title: "Fixing and Supporting Containment Systems",
    description: "Methods for securing containment systems properly",
    icon: Package,
    href: "4-1"
  },
  {
    number: "Subsection 2", 
    title: "Spacing Rules and Manufacturer Guidelines",
    description: "Following spacing requirements and manufacturer specifications",
    icon: FileText,
    href: "4-2"
  },
  {
    number: "Subsection 3",
    title: "Assembling and Joining Containment (Couplers, Saddles, Bushes)",
    description: "Using accessories to assemble containment systems",
    icon: Wrench,
    href: "4-3"
  },
  {
    number: "Subsection 4",
    title: "Pulling in Single-Core and Multi-Core Cables",
    description: "Techniques for installing different cable types",
    icon: CheckCircle,
    href: "4-4"
  },
  {
    number: "Subsection 5",
    title: "Preventing Damage to Cables During Installation",
    description: "Protecting cables from damage during the installation process",
    icon: Ruler,
    href: "4-5"
  },
  {
    number: "Subsection 6",
    title: "Earthing of Metallic Containment Systems",
    description: "Proper earthing techniques for metal containment",
    icon: Shield,
    href: "4-6"
  },
  {
    number: "Subsection 7",
    title: "Working at Height Safely While Installing Systems",
    description: "Safety procedures for working at height during installation",
    icon: HardHat,
    href: "4-7"
  }
];

const Section4 = () => {
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
            Section 4: Installing Conduit, Trunking, Tray, and Cables
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl">
            Installation methods for containment systems and cable runs
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

export default Section4;
import { ArrowLeft, Plug, ArrowUpCircle, Shield, Scale, TestTube } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "5.1",
    title: "Connection to consumer units & distribution boards",
    description: "Integrating environmental technologies with existing electrical distribution systems",
    icon: Plug,
    href: "../level3-module2-section5-5-1",
  },
  {
    number: "5.2", 
    title: "Exporting energy back to the grid",
    description: "Grid export requirements, feed-in tariffs and bi-directional energy flow",
    icon: ArrowUpCircle,
    href: "../level3-module2-section5-5-2",
  },
  {
    number: "5.3",
    title: "Impact of renewables on earthing & protection systems", 
    description: "Effects of renewable energy systems on electrical protection and earthing arrangements",
    icon: Shield,
    href: "../level3-module2-section5-5-3",
  },
  {
    number: "5.4",
    title: "Load balancing and harmonics considerations",
    description: "Managing electrical loads and harmonic distortion in integrated systems",
    icon: Scale,
    href: "../level3-module2-section5-5-4",
  },
  {
    number: "5.5",
    title: "Inspection, testing & certification of integrated systems",
    description: "Testing procedures and certification requirements for integrated renewable systems",
    icon: TestTube,
    href: "../level3-module2-section5-5-5",
  },
];

const Level3Module2Section5 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6">
            Section 5: Integration with Electrical Installations
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Incorporating environmental technologies into conventional electrical systems
          </p>
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default Level3Module2Section5;
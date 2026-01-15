import { ArrowLeft, Shield, Settings, Box, Target, Package, Zap } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "3.1",
    title: "MCBs, Fuses, and RCBOs - Selection and Coordination",
    description: "Selecting and coordinating MCBs, fuses and RCBOs for effective protection",
    icon: Shield,
    href: "../level3-module6-section3-1",
  },
  {
    number: "3.2",
    title: "Characteristics of Protective Devices (Icn, Ics, In, curve types)",
    description: "Understanding protective device characteristics and their application in design",
    icon: Settings,
    href: "../level3-module6-section3-2",
  },
  {
    number: "3.3",
    title: "Consumer Units and Distribution Boards",
    description: "Selecting appropriate consumer units and distribution boards for installations",
    icon: Box,
    href: "../level3-module6-section3-3",
  },
  {
    number: "3.4",
    title: "Earthing and Bonding Arrangements (TN-S, TN-C-S, TT)",
    description: "Designing appropriate earthing and bonding arrangements for different supply systems",
    icon: Target,
    href: "../level3-module6-section3-4",
  },
  {
    number: "3.5",
    title: "Selection of Accessories, Enclosures, and Equipment for Environment",
    description: "Choosing appropriate accessories and equipment based on environmental conditions",
    icon: Package,
    href: "../level3-module6-section3-5",
  },
];

const Level3Module6Section3 = () => {
  useSEO(
    "Section 3: Selection of Protective Devices and Equipment - Level 3 Module 6",
    "Choosing appropriate protective devices, equipment and accessories for electrical installations"
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Selection of Protective Devices and Equipment
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Choosing appropriate protective devices, equipment and accessories for electrical installations
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers protective device selection including MCBs, fuses and RCBOs,
              device characteristics, consumer units and distribution boards,
              earthing arrangements, and equipment selection for environmental conditions.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
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
        </section>
        </div>
      </div>
    </div>
  );
};

export default Level3Module6Section3;

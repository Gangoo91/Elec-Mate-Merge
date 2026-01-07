import { ArrowLeft, Lightbulb, Zap, Power, Settings, BarChart3 } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Energy-efficient lighting (LED, controls, sensors)",
    description: "LED technology, lighting controls and automatic sensor systems for energy savings",
    icon: Lightbulb,
    href: "../level3-module2-section2-1",
  },
  {
    number: "2.2",
    title: "Power factor correction",
    description: "Understanding and implementing power factor correction for improved efficiency",
    icon: Zap,
    href: "../level3-module2-section2-2",
  },
  {
    number: "2.3",
    title: "Reducing standby consumption (smart devices, timers)",
    description: "Minimising standby power consumption through smart devices and timer controls",
    icon: Power,
    href: "../level3-module2-section2-3",
  },
  {
    number: "2.4",
    title: "Load management and diversity in design",
    description: "Optimising electrical load distribution and applying diversity factors in design",
    icon: Settings,
    href: "../level3-module2-section2-4",
  },
  {
    number: "2.5",
    title: "Smart meters and monitoring systems",
    description: "Smart metering technology and energy monitoring systems for consumption tracking",
    icon: BarChart3,
    href: "../level3-module2-section2-5",
  },
];

const Level3Module2Section2 = () => {
  useSEO(
    "Section 2: Energy Efficiency in Electrical Installations - Level 3 Module 2",
    "Techniques and technologies for improving energy efficiency in electrical systems"
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Efficiency in Electrical Installations
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Techniques and technologies for improving energy efficiency in electrical systems
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers energy efficiency techniques including LED lighting and controls,
              power factor correction, reducing standby consumption, load management and diversity,
              and smart metering and monitoring systems.
            </p>
          </div>
        </section>

        {/* Subsections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Subsections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
  );
};

export default Level3Module2Section2;

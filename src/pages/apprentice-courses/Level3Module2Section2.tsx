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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
        

        

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

export default Level3Module2Section2;

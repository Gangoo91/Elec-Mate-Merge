import { ArrowLeft, Lightbulb, Zap, Power, Settings, BarChart3 } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 2: Energy Efficiency in Electrical Installations
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Techniques and technologies for improving energy efficiency in electrical systems
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

export default Level3Module2Section2;
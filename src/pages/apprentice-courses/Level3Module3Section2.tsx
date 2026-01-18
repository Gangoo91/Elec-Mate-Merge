import { ArrowLeft, Zap, Cpu, CircuitBoard, Waves, TrendingUp, Radio } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const subsections = [
  {
    number: "2.1",
    title: "Pure Resistance Circuits",
    description: "Resistive circuits in AC and DC applications, power dissipation and heating effects",
    icon: Zap,
    href: "../level3-module3-section2-1",
  },
  {
    number: "2.2",
    title: "Pure Inductance Circuits",
    description: "Inductive reactance, energy storage in magnetic fields and phase relationships",
    icon: Cpu,
    href: "../level3-module3-section2-2",
  },
  {
    number: "2.3",
    title: "Pure Capacitance Circuits",
    description: "Capacitive reactance, energy storage in electric fields and charging/discharging",
    icon: CircuitBoard,
    href: "../level3-module3-section2-3",
  },
  {
    number: "2.4",
    title: "RL, RC and RLC Combinations",
    description: "Series and parallel combinations of resistance, inductance and capacitance",
    icon: Waves,
    href: "../level3-module3-section2-4",
  },
  {
    number: "2.5",
    title: "Phase Angle and Power Factor",
    description: "Understanding phase relationships and power factor in reactive circuits",
    icon: TrendingUp,
    href: "../level3-module3-section2-5",
  },
  {
    number: "2.6",
    title: "Resonance in AC Circuits",
    description: "Series and parallel resonance, frequency response and practical applications",
    icon: Radio,
    href: "../level3-module3-section2-6",
  },
];

const Level3Module3Section2 = () => {
  useSEO(
    "Section 2: Resistive, Inductive and Capacitive Circuits - Level 3 Module 3",
    "Pure circuits, combinations, phase angle, power factor and resonance"
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
            <Link to="/study-centre/apprentice/level3-module3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
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
            <span>Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Resistive, Inductive and Capacitive Circuits
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Explore the behaviour of pure and combined reactive components in AC circuits, including phase relationships and resonance effects
          </p>
        </header>

        {/* Section Overview */}
        <section className="mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Section Overview</p>
            <p className="text-sm text-white">
              This section covers the behaviour of resistive, inductive and capacitive circuits including
              pure component circuits, RL, RC and RLC combinations, phase angle and power factor,
              and resonance in AC circuits.
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

export default Level3Module3Section2;

import { ArrowLeft, Zap, Cpu, CircuitBoard, Waves, TrendingUp, Radio } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "2.1",
    title: "Pure Resistance Circuits",
    description: "Resistive circuits in AC and DC applications, power dissipation and heating effects",
    icon: Zap,
    href: "../level3-module3-section2-2-1",
  },
  {
    number: "2.2", 
    title: "Pure Inductance Circuits",
    description: "Inductive reactance, energy storage in magnetic fields and phase relationships",
    icon: Cpu,
    href: "../level3-module3-section2-2-2",
  },
  {
    number: "2.3",
    title: "Pure Capacitance Circuits",
    description: "Capacitive reactance, energy storage in electric fields and charging/discharging",
    icon: CircuitBoard,
    href: "../level3-module3-section2-2-3",
  },
  {
    number: "2.4",
    title: "RL, RC and RLC Combinations",
    description: "Series and parallel combinations of resistance, inductance and capacitance",
    icon: Waves,
    href: "../level3-module3-section2-2-4",
  },
  {
    number: "2.5",
    title: "Phase Angle and Power Factor",
    description: "Understanding phase relationships and power factor in reactive circuits",
    icon: TrendingUp,
    href: "../level3-module3-section2-2-5",
  },
  {
    number: "2.6",
    title: "Resonance in AC Circuits",
    description: "Series and parallel resonance, frequency response and practical applications",
    icon: Radio,
    href: "../level3-module3-section2-2-6",
  },
];

const Level3Module3Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../level3-module3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Section 2 - Resistive, Inductive and Capacitive Circuits
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Explore the behaviour of pure and combined reactive components in AC circuits, including phase relationships and resonance effects
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

export default Level3Module3Section2;
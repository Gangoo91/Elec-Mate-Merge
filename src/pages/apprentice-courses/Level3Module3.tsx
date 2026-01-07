import { ArrowLeft, Calculator, Zap, Magnet, Activity, Battery, Cable, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";

const sections = [
  {
    number: "Section 1",
    title: "Electrical Units and Measurements",
    description: "Ohm's Law, electrical quantities, measurement instruments, accuracy and SI units",
    icon: Calculator,
    href: "../level3-module3-section1",
  },
  {
    number: "Section 2",
    title: "Resistive, Inductive and Capacitive Circuits",
    description: "Pure circuits, combinations, phase angle, power factor and resonance",
    icon: Zap,
    href: "../level3-module3-section2",
  },
  {
    number: "Section 3",
    title: "Electromagnetic Principles",
    description: "Magnetic fields, electromagnetic induction, transformers and rotating machines",
    icon: Magnet,
    href: "../level3-module3-section3",
  },
  {
    number: "Section 4",
    title: "AC Theory and Waveforms",
    description: "AC waveforms, phasor diagrams, impedance, power and harmonics",
    icon: Activity,
    href: "../level3-module3-section4",
  },
  {
    number: "Section 5",
    title: "Electrical Power and Energy",
    description: "Power equations, efficiency, energy consumption and efficiency in installations",
    icon: Battery,
    href: "../level3-module3-section5",
  },
  {
    number: "Section 6",
    title: "Cables and Conductors",
    description: "Conductor materials, resistance, current-carrying capacity and thermal effects",
    icon: Cable,
    href: "../level3-module3-section6",
  },
];

const learningOutcomes = [
  "Apply Ohm's Law and calculate electrical quantities accurately",
  "Analyse resistive, inductive and capacitive circuits",
  "Understand electromagnetic principles and their applications",
  "Work with AC waveforms, phasor diagrams and impedance calculations",
  "Calculate electrical power, energy and system efficiency",
  "Select appropriate cables based on current-carrying capacity",
];

const Level3Module3 = () => {
  useSEO(
    "Module 3: Electrical Science - Level 3 Electrical Course",
    "Advanced electrical theory, AC/DC circuits, and complex electrical calculations for Level 3 qualification"
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
            <Link to="../level3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Level 3
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
            <span>Module 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Science Principles
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto">
            Advanced electrical theory, AC/DC circuits, and complex electrical calculations for Level 3 qualification
          </p>
        </header>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {learningOutcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Sections Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-6">Module Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <ModuleCard
                key={index}
                number={section.number}
                title={section.title}
                description={section.description}
                icon={section.icon}
                href={section.href}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Level3Module3;

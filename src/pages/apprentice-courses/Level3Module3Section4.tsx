import { ArrowLeft, Activity, Clock, TrendingUp, Zap, Battery, Radio } from "lucide-react";
import { ModuleCard } from "@/components/apprentice-courses/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const subsections = [
  {
    number: "4.1",
    title: "AC Waveforms",
    description: "Alternating current and voltage waveforms, generation and characteristics",
    icon: Activity,
    href: "../level3-module3-section4-4-1",
  },
  {
    number: "4.2", 
    title: "Frequency, Period and Amplitude",
    description: "Time-based parameters, RMS and peak values in AC systems",
    icon: Clock,
    href: "../level3-module3-section4-4-2",
  },
  {
    number: "4.3",
    title: "Phasor Diagrams and Vectors",
    description: "Vector representation of AC quantities and phasor diagram construction",
    icon: TrendingUp,
    href: "../level3-module3-section4-4-3",
  },
  {
    number: "4.4",
    title: "Impedance and Admittance",
    description: "Complex impedance in AC circuits and admittance calculations",
    icon: Zap,
    href: "../level3-module3-section4-4-4",
  },
  {
    number: "4.5",
    title: "Power in AC Circuits",
    description: "True power, reactive power, apparent power and power triangles",
    icon: Battery,
    href: "../level3-module3-section4-4-5",
  },
  {
    number: "4.6",
    title: "Harmonics and Waveform Distortion",
    description: "Harmonic content, THD and the effects of non-linear loads",
    icon: Radio,
    href: "../level3-module3-section4-4-6",
  },
];

const Level3Module3Section4 = () => {
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
            Section 4 - AC Theory and Waveforms
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Master AC circuit analysis, waveform interpretation, phasor diagrams and power calculations in complex AC systems
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

export default Level3Module3Section4;
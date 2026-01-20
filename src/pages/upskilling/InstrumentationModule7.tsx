import { ArrowLeft, Cable, Power, Calculator, Palette, Shield, Wrench, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const InstrumentationModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "What Is a 4–20mA Loop and Why It's Used",
      icon: Cable,
      description: "Understanding the 4-20mA current loop standard and its advantages"
    },
    {
      id: 2,
      title: "Loop-Powered vs Externally Powered Devices",
      icon: Power,
      description: "Different power supply configurations for instrumentation loops"
    },
    {
      id: 3,
      title: "Loop Design and Load Calculations",
      icon: Calculator,
      description: "Designing current loops and calculating power requirements"
    },
    {
      id: 4,
      title: "Wiring Standards and Colour Coding",
      icon: Palette,
      description: "Industry standards for instrumentation wiring and identification"
    },
    {
      id: 5,
      title: "Barriers, Isolators, and Intrinsically Safe Loops",
      icon: Shield,
      description: "Safety devices and intrinsically safe system design"
    },
    {
      id: 6,
      title: "Loop Testing Tools (Loop Calibrators, Simulators, Multimeters)",
      icon: Wrench,
      description: "Equipment and techniques for testing current loops"
    },
    {
      id: 7,
      title: "Common Wiring Faults and Loop Integrity Checks",
      icon: AlertTriangle,
      description: "Troubleshooting wiring problems and verifying loop integrity"
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/instrumentation-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Instrumentation Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Module Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 7</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">7 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Instrumentation Wiring and 4–20mA Loops
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding current loop systems, wiring standards, and testing procedures
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../instrumentation-module-7-section-${section.id}`}
              sectionNumber={section.id}
              title={section.title}
              description={section.description}
              icon={section.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule7;

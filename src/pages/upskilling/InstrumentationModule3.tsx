import { ArrowLeft, Zap, BarChart, Filter, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const InstrumentationModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "Signal Types: Voltage, Current, Resistance, Frequency",
      icon: Zap,
      description: "Understanding different types of electrical signals used in instrumentation"
    },
    {
      id: 2,
      title: "Standard Ranges: 4–20mA, 0–10V, Pulse Signals",
      icon: BarChart,
      description: "Industry standard signal ranges and their applications"
    },
    {
      id: 3,
      title: "Signal Conditioning: Filtering, Isolation, Amplification",
      icon: Filter,
      description: "Techniques for processing and conditioning instrumentation signals"
    },
    {
      id: 4,
      title: "Signal Scaling, Conversions, and Error Introduction",
      icon: Settings,
      description: "Converting between signal types and understanding error sources"
    },
    {
      id: 5,
      title: "Signal Integrity: Noise, Ground Loops, and Shielding",
      icon: Shield,
      description: "Maintaining signal quality and preventing interference"
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/upskilling/instrumentation-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Signal Types, Conditioning, and Scaling
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding signal types, conditioning techniques, and scaling methods
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../instrumentation-module-3-section-${section.id}`}
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

export default InstrumentationModule3;

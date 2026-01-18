import { ArrowLeft, Gauge, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const InstrumentationModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Difference Between Sensors and Transducers",
      icon: Gauge,
      description: "Understanding the distinction and relationship between sensors and transducers in instrumentation systems"
    },
    {
      id: 2,
      title: "Temperature Sensors – Thermocouples, RTDs, Thermistors",
      icon: Thermometer,
      description: "Comprehensive guide to temperature measurement devices, their principles, and applications"
    },
    {
      id: 3,
      title: "Pressure and Flow Sensors",
      icon: Gauge,
      description: "Understanding pressure and flow measurement for fluid and gas systems"
    },
    {
      id: 4,
      title: "Level, Position, and Proximity Sensors",
      icon: Gauge,
      description: "Understanding spatial awareness sensors for level detection, positioning, and proximity monitoring"
    },
    {
      id: 5,
      title: "Digital vs Analog Sensor Output",
      icon: Gauge,
      description: "Understanding output types and their implications for signal processing and system integration"
    },
    {
      id: 6,
      title: "Choosing the Right Sensor for the Application",
      icon: Gauge,
      description: "Decision-making framework for sensor selection based on technical and environmental criteria"
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
            <Link to="/study-centre/upskilling/instrumentation-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">55 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Sensors and Transducers Explained
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding the function, types, and selection of sensors and transducers in electrical instrumentation
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../instrumentation-module-2-section-${section.id}`}
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

export default InstrumentationModule2;

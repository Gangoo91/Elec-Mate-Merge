import { ArrowLeft, Zap, BarChart, Target, Gauge, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const InstrumentationModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Measuring Voltage, Current, and Resistance",
      icon: Zap,
      description: "Fundamental electrical measurements and techniques"
    },
    {
      id: 2,
      title: "Frequency and Time-Based Measurements",
      icon: BarChart,
      description: "Measuring frequency, period, and time-based parameters"
    },
    {
      id: 3,
      title: "Instrument Accuracy, Resolution, and Error",
      icon: Target,
      description: "Understanding measurement precision and error sources"
    },
    {
      id: 4,
      title: "Measurement Equipment: Multimeters, Clamp Meters, Oscilloscopes",
      icon: Gauge,
      description: "Overview of common electrical measurement instruments"
    },
    {
      id: 5,
      title: "Interpreting and Logging Readings in Real-World Systems",
      icon: FileText,
      description: "Practical application of measurements in industrial systems"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Measurement of Electrical Quantities
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Techniques and equipment for measuring electrical parameters
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../instrumentation-module-4-section-${section.id}`}
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

export default InstrumentationModule4;

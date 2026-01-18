import { ArrowLeft, RotateCcw, Settings, TrendingUp, AlertTriangle, Gauge, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const InstrumentationModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Open Loop vs Closed Loop Systems",
      icon: RotateCcw,
      description: "Understanding the difference between open and closed loop control systems"
    },
    {
      id: 2,
      title: "Components of a Control Loop: PV, Setpoint, Output",
      icon: Settings,
      description: "Key components and their roles in control loop operation"
    },
    {
      id: 3,
      title: "PID Control Basics (Proportional, Integral, Derivative)",
      icon: TrendingUp,
      description: "Understanding PID control principles and tuning"
    },
    {
      id: 4,
      title: "Common Loop Faults: Hunting, Overshoot, Lag",
      icon: AlertTriangle,
      description: "Identifying and troubleshooting common control loop problems"
    },
    {
      id: 5,
      title: "Loop Tuning and Stability Considerations",
      icon: Gauge,
      description: "Techniques for optimizing control loop performance"
    },
    {
      id: 6,
      title: "Examples: HVAC, Pressure Systems, and Motor Speed Control",
      icon: PlayCircle,
      description: "Real-world applications of control loops in different systems"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">65 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Control Loops and Feedback Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding control theory and feedback systems in instrumentation
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../instrumentation-module-5-section-${section.id}`}
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

export default InstrumentationModule5;

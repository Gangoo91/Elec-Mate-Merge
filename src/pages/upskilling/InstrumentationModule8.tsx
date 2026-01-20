import { ArrowLeft, Search, AlertTriangle, Wrench, Clipboard, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const InstrumentationModule8 = () => {
  const sections = [
    {
      id: 1,
      title: "Systematic Approach to Fault Diagnosis",
      icon: Search,
      description: "Methodical troubleshooting techniques for instrumentation systems"
    },
    {
      id: 2,
      title: "Symptoms of Sensor, Loop, or Signal Failure",
      icon: AlertTriangle,
      description: "Identifying common failure modes and their symptoms"
    },
    {
      id: 3,
      title: "Using Loop Calibrators and Simulators for Diagnostics",
      icon: Wrench,
      description: "Practical use of test equipment for fault finding"
    },
    {
      id: 4,
      title: "Preventive Maintenance Routines",
      icon: Clipboard,
      description: "Scheduled maintenance to prevent system failures"
    },
    {
      id: 5,
      title: "Documenting Faults and Generating Service Reports",
      icon: FileText,
      description: "Proper documentation and reporting procedures"
    },
    {
      id: 6,
      title: "Safety Considerations During Troubleshooting",
      icon: Shield,
      description: "Safe working practices when diagnosing faults"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 8</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fault Finding, Diagnostics, and Maintenance
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Systematic approaches to troubleshooting and maintaining instrumentation systems
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../instrumentation-module-8-section-${section.id}`}
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

export default InstrumentationModule8;

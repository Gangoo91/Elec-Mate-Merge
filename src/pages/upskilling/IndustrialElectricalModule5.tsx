import { ArrowLeft, Search, Zap, TestTube, FileSearch, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const IndustrialElectricalModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Fault-Finding Strategies and Logic Flow",
      icon: Search,
      description: "Systematic approach to industrial fault diagnosis"
    },
    {
      id: 2,
      title: "Common Control Faults (Coils, Relays, Power)",
      icon: Zap,
      description: "Typical control system failures and diagnosis"
    },
    {
      id: 3,
      title: "Loop Testing and Continuity",
      icon: TestTube,
      description: "Circuit testing and continuity verification"
    },
    {
      id: 4,
      title: "PLC Diagnostics and Alarms",
      icon: FileSearch,
      description: "PLC system diagnostics and alarm analysis"
    },
    {
      id: 5,
      title: "Root Cause Analysis and Reporting",
      icon: FileCheck,
      description: "Investigation methods and documentation"
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
            <Link to="/electrician/upskilling/industrial-electrical-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Industrial Electrical Course
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
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">65 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Industrial Fault Finding and Troubleshooting
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Fault diagnosis, troubleshooting, and root cause analysis
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../industrial-electrical-module-5-section-${section.id}`}
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

export default IndustrialElectricalModule5;

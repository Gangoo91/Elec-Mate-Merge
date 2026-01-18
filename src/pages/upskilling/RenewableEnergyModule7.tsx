import { ArrowLeft, Wrench, CheckCircle, Calendar, Search, Gauge, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const RenewableEnergyModule7 = () => {
  const sections = [
    {
      id: 1,
      title: "Installation Best Practices (DC Safety, Cable Management, Earth Bonding)",
      icon: Wrench,
      description: "Safe installation procedures and best practices for renewable systems"
    },
    {
      id: 2,
      title: "Commissioning Checks: Voltage, Insulation, Functional Testing",
      icon: CheckCircle,
      description: "Essential commissioning tests and verification procedures"
    },
    {
      id: 3,
      title: "Maintenance Schedules (Visual, Electrical, Firmware)",
      icon: Calendar,
      description: "Planned maintenance schedules and inspection requirements"
    },
    {
      id: 4,
      title: "Fault-Finding in PV, Battery, and Inverter Systems",
      icon: Search,
      description: "Systematic approaches to troubleshooting renewable energy systems"
    },
    {
      id: 5,
      title: "Using Meters, Test Equipment, and Diagnostics",
      icon: Gauge,
      description: "Testing equipment and diagnostic tools for system analysis"
    },
    {
      id: 6,
      title: "Safety, Isolation, and Working Live Considerations",
      icon: Shield,
      description: "Safety procedures and isolation requirements for live systems"
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
            <Link to="/electrician/upskilling/renewable-energy-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Renewable Energy Course
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
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">70 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Installation, Maintenance, and Troubleshooting
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Practical installation, maintenance, and fault-finding procedures
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../renewable-energy-module-7-section-${section.id}`}
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

export default RenewableEnergyModule7;

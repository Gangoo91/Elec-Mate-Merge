import { ArrowLeft, Zap, Target, Settings, Wifi, FileCheck, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const RenewableEnergyModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Inverter Types: String, Central, Hybrid, Micro",
      icon: Zap,
      description: "Understanding different inverter technologies and their applications"
    },
    {
      id: 2,
      title: "MPPT Tracking and Sizing for PV Arrays",
      icon: Target,
      description: "Maximum Power Point Tracking and inverter sizing calculations"
    },
    {
      id: 3,
      title: "Grid-Tied vs Off-Grid vs Hybrid Configurations",
      icon: Settings,
      description: "Different system configurations and their operational characteristics"
    },
    {
      id: 4,
      title: "Synchronisation, Anti-Islanding, and Export Limits",
      icon: Wifi,
      description: "Grid synchronisation and safety protection systems"
    },
    {
      id: 5,
      title: "G98/G99 Compliance and DNO Notifications",
      icon: FileCheck,
      description: "UK grid connection standards and notification procedures"
    },
    {
      id: 6,
      title: "Monitoring Platforms and Remote Management",
      icon: Monitor,
      description: "System monitoring and remote management technologies"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">65 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Inverter Technology and Grid Integration
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding inverter technologies and grid connection requirements
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../renewable-energy-module-5-section-${section.id}`}
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

export default RenewableEnergyModule5;

import { ArrowLeft, Settings, Zap, Activity, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const EVChargingModule5 = () => {
  const sections = [
    {
      id: 1,
      title: "Dynamic Load Management (DLM)",
      icon: Settings,
      description: "Implementing intelligent load management systems"
    },
    {
      id: 2,
      title: "EV/PV/Battery Integration via HEMS",
      icon: Zap,
      description: "Integrating charging with renewable energy and storage"
    },
    {
      id: 3,
      title: "CT Clamps, Load-Sensing, and Control Logic",
      icon: Activity,
      description: "Monitoring and control technology for load management"
    },
    {
      id: 4,
      title: "Off-Peak Charging Strategies",
      icon: Clock,
      description: "Optimising charging times for cost and grid impact"
    },
    {
      id: 5,
      title: "Multiple Unit Coordination (Flats/Shared Sites)",
      icon: Users,
      description: "Managing charging across multi-unit developments"
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
            <Link to="/electrician/upskilling/ev-charging-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to EV Charging Course
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
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Load Management and Diversity in EV Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Advanced load management and system integration strategies
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../ev-charging-module-5-section-${section.id}`}
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

export default EVChargingModule5;

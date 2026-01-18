import { ArrowLeft, Wind, Gauge, Clock, Battery, Power, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BMSModule3 = () => {
  const sections = [
    {
      id: 1,
      title: "HVAC Systems in BMS (AHU, FCU, Chillers, Boilers)",
      icon: Wind,
      description: "HVAC equipment integration and control"
    },
    {
      id: 2,
      title: "Control Strategies: Temperature, Pressure, Flow",
      icon: Gauge,
      description: "Process control methods and strategies"
    },
    {
      id: 3,
      title: "Time Scheduling and Occupancy Programming",
      icon: Clock,
      description: "Automated scheduling and occupancy control"
    },
    {
      id: 4,
      title: "Demand-Based Control and Load Shedding",
      icon: Battery,
      description: "Energy optimization and load management"
    },
    {
      id: 5,
      title: "Override Functions and Seasonal Settings",
      icon: Power,
      description: "Manual overrides and seasonal adjustments"
    },
    {
      id: 6,
      title: "Alarm Responses and Safety Shutdowns",
      icon: AlertTriangle,
      description: "Emergency procedures and safety systems"
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
            <Link to="/study-centre/upskilling/bms-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to BMS Course
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
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">65 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            HVAC Integration and Scheduling Logic
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            HVAC control strategies and scheduling systems
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bms-module-3-section-${section.id}`}
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

export default BMSModule3;

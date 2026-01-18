import { ArrowLeft, Cpu, Route, Activity, Network, Monitor, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const IndustrialElectricalModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "PLC Architecture and Inputs/Outputs",
      icon: Cpu,
      description: "PLC system architecture and I/O configuration"
    },
    {
      id: 2,
      title: "Ladder Logic and Function Blocks",
      icon: Route,
      description: "Programming languages and logic development"
    },
    {
      id: 3,
      title: "Sensor/Actuator Integration",
      icon: Activity,
      description: "Field device integration and interfacing"
    },
    {
      id: 4,
      title: "Industrial Protocols (Modbus, Profibus, Ethernet/IP)",
      icon: Network,
      description: "Communication protocols and networking"
    },
    {
      id: 5,
      title: "SCADA and HMI Introduction",
      icon: Monitor,
      description: "Supervisory control and human machine interfaces"
    },
    {
      id: 6,
      title: "Safety PLC and Machine Guarding",
      icon: Shield,
      description: "Safety systems and machine protection"
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
            <Link to="/study-centre/upskilling/industrial-electrical-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 4</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">70 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            PLC Basics and System Integration
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Programmable logic controllers and automation systems
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../industrial-electrical-module-4-section-${section.id}`}
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

export default IndustrialElectricalModule4;

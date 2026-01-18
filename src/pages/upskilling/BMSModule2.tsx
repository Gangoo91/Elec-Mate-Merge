import { ArrowLeft, ToggleLeft, Thermometer, Settings, MapPin, Cable, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const BMSModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Digital vs Analog Inputs and Outputs",
      icon: ToggleLeft,
      description: "Signal types and processing methods"
    },
    {
      id: 2,
      title: "Types of Sensors: Temperature, Humidity, CO2, Occupancy",
      icon: Thermometer,
      description: "Sensor technologies and applications"
    },
    {
      id: 3,
      title: "Actuators, Valves, and Dampers",
      icon: Settings,
      description: "Control devices and mechanical components"
    },
    {
      id: 4,
      title: "Sensor Placement and Accuracy Considerations",
      icon: MapPin,
      description: "Installation best practices"
    },
    {
      id: 5,
      title: "I/O Modules and Expansion Devices",
      icon: Cable,
      description: "Input/output expansion and connectivity"
    },
    {
      id: 6,
      title: "Cabling, Interference, and Shielding Practices",
      icon: Shield,
      description: "Signal integrity and protection methods"
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
            <Link to="/electrician/upskilling/bms-course">
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">6 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Control Devices and Field Sensors
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Field devices, sensors, and control equipment
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../bms-module-2-section-${section.id}`}
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

export default BMSModule2;

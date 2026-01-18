import { ArrowLeft, Thermometer, MapPin, Gauge, Calendar, Building, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const SmartHomeModule4 = () => {
  const sections = [
    {
      id: 1,
      title: "Smart Thermostats and Room Zoning",
      icon: Thermometer,
      description: "Installing and configuring smart heating controls"
    },
    {
      id: 2,
      title: "Radiator Valves, Boilers, and Heat Pumps",
      icon: MapPin,
      description: "Integrating with different heating system types"
    },
    {
      id: 3,
      title: "Environmental Sensors (Humidity, CO2, Air Quality)",
      icon: Gauge,
      description: "Monitoring and responding to environmental conditions"
    },
    {
      id: 4,
      title: "Schedule vs AI Learning Control",
      icon: Calendar,
      description: "Different approaches to heating automation"
    },
    {
      id: 5,
      title: "HVAC Integration and Interlocks",
      icon: Building,
      description: "Connecting heating systems with other building services"
    },
    {
      id: 6,
      title: "BMS Light Integration for Larger Sites",
      icon: Network,
      description: "Scaling up to building management system integration"
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
            <Link to="/electrician/upskilling/smart-home-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Smart Home Course
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
            <span className="text-white/60 text-xs">60 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Heating, HVAC, and Environmental Control
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Smart heating systems and environmental monitoring
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../smart-home-module-4-section-${section.id}`}
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

export default SmartHomeModule4;

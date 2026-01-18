import { ArrowLeft, Gauge, Plug, Smartphone, Cable, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';

const EVChargingModule2 = () => {
  const sections = [
    {
      id: 1,
      title: "Mode 1–4 and Charging Speeds",
      icon: Gauge,
      description: "Understanding charging modes and power levels"
    },
    {
      id: 2,
      title: "Socketed vs Tethered EVSE",
      icon: Plug,
      description: "Different EVSE connection types and their applications"
    },
    {
      id: 3,
      title: "Smart Chargers, App Control, and APIs",
      icon: Smartphone,
      description: "Connected charging systems and remote management"
    },
    {
      id: 4,
      title: "IEC 61851, 62196 Connectors",
      icon: Cable,
      description: "International charging standards and connector types"
    },
    {
      id: 5,
      title: "Compatibility by Manufacturer (BMW, Tesla, etc.)",
      icon: Car,
      description: "Vehicle-specific charging requirements and compatibility"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 2</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">5 Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">50 mins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            EVSE Types, Modes, and Standards
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding charging equipment types and international standards
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../ev-charging-module-2-section-${section.id}`}
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

export default EVChargingModule2;

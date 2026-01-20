import { ArrowLeft, Battery, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 4: Power Supply, Backup & Cabling - Fire Alarm Course";
const DESCRIPTION = "Learn about primary and secondary power supplies, battery sizing, cable types, fire resistance ratings and wiring methods for fire alarm systems.";

const FireAlarmModule4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Primary Power Supplies",
      icon: CheckCircle,
      description: "Mains supply requirements and protection"
    },
    {
      id: 2,
      title: "Secondary Power & Battery Sizing",
      icon: CheckCircle,
      description: "Standby battery requirements and calculations"
    },
    {
      id: 3,
      title: "Cable Types & Fire Resistance",
      icon: CheckCircle,
      description: "Standard, enhanced and fire-resistant cables"
    },
    {
      id: 4,
      title: "Wiring Methods & Protection",
      icon: CheckCircle,
      description: "Installation methods and segregation"
    },
    {
      id: 5,
      title: "Earth Fault Monitoring",
      icon: CheckCircle,
      description: "Class A and Class B circuits"
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
            <Link to="/electrician/upskilling/fire-alarm-course">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fire Alarm Course
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
            <span className="text-white/60 text-xs">{sections.length} Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">2-3 hours</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Battery className="h-7 w-7 text-elec-yellow" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Power Supply, Backup & Cabling
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding power supply requirements, battery sizing calculations and cable selection for fire alarm installations.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`section-${section.id}`}
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

export default FireAlarmModule4;

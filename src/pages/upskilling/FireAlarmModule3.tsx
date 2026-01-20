import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 3: System Design & Zone Planning - Fire Alarm Course";
const DESCRIPTION = "Learn about zone design, addressable systems, cause and effect programming, and interface design for fire alarm systems.";

const FireAlarmModule3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Zone Design Principles",
      icon: CheckCircle,
      description: "Zone layouts, floor areas and search distances"
    },
    {
      id: 2,
      title: "Addressable vs Conventional",
      icon: CheckCircle,
      description: "System architectures and loop design"
    },
    {
      id: 3,
      title: "Cause & Effect Programming",
      icon: CheckCircle,
      description: "Input/output relationships and staged alarms"
    },
    {
      id: 4,
      title: "Interface Design",
      icon: CheckCircle,
      description: "Integration with BMS, access control and lifts"
    },
    {
      id: 5,
      title: "Network & Multi-Panel Systems",
      icon: CheckCircle,
      description: "Networked panels and redundancy"
    },
    {
      id: 6,
      title: "Design Documentation",
      icon: CheckCircle,
      description: "Specifications, drawings and schedules"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 3</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">{sections.length} Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">3-4 hours</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
              <MapPin className="h-7 w-7 text-elec-yellow" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            System Design & Zone Planning
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Designing effective zone layouts, selecting system architectures and programming cause & effect relationships.
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

export default FireAlarmModule3;

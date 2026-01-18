import { ArrowLeft, Wrench, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 5: Installation & Commissioning - Fire Alarm Course";
const DESCRIPTION = "Learn about fire alarm installation procedures, wiring methods, commissioning processes and handover requirements.";

const FireAlarmModule5 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "Pre-Installation Planning",
      icon: CheckCircle,
      description: "Site surveys, coordination and logistics"
    },
    {
      id: 2,
      title: "Control Panel Installation",
      icon: CheckCircle,
      description: "Panel positioning and terminations"
    },
    {
      id: 3,
      title: "Device Installation",
      icon: CheckCircle,
      description: "Detector mounting and MCP positioning"
    },
    {
      id: 4,
      title: "Wiring & Terminations",
      icon: CheckCircle,
      description: "Cable installation and testing"
    },
    {
      id: 5,
      title: "Commissioning Procedures",
      icon: CheckCircle,
      description: "System setup and device testing"
    },
    {
      id: 6,
      title: "Handover & Documentation",
      icon: CheckCircle,
      description: "Client training and O&M manuals"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 5</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">{sections.length} Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">3-4 hours</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Wrench className="h-7 w-7 text-elec-yellow" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Installation & Commissioning
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Practical guidance on installing fire alarm systems, from planning through to commissioning and handover.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fire-alarm-module-5-section-${section.id}`}
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

export default FireAlarmModule5;

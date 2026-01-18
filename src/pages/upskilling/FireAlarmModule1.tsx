import { ArrowLeft, Layers, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Module 1: Categories of Fire Alarm Systems - Fire Alarm Course";
const DESCRIPTION = "Learn about L, P, and M fire alarm system categories under BS 5839-1, their applications, and how to select the right category for different building types.";

const FireAlarmModule1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const sections = [
    {
      id: 1,
      title: "L Category Systems (Life Safety)",
      icon: CheckCircle,
      description: "L1-L5 categories for life protection"
    },
    {
      id: 2,
      title: "P Category Systems (Property)",
      icon: CheckCircle,
      description: "P1 and P2 for property protection"
    },
    {
      id: 3,
      title: "M Category Systems (Manual)",
      icon: CheckCircle,
      description: "Manual-only systems and call points"
    },
    {
      id: 4,
      title: "Category Selection & Risk Assessment",
      icon: CheckCircle,
      description: "Choosing based on building use and risk"
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
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">{sections.length} Sections</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-white/60 text-xs">2-3 hours</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Layers className="h-7 w-7 text-elec-yellow" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Categories of Fire Alarm Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Understanding L, P, and M categories under BS 5839-1 and how to select the appropriate system for different applications.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              to={`../fire-alarm-module-1-section-${section.id}`}
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

export default FireAlarmModule1;

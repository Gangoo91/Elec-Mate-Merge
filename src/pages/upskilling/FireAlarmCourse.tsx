import React from 'react';
import { ArrowLeft, Flame, Layers, Search, MapPin, Battery, Wrench, FileCheck, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

const TITLE = "Fire Alarm Systems Course - Electrical Upskilling";
const DESCRIPTION = "Master fire alarm system design, installation and maintenance with our comprehensive BS 5839 compliant course. 7 modules covering system categories, detectors, zone planning, installation, testing and certification.";

const FireAlarmCourse = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  const modules: Array<{
    id: number;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Categories of Fire Alarm Systems",
      description: "L, P, and M categories under BS 5839-1",
      duration: "2-3 hours",
      icon: Layers
    },
    {
      id: 2,
      title: "Detectors, Call Points & Devices",
      description: "Smoke, heat, multisensor detectors and alarms",
      duration: "3-4 hours",
      icon: Search
    },
    {
      id: 3,
      title: "System Design & Zone Planning",
      description: "Zone layouts and addressable systems",
      duration: "3-4 hours",
      icon: MapPin
    },
    {
      id: 4,
      title: "Power Supply, Backup & Cabling",
      description: "Battery sizing and fire-resistant cables",
      duration: "2-3 hours",
      icon: Battery
    },
    {
      id: 5,
      title: "Installation & Commissioning",
      description: "Installation procedures and handover",
      duration: "3-4 hours",
      icon: Wrench
    },
    {
      id: 6,
      title: "Testing, Servicing & Certification",
      description: "Routine testing and maintenance schedules",
      duration: "3-4 hours",
      icon: FileCheck
    },
    {
      id: 7,
      title: "Regulatory Compliance & BS 5839",
      description: "Fire safety legislation and standards",
      duration: "2-3 hours",
      icon: BookOpen
    },
    {
      id: 8,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "90 mins",
      icon: GraduationCap,
      isExam: true
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
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
              <Flame className="h-7 w-7 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Fire Alarm Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Master fire detection and alarm system design, installation and maintenance to BS 5839-1 and BS 5839-6.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../fire-alarm-mock-exam` : `../fire-alarm-module-${module.id}`}
              moduleNumber={module.id}
              title={module.title}
              description={module.description}
              duration={module.duration}
              icon={module.icon}
              isExam={module.isExam}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FireAlarmCourse;

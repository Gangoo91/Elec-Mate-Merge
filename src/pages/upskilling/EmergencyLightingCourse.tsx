import React from 'react';
import { ArrowLeft, BookOpen, Layers, MapPin, Battery, Wrench, FileCheck, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const EmergencyLightingCourse = () => {
  const modules: Array<{
    id: number | string;
    title: string;
    description: string;
    duration: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    isExam?: boolean;
  }> = [
    {
      id: 1,
      title: "Introduction to Emergency Lighting",
      description: "Purpose, legal framework, and system fundamentals",
      duration: "40 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "System Categories and Lighting Types",
      description: "Emergency lighting categories and applications",
      duration: "45 mins",
      icon: Layers
    },
    {
      id: 3,
      title: "Design Requirements and Placement",
      description: "Technical design criteria and positioning",
      duration: "50 mins",
      icon: MapPin
    },
    {
      id: 4,
      title: "Cabling, Battery Backup, and Circuiting",
      description: "Power supply systems and circuit design",
      duration: "55 mins",
      icon: Battery
    },
    {
      id: 5,
      title: "Installation, Testing, and Maintenance",
      description: "Complete testing procedures and protocols",
      duration: "50 mins",
      icon: Wrench
    },
    {
      id: 6,
      title: "Regulatory Compliance and BS 5266",
      description: "Standards compliance and documentation",
      duration: "40 mins",
      icon: FileCheck
    },
    {
      id: 7,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "75 mins",
      icon: GraduationCap,
      isExam: true
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Emergency Lighting Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Emergency lighting design, testing schedules, and BS 5266 compliance
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../emergency-lighting-mock-exam` : `../emergency-lighting-module-${module.id}`}
              moduleNumber={typeof module.id === 'number' ? module.id : index + 1}
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

export default EmergencyLightingCourse;

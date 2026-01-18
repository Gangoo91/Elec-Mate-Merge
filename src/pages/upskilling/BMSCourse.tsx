import React from 'react';
import { ArrowLeft, BookOpen, Thermometer, Wind, Lightbulb, Wifi, Bell, Settings, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const BMSCourse = () => {
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
      title: "BMS Overview and Industry Applications",
      description: "Introduction to Building Management Systems",
      duration: "50 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Control Devices and Field Sensors",
      description: "Sensors, actuators, and control components",
      duration: "60 mins",
      icon: Thermometer
    },
    {
      id: 3,
      title: "HVAC Integration and Scheduling Logic",
      description: "Heating, ventilation, and scheduling",
      duration: "65 mins",
      icon: Wind
    },
    {
      id: 4,
      title: "Lighting, Access, and Environmental Control",
      description: "Lighting systems and access control",
      duration: "55 mins",
      icon: Lightbulb
    },
    {
      id: 5,
      title: "Communication Protocols: BACnet, Modbus, KNX",
      description: "Industry communication standards",
      duration: "70 mins",
      icon: Wifi
    },
    {
      id: 6,
      title: "Alarms, Monitoring, and Data Logging",
      description: "System monitoring and alerts",
      duration: "45 mins",
      icon: Bell
    },
    {
      id: 7,
      title: "BMS Design, Programming, and Commissioning",
      description: "System design and commissioning",
      duration: "75 mins",
      icon: Settings
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Building Management Systems (BMS)
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            HVAC control, lighting management, and integrated building automation
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../bms-mock-exam` : `../bms-module-${module.id}`}
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

export default BMSCourse;

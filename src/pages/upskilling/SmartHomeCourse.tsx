import React from 'react';
import { ArrowLeft, BookOpen, Wifi, Lightbulb, Thermometer, Shield, Smartphone, Wrench, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ModuleCard } from '@/components/upskilling/cards';

const SmartHomeCourse = () => {
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
      title: "Introduction to Smart Home Systems",
      description: "Smart home fundamentals and core concepts",
      duration: "40 mins",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Smart Protocols: Zigbee, Z-Wave, Wi-Fi, and More",
      description: "Communication protocols and system compatibility",
      duration: "55 mins",
      icon: Wifi
    },
    {
      id: 3,
      title: "Smart Lighting and Scene Programming",
      description: "Lighting systems and scene-based control",
      duration: "50 mins",
      icon: Lightbulb
    },
    {
      id: 4,
      title: "Heating, HVAC, and Environmental Control",
      description: "Smart heating and environmental monitoring",
      duration: "60 mins",
      icon: Thermometer
    },
    {
      id: 5,
      title: "Access Control, CCTV, and Security Integration",
      description: "Smart security systems and integration",
      duration: "55 mins",
      icon: Shield
    },
    {
      id: 6,
      title: "Smart Hubs, Voice Assistants, and Interoperability",
      description: "Centralising control and system compatibility",
      duration: "45 mins",
      icon: Smartphone
    },
    {
      id: 7,
      title: "Installation, Testing, and Safety Requirements",
      description: "Professional installation and safety compliance",
      duration: "50 mins",
      icon: Wrench
    },
    {
      id: 8,
      title: "Mock Exam",
      description: "Test your knowledge",
      duration: "60 mins",
      icon: ClipboardCheck,
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
            Smart Home Technology
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Home automation, IoT integration, and intelligent building systems
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              to={module.isExam ? `../smart-home-mock-exam` : `../smart-home-module-${module.id}`}
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

export default SmartHomeCourse;

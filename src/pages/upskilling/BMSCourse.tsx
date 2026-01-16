import React from 'react';
import { ArrowLeft, BookOpen, Thermometer, Wind, Lightbulb, Wifi, Bell, Settings, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-8 space-y-6 animate-fade-in">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Building Management Systems (BMS)
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          HVAC control, lighting management, and integrated building automation
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {modules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={module.isExam ? `../bms-mock-exam` : `../bms-module-${module.id}`}
                  className="block h-full"
                >
                  <div className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/10 active:scale-[0.98] transition-all duration-300 cursor-pointer touch-manipulation h-full min-h-[160px] flex flex-col ${module.isExam ? 'ring-2 ring-elec-yellow/30' : ''}`}>
                    {/* Accent line at top */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-yellow/50 to-transparent" />

                    {/* Hover glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl bg-elec-yellow/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                    <div className="relative text-center flex-grow flex flex-col justify-center">
                      {/* Icon with gradient bg */}
                      <div className="flex justify-center mb-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-white/10">
                          <IconComponent className="h-5 w-5 text-elec-yellow" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Module label */}
                      <span className="text-[10px] font-semibold text-elec-yellow/70 uppercase tracking-wider mb-1">
                        {module.isExam ? 'Mock Exam' : `Module ${module.id}`}
                      </span>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-elec-yellow transition-colors">
                        {module.title}
                      </h3>

                      {/* Duration */}
                      <p className="text-white/50 text-xs">
                        {module.duration}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
      </div>
      </div>
    </div>
  );
};

export default BMSCourse;

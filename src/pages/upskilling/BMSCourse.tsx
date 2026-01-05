import { ArrowLeft, Building, BookOpen, Thermometer, Wind, Lightbulb, Wifi, Bell, Settings, GraduationCap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const BMSCourse = () => {
  const modules = [
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-8">
        {/* Back button */}
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-yellow-400/10">
              <Building className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Building Management Systems (BMS)
              </h1>
              <p className="text-sm sm:text-base text-white mt-1">
                HVAC control, lighting management, and integrated building automation
              </p>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link
                key={module.id}
                to={module.isExam ? `../bms-mock-exam` : `../bms-module-${module.id}`}
              >
                <Card
                  className={`
                    group relative overflow-hidden cursor-pointer h-full
                    bg-card border border-yellow-400/20
                    hover:border-yellow-400/50
                    active:scale-[0.98]
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:shadow-yellow-400/10
                    ${module.isExam ? 'ring-2 ring-yellow-400/30' : ''}
                  `}
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-yellow-400/10 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[160px]">
                    {/* Icon and module badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`
                        p-2.5 rounded-xl
                        ${module.isExam ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-400/10 text-yellow-400'}
                        group-hover:bg-yellow-400 group-hover:text-black
                        transition-all duration-300
                      `}>
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
                      </div>
                      <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
                        module.isExam
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-yellow-400/70 bg-yellow-400/5'
                      }`}>
                        {module.isExam ? 'Exam' : `Module ${module.id}`}
                      </span>
                    </div>

                    {/* Title and description */}
                    <div className="flex-grow">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-2">
                        {module.description}
                      </p>
                    </div>

                    {/* Duration and action */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{module.duration}</span>
                      <div className="
                        w-7 h-7 rounded-full
                        bg-yellow-400/10
                        flex items-center justify-center
                        group-hover:bg-yellow-400 group-hover:text-black
                        transition-all duration-300
                      ">
                        <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BMSCourse;

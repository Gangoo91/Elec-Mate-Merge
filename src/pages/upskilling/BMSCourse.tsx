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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12">
        {/* Back button */}
        <Link to="/electrician/upskilling">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 mb-4 sm:mb-6 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        {/* Course Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-start sm:items-center gap-3 mb-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
              <Building className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Building Management Systems (BMS)
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 max-w-2xl">
                HVAC control, lighting management, and integrated building automation
              </p>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
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
                    bg-card border border-border/30
                    hover:border-primary/40
                    active:scale-[0.98]
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:shadow-primary/10
                    ${module.isExam ? 'ring-2 ring-primary/30' : ''}
                  `}
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10 p-3 sm:p-4 md:p-5 flex flex-col h-full min-h-[140px] sm:min-h-[160px]">
                    {/* Icon and module badge */}
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className={`
                        p-2 sm:p-2.5 rounded-xl
                        ${module.isExam ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}
                        group-hover:bg-primary group-hover:text-primary-foreground
                        transition-all duration-300
                      `}>
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" strokeWidth={2.5} />
                      </div>
                      <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded ${
                        module.isExam
                          ? 'text-primary bg-primary/10'
                          : 'text-primary/70 bg-primary/5'
                      }`}>
                        {module.isExam ? 'Exam' : `Module ${module.id}`}
                      </span>
                    </div>

                    {/* Title and description */}
                    <div className="flex-grow">
                      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {module.description}
                      </p>
                    </div>

                    {/* Duration and action */}
                    <div className="mt-2 sm:mt-3 flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{module.duration}</span>
                      <div className="
                        w-6 h-6 sm:w-7 sm:h-7 rounded-full
                        bg-primary/10
                        flex items-center justify-center
                        group-hover:bg-primary group-hover:text-primary-foreground
                        transition-all duration-300
                      ">
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary group-hover:text-primary-foreground group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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

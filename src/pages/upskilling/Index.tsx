import { ArrowLeft, FileCheck, Zap, Gauge, TrendingUp, Home, Car, Battery, Settings, Shield, Cable, CheckCircle, Building, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// All available upskilling courses
const courses = [
    {
      id: 1,
      title: "18th Edition Wiring Regulations",
      description: "Comprehensive BS 7671:2018 wiring regulations and electrical safety requirements",
      icon: Zap,
      level: "Essential",
      duration: "6 weeks",
      link: "bs7671-course",
    },
    {
      id: 2,
      title: "Inspection & Testing",
      description: "Electrical inspection, testing and certification procedures",
      icon: FileCheck,
      level: "Advanced",
      duration: "8 weeks",
      link: "inspection-testing",
    },
    {
      id: 3,
      title: "PAT Testing Certification",
      description: "Portable appliance testing procedures and certification requirements",
      icon: CheckCircle,
      level: "Foundation",
      duration: "4 weeks",
      link: "pat-testing-course",
    },
    {
      id: 4,
      title: "Fire Alarm Systems",
      description: "Fire detection and alarm system design, installation, and commissioning",
      icon: Shield,
      level: "Specialist",
      duration: "8 weeks",
      link: "fire-alarm-course",
    },
    {
      id: 5,
      title: "Emergency Lighting Systems",
      description: "Emergency lighting design, testing schedules, and BS 5266 compliance",
      icon: Shield,
      level: "Intermediate",
      duration: "6 weeks",
      link: "emergency-lighting-course",
    },
    {
      id: 6,
      title: "Data & Communications Cabling",
      description: "Structured cabling systems, fiber optics, and network infrastructure",
      icon: Cable,
      level: "Intermediate",
      duration: "6 weeks",
      link: "data-cabling-course",
    },
    {
      id: 7,
      title: "Renewable Energy Systems",
      description: "Solar, wind, and battery storage installation and maintenance procedures",
      icon: TrendingUp,
      level: "Intermediate",
      duration: "12 weeks",
      link: "renewable-energy-course",
    },
    {
      id: 8,
      title: "Electric Vehicle Charging",
      description: "EV charging infrastructure installation, maintenance, and safety protocols",
      icon: Car,
      level: "Specialist",
      duration: "6 weeks",
      link: "ev-charging-course",
    },
    {
      id: 9,
      title: "Smart Home Technology",
      description: "Home automation, IoT integration, and intelligent building systems",
      icon: Home,
      level: "Intermediate",
      duration: "8 weeks",
      link: "smart-home-course",
    },
    {
      id: 10,
      title: "Energy Efficiency & Management",
      description: "Power quality analysis, energy auditing, and optimisation strategies",
      icon: Battery,
      level: "Advanced",
      duration: "10 weeks",
      link: "energy-efficiency-course",
    },
    {
      id: 11,
      title: "Building Management Systems (BMS)",
      description: "HVAC control, lighting management, and integrated building automation",
      icon: Building,
      level: "Advanced",
      duration: "12 weeks",
      link: "bms-course",
    },
    {
      id: 12,
      title: "Industrial Electrical Systems",
      description: "High voltage systems, motor control, and industrial automation",
      icon: Settings,
      level: "Expert",
      duration: "14 weeks",
      link: "industrial-electrical-course",
    },
    {
      id: 13,
      title: "Instrumentation",
      description: "Industrial instrumentation systems, control loops, and measurement techniques",
      icon: Gauge,
      level: "Advanced",
      duration: "10 weeks",
      link: "instrumentation-course",
    },
    {
      id: 14,
      title: "Fiber Optics Technology",
      description: "Optical fiber installation, fusion splicing, and OTDR testing procedures",
      icon: Cable,
      level: "Advanced",
      duration: "8 weeks",
      link: "fiber-optics-course",
    }
  ];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header - full width */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 pb-4 sm:pb-6">
        <Link to="/electrician/study-centre">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground transition-colors mb-3 sm:mb-4 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>

        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Electrical Upskilling
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Advanced courses for qualified electricians
          </p>
        </div>
      </div>

      {/* Course Grid - full width, edge to edge on mobile */}
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Link key={course.id} to={course.link} aria-label={`View ${course.title} course`}>
                <div
                  className="
                    group relative overflow-hidden cursor-pointer h-full
                    bg-card/50 rounded-lg
                    active:scale-[0.98] active:bg-card/70
                    transition-all duration-200
                  "
                >
                  {/* Content */}
                  <div className="relative z-10 p-3 sm:p-4 flex flex-col h-full min-h-[140px] sm:min-h-[160px]">
                    {/* Icon */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-medium text-primary/70 uppercase tracking-wide">
                        {course.level}
                      </span>
                    </div>

                    {/* Title and description */}
                    <div className="flex-grow">
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 leading-tight line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">
                        {course.description}
                      </p>
                    </div>

                    {/* Duration */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{course.duration}</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/60" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;

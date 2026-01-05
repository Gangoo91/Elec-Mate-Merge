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
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-6">
        <Link to="/electrician/study-centre">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 mb-4 sm:mb-6 p-0 h-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>

        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Electrical Upskilling
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
            Advanced electrical courses and professional development for qualified electricians
          </p>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Link key={course.id} to={course.link} aria-label={`View ${course.title} course`}>
                <Card
                  className="
                    group relative overflow-hidden cursor-pointer h-full
                    bg-card border border-yellow-400/20
                    hover:border-yellow-400/50
                    active:scale-[0.98]
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:shadow-yellow-400/10
                  "
                >
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-yellow-400/10 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[180px]">
                    {/* Icon and level */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="
                        p-2.5 rounded-xl
                        bg-yellow-400/10 text-yellow-400
                        group-hover:bg-yellow-400 group-hover:text-black
                        transition-all duration-300
                      ">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-yellow-400/70 uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400/5">
                        {course.level}
                      </span>
                    </div>

                    {/* Title and description */}
                    <div className="flex-grow">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-yellow-400 transition-colors leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Duration and action */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">{course.duration}</span>
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

export default Index;

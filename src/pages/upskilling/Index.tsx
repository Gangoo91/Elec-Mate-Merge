import React from 'react';
import { ArrowLeft, FileCheck, Zap, Gauge, TrendingUp, Home, Car, Battery, Settings, Shield, Cable, CheckCircle, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CourseCard } from '@/components/upskilling/cards';

type CourseLevel = 'Essential' | 'Foundation' | 'Intermediate' | 'Advanced' | 'Specialist' | 'Expert';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  link: string;
}

// All available upskilling courses
const courses: Course[] = [
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
  },
];

const Index = () => {
  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-6 pt-6 pb-4">
        <Link to="/study-centre">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
          >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Study Centre
        </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Electrical Upskilling
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Advanced courses for qualified electricians
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                to={course.link}
                title={course.title}
                description={course.description}
                icon={course.icon}
                level={course.level}
                duration={course.duration}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

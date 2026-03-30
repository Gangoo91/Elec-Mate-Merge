import React from 'react';
import {
  ArrowLeft,
  FileCheck,
  Zap,
  Gauge,
  TrendingUp,
  Home,
  Car,
  Battery,
  Settings,
  Shield,
  Cable,
  CheckCircle,
  Building,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CourseLevel =
  | 'Essential'
  | 'Foundation'
  | 'Intermediate'
  | 'Advanced'
  | 'Specialist'
  | 'Expert';

const levelAccents: Record<
  CourseLevel,
  { gradient: string; iconColor: string; iconBg: string; hoverColor: string }
> = {
  Essential: {
    gradient: 'from-elec-yellow via-amber-400 to-orange-400',
    iconColor: 'text-elec-yellow',
    iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20',
    hoverColor: 'group-hover:text-elec-yellow',
  },
  Foundation: {
    gradient: 'from-emerald-500 via-emerald-400 to-green-400',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
    hoverColor: 'group-hover:text-emerald-300',
  },
  Intermediate: {
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border border-blue-500/20',
    hoverColor: 'group-hover:text-blue-300',
  },
  Advanced: {
    gradient: 'from-purple-500 via-violet-400 to-indigo-400',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border border-purple-500/20',
    hoverColor: 'group-hover:text-purple-300',
  },
  Specialist: {
    gradient: 'from-orange-500 via-amber-400 to-yellow-400',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border border-orange-500/20',
    hoverColor: 'group-hover:text-orange-300',
  },
  Expert: {
    gradient: 'from-red-500 via-rose-400 to-pink-400',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10 border border-red-500/20',
    hoverColor: 'group-hover:text-red-300',
  },
};

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  level: CourseLevel;
  duration: string;
  link: string;
}

const courses: Course[] = [
  { id: 1, title: '18th Edition Wiring Regulations', description: 'Comprehensive BS 7671:2018 wiring regulations and electrical safety requirements', icon: Zap, level: 'Essential', duration: '6 weeks', link: 'bs7671-course' },
  { id: 2, title: 'Inspection & Testing', description: 'Electrical inspection, testing and certification procedures', icon: FileCheck, level: 'Advanced', duration: '8 weeks', link: 'inspection-testing' },
  { id: 3, title: 'PAT Testing Certification', description: 'Portable appliance testing procedures and certification requirements', icon: CheckCircle, level: 'Foundation', duration: '4 weeks', link: 'pat-testing-course' },
  { id: 4, title: 'Fire Alarm Systems', description: 'Fire detection and alarm system design, installation, and commissioning', icon: Shield, level: 'Specialist', duration: '8 weeks', link: 'fire-alarm-course' },
  { id: 5, title: 'Emergency Lighting Systems', description: 'Emergency lighting design, testing schedules, and BS 5266 compliance', icon: Shield, level: 'Intermediate', duration: '6 weeks', link: 'emergency-lighting-course' },
  { id: 6, title: 'Data & Communications Cabling', description: 'Structured cabling systems, fiber optics, and network infrastructure', icon: Cable, level: 'Intermediate', duration: '6 weeks', link: 'data-cabling-course' },
  { id: 7, title: 'Renewable Energy Systems', description: 'Solar, wind, and battery storage installation and maintenance procedures', icon: TrendingUp, level: 'Intermediate', duration: '12 weeks', link: 'renewable-energy-course' },
  { id: 8, title: 'Electric Vehicle Charging', description: 'EV charging infrastructure installation, maintenance, and safety protocols', icon: Car, level: 'Specialist', duration: '6 weeks', link: 'ev-charging-course' },
  { id: 9, title: 'Smart Home Technology', description: 'Home automation, IoT integration, and intelligent building systems', icon: Home, level: 'Intermediate', duration: '8 weeks', link: 'smart-home-course' },
  { id: 10, title: 'Energy Efficiency & Management', description: 'Power quality analysis, energy auditing, and optimisation strategies', icon: Battery, level: 'Advanced', duration: '10 weeks', link: 'energy-efficiency-course' },
  { id: 11, title: 'Building Management Systems', description: 'HVAC control, lighting management, and integrated building automation', icon: Building, level: 'Advanced', duration: '12 weeks', link: 'bms-course' },
  { id: 12, title: 'Industrial Electrical Systems', description: 'High voltage systems, motor control, and industrial automation', icon: Settings, level: 'Expert', duration: '14 weeks', link: 'industrial-electrical-course' },
  { id: 13, title: 'Instrumentation', description: 'Industrial instrumentation systems, control loops, and measurement techniques', icon: Gauge, level: 'Advanced', duration: '10 weeks', link: 'instrumentation-course' },
  { id: 14, title: 'Fiber Optics Technology', description: 'Optical fiber installation, fusion splicing, and OTDR testing procedures', icon: Cable, level: 'Advanced', duration: '8 weeks', link: 'fiber-optics-course' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="max-w-6xl mx-auto lg:px-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/study-centre')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                </div>
                <h1 className="text-base font-semibold text-white">Professional Upskilling</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-5"
        >
          {/* Course Cards */}
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
              {courses.length} Courses Available
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {courses.map((course) => {
                const accent = levelAccents[course.level];
                return (
                  <motion.div key={course.id} variants={itemVariants}>
                    <Link
                      to={course.link}
                      className="block touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl"
                    >
                      <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
                        {/* Top accent line */}
                        <div
                          className={cn(
                            'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r',
                            accent.gradient,
                            'opacity-30 group-hover:opacity-80 transition-opacity duration-200'
                          )}
                        />

                        <div className="relative z-10 p-4 sm:p-5 flex flex-col min-h-[140px]">
                          {/* Top row — Icon + duration */}
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={cn(
                                'p-2.5 sm:p-3 rounded-xl',
                                accent.iconBg,
                                accent.iconColor,
                                'transition-all duration-200 group-hover:scale-110'
                              )}
                            >
                              <course.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
                                {course.level}
                              </span>
                            </div>
                          </div>

                          {/* Title & Description */}
                          <h3
                            className={cn(
                              'text-base sm:text-lg font-semibold text-white mb-1',
                              accent.hoverColor,
                              'transition-colors'
                            )}
                          >
                            {course.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-white leading-relaxed mb-3 line-clamp-2">
                            {course.description}
                          </p>

                          {/* Spacer */}
                          <div className="flex-grow" />

                          {/* Bottom action */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5 text-white">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs">{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs sm:text-sm font-medium text-elec-yellow">
                                Start Learning
                              </span>
                              <div
                                className={cn(
                                  'w-7 h-7 sm:w-8 sm:h-8 rounded-full',
                                  'bg-white/[0.05] border border-elec-yellow/20',
                                  'flex items-center justify-center',
                                  'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
                                  'transition-all duration-200'
                                )}
                              >
                                <ChevronRight
                                  className={cn(
                                    'w-4 h-4 text-white',
                                    'group-hover:text-black group-hover:translate-x-0.5',
                                    'transition-all'
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
};

export default Index;

import React from 'react';
import {
  ArrowLeft,
  TowerControl,
  CableCar,
  Heart,
  Brain,
  AlertTriangle,
  ArrowUpFromLine,
  PackageOpen,
  FlaskConical,
  DoorOpen,
  Flame,
  BadgeCheck,
  Construction,
  Leaf,
  ClipboardCheck,
  HardHat,
  Shield,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';

type CourseLevel = 'Foundation' | 'Intermediate';

const levelAccents: Record<
  CourseLevel,
  { gradient: string; iconColor: string; iconBg: string; hoverColor: string }
> = {
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
};

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  level: CourseLevel;
  duration: string;
  link: string;
  comingSoon?: boolean;
}

const courses: Course[] = [
  { id: 1, title: 'IPAF Mobile Scaffold Training', description: 'Safe assembly, use, and inspection of mobile access towers on site', icon: TowerControl, level: 'Foundation', duration: 'Half day', link: 'ipaf-course' },
  { id: 2, title: 'PASMA Towers for Users', description: 'PASMA-certified training for mobile access tower assembly, inspection, and safe use', icon: HardHat, level: 'Foundation', duration: 'Half day', link: 'pasma-course' },
  { id: 3, title: 'MEWP Operator Training', description: 'Mobile elevating work platform operation, safety checks, and best practice', icon: CableCar, level: 'Intermediate', duration: '3.5 hours', link: 'mewp-course' },
  { id: 4, title: 'First Aid at Work', description: 'Workplace first aid procedures, CPR, and emergency response training', icon: Heart, level: 'Intermediate', duration: '3 days', link: 'first-aid-course' },
  { id: 5, title: 'Mental Health First Aid', description: 'Recognising and supporting mental health issues in the workplace', icon: Brain, level: 'Intermediate', duration: '2 days', link: 'mental-health-course' },
  { id: 6, title: 'Asbestos Awareness', description: 'Identifying asbestos-containing materials and safe working procedures', icon: AlertTriangle, level: 'Foundation', duration: 'Half day', link: 'asbestos-awareness-course' },
  { id: 7, title: 'Working at Height', description: 'Risk assessment, fall prevention, and safe practices for working at height', icon: ArrowUpFromLine, level: 'Foundation', duration: 'Half day', link: 'working-at-height-course' },
  { id: 8, title: 'Manual Handling', description: 'Safe lifting techniques, risk assessment, and injury prevention on site', icon: PackageOpen, level: 'Foundation', duration: 'Half day', link: 'manual-handling-course' },
  { id: 9, title: 'COSHH Awareness', description: 'Control of substances hazardous to health — identification and safe handling', icon: FlaskConical, level: 'Foundation', duration: 'Half day', link: 'coshh-awareness-course' },
  { id: 10, title: 'Confined Spaces Awareness', description: 'Hazard identification and safe entry procedures for confined spaces', icon: DoorOpen, level: 'Intermediate', duration: '1 day', link: 'confined-spaces-course' },
  { id: 11, title: 'Fire Safety & Fire Marshal', description: 'Fire prevention, evacuation procedures, and fire marshal responsibilities', icon: Flame, level: 'Foundation', duration: 'Half day', link: 'fire-safety-course' },
  { id: 12, title: 'CSCS Card Preparation', description: 'Health, safety, and environment test preparation for CSCS card applications', icon: BadgeCheck, level: 'Foundation', duration: '1 day', link: 'cscs-card-course' },
  { id: 13, title: 'Scaffolding Awareness', description: 'Scaffold safety, inspection requirements, and hazard awareness on site', icon: Construction, level: 'Foundation', duration: 'Half day', link: 'scaffolding-awareness-course' },
  { id: 14, title: 'Environmental & Sustainability', description: 'Waste management, energy efficiency, and sustainable working practices', icon: Leaf, level: 'Foundation', duration: '1 day', link: 'environmental-sustainability-course' },
  { id: 15, title: 'CDM Regulations Awareness', description: 'Construction Design and Management regulations, roles, and responsibilities', icon: ClipboardCheck, level: 'Intermediate', duration: '1 day', link: 'cdm-regulations-course' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function GeneralUpskillingIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'General Upskilling | Study Centre',
    description:
      'Cross-industry training for tradespeople — safety, health, and professional development courses.',
  });

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
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Shield className="h-4 w-4 text-emerald-400" />
                </div>
                <h1 className="text-base font-semibold text-white">General Upskilling</h1>
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
                          {/* Top row — Icon + level */}
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
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
                              {course.level}
                            </span>
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
}

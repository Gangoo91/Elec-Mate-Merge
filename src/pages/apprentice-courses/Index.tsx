import React from 'react';
import {
  ArrowLeft,
  Zap,
  CheckCircle,
  Shield,
  Award,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useSEO from '@/hooks/useSEO';

type CourseLevel =
  | 'Essential'
  | 'Foundation'
  | 'Intermediate'
  | 'Advanced'
  | 'Specialist'
  | 'Expert';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  level: CourseLevel;
  duration: string;
  link: string;
  tags: { label: string; color: string }[];
  accentGradient: string;
  iconColor: string;
  iconBg: string;
  hoverColor: string;
  comingSoon?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Level 2 Electrical Installation',
    description: 'Foundation electrical installation skills, safety principles, and core wiring techniques',
    icon: Zap,
    level: 'Foundation',
    duration: '2 years',
    link: 'level2',
    accentGradient: 'from-emerald-500 via-emerald-400 to-green-400',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
    hoverColor: 'group-hover:text-emerald-300',
    tags: [
      { label: 'Foundation', color: 'from-emerald-500/15 to-green-500/15 border-emerald-500/25 text-emerald-400' },
      { label: 'Wiring', color: 'from-blue-500/15 to-cyan-500/15 border-blue-500/25 text-blue-300' },
      { label: 'Safety', color: 'from-amber-500/15 to-yellow-500/15 border-amber-500/25 text-amber-400' },
    ],
  },
  {
    id: 2,
    title: 'Level 3 Electrical Installation',
    description: 'Advanced installation techniques, design, inspection and testing principles',
    icon: CheckCircle,
    level: 'Intermediate',
    duration: '2 years',
    link: 'level3',
    accentGradient: 'from-blue-500 via-blue-400 to-cyan-400',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 border border-blue-500/20',
    hoverColor: 'group-hover:text-blue-300',
    tags: [
      { label: 'Advanced', color: 'from-blue-500/15 to-cyan-500/15 border-blue-500/25 text-blue-300' },
      { label: 'Design', color: 'from-purple-500/15 to-violet-500/15 border-purple-500/25 text-purple-300' },
      { label: 'Testing', color: 'from-emerald-500/15 to-green-500/15 border-emerald-500/25 text-emerald-400' },
    ],
  },
  {
    id: 3,
    title: 'AM2 Preparation & Guidance',
    description: 'Practical assessment preparation, mock scenarios, and exam technique guidance',
    icon: Award,
    level: 'Intermediate',
    duration: '1 day',
    link: 'am2',
    accentGradient: 'from-elec-yellow via-amber-400 to-orange-400',
    iconColor: 'text-elec-yellow',
    iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20',
    hoverColor: 'group-hover:text-elec-yellow',
    tags: [
      { label: 'Practical', color: 'from-elec-yellow/15 to-amber-500/15 border-elec-yellow/25 text-elec-yellow' },
      { label: 'Assessment', color: 'from-orange-500/15 to-red-500/15 border-orange-500/25 text-orange-400' },
      { label: 'Mock Exams', color: 'from-blue-500/15 to-indigo-500/15 border-blue-500/25 text-blue-300' },
    ],
  },
  {
    id: 4,
    title: 'HNC Electrical Engineering',
    description: 'Higher National Certificate in Electrical and Electronic Engineering for Building Services',
    icon: GraduationCap,
    level: 'Advanced',
    duration: '2 years',
    link: 'hnc',
    accentGradient: 'from-purple-500 via-violet-400 to-indigo-400',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border border-purple-500/20',
    hoverColor: 'group-hover:text-purple-300',
    tags: [
      { label: 'HNC', color: 'from-purple-500/15 to-violet-500/15 border-purple-500/25 text-purple-300' },
      { label: 'Engineering', color: 'from-blue-500/15 to-cyan-500/15 border-blue-500/25 text-blue-300' },
      { label: 'Building Services', color: 'from-emerald-500/15 to-teal-500/15 border-emerald-500/25 text-emerald-400' },
    ],
  },
  {
    id: 5,
    title: 'MOET',
    description: 'Maintenance Operations Engineering Technician — multi-skilled maintenance training',
    icon: Shield,
    level: 'Intermediate',
    duration: '18 months',
    link: 'moet',
    accentGradient: 'from-orange-500 via-amber-400 to-yellow-400',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border border-orange-500/20',
    hoverColor: 'group-hover:text-orange-300',
    tags: [
      { label: 'Maintenance', color: 'from-orange-500/15 to-amber-500/15 border-orange-500/25 text-orange-400' },
      { label: 'Multi-Skilled', color: 'from-blue-500/15 to-cyan-500/15 border-blue-500/25 text-blue-300' },
      { label: 'Engineering', color: 'from-purple-500/15 to-violet-500/15 border-purple-500/25 text-purple-300' },
    ],
  },
  {
    id: 6,
    title: 'Functional Skills',
    description: 'Essential maths, English and IT skills required for electrical apprenticeships',
    icon: BookOpen,
    level: 'Essential',
    duration: 'Ongoing',
    link: 'functional-skills',
    accentGradient: 'from-elec-yellow via-amber-400 to-orange-400',
    iconColor: 'text-elec-yellow',
    iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20',
    hoverColor: 'group-hover:text-elec-yellow',
    tags: [
      { label: 'Maths', color: 'from-elec-yellow/15 to-amber-500/15 border-elec-yellow/25 text-elec-yellow' },
      { label: 'English', color: 'from-blue-500/15 to-cyan-500/15 border-blue-500/25 text-blue-300' },
      { label: 'IT Skills', color: 'from-purple-500/15 to-violet-500/15 border-purple-500/25 text-purple-300' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

const Index = () => {
  const navigate = useNavigate();

  useSEO(
    'Apprentice Courses - Elec-Mate',
    'Comprehensive electrical apprenticeship courses covering Level 2, Level 3, AM2 preparation, HNC, MOET and Functional Skills'
  );

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
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                </div>
                <h1 className="text-base font-semibold text-white">Apprentice Courses</h1>
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
              Available Now
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {courses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Link
                    to={course.link}
                    className="block touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl"
                  >
                    <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
                      {/* Top accent line */}
                      <div
                        className={cn(
                          'absolute inset-x-0 top-0 h-[2px]',
                          'bg-gradient-to-r',
                          course.accentGradient,
                          'opacity-30 group-hover:opacity-80',
                          'transition-opacity duration-200'
                        )}
                      />

                      <div className="relative z-10 p-4 sm:p-5 flex flex-col min-h-[180px]">
                        {/* Top row — Icon + badges */}
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={cn(
                              'p-2.5 sm:p-3 rounded-xl',
                              course.iconBg,
                              course.iconColor,
                              'transition-all duration-200 group-hover:scale-110'
                            )}
                          >
                            <course.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1.5 text-white">
                              <Clock className="w-3 h-3" />
                              <span className="text-[10px] sm:text-xs">{course.duration}</span>
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3
                          className={cn(
                            'text-base sm:text-lg font-semibold text-white mb-1',
                            course.hoverColor,
                            'transition-colors'
                          )}
                        >
                          {course.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white leading-relaxed mb-3 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {course.tags.map((tag) => (
                            <span
                              key={tag.label}
                              className={cn(
                                'px-2 py-0.5 text-[10px] font-medium rounded-full bg-gradient-to-r border',
                                tag.color
                              )}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>

                        {/* Spacer */}
                        <div className="flex-grow" />

                        {/* Bottom action */}
                        <div className="flex items-center justify-between mt-2">
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
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.main>
      </div>
    </div>
  );
};

export default Index;

import React from 'react';
import {
  ArrowLeft,
  Compass,
  Brain,
  Smile,
  MessageCircle,
  Users,
  Shield,
  Clock,
  Swords,
  Wallet,
  Target,
  ChevronRight,
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
    gradient: 'from-pink-500 via-rose-400 to-red-400',
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-500/10 border border-pink-500/20',
    hoverColor: 'group-hover:text-pink-300',
  },
  Intermediate: {
    gradient: 'from-rose-500 via-pink-400 to-fuchsia-400',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border border-rose-500/20',
    hoverColor: 'group-hover:text-rose-300',
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
  { id: 1, title: 'Leadership on Site', description: 'Delegating, decision-making, earning respect, and leading teams — based on ILM Level 2 frameworks', icon: Compass, level: 'Intermediate', duration: '6 hours', link: 'leadership-on-site' },
  { id: 2, title: 'Mental Health Awareness', description: 'Recognising signs, starting conversations, supporting others — based on MHFA England and Mates in Mind', icon: Brain, level: 'Foundation', duration: '4 hours', link: 'mental-health-awareness' },
  { id: 3, title: 'Emotional Intelligence', description: "Self-awareness, managing reactions, reading people — based on Daniel Goleman's EI framework", icon: Smile, level: 'Foundation', duration: '5 hours', link: 'emotional-intelligence' },
  { id: 4, title: 'Communication & Confidence', description: 'Toolbox talks, client conversations, professional writing — based on Toastmasters Pathways', icon: MessageCircle, level: 'Foundation', duration: '5 hours', link: 'communication-confidence' },
  { id: 5, title: 'Mentoring & Developing Others', description: 'How people learn, giving feedback, supporting apprentices — based on ILM coaching and JIB standards', icon: Users, level: 'Intermediate', duration: '5 hours', link: 'mentoring-developing-others' },
  { id: 6, title: 'Resilience & Stress Management', description: 'Managing pressure, bouncing back, switching off — based on MBSR principles', icon: Shield, level: 'Foundation', duration: '4 hours', link: 'resilience-stress-management' },
  { id: 7, title: 'Time Management & Organisation', description: 'Planning, managing multiple jobs, admin — based on GTD and Eisenhower frameworks', icon: Clock, level: 'Foundation', duration: '4 hours', link: 'time-management-organisation' },
  { id: 8, title: 'Conflict Resolution', description: 'Non-paying clients, site disputes, awkward conversations — based on ACAS conflict resolution', icon: Swords, level: 'Intermediate', duration: '4 hours', link: 'conflict-resolution' },
  { id: 9, title: 'Personal Finance & Wellbeing', description: 'Budgeting, debt, pensions, planning ahead — based on Open University Managing My Money', icon: Wallet, level: 'Foundation', duration: '5 hours', link: 'personal-finance' },
  { id: 10, title: 'Goal Setting & Continuous Growth', description: 'Setting goals, building habits, tracking progress — based on FranklinCovey 7 Habits', icon: Target, level: 'Foundation', duration: '4 hours', link: 'goal-setting-growth' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function PersonalDevelopmentIndex() {
  const navigate = useNavigate();

  useSEO({
    title: 'Personal Development | Study Centre',
    description: 'Communication, leadership, and professional growth courses for tradespeople.',
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
                <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20">
                  <Compass className="h-4 w-4 text-pink-400" />
                </div>
                <h1 className="text-base font-semibold text-white">Personal Development</h1>
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
                        <div
                          className={cn(
                            'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r',
                            accent.gradient,
                            'opacity-30 group-hover:opacity-80 transition-opacity duration-200'
                          )}
                        />

                        <div className="relative z-10 p-4 sm:p-5 flex flex-col min-h-[140px]">
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

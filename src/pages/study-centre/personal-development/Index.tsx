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
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CourseCard } from '@/components/upskilling/cards';
import useSEO from '@/hooks/useSEO';

type CourseLevel = 'Foundation' | 'Intermediate';

interface Course {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  level: CourseLevel;
  duration: string;
  link: string;
  comingSoon?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Leadership on Site',
    description:
      'Delegating, decision-making, earning respect, and leading teams — based on ILM Level 2 team leading frameworks',
    icon: Compass,
    level: 'Intermediate',
    duration: '6 hours',
    link: 'leadership-on-site',
  },
  {
    id: 2,
    title: 'Mental Health Awareness',
    description:
      'Recognising signs, starting conversations, supporting others — based on MHFA England and Mates in Mind',
    icon: Brain,
    level: 'Foundation',
    duration: '4 hours',
    link: 'mental-health-awareness',
  },
  {
    id: 3,
    title: 'Emotional Intelligence',
    description:
      "Self-awareness, managing reactions, reading people — based on Daniel Goleman's EI framework",
    icon: Smile,
    level: 'Foundation',
    duration: '5 hours',
    link: 'emotional-intelligence',
  },
  {
    id: 4,
    title: 'Communication & Confidence',
    description:
      'Toolbox talks, client conversations, professional writing — based on Toastmasters Pathways',
    icon: MessageCircle,
    level: 'Foundation',
    duration: '5 hours',
    link: 'communication-confidence',
    comingSoon: true,
  },
  {
    id: 5,
    title: 'Mentoring & Developing Others',
    description:
      'How people learn, giving feedback, supporting apprentices — based on ILM coaching and JIB apprenticeship standards',
    icon: Users,
    level: 'Intermediate',
    duration: '5 hours',
    link: 'mentoring-developing-others',
    comingSoon: true,
  },
  {
    id: 6,
    title: 'Resilience & Stress Management',
    description: 'Managing pressure, bouncing back, switching off — based on MBSR principles',
    icon: Shield,
    level: 'Foundation',
    duration: '4 hours',
    link: 'resilience-stress-management',
    comingSoon: true,
  },
  {
    id: 7,
    title: 'Time Management & Organisation',
    description: 'Planning, managing multiple jobs, admin — based on GTD and Eisenhower frameworks',
    icon: Clock,
    level: 'Foundation',
    duration: '4 hours',
    link: 'time-management-organisation',
    comingSoon: true,
  },
  {
    id: 8,
    title: 'Conflict Resolution & Difficult Conversations',
    description:
      'Non-paying clients, site disputes, awkward conversations — based on ACAS conflict resolution frameworks',
    icon: Swords,
    level: 'Intermediate',
    duration: '4 hours',
    link: 'conflict-resolution',
    comingSoon: true,
  },
  {
    id: 9,
    title: 'Personal Finance & Financial Wellbeing',
    description:
      'Budgeting, debt, pensions, planning ahead — based on Open University Managing My Money programme',
    icon: Wallet,
    level: 'Foundation',
    duration: '5 hours',
    link: 'personal-finance',
    comingSoon: true,
  },
  {
    id: 10,
    title: 'Goal Setting & Continuous Growth',
    description:
      'Setting goals, building habits, tracking progress — based on FranklinCovey 7 Habits and growth mindset research',
    icon: Target,
    level: 'Foundation',
    duration: '4 hours',
    link: 'goal-setting-growth',
    comingSoon: true,
  },
];

const activeCourses = courses.filter((c) => !c.comingSoon);
const comingSoonCourses = courses.filter((c) => c.comingSoon);

export default function PersonalDevelopmentIndex() {
  useSEO({
    title: 'Personal Development | Study Centre',
    description: 'Communication, leadership, and professional growth courses for tradespeople.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a] min-h-screen">
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
          <Link to="/study-centre">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Study Centre
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="py-8 sm:py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-400/10 border border-rose-500/20">
                    <GraduationCap className="h-5 w-5 text-rose-400" />
                  </div>
                  <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-rose-500/30 to-transparent" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                  Personal Development
                </h1>
                <p className="text-base sm:text-lg text-white leading-relaxed">
                  Communication, leadership, and professional growth courses for tradespeople. Build
                  confidence and advance your career.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-3 pb-1">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <BookOpen className="h-4 w-4 text-rose-400" />
                  <span className="text-sm text-white">
                    <span className="font-semibold text-white">{activeCourses.length}</span>{' '}
                    available
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <span className="text-sm text-white">
                    <span className="font-semibold text-white">{comingSoonCourses.length}</span>{' '}
                    coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Available Now</h2>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {activeCourses.map((course, index) => (
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
          </section>

          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <h2 className="text-lg sm:text-xl font-semibold text-white">Coming Soon</h2>
              <div className="h-px flex-1 bg-white/[0.04]" />
              <span className="text-xs text-white uppercase tracking-wider font-medium hidden sm:block">
                {comingSoonCourses.length} courses
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
              {comingSoonCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  to={course.link}
                  title={course.title}
                  description={course.description}
                  icon={course.icon}
                  level={course.level}
                  duration={course.duration}
                  index={index}
                  comingSoon
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

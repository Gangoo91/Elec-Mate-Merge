import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Zap,
  BookOpen,
  Award,
  Target,
  ChevronRight,
  Flame,
  Star,
  Sparkles,
  ArrowLeft,
  Shield,
  Compass,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useAuth } from '@/contexts/AuthContext';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';
// StudyStatsDashboard moved to LeaderboardPage only
import useSEO from '@/hooks/useSEO';

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

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  courseCount: number;
  tags: { label: string; color: string }[];
  accentGradient: string;
  iconColor: string;
  iconBg: string;
  hoverColor: string;
  onClick: () => void;
  badge?: { label: string; icon: React.ElementType };
  progressPct?: number;
  completedCourses?: number;
}

function CategoryCard({
  title,
  description,
  icon: Icon,
  courseCount,
  tags,
  accentGradient,
  iconColor,
  iconBg,
  hoverColor,
  onClick,
  badge,
  progressPct = 0,
  completedCourses = 0,
}: CategoryCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative overflow-hidden card-surface-interactive cursor-pointer touch-manipulation"
    >
      {/* Top accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          'bg-gradient-to-r',
          accentGradient,
          'opacity-30 group-hover:opacity-80',
          'transition-opacity duration-200'
        )}
      />

      <div className="relative z-10 p-4 sm:p-5 flex flex-col h-full min-h-[180px]">
        {/* Top row — Icon + badges */}
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              'p-2.5 sm:p-3 rounded-xl',
              iconBg,
              iconColor,
              'transition-all duration-200 group-hover:scale-110'
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex items-center gap-1.5">
            {badge && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                <badge.icon className="h-3 w-3 text-elec-yellow fill-elec-yellow" />
                <span className="text-[10px] font-bold text-elec-yellow">{badge.label}</span>
              </div>
            )}
            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
              {courseCount} Courses
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3
          className={cn(
            'text-base sm:text-lg font-semibold text-white mb-1',
            hoverColor,
            'transition-colors'
          )}
        >
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
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

        {/* Progress bar */}
        {completedCourses > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-white">
                {completedCourses}/{courseCount} completed
              </span>
              <span className="text-[10px] font-medium text-white">{Math.round(progressPct)}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-500', accentGradient)}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Bottom action */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs sm:text-sm font-medium text-elec-yellow">
            {completedCourses > 0 ? 'Continue Learning' : 'Start Learning'}
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
    </motion.div>
  );
}

export default function StudyCentreIndex() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const studyStreakData = useStudyStreak();
  const quizData = useQuizResults();

  useSEO({
    title: 'Study Centre | Electrical Training & CPD Courses',
    description:
      'Comprehensive electrical training for apprentices and qualified electricians. Level 2 & 3 courses, 18th Edition BS 7671, inspection & testing, EV charging, solar PV, and 2,000+ practice questions.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Elec-Mate Study Centre',
      description:
        'Educational hub for UK electrical professionals - apprenticeship training and CPD courses',
      provider: {
        '@type': 'Organization',
        name: 'Elec-Mate',
      },
    },
  });

  const { lastLocation, loading: lastLocLoading, getLastStudiedDisplay } = useLastStudyLocation();
  const { allProgress } = useCourseProgress();

  // Count completed courses per category
  // Course keys from tracker are URL path segments (e.g. "fire-safety", "bs7671")
  // Map route prefixes to categories based on StudyCentreRoutes structure
  const apprenticeKeys = ['apprentice'];
  const upskillingKeys = ['upskilling', 'bs7671', 'ev-charging', 'solar-pv', 'smart-home', 'fire-alarm', 'data-cabling', 'bms', 'inspection-testing', 'industrial-electrical', 'energy-efficiency', 'fiber-optics', 'instrumentation', 'renewable-energy', 'emergency-lighting'];
  const generalKeys = ['general-upskilling', 'fire-safety', 'first-aid', 'manual-handling', 'working-at-height', 'ipaf', 'pasma', 'mewp', 'coshh-awareness', 'confined-spaces', 'asbestos', 'scaffolding-awareness', 'cdm-regulations', 'cscs-card', 'environmental-sustainability'];
  const personalKeys = ['personal-development', 'leadership-on-site', 'mental-health', 'mental-health-awareness', 'communication-confidence', 'conflict-resolution', 'emotional-intelligence', 'resilience-stress-management', 'time-management-organisation', 'goal-setting-growth', 'mentoring-developing-others', 'personal-finance'];

  const completedByCategory = {
    apprentice: allProgress.filter((p) => p.completed && apprenticeKeys.some((k) => p.course_key === k || p.course_key.startsWith(k + '/'))).length,
    upskilling: allProgress.filter((p) => p.completed && upskillingKeys.some((k) => p.course_key === k || p.course_key.startsWith(k + '/'))).length,
    general: allProgress.filter((p) => p.completed && generalKeys.some((k) => p.course_key === k || p.course_key.startsWith(k + '/'))).length,
    personal: allProgress.filter((p) => p.completed && personalKeys.some((k) => p.course_key === k || p.course_key.startsWith(k + '/'))).length,
  };

  const currentStreak = studyStreakData?.streak?.currentStreak || 0;
  const quizResults = quizData?.results || [];
  const totalQuizzesTaken = quizResults.length;
  const averageScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc: number, r: any) => acc + (r.score || 0), 0) / quizResults.length
        )
      : 0;

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
                onClick={() => navigate('/dashboard')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <BookOpen className="h-4 w-4 text-purple-400" />
                </div>
                <h1 className="text-base font-semibold text-white">Study Centre</h1>
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
          {/* Continue Where You Left Off */}
          {lastLocation && !lastLocLoading && (
            <motion.div variants={itemVariants}>
              <Link to={lastLocation.path} className="block touch-manipulation active:scale-[0.98]">
                <div style={{ background: 'hsl(0 0% 12%)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="text-[11px] text-elec-yellow font-bold uppercase tracking-wider">Continue where you left off</p>
                    <p className="text-sm font-semibold text-white truncate mt-1">{lastLocation.title}</p>
                    <p className="text-xs text-white mt-1">{getLastStudiedDisplay()}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Leaderboard Card — full width, inline styles to match Continue card */}
          <motion.div variants={itemVariants}>
            <Link to="/study-centre/leaderboard" className="block touch-manipulation active:scale-[0.98]">
              <div style={{ background: 'hsl(0 0% 12%)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="text-[11px] text-elec-yellow font-bold uppercase tracking-wider">Leaderboard</p>
                  <p className="text-sm font-semibold text-white mt-1">Rankings, Streaks & Achievements</p>
                </div>
                <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
              </div>
            </Link>
          </motion.div>

          {/* Course Categories */}
          <motion.section variants={itemVariants} className="space-y-3">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
              Categories
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <CategoryCard
                title="Apprentice Training"
                description="Level 2 & 3 qualifications, AM2 preparation, and essential fundamentals"
                icon={GraduationCap}
                courseCount={8}
                completedCourses={completedByCategory.apprentice}
                progressPct={(completedByCategory.apprentice / 8) * 100}
                accentGradient="from-blue-500 via-blue-400 to-cyan-400"
                iconColor="text-blue-400"
                iconBg="bg-blue-500/10 border border-blue-500/20"
                hoverColor="group-hover:text-blue-300"
                onClick={() => navigate('/study-centre/apprentice')}
                tags={[
                  { label: 'Level 2', color: 'from-blue-500/15 to-blue-600/15 border-blue-500/25 text-blue-300' },
                  { label: 'Level 3', color: 'from-purple-500/15 to-purple-600/15 border-purple-500/25 text-purple-300' },
                  { label: 'AM2', color: 'from-cyan-500/15 to-cyan-600/15 border-cyan-500/25 text-cyan-300' },
                  { label: 'Mock Exams', color: 'from-indigo-500/15 to-indigo-600/15 border-indigo-500/25 text-indigo-300' },
                ]}
              />

              <CategoryCard
                title="Professional Upskilling"
                description="BS7671, EV charging, solar PV, smart home technology, and specialist courses"
                icon={Zap}
                courseCount={14}
                completedCourses={completedByCategory.upskilling}
                progressPct={(completedByCategory.upskilling / 14) * 100}
                accentGradient="from-elec-yellow via-amber-400 to-orange-400"
                iconColor="text-elec-yellow"
                iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
                hoverColor="group-hover:text-elec-yellow"
                onClick={() => navigate('/study-centre/upskilling')}
                badge={{ label: 'PRO', icon: Star }}
                tags={[
                  { label: 'BS7671', color: 'from-elec-yellow/15 to-amber-500/15 border-elec-yellow/25 text-elec-yellow' },
                  { label: 'EV Charging', color: 'from-green-500/15 to-emerald-500/15 border-green-500/25 text-green-400' },
                  { label: 'Solar PV', color: 'from-orange-500/15 to-amber-500/15 border-orange-500/25 text-orange-400' },
                  { label: 'Smart Home', color: 'from-cyan-500/15 to-blue-500/15 border-cyan-500/25 text-cyan-400' },
                ]}
              />

              <CategoryCard
                title="General Upskilling"
                description="Cross-industry safety training — IPAF, first aid, working at height, and site skills"
                icon={Shield}
                courseCount={14}
                completedCourses={completedByCategory.general}
                progressPct={(completedByCategory.general / 14) * 100}
                accentGradient="from-emerald-500 via-emerald-400 to-green-400"
                iconColor="text-emerald-400"
                iconBg="bg-emerald-500/10 border border-emerald-500/20"
                hoverColor="group-hover:text-emerald-300"
                onClick={() => navigate('/study-centre/general-upskilling')}
                tags={[
                  { label: 'IPAF Scaffold', color: 'from-emerald-500/15 to-green-500/15 border-emerald-500/25 text-emerald-400' },
                  { label: 'First Aid', color: 'from-red-500/15 to-rose-500/15 border-red-500/25 text-red-400' },
                  { label: 'COSHH', color: 'from-orange-500/15 to-amber-500/15 border-orange-500/25 text-orange-400' },
                  { label: 'Fire Safety', color: 'from-yellow-500/15 to-amber-500/15 border-yellow-500/25 text-yellow-400' },
                ]}
              />

              <CategoryCard
                title="Personal Development"
                description="Leadership, emotional intelligence, resilience, and becoming the best version of yourself"
                icon={Compass}
                courseCount={10}
                completedCourses={completedByCategory.personal}
                progressPct={(completedByCategory.personal / 10) * 100}
                accentGradient="from-pink-500 via-rose-400 to-red-400"
                iconColor="text-pink-400"
                iconBg="bg-pink-500/10 border border-pink-500/20"
                hoverColor="group-hover:text-pink-300"
                onClick={() => navigate('/study-centre/personal-development')}
                tags={[
                  { label: 'Leadership', color: 'from-rose-500/15 to-pink-500/15 border-rose-500/25 text-rose-400' },
                  { label: 'Mental Health', color: 'from-purple-500/15 to-violet-500/15 border-purple-500/25 text-purple-400' },
                  { label: 'Communication', color: 'from-sky-500/15 to-blue-500/15 border-sky-500/25 text-sky-400' },
                  { label: 'Resilience', color: 'from-amber-500/15 to-orange-500/15 border-amber-500/25 text-amber-400' },
                ]}
              />
            </div>
          </motion.section>

          {/* Quick Tip */}
          <motion.div variants={itemVariants} className="card-surface p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-[11px] font-medium text-white uppercase tracking-wider">
                Quick Tip
              </span>
            </div>
            <p className="text-xs text-white leading-relaxed">
              Complete at least one quiz daily to build your streak and reinforce your learning.
              Consistency beats intensity!
            </p>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}

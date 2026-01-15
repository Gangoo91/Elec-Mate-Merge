/**
 * CollegeOverviewSection
 *
 * Premium college command center overview with glass morphism styling,
 * real-time stats, and best-in-class mobile experience.
 * Yellow/gold theme throughout.
 */

import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  ClipboardCheck,
  FolderOpen,
  GraduationCap,
  UserCog,
  CheckSquare,
  Target,
  Award,
  Calendar,
  School,
  Sparkles,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CollegeFeatureTile } from '@/components/college/CollegeFeatureTile';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { ActivityFeed } from '@/components/college/widgets/ActivityFeed';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollege } from '@/contexts/CollegeContext';
import { useAuth } from '@/contexts/AuthContext';

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// Premium Hero Component
function CollegeHero({ studentCount, pendingCount }: { studentCount: number; pendingCount: number }) {
  const { profile } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = profile?.full_name?.split(' ')[0] || 'Tutor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden glass-premium rounded-2xl glow-yellow"
    >
      {/* Gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <School className="h-8 w-8 text-elec-yellow" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-elec-yellow mb-1">
              <Sparkles className="h-3 w-3" />
              <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
                College Hub
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
              <span className="hidden sm:inline">{getGreeting()}, </span>
              <span className="text-elec-yellow">{firstName}</span>
            </h1>

            <p className="text-sm text-white/70 mt-1">
              Manage your apprenticeship programme
            </p>

            {/* Status badges */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge
                variant="outline"
                className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[10px] sm:text-xs"
              >
                <GraduationCap className="w-3 h-3 mr-1" />
                {studentCount} students
              </Badge>
              {pendingCount > 0 && (
                <Badge
                  variant="outline"
                  className="bg-amber-500/10 border-amber-500/30 text-amber-400 text-[10px] sm:text-xs"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {pendingCount} pending
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Bar Component
function CollegeStatsBar({
  students,
  tutors,
  pending,
  gateway,
  onNavigate,
}: {
  students: number;
  tutors: number;
  pending: number;
  gateway: number;
  onNavigate: (section: CollegeSection) => void;
}) {
  const statItems = [
    {
      label: 'Students',
      value: students,
      icon: GraduationCap,
      onClick: () => onNavigate('students'),
    },
    {
      label: 'Tutors',
      value: tutors,
      icon: UserCog,
      onClick: () => onNavigate('tutors'),
    },
    {
      label: 'Pending',
      value: pending,
      icon: CheckSquare,
      onClick: () => onNavigate('grading'),
      variant: pending > 0 ? 'warning' : undefined,
    },
    {
      label: 'Gateway',
      value: gateway,
      icon: Award,
      onClick: () => onNavigate('epatracking'),
      variant: 'success',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-4 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0"
    >
      {statItems.map((stat) => {
        const Icon = stat.icon;
        const isWarning = stat.variant === 'warning';
        const isSuccess = stat.variant === 'success';

        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="flex-shrink-0 w-[140px] snap-start sm:w-full"
          >
            <button
              onClick={stat.onClick}
              className="w-full glass-premium rounded-xl p-4 h-[100px] text-left touch-manipulation hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    isWarning
                      ? 'bg-amber-500/10'
                      : isSuccess
                      ? 'bg-green-500/10'
                      : 'bg-elec-yellow/10'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      isWarning
                        ? 'text-amber-500'
                        : isSuccess
                        ? 'text-green-500'
                        : 'text-elec-yellow'
                    )}
                  />
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      'text-xl font-bold',
                      isWarning
                        ? 'text-amber-500'
                        : isSuccess
                        ? 'text-green-500'
                        : 'text-elec-yellow'
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                </div>
              </div>
            </button>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Section Header
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
      <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
    </div>
  );
}

// Hub Card Component
function HubCard({
  title,
  description,
  icon: Icon,
  onClick,
  badge,
  badgeVariant,
}: {
  title: string;
  description: string;
  icon: typeof Users;
  onClick: () => void;
  badge?: string;
  badgeVariant?: 'default' | 'warning';
}) {
  return (
    <button onClick={onClick} className="block w-full text-left group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="glass-premium rounded-xl h-full min-h-[120px] sm:min-h-[130px]"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center h-full">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10 mb-3 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-1">{description}</p>
          {badge && (
            <Badge
              variant="outline"
              className={cn(
                'mt-2 text-[10px]',
                badgeVariant === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow'
              )}
            >
              {badge}
            </Badge>
          )}
        </div>
      </motion.div>
    </button>
  );
}

// Quick Action Card
function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  badge,
}: {
  title: string;
  description: string;
  icon: typeof CheckSquare;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button onClick={onClick} className="block w-full text-left group touch-manipulation">
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-premium rounded-xl p-3 sm:p-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white group-hover:text-elec-yellow transition-colors">
              {title}
            </h3>
            <p className="text-xs text-white/60 truncate">{description}</p>
          </div>
          {badge !== undefined && badge > 0 && (
            <Badge
              variant="outline"
              className="bg-amber-500/10 border-amber-500/30 text-amber-400 text-[10px]"
            >
              {badge}
            </Badge>
          )}
          <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-elec-yellow transition-colors" />
        </div>
      </motion.div>
    </button>
  );
}

// Info Card Component
function InfoCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Calendar;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-premium rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-sm sm:text-base">{title}</h3>
        <div className="p-2 rounded-lg bg-elec-yellow/10">
          <Icon className="h-4 w-4 text-elec-yellow" />
        </div>
      </div>
      {children}
    </div>
  );
}

export function CollegeOverviewSection({ onNavigate }: CollegeOverviewSectionProps) {
  const {
    staff,
    students,
    cohorts,
    epaRecords,
    getStaffByRole,
    getPendingAssessments,
    getOverdueILPReviews,
    getUpcomingLessons,
  } = useCollege();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const pendingAssessments = getPendingAssessments().length;
  const overdueILPReviews = getOverdueILPReviews().length;
  const upcomingLessons = getUpcomingLessons(7);
  const studentsAtGateway = epaRecords.filter(
    (e) => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready'
  ).length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {/* Hero */}
      <motion.section variants={itemVariants}>
        <CollegeHero studentCount={activeStudents} pendingCount={pendingAssessments} />
      </motion.section>

      {/* Stats Bar - Hidden on mobile for native app feel */}
      <motion.section variants={itemVariants} className="hidden sm:block">
        <CollegeStatsBar
          students={activeStudents}
          tutors={activeTutors}
          pending={pendingAssessments}
          gateway={studentsAtGateway}
          onNavigate={onNavigate}
        />
      </motion.section>

      {/* Main Hub Cards */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader title="Main Areas" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <HubCard
            icon={Users}
            title="People"
            description="Staff, students & cohorts"
            onClick={() => onNavigate('peoplehub')}
            badge={`${activeStudents} students`}
          />
          <HubCard
            icon={BookOpen}
            title="Curriculum"
            description="Courses & resources"
            onClick={() => onNavigate('curriculumhub')}
          />
          <HubCard
            icon={ClipboardCheck}
            title="Assessment"
            description="Grades, ILPs, EPA"
            onClick={() => onNavigate('assessmenthub')}
            badge={pendingAssessments > 0 ? `${pendingAssessments} pending` : undefined}
            badgeVariant="warning"
          />
          <HubCard
            icon={FolderOpen}
            title="Resources"
            description="Documents & settings"
            onClick={() => onNavigate('resourceshub')}
          />
        </div>
      </motion.section>

      {/* AI Insights */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader title="AI Insights" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AtRiskPredictor onNavigate={onNavigate} compact />
          <EPACountdown onNavigate={onNavigate} compact />
        </div>
        {overdueILPReviews > 0 && (
          <QuickActionCard
            icon={Target}
            title="Overdue ILPs"
            description={`${overdueILPReviews} reviews need completing`}
            onClick={() => onNavigate('ilpmanagement')}
            badge={overdueILPReviews}
          />
        )}
      </motion.section>

      {/* Quick Actions */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <QuickActionCard
            icon={CheckSquare}
            title="Grade Work"
            description="Record assessments"
            onClick={() => onNavigate('grading')}
            badge={pendingAssessments}
          />
          <QuickActionCard
            icon={Calendar}
            title="Take Register"
            description="Record attendance"
            onClick={() => onNavigate('attendance')}
          />
          <QuickActionCard
            icon={Target}
            title="ILP Review"
            description="Update learning plans"
            onClick={() => onNavigate('ilpmanagement')}
          />
          <QuickActionCard
            icon={Award}
            title="EPA Gateway"
            description="Check readiness"
            onClick={() => onNavigate('epatracking')}
          />
        </div>
      </motion.section>

      {/* Info Cards */}
      <motion.section variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upcoming Lessons */}
          <InfoCard title="Upcoming Lessons" icon={Calendar}>
            <div className="space-y-2">
              {upcomingLessons.length > 0 ? (
                upcomingLessons.slice(0, 3).map((lesson) => (
                  <button
                    key={lesson.id}
                    className="w-full flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-left"
                    onClick={() => onNavigate('lessonplans')}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white/90 truncate">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-white/50 truncate">{lesson.cohortName}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-[10px] bg-white/[0.05] border-white/10 text-white/70"
                    >
                      {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                      })}
                    </Badge>
                  </button>
                ))
              ) : (
                <p className="text-sm text-white/50">No upcoming lessons this week</p>
              )}
            </div>
          </InfoCard>

          {/* EPA Progress */}
          <InfoCard title="EPA Progress" icon={Award}>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-left"
                onClick={() => onNavigate('epatracking')}
              >
                <div>
                  <p className="text-sm font-medium text-white/90">At Gateway</p>
                  <p className="text-xs text-white/50">Ready for assessment</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 border-green-500/30 text-green-400 text-[10px]"
                >
                  {studentsAtGateway}
                </Badge>
              </button>
              <button
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-left"
                onClick={() => onNavigate('epatracking')}
              >
                <div>
                  <p className="text-sm font-medium text-white/90">In Progress</p>
                  <p className="text-xs text-white/50">Working towards gateway</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-white/[0.05] border-white/10 text-white/70 text-[10px]"
                >
                  {epaRecords.filter((e) => e.status === 'In Progress').length}
                </Badge>
              </button>
              <button
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-left"
                onClick={() => onNavigate('epatracking')}
              >
                <div>
                  <p className="text-sm font-medium text-white/90">Completed</p>
                  <p className="text-xs text-white/50">EPA passed</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-[10px]"
                >
                  {epaRecords.filter((e) => e.status === 'Complete').length}
                </Badge>
              </button>
            </div>
          </InfoCard>
        </div>
      </motion.section>

      {/* Activity Feed */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader title="Recent Activity" />
        <ActivityFeed maxItems={8} compact />
      </motion.section>
    </motion.div>
  );
}

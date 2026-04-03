/**
 * CollegeOverviewSection — redesigned to match Business Hub / Electrical Hub pattern.
 * card-surface-interactive cards, KPI strip, no glass morphism or decorative blobs.
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
  ChevronRight,
  AlertTriangle,
  FolderCheck,
  Loader2,
  Clock,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { ActivityFeed } from '@/components/college/widgets/ActivityFeed';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useSubmissionQueue } from '@/hooks/college/usePortfolioSubmissions';

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export function CollegeOverviewSection({ onNavigate }: CollegeOverviewSectionProps) {
  const {
    staff,
    students,
    epaRecords,
    isLoading,
    getStaffByRole,
    getPendingGradesData,
    getOverdueILPReviewsData,
    getUpcomingLessonsData,
  } = useCollegeSupabase();

  const { stats: submissionStats } = useSubmissionQueue();

  const activeTutors = getStaffByRole('tutor').length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const pendingAssessments = getPendingGradesData().length;
  const overdueILPReviews = getOverdueILPReviewsData().length;
  const upcomingLessons = getUpcomingLessonsData();
  const studentsAtGateway = epaRecords.filter(
    (e) => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready'
  ).length;
  const epaInProgress = epaRecords.filter((e) => e.status === 'In Progress').length;
  const epaComplete = epaRecords.filter((e) => e.status === 'Complete').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* KPI Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2">
        {[
          { value: activeStudents, label: 'Students', icon: GraduationCap, color: 'text-blue-400', onClick: () => onNavigate('students') },
          { value: activeTutors, label: 'Tutors', icon: UserCog, color: 'text-emerald-400', onClick: () => onNavigate('tutors') },
          { value: pendingAssessments, label: 'Pending', icon: CheckSquare, color: pendingAssessments > 0 ? 'text-amber-400' : 'text-white', onClick: () => onNavigate('grading') },
          { value: studentsAtGateway, label: 'Gateway', icon: Award, color: 'text-green-400', onClick: () => onNavigate('epatracking') },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={stat.onClick}
            className="card-surface p-3 flex flex-col items-center touch-manipulation active:scale-[0.98] transition-all"
          >
            <stat.icon className={cn('h-4 w-4 mb-1', stat.color)} />
            <span className={cn('text-lg font-bold', stat.color)}>{stat.value}</span>
            <span className="text-[10px] text-white uppercase tracking-wider">{stat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Main Hub Cards */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Main Areas</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Users, title: 'People', desc: 'Students, tutors & cohorts', section: 'peoplehub' as CollegeSection, gradient: 'from-blue-500 via-blue-400 to-cyan-400', iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10 border border-blue-500/20', hoverColor: 'group-hover:text-blue-300', badge: `${activeStudents} students` },
            { icon: BookOpen, title: 'Curriculum', desc: 'Courses & lesson plans', section: 'curriculumhub' as CollegeSection, gradient: 'from-emerald-500 via-emerald-400 to-green-400', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10 border border-emerald-500/20', hoverColor: 'group-hover:text-emerald-300' },
            { icon: ClipboardCheck, title: 'Assessment', desc: 'Grades, ILPs & EPA', section: 'assessmenthub' as CollegeSection, gradient: 'from-amber-500 via-amber-400 to-yellow-400', iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10 border border-amber-500/20', hoverColor: 'group-hover:text-amber-300', badge: pendingAssessments > 0 ? `${pendingAssessments} pending` : undefined },
            { icon: FolderOpen, title: 'Resources', desc: 'Documents & settings', section: 'resourceshub' as CollegeSection, gradient: 'from-purple-500 via-violet-400 to-indigo-400', iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10 border border-purple-500/20', hoverColor: 'group-hover:text-purple-300' },
          ].map((hub) => (
            <button key={hub.title} onClick={() => onNavigate(hub.section)} className="block w-full text-left touch-manipulation">
              <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity', hub.gradient)} />
                <div className="relative z-10 p-4 sm:p-5 flex flex-col min-h-[150px]">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className={cn('p-2.5 rounded-xl', hub.iconBg, hub.iconColor, 'transition-all group-hover:scale-110')}>
                      <hub.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    {hub.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">
                        {hub.badge}
                      </span>
                    )}
                  </div>
                  <h3 className={cn('text-sm sm:text-base font-semibold text-white mb-0.5', hub.hoverColor, 'transition-colors')}>
                    {hub.title}
                  </h3>
                  <p className="text-[11px] text-white">{hub.desc}</p>
                  <div className="flex-grow" />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[11px] font-medium text-elec-yellow">Open</span>
                    <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                      <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Alerts */}
      {(overdueILPReviews > 0 || submissionStats.total > 0) && (
        <motion.section variants={itemVariants} className="space-y-2">
          {overdueILPReviews > 0 && (
            <button onClick={() => onNavigate('ilpmanagement')} className="w-full text-left touch-manipulation">
              <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-400 opacity-50" />
                <div className="relative z-10 p-3.5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">Overdue ILPs</p>
                    <p className="text-[11px] text-white">{overdueILPReviews} reviews need completing</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">{overdueILPReviews}</span>
                  <ChevronRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </button>
          )}
          {submissionStats.total > 0 && (
            <button onClick={() => onNavigate('portfolio')} className="w-full text-left touch-manipulation">
              <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 opacity-50" />
                <div className="relative z-10 p-3.5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <FolderCheck className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">Portfolio Reviews</p>
                    <p className="text-[11px] text-white">{submissionStats.highPriority > 0 ? `${submissionStats.highPriority} high priority · ` : ''}{submissionStats.total} awaiting review</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">{submissionStats.total}</span>
                  <ChevronRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </button>
          )}
        </motion.section>
      )}

      {/* AI Insights */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AtRiskPredictor onNavigate={onNavigate} compact />
          <EPACountdown onNavigate={onNavigate} compact />
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: CheckSquare, title: 'Grade Work', desc: 'Record assessments', section: 'grading' as CollegeSection, badge: pendingAssessments, color: 'text-elec-yellow', bg: 'bg-elec-yellow/10 border border-elec-yellow/20' },
            { icon: Calendar, title: 'Take Register', desc: 'Record attendance', section: 'attendance' as CollegeSection, color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-500/20' },
            { icon: Target, title: 'ILP Review', desc: 'Update learning plans', section: 'ilpmanagement' as CollegeSection, badge: overdueILPReviews, color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-500/20' },
            { icon: Award, title: 'EPA Gateway', desc: 'Check readiness', section: 'epatracking' as CollegeSection, color: 'text-green-400', bg: 'bg-green-500/10 border border-green-500/20' },
          ].map((action) => (
            <button key={action.title} onClick={() => onNavigate(action.section)} className="w-full text-left touch-manipulation">
              <div className="group card-surface-interactive p-3.5 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-xl', action.bg)}>
                    <action.icon className={cn('h-4 w-4', action.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-elec-yellow transition-colors">{action.title}</p>
                    <p className="text-[10px] text-white">{action.desc}</p>
                  </div>
                  {action.badge !== undefined && action.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">{action.badge}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Info Cards — Upcoming Lessons + EPA Progress */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Upcoming Lessons */}
          <div className="card-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Upcoming Lessons</h3>
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
              </div>
            </div>
            {upcomingLessons.length > 0 ? (
              <div className="space-y-2">
                {upcomingLessons.slice(0, 3).map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onNavigate('lessonplans')}
                    className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04] touch-manipulation active:bg-white/[0.06] transition-colors text-left"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white truncate">{lesson.title}</p>
                      <p className="text-[10px] text-white truncate">{lesson.cohortName}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06] flex-shrink-0">
                      {new Date(lesson.scheduledDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white py-2">No upcoming lessons this week</p>
            )}
          </div>

          {/* EPA Progress */}
          <div className="card-surface p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">EPA Progress</h3>
              <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                <Award className="h-3.5 w-3.5 text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'At Gateway', sub: 'Ready for assessment', value: studentsAtGateway, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                { label: 'In Progress', sub: 'Working towards gateway', value: epaInProgress, color: 'text-white', bg: 'bg-white/[0.04] border-white/[0.06]' },
                { label: 'Completed', sub: 'EPA passed', value: epaComplete, color: 'text-elec-yellow', bg: 'bg-elec-yellow/10 border-elec-yellow/20' },
              ].map((row) => (
                <button
                  key={row.label}
                  onClick={() => onNavigate('epatracking')}
                  className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04] touch-manipulation active:bg-white/[0.06] transition-colors text-left"
                >
                  <div>
                    <p className="text-xs font-medium text-white">{row.label}</p>
                    <p className="text-[10px] text-white">{row.sub}</p>
                  </div>
                  <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold border', row.bg, row.color)}>
                    {row.value}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tools & Compliance */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Tools & Compliance</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Clock, title: 'OTJ Training', desc: '20% off-the-job tracker', section: 'otjtraining' as CollegeSection, gradient: 'from-emerald-500 via-emerald-400 to-green-400', iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10 border border-emerald-500/20', hoverColor: 'group-hover:text-emerald-300' },
            { icon: BarChart3, title: 'Quality Dashboard', desc: 'Ofsted compliance metrics', section: 'qualitydashboard' as CollegeSection, gradient: 'from-blue-500 via-blue-400 to-cyan-400', iconColor: 'text-blue-400', iconBg: 'bg-blue-500/10 border border-blue-500/20', hoverColor: 'group-hover:text-blue-300' },
            { icon: Target, title: 'AI ILP Generator', desc: 'Auto-generate SMART targets', section: 'aiilpgenerator' as CollegeSection, gradient: 'from-elec-yellow via-amber-400 to-orange-400', iconColor: 'text-elec-yellow', iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20', hoverColor: 'group-hover:text-elec-yellow' },
            { icon: Calendar, title: 'Timetable', desc: 'Weekly lesson schedule', section: 'timetable' as CollegeSection, gradient: 'from-purple-500 via-violet-400 to-indigo-400', iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10 border border-purple-500/20', hoverColor: 'group-hover:text-purple-300' },
            { icon: BookOpen, title: 'Live Lesson', desc: 'In-lesson register & timer', section: 'livelesson' as CollegeSection, gradient: 'from-elec-yellow via-amber-400 to-orange-400', iconColor: 'text-elec-yellow', iconBg: 'bg-elec-yellow/10 border border-elec-yellow/20', hoverColor: 'group-hover:text-elec-yellow' },
            { icon: CheckSquare, title: 'Batch Operations', desc: 'Bulk grades & reviews', section: 'batchoperations' as CollegeSection, gradient: 'from-amber-500 via-amber-400 to-yellow-400', iconColor: 'text-amber-400', iconBg: 'bg-amber-500/10 border border-amber-500/20', hoverColor: 'group-hover:text-amber-300' },
          ].map((tool) => (
            <button key={tool.title} onClick={() => onNavigate(tool.section)} className="w-full text-left touch-manipulation">
              <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity', tool.gradient)} />
                <div className="relative z-10 p-3.5">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-2 rounded-xl', tool.iconBg)}>
                      <tool.icon className={cn('h-4 w-4', tool.iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-semibold text-white', tool.hoverColor, 'transition-colors')}>{tool.title}</p>
                      <p className="text-[10px] text-white">{tool.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Activity Feed */}
      <motion.section variants={itemVariants}>
        <ActivityFeed maxItems={8} compact />
      </motion.section>
    </motion.div>
  );
}

/**
 * StudyStatsDashboard — Personal learning stats grid.
 *
 * Shows the user's own progress metrics in a compact card grid.
 * Pulls from course_progress, quiz_results, study_streaks, xp_summary, achievements.
 */

import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Flame,
  Zap,
  Trophy,
  Target,
  Clock,
} from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sublabel?: string;
  iconColor: string;
  iconBg: string;
}

function StatCard({ icon: Icon, label, value, sublabel, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
      <div className={cn('p-2 rounded-lg', iconBg)}>
        <Icon className={cn('h-4 w-4', iconColor)} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-white leading-tight">{value}</p>
        <p className="text-[11px] text-white truncate">{label}</p>
        {sublabel && <p className="text-[10px] text-white/50">{sublabel}</p>}
      </div>
    </div>
  );
}

export function StudyStatsDashboard() {
  const { allProgress, completedCount } = useCourseProgress();
  const streakData = useStudyStreak();
  const quizData = useQuizResults();

  const quizResults = quizData?.results || [];
  const currentStreak = streakData?.streak?.currentStreak || 0;
  const longestStreak = streakData?.streak?.longestStreak || 0;

  const inProgressCount = allProgress.filter((p) => !p.completed && p.progress_pct > 0).length;
  const averageScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc: number, r: any) => acc + (r.score || r.percentage || 0), 0) /
            quizResults.length
        )
      : 0;

  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
        Your Progress
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard
          icon={BookOpen}
          label="In Progress"
          value={inProgressCount}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10 border border-blue-500/20"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completedCount}
          iconColor="text-green-400"
          iconBg="bg-green-500/10 border border-green-500/20"
        />
        <StatCard
          icon={Target}
          label="Quiz Average"
          value={quizResults.length > 0 ? `${averageScore}%` : '--'}
          sublabel={quizResults.length > 0 ? `${quizResults.length} taken` : undefined}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10 border border-purple-500/20"
        />
        <StatCard
          icon={Flame}
          label="Study Streak"
          value={currentStreak}
          sublabel={longestStreak > 0 ? `Best: ${longestStreak}` : undefined}
          iconColor="text-orange-400"
          iconBg="bg-orange-500/10 border border-orange-500/20"
        />
      </div>
    </div>
  );
}

export default StudyStatsDashboard;

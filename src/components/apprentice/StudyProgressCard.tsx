/**
 * StudyProgressCard
 *
 * Premium card component displaying apprentice study progress including:
 * - Current study streak
 * - Quizzes completed
 * - Average score
 * - Continue where you left off
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Trophy, Target, BookOpen, ChevronRight, Zap } from 'lucide-react';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';

export const StudyProgressCard: React.FC = () => {
  const { streak, loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const { getOverallStats, isLoading: quizLoading } = useQuizResults();
  const { lastLocation, loading: locationLoading, getLastStudiedDisplay } = useLastStudyLocation();

  const isLoading = streakLoading || quizLoading || locationLoading;
  const streakDisplay = getStreakDisplay();
  const quizStats = getOverallStats();

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-5 animate-pulse">
        <div className="h-24 bg-white/5 rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-elec-yellow/60 to-transparent" />

      <div className="p-4 sm:p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10 border border-white/10">
            <Zap className="h-5 w-5 text-elec-yellow" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Study Progress</h3>
            <p className="text-xs text-white/50">Your learning journey</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Streak */}
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className={`h-4 w-4 ${streakDisplay.currentStreak > 0 ? 'text-orange-400' : 'text-white/30'}`} />
              <span className={`text-xl font-bold ${streakDisplay.currentStreak > 0 ? 'text-orange-400' : 'text-white/50'}`}>
                {streakDisplay.currentStreak}
              </span>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Day Streak</p>
          </div>

          {/* Quizzes */}
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-xl font-bold text-blue-400">{quizStats.totalQuizzes}</span>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Quizzes</p>
          </div>

          {/* Average Score */}
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className={`h-4 w-4 ${quizStats.averageScore >= 70 ? 'text-elec-yellow' : 'text-white/30'}`} />
              <span className={`text-xl font-bold ${quizStats.averageScore >= 70 ? 'text-elec-yellow' : 'text-white/50'}`}>
                {quizStats.averageScore}%
              </span>
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Avg Score</p>
          </div>
        </div>

        {/* Streak Encouragement */}
        {streakDisplay.currentStreak > 0 && (
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400 animate-pulse" />
            <p className="text-xs text-orange-300">
              {streakDisplay.currentStreak === 1
                ? "Great start! Keep it up tomorrow!"
                : streakDisplay.currentStreak < 7
                ? `${streakDisplay.currentStreak} days strong! Building good habits.`
                : `Amazing! ${streakDisplay.currentStreak} day streak! You're on fire!`}
            </p>
          </div>
        )}

        {/* Continue Where You Left Off */}
        {lastLocation ? (
          <Link
            to={lastLocation.path}
            className="group block bg-white/5 hover:bg-white/10 rounded-xl p-3 border border-white/5 hover:border-elec-yellow/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-white/50 uppercase tracking-wide mb-0.5">Continue Learning</p>
                  <p className="text-sm font-medium text-white truncate group-hover:text-elec-yellow transition-colors">
                    {lastLocation.title}
                  </p>
                  <p className="text-[10px] text-white/40">{getLastStudiedDisplay()}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </Link>
        ) : (
          <Link
            to="/study-centre"
            className="group block bg-elec-yellow/10 hover:bg-elec-yellow/20 rounded-xl p-3 border border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow">Start Learning</p>
                  <p className="text-[10px] text-white/50">Browse courses in the Study Centre</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-elec-yellow/60 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default StudyProgressCard;

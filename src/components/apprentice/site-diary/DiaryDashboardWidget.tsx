/**
 * DiaryDashboardWidget
 *
 * Prominent card for the ApprenticeHub matching the Essential Tools card style.
 * Shows "Log Today" CTA with streak badge, today's date, and entry count.
 * Tapping opens the diary entry sheet.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, ChevronRight, Flame, Calendar, FileText } from 'lucide-react';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { useDiaryStreak } from '@/hooks/site-diary/useDiaryStreak';
import { DiaryEntrySheet } from './DiaryEntrySheet';

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export function DiaryDashboardWidget() {
  const { entries, createEntry, recentSites, isLoading } = useSiteDiaryEntries();
  const { currentStreak, nextMilestone, daysToNextMilestone, streakMessage } =
    useDiaryStreak(entries);
  const [sheetOpen, setSheetOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const hasLoggedToday = entries.some((e) => e.date === todayStr);
  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      <motion.div variants={itemVariants} className="space-y-3">
        {/* Main card - matching ToolCard style */}
        <button
          onClick={() => setSheetOpen(true)}
          className="w-full group touch-manipulation active:scale-[0.98] transition-transform text-left"
        >
          <div className="relative overflow-hidden glass-premium rounded-xl min-h-[140px]">
            {/* Accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

            <div className="p-4 sm:p-5 flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 p-2.5 rounded-lg bg-elec-yellow/20 group-active:bg-elec-yellow/35 ring-1 ring-elec-yellow/30 transition-colors">
                <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-active:text-elec-yellow transition-colors">
                    {hasLoggedToday ? 'Add Another Entry' : 'Log Today'}
                  </h3>
                  {hasLoggedToday && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                      Done
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{todayFormatted}</p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {currentStreak > 0 ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-orange-500/10 border-orange-500/30 text-orange-400"
                    >
                      <Flame className="h-3 w-3 mr-1 animate-pulse" />
                      {currentStreak}-day streak!
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-white/[0.04] border-white/10 text-white/60"
                    >
                      <Flame className="h-3 w-3 mr-1" />
                      {streakMessage}
                    </Badge>
                  )}
                  {entries.length > 0 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </Badge>
                  )}
                  {currentStreak > 0 && nextMilestone && daysToNextMilestone > 0 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-purple-500/10 border-purple-500/30 text-purple-400"
                    >
                      {daysToNextMilestone}d to {nextMilestone}-day milestone
                    </Badge>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <Plus className="h-5 w-5 text-elec-yellow flex-shrink-0 group-active:rotate-90 transition-transform" />
            </div>
          </div>
        </button>

        {/* View All link */}
        {entries.length > 0 && (
          <Link
            to="/apprentice/site-diary"
            className="flex items-center justify-center gap-2 h-11 text-sm text-elec-yellow font-medium touch-manipulation active:opacity-70 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/10"
          >
            View All Diary Entries
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </motion.div>

      <DiaryEntrySheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSave={createEntry}
        recentSites={recentSites}
      />
    </>
  );
}

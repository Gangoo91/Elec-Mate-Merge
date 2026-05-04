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
import { Plus, ChevronRight, Flame, FileText } from 'lucide-react';
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
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] min-h-[140px]">
            <div className="p-4 sm:p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {todayFormatted}
                </span>
                <h3 className="text-[18px] font-semibold text-white">
                  {hasLoggedToday ? 'Add another entry' : 'Log today'}
                </h3>
                {hasLoggedToday && (
                  <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    Done
                  </span>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentStreak > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      <Flame className="h-3 w-3" />
                      {currentStreak}-day streak
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      <Flame className="h-3 w-3" />
                      {streakMessage}
                    </span>
                  )}
                  {entries.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                      <FileText className="h-3 w-3" />
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </span>
                  )}
                  {currentStreak > 0 && nextMilestone && daysToNextMilestone > 0 && (
                    <span className="inline-flex items-center gap-1 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                      {daysToNextMilestone}d to {nextMilestone}-day milestone
                    </span>
                  )}
                </div>
              </div>

              <Plus className="h-5 w-5 text-elec-yellow flex-shrink-0 group-active:rotate-90 transition-transform" />
            </div>
          </div>
        </button>

        {entries.length > 0 && (
          <Link
            to="/apprentice/site-diary"
            className="flex items-center justify-center gap-2 h-11 text-[13px] text-white/85 font-medium touch-manipulation active:bg-white/[0.05] rounded-xl border border-white/[0.06] bg-white/[0.02]"
          >
            View all diary entries
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

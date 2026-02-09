/**
 * DiaryFeed
 *
 * Scrollable list of diary entries grouped by date with sticky date headers.
 * Supports edit/delete callbacks and a CTA empty state.
 * Staggered framer-motion entrance animations for best-in-class feel.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DiaryEntryCard } from './DiaryEntryCard';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import type { PortfolioNudge } from '@/hooks/site-diary/useDiaryCoach';
import { BookOpen, Plus } from 'lucide-react';

/** Format a date string into a friendly label */
function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateOnly = new Date(date);
  dateOnly.setHours(0, 0, 0, 0);

  if (dateOnly.getTime() === today.getTime()) return 'Today';
  if (dateOnly.getTime() === yesterday.getTime()) return 'Yesterday';

  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
}

interface DiaryFeedProps {
  entries: SiteDiaryEntry[];
  onEntryTap?: (entry: SiteDiaryEntry) => void;
  onEdit?: (entry: SiteDiaryEntry) => void;
  onDelete?: (id: string) => void;
  onNewEntry?: () => void;
  maxItems?: number;
  portfolioNudges?: Map<string, PortfolioNudge>;
}

export function DiaryFeed({
  entries,
  onEntryTap,
  onEdit,
  onDelete,
  onNewEntry,
  maxItems,
  portfolioNudges,
}: DiaryFeedProps) {
  const displayEntries = maxItems ? entries.slice(0, maxItems) : entries;

  // Group entries by date
  const groupedEntries = useMemo(() => {
    const groups: { date: string; label: string; entries: SiteDiaryEntry[] }[] = [];
    const dateMap = new Map<string, SiteDiaryEntry[]>();

    for (const entry of displayEntries) {
      const existing = dateMap.get(entry.date);
      if (existing) {
        existing.push(entry);
      } else {
        const arr = [entry];
        dateMap.set(entry.date, arr);
        groups.push({ date: entry.date, label: formatDateLabel(entry.date), entries: arr });
      }
    }

    return groups;
  }, [displayEntries]);

  if (displayEntries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
          className="h-16 w-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4"
        >
          <BookOpen className="h-8 w-8 text-white" />
        </motion.div>
        <p className="text-base font-medium text-white mb-1">No diary entries yet</p>
        <p className="text-sm text-white mb-4">Start recording your on-site experience</p>
        {onNewEntry && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onNewEntry}
            className="flex items-center gap-2 px-5 h-11 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.98] transition-transform"
          >
            <Plus className="h-4 w-4" />
            Start your first entry
          </motion.button>
        )}
      </motion.div>
    );
  }

  // Track running entry index for stagger across groups
  let entryIndex = 0;

  return (
    <div className="space-y-1">
      {groupedEntries.map((group, groupIndex) => (
        <div key={group.date}>
          {/* Sticky date header */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: groupIndex * 0.08, duration: 0.3 }}
            className="sticky top-0 z-10 bg-[hsl(240,5.9%,10%)]/95 backdrop-blur-sm py-1.5 px-1"
          >
            <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
              {group.label}
            </span>
          </motion.div>

          {/* Entries for this date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
            {group.entries.map((entry) => {
              const currentIndex = entryIndex++;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(currentIndex * 0.06, 0.5), duration: 0.3 }}
                >
                  <DiaryEntryCard
                    entry={entry}
                    onTap={() => onEntryTap?.(entry)}
                    onEdit={onEdit}
                    onDelete={onDelete ? (id) => onDelete(id) : undefined}
                    portfolioNudge={portfolioNudges?.get(entry.id)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * DiaryEntryCard
 *
 * Redesigned entry card with mood colour strip, task pills,
 * skill badges, italic quote for what_i_learned, and tap-to-detail.
 * Wider mood strip, press feedback via motion, readable white text.
 */

import { motion } from 'framer-motion';
import {
  MapPin,
  Pencil,
  Trash2,
  ChevronRight,
  Camera,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';
import type { PortfolioNudge } from '@/hooks/site-diary/useDiaryCoach';

const moodEmojis: Record<number, string> = {
  1: '😢',
  2: '😔',
  3: '😐',
  4: '🙂',
  5: '😊',
};

/** Returns a colour class for the left mood strip based on mood rating */
function moodStripColour(mood: number | null): string {
  if (!mood) return 'bg-white/10';
  if (mood >= 4) return 'bg-green-400';
  if (mood === 3) return 'bg-amber-400';
  return 'bg-red-400';
}

/** Skill colour mapping for variety */
const skillColours: Record<string, string> = {
  'Practical Skills': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  'Health & Safety': 'bg-red-500/15 text-red-400 border-red-500/25',
  'Testing & Inspection': 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  'Wiring & Containment': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Regulations: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
  'Tools & Equipment': 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  Communication: 'bg-pink-500/15 text-pink-400 border-pink-500/25',
  'Problem Solving': 'bg-green-500/15 text-green-400 border-green-500/25',
};

interface DiaryEntryCardProps {
  entry: SiteDiaryEntry;
  compact?: boolean;
  onTap?: () => void;
  onEdit?: (entry: SiteDiaryEntry) => void;
  onDelete?: (id: string) => void;
  portfolioNudge?: PortfolioNudge;
}

export function DiaryEntryCard({
  entry,
  compact = false,
  onTap,
  onEdit,
  onDelete,
  portfolioNudge,
}: DiaryEntryCardProps) {
  const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: compact ? 'short' : 'long',
    day: 'numeric',
    month: compact ? 'short' : 'long',
  });

  return (
    <div className="relative group">
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onTap}
        className="w-full text-left rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.08] touch-manipulation active:bg-white/[0.06] transition-colors"
      >
        <div className="flex">
          {/* Mood colour strip - wider for visibility */}
          <div className={`w-1.5 flex-shrink-0 ${moodStripColour(entry.mood_rating)}`} />

          <div className="flex-1 min-w-0 p-3.5 sm:p-5">
            {/* Header: date + mood emoji + site */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-white">{formattedDate}</span>
              {entry.mood_rating && (
                <span className="text-sm">{moodEmojis[entry.mood_rating]}</span>
              )}
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <MapPin className="h-3 w-3 text-elec-yellow flex-shrink-0" />
                <span className="text-xs text-white truncate">{entry.site_name}</span>
              </div>
              {entry.photos && entry.photos.length > 0 && (
                <span className="flex items-center gap-0.5 text-white/50 flex-shrink-0">
                  <Camera className="h-3 w-3" />
                  <span className="text-[10px]">{entry.photos.length}</span>
                </span>
              )}
              <ChevronRight className="h-3.5 w-3.5 text-white/50 flex-shrink-0" />
            </div>

            {/* Tasks as compact pills */}
            {entry.tasks_completed.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {entry.tasks_completed.slice(0, 4).map((task) => (
                  <span
                    key={task}
                    className="px-2 py-0.5 rounded-md bg-white/[0.08] text-[11px] text-white"
                  >
                    {task}
                  </span>
                ))}
                {entry.tasks_completed.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[11px] text-white">
                    +{entry.tasks_completed.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Skills as small coloured badges */}
            {!compact && entry.skills_practised.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {entry.skills_practised.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                      skillColours[skill] || 'bg-white/[0.06] text-white border-white/10'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
                {entry.skills_practised.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] text-white border border-white/[0.06]">
                    +{entry.skills_practised.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Portfolio nudge badge */}
            {!compact && portfolioNudge && !entry.linked_portfolio_id && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-elec-yellow/10 border border-elec-yellow/20 text-[11px] font-medium text-elec-yellow max-w-full truncate">
                  <Briefcase className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{portfolioNudge.nudge}</span>
                </span>
              </div>
            )}
            {/* "In Portfolio" badge */}
            {!compact && entry.linked_portfolio_id && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 text-[11px] font-medium text-green-400">
                  <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                  In Portfolio
                </span>
              </div>
            )}

            {/* What I learned -- italic quote */}
            {!compact && entry.what_i_learned && (
              <p className="text-[11px] text-white italic leading-relaxed line-clamp-2 border-l-2 border-elec-yellow/30 pl-2">
                &ldquo;{entry.what_i_learned}&rdquo;
              </p>
            )}
          </div>
        </div>
      </motion.button>

      {/* Desktop hover edit/delete buttons */}
      {(onEdit || onDelete) && (
        <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(entry);
              }}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-elec-yellow/15 text-elec-yellow touch-manipulation active:bg-elec-yellow/25 transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry.id);
              }}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-500/15 text-red-400 touch-manipulation active:bg-red-500/25 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
